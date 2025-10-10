import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Award, DollarSign, 
  Phone, Mail, Globe, Star, Heart, Share2, Edit, Trash2,
  CheckCircle, XCircle, AlertTriangle, Eye, MessageSquare,
  Download, FileText, Camera, Tag, Building, Shield,
  TrendingUp, Activity, UserCheck, Clock3, BarChart3,
  RefreshCw, Filter, Search, MoreHorizontal, Flag, Ban,
  Bell, AlertCircle, Info, ChevronDown, ChevronUp,
  User, Calendar as CalendarIcon, Timer, Target, TrendingDown, Zap, ThumbsUp, ThumbsDown,
  PieChart, LineChart, BarChart, Layers, Percent,
  ArrowUpRight, ArrowDownRight, Minus, Plus
} from 'lucide-react';
import {
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area,
  ComposedChart, Scatter, ScatterChart, ZAxis, RadialBarChart, RadialBar
} from 'recharts';

/**
 * EventAnalytics - full featured analytics view (mock-data).
 * - Replace analyticsData with API response when available.
 * - Exports CSV of selected dataset.
 */

export default function EventAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [activeKPI, setActiveKPI] = useState(null);

  // -------------------------
  // Mock analytics data
  // -------------------------
  const analyticsData = {
    overview: {
      totalEvents: 284,
      totalVolunteers: 8640,
      totalHours: 34560,
      avgRating: 4.3,
      completionRate: 87.2,
      organizerSatisfaction: 4.6,
      communityImpact: 92.4,
      growthRate: 15.3
    },
    timeSeriesData: [
      { month: 'T7/2024', events: 42, volunteers: 1240, hours: 4960, rating: 4.1, completion: 85.2, budget: 125000000 },
      { month: 'T8/2024', events: 38, volunteers: 1180, hours: 4720, rating: 4.2, completion: 86.1, budget: 118000000 },
      { month: 'T9/2024', events: 45, volunteers: 1350, hours: 5400, rating: 4.3, completion: 88.4, budget: 142000000 },
      { month: 'T10/2024', events: 52, volunteers: 1520, hours: 6080, rating: 4.4, completion: 89.2, budget: 156000000 },
      { month: 'T11/2024', events: 49, volunteers: 1430, hours: 5720, rating: 4.2, completion: 86.8, budget: 148000000 },
      { month: 'T12/2024', events: 58, volunteers: 1920, hours: 7680, rating: 4.5, completion: 87.3, budget: 178000000 }
    ],
    categoryBreakdown: [
      { category: 'Môi trường', events: 68, volunteers: 2240, avgRating: 4.6, completion: 91.2, color: '#10b981' },
      { category: 'Giáo dục', events: 52, volunteers: 1680, avgRating: 4.4, completion: 88.5, color: '#3b82f6' },
      { category: 'Y tế', events: 34, volunteers: 1120, avgRating: 4.1, completion: 82.3, color: '#ef4444' },
      { category: 'Cộng đồng', events: 48, volunteers: 1580, avgRating: 4.5, completion: 89.7, color: '#f59e0b' },
      { category: 'Trẻ em', events: 29, volunteers: 980, avgRating: 4.3, completion: 85.1, color: '#8b5cf6' },
      { category: 'Người cao tuổi', events: 23, volunteers: 760, avgRating: 4.2, completion: 86.8, color: '#06b6d4' },
      { category: 'Khác', events: 30, volunteers: 1280, avgRating: 4.0, completion: 83.4, color: '#84cc16' }
    ],
    geographicData: [
      { region: 'TP. Hồ Chí Minh', events: 89, volunteers: 3240, impact: 95.2, budget: 285000000 },
      { region: 'Hà Nội', events: 72, volunteers: 2680, impact: 92.8, budget: 248000000 },
      { region: 'Đà Nẵng', events: 34, volunteers: 1120, impact: 88.5, budget: 128000000 },
      { region: 'Vũng Tàu', events: 28, volunteers: 980, impact: 89.3, budget: 98000000 },
      { region: 'Cần Thơ', events: 22, volunteers: 760, impact: 86.7, budget: 82000000 },
      { region: 'Khác', events: 39, volunteers: 1860, impact: 84.2, budget: 126000000 }
    ],
    organizerPerformance: [
      { name: 'Green Earth Vietnam', events: 15, volunteers: 780, rating: 4.8, completion: 96.2, type: 'verified_partner' },
      { name: 'Habitat for Humanity', events: 12, volunteers: 620, rating: 4.9, completion: 98.1, type: 'verified_partner' },
      { name: 'Education First', events: 8, volunteers: 340, rating: 4.2, completion: 85.7, type: 'organization' },
      { name: 'Medical Volunteers', events: 6, volunteers: 280, rating: 4.4, completion: 88.9, type: 'organization' },
      { name: 'Community Builders', events: 9, volunteers: 450, rating: 4.3, completion: 87.2, type: 'organization' }
    ],
    volunteerDemographics: {
      ageGroups: [
        { range: '16-25', count: 3240, percentage: 37.5 },
        { range: '26-35', count: 2680, percentage: 31.0 },
        { range: '36-45', count: 1520, percentage: 17.6 },
        { range: '46-55', count: 840, percentage: 9.7 },
        { range: '56+', count: 360, percentage: 4.2 }
      ],
      genderDistribution: [
        { gender: 'Nữ', count: 5040, percentage: 58.3 },
        { gender: 'Nam', count: 3480, percentage: 40.3 },
        { gender: 'Khác', count: 120, percentage: 1.4 }
      ],
      experienceLevel: [
        { level: 'Mới bắt đầu', count: 4320, percentage: 50.0 },
        { level: 'Có kinh nghiệm', count: 3240, percentage: 37.5 },
        { level: 'Chuyên nghiệp', count: 1080, percentage: 12.5 }
      ]
    },
    financialData: {
      totalBudget: 1267000000,
      avgBudgetPerEvent: 4460563,
      budgetByCategory: [
        { category: 'Môi trường', budget: 340000000, efficiency: 152 },
        { category: 'Giáo dục', budget: 260000000, efficiency: 155 },
        { category: 'Y tế', budget: 280000000, efficiency: 125 },
        { category: 'Cộng đồng', budget: 240000000, efficiency: 158 },
        { category: 'Khác', budget: 147000000, efficiency: 135 }
      ],
      costPerVolunteer: 146643,
      costPerHour: 36661
    },
    engagement: {
      repeatVolunteerRate: 68.5,
      avgEventsPerVolunteer: 2.3,
      socialMediaReach: 124800,
      mediaImpression: 890000,
      userGrowthRate: 23.4,
      retentionRate: 74.2
    },
    predictiveMetrics: {
      nextMonthForecast: {
        events: 62,
        volunteers: 2040,
        confidence: 87.5
      },
      trendingCategories: ['Môi trường', 'Giáo dục'],
      riskFactors: [
        { factor: 'Seasonal decline', probability: 0.35 },
        { factor: 'Budget constraints', probability: 0.28 },
        { factor: 'Organizer capacity', probability: 0.15 }
      ]
    }
  };

  const timeRanges = [
    { value: '1month', label: '1 tháng' },
    { value: '3months', label: '3 tháng' },
    { value: '6months', label: '6 tháng' },
    { value: '1year', label: '1 năm' },
    { value: 'all', label: 'Toàn bộ' }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];

  // KPI definition
  const kpis = [
    {
      id: 'events',
      title: 'Tổng sự kiện',
      value: analyticsData.overview.totalEvents,
      change: +12.5,
      format: 'number',
      icon: CalendarIcon,
      colorClass: 'text-blue-600'
    },
    {
      id: 'volunteers', 
      title: 'Tình nguyện viên',
      value: analyticsData.overview.totalVolunteers,
      change: +18.3,
      format: 'number',
      icon: Users,
      colorClass: 'text-green-600'
    },
    {
      id: 'hours',
      title: 'Tổng giờ tham gia',
      value: analyticsData.overview.totalHours,
      change: +15.7,
      format: 'number',
      icon: Clock3,
      colorClass: 'text-purple-600'
    },
    {
      id: 'rating',
      title: 'Đánh giá trung bình',
      value: analyticsData.overview.avgRating,
      change: +5.2,
      format: 'decimal',
      suffix: '/5.0',
      icon: Star,
      colorClass: 'text-yellow-500'
    },
    {
      id: 'completion',
      title: 'Tỷ lệ hoàn thành',
      value: analyticsData.overview.completionRate,
      change: +3.8,
      format: 'percentage',
      icon: CheckCircle,
      colorClass: 'text-emerald-600'
    },
    {
      id: 'impact',
      title: 'Tác động cộng đồng',
      value: analyticsData.overview.communityImpact,
      change: +7.2,
      format: 'percentage',
      icon: Heart,
      colorClass: 'text-red-500'
    }
  ];

  // -------------------------
  // Helpers
  // -------------------------
  const formatValue = (value, format = 'number', suffix = '') => {
    if (value === null || value === undefined) return '-';
    switch (format) {
      case 'number':
        return Number(value).toLocaleString('vi-VN') + suffix;
      case 'decimal':
        return Number(value).toFixed(1) + suffix;
      case 'percentage':
        return Number(value).toFixed(1) + '%';
      case 'currency':
        return Number(value).toLocaleString('vi-VN') + ' VNĐ';
      default:
        return String(value) + suffix;
    }
  };

  const getChangeColor = (change) => (change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600');
  const getChangeIcon = (change) => (change > 0 ? ArrowUpRight : change < 0 ? ArrowDownRight : Minus);

  // export CSV (generic)
  const exportCSV = (filename = 'analytics.csv', rows = []) => {
    if (!rows || rows.length === 0) {
      alert('Không có dữ liệu để xuất.');
      return;
    }
    const header = Object.keys(rows[0]);
    const csv = [
      header.join(','),
      ...rows.map(r => header.map(h => {
        const cell = r[h] === null || r[h] === undefined ? '' : String(r[h]).replace(/"/g, '""');
        return `"${cell}"`;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // select series to render based on selectedMetric
  const seriesToRender = useMemo(() => {
    const base = analyticsData.timeSeriesData;
    if (selectedMetric === 'events') {
      return { left: { key: 'events', label: 'Sự kiện' }, right: null, data: base };
    }
    if (selectedMetric === 'volunteers') {
      return { left: null, right: { key: 'volunteers', label: 'TNV' }, data: base };
    }
    if (selectedMetric === 'rating') {
      return { left: null, right: { key: 'rating', label: 'Đánh giá' }, data: base };
    }
    // default show events (bar) + volunteers (line)
    return { left: { key: 'events', label: 'Sự kiện' }, right: { key: 'volunteers', label: 'TNV' }, data: base };
  }, [selectedMetric, analyticsData]);

  // Filtered category breakdown (if category selected)
  const filteredCategoryBreakdown = useMemo(() => {
    if (selectedCategory === 'all') return analyticsData.categoryBreakdown;
    return analyticsData.categoryBreakdown.filter(c => c.category === selectedCategory);
  }, [selectedCategory, analyticsData]);

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Phân tích dữ liệu sự kiện</h1>
            <p className="text-gray-600 mt-1">Thống kê toàn diện & insights — điều chỉnh thời gian, danh mục và chỉ số</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {timeRanges.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Tất cả danh mục</option>
              {analyticsData.categoryBreakdown.map((c) => (
                <option key={c.category} value={c.category}>{c.category}</option>
              ))}
            </select>

            <button
              onClick={() => exportCSV('timeSeries.csv', analyticsData.timeSeriesData)}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              title="Export time series CSV"
            >
              <Download className="w-4 h-4" /> Xuất CSV
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {kpis.map(kpi => {
            const Icon = kpi.icon;
            const ChangeIcon = getChangeIcon(kpi.change);
            const isActive = activeKPI === kpi.id;
            return (
              <div
                key={kpi.id}
                onClick={() => setActiveKPI(isActive ? null : kpi.id)}
                className={`bg-white rounded-xl p-5 shadow-sm border ${isActive ? 'border-blue-400 bg-blue-50' : 'border-gray-200'} cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{formatValue(kpi.value, kpi.format, kpi.suffix || '')}</p>
                    <div className={`flex items-center gap-1 mt-1 text-sm ${getChangeColor(kpi.change)}`}>
                      <ChangeIcon className="w-4 h-4" />
                      <span>{Math.abs(kpi.change)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className={`${kpi.colorClass} w-10 h-10`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Time series (big) */}
          <div className="xl:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Xu hướng theo thời gian</h3>
              <div className="flex items-center gap-2">
                <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)} className="px-3 py-1 border rounded text-sm">
                  <option value="all">Tất cả</option>
                  <option value="events">Sự kiện</option>
                  <option value="volunteers">Tình nguyện viên</option>
                  <option value="rating">Đánh giá</option>
                  <option value="completion">Hoàn thành</option>
                </select>
                <button
                  onClick={() => setComparisonMode(!comparisonMode)}
                  className={`px-3 py-1 rounded text-sm ${comparisonMode ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                >
                  So sánh
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={360}>
              <ComposedChart data={seriesToRender.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value, name) => {
                  if (name === 'events' || name === 'volunteers' || name === 'hours' || name === 'budget') return [formatValue(value, 'number'), name];
                  if (name === 'rating') return [formatValue(value, 'decimal'), name];
                  return [value, name];
                }} />
                <Legend />
                {/* Bars / Lines depending on seriesToRender */}
                {seriesToRender.left && <Bar yAxisId="left" dataKey={seriesToRender.left.key} name={seriesToRender.left.label} fill="#3b82f6" />}
                {seriesToRender.right && <Line yAxisId="right" type="monotone" dataKey={seriesToRender.right.key} name={seriesToRender.right.label} stroke="#10b981" strokeWidth={3} />}
                {/* If comparison mode: overlay a second metric (budget) */}
                {comparisonMode && <Line yAxisId="right" type="monotone" dataKey="budget" name="Ngân sách" stroke="#f59e0b" strokeWidth={2} />}
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Category breakdown pie */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Phân bố theo danh mục</h3>
            <ResponsiveContainer width="100%" height={360}>
              <RechartsPieChart>
                <Pie
                  data={filteredCategoryBreakdown}
                  dataKey="events"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={(entry) => `${entry.category} (${entry.events})`}
                >
                  {filteredCategoryBreakdown.map((entry, idx) => <Cell key={`c-${idx}`} fill={entry.color || COLORS[idx % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} sự kiện`, props.payload.category]} />
              </RechartsPieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2">
              {analyticsData.categoryBreakdown.map((c, idx) => (
                <div key={c.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div style={{ background: c.color }} className="w-3 h-3 rounded-full" />
                    <div>
                      <div className="text-sm font-medium">{c.category}</div>
                      <div className="text-xs text-gray-500">TNV: {c.volunteers.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{c.events} sự kiện</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic & Top Organizers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Hiệu suất theo khu vực</h3>
            <ResponsiveContainer width="100%" height={260}>
              <RechartsBarChart data={analyticsData.geographicData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="region" type="category" width={140} />
                <Tooltip formatter={(v) => formatValue(v, 'number')} />
                <Bar dataKey="events" name="Sự kiện" fill="#3b82f6" />
              </RechartsBarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">Budget shown for reference in hover tooltip.</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Tổ chức hàng đầu</h3>
            <div className="space-y-3">
              {analyticsData.organizerPerformance.map((org, idx) => (
                <div key={org.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold ${idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-blue-500'}`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-medium">{org.name}</div>
                      <div className="text-xs text-gray-500">{org.events} sự kiện • {org.volunteers} TNV</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <div className="font-semibold">{org.rating}</div>
                    </div>
                    <div className="text-sm text-gray-500">{org.completion}% hoàn thành</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Phân bố độ tuổi</h3>
            <ResponsiveContainer width="100%" height={160}>
              <RechartsBarChart data={analyticsData.volunteerDemographics.ageGroups}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Phân bố giới tính</h3>
            <ResponsiveContainer width="100%" height={160}>
              <RechartsPieChart>
                <Pie
                  data={analyticsData.volunteerDemographics.genderDistribution}
                  dataKey="count"
                  nameKey="gender"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label={(entry) => `${entry.gender} (${entry.percentage}%)`}
                >
                  {analyticsData.volunteerDemographics.genderDistribution.map((d, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Kinh nghiệm</h3>
            <div className="space-y-3">
              {analyticsData.volunteerDemographics.experienceLevel.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{e.level}</span>
                    <span className="font-medium">{e.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="h-2 rounded-full bg-blue-600" style={{ width: `${e.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Financial & Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Phân tích ngân sách</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded text-center">
                <p className="text-sm text-gray-600">Tổng ngân sách</p>
                <p className="text-xl font-semibold text-blue-600">{formatValue(analyticsData.financialData.totalBudget, 'currency')}</p>
              </div>
              <div className="p-3 bg-green-50 rounded text-center">
                <p className="text-sm text-gray-600">Chi phí / TNV</p>
                <p className="text-xl font-semibold text-green-600">{formatValue(analyticsData.financialData.costPerVolunteer, 'currency')}</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsBarChart data={analyticsData.financialData.budgetByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-30} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip formatter={(v) => formatValue(v, 'currency')} />
                <Bar dataKey="budget" fill="#3b82f6" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Chỉ số tương tác</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded text-center">
                <p className="text-2xl font-bold text-blue-600">{analyticsData.engagement.repeatVolunteerRate}%</p>
                <p className="text-sm text-gray-600">TNV quay lại</p>
              </div>
              <div className="p-4 border rounded text-center">
                <p className="text-2xl font-bold text-green-600">{analyticsData.engagement.avgEventsPerVolunteer}</p>
                <p className="text-sm text-gray-600">SK/TNV trung bình</p>
              </div>
              <div className="p-4 border rounded text-center">
                <p className="text-2xl font-bold text-purple-600">{analyticsData.engagement.socialMediaReach.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Tiếp cận MXH</p>
              </div>
              <div className="p-4 border rounded text-center">
                <p className="text-2xl font-bold text-orange-600">{analyticsData.engagement.retentionRate}%</p>
                <p className="text-sm text-gray-600">Tỷ lệ giữ chân</p>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Dự báo & Risk Insights</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded border border-blue-100">
              <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-blue-600" /><h4 className="font-semibold">Tháng tới</h4></div>
              <p className="text-sm text-blue-700">Sự kiện: <strong>{analyticsData.predictiveMetrics.nextMonthForecast.events}</strong></p>
              <p className="text-sm text-blue-700">TNV: <strong>{analyticsData.predictiveMetrics.nextMonthForecast.volunteers}</strong></p>
              <p className="text-xs text-blue-600">Độ tin cậy: {analyticsData.predictiveMetrics.nextMonthForecast.confidence}%</p>
            </div>
            <div className="p-4 bg-green-50 rounded border border-green-100">
              <div className="flex items-center gap-2 mb-2"><Activity className="w-5 h-5 text-green-600" /><h4 className="font-semibold">Trending</h4></div>
              <p className="text-sm">{analyticsData.predictiveMetrics.trendingCategories.join(', ')}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded border border-yellow-100">
              <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5 text-yellow-600" /><h4 className="font-semibold">Risk Factors</h4></div>
              <ul className="text-sm">
                {analyticsData.predictiveMetrics.riskFactors.map((r, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{r.factor}</span>
                    <span className="font-medium">{Math.round(r.probability * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="h-24" />
      </div>
    </div>
  );
}
