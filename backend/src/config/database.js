const mongoose = require('mongoose');
const config = require('./index');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log('MongoDB 连接成功');
  } catch (error) {
    console.error('MongoDB 连接失败:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB 连接断开');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 错误:', err);
});

module.exports = connectDB;
