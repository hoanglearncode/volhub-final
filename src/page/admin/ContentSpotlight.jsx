import React, { useState, useMemo, useCallback, useEffect, useReducer } from 'react';
import {
  Star, PlayCircle, Calendar, Clock, Heart, MessageSquare, Share, Eye, Play, PauseCircle,
  TrendingUp, TrendingDown, ThumbsUp, BookText, Globe, Users, Building, Target, BarChart3
} from 'lucide-react';

/**
 * ContentSpotlight
 * - Refactor: split smaller components, useMemo/useCallback/useReducer, debounce search
 * - Keep tailwind css classes from your original design
 */

/* ---------------------------
   Mock data (moved out of component)
   --------------------------- */
const MOCK_SPOTLIGHT = [
  {
    id: 'SPT001',
    originalContentId: 'CNT003',
    title: 'Cảm ơn cộng đồng đã ủng hộ hành trình xanh',
    content: 'Thật sự rất cảm động khi nhận được sự ủng hộ từ cộng đồng trong dự án Hành trình xanh cho môi trường. Chúng ta đã trồng được 500 cây xanh và dọn dẹp 3km bờ biển...',
    type: 'post',
    authorId: 'TNV003',
    authorName: 'Lê Văn Cường',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    authorTrustScore: 4.9,
    eventId: 'EVT003',
    eventTitle: 'Hành trình xanh cho môi trường',
    partnerId: 3,
    partnerName: 'Green Earth Foundation',
    partnerTier: 'verified',
    addedToSpotlight: '2024-12-03T14:20:00Z',
    addedBy: 'Admin Nguyen',
    scheduledStart: '2024-12-03T15:00:00Z',
    scheduledEnd: '2024-12-10T23:59:59Z',
    status: 'active',
    priority: 1,
    category: 'environmental',
    tags: ['môi trường', 'xanh', 'cộng đồng', 'trồng cây'],
    location: 'Đà Nẵng',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600', 
        thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300'
      }
    ],
    originalEngagement: {
      likes: 128,
      comments: 23,
      shares: 34,
      views: 1250
    },
    spotlightEngagement: {
      likes: 892,
      comments: 156,
      shares: 234,
      views: 15670,
      clickThroughs: 1250,
      conversions: 89
    },
    engagementScore: 95.2,
    impactMetrics: {
      newVolunteerSignups: 45,
      eventRegistrations: 78,
      socialMentions: 156,
      shareRate: 18.7
    },
    targetAudience: ['환경보호', '봉사활동', '지역사회'],
    displaySettings: {
      showOnHomepage: true,
      showInMobile: true,
      showInNewsletter: true,
      customBadge: 'Trending',
      badgeColor: '#10B981'
    },
    performance: 'excellent',
    adminNotes: 'Nội dung tích cực, engagement cao, phù hợp với chiến dịch môi trường Q4',
    history: [
      {
        date: '2024-12-03T14:20:00Z',
        action: 'added_to_spotlight',
        user: 'Admin Nguyen',
        note: 'Thêm vào spotlight do engagement cao và nội dung tích cực'
      },
      {
        date: '2024-12-05T10:30:00Z',
        action: 'priority_updated',
        user: 'Admin Tran',
        note: 'Nâng priority lên #1 do performance xuất sắc'
      }
    ]
  },
  {
    id: 'SPT002',
    originalContentId: 'CNT006',
    title: 'Workshop kỹ năng mềm cho sinh viên',
    content: 'Cảm ơn Samsung đã tổ chức workshop kỹ năng mềm rất bổ ích. Các bạn sinh viên đã học được nhiều kiến thức thực tế về giao tiếp, làm việc nhóm và thuyết trình...',
    type: 'video',
    authorId: 'TNV006',
    authorName: 'Nguyễn Thị Hương',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150',
    authorTrustScore: 4.7,
    eventId: 'EVT006',
    eventTitle: 'Workshop kỹ năng mềm cho sinh viên',
    partnerId: 2,
    partnerName: 'Samsung Electronics Vietnam',
    partnerTier: 'premium',
    addedToSpotlight: '2024-12-02T16:45:00Z',
    addedBy: 'Admin Le',
    scheduledStart: '2024-12-02T17:00:00Z',
    scheduledEnd: '2024-12-09T23:59:59Z',
    status: 'active',
    priority: 2,
    category: 'education',
    tags: ['giáo dục', 'kỹ năng mềm', 'sinh viên', 'samsung'],
    location: 'TP.HCM',
    media: [
      { 
        type: 'video', 
        url: 'https://example.com/video2.mp4', 
        thumbnail: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600',
        duration: '04:32'
      }
    ],
    originalEngagement: {
      likes: 67,
      comments: 12,
      shares: 18,
      views: 890
    },
    spotlightEngagement: {
      likes: 456,
      comments: 89,
      shares: 123,
      views: 8900,
      clickThroughs: 670,
      conversions: 45
    },
    engagementScore: 78.5,
    impactMetrics: {
      newVolunteerSignups: 23,
      eventRegistrations: 56,
      socialMentions: 89,
      shareRate: 13.8
    },
    targetAudience: ['교육', '학생', '기술'],
    displaySettings: {
      showOnHomepage: true,
      showInMobile: true,
      showInNewsletter: false,
      customBadge: 'Educational',
      badgeColor: '#3B82F6'
    },
    performance: 'good',
    adminNotes: 'Content chất lượng từ partner premium, tương tác tốt',
    history: [
      {
        date: '2024-12-02T16:45:00Z',
        action: 'added_to_spotlight',
        user: 'Admin Le',
        note: 'Thêm vào spotlight - content giáo dục chất lượng cao'
      }
    ]
  },
  {
    id: 'SPT003',
    originalContentId: 'CNT007',
    title: 'Chương trình hỗ trợ người khuyết tật',
    content: 'Rất xúc động khi tham gia chương trình hỗ trợ người khuyết tật. Mỗi nụ cười, mỗi lời cảm ơn từ các anh chị là động lực to lớn cho chúng tôi tiếp tục hành trình thiện nguyện này...',
    type: 'post',
    authorId: 'TNV007',
    authorName: 'Trần Minh Quân',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    authorTrustScore: 4.5,
    eventId: 'EVT007',
    eventTitle: 'Chương trình hỗ trợ người khuyết tật',
    partnerId: 1,
    partnerName: 'UNICEF Việt Nam',
    partnerTier: 'premium',
    addedToSpotlight: '2024-11-28T11:30:00Z',
    addedBy: 'Admin Nguyen',
    scheduledStart: '2024-11-28T12:00:00Z',
    scheduledEnd: '2024-12-05T23:59:59Z',
    status: 'expired',
    priority: 3,
    category: 'social_support',
    tags: ['người khuyết tật', 'hỗ trợ', 'unicef', 'thiện nguyện'],
    location: 'Hà Nội',
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
    originalEngagement: {
      likes: 89,
      comments: 34,
      shares: 28,
      views: 1100
    },
    spotlightEngagement: {
      likes: 567,
      comments: 123,
      shares: 187,
      views: 12340,
      clickThroughs: 890,
      conversions: 67
    },
    engagementScore: 85.7,
    impactMetrics: {
      newVolunteerSignups: 34,
      eventRegistrations: 89,
      socialMentions: 134,
      shareRate: 15.2
    },
    targetAudience: ['사회복지', '장애인지원', '자원봉사'],
    displaySettings: {
      showOnHomepage: false,
      showInMobile: true,
      showInNewsletter: true,
      customBadge: 'Inspiring',
      badgeColor: '#8B5CF6'
    },
    performance: 'excellent',
    adminNotes: 'Campaign đã kết thúc nhưng có impact tốt, có thể tái sử dụng trong tương lai',
    history: [
      {
        date: '2024-11-28T11:30:00Z',
        action: 'added_to_spotlight',
        user: 'Admin Nguyen',
        note: 'Spotlight cho campaign UNICEF'
      },
      {
        date: '2024-12-05T23:59:59Z',
        action: 'expired',
        user: 'System',
        note: 'Tự động hết hạn theo lịch định'
      }
    ]
  },
  {
    id: 'SPT004',
    originalContentId: 'CNT008',
    title: 'Dự án sách cho em - Mang tri thức đến vùng xa',
    content: 'Dự án "Sách cho em" đã thành công trong việc mang 5000 cuốn sách đến với trẻ em vùng cao. Cảm ơn sự đóng góp của cộng đồng và các nhà tài trợ...',
    type: 'post',
    authorId: 'TNV008',
    authorName: 'Phạm Thị Linh',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    authorTrustScore: 4.8,
    eventId: 'EVT008',
    eventTitle: 'Dự án sách cho em - Mang tri thức đến vùng xa',
    partnerId: 5,
    partnerName: 'Education First Vietnam',
    partnerTier: 'verified',
    addedToSpotlight: '2024-12-01T09:15:00Z',
    addedBy: 'Admin Tran',
    scheduledStart: '2024-12-01T10:00:00Z',
    scheduledEnd: '2024-12-08T23:59:59Z',
    status: 'scheduled',
    priority: 4,
    category: 'education',
    tags: ['giáo dục', 'sách', 'trẻ em', 'vùng xa'],
    location: 'Lào Cai',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600', 
        thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300'
      }
    ],
    originalEngagement: {
      likes: 234,
      comments: 67,
      shares: 89,
      views: 2340
    },
    spotlightEngagement: {
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      clickThroughs: 0,
      conversions: 0
    },
    engagementScore: 0,
    impactMetrics: {
      newVolunteerSignups: 0,
      eventRegistrations: 0,
      socialMentions: 0,
      shareRate: 0
    },
    targetAudience: ['교육', '아동', '사회공헌'],
    displaySettings: {
      showOnHomepage: true,
      showInMobile: true,
      showInNewsletter: true,
      customBadge: 'Coming Soon',
      badgeColor: '#F59E0B'
    },
    performance: 'pending',
    adminNotes: 'Lên lịch spotlight để hỗ trợ campaign sách cho trẻ em vùng cao',
    history: [
      {
        date: '2024-12-01T09:15:00Z',
        action: 'scheduled',
        user: 'Admin Tran',
        note: 'Lên lịch spotlight cho dự án giáo dục'
      }
    ]
  }
];

