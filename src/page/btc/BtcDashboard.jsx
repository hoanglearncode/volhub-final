import { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Bell,
  Calendar,
  MessageSquare,
  Settings,
  ChevronDown,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Briefcase,
  Award,
  FileText,
  Upload,
  RefreshCw
} from "lucide-react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  AreaChart,
  Area
} from 'recharts';
import { Link } from "react-router-dom";

/**
 * 
 * @returns yêu cầu dữ liêu:
 * - tổng ứng viên 
 * - ứng viên đã đăng ký 
 * - số ứng viên đang chờ 
 * - các sự kiện đang tuyển 
 * 
 * - dữ liệu cho biểu đồ 
 * - event mới nhất và - log
 */

export default function Dashboard() {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Dữ liệu mẫu cho các biểu đồ
  const candidateActivityData = [
    { name: 'T2', applications: 45, interviews: 12, hired: 3 },
    { name: 'T3', applications: 52, interviews: 18, hired: 5 },
    { name: 'T4', applications: 38, interviews: 15, hired: 2 },
    { name: 'T5', applications: 61, interviews: 22, hired: 7 },
    { name: 'T6', applications: 48, interviews: 16, hired: 4 },
    { name: 'T7', applications: 35, interviews: 8, hired: 1 },
    { name: 'CN', applications: 25, interviews: 5, hired: 0 }
  ];


  const monthlyTrendData = [
    { month: 'Jan', totalApplicants: 320, hired: 45, rejected: 180, pending: 95 },
    { month: 'Feb', totalApplicants: 385, hired: 52, rejected: 210, pending: 123 },
    { month: 'Mar', totalApplicants: 442, hired: 63, rejected: 245, pending: 134 },
    { month: 'Apr', totalApplicants: 398, hired: 58, rejected: 220, pending: 120 },
    { month: 'May', totalApplicants: 456, hired: 67, rejected: 268, pending: 121 },
    { month: 'Jun', totalApplicants: 521, hired: 78, rejected: 298, pending: 145 }
  ];

  const jobPositionData = [
    { position: 'Software Engineer', applications: 145, filled: 12, openings: 8 },
    { position: 'Product Manager', applications: 89, filled: 8, openings: 3 },
    { position: 'UI/UX Designer', applications: 76, filled: 6, openings: 4 },
    { position: 'Data Analyst', applications: 65, filled: 5, openings: 2 },
    { position: 'DevOps Engineer', applications: 54, filled: 4, openings: 3 },
    { position: 'QA Tester', applications: 43, filled: 3, openings: 2 }
  ];

  // Mock stats
  const mockStats = {
    totalCandidates: 1247,
    activeCandidates: 456,
    totalHired: 89,
    pendingReview: 234
  };

  const mockActivities = [
    { id: 1, candidate: "Nguyễn Văn A", action: "Nộp hồ sơ", position: "Software Engineer", time: "2 phút trước", type: "application" },
    { id: 2, candidate: "Trần Thị B", action: "Hoàn thành phỏng vấn", position: "Product Manager", time: "5 phút trước", type: "interview" },
    { id: 3, candidate: "Lê Văn C", action: "Được tuyển dụng", position: "UI/UX Designer", time: "10 phút trước", type: "hired" },
    { id: 4, candidate: "Phạm Thị D", action: "Từ chối offer", position: "Data Analyst", time: "15 phút trước", type: "declined" }
  ];

  const fetchData = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setData(mockStats);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'application': return <FileText size={16} className="text-blue-500" />;
      case 'interview': return <MessageSquare size={16} className="text-green-500" />;
      case 'hired': return <CheckCircle size={16} className="text-purple-500" />;
      case 'declined': return <XCircle size={16} className="text-red-500" />;
      default: return <Activity size={16} className="text-gray-500" />;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen transition-all duration-300">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Tuyển dụng</h1>
              <p className="text-gray-600">Tổng quan hệ thống tuyển dụng và ứng viên</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Tìm kiếm ứng viên..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1d">24 giờ</option>
                <option value="7d">7 ngày</option>
                <option value="30d">30 ngày</option>
                <option value="90d">3 tháng</option>
              </select>
              
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Làm mới
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 w-full h-full overflow-y-auto pb-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="mt-6 space-y-6">
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tổng ứng viên</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalCandidates.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12% so với tháng trước</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ứng viên đang xử lý</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.activeCandidates.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Activity className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm text-blue-600">234 chờ phỏng vấn</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đã cộng tác</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalHired.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+18% so với tháng trước</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Sự kiện đang tuyển</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Briefcase className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Target className="h-4 w-4 text-purple-500 mr-1" />
                    <span className="text-sm text-purple-600">8 vị trí ưu tiên</span>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 gap-6">
                {/* Weekly Activity Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Hoạt động tuần này</h3>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={candidateActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="applications" fill="#3B82F6" name="Ứng viên ứng tuyển" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="interviews" fill="#e5db1aff" name="Chờ duyệt" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="hired" fill="#10B981" name="Đã duyệt" radius={[2, 2, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Trends */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Xu hướng tuyển dụng 6 tháng</h3>
                  <LineChart className="h-5 w-5 text-gray-500" />
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={monthlyTrendData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="totalApplicants" 
                      stroke="#3B82F6" 
                      fillOpacity={1} 
                      fill="url(#colorTotal)" 
                      name="Tổng ứng viên"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hired" 
                      stroke="#10B981" 
                      fillOpacity={1} 
                      fill="url(#colorHired)" 
                      name="Đã cộng tác"
                    />
                    <Line type="monotone" dataKey="pending" stroke="#F59E0B" name="Đang chờ" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Job Positions and Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Job Positions Performance */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Hiệu suất theo sự kiện</h3>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                        <Filter size={16} />
                      </button>
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <Plus size={16} />
                        Thêm sự kiện
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {jobPositionData.slice(0, 10).map((position, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <Link to={`/btc/events/${position?.slug}`} title="Xem chi tiết" className="font-medium text-gray-900">{position.position}</Link>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              {position.filled} đã tuyển
                            </span>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {position.openings} vị trí trống
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1 mr-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600">Ứng viên</span>
                              <span className="text-sm font-medium">{position.applications}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${Math.min((position.applications / 150) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Tỷ lệ tuyển: {((position.filled / position.applications) * 100).toFixed(1)}%</span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                              <Eye size={14} />
                            </button>
                            <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                              <Edit size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  { jobPositionData.length >= 10 && <Link to={'/btc/volunteers'} className="flex items-center justify-center w-full border-t border-gray-300 py-3 mt-3 hover:text-blue-600 transition-all delay-100">Xem thêm</Link> }
                </div>

                {/* Recent Activities */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h3>
                    <Link to={'/btc/history'} className="text-blue-600 hover:text-blue-700 text-sm">Xem tất cả</Link>
                  </div>
                  
                  <div className="space-y-4">
                    {mockActivities.slice(0, 10).map(activity => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.candidate}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.position}</p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Link to={'/btc/volunteers'} className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center">
                    <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-900">Quản lý ứng viên</span>
                  </Link>
                  <Link to={'/btc/events/recruitment-post'} className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
                    <Briefcase className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-900">Đăng tin tuyển</span>
                  </Link>
                  <Link to={'/btc/analytics'} className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-center">
                    <FileText className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-900">Báo cáo</span>
                  </Link>
                  <button className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-center">
                    <Download className="h-6 w-6 text-red-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-900">Xuất dữ liệu</span>
                  </button>
                  <Link to={'/btc/settings'} className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors text-center">
                    <Settings className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-900">Cài đặt</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}