import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Award, DollarSign, 
  Phone, Mail, Globe, Star, Heart, Share2, Edit, Trash2,
  CheckCircle, XCircle, AlertTriangle, Eye, MessageSquare,
  Download, FileText, Camera, Tag, Building, Shield,
  TrendingUp, Activity, UserCheck, Clock3, BarChart3,
  RefreshCw, Filter, Search, MoreHorizontal, Flag, Ban,
  Bell, AlertCircle, Info, ChevronDown, ChevronUp,
  User, Timer, Target, TrendingDown, Zap, ThumbsUp, ThumbsDown,
  AlertOctagon, CheckSquare, XSquare, Bookmark,
  Settings, RotateCcw, Archive, Send, ExternalLink
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

export default function EventQualityControl() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [qualityFilter, setQualityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('quality_score');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showQualityDetails, setShowQualityDetails] = useState({});

  // Mock data for quality control
  const mockEvents = [
    {
      id: 'EVT-2024-001',
      title: 'Làm sạch bờ biển Vũng Tàu - Bảo vệ môi trường biển',
      category: 'Môi trường',
      status: 'active',
      organizer: {
        name: 'Green Earth Vietnam',
        type: 'verified_partner',
        rating: 4.8,
        pastEvents: 45
      },
      qualityMetrics: {
        overallScore: 92,
        contentQuality: 95,
        organizationCredibility: 98,
        logisticsPlanning: 88,
        safetyCompliance: 90,
        communityImpact: 94,
        volunteerSatisfaction: 89,
        resourceUtilization: 87
      },
      issues: [],
      lastReviewed: '2024-12-01T10:30:00Z',
      reviewedBy: 'QC Team A',
      participants: 32,
      completionRate: 95,
      feedbackScore: 4.7,
      budget: 5000000,
      budgetUtilization: 88,
      mediaQuality: {
        imagesCount: 8,
        qualityRating: 4.5,
        completeness: 90
      },
      complianceFlags: [],
      riskLevel: 'low'
    },
    {
      id: 'EVT-2024-002',
      title: 'Chương trình hỗ trợ học sinh khó khăn',
      category: 'Giáo dục',
      status: 'active',
      organizer: {
        name: 'Education First Foundation',
        type: 'organization',
        rating: 4.2,
        pastEvents: 12
      },
      qualityMetrics: {
        overallScore: 76,
        contentQuality: 80,
        organizationCredibility: 75,
        logisticsPlanning: 72,
        safetyCompliance: 85,
        communityImpact: 78,
        volunteerSatisfaction: 70,
        resourceUtilization: 65
      },
      issues: [
        { type: 'warning', message: 'Mô tả sự kiện thiếu chi tiết về quy trình thực hiện' },
        { type: 'info', message: 'Cần bổ sung thông tin về đối tượng thụ hưởng' }
      ],
      lastReviewed: '2024-11-30T14:20:00Z',
      reviewedBy: 'QC Team B',
      participants: 18,
      completionRate: 78,
      feedbackScore: 3.9,
      budget: 2000000,
      budgetUtilization: 92,
      mediaQuality: {
        imagesCount: 3,
        qualityRating: 3.2,
        completeness: 60
      },
      complianceFlags: ['incomplete_documentation'],
      riskLevel: 'medium'
    },
    {
      id: 'EVT-2024-003',
      title: 'Khám bệnh miễn phí cho người cao tuổi',
      category: 'Y tế',
      status: 'flagged',
      organizer: {
        name: 'Dr. Smith Medical Group',
        type: 'individual',
        rating: 2.8,
        pastEvents: 2
      },
      qualityMetrics: {
        overallScore: 45,
        contentQuality: 40,
        organizationCredibility: 30,
        logisticsPlanning: 35,
        safetyCompliance: 25,
        communityImpact: 60,
        volunteerSatisfaction: 55,
        resourceUtilization: 70
      },
      issues: [
        { type: 'critical', message: 'Thiếu giấy phép hành nghề y tế' },
        { type: 'critical', message: 'Không có bảo hiểm trách nhiệm nghề nghiệp' },
        { type: 'warning', message: 'Tổ chức chưa có kinh nghiệm tổ chức sự kiện y tế' }
      ],
      lastReviewed: '2024-11-28T09:15:00Z',
      reviewedBy: 'QC Team A',
      participants: 0,
      completionRate: 0,
      feedbackScore: 0,
      budget: 8000000,
      budgetUtilization: 0,
      mediaQuality: {
        imagesCount: 1,
        qualityRating: 2.1,
        completeness: 25
      },
      complianceFlags: ['missing_license', 'safety_risk', 'unverified_organizer'],
      riskLevel: 'high'
    },
    {
      id: 'EVT-2024-004',
      title: 'Xây dựng nhà tình thương cho gia đình nghèo',
      category: 'Cộng đồng',
      status: 'excellent',
      organizer: {
        name: 'Habitat for Humanity Vietnam',
        type: 'verified_partner',
        rating: 4.9,
        pastEvents: 128
      },
      qualityMetrics: {
        overallScore: 97,
        contentQuality: 98,
        organizationCredibility: 100,
        logisticsPlanning: 95,
        safetyCompliance: 98,
        communityImpact: 99,
        volunteerSatisfaction: 96,
        resourceUtilization: 92
      },
      issues: [],
      lastReviewed: '2024-12-01T16:45:00Z',
      reviewedBy: 'QC Team A',
      participants: 45,
      completionRate: 100,
      feedbackScore: 4.9,
      budget: 15000000,
      budgetUtilization: 96,
      mediaQuality: {
        imagesCount: 15,
        qualityRating: 4.8,
        completeness: 95
      },
      complianceFlags: [],
      riskLevel: 'low'
    }
  ];

  const qualityTrends = [
    { month: 'T7', avgScore: 78, eventsReviewed: 45 },
    { month: 'T8', avgScore: 82, eventsReviewed: 52 },
    { month: 'T9', avgScore: 85, eventsReviewed: 48 },
    { month: 'T10', avgScore: 88, eventsReviewed: 56 },
    { month: 'T11', avgScore: 86, eventsReviewed: 63 },
    { month: 'T12', avgScore: 89, eventsReviewed: 38 }
  ];

  const qualityDistribution = [
    { range: '90-100', count: 8, color: '#10b981' },
    { range: '80-89', count: 15, color: '#3b82f6' },
    { range: '70-79', count: 12, color: '#f59e0b' },
    { range: '60-69', count: 6, color: '#ef4444' },
    { range: '<60', count: 3, color: '#dc2626' }
  ];

  const issueCategories = [
    { name: 'Nội dung', count: 12, severity: 'medium' },
    { name: 'An toàn', count: 8, severity: 'high' },
    { name: 'Tuân thủ', count: 15, severity: 'medium' },
    { name: 'Logistics', count: 6, severity: 'low' },
    { name: 'Media', count: 9, severity: 'low' }
  ];

  const filteredEvents = useMemo(() => {
    let filtered = [...mockEvents];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by quality
    if (qualityFilter !== 'all') {
      switch (qualityFilter) {
        case 'excellent':
          filtered = filtered.filter(event => event.qualityMetrics.overallScore >= 90);
          break;
        case 'good':
          filtered = filtered.filter(event => event.qualityMetrics.overallScore >= 80 && event.qualityMetrics.overallScore < 90);
          break;
        case 'needs_improvement':
          filtered = filtered.filter(event => event.qualityMetrics.overallScore >= 60 && event.qualityMetrics.overallScore < 80);
          break;
        case 'poor':
          filtered = filtered.filter(event => event.qualityMetrics.overallScore < 60);
          break;
      }
    }

    // Sort events
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'quality_score':
          aValue = a.qualityMetrics.overallScore;
          bValue = b.qualityMetrics.overallScore;
          break;
        case 'last_reviewed':
          aValue = new Date(a.lastReviewed).getTime();
          bValue = new Date(b.lastReviewed).getTime();
          break;
        case 'issues_count':
          aValue = a.issues.length;
          bValue = b.issues.length;
          break;
        case 'participants':
          aValue = a.participants;
          bValue = b.participants;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [mockEvents, searchQuery, selectedCategory, qualityFilter, sortBy, sortOrder]);

  const getQualityBadge = (score) => {
    if (score >= 90) return { label: 'Xuất sắc', color: 'bg-green-100 text-green-800', icon: CheckCircle };
    if (score >= 80) return { label: 'Tốt', color: 'bg-blue-100 text-blue-800', icon: ThumbsUp };
    if (score >= 70) return { label: 'Khá', color: 'bg-yellow-100 text-yellow-800', icon: Flag };
    if (score >= 60) return { label: 'Cần cải thiện', color: 'bg-orange-100 text-orange-800', icon: AlertTriangle };
    return { label: 'Kém', color: 'bg-red-100 text-red-800', icon: XCircle };
  };

  const getRiskLevelConfig = (riskLevel) => {
    const configs = {
      low: { color: 'text-green-600', bg: 'bg-green-100', label: 'Thấp', icon: CheckCircle },
      medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Trung bình', icon: AlertTriangle },
      high: { color: 'text-red-600', bg: 'bg-red-100', label: 'Cao', icon: AlertOctagon }
    };
    return configs[riskLevel] || configs.low;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const handleBulkAction = (action) => {
    // Placeholder: integrate API / socket call here
    console.log(`Bulk ${action} for events:`, selectedEvents);
    setSelectedEvents([]);
  };

  const handleQualityAction = (eventId, action) => {
    // Placeholder: implement server call
    console.log(`Quality action ${action} for event ${eventId}`);
  };

  const toggleDetails = (id) => {
    setShowQualityDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const removeEvent = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sự kiện này khỏi hệ thống QC?')) return;
    // remove from mock (in real app, call API)
    // eslint-disable-next-line no-restricted-globals
    console.log('Deleted', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kiểm soát chất lượng sự kiện</h1>
            <p className="text-gray-600 mt-1">Giám sát, đánh giá và xử lý các vấn đề chất lượng</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <RefreshCw className="w-4 h-4 mr-2" /> Làm mới dữ liệu
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" /> Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
            {[
              { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
              { id: 'events', label: 'Danh sách sự kiện', icon: FileText },
              { id: 'analytics', label: 'Phân tích chất lượng', icon: TrendingUp },
              { id: 'reports', label: 'Báo cáo', icon: Download }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-2 px-1 text-sm font-medium ${
                    activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-600">Điểm chất lượng TB</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">84.2</p>
                <p className="text-sm text-green-600 mt-1">+3.2 so với tháng trước</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-600">Sự kiện xuất sắc</p>
                <p className="text-2xl font-bold text-green-600 mt-2">{mockEvents.filter(e => e.qualityMetrics.overallScore >= 90).length}</p>
                <p className="text-sm text-gray-500 mt-1">Từ {mockEvents.length} sự kiện</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-600">Cần cải thiện</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">{mockEvents.filter(e => e.qualityMetrics.overallScore < 70).length}</p>
                <p className="text-sm text-gray-500 mt-1">Cần can thiệp</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-600">Vấn đề nghiêm trọng</p>
                <p className="text-2xl font-bold text-red-600 mt-2">
                  {mockEvents.reduce((count, event) => count + event.issues.filter(issue => issue.type === 'critical').length, 0)}
                </p>
                <p className="text-sm text-gray-500 mt-1">Cần xử lý ngay</p>
              </div>
            </div>

            {/* trends */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Xu hướng chất lượng (6 tháng)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={qualityTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={3} name="Điểm TB" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            {/* filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10 pr-3 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500"
                      placeholder="Tìm kiếm tiêu đề, tổ chức, mã sự kiện..."
                    />
                  </div>

                  <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-3 py-2 border rounded-lg">
                    <option value="all">Tất cả danh mục</option>
                    <option value="Môi trường">Môi trường</option>
                    <option value="Giáo dục">Giáo dục</option>
                    <option value="Y tế">Y tế</option>
                    <option value="Cộng đồng">Cộng đồng</option>
                  </select>

                  <select value={qualityFilter} onChange={e => setQualityFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
                    <option value="all">Tất cả mức</option>
                    <option value="excellent">Xuất sắc (90+)</option>
                    <option value="good">Tốt (80-89)</option>
                    <option value="needs_improvement">Cần cải thiện (60-79)</option>
                    <option value="poor">Kém (&lt;60)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field);
                      setSortOrder(order);
                    }}
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="quality_score-desc">Chất lượng cao nhất</option>
                    <option value="quality_score-asc">Chất lượng thấp nhất</option>
                    <option value="last_reviewed-desc">Đánh giá mới nhất</option>
                    <option value="issues_count-desc">Nhiều vấn đề nhất</option>
                    <option value="participants-desc">Nhiều TNV nhất</option>
                  </select>

                  {selectedEvents.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleBulkAction('review')} className="px-3 py-2 bg-blue-600 text-white rounded">Đánh giá lại ({selectedEvents.length})</button>
                      <button onClick={() => setSelectedEvents([])} className="px-3 py-2 bg-gray-200 rounded">Hủy</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* events list */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y">
              {filteredEvents.map(event => {
                const BadgeIcon = getQualityBadge(event.qualityMetrics.overallScore).icon;
                const qualityBadge = getQualityBadge(event.qualityMetrics.overallScore);
                const risk = getRiskLevelConfig(event.riskLevel);
                const RiskIcon = risk.icon;

                return (
                  <div key={event.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(event.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedEvents(prev => [...prev, event.id]);
                            else setSelectedEvents(prev => prev.filter(id => id !== event.id));
                          }}
                          className="w-4 h-4"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">{event.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${qualityBadge.color}`}>{qualityBadge.label}</span>
                              <div className="flex items-center gap-1 ml-2">
                                <span className="text-xl font-bold text-blue-600">{event.qualityMetrics.overallScore}</span>
                                <span className="text-sm text-gray-500">/100</span>
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Building className="w-4 h-4 text-gray-400" /> <span className="truncate">{event.organizer.name}</span>
                                {event.organizer.type === 'verified_partner' && <Shield className="w-4 h-4 text-blue-500" />}
                              </div>
                              <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-gray-400" /> <span>{event.category}</span></div>
                              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /> <span>{event.participants} TNV</span></div>
                              <div className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-gray-400" /> <span>{formatDate(event.lastReviewed)}</span></div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${risk.color}`}>{risk.label}</span>
                              <RiskIcon className={`w-5 h-5 ${risk.color}`} />
                            </div>

                            <div className="flex items-center gap-2">
                              <button onClick={() => toggleDetails(event.id)} className="text-sm text-blue-600 hover:underline flex items-center gap-2">
                                {showQualityDetails[event.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />} Chi tiết
                              </button>

                              <button onClick={() => handleQualityAction(event.id, 'mark_reviewed')} className="text-sm text-green-600 flex items-center gap-1">
                                <CheckSquare className="w-4 h-4" /> Đã đánh giá
                              </button>

                              <button onClick={() => removeEvent(event.id)} className="text-sm text-red-600 flex items-center gap-1">
                                <Trash2 className="w-4 h-4" /> Xóa
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* details */}
                        {showQualityDetails[event.id] && (
                          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-sm mb-2">Chỉ số chất lượng</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  {Object.entries(event.qualityMetrics).map(([key, val]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1')}</span>
                                      <span className="font-medium">{val}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-sm mb-2">Media & Compliance</h4>
                                <div className="text-sm text-gray-600 space-y-2">
                                  <div className="flex justify-between">
                                    <span>Ảnh (số lượng)</span>
                                    <span>{event.mediaQuality.imagesCount}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Chất lượng ảnh</span>
                                    <span>{event.mediaQuality.qualityRating}/5</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Hoàn thiện media</span>
                                    <span>{event.mediaQuality.completeness}%</span>
                                  </div>

                                  {event.complianceFlags.length > 0 && (
                                    <div className="mt-2">
                                      <div className="text-sm font-medium text-red-600">Cờ tuân thủ</div>
                                      <ul className="text-sm text-gray-700 list-disc ml-5">
                                        {event.complianceFlags.map((f, idx) => <li key={idx}>{f}</li>)}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Issues */}
                            <div className="mt-4">
                              <h4 className="font-semibold text-sm mb-2">Vấn đề (issues)</h4>
                              {event.issues.length === 0 ? (
                                <div className="text-sm text-gray-500">Không có vấn đề được báo cáo</div>
                              ) : (
                                <ul className="space-y-2">
                                  {event.issues.map((issue, idx) => (
                                    <li key={idx} className={`p-2 rounded border ${issue.type === 'critical' ? 'border-red-200 bg-red-50' : issue.type === 'warning' ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-white'}`}>
                                      <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-800">{issue.message}</div>
                                        <div className="text-xs text-gray-500 uppercase">{issue.type}</div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            {/* action row inside details */}
                            <div className="mt-4 flex items-center gap-3">
                              <button onClick={() => handleQualityAction(event.id, 'request_info')} className="px-3 py-2 bg-yellow-500 text-white rounded">Yêu cầu bổ sung</button>
                              <button onClick={() => handleQualityAction(event.id, 'escalate')} className="px-3 py-2 bg-red-600 text-white rounded">Escalate</button>
                              <button onClick={() => handleQualityAction(event.id, 'approve')} className="px-3 py-2 bg-green-600 text-white rounded">Chấp nhận</button>
                              <span className="ml-auto text-sm text-gray-500">Reviewed by: <span className="font-medium text-gray-700">{event.reviewedBy}</span></span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* footer / pagination (placeholder) */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">Hiển thị {filteredEvents.length} kết quả</div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 bg-gray-200 rounded">Trước</button>
                <button className="px-3 py-2 bg-gray-200 rounded">Sau</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Phân tích chất lượng</h3>
            <p className="text-sm text-gray-600 mb-4">Biểu đồ & phân tích sâu hơn (mẫu)</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium mb-2">Phân bố điểm</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={qualityDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium mb-2">Xu hướng</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={qualityTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Báo cáo</h3>
            <p className="text-sm text-gray-600">Tải báo cáo chi tiết chất lượng dưới dạng CSV / XLSX</p>
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Tải CSV</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded">Tải XLSX</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
