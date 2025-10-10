import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  CheckCircle2,
  User, Phone, Mail, Camera, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, ArrowLeft, Share2,
  AlertCircle, Info, CheckSquare, X, Plus, Minus, Bell,
  BookOpen, GraduationCap, BadgeCheck, QrCode,
  ExternalLink, Copy, Printer, Send, Upload
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts';

/**
 * VolunteerCertificationSystem
 * - Complete UI with mock data
 * - Replace mock data with API calls where commented (// TODO: API)
 */

export default function VolunteerCertificationSystem() {
  // ----------------------------
  // Initial/mock data (move to API)
  // ----------------------------
  const initialCertificates = [
    {
      id: 'CERT-001',
      certificateId: 'VH-2024-ENV-001234',
      volunteerId: 1,
      volunteerName: 'Nguyễn Thị Lan',
      volunteerEmail: 'lan.nguyen@email.com',
      volunteerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150',
      eventId: 'EVT-123',
      eventName: 'Dọn dẹp bãi biển Vũng Tàu 2024',
      organizerName: 'Green Vietnam',
      certificateType: 'participation',
      category: 'environment',
      issueDate: '2024-11-30T10:00:00Z',
      completionDate: '2024-11-28T16:00:00Z',
      status: 'issued',
      hoursContributed: 8,
      role: 'Tình nguyện viên',
      skills: ['Làm việc nhóm', 'Bảo vệ môi trường', 'Tổ chức sự kiện'],
      achievements: ['Hoàn thành xuất sắc', 'Tinh thần trách nhiệm cao'],
      verificationCode: 'VH2024ENV001234',
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      templateId: 'TPL-ENV-001',
      isPublic: true,
      downloadCount: 12,
      shareCount: 3,
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    },
    {
      id: 'CERT-002',
      certificateId: 'VH-2024-EDU-005678',
      volunteerId: 2,
      volunteerName: 'Trần Văn Minh',
      volunteerEmail: 'minh.tran@email.com',
      volunteerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      eventId: 'EVT-124',
      eventName: 'Dạy học trẻ em vùng cao Sapa',
      organizerName: 'Education For All',
      certificateType: 'completion',
      category: 'education',
      issueDate: '2024-12-01T14:30:00Z',
      completionDate: '2024-11-29T18:00:00Z',
      status: 'issued',
      hoursContributed: 24,
      role: 'Giáo viên tình nguyện',
      skills: ['Giảng dạy', 'Giao tiếp', 'Kiên nhẫn', 'Sáng tạo'],
      achievements: ['Được học sinh yêu thích', 'Phương pháp giảng dạy sáng tạo'],
      verificationCode: 'VH2024EDU005678',
      blockchainHash: '0x9876543210fedcba0987654321fedcba09876543',
      templateId: 'TPL-EDU-001',
      isPublic: true,
      downloadCount: 8,
      shareCount: 5,
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    },
    {
      id: 'CERT-003',
      certificateId: 'VH-2024-HLT-009012',
      volunteerId: 3,
      volunteerName: 'Lê Thị Hương',
      volunteerEmail: 'huong.le@email.com',
      volunteerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      eventId: 'EVT-125',
      eventName: 'Khám sức khỏe miễn phí cho người cao tuổi',
      organizerName: 'Tình Người Medical',
      certificateType: 'achievement',
      category: 'healthcare',
      issueDate: '2024-11-25T09:15:00Z',
      completionDate: '2024-11-24T17:30:00Z',
      status: 'pending',
      hoursContributed: 16,
      role: 'Y tá tình nguyện',
      skills: ['Chăm sóc y tế', 'Giao tiếp với người cao tuổi', 'Sơ cứu'],
      achievements: ['Chăm sóc tận tình', 'Kỹ năng chuyên môn cao'],
      verificationCode: 'VH2024HLT009012',
      blockchainHash: null,
      templateId: 'TPL-HLT-001',
      isPublic: false,
      downloadCount: 0,
      shareCount: 0,
      qrCode: null
    }
  ];

  const initialTemplates = [
    {
      id: 'TPL-ENV-001',
      name: 'Chứng chỉ Bảo vệ Môi trường',
      category: 'environment',
      type: 'participation',
      design: 'modern_green',
      isActive: true,
      usageCount: 156,
      createdDate: '2024-01-15T10:00:00Z',
      lastUsed: '2024-12-01T14:30:00Z'
    },
    {
      id: 'TPL-EDU-001',
      name: 'Chứng chỉ Giáo dục Cộng đồng',
      category: 'education',
      type: 'completion',
      design: 'academic_blue',
      isActive: true,
      usageCount: 89,
      createdDate: '2024-02-01T10:00:00Z',
      lastUsed: '2024-11-30T16:20:00Z'
    },
    {
      id: 'TPL-HLT-001',
      name: 'Chứng chỉ Y tế Tình nguyện',
      category: 'healthcare',
      type: 'achievement',
      design: 'medical_white',
      isActive: true,
      usageCount: 67,
      createdDate: '2024-03-01T10:00:00Z',
      lastUsed: '2024-11-25T09:15:00Z'
    }
  ];

  const stats = {
    totalIssued: 1247,
    thisMonth: 89,
    pending: 23,
    verified: 1156,
    blockchain: 1089,
    avgProcessingTime: 2.3,
    downloadCount: 4567,
    shareCount: 892
  };

  const issuanceData = [
    { month: 'T7', issued: 85, verified: 82, pending: 3 },
    { month: 'T8', issued: 92, verified: 89, pending: 3 },
    { month: 'T9', issued: 78, verified: 76, pending: 2 },
    { month: 'T10', issued: 105, verified: 102, pending: 3 },
    { month: 'T11', issued: 96, verified: 93, pending: 3 },
    { month: 'T12', issued: 89, verified: 85, pending: 4 }
  ];

  const categoryData = [
    { name: 'Môi trường', value: 425, color: '#10b981' },
    { name: 'Giáo dục', value: 356, color: '#3b82f6' },
    { name: 'Y tế', value: 234, color: '#ef4444' },
    { name: 'Cộng đồng', value: 189, color: '#f59e0b' },
    { name: 'Khác', value: 43, color: '#8b5cf6' }
  ];

  const typeData = [
    { name: 'Tham gia', value: 650, color: '#06b6d4' },
    { name: 'Hoàn thành', value: 387, color: '#8b5cf6' },
    { name: 'Thành tích', value: 210, color: '#f59e0b' }
  ];

  // ----------------------------
  // Local component state
  // ----------------------------
  const [records, setRecords] = useState(initialCertificates);
  const [templates, setTemplates] = useState(initialTemplates);

  const [activeTab, setActiveTab] = useState('overview'); // overview | issued | pending | revoked | rejected
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // category/type/status
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // ----------------------------
  // Helpers
  // ----------------------------
  const getCertificateTypeLabel = (type) => {
    const types = {
      'participation': 'Tham gia',
      'completion': 'Hoàn thành',
      'achievement': 'Thành tích',
      'leadership': 'Lãnh đạo'
    };
    return types[type] || type;
  };

  const getCategoryLabel = (category) => {
    const categories = {
      'environment': 'Môi trường',
      'education': 'Giáo dục',
      'healthcare': 'Y tế',
      'community': 'Cộng đồng',
      'technology': 'Công nghệ',
      'culture': 'Văn hóa'
    };
    return categories[category] || category;
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ xử lý', icon: Clock },
      issued: { color: 'bg-green-100 text-green-800', label: 'Đã cấp', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Từ chối', icon: XCircle },
      revoked: { color: 'bg-gray-100 text-gray-800', label: 'Thu hồi', icon: Ban }
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  // ----------------------------
  // Derived list filtered
  // ----------------------------
  const filteredCertificates = useMemo(() => {
    let out = [...records];

    if (activeTab === 'issued') out = out.filter(c => c.status === 'issued');
    else if (activeTab === 'pending') out = out.filter(c => c.status === 'pending');
    else if (activeTab === 'revoked') out = out.filter(c => c.status === 'revoked');
    else if (activeTab === 'rejected') out = out.filter(c => c.status === 'rejected');

    if (selectedFilter !== 'all') {
      out = out.filter(c => c.category === selectedFilter || c.certificateType === selectedFilter || c.status === selectedFilter);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      out = out.filter(c =>
        c.volunteerName.toLowerCase().includes(q) ||
        c.eventName.toLowerCase().includes(q) ||
        c.certificateId.toLowerCase().includes(q)
      );
    }

    return out;
  }, [records, activeTab, selectedFilter, searchTerm]);

  // ----------------------------
  // Actions (mock: update local state)
  // ----------------------------
  const toggleSelect = (id) => {
    setSelectedCertificates(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    const ids = filteredCertificates.map(c => c.id);
    const allSelected = ids.every(id => selectedCertificates.includes(id));
    if (allSelected) setSelectedCertificates(prev => prev.filter(id => !ids.includes(id)));
    else setSelectedCertificates(ids);
  };

  const handleBulkAction = (action) => {
    // TODO: replace with API calls
    if (action === 'issue') {
      setRecords(prev => prev.map(r => selectedCertificates.includes(r.id) ? { ...r, status: 'issued', issueDate: new Date().toISOString() } : r));
    } else if (action === 'revoke') {
      setRecords(prev => prev.map(r => selectedCertificates.includes(r.id) ? { ...r, status: 'revoked' } : r));
    } else if (action === 'delete') {
      setRecords(prev => prev.filter(r => !selectedCertificates.includes(r.id)));
    }
    setSelectedCertificates([]);
  };

  const handleStatusChange = (certId, newStatus) => {
    // TODO: API
    setRecords(prev => prev.map(r => r.id === certId ? { ...r, status: newStatus, issueDate: newStatus === 'issued' ? new Date().toISOString() : r.issueDate } : r));
  };

  const openDetail = (cert) => {
    setSelectedCertificate(cert);
    setShowDetailModal(true);
  };

  // ----------------------------
  // Modals
  // ----------------------------
  const CertificateDetailModal = ({ certificate, onClose }) => {
    const [note, setNote] = useState('');
    if (!certificate) return null;
    const statusCfg = getStatusConfig(certificate.status);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Chi tiết Chứng chỉ — {certificate.certificateId}</h2>
            <div className="flex items-center gap-3">
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href); }} className="px-3 py-1 border rounded">Copy link</button>
              <button onClick={onClose} className="p-2"><X className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {/* certificate preview */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 border-2 border-blue-200">
                <div className="bg-white rounded p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full mb-3">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">CHỨNG CHỈ TÌNH NGUYỆN</h3>
                    <p className="text-gray-600">VHub | {getCertificateTypeLabel(certificate.certificateType)}</p>
                  </div>

                  <div className="mt-6 text-center">
                    <h4 className="text-3xl font-semibold text-blue-600">{certificate.volunteerName}</h4>
                    <p className="text-sm text-gray-600 mt-1">{certificate.eventName}</p>
                    <p className="text-sm text-gray-600 mt-1">Vai trò: {certificate.role} • {certificate.hoursContributed} giờ</p>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-500">Ngày hoàn thành</p>
                      <p className="font-medium">{formatDate(certificate.completionDate)}</p>
                    </div>
                    <div className="text-center">
                      {certificate.qrCode ? <img src={certificate.qrCode} alt="QR" className="w-16 h-16 mx-auto" /> : <div className="w-16 h-16 bg-gray-100 rounded" />}
                      <p className="text-xs text-gray-500 mt-1">Mã: <span className="font-mono">{certificate.verificationCode}</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ngày cấp</p>
                      <p className="font-medium">{formatDate(certificate.issueDate)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* details */}
              <div className="bg-white border rounded p-4">
                <h4 className="font-semibold mb-3">Thông tin chi tiết</h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <div>
                    <div className="text-xs text-gray-500">Mã chứng chỉ</div>
                    <div className="font-mono">{certificate.certificateId}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Loại</div>
                    <div>{getCertificateTypeLabel(certificate.certificateType)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Danh mục</div>
                    <div>{getCategoryLabel(certificate.category)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Tổ chức</div>
                    <div>{certificate.organizerName}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-gray-500">Kỹ năng</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {certificate.skills.map((s, i) => <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">{s}</span>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* usage */}
              <div className="bg-white border rounded p-4">
                <h4 className="font-semibold mb-3">Hoạt động</h4>
                <div className="flex gap-3 text-sm">
                  <div className="p-3 bg-gray-50 rounded w-1/3 text-center">
                    <div className="text-xs text-gray-500">Tải xuống</div>
                    <div className="font-medium">{certificate.downloadCount}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded w-1/3 text-center">
                    <div className="text-xs text-gray-500">Chia sẻ</div>
                    <div className="font-medium">{certificate.shareCount}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded w-1/3 text-center">
                    <div className="text-xs text-gray-500">Công khai</div>
                    <div className="font-medium">{certificate.isPublic ? 'Có' : 'Không'}</div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="bg-white border rounded p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src={certificate.volunteerAvatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-medium">{certificate.volunteerName}</div>
                    <div className="text-xs text-gray-500">{certificate.volunteerEmail}</div>
                  </div>
                </div>
                <button className="w-full px-3 py-2 border rounded text-sm">Xem hồ sơ</button>
              </div>

              <div className="bg-white border rounded p-4">
                <h4 className="text-sm text-gray-600 mb-2">Trạng thái</h4>
                <div className="flex items-center justify-between">
                  <div className="text-sm">{statusCfg.label}</div>
                  <div className={`px-2 py-1 text-xs rounded ${statusCfg.color}`}></div>
                </div>

                <div className="mt-3 space-y-2">
                  {certificate.status === 'pending' && (
                    <>
                      <button onClick={() => handleStatusChange(certificate.id, 'issued')} className="w-full px-3 py-2 bg-green-600 text-white rounded">Phê duyệt & Cấp</button>
                      <button onClick={() => handleStatusChange(certificate.id, 'rejected')} className="w-full px-3 py-2 bg-red-600 text-white rounded">Từ chối</button>
                    </>
                  )}
                  {certificate.status === 'issued' && (
                    <>
                      <button className="w-full px-3 py-2 bg-blue-600 text-white rounded">Tải PDF</button>
                      <button className="w-full px-3 py-2 bg-purple-600 text-white rounded">Gửi email</button>
                      <button onClick={() => handleStatusChange(certificate.id, 'revoked')} className="w-full px-3 py-2 bg-orange-600 text-white rounded">Thu hồi</button>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white border rounded p-4">
                <h4 className="text-sm text-gray-600 mb-2">Blockchain</h4>
                {certificate.blockchainHash ? (
                  <>
                    <div className="text-xs text-gray-500">Hash</div>
                    <div className="font-mono text-xs break-all">{certificate.blockchainHash}</div>
                    <button className="mt-2 w-full text-sm text-blue-600 flex items-center justify-center gap-2"><ExternalLink className="w-4 h-4" /> Xem</button>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">Chưa ghi</div>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <textarea placeholder="Ghi chú nội bộ..." value={note} onChange={(e)=>{}} className="flex-1 p-2 border rounded" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
          </div>
        </div>
      </div>
    );
  };

  const CreateCertificateModal = ({ onClose }) => {
    const [form, setForm] = useState({
      volunteerName: '',
      volunteerEmail: '',
      eventName: '',
      certificateType: 'participation',
      category: 'environment',
      templateId: templates[0]?.id || '',
      hoursContributed: 0,
      role: '',
      isPublic: true
    });

    const submit = (e) => {
      e.preventDefault();
      const newCert = {
        id: `CERT-${Math.floor(Math.random()*900)+100}`,
        certificateId: `VH-${Math.floor(Math.random()*900000)}`,
        volunteerId: Math.floor(Math.random()*1000),
        volunteerName: form.volunteerName || 'Tình nguyện viên',
        volunteerEmail: form.volunteerEmail || '',
        volunteerAvatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150',
        eventId: `EVT-${Math.floor(Math.random()*900)}`,
        eventName: form.eventName || 'Sự kiện',
        organizerName: 'Org (manual)',
        certificateType: form.certificateType,
        category: form.category,
        issueDate: new Date().toISOString(),
        completionDate: new Date().toISOString(),
        status: 'issued',
        hoursContributed: form.hoursContributed || 0,
        role: form.role || '',
        skills: [],
        achievements: [],
        verificationCode: `VH${Math.floor(Math.random()*999999)}`,
        blockchainHash: null,
        templateId: form.templateId,
        isPublic: form.isPublic,
        downloadCount: 0,
        shareCount: 0,
        qrCode: null
      };
      setRecords(prev => [newCert, ...prev]);
      onClose();
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tạo chứng chỉ mới</h3>
            <button onClick={onClose}><X className="w-5 h-5" /></button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={form.volunteerName} onChange={(e)=>setForm({...form, volunteerName:e.target.value})} placeholder="Tên tình nguyện viên" className="p-2 border rounded" />
              <input value={form.volunteerEmail} onChange={(e)=>setForm({...form, volunteerEmail:e.target.value})} placeholder="Email" className="p-2 border rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={form.eventName} onChange={(e)=>setForm({...form, eventName:e.target.value})} placeholder="Tên sự kiện" className="p-2 border rounded" />
              <select value={form.templateId} onChange={(e)=>setForm({...form, templateId:e.target.value})} className="p-2 border rounded">
                {templates.map(t=> <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select value={form.certificateType} onChange={(e)=>setForm({...form, certificateType:e.target.value})} className="p-2 border rounded">
                <option value="participation">Tham gia</option>
                <option value="completion">Hoàn thành</option>
                <option value="achievement">Thành tích</option>
              </select>
              <select value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})} className="p-2 border rounded">
                <option value="environment">Môi trường</option>
                <option value="education">Giáo dục</option>
                <option value="healthcare">Y tế</option>
              </select>
              <input type="number" value={form.hoursContributed} onChange={(e)=>setForm({...form, hoursContributed: Number(e.target.value)})} placeholder="Số giờ" className="p-2 border rounded" />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.isPublic} onChange={(e)=>setForm({...form, isPublic: e.target.checked})} /> Công khai</label>
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Hủy</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Tạo & Cấp</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const TemplateManagerModal = ({ onClose }) => {
    const [localTemplates, setLocalTemplates] = useState(templates);
    const [newTplName, setNewTplName] = useState('');
    const addTemplate = () => {
      const tpl = {
        id: `TPL-${Math.floor(Math.random()*900)+100}`,
        name: newTplName || `Template ${localTemplates.length+1}`,
        category: 'environment',
        type: 'participation',
        design: 'custom',
        isActive: true,
        usageCount: 0,
        createdDate: new Date().toISOString(),
        lastUsed: null
      };
      setLocalTemplates([tpl, ...localTemplates]);
      setTemplates(prev=>[tpl, ...prev]);
      setNewTplName('');
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Quản lý Templates</h3>
            <button onClick={onClose}><X className="w-5 h-5" /></button>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input value={newTplName} onChange={(e)=>setNewTplName(e.target.value)} placeholder="Tên template mới" className="flex-1 p-2 border rounded" />
              <button onClick={addTemplate} className="px-3 py-2 bg-green-600 text-white rounded">Thêm</button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {localTemplates.map(t=>(
                <div key={t.id} className="p-3 border rounded flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.type} — {t.usageCount} lần sử dụng</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 border rounded text-sm">Edit</button>
                    <button onClick={()=>{ setTemplates(prev => prev.filter(x=>x.id!==t.id)); setLocalTemplates(prev=>prev.filter(x=>x.id!==t.id)); }} className="px-2 py-1 border rounded text-sm">Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------
  // Render main UI
  // ----------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hệ thống Chứng chỉ TNV</h1>
            <p className="text-gray-600 mt-1">Quản lý, cấp và theo dõi chứng chỉ tình nguyện</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border rounded overflow-hidden">
              <input className="px-3 py-2 w-64" placeholder="Tìm theo tên, sự kiện, mã..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
              <div className="px-3 border-l"><Search className="w-4 h-4 text-gray-500" /></div>
            </div>

            <button onClick={()=>setShowCreateModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded">
              <Plus className="w-4 h-4" /> Tạo chứng chỉ
            </button>

            <div className="flex items-center gap-2">
              <button onClick={()=>setShowTemplateModal(true)} className="px-3 py-2 border rounded">Templates</button>
              <button className="px-3 py-2 border rounded">Xuất</button>
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow-sm border">
            <div className="text-sm text-gray-500">Tổng đã cấp</div>
            <div className="text-2xl font-bold">{stats.totalIssued}</div>
            <div className="text-xs text-gray-400">Tháng này: {stats.thisMonth}</div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm border">
            <div className="text-sm text-gray-500">Chờ xử lý</div>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-xs text-gray-400">Đang chờ phê duyệt</div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm border">
            <div className="text-sm text-gray-500">Đã xác minh (Blockchain)</div>
            <div className="text-2xl font-bold">{stats.blockchain}</div>
            <div className="text-xs text-gray-400">Đã ghi lên blockchain</div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm border">
            <div className="text-sm text-gray-500">Lượt tải / chia sẻ</div>
            <div className="text-2xl font-bold">{stats.downloadCount} / {stats.shareCount}</div>
            <div className="text-xs text-gray-400">Tương tác</div>
          </div>
        </div>

        {/* charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Xu hướng cấp chứng chỉ</h3>
              <div className="text-sm text-gray-500">6 tháng gần nhất</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={issuanceData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="issued" stroke="#3b82f6" name="Cấp" />
                <Line type="monotone" dataKey="verified" stroke="#10b981" name="Xác minh" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Phân bố theo danh mục</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {categoryData.map((c, idx)=> <Cell key={idx} fill={c.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* filters tabs + bulk */}
        <div className="bg-white p-4 rounded mb-4 border">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button onClick={()=>setActiveTab('overview')} className={`px-3 py-1 rounded ${activeTab==='overview'?'bg-blue-50 border border-blue-200':''}`}>Tổng quan</button>
                <button onClick={()=>setActiveTab('issued')} className={`px-3 py-1 rounded ${activeTab==='issued'?'bg-blue-50 border border-blue-200':''}`}>Đã cấp</button>
                <button onClick={()=>setActiveTab('pending')} className={`px-3 py-1 rounded ${activeTab==='pending'?'bg-blue-50 border border-blue-200':''}`}>Chờ</button>
                <button onClick={()=>setActiveTab('revoked')} className={`px-3 py-1 rounded ${activeTab==='revoked'?'bg-blue-50 border border-blue-200':''}`}>Thu hồi</button>
                <button onClick={()=>setActiveTab('rejected')} className={`px-3 py-1 rounded ${activeTab==='rejected'?'bg-blue-50 border border-blue-200':''}`}>Từ chối</button>
              </div>

              <select className="px-3 py-1 border rounded" value={selectedFilter} onChange={(e)=>setSelectedFilter(e.target.value)}>
                <option value="all">Tất cả</option>
                <option value="environment">Môi trường</option>
                <option value="education">Giáo dục</option>
                <option value="healthcare">Y tế</option>
                <option value="participation">Loại: Tham gia</option>
                <option value="completion">Loại: Hoàn thành</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              {selectedCertificates.length > 0 && (
                <>
                  <span className="text-sm text-gray-600">Đã chọn {selectedCertificates.length}</span>
                  <button onClick={()=>handleBulkAction('issue')} className="px-3 py-1 bg-green-600 text-white rounded">Cấp</button>
                  <button onClick={()=>handleBulkAction('revoke')} className="px-3 py-1 bg-orange-600 text-white rounded">Thu hồi</button>
                  <button onClick={()=>handleBulkAction('delete')} className="px-3 py-1 border rounded">Xóa</button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* certificate table */}
        <div className="bg-white rounded shadow-sm border">
          <div className="p-3 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={filteredCertificates.length>0 && filteredCertificates.every(c=>selectedCertificates.includes(c.id))} onChange={handleSelectAll} />
              <div className="text-sm text-gray-600">Mã • Tên TNV • Sự kiện</div>
            </div>
            <div className="text-sm text-gray-500">Trạng thái • Hành động</div>
          </div>

          <div>
            {filteredCertificates.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Không có chứng chỉ phù hợp</div>
            ) : (
              filteredCertificates.map(cert => {
                const statusCfg = getStatusConfig(cert.status);
                return (
                  <div key={cert.id} className="p-4 hover:bg-gray-50 flex items-start justify-between border-b">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" checked={selectedCertificates.includes(cert.id)} onChange={()=>toggleSelect(cert.id)} className="mt-1" />
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="font-semibold text-gray-900">{cert.certificateId}</div>
                          <div className="text-sm text-gray-700">{cert.volunteerName}</div>
                          <div className="text-sm text-gray-500">• {cert.eventName}</div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{getCertificateTypeLabel(cert.certificateType)} — {getCategoryLabel(cert.category)}</div>
                        <div className="text-xs text-gray-400 mt-1">Hoàn thành: {formatDate(cert.completionDate)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 text-xs rounded ${statusCfg.color}`}>{statusCfg.label}</div>
                      <button onClick={()=>openDetail(cert)} className="px-3 py-1 border rounded text-sm flex items-center gap-2"><Eye className="w-4 h-4" />Chi tiết</button>
                      <div className="flex gap-1">
                        <button onClick={() => handleStatusChange(cert.id, 'issued')} title="Cấp" className="p-2 border rounded"><CheckCircle className="w-4 h-4" /></button>
                        <button onClick={() => handleStatusChange(cert.id, 'revoked')} title="Thu hồi" className="p-2 border rounded"><Ban className="w-4 h-4" /></button>
                        <button className="p-2 border rounded" title="Tải"><Download className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* modals */}
      {showDetailModal && selectedCertificate && <CertificateDetailModal certificate={selectedCertificate} onClose={() => { setShowDetailModal(false); setSelectedCertificate(null); }} />}
      {showCreateModal && <CreateCertificateModal onClose={() => setShowCreateModal(false)} />}
      {showTemplateModal && <TemplateManagerModal onClose={() => setShowTemplateModal(false)} />}
    </div>
  );
}
