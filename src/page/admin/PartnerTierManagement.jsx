import React, { useState } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  Building, Phone, Mail, Globe, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, Crown, Zap, Package,
  BarChart3, PlusCircle, ExternalLink, Briefcase, DollarSign,
  Upload, Camera, User, Image, CheckSquare, AlertCircle,
  ArrowUp, ArrowDown, RefreshCw, Coins, Gift, Lock
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts';

export default function PartnerTierManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [showTierModal, setShowTierModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // ---- Mock data (same as you provided) ----
  const partners = [
    {
      id: 1,
      name: "UNICEF Việt Nam",
      email: "vietnam@unicef.org",
      phone: "+84 24 3850 0100",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150",
      currentTier: "premium",
      previousTier: "verified",
      tierSince: "2023-01-15T10:00:00Z",
      tierExpiry: "2025-12-31T23:59:59Z",
      industry: "Tổ chức phi lợi nhuận",
      location: "Hà Nội",
      joinDate: "2023-01-15",
      metrics: {
        trustScore: 4.9,
        eventsCreated: 45,
        eventsCompleted: 43,
        totalVolunteers: 1250,
        avgEventRating: 4.8,
        responseRate: 95,
        completionRate: 95.6,
        violationCount: 0,
        socialImpact: 50000,
        monthlyRevenue: 500000000,
        yearsActive: 2
      },
      benefitsUsed: {
        prioritySupport: 15,
        featuredEvents: 12,
        customBranding: true,
        analyticsAccess: true,
        apiAccess: true,
        dedicatedManager: true
      },
      tierPayments: [
        { date: "2024-01-15", amount: 10000000, status: "paid", period: "Q1 2024" },
        { date: "2024-04-15", amount: 10000000, status: "paid", period: "Q2 2024" },
        { date: "2024-07-15", amount: 10000000, status: "paid", period: "Q3 2024" },
        { date: "2024-10-15", amount: 10000000, status: "pending", period: "Q4 2024" }
      ],
      tierHistory: [
        { date: "2023-01-15", fromTier: "unverified", toTier: "verified", reason: "Completed verification" },
        { date: "2023-06-20", fromTier: "verified", toTier: "premium", reason: "Upgraded to premium" }
      ],
      nextReviewDate: "2024-12-15T00:00:00Z",
      autoRenewal: true,
      eligibleForUpgrade: false,
      eligibleForDowngrade: false
    },
    {
      id: 2,
      name: "Samsung Electronics Vietnam",
      email: "csr@samsung.vn",
      logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150",
      currentTier: "verified",
      previousTier: "unverified",
      tierSince: "2023-03-20T10:00:00Z",
      tierExpiry: null,
      industry: "Công nghệ",
      location: "TP.HCM",
      joinDate: "2023-03-20",
      metrics: {
        trustScore: 4.7,
        eventsCreated: 28,
        eventsCompleted: 26,
        totalVolunteers: 890,
        avgEventRating: 4.6,
        responseRate: 88,
        completionRate: 92.9,
        violationCount: 1,
        socialImpact: 25000,
        monthlyRevenue: 0,
        yearsActive: 1.8
      },
      benefitsUsed: {
        prioritySupport: 5,
        featuredEvents: 0,
        customBranding: false,
        analyticsAccess: true,
        apiAccess: false,
        dedicatedManager: false
      },
      tierPayments: [],
      tierHistory: [
        { date: "2023-03-20", fromTier: "unverified", toTier: "verified", reason: "Completed verification process" }
      ],
      nextReviewDate: "2024-12-20T00:00:00Z",
      autoRenewal: false,
      eligibleForUpgrade: true,
      eligibleForDowngrade: false
    },
    {
      id: 3,
      name: "Green Earth Foundation",
      email: "info@greenearth.org.vn",
      logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150",
      currentTier: "unverified",
      previousTier: null,
      tierSince: "2024-11-30T10:00:00Z",
      tierExpiry: null,
      industry: "Môi trường",
      location: "Hà Nội",
      joinDate: "2024-11-30",
      metrics: {
        trustScore: 0,
        eventsCreated: 2,
        eventsCompleted: 0,
        totalVolunteers: 45,
        avgEventRating: 0,
        responseRate: 75,
        completionRate: 0,
        violationCount: 0,
        socialImpact: 500,
        monthlyRevenue: 0,
        yearsActive: 0.1
      },
      benefitsUsed: {
        prioritySupport: 0,
        featuredEvents: 0,
        customBranding: false,
        analyticsAccess: false,
        apiAccess: false,
        dedicatedManager: false
      },
      tierPayments: [],
      tierHistory: [],
      nextReviewDate: "2025-02-28T00:00:00Z",
      autoRenewal: false,
      eligibleForUpgrade: true,
      eligibleForDowngrade: false
    }
  ];

  const tierDefinitions = {
    unverified: {
      name: "Chưa xác minh",
      color: "gray",
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      borderColor: "border-gray-200",
      icon: Clock,
      price: 0,
      description: "Đối tác mới, chưa được xác minh",
      benefits: ["Tạo sự kiện cơ bản","Hỗ trợ email tiêu chuẩn","Báo cáo cơ bản","Tối đa 5 sự kiện/tháng"],
      limits: { eventsPerMonth: 5, volunteersPerEvent: 50, customBranding: false, prioritySupport: false, featuredListing: false, analyticsAccess: false },
      requirements: { minTrustScore: 0, minEventsCompleted: 0, minCompletionRate: 0, maxViolations: 999, verificationRequired: false }
    },
    verified: {
      name: "Đã xác minh",
      color: "green",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200",
      icon: Shield,
      price: 0,
      description: "Đối tác đã được xác minh danh tính và uy tín",
      benefits: ["Không giới hạn sự kiện","Hỗ trợ ưu tiên","Báo cáo chi tiết","Tích hợp API cơ bản","Huy hiệu xác minh","Analytics nâng cao"],
      limits: { eventsPerMonth: 999, volunteersPerEvent: 500, customBranding: false, prioritySupport: true, featuredListing: false, analyticsAccess: true },
      requirements: { minTrustScore: 4.0, minEventsCompleted: 3, minCompletionRate: 80, maxViolations: 2, verificationRequired: true }
    },
    premium: {
      name: "Premium",
      color: "purple",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
      borderColor: "border-purple-200",
      icon: Crown,
      price: 5000000,
      priceUnit: "VND/tháng",
      description: "Gói cao cấp với tất cả tính năng và hỗ trợ VIP",
      benefits: ["Tất cả quyền lợi Verified","Sự kiện Featured ưu tiên","Custom branding","Dedicated account manager","API không giới hạn","Hỗ trợ 24/7","Báo cáo tùy chỉnh","Whitelabel options"],
      limits: { eventsPerMonth: 999, volunteersPerEvent: 9999, customBranding: true, prioritySupport: true, featuredListing: true, analyticsAccess: true },
      requirements: { minTrustScore: 4.5, minEventsCompleted: 10, minCompletionRate: 90, maxViolations: 0, verificationRequired: true }
    }
  };

  const stats = {
    totalPartners: 245,
    unverified: 89,
    verified: 128,
    premium: 28,
    monthlyRevenue: 140000000,
    avgTierDuration: 8.3,
    upgradeRate: 12.5,
    churnRate: 2.1
  };

  const tierDistribution = [
    { name: 'Chưa xác minh', value: stats.unverified, color: '#6b7280' },
    { name: 'Đã xác minh', value: stats.verified, color: '#10b981' },
    { name: 'Premium', value: stats.premium, color: '#8b5cf6' }
  ];

  const revenueData = [
    { month: 'T7', revenue: 120000000, partners: 25 },
    { month: 'T8', revenue: 125000000, partners: 25 },
    { month: 'T9', revenue: 130000000, partners: 26 },
    { month: 'T10', revenue: 135000000, partners: 27 },
    { month: 'T11', revenue: 140000000, partners: 28 },
    { month: 'T12', revenue: 140000000, partners: 28 }
  ];

  // ------------------------
  // filtering and utilities
  // ------------------------
  const filteredPartners = partners.filter(partner => {
    const q = searchTerm.trim().toLowerCase();
    const matches = !q || partner.name.toLowerCase().includes(q) || (partner.email && partner.email.toLowerCase().includes(q));
    if (selectedFilter === 'all') return matches;
    return matches && partner.currentTier === selectedFilter;
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getTierConfig = (tier) => tierDefinitions[tier] || tierDefinitions.unverified;
  const getTierIcon = (tier) => {
    const Icon = getTierConfig(tier).icon;
    return <Icon className="w-4 h-4" />;
  };

  const calculateTierEligibility = (partner) => {
    const metrics = partner.metrics;
    const eligible = { verified: false, premium: false, reasons: [] };
    const verifiedReqs = tierDefinitions.verified.requirements;
    if (metrics.trustScore >= verifiedReqs.minTrustScore && metrics.eventsCompleted >= verifiedReqs.minEventsCompleted && metrics.completionRate >= verifiedReqs.minCompletionRate && metrics.violationCount <= verifiedReqs.maxViolations) {
      eligible.verified = true;
    } else {
      if (metrics.trustScore < verifiedReqs.minTrustScore) eligible.reasons.push(`Trust score cần ≥ ${verifiedReqs.minTrustScore}`);
      if (metrics.eventsCompleted < verifiedReqs.minEventsCompleted) eligible.reasons.push(`Cần hoàn thành ≥ ${verifiedReqs.minEventsCompleted} sự kiện`);
      if (metrics.completionRate < verifiedReqs.minCompletionRate) eligible.reasons.push(`Tỷ lệ hoàn thành cần ≥ ${verifiedReqs.minCompletionRate}%`);
      if (metrics.violationCount > verifiedReqs.maxViolations) eligible.reasons.push(`Có ${metrics.violationCount} vi phạm (tối đa ${verifiedReqs.maxViolations})`);
    }
    const premiumReqs = tierDefinitions.premium.requirements;
    if (eligible.verified && metrics.trustScore >= premiumReqs.minTrustScore && metrics.eventsCompleted >= premiumReqs.minEventsCompleted && metrics.completionRate >= premiumReqs.minCompletionRate && metrics.violationCount <= premiumReqs.maxViolations) eligible.premium = true;
    else if (!eligible.verified) eligible.reasons.push("Cần đạt tier Verified trước");
    else {
      if (metrics.trustScore < premiumReqs.minTrustScore) eligible.reasons.push(`Trust score cần ≥ ${premiumReqs.minTrustScore}`);
      if (metrics.eventsCompleted < premiumReqs.minEventsCompleted) eligible.reasons.push(`Cần hoàn thành ≥ ${premiumReqs.minEventsCompleted} sự kiện`);
      if (metrics.completionRate < premiumReqs.minCompletionRate) eligible.reasons.push(`Tỷ lệ hoàn thành cần ≥ ${premiumReqs.minCompletionRate}%`);
    }
    return eligible;
  };

  // ------------------------
  // actions (mock local updates)
  // ------------------------
  const toggleSelect = (id) => {
    setSelectedPartners(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAllVisible = () => {
    const ids = filteredPartners.map(p => p.id);
    const allSelected = ids.every(id => selectedPartners.includes(id));
    setSelectedPartners(allSelected ? [] : ids);
  };

  const handleBulkTierChange = (newTier) => {
    // TODO: call API to change tiers in backend
    console.log('Bulk tier change to', newTier, selectedPartners);
    setSelectedPartners([]);
  };

  const handleTierChange = (partnerId, newTier, reason = '') => {
    console.log(`Change tier ${partnerId} -> ${newTier}`, reason);
    // TODO: update backend; here we just log
    setShowUpgradeModal(false);
    setShowTierModal(false);
    setSelectedPartner(null);
  };

  const openTierModal = (partner) => {
    setSelectedPartner(partner);
    setShowTierModal(true);
  };

  const openBenefitsModal = (partner) => {
    setSelectedPartner(partner);
    setShowBenefitsModal(true);
  };

  const openUpgradeModal = (partner) => {
    setSelectedPartner(partner);
    setShowUpgradeModal(true);
  };

  // ------------------------
  // subcomponents: Modals
  // ------------------------
  const TierDetailModal = ({ partner, onClose }) => {
    if (!partner) return null;
    const cfg = getTierConfig(partner.currentTier);
    const eligibility = calculateTierEligibility(partner);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative w-full max-w-4xl bg-white rounded-xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Chi tiết Tier — {partner.name}</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => openUpgradeModal(partner)} className="px-3 py-1 bg-purple-600 text-white rounded">Nâng cấp</button>
              <button onClick={onClose} className="p-2 rounded border"><XCircle className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={partner.logo} alt={partner.name} className="w-16 h-16 rounded object-cover border" />
                  <div>
                    <div className="font-semibold">{partner.name}</div>
                    <div className="text-sm text-gray-500">{partner.industry} • {partner.location}</div>
                    <div className="text-sm text-gray-500">Tier: <span className="font-medium">{cfg.name}</span></div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div><div className="text-xs text-gray-500">Trust Score</div><div className="font-semibold">{partner.metrics.trustScore.toFixed(1)}/5</div></div>
                  <div><div className="text-xs text-gray-500">Sự kiện hoàn thành</div><div className="font-semibold">{partner.metrics.eventsCompleted}</div></div>
                  <div><div className="text-xs text-gray-500">Tỷ lệ hoàn thành</div><div className="font-semibold">{partner.metrics.completionRate}%</div></div>
                  <div><div className="text-xs text-gray-500">Vi phạm</div><div className={`font-semibold ${partner.metrics.violationCount>0 ? 'text-red-600' : 'text-green-600'}`}>{partner.metrics.violationCount}</div></div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Lịch sử tier</h4>
                <div className="space-y-2 text-sm">
                  {partner.tierHistory.length === 0 ? <div className="text-gray-500">Không có lịch sử</div> :
                    partner.tierHistory.map((h, i) => (
                      <div key={i} className="p-2 bg-gray-50 rounded">
                        <div className="text-xs text-gray-500">{formatDate(h.date)}</div>
                        <div className="font-medium">{h.fromTier} ➜ {h.toTier}</div>
                        <div className="text-gray-600 text-sm mt-1">{h.reason}</div>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Yêu cầu để nâng cấp</h4>
                <div className="text-sm text-gray-700">
                  <p className="mb-2">Verified: {eligibility.verified ? <span className="text-green-600">Đủ điều kiện</span> : <span className="text-red-600">Chưa</span>}</p>
                  <p className="mb-2">Premium: {eligibility.premium ? <span className="text-green-600">Đủ điều kiện</span> : <span className="text-red-600">Chưa</span>}</p>
                  {!eligibility.verified && eligibility.reasons.length > 0 && (
                    <div className="text-xs text-red-600">
                      {eligibility.reasons.map((r, idx) => <div key={idx}>• {r}</div>)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <aside className="space-y-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Quyền lợi hiện tại</h4>
                <ul className="text-sm mt-2 space-y-1">
                  {cfg.benefits.map((b, i) => <li key={i} className="flex items-center gap-2"><CheckSquare className="w-4 h-4 text-green-600" />{b}</li>)}
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Hành động nhanh</h4>
                <div className="space-y-2">
                  <button onClick={() => handleTierChange(partner.id, 'verified', 'Admin manual upgrade')} className="w-full px-3 py-2 bg-green-600 text-white rounded">Nâng lên Verified</button>
                  <button onClick={() => openUpgradeModal(partner)} className="w-full px-3 py-2 bg-purple-600 text-white rounded">Nâng lên Premium</button>
                  <button onClick={() => openBenefitsModal(partner)} className="w-full px-3 py-2 border rounded">Xem quyền lợi</button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Thanh toán gần đây</h4>
                <div className="text-sm mt-2 space-y-2">
                  {partner.tierPayments.length === 0 ? <div className="text-gray-500">Chưa có</div> :
                    partner.tierPayments.map((p,i)=>(
                      <div key={i} className="flex justify-between">
                        <div className="text-sm">{p.period}</div>
                        <div className="text-sm font-medium">{formatCurrency(p.amount)}</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  };

  const BenefitsModal = ({ partner, onClose }) => {
    if (!partner) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative w-full max-w-2xl bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Quyền lợi — {partner.name}</h3>
            <button onClick={onClose} className="p-2 rounded border"><XCircle className="w-5 h-5" /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Sử dụng quyền lợi</h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between"><div>Priority support</div><div>{partner.benefitsUsed.prioritySupport} lần</div></div>
                <div className="flex justify-between"><div>Featured events</div><div>{partner.benefitsUsed.featuredEvents} lần</div></div>
                <div className="flex justify-between"><div>Custom branding</div><div>{partner.benefitsUsed.customBranding ? 'Có' : 'Không'}</div></div>
                <div className="flex justify-between"><div>API access</div><div>{partner.benefitsUsed.apiAccess ? 'Có' : 'Không'}</div></div>
                <div className="flex justify-between"><div>Dedicated manager</div><div>{partner.benefitsUsed.dedicatedManager ? 'Có' : 'Không'}</div></div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Gợi ý tối ưu hóa</h4>
              <div className="text-sm text-gray-700">
                <p>• Đề xuất tăng featured events nếu muốn tiếp cận cộng đồng mạnh hơn.</p>
                <p>• Dùng API access để tích hợp dữ liệu sự kiện với hệ thống nội bộ.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-right">
            <button onClick={onClose} className="px-3 py-2 border rounded">Đóng</button>
          </div>
        </div>
      </div>
    );
  };

  const UpgradeModal = ({ partner, onClose, onConfirm }) => {
    const [selectedTier, setSelectedTier] = useState('premium');
    const [note, setNote] = useState('');
    if (!partner) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative w-full max-w-lg bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Nâng cấp Tier — {partner.name}</h3>
            <button onClick={onClose} className="p-2 rounded border"><XCircle className="w-5 h-5" /></button>
          </div>

          <div className="space-y-3">
            <label className="text-sm text-gray-600">Chọn Tier</label>
            <select value={selectedTier} onChange={(e)=>setSelectedTier(e.target.value)} className="w-full p-2 border rounded">
              <option value="verified">Verified (Miễn phí)</option>
              <option value="premium">Premium ({formatCurrency(tierDefinitions.premium.price)}/tháng)</option>
            </select>

            <label className="text-sm text-gray-600">Ghi chú</label>
            <textarea value={note} onChange={(e)=>setNote(e.target.value)} rows={4} className="w-full p-2 border rounded" placeholder="Lý do nâng cấp, điều khoản, ghi chú..." />

            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="px-3 py-2 border rounded">Hủy</button>
              <button onClick={()=>{ onConfirm(partner.id, selectedTier, note); }} className="px-3 py-2 bg-purple-600 text-white rounded">Xác nhận nâng cấp</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ------------------------
  // Main render
  // ------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Quản lý Tier Đối tác</h1>
            <p className="text-sm text-gray-600 mt-1">Theo dõi, nâng cấp và phân tích hiệu suất đối tác theo tier</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border rounded overflow-hidden">
              <input className="px-3 py-2 w-64" placeholder="Tìm theo tên hoặc email..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
              <div className="px-3"><Search className="w-4 h-4 text-gray-500" /></div>
            </div>

            <select value={selectedFilter} onChange={(e)=>setSelectedFilter(e.target.value)} className="px-3 py-2 border rounded">
              <option value="all">Tất cả tiers</option>
              <option value="unverified">Chưa xác minh</option>
              <option value="verified">Đã xác minh</option>
              <option value="premium">Premium</option>
            </select>

            <button className="px-3 py-2 bg-blue-600 text-white rounded flex items-center gap-2"><RefreshCw className="w-4 h-4" />Làm mới</button>
          </div>
        </div>

        {/* Stats & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="bg-white border rounded p-4">
            <div className="text-sm text-gray-500">Tổng đối tác</div>
            <div className="text-2xl font-bold">{stats.totalPartners}</div>
            <div className="text-xs text-gray-400 mt-1">Unverified {stats.unverified} • Verified {stats.verified} • Premium {stats.premium}</div>
          </div>

          <div className="bg-white border rounded p-4">
            <div className="text-sm text-gray-500">Doanh thu tháng</div>
            <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
            <div className="text-xs text-gray-400 mt-1">Tăng trưởng: {stats.upgradeRate}%</div>
          </div>

          <div className="bg-white border rounded p-4">
            <div className="text-sm text-gray-500">Thời gian trung bình tier (tháng)</div>
            <div className="text-2xl font-bold">{stats.avgTierDuration}</div>
            <div className="text-xs text-gray-400 mt-1">Churn: {stats.churnRate}%</div>
          </div>

          <div className="bg-white border rounded p-4">
            <div className="text-sm text-gray-500">Lợi ích & gói</div>
            <div className="flex gap-2 mt-2">
              <div className="px-3 py-1 bg-gray-100 rounded text-sm">Verified</div>
              <div className="px-3 py-1 bg-purple-100 rounded text-sm">Premium</div>
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white border rounded p-4 col-span-2">
            <h4 className="font-semibold mb-2">Doanh thu theo tháng</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Doanh thu" />
                <Bar dataKey="partners" fill="#10b981" name="Đối tác mới" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border rounded p-4">
            <h4 className="font-semibold mb-2">Phân bố Tier</h4>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={tierDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {tierDistribution.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Partner list */}
        <div className="bg-white border rounded">
          <div className="p-3 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={filteredPartners.length>0 && filteredPartners.every(p=>selectedPartners.includes(p.id))} onChange={selectAllVisible} />
              <div className="text-sm text-gray-600">Mã • Tên • Ngành</div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div>Tier</div>
              <div>Hành động</div>
            </div>
          </div>

          <div>
            {filteredPartners.map(partner => {
              const cfg = getTierConfig(partner.currentTier);
              return (
                <div key={partner.id} className="p-4 flex items-start justify-between border-b">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" checked={selectedPartners.includes(partner.id)} onChange={()=>toggleSelect(partner.id)} className="mt-1" />
                    <div>
                      <div className="flex items-center gap-3">
                        <img src={partner.logo} alt={partner.name} className="w-10 h-10 rounded object-cover border" />
                        <div>
                          <div className="font-semibold">{partner.name}</div>
                          <div className="text-xs text-gray-500">{partner.industry} • {partner.location}</div>
                          <div className="text-xs text-gray-400">Join: {formatDate(partner.joinDate)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 text-xs rounded ${cfg.bgColor} ${cfg.textColor}`}>{cfg.name}</div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>openTierModal(partner)} className="px-3 py-1 border rounded text-sm"><Eye className="w-4 h-4" />Chi tiết</button>
                      <button onClick={()=>openUpgradeModal(partner)} className="px-3 py-1 bg-purple-600 text-white rounded text-sm"><Crown className="w-4 h-4" />Nâng</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bulk actions */}
        {selectedPartners.length > 0 && (
          <div className="fixed bottom-6 left-6 right-6 md:right-auto md:left-auto md:bottom-6 md:left-6 md:w-auto z-50">
            <div className="bg-white border rounded-lg p-3 shadow flex items-center gap-3">
              <div className="text-sm text-gray-700">Đã chọn {selectedPartners.length}</div>
              <button onClick={()=>handleBulkTierChange('verified')} className="px-3 py-1 bg-green-600 text-white rounded">Nâng Verified</button>
              <button onClick={()=>handleBulkTierChange('premium')} className="px-3 py-1 bg-purple-600 text-white rounded">Nâng Premium</button>
              <button onClick={()=>setSelectedPartners([])} className="px-3 py-1 border rounded">Hủy</button>
            </div>
          </div>
        )}
      </div>

      {/* Modals mounting */}
      {showTierModal && selectedPartner && <TierDetailModal partner={selectedPartner} onClose={()=>{ setShowTierModal(false); setSelectedPartner(null); }} />}
      {showBenefitsModal && selectedPartner && <BenefitsModal partner={selectedPartner} onClose={()=>{ setShowBenefitsModal(false); setSelectedPartner(null); }} />}
      {showUpgradeModal && selectedPartner && (
        <UpgradeModal
          partner={selectedPartner}
          onClose={()=>{ setShowUpgradeModal(false); setSelectedPartner(null); }}
          onConfirm={(partnerId, newTier, note) => { handleTierChange(partnerId, newTier, note); }}
        />
      )}
    </div>
  );
}
