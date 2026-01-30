import api from './api';

export const authService = {
  // 用户注册
  register: async (data) => {
    const response = await api.post('/register', data);
    return response.data;
  },

  // 发送验证码
  sendCode: async (data) => {
    const response = await api.post('/code', data);
    return response.data;
  },

  // 用户登录
  login: async (data) => {
    const response = await api.post('/authenticate', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('channel', response.data.channel);
    }
    return response.data;
  },

  // 用户登出
  logout: async () => {
    try {
      await api.post('/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('channel');
      localStorage.removeItem('user');
    }
  },

  // 获取当前用户信息
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // 保存用户信息
  saveUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // 检查是否已登录
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
