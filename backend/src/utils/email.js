const nodemailer = require('nodemailer');
const config = require('../config');

// 创建邮件传输器
const createTransporter = () => {
  if (!config.email.host || !config.email.user) {
    console.warn('邮件配置未设置，将使用模拟发送');
    return null;
  }

  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  });
};

// 发送验证码邮件
const sendVerificationCode = async (email, code) => {
  const transporter = createTransporter();

  if (!transporter) {
    // 开发环境模拟发送
    console.log(`[模拟发送] 验证码邮件发送到 ${email}: ${code}`);
    return { success: true, code };
  }

  try {
    await transporter.sendMail({
      from: config.email.user,
      to: email,
      subject: '无忧陪伴平台 - 验证码',
      html: `
        <h2>验证码</h2>
        <p>您的验证码是: <strong>${code}</strong></p>
        <p>验证码有效期为 10 分钟。</p>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('邮件发送失败:', error);
    return { success: false, error: error.message };
  }
};

// 生成验证码
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
  sendVerificationCode,
  generateCode
};
