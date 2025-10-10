import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  User, Phone, Mail, Camera, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings
} from 'lucide-react';
 
const VolunteerManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // Mock data
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: "Nguyễn Thị Lan",
      email: "lan.nguyen@email.com",
      phone: "*******8901",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150",
      status: "verified",
      trustScore: 4.8,
      joinDate: "2024-01-15",
      lastActive: "2024-12-05",
      eventsCompleted: 12,
      hoursContributed: 156,
      skills: ["Giáo dục", "Tổ chức sự kiện", "Marketing"],
      badges: ["Verified", "Top Contributor", "Reliable"],
      violations: 0,
      location: "Hà Nội",
      bio: "Tình nguyện viên tích cực với kinh nghiệm 3 năm trong các hoạt động giáo dục và phát triển cộng đồng.",
      impactScore: 2340,
      privacy: "partial"
    },
    {
      id: 2,
      name: "Trần Văn Minh",
      email: "minh.tran@email.com", 
      phone: "*******7890",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      status: "pending",
      trustScore: 0,
      joinDate: "2024-12-01",
      lastActive: "2024-12-05",
      eventsCompleted: 0,
      hoursContributed: 0,
      skills: ["IT", "Thiết kế"],
      badges: [],
      violations: 0,
      location: "TP.HCM",
      bio: "Mới tham gia nền tảng, mong muốn đóng góp vào cộng đồng qua các kỹ năng IT.",
      impactScore: 0,
      privacy: "full"
    },
    {
      id: 3,
      name: "Lê Thị Hương",
      email: "huong.le@email.com",
      phone: "*******6789",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      status: "warned",
      trustScore: 3.2,
      joinDate: "2023-08-20",
      lastActive: "2024-12-04",
      eventsCompleted: 8,
      hoursContributed: 89,
      skills: ["Y tế", "Chăm sóc"],
      badges: ["Verified"],
      violations: 2,
      location: "Đà Nẵng",
      bio: "Nhân viên y tế, tham gia các hoạt động tình nguyện về sức khỏe cộng đồng.",
      impactScore: 1150,
      privacy: "partial"
    },
    {
      id: 4,
      name: "Phạm Hoàng Nam",
      email: "nam.pham@email.com",
      phone: "*******5678",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      status: "suspended",
      trustScore: 1.5,
      joinDate: "2024-03-10",
      lastActive: "2024-11-28",
      eventsCompleted: 3,
      hoursContributed: 25,
      skills: ["Logistics"],
      badges: [],
      violations: 5,
      location: "Hà Nội",
      bio: "Tham gia các hoạt động logistics và vận chuyển.",
      impactScore: 240,
      privacy: "full"
    }
  ]);

  const stats = {
    total: 1547,
    verified: 892,
    pending: 234,
    warned: 67,
    suspended: 23,
    totalHours: 45230,
    avgTrustScore: 4.2,
    monthlyGrowth: 12.5
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'warned': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'verified': return 'Đã xác minh';
      case 'pending': return 'Chờ xác minh';
      case 'warned': return 'Cảnh báo';
      case 'suspended': return 'Tạm khóa';
      default: return status;
    }
  };

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && volunteer.status === activeTab;
  });

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for volunteers:`, selectedVolunteers);
    setSelectedVolunteers([]);
  };

  const handleVerifyVolunteer = (id) => {
    setVolunteers(prev => prev.map(v => 
      v.id === id ? { ...v, status: 'verified', trustScore: 4.0 } : v
    ));
  };

  const handleSuspendVolunteer = (id) => {
    setVolunteers(prev => prev.map(v => 
      v.id === id ? { ...v, status: 'suspended' } : v
    ));
  };

  const ProfileModal = ({ volunteer, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Hồ sơ Tình nguyện viên</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <img 
                  src={volunteer.avatar} 
                  alt={volunteer.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{volunteer.name}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(volunteer.status)}`}>
                      {getStatusText(volunteer.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{volunteer.bio}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{volunteer.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Tham gia {volunteer.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-600" />
                Thông tin liên hệ
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{volunteer.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Điện thoại</label>
                  <p className="text-gray-900">{volunteer.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Quyền riêng tư</label>
                  <p className="text-gray-900">
                    {volunteer.privacy === 'full' ? 'Ẩn hoàn toàn' : 
                     volunteer.privacy === 'partial' ? 'Ẩn một phần' : 'Công khai'}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills & Badges */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-600" />
                Kỹ năng & Huy hiệu
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Kỹ năng</label>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Huy hiệu</label>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.badges.map((badge, idx) => (
                      <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="space-y-6">
            {/* Trust Score */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {volunteer.trustScore.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 mb-4">Điểm uy tín</div>
                <div className="flex justify-center mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${star <= volunteer.trustScore ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Thống kê hoạt động</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sự kiện hoàn thành</span>
                  <span className="font-semibold text-gray-900">{volunteer.eventsCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Giờ đóng góp</span>
                  <span className="font-semibold text-gray-900">{volunteer.hoursContributed}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Impact Score</span>
                  <span className="font-semibold text-gray-900">{volunteer.impactScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Vi phạm</span>
                  <span className={`font-semibold ${volunteer.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {volunteer.violations}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Thao tác</h4>
              <div className="space-y-3">
                {volunteer.status === 'pending' && (
                  <button 
                    onClick={() => handleVerifyVolunteer(volunteer.id)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Xác minh</span>
                  </button>
                )}
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <MessageSquare className="w-4 h-4" />
                  <span>Nhắn tin</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  <Flag className="w-4 h-4" />
                  <span>Cảnh báo</span>
                </button>
                {volunteer.status !== 'suspended' && (
                  <button 
                    onClick={() => handleSuspendVolunteer(volunteer.id)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Ban className="w-4 h-4" />
                    <span>Tạm khóa</span>
                  </button>
                )}
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <History className="w-4 h-4" />
                  <span>Lịch sử hoạt động</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Tình nguyện viên</h1>
            <p className="text-gray-600 mt-2">Xác minh hồ sơ, quản lý vi phạm và theo dõi hoạt động TNV</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Xuất dữ liệu</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Settings className="w-4 h-4" />
              <span>Cài đặt</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng TNV</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+{stats.monthlyGrowth}% tháng này</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã xác minh</p>
                <p className="text-2xl font-bold text-gray-900">{stats.verified.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">{((stats.verified/stats.total)*100).toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng giờ công</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalHours.toLocaleString()}h</p>
                <p className="text-sm text-blue-600 mt-1">Trung bình {Math.round(stats.totalHours/stats.total)}h/người</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Điểm uy tín TB</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgTrustScore.toFixed(1)}</p>
                <div className="flex mt-1">
                  {[1,2,3,4,5].map(star => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${star <= stats.avgTrustScore ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Target className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm TNV theo tên, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span>Bộ lọc</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {selectedVolunteers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{selectedVolunteers.length} đã chọn</span>
                <button 
                  onClick={() => handleBulkAction('verify')}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg hover:bg-green-200"
                >
                  Xác minh
                </button>
                <button 
                  onClick={() => handleBulkAction('suspend')}
                  className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-lg hover:bg-red-200"
                >
                  Tạm khóa
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'Tất cả', count: stats.total },
            { key: 'verified', label: 'Đã xác minh', count: stats.verified },
            { key: 'pending', label: 'Chờ xác minh', count: stats.pending },
            { key: 'warned', label: 'Cảnh báo', count: stats.warned },
            { key: 'suspended', label: 'Tạm khóa', count: stats.suspended }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Volunteers List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVolunteers(filteredVolunteers.map(v => v.id));
                      } else {
                        setSelectedVolunteers([]);
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tình nguyện viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm uy tín
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hoạt động
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vi phạm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hoạt động cuối
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVolunteers.map((volunteer) => (
                <tr key={volunteer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedVolunteers.includes(volunteer.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedVolunteers([...selectedVolunteers, volunteer.id]);
                        } else {
                          setSelectedVolunteers(selectedVolunteers.filter(id => id !== volunteer.id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={volunteer.avatar} 
                        alt={volunteer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                        <div className="text-sm text-gray-500">{volunteer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(volunteer.status)}`}>
                      {getStatusText(volunteer.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{volunteer.trustScore.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {volunteer.eventsCompleted} sự kiện
                    </div>
                    <div className="text-sm text-gray-500">
                      {volunteer.hoursContributed}h đóng góp
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      volunteer.violations === 0 ? 'bg-green-100 text-green-800' :
                      volunteer.violations < 3 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {volunteer.violations} vi phạm
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {volunteer.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedVolunteer(volunteer);
                          setShowProfile(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Xem hồ sơ"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {volunteer.status === 'pending' && (
                        <button 
                          onClick={() => handleVerifyVolunteer(volunteer.id)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Xác minh"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {volunteer.status !== 'suspended' && (
                        <button 
                          onClick={() => handleSuspendVolunteer(volunteer.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Tạm khóa"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Trước
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Tiếp
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">10</span> của{' '}
                <span className="font-medium">{filteredVolunteers.length}</span> kết quả
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Trước
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Tiếp
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      {filterOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Bộ lọc nâng cao</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Khu vực</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Tất cả khu vực</option>
                  <option>Hà Nội</option>
                  <option>TP.HCM</option>
                  <option>Đà Nẵng</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kỹ năng</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Tất cả kỹ năng</option>
                  <option>Giáo dục</option>
                  <option>Y tế</option>
                  <option>IT</option>
                  <option>Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Điểm uy tín</label>
                <div className="flex space-x-2">
                  <input 
                    type="number" 
                    placeholder="Từ" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0" max="5" step="0.1"
                  />
                  <input 
                    type="number" 
                    placeholder="Đến" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0" max="5" step="0.1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày tham gia</label>
                <div className="flex space-x-2">
                  <input 
                    type="date" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input 
                    type="date" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Áp dụng
                </button>
                <button 
                  onClick={() => setFilterOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && selectedVolunteer && (
        <ProfileModal 
          volunteer={selectedVolunteer} 
          onClose={() => {
            setShowProfile(false);
            setSelectedVolunteer(null);
          }}
        />
      )}
    </div>
  );
};

export default VolunteerManagement;