import React, { useMemo, useState } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  Building, Phone, Mail, Globe, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
     MessageSquare, Flag, History, Settings, Crown, Zap, Package,
  BarChart3, PlusCircle, ExternalLink, Briefcase, DollarSign,
  Upload, Camera, User, Image, CheckSquare, AlertCircle,
  ArrowUp, ArrowDown, RefreshCw, Coins, Gift, Lock,
  PieChart, LineChart, BarChart, TrendingDown, Percent,
  UserCheck, UserX, Link, Send, PlayCircle, PauseCircle,
  AlertOctagon, UserMinus, MessageCircle, Gavel, CircleAlert
} from 'lucide-react';

/**
 * AbuseReportManagement - quản lý báo cáo vi phạm
 * - Mock actions are console.logs; replace with API calls as needed.
 */
export default function AbuseReportManagement() {
  // --- Mock data (initial) ---
  const initialReports = [
    {
      id: 'RPT-001',
      reporterId: 15,
      reporterName: 'Nguyễn Thị Lan',
      reporterAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150',
      reporterTrustScore: 4.8,
      reportedUserId: 23,
      reportedUserName: 'Trần Văn Minh',
      reportedUserAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      reportedUserType: 'volunteer',
      reportedUserTrustScore: 3.2,
      reportType: 'harassment',
      reportCategory: 'verbal_abuse',
      severity: 'high',
      status: 'pending',
      submitDate: '2024-12-05T14:30:00Z',
      incidentDate: '2024-12-05T10:15:00Z',
      eventId: 'EVT-123',
      eventName: 'Chương trình giáo dục trẻ em vùng cao',
      description: 'Người này đã có hành vi quấy rối và sử dụng ngôn từ không phù hợp trong quá trình tham gia hoạt động. Liên tục gửi tin nhắn riêng với nội dung không phù hợp và tạo ra môi trường không thoải mái cho các TNV khác.',
      evidence: [
        { type: 'screenshot', url: 'evidence1.jpg', description: 'Screenshot tin nhắn quấy rối' },
        { type: 'chat_log', url: 'chatlog1.txt', description: 'Log tin nhắn trong group' }
      ],
      witnesses: ['Lê Thị Hương', 'Phạm Văn An'],
      adminNotes: '',
      priority: 'high',
      autoFlagged: false,
      previousReports: 2,
      riskScore: 0.85,
      aiRecommendation: 'investigate',
      aiConfidence: 0.92,
      reviewHistory: [],
      relatedReports: ['RPT-002'],
      location: 'Sapa, Lào Cai',
      tags: ['harassment', 'repeat_offender', 'event_disruption']
    },
    {
      id: 'RPT-002',
      reporterId: 8,
      reporterName: 'Lê Thị Hương',
      reporterAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      reporterTrustScore: 4.6,
      reportedUserId: 23,
      reportedUserName: 'Trần Văn Minh',
      reportedUserAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      reportedUserType: 'volunteer',
      reportedUserTrustScore: 3.2,
      reportType: 'inappropriate_behavior',
      reportCategory: 'unprofessional_conduct',
      severity: 'medium',
      status: 'under_investigation',
      submitDate: '2024-12-04T16:45:00Z',
      incidentDate: '2024-12-04T14:20:00Z',
      eventId: 'EVT-123',
      eventName: 'Chương trình giáo dục trẻ em vùng cao',
      description: 'TNV này không tuân thủ quy định về trang phục và có thái độ không hợp tác với BTC. Làm việc không hiệu quả và tạo ra xung đột với các TNV khác.',
      evidence: [
        { type: 'photo', url: 'evidence2.jpg', description: 'Hình ảnh vi phạm trang phục' }
      ],
      witnesses: ['Nguyễn Thị Lan'],
      adminNotes: 'Đang xác minh thông tin với các nhân chứng',
      priority: 'medium',
      autoFlagged: false,
      previousReports: 2,
      riskScore: 0.65,
      aiRecommendation: 'warning',
      aiConfidence: 0.78,
      reviewHistory: [
        {
          date: '2024-12-05T09:30:00Z',
          reviewer: 'Admin Nguyen',
          action: 'started_investigation',
          note: 'Bắt đầu điều tra, liên hệ với các bên liên quan'
        }
      ],
      relatedReports: ['RPT-001'],
      location: 'Sapa, Lào Cai',
      tags: ['conduct_violation', 'repeat_offender']
    },
    {
      id: 'RPT-003',
      reporterId: 12,
      reporterName: 'Phạm Hoàng Nam',
      reporterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      reporterTrustScore: 4.2,
      reportedUserId: 45,
      reportedUserName: 'Green Future Org',
      reportedUserAvatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150',
      reportedUserType: 'partner',
      reportedUserTrustScore: 2.8,
      reportType: 'fraud',
      reportCategory: 'fake_organization',
      severity: 'critical',
      status: 'resolved',
      submitDate: '2024-12-02T11:20:00Z',
      incidentDate: '2024-12-01T15:30:00Z',
      eventId: 'EVT-125',
      eventName: 'Dọn dẹp môi trường biển',
      description: 'Tổ chức này có dấu hiệu lừa đảo. Sau khi tham gia sự kiện, họ yêu cầu TNV nộp phí và cung cấp thông tin cá nhân không cần thiết. Website và thông tin liên lạc không chính xác.',
      evidence: [
        { type: 'email', url: 'email1.pdf', description: 'Email yêu cầu nộp phí' },
        { type: 'screenshot', url: 'website_screenshot.jpg', description: 'Screenshot website giả mạo' }
      ],
      witnesses: ['Trần Thị Mai', 'Lê Văn Đức'],
      adminNotes: 'Đã xác minh là tổ chức giả mạo. Account đã bị khóa vĩnh viễn.',
      priority: 'critical',
      autoFlagged: true,
      previousReports: 0,
      riskScore: 0.95,
      aiRecommendation: 'ban_immediately',
      aiConfidence: 0.96,
      reviewHistory: [
        {
          date: '2024-12-02T14:15:00Z',
          reviewer: 'Admin Tran',
          action: 'investigated',
          note: 'Xác minh thông tin tổ chức, phát hiện nhiều dấu hiệu lừa đảo'
        },
        {
          date: '2024-12-03T10:00:00Z',
          reviewer: 'Admin Nguyen',
          action: 'banned_permanent',
          note: 'Khóa tài khoản vĩnh viễn. Báo cáo cơ quan chức năng.'
        }
      ],
      relatedReports: [],
      location: 'Vũng Tàu',
      tags: ['fraud', 'fake_org', 'financial_scam', 'banned']
    },
    {
      id: 'RPT-004',
      reporterId: 33,
      reporterName: 'Anonymous Reporter',
      reporterAvatar: '',
      reporterTrustScore: 0,
      reportedUserId: 67,
      reportedUserName: 'Võ Thị Hạnh',
      reportedUserAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150',
      reportedUserType: 'volunteer',
      reportedUserTrustScore: 4.1,
      reportType: 'spam',
      reportCategory: 'excessive_messaging',
      severity: 'low',
      status: 'dismissed',
      submitDate: '2024-12-01T08:15:00Z',
      incidentDate: '2024-11-30T19:45:00Z',
      eventId: null,
      eventName: null,
      description: 'Người này gửi quá nhiều tin nhắn trong group chat và tạo spam.',
      evidence: [],
      witnesses: [],
      adminNotes: 'Sau khi xem xét, đây chỉ là TNV nhiệt tình chia sẻ thông tin. Không có vi phạm.',
      priority: 'low',
      autoFlagged: true,
      previousReports: 0,
      riskScore: 0.25,
      aiRecommendation: 'dismiss',
      aiConfidence: 0.85,
      reviewHistory: [
        {
          date: '2024-12-01T16:30:00Z',
          reviewer: 'Admin Le',
          action: 'dismissed',
          note: 'Không có bằng chứng vi phạm. TNV chỉ chia sẻ thông tin hữu ích.'
        }
      ],
      relatedReports: [],
      location: 'Online',
      tags: ['spam', 'false_report']
    }
  ];

  // --- State & UI controls ---
  const [reports, setReports] = useState(initialReports);
  const [activeTab, setActiveTab] = useState('pending'); // pending | under_investigation | resolved | dismissed | all
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedReports, setSelectedReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [sortBy, setSortBy] = useState('submitDate'); // submitDate | riskScore | severity
  const [sortOrder, setSortOrder] = useState('desc');

  // --- helpers / configs (same logic as your draft) ---
  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Chờ xử lý', icon: Clock },
      under_investigation: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Đang điều tra', icon: Eye },
      resolved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Đã giải quyết', icon: CheckCircle },
      dismissed: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Đã bác bỏ', icon: XCircle },
      escalated: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Chuyển cấp cao', icon: AlertTriangle }
    };
    return configs[status] || configs.pending;
  };

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: { color: 'bg-red-100 text-red-800', label: 'Nghiêm trọng', icon: AlertOctagon },
      high: { color: 'bg-orange-100 text-orange-800', label: 'Cao', icon: AlertTriangle },
      medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Trung bình', icon: AlertCircle },
      low: { color: 'bg-green-100 text-green-800', label: 'Thấp', icon: CheckCircle }
    };
    return configs[severity] || configs.medium;
  };

  const getReportTypeConfig = (type) => {
    const configs = {
      harassment: { label: 'Quấy rối', icon: UserX, color: 'bg-red-100 text-red-800' },
      inappropriate_behavior: { label: 'Hành vi không phù hợp', icon: CircleAlert, color: 'bg-orange-100 text-orange-800' },
      fraud: { label: 'Lừa đảo', icon: AlertOctagon, color: 'bg-red-100 text-red-800' },
      spam: { label: 'Spam', icon: MessageCircle, color: 'bg-yellow-100 text-yellow-800' },
      fake_profile: { label: 'Hồ sơ giả', icon: User, color: 'bg-purple-100 text-purple-800' },
      violence: { label: 'Bạo lực', icon: Gavel, color: 'bg-red-100 text-red-800' }
    };
    return configs[type] || { label: type, icon: Flag, color: 'bg-gray-100 text-gray-800' };
  };

  const getRiskLevel = (score) => {
    if (score >= 0.8) return { level: 'critical', color: 'text-red-600', label: 'Nghiêm trọng' };
    if (score >= 0.6) return { level: 'high', color: 'text-orange-600', label: 'Cao' };
    if (score >= 0.4) return { level: 'medium', color: 'text-yellow-600', label: 'Trung bình' };
    return { level: 'low', color: 'text-green-600', label: 'Thấp' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
  };

  // --- derived & filtering/sorting ---
  const filteredReports = useMemo(() => {
    let arr = [...reports];

    // tab
    if (activeTab !== 'all') {
      arr = arr.filter(r => r.status === activeTab);
    }

    // search
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      arr = arr.filter(r =>
        (r.reportedUserName || '').toLowerCase().includes(q) ||
        (r.reporterName || '').toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        (r.id || '').toLowerCase().includes(q)
      );
    }

    // filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'critical') arr = arr.filter(r => r.severity === 'critical');
      else if (selectedFilter === 'high_risk') arr = arr.filter(r => r.riskScore >= 0.7);
      else if (selectedFilter === 'repeat_offenders') arr = arr.filter(r => r.previousReports > 0);
      else if (selectedFilter === 'auto_flagged') arr = arr.filter(r => r.autoFlagged);
      else if (selectedFilter === 'harassment') arr = arr.filter(r => r.reportType === 'harassment');
      else if (selectedFilter === 'fraud') arr = arr.filter(r => r.reportType === 'fraud');
    }

    // sort
    arr.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortBy === 'submitDate' || sortBy === 'incidentDate') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return arr;
  }, [reports, activeTab, searchTerm, selectedFilter, sortBy, sortOrder]);

  // --- selection helpers ---
  const toggleSelect = (id) => {
    setSelectedReports(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const selectAllVisible = () => setSelectedReports(filteredReports.map(r => r.id));
  const clearSelection = () => setSelectedReports([]);

  // --- actions (mock) ---
  const openDetail = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };
  const closeDetail = () => {
    setSelectedReport(null);
    setShowDetailModal(false);
  };

  const addReviewHistory = (reportId, { reviewer = 'Admin', action, note = '' }) => {
    setReports(prev => prev.map(r => {
      if (r.id !== reportId) return r;
      const newHistory = [...(r.reviewHistory || []), { date: new Date().toISOString(), reviewer, action, note }];
      return { ...r, reviewHistory: newHistory };
    }));
  };

  const updateReportStatus = (reportId, newStatus) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
  };

  const handleResolveReport = (reportId, action, note = '') => {
    // action: resolve | dismiss | ban
    console.log(`[ACTION] ${action} on ${reportId}:`, note);
    if (action === 'resolve') {
      updateReportStatus(reportId, 'resolved');
      addReviewHistory(reportId, { action: 'resolved', note });
    } else if (action === 'dismiss') {
      updateReportStatus(reportId, 'dismissed');
      addReviewHistory(reportId, { action: 'dismissed', note });
    } else if (action === 'ban') {
      // mock ban: set status resolved and add banned tag + reduce trust score
      setReports(prev => prev.map(r => {
        if (r.id !== reportId) return r;
        const tags = Array.isArray(r.tags) ? Array.from(new Set([...(r.tags || []), 'banned'])) : ['banned'];
        const newHistory = [...(r.reviewHistory || []), { date: new Date().toISOString(), reviewer: 'Admin', action: 'banned_permanent', note }];
        return { ...r, status: 'resolved', tags, reviewHistory: newHistory, reportedUserTrustScore: 0 };
      }));
      console.log(`User banned for report ${reportId} (mock)`);
    }
    // close modal if opened
    if (showDetailModal) closeDetail();
    // clear selection if included
    setSelectedReports(prev => prev.filter(id => id !== reportId));
  };

  const handleBulkAction = (action) => {
    console.log(`[BULK] ${action} on`, selectedReports);
    selectedReports.forEach(id => handleResolveReport(id, action, `Bulk action: ${action}`));
    setShowBulkActionModal(false);
    setSelectedReports([]);
  };

  // --- export CSV ---
  const exportCSV = (useSelected = false) => {
    const rows = useSelected ? reports.filter(r => selectedReports.includes(r.id)) : reports;
    if (rows.length === 0) return alert('Không có báo cáo để xuất.');
    const headers = ['id', 'reporterName', 'reportedUserName', 'reportType', 'severity', 'status', 'submitDate', 'incidentDate', 'riskScore', 'tags'];
    const csv = [
      headers.join(','),
      ...rows.map(r => headers.map(h => {
        let val = r[h];
        if (Array.isArray(val)) val = val.join('; ');
        if (typeof val === 'string') {
          // escape quotes
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val === undefined || val === null ? '' : val;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abuse_reports_${useSelected ? 'selected' : 'all'}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // --- UI render ---
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Abuse Report Management</h1>
          <p className="text-sm text-gray-600 mt-1">Quản lý báo cáo vi phạm — xem, xử lý và xuất báo cáo</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500 text-right">
            <div>Tổng báo cáo</div>
            <div className="font-semibold">{reports.length}</div>
          </div>

          <button onClick={() => exportCSV(false)} className="px-3 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {[
              { key: 'pending', label: `Chờ xử lý (${reports.filter(r => r.status === 'pending').length})` },
              { key: 'under_investigation', label: `Đang điều tra (${reports.filter(r => r.status === 'under_investigation').length})` },
              { key: 'resolved', label: `Đã giải quyết (${reports.filter(r => r.status === 'resolved').length})` },
              { key: 'dismissed', label: `Đã bác bỏ (${reports.filter(r => r.status === 'dismissed').length})` },
              { key: 'all', label: 'Tất cả' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-2 rounded text-sm ${activeTab === tab.key ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo người bị báo cáo, người báo cáo, mô tả, mã..."
                className="pl-9 pr-3 py-2 border rounded-md w-80"
              />
            </div>

            <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="px-3 py-2 border rounded-md">
              <option value="all">Tất cả bộ lọc</option>
              <option value="critical">Nghiêm trọng</option>
              <option value="high_risk">Rủi ro cao</option>
              <option value="repeat_offenders">Người vi phạm lặp lại</option>
              <option value="auto_flagged">Tự động gắn cờ</option>
              <option value="harassment">Quấy rối</option>
              <option value="fraud">Lừa đảo</option>
            </select>

            <div className="flex items-center space-x-2">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-2 py-2 border rounded-md text-sm">
                <option value="submitDate">Ngày báo cáo</option>
                <option value="incidentDate">Ngày sự cố</option>
                <option value="riskScore">Risk score</option>
                <option value="severity">Severity</option>
              </select>
              <button onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')} className="px-2 py-2 border rounded-md">
                {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedReports.length > 0 && selectedReports.length === filteredReports.length && filteredReports.length > 0}
              onChange={(e) => e.target.checked ? selectAllVisible() : clearSelection()}
              className="h-4 w-4"
            />
            <div className="text-sm text-gray-700">{filteredReports.length} kết quả</div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (selectedReports.length === 0) return alert('Chọn ít nhất 1 báo cáo để thực hiện hành động hàng loạt.');
                setShowBulkActionModal(true);
              }}
              className="px-3 py-2 bg-gray-50 border rounded text-sm hover:bg-gray-100"
            >
              Bulk action ({selectedReports.length})
            </button>

            <button onClick={() => exportCSV(true)} className="px-3 py-2 border rounded text-sm">
              Xuất CSV (chọn)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left w-10"></th>
                <th className="px-4 py-3 text-left">Mã / Sự kiện</th>
                <th className="px-4 py-3 text-left">Báo cáo bởi</th>
                <th className="px-4 py-3 text-left">Người bị báo cáo</th>
                <th className="px-4 py-3 text-left">Loại / Severity</th>
                <th className="px-4 py-3 text-left">Risk</th>
                <th className="px-4 py-3 text-left">Thời gian</th>
                <th className="px-4 py-3 text-left w-36">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(r => {
                const statusCfg = getStatusConfig(r.status);
                const severityCfg = getSeverityConfig(r.severity);
                const typeCfg = getReportTypeConfig(r.reportType);
                const risk = getRiskLevel(r.riskScore);
                return (
                  <tr key={r.id} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(r.id)}
                        onChange={() => toggleSelect(r.id)}
                        className="h-4 w-4"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-medium">{r.id}</div>
                      <div className="text-gray-500 text-xs">{r.eventName || 'N/A'}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {r.reporterAvatar ? (
                          <img src={r.reporterAvatar} alt={r.reporterName} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{r.reporterName}</div>
                          <div className="text-xs text-gray-500">Trust: {r.reporterTrustScore}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-medium">{r.reportedUserName}</div>
                      <div className="text-xs text-gray-500">{r.reportedUserType} • Trust: {r.reportedUserTrustScore}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${typeCfg.color}`}>{typeCfg.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${severityCfg.color}`}>{severityCfg.label}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold">{Math.round(r.riskScore * 100)}%</div>
                      <div className="text-xs text-gray-500">{risk.label}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-sm">{formatDate(r.submitDate)}</div>
                      <div className="text-xs text-gray-500">{getTimeAgo(r.submitDate)}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button title="Xem chi tiết" onClick={() => openDetail(r)} className="p-2 rounded hover:bg-gray-100">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button title="Đánh dấu đã giải quyết" onClick={() => handleResolveReport(r.id, 'resolve', 'Resolved by admin')} className="p-2 rounded hover:bg-green-50">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                        <button title="Bác bỏ" onClick={() => handleResolveReport(r.id, 'dismiss', 'Dismissed by admin')} className="p-2 rounded hover:bg-red-50">
                          <XCircle className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    Không có báo cáo phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Action Modal */}
      {showBulkActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Bulk Action</h3>
              <button onClick={() => setShowBulkActionModal(false)} className="p-2 rounded hover:bg-gray-100">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">Áp dụng hành động cho <strong>{selectedReports.length}</strong> báo cáo.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <button onClick={() => handleBulkAction('resolve')} className="px-4 py-2 bg-green-600 text-white rounded">Resolve</button>
              <button onClick={() => handleBulkAction('dismiss')} className="px-4 py-2 bg-gray-600 text-white rounded">Dismiss</button>
              <button onClick={() => handleBulkAction('ban')} className="px-4 py-2 bg-red-600 text-white rounded">Ban user</button>
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowBulkActionModal(false)} className="px-4 py-2 border rounded">Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={closeDetail}
          onResolve={(action, note) => handleResolveReport(selectedReport.id, action, note)}
        />
      )}
    </div>
  );
}

/* ---------------------------
   ReportDetailModal component
   --------------------------- */
function ReportDetailModal({ report, onClose, onResolve }) {
  const [note, setNote] = useState('');

  if (!report) return null;

  const statusConfig = (() => {
    const configs = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Chờ xử lý' },
      under_investigation: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Đang điều tra' },
      resolved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Đã giải quyết' },
      dismissed: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Đã bác bỏ' }
    };
    return configs[report.status] || configs.pending;
  })();

  const severityCfg = (() => {
    const c = {
      critical: { color: 'bg-red-100 text-red-800', label: 'Nghiêm trọng', icon: AlertOctagon },
      high: { color: 'bg-orange-100 text-orange-800', label: 'Cao', icon: AlertTriangle },
      medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Trung bình', icon: AlertCircle },
      low: { color: 'bg-green-100 text-green-800', label: 'Thấp', icon: CheckCircle }
    };
    return c[report.severity] || c.medium;
  })();

  const typeCfg = (() => {
    const map = {
      harassment: { label: 'Quấy rối', icon: UserX, color: 'bg-red-100 text-red-800' },
      fraud: { label: 'Lừa đảo', icon: AlertOctagon, color: 'bg-red-100 text-red-800' },
      spam: { label: 'Spam', icon: MessageCircle, color: 'bg-yellow-100 text-yellow-800' }
    };
    return map[report.reportType] || { label: report.reportType, icon: Flag, color: 'bg-gray-100 text-gray-800' };
  })();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Chi tiết báo cáo — {report.id}</h2>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${statusConfig.color}`}>{statusConfig.label}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${severityCfg.color}`}>{severityCfg.label}</span>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left/main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white border rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Mã báo cáo</div>
                  <div className="font-mono text-gray-900">{report.id}</div>
                </div>
                <div>
                  <div className="text-gray-600">Loại</div>
                  <div className="flex items-center space-x-2">
                    {React.createElement(typeCfg.icon, { className: "w-4 h-4" })}
                    <span className="text-gray-900">{typeCfg.label}</span>
                  </div>
                </div>

                <div>
                  <div className="text-gray-600">Thời gian báo cáo</div>
                  <div className="text-gray-900">{formatDate(report.submitDate)}</div>
                </div>

                <div>
                  <div className="text-gray-600">Thời gian xảy ra</div>
                  <div className="text-gray-900">{formatDate(report.incidentDate)}</div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Mô tả</h4>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-gray-800 whitespace-pre-wrap">{report.description}</p>
                </div>
              </div>
            </div>

            {/* Evidence */}
            {report.evidence && report.evidence.length > 0 && (
              <div className="bg-white border rounded-lg p-6">
                <h4 className="font-medium mb-3">Bằng chứng</h4>
                <div className="space-y-2">
                  {report.evidence.map((e, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">{e.description}</div>
                          <div className="text-xs text-gray-500">{e.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800">Xem</button>
                        <button className="text-sm text-gray-600 hover:text-gray-800">Tải</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Witnesses & tags */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Nhân chứng & Thẻ</h4>
                <div className="text-xs text-gray-500">{report.witnesses.length} witnesses</div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {report.witnesses.length > 0 ? report.witnesses.map((w, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{w}</span>
                  )) : <div className="text-sm text-gray-500">Không có nhân chứng</div>}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {report.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">#{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Review History */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-medium mb-3">Lịch sử xử lý</h4>
              {report.reviewHistory.length === 0 && <div className="text-sm text-gray-500">Chưa có hành động.</div>}
              <div className="space-y-3">
                {report.reviewHistory.map((h, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {h.action === 'resolved' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                       h.action === 'dismissed' ? <XCircle className="w-5 h-5 text-red-600" /> :
                       h.action === 'banned_permanent' ? <Ban className="w-5 h-5 text-red-600" /> :
                       <History className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">{h.reviewer}</div>
                        <div className="text-xs text-gray-500">{formatDate(h.date)}</div>
                      </div>
                      <div className="text-sm text-gray-700">{h.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* right/sidebar */}
          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold mb-3">Thông tin báo cáo</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <div><span className="text-gray-500">Người báo cáo:</span> <strong>{report.reporterName}</strong></div>
                <div><span className="text-gray-500">Người bị báo cáo:</span> <strong>{report.reportedUserName}</strong></div>
                <div><span className="text-gray-500">Vị trí:</span> {report.location}</div>
                <div><span className="text-gray-500">Số báo cáo trước:</span> <strong>{report.previousReports}</strong></div>
                <div><span className="text-gray-500">AI đề xuất:</span> <strong>{report.aiRecommendation}</strong> <span className="text-xs text-gray-500">({Math.round(report.aiConfidence * 100)}%)</span></div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold mb-3">Hành động</h4>
              <div className="space-y-2">
                <button onClick={() => onResolve('resolve', note)} className="w-full px-3 py-2 bg-green-600 text-white rounded">Đánh dấu đã giải quyết</button>
                <button onClick={() => onResolve('dismiss', note)} className="w-full px-3 py-2 bg-gray-600 text-white rounded">Bác bỏ</button>
                <button onClick={() => {
                  if (!confirm('Bạn có chắc muốn khóa tài khoản này vĩnh viễn (mock)?')) return;
                  onResolve('ban', note);
                }} className="w-full px-3 py-2 bg-red-600 text-white rounded">Khóa tài khoản</button>
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-700">Ghi chú xử lý (tùy chọn)</label>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} className="w-full mt-2 p-2 border rounded" placeholder="Ghi chú / lý do..."></textarea>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold mb-3">Người bị báo cáo</h4>
              <div className="flex items-center space-x-3">
                {report.reportedUserAvatar ? (
                  <img src={report.reportedUserAvatar} alt={report.reportedUserName} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                )}
                <div>
                  <div className="font-medium">{report.reportedUserName}</div>
                  <div className="text-xs text-gray-500">Trust: {report.reportedUserTrustScore}</div>
                </div>
              </div>
              <div className="mt-3 text-sm">
                <button className="w-full px-3 py-2 border rounded text-sm text-blue-600">Xem hồ sơ</button>
                <button className="w-full mt-2 px-3 py-2 border rounded text-sm text-red-600">Khóa tạm thời (mock)</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Đóng</button>
        </div>
      </div>
    </div>
  );
}
