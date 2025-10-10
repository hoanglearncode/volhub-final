import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  BookText,
  UserCheck,
  Building2,
  Zap,
  FileText,
  Shield,
  BarChart3,
  Activity
} from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({}); // dữ liệu này được đẩy xuống thông qua socket
  const [kpiData, setKpiData] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [queueData, setQueueData] = useState({total: 0, data : []});
  const quickActions = [
    { title: 'Tạo sự kiện mới', icon: Calendar, color: 'bg-blue-500', href: '/admin/events' }, // no /create route in router -> use /admin/events
    { title: 'Quản lý người dùng', icon: Users, color: 'bg-green-500', href: '/admin/volunteers' },
    { title: 'Kiểm duyệt nội dung', icon: BookText, color: 'bg-purple-500', href: '/admin/content/queue' },
    { title: 'Xem báo cáo', icon: BarChart3, color: 'bg-orange-500', href: '/admin/report' },
    { title: 'Cảnh báo hệ thống', icon: AlertTriangle, color: 'bg-red-500', href: '/admin/system/alerts' }, // prefer alerts route
    { title: 'Gửi thông báo', icon: Zap, color: 'bg-yellow-500', href: '/admin/notifications/manage' },
    { title: 'Spotlight sự kiện', icon: Activity, color: 'bg-indigo-500', href: '/admin/content/spotlight' },
    { title: 'Giám sát hệ thống', icon: Shield, color: 'bg-teal-500', href: '/admin/system' }
  ]
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'flagged': return 'bg-red-100 text-red-800 border-red-200';
      case 'review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };
  const getTypeIcon = (type) => {
    switch (type) {
      case 'events': return Calendar;
      case 'connections': return MessageSquare;
      case 'content': return BookText;
      case 'volunteers': return UserCheck;
      case 'partners': return Building2;
      default: return FileText;
    }
  };

  useEffect(()=> {
    const loaded = async () => {
      try {
        const res = await axios.get('http://localhost:8080/admin/');
        if(res.data.success) {
          setData(res.data);
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra trong quá trình lấy dữ liệu!");
        console.log(error.message) 
      }
    }
    loaded();
  }, [])

  useEffect(()=> {
    if(data.success) {
      setKpiData(data.kpiData);
      setTrendData(data.trendData);
      setActivities(data.activities);
      console.log(data.queueData);
      setQueueData(data.queueData);
    }
  }, [data]);
  const today = new Date();

  const next7Days = new Date();
  next7Days.setDate(today.getDate() - 7);

  const formatDate = (d) =>
    d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  function formatRelativeTime(inputTs) {
    const ts = typeof inputTs === "number" ? inputTs : new Date(inputTs).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - ts);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} giây trước`;
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto mt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hệ thống VHub - Tuần từ {formatDate(next7Days)} đến {formatDate(today)}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng người dùng</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.totalUsers?.current.toLocaleString() || 0}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              {(kpiData?.totalUsers?.change || 0) >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${(kpiData?.totalUsers?.change || 0)>= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(kpiData?.totalUsers?.change || 0)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs tuần trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sự kiện đang tuyển</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.activeEvents?.current || 0}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              {(kpiData?.activeEvents?.change || 0) >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${(kpiData?.activeEvents?.change || 0) > 0 ? "text-green-600" : "text-red-600"}`}>{Math.abs(kpiData?.activeEvents?.change || 0)}%</span>
              <span className="text-sm text-gray-500 ml-2">vs tuần trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đơn đăng ký chờ</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.pendingApplications?.current || 0}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-2">
              {(kpiData?.pendingApplications?.change || 0) >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${(kpiData?.pendingApplications?.change || 0) >= 0 ? "text-green-600" : "text-red-600"}`}>{Math.abs(kpiData?.pendingApplications?.change || 0)}%</span>
              <span className="text-sm text-gray-500 ml-2">vs tuần trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chờ kiểm duyệt</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.pendingApprovals?.current || 0}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2">
              {(kpiData?.pendingApprovals?.change || 0) >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${(kpiData?.pendingApprovals?.change || 0) >= 0 ? "text-green-600" : "text-red-600"}`}>{kpiData?.pendingApprovals?.change || 0}%</span>
              <span className="text-sm text-gray-500 ml-2">vs tuần trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cảnh báo hệ thống</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.systemAlerts?.current || 0}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex items-center mt-2">
              {(kpiData?.systemAlerts?.change || 0) >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${(kpiData?.systemAlerts?.change || 0) >= 0 ? "text-green-600" : "text-red-600"}`}>{Math.abs(kpiData?.systemAlerts?.change || 0)}%</span>
              <span className="text-sm text-gray-500 ml-2">vs tuần trước</span>
            </div>
          </div>
        </div>

        {/* Charts and Queue Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Xu hướng hoạt động (7 ngày qua)</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Ứng tuyển</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Lượt xem</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span>Hoàn thành</span>
                </div>
              </div>
            </div>
            
            {/* Simple Chart Representation */}
            {trendData.length > 0 ? (
              <div className="space-y-4">
              {trendData.map((day, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 text-sm font-medium text-gray-600">{day.name}</div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div 
                        className="bg-blue-500 h-4 rounded"
                        style={{ width: `${(day.applications / 80) * 100}px` }}
                      ></div>
                      <span className="text-xs text-gray-500">{day.applications}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div 
                        className="bg-green-500 h-4 rounded"
                        style={{ width: `${(day.views / 2000) * 100}px` }}
                      ></div>
                      <span className="text-xs text-gray-500">{day.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div 
                        className="bg-purple-500 h-4 rounded"
                        style={{ width: `${(day.completed / 80) * 100}px` }}
                      ></div>
                      <span className="text-xs text-gray-500">{day.completed}</span>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            ) : (
              <div className={`flex items-center justify-center gap-3 border border-gray-200 bg-white/60 rounded-lg px-3 py-2 text-gray-700`}>
                <div className="flex items-center justify-center w-9 h-9 rounded-md bg-gray-100 text-gray-600 shrink-0">
                  <AlertCircle size={22} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">Chưa có hoạt động mới</div>
                </div>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button onClick={()=> navigate('/admin/analytics/platform')} className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                Xem Phân tích nền tảng →
              </button>
            </div>  
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h2>

            <div className="space-y-4">
              {activities && activities.length > 0 ? (
                activities.slice(0,5).map((item) => (
                  <div key={item.id} className=''>
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.color || "bg-gray-300"}`}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{formatRelativeTime(item.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">Chưa có hoạt động nào</div>
              )}
              {activities.length > 5 && (
                <Link to={'/admin/system?type=logs'} className='text-center text-sm font-semibold text-gray-500 bg-gray-200 hover:text-gray-800 transition-color'>
                  <p>Xem tất cả</p>
                </Link>
              ) }
            </div>
          </div>
        </div>

        {/* Queue and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Queue */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Hàng đợi cần xử lý</h2>
              <span className="text-sm text-gray-500">{queueData.total} mục</span>
            </div>
            {queueData.data?.length > 0 ? (
              <div className="space-y-4">
                {queueData.data?.map((item) => {
                  const TypeIcon = getTypeIcon(item.type);
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3 flex-1">
                        <TypeIcon className="h-5 w-5 text-gray-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <Link to={`/admin/${item.slug}`} className="text-sm font-medium text-gray-900 truncate hover:underline">{item.title}</Link>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                            <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                            <span className="text-xs text-gray-500">{item.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-sm text-gray-500">Chưa có hoạt động nào</div>
            )}

            {queueData.data?.length > 0&& 
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button onClick={()=> navigate('/admin/content/queue')} className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Xem tất cả hàng đợi →
                </button>
              </div>  
            }
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Thao tác nhanh</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  onClick={() => navigate(action.href)}
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-center leading-tight">{action.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;