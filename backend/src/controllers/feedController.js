const Feed = require('../models/Feed');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Tip = require('../models/Tip');
const User = require('../models/User');
const Friend = require('../models/Friend');
const Block = require('../models/Block');

// 获取动态列表
const getFeeds = async (req, res, next) => {
  try {
    const { k, max_id, c = 'browse' } = req.query;
    const limit = 20;
    const userId = req.userId;

    let query = {};

    // 搜索关键字
    if (k) {
      query.content = { $regex: k, $options: 'i' };
    }

    // 分页
    if (max_id) {
      query._id = { $lt: max_id };
    }

    // 分类过滤
    if (c === 'following' && userId) {
      // 获取关注的用户
      const friends = await Friend.find({
        user_id: userId,
        status: 'accepted'
      }).select('friend_id');
      
      const friendIds = friends.map(f => f.friend_id);
      query.user_id = { $in: friendIds };
    } else if (c === 'popular') {
      // 热门动态（可以根据点赞数、评论数等排序）
      // 这里简化处理
    }

    // 获取被拉黑的用户列表
    if (userId) {
      const blocks = await Block.find({ user_id: userId }).select('blocked_id');
      const blockedIds = blocks.map(b => b.blocked_id);
      
      if (blockedIds.length > 0) {
        query.user_id = { ...query.user_id, $nin: blockedIds };
      }
    }

    const feeds = await Feed.find(query)
      .sort({ created_at: -1 })
      .limit(limit)
      .populate('user_id', '-password')
      .populate('files');

    // 获取每个动态的统计信息
    const feedsWithCounter = await Promise.all(feeds.map(async (feed) => {
      const liked = await Like.countDocuments({ post_id: feed._id });
      const commented = await Comment.countDocuments({ post_id: feed._id });
      const tips = await Tip.find({ post_id: feed._id });
      const tipped = tips.length;
      const tipped_amount = tips.reduce((sum, tip) => sum + tip.amount, 0);

      // 检查当前用户是否是好友、是否拉黑等
      let friend = 0;
      let block = 0;
      let request = 0;

      if (userId && feed.user_id._id.toString() !== userId.toString()) {
        const friendRelation = await Friend.findOne({
          user_id: userId,
          friend_id: feed.user_id._id
        });
        
        if (friendRelation) {
          friend = friendRelation.status === 'accepted' ? 1 : 0;
          request = friendRelation.status === 'pending' ? 1 : 0;
        }

        const blockRelation = await Block.findOne({
          user_id: userId,
          blocked_id: feed.user_id._id
        });
        
        block = blockRelation ? 1 : 0;
      }

      return {
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
          friend,
          block,
          request,
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
          liked,
          commented,
          tipped,
          tipped_amount
        }
      };
    }));

    // 分页信息
    const nextMaxId = feeds.length > 0 ? feeds[feeds.length - 1]._id : null;
    const nextUrl = nextMaxId ? `/feeds?max_id=${nextMaxId}` : null;

    res.status(200).json({
      feeds: feedsWithCounter,
      pagination: {
        next_url: nextUrl,
        next_max_id: nextMaxId
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

// 发布动态
const createFeed = async (req, res, next) => {
  try {
    const { upload_ids, charge, comment, content } = req.body;
    const userId = req.userId;

    const feed = new Feed({
      user_id: userId,
      content: content || '',
      files: upload_ids || [],
      comment: comment !== undefined ? comment : 1,
      type: 'post'
    });

    await feed.save();

    // 返回新创建的动态
    const populatedFeed = await Feed.findById(feed._id)
      .populate('user_id', '-password')
      .populate('files');

    res.status(201).json({
      feeds: [{
        id: populatedFeed._id,
        user: {
          id: populatedFeed.user_id._id,
          name: populatedFeed.user_id.name,
          display_name: populatedFeed.user_id.display_name,
          gender: populatedFeed.user_id.gender,
          avatar: populatedFeed.user_id.avatar,
          cover: populatedFeed.user_id.cover,
          location: populatedFeed.user_id.location,
          vip: populatedFeed.user_id.vip,
          friend: 0,
          block: 0,
          request: 0,
          x: populatedFeed.user_id.x,
          content: populatedFeed.user_id.content,
          cost: 0,
          translate: 0,
          engine: 0,
          online: populatedFeed.user_id.online ? 1 : 0
        },
        type: populatedFeed.type,
        created_at: populatedFeed.created_at,
        files: populatedFeed.files.map(file => ({
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
        comment: populatedFeed.comment,
        translate: populatedFeed.translate,
        engine: populatedFeed.engine,
        content: populatedFeed.content,
        cost: populatedFeed.cost,
        top: populatedFeed.top,
        counter: {
          liked: 0,
          commented: 0,
          tipped: 0,
          tipped_amount: 0
        }
      }],
      bench: {
        time: '0.1s',
        memory: '10MB'
      }
    });
  } catch (error) {
    next(error);
  }
};

// 删除动态
const deleteFeed = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const feed = await Feed.findById(id);

    if (!feed) {
      return res.status(404).json({
        code: 404,
        message: '动态不存在',
        field: 'id'
      });
    }

    // 检查权限
    if (feed.user_id.toString() !== userId.toString()) {
      return res.status(403).json({
        code: 403,
        message: '无权删除此动态',
        field: 'id'
      });
    }

    await Feed.findByIdAndDelete(id);

    res.status(200).json({
      message: '删除成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFeeds,
  createFeed,
  deleteFeed
};
