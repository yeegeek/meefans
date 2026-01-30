import api from './api';

export const feedService = {
  // 获取动态列表
  getFeeds: async (params = {}) => {
    const response = await api.get('/feeds', { params });
    return response.data;
  },

  // 发布动态
  createFeed: async (data) => {
    const response = await api.post('/feeds', data);
    return response.data;
  },

  // 删除动态
  deleteFeed: async (id) => {
    const response = await api.delete(`/feeds/${id}`);
    return response.data;
  },

  // 获取动态评论
  getComments: async (id, params = {}) => {
    const response = await api.get(`/comment/${id}`, { params });
    return response.data;
  },

  // 发表评论
  createComment: async (data) => {
    const response = await api.post('/comment', data);
    return response.data;
  },

  // 删除评论
  deleteComment: async (id) => {
    const response = await api.delete(`/comment/${id}`);
    return response.data;
  },

  // 点赞
  like: async (data) => {
    const response = await api.post('/like', data);
    return response.data;
  },

  // 取消点赞
  unlike: async (id) => {
    const response = await api.delete(`/like/${id}`);
    return response.data;
  },

  // 打赏
  tip: async (data) => {
    const response = await api.post('/tip', data);
    return response.data;
  }
};
