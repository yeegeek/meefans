import api from './api';

export const messageService = {
  // 获取消息列表
  getMessages: async () => {
    const response = await api.get('/messages');
    return response.data;
  },

  // 获取对话消息
  getMessagesByChannel: async (channel, params = {}) => {
    const response = await api.get(`/message/${channel}`, { params });
    return response.data;
  },

  // 发送消息
  sendMessage: async (data) => {
    const response = await api.post('/message', data);
    return response.data;
  },

  // 删除消息
  deleteMessage: async (id) => {
    const response = await api.delete(`/message/${id}`);
    return response.data;
  }
};
