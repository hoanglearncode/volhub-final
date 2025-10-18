import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Users, UserCheck, UserX, Clock, TrendingUp, Briefcase,
  Calendar, Download, Filter, ChevronDown
} from 'lucide-react';

const RecruitmentDashboard = () => {
  const [dateFilter, setDateFilter] = useState('thisMonth');
  
  // Sample data
  const data = {
    "success": true,
    "data": {
        "totalApplications": 234,
        "approvedApplications": 45,
        "rejectedApplications": 89,
        "pendingApplications": 100,
        "monthlyStats": [
            {
                "month": "Tháng 1",
                "applications": 150,
                "hired": 12
            },
            {
                "month": "Tháng 2", 
                "applications": 180,
                "hired": 15
            },
            {
                "month": "Tháng 3",
                "applications": 220,
                "hired": 18
            },
            {
                "month": "Tháng 4",
                "applications": 190,
                "hired": 14
            }
        ],
        "topPositions": [
            {
                "position": "Frontend Developer",
                "applications": 85
            },
            {
                "position": "Backend Developer",
                "applications": 67
            },
            {
                "position": "Full Stack Developer",
                "applications": 52
            },
            {
                "position": "DevOps Engineer",
                "applications": 30
            }
        ]
    }
  };

  const stats = data.data;

  // Prepare pie chart data
  const pieData = [
    { name: 'Đã duyệt', value: stats.approvedApplications, color: '#10b981' },
    { name: 'Từ chối', value: stats.rejectedApplications, color: '#ef4444' },
    { name: 'Chờ duyệt', value: stats.pendingApplications, color: '#f59e0b' }
  ];

  // Stats cards data
  const statsCards = [
    {
      title: 'Tổng đơn ứng tuyển',
      value: stats.totalApplications,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Đã duyệt',
      value: stats.approvedApplications,
      icon: UserCheck,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Từ chối',
      value: stats.rejectedApplications,
      icon: UserX,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      title: 'Chờ duyệt',
      value: stats.pendingApplications,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'applications' ? 'Đơn ứng tuyển' : 'Đã tuyển'}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Báo cáo Tuyển dụng</h1>
            <p className="text-gray-600 mt-1">Báo cáo về hệ thống tuyển dụng và ứng viên</p>
          </div>
        </div>
      </div>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div key={index} className={`${card.bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className={`text-3xl font-bold ${card.textColor}`}>{card.value.toLocaleString()}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Line Chart - Monthly Trends */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Xu hướng theo tháng</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  name="Đơn ứng tuyển"
                />
                <Line 
                  type="monotone" 
                  dataKey="hired" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  name="Đã tuyển"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Application Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Trạng thái đơn ứng tuyển</h3>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value.toLocaleString(), name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart - Applications Over Time */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Diễn biến đơn ứng tuyển</h3>
            <Calendar className="w-5 h-5 text-purple-500" />
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={stats.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="applications"
                stroke="#8b5cf6"
                fill="url(#colorApplications)"
                strokeWidth={2}
                name="Đơn ứng tuyển"
              />
              <defs>
                <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h4 className="text-lg font-semibold mb-2">Tỷ lệ chuyển đổi</h4>
            <p className="text-3xl font-bold">
              {((stats.approvedApplications / stats.totalApplications) * 100).toFixed(1)}%
            </p>
            <p className="text-blue-100 text-sm mt-1">Từ ứng tuyển thành được tuyển</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h4 className="text-lg font-semibold mb-2">Hiệu suất tuyển dụng</h4>
            <p className="text-3xl font-bold">
              {stats.monthlyStats.reduce((acc, curr) => acc + curr.hired, 0)}
            </p>
            <p className="text-green-100 text-sm mt-1">Người đã tuyển trong 4 tháng</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <h4 className="text-lg font-semibold mb-2">Tăng trường trung bình</h4>
            <p className="text-3xl font-bold">+12.5%</p>
            <p className="text-purple-100 text-sm mt-1">So với kỳ trước</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDashboard;