import React, { useMemo, useState } from 'react';
import {
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle,
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  Building, Phone, Mail, Globe, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, Crown, Zap, Package,
  BarChart3, PlusCircle, ExternalLink, Briefcase, DollarSign,
  Upload, Camera, User, Image, CheckSquare, AlertCircle,
  ArrowUp, ArrowDown, RefreshCw, Coins, Gift, Lock,
  PieChart, LineChart, BarChart, TrendingDown, Percent,
  UserCheck, UserX, Link, Send, PlayCircle, PauseCircle,
  BookText, Video, Heart, Share, Play, ShieldAlert
} from 'lucide-react';

/**
 * ContentQueue - complete moderation queue UI for content items
 *
 * Note: All "actions" here are mock (state updates + console.log).
 * Replace console.log with real API calls as needed.
 */
export default function ContentQueue() {
  // initial content items (moved into state so actions persist)
  const [contentItems, setContentItems] = useState(() => ([
    {
      id: 'CNT001',
      type: 'post',
      title: 'Trải nghiệm tuyệt vời tại sự kiện từ thiện UNICEF',
      content:
        'Hôm qua mình đã tham gia sự kiện hỗ trợ trẻ em khuyết tật do UNICEF tổ chức. Cảm giác thật ý nghĩa khi được đóng góp cho cộng đồng. Các em nhỏ rất đáng yêu và biết ơn. Hy vọng sẽ có thêm nhiều hoạt động tương tự để chúng ta cùng lan tỏa yêu thương.',
      authorId: 'TNV001',
      authorName: 'Nguyễn Minh Anh',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150',
      authorTrustScore: 4.8,
      eventId: 'EVT001',
      eventTitle: 'Hỗ trợ trẻ em khuyết tật',
      partnerId: 1,
      partnerName: 'UNICEF Việt Nam',
      createdAt: '2024-12-05T10:30:00Z',
      status: 'pending',
      priority: 'medium',
      aiFlag: false,
      aiReason: null,
      riskScore: 15,
      autoApproved: false,
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600',
          thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600',
          thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300'
        }
      ],
      tags: ['tình nguyện', 'trẻ em', 'UNICEF', 'khuyết tật'],
      location: 'Hà Nội',
      isSpotlight: false,
      reports: 0,
      category: 'story',
      source: 'mobile_app',
      language: 'vi',
      mentions: ['@UNICEF', '@volunteercenter'],
      hashtags: ['#volunteering', '#children', '#charity'],
      moderationHistory: [],
      relatedContent: [],
      duplicateScore: 0
    },
    {
      id: 'CNT002',
      type: 'video',
      title: 'Workshop công nghệ cho cộng đồng tại Samsung',
      content:
        'Chia sẻ những khoảnh khắc đáng nhớ trong chương trình Công nghệ cho Cộng đồng. Rất vui khi được học hỏi và chia sẻ kiến thức với mọi người. Samsung đã tạo ra một môi trường học tập tuyệt vời.',
      authorId: 'TNV002',
      authorName: 'Trần Thị Bình',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      authorTrustScore: 4.2,
      eventId: 'EVT002',
      eventTitle: 'Chương trình Công nghệ cho Cộng đồng',
      partnerId: 2,
      partnerName: 'Samsung Electronics Vietnam',
      createdAt: '2024-12-04T15:20:00Z',
      status: 'flagged',
      priority: 'high',
      aiFlag: true,
      aiReason: 'Phát hiện có thể chứa thông tin cá nhân nhạy cảm trong video. Xuất hiện số điện thoại và địa chỉ email trong một số frame.',
      riskScore: 75,
      autoApproved: false,
      engagement: { likes: 45, comments: 8, shares: 12, views: 234 },
      media: [
        {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600',
          duration: '02:45',
          size: '45.2MB'
        }
      ],
      tags: ['công nghệ', 'samsung', 'workshop', 'học tập'],
      location: 'TP.HCM',
      isSpotlight: false,
      reports: 2,
      category: 'highlight',
      source: 'web_upload',
      language: 'vi',
      mentions: ['@Samsung', '@techforcommunity'],
      hashtags: ['#technology', '#workshop', '#samsung'],
      moderationHistory: [
        {
          date: '2024-12-04T16:00:00Z',
          action: 'ai_flagged',
          reviewer: 'AI System',
          note: 'Tự động gắn cờ do phát hiện thông tin cá nhân'
        }
      ],
      relatedContent: [],
      duplicateScore: 0
    },
    {
      id: 'CNT003',
      type: 'post',
      title: 'Cảm ơn cộng đồng đã ủng hộ hành trình xanh',
      content:
        'Thật sự rất cảm động khi nhận được sự ủng hộ từ cộng đồng trong dự án Hành trình xanh cho môi trường. Chúng ta đã trồng được 500 cây xanh và dọn dẹp 3km bờ biển. Đây là kết quả của tinh thần đoàn kết và ý thức bảo vệ môi trường của tất cả mọi người.',
      authorId: 'TNV003',
      authorName: 'Lê Văn Cường',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      authorTrustScore: 4.9,
      eventId: 'EVT003',
      eventTitle: 'Hành trình xanh cho môi trường',
      partnerId: 3,
      partnerName: 'Green Earth Foundation',
      createdAt: '2024-12-03T09:15:00Z',
      status: 'approved',
      priority: 'medium',
      aiFlag: false,
      aiReason: null,
      riskScore: 5,
      autoApproved: true,
      engagement: { likes: 128, comments: 23, shares: 34, views: 1250 },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600',
          thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300'
        }
      ],
      tags: ['môi trường', 'xanh', 'cộng đồng', 'trồng cây'],
      location: 'Đà Nẵng',
      isSpotlight: true,
      reports: 0,
      category: 'story',
      source: 'mobile_app',
      language: 'vi',
      mentions: ['@GreenEarth', '@danangcity'],
      hashtags: ['#environment', '#green', '#community'],
      moderationHistory: [
        {
          date: '2024-12-03T10:30:00Z',
          action: 'auto_approved',
          reviewer: 'AI System',
          note: 'Tự động duyệt - Risk score thấp, tác giả uy tín cao'
        },
        {
          date: '2024-12-03T14:20:00Z',
          action: 'spotlight_added',
          reviewer: 'Admin Nguyen',
          note: 'Thêm vào Spotlight do nội dung tích cực và engagement cao'
        }
      ],
      relatedContent: ['CNT004', 'CNT005'],
      duplicateScore: 0
    },
    {
      id: 'CNT004',
      type: 'post',
      title: 'Quảng cáo dịch vụ không phù hợp',
      content:
        'Các bạn muốn kiếm tiền nhanh không? Tham gia ngay chương trình của chúng tôi, chỉ cần 500k đầu tư ban đầu là có thể nhận về 5 triệu sau 1 tháng. Liên hệ ngay với tôi qua số 0987654321.',
      authorId: 'TNV004',
      authorName: 'Nguyễn Văn X',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      authorTrustScore: 2.1,
      eventId: null,
      eventTitle: null,
      partnerId: null,
      partnerName: null,
      createdAt: '2024-12-02T14:45:00Z',
      status: 'rejected',
      priority: 'high',
      aiFlag: true,
      aiReason:
        'Nội dung có dấu hiệu lừa đảo: đề cập đến lợi nhuận bất thường, yêu cầu đầu tư ban đầu, chứa số điện thoại cá nhân. Risk score cao do từ khóa spam.',
      riskScore: 95,
      autoApproved: false,
      engagement: { likes: 2, comments: 1, shares: 0, views: 45 },
      media: [],
      tags: ['kiếm tiền', 'đầu tư'],
      location: null,
      isSpotlight: false,
      reports: 5,
      category: 'spam',
      source: 'web_post',
      language: 'vi',
      mentions: [],
      hashtags: ['#money', '#investment'],
      moderationHistory: [
        {
          date: '2024-12-02T14:46:00Z',
          action: 'ai_flagged',
          reviewer: 'AI System',
          note: 'Tự động gắn cờ do phát hiện từ khóa spam và lừa đảo'
        },
        {
          date: '2024-12-02T16:30:00Z',
          action: 'rejected',
          reviewer: 'Admin Tran',
          note: 'Từ chối do vi phạm chính sách về quảng cáo dịch vụ tài chính không rõ ràng'
        }
      ],
      relatedContent: [],
      duplicateScore: 0
    },
    {
      id: 'CNT005',
      type: 'image',
      title: 'Khoảnh khắc đẹp từ sự kiện giáo dục',
      content:
        'Những nụ cười hồn nhiên của các em học sinh trong chương trình giáo dục miễn phí. Cảm ơn các thầy cô tình nguyện đã dành thời gian và tâm huyết.',
      authorId: 'TNV005',
      authorName: 'Phạm Thị Mai',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150',
      authorTrustScore: 4.6,
      eventId: 'EVT005',
      eventTitle: 'Chương trình giáo dục miễn phí cho trẻ em',
      partnerId: 4,
      partnerName: 'Education for All Vietnam',
      createdAt: '2024-12-01T11:20:00Z',
      status: 'pending',
      priority: 'low',
      aiFlag: false,
      aiReason: null,
      riskScore: 10,
      autoApproved: false,
      engagement: { likes: 67, comments: 12, shares: 8, views: 890 },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
          thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600',
          thumbnail: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600',
          thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300'
        }
      ],
      tags: ['giáo dục', 'trẻ em', 'tình nguyện', 'học sinh'],
      location: 'Bình Dương',
      isSpotlight: false,
      reports: 0,
      category: 'story',
      source: 'mobile_app',
      language: 'vi',
      mentions: ['@EducationForAll'],
      hashtags: ['#education', '#children', '#volunteer'],
      moderationHistory: [],
      relatedContent: ['CNT003'],
      duplicateScore: 0
    }
  ]));

  // UI state
  const [activeTab, setActiveTab] = useState('pending'); // pending, flagged, approved, rejected, spotlight, reported, all
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({ contentType: 'all', riskLevel: 'all', source: 'all', dateRange: '7' });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showBulkModal, setShowBulkModal] = useState(false);

  // helper UI lists
  const tabs = [
    { id: 'pending', label: 'Chờ duyệt', icon: Clock },
    { id: 'flagged', label: 'AI cảnh báo', icon: AlertTriangle },
    { id: 'approved', label: 'Đã duyệt', icon: CheckCircle },
    { id: 'rejected', label: 'Đã từ chối', icon: XCircle },
    { id: 'spotlight', label: 'Spotlight', icon: Star },
    { id: 'reported', label: 'Bị báo cáo', icon: Flag },
    { id: 'all', label: 'Tất cả', icon: BookText }
  ];

  // Helpers: configs (status / priority / risk)
  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ duyệt', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', label: 'Đã duyệt', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Đã từ chối', icon: XCircle },
      flagged: { color: 'bg-orange-100 text-orange-800', label: 'AI cảnh báo', icon: Flag }
    };
    return configs[status] || configs.pending;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { color: 'bg-red-100 text-red-800', label: 'Cao', icon: AlertTriangle },
      medium: { color: 'bg-orange-100 text-orange-800', label: 'Trung bình', icon: AlertCircle },
      low: { color: 'bg-green-100 text-green-800', label: 'Thấp', icon: CheckCircle }
    };
    return configs[priority] || configs.medium;
  };

  const getRiskLevel = (score) => {
    if (score >= 80) return { level: 'critical', color: 'text-red-600', label: 'Rất cao', bgColor: 'bg-red-100' };
    if (score >= 60) return { level: 'high', color: 'text-orange-600', label: 'Cao', bgColor: 'bg-orange-100' };
    if (score >= 30) return { level: 'medium', color: 'text-yellow-600', label: 'Trung bình', bgColor: 'bg-yellow-100' };
    return { level: 'low', color: 'text-green-600', label: 'Thấp', bgColor: 'bg-green-100' };
  };

  const formatDate = (d) => {
    if (!d) return '-';
    try {
      return new Date(d).toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch { return d; }
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
  };

  // Derived: filtered + sorted content
  const filteredContent = useMemo(() => {
    let arr = [...contentItems];

    // tab
    if (activeTab !== 'all') {
      if (activeTab === 'pending') arr = arr.filter(i => i.status === 'pending');
      else if (activeTab === 'flagged') arr = arr.filter(i => i.aiFlag || i.status === 'flagged');
      else if (activeTab === 'approved') arr = arr.filter(i => i.status === 'approved');
      else if (activeTab === 'rejected') arr = arr.filter(i => i.status === 'rejected');
      else if (activeTab === 'spotlight') arr = arr.filter(i => i.isSpotlight);
      else if (activeTab === 'reported') arr = arr.filter(i => i.reports > 0);
    }

    // search
    const q = (searchQuery || '').trim().toLowerCase();
    if (q) {
      arr = arr.filter(i =>
        (i.title || '').toLowerCase().includes(q) ||
        (i.content || '').toLowerCase().includes(q) ||
        (i.authorName || '').toLowerCase().includes(q) ||
        (i.id || '').toLowerCase().includes(q)
      );
    }

    // contentType filter
    if (filters.contentType && filters.contentType !== 'all') {
      arr = arr.filter(i => i.type === filters.contentType);
    }

    // riskLevel filter
    if (filters.riskLevel && filters.riskLevel !== 'all') {
      arr = arr.filter(i => getRiskLevel(i.riskScore).level === filters.riskLevel);
    }

    // source filter
    if (filters.source && filters.source !== 'all') {
      arr = arr.filter(i => i.source === filters.source);
    }

    // sort
    arr.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      // normalize dates to timestamp
      if (sortBy === 'createdAt') { aVal = new Date(aVal).getTime(); bVal = new Date(bVal).getTime(); }
      // riskScore numeric fine
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return arr;
  }, [contentItems, activeTab, searchQuery, filters, sortBy, sortOrder]);

  // Selection helpers
  const toggleSelect = (id) => {
    setSelectedContent(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const selectAllVisible = () => setSelectedContent(filteredContent.map(i => i.id));
  const clearSelection = () => setSelectedContent([]);

  // Actions (mock state updates)
  const openDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };
  const closeDetail = () => {
    setSelectedItem(null);
    setShowDetailModal(false);
  };

  const addModerationHistory = (id, entry) => {
    setContentItems(prev => prev.map(i => i.id === id ? { ...i, moderationHistory: [...(i.moderationHistory || []), entry] } : i));
  };

  const handleApprove = (contentId) => {
    console.log('Approving content:', contentId);
    setContentItems(prev => prev.map(i => i.id === contentId ? { ...i, status: 'approved', autoApproved: false } : i));
    addModerationHistory(contentId, { date: new Date().toISOString(), action: 'approved', reviewer: 'Admin', note: '' });
    // auto-close modal if open for that item
    if (selectedItem?.id === contentId) closeDetail();
  };

  const handleReject = (contentId, reason = '') => {
    console.log('Rejecting content:', contentId, 'Reason:', reason);
    setContentItems(prev => prev.map(i => i.id === contentId ? { ...i, status: 'rejected' } : i));
    addModerationHistory(contentId, { date: new Date().toISOString(), action: 'rejected', reviewer: 'Admin', note: reason });
    if (selectedItem?.id === contentId) closeDetail();
  };

  const handleToggleSpotlight = (contentId) => {
    console.log('Toggle spotlight for content:', contentId);
    setContentItems(prev => prev.map(i => i.id === contentId ? { ...i, isSpotlight: !i.isSpotlight } : i));
    addModerationHistory(contentId, { date: new Date().toISOString(), action: 'toggle_spotlight', reviewer: 'Admin', note: '' });
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for content:', selectedContent);
    if (selectedContent.length === 0) return alert('Chọn ít nhất 1 nội dung để thực hiện hành động hàng loạt.');
    selectedContent.forEach(id => {
      if (action === 'approve') handleApprove(id);
      else if (action === 'reject') handleReject(id, 'Bulk rejected');
      else if (action === 'spotlight') handleToggleSpotlight(id);
      else if (action === 'delete') {
        // mock delete: remove from list
        setContentItems(prev => prev.filter(i => i.id !== id));
        console.log('Deleted (mock):', id);
      }
    });
    setSelectedContent([]);
    setShowBulkModal(false);
  };

  // Export CSV
  const exportCSV = (useSelected = false) => {
    const rows = useSelected ? contentItems.filter(i => selectedContent.includes(i.id)) : contentItems;
    if (!rows || rows.length === 0) return alert('Không có nội dung để xuất.');
    const headers = ['id', 'title', 'authorName', 'type', 'status', 'priority', 'riskScore', 'createdAt', 'source', 'tags'];
    const csv = [
      headers.join(','),
      ...rows.map(r => headers.map(h => {
        let val = r[h];
        if (h === 'tags' && Array.isArray(val)) val = val.join('; ');
        if (typeof val === 'string') return `"${val.replace(/"/g, '""')}"`;
        return val === undefined || val === null ? '' : val;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content_export_${useSelected ? 'selected' : 'all'}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Render content card component (inline)
  const ContentCard = ({ item }) => {
    const statusCfg = getStatusConfig(item.status);
    const priorityCfg = getPriorityConfig(item.priority);
    const risk = getRiskLevel(item.riskScore);

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
        {/* header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedContent.includes(item.id)}
                onChange={(e) => toggleSelect(item.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <img src={item.authorAvatar} alt={item.authorName} className="w-10 h-10 rounded-full object-cover border" />
              <div>
                <p className="font-medium text-gray-900">{item.authorName}</p>
                <p className="text-sm text-gray-500">{getTimeAgo(item.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${statusCfg.color}`}>{statusCfg.label}</span>
              {item.priority && <span className={`px-2 py-1 text-xs rounded-full ${priorityCfg.color}`}>{priorityCfg.label}</span>}
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
          <p className="text-gray-700 text-sm line-clamp-3 mb-3">{item.content}</p>

          <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600 mb-3">
            <span className="flex items-center space-x-1"><FileText className="w-4 h-4" /><span className="capitalize">{item.type}</span></span>
            {item.eventTitle && <><span>•</span><span className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{item.eventTitle}</span></span></>}
            {item.location && <><span>•</span><span className="flex items-center space-x-1"><MapPin className="w-4 h-4" /><span>{item.location}</span></span></>}
          </div>

          <div className="flex items-center flex-wrap gap-2 mb-3">
            {item.aiFlag && (<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />AI Flag</span>)}
            {item.isSpotlight && (<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><Star className="w-3 h-3 mr-1" />Spotlight</span>)}
            {item.reports > 0 && (<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"><Flag className="w-3 h-3 mr-1" />{item.reports} báo cáo</span>)}
            {item.autoApproved && (<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Zap className="w-3 h-3 mr-1" />Auto Approved</span>)}
            <span className="ml-auto text-xs text-gray-500">Risk: <span className="font-semibold">{Math.round(item.riskScore)}%</span></span>
          </div>
        </div>

        {/* media */}
        {item.media && item.media.length > 0 && (
          <div className="relative">
            {item.media[0].type === 'image' ? (
              <div className="relative">
                <img src={item.media[0].thumbnail || item.media[0].url} alt="content media" className="w-full h-48 object-cover" />
                {item.media.length > 1 && <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-medium">+{item.media.length - 1} ảnh</div>}
              </div>
            ) : (
              <div className="relative">
                <img src={item.media[0].thumbnail} alt="video thumb" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-60 rounded-full p-3">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
                {item.media[0].duration && <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">{item.media[0].duration}</div>}
              </div>
            )}
          </div>
        )}

        {/* footer actions */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => openDetail(item)} title="Xem chi tiết" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50">
              <Eye className="w-4 h-4 text-gray-600" /><span className="text-sm text-gray-600">Xem</span>
            </button>

            <button onClick={() => handleApprove(item.id)} title="Phê duyệt" className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 hover:bg-green-100">
              <CheckCircle className="w-4 h-4 text-green-600" /><span className="text-sm text-green-600">Phê duyệt</span>
            </button>

            <button onClick={() => handleReject(item.id, 'Không phù hợp chính sách')} title="Từ chối" className="flex items-center space-x-2 px-3 py-2 rounded-md bg-red-50 hover:bg-red-100">
              <XCircle className="w-4 h-4 text-red-600" /><span className="text-sm text-red-600">Từ chối</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={() => handleToggleSpotlight(item.id)} title="Toggle spotlight" className={`px-3 py-2 rounded-md ${item.isSpotlight ? 'bg-purple-50 hover:bg-purple-100' : 'border hover:bg-gray-50'}`}>
              <Star className="w-4 h-4 text-purple-600" />
            </button>
            <button title="Thêm ghi chú" className="px-3 py-2 rounded-md border hover:bg-gray-50">
              <MessageSquare className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // MAIN render
  return (
    <div className="w-full mx-auto">
      {/* header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Queue</h1>
          <p className="text-sm text-gray-600 mt-1">Quản lý nội dung user-generated: duyệt, đánh dấu spotlight, kiểm duyệt AI</p>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={() => exportCSV(false)} className="px-3 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2">
            <Download className="w-4 h-4" /><span>Xuất CSV</span>
          </button>
          <button onClick={() => exportCSV(true)} className="px-3 py-2 border rounded-md text-sm">Xuất (chọn)</button>
        </div>
      </div>

      {/* stats + controls */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/** small stats */}
        <div className="col-span-1 lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <div className="text-sm text-gray-500">Tổng nội dung</div>
            <div className="text-2xl font-semibold">4,892</div>
            <div className="text-xs text-gray-500 mt-1">Thay đổi: +12%</div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="text-sm text-gray-500">Chờ kiểm duyệt</div>
            <div className="text-2xl font-semibold">{contentItems.filter(i => i.status === 'pending').length}</div>
            <div className="text-xs text-gray-500 mt-1">AI cảnh báo: {contentItems.filter(i => i.aiFlag).length}</div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="text-sm text-gray-500">Spotlight</div>
            <div className="text-2xl font-semibold">{contentItems.filter(i => i.isSpotlight).length}</div>
            <div className="text-xs text-gray-500 mt-1">Nội dung nổi bật</div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="text-sm text-gray-500">Bị báo cáo</div>
            <div className="text-2xl font-semibold">{contentItems.filter(i => i.reports > 0).length}</div>
            <div className="text-xs text-gray-500 mt-1">Phải xử lý</div>
          </div>
        </div>
      </div>

      {/* tabs + search */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-x-auto">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center space-x-2 px-3 py-2 rounded text-sm ${activeTab === t.id ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                {React.createElement(t.icon, { className: 'w-4 h-4' })}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Tìm kiếm tiêu đề, nội dung, tác giả, mã..." className="pl-9 pr-3 py-2 border rounded-md w-80" />
            </div>

            <select value={filters.contentType} onChange={(e) => setFilters(f => ({ ...f, contentType: e.target.value }))} className="px-3 py-2 border rounded">
              <option value="all">Tất cả loại</option>
              <option value="post">Bài viết</option>
              <option value="image">Hình ảnh</option>
              <option value="video">Video</option>
            </select>

            <select value={filters.riskLevel} onChange={(e) => setFilters(f => ({ ...f, riskLevel: e.target.value }))} className="px-3 py-2 border rounded">
              <option value="all">Tất cả rủi ro</option>
              <option value="low">Thấp</option>
              <option value="medium">Trung bình</option>
              <option value="high">Cao</option>
              <option value="critical">Rất cao</option>
            </select>

            <div className="flex items-center space-x-2">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-2 py-2 border rounded">
                <option value="createdAt">Ngày tạo</option>
                <option value="riskScore">Risk score</option>
                <option value="authorTrustScore">Author trust</option>
              </select>
              <button onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')} className="px-2 py-2 border rounded">
                {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* selection toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input type="checkbox" checked={selectedContent.length > 0 && selectedContent.length === filteredContent.length && filteredContent.length > 0} onChange={(e) => e.target.checked ? selectAllVisible() : clearSelection()} className="h-4 w-4" />
          <div className="text-sm text-gray-600">{selectedContent.length} được chọn</div>

          <div className="flex items-center space-x-2">
            <button onClick={() => setShowBulkModal(true)} className="px-3 py-2 border rounded text-sm">Bulk action</button>
            <button onClick={() => exportCSV(true)} className="px-3 py-2 border rounded text-sm">Export (selected)</button>
          </div>
        </div>

        <div className="text-sm text-gray-500">{filteredContent.length} nội dung</div>
      </div>

      {/* grid of content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map(item => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>

      {/* Bulk modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Bulk actions</h3>
              <button onClick={() => setShowBulkModal(false)} className="p-2 rounded hover:bg-gray-100"><XCircle className="w-5 h-5" /></button>
            </div>

            <p className="text-sm text-gray-600 mb-4">Áp dụng hành động cho <strong>{selectedContent.length}</strong> nội dung.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <button onClick={() => handleBulkAction('approve')} className="px-3 py-2 bg-green-600 text-white rounded">Approve</button>
              <button onClick={() => handleBulkAction('reject')} className="px-3 py-2 bg-red-600 text-white rounded">Reject</button>
              <button onClick={() => handleBulkAction('spotlight')} className="px-3 py-2 bg-purple-600 text-white rounded">Toggle Spotlight</button>
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowBulkModal(false)} className="px-3 py-2 border rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {showDetailModal && selectedItem && (
        <ContentDetailModal
          item={selectedItem}
          onClose={closeDetail}
          onApprove={() => handleApprove(selectedItem.id)}
          onReject={(reason) => handleReject(selectedItem.id, reason)}
          onToggleSpotlight={() => handleToggleSpotlight(selectedItem.id)}
        />
      )}
    </div>
  );
}

/* ------------------------
   ContentDetailModal
   ------------------------ */
function ContentDetailModal({ item, onClose, onApprove, onReject, onToggleSpotlight }) {
  const [note, setNote] = useState('');
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <div className="text-sm text-gray-500">{item.authorName} • {item.createdAt}</div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => { onToggleSpotlight(); }} className={`px-3 py-2 rounded-md ${item.isSpotlight ? 'bg-purple-50 text-purple-700' : 'border'}`} title="Toggle spotlight">
              <Star className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100"><XCircle className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {/* media viewer */}
            {item.media && item.media.length > 0 && (
              <div className="space-y-2">
                <div className="w-full h-64 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  {item.media[activeMediaIndex].type === 'image' ? (
                    <img src={item.media[activeMediaIndex].url} alt="media" className="w-full h-full object-cover" />
                  ) : (
                    <div className="relative w-full h-full">
                      <img src={item.media[activeMediaIndex].thumbnail} alt="video" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-3">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                  {item.media.map((m, idx) => (
                    <button key={idx} onClick={() => setActiveMediaIndex(idx)} className={`w-20 h-14 rounded overflow-hidden border ${idx === activeMediaIndex ? 'ring-2 ring-blue-500' : 'border-gray-200'}`}>
                      <img src={m.thumbnail || m.url} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium mb-2">Nội dung</h4>
              <div className="bg-gray-50 rounded p-3">
                <p className="whitespace-pre-wrap text-gray-800">{item.content}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Metadata</h4>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div><span className="text-gray-500">Loại:</span> {item.type}</div>
                <div><span className="text-gray-500">Event:</span> {item.eventTitle || 'N/A'}</div>
                <div><span className="text-gray-500">Nguồn:</span> {item.source}</div>
                <div><span className="text-gray-500">Ngôn ngữ:</span> {item.language}</div>
                <div><span className="text-gray-500">Tags:</span> {item.tags.join(', ')}</div>
                <div><span className="text-gray-500">Mentions:</span> {item.mentions.join(', ')}</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Lịch sử kiểm duyệt</h4>
              <div className="space-y-2">
                {(!item.moderationHistory || item.moderationHistory.length === 0) && <div className="text-sm text-gray-500">Chưa có hành động.</div>}
                {item.moderationHistory && item.moderationHistory.map((h, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{h.reviewer}</div>
                      <div className="text-xs text-gray-500">{formatDate(h.date)}</div>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{h.action} — {h.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* sidebar */}
          <div className="space-y-4">
            <div className="bg-white border rounded p-4">
              <div className="text-sm text-gray-500">Tác giả</div>
              <div className="flex items-center space-x-3 mt-2">
                <img src={item.authorAvatar} alt={item.authorName} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-medium">{item.authorName}</div>
                  <div className="text-xs text-gray-500">Trust: {item.authorTrustScore}</div>
                </div>
              </div>
              <div className="mt-3 text-sm">
                <button className="w-full px-3 py-2 border rounded text-sm">Xem hồ sơ</button>
              </div>
            </div>

            <div className="bg-white border rounded p-4">
              <div className="text-sm text-gray-500">Hành động</div>
              <div className="mt-3 grid gap-2">
                <button onClick={onApprove} className="w-full px-3 py-2 bg-green-600 text-white rounded">Phê duyệt</button>
                <button onClick={() => {
                  if (!note.trim()) return alert('Nhập lý do từ chối (tối thiểu).');
                  onReject(note);
                }} className="w-full px-3 py-2 bg-red-600 text-white rounded">Từ chối</button>
                <button onClick={onToggleSpotlight} className="w-full px-3 py-2 border rounded">{item.isSpotlight ? 'Bỏ Spotlight' : 'Thêm Spotlight'}</button>
              </div>

              <div className="mt-3">
                <label className="text-sm text-gray-700">Ghi chú / Lý do</label>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} className="w-full mt-2 p-2 border rounded" placeholder="Ghi chú..."/>
              </div>
            </div>

            <div className="bg-white border rounded p-4 text-sm text-gray-700">
              <div><strong>Risk score:</strong> {item.riskScore}%</div>
              <div className="mt-2"><strong>Reports:</strong> {item.reports}</div>
              <div className="mt-2"><strong>Source:</strong> {item.source}</div>
            </div>
          </div>
        </div>

        <div className="p-4 flex justify-end border-t">
          <button onClick={onClose} className="px-4 py-2 border rounded mr-2">Đóng</button>
        </div>
      </div>
    </div>
  );
}
