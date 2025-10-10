import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, FunnelChart, Funnel, LabelList
} from 'recharts';
import { 
  Users, UserCheck, Calendar, Clock, Shield, AlertTriangle, 
  TrendingUp, TrendingDown, Eye, CheckCircle, XCircle, FileText,
  MessageSquare, Award, Heart, Building, Activity, Bell, Zap
} from 'lucide-react';

const PlatformAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data theo cấu trúc VHub
  const kpiData = {
    totalUsers: 15420,
    activeVolunteers: 12850,
    activePartners: 245,
    eventsRecruiting: 89,
    pendingApplications: 156,
    pendingApprovals: 43,
    systemAlerts: 7,
    weeklyGrowth: {
      users: 5.2,
      events: 12.3,
      applications: -3.4,
      approvals: 8.7
    }
  };

  // Dữ liệu xu hướng ứng tuyển - lượt xem - hoàn thành
  const trendData = [
    { week: 'T1', applications: 420, views: 1250, completed: 380 },
    { week: 'T2', applications: 390, views: 1180, completed: 365 },
    { week: 'T3', applications: 480, views: 1420, completed: 445 },
    { week: 'T4', applications: 520, views: 1580, completed: 485 },
    { week: 'T5', applications: 650, views: 1850, completed: 580 },
    { week: 'T6', applications: 720, views: 2100, completed: 650 },
    { week: 'T7', applications: 680, views: 1980, completed: 620 }
  ];

  // Dữ liệu phễu kết nối (Connection Funnel)
  const connectionFunnelData = [
    { name: 'Connect Sent', value: 2400, fill: '#3b82f6' },
    { name: 'Admin Approved', value: 2100, fill: '#10b981' },
    { name: 'Volunteer Accepted', value: 1850, fill: '#f59e0b' },
    { name: 'Event Show-up', value: 1650, fill: '#ef4444' },
    { name: 'Completed', value: 1520, fill: '#8b5cf6' }
  ];

  // Dữ liệu sự kiện theo trạng thái
  const eventStatusData = [
    { status: 'Đang mở', count: 89, color: '#10b981' },
    { status: 'Nháp', count: 32, color: '#6b7280' },
    { status: 'Chờ duyệt', count: 25, color: '#f59e0b' },
    { status: 'Tạm dừng', count: 8, color: '#ef4444' },
    { status: 'Đã đóng', count: 145, color: '#374151' }
  ];

  // Dữ liệu đối tác theo tier
  const partnerTierData = [
    { tier: 'Unverified', count: 85, events: 120, trustScore: 65 },
    { tier: 'Verified', count: 125, events: 380, trustScore: 85 },
    { tier: 'Premium', count: 35, events: 245, trustScore: 95 }
  ];

  // Queue cần xử lý
  const pendingQueues = [
    { type: 'Sự kiện chờ duyệt', count: 25, priority: 'high', icon: Calendar },
    { type: 'Connect chờ xác nhận', count: 156, priority: 'medium', icon: MessageSquare },
    { type: 'Nội dung cộng đồng', count: 43, priority: 'medium', icon: FileText },
    { type: 'Xác minh TNV', count: 18, priority: 'low', icon: UserCheck },
    { type: 'Báo cáo vi phạm', count: 7, priority: 'high', icon: AlertTriangle }
  ];

  // Analytics về tình nguyện viên
  const volunteerAnalytics = [
    { month: 'T1', totalHours: 12450, eventsJoined: 89, completionRate: 92 },
    { month: 'T2', totalHours: 11800, eventsJoined: 85, completionRate: 89 },
    { month: 'T3', totalHours: 13250, eventsJoined: 95, completionRate: 94 },
    { month: 'T4', totalHours: 14100, eventsJoined: 102, completionRate: 91 },
    { month: 'T5', totalHours: 15200, eventsJoined: 118, completionRate: 93 },
    { month: 'T6', totalHours: 16500, eventsJoined: 125, completionRate: 95 }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue', suffix = '' }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}{suffix}</p>
          {change !== undefined && (
            <p className={`text-sm flex items-center mt-2 ${
              change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'
            }`}>
              {change > 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : change < 0 ? (
                <TrendingDown className="w-4 h-4 mr-1" />
              ) : null}
              {change !== 0 ? `${Math.abs(change)}% so với tuần trước` : 'Không đổi'}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => (
    <button 
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg bg-${color}-50 hover:bg-${color}-100 transition-colors group`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`w-5 h-5 text-${color}-600 group-hover:scale-110 transition-transform`} />
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );

  const QueueItem = ({ item }) => {
    const priorityColors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      low: 'bg-green-100 text-green-800 border-green-200'
    };

    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="flex items-center space-x-3">
          <item.icon className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">{item.type}</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[item.priority]}`}>
              {item.priority === 'high' ? 'Cao' : item.priority === 'medium' ? 'Vừa' : 'Thấp'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">{item.count}</span>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
            Xử lý
          </button>
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
              <h1 className="text-3xl font-bold text-gray-900">VHub Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Control Tower - Quản trị nền tảng tình nguyện</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Bell className="w-4 h-4 mr-2" />
                Cảnh báo ({kpiData.systemAlerts})
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Zap className="w-4 h-4 mr-2" />
                Spotlight
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex gap-4">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">7 ngày qua</option>
            <option value="month">30 ngày qua</option>
            <option value="quarter">Quý này</option>
            <option value="year">Năm này</option>
          </select>
          
          <select 
            value={selectedFilter} 
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả hệ thống</option>
            <option value="events">Chỉ sự kiện</option>
            <option value="volunteers">Chỉ tình nguyện viên</option>
            <option value="partners">Chỉ đối tác</option>
            <option value="content">Chỉ nội dung</option>
          </select>
        </div>

        {/* KPI Cards - 2 hàng 5 thẻ */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <StatCard 
            title="Tổng người dùng" 
            value={kpiData.totalUsers} 
            change={kpiData.weeklyGrowth.users} 
            icon={Users} 
            color="blue" 
          />
          <StatCard 
            title="TNV hoạt động" 
            value={kpiData.activeVolunteers} 
            change={kpiData.weeklyGrowth.users} 
            icon={Heart} 
            color="green" 
          />
          <StatCard 
            title="Sự kiện đang tuyển" 
            value={kpiData.eventsRecruiting} 
            change={kpiData.weeklyGrowth.events} 
            icon={Calendar} 
            color="purple" 
          />
          <StatCard 
            title="Chờ kiểm duyệt" 
            value={kpiData.pendingApprovals} 
            change={kpiData.weeklyGrowth.approvals} 
            icon={Clock} 
            color="yellow" 
          />
          <StatCard 
            title="Cảnh báo hệ thống" 
            value={kpiData.systemAlerts} 
            change={0} 
            icon={AlertTriangle} 
            color="red" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <StatCard 
            title="Đối tác hoạt động" 
            value={kpiData.activePartners} 
            change={3.2} 
            icon={Building} 
            color="indigo" 
          />
          <StatCard 
            title="Đơn chờ xử lý" 
            value={kpiData.pendingApplications} 
            change={kpiData.weeklyGrowth.applications} 
            icon={FileText} 
            color="orange" 
          />
          <StatCard 
            title="Kết nối/Connect" 
            value={245} 
            change={15.4} 
            icon={MessageSquare} 
            color="teal" 
          />
          <StatCard 
            title="Tỷ lệ hoàn thành" 
            value={92} 
            change={2.1} 
            icon={CheckCircle} 
            color="emerald" 
            suffix="%" 
          />
          <StatCard 
            title="NPS Score" 
            value={8.4} 
            change={0.3} 
            icon={Award} 
            color="pink" 
            suffix="/10" 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Xu hướng chính */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Xu hướng: Ứng tuyển - Lượt xem - Hoàn thành</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={3} name="Ứng tuyển" />
                <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={3} name="Lượt xem" />
                <Line type="monotone" dataKey="completed" stroke="#f59e0b" strokeWidth={3} name="Hoàn thành" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Thao tác nhanh</h3>
            <div className="space-y-3">
              <QuickActionCard
                title="Tạo sự kiện/việc"
                description="Thêm sự kiện tình nguyện mới"
                icon={Calendar}
                color="blue"
                onClick={() => {}}
              />
              <QuickActionCard
                title="Quản lý người dùng"
                description="Xác minh & phân quyền"
                icon={Users}
                color="green"
              />
              <QuickActionCard
                title="Kiểm duyệt nội dung"
                description="UGC & Community Feed"
                icon={Eye}
                color="purple"
              />
              <QuickActionCard
                title="Xem báo cáo"
                description="Analytics & Insights"
                icon={Activity}
                color="orange"
              />
              <QuickActionCard
                title="Gửi thông báo"
                description="Push/Email hệ thống"
                icon={Bell}
                color="red"
              />
              <QuickActionCard
                title="Spotlight Event"
                description="Đẩy lên Featured"
                icon={Zap}
                color="yellow"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Event Status Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Phân bố trạng thái sự kiện</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count, percentage }) => `${status}: ${count}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {eventStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Partner Tier Analysis */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Phân tích đối tác theo tier</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={partnerTierData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tier" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Số đối tác" />
                <Bar dataKey="events" fill="#10b981" name="Sự kiện tạo" />
                <Bar dataKey="trustScore" fill="#f59e0b" name="Điểm tin cậy" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Queue Management */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">Hàng đợi cần xử lý</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingQueues.map((item, index) => (
              <QueueItem key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Connection Funnel */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Phễu kết nối (Connect Funnel)</h3>
            <div className="space-y-3">
              {connectionFunnelData.map((step, index) => {
                const percentage = index === 0 ? 100 : Math.round((step.value / connectionFunnelData[0].value) * 100);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: step.fill }}></div>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ width: `${percentage}%`, backgroundColor: step.fill }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold w-16 text-right">{step.value.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 w-12 text-right">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Volunteer Analytics */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Analytics TNV (Giờ công & Hiệu suất)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={volunteerAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'totalHours') return [value.toLocaleString() + ' giờ', 'Tổng giờ công'];
                    if (name === 'eventsJoined') return [value + ' sự kiện', 'Sự kiện tham gia'];
                    if (name === 'completionRate') return [value + '%', 'Tỷ lệ hoàn thành'];
                    return [value, name];
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="totalHours" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Tổng giờ công" />
                <Area type="monotone" dataKey="eventsJoined" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Sự kiện tham gia" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Hoạt động gần đây</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Xem tất cả
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người thực hiện
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    10:30 AM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Sự kiện
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Duyệt sự kiện "Làm sạch bờ biển Vũng Tàu"
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Admin Minh
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    09:45 AM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      TNV
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Xác minh hồ sơ TNV Nguyễn Thanh Tùng
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Admin Hoa
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    09:20 AM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Báo cáo
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Xử lý báo cáo vi phạm của đối tác ABC Corp
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Admin Khang
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Clock className="w-5 h-5 text-yellow-500" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;