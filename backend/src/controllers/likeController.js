const Like = require('../models/Like');
const Tip = require('../models/Tip');
const Feed = require('../models/Feed');

// 点赞
const createLike = async (req, res, next) => {
  try {
    const { post_id } = req.body;
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

    // 检查是否已经点赞
    const existingLike = await Like.findOne({ post_id, user_id: userId });
    if (existingLike) {
      return res.status(400).json({
        code: 400,
        message: '已经点赞过了',
        field: 'post_id'
      });
    }

    const like = new Like({
      post_id,
      user_id: userId
    });

    await like.save();

    res.status(201).json({
      message: '点赞成功',
      like: {
        id: like._id,
        post_id: like.post_id,
        user_id: like.user_id
      }
    });
  } catch (error) {
    next(error);
  }
};

// 取消点赞
const deleteLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const like = await Like.findById(id);

    if (!like) {
      return res.status(404).json({
        code: 404,
        message: '点赞不存在',
        field: 'id'
      });
    }

    // 检查权限
    if (like.user_id.toString() !== userId.toString()) {
      return res.status(403).json({
        code: 403,
        message: '无权取消此点赞',
        field: 'id'
      });
    }

    await Like.findByIdAndDelete(id);

    res.status(200).json({
      message: '取消点赞成功'
    });
  } catch (error) {
    next(error);
  }
};

// 打赏
const createTip = async (req, res, next) => {
  try {
    const { post_id, amount } = req.body;
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

    // 验证打赏金额
    if (!amount || amount <= 0) {
      return res.status(400).json({
        code: 400,
        message: '打赏金额必须大于0',
        field: 'amount'
      });
    }

    const tip = new Tip({
      post_id,
      user_id: userId,
      amount
    });

    await tip.save();

    res.status(201).json({
      message: '打赏成功',
      tip: {
        id: tip._id,
        post_id: tip.post_id,
        user_id: tip.user_id,
        amount: tip.amount
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLike,
  deleteLike,
  createTip
};
