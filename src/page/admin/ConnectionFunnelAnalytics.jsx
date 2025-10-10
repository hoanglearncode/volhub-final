import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Users,
  UserPlus,
  UserCheck,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ArrowDown,
  Funnel,
  Target,
  Activity,
  Mail,
  Phone,
  MessageSquare,
  Star,
  Award,
  AlertTriangle,
  Info,
  Filter,
  Download,
  RefreshCw,
  ChevronRight,
  Eye,
  MousePointer,
  UserX,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Percent
} from 'lucide-react';

/*
  ConnectionFunnelAnalytics.Manager.jsx
  - Complete, self-contained React component with mock data + UI
  - Requirements: react, lucide-react, tailwindcss (or compatible utility classes)
  - Drop into a React app and import: `import ConnectionFunnelAnalytics from './ConnectionFunnelAnalytics.Manager';`
*/

const STORAGE_KEY = 'funnel_analytics_prefs_v1';

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function ConnectionFunnelAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)).timeRange : '30days'; } catch { return '30days'; }
  });
  const [selectedFunnel, setSelectedFunnel] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)).funnel : 'registration'; } catch { return 'registration'; }
  });
  const [selectedSegment, setSelectedSegment] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)).segment : 'all'; } catch { return 'all'; }
  });
  const [showDetails, setShowDetails] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)).showDetails : false; } catch { return false; }
  });
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 250);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data (complete)
  const _mockFunnelData = {
    registration: {
      title: 'Luồng đăng ký tình nguyện viên',
      stages: [
        { id: 'visit', name: 'Truy cập website', count: 25840, percentage: 100, icon: Eye, color: 'bg-blue-500', dropoff: 0, avgTime: '2m 34s', sources: ['Organic Search', 'Social Media', 'Direct', 'Referral'] },
        { id: 'signup_start', name: 'Bắt đầu đăng ký', count: 8947, percentage: 34.6, icon: UserPlus, color: 'bg-green-500', dropoff: 65.4, avgTime: '4m 12s', abandonment: ['Form quá dài','Thiếu thông tin','Lỗi kỹ thuật'] },
        { id: 'info_complete', name: 'Hoàn thành thông tin', count: 6234, percentage: 24.1, icon: UserCheck, color: 'bg-yellow-500', dropoff: 30.3, avgTime: '6m 45s', barriers: ['Xác minh email','Upload tài liệu','Chọn lĩnh vực'] },
        { id: 'verification', name: 'Xác minh tài khoản', count: 4567, percentage: 17.7, icon: CheckCircle, color: 'bg-purple-500', dropoff: 26.7, avgTime: '12h 30m', methods: ['Email','SMS','Phone call'] },
        { id: 'profile_setup', name: 'Thiết lập hồ sơ', count: 3892, percentage: 15.1, icon: Users, color: 'bg-indigo-500', dropoff: 14.8, avgTime: '8m 20s', completion: ['Ảnh đại diện','Kỹ năng','Kinh nghiệm','Sở thích'] },
        { id: 'activated', name: 'Kích hoạt thành công', count: 3245, percentage: 12.6, icon: Star, color: 'bg-pink-500', dropoff: 16.6, avgTime: '15m 10s', engagement: 'Tham gia nhóm, Follow sự kiện' }
      ],
      totalConversion: 12.6,
      avgTimeToConvert: '2.3 ngày',
      topExitPoints: ['Bắt đầu đăng ký','Hoàn thành thông tin','Xác minh tài khoản']
    },
    engagement: {
      title: 'Luồng tương tác với sự kiện',
      stages: [
        { id: 'browse_events', name: 'Duyệt sự kiện', count: 15670, percentage: 100, icon: Eye, color: 'bg-blue-500', dropoff: 0, avgTime: '3m 45s', categories: ['Giáo dục','Môi trường','Y tế','Xã hội'] },
        { id: 'event_detail', name: 'Xem chi tiết sự kiện', count: 9423, percentage: 60.1, icon: MousePointer, color: 'bg-green-500', dropoff: 39.9, avgTime: '5m 20s', interactions: ['Like','Share','Save','Comment'] },
        { id: 'register_intent', name: 'Bắt đầu đăng ký', count: 5876, percentage: 37.5, icon: Calendar, color: 'bg-yellow-500', dropoff: 37.6, avgTime: '2m 10s', hesitation: ['Thời gian','Địa điểm','Yêu cầu','Cam kết'] },
        { id: 'registration_complete', name: 'Hoàn tất đăng ký', count: 4234, percentage: 27.0, icon: CheckCircle, color: 'bg-purple-500', dropoff: 27.9, avgTime: '4m 30s', requirements: ['Xác nhận lịch','Đọc hướng dẫn','Ký cam kết'] },
        { id: 'confirmation', name: 'Xác nhận tham gia', count: 3789, percentage: 24.2, icon: UserCheck, color: 'bg-indigo-500', dropoff: 10.5, avgTime: '24h', confirmations: ['Email','SMS','App notification'] },
        { id: 'attendance', name: 'Tham dự thực tế', count: 3312, percentage: 21.1, icon: Award, color: 'bg-pink-500', dropoff: 12.6, showUpRate: 87.4, noShowReasons: ['Bận đột xuất','Ốm','Quên','Thời tiết'] }
      ],
      totalConversion: 21.1,
      avgTimeToConvert: '4.2 ngày',
      topExitPoints: ['Duyệt sự kiện','Bắt đầu đăng ký','Tham dự thực tế']
    },
    retention: {
      title: 'Luồng giữ chân tình nguyện viên',
      stages: [
        { id: 'first_event', name: 'Sự kiện đầu tiên', count: 3312, percentage: 100, icon: Award, color: 'bg-blue-500', dropoff: 0, satisfaction: 4.3, feedback: 'Tích cực' },
        { id: 'feedback_given', name: 'Đánh giá sự kiện', count: 2456, percentage: 74.1, icon: Star, color: 'bg-green-500', dropoff: 25.9, avgRating: 4.2 },
        { id: 'second_signup', name: 'Đăng ký sự kiện thứ 2', count: 1987, percentage: 60.0, icon: Calendar, color: 'bg-yellow-500', dropoff: 19.1 },
        { id: 'regular_volunteer', name: 'TNV thường xuyên (3+ sự kiện)', count: 1234, percentage: 37.3, icon: Users, color: 'bg-purple-500', dropoff: 37.9 },
        { id: 'ambassador', name: 'Đại sứ/Leader', count: 456, percentage: 13.8, icon: Target, color: 'bg-indigo-500', dropoff: 63.0 },
        { id: 'long_term', name: 'TNV lâu dài (6+ tháng)', count: 287, percentage: 8.7, icon: Zap, color: 'bg-pink-500', dropoff: 37.1 }
      ],
      totalConversion: 8.7,
      avgTimeToConvert: '8.5 tháng',
      topExitPoints: ['Đăng ký sự kiện thứ 2','TNV thường xuyên','Đại sứ/Leader']
    }
  };

  const _mockSegmentData = {
    all: { label: 'Tất cả', count: 25840 },
    age_18_25: { label: '18-25 tuổi', count: 11628, conversion: 14.2 },
    age_26_35: { label: '26-35 tuổi', count: 8270, conversion: 11.8 },
    age_36_plus: { label: '36+ tuổi', count: 5942, conversion: 10.5 },
    female: { label: 'Nữ', count: 14987, conversion: 13.5 },
    male: { label: 'Nam', count: 10853, conversion: 11.2 },
    hanoi: { label: 'Hà Nội', count: 9036, conversion: 13.8 },
    hcmc: { label: 'TP.HCM', count: 10334, conversion: 12.1 },
    mobile: { label: 'Mobile', count: 18088, conversion: 11.9 },
    desktop: { label: 'Desktop', count: 7752, conversion: 14.3 }
  };

  // Load mock data on mount
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => {
      setData(_mockFunnelData);
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  // persist prefs
  useEffect(() => {
    const obj = { timeRange: selectedTimeRange, funnel: selectedFunnel, segment: selectedSegment, showDetails };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); } catch (e) { /* ignore */ }
  }, [selectedTimeRange, selectedFunnel, selectedSegment, showDetails]);

  const funnelTypes = [
    { id: 'registration', label: 'Đăng ký TNV', icon: UserPlus },
    { id: 'engagement', label: 'Tương tác sự kiện', icon: Calendar },
    { id: 'retention', label: 'Giữ chân TNV', icon: Users }
  ];

  const funnel = data ? data[selectedFunnel] : null;

  const bottlenecks = useMemo(() => {
    if (!funnel) return [];
    return funnel.stages
      .map((s, i) => ({ ...s, index: i, prev: funnel.stages[i - 1] || null, dropoffRate: i > 0 ? ((funnel.stages[i - 1].count - s.count) / funnel.stages[i - 1].count) * 100 : 0 }))
      .filter(s => s.dropoffRate > 0)
      .sort((a, b) => b.dropoffRate - a.dropoffRate)
      .slice(0, 5);
  }, [funnel]);

  const summary = useMemo(() => {
    if (!funnel) return {};
    return { totalConversion: funnel.totalConversion, avgTimeToConvert: funnel.avgTimeToConvert, entryCount: funnel.stages[0]?.count || 0, finalCount: funnel.stages[funnel.stages.length - 1]?.count || 0 };
  }, [funnel]);

  const visibleStages = useMemo(() => {
    if (!funnel) return [];
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return funnel.stages;
    return funnel.stages.filter(s => (`${s.name} ${s.id} ${s.barriers ?? ''} ${s.abandonment ?? ''}`).toLowerCase().includes(q));
  }, [funnel, debouncedQuery]);

  const exportCSV = useCallback(() => {
    if (!funnel) return;
    const rows = [['stage_id','stage_name','count','percentage','dropoff','avgTime'].join(',')];
    funnel.stages.forEach(s => rows.push([s.id, `"${s.name.replace(/\"/g,'\\"') }"`, s.count, s.percentage, s.dropoff ?? '', s.avgTime ?? ''].join(',')));
    const csv = rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${selectedFunnel}_funnel_${selectedTimeRange}.csv`; a.click(); URL.revokeObjectURL(url);
  }, [funnel, selectedFunnel, selectedTimeRange]);

  const copySummaryToClipboard = useCallback(async () => {
    if (!funnel) return;
    const text = `Funnel: ${funnel.title}\nRange: ${selectedTimeRange}\nConversion: ${funnel.totalConversion}%\nEntry: ${summary.entryCount.toLocaleString()}\nFinal: ${summary.finalCount.toLocaleString()}`;
    try { await navigator.clipboard.writeText(text); } catch (e) { /* ignore */ }
  }, [funnel, selectedTimeRange, summary]);

  const FunnelPicker = () => (
    <div className="flex items-center space-x-2 flex-wrap">
      {funnelTypes.map(ft => (
        <button key={ft.id} onClick={() => setSelectedFunnel(ft.id)} className={`px-3 py-2 rounded-md text-sm border ${selectedFunnel === ft.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}>
          {ft.label}
        </button>
      ))}
    </div>
  );

  const StageCard = ({ stage, index }) => {
    const Icon = stage.icon || Eye;
    const next = funnel?.stages[index + 1];
    const conversionToNext = next ? ((next.count / stage.count) * 100).toFixed(1) : null;

    return (
      <div className="relative">
        <div className="bg-white border rounded-lg p-4 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full text-white ${stage.color || 'bg-gray-600'}`}><Icon className="w-5 h-5" /></div>
              <div>
                <div className="font-medium text-gray-900">{stage.name}</div>
                <div className="text-xs text-gray-500">Bước {index + 1} / {funnel.stages.length}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{stage.count.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{stage.percentage}%</div>
            </div>
          </div>

          {showDetails && (
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              {stage.avgTime && <div><Clock className="inline-block w-4 h-4 mr-1 text-gray-500" /> Thời gian TB: <strong>{stage.avgTime}</strong></div>}
              {stage.dropoff !== undefined && <div><ArrowDown className="inline-block w-4 h-4 mr-1 text-red-500" /> Rời bỏ: <strong>{stage.dropoff}%</strong></div>}
              {stage.satisfaction && <div><Star className="inline-block w-4 h-4 mr-1 text-yellow-500" /> Hài lòng: <strong>{stage.satisfaction}/5</strong></div>}
              {stage.noShowReasons && <div>Nguyên nhân no-show: <em>{stage.noShowReasons.join(', ')}</em></div>}
            </div>
          )}

          <div className="mt-4">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className={`h-2 rounded-full ${stage.color || 'bg-gray-600'}`} style={{ width: `${stage.percentage}%` }} />
            </div>
            {next && <div className="mt-2 text-xs text-gray-600">Chuyển sang bước tiếp: <strong>{conversionToNext}%</strong></div>}
          </div>
        </div>

        {!((index + 1) === funnel.stages.length) && (
          <div className="flex items-center justify-center my-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full">
              <ArrowDown className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{conversionToNext}% chuyển đổi</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ConversionMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Funnel className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-700">Tỷ lệ chuyển đổi tổng</p>
            <p className="text-2xl font-bold text-blue-900">{summary.totalConversion ?? '-'}%</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500 rounded-lg"><Clock className="w-5 h-5 text-white" /></div>
          <div>
            <p className="text-sm text-green-700">Thời gian chuyển đổi TB</p>
            <p className="text-2xl font-bold text-green-900">{summary.avgTimeToConvert ?? '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-500 rounded-lg"><Users className="w-5 h-5 text-white" /></div>
          <div>
            <p className="text-sm text-yellow-700">Tổng người dùng</p>
            <p className="text-2xl font-bold text-yellow-900">{summary.entryCount?.toLocaleString() ?? '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500 rounded-lg"><Target className="w-5 h-5 text-white" /></div>
          <div>
            <p className="text-sm text-purple-700">Chuyển đổi thành công</p>
            <p className="text-2xl font-bold text-purple-900">{summary.finalCount?.toLocaleString() ?? '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const SegmentAnalysis = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100"><h3 className="text-lg font-semibold text-gray-900">Phân tích theo phân khúc</h3></div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(_mockSegmentData).filter(([key]) => key !== 'all').map(([key, segment]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2"><span className="font-medium text-gray-900">{segment.label}</span><span className="text-sm text-gray-600">{segment.count.toLocaleString()}</span></div>
              {segment.conversion && (
                <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Chuyển đổi</span><div className="flex items-center space-x-1"><span className="font-medium text-gray-900">{segment.conversion}%</span>{segment.conversion > funnel.totalConversion ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}</div></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BottleneckAnalysis = () => {
    const items = bottlenecks.slice(0,3);
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100"><h3 className="text-lg font-semibold text-gray-900">Phân tích điểm nghẽn</h3></div>
        <div className="p-6 space-y-4">
          {items.length === 0 && <div className="text-sm text-gray-500">Không tìm thấy điểm nghẽn đáng chú ý.</div>}
          {items.map((bottleneck, idx) => (
            <div key={bottleneck.id} className="flex items-center space-x-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">{idx+1}</div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{bottleneck.name}</div>
                <div className="text-sm text-gray-600">Mất {bottleneck.dropoffRate.toFixed(1)}% — {( (funnel.stages[bottleneck.index - 1]?.count || 0) - bottleneck.count ).toLocaleString()} người</div>
              </div>
              <div className="text-right"><div className="text-lg font-bold text-red-600">{bottleneck.dropoffRate.toFixed(1)}%</div><div className="text-sm text-gray-500">Rời bỏ</div></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OptimizationRecommendations = () => {
    const recommendations = [
      { stage: 'Bắt đầu đăng ký', issue: 'Tỷ lệ rời bỏ cao (65.4%)', recommendations: ['Rút gọn form đăng ký', 'Thêm thanh tiến độ', 'Tối ưu mobile', 'A/B test form'], priority: 'Cao', impact: '15-20%', effort: 'Trung bình', icon: AlertTriangle, color: 'red' },
      { stage: 'Xác minh tài khoản', issue: 'Thời gian chờ lâu (12h+)', recommendations: ['Automation xác minh', 'Email nhắc', 'Chat hỗ trợ'], priority: 'Trung bình', impact: '10-15%', effort: 'Cao', icon: Info, color: 'yellow' },
      { stage: 'Tham dự thực tế', issue: 'No-show 12.6%', recommendations: ['SMS & email nhắc', 'Group chat sự kiện', 'Survey'], priority: 'Cao', impact: '30-40%', effort: 'Thấp', icon: CheckCircle, color: 'green' }
    ];

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100"><h3 className="text-lg font-semibold text-gray-900">Khuyến nghị tối ưu hóa</h3></div>
        <div className="p-6 space-y-6">
          {recommendations.map((rec, idx) => {
            const Icon = rec.icon;
            const colorClasses = rec.color === 'red' ? 'border-red-200 bg-red-50' : rec.color === 'yellow' ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50';
            return (
              <div key={idx} className={`border rounded-lg p-4 ${colorClasses}`}>
                <div className="flex items-start space-x-4">
                  <Icon className={`w-6 h-6 mt-1 ${rec.color === 'red' ? 'text-red-600' : rec.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2"><h4 className="font-semibold text-gray-900">{rec.stage}</h4><span className={`px-2 py-1 rounded-full text-xs font-medium ${rec.priority === 'Cao' ? 'bg-red-100 text-red-800' : rec.priority === 'Trung bình' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{rec.priority}</span></div>
                    <p className="text-sm text-gray-700 mb-3">{rec.issue}</p>
                    <ul className="space-y-1 text-sm text-gray-700">{rec.recommendations.map((s,i)=>(<li key={i} className="flex items-start space-x-2"><ChevronRight className="w-4 h-4 text-gray-400 mt-0.5"/><span>{s}</span></li>))}</ul>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm"><div><span className="font-medium text-gray-900">Tác động: </span><span className="text-gray-700">{rec.impact}</span></div><div><span className="font-medium text-gray-900">Effort: </span><span className="text-gray-700">{rec.effort}</span></div></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const TrendAnalysis = () => {
    // small mock timeseries for demo
    const series = {
      labels: ['6 tháng trước','5 tháng','4 tháng','3 tháng','2 tháng','Tháng này'],
      conversion: [8.1,9.2,10.5,11.3,11.9, summary.totalConversion || 12.6],
      volume: [12000,14000,16000,18000,22000, summary.entryCount || 25840]
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100"><h3 className="text-lg font-semibold text-gray-900">Xu hướng chuyển đổi theo thời gian</h3></div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <div className="flex items-center space-x-3 mb-3"><LineChart className="w-5 h-5 text-gray-600"/><h4 className="font-medium">Tỷ lệ chuyển đổi</h4></div>
              <div className="text-sm text-gray-700 space-y-2">
                {series.labels.map((lbl, i) => (
                  <div key={lbl} className="flex items-center justify-between"><div className="text-sm">{lbl}</div><div className="font-medium">{series.conversion[i]}%</div></div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <div className="flex items-center space-x-3 mb-3"><BarChart3 className="w-5 h-5 text-gray-600"/><h4 className="font-medium">Lưu lượng (đầu vào)</h4></div>
              <div className="text-sm text-gray-700 space-y-2">
                {series.labels.map((lbl, i) => (
                  <div key={lbl} className="flex items-center justify-between"><div className="text-sm">{lbl}</div><div className="font-medium">{series.volume[i].toLocaleString()}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading || !funnel) {
    return <div className="p-6 text-center text-gray-500">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Connection Funnel Analytics</h2>
          <p className="text-sm text-gray-600">Quản lý & phân tích luồng — chọn range, funnel và phân khúc để xem chi tiết.</p>
        </div>
        <div className="flex items-center space-x-2">
          <select value={selectedTimeRange} onChange={e=>setSelectedTimeRange(e.target.value)} className="border px-3 py-2 rounded text-sm">
            <option value="7days">7 ngày</option>
            <option value="30days">30 ngày</option>
            <option value="90days">3 tháng</option>
            <option value="6months">6 tháng</option>
            <option value="1year">1 năm</option>
          </select>
          <input placeholder="Tìm kiếm bước..." value={query} onChange={e=>setQuery(e.target.value)} className="border px-3 py-2 rounded text-sm" />
          <button onClick={()=>setShowDetails(s=>!s)} className="px-3 py-2 border rounded text-sm">{showDetails? 'Ẩn chi tiết' : 'Hiện chi tiết'}</button>
          <button onClick={copySummaryToClipboard} className="px-3 py-2 border rounded text-sm">Copy</button>
          <button onClick={exportCSV} className="px-3 py-2 bg-blue-600 text-white rounded text-sm">CSV</button>
        </div>
      </div>

      {/* Summary */}
      <ConversionMetrics />

      {/* Funnel picker */}
      <div><FunnelPicker /></div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {visibleStages.map((stage, idx) => (
            <StageCard key={stage.id} stage={stage} index={idx} />
          ))}

          <TrendAnalysis />
        </div>

        <div className="space-y-4">
          <BottleneckAnalysis />
          <SegmentAnalysis />
          <OptimizationRecommendations />
        </div>
      </div>

    </div>
  );
}
