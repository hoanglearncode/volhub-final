import React, { useState } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  Building, Phone, Mail, Globe, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, Crown, Zap, Package,
  BarChart3, PlusCircle, ExternalLink, Briefcase, DollarSign,
  Upload, Camera, User, Image, CheckSquare, AlertCircle
} from 'lucide-react';

/**
 * PartnerVerification - Full component
 * - Mock data in local state (requests)
 * - Filters, search, bulk actions
 * - Detail modal & Reject modal
 * - Replace TODO areas with real API calls as needed
 */

export default function PartnerVerification() {
  // --------------------
  // Mock initial data
  // --------------------
  const initialRequests = [
    {
      id: 'PVR-001',
      partnerId: 3,
      partnerName: 'Green Earth Foundation',
      email: 'info@greenearth.org.vn',
      phone: '+84 24 3945 2000',
      website: 'https://greenearth.org.vn',
      logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150',
      submitDate: '2024-12-01T09:30:00Z',
      status: 'pending',
      verificationType: 'full_verification',
      priority: 'high',
      currentTier: 'unverified',
      requestedTier: 'verified',
      industry: 'Môi trường',
      location: 'Hà Nội',
      establishedYear: 2020,
      employeeCount: '10-50',
      legalInfo: {
        businessName: 'Quỹ Trái Đất Xanh',
        businessLicense: 'GP-2020-ENV-001234',
        taxCode: '0123456789',
        registrationAddress: '123 Láng Hạ, Đống Đa, Hà Nội',
        legalRepresentative: 'Nguyễn Văn An',
        establishedDate: '2020-03-15'
      },
      documents: [
        { type: 'business_license', name: 'Giấy phép kinh doanh', url: 'https://example.com/license.pdf', status: 'pending', uploadDate: '2024-12-01T09:30:00Z', size: '2.3 MB' },
        { type: 'tax_certificate', name: 'Giấy chứng nhận thuế', url: 'https://example.com/tax.pdf', status: 'pending', uploadDate: '2024-12-01T09:31:00Z', size: '1.8 MB' },
        { type: 'ngo_certificate', name: 'Giấy phép hoạt động NGO', url: 'https://example.com/ngo.pdf', status: 'pending', uploadDate: '2024-12-01T09:32:00Z', size: '2.1 MB' },
        { type: 'bank_statement', name: 'Sao kê ngân hàng 6 tháng', url: 'https://example.com/bank.pdf', status: 'pending', uploadDate: '2024-12-01T09:33:00Z', size: '4.5 MB' }
      ],
      contactPerson: { name: 'Trần Thị Mai', position: 'Giám đốc Truyền thông', phone: '+84 98 765 4321', email: 'mai.tran@greenearth.org.vn' },
      organizationInfo: {
        mission: 'Bảo vệ môi trường và phát triển bền vững cho thế hệ tương lai',
        mainActivities: ['Trồng rừng', 'Làm sạch môi trường', 'Giáo dục môi trường', 'Nghiên cứu sinh thái'],
        targetAudience: 'Cộng đồng, học sinh, sinh viên',
        operatingAreas: ['Hà Nội', 'Quảng Ninh', 'Nghệ An'],
        partnerships: ['Bộ Tài nguyên Môi trường', 'WWF Vietnam', 'Green ID']
      },
      financialInfo: { annualRevenue: '2.5 tỷ VND', fundingSources: ['Tài trợ quốc tế','Đóng góp cá nhân','Dự án chính phủ'], auditReport: 'Có báo cáo kiểm toán năm 2023' },
      previousEvents: [{ name: 'Trồng 1000 cây xanh tại Hà Nội', date: '2024-10-15', volunteers: 150, status: 'completed' }],
      adminNotes: '',
      reviewHistory: []
    },
    {
      id: 'PVR-002',
      partnerId: 6,
      partnerName: 'Tech For Good Vietnam',
      email: 'hello@techforgood.vn',
      phone: '+84 28 3999 8888',
      website: 'https://techforgood.vn',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150',
      submitDate: '2024-11-28T14:20:00Z',
      status: 'under_review',
      verificationType: 'premium_upgrade',
      priority: 'medium',
      currentTier: 'verified',
      requestedTier: 'premium',
      industry: 'Công nghệ',
      location: 'TP.HCM',
      establishedYear: 2018,
      employeeCount: '50-100',
      legalInfo: {
        businessName: 'Công ty TNHH Công nghệ vì Cộng đồng',
        businessLicense: 'GP-2018-TECH-005678',
        taxCode: '9876543210',
        registrationAddress: '456 Nguyễn Huệ, Quận 1, TP.HCM',
        legalRepresentative: 'Lê Minh Tuấn',
        establishedDate: '2018-06-20'
      },
      documents: [
        { type: 'business_license', name: 'Giấy phép kinh doanh', url: 'https://example.com/license2.pdf', status: 'approved', uploadDate: '2024-11-28T14:20:00Z', size: '2.1 MB' },
        { type: 'tax_certificate', name: 'Giấy chứng nhận thuế', url: 'https://example.com/tax2.pdf', status: 'approved', uploadDate: '2024-11-28T14:21:00Z', size: '1.9 MB' },
        { type: 'financial_report', name: 'Báo cáo tài chính 2 năm', url: 'https://example.com/finance.pdf', status: 'under_review', uploadDate: '2024-11-28T14:22:00Z', size: '6.2 MB' },
        { type: 'impact_report', name: 'Báo cáo tác động xã hội', url: 'https://example.com/impact.pdf', status: 'under_review', uploadDate: '2024-11-28T14:23:00Z', size: '8.1 MB' }
      ],
      contactPerson: { name: 'Phạm Thị Lan', position: 'Trưởng phòng Đối ngoại', phone: '+84 90 123 4567', email: 'lan.pham@techforgood.vn' },
      organizationInfo: {
        mission: 'Ứng dụng công nghệ để giải quyết các vấn đề xã hội và môi trường',
        mainActivities: ['Đào tạo kỹ năng số','Phát triển ứng dụng xã hội','Tư vấn chuyển đổi số NGO'],
        targetAudience: 'Tổ chức phi lợi nhuận, cộng đồng thiếu thốn',
        operatingAreas: ['TP.HCM','Hà Nội','Đà Nẵng','Cần Thơ'],
        partnerships: ['Google.org','Microsoft Vietnam','Grab Vietnam']
      },
      financialInfo: { annualRevenue: '15 tỷ VND', fundingSources: ['Tài trợ doanh nghiệp','Grants quốc tế','Thu phí dịch vụ'], auditReport: 'PWC Vietnam kiểm toán năm 2023' },
      previousEvents: [
        { name: 'Đào tạo kỹ năng số cho 500 bạn trẻ', date: '2024-09-20', volunteers: 80, status: 'completed' },
        { name: 'Hackathon cho Tương lai Xanh', date: '2024-11-10', volunteers: 200, status: 'completed' }
      ],
      adminNotes: 'Đối tác uy tín, đã có nhiều dự án thành công. Cần xem xét nâng cấp Premium.',
      reviewHistory: [{ date: '2024-11-29T10:00:00Z', reviewer: 'Admin Nguyen', action: 'documents_reviewed', note: 'Tài liệu cơ bản đã được duyệt' }]
    },
    {
      id: 'PVR-003',
      partnerId: 7,
      partnerName: 'Community Care Network',
      email: 'info@ccnetwork.org',
      phone: '+84 24 3555 7777',
      website: null,
      logo: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150',
      submitDate: '2024-11-25T16:45:00Z',
      status: 'rejected',
      verificationType: 'full_verification',
      priority: 'low',
      currentTier: 'unverified',
      requestedTier: 'verified',
      industry: 'Cộng đồng',
      location: 'Hà Nội',
      establishedYear: 2023,
      employeeCount: '1-10',
      legalInfo: { businessName: 'Mạng lưới Chăm sóc Cộng đồng', businessLicense: 'Chưa có', taxCode: 'Chưa đăng ký', registrationAddress: '789 Phố Huế, Hai Bà Trưng, Hà Nội', legalRepresentative: 'Hoàng Văn Nam', establishedDate: '2023-12-01' },
      documents: [
        { type: 'identification', name: 'CMND người đại diện', url: 'https://example.com/id.jpg', status: 'rejected', uploadDate: '2024-11-25T16:45:00Z', size: '1.2 MB' }
      ],
      contactPerson: { name: 'Hoàng Văn Nam', position: 'Người sáng lập', phone: '+84 98 888 9999', email: 'nam.hoang@ccnetwork.org' },
      organizationInfo: { mission: 'Hỗ trợ người cao tuổi và trẻ em có hoàn cảnh khó khăn', mainActivities: ['Thăm hỏi người cao tuổi','Hỗ trợ trẻ em học tập'], targetAudience: 'Người cao tuổi, trẻ em', operatingAreas: ['Hà Nội'], partnerships: [] },
      financialInfo: { annualRevenue: 'Không có doanh thu', fundingSources: ['Quyên góp cá nhân'], auditReport: 'Không có' },
      previousEvents: [],
      adminNotes: 'Tổ chức mới, chưa có đầy đủ giấy tờ pháp lý. Cần hoàn thiện hồ sơ trước khi xác minh.',
      reviewHistory: [{ date: '2024-11-26T09:00:00Z', reviewer: 'Admin Tran', action: 'rejected', note: 'Thiếu giấy phép kinh doanh và chứng từ tài chính' }],
      rejectionReasons: ['Thiếu giấy phép kinh doanh','Không có mã số thuế','Thiếu báo cáo tài chính','Chưa có hoạt động cụ thể nào']
    }
  ];

  // --------------------
  // component state
  // --------------------
  const [requests, setRequests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState('pending'); // pending | under_review | approved | rejected | all
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);

  // --------------------
  // helpers for UI
  // --------------------
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ xử lý', icon: Clock },
      under_review: { color: 'bg-blue-100 text-blue-800', label: 'Đang xem xét', icon: Eye },
      approved: { color: 'bg-green-100 text-green-800', label: 'Đã duyệt', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Từ chối', icon: XCircle }
    };
    return configs[status] || configs.pending;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { color: 'bg-red-100 text-red-800', label: 'Cao', icon: AlertTriangle },
      medium: { color: 'bg-orange-100 text-orange-800', label: 'Trung bình', icon: AlertCircle },
      low: { color: 'bg-green-100 text-green-800', label: 'Thấp', icon: CheckCircle }
    };
    return configs[priority] || configs.medium;
  };

  const getVerificationTypeLabel = (type) => {
    const types = {
      'full_verification': 'Xác minh đầy đủ',
      'premium_upgrade': 'Nâng cấp Premium',
      'document_update': 'Cập nhật tài liệu',
      'tier_change': 'Thay đổi cấp độ'
    };
    return types[type] || type;
  };

  // --------------------
  // derived list (filter/search/tab)
  // --------------------
  const filteredRequests = requests.filter(request => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = !q || request.partnerName.toLowerCase().includes(q) || request.email.toLowerCase().includes(q) || request.id.toLowerCase().includes(q);

    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && request.status === activeTab;
  }).filter(r => {
    if (selectedFilter === 'all') return true;
    // filter by industry or verificationType
    return r.industry === selectedFilter || r.verificationType === selectedFilter || r.currentTier === selectedFilter || r.requestedTier === selectedFilter;
  });

  // --------------------
  // actions (mock - update local state)
  // --------------------
  const toggleSelect = (id) => {
    setSelectedRequests(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    const ids = filteredRequests.map(r => r.id);
    const allSelected = ids.every(id => selectedRequests.includes(id));
    if (allSelected) setSelectedRequests(prev => prev.filter(id => !ids.includes(id)));
    else setSelectedRequests(ids);
  };

  const handleBulkAction = (action) => {
    // actions: approve, reject, delete
    if (action === 'approve') {
      setRequests(prev => prev.map(r => selectedRequests.includes(r.id) ? { ...r, status: 'approved', reviewHistory: [...r.reviewHistory, { date: new Date().toISOString(), reviewer: 'System', action: 'approved', note: 'Bulk approve' }] } : r));
    } else if (action === 'reject') {
      setRequests(prev => prev.map(r => selectedRequests.includes(r.id) ? { ...r, status: 'rejected', reviewHistory: [...r.reviewHistory, { date: new Date().toISOString(), reviewer: 'System', action: 'rejected', note: 'Bulk reject' }] } : r));
    } else if (action === 'delete') {
      setRequests(prev => prev.filter(r => !selectedRequests.includes(r.id)));
    }
    setSelectedRequests([]);
  };

  const handleOpenDetail = (req) => {
    setSelectedRequest(req);
    setShowVerificationModal(true);
  };

  const handleApprove = (requestId) => {
    // TODO: call API to approve
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'approved', reviewHistory: [...r.reviewHistory, { date: new Date().toISOString(), reviewer: 'Admin', action: 'approved', note: '' }] } : r));
    setShowVerificationModal(false);
    setSelectedRequest(null);
  };

  const handleRejectInitiate = (requestId) => {
    const r = requests.find(x => x.id === requestId);
    setSelectedRequest(r);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = (requestId, reason) => {
    // TODO: API
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'rejected', reviewHistory: [...r.reviewHistory, { date: new Date().toISOString(), reviewer: 'Admin', action: 'rejected', note: reason }], rejectionReasons: [...(r.rejectionReasons || []), reason] } : r));
    setShowRejectModal(false);
    setSelectedRequest(null);
  };

  const handleDocumentAction = (requestId, docType, action) => {
    // action: approve | reject | mark_review
    setRequests(prev => prev.map(r => {
      if (r.id !== requestId) return r;
      const docs = r.documents.map(d => d.type === docType ? { ...d, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'under_review' } : d);
      return { ...r, documents: docs };
    }));
  };

  // --------------------
  // Modals
  // --------------------
  const VerificationDetailModal = ({ request, onClose }) => {
    const [activeDocTab, setActiveDocTab] = useState('documents'); // documents | legal | org | finance | history
    if (!request) return null;
    const statusCfg = getStatusConfig(request.status);
    const priorityCfg = getPriorityConfig(request.priority);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Chi tiết xác minh — {request.partnerName}</h2>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="px-3 py-1 border rounded">Đóng</button>
              <button onClick={() => handleApprove(request.id)} className="px-3 py-1 bg-green-600 text-white rounded">Phê duyệt</button>
              <button onClick={() => handleRejectInitiate(request.id)} className="px-3 py-1 bg-red-600 text-white rounded">Từ chối</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-start gap-4 bg-white border rounded p-4">
                <img src={request.logo} alt={request.partnerName} className="w-20 h-20 rounded object-cover border" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{request.partnerName}</h3>
                      <p className="text-sm text-gray-600">{request.industry} • {request.location}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 text-xs rounded ${statusCfg.color}`}>{statusCfg.label}</div>
                      <div className="mt-2 text-xs text-gray-500">{priorityCfg.label}</div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div><div className="text-xs text-gray-500">Mã yêu cầu</div><div className="font-mono">{request.id}</div></div>
                    <div><div className="text-xs text-gray-500">Ngày nộp</div><div>{formatDate(request.submitDate)}</div></div>
                    <div><div className="text-xs text-gray-500">Cấp hiện tại</div><div>{request.currentTier}</div></div>
                    <div><div className="text-xs text-gray-500">Cấp yêu cầu</div><div>{request.requestedTier}</div></div>
                  </div>
                </div>
              </div>

              {/* tabs */}
              <div className="bg-white border rounded">
                <div className="border-b">
                  <nav className="-mb-px flex space-x-6 px-4">
                    {[
                      { key: 'documents', label: 'Tài liệu', icon: FileText },
                      { key: 'legal', label: 'Pháp lý', icon: Shield },
                      { key: 'organization', label: 'Tổ chức', icon: Building },
                      { key: 'financial', label: 'Tài chính', icon: DollarSign },
                      { key: 'history', label: 'Lịch sử', icon: History }
                    ].map(tab => {
                      const Icon = tab.icon;
                      return (
                        <button key={tab.key} onClick={() => setActiveDocTab(tab.key)} className={`flex items-center gap-2 py-3 px-2 text-sm ${activeDocTab===tab.key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}>
                          <Icon className="w-4 h-4" /> {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="p-4">
                  {activeDocTab === 'documents' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Tài liệu ({request.documents.length})</h4>
                      <div className="space-y-2">
                        {request.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-blue-50 rounded"><FileText className="w-5 h-5 text-blue-600" /></div>
                              <div>
                                <div className="font-medium">{doc.name}</div>
                                <div className="text-xs text-gray-500">{doc.size} • {formatDate(doc.uploadDate)}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`px-2 py-1 text-xs rounded ${doc.status === 'approved' ? 'bg-green-100 text-green-800' : doc.status === 'rejected' ? 'bg-red-100 text-red-800' : doc.status === 'under_review' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {doc.status === 'approved' ? 'Đã duyệt' : doc.status === 'rejected' ? 'Đã từ chối' : doc.status === 'under_review' ? 'Đang xem' : 'Chờ xử lý'}
                              </div>
                              <a href={doc.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600">Mở</a>
                              <button onClick={() => handleDocumentAction(request.id, doc.type, 'approve')} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Duyệt</button>
                              <button onClick={() => handleDocumentAction(request.id, doc.type, 'reject')} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Từ chối</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeDocTab === 'legal' && (
                    <div className="space-y-3 text-sm">
                      <h4 className="font-semibold">Thông tin pháp lý</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div><div className="text-xs text-gray-500">Tên pháp lý</div><div className="text-gray-900">{request.legalInfo.businessName}</div></div>
                        <div><div className="text-xs text-gray-500">Giấy phép kinh doanh</div><div className="text-gray-900">{request.legalInfo.businessLicense || 'Chưa có'}</div></div>
                        <div><div className="text-xs text-gray-500">Mã số thuế</div><div className="text-gray-900">{request.legalInfo.taxCode || 'Chưa đăng ký'}</div></div>
                        <div><div className="text-xs text-gray-500">Người đại diện</div><div className="text-gray-900">{request.legalInfo.legalRepresentative}</div></div>
                        <div className="md:col-span-2"><div className="text-xs text-gray-500">Địa chỉ đăng ký</div><div className="text-gray-900">{request.legalInfo.registrationAddress}</div></div>
                      </div>
                    </div>
                  )}

                  {activeDocTab === 'organization' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Thông tin tổ chức</h4>
                      <div><div className="text-xs text-gray-500">Sứ mệnh</div><div className="text-gray-900">{request.organizationInfo.mission}</div></div>
                      <div><div className="text-xs text-gray-500">Hoạt động chính</div><div className="flex flex-wrap gap-2 mt-2">{request.organizationInfo.mainActivities.map((a, i)=> <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">{a}</span>)}</div></div>
                      <div><div className="text-xs text-gray-500">Khu vực hoạt động</div><div className="flex flex-wrap gap-2 mt-2">{request.organizationInfo.operatingAreas.map((a,i)=> <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">{a}</span>)}</div></div>
                      {request.organizationInfo.partnerships.length > 0 && <div><div className="text-xs text-gray-500">Đối tác</div><div className="flex flex-wrap gap-2 mt-2">{request.organizationInfo.partnerships.map((p,i)=> <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-sm">{p}</span>)}</div></div>}
                    </div>
                  )}

                  {activeDocTab === 'financial' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Thông tin tài chính</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div><div className="text-xs text-gray-500">Doanh thu hàng năm</div><div className="text-gray-900">{request.financialInfo.annualRevenue}</div></div>
                        <div><div className="text-xs text-gray-500">Nguồn quỹ</div><div className="text-gray-900">{request.financialInfo.fundingSources.join(', ')}</div></div>
                        <div className="md:col-span-2"><div className="text-xs text-gray-500">Báo cáo kiểm toán</div><div className="text-gray-900">{request.financialInfo.auditReport}</div></div>
                      </div>
                    </div>
                  )}

                  {activeDocTab === 'history' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Lịch sử xem xét</h4>
                      <div className="space-y-2 text-sm">
                        {request.reviewHistory.length === 0 ? <div className="text-gray-500">Chưa có lịch sử</div> : request.reviewHistory.map((h, idx) => (
                          <div key={idx} className="p-3 border rounded">
                            <div className="text-xs text-gray-500">{formatDate(h.date)} • {h.reviewer}</div>
                            <div className="font-medium">{h.action}</div>
                            <div className="text-gray-700 mt-1">{h.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* right column */}
            <aside className="space-y-4">
              <div className="bg-white border rounded p-4">
                <h4 className="font-semibold">Người liên hệ</h4>
                <div className="mt-3">
                  <div className="font-medium">{request.contactPerson.name}</div>
                  <div className="text-sm text-gray-600">{request.contactPerson.position}</div>
                  <div className="text-sm text-gray-600 mt-2">{request.contactPerson.phone}</div>
                  <div className="text-sm text-gray-600">{request.contactPerson.email}</div>
                </div>
              </div>

              <div className="bg-white border rounded p-4">
                <h4 className="font-semibold">Tình trạng & Hành động</h4>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between"><div className="text-sm text-gray-600">Trạng thái</div><div className={`px-2 py-1 text-xs rounded ${statusCfg.color}`}>{statusCfg.label}</div></div>
                  <div className="flex items-center justify-between"><div className="text-sm text-gray-600">Ưu tiên</div><div className={`px-2 py-1 text-xs rounded ${priorityCfg.color}`}>{priorityCfg.label}</div></div>

                  <div className="mt-3 space-y-2">
                    <button onClick={() => handleApprove(request.id)} className="w-full px-3 py-2 bg-green-600 text-white rounded">Phê duyệt</button>
                    <button onClick={() => handleRejectInitiate(request.id)} className="w-full px-3 py-2 bg-red-600 text-white rounded">Từ chối</button>
                    <button onClick={() => { /* TODO: request more docs */ }} className="w-full px-3 py-2 border rounded">Yêu cầu thêm tài liệu</button>
                    <a href={request.website || '#'} target="_blank" rel="noreferrer" className="w-full inline-block text-center px-3 py-2 bg-blue-50 text-blue-700 rounded">{request.website ? 'Truy cập website' : 'Không có website'}</a>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded p-4">
                <h4 className="font-semibold">Tóm tắt</h4>
                <div className="text-sm text-gray-700 mt-2">
                  <div><span className="text-gray-500">Năm thành lập: </span>{request.establishedYear}</div>
                  <div><span className="text-gray-500">Số nhân viên: </span>{request.employeeCount}</div>
                  <div className="mt-2"><span className="text-gray-500">Sự kiện tiêu biểu: </span></div>
                  <ul className="list-disc ml-5 mt-1 text-gray-700">
                    {request.previousEvents.length === 0 ? <li className="text-gray-500">Không có</li> : request.previousEvents.map((e, i) => <li key={i}>{e.name} ({e.volunteers} TNV)</li>)}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  };

  const RejectModal = ({ request, onCancel, onConfirm }) => {
    const [reason, setReason] = useState('');
    if (!request) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
        <div className="relative bg-white rounded-lg p-6 max-w-lg w-full">
          <h3 className="text-lg font-semibold mb-3">Từ chối xác minh — {request.partnerName}</h3>
          <p className="text-sm text-gray-600 mb-4">Vui lòng nhập lý do từ chối để lưu vào lịch sử và gửi thông báo cho đối tác.</p>
          <textarea value={reason} onChange={(e)=>setReason(e.target.value)} rows={5} className="w-full p-3 border rounded mb-4" placeholder="Ghi rõ lý do từ chối..." />
          <div className="flex justify-end gap-2">
            <button onClick={onCancel} className="px-3 py-2 border rounded">Hủy</button>
            <button onClick={() => onConfirm(request.id, reason)} disabled={!reason.trim()} className="px-3 py-2 bg-red-600 text-white rounded disabled:opacity-60">Xác nhận từ chối</button>
          </div>
        </div>
      </div>
    );
  };

  // --------------------
  // Render UI
  // --------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Xác minh Đối tác</h1>
            <p className="text-gray-600 mt-1">Quản lý hồ sơ, tài liệu và cấp bậc đối tác</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white rounded border overflow-hidden">
              <input placeholder="Tìm theo tên, email, mã..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="px-3 py-2 w-72" />
              <div className="px-3"><Search className="w-4 h-4 text-gray-500" /></div>
            </div>
            <div className="flex items-center gap-2">
              <select value={selectedFilter} onChange={(e)=>setSelectedFilter(e.target.value)} className="px-3 py-2 border rounded">
                <option value="all">Tất cả ngành / loại</option>
                <option value="Môi trường">Môi trường</option>
                <option value="Công nghệ">Công nghệ</option>
                <option value="Cộng đồng">Cộng đồng</option>
                <option value="full_verification">Xác minh đầy đủ</option>
                <option value="premium_upgrade">Nâng cấp Premium</option>
              </select>
              <button className="px-3 py-2 bg-blue-600 text-white rounded">Tải báo cáo</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded p-4 border">
            <div className="text-sm text-gray-500">Chờ xử lý</div>
            <div className="text-2xl font-bold">{requests.filter(r=>r.status==='pending').length}</div>
            <div className="text-xs text-gray-400">Yêu cầu mới</div>
          </div>
          <div className="bg-white rounded p-4 border">
            <div className="text-sm text-gray-500">Đang xem xét</div>
            <div className="text-2xl font-bold">{requests.filter(r=>r.status==='under_review').length}</div>
            <div className="text-xs text-gray-400">Đang xử lý</div>
          </div>
          <div className="bg-white rounded p-4 border">
            <div className="text-sm text-gray-500">Đã duyệt</div>
            <div className="text-2xl font-bold">{requests.filter(r=>r.status==='approved').length}</div>
            <div className="text-xs text-gray-400">Đối tác hợp lệ</div>
          </div>
          <div className="bg-white rounded p-4 border">
            <div className="text-sm text-gray-500">Đã từ chối</div>
            <div className="text-2xl font-bold">{requests.filter(r=>r.status==='rejected').length}</div>
            <div className="text-xs text-gray-400">Cần bổ sung</div>
          </div>
        </div>

        {/* Tabs & Bulk */}
        <div className="bg-white rounded p-4 border mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={()=>setActiveTab('pending')} className={`px-3 py-1 rounded ${activeTab==='pending' ? 'bg-blue-50 border border-blue-200' : ''}`}>Chờ xử lý</button>
              <button onClick={()=>setActiveTab('under_review')} className={`px-3 py-1 rounded ${activeTab==='under_review' ? 'bg-blue-50 border border-blue-200' : ''}`}>Đang xem xét</button>
              <button onClick={()=>setActiveTab('approved')} className={`px-3 py-1 rounded ${activeTab==='approved' ? 'bg-blue-50 border border-blue-200' : ''}`}>Đã duyệt</button>
              <button onClick={()=>setActiveTab('rejected')} className={`px-3 py-1 rounded ${activeTab==='rejected' ? 'bg-blue-50 border border-blue-200' : ''}`}>Từ chối</button>
              <button onClick={()=>setActiveTab('all')} className={`px-3 py-1 rounded ${activeTab==='all' ? 'bg-blue-50 border border-blue-200' : ''}`}>Tất cả</button>
            </div>

            <div className="flex items-center gap-2">
              {selectedRequests.length > 0 && (
                <>
                  <div className="text-sm text-gray-600">Đã chọn {selectedRequests.length}</div>
                  <button onClick={()=>handleBulkAction('approve')} className="px-3 py-1 bg-green-600 text-white rounded">Duyệt</button>
                  <button onClick={()=>handleBulkAction('reject')} className="px-3 py-1 bg-red-600 text-white rounded">Từ chối</button>
                  <button onClick={()=>handleBulkAction('delete')} className="px-3 py-1 border rounded">Xóa</button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded shadow-sm border">
          <div className="p-3 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={filteredRequests.length>0 && filteredRequests.every(r=>selectedRequests.includes(r.id))} onChange={handleSelectAll} />
              <div className="text-sm text-gray-600">Mã • Tên đối tác • Ngành</div>
            </div>
            <div className="text-sm text-gray-600">Trạng thái • Hành động</div>
          </div>

          <div>
            {filteredRequests.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Không tìm thấy yêu cầu</div>
            ) : (
              filteredRequests.map(req => {
                const statusCfg = getStatusConfig(req.status);
                const priorityCfg = getPriorityConfig(req.priority);
                return (
                  <div key={req.id} className="p-4 hover:bg-gray-50 flex items-start justify-between border-b">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" checked={selectedRequests.includes(req.id)} onChange={()=>toggleSelect(req.id)} className="mt-1" />
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="font-semibold text-gray-900">{req.id}</div>
                          <div className="text-sm text-gray-900">{req.partnerName}</div>
                          <div className="text-sm text-gray-500">• {req.industry}</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Nộp: {formatDate(req.submitDate)} • Cấp: {req.requestedTier}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 text-xs rounded ${statusCfg.color}`}>{statusCfg.label}</div>
                      <div className={`px-2 py-1 text-xs rounded ${priorityCfg.color}`}>{priorityCfg.label}</div>
                      <button onClick={() => handleOpenDetail(req)} className="px-3 py-1 border rounded flex items-center gap-2 text-sm"><Eye className="w-4 h-4" />Chi tiết</button>
                      <div className="flex gap-1">
                        <button onClick={() => handleApprove(req.id)} title="Duyệt" className="p-2 border rounded"><CheckCircle className="w-4 h-4" /></button>
                        <button onClick={() => handleRejectInitiate(req.id)} title="Từ chối" className="p-2 border rounded"><XCircle className="w-4 h-4" /></button>
                        <a href={req.website || '#'} target="_blank" rel="noreferrer" title="Website" className="p-2 border rounded"><ExternalLink className="w-4 h-4" /></a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showVerificationModal && selectedRequest && (
        <VerificationDetailModal request={selectedRequest} onClose={() => { setShowVerificationModal(false); setSelectedRequest(null); }} />
      )}

      {showRejectModal && selectedRequest && (
        <RejectModal request={selectedRequest} onCancel={() => { setShowRejectModal(false); setSelectedRequest(null); }} onConfirm={(id, reason) => handleRejectConfirm(id, reason)} />
      )}
    </div>
  );
}
