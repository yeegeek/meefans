const Message = require('../models/Message');
const User = require('../models/User');

// 生成 channel ID
const generateChannel = (userId1, userId2) => {
  const ids = [userId1.toString(), userId2.toString()].sort();
  return `${ids[0]}_${ids[1]}`;
};

// 获取消息列表（对话列表）
const getMessages = async (req, res, next) => {
  try {
    const userId = req.userId;

    // 获取所有包含当前用户的消息
    const messages = await Message.find({
      $or: [
        { from_id: userId },
        { to_id: userId }
      ]
    })
      .sort({ created_at: -1 })
      .populate('from_id', '-password')
      .populate('to_id', '-password')
      .populate('file_id');

    // 按 channel 分组，只保留每个对话的最新消息
    const channelMap = new Map();
    
    messages.forEach(msg => {
      if (!channelMap.has(msg.channel)) {
        channelMap.set(msg.channel, msg);
      }
    });

    const conversations = Array.from(channelMap.values()).map(msg => {
      // 确定对方用户
      const otherUser = msg.from_id._id.toString() === userId.toString() 
        ? msg.to_id 
        : msg.from_id;

      return {
        channel: msg.channel,
        user: {
          id: otherUser._id,
          name: otherUser.name,
          display_name: otherUser.display_name,
          gender: otherUser.gender,
          avatar: otherUser.avatar,
          cover: otherUser.cover,
          location: otherUser.location,
          vip: otherUser.vip,
          friend: 0,
          block: 0,
          request: 0,
          x: otherUser.x,
          content: otherUser.content,
          cost: 0,
          translate: 0,
          engine: 0,
          online: otherUser.online ? 1 : 0
        },
        last_message: {
          id: msg._id,
          type: msg.type,
          content: msg.content,
          created_at: msg.created_at
        }
      };
    });

    res.status(200).json({
      conversations
    });
  } catch (error) {
    next(error);
  }
};

// 获取对话消息
const getMessagesByChannel = async (req, res, next) => {
  try {
    const { channel } = req.params;
    const { max_id } = req.query;
    const userId = req.userId;
    const limit = 50;

    let query = { channel };
    if (max_id) {
      query._id = { $lt: max_id };
    }

    const messages = await Message.find(query)
      .sort({ created_at: -1 })
      .limit(limit)
      .populate('from_id', '-password')
      .populate('to_id', '-password')
      .populate('file_id');

    const messagesData = messages.map(msg => ({
      id: msg._id,
      channel: msg.channel,
      from: {
        id: msg.from_id._id,
        name: msg.from_id.name,
        display_name: msg.from_id.display_name,
        gender: msg.from_id.gender,
        avatar: msg.from_id.avatar,
        cover: msg.from_id.cover,
        location: msg.from_id.location,
        vip: msg.from_id.vip,
        friend: 0,
        block: 0,
        request: 0,
        x: msg.from_id.x,
        content: msg.from_id.content,
        cost: 0,
        translate: 0,
        engine: 0,
        online: msg.from_id.online ? 1 : 0
      },
      to: {
        id: msg.to_id._id,
        name: msg.to_id.name,
        display_name: msg.to_id.display_name,
        gender: msg.to_id.gender,
        avatar: msg.to_id.avatar,
        cover: msg.to_id.cover,
        location: msg.to_id.location,
        vip: msg.to_id.vip,
        friend: 0,
        block: 0,
        request: 0,
        x: msg.to_id.x,
        content: msg.to_id.content,
        cost: 0,
        translate: 0,
        engine: 0,
        online: msg.to_id.online ? 1 : 0
      },
      type: msg.type,
      content: msg.content,
      translate: msg.translate,
      engine: msg.engine,
      cost: msg.cost,
      file: msg.file_id ? {
        id: msg.file_id._id,
        type: msg.file_id.type,
        charge: msg.file_id.charge,
        paid: msg.file_id.paid,
        price: msg.file_id.price,
        src: msg.file_id.src,
        w: msg.file_id.w,
        h: msg.file_id.h,
        top: msg.file_id.top,
        thumb: msg.file_id.thumb,
        duration: msg.file_id.duration
      } : null,
      created_at: msg.created_at
    }));

    res.status(200).json({
      messages: messagesData.reverse(), // 反转顺序，使最早的消息在前
      pagination: {
        next_url: messages.length > 0 ? `/message/${channel}?max_id=${messages[messages.length - 1]._id}` : null,
        next_max_id: messages.length > 0 ? messages[messages.length - 1]._id : null
      }
    });
  } catch (error) {
    next(error);
  }
};

// 发送消息
const createMessage = async (req, res, next) => {
  try {
    const { to_id, type, content, upload_id } = req.body;
    const userId = req.userId;

    // 检查接收用户是否存在
    const toUser = await User.findById(to_id);
    if (!toUser) {
      return res.status(404).json({
        code: 404,
        message: '接收用户不存在',
        field: 'to_id'
      });
    }

    // 生成 channel
    const channel = generateChannel(userId, to_id);

    const message = new Message({
      channel,
      from_id: userId,
      to_id,
      type: type || 'text',
      content: content || '',
      file_id: upload_id || null
    });

    await message.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('from_id', '-password')
      .populate('to_id', '-password')
      .populate('file_id');

    res.status(201).json({
      message: {
        id: populatedMessage._id,
        channel: populatedMessage.channel,
        from: {
          id: populatedMessage.from_id._id,
          name: populatedMessage.from_id.name,
          display_name: populatedMessage.from_id.display_name,
          gender: populatedMessage.from_id.gender,
          avatar: populatedMessage.from_id.avatar,
          cover: populatedMessage.from_id.cover,
          location: populatedMessage.from_id.location,
          vip: populatedMessage.from_id.vip,
          friend: 0,
          block: 0,
          request: 0,
          x: populatedMessage.from_id.x,
          content: populatedMessage.from_id.content,
          cost: 0,
          translate: 0,
          engine: 0,
          online: populatedMessage.from_id.online ? 1 : 0
        },
        to: {
          id: populatedMessage.to_id._id,
          name: populatedMessage.to_id.name,
          display_name: populatedMessage.to_id.display_name,
          gender: populatedMessage.to_id.gender,
          avatar: populatedMessage.to_id.avatar,
          cover: populatedMessage.to_id.cover,
          location: populatedMessage.to_id.location,
          vip: populatedMessage.to_id.vip,
          friend: 0,
          block: 0,
          request: 0,
          x: populatedMessage.to_id.x,
          content: populatedMessage.to_id.content,
          cost: 0,
          translate: 0,
          engine: 0,
          online: populatedMessage.to_id.online ? 1 : 0
        },
        type: populatedMessage.type,
        content: populatedMessage.content,
        translate: populatedMessage.translate,
        engine: populatedMessage.engine,
        cost: populatedMessage.cost,
        file: populatedMessage.file_id ? {
          id: populatedMessage.file_id._id,
          type: populatedMessage.file_id.type,
          charge: populatedMessage.file_id.charge,
          paid: populatedMessage.file_id.paid,
          price: populatedMessage.file_id.price,
          src: populatedMessage.file_id.src,
          w: populatedMessage.file_id.w,
          h: populatedMessage.file_id.h,
          top: populatedMessage.file_id.top,
          thumb: populatedMessage.file_id.thumb,
          duration: populatedMessage.file_id.duration
        } : null,
        created_at: populatedMessage.created_at
      }
    });
  } catch (error) {
    next(error);
  }
};

// 删除消息
const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        code: 404,
        message: '消息不存在',
        field: 'id'
      });
    }

    // 检查权限（只能删除自己发送的消息）
    if (message.from_id.toString() !== userId.toString()) {
      return res.status(403).json({
        code: 403,
        message: '无权删除此消息',
        field: 'id'
      });
    }

    await Message.findByIdAndDelete(id);

    res.status(200).json({
      message: '删除成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMessages,
  getMessagesByChannel,
  createMessage,
  deleteMessage
};
