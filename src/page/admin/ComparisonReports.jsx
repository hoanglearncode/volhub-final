import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Calendar,
  MapPin,
  Users,
  Clock,
  Target,
  Award,
  Building2,
  Activity,
  Percent,
  DollarSign,
  Star,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Minus,
  Check,
  AlertCircle,
  Info
} from 'lucide-react';

// ComparisonReports.jsx
// - Self-contained React component (Tailwind CSS classes used)
// - Dependencies: react, lucide-react, tailwindcss (or similar utility CSS)

const ComparisonReports = () => {
  const [comparisonType, setComparisonType] = useState('time');
  const [selectedPeriods, setSelectedPeriods] = useState(['current', 'previous']);
  const [selectedRegions, setSelectedRegions] = useState(['hanoi', 'hcmc']);
  const [selectedCategories, setSelectedCategories] = useState(['education', 'environment']);
  const [selectedMetrics, setSelectedMetrics] = useState(['volunteers', 'events', 'hours', 'satisfaction']);
  const [showFilters, setShowFilters] = useState(false);

  // Mock comparison data
  const timeComparisonData = {
    current: {
      label: 'Tháng này',
      period: 'Tháng 9/2025',
      volunteers: 12847,
      events: 234,
      hours: 15678,
      satisfaction: 4.6,
      completion: 87.4,
      partners: 456,
      newSignups: 1723,
      retention: 72.3
    },
    previous: {
      label: 'Tháng trước',
      period: 'Tháng 8/2025',
      volunteers: 10892,
      events: 198,
      hours: 12456,
      satisfaction: 4.4,
      completion: 84.2,
      partners: 421,
      newSignups: 1456,
      retention: 69.8
    },
    lastYear: {
      label: 'Cùng kỳ năm trước',
      period: 'Tháng 9/2024',
      volunteers: 8934,
      events: 167,
      hours: 9876,
      satisfaction: 4.2,
      completion: 79.5,
      partners: 312,
      newSignups: 1234,
      retention: 65.2
    }
  };

  const regionComparisonData = {
    hanoi: {
      label: 'Hà Nội',
      volunteers: 4521,
      events: 89,
      hours: 6234,
      satisfaction: 4.7,
      completion: 89.2,
      avgAge: 26.5,
      topCategory: 'Giáo dục'
    },
    hcmc: {
      label: 'TP.HCM',
      volunteers: 4896,
      events: 95,
      hours: 6789,
      satisfaction: 4.5,
      completion: 86.8,
      avgAge: 28.2,
      topCategory: 'Môi trường'
    },
    danang: {
      label: 'Đà Nẵng',
      volunteers: 1542,
      events: 32,
      hours: 2145,
      satisfaction: 4.8,
      completion: 91.5,
      avgAge: 25.8,
      topCategory: 'Y tế'
    },
    cantho: {
      label: 'Cần Thơ',
      volunteers: 1028,
      events: 24,
      hours: 1456,
      satisfaction: 4.4,
      completion: 83.7,
      avgAge: 29.1,
      topCategory: 'Xã hội'
    }
  };

  const categoryComparisonData = {
    education: {
      label: 'Giáo dục',
      volunteers: 2847,
      events: 75,
      hours: 4567,
      satisfaction: 4.8,
      completion: 92.1,
      avgDuration: 6.2,
      growth: 18.5
    },
    environment: {
      label: 'Môi trường',
      volunteers: 2341,
      events: 65,
      hours: 3892,
      satisfaction: 4.5,
      completion: 88.9,
      avgDuration: 5.8,
      growth: 22.3
    },
    healthcare: {
      label: 'Y tế',
      volunteers: 1923,
      events: 48,
      hours: 3234,
      satisfaction: 4.7,
      completion: 86.5,
      avgDuration: 6.8,
      growth: 15.7
    },
    social: {
      label: 'Xã hội',
      volunteers: 1756,
      events: 42,
      hours: 2987,
      satisfaction: 4.4,
      completion: 84.2,
      avgDuration: 7.1,
      growth: 12.4
    }
  };

  const comparisonTypes = [
    { id: 'time', label: 'So sánh thời gian', icon: Calendar },
    { id: 'region', label: 'So sánh khu vực', icon: MapPin },
    { id: 'category', label: 'So sánh danh mục', icon: Target },
    { id: 'partner', label: 'So sánh đối tác', icon: Building2 }
  ];

  const metrics = [
    { id: 'volunteers', label: 'Tình nguyện viên', icon: Users, format: 'number' },
    { id: 'events', label: 'Sự kiện', icon: Calendar, format: 'number' },
    { id: 'hours', label: 'Giờ công', icon: Clock, format: 'number' },
    { id: 'satisfaction', label: 'Hài lòng', icon: Star, format: 'rating' },
    { id: 'completion', label: 'Hoàn thành', icon: Target, format: 'percent' },
    { id: 'retention', label: 'Giữ chân', icon: Activity, format: 'percent' }
  ];

  const formatValue = (value, format) => {
    if (value === undefined || value === null) return '-';
    switch (format) {
      case 'number':
        return Number(value).toLocaleString();
      case 'percent':
        return `${Number(value).toFixed(1)}%`;
      case 'rating':
        return `${Number(value).toFixed(1)}/5`;
      default:
        return String(value);
    }
  };

  const calculateChange = (current, previous) => {
    if (previous === undefined || previous === null || previous === 0) return { value: '0.0', type: 'neutral' };
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      type: change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral'
    };
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'negative':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  /* Subcomponents */
  const TimeComparisonTable = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">So sánh chi tiết theo thời gian</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chỉ số</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Tháng này</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Tháng trước</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thay đổi</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Cùng kỳ năm trước</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">YoY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {metrics.filter(m => selectedMetrics.includes(m.id)).map(metric => {
              const current = timeComparisonData.current[metric.id];
              const previous = timeComparisonData.previous[metric.id];
              const lastYear = timeComparisonData.lastYear[metric.id];
              const momChange = calculateChange(current, previous);
              const yoyChange = calculateChange(current, lastYear);

              const Icon = metric.icon;

              return (
                <tr key={metric.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{metric.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">
                    {formatValue(current, metric.format)}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {formatValue(previous, metric.format)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getChangeColor(momChange.type)}`}>
                      {getChangeIcon(momChange.type)}
                      <span>{momChange.value}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {formatValue(lastYear, metric.format)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getChangeColor(yoyChange.type)}`}>
                      {getChangeIcon(yoyChange.type)}
                      <span>{yoyChange.value}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const RegionComparisonChart = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">So sánh hiệu suất theo khu vực</h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {metrics.filter(m => selectedMetrics.includes(m.id) && m.id !== 'retention').map(metric => {
            const Icon = metric.icon;
            return (
              <div key={metric.id}>
                <div className="flex items-center space-x-2 mb-3">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{metric.label}</span>
                </div>
                <div className="space-y-2">
                  {selectedRegions.map(regionId => {
                    const region = regionComparisonData[regionId];
                    const value = region ? region[metric.id] : 0;
                    const maxValue = Math.max(...Object.values(regionComparisonData).map(r => r[metric.id] || 0));
                    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

                    return (
                      <div key={regionId} className="flex items-center space-x-3">
                        <div className="w-20 text-sm font-medium text-gray-700">{region ? region.label : regionId}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div
                            className="bg-blue-500 h-6 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                            {formatValue(value, metric.format)}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 w-16 text-right">{percentage.toFixed(0)}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const CategoryPerformanceMatrix = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Ma trận hiệu suất danh mục</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedCategories.map(categoryId => {
            const category = categoryComparisonData[categoryId];
            if (!category) return null;
            return (
              <div key={categoryId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">{category.label}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.growth > 20 ? 'bg-green-100 text-green-800' :
                    category.growth > 15 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    +{category.growth}% tăng trưởng
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">{category.volunteers.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">TNV</div>
                  </div>

                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">{category.events}</div>
                    <div className="text-xs text-gray-600">Sự kiện</div>
                  </div>

                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">{category.hours.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Giờ công</div>
                  </div>

                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">{category.satisfaction}/5</div>
                    <div className="text-xs text-gray-600">Hài lòng</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tỷ lệ hoàn thành</span>
                    <span className="font-medium">{category.completion}%</span>
                  </div>
                  <div className="mt-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.completion}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const InsightsSummary = () => {
    const insights = [
      {
        type: 'positive',
        icon: TrendingUp,
        title: 'Tăng trưởng mạnh',
        description: 'Số lượng TNV tăng 18% so với tháng trước, cao nhất trong 6 tháng qua.'
      },
      {
        type: 'warning',
        icon: AlertCircle,
        title: 'Cần chú ý',
        description: 'Tỷ lệ hoàn thành sự kiện tại TP.HCM thấp hơn 4% so với Hà Nội.'
      },
      {
        type: 'info',
        icon: Info,
        title: 'Xu hướng',
        description: 'Danh mục Môi trường có tốc độ tăng trưởng nhanh nhất (22.3%).'
      },
      {
        type: 'positive',
        icon: Award,
        title: 'Thành tích',
        description: 'Điểm hài lòng trung bình đạt 4.6/5, tăng 0.2 điểm so với cùng kỳ.'
      }
    ];

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Tổng hợp nhận xét</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  insight.type === 'positive' ? 'bg-green-50 border-green-400' :
                  insight.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-start space-x-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${
                      insight.type === 'positive' ? 'text-green-600' :
                      insight.type === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                    <div>
                      <h4 className={`font-medium ${
                        insight.type === 'positive' ? 'text-green-900' :
                        insight.type === 'warning' ? 'text-yellow-900' :
                        'text-blue-900'
                      }`}>
                        {insight.title}
                      </h4>
                      <p className={`text-sm mt-1 ${
                        insight.type === 'positive' ? 'text-green-700' :
                        insight.type === 'warning' ? 'text-yellow-700' :
                        'text-blue-700'
                      }`}>
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
          <h1 className="text-2xl font-bold text-gray-900">Báo cáo so sánh</h1>
          <p className="text-gray-600 mt-1">So sánh và phân tích hiệu suất theo nhiều tiêu chí khác nhau</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>Bộ lọc</span>
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            <span>Làm mới</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Comparison Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại so sánh</label>
              <div className="space-y-2">
                {comparisonTypes.map(type => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setComparisonType(type.id)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm ${
                        comparisonType === type.id
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Periods (if time comparison) */}
            {comparisonType === 'time' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng thời gian</label>
                <div className="space-y-2">
                  {Object.entries(timeComparisonData).map(([key, period]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedPeriods.includes(key)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedPeriods(prev => [...prev, key]);
                          else setSelectedPeriods(prev => prev.filter(p => p !== key));
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{period.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Regions (if region comparison) */}
            {comparisonType === 'region' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Khu vực</label>
                <div className="space-y-2">
                  {Object.entries(regionComparisonData).map(([key, region]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedRegions.includes(key)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedRegions(prev => [...prev, key]);
                          else setSelectedRegions(prev => prev.filter(r => r !== key));
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{region.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Categories (if category comparison) */}
            {comparisonType === 'category' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                <div className="space-y-2">
                  {Object.entries(categoryComparisonData).map(([key, category]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(key)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedCategories(prev => [...prev, key]);
                          else setSelectedCategories(prev => prev.filter(c => c !== key));
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Metrics */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chỉ số</label>
              <div className="space-y-2">
                {metrics.map(metric => {
                  const Icon = metric.icon;
                  return (
                    <label key={metric.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(metric.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedMetrics(prev => [...prev, metric.id]);
                          else setSelectedMetrics(prev => prev.filter(m => m !== metric.id));
                        }}
                        className="rounded border-gray-300"
                      />
                      <Icon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{metric.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6">
        {/* Insights Summary */}
        <InsightsSummary />

        {/* Time Comparison */}
        {comparisonType === 'time' && (
          <div className="space-y-6">
            <TimeComparisonTable />

            {/* Time Trend Visualization */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng theo thời gian</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Biểu đồ xu hướng các chỉ số theo thời gian</p>
                  <p className="text-sm text-gray-400 mt-1">Hiển thị sự thay đổi của {selectedMetrics.length} chỉ số được chọn</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Region Comparison */}
        {comparisonType === 'region' && (
          <div className="space-y-6">
            <RegionComparisonChart />

            {/* Regional Performance Heatmap */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bản đồ nhiệt hiệu suất khu vực</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-900">Khu vực</th>
                      {metrics.filter(m => selectedMetrics.includes(m.id)).map(metric => (
                        <th key={metric.id} className="text-center p-3 font-medium text-gray-900">
                          <div className="flex items-center justify-center space-x-1">
                            <metric.icon className="w-4 h-4" />
                            <span>{metric.label}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRegions.map(regionId => {
                      const region = regionComparisonData[regionId];
                      return (
                        <tr key={regionId} className="border-t">
                          <td className="p-3 font-medium text-gray-900">{region ? region.label : regionId}</td>
                          {metrics.filter(m => selectedMetrics.includes(m.id)).map(metric => {
                            const value = region ? region[metric.id] : 0;
                            const allValues = selectedRegions.map(r => (regionComparisonData[r] ? regionComparisonData[r][metric.id] : 0));
                            const max = Math.max(...allValues);
                            const min = Math.min(...allValues);
                            const intensity = max === min ? 0.5 : (value - min) / (max - min);

                            return (
                              <td key={metric.id} className="p-3 text-center">
                                <div
                                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                                  style={{
                                    backgroundColor: `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`
                                  }}
                                >
                                  {formatValue(value, metric.format)}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Category Comparison */}
        {comparisonType === 'category' && (
          <div className="space-y-6">
            <CategoryPerformanceMatrix />

            {/* Category Rankings */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Xếp hạng danh mục</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {metrics.filter(m => selectedMetrics.includes(m.id) && m.id !== 'retention').map(metric => {
                    const rankedCategories = selectedCategories
                      .map(catId => ({ id: catId, ...(categoryComparisonData[catId] || {}) }))
                      .sort((a, b) => (b[metric.id] || 0) - (a[metric.id] || 0));

                    const Icon = metric.icon;

                    return (
                      <div key={metric.id}>
                        <div className="flex items-center space-x-2 mb-4">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <h4 className="font-medium text-gray-900">Top {metric.label}</h4>
                        </div>
                        <div className="space-y-2">
                          {rankedCategories.map((category, index) => (
                            <div key={category.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                                index === 0 ? 'bg-yellow-500' :
                                index === 1 ? 'bg-gray-400' :
                                index === 2 ? 'bg-orange-600' :
                                'bg-gray-300'
                              }`}>
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{category.label}</div>
                                <div className="text-sm text-gray-600">{formatValue(category[metric.id], metric.format)}</div>
                              </div>
                              {index === 0 && <Award className="w-5 h-5 text-yellow-500" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Partner Comparison */}
        {comparisonType === 'partner' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">So sánh đối tác</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Biểu đồ so sánh hiệu suất đối tác</p>
                  <p className="text-sm text-gray-400 mt-1">Phân tích theo tier, số sự kiện và mức độ hài lòng</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Analysis */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Phân tích chi tiết</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Findings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Phát hiện chính</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tăng trưởng ổn định</p>
                      <p className="text-xs text-gray-600">Tất cả các chỉ số đều có xu hướng tích cực trong 3 tháng qua</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Chênh lệch khu vực</p>
                      <p className="text-xs text-gray-600">Hiệu suất giữa các khu vực có sự khác biệt đáng kể</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Danh mục tiềm năng</p>
                      <p className="text-xs text-gray-600">Môi trường và Y tế có tốc độ tăng trưởng cao nhất</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Khuyến nghị</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm font-medium text-blue-900">Mở rộng hoạt động</p>
                    <p className="text-xs text-blue-700 mt-1">Tập trung đầu tư vào danh mục Môi trường tại khu vực có tiềm năng</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-sm font-medium text-yellow-900">Cải thiện chất lượng</p>
                    <p className="text-xs text-yellow-700 mt-1">Nâng cao tỷ lệ hoàn thành sự kiện tại các khu vực có hiệu suất thấp</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <p className="text-sm font-medium text-green-900">Duy trì momentum</p>
                    <p className="text-xs text-green-700 mt-1">Tiếp tục các chiến lược hiệu quả để duy trì tăng trưởng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Xuất báo cáo so sánh</h4>
                <p className="text-sm text-blue-700">
                  Bao gồm {selectedMetrics.length} chỉ số, {
                    comparisonType === 'time' ? selectedPeriods.length + ' khoảng thời gian' :
                    comparisonType === 'region' ? selectedRegions.length + ' khu vực' :
                    comparisonType === 'category' ? selectedCategories.length + ' danh mục' :
                    'dữ liệu đối tác'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 text-blue-700 bg-white border border-blue-300 rounded-lg hover:bg-blue-50">Xem trước</button>
              <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Tải xuống PDF</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComparisonReports;
