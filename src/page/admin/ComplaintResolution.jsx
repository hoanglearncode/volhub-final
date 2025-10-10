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
  Tag,
  Paperclip,
  Send,
  Star,
  AlertTriangle,
  Flag,
  Shield,
  Archive,
  MoreHorizontal,
  Eye
} from 'lucide-react';

// ComplaintResolution — giao diện chuyên biệt cho xử lý và giải quyết khiếu nại
// Sử dụng Tailwind CSS + lucide-react

export default function ComplaintResolution() {
  // sample complaint data (replace with API calls)
  const [complaints, setComplaints] = useState([
    {
      id: 'C-1001',
      subject: 'Đối tác thu phí vượt mức trong sự kiện',
      category: 'financial',
      priority: 'high',
      status: 'open',
      reporter: { name: 'Nguyễn Thị A', email: 'nta@example.com' },
      createdAt: '2025-09-05 09:20',
      updatedAt: '2025-09-05 09:20',
      assignedTo: null,
      description: 'Đối tác thu thêm 50k/ người trái với thông báo trước.',
      evidence: ['receipt_1.jpg'],
      timeline: [
        { ts: '2025-09-05 09:20', action: 'Created', by: 'Nguyễn Thị A' }
      ],
      resolution: null,
      satisfaction: null,
      tags: ['payment', 'partner']
    },
    {
      id: 'C-1002',
      subject: 'Hành vi quấy rối tình dục tại sự kiện',
      category: 'safety',
      priority: 'critical',
      status: 'in_progress',
      reporter: { name: 'Lê Văn B', email: 'lvb@example.com' },
      createdAt: '2025-09-04 20:10',
      updatedAt: '2025-09-06 08:40',
      assignedTo: 'safety_officer',
      description: 'Người tham gia có hành vi không phù hợp, yêu cầu xử lý theo quy định.',
      evidence: ['video_clip.mp4', 'photo_001.jpg'],
      timeline: [
        { ts: '2025-09-04 20:10', action: 'Created', by: 'Lê Văn B' },
        { ts: '2025-09-05 09:00', action: 'Assigned to safety_officer', by: 'system' }
      ],
      resolution: null,
      satisfaction: null,
      tags: ['harassment', 'urgent']
    }
  ]);

  // UI state
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'financial', label: 'Tài chính' },
    { id: 'safety', label: 'An toàn' },
    { id: 'content', label: 'Nội dung' },
    { id: 'partner', label: 'Đối tác' },
    { id: 'other', label: 'Khác' }
  ];

  // filtering / searching
  const visible = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return complaints.filter(c => {
      const matchesTab = activeTab === 'all' || (activeTab === 'open' && c.status === 'open') || (activeTab === 'in_progress' && c.status === 'in_progress') || (activeTab === 'resolved' && c.status === 'resolved');
      const matchesPriority = filterPriority === 'all' || c.priority === filterPriority;
      const matchesCategory = filterCategory === 'all' || c.category === filterCategory;
      const matchesSearch = !q || c.id.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q) || c.reporter.name.toLowerCase().includes(q);
      return matchesTab && matchesPriority && matchesCategory && matchesSearch;
    });
  }, [complaints, searchTerm, activeTab, filterPriority, filterCategory]);

  useEffect(() => {
    if (!selectedComplaint && visible.length > 0) setSelectedComplaint(visible[0]);
    if (selectedComplaint && !complaints.find(x => x.id === selectedComplaint.id)) setSelectedComplaint(null);
  }, [visible, complaints]);

  // actions
  const addEvidence = (complaintId, filename) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, evidence: [...(c.evidence||[]), filename], updatedAt: new Date().toLocaleString('vi-VN'), timeline: [...c.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Added evidence ${filename}`, by: 'admin' }] } : c));
    if (selectedComplaint?.id === complaintId) setSelectedComplaint(prev => ({ ...prev, evidence: [...(prev.evidence||[]), filename], updatedAt: new Date().toLocaleString('vi-VN'), timeline: [...prev.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Added evidence ${filename}`, by: 'admin' }] }));
  };

  const escalateComplaint = (complaintId, level) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, priority: level, updatedAt: new Date().toLocaleString('vi-VN'), timeline: [...c.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Escalated to ${level}`, by: 'admin' }] } : c));
    if (selectedComplaint?.id === complaintId) setSelectedComplaint(prev => ({ ...prev, priority: level, updatedAt: new Date().toLocaleString('vi-VN'), timeline: [...prev.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Escalated to ${level}`, by: 'admin' }] }));
  };

  const assignTo = (complaintId, assignee) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, assignedTo: assignee, status: 'in_progress', updatedAt: new Date().toLocaleString('vi-VN'), timeline: [...c.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Assigned to ${assignee}`, by: 'admin' }] } : c));
    if (selectedComplaint?.id === complaintId) setSelectedComplaint(prev => ({ ...prev, assignedTo: assignee, status: 'in_progress', updatedAt: new Date().toLocaleString('vi-VN'), timeline: [...prev.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Assigned to ${assignee}`, by: 'admin' }] }));
  };

  const markResolved = (complaintId, resolutionText) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, status: 'resolved', resolution: resolutionText, updatedAt: new Date().toLocaleString('vi-VN'), timeline: [...c.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Resolved: ${resolutionText}`, by: 'admin' }] } : c));
    if (selectedComplaint?.id === complaintId) setSelectedComplaint(prev => ({ ...prev, status: 'resolved', resolution: resolutionText, updatedAt: new Date().toLocaleString('vi-VN'), timeline: [...prev.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Resolved: ${resolutionText}`, by: 'admin' }] }));
  };

  const closeComplaint = (complaintId, satisfactionScore) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, status: 'closed', satisfaction: satisfactionScore, updatedAt: new Date().toLocaleString('vi-VN'), timeline: [...c.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Closed (satisfaction ${satisfactionScore})`, by: 'admin' }] } : c));
    if (selectedComplaint?.id === complaintId) setSelectedComplaint(prev => ({ ...prev, status: 'closed', satisfaction: satisfactionScore, updatedAt: new Date().toLocaleString('vi-VN'), timeline: [...prev.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Closed (satisfaction ${satisfactionScore})`, by: 'admin' }] }));
  };

  const addInternalNote = (complaintId, note) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, timeline: [...c.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Note: ${note}`, by: 'admin' }], updatedAt: new Date().toLocaleString('vi-VN') } : c));
    if (selectedComplaint?.id === complaintId) setSelectedComplaint(prev => ({ ...prev, timeline: [...prev.timeline, { ts: new Date().toLocaleString('vi-VN'), action: `Note: ${note}`, by: 'admin' }], updatedAt: new Date().toLocaleString('vi-VN') }));
  };

  const exportComplaintReport = (complaintId) => {
    // very simple CSV export for single complaint
    const c = complaints.find(x => x.id === complaintId);
    if (!c) return;
    const header = ['id', 'subject', 'status', 'priority', 'assignedTo', 'reporter', 'createdAt', 'updatedAt', 'tags', 'resolution', 'satisfaction'];
    const row = [c.id, `"${c.subject.replace(/"/g, '""')}"`, c.status, c.priority, c.assignedTo || '', c.reporter.name, c.createdAt, c.updatedAt || '', (c.tags||[]).join('|'), c.resolution || '', c.satisfaction || ''];
    const csv = [header.join(','), row.join(',')].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${c.id}_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedComplaint) return;
    const message = `Admin: ${replyText.trim()}`;
    addInternalNote(selectedComplaint.id, message);
    setReplyText('');
  };

  // render helpers
  const renderRow = (c) => (
    <div key={c.id} onClick={() => setSelectedComplaint(c)} className={`p-3 rounded border hover:shadow cursor-pointer ${selectedComplaint?.id === c.id ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold text-sm">{c.subject}</div>
          <div className="text-xs text-gray-500 mt-1">#{c.id} • {c.reporter.name} • {c.createdAt}</div>
        </div>
        <div className="text-right">
          <div className="text-xs">{c.priority}</div>
          <div className="text-xs mt-2 text-gray-500">{c.status}</div>
        </div>
      </div>
      <div className="mt-2 flex gap-2 flex-wrap">
        {(c.tags||[]).map(t => <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">{t}</span>)}
      </div>
    </div>
  );

  const stats = useMemo(() => ({
    total: complaints.length,
    open: complaints.filter(c => c.status === 'open').length,
    inProgress: complaints.filter(c => c.status === 'in_progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length
  }), [complaints]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3"><Shield size={24} /> Complaint Resolution</h1>
          <p className="text-sm text-gray-600">Giao diện chuyên biệt cho xử lý khiếu nại: bằng chứng, leo thang, timeline, khảo sát hài lòng</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportComplaintReport(selectedComplaint?.id)} disabled={!selectedComplaint} className="px-4 py-2 bg-white border rounded hover:shadow disabled:opacity-50"><Download size={16} /> Xuất báo cáo</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"><Plus size={16} /> Tạo khiếu nại</button>
        </div>
      </div>

      {/* stats + controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-500">Tổng khiếu nại</div>
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
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-500">Đã giải quyết</div>
          <div className="text-xl font-bold">{stats.resolved}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded border mb-4 flex gap-4 items-center">
        <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-full md:w-1/3">
          <Search size={16} className="mr-2" />
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm theo ID, tiêu đề, người báo cáo..." className="bg-transparent outline-none text-sm w-full" />
        </div>

        <div className="flex gap-2 items-center">
          <button onClick={() => setShowFilters(prev => !prev)} className="px-3 py-2 border rounded flex items-center gap-2"><Filter size={16} /> Bộ lọc</button>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('all')} className={`px-3 py-2 rounded ${activeTab==='all' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Tất cả</button>
            <button onClick={() => setActiveTab('open')} className={`px-3 py-2 rounded ${activeTab==='open' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Mở</button>
            <button onClick={() => setActiveTab('in_progress')} className={`px-3 py-2 rounded ${activeTab==='in_progress' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Đang xử lý</button>
            <button onClick={() => setActiveTab('resolved')} className={`px-3 py-2 rounded ${activeTab==='resolved' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Đã giải quyết</button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-3 rounded border mb-4 flex gap-4 items-center">
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-1 border rounded">
            <option value="all">Tất cả danh mục</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="px-3 py-1 border rounded">
            <option value="all">Tất cả ưu tiên</option>
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
            <option value="critical">Khẩn cấp</option>
          </select>
          <div className="ml-auto">
            <button onClick={() => { setFilterCategory('all'); setFilterPriority('all'); setShowFilters(false); }} className="px-3 py-1 border rounded">Reset</button>
          </div>
        </div>
      )}

      {/* main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left list */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded p-4 h-[70vh] overflow-y-auto space-y-3">
            {visible.length === 0 ? (
              <div className="text-center text-gray-500 py-12">Không có khiếu nại</div>
            ) : visible.map(renderRow)}
          </div>
        </div>

        {/* detail */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded h-[70vh] overflow-hidden flex flex-col">
            {selectedComplaint ? (
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-500">#{selectedComplaint.id} • <span className="font-medium">{selectedComplaint.subject}</span></div>
                    <div className="text-xs text-gray-500 mt-1">{selectedComplaint.reporter.name} • {selectedComplaint.createdAt}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={selectedComplaint.status} onChange={(e) => markResolved(selectedComplaint.id, selectedComplaint.resolution || 'Manually changed status')} className="px-3 py-1 border rounded">
                      <option value="open">open</option>
                      <option value="in_progress">in_progress</option>
                      <option value="resolved">resolved</option>
                      <option value="closed">closed</option>
                    </select>

                    <select value={selectedComplaint.assignedTo || ''} onChange={(e) => assignTo(selectedComplaint.id, e.target.value || null)} className="px-3 py-1 border rounded">
                      <option value="">--Assign--</option>
                      <option value="safety_officer">safety_officer</option>
                      <option value="legal_team">legal_team</option>
                      <option value="partner_manager">partner_manager</option>
                    </select>

                    <button onClick={() => exportComplaintReport(selectedComplaint.id)} className="px-3 py-1 bg-white border rounded">Export</button>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 border-b">
                  <div>
                    <div className="text-sm text-gray-500">Mô tả</div>
                    <div className="mt-1 text-sm text-gray-800">{selectedComplaint.description}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Bằng chứng</div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {(selectedComplaint.evidence||[]).map(e => (
                        <div key={e} className="text-xs px-2 py-1 bg-gray-100 rounded flex items-center gap-2">
                          <Paperclip size={12} />
                          <span className="underline cursor-pointer">{e}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2">
                      <input type="file" id="_evidence" className="text-xs" onChange={(ev) => { const f = ev.target.files?.[0]; if (f) addEvidence(selectedComplaint.id, f.name); ev.target.value = ''; }} />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Thông tin nhanh</div>
                    <div className="mt-1 text-sm">
                      <div>Priority: <span className="font-medium">{selectedComplaint.priority}</span></div>
                      <div className="mt-1">Assigned: <span className="font-medium">{selectedComplaint.assignedTo || '-'}</span></div>
                      <div className="mt-1">Satisfaction: <span className="font-medium">{selectedComplaint.satisfaction || '-'}</span></div>
                    </div>
                  </div>
                </div>

                {/* timeline */}
                <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-gray-50">
                  <div className="text-sm text-gray-500 mb-2">Timeline</div>
                  {selectedComplaint.timeline.map((t, idx) => (
                    <div key={idx} className="p-2 bg-white rounded border">
                      <div className="text-xs text-gray-400">{t.ts} • {t.by}</div>
                      <div className="text-sm mt-1">{t.action}</div>
                    </div>
                  ))}
                </div>

                {/* resolution & actions */}
                <div className="p-4 border-t bg-white">
                  <div className="mb-3 flex gap-2">
                    <button onClick={() => escalateComplaint(selectedComplaint.id, 'critical')} className="px-3 py-2 bg-red-100 text-red-700 rounded">Escalate to Critical</button>
                    <button onClick={() => addInternalNote(selectedComplaint.id, 'Requested partner response within 48h')} className="px-3 py-2 bg-gray-100 rounded">Add internal note</button>
                    <button onClick={() => markResolved(selectedComplaint.id, 'Resolved after partner refund')} className="px-3 py-2 bg-green-100 text-green-700 rounded">Mark resolved</button>
                  </div>

                  <div className="flex gap-4">
                    <textarea rows={3} value={replyText} onChange={(e) => setReplyText(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Ghi chú nhanh / trả lời nội bộ..." />
                    <div className="flex flex-col gap-2">
                      <button onClick={handleSendReply} className="px-4 py-2 bg-blue-600 text-white rounded"><Send size={14} /> Ghi</button>
                      <button onClick={() => { setReplyText(''); }} className="px-4 py-2 border rounded">Clear</button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="text-sm text-gray-500">Đóng khiếu nại và thu thập đánh giá:</div>
                    <div className="flex items-center gap-2">
                      {[1,2,3,4,5].map(n => (
                        <button key={n} onClick={() => closeComplaint(selectedComplaint.id, n)} className="px-3 py-1 border rounded">{n} ★</button>
                      ))}
                      <button onClick={() => closeComplaint(selectedComplaint.id, 0)} className="px-3 py-1 border rounded">Close without rating</button>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">Chọn khiếu nại để xem chi tiết</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
