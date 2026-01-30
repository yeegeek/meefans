const Comment = require('../models/Comment');
const Feed = require('../models/Feed');
const Like = require('../models/Like');
const Tip = require('../models/Tip');

// 获取动态评论
const getComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { max_id } = req.query;
    const limit = 20;

    // 获取动态信息
    const feed = await Feed.findById(id)
      .populate('user_id', '-password')
      .populate('files');

    if (!feed) {
      return res.status(404).json({
        code: 404,
        message: '动态不存在',
        field: 'id'
      });
    }

    // 获取评论
    let query = { post_id: id };
    if (max_id) {
      query._id = { $lt: max_id };
    }

    const comments = await Comment.find(query)
      .sort({ created_at: -1 })
      .limit(limit)
      .populate('user_id', '-password')
      .populate('file_id');

    // 获取点赞列表
    const likes = await Like.find({ post_id: id })
      .populate('user_id', '-password')
      .limit(10);

    // 获取打赏列表
    const tips = await Tip.find({ post_id: id })
      .populate('user_id', '-password')
      .limit(10);

    // 获取动态统计
    const liked = await Like.countDocuments({ post_id: id });
    const commented = await Comment.countDocuments({ post_id: id });
    const tipped = tips.length;
    const tipped_amount = tips.reduce((sum, tip) => sum + tip.amount, 0);

    res.status(200).json({
      feed: {
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
          liked,
          commented,
          tipped,
          tipped_amount
        }
      },
      comments: comments.map(comment => ({
        id: comment._id,
        post_id: comment.post_id,
        user: {
          id: comment.user_id._id,
          name: comment.user_id.name,
          display_name: comment.user_id.display_name,
          gender: comment.user_id.gender,
          avatar: comment.user_id.avatar,
          cover: comment.user_id.cover,
          location: comment.user_id.location,
          vip: comment.user_id.vip,
          friend: 0,
          block: 0,
          request: 0,
          x: comment.user_id.x,
          content: comment.user_id.content,
          cost: 0,
          translate: 0,
          engine: 0,
          online: comment.user_id.online ? 1 : 0
        },
        translate: comment.translate,
        engine: comment.engine,
        content: comment.content,
        cost: comment.cost,
        files: comment.file_id ? {
          id: comment.file_id._id,
          type: comment.file_id.type,
          charge: comment.file_id.charge,
          paid: comment.file_id.paid,
          price: comment.file_id.price,
          src: comment.file_id.src,
          w: comment.file_id.w,
          h: comment.file_id.h,
          top: comment.file_id.top,
          thumb: comment.file_id.thumb,
          duration: comment.file_id.duration
        } : null,
        created_at: comment.created_at
      })),
      likes: likes.map(like => ({
        id: like._id,
        user: {
          id: like.user_id._id,
          name: like.user_id.name,
          display_name: like.user_id.display_name,
          gender: like.user_id.gender,
          avatar: like.user_id.avatar,
          cover: like.user_id.cover,
          location: like.user_id.location,
          vip: like.user_id.vip,
          friend: 0,
          block: 0,
          request: 0,
          x: like.user_id.x,
          content: like.user_id.content,
          cost: 0,
          translate: 0,
          engine: 0,
          online: like.user_id.online ? 1 : 0
        }
      })),
      tips: tips.map(tip => ({
        id: tip._id,
        user: {
          id: tip.user_id._id,
          name: tip.user_id.name,
          display_name: tip.user_id.display_name,
          gender: tip.user_id.gender,
          avatar: tip.user_id.avatar,
          cover: tip.user_id.cover,
          location: tip.user_id.location,
          vip: tip.user_id.vip,
          friend: 0,
          block: 0,
          request: 0,
          x: tip.user_id.x,
          content: tip.user_id.content,
          cost: 0,
          translate: 0,
          engine: 0,
          online: tip.user_id.online ? 1 : 0
        },
        amount: tip.amount
      })),
      pagination: {
        next_url: comments.length > 0 ? `/comment/${id}?max_id=${comments[comments.length - 1]._id}` : null,
        next_max_id: comments.length > 0 ? comments[comments.length - 1]._id : null
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

// 发表评论
const createComment = async (req, res, next) => {
  try {
    const { post_id, content, upload_id } = req.body;
    const userId = req.userId;

    // 检查动态是否存在
    const feed = await Feed.findById(post_id);
    if (!feed) {
      return res.status(404).json({
        code: 404,
        message: '动态不存在',
        field: 'post_id'
      });
    }

    // 检查是否允许评论
    if (feed.comment === 0) {
      return res.status(403).json({
        code: 403,
        message: '该动态不允许评论',
        field: 'post_id'
      });
    }

    const comment = new Comment({
      post_id,
      user_id: userId,
      content,
      file_id: upload_id || null
    });

    await comment.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate('user_id', '-password')
      .populate('file_id');

    res.status(201).json({
      comment: {
        id: populatedComment._id,
        post_id: populatedComment.post_id,
        user: {
          id: populatedComment.user_id._id,
          name: populatedComment.user_id.name,
          display_name: populatedComment.user_id.display_name,
          gender: populatedComment.user_id.gender,
          avatar: populatedComment.user_id.avatar,
          cover: populatedComment.user_id.cover,
          location: populatedComment.user_id.location,
          vip: populatedComment.user_id.vip,
          friend: 0,
          block: 0,
          request: 0,
          x: populatedComment.user_id.x,
          content: populatedComment.user_id.content,
          cost: 0,
          translate: 0,
          engine: 0,
          online: populatedComment.user_id.online ? 1 : 0
        },
        translate: populatedComment.translate,
        engine: populatedComment.engine,
        content: populatedComment.content,
        cost: populatedComment.cost,
        files: populatedComment.file_id ? {
          id: populatedComment.file_id._id,
          type: populatedComment.file_id.type,
          charge: populatedComment.file_id.charge,
          paid: populatedComment.file_id.paid,
          price: populatedComment.file_id.price,
          src: populatedComment.file_id.src,
          w: populatedComment.file_id.w,
          h: populatedComment.file_id.h,
          top: populatedComment.file_id.top,
          thumb: populatedComment.file_id.thumb,
          duration: populatedComment.file_id.duration
        } : null,
        created_at: populatedComment.created_at
      }
    });
  } catch (error) {
    next(error);
  }
};

// 删除评论
const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        code: 404,
        message: '评论不存在',
        field: 'id'
      });
    }

    // 检查权限
    if (comment.user_id.toString() !== userId.toString()) {
      return res.status(403).json({
        code: 403,
        message: '无权删除此评论',
        field: 'id'
      });
    }

    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      message: '删除成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment
};
