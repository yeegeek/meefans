const File = require('../models/File');
const path = require('path');

// 上传文件
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        code: 400,
        message: '没有上传文件',
        field: 'file'
      });
    }

    const userId = req.userId;
    const { charge, price } = req.body;

    // 确定文件类型
    const ext = path.extname(req.file.originalname).toLowerCase();
    let fileType = 'image';
    if (['.mp4', '.mov', '.avi', '.webm'].includes(ext)) {
      fileType = 'video';
    }

    // 创建文件记录
    const file = new File({
      user_id: userId,
      type: fileType,
      charge: charge || 0,
      price: price || 0,
      src: `/uploads/${req.file.filename}`,
      thumb: `/uploads/${req.file.filename}`, // 简化处理，实际应该生成缩略图
      w: 0,
      h: 0,
      duration: 0
    });

    await file.save();

    res.status(201).json({
      file: {
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
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile
};
