const User = require('../models/User');
const Feed = require('../models/Feed');
const Friend = require('../models/Friend');
const Block = require('../models/Block');

// 获取用户信息
const getUser = async (req, res, next) => {
  try {
    const { name } = req.params;
    const userId = req.userId;

    const user = await User.findOne({ name }).select('-password');

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        field: 'name'
      });
    }

    // 检查好友关系
    let friend = 0;
    let block = 0;
    let request = 0;

    if (userId && user._id.toString() !== userId.toString()) {
      const friendRelation = await Friend.findOne({
        user_id: userId,
        friend_id: user._id
      });
      
      if (friendRelation) {
        friend = friendRelation.status === 'accepted' ? 1 : 0;
        request = friendRelation.status === 'pending' ? 1 : 0;
      }

      const blockRelation = await Block.findOne({
        user_id: userId,
        blocked_id: user._id
      });
      
      block = blockRelation ? 1 : 0;
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        display_name: user.display_name,
        gender: user.gender,
        avatar: user.avatar,
        cover: user.cover,
        location: user.location,
        vip: user.vip,
        friend,
        block,
        request,
        x: user.x,
        content: user.content,
        cost: 0,
        translate: 0,
        engine: 0,
        online: user.online ? 1 : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// 更新用户信息
const updateUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { display_name, gender, avatar, cover, location, content } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        field: 'user'
      });
    }

    // 更新字段
    if (display_name !== undefined) user.display_name = display_name;
    if (gender !== undefined) user.gender = gender;
    if (avatar !== undefined) user.avatar = avatar;
    if (cover !== undefined) user.cover = cover;
    if (location !== undefined) user.location = location;
    if (content !== undefined) user.content = content;

    await user.save();

    res.status(200).json({
      message: '更新成功',
      user: {
        id: user._id,
        name: user.name,
        display_name: user.display_name,
        gender: user.gender,
        avatar: user.avatar,
        cover: user.cover,
        location: user.location,
        vip: user.vip,
        friend: 0,
        block: 0,
        request: 0,
        x: user.x,
        content: user.content,
        cost: 0,
        translate: 0,
        engine: 0,
        online: user.online ? 1 : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// 获取用户动态
const getUserFeeds = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { max_id } = req.query;
    const limit = 20;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        field: 'name'
      });
    }

    let query = { user_id: user._id };
    if (max_id) {
      query._id = { $lt: max_id };
    }

    const feeds = await Feed.find(query)
      .sort({ created_at: -1 })
      .limit(limit)
      .populate('user_id', '-password')
      .populate('files');

    const feedsData = feeds.map(feed => ({
      id: feed._id,
      user: {
        id: feed.user_id._id,
        name: feed.user_id.name,
        display_name: feed.user_id.display_name,
        gender: feed.user_id.gender,
        avatar: feed.user_id.avatar,
        cover: feed.user_id.cover,
        location: feed.user_id.location,
        vip: feed.user_id.vip,
        friend: 0,
        block: 0,
        request: 0,
        x: feed.user_id.x,
        content: feed.user_id.content,
        cost: 0,
        translate: 0,
        engine: 0,
        online: feed.user_id.online ? 1 : 0
      },
      type: feed.type,
      created_at: feed.created_at,
      files: feed.files.map(file => ({
        id: file._id,
        type: file.type,
        charge: file.charge,
        paid: file.paid,
        price: file.price,
        src: file.src,
        w: file.w,
        h: file.h,
        top: file.top,
        thumb: file.thumb,
        duration: file.duration
      })),
      comment: feed.comment,
      translate: feed.translate,
      engine: feed.engine,
      content: feed.content,
      cost: feed.cost,
      top: feed.top,
      counter: {
        liked: 0,
        commented: 0,
        tipped: 0,
        tipped_amount: 0
      }
    }));

    res.status(200).json({
      feeds: feedsData,
      pagination: {
        next_url: feeds.length > 0 ? `/user/${name}/feeds?max_id=${feeds[feeds.length - 1]._id}` : null,
        next_max_id: feeds.length > 0 ? feeds[feeds.length - 1]._id : null
      },
      bench: {
        time: '0.1s',
        memory: '10MB'
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  getUserFeeds
};
