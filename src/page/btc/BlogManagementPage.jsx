import React, { useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit3,
  Trash2,
  User,
  Heart,
  MessageCircle,
  MoreVertical,
  XCircle,
  Upload,
  Download
} from 'lucide-react';

export default function BlogManagementMobile({
  initialPosts = null,
  initialCategories = null,
  initialAuthors = null
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ status: 'all', category: 'all' });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const samplePosts = [
    {
      id: 1,
      title: 'Hướng dẫn tham gia hoạt động tình nguyện cho người mới',
      excerpt: 'Bài viết hướng dẫn chi tiết cho những người mới bắt đầu tham gia các hoạt động tình nguyện...',
      featuredImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
      status: 'published',
      author: { name: 'Nguyễn Văn A' },
      category: { name: 'Hướng dẫn', slug: 'huong-dan' },
      publishedAt: '2024-12-01T10:00:00',
      views: 1250,
      likes: 89,
      comments: 23,
      readTime: 8
    },
    {
      id: 2,
      title: 'Kinh nghiệm quản lý đội nhóm CTV hiệu quả',
      excerpt: 'Những kinh nghiệm thực tế trong việc quản lý và điều phối đội nhóm cộng tác viên...',
      featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
      status: 'draft',
      author: { name: 'Trần Thị Mai' },
      category: { name: 'Quản lý', slug: 'quan-ly' },
      publishedAt: null,
      views: 0,
      likes: 0,
      comments: 0,
      readTime: 12
    },
    {
      id: 3,
      title: '10 Mẹo tổ chức sự kiện cộng đồng thành công',
      excerpt: 'Các bí quyết giúp sự kiện cộng đồng của bạn thu hút và để lại ấn tượng sâu sắc...',
      featuredImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop',
      status: 'published',
      author: { name: 'Lê Hoàng' },
      category: { name: 'Sự kiện', slug: 'su-kien' },
      publishedAt: '2024-11-28T14:30:00',
      views: 892,
      likes: 56,
      comments: 12,
      readTime: 6
    }
  ];

  const blogPosts = initialPosts || samplePosts;
  const categories = initialCategories || [
    { name: 'Tất cả', slug: 'all' },
    { name: 'Hướng dẫn', slug: 'huong-dan' },
    { name: 'Quản lý', slug: 'quan-ly' },
    { name: 'Sự kiện', slug: 'su-kien' }
  ];

  const stats = useMemo(() => ({
    total: blogPosts.length,
    published: blogPosts.filter(p => p.status === 'published').length,
    drafts: blogPosts.filter(p => p.status === 'draft').length,
    totalViews: blogPosts.reduce((s, p) => s + (p.views || 0), 0)
  }), [blogPosts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return blogPosts.filter(post => {
      const matchTab = activeTab === 'all' || post.status === activeTab;
      const matchCategory = filters.category === 'all' || post.category?.slug === filters.category;
      const matchSearch = !q || 
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author?.name.toLowerCase().includes(q);
      return matchTab && matchCategory && matchSearch;
    });
  }, [blogPosts, activeTab, filters, searchQuery]);

  const StatusBadge = ({ status }) => {
    const styles = {
      published: 'bg-emerald-100 text-emerald-700',
      draft: 'bg-slate-100 text-slate-700',
      pending: 'bg-amber-100 text-amber-700'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || styles.draft}`}>
        {status === 'published' ? 'Đã xuất bản' : status === 'draft' ? 'Nháp' : status}
      </span>
    );
  };

  const PostCard = ({ post }) => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden active:scale-98 transition-transform">
      <div className="relative">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge status={post.status} />
        </div>
        <button 
          onClick={() => setSelectedPost(post)} 
          className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg active:scale-95 transition-transform"
          aria-label="Xem chi tiết"
        >
          <MoreVertical size={18} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-base line-clamp-2 flex-1">
            {post.title}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap mt-1">
            {post.readTime}m
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <User className="w-4 h-4 text-gray-400" />
            <span className="truncate max-w-[120px]">{post.author?.name}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-gray-400" />
              {post.views}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-gray-400" />
              {post.likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PostListItem = ({ post }) => (
    <div className="bg-white rounded-xl shadow-sm p-4 flex gap-3 active:scale-98 transition-transform">
      <img 
        src={post.featuredImage} 
        alt={post.title} 
        className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 flex-1">
            {post.title}
          </h4>
          <StatusBadge status={post.status} />
        </div>
        <p className="text-xs text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <User className="w-3.5 h-3.5" />
            <span className="truncate max-w-[100px]">{post.author?.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setSelectedPost(post)}
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Xem"
            >
              <Eye size={16} />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Sửa"
            >
              <Edit3 size={16} />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-red-50 active:bg-red-100 text-red-600 transition-colors"
              aria-label="Xóa"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PostDetailSheet = ({ post }) => (
    <div className="fixed inset-0 z-50 flex items-end animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={() => setSelectedPost(null)} 
      />
      <div className="relative w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 flex items-start justify-between gap-3 z-10">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 mb-1">{post.title}</h3>
            <div className="text-xs text-gray-500">
              {post.author?.name} • {new Date(post.publishedAt || Date.now()).toLocaleDateString('vi-VN')}
            </div>
          </div>
          <button 
            onClick={() => setSelectedPost(null)} 
            className="p-2 bg-gray-100 rounded-full active:scale-95 transition-transform flex-shrink-0"
            aria-label="Đóng"
          >
            <XCircle size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <img 
            src={post.featuredImage} 
            alt="cover" 
            className="w-full h-52 object-cover rounded-xl"
          />
          
          <StatusBadge status={post.status} />
          
          <p className="text-sm text-gray-700 leading-relaxed">{post.excerpt}</p>

          <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <Eye size={16} />
              </div>
              <div className="text-lg font-semibold text-gray-900">{post.views}</div>
              <div className="text-xs text-gray-500">Lượt xem</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <Heart size={16} />
              </div>
              <div className="text-lg font-semibold text-gray-900">{post.likes}</div>
              <div className="text-xs text-gray-500">Yêu thích</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <MessageCircle size={16} />
              </div>
              <div className="text-lg font-semibold text-gray-900">{post.comments}</div>
              <div className="text-xs text-gray-500">Bình luận</div>
            </div>
          </div>

          <div className="flex gap-3 pt-2 pb-6">
            <button className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl font-medium active:scale-98 transition-transform shadow-lg shadow-blue-600/20">
              Chỉnh sửa
            </button>
            <button className="flex-1 py-3.5 border-2 border-gray-200 rounded-xl font-medium active:scale-98 transition-transform">
              Chia sẻ
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CreateModal = () => (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={() => setShowCreateModal(false)} 
      />
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] animate-slide-up">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
          <h3 className="font-bold text-lg">Tạo bài viết mới</h3>
          <button 
            onClick={() => setShowCreateModal(false)} 
            className="p-2 hover:bg-gray-100 rounded-full active:scale-95 transition-transform"
            aria-label="Đóng"
          >
            <XCircle size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          <input 
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
            placeholder="Tiêu đề bài viết"
          />
          <input 
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
            placeholder="Slug (tùy chọn)"
          />
          <select className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <textarea 
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" 
            rows={4} 
            placeholder="Mô tả ngắn"
          />
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-medium active:scale-98 transition-transform">
              Lưu nháp
            </button>
            <button className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl font-medium active:scale-98 transition-transform shadow-lg shadow-blue-600/20">
              Xuất bản
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Blog</h1>
              <div className="text-xs text-gray-500 mt-0.5">Quản lý bài viết và nội dung của tổ chức</div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="p-2.5 rounded-xl bg-gray-100 active:scale-95 transition-transform"
                aria-label="Upload"
              >
                <Upload size={18} />
              </button>
              <button 
                className="p-2.5 rounded-xl bg-gray-100 active:scale-95 transition-transform"
                aria-label="Download"
              >
                <Download size={18} />
              </button>
              <button 
                onClick={() => setShowCreateModal(true)} 
                className="p-2.5 rounded-xl bg-blue-600 text-white active:scale-95 transition-transform shadow-lg shadow-blue-600/30"
                aria-label="Tạo mới"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                placeholder="Tìm kiếm..." 
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <button 
              onClick={() => setShowFilters(s => !s)} 
              className={`p-3 rounded-xl transition-all active:scale-95 ${
                showFilters 
                  ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-500' 
                  : 'bg-white border border-gray-200'
              }`}
              aria-label="Bộ lọc"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <div className="text-xs text-gray-500 mb-1">Tổng bài viết</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <div className="text-xs text-gray-500 mb-1">Lượt xem</div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'all', label: 'Tất cả', count: stats.total },
            { id: 'published', label: 'Đã xuất bản', count: stats.published },
            { id: 'draft', label: 'Bản nháp', count: stats.drafts }
          ].map(t => (
            <button 
              key={t.id} 
              onClick={() => setActiveTab(t.id)} 
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium transition-all active:scale-95 ${
                activeTab === t.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'bg-white text-gray-700 shadow-sm'
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 animate-fade-in">
            <select 
              value={filters.category} 
              onChange={e => setFilters(f => ({...f, category: e.target.value}))} 
              className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {categories.map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <div className="flex gap-3">
              <button 
                onClick={() => { 
                  setSearchQuery(''); 
                  setFilters({status:'all',category:'all'}); 
                  setShowFilters(false); 
                }} 
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium active:scale-98 transition-transform"
              >
                Đặt lại
              </button>
              <button 
                onClick={() => setShowFilters(false)} 
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium active:scale-98 transition-transform shadow-lg shadow-blue-600/20"
              >
                Áp dụng
              </button>
            </div>
          </div>
        )}

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Kết quả: <span className="font-semibold text-gray-900">{filteredPosts.length}</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm">
            <button 
              onClick={() => setViewMode('list')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700'
              }`}
            >
              Danh sách
            </button>
            <button 
              onClick={() => setViewMode('grid')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700'
              }`}
            >
              Lưới
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4' : 'space-y-3'}>
          {filteredPosts.map(p => 
            viewMode === 'grid' 
              ? <PostCard key={p.id} post={p} /> 
              : <PostListItem key={p.id} post={p} />
          )}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-3">📝</div>
            <div className="text-gray-600 font-medium mb-1">Không tìm thấy bài viết</div>
            <div className="text-sm text-gray-500">Thử điều chỉnh bộ lọc hoặc tìm kiếm khác</div>
          </div>
        )}
      </main>

      {showCreateModal && <CreateModal />}
      {selectedPost && <PostDetailSheet post={selectedPost} />}

    </div>
  );
}