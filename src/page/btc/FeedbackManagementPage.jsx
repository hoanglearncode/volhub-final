import React, { useState, useMemo } from 'react';
import {
  MessageCircle,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Download,
  BarChart3,
  PieChart,
  Users,
  Calendar,
  Eye,
  Reply,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Flag,
  MoreHorizontal,
  Send,
  Settings,
  Plus,
  RefreshCw,
  Tag
} from 'lucide-react';

// Mobile-first Feedback Management UI
// - Removed non-UI logic (no network calls, no exports, no heavy calculators)
// - Keeps state only for UI interactions (active tab, search, filter, selected)
// - Designed for small screens: compact cards, sticky search, bottom nav

export default function FeedbackManagementMobile({
  initialFeedback = null,
  initialStats = null
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  // default data (if parent doesn't pass anything)
  const feedbackItems = initialFeedback || [
    {
      id: 1,
      customer: 'Nguyễn Văn An',
      email: 'an.nguyen@email.com',
      rating: 5,
      sentiment: 'positive',
      subject: 'Excellent service quality',
      message: 'Tôi rất hài lòng với dịch vụ của công ty. Đội ngũ hỗ trợ rất chuyên nghiệp và nhiệt tình.',
      date: '2024-09-12',
      status: 'responded',
      category: 'service',
      priority: 'medium',
      responseTime: '2h',
      tags: ['service', 'support']
    },
    {
      id: 2,
      customer: 'Trần Thị Bình',
      email: 'binh.tran@email.com',
      rating: 2,
      sentiment: 'negative',
      subject: 'Delivery issues',
      message: 'Đơn hàng của tôi bị chậm trễ 3 ngày so với dự kiến. Không có thông báo trước.',
      date: '2024-09-11',
      status: 'pending',
      category: 'shipping',
      priority: 'high',
      responseTime: '12h',
      tags: ['shipping', 'delay']
    },
    {
      id: 3,
      customer: 'Lê Minh Cường',
      email: 'cuong.le@email.com',
      rating: 4,
      sentiment: 'positive',
      subject: 'Good product quality',
      message: 'Sản phẩm chất lượng tốt, đóng gói cẩn thận. Giá cả hợp lý.',
      date: '2024-09-10',
      status: 'new',
      category: 'product',
      priority: 'low',
      responseTime: '1h',
      tags: ['product', 'quality']
    },
    {
      id: 4,
      customer: 'Phạm Thị Diệu',
      email: 'dieu.pham@email.com',
      rating: 3,
      sentiment: 'neutral',
      subject: 'Website navigation could be better',
      message: 'Giao diện website hơi khó sử dụng, cần cải thiện trải nghiệm người dùng.',
      date: '2024-09-09',
      status: 'in_progress',
      category: 'website',
      priority: 'medium',
      responseTime: '6h',
      tags: ['website', 'ux']
    }
  ];

  const stats = initialStats || {
    totalFeedback: 2847,
    averageRating: 4.2,
    responseRate: '94%',
    pendingReviews: 23
  };

  // Lightweight filtering (UI-only)
  const filtered = useMemo(() => {
    const term = String(search || '').trim().toLowerCase();
    return feedbackItems.filter((it) => {
      const matchesStatus = filterStatus === 'all' || it.status === filterStatus;
      const matchesSearch =
        !term ||
        it.customer.toLowerCase().includes(term) ||
        it.subject.toLowerCase().includes(term) ||
        it.message.toLowerCase().includes(term) ||
        (it.tags || []).some((t) => t.toLowerCase().includes(term));
      return matchesStatus && matchesSearch;
    });
  }, [feedbackItems, filterStatus, search]);

  const statusBadge = (s) => {
    switch (s) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const priorityColor = (p) => {
    switch (p) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  // Small presentational components
  const SmallStat = ({ label, value, icon: Icon, color = 'bg-blue-500' }) => (
    <div className="flex-1 bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );

  const FeedbackListItem = ({ item }) => (
    <button
      onClick={() => setSelected(item)}
      className="w-full text-left bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
        {item.customer.split(' ').map((n) => n[0]).join('').slice(0, 2)}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="font-medium text-gray-900">{item.customer}</div>
            <div className="text-xs text-gray-500 truncate max-w-[220px]">{item.subject}</div>
          </div>
          <div className="text-xs text-gray-400">{item.date}</div>
        </div>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(item.status)}`}>{item.status.replace('_', ' ')}</span>
          <span className={`px-2 py-1 rounded-full text-xs bg-gray-100 ${priorityColor(item.priority)}`}>{item.priority}</span>
          {(item.tags || []).slice(0, 2).map((t) => (
            <span key={t} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">#{t}</span>
          ))}
        </div>
      </div>
    </button>
  );

  const DetailSheet = ({ item }) => (
    <div className="fixed inset-0 z-40 flex items-end">
      <div className="absolute inset-0 bg-black opacity-30" onClick={() => setSelected(null)} />
      <div className="relative w-full bg-white rounded-t-2xl p-4 max-h-[86vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-semibold text-lg">{item.customer}</div>
            <div className="text-xs text-gray-500">{item.email} • {item.date}</div>
          </div>
          <button onClick={() => setSelected(null)} className="rounded-lg p-2 bg-gray-100">
            <XCircle size={18} />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium text-gray-800 mb-1">{item.subject}</div>
          <p className="text-gray-700 text-sm">{item.message}</p>
        </div>

        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <span className={`px-2 py-1 rounded-full text-xs ${statusBadge(item.status)}`}>{item.status}</span>
          <span className={`px-2 py-1 rounded-full text-xs bg-gray-100 ${priorityColor(item.priority)}`}>{item.priority}</span>
          {(item.tags || []).map(t => <span key={t} className="px-2 py-1 bg-gray-100 text-xs rounded">#{t}</span>)}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="px-4 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 justify-center">
            <Reply size={16} />
            Respond
          </button>
          <button className="px-4 py-3 border rounded-lg flex items-center gap-2 justify-center">
            <Eye size={16} />
            View Thread
          </button>
        </div>

        <div className="text-sm text-gray-500">Meta</div>
        <div className="mt-2 flex gap-4 text-xs text-gray-600 flex-wrap">
          <div className="flex items-center gap-2"><Calendar size={14} />{item.date}</div>
          <div className="flex items-center gap-2"><Clock size={14} />{item.responseTime}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 mb-18">
      {/* top header (compact for mobile) */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Feedback</h1>
            <p className="text-xs text-gray-500">Monitor customer sentiment & responses</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-gray-100"><Download size={18} /></button>
            <button className="p-2 rounded-lg bg-gray-100"><RefreshCw size={18} /></button>
            <button className="p-2 rounded-lg bg-blue-600 text-white"><Settings size={18} /></button>
          </div>
        </div>

        {/* sticky search */}
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm feedback, khách hàng, tag..."
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button onClick={() => setShowFilterSheet(true)} className="p-2 bg-white border rounded-lg">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-4 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SmallStat label="Total" value={stats.totalFeedback.toLocaleString()} icon={MessageCircle} color="bg-blue-500" />
          <SmallStat label="Avg Rating" value={stats.averageRating} icon={Star} color="bg-yellow-500" />
          <SmallStat label="Response Rate" value={stats.responseRate} icon={CheckCircle} color="bg-green-500" />
          <SmallStat label="Pending" value={stats.pendingReviews} icon={Clock} color="bg-orange-500" />
        </div>

        {/* tabs */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'feedback', label: 'Feedback', icon: MessageCircle },
            { id: 'pending', label: 'Pending', icon: Clock },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'reports', label: 'Reports', icon: PieChart }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${activeTab === t.id ? 'bg-blue-600 text-white' : 'bg-white'} shadow-sm`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* content switch */}
        {activeTab === 'overview' && (
          <section className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-3">Recent Feedback</h2>
              <div className="space-y-3">
                {feedbackItems.slice(0, 3).map((f) => (
                  <div key={f.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold">{f.customer.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-900">{f.customer}</div>
                        <div className="text-xs text-gray-400">{f.date}</div>
                      </div>
                      <div className="text-xs text-gray-500 truncate">{f.subject}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-3">Sentiment</h2>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <ThumbsUp className="mx-auto text-green-500" />
                  <div className="font-semibold mt-2">65%</div>
                  <div className="text-xs text-gray-500">Positive</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <MessageCircle className="mx-auto text-gray-500" />
                  <div className="font-semibold mt-2">25%</div>
                  <div className="text-xs text-gray-500">Neutral</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <ThumbsDown className="mx-auto text-red-500" />
                  <div className="font-semibold mt-2">10%</div>
                  <div className="text-xs text-gray-500">Negative</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {(activeTab === 'feedback' || activeTab === 'pending') && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-2">Kết quả: <span className="font-semibold text-gray-900">{filtered.length}</span></div>
                <div className="space-y-3">
                  {filtered.length > 0 ? filtered.map((f) => <FeedbackListItem key={f.id} item={f} />) : (
                    <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                      <MessageCircle size={48} className="mx-auto mb-3 text-gray-300" />
                      Không tìm thấy feedback
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'analytics' && (
          <section className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-3">Rating Distribution</h2>
              <div className="space-y-2">
                {[5,4,3,2,1].map(r => (
                  <div key={r} className="flex items-center gap-3">
                    <div className="w-12 text-sm text-gray-600 flex items-center gap-1">{r} <Star className="text-yellow-400" size={12} /></div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-yellow-500 h-2" style={{ width: `${r===5?45: r===4?30: r===3?15: r===2?7:3}%` }} />
                    </div>
                    <div className="w-8 text-xs text-gray-600 text-right">{r===5?45: r===4?30: r===3?15: r===2?7:3}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-3">Trends</h2>
              <div className="h-36 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                <TrendingUp size={36} />
              </div>
            </div>
          </section>
        )}

        {activeTab === 'reports' && (
          <section className="space-y-4">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <PieChart size={48} className="mx-auto text-gray-400 mb-3" />
              <div className="font-semibold text-lg text-gray-900">Generate Reports</div>
              <div className="text-sm text-gray-500 mb-4">Create scheduled or on-demand reports</div>
              <div className="flex gap-3 justify-center">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Generate</button>
                <button className="px-4 py-2 border rounded-lg">Schedule</button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* simple filter sheet */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-40 flex items-end">
          <div className="absolute inset-0 bg-black opacity-30" onClick={() => setShowFilterSheet(false)} />
          <div className="relative w-full bg-white rounded-t-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">Filter</div>
              <button onClick={() => setShowFilterSheet(false)} className="p-2 rounded-lg bg-gray-100"><XCircle size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Status</label>
                <div className="flex gap-2 overflow-x-auto">
                  {['all','new','pending','in_progress','responded'].map(s => (
                    <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-lg ${filterStatus===s ? 'bg-blue-600 text-white':'bg-gray-100'}`}>
                      {s === 'all' ? 'All' : s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2">Priority</label>
                <div className="flex gap-2">
                  {['all','high','medium','low'].map(p => (
                    <button key={p} onClick={() => {/* purely UI - set filterStatus not changed*/}} className={`px-3 py-2 rounded-lg ${'bg-gray-100'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => { setFilterStatus('all'); setShowFilterSheet(false); }} className="flex-1 px-4 py-2 border rounded-lg">Reset</button>
                <button onClick={() => setShowFilterSheet(false)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* detail modal */}
      {selected && <DetailSheet item={selected} />}
    </div>
  );
}
