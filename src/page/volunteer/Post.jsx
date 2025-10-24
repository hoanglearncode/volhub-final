// src/pages/blog/BlogPostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  User,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronRight,
  Tag,
  Facebook,
  Twitter,
  Link as LinkIcon,
  ArrowUp,
  CheckCircle,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Award
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

/* ---------------- sample list (nguồn dữ liệu mẫu) ---------------- */
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

/* ---------------- Blog template (bản "full" - giữ đầy đủ trường) ----------------
   Khi API không trả kết quả, ta sẽ merge sample vào object này để đảm bảo có
   tất cả các trường mà UI cần.
*/
const BlogTemplate = {
  id: 'template-0001',
  slug: 'template-post',
  title: 'Bài viết mẫu — Hướng dẫn tham gia tình nguyện',
  content:
    `<h2>Giới thiệu</h2>
     <p>Đây là nội dung mẫu dài, chứa HTML, mô tả chi tiết các bước và trải nghiệm khi tham gia tình nguyện.</p>
     <h3>Các bước chuẩn bị</h3>
     <ul>
       <li>Chuẩn bị hồ sơ</li>
       <li>Tìm hiểu yêu cầu</li>
       <li>Liên hệ ban tổ chức</li>
     </ul>
     <p>V.v.</p>`,
  image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=600&fit=crop',
  author: 'Ban Biên Tập VolHub',
  authorAvatar: '📝',
  authorBio: 'Nhóm nội dung VolHub — chia sẻ kinh nghiệm và hướng dẫn tình nguyện.',
  date: new Date().toISOString(),
  readTime: '6 phút',
  category: 'Hướng dẫn',
  tags: ['tình nguyện', 'hướng dẫn'],
  views: 0,
  likes: 0,
  comments: 0,
  featured: false,
  meta: {
    seoTitle: '',
    seoDescription: '',
    canonical: ''
  },
  related: [],
  commentsList: []
};

/* ---------------- Utility ---------------- */
const clone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Nếu slug khớp sampleBlogPosts -> trả về object "hashed" là BlogTemplate merged sample
 * Nếu không -> trả BlogTemplate (clone) (dữ liệu mẫu đầy đủ)
 */
const getHashedBlogPostForSlug = (slug) => {
  const sample = sampleBlogPosts.find((s) => s.slug === slug);
  const base = clone(BlogTemplate);

  if (!sample) return base;

  // merge: giữ cấu trúc đầy đủ của base, override bởi sample những trường có sẵn
  base.id = `${base.id}-${sample.id}`;
  base.slug = sample.slug || base.slug;
  base.title = sample.title || base.title;
  base.image = sample.image || base.image;
  base.author = sample.author || base.author;
  base.authorAvatar = sample.authorAvatar ?? '👤';
  base.authorBio = base.authorBio;
  base.date = sample.date || base.date;
  base.readTime = sample.readTime || sample.readTime;
  base.category = sample.category || base.category;
  base.tags = Array.from(new Set([...(base.tags || []), sample.category || '', ...(sample.tags || [])].filter(Boolean)));
  base.views = sample.views ?? base.views;
  base.likes = sample.likes ?? base.likes;
  base.comments = sample.comments ?? base.comments;
  base.featured = !!sample.featured;
  base.excerpt = sample.excerpt ?? '';
  // build a simple content from excerpt + placeholder paragraphs to keep "full" content
  base.content = `<h2>${base.title}</h2><p>${base.excerpt || 'Nội dung sẽ được cập nhật.'}</p><p>Đây là nội dung bổ sung từ mẫu (hard-coded) để đảm bảo giao diện có đủ thông tin hiển thị.</p>`;

  // related: use other sample posts except itself
  base.related = sampleBlogPosts.filter(p => p.slug !== slug).slice(0, 3).map(p => ({
    id: p.id,
    title: p.title,
    image: p.image,
    category: p.category,
    readTime: p.readTime || '4 phút',
    date: p.date
  }));

  // commentsList: create dummy comments derived from sample meta
  base.commentsList = [
    {
      id: `c-${sample.id}-1`,
      author: 'Nguyễn Đức Minh',
      avatar: '👥',
      content: `Rất thích bài viết "${sample.title}". Cảm ơn tác giả đã chia sẻ!`,
      date: new Date().toISOString(),
      likes: Math.floor((sample.views || 0) / 100) || 0,
      replies: []
    }
  ];

  return base;
};

