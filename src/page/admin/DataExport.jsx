import React, { useEffect, useMemo, useState } from 'react';
import {
  Download,
  CloudDownload,
  FileSpreadsheet,
  FileText,
  FilePlus,
  Search,
  Filter,
  Trash2,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Database,
  Settings,
  Cloud,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';

/**
 * DataExport - trang quản lý export dữ liệu
 * - Mock data: export templates, requests, storage info
 * - Features: search, filter, sort, create export (mô phỏng), download, delete, pagination
 */

export default function DataExport() {
  // UI state
  const [templates, setTemplates] = useState([
    { id: 'T01', name: 'Danh sách tình nguyện viên', type: 'users', format: 'xlsx', description: 'Xuất thông tin cơ bản và liên lạc' },
    { id: 'T02', name: 'Báo cáo sự kiện (30 ngày)', type: 'events', format: 'csv', description: 'Sự kiện, lượt đăng ký, tham dự' },
    { id: 'T03', name: 'Dữ liệu GDPR (theo user)', type: 'gdpr', format: 'json', description: 'Dữ liệu cá nhân theo yêu cầu người dùng' },
    { id: 'T04', name: 'Báo cáo tài chính', type: 'payments', format: 'xlsx', description: 'Donations & payments summary' }
  ]);

  const [requests, setRequests] = useState([
    {
      id: 'R-001',
      name: 'Danh sách TNV - toàn bộ',
      templateId: 'T01',
      type: 'users',
      format: 'xlsx',
      status: 'completed',
      progress: 100,
      size: '6.2 MB',
      createdAt: '2025-09-06 09:12:00',
      completedAt: '2025-09-06 09:14:10',
      requestedBy: 'nguyen.admin',
      downloadUrl: '/exports/users_all_2025-09-06.xlsx',
      records: 1247,
      includePersonal: false,
      expiresAt: '2025-09-13 09:12:00'
    },
    {
      id: 'R-002',
      name: 'Event analytics - last 30d',
      templateId: 'T02',
      type: 'events',
      format: 'csv',
      status: 'processing',
      progress: 55,
      size: 'calculating...',
      createdAt: '2025-09-06 12:30:00',
      completedAt: null,
      requestedBy: 'analytics.user',
      downloadUrl: null,
      records: 'processing...',
      includePersonal: false,
      expiresAt: null
    },
    {
      id: 'R-003',
      name: 'GDPR export - user_12345',
      templateId: 'T03',
      type: 'gdpr',
      format: 'json',
      status: 'completed',
      progress: 100,
      size: '2.8 MB',
      createdAt: '2025-09-05 10:15:00',
      completedAt: '2025-09-05 10:18:22',
      requestedBy: 'gdpr.processor',
      downloadUrl: '/exports/gdpr_user_12345.json',
      records: 1,
      includePersonal: true,
      expiresAt: '2025-09-12 10:15:00'
    }
  ]);

  const [schedules, setSchedules] = useState([
    { id: 'S01', name: 'Daily volunteers export', enabled: true, cron: '0 6 * * *', templateId: 'T01', lastRun: '2025-09-06 06:00:00', nextRun: '2025-09-07 06:00:00' },
    { id: 'S02', name: 'Weekly finance report', enabled: false, cron: '0 3 * * 1', templateId: 'T04', lastRun: '2025-08-31 03:00:00', nextRun: 'Disabled' }
  ]);

  // Filters & UI controls
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey] = useState('createdAt'); // createdAt, status, size
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Create export form
  const [createForm, setCreateForm] = useState({ templateId: 'T01', customName: '', includePersonal: false, format: '' });

  // Settings
  const [settings, setSettings] = useState({
    defaultFormat: 'csv',
    retentionDays: 7,
    allowPersonalExport: true
  });

  // Storage mock
  const storage = useMemo(() => ({ totalMB: 200 * 1024, usedMB: 87 * 1024 }), []);
  const usedPercent = Math.round((storage.usedMB / storage.totalMB) * 100);

  // Derived & helpers
  const templatesMap = useMemo(() => Object.fromEntries(templates.map(t => [t.id, t])), [templates]);

  // Filtering / sorting requests
  const filteredRequests = useMemo(() => {
    let out = requests.slice();
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      out = out.filter(r => (r.name || '').toLowerCase().includes(q) || (r.requestedBy || '').toLowerCase().includes(q));
    }
    if (filterType !== 'all') out = out.filter(r => r.type === filterType);
    if (filterStatus !== 'all') out = out.filter(r => r.status === filterStatus);

    out.sort((a, b) => {
      let aV = a[sortKey];
      let bV = b[sortKey];
      if (sortKey === 'createdAt' || sortKey === 'completedAt') {
        aV = aV ? new Date(aV).getTime() : 0;
        bV = bV ? new Date(bV).getTime() : 0;
      }
      if (aV < bV) return sortDir === 'asc' ? -1 : 1;
      if (aV > bV) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return out;
  }, [requests, searchTerm, filterType, filterStatus, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / itemsPerPage));
  const pageStart = (page - 1) * itemsPerPage;
  const pagedRequests = filteredRequests.slice(pageStart, pageStart + itemsPerPage);

  // Actions
  useEffect(() => {
    // Simulate progress for processing exports
    const interval = setInterval(() => {
      setRequests(prev =>
        prev.map(r => {
          if (r.status === 'processing') {
            const p = Math.min(100, (r.progress || 0) + Math.floor(Math.random() * 20) + 5);
            if (p >= 100) {
              return {
                ...r,
                progress: 100,
                status: 'completed',
                size: `${(Math.random() * 10 + 1).toFixed(1)} MB`,
                completedAt: new Date().toLocaleString('vi-VN'),
                downloadUrl: `/exports/${r.id}.${r.format || 'dat'}`,
                records: Math.floor(Math.random() * 2000) + 50,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleString('vi-VN')
              };
            }
            return { ...r, progress: p };
          }
          return r;
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleCreateExport = () => {
    const template = templatesMap[createForm.templateId] || templates[0];
    const id = `R-${String(requests.length + 1).padStart(3, '0')}`;
    const newReq = {
      id,
      name: createForm.customName || `${template.name} - Manual`,
      templateId: template.id,
      type: template.type,
      format: createForm.format || template.format || settings.defaultFormat,
      status: 'processing',
      progress: 0,
      size: 'calculating...',
      createdAt: new Date().toLocaleString('vi-VN'),
      completedAt: null,
      requestedBy: 'current_admin',
      downloadUrl: null,
      records: 'processing...',
      includePersonal: createForm.includePersonal,
      expiresAt: null
    };
    setRequests(prev => [newReq, ...prev]);
    setCreateForm({ ...createForm, customName: '' });
    setPage(1);
  };

  const handleDownload = (req) => {
    if (!req.downloadUrl) {
      alert('File chưa sẵn sàng để tải.');
      return;
    }
    // simulate download by opening url or creating link
    const a = document.createElement('a');
    a.href = req.downloadUrl;
    a.download = req.name + '.' + (req.format || 'dat');
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDeleteRequest = (id) => {
    if (!confirm(`Xác nhận xóa yêu cầu ${id}?`)) return;
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleClearCompleted = () => {
    if (!confirm('Xác nhận xóa tất cả yêu cầu đã hoàn thành?')) return;
    setRequests(prev => prev.filter(r => r.status !== 'completed'));
  };

  const toggleSchedule = (id) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const handleExportTemplateDelete = (tid) => {
    if (!confirm('Xác nhận xóa template export?')) return;
    setTemplates(prev => prev.filter(t => t.id !== tid));
  };

  // small UI helpers
  const fmtStatus = (s) => {
    if (s === 'completed') return { label: 'Hoàn thành', color: 'green' };
    if (s === 'processing') return { label: 'Đang xử lý', color: 'yellow' };
    if (s === 'failed') return { label: 'Thất bại', color: 'red' };
    return { label: s, color: 'gray' };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FileSpreadsheet className="text-indigo-600" size={28} />
          <div>
            <h1 className="text-xl font-semibold">Quản lý Export Dữ liệu</h1>
            <p className="text-sm text-gray-500">Tạo, theo dõi và quản lý các yêu cầu xuất dữ liệu</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">Templates: <strong>{templates.length}</strong></div>
          <div className="text-sm text-gray-600">Requests: <strong>{requests.length}</strong></div>
          <button onClick={() => { setTemplates([]); setRequests([]); }} className="px-3 py-1 border rounded">Clear (mô phỏng)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Create export */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-3">Tạo Export Mới</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Template</label>
              <select
                className="w-full mt-2 px-3 py-2 border rounded"
                value={createForm.templateId}
                onChange={(e) => setCreateForm(f => ({ ...f, templateId: e.target.value }))}
              >
                {templates.map(t => <option key={t.id} value={t.id}>{t.name} — {t.format.toUpperCase()}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Tên (tùy chọn)</label>
              <input className="w-full mt-2 px-3 py-2 border rounded" value={createForm.customName} onChange={(e) => setCreateForm(f => ({ ...f, customName: e.target.value }))} placeholder="Tên báo cáo..." />
            </div>

            <div>
              <label className="text-sm text-gray-600">Định dạng (optional)</label>
              <select className="w-full mt-2 px-3 py-2 border rounded" value={createForm.format} onChange={(e) => setCreateForm(f => ({ ...f, format: e.target.value }))}>
                <option value="">Theo template</option>
                <option value="csv">CSV</option>
                <option value="xlsx">Excel (XLSX)</option>
                <option value="json">JSON</option>
                <option value="pdf">PDF</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="personal" checked={createForm.includePersonal} onChange={(e) => setCreateForm(f => ({ ...f, includePersonal: e.target.checked }))} />
              <label htmlFor="personal" className="text-sm">Bao gồm dữ liệu cá nhân</label>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={handleCreateExport} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                <Download size={16} /> Tạo Export
              </button>
              <button onClick={() => setCreateForm({ templateId: templates[0]?.id || '', customName: '', includePersonal: false, format: '' })} className="px-3 py-2 border rounded">Reset</button>
            </div>
          </div>
        </div>

        {/* Templates & quick actions */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-3">Templates</h3>
          <div className="space-y-3">
            {templates.map(t => (
              <div key={t.id} className="p-3 border rounded flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <strong>{t.name}</strong>
                    <span className="text-xs text-gray-500">· {t.format.toUpperCase()}</span>
                  </div>
                  <div className="text-sm text-gray-500">{t.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button title="Sử dụng template" onClick={() => setCreateForm(f => ({ ...f, templateId: t.id }))} className="px-2 py-1 border rounded text-sm">Use</button>
                  <button onClick={() => handleExportTemplateDelete(t.id)} className="px-2 py-1 border rounded text-sm text-red-600"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {templates.length === 0 && <div className="text-sm text-gray-500">Không có template.</div>}
          </div>
        </div>

        {/* Storage & settings */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-3">Storage & Settings</h3>
          <div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div className="h-3 rounded-full bg-indigo-600" style={{ width: `${usedPercent}%` }} />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <div>{usedPercent}% sử dụng</div>
              <div>{Math.round(storage.usedMB / 1024)} GB / {Math.round(storage.totalMB / 1024)} GB</div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Default format</label>
                <select className="w-full mt-2 px-3 py-2 border rounded" value={settings.defaultFormat} onChange={(e) => setSettings(s => ({ ...s, defaultFormat: e.target.value }))}>
                  <option value="csv">CSV</option>
                  <option value="xlsx">XLSX</option>
                  <option value="json">JSON</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Retention (days)</label>
                <input type="number" min={1} value={settings.retentionDays} onChange={(e) => setSettings(s => ({ ...s, retentionDays: Number(e.target.value) }))} className="mt-2 px-3 py-2 border rounded w-32" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={settings.allowPersonalExport} onChange={(e) => setSettings(s => ({ ...s, allowPersonalExport: e.target.checked }))} />
                <span className="text-sm">Cho phép export dữ liệu cá nhân</span>
              </div>

              <div className="flex gap-2">
                <button onClick={() => alert('Lưu cài đặt (mô phỏng)')} className="px-3 py-2 bg-blue-600 text-white rounded">Lưu</button>
                <button onClick={() => setSettings({ defaultFormat: 'csv', retentionDays: 7, allowPersonalExport: true })} className="px-3 py-2 border rounded">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & list header */}
      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3 w-full md:w-1/2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input className="w-full pl-10 py-2 border rounded" placeholder="Tìm kiếm tên yêu cầu hoặc người tạo..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} />
          </div>
          <button className="px-3 py-2 border rounded"><Filter size={16} /></button>
        </div>

        <div className="flex items-center gap-2">
          <select className="px-3 py-2 border rounded" value={filterType} onChange={(e) => { setFilterType(e.target.value); setPage(1); }}>
            <option value="all">Tất cả loại</option>
            <option value="users">Người dùng</option>
            <option value="events">Sự kiện</option>
            <option value="gdpr">GDPR</option>
            <option value="payments">Tài chính</option>
          </select>

          <select className="px-3 py-2 border rounded" value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}>
            <option value="all">Tất cả trạng thái</option>
            <option value="processing">Đang xử lý</option>
            <option value="completed">Hoàn thành</option>
            <option value="failed">Thất bại</option>
          </select>

          <select className="px-3 py-2 border rounded" value={`${sortKey}|${sortDir}`} onChange={(e) => {
            const [k, d] = e.target.value.split('|'); setSortKey(k); setSortDir(d);
          }}>
            <option value="createdAt|desc">Mới nhất</option>
            <option value="createdAt|asc">Cũ nhất</option>
            <option value="status|asc">Status A→Z</option>
            <option value="status|desc">Status Z→A</option>
          </select>

          <button onClick={() => { setRequests(r => r.slice().reverse()); }} className="px-3 py-2 border rounded"><ArrowUpDown size={16} /></button>
        </div>
      </div>

      {/* Requests list */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Danh sách yêu cầu export</h3>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500">Tổng: {filteredRequests.length}</div>
            <button onClick={handleClearCompleted} className="px-3 py-1 bg-red-50 text-red-700 rounded text-sm">Xóa completed</button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {pagedRequests.length === 0 && <div className="p-6 text-center text-gray-500">Không có yêu cầu.</div>}
          {pagedRequests.map(req => {
            const t = templatesMap[req.templateId] || {};
            const s = fmtStatus(req.status);
            return (
              <div key={req.id} className="p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded">
                      {req.format === 'xlsx' ? <FileSpreadsheet size={18} /> : req.format === 'csv' ? <FileText size={18} /> : <CloudDownload size={18} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-gray-900">{req.name}</strong>
                        <span className="text-xs text-gray-500">• {t.name || req.type}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${s.color === 'green' ? 'bg-green-50 text-green-700' : s.color === 'yellow' ? 'bg-yellow-50 text-yellow-700' : s.color === 'red' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                          {s.label}
                        </span>
                        <span className="text-xs text-gray-400">• {req.format?.toUpperCase()}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{req.createdAt} • {req.records} records</div>
                    </div>
                  </div>

                  {req.status === 'processing' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Tiến độ</span>
                        <span>{req.progress ?? 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: `${req.progress ?? 0}%` }} />
                      </div>
                    </div>
                  )}

                  {req.status === 'completed' && (
                    <div className="mt-3 text-sm text-gray-700">
                      <div>Size: {req.size}</div>
                      <div>Expires at: {req.expiresAt}</div>
                    </div>
                  )}

                  {req.status === 'failed' && (
                    <div className="mt-3 text-sm text-red-700 flex items-start gap-2">
                      <AlertTriangle size={16} />
                      <div>Lỗi xử lý export. Kiểm tra nhật ký hệ thống.</div>
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0 flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    {req.status === 'completed' && <button onClick={() => handleDownload(req)} className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm flex items-center gap-2"><CloudDownload size={14} />Tải</button>}
                    <a href={req.downloadUrl || '#'} target="_blank" rel="noreferrer" className={`px-3 py-1 border rounded text-sm ${req.downloadUrl ? 'text-gray-700' : 'text-gray-400'}`}>
                      <ExternalLink size={14} /> Mở
                    </a>
                    <button onClick={() => handleDeleteRequest(req.id)} className="px-3 py-1 border rounded text-sm text-red-600"><Trash2 size={14} /></button>
                  </div>
                  <div className="text-xs text-gray-500 text-right">Requested: {req.requestedBy}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Hiển thị {pageStart + 1} - {Math.min(pageStart + itemsPerPage, filteredRequests.length)} trong {filteredRequests.length}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
            <div className="px-3 py-1 border rounded text-sm">{page} / {totalPages}</div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>

      {/* Schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Lịch export</h3>
            <button className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm">Tạo lịch</button>
          </div>

          <div className="space-y-3">
            {schedules.map(s => (
              <div key={s.id} className="p-3 border rounded flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <strong>{s.name}</strong>
                    <span className="text-sm text-gray-500">• {templatesMap[s.templateId]?.name || s.templateId}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Cron: {s.cron} • Last: {s.lastRun}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleSchedule(s.id)} className={`px-3 py-1 rounded text-sm ${s.enabled ? 'bg-yellow-50 text-yellow-800' : 'bg-green-50 text-green-800'}`}>
                    {s.enabled ? 'Tạm dừng' : 'Kích hoạt'}
                  </button>
                  <button className="px-3 py-1 border rounded text-sm">Chỉnh sửa</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity / quick actions */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-3">Hoạt động gần đây</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <Clock size={16} />
              <div><strong>09:14</strong> — Export <em>Danh sách TNV - toàn bộ</em> hoàn thành bởi <strong>nguyen.admin</strong></div>
            </div>
            <div className="flex items-start gap-2">
              <RefreshCw size={16} />
              <div><strong>12:31</strong> — Tạo yêu cầu <em>Event analytics - last 30d</em></div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} />
              <div><strong>08:02</strong> — Export <em>Weekly finance</em> thất bại: timeout kết nối</div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={() => alert('Mô phỏng: xem logs')} className="px-3 py-2 border rounded">Xem logs</button>
            <button onClick={() => alert('Mô phỏng: đồng bộ export với storage')} className="px-3 py-2 border rounded">Sync storage</button>
          </div>
        </div>
      </div>
    </div>
  );
}
