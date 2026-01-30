const User = require('../models/User');
const VerificationCode = require('../models/VerificationCode');
const { generateToken } = require('../utils/jwt');
const { sendVerificationCode, generateCode } = require('../utils/email');

// 用户注册
const register = async (req, res, next) => {
  try {
    const { email, name, display_name, password, pid } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: existingUser.email === email ? '邮箱已被注册' : '用户名已被使用',
        field: existingUser.email === email ? 'email' : 'name'
      });
    }

    // 创建新用户
    const user = new User({
      email,
      name,
      display_name,
      password,
      pid: pid || 0
    });

    await user.save();

    res.status(201).json({
      message: '注册成功'
    });
  } catch (error) {
    next(error);
  }
};

// 发送验证码
const sendCode = async (req, res, next) => {
  try {
    const { email, name, exists } = req.body;

    // 如果 exists = 1，检查用户是否存在
    if (exists === 1) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          code: 400,
          message: '用户不存在',
          field: 'email'
        });
      }
    } else {
      // 如果 exists = 0，检查用户是否已存在
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          code: 400,
          message: '邮箱已被注册',
          field: 'email'
        });
      }
    }

    // 生成验证码
    const code = generateCode();

    // 保存验证码到数据库
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10分钟后过期
    await VerificationCode.findOneAndUpdate(
      { email },
      { code, expires_at: expiresAt },
      { upsert: true, new: true }
    );

    // 发送验证码邮件
    const result = await sendVerificationCode(email, code);

    if (!result.success) {
      return res.status(500).json({
        code: 500,
        message: '验证码发送失败',
        field: 'email'
      });
    }

    res.status(201).json({
      email,
      code: parseInt(code) // 开发环境返回验证码，生产环境应该移除
    });
  } catch (error) {
    next(error);
  }
};

// 用户登录
const authenticate = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 查找用户
    const user = await User.findOne({
      $or: [{ name }, { email }]
    });

    if (!user) {
      return res.status(400).json({
        code: 400,
        message: '用户名或密码错误',
        field: 'name'
      });
    }

    // 验证密码
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        code: 400,
        message: '用户名或密码错误',
        field: 'password'
      });
    }

    // 生成 token
    const token = generateToken(user._id);

    // 生成 channel（用于消息）
    const channel = `user_${user._id}`;

    // 更新用户在线状态
    user.online = true;
    await user.save();

    res.status(201).json({
      token,
      channel
    });
  } catch (error) {
    next(error);
  }
};

// 用户登出
const logout = async (req, res, next) => {
  try {
    // 更新用户在线状态
    if (req.user) {
      req.user.online = false;
      await req.user.save();
    }

    res.status(200).json({
      message: '登出成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  sendCode,
  authenticate,
  logout
};
