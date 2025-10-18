import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Users,
  TrendingUp,
  Activity,
  CheckCircle,
  Clock,
  Briefcase,
  Target,
  BarChart3,
  LineChart,
  Search,
  RefreshCw,
  Filter,
  Plus,
  FileText,
  Eye,
  Edit,
  Download,
  Settings,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Link } from "react-router-dom";

/* -------------------------
   Mock data / defaults
   ------------------------- */
const mockStats = {
  Stats: {
    totalCandidates: 1247,
    activeCandidates: 456,
    totalHired: 89,
    pendingReview: 234,
  },
};

const defaultCandidateActivity = [
  { name: "Mon", applications: 30, interviews: 12, hired: 3 },
  { name: "Tue", applications: 45, interviews: 16, hired: 4 },
  { name: "Wed", applications: 38, interviews: 10, hired: 6 },
  { name: "Thu", applications: 50, interviews: 20, hired: 5 },
  { name: "Fri", applications: 70, interviews: 22, hired: 10 },
  { name: "Sat", applications: 20, interviews: 6, hired: 1 },
  { name: "Sun", applications: 10, interviews: 2, hired: 0 },
];

const defaultMonthlyTrend = [
  { month: "Thg 5", totalApplicants: 320, hired: 45, pending: 60 },
  { month: "Thg 6", totalApplicants: 420, hired: 60, pending: 70 },
  { month: "Thg 7", totalApplicants: 380, hired: 50, pending: 55 },
  { month: "Thg 8", totalApplicants: 510, hired: 78, pending: 80 },
  { month: "Thg 9", totalApplicants: 610, hired: 95, pending: 70 },
  { month: "Thg 10", totalApplicants: 700, hired: 120, pending: 90 },
];

const defaultJobPositions = new Array(6).fill(0).map((_, i) => ({
  slug: `job-${i + 1}`,
  position: ["Tình nguyện viên", "Nhân sự", "Tư vấn", "Truyền thông", "Thiết kế", "Kỹ thuật"][i % 6],
  filled: Math.floor(Math.random() * 20),
  openings: Math.floor(Math.random() * 10) + 1,
  applications: Math.floor(Math.random() * 200) + 20,
}));

const mockActivities = [
  { id: 1, candidate: "Nguyễn Văn A", action: "Nộp hồ sơ", position: "Software Engineer", time: "2 phút trước", type: "application" },
  { id: 2, candidate: "Trần Thị B", action: "Hoàn thành phỏng vấn", position: "Product Manager", time: "5 phút trước", type: "interview" },
  { id: 3, candidate: "Lê Văn C", action: "Được tuyển dụng", position: "UI/UX Designer", time: "10 phút trước", type: "hired" },
  { id: 4, candidate: "Phạm Thị D", action: "Từ chối offer", position: "Data Analyst", time: "15 phút trước", type: "declined" },
];

/* -------------------------
   Small presentational components
   ------------------------- */
const StatCard = React.memo(({ title, value, Icon, bgIcon = "bg-blue-50", trendText, trendIcon }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        </div>
        <div className={`${bgIcon} p-3 rounded-full flex items-center justify-center ml-4`}>
          {Icon && <Icon className="h-6 w-6 text-current" />}
        </div>
      </div>
      {trendText && (
        <div className="mt-3 flex items-center text-sm">
          {trendIcon}
          <span className="ml-2 text-sm text-gray-600">{trendText}</span>
        </div>
      )}
    </div>
  );
});

const ChartCard = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {icon && <div className="text-gray-500"><icon /></div>}
    </div>
    <div className="h-[300px]">{children}</div>
  </div>
);

