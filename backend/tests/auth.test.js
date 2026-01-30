const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const User = require('../src/models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('认证 API 测试', () => {
  describe('POST /register', () => {
    it('应该成功注册新用户', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'testuser',
        display_name: 'Test User',
        password: 'password123'
      };

      const response = await request(app)
        .post('/register')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe('注册成功');

      const user = await User.findOne({ email: userData.email });
      expect(user).toBeTruthy();
      expect(user.name).toBe(userData.name);
    });

    it('应该拒绝重复的邮箱', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'testuser',
        display_name: 'Test User',
        password: 'password123'
      };

      await request(app).post('/register').send(userData);

      const response = await request(app)
        .post('/register')
        .send({ ...userData, name: 'testuser2' })
        .expect(400);

      expect(response.body.message).toContain('邮箱');
    });

    it('应该拒绝重复的用户名', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'testuser',
        display_name: 'Test User',
        password: 'password123'
      };

      await request(app).post('/register').send(userData);

      const response = await request(app)
        .post('/register')
        .send({ ...userData, email: 'test2@example.com' })
        .expect(400);

      expect(response.body.message).toContain('用户名');
    });
  });

  describe('POST /authenticate', () => {
    beforeEach(async () => {
      const user = new User({
        email: 'test@example.com',
        name: 'testuser',
        display_name: 'Test User',
        password: 'password123'
      });
      await user.save();
    });

    it('应该成功登录', async () => {
      const response = await request(app)
        .post('/authenticate')
        .send({
          name: 'testuser',
          password: 'password123'
        })
        .expect(201);

      expect(response.body.token).toBeTruthy();
      expect(response.body.channel).toBeTruthy();
    });

    it('应该拒绝错误的密码', async () => {
      const response = await request(app)
        .post('/authenticate')
        .send({
          name: 'testuser',
          password: 'wrongpassword'
        })
        .expect(400);

      expect(response.body.message).toContain('密码');
    });

    it('应该拒绝不存在的用户', async () => {
      const response = await request(app)
        .post('/authenticate')
        .send({
          name: 'nonexistent',
          password: 'password123'
        })
        .expect(400);

      expect(response.body.message).toBeTruthy();
    });
  });

  describe('POST /logout', () => {
    let token;

    beforeEach(async () => {
      const user = new User({
        email: 'test@example.com',
        name: 'testuser',
        display_name: 'Test User',
        password: 'password123'
      });
      await user.save();

      const loginResponse = await request(app)
        .post('/authenticate')
        .send({
          name: 'testuser',
          password: 'password123'
        });

      token = loginResponse.body.token;
    });

    it('应该成功登出', async () => {
      const response = await request(app)
        .post('/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.message).toBe('登出成功');
    });

    it('应该拒绝未认证的请求', async () => {
      await request(app)
        .post('/logout')
        .expect(401);
    });
  });
});
