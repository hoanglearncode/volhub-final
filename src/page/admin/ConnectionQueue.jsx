import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Filter,
  Search,
  MoreHorizontal,
  User,
  Building2,
  Calendar,
  MapPin,
  Shield,
  ShieldAlert,
  Ban,
  Trash2,
  Mail,
  Phone,
  MessageCircle,
  Flag,
  ArrowRight,
  RefreshCw,
  Download,
  Settings,
  TrendingUp,
  Activity
} from 'lucide-react';

const ConnectionManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedFilters, setSelectedFilters] = useState({
    status: '',
    partner: '',
    dateRange: '',
    eventType: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConnections, setSelectedConnections] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  // Mock data for connections
  const [connections, setConnections] = useState([
    {
      id: 'CON001',
      partnerId: 'BTC001',
      partnerName: 'UNICEF Việt Nam',
      partnerAvatar: '/api/placeholder/40/40',
      partnerStatus: 'verified',
      volunteerId: 'TNV001',
      volunteerName: 'Nguyễn Minh Anh',
      volunteerAvatar: '/api/placeholder/40/40',
      eventId: 'EVT001',
      eventTitle: 'Hỗ trợ trẻ em khuyết tật',
      eventDate: '2025-01-15',
      location: 'Hà Nội',
      status: 'pending',
      priority: 'high',
      aiFlag: true,
      aiReason: 'Yêu cầu thông tin cá nhân nhạy cảm',
      requestDate: '2025-01-10T10:30:00',
      message: 'Chúng tôi muốn kết nối với tình nguyện viên này cho dự án đặc biệt...',
      connectionType: 'direct_invite',
      riskScore: 75
    },
    {
      id: 'CON002',
      partnerId: 'BTC002',
      partnerName: 'Samsung Việt Nam',
      partnerAvatar: '/api/placeholder/40/40',
      partnerStatus: 'verified',
      volunteerId: 'TNV002',
      volunteerName: 'Trần Thị Bình',
      volunteerAvatar: '/api/placeholder/40/40',
      eventId: 'EVT002',
      eventTitle: 'Chương trình Công nghệ cho Cộng đồng',
      eventDate: '2025-01-20',
      location: 'TP.HCM',
      status: 'auto_approved',
      priority: 'medium',
      aiFlag: false,
      requestDate: '2025-01-11T14:20:00',
      message: 'Mời bạn tham gia workshop về công nghệ...',
      connectionType: 'event_application',
      riskScore: 25
    }
  ]);

  // Mock data for chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'MSG001',
      connectionId: 'CON001',
      sender: 'partner',
      senderId: 'BTC001',
      senderName: 'UNICEF Việt Nam',
      message: 'Chào bạn, chúng tôi rất quan tâm đến hồ sơ của bạn...',
      timestamp: '2025-01-12T09:15:00',
      isProxied: true,
      flagged: false
    },
    {
      id: 'MSG002',
      connectionId: 'CON001',
      sender: 'volunteer',
      senderId: 'TNV001',
      senderName: 'Nguyễn Minh Anh',
      message: 'Cảm ơn anh/chị đã quan tâm. Tôi muốn biết thêm về dự án...',
      timestamp: '2025-01-12T10:30:00',
      isProxied: true,
      flagged: false
    }
  ]);

  // Statistics data
  const stats = [
    {
      title: 'Tổng kết nối',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Chờ kiểm duyệt',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'AI cảnh báo',
      value: '7',
      change: '+2',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Tỷ lệ thành công',
      value: '87%',
      change: '+3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    }
  ];

  const tabs = [
    { id: 'pending', label: 'Chờ duyệt', count: 23, icon: Clock },
    { id: 'auto_approved', label: 'Tự động duyệt', count: 156, icon: CheckCircle },
    { id: 'flagged', label: 'AI cảnh báo', count: 7, icon: AlertTriangle },
    { id: 'chat', label: 'Tin nhắn Proxy', count: 89, icon: MessageCircle },
    { id: 'reports', label: 'Báo cáo lạm dụng', count: 3, icon: Flag }
  ];

  const handleApprove = (connectionId) => {
    setConnections(prev => prev.map(conn => 
      conn.id === connectionId 
        ? { ...conn, status: 'approved' }
        : conn
    ));
  };

  const handleReject = (connectionId) => {
    setConnections(prev => prev.map(conn => 
      conn.id === connectionId 
        ? { ...conn, status: 'rejected' }
        : conn
    ));
  };

  const handleBulkAction = (action) => {
    // Handle bulk actions
    console.log('Bulk action:', action, 'for connections:', selectedConnections);
  };

  const filteredConnections = connections.filter(conn => {
    const matchesSearch = conn.volunteerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conn.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conn.eventTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'pending' ? conn.status === 'pending' :
                      activeTab === 'auto_approved' ? conn.status === 'auto_approved' :
                      activeTab === 'flagged' ? conn.aiFlag :
                      true;
    
    return matchesSearch && matchesTab;
  });

  const ConnectionCard = ({ connection }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={selectedConnections.includes(connection.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedConnections(prev => [...prev, connection.id]);
              } else {
                setSelectedConnections(prev => prev.filter(id => id !== connection.id));
              }
            }}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={connection.partnerAvatar}
                alt={connection.partnerName}
                className="w-10 h-10 rounded-full"
              />
              {connection.partnerStatus === 'verified' && (
                <Shield className="absolute -bottom-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <img
              src={connection.volunteerAvatar}
              alt={connection.volunteerName}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {connection.aiFlag && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <AlertTriangle className="w-3 h-3 mr-1" />
              AI Cảnh báo
            </span>
          )}
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            connection.priority === 'high' ? 'bg-red-100 text-red-800' :
            connection.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {connection.priority === 'high' ? 'Cao' : 
             connection.priority === 'medium' ? 'Trung bình' : 'Thấp'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
            <Building2 className="w-4 h-4" />
            <span>Đối tác</span>
          </div>
          <p className="font-medium">{connection.partnerName}</p>
        </div>
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
            <User className="w-4 h-4" />
            <span>Tình nguyện viên</span>
          </div>
          <p className="font-medium">{connection.volunteerName}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
          <Calendar className="w-4 h-4" />
          <span>Sự kiện</span>
        </div>
        <p className="font-medium">{connection.eventTitle}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(connection.eventDate).toLocaleDateString('vi-VN')}</span>
          </span>
          <span className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{connection.location}</span>
          </span>
        </div>
      </div>

      {connection.message && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700 line-clamp-2">{connection.message}</p>
        </div>
      )}

      {connection.aiFlag && connection.aiReason && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 text-red-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Lý do cảnh báo:</p>
              <p className="text-sm text-red-700">{connection.aiReason}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-red-600">Risk Score:</span>
                <div className="w-20 bg-red-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${connection.riskScore}%` }}
                  ></div>
                </div>
                <span className="text-xs text-red-600">{connection.riskScore}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Yêu cầu lúc: {new Date(connection.requestDate).toLocaleString('vi-VN')}</span>
        <span>ID: {connection.id}</span>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setSelectedConnection(connection);
            setShowDetailModal(true);
          }}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <Eye className="w-4 h-4" />
          <span>Xem chi tiết</span>
        </button>

        {connection.status === 'pending' && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleReject(connection.id)}
              className="flex items-center space-x-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
            >
              <XCircle className="w-4 h-4" />
              <span>Từ chối</span>
            </button>
            <button
              onClick={() => handleApprove(connection.id)}
              className="flex items-center space-x-2 px-3 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Duyệt</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kết nối & Tin nhắn</h1>
          <p className="text-gray-600 mt-1">Quản lý kết nối BTC → TNV và tin nhắn proxy</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Xuất báo cáo</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Settings className="w-4 h-4" />
            <span>Cài đặt</span>
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

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
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
                  placeholder="Tìm theo tên TNV, đối tác, sự kiện..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Lọc</span>
              </button>
            </div>
            
            {selectedConnections.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Đã chọn {selectedConnections.length} kết nối
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
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'chat' ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Proxy Chat System</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Hệ thống tin nhắn proxy đang được phát triển
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredConnections.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Không có kết nối</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Không tìm thấy kết nối nào phù hợp với bộ lọc hiện tại
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredConnections.map((connection) => (
                    <ConnectionCard key={connection.id} connection={connection} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedConnection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Chi tiết kết nối {selectedConnection.id}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Thông tin đối tác</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedConnection.partnerAvatar}
                        alt={selectedConnection.partnerName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{selectedConnection.partnerName}</p>
                        <p className="text-sm text-gray-500">ID: {selectedConnection.partnerId}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Thông tin TNV (Masked)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedConnection.volunteerAvatar}
                        alt={selectedConnection.volunteerName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{selectedConnection.volunteerName}</p>
                        <p className="text-sm text-gray-500">ID: {selectedConnection.volunteerId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Thông tin sự kiện</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium">{selectedConnection.eventTitle}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedConnection.eventDate).toLocaleDateString('vi-VN')}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedConnection.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              {selectedConnection.message && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Nội dung yêu cầu</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedConnection.message}</p>
                  </div>
                </div>
              )}

              {selectedConnection.aiFlag && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Phân tích AI</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <ShieldAlert className="w-5 h-5 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-red-800">{selectedConnection.aiReason}</p>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="text-sm text-red-600">Risk Score:</span>
                          <div className="flex-1 max-w-xs bg-red-200 rounded-full h-3">
                            <div 
                              className="bg-red-500 h-3 rounded-full" 
                              style={{ width: `${selectedConnection.riskScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-red-600">{selectedConnection.riskScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Đóng
              </button>
              {selectedConnection.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleReject(selectedConnection.id);
                      setShowDetailModal(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Từ chối</span>
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedConnection.id);
                      setShowDetailModal(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Duyệt kết nối</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionManagement;