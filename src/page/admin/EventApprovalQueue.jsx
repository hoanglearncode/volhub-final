import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Award, DollarSign, 
  Phone, Mail, Globe, Star, Heart, Share2, Edit, Trash2,
  CheckCircle, XCircle, AlertTriangle, Eye, MessageSquare,
  Download, FileText, Camera, Tag, Building, Shield,
  TrendingUp, Activity, UserCheck, Clock3, BarChart3,
  RefreshCw, Filter, Search, MoreHorizontal, Flag, Ban,
  Bell, AlertCircle, Info, ChevronDown, ChevronUp,
  User, Calendar as CalendarIcon, Timer
} from 'lucide-react';

export default function EventApprovalQueue() {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [sortBy, setSortBy] = useState('created_date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [showBatchActions, setShowBatchActions] = useState(false);

  // Mock events data for approval queue
  const mockEvents = [
    {
      id: 'EVT-2024-001',
      title: 'Làm sạch bờ biển Vũng Tàu - Bảo vệ môi trường biển',
      category: 'Môi trường',
      organizer: {
        name: 'Green Earth Vietnam',
        type: 'verified_partner',
        logo: '/api/placeholder/40/40',
        trustScore: 95
      },
      status: 'pending',
      priority: 'high',
      submittedDate: '2024-12-01T08:30:00Z',
      reviewDeadline: '2024-12-03T23:59:59Z',
      startDate: '2024-12-15',
      location: 'Bãi biển Bãi Trước, Vũng Tàu',
      volunteersNeeded: 50,
      estimatedBudget: 5000000,
      contactInfo: {
        coordinatorName: 'Nguyễn Thị Hương',
        phone: '0901234567',
        email: 'huong@greenearth.vn'
      },
      flags: ['background_check_required'],
      description: 'Chương trình làm sạch bờ biển Vũng Tàu là một sáng kiến môi trường quan trọng...',
      riskLevel: 'low',
      complianceScore: 92
    },
    {
      id: 'EVT-2024-002',
      title: 'Chương trình hỗ trợ học sinh khó khăn',
      category: 'Giáo dục',
      organizer: {
        name: 'Education First Foundation',
        type: 'organization',
        logo: '/api/placeholder/40/40',
        trustScore: 88
      },
      status: 'pending',
      priority: 'normal',
      submittedDate: '2024-12-01T14:15:00Z',
      reviewDeadline: '2024-12-04T23:59:59Z',
      startDate: '2024-12-20',
      location: 'Trường THCS Lý Tự Trọng, Quận 1, TP.HCM',
      volunteersNeeded: 20,
      estimatedBudget: 2000000,
      contactInfo: {
        coordinatorName: 'Trần Văn Nam',
        phone: '0902345678',
        email: 'nam@educationfirst.org'
      },
      flags: ['new_organizer', 'minors_involved'],
      description: 'Hỗ trợ học sinh có hoàn cảnh khó khăn trong việc học tập...',
      riskLevel: 'medium',
      complianceScore: 76
    },
    {
      id: 'EVT-2024-003',
      title: 'Xây dựng nhà tình thương cho gia đình nghèo',
      category: 'Cộng đồng',
      organizer: {
        name: 'Habitat for Humanity Vietnam',
        type: 'verified_partner',
        logo: '/api/placeholder/40/40',
        trustScore: 98
      },
      status: 'approved',
      priority: 'urgent',
      submittedDate: '2024-11-28T10:00:00Z',
      reviewDate: '2024-11-29T16:30:00Z',
      approvedBy: 'Admin Nguyễn Văn A',
      startDate: '2024-12-10',
      location: 'Xã Tân Phước, Huyện Châu Thành, Tây Ninh',
      volunteersNeeded: 30,
      estimatedBudget: 15000000,
      contactInfo: {
        coordinatorName: 'Lê Thị Mai',
        phone: '0903456789',
        email: 'mai@habitat.vn'
      },
      flags: [],
      description: 'Xây dựng nhà tình thương cho các gia đình có hoàn cảnh khó khăn...',
      riskLevel: 'low',
      complianceScore: 98
    },
    {
      id: 'EVT-2024-004',
      title: 'Khám bệnh miễn phí cho người cao tuổi',
      category: 'Y tế',
      organizer: {
        name: 'Dr. Smith Medical Group',
        type: 'individual',
        logo: '/api/placeholder/40/40',
        trustScore: 45
      },
      status: 'rejected',
      priority: 'normal',
      submittedDate: '2024-11-25T09:20:00Z',
      reviewDate: '2024-11-26T11:45:00Z',
      rejectedBy: 'Admin Trần Thị B',
      rejectionReason: 'Thiếu giấy phép hành nghề y tế và bảo hiểm trách nhiệm nghề nghiệp',
      startDate: '2024-12-05',
      location: 'Trung tâm Y tế Quận 3, TP.HCM',
      volunteersNeeded: 15,
      estimatedBudget: 8000000,
      contactInfo: {
        coordinatorName: 'Dr. John Smith',
        phone: '0904567890',
        email: 'john.smith@medical.com'
      },
      flags: ['medical_activity', 'license_required', 'high_risk'],
      description: 'Tổ chức khám bệnh và cấp phát thuốc miễn phí...',
      riskLevel: 'high',
      complianceScore: 35
    }
  ];

  const categories = [
    'Môi trường', 'Giáo dục', 'Y tế', 'Trẻ em', 'Người cao tuổi',
    'Người khuyết tật', 'Cộng đồng', 'Văn hóa', 'Thể thao', 'Khác'
  ];

  const priorities = [
    { value: 'low', label: 'Thấp', color: 'text-gray-600' },
    { value: 'normal', label: 'Bình thường', color: 'text-blue-600' },
    { value: 'high', label: 'Cao', color: 'text-orange-600' },
    { value: 'urgent', label: 'Khẩn cấp', color: 'text-red-600' }
  ];

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = mockEvents;

    // Filter by tab (status)
    if (selectedTab !== 'all') {
      filtered = filtered.filter(event => event.status === selectedTab);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by priority
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(event => event.priority === selectedPriority);
    }

    // Sort events
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'created_date':
          aValue = new Date(a.submittedDate);
          bValue = new Date(b.submittedDate);
          break;
        case 'priority':
          const priorityOrder = { low: 1, normal: 2, high: 3, urgent: 4 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'organizer':
          aValue = a.organizer.name;
          bValue = b.organizer.name;
          break;
        case 'deadline':
          aValue = new Date(a.reviewDeadline || '9999-12-31');
          bValue = new Date(b.reviewDeadline || '9999-12-31');
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [mockEvents, selectedTab, searchQuery, selectedCategory, selectedPriority, sortBy, sortOrder]);

  const getStatusConfig = (status) => {
    const configs = {
      pending: { 
        color: 'yellow', 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-800', 
        label: 'Chờ duyệt',
        icon: Clock3
      },
      approved: { 
        color: 'green', 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        label: 'Đã duyệt',
        icon: CheckCircle
      },
      rejected: { 
        color: 'red', 
        bg: 'bg-red-100', 
        text: 'text-red-800', 
        label: 'Đã từ chối',
        icon: XCircle
      },
      revision_required: { 
        color: 'orange', 
        bg: 'bg-orange-100', 
        text: 'text-orange-800', 
        label: 'Cần chỉnh sửa',
        icon: AlertTriangle
      }
    };
    return configs[status] || configs.pending;
  };

  const getPriorityConfig = (priority) => {
    return priorities.find(p => p.value === priority) || priorities[1];
  };

  const getRiskLevelConfig = (riskLevel) => {
    const configs = {
      low: { color: 'text-green-600', bg: 'bg-green-100', label: 'Thấp' },
      medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Trung bình' },
      high: { color: 'text-red-600', bg: 'bg-red-100', label: 'Cao' }
    };
    return configs[riskLevel] || configs.low;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeSinceSubmission = (dateString) => {
    const now = new Date();
    const submitted = new Date(dateString);
    const diffHours = Math.floor((now - submitted) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} ngày trước`;
    }
  };

  const handleEventSelection = (eventId) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(filteredEvents.map(event => event.id));
    }
  };

  const handleBatchApproval = () => {
    console.log('Batch approving events:', selectedEvents);
    setSelectedEvents([]);
    setShowBatchActions(false);
  };

  const handleBatchRejection = () => {
    console.log('Batch rejecting events:', selectedEvents);
    setSelectedEvents([]);
    setShowBatchActions(false);
  };

  const handleIndividualAction = (eventId, action, reason = '') => {
    console.log(`${action} event ${eventId}`, reason);
  };

  const tabs = [
    { id: 'all', label: 'Tất cả', count: mockEvents.length },
    { id: 'pending', label: 'Chờ duyệt', count: mockEvents.filter(e => e.status === 'pending').length },
    { id: 'approved', label: 'Đã duyệt', count: mockEvents.filter(e => e.status === 'approved').length },
    { id: 'rejected', label: 'Đã từ chối', count: mockEvents.filter(e => e.status === 'rejected').length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hàng đợi phê duyệt sự kiện</h1>
              <p className="text-gray-600 mt-2">Quản lý và phê duyệt các sự kiện tình nguyện</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Làm mới
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Chờ duyệt</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {mockEvents.filter(e => e.status === 'pending').length}
                </p>
              </div>
              <Clock3 className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã duyệt hôm nay</p>
                <p className="text-3xl font-bold text-green-600">
                  {mockEvents.filter(e => e.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cần xem xét khẩn cấp</p>
                <p className="text-3xl font-bold text-red-600">
                  {mockEvents.filter(e => e.priority === 'urgent' && e.status === 'pending').length}
                </p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thời gian phản hồi TB</p>
                <p className="text-3xl font-bold text-blue-600">2.5h</p>
              </div>
              <Timer className="w-10 h-10 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sự kiện, tổ chức..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả danh mục</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả mức độ</option>
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="created_date-desc">Mới nhất</option>
                  <option value="created_date-asc">Cũ nhất</option>
                  <option value="priority-desc">Ưu tiên cao</option>
                  <option value="deadline-asc">Gần hạn nhất</option>
                  <option value="title-asc">Tên A-Z</option>
                  <option value="organizer-asc">Tổ chức A-Z</option>
                </select>

                {selectedEvents.length > 0 && (
                  <button
                    onClick={() => setShowBatchActions(!showBatchActions)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Hành động ({selectedEvents.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Batch Actions Panel */}
          {showBatchActions && selectedEvents.length > 0 && (
            <div className="p-4 bg-blue-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-blue-700">
                  Đã chọn {selectedEvents.length} sự kiện
                </p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleBatchApproval}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    Phê duyệt tất cả
                  </button>
                  <button
                    onClick={handleBatchRejection}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    Từ chối tất cả
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEvents([]);
                      setShowBatchActions(false);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="px-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedEvents.length === filteredEvents.length && filteredEvents.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">
                  Hiển thị {filteredEvents.length} / {mockEvents.length} sự kiện
                </span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredEvents.map((event) => {
              const statusConfig = getStatusConfig(event.status);
              const priorityConfig = getPriorityConfig(event.priority);
              const riskConfig = getRiskLevelConfig(event.riskLevel);
              const StatusIcon = statusConfig.icon;

              return (
                <div key={event.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={() => handleEventSelection(event.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                              {event.title}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.label}
                            </span>
                            <span className={`text-xs font-medium ${priorityConfig.color}`}>
                              {priorityConfig.label}
                            </span>
                            {event.flags.length > 0 && (
                              <div className="flex items-center space-x-1">
                                {event.flags.includes('urgent') && (
                                  <Flag className="w-4 h-4 text-red-500" />
                                )}
                                {event.flags.includes('background_check_required') && (
                                  <Shield className="w-4 h-4 text-blue-500" />
                                )}
                                {event.flags.includes('minors_involved') && (
                                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                )}
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4" />
                              <span>{event.organizer.name}</span>
                              {event.organizer.type === 'verified_partner' && (
                                <Shield className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{new Date(event.startDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span className="truncate">{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>{event.volunteersNeeded} TNV</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>ID: {event.id}</span>
                              <span>Gửi: {getTimeSinceSubmission(event.submittedDate)}</span>
                              {event.reviewDeadline && (
                                <span className="text-orange-600">
                                  Hạn: {formatDate(event.reviewDeadline)}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${riskConfig.bg} ${riskConfig.color}`}>
                                Rủi ro: {riskConfig.label}
                              </span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                Tuân thủ: {event.complianceScore}%
                              </span>
                            </div>
                          </div>

                          {expandedEvent === event.id && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Mô tả sự kiện</h4>
                                  <p className="text-sm text-gray-700 mb-4">{event.description}</p>
                                  
                                  <h4 className="font-medium text-gray-900 mb-2">Thông tin liên hệ</h4>
                                  <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                      <User className="w-4 h-4" />
                                      <span>{event.contactInfo.coordinatorName}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Phone className="w-4 h-4" />
                                      <span>{event.contactInfo.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Mail className="w-4 h-4" />
                                      <span>{event.contactInfo.email}</span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Chi tiết đánh giá</h4>
                                  <div className="space-y-3">
                                    <div>
                                      <span className="text-sm font-medium text-gray-700">Điểm tin cậy tổ chức:</span>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                          <div 
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${event.organizer.trustScore}%` }}
                                          />
                                        </div>
                                        <span className="text-sm text-gray-600">{event.organizer.trustScore}%</span>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <span className="text-sm font-medium text-gray-700">Điểm tuân thủ:</span>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                          <div 
                                            className="bg-green-600 h-2 rounded-full"
                                            style={{ width: `${event.complianceScore}%` }}
                                          />
                                        </div>
                                        <span className="text-sm text-gray-600">{event.complianceScore}%</span>
                                      </div>
                                    </div>

                                    {event.estimatedBudget && (
                                      <div>
                                        <span className="text-sm font-medium text-gray-700">Ngân sách ước tính:</span>
                                        <span className="text-sm text-gray-600 ml-2">
                                          {event.estimatedBudget.toLocaleString('vi-VN')} VNĐ
                                        </span>
                                      </div>
                                    )}

                                    {event.flags.length > 0 && (
                                      <div>
                                        <span className="text-sm font-medium text-gray-700">Cảnh báo:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {event.flags.map((flag, index) => {
                                            const flagLabels = {
                                              background_check_required: 'Cần kiểm tra lý lịch',
                                              new_organizer: 'Tổ chức mới',
                                              minors_involved: 'Có trẻ em tham gia',
                                              medical_activity: 'Hoạt động y tế',
                                              license_required: 'Cần giấy phép',
                                              high_risk: 'Rủi ro cao'
                                            };
                                            return (
                                              <span 
                                                key={index}
                                                className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded"
                                              >
                                                {flagLabels[flag] || flag}
                                              </span>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {event.status === 'rejected' && event.rejectionReason && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                  <h4 className="font-medium text-red-900 mb-1">Lý do từ chối:</h4>
                                  <p className="text-sm text-red-700">{event.rejectionReason}</p>
                                  {event.rejectedBy && (
                                    <p className="text-xs text-red-600 mt-2">
                                      Từ chối bởi: {event.rejectedBy} - {formatDate(event.reviewDate)}
                                    </p>
                                  )}
                                </div>
                              )}

                              {event.status === 'approved' && event.approvedBy && (
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <p className="text-sm text-green-700">
                                    Phê duyệt bởi: {event.approvedBy} - {formatDate(event.reviewDate)}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            {expandedEvent === event.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>

                          <button className="p-2 text-gray-400 hover:text-blue-600">
                            <Eye className="w-4 h-4" />
                          </button>

                          {event.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleIndividualAction(event.id, 'approve')}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                              >
                                Duyệt
                              </button>
                              <button
                                onClick={() => handleIndividualAction(event.id, 'reject')}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                              >
                                Từ chối
                              </button>
                              <button
                                onClick={() => handleIndividualAction(event.id, 'request_revision')}
                                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                              >
                                Yêu cầu chỉnh sửa
                              </button>
                            </>
                          )}

                          <div className="relative">
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có sự kiện nào</h3>
              <p className="text-gray-500">
                {searchQuery || selectedCategory !== 'all' || selectedPriority !== 'all'
                  ? 'Không tìm thấy sự kiện nào phù hợp với bộ lọc hiện tại.'
                  : 'Chưa có sự kiện nào trong hàng đợi phê duyệt.'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredEvents.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Hiển thị {filteredEvents.length} sự kiện
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">
                    Trước
                  </button>
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded">1</span>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    Sau
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Sidebar */}
        <div className="fixed bottom-6 right-6 space-y-3">
          <button
            className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
            title="Tạo thông báo"
          >
            <Bell className="w-6 h-6" />
          </button>
          <button
            className="flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
            title="Phê duyệt nhanh"
          >
            <CheckCircle className="w-6 h-6" />
          </button>
          <button
            className="flex items-center justify-center w-14 h-14 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700"
            title="Báo cáo"
          >
            <BarChart3 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}