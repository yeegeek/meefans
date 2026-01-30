const Friend = require('../models/Friend');
const Block = require('../models/Block');
const User = require('../models/User');

// 添加好友
const createFriend = async (req, res, next) => {
  try {
    const { friend_id } = req.body;
    const userId = req.userId;

    // 不能添加自己为好友
    if (friend_id === userId.toString()) {
      return res.status(400).json({
        code: 400,
        message: '不能添加自己为好友',
        field: 'friend_id'
      });
    }

    // 检查用户是否存在
    const friendUser = await User.findById(friend_id);
    if (!friendUser) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        field: 'friend_id'
      });
    }

    // 检查是否已经是好友
    const existingFriend = await Friend.findOne({
      user_id: userId,
      friend_id
    });

    if (existingFriend) {
      return res.status(400).json({
        code: 400,
        message: existingFriend.status === 'accepted' ? '已经是好友了' : '好友请求已发送',
        field: 'friend_id'
      });
    }

    const friend = new Friend({
      user_id: userId,
      friend_id,
      status: 'pending'
    });

    await friend.save();

    res.status(201).json({
      message: '好友请求已发送',
      friend: {
        id: friend._id,
        user_id: friend.user_id,
        friend_id: friend.friend_id,
        status: friend.status
      }
    });
  } catch (error) {
    next(error);
  }
};

// 删除好友
const deleteFriend = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const friend = await Friend.findById(id);

    if (!friend) {
      return res.status(404).json({
        code: 404,
        message: '好友关系不存在',
        field: 'id'
      });
    }

    // 检查权限
    if (friend.user_id.toString() !== userId.toString()) {
      return res.status(403).json({
        code: 403,
        message: '无权删除此好友关系',
        field: 'id'
      });
    }

    await Friend.findByIdAndDelete(id);

    res.status(200).json({
      message: '删除成功'
    });
  } catch (error) {
    next(error);
  }
};

// 获取好友列表
const getFriends = async (req, res, next) => {
  try {
    const userId = req.userId;

    const friends = await Friend.find({
      user_id: userId,
      status: 'accepted'
    }).populate('friend_id', '-password');

    res.status(200).json({
      friends: friends.map(f => ({
        id: f._id,
        user: {
          id: f.friend_id._id,
          name: f.friend_id.name,
          display_name: f.friend_id.display_name,
          gender: f.friend_id.gender,
          avatar: f.friend_id.avatar,
          cover: f.friend_id.cover,
          location: f.friend_id.location,
          vip: f.friend_id.vip,
          friend: 1,
          block: 0,
          request: 0,
          x: f.friend_id.x,
          content: f.friend_id.content,
          cost: 0,
          translate: 0,
          engine: 0,
          online: f.friend_id.online ? 1 : 0
        }
      }))
    });
  } catch (error) {
    next(error);
  }
};

// 拉黑用户
const createBlock = async (req, res, next) => {
  try {
    const { blocked_id } = req.body;
    const userId = req.userId;

    // 不能拉黑自己
    if (blocked_id === userId.toString()) {
      return res.status(400).json({
        code: 400,
        message: '不能拉黑自己',
        field: 'blocked_id'
      });
    }

    // 检查用户是否存在
    const blockedUser = await User.findById(blocked_id);
    if (!blockedUser) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        field: 'blocked_id'
      });
    }

    // 检查是否已经拉黑
    const existingBlock = await Block.findOne({
      user_id: userId,
      blocked_id
    });

    if (existingBlock) {
      return res.status(400).json({
        code: 400,
        message: '已经拉黑过了',
        field: 'blocked_id'
      });
    }

    const block = new Block({
      user_id: userId,
      blocked_id
    });

    await block.save();

    res.status(201).json({
      message: '拉黑成功',
      block: {
        id: block._id,
        user_id: block.user_id,
        blocked_id: block.blocked_id
      }
    });
  } catch (error) {
    next(error);
  }
};

// 取消拉黑
const deleteBlock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const block = await Block.findById(id);

    if (!block) {
      return res.status(404).json({
        code: 404,
        message: '拉黑关系不存在',
        field: 'id'
      });
    }

    // 检查权限
    if (block.user_id.toString() !== userId.toString()) {
      return res.status(403).json({
        code: 403,
        message: '无权取消此拉黑关系',
        field: 'id'
      });
    }

    await Block.findByIdAndDelete(id);

    res.status(200).json({
      message: '取消拉黑成功'
    });
  } catch (error) {
    next(error);
  }
};

// 获取拉黑列表
const getBlocks = async (req, res, next) => {
  try {
    const userId = req.userId;

    const blocks = await Block.find({ user_id: userId })
      .populate('blocked_id', '-password');

    res.status(200).json({
      blocks: blocks.map(b => ({
        id: b._id,
        user: {
          id: b.blocked_id._id,
          name: b.blocked_id.name,
          display_name: b.blocked_id.display_name,
          gender: b.blocked_id.gender,
          avatar: b.blocked_id.avatar,
          cover: b.blocked_id.cover,
          location: b.blocked_id.location,
          vip: b.blocked_id.vip,
          friend: 0,
          block: 1,
          request: 0,
          x: b.blocked_id.x,
          content: b.blocked_id.content,
          cost: 0,
          translate: 0,
          engine: 0,
          online: b.blocked_id.online ? 1 : 0
        }
      }))
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFriend,
  deleteFriend,
  getFriends,
  createBlock,
  deleteBlock,
  getBlocks
};
