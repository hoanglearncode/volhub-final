import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
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

const sampleFeaturedEvents = [
  {
    id: 1,
    title: "Aquafina Vietnam International Fashion Week 2025",
    slug: "aquafina-vietnam-international-fashion-week-2025",
    category: "Văn hóa",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318555/z7109028936008_a65537e87f2bfcff7f1e3f77c600c9c1_z936mc.jpg",
    slotsLeft: 0,
    location: "Hà Nội",
    date: "2025-11-12T08:00:00",
    volunteers: 56,
    rating: 4.8,
    currentVolunteers: 56
  },
  {
    id: 2,
    title: "Hạnh phúc học sinh thủ đô - Hà Nội",
    slug: "hanh-phuc-hoc-sinh-thu-do",
    category: "Giáo dục",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028928483_8ba16d5034671c86bab6cc6929c020cb_bouzqn.jpg",
    slotsLeft: 0,
    location: "Hà Nội",
    date: "2025-08-20T09:00:00",
    volunteers: 34,
    rating: 4.6,
    currentVolunteers: 34
  },
  {
    id: 3,
    title: "Khám sức khỏe cộng đồng miễn phí",
    slug: "kham-suc-khoe-cong-dong",
    category: "Y tế",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318555/z7109029100703_1ac168147245feb522a03566b7d07eae_pwuqe5.jpg",
    slotsLeft: 0,
    location: "Hải Phòng",
    date: "2025-12-05T07:30:00",
    volunteers: 18,
    rating: 4.7,
    currentVolunteers: 18
  },
  {
    id: 4,
    title: "Trồng cây xanh ven đường",
    slug: "trong-cay-xanh-ven-duong",
    category: "Môi trường",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109079974801_9d0021971c329740695512d0123f969c_l9qatk.jpg",
    slotsLeft: 8,
    location: "Đường Nguyễn Trãi, Hà Nội",
    date: "2025-11-28T08:00:00",
    volunteers: 72,
    rating: 4.9,
    currentVolunteers: 72
  },
  {
    id: 5,
    title: "Hướng nghiệp cho sinh viên năm nhất",
    slug: "huong-nghiep-sinh-vien",
    category: "Giáo dục",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028918873_8df1c77d7acda23cb7e2aeda0f17dbfe_ejtfnr.jpg",
    slotsLeft: 30,
    location: "Hội trường A, Đại học X",
    date: "2025-11-15T13:30:00",
    volunteers: 45,
    rating: 4.5,
    currentVolunteers: 45
  },
  {
    id: 6,
    title: "Gian hàng 0 đồng cho người khó khăn",
    slug: "gian-hang-0-dong",
    category: "An sinh",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028913787_f1421e0eedc5c42b23441ff91b03c5e6_fha3jv.jpg",
    slotsLeft: 20,
    location: "Công viên trung tâm, Cần Thơ",
    date: "2025-12-02T09:00:00",
    volunteers: 29,
    rating: 4.4,
    currentVolunteers: 29
  }
];

const sampleBlogPosts = [
  {
    id: 101,
    slug: "hanh-trinh-cua-minh-khi-lam-tinh-nguyen",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109110921139_effab7eac081da9e902324a6a3c82f5a_m5gtqe.jpg",
    title: "Hành trình của mình khi làm tình nguyện ở miền núi",
    author: "Lan Nguyễn",
    comments: 12,
    excerpt:
      "Chia sẻ trải nghiệm, khó khăn và niềm vui khi tham gia hoạt động thiện nguyện tại vùng cao.",
    date: "2025-09-20T10:00:00",
    readTime: "6 phút",
    views: 1200,
    likes: 95,
    category: "Môi trường",
    featured: true
  },
  {
    id: 102,
    slug: "chia-se-kinh-nghiem-to-chuc-su-kien",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109086172895_b1c94141809c0b5184e888a1c145db95_lqudg2.jpg",
    title: "Chia sẻ kinh nghiệm tổ chức sự kiện thiện nguyện nhỏ",
    author: "Minh Trần",
    comments: 8,
    excerpt:
      "Checklist, mẹo vận hành và cách kêu gọi tài trợ cho sự kiện cộng đồng quy mô nhỏ.",
    date: "2025-10-03T14:30:00",
    readTime: "5 phút",
    views: 890,
    likes: 47,
    category: "Hoạt động",
    featured: true
  },
  {
    id: 103,
    slug: "nhung-khoanh-khac-khong-the-quen",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109080260322_32ac4071981d2bfdd527deee7236578b_nx3k51.jpg",
    title: "Những khoảnh khắc không thể quên khi đi trao quà",
    author: "Huyền Phạm",
    comments: 21,
    excerpt:
      "Kỷ niệm đẹp khi mang niềm vui đến những gia đình khó khăn, những bài học cảm động.",
    date: "2025-07-18T08:00:00",
    readTime: "4 phút",
    views: 2350,
    likes: 210,
    category: "An sinh",
    featured: false
  },
  {
    id: 104,
    slug: "loi-khuyen-cho-tinh-nguyen-vien-moi",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109155569192_f66e3af8802e7886cb71df0519df037c_bsahh9.jpg",
    title: "Lời khuyên cho tình nguyện viên mới: chuẩn bị gì trước khi đi?",
    author: "Quốc Bảo",
    comments: 5,
    excerpt:
      "Danh sách cần chuẩn bị, cách giao tiếp với cộng đồng địa phương và bảo vệ sức khoẻ khi đi dài ngày.",
    date: "2025-06-01T09:30:00",
    readTime: "3 phút",
    views: 410,
    likes: 28,
    category: "Hướng dẫn",
    featured: false
  },
  {
    id: 105,
    slug: "ket-noi-cung-nhung-nguoi-ban-moi",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109086625073_1fe2d64159a2b7382f0782c37596551e_ebnzgy.jpg",
    title: "Kết nối cùng những người bạn mới qua dự án cộng đồng",
    author: "Thanh Hà",
    comments: 9,
    excerpt:
      "Cách tạo mối quan hệ bền vững với đồng đội và tình nguyện viên sau dự án kết thúc.",
    date: "2025-10-11T18:00:00",
    readTime: "4 phút",
    views: 760,
    likes: 64,
    category: "Kết nối",
    featured: false
  },
  {
    id: 106,
    slug: "lam-the-nao-de-quan-ly-thoi-gian-hieu-qua",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318550/z7109682571210_fd02d80da162557732917e776d28f54b_fanfhv.jpg",
    title: "Làm thế nào để quản lý thời gian khi tham gia nhiều dự án?",
    author: "Hoàng Việt",
    comments: 3,
    excerpt:
      "Kỹ thuật Pomodoro, ưu tiên công việc và cách giữ sự cân bằng giữa học/tập và tình nguyện.",
    date: "2025-05-21T07:45:00",
    readTime: "5 phút",
    views: 320,
    likes: 24,
    category: "Kỹ năng",
    featured: false
  }
];

// Derive initial category list from sample data
const initialCategories = ['all', ...Array.from(new Set([...sampleFeaturedEvents, ...sampleBlogPosts].map(p => p.category)))];

