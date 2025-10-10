import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  User, Phone, Mail, Camera, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, ArrowLeft, Share2,
  AlertCircle, Info, CheckSquare, X, Plus, Minus, Bell
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

/**
 * VolunteerViolationManagement
 * - Mock data (replace by API calls as needed)
 * - Filter/search/tab, chart visualization, list/card view
 * - View detail modal + create modal (mock)
 *
 * Notes:
 * - All state changes are local (mock). Replace with API calls for persistence.
 */

export default function VolunteerViolationManagement() {
  // -------------------
  // Mock data (replace with API)
  // -------------------
  const initialViolations = [
    {
      id: 'VL-001',
      volunteerId: 1,
      volunteerName: 'Lê Thị Hương',
      volunteerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      eventId: 'EVT-123',
      eventName: 'Dọn dẹp bãi biển Vũng Tàu',
      organizerName: 'Green Vietnam',
      violationType: 'no_show',
      severity: 'medium',
      status: 'confirmed',
      reportDate: '2024-11-28T10:00:00Z',
      incidentDate: '2024-11-25T08:00:00Z',
      description: 'Tình nguyện viên đăng ký tham gia nhưng không xuất hiện và không thông báo trước.',
      evidence: [
        { type: 'attendance_log', description: 'Danh sách điểm danh sự kiện' },
        { type: 'communication_log', description: 'Lịch sử tin nhắn với TNV' }
      ],
      reporterType: 'organizer',
      reporterName: 'Nguyễn Quản lý',
      impact: 'Ảnh hưởng đến kế hoạch phân công công việc, phải tìm người thay thế gấp',
      adminNotes: '',
      resolution: null,
      appealStatus: null
    },
    {
      id: 'VL-002',
      volunteerId: 4,
      volunteerName: 'Phạm Hoàng Nam',
      volunteerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      eventId: 'EVT-124',
      eventName: 'Hỗ trợ người già Neo Đơn',
      organizerName: 'Tình Người',
      violationType: 'misconduct',
      severity: 'high',
      status: 'under_review',
      reportDate: '2024-12-01T15:30:00Z',
      incidentDate: '2024-11-30T14:00:00Z',
      description: 'Có hành vi không phù hợp với đối tượng hưởng lợi, sử dụng ngôn từ thiếu tôn trọng.',
      evidence: [
        { type: 'witness_statement', description: 'Lời khai từ 2 TNV khác' },
        { type: 'photo', description: 'Hình ảnh ghi lại sự việc' },
        { type: 'complaint_letter', description: 'Đơn khiếu nại từ gia đình hưởng lợi' }
      ],
      reporterType: 'beneficiary',
      reporterName: 'Gia đình bà Lan',
      impact: 'Gây tổn hại đến hình ảnh tổ chức và ảnh hưởng tâm lý người hưởng lợi',
      adminNotes: 'Cần điều tra kỹ và xem xét tạm đình chỉ',
      resolution: null,
      appealStatus: null
    },
    {
      id: 'VL-003',
      volunteerId: 2,
      volunteerName: 'Trần Văn Minh',
      volunteerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      eventId: 'EVT-125',
      eventName: 'Dạy học trẻ em vùng cao',
      organizerName: 'Education For All',
      violationType: 'policy_violation',
      severity: 'low',
      status: 'resolved',
      reportDate: '2024-11-20T09:00:00Z',
      incidentDate: '2024-11-18T16:00:00Z',
      description: 'Sử dụng điện thoại cá nhân để chụp ảnh trẻ em mà không xin phép.',
      evidence: [
        { type: 'policy_document', description: 'Quy định về bảo vệ trẻ em' },
        { type: 'incident_report', description: 'Báo cáo từ trưởng nhóm' }
      ],
      reporterType: 'team_leader',
      reporterName: 'Chị Hoa - Team Leader',
      impact: 'Vi phạm quy định bảo vệ quyền riêng tư trẻ em',
      adminNotes: 'Đã nhắc nhở và cam kết không tái phạm',
      resolution: {
        action: 'warning',
        date: '2024-11-22T10:00:00Z',
        note: 'Cảnh báo bằng văn bản và yêu cầu tham gia khóa đào tạo về quy định'
      },
      appealStatus: null
    }
  ];

  const stats = {
    total: 156,
    pending: 23,
    underReview: 12,
    confirmed: 89,
    resolved: 32,
    thisMonth: 18,
    lastMonth: 24,
    avgResolutionTime: 5.2
  };

  const violationTrends = [
    { month: 'T7', total: 15, noShow: 8, misconduct: 4, policy: 3 },
    { month: 'T8', total: 22, noShow: 12, misconduct: 6, policy: 4 },
    { month: 'T9', total: 19, noShow: 10, misconduct: 5, policy: 4 },
    { month: 'T10', total: 28, noShow: 15, misconduct: 8, policy: 5 },
    { month: 'T11', total: 24, noShow: 13, misconduct: 7, policy: 4 },
    { month: 'T12', total: 18, noShow: 9, misconduct: 5, policy: 4 }
  ];

  const violationTypes = [
    { name: 'Không xuất hiện', value: 45, color: '#ef4444' },
    { name: 'Hành vi sai trái', value: 28, color: '#f59e0b' },
    { name: 'Vi phạm quy định', value: 18, color: '#3b82f6' },
    { name: 'Khác', value: 9, color: '#6b7280' }
  ];

  const severityData = [
    { name: 'Cao', value: 23, color: '#dc2626' },
    { name: 'Trung bình', value: 67, color: '#ea580c' },
    { name: 'Thấp', value: 66, color: '#facc15' }
  ];

  // -------------------
  // Component state
  // -------------------
  const [records, setRecords] = useState(initialViolations);
  const [activeTab, setActiveTab] = useState('all'); // all, pending, under_review, confirmed, resolved
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // severity or type filter
  const [selectedViolations, setSelectedViolations] = useState([]);
  const [showViolationModal, setShowViolationModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // list or cards
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // -------------------
  // Helpers
  // -------------------
  const getViolationTypeLabel = (type) => {
    const types = {
      'no_show': 'Không xuất hiện',
      'misconduct': 'Hành vi sai trái',
      'policy_violation': 'Vi phạm quy định',
      'safety_violation': 'Vi phạm an toàn',
      'other': 'Khác'
    };
    return types[type] || type;
  };

  const getSeverityConfig = (severity) => {
    const configs = {
      high: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Cao', icon: AlertTriangle },
      medium: { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Trung bình', icon: AlertCircle },
      low: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Thấp', icon: Info }
    };
    return configs[severity] || configs.medium;
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: 'bg-gray-100 text-gray-800', label: 'Chờ xử lý', icon: Clock },
      under_review: { color: 'bg-blue-100 text-blue-800', label: 'Đang xem xét', icon: Eye },
      confirmed: { color: 'bg-red-100 text-red-800', label: 'Đã xác nhận', icon: CheckCircle },
      resolved: { color: 'bg-green-100 text-green-800', label: 'Đã giải quyết', icon: CheckSquare },
      dismissed: { color: 'bg-gray-100 text-gray-800', label: 'Bỏ qua', icon: X }
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // -------------------
  // Filtering & Pagination
  // -------------------
  const filtered = useMemo(() => {
    let out = [...records];

    // tab filter
    if (activeTab !== 'all') {
      out = out.filter(v => v.status === activeTab);
    }

    // search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      out = out.filter(v =>
        v.volunteerName.toLowerCase().includes(q) ||
        v.eventName.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q)
      );
    }

    // selectedFilter
    if (selectedFilter !== 'all') {
      // could be severity or type — we treat both
      out = out.filter(v => v.severity === selectedFilter || v.violationType === selectedFilter);
    }

    return out;
  }, [records, activeTab, searchTerm, selectedFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // -------------------
  // Actions (mock: update local state)
  // -------------------
  const toggleSelect = (id) => {
    setSelectedViolations(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAllPage = () => {
    const ids = paginated.map(v => v.id);
    const allSelected = ids.every(id => selectedViolations.includes(id));
    if (allSelected) setSelectedViolations(prev => prev.filter(id => !ids.includes(id)));
    else setSelectedViolations(prev => Array.from(new Set([...prev, ...ids])));
  };

  const handleBulkAction = (action) => {
    // mock: update local statuses
    console.log('Bulk action', action, selectedViolations);
    if (action === 'resolve') {
      setRecords(prev => prev.map(r => selectedViolations.includes(r.id) ? ({ ...r, status: 'resolved', resolution: { action: 'auto-bulk-resolve', date: new Date().toISOString() } }) : r));
    } else if (action === 'confirm') {
      setRecords(prev => prev.map(r => selectedViolations.includes(r.id) ? ({ ...r, status: 'confirmed' }) : r));
    } else if (action === 'dismiss') {
      setRecords(prev => prev.map(r => selectedViolations.includes(r.id) ? ({ ...r, status: 'dismissed' }) : r));
    }
    setSelectedViolations([]);
  };

  const handleChangeStatus = (id, newStatus) => {
    setRecords(prev => prev.map(r => r.id === id ? ({ ...r, status: newStatus }) : r));
  };

  const openDetail = (violation) => {
    setSelectedViolation(violation);
    setShowViolationModal(true);
  };

  const closeDetail = () => {
    setSelectedViolation(null);
    setShowViolationModal(false);
  };

  // -------------------
  // Modal components (internal)
  // -------------------
  const ViolationDetailModal = ({ violation, onClose }) => {
    const [adminNote, setAdminNote] = useState(violation?.adminNotes || '');
    const [action, setAction] = useState('');

    if (!violation) return null;
    const sevCfg = getSeverityConfig(violation.severity);
    const statusCfg = getStatusConfig(violation.status);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="text-lg font-semibold">Chi tiết vi phạm — {violation.id}</h3>
              <div className="text-sm text-gray-500">{violation.eventName} • Báo cáo: {formatDate(violation.reportDate)}</div>
            </div>
            <button onClick={onClose} className="p-2"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Mô tả</h4>
                  <p className="text-gray-900">{violation.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">Bằng chứng</h4>
                  <div className="space-y-2 mt-2">
                    {violation.evidence.map((e, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{e.description}</div>
                            <div className="text-xs text-gray-500">{e.type}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-sm text-blue-600">Xem</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">Ghi chú Admin</h4>
                  <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} rows={4} className="w-full p-3 border rounded" placeholder="Ghi chú xử lý..." />
                  <div className="flex justify-end gap-2 mt-3">
                    <button onClick={() => { /* save note mock */ alert('Đã lưu (mock)'); }} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu ghi chú</button>
                  </div>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="p-4 border rounded">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={violation.volunteerAvatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-medium">{violation.volunteerName}</div>
                      <div className="text-xs text-gray-500">ID: {violation.volunteerId}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Sự kiện</div>
                  <div className="font-medium">{violation.eventName}</div>
                  <div className="text-xs text-gray-500">{violation.organizerName}</div>
                </div>

                <div className="p-4 border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Mức độ</div>
                    <div className={`px-2 py-1 text-xs rounded ${sevCfg.color}`}>{sevCfg.label}</div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Trạng thái</div>
                    <div className={`px-2 py-1 text-xs rounded ${statusCfg.color}`}>{statusCfg.label}</div>
                  </div>
                  <div className="text-sm text-gray-600">Báo cáo bởi</div>
                  <div className="text-sm">{violation.reporterName} ({violation.reporterType})</div>
                </div>

                <div className="p-4 border rounded space-y-2">
                  <button onClick={() => handleChangeStatus(violation.id, 'confirmed')} className="w-full px-3 py-2 bg-red-600 text-white rounded">Xác nhận</button>
                  <button onClick={() => handleChangeStatus(violation.id, 'resolved')} className="w-full px-3 py-2 bg-green-600 text-white rounded">Giải quyết</button>
                  <button onClick={() => handleChangeStatus(violation.id, 'dismissed')} className="w-full px-3 py-2 border rounded">Bỏ qua</button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CreateViolationModal = ({ onClose }) => {
    const [form, setForm] = useState({ volunteerName: '', eventName: '', violationType: '', severity: 'medium', description: '' });

    const submit = (e) => {
      e.preventDefault();
      // mock create
      const newV = {
        id: `VL-${Math.floor(Math.random()*900)+100}`,
        volunteerId: Math.floor(Math.random()*1000),
        volunteerName: form.volunteerName || 'TNV mới',
        volunteerAvatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150',
        eventId: `EVT-${Math.floor(Math.random()*900)+100}`,
        eventName: form.eventName || 'Sự kiện mới',
        organizerName: 'Handmade',
        violationType: form.violationType || 'other',
        severity: form.severity,
        status: 'pending',
        reportDate: new Date().toISOString(),
        incidentDate: new Date().toISOString(),
        description: form.description,
        evidence: [],
        reporterType: 'admin',
        reporterName: 'Admin (manual)',
        impact: '',
        adminNotes: ''
      };
      setRecords(prev => [newV, ...prev]);
      onClose();
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full z-10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tạo báo cáo vi phạm mới</h3>
            <button onClick={onClose}><X className="w-5 h-5" /></button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={form.volunteerName} onChange={(e)=>setForm({...form, volunteerName: e.target.value})} placeholder="Tên TNV" className="p-2 border rounded" />
              <input value={form.eventName} onChange={(e)=>setForm({...form, eventName: e.target.value})} placeholder="Tên sự kiện" className="p-2 border rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select value={form.violationType} onChange={(e)=>setForm({...form, violationType: e.target.value})} className="p-2 border rounded">
                <option value="">Chọn loại</option>
                <option value="no_show">Không xuất hiện</option>
                <option value="misconduct">Hành vi sai trái</option>
                <option value="policy_violation">Vi phạm quy định</option>
              </select>
              <select value={form.severity} onChange={(e)=>setForm({...form, severity: e.target.value})} className="p-2 border rounded">
                <option value="low">Thấp</option>
                <option value="medium">Trung bình</option>
                <option value="high">Cao</option>
              </select>
            </div>
            <textarea value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} rows={4} className="w-full p-2 border rounded" placeholder="Mô tả..." />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Hủy</button>
              <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">Tạo báo cáo</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // -------------------
  // UI
  // -------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Vi phạm</h1>
            <p className="text-gray-600 mt-1">Theo dõi, xử lý vi phạm và duy trì chất lượng cộng đồng tình nguyện</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border rounded overflow-hidden">
              <input className="px-3 py-2 w-64" placeholder="Tìm theo tên, sự kiện, ID..." value={searchTerm} onChange={(e)=>{ setSearchTerm(e.target.value); setPage(1); }} />
              <div className="px-3 border-l"><Search className="w-4 h-4 text-gray-500" /></div>
            </div>
            <button onClick={()=>setShowCreateModal(true)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded">
              <Plus className="w-4 h-4" /> Tạo báo cáo
            </button>
            <button className="px-4 py-2 bg-white border rounded">Xuất</button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow-sm border">
            <div className="text-sm text-gray-500">Tổng vi phạm</div>
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-gray-400 mt-1">Tháng này: {stats.thisMonth}</div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm border">
            <div className="text-sm text-gray-500">Chờ xử lý</div>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-xs text-gray-400 mt-1">Đang chờ</div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm border">
            <div className="text-sm text-gray-500">Đang xem xét</div>
            <div className="text-2xl font-bold">{stats.underReview}</div>
            <div className="text-xs text-gray-400 mt-1">Cần điều tra</div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm border">
            <div className="text-sm text-gray-500">Đã xác nhận</div>
            <div className="text-2xl font-bold">{stats.confirmed}</div>
            <div className="text-xs text-gray-400 mt-1">Đã xử lý</div>
          </div>
        </div>

        {/* Charts + filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Xu hướng vi phạm (6 tháng)</h3>
              <div className="text-sm text-gray-500">Tổng quan</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={violationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#ef4444" strokeWidth={2} name="Tổng" />
                <Line type="monotone" dataKey="noShow" stroke="#3b82f6" strokeWidth={2} name="Không xuất hiện" />
                <Line type="monotone" dataKey="misconduct" stroke="#f59e0b" strokeWidth={2} name="Hành vi" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Phân loại vi phạm</h3>
              <div className="text-sm text-gray-500">Tỷ lệ</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={violationTypes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {violationTypes.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border rounded overflow-hidden">
              <select className="px-3 py-2" value={selectedFilter} onChange={(e)=>{ setSelectedFilter(e.target.value); setPage(1); }}>
                <option value="all">Tất cả mức/loại</option>
                <option value="high">Mức cao</option>
                <option value="medium">Mức trung bình</option>
                <option value="low">Mức thấp</option>
                <option value="no_show">Không xuất hiện</option>
                <option value="misconduct">Hành vi sai trái</option>
                <option value="policy_violation">Vi phạm quy định</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={()=>setViewMode('list')} className={`px-3 py-2 border rounded ${viewMode==='list' ? 'bg-gray-100' : ''}`}>Danh sách</button>
              <button onClick={()=>setViewMode('cards')} className={`px-3 py-2 border rounded ${viewMode==='cards' ? 'bg-gray-100' : ''}`}>Card</button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedViolations.length > 0 && (
              <>
                <span className="text-sm text-gray-600">Đã chọn {selectedViolations.length}</span>
                <button onClick={()=>handleBulkAction('confirm')} className="px-3 py-2 bg-red-600 text-white rounded">Xác nhận</button>
                <button onClick={()=>handleBulkAction('resolve')} className="px-3 py-2 bg-green-600 text-white rounded">Giải quyết</button>
                <button onClick={()=>handleBulkAction('dismiss')} className="px-3 py-2 border rounded">Bỏ qua</button>
              </>
            )}
          </div>
        </div>

        {/* Violations list/cards */}
        <div className="bg-white rounded shadow-sm border">
          {/* header row */}
          <div className="p-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={paginated.length>0 && paginated.every(v=>selectedViolations.includes(v.id))} onChange={handleSelectAllPage} />
              <div className="text-sm text-gray-600">Mã / TNV / Sự kiện</div>
            </div>
            <div className="text-sm text-gray-500">Trạng thái • Hành động</div>
          </div>

          {viewMode === 'list' ? (
            paginated.map(v => {
              const statusCfg = getStatusConfig(v.status);
              const sevCfg = getSeverityConfig(v.severity);
              return (
                <div key={v.id} className="p-4 flex items-start justify-between hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" checked={selectedViolations.includes(v.id)} onChange={()=>toggleSelect(v.id)} className="mt-1" />
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="font-semibold text-gray-900">{v.id}</div>
                        <div className="text-sm text-gray-700">{v.volunteerName}</div>
                        <div className="text-sm text-gray-500">• {v.eventName}</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{v.description}</div>
                      <div className="flex items-center gap-2 mt-2 text-xs">
                        <div className={`px-2 py-0.5 rounded ${statusCfg.color}`}>{statusCfg.label}</div>
                        <div className={`px-2 py-0.5 rounded ${sevCfg.color}`}>{sevCfg.label}</div>
                        <div className="text-gray-400">• Báo cáo: {formatDate(v.reportDate)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={()=>openDetail(v)} className="px-3 py-1 border rounded text-sm flex items-center gap-2"><Eye className="w-4 h-4" /> Chi tiết</button>
                    <button onClick={()=>handleChangeStatus(v.id, 'confirmed')} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Xác nhận</button>
                    <button onClick={()=>handleChangeStatus(v.id, 'resolved')} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Giải quyết</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map(v => {
                const statusCfg = getStatusConfig(v.status);
                return (
                  <div key={v.id} className="border rounded p-4 bg-white shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">{v.volunteerName}</div>
                        <div className="text-xs text-gray-500">{v.eventName}</div>
                      </div>
                      <div className="text-xs">
                        <div className={`px-2 py-1 rounded ${getSeverityConfig(v.severity).color}`}>{getSeverityConfig(v.severity).label}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-3 line-clamp-3">{v.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-gray-500">Báo cáo: {formatDate(v.reportDate)}</div>
                      <div className="flex items-center gap-2">
                        <button onClick={()=>openDetail(v)} className="px-2 py-1 border rounded text-xs">Chi tiết</button>
                        <button onClick={()=>toggleSelect(v.id)} className={`px-2 py-1 rounded text-xs ${selectedViolations.includes(v.id) ? 'bg-gray-200' : 'bg-white border'}`}>{selectedViolations.includes(v.id) ? 'Đã chọn' : 'Chọn'}</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* pagination */}
          <div className="p-3 flex items-center justify-between border-t">
            <div className="text-sm text-gray-600">Hiển thị {Math.min((page-1)*pageSize+1, filtered.length)} - {Math.min(page*pageSize, filtered.length)} / {filtered.length}</div>
            <div className="flex items-center gap-2">
              <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-2 py-1 border rounded disabled:opacity-50">Prev</button>
              <div className="px-3 text-sm">{page}/{totalPages}</div>
              <button disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-2 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showViolationModal && selectedViolation && <ViolationDetailModal violation={selectedViolation} onClose={closeDetail} />}
      {showCreateModal && <CreateViolationModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}
