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
  UserCheck, UserX, Link, Send, PlayCircle, PauseCircle
} from 'lucide-react';

/**
 * ConnectionApprovalQueue - quản lý hàng đợi phê duyệt kết nối TNV <-> Đối tác
 *
 * - Mock data dùng để demo.
 * - handleApprove / handleReject hiện chỉ log ra console; thay bằng API call khi cần.
 */
export default function ConnectionApprovalQueue() {
  const [activeTab, setActiveTab] = useState('pending'); // pending | approved | rejected | flagged | all
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // high_risk | auto_blocked | premium_partner | high_trust_volunteer
  const [selectedConnections, setSelectedConnections] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [sortBy, setSortBy] = useState('submitDate'); // submitDate | riskScore | requirementMatch
  const [sortOrder, setSortOrder] = useState('desc'); // asc | desc

  // -----------------------------
  // MOCK DATA (sample requests)
  // -----------------------------
  const connectionRequests = [
    {
      id: 'CNX-001',
      partnerId: 1,
      partnerName: 'UNICEF Việt Nam',
      partnerTier: 'premium',
      partnerLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150',
      volunteerId: 12,
      volunteerName: 'Nguyễn Thị Lan',
      volunteerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150',
      volunteerTrustScore: 4.8,
      eventId: 'EVT-123',
      eventName: 'Chương trình giáo dục trẻ em vùng cao',
      eventCategory: 'education',
      submitDate: '2024-12-05T10:30:00Z',
      status: 'pending',
      priority: 'high',
      riskScore: 0.2,
      autoApprovalBlocked: false,
      connectionType: 'event_specific',
      requestMessage: 'Chúng tôi mong muốn kết nối với TNV Lan để tham gia chương trình giáo dục trẻ em. Với kinh nghiệm giảng dạy và điểm uy tín cao, chúng tôi tin rằng cô ấy sẽ đóng góp tích cực cho dự án này.',
      proposedRole: 'Giáo viên tình nguyện',
      proposedBenefits: ['Phụ cấp ăn uống', 'Chứng chỉ tham gia', 'Hỗ trợ đi lại'],
      proposedSchedule: '15-17/12/2024, 3 ngày',
      location: 'Sapa, Lào Cai',
      requirementMatch: 95,
      flaggedReasons: [],
      reviewHistory: [],
      adminNotes: '',
      aiRecommendation: 'approve',
      aiConfidence: 0.92
    },
    {
      id: 'CNX-002',
      partnerId: 5,
      partnerName: 'Local Community Center',
      partnerTier: 'unverified',
      partnerLogo: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150',
      volunteerId: 8,
      volunteerName: 'Trần Văn Minh',
      volunteerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      volunteerTrustScore: 4.2,
      eventId: 'EVT-124',
      eventName: 'Hỗ trợ người cao tuổi Neo Đơn',
      eventCategory: 'elderly_care',
      submitDate: '2024-12-04T16:45:00Z',
      status: 'flagged',
      priority: 'medium',
      riskScore: 0.7,
      autoApprovalBlocked: true,
      connectionType: 'ongoing_support',
      requestMessage: 'Cần TNV hỗ trợ chăm sóc người cao tuổi. Làm việc linh hoạt, có thể làm cuối tuần.',
      proposedRole: 'Người chăm sóc',
      proposedBenefits: ['Tiền công theo giờ'],
      proposedSchedule: 'Linh hoạt, cuối tuần',
      location: 'TP.HCM',
      requirementMatch: 60,
      flaggedReasons: [
        'Đối tác chưa được xác minh',
        'Mô tả công việc không rõ ràng',
        'Đề cập đến tiền công (có thể vi phạm chính sách)'
      ],
      reviewHistory: [],
      adminNotes: 'Cần xem xét kỹ hơn về bản chất công việc và đối tác',
      aiRecommendation: 'flag_for_review',
      aiConfidence: 0.78
    },
    {
      id: 'CNX-003',
      partnerId: 2,
      partnerName: 'Samsung Electronics Vietnam',
      partnerTier: 'verified',
      partnerLogo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150',
      volunteerId: 15,
      volunteerName: 'Lê Thị Hương',
      volunteerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      volunteerTrustScore: 4.6,
      eventId: 'EVT-125',
      eventName: 'Chương trình STEM cho học sinh',
      eventCategory: 'education',
      submitDate: '2024-12-03T09:15:00Z',
      status: 'approved',
      priority: 'medium',
      riskScore: 0.1,
      autoApprovalBlocked: false,
      connectionType: 'event_specific',
      requestMessage: 'Mời TNV Hương tham gia chương trình STEM với vai trò hướng dẫn học sinh về công nghệ. Sự kiện diễn ra tại trụ sở Samsung và các trường học.',
      proposedRole: 'Mentor công nghệ',
      proposedBenefits: ['Chứng chỉ từ Samsung', 'Networking', 'Quà lưu niệm'],
      proposedSchedule: '20-22/12/2024',
      location: 'TP.HCM và các trường học',
      requirementMatch: 88,
      flaggedReasons: [],
      reviewHistory: [
        {
          date: '2024-12-03T14:30:00Z',
          reviewer: 'Admin Nguyen',
          action: 'approved',
          note: 'Đối tác uy tín, sự kiện phù hợp với kỹ năng TNV'
        }
      ],
      adminNotes: 'Approved - Đối tác Samsung có uy tín cao, sự kiện phù hợp',
      aiRecommendation: 'approve',
      aiConfidence: 0.95
    },
    {
      id: 'CNX-004',
      partnerId: 7,
      partnerName: 'Green Future Organization',
      partnerTier: 'unverified',
      partnerLogo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150',
      volunteerId: 22,
      volunteerName: 'Phạm Hoàng Nam',
      volunteerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      volunteerTrustScore: 3.8,
      eventId: 'EVT-126',
      eventName: 'Dọn dẹp bãi biển và trồng rừng',
      eventCategory: 'environment',
      submitDate: '2024-12-02T11:20:00Z',
      status: 'rejected',
      priority: 'low',
      riskScore: 0.8,
      autoApprovalBlocked: true,
      connectionType: 'event_specific',
      requestMessage: 'Cần nhiều TNV tham gia dọn dẹp và trồng cây. Sẽ có xe đưa đón và ăn uống miễn phí.',
      proposedRole: 'Tình nguyện viên môi trường',
      proposedBenefits: ['Ăn uống', 'Xe đưa đón'],
      proposedSchedule: '25/12/2024',
      location: 'Vũng Tàu',
      requirementMatch: 45,
      flaggedReasons: [
        'Tổ chức chưa được xác minh',
        'Thiếu thông tin chi tiết về hoạt động',
        'Tình nguyện viên có lịch sử vi phạm'
      ],
      reviewHistory: [
        {
          date: '2024-12-02T15:45:00Z',
          reviewer: 'Admin Tran',
          action: 'rejected',
          note: 'Tổ chức chưa đủ uy tín, TNV có vi phạm trước đó'
        }
      ],
      adminNotes: 'Rejected - Tổ chức mới, chưa có track record. TNV cần cải thiện điểm uy tín',
      aiRecommendation: 'reject',
      aiConfidence: 0.85
    }
  ];

  // Basic stats (mock)
  const stats = {
    total: 156,
    pending: 23,
    approved: 89,
    rejected: 32,
    flagged: 12,
    avgProcessingTime: 4.2,
    autoApprovalRate: 65.5,
    todayProcessed: 8,
    thisWeekProcessed: 45
  };

  // -----------------------------
  // Utility functions & configs
  // -----------------------------
  const getStatusConfig = (status) => {
    const configs = {
      pending: { badge: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Chờ duyệt', icon: Clock },
      approved: { badge: 'bg-green-100 text-green-800 border-green-200', label: 'Đã duyệt', icon: CheckCircle },
      rejected: { badge: 'bg-red-100 text-red-800 border-red-200', label: 'Từ chối', icon: XCircle },
      flagged: { badge: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Cần xem xét', icon: Flag },
      in_review: { badge: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Đang xem xét', icon: Eye }
    };
    return configs[status] || configs.pending;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { badge: 'bg-red-100 text-red-800', label: 'Cao', icon: AlertTriangle },
      medium: { badge: 'bg-orange-100 text-orange-800', label: 'Trung bình', icon: AlertCircle },
      low: { badge: 'bg-green-100 text-green-800', label: 'Thấp', icon: CheckCircle }
    };
    return configs[priority] || configs.medium;
  };

  const getRiskLevel = (score) => {
    if (score >= 0.7) return { level: 'high', colorText: 'text-red-600', label: 'Cao' };
    if (score >= 0.4) return { level: 'medium', colorText: 'text-orange-600', label: 'Trung bình' };
    return { level: 'low', colorText: 'text-green-600', label: 'Thấp' };
  };

  const getTierConfig = (tier) => {
    const configs = {
      premium: { badge: 'bg-purple-100 text-purple-800', label: 'Premium', icon: Crown },
      verified: { badge: 'bg-green-100 text-green-800', label: 'Verified', icon: Shield },
      unverified: { badge: 'bg-gray-100 text-gray-800', label: 'Unverified', icon: Clock }
    };
    return configs[tier] || configs.unverified;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
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

  // -----------------------------
  // Filtering / sorting / selection
  // -----------------------------
  const filteredConnections = useMemo(() => {
    let arr = [...connectionRequests];

    // tab filter
    if (activeTab !== 'all') {
      arr = arr.filter(c => c.status === activeTab);
    }

    // search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      arr = arr.filter(conn =>
        conn.partnerName.toLowerCase().includes(q) ||
        conn.volunteerName.toLowerCase().includes(q) ||
        conn.eventName.toLowerCase().includes(q) ||
        conn.id.toLowerCase().includes(q)
      );
    }

    // extra filters
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'high_risk') arr = arr.filter(c => c.riskScore >= 0.7);
      else if (selectedFilter === 'auto_blocked') arr = arr.filter(c => c.autoApprovalBlocked);
      else if (selectedFilter === 'premium_partner') arr = arr.filter(c => c.partnerTier === 'premium');
      else if (selectedFilter === 'high_trust_volunteer') arr = arr.filter(c => c.volunteerTrustScore >= 4.5);
    }

    // sort
    arr.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortBy === 'submitDate') {
        aVal = new Date(a.submitDate).getTime();
        bVal = new Date(b.submitDate).getTime();
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return arr;
  }, [connectionRequests, activeTab, searchTerm, selectedFilter, sortBy, sortOrder]);

  const toggleSelect = (id) => {
    setSelectedConnections(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAllVisible = () => {
    const ids = filteredConnections.map(c => c.id);
    setSelectedConnections(ids);
  };

  const clearSelection = () => setSelectedConnections([]);

  // -----------------------------
  // Actions (mock)
  // -----------------------------
  const handleBulkAction = (action) => {
    console.log(`[BULK] action=${action}`, selectedConnections);
    // placeholder: call API to perform bulk approve/reject/flag
    setShowBulkActionModal(false);
    setSelectedConnections([]);
  };

  const handleApprove = (connectionId, note = '') => {
    console.log(`[APPROVE] id=${connectionId}`, note);
    // placeholder: call API and update state
    setShowDetailModal(false);
    setSelectedConnection(null);
  };

  const handleReject = (connectionId, reason = '') => {
    console.log(`[REJECT] id=${connectionId}`, reason);
    // placeholder: call API and update state
    setShowDetailModal(false);
    setSelectedConnection(null);
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Connection Approval Queue</h1>
          <p className="text-sm text-gray-600 mt-1">Quản lý yêu cầu kết nối giữa tình nguyện viên và đối tác</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-gray-500">Tổng yêu cầu</div>
            <div className="text-lg font-semibold">{stats.total}</div>
          </div>
          <button
            onClick={() => {
              setShowBulkActionModal(true);
            }}
            className="px-3 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Bulk actions</span>
          </button>
        </div>
      </div>

      {/* Tabs and Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {[
              { key: 'pending', label: `Chờ duyệt (${stats.pending})` },
              { key: 'approved', label: `Đã duyệt (${stats.approved})` },
              { key: 'rejected', label: `Từ chối (${stats.rejected})` },
              { key: 'flagged', label: `Cần xem xét (${stats.flagged})` },
              { key: 'all', label: 'Tất cả' }
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-3 py-2 text-sm rounded ${activeTab === t.key ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo đối tác, TNV, sự kiện, mã..."
                className="pl-9 pr-3 py-2 border rounded-md w-80"
              />
            </div>

            <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="px-3 py-2 border rounded-md">
              <option value="all">Tất cả bộ lọc</option>
              <option value="high_risk">Rủi ro cao</option>
              <option value="auto_blocked">Bị chặn auto-approve</option>
              <option value="premium_partner">Đối tác Premium</option>
              <option value="high_trust_volunteer">TNV điểm cao</option>
            </select>

            <div className="flex items-center space-x-2">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-2 py-2 border rounded-md text-sm">
                <option value="submitDate">Ngày nộp</option>
                <option value="riskScore">Risk score</option>
                <option value="requirementMatch">Match %</option>
              </select>
              <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="px-2 py-2 border rounded-md">
                {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List / Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedConnections.length > 0 && selectedConnections.length === filteredConnections.length && filteredConnections.length > 0}
              onChange={(e) => e.target.checked ? selectAllVisible() : clearSelection()}
              className="h-4 w-4"
            />
            <div className="text-sm text-gray-700">{filteredConnections.length} kết quả</div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (selectedConnections.length === 0) return alert('Chọn ít nhất 1 yêu cầu để thực hiện bulk action');
                setShowBulkActionModal(true);
              }}
              className="px-3 py-2 bg-gray-50 border rounded text-sm hover:bg-gray-100"
            >
              Bulk action ({selectedConnections.length})
            </button>
            <button onClick={() => { setSearchTerm(''); setSelectedFilter('all'); setSortBy('submitDate'); setSortOrder('desc'); }} className="px-3 py-2 border rounded text-sm">
              Reset
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left w-10"></th>
                <th className="px-4 py-3 text-left">Mã / Sự kiện</th>
                <th className="px-4 py-3 text-left">Đối tác</th>
                <th className="px-4 py-3 text-left">TNV</th>
                <th className="px-4 py-3 text-left">Match / Risk</th>
                <th className="px-4 py-3 text-left">Trạng thái</th>
                <th className="px-4 py-3 text-left">Thời gian</th>
                <th className="px-4 py-3 text-left w-36">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredConnections.map((c) => {
                const statusCfg = getStatusConfig(c.status);
                const tierCfg = getTierConfig(c.partnerTier);
                const risk = getRiskLevel(c.riskScore);
                return (
                  <tr key={c.id} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedConnections.includes(c.id)}
                        onChange={() => toggleSelect(c.id)}
                        className="h-4 w-4"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-medium">{c.id}</div>
                      <div className="text-gray-500">{c.eventName}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img src={c.partnerLogo} alt={c.partnerName} className="w-10 h-10 rounded-md object-cover border" />
                        <div>
                          <div className="font-medium">{c.partnerName}</div>
                          <div className="text-xs mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${tierCfg.badge}`}>{tierCfg.label}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img src={c.volunteerAvatar} alt={c.volunteerName} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <div className="font-medium">{c.volunteerName}</div>
                          <div className="text-xs text-gray-500">
                            <Star className="w-3 h-3 inline text-yellow-400" /> {c.volunteerTrustScore}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-sm font-medium">{c.requirementMatch}%</div>
                      <div className="text-xs text-gray-500">{c.riskScore >= 0 ? `Risk: ${(c.riskScore * 100).toFixed(0)}%` : '-'}</div>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusCfg.badge}`}>{statusCfg.label}</span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-sm">{formatDate(c.submitDate)}</div>
                      <div className="text-xs text-gray-500">{getTimeAgo(c.submitDate)}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => { setSelectedConnection(c); setShowDetailModal(true); }}
                          title="Xem chi tiết"
                          className="p-2 rounded hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>

                        <button
                          onClick={() => handleApprove(c.id)}
                          title="Phê duyệt"
                          className="p-2 rounded hover:bg-green-50"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>

                        <button
                          onClick={() => handleReject(c.id)}
                          title="Từ chối"
                          className="p-2 rounded hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                        </button>

                        <button
                          title="Thêm hành động"
                          className="p-2 rounded hover:bg-gray-100"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredConnections.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    Không có yêu cầu nào khớp
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
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">Bulk Action</h3>
              <button onClick={() => setShowBulkActionModal(false)} className="p-2 rounded hover:bg-gray-100">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">Chọn hành động để áp dụng cho <strong>{selectedConnections.length}</strong> yêu cầu.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <button onClick={() => handleBulkAction('approve')} className="px-4 py-2 bg-green-600 text-white rounded">Approve</button>
              <button onClick={() => handleBulkAction('reject')} className="px-4 py-2 bg-red-600 text-white rounded">Reject</button>
              <button onClick={() => handleBulkAction('flag')} className="px-4 py-2 bg-orange-500 text-white rounded">Flag for review</button>
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowBulkActionModal(false)} className="px-4 py-2 border rounded">Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedConnection && (
        <ConnectionDetailModal
          connection={selectedConnection}
          onClose={() => { setShowDetailModal(false); setSelectedConnection(null); }}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

/**
 * ConnectionDetailModal
 * - connection: object
 * - onClose: fn
 * - onApprove: fn(connectionId, note)
 * - onReject: fn(connectionId, reason)
 */
function ConnectionDetailModal({ connection, onClose, onApprove, onReject }) {
  const [reviewNote, setReviewNote] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

  const riskLevel = getRiskLevelLocal(connection.riskScore);
  const tierCfg = getTierConfigLocal(connection.partnerTier);
  const TierIcon = tierCfg.icon;

  // Local helpers (we can't call parent helpers since not exported)
  function getRiskLevelLocal(score) {
    if (score >= 0.7) return { level: 'high', colorText: 'text-red-600', label: 'Cao' };
    if (score >= 0.4) return { level: 'medium', colorText: 'text-orange-600', label: 'Trung bình' };
    return { level: 'low', colorText: 'text-green-600', label: 'Thấp' };
  }
  function getTierConfigLocal(tier) {
    const configs = {
      premium: { badge: 'bg-purple-100 text-purple-800', label: 'Premium', icon: Crown },
      verified: { badge: 'bg-green-100 text-green-800', label: 'Verified', icon: Shield },
      unverified: { badge: 'bg-gray-100 text-gray-800', label: 'Unverified', icon: Clock }
    };
    return configs[tier] || configs.unverified;
  }
  function formatDateLocal(dateString) {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Chi tiết yêu cầu {connection.id}</h2>
            <div className="text-sm text-gray-500 mt-1">{connection.eventName} • {connection.location}</div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Overview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img src={connection.partnerLogo} alt={connection.partnerName} className="w-12 h-12 rounded-md object-cover border" />
                  <div>
                    <div className="font-medium text-gray-900">{connection.partnerName}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${tierCfg.badge}`}>{tierCfg.label}</span>
                      <span className="ml-2 text-xs text-gray-500">• {connection.connectionType === 'event_specific' ? 'Sự kiện' : 'Hỗ trợ'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500">AI Recommendation</div>
                  <div className="mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      connection.aiRecommendation === 'approve' ? 'bg-green-100 text-green-800' :
                      connection.aiRecommendation === 'reject' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {connection.aiRecommendation === 'approve' ? 'Duyệt' : connection.aiRecommendation === 'reject' ? 'Từ chối' : 'Xem xét'}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">({(connection.aiConfidence * 100).toFixed(0)}% confidence)</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Mã yêu cầu</div>
                  <div className="font-medium">{connection.id}</div>
                </div>
                <div>
                  <div className="text-gray-600">Ngày nộp</div>
                  <div className="font-medium">{formatDateLocal(connection.submitDate)}</div>
                </div>
                <div>
                  <div className="text-gray-600">Vai trò đề xuất</div>
                  <div className="font-medium">{connection.proposedRole}</div>
                </div>
                <div>
                  <div className="text-gray-600">Thời gian</div>
                  <div className="font-medium">{connection.proposedSchedule}</div>
                </div>
                <div>
                  <div className="text-gray-600">Địa điểm</div>
                  <div className="font-medium">{connection.location}</div>
                </div>
                <div>
                  <div className="text-gray-600">Tỉ lệ phù hợp</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${connection.requirementMatch >= 80 ? 'bg-green-500' : connection.requirementMatch >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${connection.requirementMatch}%` }} />
                    </div>
                    <div className="text-sm font-semibold">{connection.requirementMatch}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-2">Tin nhắn từ đối tác</h4>
              <p className="text-gray-800">{connection.requestMessage}</p>
            </div>

            {/* Risk / Flags */}
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-2">Đánh giá rủi ro</h4>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">Risk score</div>
                <div className="text-sm font-semibold">{(connection.riskScore * 100).toFixed(0)}%</div>
              </div>

              {connection.flaggedReasons.length > 0 ? (
                <ul className="space-y-2">
                  {connection.flaggedReasons.map((r, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-1" />
                      <div className="text-sm">{r}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-500">Không có cảnh báo</div>
              )}
            </div>

            {/* Review History */}
            {connection.reviewHistory && connection.reviewHistory.length > 0 && (
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium mb-2">Lịch sử xem xét</h4>
                <div className="space-y-2">
                  {connection.reviewHistory.map((r, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{r.reviewer}</div>
                        <div className="text-xs text-gray-500">{formatDateLocal(r.date)}</div>
                      </div>
                      <div className="text-gray-700">{r.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Review input */}
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-2">Ghi chú / Quyết định</h4>
              <textarea value={reviewNote} onChange={(e) => setReviewNote(e.target.value)} rows={4} className="w-full border rounded p-2" placeholder="Ghi chú cho quyết định (tùy chọn)"></textarea>

              <div className="mt-3 flex items-center space-x-3">
                <button onClick={() => { setSelectedAction('approve'); onApprove(connection.id, reviewNote); }} className="px-4 py-2 bg-green-600 text-white rounded">Phê duyệt</button>
                <button onClick={() => { setSelectedAction('reject'); onReject(connection.id, reviewNote); }} className="px-4 py-2 bg-red-600 text-white rounded">Từ chối</button>
                <button onClick={() => { setSelectedAction('flag'); alert('Flagged for further review (mock)'); }} className="px-4 py-2 bg-orange-500 text-white rounded">Gắn cờ</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-3">Đối tác</h4>
              <div className="flex items-center space-x-3">
                <img src={connection.partnerLogo} alt={connection.partnerName} className="w-12 h-12 rounded-md object-cover border" />
                <div>
                  <div className="font-medium">{connection.partnerName}</div>
                  <div className="text-xs mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${tierCfg.badge}`}>{tierCfg.label}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-3 px-3 py-2 border rounded text-sm text-blue-600">Xem hồ sơ đối tác</button>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-3">Tình nguyện viên</h4>
              <div className="flex items-center space-x-3">
                <img src={connection.volunteerAvatar} alt={connection.volunteerName} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-medium">{connection.volunteerName}</div>
                  <div className="text-xs text-gray-500 mt-1"><Star className="w-3 h-3 inline text-yellow-400" /> {connection.volunteerTrustScore}</div>
                </div>
              </div>
              <button className="w-full mt-3 px-3 py-2 border rounded text-sm text-blue-600">Xem hồ sơ TNV</button>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-3">Thông tin nhanh</h4>
              <div className="text-sm space-y-2">
                <div><span className="text-gray-500">Ưu tiên:</span> <strong>{connection.priority}</strong></div>
                <div><span className="text-gray-500">Match:</span> <strong>{connection.requirementMatch}%</strong></div>
                <div><span className="text-gray-500">Risk:</span> <strong className={riskLevel.colorText}>{(connection.riskScore * 100).toFixed(0)}%</strong></div>
                <div><span className="text-gray-500">Auto-blocked:</span> <strong>{connection.autoApprovalBlocked ? 'Có' : 'Không'}</strong></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Đóng</button>
        </div>
      </div>
    </div>
  );
}
