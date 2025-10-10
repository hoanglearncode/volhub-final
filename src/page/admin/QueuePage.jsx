import React, { useState } from 'react';
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
  BookText, Video, Heart, Share, Play, ShieldAlert, Bell,
  Inbox, UserPlus, FileCheck, MessageCircle, Gavel, Flame
} from 'lucide-react';

export default function QueuePage() {
  const [activeQueue, setActiveQueue] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    priority: 'all',
    status: 'all',
    dateRange: '24h'
  });

  // Queue statistics and data
  const queueStats = {
    overview: {
      totalPending: 156,
      highPriority: 23,
      avgWaitTime: '4.2h',
      processedToday: 89,
      weeklyGrowth: 12.5
    },
    contentModeration: {
      pending: 47,
      aiFlags: 12,
      userReports: 8,
      avgProcessTime: '2.1h',
      approvalRate: 87.3
    },
    abuseReports: {
      pending: 23,
      investigating: 8,
      critical: 5,
      avgResolutionTime: '6.4h',
      falsePositiveRate: 15.2
    },
    userVerification: {
      pending: 34,
      documentsReview: 18,
      backgroundCheck: 12,
      avgVerificationTime: '24h',
      successRate: 92.8
    },
    partnerApproval: {
      pending: 12,
      dueDiligence: 6,
      complianceReview: 4,
      avgApprovalTime: '72h',
      approvalRate: 78.5
    },
    communityFeed: {
      flagged: 19,
      trending: 45,
      promoted: 12,
      engagement: '8.7%',
      contentQuality: 94.2
    }
  };

  const queueTypes = [
    {
      id: 'overview',
      name: 'Tổng quan',
      icon: BarChart3,
      color: 'blue',
      count: queueStats.overview.totalPending,
      description: 'Tổng quan tất cả queue'
    },
    {
      id: 'content',
      name: 'Kiểm duyệt nội dung',
      icon: BookText,
      color: 'purple',
      count: queueStats.contentModeration.pending,
      description: 'Nội dung chờ kiểm duyệt',
      urgent: queueStats.contentModeration.aiFlags > 10
    },
    {
      id: 'abuse',
      name: 'Báo cáo vi phạm',
      icon: Flag,
      color: 'red',
      count: queueStats.abuseReports.pending,
      description: 'Báo cáo vi phạm chờ xử lý',
      urgent: queueStats.abuseReports.critical > 3
    },
    {
      id: 'verification',
      name: 'Xác minh người dùng',
      icon: UserCheck,
      color: 'green',
      count: queueStats.userVerification.pending,
      description: 'Yêu cầu xác minh chờ duyệt'
    },
    {
      id: 'partners',
      name: 'Phê duyệt đối tác',
      icon: Building,
      color: 'orange',
      count: queueStats.partnerApproval.pending,
      description: 'Đối tác chờ phê duyệt'
    },
    {
      id: 'feed',
      name: 'Quản lý Feed',
      icon: MessageCircle,
      color: 'teal',
      count: queueStats.communityFeed.flagged,
      description: 'Nội dung feed cần xem xét'
    }
  ];

  // Recent activities across all queues
  const recentActivities = [
    {
      id: 'ACT001',
      type: 'content_approved',
      title: 'Nội dung "Workshop kỹ năng mềm" đã được duyệt',
      user: 'Admin Nguyen',
      timestamp: '2024-12-05T14:30:00Z',
      queue: 'content',
      severity: 'info'
    },
    {
      id: 'ACT002',
      type: 'abuse_report',
      title: 'Báo cáo vi phạm mới: Quấy rối người dùng',
      user: 'System',
      timestamp: '2024-12-05T14:25:00Z',
      queue: 'abuse',
      severity: 'high'
    },
    {
      id: 'ACT003',
      type: 'partner_approved',
      title: 'Đối tác "Green Earth Foundation" đã được phê duyệt',
      user: 'Admin Tran',
      timestamp: '2024-12-05T14:15:00Z',
      queue: 'partners',
      severity: 'success'
    },
    {
      id: 'ACT004',
      type: 'verification_completed',
      title: '5 yêu cầu xác minh đã hoàn thành',
      user: 'Admin Le',
      timestamp: '2024-12-05T14:10:00Z',
      queue: 'verification',
      severity: 'success'
    },
    {
      id: 'ACT005',
      type: 'content_flagged',
      title: 'AI phát hiện nội dung spam tiềm năng',
      user: 'AI System',
      timestamp: '2024-12-05T14:05:00Z',
      queue: 'content',
      severity: 'warning'
    }
  ];

  const urgentItems = [
    {
      id: 'URG001',
      type: 'abuse_report',
      title: 'Báo cáo bạo lực nghiêm trọng',
      priority: 'critical',
      waitTime: '45m',
      assignee: 'Admin Nguyen'
    },
    {
      id: 'URG002',
      type: 'content_review',
      title: 'Video có nội dung nhạy cảm',
      priority: 'high',
      waitTime: '2h 15m',
      assignee: 'Admin Tran'
    },
    {
      id: 'URG003',
      type: 'partner_compliance',
      title: 'Đối tác có dấu hiệu vi phạm chính sách',
      priority: 'high',
      waitTime: '4h 30m',
      assignee: 'Admin Le'
    }
  ];

  const getQueueColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      teal: 'bg-teal-100 text-teal-800 border-teal-200'
    };
    return colors[color] || colors.blue;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'text-red-600 bg-red-100',
      high: 'text-orange-600 bg-orange-100',
      medium: 'text-yellow-600 bg-yellow-100',
      low: 'text-green-600 bg-green-100'
    };
    return colors[priority] || colors.medium;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'text-red-600',
      warning: 'text-orange-600',
      info: 'text-blue-600',
      success: 'text-green-600'
    };
    return colors[severity] || colors.info;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Queue Management</h1>
            <p className="text-gray-600 mt-2">Quản lý tất cả queue xử lý trong hệ thống</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Xuất báo cáo</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Settings className="w-4 h-4" />
              <span>Cài đặt Queue</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <RefreshCw className="w-4 h-4" />
              <span>Làm mới</span>
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng đang chờ</p>
                <p className="text-2xl font-bold text-gray-900">{queueStats.overview.totalPending}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Inbox className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">+{queueStats.overview.weeklyGrowth}% tuần này</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ưu tiên cao</p>
                <p className="text-2xl font-bold text-gray-900">{queueStats.overview.highPriority}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-red-600 mt-2">Cần xử lý ngay</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thời gian chờ TB</p>
                <p className="text-2xl font-bold text-gray-900">{queueStats.overview.avgWaitTime}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">-12% so với tuần trước</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã xử lý hôm nay</p>
                <p className="text-2xl font-bold text-gray-900">{queueStats.overview.processedToday}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">Hiệu suất tốt</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hoạt động</p>
                <p className="text-2xl font-bold text-gray-900">98.5%</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">Hệ thống ổn định</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Queue Types */}
        <div className="lg:col-span-2 space-y-6">
          {/* Queue Navigation */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Loại Queue</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {queueTypes.map((queue) => {
                const Icon = queue.icon;
                return (
                  <button
                    key={queue.id}
                    onClick={() => setActiveQueue(queue.id)}
                    className={`relative p-4 border-2 rounded-lg transition-all duration-200 text-left hover:shadow-md ${
                      activeQueue === queue.id 
                        ? `${getQueueColor(queue.color)} border-current` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-6 h-6 ${
                          activeQueue === queue.id 
                            ? 'text-current' 
                            : `text-${queue.color}-600`
                        }`} />
                        <span className="font-medium">{queue.name}</span>
                      </div>
                      {queue.urgent && (
                        <div className="flex items-center space-x-1">
                          <Bell className="w-4 h-4 text-red-500 animate-pulse" />
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            Urgent
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{queue.description}</span>
                      <div className={`px-3 py-1 rounded-full font-semibold ${
                        queue.count > 20 ? 'bg-red-100 text-red-800' :
                        queue.count > 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {queue.count}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Queue Details Based on Selection */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {queueTypes.find(q => q.id === activeQueue)?.name || 'Tổng quan'}
              </h2>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2 inline" />
                  Lọc
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Xử lý hàng loạt
                </button>
              </div>
            </div>

            {/* Queue-specific content */}
            {activeQueue === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BookText className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-900">Nội dung</p>
                        <p className="text-blue-700">{queueStats.contentModeration.pending} chờ duyệt</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Flag className="w-8 h-8 text-red-600" />
                      <div>
                        <p className="font-semibold text-red-900">Vi phạm</p>
                        <p className="text-red-700">{queueStats.abuseReports.pending} báo cáo</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <UserCheck className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900">Xác minh</p>
                        <p className="text-green-700">{queueStats.userVerification.pending} yêu cầu</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-3">Xu hướng xử lý</h3>
                  <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Biểu đồ xu hướng xử lý queue theo thời gian</p>
                  </div>
                </div>
              </div>
            )}

            {activeQueue === 'content' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold">{queueStats.contentModeration.pending}</p>
                    <p className="text-sm text-gray-600">Chờ duyệt</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <ShieldAlert className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="font-semibold">{queueStats.contentModeration.aiFlags}</p>
                    <p className="text-sm text-gray-600">AI flags</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Flag className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">{queueStats.contentModeration.userReports}</p>
                    <p className="text-sm text-gray-600">Báo cáo</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold">{queueStats.contentModeration.approvalRate}%</p>
                    <p className="text-sm text-gray-600">Tỷ lệ duyệt</p>
                  </div>
                </div>
              </div>
            )}

            {/* Add similar sections for other queue types */}
            {activeQueue !== 'overview' && activeQueue !== 'content' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(queueTypes.find(q => q.id === activeQueue)?.icon, {
                    className: "w-8 h-8 text-gray-600"
                  })}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {queueTypes.find(q => q.id === activeQueue)?.name}
                </h3>
                <p className="text-gray-600">
                  Chi tiết queue sẽ được hiển thị tại đây
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Xem chi tiết
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Recent Activity & Urgent Items */}
        <div className="space-y-6">
          {/* Urgent Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Cần xử lý gấp</h3>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            
            <div className="space-y-3">
              {urgentItems.map((item) => (
                <div key={item.id} className="p-3 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority === 'critical' ? 'Nghiêm trọng' : 'Cao'}
                    </span>
                    <span className="text-xs text-gray-600">Chờ: {item.waitTime}</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">Phụ trách: {item.assignee}</p>
                  <button className="mt-2 w-full px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                    Xử lý ngay
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
            
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.severity === 'high' ? 'bg-red-100' :
                    activity.severity === 'warning' ? 'bg-yellow-100' :
                    activity.severity === 'success' ? 'bg-green-100' :
                    'bg-blue-100'
                  }`}>
                    {activity.type === 'content_approved' && <CheckCircle className={`w-4 h-4 ${getSeverityColor(activity.severity)}`} />}
                    {activity.type === 'abuse_report' && <Flag className={`w-4 h-4 ${getSeverityColor(activity.severity)}`} />}
                    {activity.type === 'partner_approved' && <Building className={`w-4 h-4 ${getSeverityColor(activity.severity)}`} />}
                    {activity.type === 'verification_completed' && <UserCheck className={`w-4 h-4 ${getSeverityColor(activity.severity)}`} />}
                    {activity.type === 'content_flagged' && <ShieldAlert className={`w-4 h-4 ${getSeverityColor(activity.severity)}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-500">{activity.user}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
              Xem tất cả hoạt động
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <BookText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Kiểm duyệt hàng loạt</p>
                  <p className="text-sm text-gray-600">Duyệt nhiều nội dung cùng lúc</p>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <UserCheck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Xác minh nhanh</p>
                  <p className="text-sm text-gray-600">Xử lý xác minh ưu tiên</p>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <Flag className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">Xử lý vi phạm</p>
                  <p className="text-sm text-gray-600">Giải quyết báo cáo nghiêm trọng</p>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <Settings className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Cấu hình Queue</p>
                  <p className="text-sm text-gray-600">Tùy chỉnh quy trình xử lý</p>
                </div>
              </button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất hệ thống</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Thời gian phản hồi trung bình</span>
                <span className="font-medium text-gray-900">2.1s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tải hệ thống</span>
                <span className="font-medium text-gray-900">67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Độ tin cậy</span>
                <span className="font-medium text-gray-900">99.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '99%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Detailed Queue Analytics */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Phân tích Queue Chi tiết</h2>
          <div className="flex items-center space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="24h">24 giờ qua</option>
              <option value="7d">7 ngày qua</option>
              <option value="30d">30 ngày qua</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Tải báo cáo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Queue Processing Chart */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Xu hướng xử lý Queue</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Biểu đồ xử lý queue theo thời gian</p>
              </div>
            </div>
          </div>

          {/* Response Time Distribution */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Phân bố thời gian phản hồi</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600"> 1 giờ</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm font-medium w-10">78%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">1-4 giờ</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm font-medium w-10">15%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">4-24 giờ</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  <span className="text-sm font-medium w-10">5%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600"> 24 giờ</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '2%' }}></div>
                  </div>
                  <span className="text-sm font-medium w-10">2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Queue Performance Table */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hiệu suất theo Queue</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Queue Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đang chờ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đã xử lý hôm nay
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian TB
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tỷ lệ thành công
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BookText className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-sm font-medium text-gray-900">Kiểm duyệt nội dung</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.contentModeration.pending}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">34</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.contentModeration.avgProcessTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.contentModeration.approvalRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Bình thường
                    </span>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Flag className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-sm font-medium text-gray-900">Báo cáo vi phạm</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.abuseReports.pending}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.abuseReports.avgResolutionTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {100 - queueStats.abuseReports.falsePositiveRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                      Cần chú ý
                    </span>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserCheck className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm font-medium text-gray-900">Xác minh người dùng</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.userVerification.pending}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">28</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.userVerification.avgVerificationTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.userVerification.successRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Tốt
                    </span>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building className="w-5 h-5 text-orange-600 mr-3" />
                      <span className="text-sm font-medium text-gray-900">Phê duyệt đối tác</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.partnerApproval.pending}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.partnerApproval.avgApprovalTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {queueStats.partnerApproval.approvalRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Bình thường
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}