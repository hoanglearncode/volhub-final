import React, { useState, useEffect } from 'react';
import {
  BookText,
  Image,
  Video,
  FileText,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Flag,
  Filter,
  Search,
  Calendar,
  User,
  MapPin,
  Heart,
  MessageSquare,
  Share,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Settings,
  RefreshCw,
  TrendingUp,
  Shield,
  ShieldAlert,
  Clock,
  Camera,
  Play,
  Users,
  Zap
} from 'lucide-react';

const ContentModeration = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedView, setSelectedView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    contentType: '',
    riskLevel: '',
    dateRange: '',
    author: '',
    event: ''
  });

  // Mock data for content items
  const [contentItems, setContentItems] = useState([
    {
      id: 'CNT001',
      type: 'post',
      title: 'Trải nghiệm tuyệt vời tại sự kiện từ thiện',
      content: 'Hôm qua mình đã tham gia sự kiện hỗ trợ trẻ em khuyết tật do UNICEF tổ chức. Cảm giác thật ý nghĩa khi được đóng góp cho cộng đồng...',
      authorId: 'TNV001',
      authorName: 'Nguyễn Minh Anh',
      authorAvatar: '/api/placeholder/40/40',
      eventId: 'EVT001',
      eventTitle: 'Hỗ trợ trẻ em khuyết tật',
      createdAt: '2025-01-12T10:30:00',
      status: 'pending',
      aiFlag: false,
      riskScore: 15,
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0
      },
      media: [
        { type: 'image', url: '/api/placeholder/400/300', thumbnail: '/api/placeholder/200/150' },
        { type: 'image', url: '/api/placeholder/400/300', thumbnail: '/api/placeholder/200/150' }
      ],
      tags: ['tình nguyện', 'trẻ em', 'UNICEF'],
      location: 'Hà Nội',
      isSpotlight: false,
      reports: 0,
      category: 'story'
    },
    {
      id: 'CNT002',
      type: 'video',
      title: 'Video clip hoạt động TNV tại Samsung',
      content: 'Chia sẻ những khoảnh khắc đáng nhớ trong chương trình Công nghệ cho Cộng đồng...',
      authorId: 'TNV002',
      authorName: 'Trần Thị Bình',
      authorAvatar: '/api/placeholder/40/40',
      eventId: 'EVT002',
      eventTitle: 'Chương trình Công nghệ cho Cộng đồng',
      createdAt: '2025-01-11T15:20:00',
      status: 'flagged',
      aiFlag: true,
      aiReason: 'Phát hiện nội dung có thể nhạy cảm về thông tin cá nhân',
      riskScore: 75,
      engagement: {
        likes: 45,
        comments: 8,
        shares: 12
      },
      media: [
        { 
          type: 'video', 
          url: '/api/placeholder/video/400/300', 
          thumbnail: '/api/placeholder/400/300',
          duration: '02:45'
        }
      ],
      tags: ['công nghệ', 'samsung', 'workshop'],
      location: 'TP.HCM',
      isSpotlight: false,
      reports: 2,
      category: 'highlight'
    },
    {
      id: 'CNT003',
      type: 'post',
      title: 'Cảm ơn mọi người đã ủng hộ',
      content: 'Thật sự rất cảm động khi nhận được sự ủng hộ từ cộng đồng. Chúng ta đã làm được nhiều điều ý nghĩa...',
      authorId: 'TNV003',
      authorName: 'Lê Văn Cường',
      authorAvatar: '/api/placeholder/40/40',
      eventId: 'EVT003',
      eventTitle: 'Hành trình xanh cho môi trường',
      createdAt: '2025-01-10T09:15:00',
      status: 'approved',
      aiFlag: false,
      riskScore: 5,
      engagement: {
        likes: 128,
        comments: 23,
        shares: 34
      },
      media: [
        { type: 'image', url: '/api/placeholder/400/300', thumbnail: '/api/placeholder/200/150' }
      ],
      tags: ['môi trường', 'xanh', 'cộng đồng'],
      location: 'Đà Nẵng',
      isSpotlight: true,
      reports: 0,
      category: 'story'
    }
  ]);

  // Statistics data
  const stats = [
    {
      title: 'Tổng nội dung',
      value: '3,247',
      change: '+18%',
      trend: 'up',
      icon: BookText,
      color: 'blue'
    },
    {
      title: 'Chờ kiểm duyệt',
      value: '47',
      change: '+5',
      trend: 'up',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'AI cảnh báo',
      value: '12',
      change: '-3',
      trend: 'down',
      icon: ShieldAlert,
      color: 'red'
    },
    {
      title: 'Nội dung Spotlight',
      value: '89',
      change: '+7%',
      trend: 'up',
      icon: Star,
      color: 'purple'
    }
  ];

  const tabs = [
    { id: 'pending', label: 'Chờ duyệt', count: 47, icon: Clock },
    { id: 'flagged', label: 'AI cảnh báo', count: 12, icon: AlertTriangle },
    { id: 'approved', label: 'Đã duyệt', count: 2891, icon: CheckCircle },
    { id: 'rejected', label: 'Đã từ chối', count: 156, icon: XCircle },
    { id: 'spotlight', label: 'Spotlight', count: 89, icon: Star },
    { id: 'reported', label: 'Bị báo cáo', count: 8, icon: Flag }
  ];

  const contentTypes = [
    { id: 'all', label: 'Tất cả', icon: BookText },
    { id: 'post', label: 'Bài viết', icon: FileText },
    { id: 'image', label: 'Hình ảnh', icon: Image },
    { id: 'video', label: 'Video', icon: Video }
  ];

  const handleApprove = (contentId) => {
    setContentItems(prev => prev.map(item => 
      item.id === contentId 
        ? { ...item, status: 'approved' }
        : item
    ));
  };

  const handleReject = (contentId) => {
    setContentItems(prev => prev.map(item => 
      item.id === contentId 
        ? { ...item, status: 'rejected' }
        : item
    ));
  };

  const handleSpotlight = (contentId) => {
    setContentItems(prev => prev.map(item => 
      item.id === contentId 
        ? { ...item, isSpotlight: !item.isSpotlight }
        : item
    ));
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for content:', selectedContent);
  };

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'pending' ? item.status === 'pending' :
                      activeTab === 'flagged' ? item.aiFlag :
                      activeTab === 'approved' ? item.status === 'approved' :
                      activeTab === 'rejected' ? item.status === 'rejected' :
                      activeTab === 'spotlight' ? item.isSpotlight :
                      activeTab === 'reported' ? item.reports > 0 :
                      true;
    
    return matchesSearch && matchesTab;
  });

  const ContentCard = ({ item }) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Content Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedContent.includes(item.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedContent(prev => [...prev, item.id]);
                } else {
                  setSelectedContent(prev => prev.filter(id => id !== item.id));
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <img
              src={item.authorAvatar}
              alt={item.authorName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900">{item.authorName}</p>
              <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString('vi-VN')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {item.aiFlag && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <AlertTriangle className="w-3 h-3 mr-1" />
                AI Flag
              </span>
            )}
            {item.isSpotlight && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <Star className="w-3 h-3 mr-1" />
                Spotlight
              </span>
            )}
            {item.reports > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                <Flag className="w-3 h-3 mr-1" />
                {item.reports} báo cáo
              </span>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-gray-700 text-sm line-clamp-3 mb-3">{item.content}</p>

        {item.eventTitle && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{item.eventTitle}</span>
            {item.location && (
              <>
                <span>•</span>
                <MapPin className="w-4 h-4" />
                <span>{item.location}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Media Preview */}
      {item.media && item.media.length > 0 && (
        <div className="relative">
          {item.media[0].type === 'image' ? (
            <div className="relative">
              <img
                src={item.media[0].thumbnail || item.media[0].url}
                alt="Content media"
                className="w-full h-48 object-cover"
              />
              {item.media.length > 1 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-medium">
                  +{item.media.length - 1} ảnh
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <img
                src={item.media[0].thumbnail}
                alt="Video thumbnail"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-60 rounded-full p-3">
                  <Play className="w-6 h-6 text-white fill-current" />
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

      {/* AI Analysis */}
      {item.aiFlag && item.aiReason && (
        <div className="p-4 bg-red-50 border-t border-red-100">
          <div className="flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Cảnh báo AI:</p>
              <p className="text-sm text-red-700">{item.aiReason}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-red-600">Risk Score:</span>
                <div className="w-20 bg-red-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${item.riskScore}%` }}
                  ></div>
                </div>
                <span className="text-xs text-red-600">{item.riskScore}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{item.engagement.likes}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>{item.engagement.comments}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Share className="w-4 h-4" />
              <span>{item.engagement.shares}</span>
            </span>
          </div>
          <span className="text-xs text-gray-500">ID: {item.id}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedItem(item);
              setShowDetailModal(true);
            }}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Xem chi tiết</span>
          </button>

          <div className="flex items-center space-x-2">
            {item.status === 'approved' && (
              <button
                onClick={() => handleSpotlight(item.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm ${
                  item.isSpotlight 
                    ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>{item.isSpotlight ? 'Bỏ Spotlight' : 'Spotlight'}</span>
              </button>
            )}
            
            {item.status === 'pending' && (
              <>
                <button
                  onClick={() => handleReject(item.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 text-sm"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Từ chối</span>
                </button>
                <button
                  onClick={() => handleApprove(item.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 text-white bg-green-600 rounded-lg hover:bg-green-700 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Duyệt</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kiểm duyệt Nội dung</h1>
          <p className="text-gray-600 mt-1">Quản lý và kiểm duyệt nội dung cộng đồng từ tình nguyện viên</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Xuất báo cáo</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Settings className="w-4 h-4" />
            <span>Cài đặt AI</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <RefreshCw className="w-4 h-4" />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                  stat.color === 'red' ? 'bg-red-100 text-red-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">so với tuần trước</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm theo tiêu đề, nội dung, tác giả..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                />
              </div>
              <div className="flex items-center space-x-2">
                {contentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setFilters(prev => ({ ...prev, contentType: type.id }))}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                        filters.contentType === type.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Lọc nâng cao</span>
              </button>
            </div>
            
            {selectedContent.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Đã chọn {selectedContent.length} nội dung
                </span>
                <button
                  onClick={() => handleBulkAction('approve')}
                  className="flex items-center space-x-2 px-3 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Duyệt tất cả</span>
                </button>
                <button
                  onClick={() => handleBulkAction('reject')}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Từ chối tất cả</span>
                </button>
                <button
                  onClick={() => handleBulkAction('spotlight')}
                  className="flex items-center space-x-2 px-3 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50"
                >
                  <Star className="w-4 h-4" />
                  <span>Spotlight</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6">
          {filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <BookText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Không có nội dung</h3>
              <p className="mt-1 text-sm text-gray-500">
                Không tìm thấy nội dung nào phù hợp với bộ lọc hiện tại
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Chi tiết nội dung {selectedItem.id}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-8">
                {/* Content Preview */}
                <div className="col-span-2">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Author Header */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <img
                          src={selectedItem.authorAvatar}
                          alt={selectedItem.authorName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{selectedItem.authorName}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(selectedItem.createdAt).toLocaleString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedItem.title}</h3>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">{selectedItem.content}</p>
                      </div>

                      {/* Event Info */}
                      {selectedItem.eventTitle && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-2 text-blue-800">
                            <Calendar className="w-5 h-5" />
                            <span className="font-medium">Sự kiện: {selectedItem.eventTitle}</span>
                          </div>
                          {selectedItem.location && (
                            <div className="flex items-center space-x-2 text-blue-600 mt-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{selectedItem.location}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Media Gallery */}
                      {selectedItem.media && selectedItem.media.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-900 mb-3">Media đính kèm</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {selectedItem.media.map((media, index) => (
                              <div key={index} className="relative rounded-lg overflow-hidden">
                                {media.type === 'image' ? (
                                  <img
                                    src={media.url}
                                    alt={`Media ${index + 1}`}
                                    className="w-full h-48 object-cover"
                                  />
                                ) : (
                                  <div className="relative">
                                    <img
                                      src={media.thumbnail}
                                      alt={`Video ${index + 1}`}
                                      className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="bg-black bg-opacity-60 rounded-full p-3">
                                        <Play className="w-6 h-6 text-white fill-current" />
                                      </div>
                                    </div>
                                    {media.duration && (
                                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                        {media.duration}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {selectedItem.tags && selectedItem.tags.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-900 mb-3">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.tags.map((tag, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Engagement */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-gray-600">
                            <span className="flex items-center space-x-2">
                              <Heart className="w-5 h-5" />
                              <span className="font-medium">{selectedItem.engagement.likes}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                              <MessageSquare className="w-5 h-5" />
                              <span className="font-medium">{selectedItem.engagement.comments}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                              <Share className="w-5 h-5" />
                              <span className="font-medium">{selectedItem.engagement.shares}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  {/* Status */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Trạng thái</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Hiện tại:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          selectedItem.status === 'approved' ? 'bg-green-100 text-green-800' :
                          selectedItem.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedItem.status === 'pending' ? 'Chờ duyệt' :
                           selectedItem.status === 'approved' ? 'Đã duyệt' :
                           selectedItem.status === 'rejected' ? 'Đã từ chối' : 'Khác'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Spotlight:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedItem.isSpotlight ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {selectedItem.isSpotlight ? 'Có' : 'Không'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Báo cáo:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedItem.reports > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {selectedItem.reports} lượt
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  {selectedItem.aiFlag && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-900 mb-3 flex items-center space-x-2">
                        <ShieldAlert className="w-5 h-5" />
                        <span>Phân tích AI</span>
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-red-800 font-medium">Lý do cảnh báo:</p>
                          <p className="text-sm text-red-700 mt-1">{selectedItem.aiReason}</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-red-800">Risk Score:</span>
                            <span className="font-medium text-red-800">{selectedItem.riskScore}%</span>
                          </div>
                          <div className="w-full bg-red-200 rounded-full h-3">
                            <div 
                              className="bg-red-500 h-3 rounded-full transition-all" 
                              style={{ width: `${selectedItem.riskScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Author Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Thông tin tác giả</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={selectedItem.authorAvatar}
                          alt={selectedItem.authorName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{selectedItem.authorName}</p>
                          <p className="text-sm text-gray-500">ID: {selectedItem.authorId}</p>
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tổng bài viết:</span>
                          <span className="font-medium">47</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Đã duyệt:</span>
                          <span className="font-medium text-green-600">42</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vi phạm:</span>
                          <span className="font-medium text-red-600">2</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Thao tác nhanh</h4>
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
                        <User className="w-4 h-4" />
                        <span>Xem hồ sơ tác giả</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50">
                        <Calendar className="w-4 h-4" />
                        <span>Xem sự kiện</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50">
                        <Flag className="w-4 h-4" />
                        <span>Báo cáo vi phạm</span>
                      </button>
                    </div>
                  </div>

                  {/* History */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Lịch sử kiểm duyệt</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-2">
                        <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-gray-900">Tạo bài viết</p>
                          <p className="text-gray-500">{new Date(selectedItem.createdAt).toLocaleString('vi-VN')}</p>
                        </div>
                      </div>
                      {selectedItem.aiFlag && (
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                          <div>
                            <p className="text-gray-900">AI phát hiện rủi ro</p>
                            <p className="text-gray-500">Ngay sau khi đăng</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start space-x-2">
                        <Eye className="w-4 h-4 text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-gray-900">Đang chờ kiểm duyệt</p>
                          <p className="text-gray-500">Hiện tại</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Đóng
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
                  <Edit className="w-4 h-4" />
                  <span>Chỉnh sửa</span>
                </button>
              </div>

              {selectedItem.status === 'pending' && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      handleReject(selectedItem.id);
                      setShowDetailModal(false);
                    }}
                    className="flex items-center space-x-2 px-6 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Từ chối</span>
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedItem.id);
                      setShowDetailModal(false);
                    }}
                    className="flex items-center space-x-2 px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Duyệt bài viết</span>
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedItem.id);
                      handleSpotlight(selectedItem.id);
                      setShowDetailModal(false);
                    }}
                    className="flex items-center space-x-2 px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                  >
                    <Star className="w-4 h-4" />
                    <span>Duyệt & Spotlight</span>
                  </button>
                </div>
              )}

              {selectedItem.status === 'approved' && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      handleSpotlight(selectedItem.id);
                      setShowDetailModal(false);
                    }}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-lg ${
                      selectedItem.isSpotlight 
                        ? 'text-gray-600 border border-gray-300 hover:bg-gray-50' 
                        : 'text-white bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    <Star className="w-4 h-4" />
                    <span>{selectedItem.isSpotlight ? 'Bỏ Spotlight' : 'Thêm Spotlight'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModeration;