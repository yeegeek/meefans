import api from './api';

export const uploadService = {
  // 上传文件
  uploadFile: async (file, options = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (options.charge !== undefined) {
      formData.append('charge', options.charge);
    }
    if (options.price !== undefined) {
      formData.append('price', options.price);
    }

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
};
