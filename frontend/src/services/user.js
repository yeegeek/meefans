import api from './api';

export const userService = {
  // 获取用户信息
  getUser: async (name) => {
    const response = await api.get(`/user/${name}`);
    return response.data;
  },

  // 更新用户信息
  updateUser: async (data) => {
    const response = await api.put('/user', data);
    return response.data;
  },

  // 获取用户动态
  getUserFeeds: async (name, params = {}) => {
    const response = await api.get(`/user/${name}/feeds`, { params });
    return response.data;
  },

  // 添加好友
  addFriend: async (data) => {
    const response = await api.post('/friend', data);
    return response.data;
  },

  // 删除好友
  deleteFriend: async (id) => {
    const response = await api.delete(`/friend/${id}`);
    return response.data;
  },

  // 获取好友列表
  getFriends: async () => {
    const response = await api.get('/friend');
    return response.data;
  },

  // 拉黑用户
  blockUser: async (data) => {
    const response = await api.post('/block', data);
    return response.data;
  },

  // 取消拉黑
  unblockUser: async (id) => {
    const response = await api.delete(`/block/${id}`);
    return response.data;
  },

  // 获取拉黑列表
  getBlocks: async () => {
    const response = await api.get('/block');
    return response.data;
  }
};
