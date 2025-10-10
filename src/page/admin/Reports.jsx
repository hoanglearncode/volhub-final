import React, { useState, useEffect } from 'react';
import {
  ChartLine,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  MapPin,
  Clock,
  Star,
  Heart,
  MessageSquare,
  Shield,
  AlertTriangle,
  Download,
  Filter,
  Search,
  RefreshCw,
  Settings,
  Eye,
  Share,
  FileText,
  Mail,
  Printer,
  ArrowUp,
  ArrowDown,
  Minus,
  Target,
  Award,
  Activity,
  Zap,
  Globe,
  Building2,
  UserCheck,
  CheckCircle,
  XCircle,
  Clock3,
  DollarSign,
  Percent
} from 'lucide-react';

const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for analytics (kept same structure as provided)
  const overviewStats = [
    {
      title: 'Tổng TNV hoạt động',
      value: '12,847',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      description: 'So với tháng trước'
    },
    {
      title: 'Tổng sự kiện',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Calendar,
      color: 'green',
      description: 'Sự kiện đã tổ chức'
    },
    {
      title: 'Giờ tình nguyện',
      value: '45,892',
      change: '+25.3%',
      trend: 'up',
      icon: Clock,
      color: 'purple',
      description: 'Giờ công đóng góp'
    },
    {
      title: 'Tỷ lệ hoàn thành',
      value: '87.4%',
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      color: 'orange',
      description: 'TNV hoàn thành sự kiện'
    },
    {
      title: 'Đối tác',
      value: '456',
      change: '+8.1%',
      trend: 'up',
      icon: Building2,
      color: 'indigo',
      description: 'Tổ chức hợp tác'
    },
    {
      title: 'Điểm hài lòng',
      value: '4.6/5',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'yellow',
      description: 'Đánh giá trung bình'
    }
  ];

  const volunteerData = {
    demographics: {
      ageGroups: [
        { name: '18-25', value: 45, count: 5789 },
        { name: '26-35', value: 32, count: 4108 },
        { name: '36-45', value: 15, count: 1927 },
        { name: '46+', value: 8, count: 1023 }
      ],
      gender: [
        { name: 'Nữ', value: 58, count: 7451 },
        { name: 'Nam', value: 40, count: 5138 },
        { name: 'Khác', value: 2, count: 258 }
      ],
      locations: [
        { name: 'TP.HCM', value: 35, count: 4496 },
        { name: 'Hà Nội', value: 28, count: 3597 },
        { name: 'Đà Nẵng', value: 12, count: 1542 },
        { name: 'Cần Thơ', value: 8, count: 1028 },
        { name: 'Khác', value: 17, count: 2184 }
      ]
    },
    engagement: {
      activeUsers: [
        { month: 'T1', active: 8234, new: 1245, returning: 6989 },
        { month: 'T2', active: 9156, new: 1387, returning: 7769 },
        { month: 'T3', active: 10234, new: 1456, returning: 8778 },
        { month: 'T4', active: 11456, new: 1578, returning: 9878 },
        { month: 'T5', active: 12234, new: 1634, returning: 10600 },
        { month: 'T6', active: 12847, new: 1723, returning: 11124 }
      ],
      retention: {
        week1: 85,
        week2: 72,
        week4: 58,
        month3: 45,
        month6: 38
      }
    },
    topVolunteers: [
      { id: 1, name: 'Nguyễn Minh Anh', hours: 245, events: 23, rating: 4.9, location: 'Hà Nội' },
      { id: 2, name: 'Trần Thị Bình', hours: 223, events: 21, rating: 4.8, location: 'TP.HCM' },
      { id: 3, name: 'Lê Văn Cường', hours: 198, events: 19, rating: 4.9, location: 'Đà Nẵng' },
      { id: 4, name: 'Phạm Thu Hà', hours: 187, events: 18, rating: 4.7, location: 'Hà Nội' },
      { id: 5, name: 'Hoàng Minh Đức', hours: 176, events: 17, rating: 4.8, location: 'TP.HCM' }
    ]
  };

  const eventData = {
    categories: [
      { name: 'Giáo dục', events: 234, volunteers: 2847, hours: 12456, completion: 89, value: 75 },
      { name: 'Môi trường', events: 189, volunteers: 2341, hours: 9876, completion: 92, value: 65 },
      { name: 'Y tế', events: 156, volunteers: 1923, hours: 8234, completion: 86, value: 55 },
      { name: 'Xã hội', events: 145, volunteers: 1756, hours: 7645, completion: 88, value: 50 },
      { name: 'Khác', events: 98, volunteers: 1245, hours: 5432, completion: 85, value: 40 }
    ],
    performance: [
      { month: 'T1', planned: 180, completed: 156, cancelled: 24, completion: 87 },
      { month: 'T2', planned: 195, completed: 172, cancelled: 23, completion: 88 },
      { month: 'T3', planned: 210, completed: 189, cancelled: 21, completion: 90 },
      { month: 'T4', planned: 225, completed: 198, cancelled: 27, completion: 88 },
      { month: 'T5', planned: 240, completed: 212, cancelled: 28, completion: 88 },
      { month: 'T6', planned: 255, completed: 234, cancelled: 21, completion: 92 }
    ],
    topEvents: [
      { id: 1, name: 'Hỗ trợ trẻ em khuyết tật', volunteers: 145, hours: 1240, rating: 4.9, partner: 'UNICEF' },
      { id: 2, name: 'Làm sạch bãi biển', volunteers: 132, hours: 1056, rating: 4.8, partner: 'Green Vietnam' },
      { id: 3, name: 'Chương trình giáo dục', volunteers: 128, hours: 1024, rating: 4.7, partner: 'Save the Children' },
      { id: 4, name: 'Y tế cộng đồng', volunteers: 115, hours: 920, rating: 4.8, partner: 'Bệnh viện K' },
      { id: 5, name: 'Hỗ trợ người già', volunteers: 98, hours: 784, rating: 4.6, partner: 'HelpAge Vietnam' }
    ]
  };

  const partnerData = {
    tiers: [
      { name: 'Premium', count: 45, events: 234, volunteers: 3456, revenue: 125000 },
      { name: 'Verified', count: 123, events: 456, volunteers: 5678, revenue: 89000 },
      { name: 'Basic', count: 288, events: 544, volunteers: 3713, revenue: 45000 }
    ],
    topPartners: [
      { id: 1, name: 'UNICEF Việt Nam', events: 45, volunteers: 1234, rating: 4.9, tier: 'Premium' },
      { id: 2, name: 'Samsung Việt Nam', events: 38, volunteers: 987, rating: 4.8, tier: 'Premium' },
      { id: 3, name: 'Unilever', events: 32, volunteers: 876, rating: 4.7, tier: 'Verified' },
      { id: 4, name: 'Grab Vietnam', events: 28, volunteers: 765, rating: 4.8, tier: 'Verified' },
      { id: 5, name: 'Vietcombank', events: 25, volunteers: 654, rating: 4.6, tier: 'Premium' }
    ],
    growth: [
      { month: 'T1', new: 23, churned: 5, net: 18 },
      { month: 'T2', new: 28, churned: 7, net: 21 },
      { month: 'T3', new: 34, churned: 6, net: 28 },
      { month: 'T4', new: 31, churned: 9, net: 22 },
      { month: 'T5', new: 29, churned: 4, net: 25 },
      { month: 'T6', new: 35, churned: 8, net: 27 }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: ChartLine },
    { id: 'volunteers', label: 'Tình nguyện viên', icon: Users },
    { id: 'events', label: 'Sự kiện', icon: Calendar },
    { id: 'partners', label: 'Đối tác', icon: Building2 },
    { id: 'engagement', label: 'Tương tác', icon: Activity },
    { id: 'performance', label: 'Hiệu quả', icon: Target },
    { id: 'custom', label: 'Báo cáo tùy chỉnh', icon: Settings }
  ];

  const timeRanges = [
    { id: '7days', label: '7 ngày' },
    { id: '30days', label: '30 ngày' },
    { id: '90days', label: '3 tháng' },
    { id: '6months', label: '6 tháng' },
    { id: '1year', label: '1 năm' },
    { id: 'custom', label: 'Tùy chọn' }
  ];

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
          <div className={`p-3 rounded-full ${
            stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
            stat.color === 'green' ? 'bg-green-100 text-green-600' :
            stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
            stat.color === 'orange' ? 'bg-orange-100 text-orange-600' :
            stat.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
            stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
            'bg-gray-100 text-gray-600'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex items-center">
            {stat.trend === 'up' ? (
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
            ) : stat.trend === 'down' ? (
              <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
            ) : (
              <Minus className="w-4 h-4 text-gray-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' :
              stat.trend === 'down' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <span className="text-sm text-gray-500 ml-2">{stat.description}</span>
        </div>
      </div>
    );
  };

  const ChartCard = ({ title, children, actions = null }) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const SimpleBarChart = ({ data, dataKey, nameKey = 'name', color = 'bg-blue-500' }) => (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">{item[nameKey]}</span>
              <span className="text-sm text-gray-600">{item[dataKey]}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${color}`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const DataTable = ({ data, columns, title }) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {title && (
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  useEffect(() => {
    // placeholder: would fetch data based on selectedTimeRange
    // For now we simply log selection
    console.log('Time range changed: ', selectedTimeRange);
  }, [selectedTimeRange]);

  // Export helpers
  const downloadCSV = (rows = [], filename = 'report.csv') => {
    if (!rows || rows.length === 0) return;
    const keys = Object.keys(rows[0]);
    const csv = [keys.join(','), ...rows.map(r => keys.map(k => JSON.stringify(r[k] ?? '')).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExport = (type = 'csv') => {
    // example: export top volunteers when selected
    if (activeTab === 'volunteers') {
      downloadCSV(volunteerData.topVolunteers, 'top-volunteers.csv');
    } else if (activeTab === 'events') {
      downloadCSV(eventData.topEvents, 'top-events.csv');
    } else if (activeTab === 'partners') {
      downloadCSV(partnerData.topPartners, 'top-partners.csv');
    } else {
      // generic export
      downloadCSV(overviewStats.map(s => ({ title: s.title, value: s.value, change: s.change })), 'overview.csv');
    }
    setShowExportModal(false);
  };

  const filteredPartners = partnerData.topPartners.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Phân tích</h1>
          <p className="text-gray-600 mt-1">Thống kê và phân tích chi tiết về hoạt động nền tảng</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>
          <button onClick={() => { /* refresh placeholder */ }} className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            <span>Làm mới</span>
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
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

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {overviewStats.map((stat, index) => (
                  <StatCard key={index} stat={stat} />
                ))}
              </div>

              {/* Key Metrics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Tăng trưởng người dùng">
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Biểu đồ tăng trưởng người dùng</p>
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Phân bố sự kiện theo danh mục">
                  <SimpleBarChart
                    data={eventData.categories.slice(0, 5)}
                    dataKey="events"
                    nameKey="name"
                    color="bg-green-500"
                  />
                </ChartCard>
              </div>

              {/* Quick Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">TNV hoạt động</h4>
                      <p className="text-sm text-gray-600">+18.2% so với tháng trước</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-4">12,847</p>
                  <p className="text-sm text-gray-600">Tình nguyện viên đang hoạt động</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sự kiện thành công</h4>
                      <p className="text-sm text-gray-600">Tỷ lệ hoàn thành cao</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-4">87.4%</p>
                  <p className="text-sm text-gray-600">Tỷ lệ hoàn thành sự kiện</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Star className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Đánh giá cao</h4>
                      <p className="text-sm text-gray-600">Hài lòng với dịch vụ</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-4">4.6/5</p>
                  <p className="text-sm text-gray-600">Điểm đánh giá trung bình</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'volunteers' && (
            <div className="space-y-8">
              {/* Volunteer Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">12,847</p>
                  <p className="text-sm text-gray-600">Tổng TNV</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">9,234</p>
                  <p className="text-sm text-gray-600">TNV hoạt động</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">1,456</p>
                  <p className="text-sm text-gray-600">TNV xuất sắc</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <Clock3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">45,892</p>
                  <p className="text-sm text-gray-600">Giờ đóng góp</p>
                </div>
              </div>

              {/* Demographics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard title="Độ tuổi">
                  <SimpleBarChart
                    data={volunteerData.demographics.ageGroups}
                    dataKey="count"
                    nameKey="name"
                    color="bg-blue-500"
                  />
                </ChartCard>

                <ChartCard title="Giới tính">
                  <SimpleBarChart
                    data={volunteerData.demographics.gender}
                    dataKey="count"
                    nameKey="name"
                    color="bg-pink-500"
                  />
                </ChartCard>

                <ChartCard title="Khu vực">
                  <SimpleBarChart
                    data={volunteerData.demographics.locations}
                    dataKey="count"
                    nameKey="name"
                    color="bg-green-500"
                  />
                </ChartCard>
              </div>

              {/* Top Volunteers */}
              <DataTable
                title="Top Tình nguyện viên"
                data={volunteerData.topVolunteers}
                columns={[
                  { key: 'name', header: 'Tên', render: (value) => <span className="font-medium">{value}</span> },
                  { key: 'location', header: 'Khu vực' },
                  { key: 'events', header: 'Sự kiện' },
                  { key: 'hours', header: 'Giờ công' },
                  {
                    key: 'rating',
                    header: 'Đánh giá',
                    render: (value) => (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{value}</span>
                      </div>
                    )
                  }
                ]}
              />
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-8">
              {/* Event Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <p className="text-sm text-gray-600">Tổng sự kiện</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">1,089</p>
                  <p className="text-sm text-gray-600">Hoàn thành</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">145</p>
                  <p className="text-sm text-gray-600">Hủy bỏ</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <Percent className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">87.4%</p>
                  <p className="text-sm text-gray-600">Tỷ lệ thành công</p>
                </div>
              </div>

              {/* Event Categories */}
              <ChartCard title="Sự kiện theo danh mục">
                <SimpleBarChart
                  data={eventData.categories}
                  dataKey="events"
                  nameKey="name"
                  color="bg-indigo-500"
                />
              </ChartCard>

              {/* Event Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Hiệu suất theo tháng">
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Biểu đồ kế hoạch vs hoàn thành</p>
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Sự kiện nổi bật">
                  <DataTable
                    title={null}
                    data={eventData.topEvents}
                    columns={[
                      { key: 'name', header: 'Tên sự kiện', render: (v) => <span className="font-medium">{v}</span> },
                      { key: 'partner', header: 'Đối tác' },
                      { key: 'volunteers', header: 'TNV' },
                      { key: 'hours', header: 'Giờ công' },
                      {
                        key: 'rating',
                        header: 'Đánh giá',
                        render: (value) => (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{value}</span>
                          </div>
                        )
                      }
                    ]}
                  />
                </ChartCard>
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="space-y-8">
              {/* Partner Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {partnerData.tiers.map((tier, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-sm font-medium text-gray-600">{tier.name}</h4>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{tier.count}</p>
                    <p className="text-sm text-gray-500">Sự kiện: {tier.events} • TNV: {tier.volunteers}</p>
                    <p className="text-sm text-gray-500 mt-2">Doanh thu: <span className="font-medium">{tier.revenue.toLocaleString()}</span></p>
                  </div>
                ))}
              </div>

              {/* Partner Growth & Top Partners */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard title="Tăng trưởng đối tác">
                  <div className="h-56 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Biểu đồ tăng trưởng đối tác</p>
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Top Đối tác">
                  <DataTable
                    title={null}
                    data={partnerData.topPartners}
                    columns={[
                      { key: 'name', header: 'Tên đối tác', render: (v) => <span className="font-medium">{v}</span> },
                      { key: 'tier', header: 'Hạng' },
                      { key: 'events', header: 'Sự kiện' },
                      { key: 'volunteers', header: 'TNV' },
                      {
                        key: 'rating',
                        header: 'Đánh giá',
                        render: (value) => (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{value}</span>
                          </div>
                        )
                      }
                    ]}
                  />
                </ChartCard>

                <ChartCard title="Tìm kiếm đối tác">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" placeholder="Tìm tên đối tác..." />
                      <button onClick={() => setSearchQuery('')} className="px-3 py-2 border rounded-lg">Xóa</button>
                    </div>

                    <div>
                      {filteredPartners.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                          <div>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-sm text-gray-500">{p.events} sự kiện • {p.volunteers} TNV</div>
                          </div>
                          <div className="text-sm text-gray-600">{p.rating} ★</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ChartCard>
              </div>
            </div>
          )}

          {activeTab === 'engagement' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Người dùng hoạt động">
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Xu hướng người dùng mới & trở lại</p>
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Tỉ lệ giữ chân">
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Shield className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Retention theo tuần và tháng</p>
                    </div>
                  </div>
                </ChartCard>
              </div>

              <ChartCard title="Top tương tác">
                <DataTable
                  title={null}
                  data={volunteerData.activeUsers || []}
                  columns={[
                    { key: 'month', header: 'Thời gian' },
                    { key: 'active', header: 'Active' },
                    { key: 'new', header: 'New' },
                    { key: 'returning', header: 'Returning' }
                  ]}
                />
              </ChartCard>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard title="Hiệu quả tổng quan">
                  <div className="p-6">
                    <div className="text-lg font-semibold">Tổng hợp KPI</div>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      <li>Hoàn thành sự kiện: 87.4%</li>
                      <li>Giờ tình nguyện: 45,892</li>
                      <li>Tổng TNV: 12,847</li>
                    </ul>
                  </div>
                </ChartCard>

                <ChartCard title="Doanh thu & Quyên góp">
                  <div className="h-36 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <DollarSign className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-500">Biểu đồ thu/chi (placeholder)</p>
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Chi phí/Hiệu suất">
                  <div className="h-36 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Zap className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-500">So sánh chi phí trên đầu TNV</p>
                    </div>
                  </div>
                </ChartCard>
              </div>

              <ChartCard title="Chi tiết theo tháng">
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <ChartLine className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Biểu đồ KPI theo tháng</p>
                  </div>
                </div>
              </ChartCard>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-8">
              <ChartCard title="Tạo báo cáo tùy chỉnh" actions={(
                <div className="flex items-center space-x-2">
                  <button onClick={() => setSelectedMetrics([])} className="px-3 py-2 border rounded">Reset</button>
                  <button onClick={() => setShowExportModal(true)} className="px-3 py-2 bg-blue-600 text-white rounded">Xuất</button>
                </div>
              )}>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {['TNV', 'Sự kiện', 'Giờ công', 'Tỉ lệ hoàn thành', 'Đối tác', 'Hài lòng'].map(m => (
                      <button
                        key={m}
                        onClick={() => {
                          setSelectedMetrics(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
                        }}
                        className={`px-3 py-2 rounded-lg border ${selectedMetrics.includes(m) ? 'bg-blue-600 text-white' : 'bg-white'}`}
                      >{m}</button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Preview báo cáo:</p>
                    <div className="mt-2 bg-gray-50 border border-gray-200 p-4 rounded">
                      <p className="text-sm text-gray-800">{selectedMetrics.length ? selectedMetrics.join(', ') : 'Chưa chọn metric nào'}</p>
                    </div>
                  </div>
                </div>
              </ChartCard>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold">Xuất báo cáo</h3>
            <p className="text-sm text-gray-600 mt-2">Chọn định dạng và phạm vi để xuất dữ liệu hiện tại.</p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm text-gray-700">Định dạng</label>
                <select className="w-full mt-2 px-3 py-2 border rounded" defaultValue="csv">
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel (xlsx)</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700">Phạm vi</label>
                <select className="w-full mt-2 px-3 py-2 border rounded" value={selectedTimeRange} onChange={(e) => setSelectedTimeRange(e.target.value)}>
                  {timeRanges.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-2">
              <button onClick={() => setShowExportModal(false)} className="px-4 py-2 border rounded">Hủy</button>
              <button onClick={() => handleExport('csv')} className="px-4 py-2 bg-blue-600 text-white rounded">Xuất CSV</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;