// ----------------------- HELPERS -----------------------
const parseFlexibleDate = (dateString) => {
  if (!dateString) return null;
  // If already ISO-like
  const iso = Date.parse(dateString);
  if (!isNaN(iso)) return new Date(iso);

  // Try dd/mm/yyyy or dd/mm/yyyy, hh:mm
  const dmy = dateString.trim().split(',');
  const datePart = dmy[0].trim();
  const timePart = dmy[1] ? dmy[1].trim() : '00:00';
  const parts = datePart.split('/');
  if (parts.length === 3) {
    const [dd, mm, yyyy] = parts;
    const isoString = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}T${timePart}`;
    const parsed = Date.parse(isoString);
    if (!isNaN(parsed)) return new Date(parsed);
  }
  // fallback
  const fallback = new Date(dateString);
  return isNaN(fallback.getTime()) ? null : fallback;
};

const formatDate = (dateString) => {
  const date = parseFlexibleDate(dateString);
  if (!date) return dateString || '-';
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatNumber = (num) => {
  return (typeof num === 'number') ? num.toLocaleString('vi-VN') : num;
};

// ----------------------- Pagination -----------------------
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) end = 4;
      if (currentPage >= totalPages - 2) start = totalPages - 3;

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        className={`p-2 rounded-lg border-2 transition-all ${currentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] h-10 px-3 rounded-lg border-2 font-medium transition-all ${currentPage === page ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'}`}
            aria-label={`Trang ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">{page}</span>
        )
      )}

      <button
        className={`p-2 rounded-lg border-2 transition-all ${currentPage === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'}`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Trang sau"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// ----------------------- PostCard -----------------------
const PostCard = ({ post, isFeatured = false }) => {
  return (
    <article className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group ${isFeatured ? 'lg:col-span-2' : ''}`}>
      <div className={`${isFeatured ? 'md:flex' : ''}`}>
        <div className={`${isFeatured ? 'md:w-1/2' : ''} overflow-hidden`}>
          <img
            src={post.image}
            alt={post.title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${isFeatured ? 'h-64 md:h-full' : 'h-48'}`}
            loading="lazy"
          />
        </div>

        <div className={`p-6 ${isFeatured ? 'md:w-1/2 flex flex-col justify-between' : ''}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{post.category}</span>
              {post.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Nổi bật
                </span>
              )}
            </div>

            <h3 className={`font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
              <a href={`/community/${post.slug}`}>{post.title}</a>
            </h3>

            <p className={`text-gray-600 mb-4 ${isFeatured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>{post.excerpt}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(post.date)}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"><Eye className="w-4 h-4" />{formatNumber(post.views)}</span>
                <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer"><Heart className="w-4 h-4" />{formatNumber(post.likes)}</span>
                <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"><MessageCircle className="w-4 h-4" />{formatNumber(post.comments)}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 hover:bg-blue-50 rounded-lg" aria-label="Chia sẻ bài viết">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

// ----------------------- Empty State -----------------------
const EmptyState = ({ searchTerm }) => (
  <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
    <div className="flex flex-col items-center gap-4">
      <div className="p-4 bg-gray-100 rounded-full">
        <ListTodo className="w-12 h-12 text-gray-400" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Không tìm thấy bài viết nào</h3>
        <p className="text-gray-500">
          {searchTerm ? `Không có kết quả cho "${searchTerm}". Hãy thử từ khóa khác.` : 'Hãy thử thay đổi bộ lọc hoặc danh mục để xem thêm bài viết.'}
        </p>
      </div>
    </div>
  </div>
);

// ----------------------- TrendingEventsSidebar -----------------------
const TrendingEventsSidebar = () => {
  const [events, setEvents] = useState(sampleFeaturedEvents);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (import.meta.env.VITE_API) {
          const res = await axios.get(`${import.meta.env.VITE_API}/api/volunteer/events/trending`, { params: { size: 6 } });
          if (!cancelled && res?.data?.code === 0 && Array.isArray(res.data.result) && res.data.result.length) {
            // normalize fields if needed
            const normalized = res.data.result.map((e, idx) => ({
              id: e.id || idx,
              slug: e.slug || e.id,
              title: e.title || e.name,
              coverImage: e.coverImage || e.image || e.cover || sampleFeaturedEvents[idx]?.image,
              location: e.location || sampleFeaturedEvents[idx]?.location || '',
              rating: e.rating ?? sampleFeaturedEvents[idx]?.rating ?? 4.5,
              currentVolunteers: e.currentVolunteers ?? e.volunteers ?? sampleFeaturedEvents[idx]?.currentVolunteers ?? 0
            }));
            setEvents(normalized);
            return;
          }
        }
      } catch (err) {
        // ignore and fallback to sample
        console.error('Trending fetch failed:', err);
      }
      if (!cancelled) setEvents(sampleFeaturedEvents);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-red-500" />
        Sự kiện thịnh hành
      </h3>
      <div className="space-y-4">
        {events.map((event, index) => (
          <a key={event.id || index} href={`/events/${event.slug}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${event.coverImage || event.image})` }} />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{event.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{event.location}</span>
                <span className="text-xs text-yellow-500 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {event.rating ?? 4.5}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs font-medium text-gray-900">#{index + 1}</div>
              <div className="text-xs text-gray-500">{formatNumber(event.currentVolunteers ?? event.volunteers)}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// ----------------------- Tips & CTA -----------------------
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

const CTASidebar = () => (
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white shadow-xl">
    <h3 className="text-2xl font-bold mb-4">Chia sẻ câu chuyện của bạn</h3>
    <p className="text-blue-100 mb-6">Bạn có kinh nghiệm tình nguyện thú vị muốn chia sẻ? Hãy viết bài và truyền cảm hứng cho cộng đồng!</p>
    <a href="/community/post" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">Viết bài mới</a>
  </div>
);

// ----------------------- MAIN PAGE -----------------------
const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState(sampleBlogPosts);

  const itemsPerPage = 10;
  const categories = useMemo(() => initialCategories, []);

  // Load featured posts (try API then fallback to sample)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (import.meta.env.VITE_API) {
          const res = await axios.get(`${import.meta.env.VITE_API}/api/volunteer/posts/top5`, { params: { size: 5 } });
          if (!cancelled && res?.data?.code === 0 && Array.isArray(res.data.result) && res.data.result.length) {
            setFeaturedPosts(res.data.result.map((p, idx) => ({
              id: p.id ?? idx,
              slug: p.slug ?? p.id,
              title: p.title,
              image: p.image ?? p.coverImage ?? sampleFeaturedEvents[idx]?.image,
              excerpt: p.excerpt ?? '',
              author: p.author ?? p.owner ?? 'Ban tổ chức',
              date: p.date ?? p.publishedAt ?? new Date().toISOString(),
              readTime: p.readTime ?? '4 phút',
              views: p.views ?? 0,
              likes: p.likes ?? 0,
              comments: p.comments ?? 0,
              category: p.category ?? 'Khác',
              featured: true
            })));
            return;
          }
        }
      } catch (err) {
        console.error('Featured posts fetch failed:', err);
      }
      if (!cancelled) {
        // fallback -> use sampleBlogPosts that are featured OR sampleFeaturedEvents mapped to post-like objects
        const fallback = sampleBlogPosts.filter(p => p.featured).length ? sampleBlogPosts.filter(p => p.featured) : sampleFeaturedEvents.map(ev => ({
          id: ev.id,
          slug: ev.slug,
          title: ev.title,
          image: ev.image,
          excerpt: '',
          author: 'Ban tổ chức',
          date: ev.date,
          readTime: '—',
          views: ev.volunteers * 10,
          likes: Math.floor(ev.volunteers / 2),
          comments: Math.floor(ev.volunteers / 5),
          category: ev.category,
          featured: true
        }));
        setFeaturedPosts(fallback);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Filter & sort logic
  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts];

    if (selectedCategory && selectedCategory !== 'all') posts = posts.filter(p => p.category === selectedCategory);

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      posts = posts.filter(p =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q) ||
        (p.author || '').toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'popular':
        posts.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'mostLiked':
        posts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'latest':
      default:
        posts.sort((a, b) => {
          const da = parseFlexibleDate(a.date) || new Date(0);
          const db = parseFlexibleDate(b.date) || new Date(0);
          return db.getTime() - da.getTime();
        });
    }

    return posts;
  }, [blogPosts, selectedCategory, searchTerm, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  // reset page when filters change
  useEffect(() => setCurrentPage(1), [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main content */}
          <main className="lg:col-span-8">
            {/* Featured posts */}
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

            {/* Search & filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">
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

                <div className="relative min-w-[180px]">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  <select
                    className="w-full appearance-none pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Chọn danh mục"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'Tất cả danh mục' : cat}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Posts grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCategory === 'all' ? 'Tất cả bài viết' : selectedCategory}</h2>
                <div className="text-sm text-gray-500 font-medium">{filteredPosts.length} bài viết</div>
              </div>

              {paginatedPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {paginatedPosts.map(post => <PostCard key={post.id} post={post} />)}
                  </div>

                  <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(p) => setCurrentPage(p)} />
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
              <TipsCardSidebar />
              <CTASidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
