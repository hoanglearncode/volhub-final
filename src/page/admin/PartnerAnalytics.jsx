import React, { useMemo, useState } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  Building, Phone, Mail, Globe, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, Crown, Zap, Package,
  BarChart as BarChartIcon, PlusCircle, ExternalLink, Briefcase, DollarSign,
  Upload, Camera, User, Image, CheckSquare, AlertCircle,
  ArrowUp, ArrowDown, RefreshCw, Coins, Gift, Lock,
  PieChart as PieChartIcon, LineChart as LineChartIcon, Percent
} from 'lucide-react';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  ScatterChart,
  Scatter
} from 'recharts';

export default function PartnerAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [query, setQuery] = useState('');

  // Mock analytics data
  const overviewStats = {
    totalPartners: 245,
    activePartners: 189,
    premiumPartners: 28,
    verifiedPartners: 128,
    unverifiedPartners: 89,
    totalRevenue: 140000000,
    avgTrustScore: 4.2,
    totalEvents: 2840,
    totalVolunteers: 45230,
    conversionRate: 12.5,
    churnRate: 2.1,
    avgLifetimeValue: 25000000,
    growthRate: 8.2
  };

  // Time series data
  const partnerGrowthData = [
    { month: 'T1', total: 180, new: 25, churned: 3, premium: 20, verified: 95, unverified: 65 },
    { month: 'T2', total: 195, new: 18, churned: 2, premium: 22, verified: 105, unverified: 68 },
    { month: 'T3', total: 208, new: 15, churned: 1, premium: 24, verified: 115, unverified: 69 },
    { month: 'T4', total: 220, new: 14, churned: 2, premium: 25, verified: 118, unverified: 77 },
    { month: 'T5', total: 225, new: 8, churned: 3, premium: 26, verified: 120, unverified: 79 },
    { month: 'T6', total: 230, new: 12, churned: 1, premium: 26, verified: 122, unverified: 82 },
    { month: 'T7', total: 232, new: 5, churned: 3, premium: 27, verified: 125, unverified: 80 },
    { month: 'T8', total: 238, new: 8, churned: 2, premium: 27, verified: 126, unverified: 85 },
    { month: 'T9', total: 241, new: 6, churned: 1, premium: 28, verified: 127, unverified: 86 },
    { month: 'T10', total: 243, new: 4, churned: 2, premium: 28, verified: 128, unverified: 87 },
    { month: 'T11', total: 245, new: 5, churned: 1, premium: 28, verified: 128, unverified: 89 },
    { month: 'T12', total: 245, new: 2, churned: 2, premium: 28, verified: 128, unverified: 89 }
  ];

  const revenueData = [
    { month: 'T1', revenue: 100000000, premiumRevenue: 100000000, costs: 20000000, profit: 80000000 },
    { month: 'T2', revenue: 110000000, premiumRevenue: 110000000, costs: 22000000, profit: 88000000 },
    { month: 'T3', revenue: 120000000, premiumRevenue: 120000000, costs: 24000000, profit: 96000000 },
    { month: 'T4', revenue: 125000000, premiumRevenue: 125000000, costs: 25000000, profit: 100000000 },
    { month: 'T5', revenue: 130000000, premiumRevenue: 130000000, costs: 26000000, profit: 104000000 },
    { month: 'T6', revenue: 130000000, premiumRevenue: 130000000, costs: 26000000, profit: 104000000 },
    { month: 'T7', revenue: 135000000, premiumRevenue: 135000000, costs: 27000000, profit: 108000000 },
    { month: 'T8', revenue: 135000000, premiumRevenue: 135000000, costs: 27000000, profit: 108000000 },
    { month: 'T9', revenue: 140000000, premiumRevenue: 140000000, costs: 28000000, profit: 112000000 },
    { month: 'T10', revenue: 140000000, premiumRevenue: 140000000, costs: 28000000, profit: 112000000 },
    { month: 'T11', revenue: 140000000, premiumRevenue: 140000000, costs: 28000000, profit: 112000000 },
    { month: 'T12', revenue: 140000000, premiumRevenue: 140000000, costs: 28000000, profit: 112000000 }
  ];

  const eventAnalytics = [
    { month: 'T1', totalEvents: 210, completedEvents: 198, cancelledEvents: 8, avgVolunteers: 15.2, avgRating: 4.1 },
    { month: 'T2', totalEvents: 225, completedEvents: 215, cancelledEvents: 6, avgVolunteers: 15.8, avgRating: 4.2 },
    { month: 'T3', totalEvents: 240, completedEvents: 228, cancelledEvents: 8, avgVolunteers: 16.1, avgRating: 4.2 },
    { month: 'T4', totalEvents: 235, completedEvents: 220, cancelledEvents: 10, avgVolunteers: 15.9, avgRating: 4.1 },
    { month: 'T5', totalEvents: 250, completedEvents: 238, cancelledEvents: 7, avgVolunteers: 16.5, avgRating: 4.3 },
    { month: 'T6', totalEvents: 245, completedEvents: 232, cancelledEvents: 9, avgVolunteers: 16.2, avgRating: 4.2 },
    { month: 'T7', totalEvents: 255, completedEvents: 242, cancelledEvents: 8, avgVolunteers: 16.8, avgRating: 4.3 },
    { month: 'T8', totalEvents: 260, completedEvents: 248, cancelledEvents: 7, avgVolunteers: 17.1, avgRating: 4.4 },
    { month: 'T9', totalEvents: 270, completedEvents: 258, cancelledEvents: 6, avgVolunteers: 17.5, avgRating: 4.4 },
    { month: 'T10', totalEvents: 265, completedEvents: 252, cancelledEvents: 8, avgVolunteers: 17.2, avgRating: 4.3 },
    { month: 'T11', totalEvents: 275, completedEvents: 262, cancelledEvents: 9, avgVolunteers: 17.8, avgRating: 4.5 },
    { month: 'T12', totalEvents: 280, completedEvents: 268, cancelledEvents: 7, avgVolunteers: 18.2, avgRating: 4.5 }
  ];

  // Partner tier distribution
  const tierDistribution = [
    { name: 'Chưa xác minh', value: overviewStats.unverifiedPartners, percentage: 36.3, color: '#6b7280' },
    { name: 'Đã xác minh', value: overviewStats.verifiedPartners, percentage: 52.2, color: '#10b981' },
    { name: 'Premium', value: overviewStats.premiumPartners, percentage: 11.4, color: '#8b5cf6' }
  ];

  // Industry breakdown
  const industryData = [
    { name: 'NGO/Phi lợi nhuận', partners: 89, events: 1240, volunteers: 18500, revenue: 0, color: '#10b981' },
    { name: 'Công nghệ', partners: 45, events: 650, volunteers: 12300, revenue: 85000000, color: '#3b82f6' },
    { name: 'Tài chính/Ngân hàng', partners: 32, events: 420, volunteers: 8200, revenue: 35000000, color: '#f59e0b' },
    { name: 'Y tế', partners: 28, events: 380, volunteers: 6800, revenue: 15000000, color: '#ef4444' },
    { name: 'Giáo dục', partners: 25, events: 290, volunteers: 4900, revenue: 5000000, color: '#8b5cf6' },
    { name: 'Khác', partners: 26, events: 160, volunteers: 2530, revenue: 0, color: '#6b7280' }
  ];

  // Geographic distribution
  const geographicData = [
    { region: 'TP.HCM', partners: 95, events: 1180, volunteers: 19800, color: '#3b82f6' },
    { region: 'Hà Nội', partners: 78, events: 980, volunteers: 15200, color: '#10b981' },
    { region: 'Đà Nẵng', partners: 32, events: 350, volunteers: 5800, color: '#f59e0b' },
    { region: 'Cần Thơ', partners: 18, events: 180, volunteers: 2900, color: '#ef4444' },
    { region: 'Hải Phòng', partners: 15, events: 120, volunteers: 2200, color: '#8b5cf6' },
    { region: 'Khác', partners: 7, events: 30, volunteers: 530, color: '#6b7280' }
  ];

  // Top performing partners
  const topPartners = [
    { 
      id: 1, name: 'UNICEF Việt Nam', tier: 'premium', trustScore: 4.9, 
      events: 45, volunteers: 1250, revenue: 60000000, growth: 15.2 
    },
    { 
      id: 4, name: 'Vingroup Foundation', tier: 'premium', trustScore: 4.8, 
      events: 67, volunteers: 2100, revenue: 40000000, growth: 22.1 
    },
    { 
      id: 2, name: 'Samsung Electronics', tier: 'verified', trustScore: 4.7, 
      events: 28, volunteers: 890, revenue: 25000000, growth: 8.5 
    },
    { 
      id: 8, name: 'Vietcombank', tier: 'premium', trustScore: 4.6, 
      events: 32, volunteers: 750, revenue: 15000000, growth: 12.8 
    },
    { 
      id: 12, name: 'FPT Software', tier: 'verified', trustScore: 4.5, 
      events: 22, volunteers: 680, revenue: 0, growth: 18.9 
    }
  ];

  // Engagement metrics
  const engagementData = [
    { month: 'T1', loginRate: 68, eventCreationRate: 15, responseRate: 85, satisfactionScore: 4.1 },
    { month: 'T2', loginRate: 72, eventCreationRate: 18, responseRate: 87, satisfactionScore: 4.2 },
    { month: 'T3', loginRate: 75, eventCreationRate: 22, responseRate: 89, satisfactionScore: 4.2 },
    { month: 'T4', loginRate: 71, eventCreationRate: 19, responseRate: 86, satisfactionScore: 4.1 },
    { month: 'T5', loginRate: 78, eventCreationRate: 25, responseRate: 91, satisfactionScore: 4.3 },
    { month: 'T6', loginRate: 76, eventCreationRate: 23, responseRate: 88, satisfactionScore: 4.2 },
    { month: 'T7', loginRate: 82, eventCreationRate: 28, responseRate: 93, satisfactionScore: 4.4 },
    { month: 'T8', loginRate: 85, eventCreationRate: 30, responseRate: 94, satisfactionScore: 4.4 },
    { month: 'T9', loginRate: 88, eventCreationRate: 32, responseRate: 95, satisfactionScore: 4.5 },
    { month: 'T10', loginRate: 86, eventCreationRate: 29, responseRate: 92, satisfactionScore: 4.3 },
    { month: 'T11', loginRate: 89, eventCreationRate: 35, responseRate: 96, satisfactionScore: 4.5 },
    { month: 'T12', loginRate: 91, eventCreationRate: 38, responseRate: 97, satisfactionScore: 4.6 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('vi-VN', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };

  const calculateGrowth = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100);
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // Filtered partner list for segments tab (demo)
  const partnerList = useMemo(() => {
    // combine some sample partners (topPartners + small generated list)
    const extra = Array.from({ length: 12 }).map((_, i) => ({
      id: 100 + i,
      name: `Company ${i + 1}`,
      tier: i % 3 === 0 ? 'premium' : i % 3 === 1 ? 'verified' : 'unverified',
      trustScore: (3.8 + (i % 5) * 0.2).toFixed(1),
      events: 5 + i,
      volunteers: 50 + i * 10,
      revenue: i % 2 === 0 ? 5000000 + i * 1000000 : 0
    }));
    return [...topPartners, ...extra].filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Partner Analytics</h1>
            <p className="text-gray-600 mt-2">Phân tích hiệu suất và xu hướng đối tác</p>
          </div>
          <div className="flex space-x-3">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">7 ngày qua</option>
              <option value="30">30 ngày qua</option>
              <option value="90">3 tháng qua</option>
              <option value="365">12 tháng qua</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Xuất báo cáo</span>
            </button>
            <button 
              onClick={() => { /* placeholder: refresh logic */ }} 
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Làm mới</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng đối tác</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.totalPartners}</p>
                <p className={`text-sm mt-1 ${getGrowthColor(overviewStats.growthRate)}`}>
                  +{overviewStats.growthRate}% so với tháng trước
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Doanh thu/tháng</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(overviewStats.totalRevenue)}</p>
                <p className="text-sm text-green-600 mt-1">+5.2% so với tháng trước</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tỷ lệ chuyển đổi</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.conversionRate}%</p>
                <p className="text-sm text-green-600 mt-1">+2.1% so với tháng trước</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Điểm uy tín TB</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.avgTrustScore}</p>
                <p className="text-sm text-green-600 mt-1">+0.3 so với tháng trước</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', label: 'Tổng quan', icon: BarChartIcon },
            { key: 'growth', label: 'Tăng trưởng', icon: TrendingUp },
            { key: 'revenue', label: 'Doanh thu', icon: DollarSign },
            { key: 'performance', label: 'Hiệu suất', icon: Activity },
            { key: 'segments', label: 'Phân khúc', icon: PieChartIcon }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Tier Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Phân bố Tier đối tác</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={tierDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {tierDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {tierDistribution.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full`} style={{backgroundColor: item.color}}></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value} ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Top đối tác hiệu suất cao</h3>
              <div className="space-y-4">
                {topPartners.map((partner, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{partner.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          partner.tier === 'premium' ? 'bg-purple-100 text-purple-800' :
                          partner.tier === 'verified' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {partner.tier === 'premium' ? 'Premium' : 
                           partner.tier === 'verified' ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {partner.events} sự kiện • {formatNumber(partner.volunteers)} TNV • 
                        Trust: {partner.trustScore}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(partner.revenue)}</div>
                      <div className={`text-xs ${getGrowthColor(partner.growth)}`}>
                        +{partner.growth.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Industry & Geographic Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Phân bố theo ngành</h3>
              <div className="space-y-3">
                {industryData.map((industry, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{industry.name}</span>
                      <span className="text-sm text-gray-600">{industry.partners} đối tác</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>{industry.events} sự kiện</span>
                      <span>{formatNumber(industry.volunteers)} TNV</span>
                      {industry.revenue > 0 && <span>{formatCurrency(industry.revenue)}</span>}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300" 
                        style={{
                          backgroundColor: industry.color,
                          width: `${(industry.partners / overviewStats.totalPartners) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Phân bố theo khu vực</h3>
              <div className="space-y-3">
                {geographicData.map((region, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{region.region}</span>
                      <span className="text-sm text-gray-600">{region.partners} đối tác</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>{region.events} sự kiện</span>
                      <span>{formatNumber(region.volunteers)} TNV</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300" 
                        style={{
                          backgroundColor: region.color,
                          width: `${(region.partners / overviewStats.totalPartners) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'growth' && (
        <div className="space-y-6">
          {/* Partner Growth Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Tăng trưởng đối tác theo thời gian</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={partnerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="new" name="Đối tác mới" fill="#10b981" />
                <Bar yAxisId="left" dataKey="churned" name="Rời khỏi" fill="#ef4444" />
                <Line yAxisId="right" type="monotone" dataKey="total" name="Tổng đối tác" stroke="#3b82f6" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Tier Migration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Chuyển đổi Tier theo tháng</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={partnerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="premium" stackId="1" name="Premium" stroke="#8b5cf6" fill="#8b5cf6" />
                  <Area type="monotone" dataKey="verified" stackId="1" name="Verified" stroke="#10b981" fill="#10b981" />
                  <Area type="monotone" dataKey="unverified" stackId="1" name="Unverified" stroke="#6b7280" fill="#6b7280" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Tỷ lệ churn & retention</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={partnerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="churned" name="Churned" stroke="#ef4444" />
                  <Line type="monotone" dataKey="new" name="New" stroke="#10b981" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Doanh thu theo tháng</h3>
                <p className="text-sm text-gray-500">Phân tích doanh thu, chi phí và lợi nhuận.</p>
              </div>
              <div className="flex items-center space-x-2">
                <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)} className="px-3 py-2 border rounded">
                  <option value="all">Tất cả</option>
                  <option value="revenue">Doanh thu</option>
                  <option value="profit">Lợi nhuận</option>
                  <option value="costs">Chi phí</option>
                </select>
                <button onClick={() => setComparisonMode(!comparisonMode)} className={`px-3 py-2 rounded ${comparisonMode ? 'bg-blue-600 text-white' : 'border'}`}>
                  So sánh
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={360}>
              <RechartsBarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(val) => formatCurrency(val)} />
                <Legend />
                <Bar dataKey="revenue" name="Doanh thu" fill="#3b82f6" />
                <Bar dataKey="costs" name="Chi phí" fill="#f59e0b" />
                <Bar dataKey="profit" name="Lợi nhuận" fill="#10b981" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-sm text-gray-600">Doanh thu trung bình</h4>
              <div className="text-2xl font-bold mt-2">{formatCurrency(revenueData.reduce((s, r) => s + r.revenue, 0) / revenueData.length)}</div>
              <div className="text-sm text-gray-500 mt-1">So sánh với cùng kỳ</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-sm text-gray-600">Chi phí trung bình</h4>
              <div className="text-2xl font-bold mt-2">{formatCurrency(revenueData.reduce((s, r) => s + r.costs, 0) / revenueData.length)}</div>
              <div className="text-sm text-gray-500 mt-1">Xu hướng chi phí</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-sm text-gray-600">Tổng lợi nhuận</h4>
              <div className="text-2xl font-bold mt-2">{formatCurrency(revenueData.reduce((s, r) => s + r.profit, 0))}</div>
              <div className="text-sm text-gray-500 mt-1">Tổng trong kỳ</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Phân tích sự kiện & tương tác</h3>
              <div className="text-sm text-gray-500">Tỷ lệ hoàn thành, số TNV trung bình và đánh giá sự kiện</div>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <RechartsLineChart data={eventAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalEvents" name="Tổng sự kiện" stroke="#3b82f6" />
                <Line type="monotone" dataKey="completedEvents" name="Hoàn thành" stroke="#10b981" />
                <Line type="monotone" dataKey="avgVolunteers" name="TNV trung bình" stroke="#8b5cf6" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3">Tỷ lệ hài lòng</h4>
              <ResponsiveContainer width="100%" height={220}>
                <RechartsBarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="loginRate" name="Tỷ lệ đăng nhập (%)" fill="#3b82f6" />
                  <Bar dataKey="responseRate" name="Tỷ lệ phản hồi (%)" fill="#10b981" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3">Satisfaction (điểm trung bình)</h4>
              <ResponsiveContainer width="100%" height={220}>
                <LineChartWrapper data={engagementData} />
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'segments' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400"/>
                  <input 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm kiếm đối tác..." 
                    className="pl-9 pr-3 py-2 border rounded w-80"
                  />
                </div>
                <select className="px-3 py-2 border rounded" onChange={(e) => setSelectedMetric(e.target.value)} value={selectedMetric}>
                  <option value="all">Tất cả</option>
                  <option value="premium">Premium</option>
                  <option value="verified">Verified</option>
                  <option value="unverified">Unverified</option>
                </select>
                <button className="px-3 py-2 border rounded flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Bộ lọc</span>
                </button>
              </div>
              <div>
                <button className="px-3 py-2 bg-blue-600 text-white rounded inline-flex items-center">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  <span>Thêm đối tác</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase">
                    <th className="px-4 py-3">Tên</th>
                    <th className="px-4 py-3">Tier</th>
                    <th className="px-4 py-3">Events</th>
                    <th className="px-4 py-3">TNV</th>
                    <th className="px-4 py-3">Doanh thu</th>
                    <th className="px-4 py-3">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {partnerList.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.trustScore} • ID: {p.id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          p.tier === 'premium' ? 'bg-purple-100 text-purple-800' :
                          p.tier === 'verified' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>{p.tier}</span>
                      </td>
                      <td className="px-4 py-3">{p.events}</td>
                      <td className="px-4 py-3">{formatNumber(p.volunteers)}</td>
                      <td className="px-4 py-3">{p.revenue ? formatCurrency(p.revenue) : '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <button title="Xem" className="p-2 border rounded"><Eye className="w-4 h-4" /></button>
                          <button title="Sửa" className="p-2 border rounded"><Edit className="w-4 h-4" /></button>
                          <button title="Khóa" className="p-2 border rounded"><Lock className="w-4 h-4" /></button>
                          <button title="Xoá" className="p-2 border rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-sm text-gray-500">Hiển thị {partnerList.length} đối tác</div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Small helper chart wrapper for satisfaction (kept outside main component for clarity)
 * This uses Recharts Line chart inside a ResponsiveContainer passed in parent.
 */
function LineChartWrapper({ data }) {
  return (
    <RechartsLineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis domain={[3.5, 5]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="satisfactionScore" name="Satisfaction" stroke="#8b5cf6" />
    </RechartsLineChart>
  );
}
