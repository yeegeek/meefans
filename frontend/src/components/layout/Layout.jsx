import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

function Layout({ children }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                无忧陪伴
              </Link>
              
              {isAuthenticated && (
                <div className="ml-10 flex items-center space-x-4">
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    首页
                  </Link>
                  <Link
                    to="/messages"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    消息
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/user/${user?.name}`}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {user?.display_name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    登出
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    登录
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    注册
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main>{children}</main>

      {/* 页脚 */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 无忧陪伴平台. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
