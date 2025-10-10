import React, { useState, useMemo } from 'react';
import { 
    PenTool, 
    Search, 
    Filter, 
    Plus, 
    Eye, 
    Edit3, 
    Trash2, 
    Calendar, 
    User, 
    Tag, 
    Heart,
    MessageCircle,
    Share2,
    MoreVertical,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    TrendingUp,
    BarChart3,
    Users,
    BookOpen,
    Image,
    FileText,
    Settings,
    Upload,
    Download,
    Copy,
    ExternalLink,
    Star,
    StarOff,
    Archive,
    Send,
    Globe,
    Lock,
    Unlock,
    RefreshCw
} from 'lucide-react';

export default function BlogManagementPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPosts, setSelectedPosts] = useState(new Set());
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // grid, list
    const [sortBy, setSortBy] = useState('date');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [filters, setFilters] = useState({
        status: 'all',
        category: 'all',
        author: 'all',
        dateRange: 'all'
    });

    // Mock blog posts data
    const [blogPosts, setBlogPosts] = useState([
        {
            id: 1,
            title: 'Hướng dẫn tham gia hoạt động tình nguyện cho người mới',
            slug: 'huong-dan-tham-gia-hoat-dong-tinh-nguyen',
            excerpt: 'Bài viết hướng dẫn chi tiết cho những người mới bắt đầu tham gia các hoạt động tình nguyện, từ đăng ký đến thực hiện...',
            content: 'Nội dung đầy đủ của bài viết...',
            featuredImage: '/api/placeholder/300/200',
            status: 'published',
            author: {
                name: 'Nguyễn Văn A',
                avatar: '/api/placeholder/32/32',
                role: 'Admin'
            },
            category: {
                name: 'Hướng dẫn',
                slug: 'huong-dan',
                color: 'blue'
            },
            tags: ['tình nguyện', 'hướng dẫn', 'người mới'],
            publishedAt: '2024-12-01T10:00:00',
            updatedAt: '2024-12-01T10:00:00',
            views: 1250,
            likes: 89,
            comments: 23,
            shares: 15,
            readTime: 8,
            isFeatured: true,
            seoScore: 85
        },
        {
            id: 2,
            title: 'Kinh nghiệm quản lý đội nhóm CTV hiệu quả',
            slug: 'kinh-nghiem-quan-ly-doi-nhom-ctv-hieu-qua',
            excerpt: 'Những kinh nghiệm thực tế trong việc quản lý và điều phối đội nhóm cộng tác viên để đạt hiệu quả cao nhất...',
            content: 'Nội dung đầy đủ của bài viết...',
            featuredImage: '/api/placeholder/300/200',
            status: 'draft',
            author: {
                name: 'Trần Thị Mai',
                avatar: '/api/placeholder/32/32',
                role: 'Editor'
            },
            category: {
                name: 'Quản lý',
                slug: 'quan-ly',
                color: 'green'
            },
            tags: ['quản lý', 'CTV', 'kinh nghiệm'],
            publishedAt: null,
            updatedAt: '2024-11-30T15:30:00',
            views: 0,
            likes: 0,
            comments: 0,
            shares: 0,
            readTime: 12,
            isFeatured: false,
            seoScore: 72
        },
        {
            id: 3,
            title: '10 hoạt động tình nguyện ý nghĩa trong cộng đồng',
            slug: '10-hoat-dong-tinh-nguyen-y-nghia-trong-cong-dong',
            excerpt: 'Khám phá 10 hoạt động tình nguyện mang lại giá trị tích cực cho cộng đồng và bản thân người tham gia...',
            content: 'Nội dung đầy đủ của bài viết...',
            featuredImage: '/api/placeholder/300/200',
            status: 'scheduled',
            author: {
                name: 'Lê Văn C',
                avatar: '/api/placeholder/32/32',
                role: 'Writer'
            },
            category: {
                name: 'Cộng đồng',
                slug: 'cong-dong',
                color: 'purple'
            },
            tags: ['cộng đồng', 'hoạt động', 'ý nghĩa'],
            publishedAt: '2024-12-05T09:00:00',
            updatedAt: '2024-11-29T14:00:00',
            views: 0,
            likes: 0,
            comments: 0,
            shares: 0,
            readTime: 6,
            isFeatured: false,
            seoScore: 78
        },
        {
            id: 4,
            title: 'Báo cáo hoạt động quý IV/2024',
            slug: 'bao-cao-hoat-dong-quy-4-2024',
            excerpt: 'Tổng kết các hoạt động và thành tựu đạt được trong quý IV năm 2024 của tổ chức...',
            content: 'Nội dung đầy đủ của bài viết...',
            featuredImage: '/api/placeholder/300/200',
            status: 'published',
            author: {
                name: 'Phạm Thị D',
                avatar: '/api/placeholder/32/32',
                role: 'Admin'
            },
            category: {
                name: 'Báo cáo',
                slug: 'bao-cao',
                color: 'orange'
            },
            tags: ['báo cáo', 'quý IV', '2024'],
            publishedAt: '2024-11-28T08:00:00',
            updatedAt: '2024-11-28T08:00:00',
            views: 890,
            likes: 45,
            comments: 12,
            shares: 8,
            readTime: 15,
            isFeatured: true,
            seoScore: 91
        },
        {
            id: 5,
            title: 'Cách xây dựng kế hoạch tình nguyện hiệu quả',
            slug: 'cach-xay-dung-ke-hoach-tinh-nguyen-hieu-qua',
            excerpt: 'Hướng dẫn từng bước để tạo ra một kế hoạch tình nguyện chi tiết và khả thi...',
            content: 'Nội dung đầy đủ của bài viết...',
            featuredImage: '/api/placeholder/300/200',
            status: 'pending',
            author: {
                name: 'Hoàng Văn E',
                avatar: '/api/placeholder/32/32',
                role: 'Writer'
            },
            category: {
                name: 'Kế hoạch',
                slug: 'ke-hoach',
                color: 'indigo'
            },
            tags: ['kế hoạch', 'hiệu quả', 'tình nguyện'],
            publishedAt: null,
            updatedAt: '2024-11-27T16:45:00',
            views: 0,
            likes: 0,
            comments: 0,
            shares: 0,
            readTime: 10,
            isFeatured: false,
            seoScore: 68
        }
    ]);

    const categories = [
        { name: 'Hướng dẫn', slug: 'huong-dan', color: 'blue', count: 8 },
        { name: 'Quản lý', slug: 'quan-ly', color: 'green', count: 5 },
        { name: 'Cộng đồng', slug: 'cong-dong', color: 'purple', count: 12 },
        { name: 'Báo cáo', slug: 'bao-cao', color: 'orange', count: 3 },
        { name: 'Kế hoạch', slug: 'ke-hoach', color: 'indigo', count: 4 }
    ];

    const authors = [
        { name: 'Nguyễn Văn A', role: 'Admin', posts: 15 },
        { name: 'Trần Thị Mai', role: 'Editor', posts: 8 },
        { name: 'Lê Văn C', role: 'Writer', posts: 12 },
        { name: 'Phạm Thị D', role: 'Admin', posts: 6 }
    ];

    // Statistics
    const stats = useMemo(() => {
        const published = blogPosts.filter(post => post.status === 'published').length;
        const drafts = blogPosts.filter(post => post.status === 'draft').length;
        const pending = blogPosts.filter(post => post.status === 'pending').length;
        const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
        const totalLikes = blogPosts.reduce((sum, post) => sum + post.likes, 0);
        
        return {
            total: blogPosts.length,
            published,
            drafts,
            pending,
            totalViews,
            totalLikes,
            avgSeoScore: Math.round(blogPosts.reduce((sum, post) => sum + post.seoScore, 0) / blogPosts.length)
        };
    }, [blogPosts]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesTab = activeTab === 'all' || post.status === activeTab;
            const matchesCategory = filters.category === 'all' || post.category.slug === filters.category;
            const matchesAuthor = filters.author === 'all' || post.author.name === filters.author;
            const matchesStatus = filters.status === 'all' || post.status === filters.status;
            
            return matchesSearch && matchesTab && matchesCategory && matchesAuthor && matchesStatus;
        });
    }, [blogPosts, searchQuery, activeTab, filters]);

    // Sort posts
    const sortedPosts = useMemo(() => {
        const sorted = [...filteredPosts].sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                case 'views':
                    return b.views - a.views;
                case 'likes':
                    return b.likes - a.likes;
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
        return sorted;
    }, [filteredPosts, sortBy]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'text-green-600 bg-green-100';
            case 'draft': return 'text-gray-600 bg-gray-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'scheduled': return 'text-blue-600 bg-blue-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'published': return 'Đã xuất bản';
            case 'draft': return 'Bản nháp';
            case 'pending': return 'Chờ duyệt';
            case 'scheduled': return 'Đã lên lịch';
            default: return 'Không xác định';
        }
    };

    const handleSelectPost = (postId) => {
        setSelectedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const handleSelectAll = () => {
        if (selectedPosts.size === sortedPosts.length) {
            setSelectedPosts(new Set());
        } else {
            setSelectedPosts(new Set(sortedPosts.map(post => post.id)));
        }
    };

    const handleBulkAction = (action) => {
        console.log(`Bulk action: ${action} on posts:`, Array.from(selectedPosts));
        // Implement bulk actions here
        setSelectedPosts(new Set());
    };

    const handleToggleFeatured = (postId) => {
        setBlogPosts(prev => prev.map(post => 
            post.id === postId ? { ...post, isFeatured: !post.isFeatured } : post
        ));
    };

    const PostCard = ({ post }) => (
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            {/* Post Image */}
            <div className="relative">
                <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {getStatusText(post.status)}
                    </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center space-x-2">
                    {post.isFeatured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <input
                        type="checkbox"
                        checked={selectedPosts.has(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                </div>
            </div>
            
            {/* Post Content */}
            <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${post.category.color}-100 text-${post.category.color}-800`}>
                        {post.category.name}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime} phút đọc</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                    <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{post.author.name}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                        {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.updatedAt)}
                    </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {post.views}
                        </span>
                        <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                        </span>
                        <span className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-xs">SEO: {post.seoScore}/100</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                #{tag}
                            </span>
                        ))}
                        {post.tags.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{post.tags.length - 2}
                            </span>
                        )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => handleToggleFeatured(post.id)}
                            className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                        >
                            {post.isFeatured ? (
                                <Star className="w-4 h-4 fill-current text-yellow-500" />
                            ) : (
                                <StarOff className="w-4 h-4" />
                            )}
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                            <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-500 transition-colors">
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const PostListItem = ({ post }) => (
        <div className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-4">
                <input
                    type="checkbox"
                    checked={selectedPosts.has(post.id)}
                    onChange={() => handleSelectPost(post.id)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                
                <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                            {getStatusText(post.status)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${post.category.color}-100 text-${post.category.color}-800`}>
                            {post.category.name}
                        </span>
                        {post.isFeatured && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">{post.excerpt}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center space-x-2">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-5 h-5 rounded-full"
                            />
                            <span>{post.author.name}</span>
                        </div>
                        <span>{post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.updatedAt)}</span>
                        <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {post.views}
                        </span>
                        <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center space-x-1">
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Quản lý Blog</h1>
                            <p className="text-gray-600 mt-1">Quản lý nội dung và bài viết của tổ chức</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <Upload className="w-4 h-4 mr-2" />
                                Import
                            </button>
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </button>
                            <button 
                                onClick={() => setShowCreateModal(true)}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Tạo bài viết
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Tổng bài viết</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <BookOpen className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            {stats.published} đã xuất bản • {stats.drafts} bản nháp
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Tổng lượt xem</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                            </div>
                            <Eye className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="mt-2 text-sm text-green-600 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +12% so với tháng trước
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Tổng lượt thích</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalLikes.toLocaleString()}</p>
                            </div>
                            <Heart className="w-8 h-8 text-red-600" />
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            Trung bình {Math.round(stats.totalLikes / stats.published)} likes/bài
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Điểm SEO TB</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.avgSeoScore}/100</p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-purple-600" />
                        </div>
                        <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-purple-600 h-2 rounded-full" 
                                    style={{ width: `${stats.avgSeoScore}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        {/* Search and Filters */}
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm bài viết..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                                />
                            </div>
                            
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                                    showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Lọc
                            </button>
                        </div>

                        {/* View Controls */}
                        <div className="flex items-center space-x-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="date">Sắp xếp theo ngày</option>
                                <option value="views">Sắp xếp theo lượt xem</option>
                                <option value="likes">Sắp xếp theo lượt thích</option>
                                <option value="title">Sắp xếp theo tên</option>
                            </select>
                            
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                                >
                                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                                        <div className="bg-current rounded-sm"></div>
                                        <div className="bg-current rounded-sm"></div>
                                        <div className="bg-current rounded-sm"></div>
                                        <div className="bg-current rounded-sm"></div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 border-l border-gray-300 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                                >
                                    <div className="w-4 h-4 flex flex-col justify-between">
                                        <div className="bg-current h-0.5 rounded"></div>
                                        <div className="bg-current h-0.5 rounded"></div>
                                        <div className="bg-current h-0.5 rounded"></div>
                                        <div className="bg-current h-0.5 rounded"></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Extended Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                                    <select
                                        value={filters.status}
                                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Tất cả trạng thái</option>
                                        <option value="published">Đã xuất bản</option>
                                        <option value="draft">Bản nháp</option>
                                        <option value="pending">Chờ duyệt</option>
                                        <option value="scheduled">Đã lên lịch</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                                    <select
                                        value={filters.category}
                                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Tất cả danh mục</option>
                                        {categories.map(cat => (
                                            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tác giả</label>
                                    <select
                                        value={filters.author}
                                        onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Tất cả tác giả</option>
                                        {authors.map(author => (
                                            <option key={author.name} value={author.name}>{author.name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian</label>
                                    <select
                                        value={filters.dateRange}
                                        onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Tất cả thời gian</option>
                                        <option value="today">Hôm nay</option>
                                        <option value="week">Tuần này</option>
                                        <option value="month">Tháng này</option>
                                        <option value="year">Năm này</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm border mb-6">
                    <div className="flex border-b border-gray-200">
                        {[
                            { id: 'all', label: 'Tất cả', count: stats.total },
                            { id: 'published', label: 'Đã xuất bản', count: stats.published },
                            { id: 'draft', label: 'Bản nháp', count: stats.drafts },
                            { id: 'pending', label: 'Chờ duyệt', count: stats.pending },
                            { id: 'scheduled', label: 'Đã lên lịch', count: blogPosts.filter(p => p.status === 'scheduled').length }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.label}
                                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedPosts.size > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-blue-900">
                                    Đã chọn {selectedPosts.size} bài viết
                                </span>
                                <button
                                    onClick={handleSelectAll}
                                    className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                    {selectedPosts.size === sortedPosts.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleBulkAction('publish')}
                                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                                >
                                    Xuất bản
                                </button>
                                <button
                                    onClick={() => handleBulkAction('draft')}
                                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                                >
                                    Chuyển nháp
                                </button>
                                <button
                                    onClick={() => handleBulkAction('archive')}
                                    className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700"
                                >
                                    Lưu trữ
                                </button>
                                <button
                                    onClick={() => handleBulkAction('delete')}
                                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Posts Grid/List */}
                <div className="space-y-6">
                    {sortedPosts.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bài viết nào</h3>
                            <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc tạo bài viết mới</p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Tạo bài viết đầu tiên
                            </button>
                        </div>
                    ) : (
                        <div className={viewMode === 'grid' 
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                            : 'space-y-4'
                        }>
                            {sortedPosts.map(post => (
                                viewMode === 'grid' ? (
                                    <PostCard key={post.id} post={post} />
                                ) : (
                                    <PostListItem key={post.id} post={post} />
                                )
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {sortedPosts.length > 0 && (
                    <div className="mt-8 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Hiển thị 1-{Math.min(10, sortedPosts.length)} của {sortedPosts.length} kết quả
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                                Trước
                            </button>
                            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
                            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Post Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Tạo bài viết mới</h3>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề *</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tiêu đề bài viết..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    placeholder="duong-dan-bai-viet"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                        <option value="">Chọn danh mục</option>
                                        {categories.map(cat => (
                                            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                        <option value="draft">Bản nháp</option>
                                        <option value="pending">Chờ duyệt</option>
                                        <option value="scheduled">Lên lịch xuất bản</option>
                                        <option value="published">Xuất bản ngay</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả ngắn</label>
                                <textarea
                                    rows={3}
                                    placeholder="Nhập mô tả ngắn cho bài viết..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh đại diện</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                    <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600">Kéo thả ảnh vào đây hoặc <span className="text-blue-600 cursor-pointer">chọn file</span></p>
                                    <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF tối đa 2MB</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tags, cách nhau bằng dấu phẩy"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="ml-2 text-sm text-gray-700">Bài viết nổi bật</span>
                                </label>
                                
                                <label className="flex items-center">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="ml-2 text-sm text-gray-700">Cho phép bình luận</span>
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                                Lưu nháp
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Tạo bài viết
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}