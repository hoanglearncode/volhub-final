import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Award, DollarSign, 
  Phone, Mail, Globe, Star, Heart, Share2, Edit, Trash2,
  CheckCircle, XCircle, AlertTriangle, Eye, MessageSquare,
  Download, FileText, Camera, Tag, Building, Shield,
  TrendingUp, Activity, UserCheck, Clock3, BarChart3,
  RefreshCw, Filter, Search, MoreHorizontal, Flag, Ban,
  Bell
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

export default function EventDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [eventStatus, setEventStatus] = useState('active');
  const [showApplications, setShowApplications] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Mock event data
  const eventData = {
    id: 'EVT-2024-001',
    title: 'Làm sạch bờ biển Vũng Tàu - Bảo vệ môi trường biển',
    description: `Chương trình làm sạch bờ biển Vũng Tàu là một sáng kiến môi trường quan trọng nhằm bảo vệ hệ sinh thái biển và nâng cao ý thức cộng đồng về bảo vệ môi trường.

Chúng tôi sẽ cùng nhau thu gom rác thải, phân loại và tái chế, đồng thời tuyên truyền về tác hại của rác thải nhựa đối với đại dương. Đây là cơ hội tuyệt vời để bạn đóng góp cho môi trường và kết nối với những người có cùng chí hướng.`,
    category: 'Môi trường',
    eventType: 'volunteer',
    status: 'active', // draft, pending, active, paused, completed, cancelled
    priority: 'high',
    
    // Schedule & Location
    startDate: '2024-12-15',
    endDate: '2024-12-15',
    startTime: '06:00',
    endTime: '11:00',
    location: 'Bãi biển Bãi Trước, Vũng Tàu',
    address: 'Đường Thùy Vân, Phường Thắng Tam, Thành phố Vũng Tàu, Bà Rịa - Vũng Tàu',
    coordinates: { lat: 10.3364, lng: 107.0861 },
    
    // Organizer info
    organizer: {
      name: 'Green Earth Vietnam',
      type: 'verified_partner',
      logo: '/api/placeholder/60/60',
      rating: 4.8,
      eventsOrganized: 45,
      trustScore: 95
    },
    
    // Contact
    contactInfo: {
      coordinatorName: 'Nguyễn Thị Hương',
      phone: '0901234567',
      email: 'huong@greenearth.vn',
      alternateContact: '0907654321'
    },
    
    // Requirements
    volunteersNeeded: 50,
    volunteersRegistered: 32,
    volunteersConfirmed: 28,
    minAge: 16,
    maxAge: 60,
    genderRequirement: 'any',
    experienceLevel: 'beginner',
    skillsRequired: ['Thể lực tốt', 'Tinh thần trách nhiệm'],
    registrationDeadline: '2024-12-13',
    
    // Benefits
    benefits: {
      meals: true,
      transportation: true,
      insurance: true,
      certificate: true,
      uniform: true,
      training: false,
      allowance: false,
      allowanceAmount: 0
    },
    
    // Media
    coverImage: '/api/placeholder/800/400',
    additionalImages: [
      '/api/placeholder/200/150',
      '/api/placeholder/200/150',
      '/api/placeholder/200/150'
    ],
    
    // Settings
    autoApprove: false,
    requireBackground: false,
    isPublic: true,
    tags: ['môi trường', 'biển', 'tình nguyện', 'vũng tàu', 'làm sạch'],
    
    // Stats
    stats: {
      views: 1250,
      applications: 32,
      approved: 28,
      pending: 4,
      rejected: 0,
      completionRate: 92,
      avgRating: 4.6
    },
    
    createdAt: '2024-11-20T10:30:00Z',
    updatedAt: '2024-12-01T15:45:00Z',
    createdBy: 'Green Earth Admin'
  };

  // Mock applications data
  const applications = [
    {
      id: 1,
      volunteer: {
        name: 'Trần Văn Minh',
        avatar: '/api/placeholder/40/40',
        age: 24,
        experience: 'intermediate',
        skills: ['Thể lực tốt', 'Kinh nghiệm môi trường'],
        rating: 4.8,
        completedEvents: 15,
        verificationStatus: 'verified'
      },
      applicationDate: '2024-11-25T09:15:00Z',
      status: 'approved',
      message: 'Tôi rất quan tâm đến vấn đề môi trường và đã tham gia nhiều hoạt động tương tự.',
      adminNotes: 'TNV có kinh nghiệm, profile tốt'
    },
    {
      id: 2,
      volunteer: {
        name: 'Lê Thị Hoa',
        avatar: '/api/placeholder/40/40',
        age: 28,
        experience: 'beginner',
        skills: ['Nhiệt huyết', 'Tinh thần trách nhiệm'],
        rating: 4.5,
        completedEvents: 3,
        verificationStatus: 'verified'
      },
      applicationDate: '2024-11-26T14:20:00Z',
      status: 'pending',
      message: 'Đây là lần đầu tôi tham gia hoạt động môi trường, mong được học hỏi.',
      adminNotes: ''
    }
  ];

  // Analytics data
  const applicationTrendData = [
    { date: '20/11', applications: 5, approvals: 4 },
    { date: '21/11', applications: 8, approvals: 7 },
    { date: '22/11', applications: 6, approvals: 5 },
    { date: '25/11', applications: 10, approvals: 9 },
    { date: '26/11', applications: 3, approvals: 3 }
  ];

  const skillsDistribution = [
    { skill: 'Thể lực tốt', count: 28, color: '#3b82f6' },
    { skill: 'Kinh nghiệm môi trường', count: 15, color: '#10b981' },
    { skill: 'Tinh thần trách nhiệm', count: 32, color: '#f59e0b' },
    { skill: 'Nhiệt huyết', count: 25, color: '#ef4444' }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      draft: { color: 'gray', bg: 'bg-gray-100', text: 'text-gray-800', label: 'Nháp' },
      pending: { color: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ duyệt' },
      active: { color: 'green', bg: 'bg-green-100', text: 'text-green-800', label: 'Đang hoạt động' },
      paused: { color: 'orange', bg: 'bg-orange-100', text: 'text-orange-800', label: 'Tạm dừng' },
      completed: { color: 'blue', bg: 'bg-blue-100', text: 'text-blue-800', label: 'Hoàn thành' },
      cancelled: { color: 'red', bg: 'bg-red-100', text: 'text-red-800', label: 'Đã hủy' }
    };
    return configs[status] || configs.draft;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      low: { color: 'text-gray-600', label: 'Thấp' },
      normal: { color: 'text-blue-600', label: 'Bình thường' },
      high: { color: 'text-orange-600', label: 'Cao' },
      urgent: { color: 'text-red-600', label: 'Khẩn cấp' }
    };
    return configs[priority] || configs.normal;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const handleStatusChange = (newStatus) => {
    setEventStatus(newStatus);
    // API call to update status
    console.log(`Updating event status to: ${newStatus}`);
  };

  const handleApplicationAction = (applicationId, action, notes = '') => {
    console.log(`${action} application ${applicationId}`, notes);
    // API call to update application status
  };

  const statusConfig = getStatusConfig(eventData.status);
  const priorityConfig = getPriorityConfig(eventData.priority);

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: Eye },
    { id: 'applications', label: `Đăng ký (${eventData.stats.applications})`, icon: Users },
    { id: 'analytics', label: 'Thống kê', icon: BarChart3 },
    { id: 'settings', label: 'Cài đặt', icon: Edit }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{eventData.title}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                  {statusConfig.label}
                </span>
                <span className={`text-sm font-medium ${priorityConfig.color}`}>
                  {priorityConfig.label}
                </span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span>ID: {eventData.id}</span>
                <span>Tạo: {formatDate(eventData.createdAt)}</span>
                <span>Bởi: {eventData.createdBy}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Share2 className="w-4 h-4 mr-2" />
                Chia sẻ
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </button>
              <div className="relative">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lượt xem</p>
                <p className="text-2xl font-bold text-gray-900">{eventData.stats.views.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đăng ký</p>
                <p className="text-2xl font-bold text-gray-900">{eventData.stats.applications}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã duyệt</p>
                <p className="text-2xl font-bold text-gray-900">{eventData.stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Chờ duyệt</p>
                <p className="text-2xl font-bold text-gray-900">{eventData.stats.pending}</p>
              </div>
              <Clock3 className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">{eventData.stats.completionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đánh giá</p>
                <p className="text-2xl font-bold text-gray-900">{eventData.stats.avgRating}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cover Image */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img
                  src={eventData.coverImage}
                  alt="Event cover"
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Mô tả sự kiện</h3>
                <div className="prose max-w-none">
                  {eventData.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Yêu cầu tình nguyện viên</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số lượng cần tuyển:</span>
                        <span className="font-medium">{eventData.volunteersNeeded} người</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Độ tuổi:</span>
                        <span className="font-medium">{eventData.minAge} - {eventData.maxAge} tuổi</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giới tính:</span>
                        <span className="font-medium">
                          {eventData.genderRequirement === 'any' ? 'Không yêu cầu' : eventData.genderRequirement}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kinh nghiệm:</span>
                        <span className="font-medium capitalize">{eventData.experienceLevel}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Kỹ năng yêu cầu:</h4>
                    <div className="flex flex-wrap gap-2">
                      {eventData.skillsRequired.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Quyền lợi</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(eventData.benefits)
                    .filter(([key, value]) => value === true)
                    .map(([key]) => {
                      const benefitLabels = {
                        meals: 'Bữa ăn',
                        transportation: 'Đi lại',
                        insurance: 'Bảo hiểm',
                        certificate: 'Chứng nhận',
                        uniform: 'Trang phục',
                        training: 'Đào tạo'
                      };
                      return (
                        <div key={key} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium">{benefitLabels[key]}</span>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Additional Images */}
              {eventData.additionalImages.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Hình ảnh thêm</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {eventData.additionalImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin sự kiện</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{formatDate(eventData.startDate)}</p>
                      <p className="text-sm text-gray-600">
                        {formatTime(eventData.startTime)} - {formatTime(eventData.endTime)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{eventData.location}</p>
                      <p className="text-sm text-gray-600">{eventData.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{eventData.volunteersRegistered}/{eventData.volunteersNeeded} người</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(eventData.volunteersRegistered / eventData.volunteersNeeded) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Tag className="w-5 h-5 text-gray-500" />
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">{eventData.category}</span>
                  </div>
                </div>
              </div>

              {/* Organizer Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin tổ chức</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={eventData.organizer.logo}
                    alt="Organizer logo"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{eventData.organizer.name}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{eventData.organizer.rating}</span>
                      </div>
                      {eventData.organizer.type === 'verified_partner' && (
                        <Shield className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sự kiện đã tổ chức:</span>
                    <span className="font-medium">{eventData.organizer.eventsOrganized}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Điểm tin cậy:</span>
                    <span className="font-medium">{eventData.organizer.trustScore}%</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{eventData.contactInfo.coordinatorName}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a href={`tel:${eventData.contactInfo.phone}`} className="text-sm text-blue-600 hover:underline">
                      {eventData.contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a href={`mailto:${eventData.contactInfo.email}`} className="text-sm text-blue-600 hover:underline">
                      {eventData.contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {eventData.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Hành động nhanh</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Phê duyệt tất cả
                  </button>
                  <button className="w-full flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Gửi thông báo
                  </button>
                  <button className="w-full flex items-center px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100">
                    <Flag className="w-4 h-4 mr-2" />
                    Spotlight
                  </button>
                  <button className="w-full flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100">
                    <Ban className="w-4 h-4 mr-2" />
                    Tạm dừng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Danh sách đăng ký ({applications.length})</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm tình nguyện viên..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Chờ duyệt</option>
                    <option value="approved">Đã duyệt</option>
                    <option value="rejected">Đã từ chối</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {applications.map((application) => (
                <div key={application.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={application.volunteer.avatar}
                        alt="Volunteer avatar"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{application.volunteer.name}</h4>
                          <span className="text-sm text-gray-500">({application.volunteer.age} tuổi)</span>
                          {application.volunteer.verificationStatus === 'verified' && (
                            <Shield className="w-4 h-4 text-blue-500" />
                          )}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            application.status === 'approved' ? 'bg-green-100 text-green-800' :
                            application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {application.status === 'approved' ? 'Đã duyệt' :
                             application.status === 'pending' ? 'Chờ duyệt' : 'Đã từ chối'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Kinh nghiệm: </span>
                            <span className="capitalize">{application.volunteer.experience}</span>
                          </div>
                          <div>
                            <span className="font-medium">Đánh giá: </span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span>{application.volunteer.rating}</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Sự kiện đã tham gia: </span>
                            <span>{application.volunteer.completedEvents}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <span className="font-medium text-sm text-gray-700">Kỹ năng: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {application.volunteer.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <span className="font-medium text-sm text-gray-700">Lời nhắn: </span>
                          <p className="text-sm text-gray-600 mt-1">{application.message}</p>
                        </div>

                        {application.adminNotes && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="font-medium text-sm text-gray-700">Ghi chú Admin: </span>
                            <p className="text-sm text-gray-600 mt-1">{application.adminNotes}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xs text-gray-500">
                            Đăng ký: {new Date(application.applicationDate).toLocaleDateString('vi-VN')}
                          </span>
                          
                          {application.status === 'pending' && (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleApplicationAction(application.id, 'approve')}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                              >
                                Duyệt
                              </button>
                              <button
                                onClick={() => handleApplicationAction(application.id, 'reject')}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                              >
                                Từ chối
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Duyệt tất cả
                  </button>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Xuất danh sách
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Hiển thị {applications.length} / {eventData.stats.applications} đăng ký
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Application Trends */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Xu hướng đăng ký</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={applicationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} name="Đăng ký" />
                  <Line type="monotone" dataKey="approvals" stroke="#10b981" strokeWidth={2} name="Được duyệt" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skills Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Phân bố kỹ năng</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillsDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Application Status */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Trạng thái đăng ký</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Đã duyệt', value: eventData.stats.approved, fill: '#10b981' },
                        { name: 'Chờ duyệt', value: eventData.stats.pending, fill: '#f59e0b' },
                        { name: 'Đã từ chối', value: eventData.stats.rejected, fill: '#ef4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round((eventData.stats.approved / eventData.stats.views) * 100)}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Approval Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round((eventData.stats.approved / eventData.stats.applications) * 100)}%
                    </p>
                  </div>
                  <UserCheck className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                    <p className="text-2xl font-bold text-gray-900">2.5h</p>
                  </div>
                  <Clock3 className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Quality Score</p>
                    <p className="text-2xl font-bold text-gray-900">8.7/10</p>
                  </div>
                  <Star className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Cài đặt sự kiện</h3>
            
            <div className="space-y-8">
              {/* Status Management */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Trạng thái sự kiện</h4>
                <div className="flex flex-wrap gap-3">
                  {Object.entries({
                    active: 'Đang hoạt động',
                    paused: 'Tạm dừng',
                    completed: 'Hoàn thành',
                    cancelled: 'Hủy bỏ'
                  }).map(([status, label]) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`px-4 py-2 rounded-lg border ${
                        eventData.status === status
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Registration Settings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Cài đặt đăng ký</h4>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={eventData.autoApprove}
                      onChange={(e) => console.log('Toggle auto approve:', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Tự động phê duyệt đăng ký</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={eventData.requireBackground}
                      onChange={(e) => console.log('Toggle background check:', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Yêu cầu kiểm tra lý lịch</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={eventData.isPublic}
                      onChange={(e) => console.log('Toggle public visibility:', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Hiển thị công khai</span>
                  </label>
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Thông báo</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Gửi thông báo cho TNV
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                    <Bell className="w-5 h-5 mr-2" />
                    Nhắc nhở deadline
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-medium text-red-900 mb-3">Vùng nguy hiểm</h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700 mb-4">
                    Các hành động này không thể hoàn tác. Vui lòng cân nhắc kỹ trước khi thực hiện.
                  </p>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <Trash2 className="w-4 h-4 inline mr-2" />
                      Xóa sự kiện
                    </button>
                    <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
                      <Ban className="w-4 h-4 inline mr-2" />
                      Khóa vĩnh viễn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}