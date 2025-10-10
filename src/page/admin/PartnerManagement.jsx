import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  Building, Phone, Mail, Globe, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, Crown, Zap, Package,
  BarChart3, PlusCircle, ExternalLink, Briefcase, DollarSign
} from 'lucide-react';

const PartnerManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  // Mock data
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: "UNICEF Việt Nam",
      email: "vietnam@unicef.org",
      phone: "+84 24 3850 0100",
      website: "https://unicef.org.vn",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150",
      tier: "premium",
      status: "verified",
      trustScore: 4.9,
      joinDate: "2023-01-15",
      lastActive: "2024-12-05",
      eventsCreated: 45,
      eventsApproved: 43,
      totalVolunteers: 1250,
      industry: "Tổ chức phi lợi nhuận",
      description: "Quỹ Nhi đồng Liên Hợp Quốc tại Việt Nam, hoạt động vì quyền trẻ em và phát triển bền vững.",
      location: "Hà Nội",
      establishedYear: 1995,
      employeeCount: "100-500",
      socialImpact: 50000,
      avgEventRating: 4.8,
      responseRate: 95,
      featured: true,
      premiumUntil: "2025-12-31",
      violations: 0,
      documents: ["Business License", "Tax Certificate", "NGO Certificate"]
    },
    {
      id: 2,
      name: "Samsung Electronics",
      email: "csr@samsung.vn",
      phone: "+84 28 3910 5000",
      website: "https://samsung.com.vn",
      logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150",
      tier: "verified",
      status: "verified",
      trustScore: 4.7,
      joinDate: "2023-03-20",
      lastActive: "2024-12-04",
      eventsCreated: 28,
      eventsApproved: 26,
      totalVolunteers: 890,
      industry: "Công nghệ",
      description: "Tập đoàn công nghệ hàng đầu thế giới, cam kết phát triển cộng đồng và môi trường bền vững.",
      location: "TP.HCM",
      establishedYear: 1969,
      employeeCount: "1000+",
      socialImpact: 25000,
      avgEventRating: 4.6,
      responseRate: 88,
      featured: false,
      premiumUntil: null,
      violations: 1,
      documents: ["Business License", "Tax Certificate"]
    },
    {
      id: 3,
      name: "Green Earth Foundation",
      email: "info@greenearth.org.vn",
      phone: "+84 24 3945 2000",
      website: "https://greenearth.org.vn",
      logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150",
      tier: "unverified",
      status: "pending",
      trustScore: 0,
      joinDate: "2024-11-30",
      lastActive: "2024-12-05",
      eventsCreated: 2,
      eventsApproved: 0,
      totalVolunteers: 45,
      industry: "Môi trường",
      description: "Tổ chức phi lợi nhuận hoạt động trong lĩnh vực bảo vệ môi trường và phát triển bền vững.",
      location: "Hà Nội",
      establishedYear: 2020,
      employeeCount: "10-50",
      socialImpact: 500,
      avgEventRating: 0,
      responseRate: 0,
      featured: false,
      premiumUntil: null,
      violations: 0,
      documents: ["Business License"]
    },
    {
      id: 4,
      name: "Vingroup Foundation",
      email: "foundation@vingroup.net",
      phone: "+84 24 3974 9999",
      website: "https://vingroup.net/foundation",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150",
      tier: "premium",
      status: "verified",
      trustScore: 4.8,
      joinDate: "2022-06-10",
      lastActive: "2024-12-05",
      eventsCreated: 67,
      eventsApproved: 64,
      totalVolunteers: 2100,
      industry: "Tập đoàn đa ngành",
      description: "Quỹ từ thiện của Tập đoàn Vingroup, tập trung vào giáo dục, y tế và phát triển xã hội.",
      location: "Hà Nội",
      establishedYear: 2014,
      employeeCount: "1000+",
      socialImpact: 75000,
      avgEventRating: 4.7,
      responseRate: 92,
      featured: true,
      premiumUntil: "2025-06-10",
      violations: 0,
      documents: ["Business License", "Tax Certificate", "Foundation Certificate"]
    },
    {
      id: 5,
      name: "Local Community Center",
      email: "contact@lcc.org.vn",
      phone: "+84 28 3824 5000",
      website: null,
      logo: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150",
      tier: "unverified",
      status: "flagged",
      trustScore: 2.1,
      joinDate: "2024-09-15",
      lastActive: "2024-11-20",
      eventsCreated: 8,
      eventsApproved: 3,
      totalVolunteers: 120,
      industry: "Cộng đồng địa phương",
      description: "Trung tâm cộng đồng địa phương tổ chức các hoạt động xã hội.",
      location: "TP.HCM",
      establishedYear: 2018,
      employeeCount: "1-10",
      socialImpact: 800,
      avgEventRating: 3.2,
      responseRate: 65,
      featured: false,
      premiumUntil: null,
      violations: 3,
      documents: []
    }
  ]);

  const stats = {
    total: 245,
    verified: 156,
    premium: 28,
    pending: 45,
    flagged: 16,
    totalEvents: 2840,
    totalVolunteers: 45230,
    avgTrustScore: 4.3,
    monthlyGrowth: 8.2
  };

  const getTierColor = (tier) => {
    switch(tier) {
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'unverified': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTierIcon = (tier) => {
    switch(tier) {
      case 'premium': return <Crown className="w-4 h-4" />;
      case 'verified': return <Shield className="w-4 h-4" />;
      case 'unverified': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTierText = (tier) => {
    switch(tier) {
      case 'premium': return 'Premium';
      case 'verified': return 'Đã xác minh';
      case 'unverified': return 'Chưa xác minh';
      default: return tier;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'flagged': return 'bg-red-100 text-red-800 border-red-200';
      case 'suspended': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'verified': return 'Hoạt động';
      case 'pending': return 'Chờ duyệt';
      case 'flagged': return 'Được gắn cờ';
      case 'suspended': return 'Tạm dừng';
      default: return status;
    }
  };

  const filteredPartners = partners.filter(partner => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = !q || partner.name.toLowerCase().includes(q) ||
                         partner.email.toLowerCase().includes(q) ||
                         (partner.industry || '').toLowerCase().includes(q);
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'premium') return matchesSearch && partner.tier === 'premium';
    if (activeTab === 'verified') return matchesSearch && partner.tier === 'verified';
    if (activeTab === 'pending') return matchesSearch && partner.status === 'pending';
    if (activeTab === 'flagged') return matchesSearch && partner.status === 'flagged';
    return matchesSearch;
  });

  // bulk actions
  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for partners:`, selectedPartners);
    if (action === 'suspend') {
      setPartners(prev => prev.map(p => selectedPartners.includes(p.id) ? { ...p, status: 'suspended' } : p));
    } else if (action === 'delete') {
      setPartners(prev => prev.filter(p => !selectedPartners.includes(p.id)));
    }
    setSelectedPartners([]);
    setSelectAll(false);
  };

  const handleVerifyPartner = (id) => {
    setPartners(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'verified', tier: 'verified', trustScore: Math.max(4.0, p.trustScore) } : p
    ));
  };

  const handleUpgradePremium = (id) => {
    setPartners(prev => prev.map(p => 
      p.id === id ? { ...p, tier: 'premium', premiumUntil: "2025-12-31" } : p
    ));
  };

  const handleSuspendPartner = (id) => {
    setPartners(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'suspended' } : p
    ));
  };

  const toggleSelectPartner = (id) => {
    setSelectedPartners(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // select all in current filtered list
  useEffect(() => {
    if (selectAll) {
      setSelectedPartners(filteredPartners.map(p => p.id));
    } else {
      setSelectedPartners([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAll, activeTab, searchTerm]);

  // Modal component
  const ProfileModal = ({ partner, onClose }) => {
    if (!partner) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Hồ sơ Đối tác</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: main info + documents + performance */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <img src={partner.logo} alt={partner.name} className="w-20 h-20 rounded-lg object-cover border border-gray-200" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{partner.name}</h3>
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border flex items-center space-x-1 ${getTierColor(partner.tier)}`}>
                          {getTierIcon(partner.tier)}
                          <span>{getTierText(partner.tier)}</span>
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(partner.status)}`}>
                          {getStatusText(partner.status)}
                        </span>
                        {partner.featured && (
                          <span className="px-3 py-1 text-xs font-medium rounded-full border bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{partner.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{partner.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Thành lập {partner.establishedYear}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{partner.industry}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{partner.employeeCount} nhân viên</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center"><Phone className="w-5 h-5 mr-2 text-blue-600" /> Thông tin liên hệ</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{partner.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Điện thoại</label>
                    <p className="text-gray-900">{partner.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Website</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-900">{partner.website || 'Không có'}</p>
                      {partner.website && (
                        <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tham gia từ</label>
                    <p className="text-gray-900">{partner.joinDate}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-green-600" /> Tài liệu & Xác minh</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Tài liệu đã tải lên</label>
                    <div className="space-y-2">
                      {partner.documents.length > 0 ? partner.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">{doc}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Xem</button>
                            <button className="text-green-600 hover:text-green-800 text-sm">Duyệt</button>
                          </div>
                        </div>
                      )) : <p className="text-gray-500 text-sm italic">Chưa có tài liệu nào</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Số lần vi phạm</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      partner.violations === 0 ? 'bg-green-100 text-green-800' :
                      partner.violations < 3 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {partner.violations} vi phạm
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-purple-600" /> Hiệu suất hoạt động</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{partner.eventsCreated}</div>
                    <div className="text-sm text-gray-600">Sự kiện tạo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{partner.eventsApproved}</div>
                    <div className="text-sm text-gray-600">Đã được duyệt</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{partner.totalVolunteers}</div>
                    <div className="text-sm text-gray-600">TNV tham gia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{partner.socialImpact.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Tác động xã hội</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Tỉ lệ phản hồi</span>
                    <span className="text-sm font-semibold text-gray-900">{partner.responseRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${partner.responseRate}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: trust score, premium, actions */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{partner.trustScore.toFixed(1)}</div>
                <div className="text-sm text-gray-600 mb-4">Điểm tin cậy</div>
                <div className="flex justify-center mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className={`w-5 h-5 ${star <= Math.round(partner.trustScore) ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                {partner.avgEventRating > 0 && <div className="text-sm text-gray-600">Đánh giá TB: {partner.avgEventRating}/5</div>}
              </div>

              {partner.tier === 'premium' && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Crown className="w-8 h-8 text-purple-600" />
                  </div>
                  <h5 className="font-semibold text-purple-900 mb-2">Premium Partner</h5>
                  <p className="text-sm text-purple-700">Có hiệu lực đến {partner.premiumUntil}</p>
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Thao tác</h4>
                <div className="space-y-3">
                  {partner.status === 'pending' && (
                    <button onClick={() => handleVerifyPartner(partner.id)} className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <CheckCircle className="w-4 h-4" /><span>Xác minh</span>
                    </button>
                  )}
                  {partner.tier !== 'premium' && partner.status === 'verified' && (
                    <button onClick={() => handleUpgradePremium(partner.id)} className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      <Crown className="w-4 h-4" /><span>Nâng cấp Premium</span>
                    </button>
                  )}
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <MessageSquare className="w-4 h-4" /><span>Nhắn tin</span>
                  </button>
                  <button onClick={() => setPartners(prev => prev.map(p => p.id === partner.id ? {...p, featured: !p.featured} : p))} className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${partner.featured ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'}`}>
                    <Star className="w-4 h-4" /><span>{partner.featured ? 'Bỏ Featured' : 'Đặt Featured'}</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                    <Flag className="w-4 h-4" /><span>Gắn cờ</span>
                  </button>
                  {partner.status !== 'suspended' && (
                    <button onClick={() => handleSuspendPartner(partner.id)} className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <Ban className="w-4 h-4" /><span>Tạm dừng</span>
                    </button>
                  )}
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <History className="w-4 h-4" /><span>Lịch sử hoạt động</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main list/grid UI
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Show profile modal if requested */}
      {showProfile && selectedPartner && (
        <ProfileModal partner={selectedPartner} onClose={() => { setShowProfile(false); setSelectedPartner(null); }} />
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Đối tác/BTC</h1>
            <p className="text-gray-600 mt-2">Trust Tiering, xác minh đối tác và quản lý uy tín</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Xuất báo cáo</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <PlusCircle className="w-4 h-4" />
              <span>Thêm đối tác</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng đối tác</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-green-600 mt-1">+{stats.monthlyGrowth}% tháng này</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã xác minh</p>
              <p className="text-2xl font-bold text-gray-900">{stats.verified}</p>
              <p className="text-sm text-gray-600 mt-1">{stats.premium} Premium</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chờ duyệt</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-600 mt-1">Flagged: {stats.flagged}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng sự kiện</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
              <p className="text-sm text-gray-600 mt-1">{stats.totalVolunteers.toLocaleString()} TNV</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-72 focus:ring-2 focus:ring-blue-500" placeholder="Tìm tên, email, ngành..." />
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setFilterOpen(f => !f)} className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Bộ lọc
            </button>
            <button onClick={() => setViewMode(vm => vm === 'list' ? 'grid' : 'list')} className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50">
              <MoreHorizontal className="w-4 h-4" /> {viewMode === 'list' ? 'Chế độ lưới' : 'Chế độ danh sách'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {selectedPartners.length > 0 ? (
            <>
              <span className="text-sm text-gray-600">{selectedPartners.length} được chọn</span>
              <button onClick={() => handleBulkAction('suspend')} className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm">Tạm dừng</button>
              <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm">Xóa</button>
            </>
          ) : (
            <>
              <label className="inline-flex items-center text-sm text-gray-600">
                <input type="checkbox" checked={selectAll} onChange={(e) => setSelectAll(e.target.checked)} className="form-checkbox mr-2" />
                Chọn tất cả
              </label>
              <button onClick={() => { setSearchTerm(''); setActiveTab('all'); }} className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-50">Reset</button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200">
        <nav className="flex space-x-6 px-4 py-3 text-sm">
          <button onClick={() => setActiveTab('all')} className={`px-2 py-1 ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Tất cả</button>
          <button onClick={() => setActiveTab('premium')} className={`px-2 py-1 ${activeTab === 'premium' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Premium</button>
          <button onClick={() => setActiveTab('verified')} className={`px-2 py-1 ${activeTab === 'verified' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Đã xác minh</button>
          <button onClick={() => setActiveTab('pending')} className={`px-2 py-1 ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Chờ duyệt</button>
          <button onClick={() => setActiveTab('flagged')} className={`px-2 py-1 ${activeTab === 'flagged' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Gắn cờ</button>
        </nav>
      </div>

      {/* Partners list */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredPartners.map(partner => (
            <div key={partner.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input type="checkbox" checked={selectedPartners.includes(partner.id)} onChange={() => toggleSelectPartner(partner.id)} className="form-checkbox" />
                <img src={partner.logo} alt={partner.name} className="w-12 h-12 object-cover rounded-md border" />
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getTierColor(partner.tier)}`}>{getTierText(partner.tier)}</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(partner.status)}`}>{getStatusText(partner.status)}</span>
                    {partner.featured && <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Featured</span>}
                  </div>
                  <p className="text-sm text-gray-600">{partner.industry} • {partner.location}</p>
                  <p className="text-sm text-gray-500 mt-1">Trust: <span className="font-semibold text-gray-900">{partner.trustScore.toFixed(1)}</span> • Events: {partner.eventsCreated}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => { setSelectedPartner(partner); setShowProfile(true); }} className="px-3 py-1 rounded-lg border hover:bg-gray-50 text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Xem
                </button>
                <button onClick={() => handleVerifyPartner(partner.id)} className="px-3 py-1 rounded-lg border hover:bg-gray-50 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Xác minh
                </button>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500"> {partner.responseRate}% phản hồi</div>
                  <div className="text-xs text-gray-400">Active: {partner.lastActive}</div>
                </div>
              </div>
            </div>
          ))}
          {filteredPartners.length === 0 && <div className="text-gray-500">Không tìm thấy đối tác phù hợp.</div>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map(partner => (
            <div key={partner.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 flex items-start gap-4">
                <input type="checkbox" checked={selectedPartners.includes(partner.id)} onChange={() => toggleSelectPartner(partner.id)} className="form-checkbox mt-3" />
                <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-cover rounded-md border" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                    <div className="text-sm text-gray-500">{partner.trustScore.toFixed(1)}</div>
                  </div>
                  <p className="text-sm text-gray-600">{partner.industry}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setSelectedPartner(partner); setShowProfile(true); }} className="px-2 py-1 text-sm border rounded hover:bg-gray-50"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => handleUpgradePremium(partner.id)} className="px-2 py-1 text-sm border rounded hover:bg-gray-50"><Crown className="w-4 h-4" /></button>
                    </div>
                    <div className="text-xs text-gray-400">{partner.location}</div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 border-t flex items-center justify-between">
                <div className="text-sm text-gray-600">Events: {partner.eventsCreated}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleSuspendPartner(partner.id)} className="text-sm text-red-600">Tạm dừng</button>
                  <button onClick={() => setPartners(prev => prev.filter(p => p.id !== partner.id))} className="text-sm text-gray-600">Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerManagement;
