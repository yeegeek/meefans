import { useState } from 'react';
import { Link } from 'react-router-dom';
import { feedService } from '../../services/feed';
import { useAuthStore } from '../../store/useAuthStore';

function FeedCard({ feed, onDelete }) {
  const user = useAuthStore((state) => state.user);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        // 取消点赞逻辑
        setLiked(false);
      } else {
        await feedService.like({ post_id: feed.id });
        setLiked(true);
      }
    } catch (error) {
      console.error('点赞失败:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('确定要删除这条动态吗？')) return;
    
    try {
      await feedService.deleteFeed(feed.id);
      onDelete && onDelete();
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* 用户信息 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Link to={`/user/${feed.user.name}`}>
            {feed.user.avatar ? (
              <img
                src={feed.user.avatar}
                alt={feed.user.display_name}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-white text-xl">{feed.user.display_name[0]}</span>
              </div>
            )}
          </Link>
          <div className="ml-3">
            <Link to={`/user/${feed.user.name}`} className="font-semibold hover:underline">
              {feed.user.display_name}
            </Link>
            <p className="text-sm text-gray-500">{feed.created_at}</p>
          </div>
        </div>
        
        {user && user.name === feed.user.name && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            删除
          </button>
        )}
      </div>

      {/* 动态内容 */}
      <div className="mb-4">
        <p className="text-gray-800 whitespace-pre-wrap">{feed.content}</p>
      </div>

      {/* 图片/视频 */}
      {feed.files && feed.files.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {feed.files.map((file) => (
            <div key={file.id}>
              {file.type === 'image' ? (
                <img
                  src={file.src}
                  alt=""
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <video
                  src={file.src}
                  controls
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 互动按钮 */}
      <div className="flex items-center gap-6 text-gray-600 border-t pt-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 hover:text-blue-600 ${
            liked ? 'text-blue-600' : ''
          }`}
        >
          <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{feed.counter?.liked || 0}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{feed.counter?.commented || 0}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-blue-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{feed.counter?.tipped || 0}</span>
        </button>
      </div>

      {/* 评论区域 */}
      {showComments && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-gray-500 text-sm">评论功能开发中...</p>
        </div>
      )}
    </div>
  );
}

export default FeedCard;
