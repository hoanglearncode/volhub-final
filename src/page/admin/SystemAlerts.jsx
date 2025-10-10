import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  AlertTriangle, AlertCircle, Info, CheckCircle, XCircle, Clock,
  Bell, Shield, Activity, Users, Calendar, MessageSquare, FileText,
  Zap, TrendingUp, TrendingDown, RefreshCw, Filter, Search, Eye,
  Settings, Download, Archive, Trash2, Play, Pause, MoreHorizontal
} from 'lucide-react';

const VHubSystemAlerts = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // list, grid, timeline

  // Mock data cho alerts
  const systemAlerts = [
    {
      id: 1,
      title: 'Queue Connect đang backlog',
      description: 'Có 256 yêu cầu Connect chờ xử lý vượt ngưỡng 200',
      category: 'system',
      severity: 'critical',
      status: 'active',
      timestamp: new Date('2024-12-07 10:30:00'),
      affectedUsers: 256,
      source: 'Connection Queue Monitor',
      actions: ['Assign more reviewers', 'Enable auto-approval for verified partners'],
      relatedMetrics: { backlogSize: 256, avgProcessingTime: '45 min', sla: '30 min' }
    },
    {
      id: 2,
      title: 'Nội dung vi phạm tăng đột biến',
      description: 'Phát hiện 15 bài viết có nội dung không phù hợp trong 2 giờ qua',
      category: 'content',
      severity: 'high',
      status: 'investigating',
      timestamp: new Date('2024-12-07 09:45:00'),
      affectedUsers: 15,
      source: 'Content Moderation AI',
      actions: ['Review flagged content', 'Adjust AI sensitivity', 'Temporary content freeze'],
      relatedMetrics: { flaggedPosts: 15, falsePositiveRate: '12%', aiConfidence: '87%' }
    },
    {
      id: 3,
      title: 'Đối tác mới chưa xác minh',
      description: '8 đối tác đăng ký mới trong 24h chưa được xác minh',
      category: 'partner',
      severity: 'medium',
      status: 'pending',
      timestamp: new Date('2024-12-07 08:15:00'),
      affectedUsers: 8,
      source: 'Partner Registration Monitor',
      actions: ['Schedule verification calls', 'Send document requests', 'Set verification deadline'],
      relatedMetrics: { pendingVerifications: 8, avgVerificationTime: '3 days', targetTime: '2 days' }
    },
    {
      id: 4,
      title: 'API Response Time cao bất thường',
      description: 'Average response time: 2.8s (threshold: 1.5s)',
      category: 'performance',
      severity: 'medium',
      status: 'monitoring',
      timestamp: new Date('2024-12-07 07:20:00'),
      affectedUsers: null,
      source: 'Performance Monitor',
      actions: ['Check database performance', 'Review API endpoints', 'Scale server resources'],
      relatedMetrics: { avgResponseTime: '2.8s', p95ResponseTime: '4.2s', errorRate: '0.8%' }
    },
    {
      id: 5,
      title: 'Tỷ lệ hoàn thành sự kiện giảm',
      description: 'Completion rate tuần này: 78% (target: 85%)',
      category: 'event',
      severity: 'medium',
      status: 'acknowledged',
      timestamp: new Date('2024-12-07 06:00:00'),
      affectedUsers: null,
      source: 'Event Analytics',
      actions: ['Analyze no-show reasons', 'Improve reminder system', 'Review event quality'],
      relatedMetrics: { completionRate: '78%', target: '85%', trend: 'decreasing' }
    },
    {
      id: 6,
      title: 'Cảnh báo bảo mật: Login attempts bất thường',
      description: 'Phát hiện 45 failed login attempts từ cùng IP trong 10 phút',
      category: 'security',
      severity: 'high',
      status: 'resolved',
      timestamp: new Date('2024-12-06 23:45:00'),
      affectedUsers: null,
      source: 'Security Monitor',
      actions: ['IP blocked automatically', 'Enhanced monitoring enabled', 'Security team notified'],
      relatedMetrics: { failedAttempts: 45, blockedIPs: 3, securityScore: '98%' }
    }
  ];

  // Alert statistics
  const alertStats = {
    total: systemAlerts.length,
    critical: systemAlerts.filter(a => a.severity === 'critical').length,
    high: systemAlerts.filter(a => a.severity === 'high').length,
    medium: systemAlerts.filter(a => a.severity === 'medium').length,
    low: systemAlerts.filter(a => a.severity === 'low').length,
    active: systemAlerts.filter(a => a.status === 'active').length,
    resolved: systemAlerts.filter(a => a.status === 'resolved').length
  };

  // Alert trends
  const alertTrendData = [
    { day: 'T2', critical: 2, high: 5, medium: 8, low: 3 },
    { day: 'T3', critical: 1, high: 4, medium: 12, low: 5 },
    { day: 'T4', critical: 3, high: 7, medium: 6, low: 2 },
    { day: 'T5', critical: 0, high: 3, medium: 9, low: 4 },
    { day: 'T6', critical: 1, high: 2, medium: 11, low: 6 },
    { day: 'T7', critical: 2, high: 6, medium: 7, low: 1 },
    { day: 'CN', critical: 1, high: 3, medium: 5, low: 2 }
  ];

  // Category distribution
  const categoryData = [
    { category: 'System', count: 8, color: '#ef4444' },
    { category: 'Content', count: 5, color: '#f59e0b' },
    { category: 'Security', count: 3, color: '#8b5cf6' },
    { category: 'Performance', count: 6, color: '#3b82f6' },
    { category: 'Events', count: 4, color: '#10b981' },
    { category: 'Partners', count: 2, color: '#f97316' }
  ];

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        color: 'red',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
        icon: AlertTriangle
      },
      high: {
        color: 'orange',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-800',
        icon: AlertCircle
      },
      medium: {
        color: 'yellow',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
        icon: Info
      },
      low: {
        color: 'blue',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        icon: Info
      }
    };
    return configs[severity] || configs.medium;
  };

  const getStatusConfig = (status) => {
    const configs = {
      active: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
      investigating: { icon: Eye, color: 'text-orange-600', bg: 'bg-orange-100' },
      pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      monitoring: { icon: Activity, color: 'text-blue-600', bg: 'bg-blue-100' },
      acknowledged: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
      resolved: { icon: CheckCircle, color: 'text-gray-600', bg: 'bg-gray-100' }
    };
    return configs[status] || configs.active;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      system: Shield,
      content: FileText,
      security: Shield,
      performance: Activity,
      event: Calendar,
      partner: Users
    };
    return icons[category] || AlertCircle;
  };

  const filteredAlerts = useMemo(() => {
    return systemAlerts.filter(alert => {
      if (selectedSeverity !== 'all' && alert.severity !== selectedSeverity) return false;
      if (selectedCategory !== 'all' && alert.category !== selectedCategory) return false;
      if (selectedStatus !== 'all' && alert.status !== selectedStatus) return false;
      if (searchQuery && !alert.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !alert.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [selectedSeverity, selectedCategory, selectedStatus, searchQuery]);

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm flex items-center mt-1 ${
              change > 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              {change > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {Math.abs(change)}% từ hôm qua
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ alert }) => {
    const severityConfig = getSeverityConfig(alert.severity);
    const statusConfig = getStatusConfig(alert.status);
    const CategoryIcon = getCategoryIcon(alert.category);
    const SeverityIcon = severityConfig.icon;
    const StatusIcon = statusConfig.icon;

    const timeAgo = (timestamp) => {
      const now = new Date();
      const diff = Math.floor((now - timestamp) / 1000 / 60); // minutes
      if (diff < 60) return `${diff} phút trước`;
      if (diff < 1440) return `${Math.floor(diff / 60)} giờ trước`;
      return `${Math.floor(diff / 1440)} ngày trước`;
    };

    return (
      <div className={`bg-white rounded-lg border-l-4 ${severityConfig.borderColor} p-6 shadow-sm hover:shadow-md transition-all`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className={`p-2 rounded-full ${severityConfig.bgColor}`}>
              <SeverityIcon className={`w-5 h-5 ${severityConfig.textColor}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {alert.status}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{alert.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <CategoryIcon className="w-4 h-4" />
                  <span className="capitalize">{alert.category}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{timeAgo(alert.timestamp)}</span>
                </div>
                {alert.affectedUsers && (
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{alert.affectedUsers} users</span>
                  </div>
                )}
              </div>

              {/* Metrics */}
              {alert.relatedMetrics && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Metrics liên quan:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(alert.relatedMetrics).map(([key, value]) => (
                      <div key={key} className="text-xs">
                        <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {alert.actions.slice(0, 2).map((action, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                  >
                    {action}
                  </button>
                ))}
                {alert.actions.length > 2 && (
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200">
                    +{alert.actions.length - 2} more
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Archive className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Alerts</h1>
              <p className="text-gray-600 mt-2">Giám sát và cảnh báo hệ thống VHub</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
          <StatCard title="Tổng cảnh báo" value={alertStats.total} icon={Bell} color="blue" />
          <StatCard title="Critical" value={alertStats.critical} change={15} icon={AlertTriangle} color="red" />
          <StatCard title="High Priority" value={alertStats.high} change={-8} icon={AlertCircle} color="orange" />
          <StatCard title="Medium" value={alertStats.medium} icon={Info} color="yellow" />
          <StatCard title="Đang hoạt động" value={alertStats.active} change={12} icon={Activity} color="green" />
          <StatCard title="Đã xử lý" value={alertStats.resolved} icon={CheckCircle} color="gray" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Alert Trends */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Xu hướng cảnh báo (7 ngày)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={alertTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fill="#ef4444" name="Critical" />
                <Area type="monotone" dataKey="high" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="High" />
                <Area type="monotone" dataKey="medium" stackId="1" stroke="#eab308" fill="#eab308" name="Medium" />
                <Area type="monotone" dataKey="low" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Low" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Phân bố theo danh mục</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, count, percent }) => `${category}: ${count} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Tìm kiếm cảnh báo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select 
              value={selectedSeverity} 
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="system">System</option>
              <option value="content">Content</option>
              <option value="security">Security</option>
              <option value="performance">Performance</option>
              <option value="event">Events</option>
              <option value="partner">Partners</option>
            </select>
            
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Active</option>
              <option value="investigating">Investigating</option>
              <option value="pending">Pending</option>
              <option value="monitoring">Monitoring</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>

            <div className="flex items-center space-x-2 ml-auto">
              <span className="text-sm text-gray-600">Hiển thị {filteredAlerts.length} / {systemAlerts.length}</span>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
          
          {filteredAlerts.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có cảnh báo</h3>
              <p className="text-gray-600">Không tìm thấy cảnh báo nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {filteredAlerts.length > 0 && (
          <div className="mt-8 bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Resolved
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive Selected
                </button>
                <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Auto-refresh: </span>
                <button className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg">
                  <Play className="w-3 h-3 mr-1" />
                  ON
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VHubSystemAlerts;