/* ---------------- Component ---------------- */
const BlogPostDetail = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(getHashedBlogPostForSlug(slug));
  const [relatedPosts, setRelatedPosts] = useState(post.related || []);
  const [comments, setComments] = useState(post.commentsList || []);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);

      // fast render from hashed data for snappy UX
      try {
        const initial = getHashedBlogPostForSlug(slug);
        if (!cancelled) {
          setPost(initial);
          setRelatedPosts(initial.related || []);
          setComments(initial.commentsList || []);
        }
      } catch (e) {
        if (!cancelled) {
          setPost(clone(BlogTemplate));
          setRelatedPosts([]);
          setComments([]);
        }
      }

      // then try fetch real data
      try {
        const base = import.meta.env.VITE_API || '';
        if (!base) {
          // no API configured -> inform user (dev) and keep hashed
          return;
        }

        // Try common blog endpoints (robust): first try /api/blog/posts/:slug then /api/posts/:slug
        const endpoints = [
          `${base}/api/blog/posts/${slug}`,
          `${base}/api/posts/${slug}`,
          `${base}/api/blog/${slug}`
        ];

        let success = false;
        for (const url of endpoints) {
          try {
            const res = await axios.get(url, { timeout: 7000 });
            if (res?.data) {
              const apiData = res.data.result ?? res.data; // some APIs return result wrapper
              if (apiData && typeof apiData === 'object') {
                if (!cancelled) {
                  // Normalize minimal fields and keep apiData as full source if available
                  const normalized = {
                    id: apiData.id ?? apiData._id ?? post.id,
                    slug: apiData.slug ?? post.slug,
                    title: apiData.title ?? post.title,
                    content: apiData.content ?? apiData.html ?? post.content,
                    image: apiData.image ?? apiData.coverImage ?? post.image,
                    author: apiData.authorName ?? apiData.author ?? post.author,
                    authorAvatar: apiData.authorAvatar ?? post.authorAvatar,
                    authorBio: apiData.authorBio ?? post.authorBio,
                    date: apiData.publishedAt ?? apiData.date ?? post.date,
                    readTime: apiData.readTime ?? post.readTime,
                    category: apiData.category ?? post.category,
                    tags: apiData.tags ?? post.tags,
                    views: apiData.views ?? post.views,
                    likes: apiData.likes ?? post.likes,
                    comments: apiData.comments ?? post.comments,
                    featured: apiData.featured ?? post.featured,
                    meta: apiData.meta ?? post.meta,
                    related: apiData.related ?? post.related,
                    commentsList: apiData.commentsList ?? post.commentsList
                  };
                  setPost(normalized);
                  setRelatedPosts(normalized.related || []);
                  setComments(normalized.commentsList || []);
                }
                success = true;
                break;
              }
            }
          } catch (err) {
            // try next endpoint
            // console.debug('endpoint failed', url, err?.message);
          }
        }

        if (!success && !cancelled) {
          // API didn't provide post -> check sample list; if slug in sample, keep hashed (already set). Notify user.
          const matched = sampleBlogPosts.find(p => p.slug === slug);
          if (matched) {
            const hashed = getHashedBlogPostForSlug(slug);
            setPost(hashed);
            setRelatedPosts(hashed.related || []);
            setComments(hashed.commentsList || []);
          } else {
            setPost(getHashedBlogPostForSlug(slug));
          }
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        if (!cancelled) {
          setPost(getHashedBlogPostForSlug(slug));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const toggleLike = () => {
    setIsLiked(prev => !prev);
    setPost(prev => ({ ...prev, likes: prev.likes + (isLiked ? -1 : 1) }));
  };

  const toggleBookmark = () => {
    setIsBookmarked(prev => !prev);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post.title;
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard?.writeText(url).then(() => {
        toast.success('Đã sao chép liên kết!');
      }).catch(() => toast.error('Sao chép thất bại.'));
    }
    setShowShareModal(false);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return toast.info('Vui lòng nhập nội dung bình luận.');
    const c = {
      id: `local-${Date.now()}`,
      author: 'Bạn (chưa đăng nhập)',
      avatar: '🗣️',
      content: newComment.trim(),
      date: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    setComments(prev => [c, ...prev]);
    setNewComment('');
    toast.success('Gửi bình luận thành công (giả lập).');
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-6">
          <nav className="flex items-center space-x-2 text-white/90 text-sm">
            <a href="/" className="hover:text-white transition-colors">Trang chủ</a>
            <ChevronRight size={16} />
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <ChevronRight size={16} />
            <span className="text-white font-medium">{post.category}</span>
          </nav>
        </div>

        {/* Category & Featured */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">{post.category}</span>
          {post.featured && (
            <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
              <Award size={14} /> Nổi bật
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main */}
          <main className="lg:col-span-8">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="p-8 border-b border-gray-100">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{post.authorAvatar}</span>
                    <div>
                      <div className="font-medium text-gray-900">{post.author}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <CheckCircle size={12} className="text-blue-500" /> Tác giả được xác thực
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1"><Calendar size={16} /> {formatDate(post.date)}</div>
                  <div className="flex items-center gap-1"><Clock size={16} /> {post.readTime}</div>
                  <div className="flex items-center gap-1"><Eye size={16} /> {(post.views || 0).toLocaleString()} lượt xem</div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={toggleLike} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'}`}>
                      <Heart size={16} /> {post.likes + (isLiked ? 1 : 0)}
                    </button>

                    <button onClick={toggleBookmark} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isBookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>
                      <Bookmark size={16} /> Lưu
                    </button>
                  </div>

                  <button onClick={() => setShowShareModal(true)} className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
                    <Share2 size={16} /> Chia sẻ
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                {/* Tags */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3"><Tag size={16} className="text-gray-500" /><span className="text-sm font-medium text-gray-700">Tags:</span></div>
                  <div className="flex flex-wrap gap-2">
                    {(post.tags || []).map((t, i) => (
                      <button key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors">#{t}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author */}
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{post.authorAvatar}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{post.author}</h3>
                    <p className="text-gray-600 mb-4">{post.authorBio}</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Theo dõi tác giả</button>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="p-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Bình luận ({comments.length})</h3>
                  <button onClick={() => setShowComments(!showComments)} className="text-blue-600 hover:text-blue-700 transition-colors">{showComments ? 'Ẩn' : 'Hiện'} bình luận</button>
                </div>

                {/* Comment form */}
                <div className="mb-8">
                  <div className="flex gap-4">
                    <span className="text-2xl">👤</span>
                    <div className="flex-1">
                      <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} rows={3} placeholder="Chia sẻ suy nghĩ của bạn..." className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500" />
                      <div className="flex justify-end mt-3">
                        <button onClick={handleSubmitComment} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"><SendIcon /> Gửi bình luận</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments list */}
                {showComments && (
                  <div className="space-y-6">
                    {comments.map((c) => (
                      <div key={c.id} className="space-y-4">
                        <div className="flex gap-4">
                          <span className="text-2xl">{c.avatar}</span>
                          <div className="flex-1 bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{c.author}</h4>
                              <span className="text-xs text-gray-500">{formatDateTime(c.date)}</span>
                            </div>
                            <p className="text-gray-700 mb-3">{c.content}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"><ThumbsUp size={14} /> {c.likes}</button>
                              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"><Reply size={14} /> Trả lời</button>
                              <button className="text-gray-400 hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
                            </div>
                          </div>
                        </div>

                        {/* replies */}
                        {c.replies && c.replies.length > 0 && (
                          <div className="ml-12 space-y-4">
                            {c.replies.map((r) => (
                              <div key={r.id} className="flex gap-4">
                                <span className="text-xl">{r.avatar}</span>
                                <div className="flex-1 bg-blue-50 rounded-xl p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-semibold text-gray-900">{r.author}</h5>
                                    <span className="text-xs text-gray-500">{formatDateTime(r.date)}</span>
                                  </div>
                                  <p className="text-gray-700 mb-3">{r.content}</p>
                                  <div className="flex items-center gap-4 text-sm">
                                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"><ThumbsUp size={14} /> {r.likes}</button>
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
              {/* Related */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bài viết liên quan</h3>
                <div className="space-y-4">
                  {(relatedPosts || []).map((rp) => (
                    <article key={rp.id} className="flex gap-3 group">
                      <img src={rp.image} alt={rp.title} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">{rp.title}</h4>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <span>{rp.category}</span>
                          <span>•</span>
                          <span>{rp.readTime}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Đăng ký nhận tin</h3>
                <p className="text-blue-100 text-sm mb-4">Nhận bài viết mới nhất về tình nguyện & kỹ năng</p>
                <div className="space-y-3">
                  <input type="email" placeholder="Email của bạn" className="w-full p-3 rounded-lg text-gray-900" />
                  <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg">Đăng ký ngay</button>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Tags phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                  {['tình nguyện', 'sinh viên', 'kỹ năng', 'phát triển', 'cộng đồng', 'kinh nghiệm', 'CV'].map(t => (
                    <button key={t} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200">#{t}</button>
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
              <button onClick={() => handleShare('facebook')} className="w-full flex items-center gap-3 p-3 bg-blue-600 text-white rounded-lg">
                <Facebook /> Chia sẻ lên Facebook
              </button>
              <button onClick={() => handleShare('twitter')} className="w-full flex items-center gap-3 p-3 bg-sky-500 text-white rounded-lg">
                <Twitter /> Chia sẻ lên Twitter
              </button>
              <button onClick={() => handleShare('copy')} className="w-full flex items-center gap-3 p-3 bg-gray-100 text-gray-700 rounded-lg">
                <LinkIcon /> Sao chép liên kết
              </button>
            </div>
            <button onClick={() => setShowShareModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">Đóng</button>
          </div>
        </div>
      )}

      {/* Back to Top */}
      <button onClick={scrollToTop} className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center">
        <ArrowUp />
      </button>
    </div>
  );
};

/* small helper: Send icon (lucide's Send not imported above to avoid name clash) */
const SendIcon = () => <SendLike />;

/* workaround small inline icon component to avoid importing conflicting name */
function SendLike() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline-block"><path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export default BlogPostDetail;
