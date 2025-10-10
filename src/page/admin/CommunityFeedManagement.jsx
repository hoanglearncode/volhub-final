import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Search, Filter, MoreHorizontal, Eye, EyeOff, Shield, AlertTriangle,
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  Building, Phone, Mail, Globe, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, Crown, Zap, Package,
  BarChart3, PlusCircle, ExternalLink, Briefcase, DollarSign,
  Upload, Camera, User, Image, CheckSquare, AlertCircle,
  ArrowUp, ArrowDown, RefreshCw, Coins, Gift, Lock,
  PieChart, LineChart, BarChart, TrendingDown, Percent,
  UserCheck, UserX, Link, Send, PlayCircle, PauseCircle,
  BookText, Video, Heart, Share, Play, ThumbsUp, ThumbsDown,
  Pin, Copy, Hash, AtSign, Volume2, VolumeX, Flame,
  Bookmark, MoreVertical, Reply, Forward, ShieldAlert
} from 'lucide-react';

// CommunityFeedManagement.jsx
// Hoàn chỉnh component quản lý feed cộng đồng — có dữ liệu mẫu, filter, search, pagination, modal

const MOCK_FEED = [
  {
    id: 'FEED001',
    type: 'post',
    content: 'Vừa hoàn thành workshop "Kỹ năng giao tiếp hiệu quả" tại trung tâm Samsung! Cảm ơn các mentor đã chia sẻ những kinh nghiệm quý báu. Hy vọng sẽ áp dụng được vào công việc thiện nguyện sắp tới 💪',
    authorId: 'TNV001',
    authorName: 'Nguyễn Minh Anh',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150',
    authorRole: 'volunteer',
    authorTrustScore: 4.8,
    authorVerified: true,
    createdAt: '2024-12-05T14:30:00Z',
    editedAt: null,
    status: 'published',
    visibility: 'public',
    isPromoted: false,
    isPinned: false,
    eventId: 'EVT002',
    eventTitle: 'Workshop Kỹ năng giao tiếp',
    partnerId: 2,
    partnerName: 'Samsung Electronics Vietnam',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600',
        thumbnail: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300',
        caption: 'Khoảnh khắc học tập tại Samsung'
      }
    ],
    engagement: { likes: 145, comments: 23, shares: 18, bookmarks: 12, clicks: 890, reach: 2340, impressions: 4560 },
    interactions: {
      reactions: [ { type: 'like', count: 120, users: ['TNV002','TNV003'] }, { type: 'love', count: 20, users: ['TNV004'] } ],
      topComments: [ { id: 'CMT001', authorId: 'TNV002', authorName: 'Trần Thị Bình', content: 'Workshop rất bổ ích! Mình cũng đã tham gia session trước đó', createdAt: '2024-12-05T15:15:00Z', likes: 8, replies: 2 } ]
    },
    tags: ['workshop','kỹ năng','samsung','giao tiếp'],
    mentions: ['@Samsung','@skillstraining'],
    hashtags: ['#volunteer','#skills','#learning'],
    location: 'TP.HCM',
    language: 'vi',
    aiAnalysis: { sentiment: 'positive', topics: ['education','skill_development'], toxicity: 0.02, spam: 0.01, relevance: 0.95 },
    moderationHistory: [],
    reports: 0,
    reportReasons: [],
    engagementRate: 6.3,
    viralityScore: 78.5,
    qualityScore: 92.1,
    communityImpact: 'positive'
  },
  {
    id: 'FEED002',
    type: 'video',
    content: 'Chia sẻ video highlights từ chương trình "Hành trình Xanh" vừa qua! 🌱 Cảm ơn 200+ bạn tình nguyện viên đã cùng chúng tôi trồng 1000 cây xanh tại khu vực Đồng Nai.',
    authorId: 'ORG001',
    authorName: 'Green Earth Foundation',
    authorAvatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150',
    authorRole: 'organization',
    authorTrustScore: 4.9,
    authorVerified: true,
    createdAt: '2024-12-05T10:45:00Z',
    editedAt: '2024-12-05T11:00:00Z',
    status: 'published',
    visibility: 'public',
    isPromoted: true,
    isPinned: true,
    eventId: 'EVT003',
    eventTitle: 'Hành trình Xanh - Trồng cây tại Đồng Nai',
    partnerId: 3,
    partnerName: 'Green Earth Foundation',
    media: [ { type: 'video', url: 'https://example.com/green-journey.mp4', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', duration: '03:24' } ],
    engagement: { likes: 567, comments: 89, shares: 234, bookmarks: 67, clicks: 3450, reach: 15670, impressions: 28900 },
    interactions: { reactions: [ { type: 'like', count: 400 }, { type: 'love', count: 120 } ], topComments: [ { id: 'CMT002', authorId: 'TNV007', authorName: 'Lê Văn Cường', content: 'Tự hào khi là một phần của dự án ý nghĩa này!', createdAt: '2024-12-05T12:30:00Z', likes: 34, replies: 8 } ] },
    tags: ['môi trường','trồng cây'],
    mentions: ['@GreenEarth'],
    hashtags: ['#SaveTheEarth','#GoGreen'],
    location: 'Đồng Nai',
    language: 'vi',
    aiAnalysis: { sentiment: 'very_positive', topics: ['environment','sustainability'], toxicity: 0.01, spam: 0.02, relevance: 0.98 },
    moderationHistory: [ { date: '2024-12-05T11:00:00Z', action: 'promoted', moderator: 'Admin Nguyen', note: 'Promoted due to high engagement' } ],
    reports: 0, reportReasons: [], engagementRate: 18.9, viralityScore: 95.3, qualityScore: 96.8, communityImpact: 'very_positive'
  },
  {
    id: 'FEED003',
    type: 'post',
    content: 'Ai biết chỗ nào cần tình nguyện viên dọn dẹp không? Mình có nhóm 5 người muốn đóng góp cho cộng đồng cuối tuần này. Liên hệ mình qua tin nhắn riêng nhé!',
    authorId: 'TNV003',
    authorName: 'Phạm Hoàng Nam',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    authorRole: 'volunteer',
    authorTrustScore: 4.2, authorVerified: false,
    createdAt: '2024-12-05T08:20:00Z', editedAt: null, status: 'published', visibility: 'public', isPromoted: false, isPinned: false,
    media: [], engagement: { likes: 28, comments: 15, shares: 3, bookmarks: 8, clicks: 156, reach: 890, impressions: 1230 },
    interactions: { reactions: [ { type: 'like', count: 25 } ], topComments: [ { id: 'CMT003', authorId: 'TNV008', authorName: 'Mai Thị Linh', content: 'Bạn có thể tham gia nhóm "Sài Gòn Sạch" của chúng mình. Họp mỗi chủ nhật!', createdAt: '2024-12-05T09:45:00Z', likes: 12, replies: 3 } ] },
    tags: ['tình nguyện','dọn dẹp'], mentions: [], hashtags: ['#volunteer','#cleanup'], location: 'TP.HCM', language: 'vi', aiAnalysis: { sentiment: 'positive', topics: ['volunteer_recruitment'], toxicity: 0.03, spam: 0.05, relevance: 0.88 }, moderationHistory: [], reports: 0, reportReasons: [], engagementRate: 3.7, viralityScore: 45.2, qualityScore: 78.3, communityImpact: 'positive'
  },
  {
    id: 'FEED004',
    type: 'post',
    content: 'SPAM: Kiếm tiền dễ dàng với MLM! Chỉ cần đầu tư 2 triệu là có thể thu về 20 triệu/tháng. Liên hệ ngay: 0987654321.',
    authorId: 'SPAM001', authorName: 'Nguyễn Văn Fake', authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    authorRole: 'user', authorTrustScore: 1.2, authorVerified: false, createdAt: '2024-12-05T07:15:00Z', status: 'flagged', visibility: 'hidden', isPromoted: false, isPinned: false,
    media: [], engagement: { likes: 2, comments: 1, shares: 0, bookmarks: 0, clicks: 23, reach: 45, impressions: 178 },
    interactions: { reactions: [ { type: 'like', count: 2 } ], topComments: [] },
    tags: ['MLM','kiếm tiền'], mentions: [], hashtags: ['#money','#opportunity'], location: null, language: 'vi', aiAnalysis: { sentiment: 'neutral', topics: ['spam','financial_scam'], toxicity: 0.15, spam: 0.95, relevance: 0.02 },
    moderationHistory: [ { date: '2024-12-05T07:16:00Z', action: 'auto_flagged', moderator: 'AI System', note: 'Auto-flagged for spam' } ], reports: 8, reportReasons: ['spam','scam'], engagementRate: 1.1, viralityScore: 5.2, qualityScore: 12.3, communityImpact: 'negative'
  },
  {
    id: 'FEED005',
    type: 'image_gallery',
    content: 'Những khoảnh khắc đáng nhớ từ chương trình "Mang yêu thương đến trẻ em khuyết tật" 💕',
    authorId: 'TNV005', authorName: 'Trần Thị Mai', authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    authorRole: 'volunteer', authorTrustScore: 4.7, authorVerified: true, createdAt: '2024-12-04T16:30:00Z', status: 'published', visibility: 'public', isPromoted: false, isPinned: false,
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600', thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300', caption: 'Hoạt động vẽ tranh cùng các em' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600', thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300', caption: 'Trao quà cho các em nhỏ' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600', thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300', caption: 'Cùng nhau học tập' }
    ],
    engagement: { likes: 289, comments: 45, shares: 67, bookmarks: 34, clicks: 1890, reach: 7800, impressions: 12450 },
    interactions: { reactions: [ { type: 'like', count: 200 }, { type: 'love', count: 80 } ], topComments: [ { id: 'CMT005', authorId: 'TNV009', authorName: 'Lê Thị Hoa', content: 'Những khoảnh khắc thật ý nghĩa!', createdAt: '2024-12-04T18:15:00Z', likes: 23, replies: 5 } ] },
    tags: ['trẻ em','khuyết tật'], mentions: ['@UNICEF'], hashtags: ['#children','#support','#UNICEF'], location: 'Hà Nội', language: 'vi', aiAnalysis: { sentiment: 'very_positive', topics: ['children_welfare'], toxicity: 0.01, spam: 0.01, relevance: 0.97 }, moderationHistory: [], reports: 0, reportReasons: [], engagementRate: 12.8, viralityScore: 87.6, qualityScore: 94.2, communityImpact: 'very_positive'
  }
];

