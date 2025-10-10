import { useState, useEffect, useMemo, use } from 'react';
import { 
  Calendar, MapPin, Users, Clock, Filter, Search, Eye, Edit, Trash2, 
  CheckCircle, XCircle, AlertTriangle, Plus, Download, RefreshCw, Flag, 
  Star, Building2, QrCode, TrendingUp, MessageSquare, ChevronDown, 
  MoreHorizontal, Heart, Share2, Image as ImageIcon, Play, User, 
  Phone, Mail, Award, Zap, Gift, DollarSign, Target, Globe, Shield,
  ArrowUpDown, BarChart3, FileText, Settings, Bell, Activity
} from 'lucide-react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext'

const EventManagement = () => {
  const {token} = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    priority: 'all',
    location: 'all'
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Transform API data to internal format
  const transformApiData = (apiData) => {
    return apiData.result.map(event => ({
      id: event.id,
      title: event.title,
      slug: event.slug,
      description: event.description,
      organizer: {
        id: event.userId,
        name: event.fullName,
        avatar: event.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        verified: true
      },
      status: getInternalStatus(event.status),
      priority: event.priority?.toLowerCase() || 'normal',
      type: getInternalType(event.type),
      location: event.location,
      detailLocation: event.detailLocation,
      salary: event.salary,
      maxVolunteers: event.maxVolunteer || 0,
      currentVolunteers: Math.floor(Math.random() * (event.maxVolunteer || 0)), 
      startAt: event.startAt,
      endAt: event.endAt,
      deadline: event.deadline,
      minAge: event.minAge,
      maxAge: event.maxAge,
      experience: event.experience,
      coverImage: event.coverImage || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop',
      mediaGallery: event.eventMedia?.map(media => media.mediaUrl) || [],
      categories: event.categories || [],
      skills: event.skills || [],
      interests: event.interests || [],
      contact: {
        leaderName: event.leaderName,
        leaderPhone: event.leaderPhone,
        leaderEmail: event.leaderEmail,
        subContact: event.subContact
      },
      engagement: {
        totalLike: event.totalLike || 0,
        totalComment: event.totalComment || 0,
        views: Math.floor(Math.random() * 500) + 100, // Mock data
        applications: Math.floor(Math.random() * 50) + 10 // Mock data
      },
      autoAccept: event.autoAccept,
      online: event.online,
      createdAt: event.createdAt || event.updatedAt,
      updatedAt: event.updatedAt,
      // AI flags and quality metrics (mock)
      aiFlags: generateMockAiFlags(event),
      qualityScore: Math.floor(Math.random() * 30) + 70, // 70-100
      riskLevel: generateRiskLevel(event)
    }));
  };

  // Helper functions for data transformation
  const getInternalStatus = (apiStatus) => {
    switch (apiStatus) {
      case 'PENDING': return 'pending';
      case 'IS_PUBLISHED': return 'active';
      case 'DRAFT': return 'draft';
      default: return 'pending';
    }
  };

  const getInternalType = (apiType) => {
    switch (apiType) {
      case 'PROFIT': return 'paid';
      case 'NON_PROFIT': return 'volunteer';
      default: return 'volunteer';
    }
  };

  const generateMockAiFlags = (event) => {
    const flags = [];
    if (!event.leaderPhone) flags.push('missing_contact');
    if (!event.detailLocation) flags.push('location_unclear');
    if (event.description.length < 50) flags.push('content_review');
    return flags;
  };

  const generateRiskLevel = (event) => {
    const flags = generateMockAiFlags(event);
    if (flags.length >= 2) return 'high';
    if (flags.length === 1) return 'medium';
    return 'low';
  };

  // Load data on component mount
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/admin/events`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page: 1,
          }
        })
        console.log(response);
        
        const transformedData = transformApiData(response.data);
        setEvents(transformedData);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Filtered and sorted events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organizer.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || event.status === filters.status;
      const matchesType = filters.type === 'all' || event.type === filters.type;
      const matchesPriority = filters.priority === 'all' || event.priority === filters.priority;
      const matchesLocation = filters.location === 'all' || event.location.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesLocation;
    });

    // Sort events
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [events, searchTerm, filters, sortBy, sortOrder]);

  // Pagination
  const paginatedEvents = filteredAndSortedEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredAndSortedEvents.length / pageSize);

  // Statistics
  const statistics = useMemo(() => {
    const total = events.length;
    const active = events.filter(e => e.status === 'active').length;
    const pending = events.filter(e => e.status === 'pending').length;
    const flagged = events.filter(e => e.aiFlags.length > 0).length;
    const totalVolunteers = events.reduce((sum, e) => sum + e.currentVolunteers, 0);
    const totalEngagement = events.reduce((sum, e) => sum + e.engagement.totalLike + e.engagement.totalComment, 0);

    return { total, active, pending, flagged, totalVolunteers, totalEngagement };
  }, [events]);

  // Status and priority colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'normal': return 'text-blue-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Event actions
  const handleEventAction = (eventId, action) => {
    switch (action) {
      case 'view':
        alert(`Xem chi tiết sự kiện: ${eventId}`);
        break;
      case 'edit':
        alert(`Chỉnh sửa sự kiện: ${eventId}`);
        break;
      case 'delete':
        if (confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
          setEvents(prev => prev.filter(e => e.id !== eventId));
        }
        break;
      case 'approve':
        setEvents(prev => prev.map(e => 
          e.id === eventId ? { ...e, status: 'active' } : e
        ));
        break;
      case 'suspend':
        setEvents(prev => prev.map(e => 
          e.id === eventId ? { ...e, status: 'suspended' } : e
        ));
        break;
      default:
        console.log(`Action: ${action} for event: ${eventId}`);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedEvents.length === 0) return;
    
    switch (action) {
      case 'delete':
        if (confirm(`Bạn có chắc chắn muốn xóa ${selectedEvents.length} sự kiện?`)) {
          setEvents(prev => prev.filter(e => !selectedEvents.includes(e.id)));
          setSelectedEvents([]);
        }
        break;
      case 'approve':
        setEvents(prev => prev.map(e => 
          selectedEvents.includes(e.id) ? { ...e, status: 'active' } : e
        ));
        setSelectedEvents([]);
        break;
      case 'suspend':
        setEvents(prev => prev.map(e => 
          selectedEvents.includes(e.id) ? { ...e, status: 'suspended' } : e
        ));
        setSelectedEvents([]);
        break;
    }
  };

  const toggleEventSelection = (eventId) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa xác định';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatSalary = (salary) => {
    if (salary === 0) return 'Tình nguyện';
    return `${salary.toLocaleString('vi-VN')} VNĐ`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý sự kiện</h1>
              <p className="text-gray-600">Tổng quan và quản lý tất cả sự kiện trong hệ thống</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="h-4 w-4" />
                Xuất báo cáo
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Tạo sự kiện
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { key: 'dashboard', label: 'Tổng quan', icon: BarChart3 },
              { key: 'events', label: `Sự kiện (${statistics.total})`, icon: Calendar },
              { key: 'pending', label: `Chờ duyệt (${statistics.pending})`, icon: Clock },
              { key: 'analytics', label: 'Phân tích', icon: TrendingUp },
              { key: 'quality', label: 'Chất lượng', icon: Shield }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tổng sự kiện</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.active}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tình nguyện viên</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.totalVolunteers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <Heart className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tương tác</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.totalEngagement}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Sự kiện mới nhất</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {events.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <img 
                          src={event.coverImage} 
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 line-clamp-1">{event.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {event.currentVolunteers}/{event.maxVolunteers}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEventAction(event.id, 'view')}
                          className="p-2 text-gray-400 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEventAction(event.id, 'edit')}
                          className="p-2 text-gray-400 hover:text-yellow-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm sự kiện, tổ chức..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="active">Đang hoạt động</option>
                    <option value="pending">Chờ duyệt</option>
                    <option value="draft">Nháp</option>
                    <option value="suspended">Tạm dừng</option>
                  </select>
                  
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả loại</option>
                    <option value="volunteer">Tình nguyện</option>
                    <option value="paid">Có lương</option>
                  </select>
                  
                  <button
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    {sortOrder === 'asc' ? 'Cũ nhất' : 'Mới nhất'}
                  </button>
                </div>
              </div>
              
              {selectedEvents.length > 0 && (
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">
                    Đã chọn {selectedEvents.length} sự kiện
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBulkAction('approve')}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                    >
                      Duyệt
                    </button>
                    <button
                      onClick={() => handleBulkAction('suspend')}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 text-sm"
                    >
                      Tạm dừng
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Header with checkbox */}
                  <div className="flex items-center justify-between p-3 border-b border-gray-100">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={() => toggleEventSelection(event.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">#{event.id.slice(0, 8)}</span>
                    </label>
                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                        {event.status === 'active' ? 'Hoạt động' : 
                         event.status === 'pending' ? 'Chờ duyệt' :
                         event.status === 'draft' ? 'Nháp' : 'Khác'}
                      </span>
                      <span className={`text-xs font-medium ${getPriorityColor(event.priority)}`}>
                        {event.priority === 'urgent' ? '🔴' : 
                         event.priority === 'high' ? '🟠' : 
                         event.priority === 'normal' ? '🔵' : '⚪'}
                      </span>
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div className="relative h-48">
                    <img 
                      src={event.coverImage} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    {event.aiFlags.length > 0 && (
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {event.aiFlags.length} cảnh báo
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                      <div className="flex items-center gap-2">
                        <img 
                          src={event.organizer.avatar} 
                          alt={event.organizer.name}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                        {event.mediaGallery.length > 0 && (
                          <span className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            +{event.mediaGallery.length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                      <Building2 className="h-4 w-4" />
                      <span>{event.organizer.name}</span>
                      {event.organizer.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                    </div>

                    <div className="space-y-2 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>{formatSalary(event.salary)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.startAt)}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Tình nguyện viên</span>
                        <span className="font-medium">{event.currentVolunteers}/{event.maxVolunteers}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (event.currentVolunteers / Math.max(1, event.maxVolunteers)) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {event.engagement.totalLike}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {event.engagement.totalComment}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {event.engagement.views}
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${getRiskColor(event.riskLevel)}`}>
                        Risk: {event.riskLevel}
                      </div>
                    </div>

                    {/* Categories and Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {event.categories.slice(0, 2).map((category) => (
                          <span key={category.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {category.label}
                          </span>
                        ))}
                        {event.categories.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{event.categories.length - 2}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {event.skills.slice(0, 2).map((skill) => (
                          <span key={skill.id} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            {skill.label}
                          </span>
                        ))}
                        {event.skills.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{event.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEventAction(event.id, 'view')}
                          className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEventAction(event.id, 'edit')}
                          className="p-2 text-gray-400 hover:text-yellow-600 rounded-lg hover:bg-yellow-50"
                          title="Chỉnh sửa"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEventAction(event.id, 'delete')}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        {event.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleEventAction(event.id, 'approve')}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                            >
                              Duyệt
                            </button>
                            <button
                              onClick={() => handleEventAction(event.id, 'suspend')}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                            >
                              Từ chối
                            </button>
                          </>
                        )}
                        {event.status === 'active' && (
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm">
                            <QrCode className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="text-sm text-gray-600">
                  Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredAndSortedEvents.length)} 
                  trên {filteredAndSortedEvents.length} sự kiện
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trước
                  </button>
                  <span className="px-4 py-2 text-sm">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sau
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pending Tab */}
        {activeTab === 'pending' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Sự kiện chờ duyệt</h3>
                <p className="text-sm text-gray-600 mt-1">Xem xét và phê duyệt các sự kiện mới</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {events.filter(e => e.status === 'pending').map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <img 
                              src={event.coverImage} 
                              alt={event.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Building2 className="h-4 w-4" />
                                <span>{event.organizer.name}</span>
                                {event.aiFlags.length > 0 && (
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(event.riskLevel)}`}>
                                    {event.riskLevel} risk
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                              <span>{formatSalary(event.salary)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{formatDate(event.startAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span>{event.maxVolunteers} TNV</span>
                            </div>
                          </div>

                          {event.aiFlags.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">⚠️ Cảnh báo AI:</p>
                              <div className="flex flex-wrap gap-2">
                                {event.aiFlags.map((flag, index) => (
                                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                    {flag.replace(/_/g, ' ')}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="text-xs text-gray-500">
                            Gửi lúc: {formatDate(event.createdAt)}
                          </div>
                        </div>

                        <div className="ml-6 flex flex-col gap-2">
                          <button
                            onClick={() => handleEventAction(event.id, 'approve')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleEventAction(event.id, 'edit')}
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm flex items-center gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Sửa
                          </button>
                          <button
                            onClick={() => handleEventAction(event.id, 'suspend')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Từ chối
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {events.filter(e => e.status === 'pending').length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Không có sự kiện nào đang chờ duyệt</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quality Tab */}
        {activeTab === 'quality' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-sm border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Chỉ số chất lượng
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Điểm chất lượng trung bình</span>
                  <span className="font-semibold text-blue-600">
                    {Math.round(events.reduce((sum, e) => sum + e.qualityScore, 0) / events.length || 0)}/100
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Tỷ lệ hoàn thành</span>
                  <span className="font-semibold text-green-600">87.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Tỷ lệ tương tác</span>
                  <span className="font-semibold text-purple-600">92.3%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-xl p-6 shadow-sm border border-red-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Cảnh báo an toàn
              </h3>
              <div className="space-y-3">
                {events
                  .filter(e => e.aiFlags.length > 0)
                  .slice(0, 3)
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                        <p className="text-xs text-gray-600">
                          {event.aiFlags.join(', ')} - {event.organizer.name}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                {events.filter(e => e.aiFlags.length > 0).length === 0 && (
                  <div className="text-center py-4">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-green-700 font-medium">Không có cảnh báo nào</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân tích theo loại</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tình nguyện</span>
                  <span className="font-semibold">{events.filter(e => e.type === 'volunteer').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Có lương</span>
                  <span className="font-semibold">{events.filter(e => e.type === 'paid').length}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân tích theo địa điểm</h3>
              <div className="space-y-4">
                {['hà nội', 'tỉnh lâm đồng'].map(location => {
                  const count = events.filter(e => e.location.toLowerCase().includes(location)).length;
                  return (
                    <div key={location} className="flex items-center justify-between">
                      <span className="text-gray-600 capitalize">{location}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagement;