import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  Filter,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  Tag,
  Eye,
  MessageCircle,
  Send,
  Paperclip,
  Star,
  TrendingUp,
  BarChart3,
  Users,
  Timer,
  Archive,
  RefreshCw,
  Download,
  ChevronDown,
  ChevronRight,
  Flag,
  Shield,
  Heart
} from 'lucide-react';

const SupportComplaints = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [tickets, setTickets] = useState([
    {
      id: 'TK001',
      title: 'Không thể đăng ký sự kiện "Vệ sinh môi trường"',
      category: 'technical',
      priority: 'high',
      status: 'open',
      user: { name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', role: 'volunteer', avatar: null },
      createdAt: '2025-09-06 10:30',
      updatedAt: '2025-09-06 14:20',
      assignedTo: 'admin_tech',
      description: 'Tôi gặp lỗi khi cố gắng đăng ký tham gia sự kiện vệ sinh môi trường. Trang web báo lỗi 500 và không cho phép tôi tiếp tục.',
      messages: [
        { id: 1, sender: 'user', content: 'Tôi gặp lỗi khi cố gắng đăng ký...', timestamp: '2025-09-06 10:30', attachments: ['screenshot_error.png'] },
        { id: 2, sender: 'admin', content: 'Xin chào bạn! Chúng tôi đã nhận được báo cáo...', timestamp: '2025-09-06 14:20', attachments: [] }
      ],
      tags: ['bug', 'registration', 'urgent'],
      satisfaction: null
    },
    {
      id: 'TK002',
      title: 'Đối tác vi phạm quy định an toàn',
      category: 'violation',
      priority: 'critical',
      status: 'in_progress',
      user: { name: 'Trần Thị B', email: 'tranthib@gmail.com', role: 'volunteer', avatar: null },
      createdAt: '2025-09-05 15:45',
      updatedAt: '2025-09-06 09:15',
      assignedTo: 'admin_safety',
      description: 'Trong sự kiện vừa qua, đối tác không cung cấp đầy đủ thiết bị bảo hộ...',
      messages: [
        { id: 1, sender: 'user', content: 'Trong sự kiện vừa qua, đối tác không cung cấp...', timestamp: '2025-09-05 15:45', attachments: ['safety_violation_1.jpg', 'safety_violation_2.jpg'] }
      ],
      tags: ['safety', 'partner', 'violation'],
      satisfaction: null
    },
    {
      id: 'TK003',
      title: 'Yêu cầu chỉnh sửa chứng nhận',
      category: 'certificate',
      priority: 'medium',
      status: 'resolved',
      user: { name: 'Lê Văn C', email: 'levanc@gmail.com', role: 'volunteer', avatar: null },
      createdAt: '2025-09-04 08:20',
      updatedAt: '2025-09-05 16:30',
      assignedTo: 'admin_cert',
      description: 'Tên trên chứng nhận của tôi bị sai chính tả, xin hỗ trợ chỉnh sửa.',
      messages: [
        { id: 1, sender: 'user', content: 'Tên trên chứng nhận của tôi bị sai...', timestamp: '2025-09-04 08:20', attachments: ['certificate_error.pdf'] },
        { id: 2, sender: 'admin', content: 'Chúng tôi đã chỉnh sửa...', timestamp: '2025-09-05 16:30', attachments: ['certificate_corrected.pdf'] }
      ],
      tags: ['certificate', 'correction'],
      satisfaction: 5
    },
    {
      id: 'TK004',
      title: 'BTC không trả phí hỗ trợ như đã thỏa thuận',
      category: 'financial',
      priority: 'high',
      status: 'open',
      user: { name: 'Hoàng Minh D', email: 'hoangminhd@gmail.com', role: 'volunteer', avatar: null },
      createdAt: '2025-09-06 16:15',
      updatedAt: '2025-09-06 16:15',
      assignedTo: null,
      description: 'Sau khi hoàn thành sự kiện, BTC không chi trả khoản hỗ trợ 200k như đã cam kết.',
      messages: [
        { id: 1, sender: 'user', content: 'Sau khi hoàn thành sự kiện "Hỗ trợ người cao tuổi"...', timestamp: '2025-09-06 16:15', attachments: ['contract.pdf', 'email_confirmation.png'] }
      ],
      tags: ['payment', 'partner', 'contract'],
      satisfaction: null
    },
    {
      id: 'TK005',
      title: 'Yêu cầu xóa bài viết vi phạm',
      category: 'content',
      priority: 'medium',
      status: 'resolved',
      user: { name: 'Mai Thị E', email: 'maithie@gmail.com', role: 'volunteer', avatar: null },
      createdAt: '2025-09-03 12:00',
      updatedAt: '2025-09-04 10:30',
      assignedTo: 'admin_content',
      description: 'Có người đăng bài viết không phù hợp về tôi trong cộng đồng, yêu cầu xử lý.',
      messages: [
        { id: 1, sender: 'user', content: 'Có user tên "abc123" đăng bài viết...', timestamp: '2025-09-03 12:00', attachments: ['screenshot_violation.png'] },
        { id: 2, sender: 'admin', content: 'Chúng tôi đã xem xét và gỡ bỏ...', timestamp: '2025-09-04 10:30', attachments: [] }
      ],
      tags: ['content', 'harassment', 'community'],
      satisfaction: 4
    }
  ]);

  const stats = {
    total: 156,
    open: 23,
    inProgress: 12,
    resolved: 121,
    avgResponseTime: '2.5h',
    satisfaction: 4.6
  };

  const categories = [
    { id: 'technical', label: 'Kỹ thuật', color: 'blue', icon: '🔧' },
    { id: 'violation', label: 'Vi phạm', color: 'red', icon: '⚠️' },
    { id: 'certificate', label: 'Chứng nhận', color: 'green', icon: '📜' },
    { id: 'account', label: 'Tài khoản', color: 'purple', icon: '👤' },
    { id: 'event', label: 'Sự kiện', color: 'orange', icon: '📅' },
    { id: 'financial', label: 'Tài chính', color: 'yellow', icon: '💰' },
    { id: 'content', label: 'Nội dung', color: 'pink', icon: '📝' },
    { id: 'other', label: 'Khác', color: 'gray', icon: '❓' }
  ];

  const priorityConfig = {
    low: { label: 'Thấp', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    medium: { label: 'Trung bình', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
    high: { label: 'Cao', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
    critical: { label: 'Khẩn cấp', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' }
  };

  const statusConfig = {
    open: { label: 'Mở', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800', icon: Clock },
    in_progress: { label: 'Đang xử lý', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', icon: RefreshCw },
    resolved: { label: 'Đã giải quyết', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800', icon: CheckCircle },
    closed: { label: 'Đã đóng', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800', icon: Archive }
  };

  // Derived/filtering
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch = !q || ticket.title.toLowerCase().includes(q) ||
                           ticket.user.name.toLowerCase().includes(q) ||
                           ticket.id.toLowerCase().includes(q);
      const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
      const matchesTab = activeTab === 'all' ||
                        (activeTab === 'open' && ticket.status === 'open') ||
                        (activeTab === 'in_progress' && ticket.status === 'in_progress') ||
                        (activeTab === 'resolved' && ticket.status === 'resolved');

      return matchesSearch && matchesStatus && matchesPriority && matchesTab;
    });
  }, [tickets, searchTerm, filterStatus, filterPriority, activeTab]);

  useEffect(() => {
    // If no selected ticket, auto-select first filtered for convenience
    if (!selectedTicket && filteredTickets.length > 0) {
      setSelectedTicket(filteredTickets[0]);
    }
    // If selected ticket was removed, clear selection
    if (selectedTicket && !tickets.find(t => t.id === selectedTicket.id)) {
      setSelectedTicket(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTickets, tickets]);

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    const newId = selectedTicket.messages.length ? selectedTicket.messages[selectedTicket.messages.length - 1].id + 1 : 1;
    const newMessage = {
      id: newId,
      sender: 'admin',
      content: replyText.trim(),
      timestamp: new Date().toLocaleString('vi-VN'),
      attachments: []
    };

    const updatedTickets = tickets.map(ticket =>
      ticket.id === selectedTicket.id ? { ...ticket, messages: [...ticket.messages, newMessage], updatedAt: new Date().toLocaleString('vi-VN') } : ticket
    );
    setTickets(updatedTickets);
    setSelectedTicket(prev => ({ ...prev, messages: [...prev.messages, newMessage], updatedAt: new Date().toLocaleString('vi-VN') }));
    setReplyText('');
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, status: newStatus, updatedAt: new Date().toLocaleString('vi-VN') } : ticket
    );
    setTickets(updatedTickets);
    if (selectedTicket?.id === ticketId) setSelectedTicket({ ...selectedTicket, status: newStatus, updatedAt: new Date().toLocaleString('vi-VN') });
  };

  const assignTicket = (ticketId, adminUser) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, assignedTo: adminUser, status: 'in_progress', updatedAt: new Date().toLocaleString('vi-VN') } : ticket
    );
    setTickets(updatedTickets);
    if (selectedTicket?.id === ticketId) setSelectedTicket({ ...selectedTicket, assignedTo: adminUser, status: 'in_progress', updatedAt: new Date().toLocaleString('vi-VN') });
  };

  const renderTicketCard = (ticket) => {
    const StatusIcon = statusConfig[ticket.status]?.icon || Clock;
    const category = categories.find(c => c.id === ticket.category) || { icon: '❓', label: 'Khác' };
    const priority = priorityConfig[ticket.priority] || priorityConfig.low;

    return (
      <div
        key={ticket.id}
        onClick={() => setSelectedTicket(ticket)}
        className={`p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer ${selectedTicket?.id === ticket.id ? 'border-blue-500 bg-blue-50' : 'bg-white hover:border-gray-300'}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-gray-500">#{ticket.id}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.bgColor} ${priority.textColor}`}>
              {priority.label}
            </span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig[ticket.status]?.bgColor} ${statusConfig[ticket.status]?.textColor}`}>
            <StatusIcon size={12} />
            {statusConfig[ticket.status]?.label}
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{ticket.title}</h3>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <User size={14} />
            {ticket.user.name}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {ticket.createdAt}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{category.icon}</span>
            <span className="text-sm text-gray-600">{category.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <MessageCircle size={14} className="text-gray-400" />
              <span className="text-sm text-gray-500">{ticket.messages.length}</span>
            </div>
            {ticket.satisfaction && (
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                <span className="text-sm text-gray-500">{ticket.satisfaction}</span>
              </div>
            )}
          </div>
        </div>

        {ticket.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {ticket.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{tag}</span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderTicketDetail = () => {
    if (!selectedTicket) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Chọn một ticket để xem chi tiết</p>
          </div>
        </div>
      );
    }

    const category = categories.find(c => c.id === selectedTicket.category) || { icon: '❓', label: 'Khác' };
    const priority = priorityConfig[selectedTicket.priority] || priorityConfig.low;
    const status = statusConfig[selectedTicket.status] || statusConfig.open;

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-sm text-gray-500">#{selectedTicket.id}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.bgColor} ${priority.textColor}`}>{priority.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>{status.label}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedTicket.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{selectedTicket.description}</p>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedTicket.status}
                onChange={(e) => updateTicketStatus(selectedTicket.id, e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="open">Mở</option>
                <option value="in_progress">Đang xử lý</option>
                <option value="resolved">Đã giải quyết</option>
                <option value="closed">Đã đóng</option>
              </select>
              {!selectedTicket.assignedTo && (
                <button onClick={() => assignTicket(selectedTicket.id, 'current_admin')} className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  Nhận xử lý
                </button>
              )}
              <button onClick={() => { /* placeholder for more actions */ }} className="px-3 py-1 border rounded-lg text-sm">Thêm</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Người gửi</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  {selectedTicket.user.name.charAt(0)}
                </div>
                <div>
                  <span className="font-medium">{selectedTicket.user.name}</span>
                  <p className="text-gray-500 text-xs">{selectedTicket.user.email}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Danh mục</p>
              <div className="flex items-center gap-1">
                <span>{category.icon}</span>
                <span className="font-medium">{category.label}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Được tạo</p>
              <p className="font-medium">{selectedTicket.createdAt}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Cập nhật</p>
              <p className="font-medium">{selectedTicket.updatedAt}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {selectedTicket.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-1">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>

            {selectedTicket.assignedTo && (
              <div className="text-sm text-gray-600">
                Được xử lý bởi: <span className="font-medium">{selectedTicket.assignedTo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {selectedTicket.messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl ${message.sender === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{message.sender === 'admin' ? 'Admin' : selectedTicket.user.name}</span>
                  <span className={`text-xs ${message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'}`}>{message.timestamp}</span>
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>

                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {message.attachments.map((attachment, idx) => (
                      <div key={idx} className={`flex items-center gap-2 text-xs ${message.sender === 'admin' ? 'text-blue-100' : 'text-gray-600'}`}>
                        <Paperclip size={12} />
                        <span className="underline cursor-pointer">{attachment}</span>
                        <Download size={12} className="cursor-pointer" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Reply */}
        <div className="border-t border-gray-200 p-4 bg-white">
          {selectedTicket.status !== 'resolved' && selectedTicket.status !== 'closed' && (
            <div className="mb-3 flex gap-2">
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">Macro: Yêu cầu thêm thông tin</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">Macro: Đang xử lý</button>
              <button onClick={() => updateTicketStatus(selectedTicket.id, 'resolved')} className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm">Macro: Đã giải quyết</button>
            </div>
          )}

          <div className="flex gap-4">
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Nhập phản hồi của bạn..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500" rows={3} />
            <div className="flex flex-col gap-2">
              <button onClick={handleSendReply} disabled={!replyText.trim()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                <Send size={16} /> Gửi
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2"><Paperclip size={16} /> Đính kèm</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <HelpCircle size={28} className="text-blue-600" /> Hỗ trợ & Khiếu nại
              </h1>
              <p className="text-gray-600 mt-1">Quản lý yêu cầu hỗ trợ và xử lý khiếu nại từ người dùng</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"><Download size={18} /> Xuất báo cáo</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"><Plus size={18} /> Tạo ticket mới</button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2"><BarChart3 size={16} className="text-gray-500" /><span className="text-sm text-gray-600">Tổng số</span></div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500 mt-1">+12% so với tháng trước</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2"><Clock size={16} className="text-blue-500" /><span className="text-sm text-gray-600">Chờ xử lý</span></div>
            <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
            <p className="text-xs text-blue-500 mt-1">Cần ưu tiên</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2"><RefreshCw size={16} className="text-yellow-500" /><span className="text-sm text-gray-600">Đang xử lý</span></div>
            <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
            <p className="text-xs text-yellow-500 mt-1">Đang được xử lý</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2"><CheckCircle size={16} className="text-green-500" /><span className="text-sm text-gray-600">Đã giải quyết</span></div>
            <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
            <p className="text-xs text-green-500 mt-1">Tỉ lệ hoàn thành</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2"><Timer size={16} className="text-gray-500" /><span className="text-sm text-gray-600">Trung bình phản hồi</span></div>
            <p className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}</p>
            <p className="text-xs text-gray-500 mt-1">Hiệu suất nhóm</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2"><Star size={16} className="text-yellow-500" /><span className="text-sm text-gray-600">Chấm điểm hài lòng</span></div>
            <p className="text-2xl font-bold text-gray-900">{stats.satisfaction}/5</p>
            <p className="text-xs text-gray-500 mt-1">Trung bình người dùng</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 w-full md:w-1/2">
            <Search size={16} className="text-gray-400 mr-2" />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm theo ID, tên hoặc tiêu đề..." className="flex-1 outline-none text-sm" />
            <button onClick={() => { setSearchTerm(''); setFilterStatus('all'); setFilterPriority('all'); }} className="ml-2 px-3 py-1 text-sm border rounded bg-gray-50">Clear</button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setShowFilters(prev => !prev)} className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white"><Filter size={16} /> Bộ lọc</button>
            <div className="flex items-center gap-2">
              <button onClick={() => { setActiveTab('all'); }} className={`px-3 py-2 rounded-lg ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Tất cả</button>
              <button onClick={() => setActiveTab('open')} className={`px-3 py-2 rounded-lg ${activeTab === 'open' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Mở</button>
              <button onClick={() => setActiveTab('in_progress')} className={`px-3 py-2 rounded-lg ${activeTab === 'in_progress' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Đang xử lý</button>
              <button onClick={() => setActiveTab('resolved')} className={`px-3 py-2 rounded-lg ${activeTab === 'resolved' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Đã giải quyết</button>
            </div>
          </div>
        </div>

        {/* Optional filters panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm text-gray-600">Trạng thái</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="ml-2 px-3 py-1 border rounded">
                  <option value="all">Tất cả</option>
                  <option value="open">Mở</option>
                  <option value="in_progress">Đang xử lý</option>
                  <option value="resolved">Đã giải quyết</option>
                  <option value="closed">Đã đóng</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Ưu tiên</label>
                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="ml-2 px-3 py-1 border rounded">
                  <option value="all">Tất cả</option>
                  <option value="low">Thấp</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao</option>
                  <option value="critical">Khẩn cấp</option>
                </select>
              </div>

              <div className="ml-auto">
                <button onClick={() => { setFilterStatus('all'); setFilterPriority('all'); setShowFilters(false); }} className="px-3 py-2 border rounded">Reset</button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets list */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg border border-gray-200 h-[70vh] overflow-y-auto space-y-3">
              {filteredTickets.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <MessageSquare size={36} className="mx-auto mb-3 text-gray-300" />
                  Không tìm thấy ticket
                </div>
              ) : (
                filteredTickets.map(t => renderTicketCard(t))
              )}
            </div>
          </div>

          {/* Detail pane */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 h-[70vh] overflow-hidden flex flex-col">
              {renderTicketDetail()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportComplaints;
