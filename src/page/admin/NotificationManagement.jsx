import React, { useState, useEffect, useMemo } from 'react';
import {
  Bell,
  Search,
  Plus,
  Send,
  Clock,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Archive,
  Download,
  RefreshCw,
  Tag,
  MoreHorizontal,
  Edit,
  Trash2,
  Cloud,
  Smartphone,
  Mail,
  MessageCircle,
  Zap,
  Eye
} from 'lucide-react';

// NotificationManagement — giao diện quản lý thông báo/chiến dịch
// Yêu cầu: TailwindCSS + lucide-react

export default function NotificationManagement() {
  // sample notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'N-001',
      title: 'Nhắc nhở check-in sự kiện',
      channel: 'push', // push | email | sms | in_app
      audience: 'volunteers',
      status: 'scheduled', // draft | scheduled | sent | failed
      priority: 'normal',
      content: 'Xin chào! Nhắc bạn check-in sự kiện vào 8:00 sáng mai.',
      templateId: 'T-01',
      scheduledAt: '2025-09-10 08:00',
      sentAt: null,
      createdAt: '2025-09-07 10:00',
      read: false,
      recipients: 120,
      clicks: 5,
      tags: ['event', 'reminder']
    },
    {
      id: 'N-002',
      title: '[Hồ sơ] Cập nhật chính sách mới',
      channel: 'email',
      audience: 'partners',
      status: 'sent',
      priority: 'high',
      content: 'Chúng tôi đã cập nhật chính sách. Vui lòng xem chi tiết...',
      templateId: 'T-02',
      scheduledAt: '2025-09-05 09:00',
      sentAt: '2025-09-05 09:02',
      createdAt: '2025-09-04 16:00',
      read: true,
      recipients: 42,
      clicks: 28,
      tags: ['policy', 'partner']
    }
  ]);

  const [templates, setTemplates] = useState([
    { id: 'T-01', name: 'Reminder - Event', channel: 'push', subject: '', body: 'Reminder content...' },
    { id: 'T-02', name: 'Announcement - Email', channel: 'email', subject: 'Cập nhật chính sách', body: 'Email content...' }
  ]);

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [selected, setSelected] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  // derived lists
  const tags = useMemo(() => Array.from(new Set(notifications.flatMap(n => n.tags || []))), [notifications]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return notifications.filter(n => {
      const matchesSearch = !q || n.id.toLowerCase().includes(q) || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
      const matchesChannel = filterChannel === 'all' || n.channel === filterChannel;
      const matchesStatus = filterStatus === 'all' || n.status === filterStatus;
      const matchesTag = filterTag === 'all' || (n.tags||[]).includes(filterTag);
      return matchesSearch && matchesChannel && matchesStatus && matchesTag;
    });
  }, [notifications, searchTerm, filterChannel, filterStatus, filterTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  useEffect(() => {
    if (!selectedNotification && paginated.length > 0) setSelectedNotification(paginated[0]);
    if (selectedNotification && !notifications.find(n => n.id === selectedNotification.id)) setSelectedNotification(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginated, notifications]);

  // actions
  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const selectAllOnPage = () => {
    const ids = paginated.map(n => n.id);
    const allSel = ids.every(id => selected.includes(id));
    if (allSel) setSelected(prev => prev.filter(id => !ids.includes(id)));
    else setSelected(prev => Array.from(new Set([...prev, ...ids])));
  };

  const bulkDelete = () => {
    if (selected.length === 0) return;
    setNotifications(prev => prev.filter(n => !selected.includes(n.id)));
    setSelected([]);
  };

  const scheduleNotification = (id, when) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'scheduled', scheduledAt: when, updatedAt: new Date().toLocaleString('vi-VN') } : n));
    if (selectedNotification?.id === id) setSelectedNotification(prev => ({ ...prev, status: 'scheduled', scheduledAt: when }));
  };

  const sendNow = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'sent', sentAt: new Date().toLocaleString('vi-VN'), updatedAt: new Date().toLocaleString('vi-VN') } : n));
    if (selectedNotification?.id === id) setSelectedNotification(prev => ({ ...prev, status: 'sent', sentAt: new Date().toLocaleString('vi-VN') }));
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    if (selectedNotification?.id === id) setSelectedNotification(prev => ({ ...prev, read: true }));
  };

  const duplicateNotification = (id) => {
    const orig = notifications.find(n => n.id === id);
    if (!orig) return;
    const newItem = { ...orig, id: `N-${Math.floor(Math.random()*9000)+1000}`, status: 'draft', createdAt: new Date().toLocaleString('vi-VN') };
    setNotifications(prev => [newItem, ...prev]);
    setSelectedNotification(newItem);
  };

  const exportCSV = (items = filtered) => {
    if (!items || items.length === 0) return;
    const header = ['ID','Title','Channel','Status','Audience','ScheduledAt','SentAt','Recipients','Clicks','Tags'];
    const rows = items.map(n => [n.id, `"${n.title.replace(/"/g,'""')}"`, n.channel, n.status, n.audience || '', n.scheduledAt || '', n.sentAt || '', n.recipients || 0, n.clicks || 0, (n.tags||[]).join('|')]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `notifications_export_${new Date().toISOString()}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const openTemplateEditor = (tpl = null) => { setEditingTemplate(tpl); setShowTemplateEditor(true); };
  const saveTemplate = (tpl) => {
    if (tpl.id) {
      setTemplates(prev => prev.map(t => t.id === tpl.id ? tpl : t));
    } else {
      const id = `T-${Math.floor(Math.random()*9000)+100}`;
      setTemplates(prev => [{ ...tpl, id }, ...prev]);
    }
    setShowTemplateEditor(false);
  };

  const previewNotification = (n) => { setPreviewContent(n); setPreviewOpen(true); };

  // small stats
  const stats = useMemo(() => ({ total: notifications.length, scheduled: notifications.filter(n => n.status === 'scheduled').length, sent: notifications.filter(n => n.status === 'sent').length }), [notifications]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3"><Bell size={26} /> Notification Management</h1>
          <p className="text-sm text-gray-600">Quản lý thông báo: template, lên lịch, gửi thử, báo cáo, kênh (push/email/sms/in-app)</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV()} className="px-4 py-2 bg-white border rounded hover:shadow"><Download size={16} /> Xuất CSV</button>
          <button onClick={() => { const n = { id: `N-${Math.floor(Math.random()*9000)+1000}`, title: 'Untitled', channel: 'in_app', status: 'draft', content: '', createdAt: new Date().toLocaleString('vi-VN'), recipients: 0, clicks: 0, tags: [] }; setNotifications(prev => [n, ...prev]); setSelectedNotification(n); }} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"><Plus size={16} /> Tạo</button>
        </div>
      </div>

      {/* stats + filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-500">Tổng thông báo</div>
          <div className="text-xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-500">Đã lên lịch</div>
          <div className="text-xl font-bold">{stats.scheduled}</div>
        </div>
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-500">Đã gửi</div>
          <div className="text-xl font-bold">{stats.sent}</div>
        </div>
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-500">Tags</div>
          <div className="mt-2 flex gap-2 flex-wrap">{tags.map(t => <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">{t}</span>)}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded border mb-4 flex gap-4 items-center">
        <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-full md:w-1/3">
          <Search size={16} className="mr-2" />
          <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} placeholder="Tìm theo ID, tiêu đề, nội dung..." className="bg-transparent outline-none text-sm w-full" />
        </div>

        <div className="flex gap-2">
          <select value={filterChannel} onChange={(e) => setFilterChannel(e.target.value)} className="px-3 py-1 border rounded">
            <option value="all">Tất cả kênh</option>
            <option value="push">Push</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="in_app">In-app</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-1 border rounded">
            <option value="all">Tất cả trạng thái</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
          <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="px-3 py-1 border rounded">
            <option value="all">Tất cả tags</option>
            {tags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <div className="ml-auto flex items-center gap-2">
            <button onClick={selectAllOnPage} className="px-3 py-1 border rounded">Chọn trang</button>
            <button onClick={() => { bulkDelete(); }} disabled={selected.length===0} className="px-3 py-1 bg-red-100 text-red-700 rounded disabled:opacity-50">Xóa</button>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* list */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded p-4 h-[70vh] overflow-y-auto">
            {paginated.length === 0 ? (
              <div className="text-center text-gray-500 py-12">Không có thông báo</div>
            ) : (
              paginated.map(n => (
                <div key={n.id} className={`p-3 rounded border mb-2 cursor-pointer ${selectedNotification?.id === n.id ? 'bg-blue-50 border-blue-300' : 'bg-white'}`} onClick={() => setSelectedNotification(n)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{n.title}</div>
                      <div className="text-xs text-gray-500 mt-1">#{n.id} • {n.channel} • {n.recipients} recipients</div>
                      <div className="mt-2 text-sm text-gray-600 line-clamp-2">{n.content}</div>
                    </div>
                    <div className="ml-2 text-right">
                      <div className="text-xs text-gray-500">{n.status}</div>
                      <div className="text-xs mt-2 text-gray-500">{n.scheduledAt || '-'}</div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* pagination */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">Tổng {filtered.length} kết quả</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p-1))} className="px-2 py-1 border rounded">Prev</button>
                <div className="px-3 py-1 border rounded">{page}</div>
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} className="px-2 py-1 border rounded">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* detail */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded h-[70vh] overflow-hidden flex flex-col">
            {selectedNotification ? (
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-500">#{selectedNotification.id} • <span className="font-medium">{selectedNotification.title}</span></div>
                    <div className="text-xs text-gray-500 mt-1">Channel: {selectedNotification.channel} • Audience: {selectedNotification.audience} • Created: {selectedNotification.createdAt}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => previewNotification(selectedNotification)} className="px-3 py-1 border rounded"><Eye size={14} /> Preview</button>
                    <button onClick={() => duplicateNotification(selectedNotification.id)} className="px-3 py-1 border rounded"><CopyIconFallback /> Duplicate</button>
                    <button onClick={() => exportCSV([selectedNotification])} className="px-3 py-1 bg-white border rounded">Export</button>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 border-b">
                  <div>
                    <div className="text-sm text-gray-500">Nội dung</div>
                    <div className="mt-2 text-sm text-gray-800 whitespace-pre-line">{selectedNotification.content}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Template</div>
                    <div className="mt-2 text-sm text-gray-800">{selectedNotification.templateId || '-'}</div>
                    <div className="mt-3">
                      <button onClick={() => openTemplateEditor(templates.find(t => t.id === selectedNotification.templateId))} className="px-3 py-1 border rounded">Edit template</button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Thống kê</div>
                    <div className="mt-2 text-sm">
                      <div>Recipients: <span className="font-medium">{selectedNotification.recipients || 0}</span></div>
                      <div className="mt-1">Clicks: <span className="font-medium">{selectedNotification.clicks || 0}</span></div>
                      <div className="mt-1">Read: <span className="font-medium">{selectedNotification.read ? 'Yes' : 'No'}</span></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 overflow-y-auto bg-gray-50">
                  <div className="text-sm text-gray-500 mb-2">Tags</div>
                  <div className="flex gap-2 flex-wrap">{(selectedNotification.tags||[]).map(t => <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">{t}</span>)}</div>
                </div>

                <div className="p-4 border-t bg-white">
                  <div className="mb-3 flex gap-2">
                    {selectedNotification.status !== 'sent' && <button onClick={() => sendNow(selectedNotification.id)} className="px-3 py-2 bg-blue-600 text-white rounded">Send now</button>}
                    <button onClick={() => scheduleNotification(selectedNotification.id, prompt('Schedule at (YYYY-MM-DD HH:mm):', selectedNotification.scheduledAt || ''))} className="px-3 py-2 border rounded">Schedule</button>
                    <button onClick={() => markRead(selectedNotification.id)} className="px-3 py-2 border rounded">Mark read</button>
                    <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== selectedNotification.id))} className="px-3 py-2 bg-red-100 text-red-700 rounded">Delete</button>
                  </div>

                  <div className="flex gap-4">
                    <textarea placeholder="Gửi thử / ghi chú..." className="flex-1 border rounded px-3 py-2" />
                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded"><Send size={14} /> Send test</button>
                      <button onClick={() => setPreviewOpen(true)} className="px-4 py-2 border rounded">Preview</button>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">Chọn thông báo để xem chi tiết</div>
            )}
          </div>
        </div>
      </div>

      {/* Template editor modal (simple) */}
      {showTemplateEditor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-lg w-full max-w-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">Template Editor</div>
              <div className="flex gap-2">
                <button onClick={() => setShowTemplateEditor(false)} className="px-3 py-1 border rounded">Close</button>
                <button onClick={() => { saveTemplate(editingTemplate || { name: 'New', channel: 'in_app', subject: '', body: '' }); }} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <input placeholder="Template name" value={editingTemplate?.name || ''} onChange={(e) => setEditingTemplate(prev => ({ ...(prev||{}), name: e.target.value }))} className="px-3 py-2 border rounded" />
              <select value={editingTemplate?.channel || 'in_app'} onChange={(e) => setEditingTemplate(prev => ({ ...(prev||{}), channel: e.target.value }))} className="px-3 py-2 border rounded">
                <option value="in_app">In-app</option>
                <option value="push">Push</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
              <input placeholder="Subject (email)" value={editingTemplate?.subject || ''} onChange={(e) => setEditingTemplate(prev => ({ ...(prev||{}), subject: e.target.value }))} className="px-3 py-2 border rounded" />
              <textarea rows={6} placeholder="Body" value={editingTemplate?.body || ''} onChange={(e) => setEditingTemplate(prev => ({ ...(prev||{}), body: e.target.value }))} className="px-3 py-2 border rounded" />
            </div>
          </div>
        </div>
      )}

      {/* Preview drawer */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center p-4">
          <div className="bg-white rounded-t-lg w-full max-w-3xl p-4 max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">Preview</div>
              <button onClick={() => { setPreviewOpen(false); setPreviewContent(null); }} className="px-3 py-1 border rounded">Close</button>
            </div>
            {previewContent ? (
              <div>
                <div className="text-sm text-gray-500 mb-2">Channel: {previewContent.channel}</div>
                <div className="border p-4 rounded mb-3">
                  <div className="font-semibold mb-2">{previewContent.title}</div>
                  <div className="text-sm whitespace-pre-line">{previewContent.content}</div>
                </div>
                <div className="text-xs text-gray-500">Recipients: {previewContent.recipients || 0} • Scheduled: {previewContent.scheduledAt || '-'}</div>
              </div>
            ) : (
              <div className="text-center text-gray-500">No preview content</div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

// small fallback component for duplicate icon (lucide doesn't have Copy in import here)
function CopyIconFallback() { return <svg width="16" height="16" className="inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><rect x="1" y="1" width="13" height="13" rx="2" ry="2"></rect></svg> }