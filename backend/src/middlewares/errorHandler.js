const errorHandler = (err, req, res, next) => {
  console.error('错误:', err);

  // Mongoose 验证错误
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      code: 400,
      message: errors[0] || '验证失败',
      field: Object.keys(err.errors)[0]
    });
  }

  // Mongoose 重复键错误
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      code: 400,
      message: `${field} 已存在`,
      field: field
    });
  }

  // Mongoose CastError
  if (err.name === 'CastError') {
    return res.status(400).json({
      code: 400,
      message: '无效的ID格式',
      field: err.path
    });
  }

  // 默认错误
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || '服务器内部错误',
    field: err.field || 'server'
  });
};

module.exports = errorHandler;
