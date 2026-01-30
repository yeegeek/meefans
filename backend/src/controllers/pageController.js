const Page = require('../models/Page');
const Notification = require('../models/Notification');

// 获取页脚页面
const getPages = async (req, res, next) => {
  try {
    const pages = await Page.find();

    const result = {
      about: { content: '', updated_at: '' },
      policy: { content: '', updated_at: '' },
      terms: { content: '', updated_at: '' },
      help: { content: '', updated_at: '' }
    };

    pages.forEach(page => {
      result[page.type] = {
        content: page.content,
        updated_at: page.updated_at
      };
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// 获取通知列表
const getNotifications = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { max_id } = req.query;
    const limit = 20;

    let query = { user_id: userId };
    if (max_id) {
      query._id = { $lt: max_id };
    }

    const notifications = await Notification.find(query)
      .sort({ created_at: -1 })
      .limit(limit);

    res.status(200).json({
      notifications: notifications.map(n => ({
        id: n._id,
        type: n.type,
        content: n.content,
        related_id: n.related_id,
        read: n.read,
        created_at: n.created_at
      })),
      pagination: {
        next_url: notifications.length > 0 ? `/notification?max_id=${notifications[notifications.length - 1]._id}` : null,
        next_max_id: notifications.length > 0 ? notifications[notifications.length - 1]._id : null
      }
    });
  } catch (error) {
    next(error);
  }
};

// 标记通知为已读
const markNotificationAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        code: 404,
        message: '通知不存在',
        field: 'id'
      });
    }

    // 检查权限
    if (notification.user_id.toString() !== userId.toString()) {
      return res.status(403).json({
        code: 403,
        message: '无权操作此通知',
        field: 'id'
      });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({
      message: '标记成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPages,
  getNotifications,
  markNotificationAsRead
};
