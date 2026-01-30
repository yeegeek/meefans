const mongoose = require('mongoose');
const config = require('../config');
const User = require('../models/User');
const Page = require('../models/Page');

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log('已连接到数据库');

    // 清空现有数据（可选）
    // await User.deleteMany({});
    // await Page.deleteMany({});

    // 创建测试用户
    const users = [
      {
        name: 'testuser1',
        email: 'test1@example.com',
        display_name: 'Test User 1',
        password: 'password123',
        gender: 1,
        location: 'New York',
        content: 'Hello, I am test user 1!'
      },
      {
        name: 'testuser2',
        email: 'test2@example.com',
        display_name: 'Test User 2',
        password: 'password123',
        gender: 2,
        location: 'Los Angeles',
        content: 'Hello, I am test user 2!'
      }
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`创建用户: ${userData.name}`);
      } else {
        console.log(`用户已存在: ${userData.name}`);
      }
    }

    // 创建页脚页面
    const pages = [
      {
        type: 'about',
        content: '# 关于我们\n\n欢迎来到无忧陪伴平台！'
      },
      {
        type: 'policy',
        content: '# 隐私政策\n\n我们重视您的隐私...'
      },
      {
        type: 'terms',
        content: '# 服务条款\n\n使用本平台即表示您同意以下条款...'
      },
      {
        type: 'help',
        content: '# 帮助中心\n\n如有问题，请联系我们...'
      }
    ];

    for (const pageData of pages) {
      const existingPage = await Page.findOne({ type: pageData.type });
      if (!existingPage) {
        const page = new Page(pageData);
        await page.save();
        console.log(`创建页面: ${pageData.type}`);
      } else {
        console.log(`页面已存在: ${pageData.type}`);
      }
    }

    console.log('数据库种子数据创建完成！');
    process.exit(0);
  } catch (error) {
    console.error('创建种子数据失败:', error);
    process.exit(1);
  }
};

seedDatabase();