export default function CommunityFeedManagement({ data = MOCK_FEED }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [filters, setFilters] = useState({ contentType: 'all', engagement: 'all', riskLevel: 'all', source: 'all', timeRange: '24h' });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const stats = useMemo(() => ([
    { title: 'Tổng bài đăng', value: '2,847', change: '+156', trend: 'up', icon: BookText },
    { title: 'Tương tác/ngày', value: '18.2K', change: '+12%', trend: 'up', icon: Heart },
    { title: 'Nội dung bị gắn cờ', value: '23', change: '-8', trend: 'down', icon: Flag },
    { title: 'Engagement Rate', value: '8.7%', change: '+1.2%', trend: 'up', icon: TrendingUp }
  ]), []);

  const tabs = useMemo(() => ([
    { id: 'all', label: 'Tất cả bài đăng', icon: BookText },
    { id: 'trending', label: 'Thịnh hành', icon: Flame },
    { id: 'flagged', label: 'Bị gắn cờ', icon: Flag },
    { id: 'promoted', label: 'Được quảng bá', icon: TrendingUp },
    { id: 'reported', label: 'Bị báo cáo', icon: AlertTriangle },
    { id: 'hidden', label: 'Đã ẩn', icon: EyeOff }
  ]), []);

  const contentTypes = useMemo(() => ([
    { id: 'all', label: 'Tất cả', icon: BookText },
    { id: 'post', label: 'Bài viết', icon: FileText },
    { id: 'image_gallery', label: 'Hình ảnh', icon: Image },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'poll', label: 'Bình chọn', icon: BarChart3 }
  ]), []);

  const getStatusConfig = useCallback((status) => {
    const configs = {
      published: { color: 'bg-green-100 text-green-800', label: 'Đã đăng', icon: CheckCircle },
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Nháp', icon: Edit },
      flagged: { color: 'bg-red-100 text-red-800', label: 'Bị gắn cờ', icon: Flag },
      hidden: { color: 'bg-yellow-100 text-yellow-800', label: 'Đã ẩn', icon: EyeOff },
      deleted: { color: 'bg-red-100 text-red-800', label: 'Đã xóa', icon: Trash2 }
    };
    return configs[status] || configs.published;
  }, []);

  const getImpactConfig = useCallback((impact) => {
    const configs = {
      very_positive: { color: 'text-green-600', label: 'Rất tích cực', bgColor: 'bg-green-100' },
      positive: { color: 'text-blue-600', label: 'Tích cực', bgColor: 'bg-blue-100' },
      neutral: { color: 'text-gray-600', label: 'Trung tính', bgColor: 'bg-gray-100' },
      negative: { color: 'text-orange-600', label: 'Tiêu cực', bgColor: 'bg-orange-100' },
      very_negative: { color: 'text-red-600', label: 'Rất tiêu cực', bgColor: 'bg-red-100' }
    };
    return configs[impact] || configs.neutral;
  }, []);

  const formatNumber = useCallback((num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return String(num);
  }, []);

  const getTimeAgo = useCallback((dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return (data || []).filter(post => {
      const matchesSearch = !q || (
        (post.content || '').toLowerCase().includes(q) ||
        (post.authorName || '').toLowerCase().includes(q) ||
        (post.tags || []).some(t => t.toLowerCase().includes(q)) ||
        (post.hashtags || []).some(h => h.toLowerCase().includes(q))
      );

      let matchesTab = true;
      if (activeTab !== 'all') {
        if (activeTab === 'trending') matchesTab = (post.viralityScore || 0) >= 80;
        else if (activeTab === 'flagged') matchesTab = post.status === 'flagged' || (post.aiAnalysis?.spam || 0) > 0.5;
        else if (activeTab === 'promoted') matchesTab = !!post.isPromoted;
        else if (activeTab === 'reported') matchesTab = (post.reports || 0) > 0;
        else if (activeTab === 'hidden') matchesTab = post.visibility === 'hidden';
      }

      let matchesType = true;
      if (filters.contentType && filters.contentType !== 'all') matchesType = post.type === filters.contentType;

      return matchesSearch && matchesTab && matchesType;
    }).sort((a,b) => {
      const av = a[sortBy]; const bv = b[sortBy];
      if (av == null && bv == null) return 0;
      if (av == null) return sortOrder === 'desc' ? 1 : -1;
      if (bv == null) return sortOrder === 'desc' ? -1 : 1;
      if (typeof av === 'string' && typeof bv === 'string') return sortOrder === 'desc' ? bv.localeCompare(av) : av.localeCompare(bv);
      return sortOrder === 'desc' ? Number(bv) - Number(av) : Number(av) - Number(bv);
    });
  }, [data, searchQuery, activeTab, filters.contentType, sortBy, sortOrder]);

  // pagination
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;
  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const s = (page - 1) * PAGE_SIZE; return filteredPosts.slice(s, s + PAGE_SIZE);
  }, [filteredPosts, page]);

  useEffect(() => setPage(1), [searchQuery, activeTab, filters.contentType, sortBy, sortOrder]);

  const toggleSelect = useCallback((id) => {
    setSelectedPosts(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  },[]);

  const handleTogglePin = useCallback((postId) => { console.log('Toggle pin:', postId); }, []);
  const handleTogglePromote = useCallback((postId) => { console.log('Toggle promote:', postId); }, []);
  const handleHidePost = useCallback((postId) => { console.log('Hide post:', postId); }, []);
  const handleDeletePost = useCallback((postId) => { console.log('Delete post:', postId); }, []);

  const openDetail = useCallback((post) => { setSelectedPost(post); setShowDetailModal(true); }, []);
  const closeDetail = useCallback(() => { setSelectedPost(null); setShowDetailModal(false); }, []);

  const FeedPostCard = ({ post }) => {
    const statusConfig = getStatusConfig(post.status);
    const impactConfig = getImpactConfig(post.communityImpact);

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <input type="checkbox" checked={selectedPosts.includes(post.id)} onChange={() => toggleSelect(post.id)} className="rounded border-gray-300" />
              <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full object-cover border" />
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">{post.authorName}</p>
                  {post.authorVerified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                  <span className={`px-2 py-1 text-xs rounded-full ${post.authorRole==='organization'? 'bg-purple-100 text-purple-800' : post.authorRole==='volunteer'? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {post.authorRole==='organization'? 'Tổ chức' : post.authorRole==='volunteer'? 'TNV' : 'Người dùng'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {post.isPinned && <Pin className="w-4 h-4 text-purple-600" />}
              {post.isPromoted && <TrendingUp className="w-4 h-4 text-green-600" />}
              <span className={`px-2 py-1 text-xs rounded-full ${statusConfig.color}`}>{statusConfig.label}</span>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => console.log('open menu', post.id)} aria-label="More">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-gray-900 leading-relaxed">{post.content}</p>
          </div>

          {(post.eventTitle || post.partnerName || post.location) && (
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              {post.eventTitle && <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{post.eventTitle}</span></div>}
              {post.partnerName && <div className="flex items-center space-x-1"><Building className="w-4 h-4" /><span>{post.partnerName}</span></div>}
              {post.location && <div className="flex items-center space-x-1"><MapPin className="w-4 h-4" /><span>{post.location}</span></div>}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            {(post.hashtags || []).slice(0,3).map((h, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">{h}</span>
            ))}
            {(post.tags || []).slice(0,3).map((t, idx) => (
              <span key={`t-${idx}`} className="text-xs px-2 py-1 bg-gray-50 rounded border">{t}</span>
            ))}
          </div>

          {/* Media */}
          {post.media?.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {post.media.slice(0,6).map((m, i) => (
                <div key={i} className="relative bg-gray-50 rounded overflow-hidden">
                  {m.type === 'image' ? (
                    <img src={m.thumbnail || m.url} alt={m.caption || 'media'} className="w-full h-28 object-cover" />
                  ) : (
                    <div className="relative">
                      <img src={m.thumbnail} alt="video" className="w-full h-28 object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-2"><Play className="w-5 h-5 text-white" /></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Engagement row */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1"><Heart className="w-4 h-4" /><span>{formatNumber(post.engagement?.likes || 0)}</span></div>
              <div className="flex items-center space-x-1"><MessageSquare className="w-4 h-4" /><span>{formatNumber(post.engagement?.comments || 0)}</span></div>
              <div className="flex items-center space-x-1"><Share className="w-4 h-4" /><span>{formatNumber(post.engagement?.shares || 0)}</span></div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 text-xs bg-green-50 rounded" onClick={() => handleTogglePromote(post.id)}>{post.isPromoted? 'Unpromote':'Promote'}</button>
              <button className="px-2 py-1 text-xs bg-purple-50 rounded" onClick={() => handleTogglePin(post.id)}>{post.isPinned? 'Unpin':'Pin'}</button>
              <button className="px-2 py-1 text-xs bg-yellow-50 rounded" onClick={() => handleHidePost(post.id)}>Hide</button>
              <button className="px-2 py-1 text-xs bg-red-50 rounded" onClick={() => handleDeletePost(post.id)}>Delete</button>
              <button className="px-2 py-1 text-xs border rounded" onClick={() => openDetail(post)}>Chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Community Feed Management</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Tìm kiếm theo nội dung, tác giả, hashtag..." className="px-3 py-2 border rounded-lg w-80" />
            <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
          </div>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">Tạo bài mới</button>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{s.title}</p>
              <p className="font-semibold text-lg">{s.value}</p>
            </div>
            <s.icon className="w-6 h-6 text-gray-400" />
          </div>
        ))}
      </div>

      {/* tabs + filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`px-3 py-2 rounded-md ${activeTab===t.id? 'bg-gray-800 text-white':'bg-white border'}`}>
              <div className="flex items-center space-x-2"><t.icon className="w-4 h-4" /><span>{t.label}</span></div>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <select value={filters.contentType} onChange={(e)=>setFilters(f=>({...f, contentType: e.target.value}))} className="px-2 py-2 border rounded">
            {contentTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.label}</option>)}
          </select>

          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="px-2 py-2 border rounded">
            <option value="createdAt">Mới nhất</option>
            <option value="viralityScore">Virality</option>
            <option value="engagementRate">Engagement Rate</option>
          </select>

          <select value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)} className="px-2 py-2 border rounded">
            <option value="desc">Giảm dần</option>
            <option value="asc">Tăng dần</option>
          </select>
        </div>
      </div>

      {/* posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageItems.map(p => <FeedPostCard key={p.id} post={p} />)}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Hiển thị {(page-1)*PAGE_SIZE + 1} - {Math.min(page*PAGE_SIZE, filteredPosts.length)} / {filteredPosts.length}</div>
        <div className="flex items-center space-x-2">
          <button onClick={()=>setPage(s=>Math.max(1,s-1))} className="px-3 py-1 border rounded">Prev</button>
          <div className="px-3 py-1 border rounded bg-white">{page} / {pageCount}</div>
          <button onClick={()=>setPage(s=>Math.min(pageCount,s+1))} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Chi tiết bài viết</h3>
              <button onClick={closeDetail} className="px-3 py-1 border rounded">Đóng</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img src={selectedPost.authorAvatar} alt={selectedPost.authorName} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="flex items-center gap-2"><p className="font-medium">{selectedPost.authorName}</p>{selectedPost.authorVerified && <CheckCircle className="w-4 h-4 text-blue-500" />}</div>
                  <p className="text-xs text-gray-500">{new Date(selectedPost.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <p className="text-gray-800">{selectedPost.content}</p>

              {selectedPost.media?.length>0 && (
                <div className="grid grid-cols-3 gap-2">
                  {selectedPost.media.map((m,i)=>(
                    <div key={i} className="rounded overflow-hidden">
                      <img src={m.thumbnail || m.url} alt={m.caption||'media'} className="w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">AI Sentiment: <strong>{selectedPost.aiAnalysis?.sentiment}</strong></p>
                <p className="text-sm text-gray-600">Toxicity: {(selectedPost.aiAnalysis?.toxicity||0).toFixed(2)}</p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
