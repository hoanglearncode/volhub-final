import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  User, Phone, Mail, Camera, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, ArrowLeft, Share2,
  Upload, ExternalLink, RefreshCw, AlertCircle, Info,
  CheckSquare, X, Plus, Minus, Copy, Image as ImageIcon
} from 'lucide-react';

/**
 * VolunteerVerification
 * - Hiển thị danh sách yêu cầu xác minh (mock data)
 * - Tabs: all / pending / flagged / approved / rejected
 * - Search, filter by verification type, sort
 * - Bulk actions (approve/reject)
 * - View document image (modal)
 * - Slide-over chi tiết request + actions approve/reject/flag (local state update)
 *
 * NOTE:
 * - initialRequests chứa dữ liệu mẫu (mimic API). Replace bằng API call nếu cần.
 * - Các hành động hiện cập nhật trạng thái cục bộ và log lên console (mock).
 */

export default function VolunteerVerification() {
  // ----------------------------
  // Initial mock data (replace this by API result)
  // ----------------------------
  const initialRequests = [
    {
      id: 'VER-001',
      volunteer: {
        id: 1,
        name: 'Nguyễn Thị Lan',
        email: 'lan.nguyen@email.com',
        phone: '0901234567',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150',
        joinDate: '2024-01-15',
        currentStatus: 'pending'
      },
      verificationType: 'identity',
      submittedDate: '2024-12-01T08:30:00Z',
      priority: 'normal',
      status: 'pending',
      documents: [
        { type: 'id_front', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', uploadedDate: '2024-12-01T08:30:00Z', verified: false },
        { type: 'id_back', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400', uploadedDate: '2024-12-01T08:30:00Z', verified: false },
        { type: 'selfie', url: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=400', uploadedDate: '2024-12-01T08:30:00Z', verified: false }
      ],
      extractedInfo: {
        fullName: 'Nguyễn Thị Lan',
        idNumber: '001195123456',
        dateOfBirth: '1995-03-15',
        address: '123 Điện Biên Phủ, Ba Đình, Hà Nội',
        issueDate: '2020-01-15',
        expiryDate: '2030-01-15'
      },
      verificationChecks: {
        documentAuthenticity: { status: 'passed', confidence: 95 },
        faceMatch: { status: 'passed', confidence: 88 },
        dataConsistency: { status: 'warning', confidence: 72, issue: 'Tên trên tài khoản khác nhẹ với CMND' },
        duplicateCheck: { status: 'passed', confidence: 100 },
        blacklistCheck: { status: 'passed', confidence: 100 }
      },
      reviewNotes: '',
      reviewedBy: null,
      reviewedDate: null,
      aiScore: 85,
      riskLevel: 'low'
    },
    {
      id: 'VER-002',
      volunteer: {
        id: 2,
        name: 'Trần Văn Minh',
        email: 'minh.tran@email.com',
        phone: '0902345678',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        joinDate: '2024-11-28',
        currentStatus: 'pending'
      },
      verificationType: 'background',
      submittedDate: '2024-11-30T14:20:00Z',
      priority: 'high',
      status: 'pending',
      documents: [
        { type: 'criminal_record', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400', uploadedDate: '2024-11-30T14:20:00Z', verified: false },
        { type: 'education_cert', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400', uploadedDate: '2024-11-30T14:20:00Z', verified: false }
      ],
      extractedInfo: {
        fullName: 'Trần Văn Minh',
        education: 'Cử nhân Công nghệ Thông tin - ĐH Bách Khoa',
        graduationYear: '2020',
        criminalRecord: 'Không có tiền án tiền sự'
      },
      verificationChecks: {
        documentAuthenticity: { status: 'passed', confidence: 92 },
        institutionVerification: { status: 'pending', confidence: 0 },
        criminalRecordCheck: { status: 'passed', confidence: 95 },
        employmentHistory: { status: 'not_required', confidence: 0 }
      },
      reviewNotes: '',
      reviewedBy: null,
      reviewedDate: null,
      aiScore: 78,
      riskLevel: 'low'
    },
    {
      id: 'VER-003',
      volunteer: {
        id: 3,
        name: 'Lê Thị Hương',
        email: 'huong.le@email.com',
        phone: '0903456789',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        joinDate: '2024-11-25',
        currentStatus: 'pending'
      },
      verificationType: 'skill',
      submittedDate: '2024-11-29T09:15:00Z',
      priority: 'urgent',
      status: 'flagged',
      documents: [
        { type: 'medical_license', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', uploadedDate: '2024-11-29T09:15:00Z', verified: false },
        { type: 'work_experience', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400', uploadedDate: '2024-11-29T09:15:00Z', verified: false }
      ],
      extractedInfo: {
        fullName: 'Lê Thị Hương',
        profession: 'Bác sĩ Nội khoa',
        licenseNumber: 'BS-12345-HN',
        issueDate: '2018-06-15',
        validUntil: '2025-06-15',
        workplace: 'Bệnh viện Bạch Mai'
      },
      verificationChecks: {
        licenseAuthenticity: { status: 'warning', confidence: 65, issue: 'Cần xác minh với cơ quan cấp phép' },
        professionalStanding: { status: 'pending', confidence: 0 },
        workplaceVerification: { status: 'failed', confidence: 30, issue: 'Không tìm thấy trong danh sách nhân viên' },
        specialtyMatch: { status: 'passed', confidence: 90 }
      },
      reviewNotes: 'Cần liên hệ trực tiếp với bệnh viện để xác minh',
      reviewedBy: null,
      reviewedDate: null,
      aiScore: 52,
      riskLevel: 'high',
      flags: ['license_verification_required', 'workplace_mismatch']
    },
    {
      id: 'VER-004',
      volunteer: {
        id: 4,
        name: 'Phạm Hoàng Nam',
        email: 'nam.pham@email.com',
        phone: '0904567890',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        joinDate: '2024-11-20',
        currentStatus: 'warned'
      },
      verificationType: 'identity',
      submittedDate: '2024-11-22T16:45:00Z',
      priority: 'normal',
      status: 'rejected',
      documents: [
        { type: 'id_front', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', uploadedDate: '2024-11-22T16:45:00Z', verified: false }
      ],
      extractedInfo: {
        fullName: 'Phạm Hoàng Nam',
        idNumber: '001190987654',
        dateOfBirth: '1990-08-20'
      },
      verificationChecks: {
        documentAuthenticity: { status: 'failed', confidence: 25, issue: 'Tài liệu có dấu hiệu chỉnh sửa' },
        faceMatch: { status: 'failed', confidence: 35, issue: 'Ảnh selfie không khớp' },
        duplicateCheck: { status: 'warning', confidence: 60, issue: 'Tìm thấy tài khoản tương tự' }
      },
      reviewNotes: 'Tài liệu không đạt tiêu chuẩn xác minh. Yêu cầu gửi lại.',
      reviewedBy: 'Admin A',
      reviewedDate: '2024-11-23T10:30:00Z',
      aiScore: 28,
      riskLevel: 'high',
      rejectionReason: 'Tài liệu không rõ ràng và có dấu hiệu chỉnh sửa'
    }
  ];

  // ----------------------------
  // Component state
  // ----------------------------
  const [requests, setRequests] = useState(initialRequests); // store requests locally to allow status updates
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('submitted_date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null); // for slide-over detail
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // ----------------------------
  // Helpers & label mappings
  // ----------------------------
  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ xử lý', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', label: 'Đã duyệt', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Đã từ chối', icon: XCircle },
      flagged: { color: 'bg-orange-100 text-orange-800', label: 'Cần kiểm tra', icon: Flag }
    };
    return configs[status] || configs.pending;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      low: { color: 'text-gray-600', label: 'Thấp' },
      normal: { color: 'text-blue-600', label: 'Bình thường' },
      high: { color: 'text-orange-600', label: 'Cao' },
      urgent: { color: 'text-red-600', label: 'Khẩn cấp' }
    };
    return configs[priority] || configs.normal;
  };

  const getRiskConfig = (riskLevel) => {
    const configs = {
      low: { color: 'text-green-600', bg: 'bg-green-100', label: 'Thấp' },
      medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Trung bình' },
      high: { color: 'text-red-600', bg: 'bg-red-100', label: 'Cao' }
    };
    return configs[riskLevel] || configs.low;
  };

  const getVerificationTypeLabel = (type) => {
    const labels = {
      identity: 'Định danh',
      background: 'Lý lịch',
      skill: 'Kỹ năng',
      education: 'Học vấn',
      professional: 'Nghề nghiệp'
    };
    return labels[type] || type;
  };

  const getDocumentTypeLabel = (type) => {
    const labels = {
      id_front: 'CMND/CCCD mặt trước',
      id_back: 'CMND/CCCD mặt sau',
      selfie: 'Ảnh selfie',
      criminal_record: 'Lý lịch tư pháp',
      education_cert: 'Bằng cấp',
      medical_license: 'Giấy phép hành nghề y',
      work_experience: 'Kinh nghiệm làm việc'
    };
    return labels[type] || type;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // ----------------------------
  // Filter, sort, paginate (useMemo for perf)
  // ----------------------------
  const filteredRequests = useMemo(() => {
    let filtered = [...requests];

    // Tab filter - status
    if (activeTab !== 'all') {
      filtered = filtered.filter(req => req.status === activeTab);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(req =>
        req.volunteer.name.toLowerCase().includes(q) ||
        req.volunteer.email.toLowerCase().includes(q) ||
        req.id.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(req => req.verificationType === filterType);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'submitted_date':
          aValue = new Date(a.submittedDate).getTime();
          bValue = new Date(b.submittedDate).getTime();
          break;
        case 'priority':
          const priorityOrder = { low: 1, normal: 2, high: 3, urgent: 4 };
          aValue = priorityOrder[a.priority] || 2;
          bValue = priorityOrder[b.priority] || 2;
          break;
        case 'ai_score':
          aValue = a.aiScore || 0;
          bValue = b.aiScore || 0;
          break;
        case 'volunteer_name':
          aValue = a.volunteer.name.toLowerCase();
          bValue = b.volunteer.name.toLowerCase();
          break;
        default:
          aValue = 0; bValue = 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [requests, activeTab, searchQuery, filterType, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize));
  const paginated = filteredRequests.slice((page - 1) * pageSize, page * pageSize);

  // ----------------------------
  // Action handlers (mock: update local state)
  // ----------------------------
  const updateRequestStatus = (requestId, newStatus, note = '') => {
    setRequests(prev => prev.map(r => {
      if (r.id !== requestId) return r;
      return {
        ...r,
        status: newStatus,
        reviewedBy: 'Admin (local)', // in real app set actual admin
        reviewedDate: new Date().toISOString(),
        reviewNotes: note || r.reviewNotes
      };
    }));
  };

  const handleApproveRequest = (requestId) => {
    console.log('Approving request:', requestId);
    updateRequestStatus(requestId, 'approved');
    setSelectedRequests(prev => prev.filter(id => id !== requestId));
    if (selectedRequest?.id === requestId) setSelectedRequest(null);
  };

  const handleRejectRequest = (requestId, reason) => {
    console.log('Rejecting request:', requestId, reason);
    setRequests(prev => prev.map(r => r.id === requestId ? ({ ...r, status: 'rejected', rejectionReason: reason, reviewedBy: 'Admin (local)', reviewedDate: new Date().toISOString() }) : r));
    setSelectedRequests(prev => prev.filter(id => id !== requestId));
    if (selectedRequest?.id === requestId) setSelectedRequest(null);
  };

  const handleFlagRequest = (requestId, note) => {
    console.log('Flagging request:', requestId, note);
    updateRequestStatus(requestId, 'flagged', note);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for requests:`, selectedRequests);
    if (action === 'approve') {
      setRequests(prev => prev.map(r => selectedRequests.includes(r.id) ? ({ ...r, status: 'approved', reviewedBy: 'Admin (local)', reviewedDate: new Date().toISOString() }) : r));
    } else if (action === 'reject') {
      setRequests(prev => prev.map(r => selectedRequests.includes(r.id) ? ({ ...r, status: 'rejected', reviewedBy: 'Admin (local)', reviewedDate: new Date().toISOString() }) : r));
    }
    setSelectedRequests([]);
  };

  const handleViewDocument = (docUrl) => {
    setSelectedImage(docUrl);
    setShowImageModal(true);
  };

  // ----------------------------
  // Tabs definition with counts
  // ----------------------------
  const tabs = [
    { id: 'all', label: 'Tất cả', count: requests.length },
    { id: 'pending', label: 'Chờ xử lý', count: requests.filter(r => r.status === 'pending').length },
    { id: 'flagged', label: 'Cần kiểm tra', count: requests.filter(r => r.status === 'flagged').length },
    { id: 'approved', label: 'Đã duyệt', count: requests.filter(r => r.status === 'approved').length },
    { id: 'rejected', label: 'Đã từ chối', count: requests.filter(r => r.status === 'rejected').length }
  ];

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Xác minh Tình nguyện viên</h1>
              <p className="text-gray-600 mt-2">Xử lý yêu cầu xác minh danh tính, kỹ năng và lý lịch TNV</p>
            </div>

            <div className="flex items-center space-x-3">
              <button onClick={() => { /* TODO: refresh from API */ }} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <RefreshCw className="w-4 h-4 mr-2" /> Làm mới
              </button>
              <button onClick={() => { /* TODO: export */ }} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" /> Xuất báo cáo
              </button>
            </div>
          </div>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Chờ xử lý</p>
                <p className="text-3xl font-bold text-yellow-600">{requests.filter(r => r.status === 'pending').length}</p>
                <p className="text-sm text-gray-500 mt-1">Yêu cầu mới</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cần kiểm tra</p>
                <p className="text-3xl font-bold text-orange-600">{requests.filter(r => r.status === 'flagged').length}</p>
                <p className="text-sm text-gray-500 mt-1">Có vấn đề</p>
              </div>
              <Flag className="w-10 h-10 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã duyệt</p>
                <p className="text-3xl font-bold text-green-600">{requests.filter(r => r.status === 'approved').length}</p>
                <p className="text-sm text-gray-500 mt-1">Thành công</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tỷ lệ thành công</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round((requests.filter(r => r.status === 'approved').length / Math.max(1, requests.length)) * 100)}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Toàn bộ</p>
              </div>
              <Target className="w-10 h-10 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters & Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Tìm kiếm theo tên, email, ID..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500" />
                </div>

                <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setPage(1); }} className="px-4 py-2 border rounded-lg">
                  <option value="all">Tất cả loại</option>
                  <option value="identity">Định danh</option>
                  <option value="background">Lý lịch</option>
                  <option value="skill">Kỹ năng</option>
                  <option value="education">Học vấn</option>
                </select>

                <select value={`${sortBy}-${sortOrder}`} onChange={(e) => {
                  const [field, order] = e.target.value.split('-'); setSortBy(field); setSortOrder(order);
                }} className="px-4 py-2 border rounded-lg">
                  <option value="submitted_date-desc">Mới nhất</option>
                  <option value="submitted_date-asc">Cũ nhất</option>
                  <option value="priority-desc">Ưu tiên cao</option>
                  <option value="ai_score-asc">Điểm AI thấp</option>
                  <option value="volunteer_name-asc">Tên A-Z</option>
                </select>
              </div>

              {selectedRequests.length > 0 ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Đã chọn {selectedRequests.length}</span>
                  <button onClick={() => handleBulkAction('approve')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">Duyệt tất cả</button>
                  <button onClick={() => handleBulkAction('reject')} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Từ chối tất cả</button>
                  <button onClick={() => setSelectedRequests([])} className="px-4 py-2 bg-gray-300 rounded-lg text-sm">Hủy</button>
                </div>
              ) : (
                <div className="text-sm text-gray-500">Chọn các bản ghi để thực hiện thao tác hàng loạt</div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setPage(1); }} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Requests list */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="divide-y divide-gray-200">
            {paginated.length === 0 && (
              <div className="p-6 text-center text-sm text-gray-500">Không tìm thấy yêu cầu nào</div>
            )}

            {paginated.map(request => {
              const statusCfg = getStatusConfig(request.status);
              const priorityCfg = getPriorityConfig(request.priority);
              const riskCfg = getRiskConfig(request.riskLevel);
              const StatusIcon = statusCfg.icon;

              return (
                <div key={request.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <input type="checkbox" checked={selectedRequests.includes(request.id)} onChange={(e) => {
                      if (e.target.checked) setSelectedRequests(prev => [...prev, request.id]);
                      else setSelectedRequests(prev => prev.filter(id => id !== request.id));
                    }} className="w-4 h-4 mt-1" />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{getVerificationTypeLabel(request.verificationType)} - {request.volunteer.name}</h3>

                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusCfg.color}`}>
                              <StatusIcon className="w-3 h-3 mr-1" /> {statusCfg.label}
                            </span>

                            <span className={`text-xs font-medium ${priorityCfg.color}`}>{priorityCfg.label}</span>

                            {request.flags?.length > 0 && <div className="flex items-center space-x-1 ml-2">{request.flags.map((f, idx) => <AlertTriangle key={idx} className="w-4 h-4 text-red-500" />)}</div>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2"><img src={request.volunteer.avatar} alt={request.volunteer.name} className="w-6 h-6 rounded-full" /><span>{request.volunteer.email}</span></div>
                            <div className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>{request.volunteer.phone}</span></div>
                            <div className="flex items-center space-x-2"><Calendar className="w-4 h-4" /><span>Tham gia {new Date(request.volunteer.joinDate).toLocaleDateString('vi-VN')}</span></div>
                            <div className="flex items-center space-x-2"><Target className="w-4 h-4" /><span>AI Score: {request.aiScore}/100</span></div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Tài liệu đã gửi</h4>
                            <div className="flex flex-wrap gap-3">
                              {request.documents.map((doc, i) => (
                                <div key={i} onClick={() => handleViewDocument(doc.url)} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                  <ImageIcon className="w-4 h-4 text-gray-500" />
                                  <div className="text-sm">
                                    <div className="font-medium">{getDocumentTypeLabel(doc.type)}</div>
                                    <div className="text-xs text-gray-500">{new Date(doc.uploadedDate).toLocaleString()}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="ml-4 flex flex-col items-end space-y-2">
                          <div className="text-xs text-gray-500">{formatDate(request.submittedDate)}</div>

                          <div className="flex flex-col gap-2">
                            <button onClick={() => setSelectedRequest(request)} className="px-3 py-2 bg-white border rounded text-sm hover:bg-gray-50 flex items-center gap-2">
                              <Eye className="w-4 h-4" /> Chi tiết
                            </button>

                            <div className="flex gap-2">
                              <button onClick={() => handleApproveRequest(request.id)} className="px-3 py-2 bg-green-600 text-white rounded text-sm flex items-center gap-2">
                                <CheckSquare className="w-4 h-4" /> Duyệt
                              </button>
                              <button onClick={() => handleFlagRequest(request.id, 'Gắn flag kiểm tra')} className="px-3 py-2 bg-orange-500 text-white rounded text-sm flex items-center gap-2">
                                <Flag className="w-4 h-4" /> Flag
                              </button>
                              <button onClick={() => handleRejectRequest(request.id, 'Từ chối (lý do mẫu)')} className="px-3 py-2 bg-red-600 text-white rounded text-sm flex items-center gap-2">
                                <X className="w-4 h-4" /> Từ chối
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="p-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Hiển thị {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filteredRequests.length)} / {filteredRequests.length}</div>
            <div className="flex items-center gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
              <div className="text-sm px-3">{page} / {totalPages}</div>
              <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowImageModal(false)} />
          <div className="z-10 bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="font-medium">Xem tài liệu</div>
              <button onClick={() => setShowImageModal(false)} className="p-2"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4">
              <img src={selectedImage} alt="document" className="w-full h-[70vh] object-contain" />
              <div className="flex justify-end gap-2 mt-3">
                <a href={selectedImage} target="_blank" rel="noreferrer" className="px-3 py-2 border rounded flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Mở</a>
                <button onClick={() => { navigator.clipboard?.writeText(selectedImage); alert('Đã copy URL (mock)'); }} className="px-3 py-2 border rounded flex items-center gap-2"><Copy className="w-4 h-4" /> Copy URL</button>
                <a href={selectedImage} download className="px-3 py-2 bg-blue-600 text-white rounded flex items-center gap-2"><Download className="w-4 h-4" /> Tải</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over detail for selectedRequest */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setSelectedRequest(null)} />
          <div className="relative ml-auto w-full max-w-2xl bg-white h-full overflow-auto">
            <div className="p-6 border-b flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">{getVerificationTypeLabel(selectedRequest.verificationType)} — {selectedRequest.volunteer.name}</h2>
                <div className="text-sm text-gray-500 mt-1">ID: {selectedRequest.id} • Nộp: {formatDate(selectedRequest.submittedDate)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedRequest(null)} className="p-2"><X className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Volunteer summary */}
              <div className="flex items-center gap-4">
                <img src={selectedRequest.volunteer.avatar} className="w-16 h-16 rounded-full" alt="" />
                <div>
                  <div className="font-medium text-lg">{selectedRequest.volunteer.name}</div>
                  <div className="text-sm text-gray-600">{selectedRequest.volunteer.email} • {selectedRequest.volunteer.phone}</div>
                  <div className="text-xs text-gray-500 mt-1">Trạng thái tài khoản: {selectedRequest.volunteer.currentStatus}</div>
                </div>
              </div>

              {/* Extracted info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Thông tin trích xuất</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                  {Object.entries(selectedRequest.extractedInfo || {}).map(([k,v]) => (
                    <div key={k} className="p-3 border rounded">
                      <div className="text-xs text-gray-500">{k.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="font-medium">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification checks */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Các kiểm tra</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(selectedRequest.verificationChecks || {}).map(([checkKey, check]) => {
                    const status = check.status;
                    const color = status === 'passed' ? 'bg-green-50 text-green-700' : status === 'failed' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700';
                    return (
                      <div key={checkKey} className={`p-3 border rounded ${color}`}>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{checkKey}</div>
                          <div className="text-xs">{check.confidence ? `${check.confidence}%` : ''}</div>
                        </div>
                        {check.issue && <div className="text-xs text-gray-700 mt-1">Vấn đề: {check.issue}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Documents preview */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tài liệu</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedRequest.documents.map((doc, i) => (
                    <div key={i} className="border rounded overflow-hidden">
                      <img src={doc.url} alt={doc.type} className="w-full h-40 object-cover" />
                      <div className="p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{getDocumentTypeLabel(doc.type)}</div>
                          <div className="text-xs text-gray-500">{new Date(doc.uploadedDate).toLocaleString()}</div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button onClick={() => handleViewDocument(doc.url)} className="px-3 py-1 border rounded text-sm flex items-center gap-2"><Eye className="w-4 h-4" /> Xem</button>
                          <button onClick={() => setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, documents: r.documents.map(d => d === doc ? { ...d, verified: !d.verified } : d) } : r))} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                            {doc.verified ? 'Bỏ xác minh' : 'Đánh dấu xác minh'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin actions */}
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => handleFlagRequest(selectedRequest.id, 'Yêu cầu xử lý sâu hơn')} className="px-4 py-2 bg-orange-500 text-white rounded">Gắn flag</button>
                <button onClick={() => handleRejectRequest(selectedRequest.id, 'Từ chối - cần cung cấp tài liệu rõ ràng')} className="px-4 py-2 bg-red-600 text-white rounded">Từ chối</button>
                <button onClick={() => handleApproveRequest(selectedRequest.id)} className="px-4 py-2 bg-green-600 text-white rounded">Duyệt</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
