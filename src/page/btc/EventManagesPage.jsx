import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ChartNoAxesCombined,
  XCircle
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

/** Helpers */
function mapStatus(status) {
  if (!status) return 'Không xác định';
  const s = String(status).toLowerCase();
  switch (s) {
    case 'published':
      return 'Đang tuyển';
    case 'paused':
      return 'Tạm dừng';
    case 'completed':
      return 'Hoàn thành';
    case 'closed':
      return 'Đã đóng';
    case 'draft':
      return 'Bản nháp';
    case 'PENDING':
      return 'Chờ duyệt';
    default:
      return 'Không xác định';
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('vi-VN');
}

const getStatusBadge = (statusText) => {
  switch (statusText) {
    case 'Đang tuyển':
      return { badgeClass: 'bg-green-100 text-green-800', textColor: 'text-green-600', icon: <CheckCircle className="w-4 h-4" /> };
    case 'PENDING':
      return { badgeClass: 'bg-yellow-100 text-yellow-800', textColor: 'text-yellow-600', icon: <AlertCircle className="w-4 h-4" /> };
    case 'Hoàn thành':
      return { badgeClass: 'bg-indigo-100 text-indigo-800', textColor: 'text-indigo-600', icon: <CheckCircle className="w-4 h-4" /> };
    case 'Đã đóng':
      return { badgeClass: 'bg-red-100 text-red-800', textColor: 'text-red-600', icon: <XCircle className="w-4 h-4" /> };
    default:
      return { badgeClass: 'bg-gray-100 text-gray-800', textColor: 'text-gray-600', icon: <Clock className="w-4 h-4" /> };
  }
};

const getOptimizationColor = (percentage) => {
  const num = parseInt(String(percentage).replace('%', ''), 10) || 0;
  if (num >= 80) return 'text-green-600 bg-green-50';
  if (num >= 60) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

const EventManages = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [searchParams] = useSearchParams();

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [reload, setReload] = useState(false);
  const [campaignsData, setCampaignsData] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tất cả chiến dịch');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // init filter from query param
  useEffect(() => {
    const paramType = searchParams.get('type');
    if (paramType) {
      const mapped = mapStatus(paramType);
      setSelectedFilter(mapped);
    } else {
      setSelectedFilter('Tất cả chiến dịch');
    }
  }, [searchParams]);

  // load data
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/organizer/events`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(res.data);
        if (res?.data?.code === 0) {
          const items = res.data.result || [];
          setCampaignsData(items);
        } else {
          setCampaignsData([]);
        }
      } catch (err) {
        setError('Không thể tải danh sách chiến dịch');
        setCampaignsData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, [reload, token]);

  // normalize campaigns for UI
  const campaigns = useMemo(() => {
    if (!Array.isArray(campaignsData)) return [];
    return campaignsData.map((it) => {
      const statusText = mapStatus(it.status);
      const statusMeta = getStatusBadge(statusText);
      return {
        id: it.id,
        slug: it.slug,
        title: it.title || it.description || '-',
        createdDate: formatDate(it.updatedAt || it.createdAt),
        applicants: Number(it.applicants || it.totalApplicant || 0),
        views: Number(it.views || it.totalView || it.totalLike || 0),
        organizationName: it.fullName || null,
        location: it.location || it.detailLocation || '',
        serviceStatus: it.priority || '-',
        optimization: it.optimization || it.priority || 'Normal',
        jobPostings: it.type || '-',
        compensation:  it.type === "PROFIT" && Number(it.salary) > 0 ? it.salary : null,
        deadline: it.deadline || it.endAt || null,
        status: statusText,
        statusBadgeClass: statusMeta.badgeClass,
        statusTextColor: statusMeta.textColor,
        statusIcon: statusMeta.icon
      };
    });
  }, [campaignsData]);

  // filter & search
  useEffect(() => {
    if (!campaigns.length) {
      setFilteredCampaigns([]);
      return;
    }
    const q = searchTerm.trim().toLowerCase();
    const filtered = campaigns.filter((c) => {
      const matchesSearch = !q ||
        String(c.id).toLowerCase().includes(q) ||
        (c.title || '').toLowerCase().includes(q) ||
        (c.organizationName || '').toLowerCase().includes(q) ||
        (c.location || '').toLowerCase().includes(q);

      const matchesFilter = !selectedFilter ||
        selectedFilter === 'Tất cả chiến dịch' ||
        selectedFilter === 'all' ||
        c.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });
    setFilteredCampaigns(filtered);
    setCurrentPage(1);
  }, [campaigns, searchTerm, selectedFilter]);

  // totals
  const totals = useMemo(() => {
    const totalCampaigns = campaigns.length;
    const activeCount = campaigns.filter((c) => c.status === 'Đang tuyển').length;
    const totalApplicants = campaigns.reduce((s, c) => s + (Number(c.applicants) || 0), 0);
    const totalViews = campaigns.reduce((s, c) => s + (Number(c.views) || 0), 0);
    return { totalCampaigns, activeCount, totalApplicants, totalViews };
  }, [campaigns]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / pageSize));
  const paginatedCampaigns = filteredCampaigns.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // handlers
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedFilter('Tất cả chiến dịch');
  };

  const handleDelete = async (id) => {
    const check = confirm('Bạn có chắc muốn xóa sự kiện này!');
    if (!check) return;

    const loaded = async () => {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/api/btc/events/${id}/delete`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if(res.data?.result){
          toast.success("Xóa thành công!")
          setReload(!reload);
        }else {
          toast.error("Có lỗi sảy ra trong quá trình!");
        }
      } catch (err) {
        console.log(err);
        toast.warning('Xóa thất bại');
      }
    }

    loaded();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, newPage)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // --- Render helpers (smaller components inside) ---
  const renderStatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Tổng chiến dịch</p>
            <p className="text-3xl font-bold text-gray-800">{totals.totalCampaigns}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Đang hoạt động</p>
            <p className="text-3xl font-bold text-green-600">{totals.activeCount}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Tổng ứng viên</p>
            <p className="text-3xl font-bold text-purple-600">{totals.totalApplicants}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Lượt xem</p>
            <p className="text-3xl font-bold text-orange-600">{totals.totalViews}</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Eye className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSearchAndFilter = () => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm chiến dịch (Nhấn enter để tìm kiếm)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-48"
          >
            <option value="Tất cả chiến dịch">Tất cả chiến dịch</option>
            <option value="Đang tuyển">Đang tuyển</option>
            <option value="Tạm dừng">Tạm dừng</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Đã đóng">Đã đóng</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
            <option value="Bản nháp">Bản nháp</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderCampaignRow = (campaign) => (
    <div key={campaign.id ?? Math.random()} className="grid grid-cols-12 gap-4 px-6 py-6 hover:bg-gray-50 transition-colors group">
      {/* Campaign Info */}
      <div className="col-span-4">
        <div className="flex items-center space-x-4">
          <div className="min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm text-gray-500 font-mono truncate">{campaign.id}</span>
            </div>

            <a
              target='_blank'
              href={`/btc/events/${campaign?.slug}`}
              className="font-semibold text-gray-800 group-hover:text-blue-600 hover:underline transition-colors truncate block"
            >
              {campaign.title}
            </a>

            <div className="flex flex-col justify-center space-y-1 mt-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{campaign.createdDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{campaign.applicants} ứng viên</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{campaign.views} lượt xem</span>
              </div>
              {campaign.organizationName && (
                <div className="flex items-center space-x-1 text-xs text-gray-400 mt-1">
                  <span className="italic">{campaign.organizationName}</span>
                  {campaign.location && <span>• {campaign.location}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Optimization (priority) */}
      <div className="col-span-1 flex items-center justify-center">
        <div className={`px-3 py-2 rounded-lg text-sm font-bold ${getOptimizationColor(campaign.optimization)}`}>
          {campaign.optimization}
        </div>
      </div>

      {/* Job Postings */}
      <div className="col-span-2 flex items-center">
        <div className="text-sm">
          <div className="font-medium text-gray-800">{campaign.jobPostings}</div>
          {campaign.status === 'Đang tuyển' && <div className="text-green-600 text-xs mt-1">✓ Đang hiển thị công khai</div>}
        </div>
      </div>
   
      {/* Service Status */}
      <div className="col-span-2 flex items-center min-w-0 overflow-hidden justify-between px-2">
        <div className="text-sm text-gray-600 w-full whitespace-normal break-words line-clamp-3">
          {campaign.serviceStatus}
        </div>
      </div>


      {/* Deadline */}
      <div className="col-span-2 flex items-center justify-between px-2">
        <div className="text-xs text-gray-400">{campaign.deadline ? formatDate(campaign.deadline) : ''}</div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-0.5 col-span-1 justify-end">
        <button
          onClick={() => navigate(`/btc/events/recruitment-post?eventId=${campaign.id}&&type=edit`)}
          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(campaign.id)}
          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderCampaignsTable = () => (
    <div className="overflow-y-auto relative bg-white rounded-t-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Table Header — KHỚP với col-span của row */}
      <div className="bg-gray-50 border-b sticky top-0 left-0 border-gray-200 z-10">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
          <div className="col-span-4">Chiến dịch tuyển dụng</div>
          <div className="col-span-1">Ưu tiên</div>
          <div className="col-span-2">Loại hình</div>
          <div className="col-span-2">Dịch vụ đang chạy</div>
          <div className="col-span-2">Hạn tuyển</div>
          <div className="col-span-1 text-center">Thao tác</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {paginatedCampaigns.map(renderCampaignRow)}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between px-6 pb-6">
        <div className="text-sm text-gray-600">
          Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredCampaigns.length)} trên {filteredCampaigns.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-3 py-1 text-sm">{currentPage}/{totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="bg-white rounded-b-2xl p-12 text-center shadow-lg border border-gray-100">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy chiến dịch nào</h3>
      <p className="text-gray-500 mb-6">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm thêm chiến dịch</p>
      <button
        onClick={handleClearFilters}
        className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
      >
        Xóa bộ lọc
      </button>
    </div>
  );

  const renderQuickActions = () => (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link to="/btc/recruitment-post" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
          <Plus className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-bold text-gray-800 mb-2">Tạo chiến dịch mới</h3>
        <p className="text-gray-600 text-sm">Bắt đầu chiến dịch tuyển dụng mới với AI hỗ trợ</p>
      </Link>

      <Link to="/btc/recruitment-report" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="font-bold text-gray-800 mb-2">Phân tích hiệu quả</h3>
        <p className="text-gray-600 text-sm">Xem báo cáo chi tiết về hiệu quả các chiến dịch</p>
      </Link>

      <Link to="/btc/cv-manage" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
          <Users className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="font-bold text-gray-800 mb-2">Quản lý ứng viên</h3>
        <p className="text-gray-600 text-sm">Xem và quản lý tất cả ứng viên đã ứng tuyển</p>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 w-full mb-18">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">Quản lý chiến dịch tuyển dụng</h1>
              <p className="text-gray-600 mt-1 hidden md:block text-sm">Theo dõi và quản lý tất cả chiến dịch tuyển dụng TNV - CTV của bạn</p>
              <p className="text-gray-600 mt-1 block md:hidden text-sm">Theo dõi và quản lý tất các chiến dịch</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 py-8">
        {renderStatsCards()}
        {renderSearchAndFilter()}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Tìm thấy {filteredCampaigns.length} chiến dịch tuyển dụng</h2>
          </div>
        </div>

        {filteredCampaigns.length === 0 ? renderEmptyState() : renderCampaignsTable()}

        {renderQuickActions()}
      </div>
    </div>
  );
};

export default EventManages;
