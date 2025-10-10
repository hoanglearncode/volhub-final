import React, { useState, useEffect, useMemo } from 'react';
import {
  Monitor,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  Database,
  Users,
  Shield,
  Key,
  Bell,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Server,
  Globe,
  Lock,
  Eye,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Mail,
  Smartphone,
  ExternalLink,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

const SystemMonitoring = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLog, setSelectedLog] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [logFilter, setLogFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [showLogModal, setShowLogModal] = useState(false);

  // Mock real-time data
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: { value: 45, status: 'normal', trend: 'stable' },
    memory: { value: 68, status: 'warning', trend: 'up' },
    disk: { value: 78, status: 'warning', trend: 'up' },
    network: { value: 23, status: 'normal', trend: 'down' },
    database: { value: 89, status: 'critical', trend: 'up' },
    uptime: '99.97%',
    activeUsers: 1247,
    responseTime: 245
  });

  const [systemAlerts, setSystemAlerts] = useState([
    {
      id: 'ALT001',
      type: 'critical',
      title: 'Database connection pool exhausted',
      description: 'Số lượng kết nối database đã đạt giới hạn tối đa (500/500)',
      service: 'Database',
      timestamp: '2025-09-06 15:30:22',
      status: 'active',
      affectedUsers: 150,
      actions: ['Restart service', 'Scale up', 'View logs']
    },
    {
      id: 'ALT002',
      type: 'warning',
      title: 'High memory usage detected',
      description: 'Mức sử dụng RAM của server web đang ở mức 85%',
      service: 'Web Server',
      timestamp: '2025-09-06 14:45:10',
      status: 'acknowledged',
      affectedUsers: 0,
      actions: ['View details', 'Clear cache', 'Monitor']
    },
    {
      id: 'ALT003',
      type: 'info',
      title: 'Scheduled backup completed',
      description: 'Backup dữ liệu hàng ngày đã hoàn thành thành công',
      service: 'Backup Service',
      timestamp: '2025-09-06 03:00:15',
      status: 'resolved',
      affectedUsers: 0,
      actions: ['View backup details']
    },
    {
      id: 'ALT004',
      type: 'warning',
      title: 'SSL certificate expires soon',
      description: 'Chứng chỉ SSL sẽ hết hạn trong 15 ngày',
      service: 'Security',
      timestamp: '2025-09-06 09:00:00',
      status: 'active',
      affectedUsers: 0,
      actions: ['Renew certificate', 'Schedule renewal']
    }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    {
      id: 'LOG001',
      timestamp: '2025-09-06 15:35:12',
      user: 'admin_system',
      action: 'Database Service Restart',
      category: 'system',
      details: 'Restarted database service due to connection pool exhaustion',
      ip: '192.168.1.100',
      userAgent: 'Admin Dashboard v2.1',
      status: 'success'
    },
    {
      id: 'LOG002',
      timestamp: '2025-09-06 15:20:45',
      user: 'admin_user1',
      action: 'User Role Updated',
      category: 'user_management',
      details: 'Changed user role from Volunteer to Event Admin for user ID: 12345',
      ip: '192.168.1.105',
      userAgent: 'Chrome 118.0',
      status: 'success'
    },
    {
      id: 'LOG003',
      timestamp: '2025-09-06 14:58:30',
      user: 'system',
      action: 'Failed Login Attempt',
      category: 'security',
      details: 'Multiple failed login attempts detected from IP: 203.113.45.22',
      ip: '203.113.45.22',
      userAgent: 'Unknown Bot',
      status: 'blocked'
    },
    {
      id: 'LOG004',
      timestamp: '2025-09-06 14:30:15',
      user: 'admin_content',
      action: 'Content Moderation',
      category: 'content',
      details: 'Approved 5 posts, rejected 2 posts in moderation queue',
      ip: '192.168.1.110',
      userAgent: 'Firefox 119.0',
      status: 'success'
    },
    {
      id: 'LOG005',
      timestamp: '2025-09-06 13:45:22',
      user: 'admin_event',
      action: 'Event Status Changed',
      category: 'event_management',
      details: 'Event ID EVT001 status changed from Draft to Published',
      ip: '192.168.1.108',
      userAgent: 'Safari 17.0',
      status: 'success'
    }
  ]);

  const [integrations, setIntegrations] = useState([
    {
      name: 'Email Service (SendGrid)',
      status: 'active',
      lastSync: '2025-09-06 15:30',
      health: 'healthy',
      responseTime: '150ms',
      endpoint: 'https://api.sendgrid.com',
      description: 'Dịch vụ gửi email thông báo và xác nhận'
    },
    {
      name: 'SMS Gateway (Twilio)',
      status: 'active',
      lastSync: '2025-09-06 15:28',
      health: 'healthy',
      responseTime: '89ms',
      endpoint: 'https://api.twilio.com',
      description: 'Gửi tin nhắn SMS xác thực và thông báo'
    },
    {
      name: 'Push Notifications (FCM)',
      status: 'active',
      lastSync: '2025-09-06 15:32',
      health: 'degraded',
      responseTime: '450ms',
      endpoint: 'https://fcm.googleapis.com',
      description: 'Thông báo đẩy cho ứng dụng di động'
    },
    {
      name: 'Payment Gateway (Stripe)',
      status: 'maintenance',
      lastSync: '2025-09-06 12:15',
      health: 'maintenance',
      responseTime: 'N/A',
      endpoint: 'https://api.stripe.com',
      description: 'Xử lý thanh toán phí premium và donations'
    },
    {
      name: 'Cloud Storage (AWS S3)',
      status: 'active',
      lastSync: '2025-09-06 15:31',
      health: 'healthy',
      responseTime: '95ms',
      endpoint: 'https://s3.amazonaws.com',
      description: 'Lưu trữ hình ảnh, tài liệu và backup'
    },
    {
      name: 'Single Sign-On (Auth0)',
      status: 'active',
      lastSync: '2025-09-06 15:29',
      health: 'healthy',
      responseTime: '120ms',
      endpoint: 'https://volunteerhub.auth0.com',
      description: 'Xác thực và phân quyền người dùng'
    }
  ]);

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
    { id: 'alerts', label: 'Cảnh báo', icon: AlertTriangle },
    { id: 'logs', label: 'Nhật ký hoạt động', icon: Activity },
    { id: 'integrations', label: 'Tích hợp', icon: Globe },
    { id: 'permissions', label: 'Phân quyền', icon: Shield },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: Settings }
  ];

  const alertTypes = {
    critical: { color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800', icon: XCircle },
    warning: { color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', icon: AlertTriangle },
    info: { color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800', icon: CheckCircle }
  };

  const logCategories = {
    system: { label: 'Hệ thống', color: 'purple', icon: Server },
    user_management: { label: 'Quản lý user', color: 'blue', icon: Users },
    security: { label: 'Bảo mật', color: 'red', icon: Shield },
    content: { label: 'Nội dung', color: 'green', icon: Eye },
    event_management: { label: 'Sự kiện', color: 'orange', icon: Calendar }
  };

  const healthStatus = {
    healthy: { color: 'green', label: 'Khỏe mạnh' },
    degraded: { color: 'yellow', label: 'Giảm hiệu năng' },
    maintenance: { color: 'blue', label: 'Bảo trì' },
    error: { color: 'red', label: 'Lỗi' }
  };

  // Auto refresh functionality
  useEffect(() => {
    let interval;
    if (isAutoRefresh && activeTab === 'overview') {
      interval = setInterval(() => {
        // Simulate metric updates
        setSystemMetrics(prev => ({
          ...prev,
          cpu: { ...prev.cpu, value: Math.round(Math.max(20, Math.min(95, prev.cpu.value + (Math.random() - 0.5) * 10))) },
          memory: { ...prev.memory, value: Math.round(Math.max(30, Math.min(98, prev.memory.value + (Math.random() - 0.5) * 6))) },
          disk: { ...prev.disk, value: Math.round(Math.max(30, Math.min(98, prev.disk.value + (Math.random() - 0.5) * 6))) },
          activeUsers: Math.max(0, prev.activeUsers + Math.floor((Math.random() - 0.5) * 30)),
          responseTime: Math.round(Math.max(80, Math.min(800, prev.responseTime + (Math.random() - 0.5) * 80)))
        }));
      }, refreshInterval * 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoRefresh, refreshInterval, activeTab]);

  const getMetricColor = (value, type) => {
    if (type === 'database' && value > 85) return 'text-red-600';
    if (value > 80) return 'text-red-600';
    if (value > 65) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getMetricBgColor = (value, type) => {
    if (type === 'database' && value > 85) return 'bg-red-100';
    if (value > 80) return 'bg-red-100';
    if (value > 65) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  // Actions for alerts
  const acknowledgeAlert = (alertId) => {
    setSystemAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'acknowledged' } : a));
  };
  const resolveAlert = (alertId) => {
    setSystemAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'resolved' } : a));
  };
  const reopenAlert = (alertId) => {
    setSystemAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'active' } : a));
  };

  // Integration actions
  const syncIntegration = (index) => {
    const name = integrations[index].name;
    // simulate a sync
    setIntegrations(prev => prev.map((i, idx) => idx === index ? { ...i, lastSync: new Date().toLocaleString('sv-SE').replace('T',' '), responseTime: Math.round(Math.random()*300) + 'ms', health: Math.random() > 0.2 ? 'healthy' : 'degraded' } : i));
    // optionally push an audit log
    setAuditLogs(prev => [{ id: `LOG${String(prev.length+1).padStart(3,'0')}`, timestamp: new Date().toLocaleString('vi-VN'), user: 'system', action: `Sync integration: ${name}`, category: 'system', details: `Triggered sync for ${name}`, ip: '127.0.0.1', userAgent: 'SystemScheduler', status: 'success' }, ...prev]);
  };

  // Logs filtering
  const filteredLogs = useMemo(() => {
    return auditLogs
      .filter(log => logFilter === 'all' || log.category === logFilter)
      .filter(log => {
        if (!searchTerm) return true;
        const q = searchTerm.toLowerCase();
        return log.action.toLowerCase().includes(q) || log.user.toLowerCase().includes(q) || (log.details && log.details.toLowerCase().includes(q));
      })
      .slice(0, 200);
  }, [auditLogs, logFilter, searchTerm]);

  // Permissions mock
  const [roles, setRoles] = useState([
    { id: 'role_admin', name: 'Administrator', permissions: ['manage_system', 'manage_users', 'view_logs'] },
    { id: 'role_support', name: 'Support Agent', permissions: ['view_tickets', 'respond_tickets'] },
    { id: 'role_event', name: 'Event Manager', permissions: ['create_event', 'manage_event'] }
  ]);

  const toggleRolePermission = (roleId, permission) => {
    setRoles(prev => prev.map(r => {
      if (r.id !== roleId) return r;
      const has = r.permissions.includes(permission);
      return { ...r, permissions: has ? r.permissions.filter(p => p !== permission) : [...r.permissions, permission] };
    }));
  };

  // Log detail modal
  const openLogDetail = (log) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };
  const closeLogDetail = () => {
    setSelectedLog(null);
    setShowLogModal(false);
  };

  // Manual refresh
  const manualRefresh = () => {
    // simulate immediate metric refresh
    setSystemMetrics(prev => ({
      ...prev,
      cpu: { ...prev.cpu, value: Math.round(Math.max(10, Math.min(98, prev.cpu.value + (Math.random() - 0.5) * 12))) },
      memory: { ...prev.memory, value: Math.round(Math.max(20, Math.min(98, prev.memory.value + (Math.random() - 0.5) * 8))) },
      disk: { ...prev.disk, value: Math.round(Math.max(20, Math.min(98, prev.disk.value + (Math.random() - 0.5) * 8))) },
      responseTime: Math.round(Math.max(50, Math.min(1000, prev.responseTime + (Math.random() - 0.5) * 200)))
    }));
  };

  // Render functions
  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* System Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg border ${getMetricBgColor(systemMetrics.cpu.value)} border-gray-200`}>
          <div className="flex items-center justify-between mb-2">
            <Cpu size={20} className={getMetricColor(systemMetrics.cpu.value)} />
            <span className={`text-2xl font-bold ${getMetricColor(systemMetrics.cpu.value)}`}>
              {systemMetrics.cpu.value}%
            </span>
          </div>
          <p className="text-sm font-medium text-gray-700">CPU Usage</p>
          <p className="text-xs text-gray-500">Server load average</p>
        </div>

        <div className={`p-4 rounded-lg border ${getMetricBgColor(systemMetrics.memory.value)} border-gray-200`}>
          <div className="flex items-center justify-between mb-2">
            <HardDrive size={20} className={getMetricColor(systemMetrics.memory.value)} />
            <span className={`text-2xl font-bold ${getMetricColor(systemMetrics.memory.value)}`}>
              {systemMetrics.memory.value}%
            </span>
          </div>
          <p className="text-sm font-medium text-gray-700">Memory Usage</p>
          <p className="text-xs text-gray-500">RAM utilization</p>
        </div>

        <div className={`p-4 rounded-lg border ${getMetricBgColor(systemMetrics.database.value, 'database')} border-gray-200`}>
          <div className="flex items-center justify-between mb-2">
            <Database size={20} className={getMetricColor(systemMetrics.database.value, 'database')} />
            <span className={`text-2xl font-bold ${getMetricColor(systemMetrics.database.value, 'database')}`}>
              {systemMetrics.database.value}%
            </span>
          </div>
          <p className="text-sm font-medium text-gray-700">Database Load</p>
          <p className="text-xs text-gray-500">Connection pool</p>
        </div>

        <div className="p-4 rounded-lg border bg-blue-100 border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Users size={20} className="text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">{systemMetrics.activeUsers}</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Active Users</p>
          <p className="text-xs text-gray-500">Currently online</p>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp size={18} className="text-green-500" />
            <span className="font-medium">System Uptime</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{systemMetrics.uptime}</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Zap size={18} className="text-yellow-500" />
            <span className="font-medium">Avg Response Time</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{systemMetrics.responseTime}ms</p>
          <p className="text-sm text-gray-500">API endpoints</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={18} className="text-red-500" />
            <span className="font-medium">Active Alerts</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {systemAlerts.filter(alert => alert.status === 'active').length}
          </p>
          <p className="text-sm text-gray-500">Cần xử lý ngay</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button onClick={manualRefresh} className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
            <RefreshCw size={20} className="text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-blue-700">Làm mới hệ thống</span>
          </button>

          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
            <Download size={20} className="text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-700">Backup dữ liệu</span>
          </button>

          <button className="p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-colors">
            <Bell size={20} className="text-yellow-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-yellow-700">Gửi thông báo</span>
          </button>

          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
            <BarChart3 size={20} className="text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-purple-700">Xem báo cáo</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAlertsTab = () => (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['critical', 'warning', 'info'].map(type => {
          const count = systemAlerts.filter(alert => alert.type === type).length;
          const config = alertTypes[type];
          const Icon = config.icon;

          return (
            <div key={type} className={`p-4 rounded-lg border ${config.bgColor} border-gray-200`}>
              <div className="flex items-center gap-3">
                <Icon size={24} className={config.textColor} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className={`text-sm font-medium ${config.textColor}`}>
                    {type === 'critical' ? 'Nghiêm trọng' : type === 'warning' ? 'Cảnh báo' : 'Thông tin'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Danh sách cảnh báo</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {systemAlerts.map((alert) => {
            const config = alertTypes[alert.type];
            const Icon = config.icon;

            return (
              <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${config.bgColor}`}>
                    <Icon size={20} className={config.textColor} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.status === 'active' ? 'bg-red-100 text-red-800' :
                          alert.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {alert.status === 'active' ? 'Đang hoạt động' :
                           alert.status === 'acknowledged' ? 'Đã xác nhận' : 'Đã giải quyết'}
                        </span>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{alert.service}</span>
                      <span>{alert.timestamp}</span>
                      {alert.affectedUsers > 0 && (
                        <span className="text-red-600">
                          {alert.affectedUsers} người dùng bị ảnh hưởng
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {alert.actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (action === 'Restart service') {
                              // simulate restart -> create audit log and mark acknowledged
                              acknowledgeAlert(alert.id);
                              setAuditLogs(prev => [{ id: `LOG${String(prev.length+1).padStart(3,'0')}`, timestamp: new Date().toLocaleString('vi-VN'), user: 'system', action: `Auto: ${action} (${alert.service})`, category: 'system', details: `Auto-executed ${action} for ${alert.service}`, ip: '127.0.0.1', userAgent: 'SystemAuto', status: 'success' }, ...prev]);
                            } else if (action === 'Scale up') {
                              acknowledgeAlert(alert.id);
                            } else if (action === 'Renew certificate') {
                              acknowledgeAlert(alert.id);
                            } else {
                              // generic
                              openLogDetail({ id: `AUTO-${Date.now()}`, timestamp: new Date().toLocaleString('vi-VN'), user: 'system', action, category: 'system', details: `Manual action: ${action}`, ip: '127.0.0.1', userAgent: 'Operator', status: 'success' });
                            }
                          }}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100 transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                      {/* quick resolve / acknowledge */}
                      {alert.status !== 'acknowledged' && alert.status !== 'resolved' && (
                        <button onClick={() => acknowledgeAlert(alert.id)} className="px-3 py-1 bg-yellow-50 text-yellow-800 rounded text-sm hover:bg-yellow-100">Xác nhận</button>
                      )}
                      {alert.status !== 'resolved' && (
                        <button onClick={() => resolveAlert(alert.id)} className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm hover:bg-green-100">Đã giải quyết</button>
                      )}
                      {alert.status === 'resolved' && (
                        <button onClick={() => reopenAlert(alert.id)} className="px-3 py-1 bg-gray-50 text-gray-700 rounded text-sm hover:bg-gray-100">Mở lại</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLogsTab = () => {
    // map color classes for icons
    const colorMap = {
      purple: 'text-purple-500',
      blue: 'text-blue-500',
      red: 'text-red-500',
      green: 'text-green-500',
      orange: 'text-orange-500'
    };

    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="system">Hệ thống</option>
              <option value="user_management">Quản lý user</option>
              <option value="security">Bảo mật</option>
              <option value="content">Nội dung</option>
              <option value="event_management">Sự kiện</option>
            </select>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="1h">1 giờ qua</option>
              <option value="24h">24 giờ qua</option>
              <option value="7d">7 ngày qua</option>
              <option value="30d">30 ngày qua</option>
            </select>

            <button onClick={() => {
              // export filtered logs to CSV (simple)
              const rows = filteredLogs.map(l => ({ timestamp: l.timestamp, user: l.user, action: l.action, category: l.category, ip: l.ip, status: l.status }));
              const keys = Object.keys(rows[0] || {});
              const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${String(r[k] ?? '').replace(/"/g, '""')}"`).join(','))].join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `audit-logs-${new Date().toISOString()}.csv`;
              document.body.appendChild(a);
              a.click();
              a.remove();
              URL.revokeObjectURL(url);
            }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Download size={16} />
              Xuất logs
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Thời gian</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Người dùng</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Hành động</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Danh mục</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">IP</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.map((log) => {
                  const category = logCategories[log.category] || { label: 'Khác', color: 'gray', icon: Activity };
                  const CategoryIcon = category.icon;
                  const colorClass = colorMap[category.color] || 'text-gray-500';

                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 font-mono">{log.timestamp}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{log.user}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{log.action}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <CategoryIcon size={16} className={colorClass} />
                          <span className="text-sm text-gray-700">{category.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">{log.ip}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.status === 'success' ? 'bg-green-100 text-green-800' :
                          log.status === 'blocked' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {log.status === 'success' ? 'Thành công' : log.status === 'blocked' ? 'Đã chặn' : 'Cảnh báo'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openLogDetail(log)}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2"
                        >
                          <Eye size={16} />
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Log modal */}
        {showLogModal && selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Log Detail: {selectedLog.id}</h3>
                  <p className="text-sm text-gray-500">{selectedLog.timestamp} • {selectedLog.user}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => {
                    // quick copy details to clipboard
                    navigator.clipboard?.writeText(JSON.stringify(selectedLog, null, 2));
                  }} className="px-3 py-1 border rounded text-sm">Copy</button>
                  <button onClick={closeLogDetail} className="px-3 py-1 bg-blue-600 text-white rounded">Đóng</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Action</h4>
                  <p className="text-sm text-gray-900 mb-3">{selectedLog.action}</p>

                  <h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
                  <pre className="text-xs bg-gray-50 p-3 rounded text-gray-800 overflow-auto">{selectedLog.details}</pre>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Metadata</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong>IP:</strong> {selectedLog.ip}</li>
                    <li><strong>User Agent:</strong> {selectedLog.userAgent}</li>
                    <li><strong>Category:</strong> {selectedLog.category}</li>
                    <li><strong>Status:</strong> {selectedLog.status}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${integration.status === 'active' ? 'bg-green-500' : integration.status === 'maintenance' ? 'bg-blue-500' : 'bg-red-500'}`} />
                <div>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-500">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a href={integration.endpoint} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600">
                  <ExternalLink size={16} />
                </a>
                <button onClick={() => syncIntegration(index)} className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100">Sync Now</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <div className="text-xs text-gray-500">Status</div>
                <div className="font-medium">{integration.status}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Last Sync</div>
                <div className="font-medium">{integration.lastSync}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Health</div>
                <div className="font-medium">{healthStatus[integration.health]?.label ?? integration.health}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Response</div>
                <div className="font-medium">{integration.responseTime}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs text-gray-500">Endpoint</div>
                <div className="text-sm text-blue-600 break-all">{integration.endpoint}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPermissionsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Roles & Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map(role => (
            <div key={role.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{role.name}</h4>
                  <p className="text-sm text-gray-500">ID: {role.id}</p>
                </div>
                <div className="text-sm text-gray-500">{role.permissions.length} perm</div>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                {['manage_system','manage_users','view_logs','view_tickets','respond_tickets','create_event','manage_event'].map(perm => (
                  <label key={perm} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={role.permissions.includes(perm)} onChange={() => toggleRolePermission(role.id, perm)} />
                    <span className="capitalize">{perm.replace(/_/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">System Monitoring Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Auto-refresh</label>
            <div className="flex items-center gap-3 mt-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={isAutoRefresh} onChange={(e) => setIsAutoRefresh(e.target.checked)} />
                <span className="text-sm">Bật tự động</span>
              </label>
              <div className="flex items-center gap-2">
                <input type="number" min={5} value={refreshInterval} onChange={(e) => setRefreshInterval(Number(e.target.value))} className="w-24 px-3 py-1 border rounded" />
                <span className="text-sm text-gray-500">giây</span>
              </div>
              <button onClick={() => { setIsAutoRefresh(false); manualRefresh(); }} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Refresh now</button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Default time range</label>
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="w-full mt-2 px-3 py-2 border rounded">
              <option value="1h">1 giờ</option>
              <option value="24h">24 giờ</option>
              <option value="7d">7 ngày</option>
              <option value="30d">30 ngày</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">Ảnh hưởng đến các biểu đồ/nhật ký theo mặc định</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Retention / retention policy</h4>
          <p className="text-sm text-gray-600">Lưu trữ nhật ký trong 90 ngày. Bạn có thể thay đổi chính sách lưu trữ trong hệ thống.</p>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-red-50 text-red-700 rounded text-sm">Purge old logs</button>
            <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm">Export retention policy</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Monitor size={28} className="text-indigo-600" />
            <div>
              <h1 className="text-xl font-semibold">System Monitoring</h1>
              <p className="text-sm text-gray-500">Giám sát hệ thống, cảnh báo, nhật ký, và tích hợp</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Auto-refresh:</div>
            <div className="px-3 py-1 border rounded text-sm">{isAutoRefresh ? `On • ${refreshInterval}s` : 'Off'}</div>
            <button onClick={manualRefresh} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"><RefreshCw size={14}/> Refresh</button>
            <button className="px-3 py-1 bg-gray-100 rounded border"><Download size={14} /></button>
            <button className="px-3 py-1 bg-gray-100 rounded border"><Upload size={14} /></button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <nav className="flex space-x-4 px-4 py-3 overflow-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3 py-2 rounded ${activeTab === tab.id ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon size={16} />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'alerts' && renderAlertsTab()}
        {activeTab === 'logs' && renderLogsTab()}
        {activeTab === 'integrations' && renderIntegrationsTab()}
        {activeTab === 'permissions' && renderPermissionsTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
    </div>
  );
};

export default SystemMonitoring;
