import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Download,
  CheckCircle,
  Clock,
  RefreshCw,
  User,
  Calendar,
  MessageCircle,
  Tag,
  Send,
  Archive,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';

// TicketManagement — chuyên biệt cho quản lý (admin)
// Yêu cầu: Tailwind CSS, lucide-react

export default function TicketManagement() {
  // --- sample data (mô phỏng, copy/extend theo backend) ---
  const [tickets, setTickets] = useState([
    {
      id: 'TK001',
      title: 'Không thể đăng ký sự kiện "Vệ sinh môi trường"',
      category: 'technical',
      priority: 'high',
      status: 'open',
      user: { name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com' },
      createdAt: '2025-09-06 10:30',
      updatedAt: '2025-09-06 14:20',
      assignedTo: null,
      tags: ['bug', 'registration', 'urgent'],
      messages: [{ id: 1, sender: 'user', content: 'Lỗi 500...', timestamp: '2025-09-06 10:30' }],
      slaDue: '2025-09-07 10:30'
    },
    {
      id: 'TK002',
      title: 'Đối tác vi phạm quy định an toàn',
      category: 'violation',
      priority: 'critical',
      status: 'in_progress',
      user: { name: 'Trần Thị B', email: 'tranthib@gmail.com' },
      createdAt: '2025-09-05 15:45',
      updatedAt: '2025-09-06 09:15',
      assignedTo: 'admin_safety',
      tags: ['safety', 'partner'],
      messages: [{ id: 1, sender: 'user', content: 'Không có đồ bảo hộ', timestamp: '2025-09-05 15:45' }],
      slaDue: '2025-09-05 23:59'
    },
    {
      id: 'TK003',
      title: 'Yêu cầu chỉnh sửa chứng nhận',
      category: 'certificate',
      priority: 'medium',
      status: 'resolved',
      user: { name: 'Lê Văn C', email: 'levanc@gmail.com' },
      createdAt: '2025-09-04 08:20',
      updatedAt: '2025-09-05 16:30',
      assignedTo: 'admin_cert',
      tags: ['certificate'],
      messages: [{ id: 1, sender: 'admin', content: 'Đã chỉnh sửa', timestamp: '2025-09-05 16:30' }],
      slaDue: '2025-09-10 08:20'
    }
  ]);

  // --- UI state ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selected, setSelected] = useState([]); // list of ticket ids selected
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [bulkAssignTo, setBulkAssignTo] = useState('');
  const [replyText, setReplyText] = useState('');

  // --- derived data ---
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return tickets.filter(t => {
      const matchesSearch = !q || t.id.toLowerCase().includes(q) || t.title.toLowerCase().includes(q) || t.user.name.toLowerCase().includes(q);
      const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchTerm, filterStatus, filterPriority]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  // --- helpers ---
  const toggleSelect = (ticketId) => {
    setSelected(prev => prev.includes(ticketId) ? prev.filter(id => id !== ticketId) : [...prev, ticketId]);
  };

  const selectAllOnPage = () => {
    const ids = paginated.map(t => t.id);
    const allSelected = ids.every(id => selected.includes(id));
    if (allSelected) setSelected(prev => prev.filter(id => !ids.includes(id)));
    else setSelected(prev => Array.from(new Set([...prev, ...ids])));
  };

  const bulkChangeStatus = (newStatus) => {
    if (selected.length === 0) return;
    setTickets(prev => prev.map(t => selected.includes(t.id) ? { ...t, status: newStatus, updatedAt: new Date().toLocaleString('vi-VN') } : t));
    setSelected([]);
  };

  const bulkAssign = (adminId) => {
    if (selected.length === 0) return;
    setTickets(prev => prev.map(t => selected.includes(t.id) ? { ...t, assignedTo: adminId, status: 'in_progress', updatedAt: new Date().toLocaleString('vi-VN') } : t));
    setSelected([]);
  };

  const exportCSV = (items = filtered) => {
    if (!items || items.length === 0) return;
    const header = ['ID', 'Title', 'Status', 'Priority', 'AssignedTo', 'CreatedAt', 'UpdatedAt', 'Tags'];
    const rows = items.map(t => [t.id, `"${t.title.replace(/"/g, '""')}"`, t.status, t.priority, t.assignedTo || '', t.createdAt, t.updatedAt || '', (t.tags || []).join('|')]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tickets_export_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    const newMessage = { id: (selectedTicket.messages.length || 0) + 1, sender: 'admin', content: replyText.trim(), timestamp: new Date().toLocaleString('vi-VN') };
    setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, messages: [...t.messages, newMessage], updatedAt: new Date().toLocaleString('vi-VN') } : t));
    setSelectedTicket(prev => prev ? { ...prev, messages: [...prev.messages, newMessage], updatedAt: new Date().toLocaleString('vi-VN') } : prev);
    setReplyText('');
  };

  useEffect(() => {
    // auto-select first item on filtered change for convenience
    if (!selectedTicket && paginated.length > 0) setSelectedTicket(paginated[0]);
    if (selectedTicket && !tickets.find(t => t.id === selectedTicket.id)) setSelectedTicket(null);
    if (page > totalPages) setPage(totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginated, tickets]);

  // --- small stats for manager ---
  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'open').length;
    const inProgress = tickets.filter(t => t.status === 'in_progress').length;
    const resolved = tickets.filter(t => t.status === 'resolved').length;
    return { total, open, inProgress, resolved };
  }, [tickets]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">{/* icon */}<MoreHorizontal /> Ticket Management — Admin</h1>
          <p className="text-sm text-gray-600">Giao diện chuyên biệt cho quản lý: filter, bulk actions, export, SLA, audit (mô phỏng)</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV()} className="px-4 py-2 bg-white border rounded hover:shadow"> <Download size={16} /> Xuất CSV</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"><Plus size={16} /> Tạo ticket</button>
        </div>
      </div>

      {/* top controls */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-full md:w-1/3">
          <Search size={16} className="mr-2" />
          <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} placeholder="Tìm theo ID, tiêu đề, người gửi..." className="outline-none bg-transparent text-sm w-full" />
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="px-3 py-1 border rounded">
              <option value="all">Tất cả trạng thái</option>
              <option value="open">Mở</option>
              <option value="in_progress">Đang xử lý</option>
              <option value="resolved">Đã giải quyết</option>
              <option value="closed">Đã đóng</option>
            </select>
          </div>
          <div>
            <select value={filterPriority} onChange={(e) => { setFilterPriority(e.target.value); setPage(1); }} className="px-3 py-1 border rounded">
              <option value="all">Tất cả ưu tiên</option>
              <option value="low">Thấp</option>
              <option value="medium">Trung bình</option>
              <option value="high">Cao</option>
              <option value="critical">Khẩn cấp</option>
            </select>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="text-sm text-gray-600">Trang {page}/{totalPages}</div>
            <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} className="px-2 py-1 border rounded text-sm">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
        </div>
      </div>

      {/* stats + bulk actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-500">Tổng</div>
          <div className="text-xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-500">Mở</div>
          <div className="text-xl font-bold">{stats.open}</div>
        </div>
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-500">Đang xử lý</div>
          <div className="text-xl font-bold">{stats.inProgress}</div>
        </div>
        <div className="bg-white p-4 rounded border flex flex-col justify-between">
          <div>
            <div className="text-sm text-gray-500">Đã giải quyết</div>
            <div className="text-xl font-bold">{stats.resolved}</div>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={() => bulkChangeStatus('resolved')} disabled={selected.length===0} className="px-3 py-1 bg-green-100 text-green-700 rounded disabled:opacity-50">Đánh resolved</button>
            <button onClick={() => bulkChangeStatus('closed')} disabled={selected.length===0} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Đóng</button>
          </div>
        </div>
      </div>

      {/* main grid: list + detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* list column */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded p-4 h-[70vh] overflow-y-auto">
            {/* bulk actions header */}
            <div className="flex items-center gap-2 mb-3">
              <input type="checkbox" checked={paginated.length > 0 && paginated.every(t => selected.includes(t.id))} onChange={selectAllOnPage} />
              <div className="text-sm text-gray-600">Chọn trang</div>

              <div className="ml-auto flex items-center gap-2">
                <select value={bulkAssignTo} onChange={(e) => setBulkAssignTo(e.target.value)} className="px-2 py-1 border rounded text-sm">
                  <option value="">Gán cho...</option>
                  <option value="admin_tech">admin_tech</option>
                  <option value="admin_safety">admin_safety</option>
                  <option value="admin_cert">admin_cert</option>
                </select>
                <button onClick={() => bulkAssign(bulkAssignTo)} disabled={!bulkAssignTo || selected.length===0} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50">Gán</button>
              </div>
            </div>

            {paginated.length === 0 ? (
              <div className="text-center text-gray-500 py-12">Không có ticket</div>
            ) : (
              paginated.map(t => (
                <div key={t.id} className={`p-3 border rounded mb-2 hover:shadow ${selectedTicket?.id === t.id ? 'bg-blue-50 border-blue-300' : 'bg-white'}`} onClick={() => setSelectedTicket(t)}>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" checked={selected.includes(t.id)} onChange={(e) => { e.stopPropagation(); toggleSelect(t.id); }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{t.title}</div>
                        <div className="text-xs text-gray-500">#{t.id}</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center gap-3">
                        <div className="flex items-center gap-1"><User size={14} />{t.user.name}</div>
                        <div className="flex items-center gap-1"><Calendar size={14} />{t.createdAt}</div>
                        <div className="flex items-center gap-1"><MessageCircle size={14} />{t.messages.length}</div>
                      </div>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        {t.tags && t.tags.map(tag => <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded">{tag}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* pagination controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">Tổng {filtered.length} kết quả</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-2 py-1 border rounded">Prev</button>
                <div className="px-3 py-1 border rounded">{page}</div>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-2 py-1 border rounded">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* detail column */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded h-[70vh] overflow-hidden flex flex-col">
            {selectedTicket ? (
              <div className="flex-1 flex flex-col">
                {/* header */}
                <div className="p-4 border-b flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-500">#{selectedTicket.id} • <span className="font-medium">{selectedTicket.title}</span></div>
                    <div className="text-xs text-gray-500 mt-1">Created: {selectedTicket.createdAt} • Updated: {selectedTicket.updatedAt || '-'}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select value={selectedTicket.status} onChange={(e) => {
                      const newStatus = e.target.value;
                      setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: newStatus, updatedAt: new Date().toLocaleString('vi-VN') } : t));
                      setSelectedTicket(prev => prev ? { ...prev, status: newStatus, updatedAt: new Date().toLocaleString('vi-VN') } : prev);
                    }} className="px-3 py-1 border rounded">
                      <option value="open">open</option>
                      <option value="in_progress">in_progress</option>
                      <option value="resolved">resolved</option>
                      <option value="closed">closed</option>
                    </select>

                    <select value={selectedTicket.assignedTo || ''} onChange={(e) => {
                      const admin = e.target.value || null;
                      setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, assignedTo: admin, updatedAt: new Date().toLocaleString('vi-VN') } : t));
                      setSelectedTicket(prev => prev ? { ...prev, assignedTo: admin, updatedAt: new Date().toLocaleString('vi-VN') } : prev);
                    }} className="px-3 py-1 border rounded">
                      <option value="">--Assign--</option>
                      <option value="admin_tech">admin_tech</option>
                      <option value="admin_safety">admin_safety</option>
                      <option value="admin_cert">admin_cert</option>
                    </select>

                    <button onClick={() => exportCSV([selectedTicket])} className="px-3 py-1 bg-white border rounded">Export</button>
                  </div>
                </div>

                {/* meta */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 border-b">
                  <div>
                    <div className="text-sm text-gray-500">Người gửi</div>
                    <div className="font-medium">{selectedTicket.user.name}</div>
                    <div className="text-xs text-gray-500">{selectedTicket.user.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Thẻ</div>
                    <div className="flex gap-2 flex-wrap mt-1">
                      {selectedTicket.tags.map(tag => <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs">{tag}</span>)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">SLA đến hạn</div>
                    <div className="font-medium">{selectedTicket.slaDue || '-'}</div>
                  </div>
                </div>

                {/* messages */}
                <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-gray-50">
                  {selectedTicket.messages.map(m => (
                    <div key={m.id} className={`p-3 rounded ${m.sender === 'admin' ? 'bg-blue-600 text-white self-end' : 'bg-white text-gray-900'}`}>
                      <div className="text-xs text-gray-400 mb-1">{m.sender === 'admin' ? 'Admin' : selectedTicket.user.name} • {m.timestamp}</div>
                      <div>{m.content}</div>
                    </div>
                  ))}
                </div>

                {/* quick reply */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-3">
                    <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={3} className="flex-1 border rounded px-3 py-2" placeholder="Gửi phản hồi nhanh..." />
                    <div className="flex flex-col gap-2">
                      <button onClick={handleSendReply} className="px-4 py-2 bg-blue-600 text-white rounded"><Send size={16} /> Gửi</button>
                      <button onClick={() => { setReplyText(''); }} className="px-4 py-2 border rounded">Clear</button>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Chọn một ticket để xem chi tiết
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