/* -------------------------
   Main component
   ------------------------- */
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(mockStats);
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [activities, setActivities] = useState(mockActivities);
  const [jobPositionData, setJobPositionData] = useState(defaultJobPositions);
  const [monthlyTrendData, setMonthlyTrendData] = useState(defaultMonthlyTrend);
  const [candidateActivityData, setCandidateActivityData] = useState(defaultCandidateActivity);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setData(mockStats);
      setActivities(mockActivities);
      setJobPositionData(defaultJobPositions);
      setMonthlyTrendData(defaultMonthlyTrend);
      setCandidateActivityData(defaultCandidateActivity);
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = useMemo(() => data?.Stats || mockStats.Stats, [data]);

  const getActivityIcon = (type) => {
    switch (type) {
      case "application":
        return <FileText size={16} className="text-blue-500" />;
      case "interview":
        return <Activity size={16} className="text-green-500" />;
      case "hired":
        return <CheckCircle size={16} className="text-purple-500" />;
      case "declined":
        return <Clock size={16} className="text-red-500" />;
      default:
        return <Activity size={16} className="text-gray-500" />;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow">
        <p className="font-medium text-sm mb-1">{label}</p>
        {payload.map((p, idx) => (
          <p key={idx} className="text-sm" style={{ color: p.color }}>
            {p.name}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full transition-all duration-300 mb-18">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Tuyển dụng</h1>
            <p className="text-gray-600 mt-1">Tổng quan hệ thống tuyển dụng và ứng viên</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                aria-label="Tìm kiếm ứng viên"
                type="search"
                placeholder="Tìm kiếm ứng viên..."
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              />
            </div>

            <select
              aria-label="Phạm vi thời gian"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            >
              <option value="1d">24 giờ</option>
              <option value="7d">7 ngày</option>
              <option value="30d">30 ngày</option>
              <option value="90d">3 tháng</option>
            </select>

            <button
              onClick={fetchData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              aria-label="Làm mới dữ liệu"
            >
              <RefreshCw size={16} />
              Làm mới
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 w-full overflow-y-auto pb-8">
        <div className="max-w-7xl mx-auto mt-6 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 animate-pulse h-28" />
              ))
            ) : (
              <>
                <StatCard
                  title="Tổng ứng viên"
                  value={stats.totalCandidates}
                  Icon={Users}
                  bgIcon="bg-blue-50 text-blue-600"
                  trendText="+12% so với tháng trước"
                  trendIcon={<TrendingUp className="h-4 w-4 text-green-500" />}
                />
                <StatCard
                  title="Ứng viên đang xử lý"
                  value={stats.activeCandidates}
                  Icon={Clock}
                  bgIcon="bg-yellow-50 text-yellow-600"
                  trendText={`${stats.pendingReview ?? 0} chờ phỏng vấn`}
                  trendIcon={<Activity className="h-4 w-4 text-blue-500" />}
                />
                <StatCard
                  title="Đã cộng tác"
                  value={stats.totalHired}
                  Icon={CheckCircle}
                  bgIcon="bg-green-50 text-green-600"
                  trendText="+18% so với tháng trước"
                  trendIcon={<TrendingUp className="h-4 w-4 text-green-500" />}
                />
                <StatCard
                  title="Sự kiện đang tuyển"
                  value={24}
                  Icon={Briefcase}
                  bgIcon="bg-purple-50 text-purple-600"
                  trendText="8 vị trí ưu tiên"
                  trendIcon={<Target className="h-4 w-4 text-purple-500" />}
                />
              </>
            )}
          </div>

          {/* Charts: Activity (bar) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex px-6 items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Hoạt động tuần này</h3>
              <div className="flex items-center gap-2 text-gray-500">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>

            <div className="h-[300px] w-full">
              {candidateActivityData?.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={candidateActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="applications" fill="#3B82F6" name="Ứng viên ứng tuyển" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="interviews" fill="#F59E0B" name="Chờ duyệt" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="hired" fill="#10B981" name="Đã duyệt" radius={[6, 6, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">Không có dữ liệu</div>
              )}
            </div>
          </div>


          {/* Jobs + Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Hiệu suất theo sự kiện</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100" aria-label="Bộ lọc">
                      <Filter size={16} />
                    </button>
                  </div>
                </div>
                <Link to="/btc/events/recruitment-post" className="px-3 py-2 max-w-40 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                  <Plus size={16} /> Thêm sự kiện
                </Link>
              </div>

              <div className="space-y-4">
                {jobPositionData.length === 0 && loading ? (
                  // skeleton items
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg animate-pulse h-28" />
                  ))
                ) : (
                  jobPositionData.map((position, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300">
                      <div className="flex items-center justify-between mb-2">
                        <Link to={`/btc/events/${position.slug}`} className="font-medium text-gray-900 truncate">{position.position}</Link>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{position.filled} đã tuyển</span>
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{position.openings} vị trí</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 mr-4">
                          <div className="flex justify-between mb-1 text-sm text-gray-600">
                            <span>Ứng viên</span>
                            <span className="font-medium">{position.applications}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min((position.applications / 200) * 100, 100)}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Tỷ lệ tuyển: {position.applications ? ((position.filled / position.applications) * 100).toFixed(1) : "0.0"}%</span>
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="Xem">
                            <Eye size={14} />
                          </button>
                          <button className="p-1 text-green-600 hover:bg-green-50 rounded" title="Chỉnh sửa">
                            <Edit size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {jobPositionData.length > 0 && (
                <Link to="/btc/volunteers" className="flex items-center justify-center w-full border-t border-gray-300 py-3 mt-3 hover:text-blue-600 transition-all">Xem thêm</Link>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h3>
                <Link to="/btc/history" className="text-blue-600 hover:text-blue-700 text-sm">Xem tất cả</Link>
              </div>

              <div className="space-y-4">
                {(activities.length === 0 && loading) ? (
                  Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-gray-50 rounded animate-pulse" />)
                ) : activities.slice(0, 6).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.candidate}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.action}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                        <span>{activity.position}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
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
              <Link to="/btc/volunteers" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center">
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Quản lý ứng viên</span>
              </Link>

              <Link to="/btc/events/recruitment-post" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
                <Briefcase className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Đăng tin tuyển</span>
              </Link>

              <Link to="/btc/analytics" className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-center">
                <FileText className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Báo cáo</span>
              </Link>

              <button className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-center">
                <Download className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Xuất dữ liệu</span>
              </button>

              <Link to="/btc/settings" className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors text-center">
                <Settings className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Cài đặt</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
