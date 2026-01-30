import { useState } from 'react';
import { feedService } from '../../services/feed';
import { uploadService } from '../../services/upload';

function CreateFeed({ onFeedCreated }) {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(file => uploadService.uploadFile(file));
      const uploadedFiles = await Promise.all(uploadPromises);
      setFiles([...files, ...uploadedFiles.map(f => f.file)]);
    } catch (error) {
      console.error('文件上传失败:', error);
      alert('文件上传失败');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() && files.length === 0) {
      alert('请输入内容或上传文件');
      return;
    }

    setPosting(true);

    try {
      const response = await feedService.createFeed({
        content,
        upload_ids: files.map(f => f.id),
        charge: 0,
        comment: 1
      });

      if (response.feeds && response.feeds.length > 0) {
        onFeedCreated && onFeedCreated(response.feeds[0]);
        setContent('');
        setFiles([]);
      }
    } catch (error) {
      console.error('发布失败:', error);
      alert('发布失败');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="4"
          placeholder="分享你的想法..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 已上传的文件预览 */}
        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {files.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={file.src}
                  alt=""
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <label className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
              {uploading ? '上传中...' : '📷 上传图片/视频'}
            </label>
          </div>

          <button
            type="submit"
            disabled={posting || uploading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {posting ? '发布中...' : '发布'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateFeed;