/* For demo paste a small sample if needed; here we assume MOCK_SPOTLIGHT contains your full objects. */

/* ---------------------------
   Reducer for filters/sorting to avoid many useState
   --------------------------- */
const initialState = {
  filters: {
    contentType: 'all',
    category: 'all',
    performance: 'all',
    dateRange: '30'
  },
  sortBy: 'engagementScore',
  sortOrder: 'desc'
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, [action.key]: action.value } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
    case 'SET_SORT':
      return { ...state, sortBy: action.sortBy, sortOrder: action.sortOrder || state.sortOrder };
    default:
      return state;
  }
}

/* ---------------------------
   Utility helpers
   --------------------------- */
const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch (e) {
    return dateString;
  }
};

const formatEngagementScore = (score) => {
  const n = Number(score || 0);
  return Number.isFinite(n) ? n.toFixed(1) : '0.0';
};

/* ---------------------------
   Small presentational components
   --------------------------- */
const StatsCard = ({ title, value, change, icon: Icon, trend }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="font-semibold text-lg">{value}</p>
      </div>
      <div className="text-right">
        <Icon className="w-6 h-6 text-gray-400" />
        <p className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
      </div>
    </div>
  </div>
);

/* SpotlightCard extracted for clarity and reusability */
const SpotlightCard = ({ item, selectedContent, toggleSelect, onRemove, onExtend, onUpdatePriority }) => {
  // status & performance config inline for performance
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Đang hoạt động', Icon: PlayCircle },
    scheduled: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Đã lên lịch', Icon: Calendar },
    expired: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Đã hết hạn', Icon: Clock },
    paused: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Tạm dừng', Icon: PauseCircle }
  }[item.status] || { color: 'bg-gray-100 text-gray-800', label: item.status || 'Unknown', Icon: Clock };

  const perfConfig = {
    excellent: { colorClass: 'text-green-600', label: 'Xuất sắc', Icon: TrendingUp },
    good: { colorClass: 'text-blue-600', label: 'Tốt', Icon: ThumbsUp },
    average: { colorClass: 'text-yellow-600', label: 'Trung bình', Icon: TrendingUp },
    poor: { colorClass: 'text-red-600', label: 'Kém', Icon: TrendingDown },
    pending: { colorClass: 'text-gray-600', label: 'Chờ dữ liệu', Icon: Clock }
  }[item.performance] || { colorClass: 'text-gray-600', label: 'Chờ dữ liệu', Icon: Clock };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedContent.includes(item.id)}
              onChange={() => toggleSelect(item.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              aria-label={`Chọn spotlight ${item.title}`}
            />
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">#{item.priority}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
            {item.displaySettings?.customBadge && (
              <span
                className="px-2 py-1 text-xs rounded-full text-white font-medium"
                style={{ backgroundColor: item.displaySettings.badgeColor }}
              >
                {item.displaySettings.customBadge}
              </span>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-gray-700 text-sm line-clamp-2 mb-3">{item.content}</p>

        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-2">
            <img src={item.authorAvatar} alt={item.authorName} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-sm text-gray-600">{item.authorName}</span>
          </div>
          {item.eventTitle && (
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="truncate">{item.eventTitle}</span>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <div>Bắt đầu: {formatDate(item.scheduledStart)}</div>
          <div>Kết thúc: {formatDate(item.scheduledEnd)}</div>
          <div>Thêm bởi: {item.addedBy}</div>
        </div>
      </div>

      {item.media?.length > 0 && (
        <div className="relative">
          {item.media[0].type === 'image' ? (
            <div className="relative">
              <img src={item.media[0].thumbnail || item.media[0].url} alt="Spotlight" className="w-full h-48 object-cover" />
              {item.media.length > 1 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs">
                  +{item.media.length - 1} ảnh
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <img src={item.media[0].thumbnail} alt="Video thumbnail" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-60 rounded-full p-3">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              {item.media[0].duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {item.media[0].duration}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Hiệu suất</span>
          <div className="flex items-center space-x-1">
            <perfConfig.Icon className={`w-4 h-4 ${perfConfig.colorClass}`} />
            <span className={`text-sm font-medium ${perfConfig.colorClass}`}>{perfConfig.label}</span>
          </div>
        </div>

        {(item.status === 'active' || item.status === 'expired') ? (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div className="text-center">
                <p className="text-gray-600">Engagement Score</p>
                <p className="font-bold text-lg text-purple-600">
                  {formatEngagementScore(item.engagementScore)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Total Views</p>
                <p className="font-bold text-lg text-blue-600">
                  {item.spotlightEngagement?.views?.toLocaleString() ?? 0}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
              <div className="text-center">
                <Heart className="w-4 h-4 mx-auto mb-1" />
                <p>{item.spotlightEngagement?.likes ?? 0}</p>
              </div>
              <div className="text-center">
                <MessageSquare className="w-4 h-4 mx-auto mb-1" />
                <p>{item.spotlightEngagement?.comments ?? 0}</p>
              </div>
              <div className="text-center">
                <Share className="w-4 h-4 mx-auto mb-1" />
                <p>{item.spotlightEngagement?.shares ?? 0}</p>
              </div>
              <div className="text-center">
                <Eye className="w-4 h-4 mx-auto mb-1" />
                <p>{item.spotlightEngagement?.clickThroughs ?? 0}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Chờ dữ liệu hiệu suất</p>
          </div>
        )}
      </div>

      {(item.impactMetrics?.newVolunteerSignups > 0) && (
        <div className="px-4 py-3 bg-green-50 border-t border-green-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-green-600 font-semibold">{item.impactMetrics.newVolunteerSignups}</p>
                <p className="text-green-700 text-xs">TNV mới</p>
              </div>
              <div className="text-center">
                <p className="text-green-600 font-semibold">{item.impactMetrics.eventRegistrations}</p>
                <p className="text-green-700 text-xs">Đăng ký</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button onClick={() => onExtend(item.id)} className="text-sm px-3 py-1 bg-blue-50 rounded">Gia hạn</button>
              <button onClick={() => onUpdatePriority(item.id, Math.max(1, item.priority - 1))} className="text-sm px-3 py-1 bg-yellow-50 rounded">Tăng priority</button>
              <button onClick={() => onRemove(item.id)} className="text-sm px-3 py-1 bg-red-50 rounded">Gỡ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------------------
   Main component
   --------------------------- */
export default function ContentSpotlight({ data = MOCK_SPOTLIGHT }) {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const stats = useMemo(() => ([
    { title: 'Tổng Spotlight', value: '45', change: '+8', trend: 'up', icon: Star },
    { title: 'Đang hoạt động', value: '12', change: '+3', trend: 'up', icon: PlayCircle },
    { title: 'Avg Engagement', value: '8.2x', change: '+12%', trend: 'up', icon: TrendingUp },
    { title: 'Conversion Rate', value: '15.8%', change: '+2.1%', trend: 'up', icon: Target }
  ]), []);

  const tabs = useMemo(() => ([
    { id: 'active', label: 'Đang hoạt động', icon: PlayCircle },
    { id: 'scheduled', label: 'Đã lên lịch', icon: Calendar },
    { id: 'expired', label: 'Đã hết hạn', icon: Clock },
    { id: 'performance', label: 'Hiệu suất', icon: BarChart3 }
  ]), []);

  const categories = useMemo(() => ([
    { id: 'all', label: 'Tất cả', icon: BookText },
    { id: 'environmental', label: 'Môi trường', icon: Globe },
    { id: 'education', label: 'Giáo dục', icon: BookText },
    { id: 'social_support', label: 'Hỗ trợ xã hội', icon: Users },
    { id: 'healthcare', label: 'Y tế', icon: Heart },
    { id: 'community', label: 'Cộng đồng', icon: Building }
  ]), []);

  /* Derived filtered + sorted list (memoized) */
  const filteredContent = useMemo(() => {
    const q = debouncedQuery.toLowerCase();

    let list = (data || []).filter(item => {
      // search across fields
      const matchesSearch = !q || (
        (item.title || '').toLowerCase().includes(q) ||
        (item.content || '').toLowerCase().includes(q) ||
        (item.authorName || '').toLowerCase().includes(q) ||
        (item.partnerName || '').toLowerCase().includes(q)
      );

      // tab filtering: if 'performance' selected, do not filter by status
      let matchesTab = true;
      if (activeTab !== 'performance') {
        matchesTab = activeTab === 'all' ? true : item.status === activeTab;
      }

      // category filter
      let matchesCategory = state.filters.category === 'all' ? true : item.category === state.filters.category;

      // performance filter
      let matchesPerf = state.filters.performance === 'all' ? true : item.performance === state.filters.performance;

      return matchesSearch && matchesTab && matchesCategory && matchesPerf;
    });

    const sortByKey = state.sortBy;
    const order = state.sortOrder === 'asc' ? 1 : -1;

    list.sort((a, b) => {
      const av = a[sortByKey] ?? 0;
      const bv = b[sortByKey] ?? 0;
      if (typeof av === 'string' && typeof bv === 'string') {
        return av.localeCompare(bv) * order;
      }
      return (Number(av) - Number(bv)) * order;
    });

    return list;
  }, [data, debouncedQuery, activeTab, state]);

  /* Handlers with useCallback */
  const toggleSelect = useCallback((id) => {
    setSelectedContent(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const handleRemoveFromSpotlight = useCallback((itemId) => {
    // TODO: integrate API call
    console.log('Removing from spotlight:', itemId);
    // optimistic UI removal
    setSelectedContent(prev => prev.filter(id => id !== itemId));
  }, []);

  const handleUpdatePriority = useCallback((itemId, newPriority) => {
    console.log('Updating priority:', itemId, newPriority);
    // TODO: call API and update state
  }, []);

  const handleExtendSchedule = useCallback((itemId) => {
    console.log('Extending schedule:', itemId);
    // TODO: open modal to pick date -> call API
  }, []);

  /* UI actions */
  const onOpenDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const onCloseDetail = () => {
    setSelectedItem(null);
    setShowDetailModal(false);
  };

  /* minimal pagination (client-side) */
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  const pageCount = Math.max(1, Math.ceil(filteredContent.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredContent.slice(start, start + PAGE_SIZE);
  }, [filteredContent, page]);

  useEffect(() => {
    // reset page when filter/search changes
    setPage(1);
  }, [debouncedQuery, activeTab, state.filters, state.sortBy, state.sortOrder]);

  return (
    <div className="space-y-6">
      {/* Header / controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Content Spotlight</h2>

        <div className="flex items-center space-x-3">
          <input
            aria-label="Tìm kiếm spotlight"
            placeholder="Tìm theo tiêu đề, tác giả, partner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded-lg w-72 focus:outline-none focus:ring"
          />
          <button onClick={() => setShowAddModal(true)} className="px-3 py-2 bg-blue-600 text-white rounded-lg">Thêm spotlight</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s, idx) => <StatsCard key={idx} title={s.title} value={s.value} change={s.change} icon={s.icon} trend={s.trend} />)}
      </div>

      {/* Tabs & filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-2 rounded-md ${activeTab === t.id ? 'bg-gray-900 text-white' : 'bg-white border'}`}
            >
              <div className="flex items-center space-x-2">
                <t.icon className="w-4 h-4" />
                <span>{t.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <select value={state.filters.category} onChange={(e) => dispatch({ type: 'SET_FILTER', key: 'category', value: e.target.value })} className="px-2 py-2 border rounded">
            {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>

          <select value={state.filters.performance} onChange={(e) => dispatch({ type: 'SET_FILTER', key: 'performance', value: e.target.value })} className="px-2 py-2 border rounded">
            <option value="all">Tất cả hiệu suất</option>
            <option value="excellent">Xuất sắc</option>
            <option value="good">Tốt</option>
            <option value="average">Trung bình</option>
            <option value="poor">Kém</option>
            <option value="pending">Chờ dữ liệu</option>
          </select>

          <select value={state.sortBy} onChange={(e) => dispatch({ type: 'SET_SORT', sortBy: e.target.value })} className="px-2 py-2 border rounded">
            <option value="engagementScore">Engagement Score</option>
            <option value="priority">Priority</option>
            <option value="spotlightEngagement?.views">Views</option>
            <option value="addedToSpotlight">Ngày thêm</option>
          </select>
        </div>
      </div>

      {/* Grid of spotlight cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageItems.map(item => (
          <div key={item.id}>
            <SpotlightCard
              item={item}
              selectedContent={selectedContent}
              toggleSelect={toggleSelect}
              onRemove={handleRemoveFromSpotlight}
              onExtend={handleExtendSchedule}
              onUpdatePriority={handleUpdatePriority}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Hiển thị {Math.min((page - 1) * PAGE_SIZE + 1, filteredContent.length)} - {Math.min(page * PAGE_SIZE, filteredContent.length)} / {filteredContent.length}
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
          <div className="px-3 py-1 border rounded bg-white">{page} / {pageCount}</div>
          <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      {/* Modals / Details (placeholders) */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3">
            <h3 className="font-semibold text-lg mb-2">{selectedItem.title}</h3>
            <p className="text-sm text-gray-700 mb-4">{selectedItem.content}</p>
            <div className="text-right">
              <button onClick={onCloseDetail} className="px-3 py-2 bg-blue-600 text-white rounded">Đóng</button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <h3 className="font-semibold text-lg mb-2">Thêm Spotlight</h3>
            {/* form fields ... */}
            <div className="text-right space-x-2">
              <button onClick={() => setShowAddModal(false)} className="px-3 py-2 border rounded">Hủy</button>
              <button onClick={() => setShowAddModal(false)} className="px-3 py-2 bg-blue-600 text-white rounded">Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
