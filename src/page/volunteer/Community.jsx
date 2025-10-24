import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  TrendingUp,
  Star,
  AlertCircle,
  ListTodo,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import UpcomingEventsWidget from '../../components/user/home/UpcomingEventsWidget';

const mockData = {
  featured: [
    {
      id: 1,
      title: "5 kỹ năng cần thiết cho tình nguyện viên mới",
      excerpt: "Khám phá những kỹ năng cơ bản giúp bạn thành công trong công việc tình nguyện đầu tiên. Từ kỹ năng giao tiếp đến làm việc nhóm, bài viết này sẽ hướng dẫn bạn chuẩn bị tốt nhất.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      author: "Mai Linh",
      authorImage: 'https://res.cloudinary.com/dqjrrgi4i/image/upload/v1757697564/logo_gzqetp.svg',
      authorProfile: '/profile/id',
      date: "2024-09-15",
      readTime: "5 phút",
      category: "Hướng dẫn",
      views: 1250,
      likes: 89,
      comments: 23,
      featured: true,
      slug: 'ky-nang-tinh-nguyen-vien-moi'
    },
    {
      id: 3,
      title: "Chia sẻ kinh nghiệm từ chiến dịch giáo dục trẻ em vùng cao",
      excerpt: "Hành trình 3 tháng tại Sapa đã mang lại cho tôi những trải nghiệm đáng nhớ. Từ những khó khăn ban đầu đến niềm vui khi thấy các em nhỏ tiến bộ từng ngày.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop",
      author: "Thanh Hương",
      authorImage: 'https://res.cloudinary.com/dqjrrgi4i/image/upload/v1757697564/logo_gzqetp.svg',
      authorProfile: '/profile/id',
      date: "2024-09-10",
      readTime: "12 phút",
      category: "Chia sẻ",
      views: 2100,
      likes: 156,
      comments: 42,
      featured: true,
      slug: 'giao-duc-tre-em-vung-cao'
    },
    {
      id: 8,
      title: "Tình nguyện viên trẻ và thử thách thời đại số",
      excerpt: "Làm thế nào để thu hút và giữ chân thế hệ Z tham gia hoạt động tình nguyện trong thời đại công nghệ số phát triển mạnh mẽ.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop",
      author: "Thu Thảo",
      authorImage: 'https://res.cloudinary.com/dqjrrgi4i/image/upload/v1757697564/logo_gzqetp.svg',
      authorProfile: '/profile/id',
      date: "2024-08-28",
      readTime: "11 phút",
      category: "Nghiên cứu",
      views: 1234,
      likes: 95,
      comments: 31,
      featured: true,
      slug: 'tinh-nguyen-vien-the-he-z'
    }
  ],
  blogPosts: [
    {
      id: 1,
      title: "5 kỹ năng cần thiết cho tình nguyện viên mới",
      excerpt: "Khám phá những kỹ năng cơ bản giúp bạn thành công trong công việc tình nguyện đầu tiên.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      author: "Mai Linh",
      authorImage: 'https://res.cloudinary.com/dqjrrgi4i/image/upload/v1757697564/logo_gzqetp.svg',
      authorProfile: '/profile/id',
      date: "2024-09-15",
      readTime: "5 phút",
      category: "Hướng dẫn",
      views: 1250,
      likes: 89,
      comments: 23,
      featured: true,
      slug: 'ky-nang-tinh-nguyen-vien-moi'
    },
    {
      id: 2,
      title: "Tác động tích cực của hoạt động tình nguyện",
      excerpt: "Nghiên cứu mới cho thấy lợi ích to lớn của việc tham gia hoạt động tình nguyện đối với sức khỏe tinh thần và thể chất.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
      author: "Đức Minh",
      authorImage: 'https://res.cloudinary.com/dqjrrgi4i/image/upload/v1757697564/logo_gzqetp.svg',
      authorProfile: '/profile/id',
      date: "2024-09-12",
      readTime: "7 phút",
      category: "Nghiên cứu",
      views: 890,
      likes: 67,
      comments: 15,
      featured: false,
      slug: 'tac-dong-tinh-nguyen'
    },
    {
      id: 4,
      title: "Cách tổ chức sự kiện tình nguyện hiệu quả",
      excerpt: "Bí quyết để tổ chức một sự kiện tình nguyện thành công từ A đến Z.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=250&fit=crop",
      author: "Minh Tú",
      authorImage: 'https://res.cloudinary.com/dqjrrgi4i/image/upload/v1757697564/logo_gzqetp.svg',
      authorProfile: '/profile/id',
      date: "2024-09-08",
      readTime: "8 phút",
      category: "Hướng dẫn",
      views: 756,
      likes: 45,
      comments: 18,
      featured: false,
      slug: 'to-chuc-su-kien'
    },
    {
      id: 5,
      title: "Câu chuyện cảm động từ trại trẻ mồ côi",
      excerpt: "Những khoảnh khắc đầy cảm xúc khi làm việc tại trại trẻ mồ côi.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop",
      author: "Lan Anh",
      authorImage: 'https://res.cloudinary.com/dqjrrgi4i/image/upload/v1757697564/logo_gzqetp.svg',
      authorProfile: '/profile/id',
      date: "2024-09-05",
      readTime: "6 phút",
      category: "Chia sẻ",
      views: 1876,
      likes: 234,
      comments: 67,
      featured: false,
      slug: 'cau-chuyen-trai-tre'
    },
    {
      id: 6,
      title: "Tình nguyện viên và sức khỏe tinh thần trong đại dịch",
      excerpt: "Phân tích về vai trò quan trọng của các tình nguyện viên trong việc hỗ trợ sức khỏe tinh thần cộng đồng.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=250&fit=crop",
      author: "Dr. Phương Nam",
      authorImage: 'https://res.cloudinary.com/dqjrrgi4i/image/upload/v1757697564/logo_gzqetp.svg',
      authorProfile: '/profile/id',
      date: "2024-09-03",
      readTime: "10 phút",
      category: "Nghiên cứu",
      views: 543,
      likes: 38,
      comments: 12,
      featured: false,
      slug: 'suc-khoe-tinh-than'
    }
  ],
  trendingEvent: [
    {
      id: 101,
      title: "Dọn dẹp bãi biển - Đà Nẵng",
      coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
      location: "Đà Nẵng",
      rating: 4.7,
      currentVolunteers: 89,
      slug: 'don-dep-bai-bien-da-nang'
    },
    {
      id: 102,
      title: "Festival Văn hóa - TP.HCM",
      coverImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop",
      location: "TP.HCM",
      rating: 4.9,
      currentVolunteers: 123,
      slug: 'festival-van-hoa-hcm'
    },
    {
      id: 103,
      title: "Giáo dục cộng đồng - Hà Nội",
      coverImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
      location: "Hà Nội",
      rating: 4.8,
      currentVolunteers: 45,
      slug: 'giao-duc-cong-dong-ha-noi'
    }
  ],
  categories: ['all', 'Hướng dẫn', 'Chia sẻ', 'Nghiên cứu']
};

// Utility Functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatNumber = (num) => {
  return num.toLocaleString('vi-VN');
};

// Pagination Component
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        className={`p-2 rounded-lg border-2 transition-all ${
          currentPage === 1
            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
            : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] h-10 px-3 rounded-lg border-2 font-medium transition-all ${
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
            aria-label={`Trang ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
            {page}
          </span>
        )
      ))}

      <button
        className={`p-2 rounded-lg border-2 transition-all ${
          currentPage === totalPages
            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
            : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Trang sau"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// PostCard Component
const PostCard = ({ post, isFeatured = false }) => {
  return (
    <article 
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group ${
        isFeatured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className={`${isFeatured ? 'md:flex' : ''}`}>
        {/* Image */}
        <div className={`${isFeatured ? 'md:w-1/2' : ''} overflow-hidden`}>
          <img 
            src={post.image} 
            alt={post.title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              isFeatured ? 'h-64 md:h-full' : 'h-48'
            }`}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className={`p-6 ${isFeatured ? 'md:w-1/2 flex flex-col justify-between' : ''}`}>
          <div>
            {/* Category & Featured Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Nổi bật
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className={`font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors ${
              isFeatured ? 'text-2xl' : 'text-lg'
            }`}>
              <a href={`/community/${post.slug}`}>
                {post.title}
              </a>
            </h3>

            {/* Excerpt */}
            <p className={`text-gray-600 mb-4 ${
              isFeatured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'
            }`}>
              {post.excerpt}
            </p>
          </div>
          
          {/* Meta Info */}
          <div className="space-y-3">
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            
            {/* Engagement Stats */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
                  <Eye className="w-4 h-4" />
                  {formatNumber(post.views)}
                </span>
                <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer">
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </span>
              </div>
              <button 
                className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 hover:bg-blue-50 rounded-lg" 
                aria-label="Chia sẻ bài viết"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

// Empty State Component
const EmptyState = ({ searchTerm }) => (
  <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
    <div className="flex flex-col items-center gap-4">
      <div className="p-4 bg-gray-100 rounded-full">
        <ListTodo className="w-12 h-12 text-gray-400" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Không tìm thấy bài viết nào
        </h3>
        <p className="text-gray-500">
          {searchTerm 
            ? `Không có kết quả cho "${searchTerm}". Hãy thử từ khóa khác.`
            : 'Hãy thử thay đổi bộ lọc hoặc danh mục để xem thêm bài viết.'
          }
        </p>
      </div>
    </div>
  </div>
);

// Trending Events Sidebar
const TrendingEventsSidebar = () => {
  const [events, setEvents] = useState([]);
    useEffect(() => {
    const loaded = async () => {
      try {
        const event = await axios.get(`${import.meta.env.VITE_API}/api/volunteer/events`); 
        // cần api lấy ra 5 sự kiện đang diễn ra có lượt truy cập nhiều nhất
        if (event.data.code === 0){
          setEvents(event.data?.result);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Đã xảy ra lỗi khi tải sự kiện.");
      }
    }

    loaded();
  },[]);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-red-500" />
        Sự kiện thịnh hành
      </h3>
      <div className="space-y-4">
        {events.map((event, index) => (
          <a 
            key={event.id}
            href={`/events/${event.slug}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div 
              className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0" 
              style={{ backgroundImage: `url(${event.coverImage})` }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                {event.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{event.location}</span>
                <span className="text-xs text-yellow-500 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {event.rating}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs font-medium text-gray-900">#{index + 1}</div>
              <div className="text-xs text-gray-500">{event.currentVolunteers} người</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
};

// Tips Card Sidebar
const TipsCardSidebar = () => (
  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-amber-200">
    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
      <AlertCircle className="w-5 h-5 text-amber-500" />
      Mẹo cho bạn
    </h3>
    <div className="space-y-3 text-sm">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-amber-600 font-bold text-xs">1</span>
        </div>
        <p className="text-gray-700">Đọc kỹ yêu cầu và mô tả công việc trước khi ứng tuyển</p>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-amber-600 font-bold text-xs">2</span>
        </div>
        <p className="text-gray-700">Liên hệ trực tiếp với người tổ chức nếu có thắc mắc</p>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-amber-600 font-bold text-xs">3</span>
        </div>
        <p className="text-gray-700">Cập nhật hồ sơ để tăng cơ hội được chọn</p>
      </div>
    </div>
  </div>
);

// CTA Section Sidebar
const CTASidebar = () => (
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white shadow-xl">
    <h3 className="text-2xl font-bold mb-4">Chia sẻ câu chuyện của bạn</h3>
    <p className="text-blue-100 mb-6">
      Bạn có kinh nghiệm tình nguyện thú vị muốn chia sẻ? Hãy viết bài và truyền cảm hứng cho cộng đồng!
    </p>
    <a 
      href="/community/post" 
      className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
    >
      Viết bài mới
    </a>
  </div>
);

// Main Component
const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  const itemsPerPage = 10;
  const categories = mockData.categories;

  // Load data on mount
  useEffect(() => {
    try {
      setFeaturedPosts(mockData.featured);
      setBlogPosts(mockData.blogPosts);
      setTrendingEvent(mockData.trendingEvent);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, []);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts];

    // Filter by category
    if (selectedCategory !== 'all') {
      posts = posts.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.excerpt.toLowerCase().includes(searchLower) ||
        p.author.toLowerCase().includes(searchLower)
      );
    }

    // Sort posts
    switch (sortBy) {
      case 'popular':
        posts.sort((a, b) => b.views - a.views);
        break;
      case 'mostLiked':
        posts.sort((a, b) => b.likes - a.likes);
        break;
      case 'latest':
      default:
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return posts;
  }, [blogPosts, selectedCategory, searchTerm, sortBy]);

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <main className="lg:col-span-8">
            {/* Featured Posts Section */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  <h2 className="text-2xl font-bold text-gray-900">Bài viết nổi bật</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  {featuredPosts.map(post => (
                    <PostCard key={`featured-${post.id}`} post={post} isFeatured={true} />
                  ))}
                </div>
              </section>
            )}

            {/* Search & Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài viết theo tiêu đề, nội dung, tác giả..."
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Tìm kiếm bài viết"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative min-w-[180px]">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  <select
                    className="w-full appearance-none pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Chọn danh mục"
                  >
                    <option value="all">Tất cả danh mục</option>
                    {categories.filter(cat => cat !== 'all').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'Tất cả bài viết' : selectedCategory}
                </h2>
                <div className="text-sm text-gray-500 font-medium">
                  {filteredPosts.length} bài viết
                </div>
              </div>

              {paginatedPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {paginatedPosts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                  
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <EmptyState searchTerm={searchTerm} />
              )}
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="space-y-6">
              <TrendingEventsSidebar />
      

              <UpcomingEventsWidget />
              {/* Tips Card */}
              <TipsCardSidebar />

              {/* CTA Section */}
              <CTASidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;