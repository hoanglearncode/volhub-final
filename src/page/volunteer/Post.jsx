import React, { useState, useEffect } from 'react';
import { 
  User, Calendar, Clock, Eye, Heart, MessageCircle, Share2, 
  Bookmark, ChevronLeft, ChevronRight, Tag, Facebook, 
  Twitter, Link, Mail, ArrowUp, ThumbsUp, Reply, 
  MoreHorizontal, Flag, Award, CheckCircle, Send
} from 'lucide-react';

const BlogPostDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock data cho bài viết
  const post = {
    id: 1,
    title: "Hướng dẫn tham gia hoạt động tình nguyện hiệu quả cho sinh viên mới",
    content: "Khám phá cách thức tham gia các hoạt động tình nguyện một cách hiệu quả và ý nghĩa dành riêng cho sinh viên.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop",
    auther : {
      author: "Nguyễn Thị Minh",
      authorAvatar: "",
      authorBio: "Chuyên gia tư vấn phát triển sinh viên với 8 năm kinh nghiệm trong lĩnh vực giáo dục và tình nguyện.",
      slugBio: ''
    },
    date: "2024-12-20T10:30:00Z",
    category: "Hướng dẫn",
    tags: ["tình nguyện", "sinh viên", "kỹ năng mềm", "phát triển cá nhân"],
    views: 2547,
    likes: 156,
    comments: 23,
    featured: true,
  };

  const relatedPosts = [
    {
      id: 2,
      title: "10 kỹ năng cần thiết cho tình nguyện viên",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=300&h=200&fit=crop",
      category: "Kỹ năng",
      readTime: "5 phút",
      date: "2024-12-18T14:20:00Z"
    },
    {
      id: 3,
      title: "Cách xây dựng hồ sơ tình nguyện ấn tượng",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", 
      category: "CV & Hồ sơ",
      readTime: "6 phút",
      date: "2024-12-16T09:15:00Z"
    },
    {
      id: 4,
      title: "Những sai lầm thường gặp khi tham gia tình nguyện",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&h=200&fit=crop",
      category: "Kinh nghiệm",
      readTime: "7 phút", 
      date: "2024-12-14T16:45:00Z"
    }
  ];

  const comments = [
    {
      id: 1,
      author: "Trần Văn An",
      avatar: "👨‍💼",
      content: "Bài viết rất bổ ích! Mình đã tham gia nhiều hoạt động tình nguyện và thực sự cảm thấy bản thân phát triển rất nhiều.",
      date: "2024-12-20T15:30:00Z",
      likes: 12,
      replies: []
    },
    {
      id: 2,
      author: "Phạm Thị Lan",
      avatar: "👩‍🎓",
      content: "Cảm ơn tác giả đã chia sẻ! Mình là sinh viên năm 2 và đang muốn tìm hiểu về các hoạt động tình nguyện phù hợp.",
      date: "2024-12-20T14:15:00Z", 
      likes: 8,
      replies: [
        {
          id: 3,
          author: "Nguyễn Thị Minh",
          avatar: "👩‍🎓",
          content: "Chào Lan! Bạn có thể tham khảo các tổ chức tình nguyện uy tín như Quỹ Tấm Lòng Vàng, Saigon Children's Charity. Chúc bạn tìm được hoạt động phù hợp!",
          date: "2024-12-20T14:45:00Z",
          likes: 5,
          isAuthor: true
        }
      ]
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post.title;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Đã sao chép liên kết!');
        break;
    }
    setShowShareModal(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Breadcrumb */}
        <div className="absolute top-6 left-6">
          <nav className="flex items-center space-x-2 text-white/90 text-sm">
            <a href="/" className="hover:text-white transition-colors">Trang chủ</a>
            <ChevronRight size={16} />
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <ChevronRight size={16} />
            <span className="text-white font-medium">Hướng dẫn</span>
          </nav>
        </div>

        {/* Category & Featured Badge */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
            {post.category}
          </span>
          {post.featured && (
            <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
              <Award size={14} />
              Nổi bật
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <main className="md:col-span-8">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Article Header */}
              <div className="p-8 border-b border-gray-100">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{post.authorAvatar}</span>
                    <div>
                      <span className="font-medium text-gray-900">{post.author}</span>
                      <div className="flex items-center gap-1 text-xs">
                        <CheckCircle size={12} className="text-blue-500" />
                        Tác giả được xác thực
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    {post.views.toLocaleString()} lượt xem
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isLiked 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                      {post.likes + (isLiked ? 1 : 0)}
                    </button>
                    
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isBookmarked 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
                      Lưu
                    </button>
                  </div>

                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                  >
                    <Share2 size={16} />
                    Chia sẻ
                  </button>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:text-blue-900"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{post.authorAvatar}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{post.author}</h3>
                    <p className="text-gray-600 mb-4">{post.authorBio}</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Theo dõi tác giả
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="p-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Bình luận ({comments.length})
                  </h3>
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {showComments ? 'Ẩn' : 'Hiện'} bình luận
                  </button>
                </div>

                {/* Comment Form */}
                <div className="mb-8">
                  <div className="flex gap-4">
                    <span className="text-2xl">👤</span>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Chia sẻ suy nghĩ của bạn..."
                        className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                      />
                      <div className="flex justify-end mt-3">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                          <Send size={16} />
                          Gửi bình luận
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                {showComments && (
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-4">
                        <div className="flex gap-4">
                          <span className="text-2xl">{comment.avatar}</span>
                          <div className="flex-1 bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                {comment.author}
                                {comment.isAuthor && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    Tác giả
                                  </span>
                                )}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {formatDateTime(comment.date)}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-3">{comment.content}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
                                <ThumbsUp size={14} />
                                {comment.likes}
                              </button>
                              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
                                <Reply size={14} />
                                Trả lời
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                <MoreHorizontal size={14} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="ml-12 space-y-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-4">
                                <span className="text-xl">{reply.avatar}</span>
                                <div className="flex-1 bg-blue-50 rounded-xl p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                      {reply.author}
                                      {reply.isAuthor && (
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                          Tác giả
                                        </span>
                                      )}
                                    </h5>
                                    <span className="text-xs text-gray-500">
                                      {formatDateTime(reply.date)}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 mb-3">{reply.content}</p>
                                  <div className="flex items-center gap-4 text-sm">
                                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
                                      <ThumbsUp size={14} />
                                      {reply.likes}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 space-y-8">
              {/* Related Posts */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bài viết liên quan</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.id} className="group cursor-pointer">
                      <div className="flex gap-3">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {relatedPost.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <span>{relatedPost.category}</span>
                            <span>•</span>
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Đăng ký nhận tin</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Nhận những bài viết mới nhất về tình nguyện và phát triển cá nhân
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  />
                  <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                    Đăng ký ngay
                  </button>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tags phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                  {['tình nguyện', 'sinh viên', 'kỹ năng', 'phát triển', 'cộng đồng', 'kinh nghiệm', 'CV'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Chia sẻ bài viết</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook size={20} />
                Chia sẻ lên Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                <Twitter size={20} />
                Chia sẻ lên Twitter
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="w-full flex items-center gap-3 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Link size={20} />
                Sao chép liên kết
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default BlogPostDetail;