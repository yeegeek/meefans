const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const User = require('../src/models/User');
const Feed = require('../src/models/Feed');

let mongoServer;
let token;
let userId;

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
  await Feed.deleteMany({});

  // 创建测试用户并登录
  const user = new User({
    email: 'test@example.com',
    name: 'testuser',
    display_name: 'Test User',
    password: 'password123'
  });
  await user.save();
  userId = user._id;

  const loginResponse = await request(app)
    .post('/authenticate')
    .send({
      name: 'testuser',
      password: 'password123'
    });

  token = loginResponse.body.token;
});

describe('动态 API 测试', () => {
  describe('POST /feeds', () => {
    it('应该成功发布动态', async () => {
      const feedData = {
        content: 'This is a test post',
        upload_ids: [],
        charge: 0,
        comment: 1
      };

      const response = await request(app)
        .post('/feeds')
        .set('Authorization', `Bearer ${token}`)
        .send(feedData)
        .expect(201);

      expect(response.body.feeds).toBeTruthy();
      expect(response.body.feeds[0].content).toBe(feedData.content);

      const feed = await Feed.findOne({ content: feedData.content });
      expect(feed).toBeTruthy();
    });

    it('应该拒绝未认证的请求', async () => {
      const feedData = {
        content: 'This is a test post',
        upload_ids: [],
        charge: 0,
        comment: 1
      };

      await request(app)
        .post('/feeds')
        .send(feedData)
        .expect(401);
    });
  });

  describe('GET /feeds', () => {
    beforeEach(async () => {
      // 创建测试动态
      const feed1 = new Feed({
        user_id: userId,
        content: 'Test post 1',
        type: 'post'
      });
      await feed1.save();

      const feed2 = new Feed({
        user_id: userId,
        content: 'Test post 2',
        type: 'post'
      });
      await feed2.save();
    });

    it('应该返回动态列表', async () => {
      const response = await request(app)
        .get('/feeds')
        .expect(200);

      expect(response.body.feeds).toBeTruthy();
      expect(response.body.feeds.length).toBeGreaterThan(0);
      expect(response.body.pagination).toBeTruthy();
    });

    it('应该支持搜索功能', async () => {
      const response = await request(app)
        .get('/feeds?k=post 1')
        .expect(200);

      expect(response.body.feeds).toBeTruthy();
      expect(response.body.feeds.length).toBeGreaterThan(0);
      expect(response.body.feeds[0].content).toContain('post 1');
    });
  });

  describe('DELETE /feeds/:id', () => {
    let feedId;

    beforeEach(async () => {
      const feed = new Feed({
        user_id: userId,
        content: 'Test post to delete',
        type: 'post'
      });
      await feed.save();
      feedId = feed._id;
    });

    it('应该成功删除自己的动态', async () => {
      await request(app)
        .delete(`/feeds/${feedId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const feed = await Feed.findById(feedId);
      expect(feed).toBeNull();
    });

    it('应该拒绝删除不存在的动态', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .delete(`/feeds/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});
