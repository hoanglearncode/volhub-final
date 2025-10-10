import React, { useState, useEffect } from 'react';
import {
  Chromium,
  Plus,
  Settings,
  Globe,
  Shield,
  Zap,
  Database,
  Mail,
  MessageSquare,
  Bell,
  CreditCard,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Power,
  PowerOff,
  RefreshCw,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  ExternalLink,
  Key,
  Server,
  Cloud,
  Smartphone,
  Monitor,
  Activity,
  TrendingUp,
  Users,
  DollarSign,
  Wifi,
  WifiOff,
  Play,
  Pause,
  Square,
  RotateCcw,
  HardDrive,
  Cpu,
  MemoryStick,
  Network
} from 'lucide-react';

const ServicesManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    environment: ''
  });

  // Mock data for services
  const [services, setServices] = useState([
    {
      id: 'SRV001',
      name: 'Authentication Service',
      category: 'core',
      type: 'microservice',
      status: 'running',
      environment: 'production',
      version: '2.4.1',
      description: 'Dịch vụ xác thực và phân quyền người dùng',
      icon: Shield,
      color: 'green',
      url: 'https://auth.volunteerhub.vn',
      port: 3001,
      instances: 3,
      uptime: '99.9%',
      lastRestart: '2025-01-05T10:30:00',
      resources: {
        cpu: 15,
        memory: 256,
        disk: 2.1,
        network: 45
      },
      metrics: {
        requests: 15420,
        errors: 12,
        responseTime: 145,
        throughput: 89
      },
      dependencies: ['Database', 'Redis Cache'],
      endpoints: [
        { path: '/auth/login', method: 'POST', status: 'healthy' },
        { path: '/auth/register', method: 'POST', status: 'healthy' },
        { path: '/auth/verify', method: 'GET', status: 'healthy' }
      ],
      healthCheck: {
        status: 'healthy',
        lastCheck: '2025-01-12T14:30:00',
        checkInterval: 30
      }
    },
    {
      id: 'SRV002',
      name: 'Notification Service',
      category: 'communication',
      type: 'microservice',
      status: 'warning',
      environment: 'production',
      version: '1.8.3',
      description: 'Dịch vụ gửi thông báo email, SMS và push notification',
      icon: Bell,
      color: 'yellow',
      url: 'https://notify.volunteerhub.vn',
      port: 3002,
      instances: 2,
      uptime: '98.5%',
      lastRestart: '2025-01-12T08:15:00',
      resources: {
        cpu: 45,
        memory: 512,
        disk: 1.8,
        network: 120
      },
      metrics: {
        requests: 8934,
        errors: 156,
        responseTime: 289,
        throughput: 67
      },
      dependencies: ['Email Provider', 'SMS Gateway', 'Firebase'],
      endpoints: [
        { path: '/notify/email', method: 'POST', status: 'healthy' },
        { path: '/notify/sms', method: 'POST', status: 'warning' },
        { path: '/notify/push', method: 'POST', status: 'healthy' }
      ],
      healthCheck: {
        status: 'warning',
        lastCheck: '2025-01-12T14:25:00',
        checkInterval: 30
      }
    },
    {
      id: 'SRV003',
      name: 'Payment Gateway',
      category: 'business',
      type: 'integration',
      status: 'stopped',
      environment: 'staging',
      version: '3.2.0',
      description: 'Tích hợp thanh toán cho các dịch vụ premium',
      icon: CreditCard,
      color: 'red',
      url: 'https://payment-staging.volunteerhub.vn',
      port: 3003,
      instances: 1,
      uptime: '0%',
      lastRestart: '2025-01-11T16:45:00',
      resources: {
        cpu: 0,
        memory: 0,
        disk: 0.5,
        network: 0
      },
      metrics: {
        requests: 0,
        errors: 0,
        responseTime: 0,
        throughput: 0
      },
      dependencies: ['VNPay API', 'MoMo API', 'Bank Gateway'],
      endpoints: [
        { path: '/payment/create', method: 'POST', status: 'down' },
        { path: '/payment/verify', method: 'GET', status: 'down' },
        { path: '/payment/webhook', method: 'POST', status: 'down' }
      ],
      healthCheck: {
        status: 'down',
        lastCheck: '2025-01-12T14:20:00',
        checkInterval: 60
      }
    },
    {
      id: 'SRV004',
      name: 'Analytics Service',
      category: 'analytics',
      type: 'microservice',
      status: 'running',
      environment: 'production',
      version: '1.5.2',
      description: 'Thu thập và phân tích dữ liệu người dùng',
      icon: BarChart3,
      color: 'blue',
      url: 'https://analytics.volunteerhub.vn',
      port: 3004,
      instances: 2,
      uptime: '99.7%',
      lastRestart: '2025-01-08T12:00:00',
      resources: {
        cpu: 32,
        memory: 1024,
        disk: 15.3,
        network: 78
      },
      metrics: {
        requests: 23456,
        errors: 34,
        responseTime: 98,
        throughput: 156
      },
      dependencies: ['ClickHouse', 'Redis', 'Event Queue'],
      endpoints: [
        { path: '/analytics/track', method: 'POST', status: 'healthy' },
        { path: '/analytics/report', method: 'GET', status: 'healthy' },
        { path: '/analytics/dashboard', method: 'GET', status: 'healthy' }
      ],
      healthCheck: {
        status: 'healthy',
        lastCheck: '2025-01-12T14:30:00',
        checkInterval: 30
      }
    }
  ]);

  // Infrastructure services
  const [infrastructure, setInfrastructure] = useState([
    {
      id: 'INF001',
      name: 'Primary Database',
      type: 'PostgreSQL',
      status: 'running',
      environment: 'production',
      version: '14.2',
      description: 'Cơ sở dữ liệu chính của hệ thống',
      icon: Database,
      resources: {
        cpu: 25,
        memory: 2048,
        disk: 85.5,
        connections: 45
      },
      metrics: {
        queries: 8934,
        slowQueries: 12,
        activeConnections: 45,
        maxConnections: 100
      }
    },
    {
      id: 'INF002',
      name: 'Redis Cache',
      type: 'Redis',
      status: 'running',
      environment: 'production',
      version: '6.2.7',
      description: 'Hệ thống cache và session storage',
      icon: Zap,
      resources: {
        cpu: 8,
        memory: 512,
        disk: 2.1,
        connections: 23
      },
      metrics: {
        hits: 15420,
        misses: 892,
        evictions: 156,
        keyspace: 45892
      }
    }
  ]);

  // Statistics data
  const stats = [
    {
      title: 'Tổng dịch vụ',
      value: '47',
      change: '+3',
      trend: 'up',
      icon: Server,
      color: 'blue'
    },
    {
      title: 'Đang hoạt động',
      value: '42',
      change: '+2',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Cảnh báo',
      value: '3',
      change: '+1',
      trend: 'up',
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      title: 'Uptime trung bình',
      value: '99.2%',
      change: '+0.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: Monitor },
    { id: 'microservices', label: 'Microservices', icon: Server },
    { id: 'infrastructure', label: 'Hạ tầng', icon: Database },
    { id: 'integrations', label: 'Tích hợp', icon: Globe },
    { id: 'monitoring', label: 'Giám sát', icon: Activity },
    { id: 'logs', label: 'Nhật ký', icon: Clock }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', icon: Server },
    { id: 'core', label: 'Core', icon: Shield },
    { id: 'communication', label: 'Thông tin', icon: MessageSquare },
    { id: 'business', label: 'Kinh doanh', icon: DollarSign },
    { id: 'analytics', label: 'Phân tích', icon: BarChart3 }
  ];

  const handleServiceAction = (serviceId, action) => {
    setServices(prev => prev.map(service => {
      if (service.id === serviceId) {
        switch (action) {
          case 'start':
            return { ...service, status: 'running' };
          case 'stop':
            return { ...service, status: 'stopped' };
          case 'restart':
            return { ...service, lastRestart: new Date().toISOString() };
          default:
            return service;
        }
      }
      return service;
    }));
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filters.category === '' || service.category === filters.category;
    const matchesStatus = filters.status === '' || service.status === filters.status;
    const matchesEnvironment = filters.environment === '' || service.environment === filters.environment;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesEnvironment;
  });

  const ServiceCard = ({ service }) => {
    const Icon = service.icon;
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedServices.includes(service.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedServices(prev => [...prev, service.id]);
                  } else {
                    setSelectedServices(prev => prev.filter(id => id !== service.id));
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className={`p-3 rounded-lg ${
                service.color === 'green' ? 'bg-green-100 text-green-600' :
                service.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                service.color === 'red' ? 'bg-red-100 text-red-600' :
                service.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-500">v{service.version}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                service.status === 'running' ? 'bg-green-100 text-green-800' :
                service.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                service.status === 'stopped' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {service.status === 'running' ? <Wifi className="w-3 h-3 mr-1" /> :
                 service.status === 'warning' ? <AlertTriangle className="w-3 h-3 mr-1" /> :
                 service.status === 'stopped' ? <WifiOff className="w-3 h-3 mr-1" /> :
                 <Clock className="w-3 h-3 mr-1" />}
                {service.status === 'running' ? 'Đang chạy' :
                 service.status === 'warning' ? 'Cảnh báo' :
                 service.status === 'stopped' ? 'Dừng' : 'Không xác định'}
              </span>

              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                service.environment === 'production' ? 'bg-purple-100 text-purple-800' :
                service.environment === 'staging' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {service.environment}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Uptime</p>
              <p className="text-lg font-semibold text-gray-900">{service.uptime}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Instances</p>
              <p className="text-lg font-semibold text-gray-900">{service.instances}</p>
            </div>
          </div>

          {/* Resource Usage */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">CPU</span>
              <span className="font-medium">{service.resources.cpu}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  service.resources.cpu > 80 ? 'bg-red-500' :
                  service.resources.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${service.resources.cpu}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Memory</span>
              <span className="font-medium">{service.resources.memory}MB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  service.resources.memory > 800 ? 'bg-red-500' :
                  service.resources.memory > 500 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(service.resources.memory / 10, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-2 mb-4 text-xs">
            <div className="text-center">
              <p className="text-gray-500">Requests</p>
              <p className="font-medium">{service.metrics.requests.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Errors</p>
              <p className="font-medium text-red-600">{service.metrics.errors}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Resp Time</p>
              <p className="font-medium">{service.metrics.responseTime}ms</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Throughput</p>
              <p className="font-medium">{service.metrics.throughput}/s</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                setSelectedService(service);
                setShowDetailModal(true);
              }}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              <Eye className="w-4 h-4" />
              <span>Chi tiết</span>
            </button>

            <div className="flex items-center space-x-2">
              {service.status === 'stopped' ? (
                <button
                  onClick={() => handleServiceAction(service.id, 'start')}
                  className="flex items-center space-x-1 px-3 py-1.5 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 text-sm"
                >
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
              ) : (
                <button
                  onClick={() => handleServiceAction(service.id, 'stop')}
                  className="flex items-center space-x-1 px-3 py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 text-sm"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop</span>
                </button>
              )}
              
              <button
                onClick={() => handleServiceAction(service.id, 'restart')}
                className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const InfrastructureCard = ({ infra }) => {
    const Icon = infra.icon;
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{infra.name}</h3>
              <p className="text-sm text-gray-500">{infra.type} v{infra.version}</p>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            {infra.status}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{infra.description}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">CPU Usage</span>
            <span className="font-medium">{infra.resources.cpu}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${infra.resources.cpu}%` }}></div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Memory</span>
            <span className="font-medium">{infra.resources.memory}MB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${infra.resources.memory / 40}%` }}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Dịch vụ</h1>
          <p className="text-gray-600 mt-1">Giám sát và quản lý các dịch vụ, microservices và hạ tầng</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Xuất cấu hình</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Settings className="w-4 h-4" />
            <span>Cài đặt</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm dịch vụ</span>
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
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-red-100 text-red-600'
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
                </button>
              );
            })}
          </nav>
        </div>

        {/* Filters and Search */}
        {(activeTab === 'microservices' || activeTab === 'overview') && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm dịch vụ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setFilters(prev => ({ ...prev, category: category.id === 'all' ? '' : category.id }))}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                          (filters.category === category.id) || (category.id === 'all' && filters.category === '')
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {selectedServices.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Đã chọn {selectedServices.length} dịch vụ
                  </span>
                  <button className="flex items-center space-x-2 px-3 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50">
                    <Play className="w-4 h-4" />
                    <span>Start All</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
                    <Square className="w-4 h-4" />
                    <span>Stop All</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
                    <RotateCcw className="w-4 h-4" />
                    <span>Restart All</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* System Health Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái hệ thống</h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Hệ thống đang hoạt động tốt</h4>
                        <p className="text-gray-600 mt-1">Tất cả dịch vụ chính đang chạy ổn định</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <span className="text-2xl font-bold text-green-600">99.2%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Auth Service khởi động lại</p>
                        <p className="text-xs text-gray-500">5 phút trước</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Notification Service cảnh báo</p>
                        <p className="text-xs text-gray-500">12 phút trước</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment Gateway dừng</p>
                        <p className="text-xs text-gray-500">1 giờ trước</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Dịch vụ chính</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Xem tất cả →
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredServices.slice(0, 6).map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'microservices' && (
            <div>
              {filteredServices.length === 0 ? (
                <div className="text-center py-12">
                  <Server className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy dịch vụ</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Không có dịch vụ nào phù hợp với bộ lọc hiện tại
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'infrastructure' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Hạ tầng hệ thống</h3>
                <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
                  <Plus className="w-4 h-4" />
                  <span>Thêm component</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {infrastructure.map((infra) => (
                  <InfrastructureCard key={infra.id} infra={infra} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">CPU Usage Trend</h4>
                  <div className="h-40 flex items-end justify-center">
                    <div className="text-gray-500 text-sm">Biểu đồ CPU sẽ được hiển thị ở đây</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Memory Usage Trend</h4>
                  <div className="h-40 flex items-end justify-center">
                    <div className="text-gray-500 text-sm">Biểu đồ Memory sẽ được hiển thị ở đây</div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl">
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900">Real-time Metrics</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CPU
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Memory
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Requests/s
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Error Rate
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Response Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {services.map((service) => (
                        <tr key={service.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-3 ${
                                service.status === 'running' ? 'bg-green-400' :
                                service.status === 'warning' ? 'bg-yellow-400' :
                                'bg-red-400'
                              }`}></div>
                              <span className="text-sm font-medium text-gray-900">{service.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {service.resources.cpu}%
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {service.resources.memory}MB
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {service.metrics.throughput}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {service.metrics.errors > 0 ? (
                              <span className="text-red-600">{((service.metrics.errors / service.metrics.requests) * 100).toFixed(2)}%</span>
                            ) : (
                              <span className="text-green-600">0%</span>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {service.metrics.responseTime}ms
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Tất cả levels</option>
                    <option>ERROR</option>
                    <option>WARNING</option>
                    <option>INFO</option>
                    <option>DEBUG</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              <div className="bg-black rounded-xl p-4 font-mono text-sm text-green-400 h-96 overflow-y-auto">
                <div className="space-y-1">
                  <div>[2025-01-12 14:30:15] <span className="text-blue-400">INFO</span> [auth-service] User authentication successful - user_id: 12345</div>
                  <div>[2025-01-12 14:30:12] <span className="text-yellow-400">WARN</span> [notification-service] SMS delivery failed - retry attempt 2/3</div>
                  <div>[2025-01-12 14:30:10] <span className="text-red-400">ERROR</span> [payment-service] Connection timeout to bank gateway</div>
                  <div>[2025-01-12 14:30:08] <span className="text-blue-400">INFO</span> [analytics-service] Report generation completed - report_id: RPT_001</div>
                  <div>[2025-01-12 14:30:05] <span className="text-blue-400">INFO</span> [auth-service] Password reset email sent - user_id: 67890</div>
                  <div>[2025-01-12 14:30:03] <span className="text-yellow-400">WARN</span> [notification-service] High queue size detected - 1247 pending messages</div>
                  <div>[2025-01-12 14:30:01] <span className="text-blue-400">INFO</span> [database] Backup completed successfully - size: 2.1GB</div>
                  <div>[2025-01-12 14:29:58] <span className="text-green-400">DEBUG</span> [auth-service] Token validation - token expires in 3600s</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Service Detail Modal */}
      {showDetailModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${
                  selectedService.color === 'green' ? 'bg-green-100 text-green-600' :
                  selectedService.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                  selectedService.color === 'red' ? 'bg-red-100 text-red-600' :
                  selectedService.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <selectedService.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedService.name}</h2>
                  <p className="text-sm text-gray-500">Version {selectedService.version}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="col-span-2 space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Service Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Service ID:</span>
                          <span className="ml-2 font-medium">{selectedService.id}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="ml-2 font-medium">{selectedService.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Environment:</span>
                          <span className="ml-2 font-medium">{selectedService.environment}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Port:</span>
                          <span className="ml-2 font-medium">{selectedService.port}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Instances:</span>
                          <span className="ml-2 font-medium">{selectedService.instances}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Uptime:</span>
                          <span className="ml-2 font-medium text-green-600">{selectedService.uptime}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">URL:</span>
                        <a href={selectedService.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:text-blue-800 flex items-center">
                          {selectedService.url}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                      <div>
                        <span className="text-gray-600">Description:</span>
                        <p className="mt-1 text-gray-800">{selectedService.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Endpoints */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">API Endpoints</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Path</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedService.endpoints.map((endpoint, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm font-mono">{endpoint.path}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                                  endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                                  endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {endpoint.method}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span className={`inline-flex items-center ${
                                  endpoint.status === 'healthy' ? 'text-green-600' :
                                  endpoint.status === 'warning' ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  {endpoint.status === 'healthy' ? <CheckCircle className="w-4 h-4 mr-1" /> :
                                   endpoint.status === 'warning' ? <AlertTriangle className="w-4 h-4 mr-1" /> :
                                   <XCircle className="w-4 h-4 mr-1" />}
                                  {endpoint.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Dependencies */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Dependencies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.dependencies.map((dep, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Status & Actions */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          selectedService.status === 'running' ? 'bg-green-100 text-green-800' :
                          selectedService.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedService.status === 'running' ? <Wifi className="w-3 h-3 mr-1" /> :
                           selectedService.status === 'warning' ? <AlertTriangle className="w-3 h-3 mr-1" /> :
                           <WifiOff className="w-3 h-3 mr-1" />}
                          {selectedService.status}
                        </span>
                      </div>

                      {selectedService.status === 'stopped' ? (
                        <button
                          onClick={() => handleServiceAction(selectedService.id, 'start')}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                        >
                          <Play className="w-4 h-4" />
                          <span>Start Service</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleServiceAction(selectedService.id, 'stop')}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                        >
                          <Square className="w-4 h-4" />
                          <span>Stop Service</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleServiceAction(selectedService.id, 'restart')}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Restart Service</span>
                      </button>

                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Edit className="w-4 h-4" />
                        <span>Edit Config</span>
                      </button>
                    </div>
                  </div>

                  {/* Resource Usage */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Resource Usage</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 flex items-center">
                            <Cpu className="w-4 h-4 mr-1" />
                            CPU
                          </span>
                          <span className="font-medium">{selectedService.resources.cpu}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${selectedService.resources.cpu}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 flex items-center">
                            <MemoryStick className="w-4 h-4 mr-1" />
                            Memory
                          </span>
                          <span className="font-medium">{selectedService.resources.memory}MB</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${selectedService.resources.memory / 10}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 flex items-center">
                            <HardDrive className="w-4 h-4 mr-1" />
                            Disk
                          </span>
                          <span className="font-medium">{selectedService.resources.disk}GB</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${selectedService.resources.disk * 10}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 flex items-center">
                            <Network className="w-4 h-4 mr-1" />
                            Network
                          </span>
                          <span className="font-medium">{selectedService.resources.network}MB/s</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${selectedService.resources.network / 2}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Health Check */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Health Check</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${
                          selectedService.healthCheck.status === 'healthy' ? 'text-green-600' :
                          selectedService.healthCheck.status === 'warning' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {selectedService.healthCheck.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Check:</span>
                        <span className="font-medium">
                          {new Date(selectedService.healthCheck.lastCheck).toLocaleTimeString('vi-VN')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interval:</span>
                        <span className="font-medium">{selectedService.healthCheck.checkInterval}s</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Metrics (24h)</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-gray-500 text-xs">Requests</p>
                        <p className="font-semibold">{selectedService.metrics.requests.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-gray-500 text-xs">Errors</p>
                        <p className="font-semibold text-red-600">{selectedService.metrics.errors}</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-gray-500 text-xs">Response</p>
                        <p className="font-semibold">{selectedService.metrics.responseTime}ms</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-gray-500 text-xs">Throughput</p>
                        <p className="font-semibold">{selectedService.metrics.throughput}/s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesManagement;