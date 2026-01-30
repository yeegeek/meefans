import { useState, useEffect } from 'react';
import { feedService } from '../services/feed';
import FeedCard from '../components/feed/FeedCard';
import CreateFeed from '../components/feed/CreateFeed';

function Home() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('browse');
  const [searchKeyword, setSearchKeyword] = useState('');

  const loadFeeds = async () => {
    setLoading(true);
    try {
      const params = { c: category };
      if (searchKeyword) {
        params.k = searchKeyword;
      }
      
      const response = await feedService.getFeeds(params);
      setFeeds(response.feeds);
    } catch (error) {
      console.error('加载动态失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeeds();
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadFeeds();
  };

  const handleFeedCreated = (newFeed) => {
    setFeeds([newFeed, ...feeds]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 搜索和分类 */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="搜索动态..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              搜索
            </button>
          </div>
        </form>

        <div className="flex gap-4">
          <button
            onClick={() => setCategory('browse')}
            className={`px-4 py-2 rounded-lg ${
              category === 'browse'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            浏览
          </button>
          <button
            onClick={() => setCategory('following')}
            className={`px-4 py-2 rounded-lg ${
              category === 'following'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            关注
          </button>
          <button
            onClick={() => setCategory('popular')}
            className={`px-4 py-2 rounded-lg ${
              category === 'popular'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            热门
          </button>
        </div>
      </div>

      {/* 发布动态 */}
      <CreateFeed onFeedCreated={handleFeedCreated} />

      {/* 动态列表 */}
      <div className="space-y-6 mt-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">加载中...</p>
          </div>
        ) : feeds.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">暂无动态</p>
          </div>
        ) : (
          feeds.map((feed) => (
            <FeedCard key={feed.id} feed={feed} onDelete={() => loadFeeds()} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
