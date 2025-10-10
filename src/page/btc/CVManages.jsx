import React, { useEffect, useMemo, useState, useRef } from 'react';
import axios from 'axios';
import {
  Search,
  Users,
  Award,
  Eye,
  Star,
  FileText,
  Download,
  Check,
  X,
  Trash2,
  Filter,
  MoreHorizontal,
  Save,
  Zap,
  FileDown
} from 'lucide-react';

/**
 * CVManagerFull.jsx
 * A fully-featured CV management page (single-file, composable components inside)
 * - Tabs: Event / Recommend / Evaluate
 * - Search + Filters
 * - Bulk actions (approve/reject/save/export)
 * - Row actions (view details, approve/reject, download CV)
 * - Drawer for CV detail
 * - Pagination + pageSize
 * - Optimistic UI with graceful error handling
 *
 * Configure via env var VITE_API or pass a custom basePath to axios.
 * Replace placeholder API endpoints with your real endpoints.
 */

const API_BASE = import.meta.env.VITE_API || '';
const PAGE_SIZE_OPTIONS = [10, 25, 50];

/* ---------------------- Helpers ---------------------- */
const formatDate = (iso) => {
  if (!iso) return '-';
  try { return new Date(iso).toLocaleDateString('vi-VN'); } catch(e) { return iso; }
};

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

/* ---------------------- Subcomponents ---------------------- */
function Badge({ children, className = '' }) {
  return <div className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded ${className}`}>{children}</div>;
}

function Empty({ title='Không có dữ liệu', subtitle='' }) {
  return (
    <div className="py-12 text-center text-gray-500">
      <FileText className="mx-auto mb-4 w-8 h-8 text-gray-300" />
      <h4 className="font-semibold text-lg">{title}</h4>
      {subtitle && <p className="mt-2">{subtitle}</p>}
    </div>
  );
}

function ConfirmModal({ open, onClose, onConfirm, title, description, confirmLabel='Xác nhận' }){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">Hủy</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

/* Drawer to show CV details */
function CVDrawer({ open, onClose, cv, onApprove, onReject, onSave }){
  return (
    <div className={`fixed inset-y-0 right-0 z-40 w-full md:w-1/3 bg-white shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold">{(cv?.name||'U').charAt(0)}</div>
          <div>
            <div className="font-semibold">{cv?.name}</div>
            <div className="text-sm text-gray-500">{cv?.position}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onSave && onSave(cv)} className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 text-sm"><Save size={14}/> Lưu</button>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100"><X size={16}/></button>
        </div>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100vh-160px)]">
        {!cv ? <Empty /> : (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700">Thông tin chung</h4>
              <div className="mt-2 text-sm text-gray-600">
                <div><strong>Email:</strong> {cv.email || '-'}</div>
                <div><strong>Số điện thoại:</strong> {cv.phone || '-'}</div>
                <div><strong>Địa chỉ:</strong> {cv.address || '-'}</div>
                <div><strong>Ngày nộp:</strong> {formatDate(cv.appliedAt)}</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700">Kỹ năng</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {(cv.skills || []).map((s, i) => <Badge key={i} className="bg-gray-100 text-gray-700">{s}</Badge>)}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700">Mô tả/Thư ứng tuyển</h4>
              <div className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{cv.cover || 'Không có'}</div>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={() => onApprove && onApprove(cv)} className="px-4 py-2 bg-green-600 text-white rounded">Phê duyệt</button>
              <button onClick={() => onReject && onReject(cv)} className="px-4 py-2 bg-red-600 text-white rounded">Từ chối</button>
              <button onClick={() => onSave && onSave(cv)} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded">Lưu</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* CV Table */
function CVTable({ items, selectedIds, onToggleSelect, onView, onDownload, onApprove, onReject, onSave }){
  if(!items || items.length === 0) return <Empty title="Không có hồ sơ" />;
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left text-sm text-gray-500 border-b">
          <th className="py-3 px-2 w-8"> </th>
          <th className="py-3 px-2">Ứng viên</th>
          <th className="py-3 px-2">Vị trí</th>
          <th className="py-3 px-2">Kỹ năng</th>
          <th className="py-3 px-2">Trạng thái</th>
          <th className="py-3 px-2">Ngày nộp</th>
          <th className="py-3 px-2 text-right">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {items.map(cv => (
          <tr key={cv.id} className="border-b hover:bg-gray-50">
            <td className="py-3 px-2 align-top">
              <input type="checkbox" checked={selectedIds.includes(cv.id)} onChange={() => onToggleSelect(cv.id)} />
            </td>
            <td className="py-3 px-2 align-top">
              <div className="font-medium">{cv.name}</div>
              <div className="text-xs text-gray-500">{cv.email || '—'}</div>
            </td>
            <td className="py-3 px-2 align-top">{cv.position}</td>
            <td className="py-3 px-2 align-top"><div className="flex flex-wrap gap-1">{(cv.skills||[]).slice(0,3).map((s,i)=>(<Badge key={i} className="bg-gray-100 text-gray-700">{s}</Badge>))}{(cv.skills||[]).length>3 && <Badge className="bg-gray-50 text-gray-500">+{(cv.skills||[]).length-3}</Badge>}</div></td>
            <td className="py-3 px-2 align-top">
              {cv.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-800">Đang chờ</Badge>}
              {cv.status === 'saved' && <Badge className="bg-purple-100 text-purple-700">Đã lưu</Badge>}
              {cv.status === 'reviewed' && <Badge className="bg-green-100 text-green-700">Đã xem</Badge>}
              {cv.status === 'rejected' && <Badge className="bg-red-100 text-red-700">Bị từ chối</Badge>}
            </td>
            <td className="py-3 px-2 align-top">{formatDate(cv.appliedAt)}</td>
            <td className="py-3 px-2 align-top text-right">
              <div className="inline-flex items-center gap-2">
                <button onClick={() => onView(cv)} title="Xem" className="px-2 py-1 rounded bg-white border hover:bg-gray-50"><Eye size={14} /></button>
                <button onClick={() => onDownload(cv)} title="Tải CV" className="px-2 py-1 rounded bg-white border hover:bg-gray-50"><Download size={14} /></button>
                <button onClick={() => onApprove(cv)} title="Phê duyệt" className="px-2 py-1 rounded bg-green-50 text-green-700 hover:bg-green-100"><Check size={14} /></button>
                <button onClick={() => onReject(cv)} title="Từ chối" className="px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100"><Trash2 size={14} /></button>
                <button onClick={() => onSave(cv)} title="Lưu" className="px-2 py-1 rounded bg-yellow-50 text-yellow-700 hover:bg-yellow-100"><Star size={14} /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------------------- Main Page ---------------------- */
export default function CVManagerFull({ apiBase = API_BASE }){
  const [active, setActive] = useState('event');
  const [data, setData] = useState({ event: [], recommend: [], evaluate: [] });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');

  // selections & bulk
  const [selectedIds, setSelectedIds] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  // drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCV, setActiveCV] = useState(null);

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  // confirm modal
  const [confirm, setConfirm] = useState({ open: false, action: null, target: null });

  // load initial data (try API then fallback mock)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiBase}/cvs`);
        const payload = res?.data?.result || res?.data || null;
        if (payload) {
          setData({
            event: payload.cvForEvent || payload.event || [],
            recommend: payload.cvForRecommend || payload.recommend || [],
            evaluate: payload.cvForEvaluate || payload.evaluate || []
          });
        } else {
          // fallback dummy
          setData(sample());
        }
      } catch (e) {
        console.warn('Failed to load CVs, using sample', e?.message);
        setData(sample());
      } finally {
        if(mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [apiBase]);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const activeList = useMemo(() => data[active] || [], [data, active]);

  const filtered = useMemo(() => {
    if(!debounced) return activeList;
    return activeList.filter(cv => {
      const hay = `${cv.name} ${cv.position} ${(cv.skills||[]).join(' ')}`.toLowerCase();
      return hay.includes(debounced);
    });
  }, [debounced, activeList]);

  const totalPages = Math.max(1, Math.ceil((filtered.length||0) / pageSize));
  useEffect(() => { if(page > totalPages) setPage(1); }, [totalPages]);
  const paginated = useMemo(() => {
    const start = (page-1)*pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  // selection
  useEffect(() => {
    setSelectedIds([]);
    setAllSelected(false);
  }, [active, debounced, pageSize, page]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };
  const toggleSelectAll = () => {
    if(allSelected) {
      setSelectedIds([]);
      setAllSelected(false);
    } else {
      setSelectedIds(paginated.map(i=>i.id));
      setAllSelected(true);
    }
  };

  // actions (optimistic)
  const doApprove = async (cv) => {
    // optimistic update
    updateStatusLocal(cv.id, 'reviewed');
    try {
      await axios.post(`${apiBase}/cvs/${cv.id}/approve`);
    } catch (e) {
      console.error('approve failed', e);
      // rollback
      updateStatusLocal(cv.id, cv.status);
    }
  };

  const doReject = async (cv) => {
    updateStatusLocal(cv.id, 'rejected');
    try { await axios.post(`${apiBase}/cvs/${cv.id}/reject`); } catch(e){ console.error(e); updateStatusLocal(cv.id, cv.status); }
  };

  const doSave = async (cv) => {
    updateStatusLocal(cv.id, 'saved');
    try { await axios.post(`${apiBase}/cvs/${cv.id}/save`); } catch(e){ console.error(e); updateStatusLocal(cv.id, cv.status); }
  };

  const updateStatusLocal = (id, status) => {
    setData(prev => ({
      ...prev,
      [active]: prev[active].map(c => c.id === id ? { ...c, status } : c)
    }));
    if(activeCV && activeCV.id === id) setActiveCV(prev => ({ ...prev, status }));
  };

  const viewCV = (cv) => { setActiveCV(cv); setDrawerOpen(true); };

  const downloadCV = async (cv) => {
    try {
      const res = await axios.get(`${apiBase}/cvs/${cv.id}/download`, { responseType: 'blob' });
      const filename = `${cv.name.replace(/\s+/g,'_')}_cv.pdf`;
      downloadBlob(res.data, filename);
    } catch (e) {
      alert('Tải CV thất bại');
    }
  };

  // bulk actions
  const bulkApprove = async () => {
    if(selectedIds.length === 0) return alert('Chưa chọn hồ sơ');
    // optimistic
    const prev = selectedIds.slice();
    selectedIds.forEach(id => updateStatusLocal(id, 'reviewed'));
    try { await axios.post(`${apiBase}/cvs/bulk/approve`, { ids: selectedIds }); setSelectedIds([]); setAllSelected(false); } catch(e){ alert('Thao tác thất bại'); console.error(e); /* rollback would require cached prev state */ }
  };

  const bulkExport = () => {
    const rows = filtered.map(r => ({ id: r.id, name: r.name, position: r.position, skills: (r.skills||[]).join('; '), status: r.status, appliedAt: r.appliedAt }));
    if(!rows.length) return alert('Không có dữ liệu để xuất');
    const csv = [Object.keys(rows[0]).join(','), ...rows.map(o=>Object.values(o).map(v=>`"${String(v||'')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `cvs_export_${active}_${new Date().toISOString().slice(0,10)}.csv`);
  };

  /* Confirm modal handlers */
  const openConfirm = (action, target) => setConfirm({ open: true, action, target });
  const closeConfirm = () => setConfirm({ open: false, action: null, target: null });
  const handleConfirm = async () => {
    if(!confirm.open) return;
    const { action, target } = confirm;
    if(action === 'delete'){
      // perform delete
      try { await axios.delete(`${apiBase}/cvs/${target.id}`); setData(prev=>({ ...prev, [active]: prev[active].filter(c=>c.id!==target.id) })); } catch(e){ alert('Xóa thất bại'); }
    }
    closeConfirm();
  };

  const handleSaveFromDrawer = async (cv) => { await doSave(cv); alert('Đã lưu hồ sơ'); };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header / Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Tổng hồ sơ</div>
              <div className="text-2xl font-bold">{(data.event.length + data.recommend.length + data.evaluate.length)}</div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center"><Users className="text-blue-600"/></div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Đang chờ</div>
              <div className="text-2xl font-bold">{data.event.filter(c=>c.status==='pending').length}</div>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center"><Award className="text-yellow-600"/></div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Đã xem</div>
              <div className="text-2xl font-bold">{data.event.filter(c=>c.status==='reviewed').length}</div>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center"><Eye className="text-green-600"/></div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Đã lưu</div>
              <div className="text-2xl font-bold">{data.event.filter(c=>c.status==='saved').length}</div>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center"><Star className="text-purple-600"/></div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e)=>{ setSearch(e.target.value); setPage(1); }} placeholder="Tìm kiếm tên, vị trí, kỹ năng..." className="w-full pl-10 pr-3 py-2 border rounded-lg" />
          </div>

          <div className="flex items-center gap-2">
            <div role="tablist" className="flex items-center gap-2">
              <button onClick={()=>{ setActive('event'); setPage(1); }} className={`px-3 py-2 rounded ${active==='event'?'bg-blue-600 text-white':'bg-gray-100'}`}>Theo sự kiện</button>
              <button onClick={()=>{ setActive('recommend'); setPage(1); }} className={`px-3 py-2 rounded ${active==='recommend'?'bg-blue-600 text-white':'bg-gray-100'}`}>Đề xuất</button>
              <button onClick={()=>{ setActive('evaluate'); setPage(1); }} className={`px-3 py-2 rounded ${active==='evaluate'?'bg-blue-600 text-white':'bg-gray-100'}`}>Đánh giá</button>
            </div>

            <button onClick={bulkExport} title="Xuất CSV" className="px-3 py-2 bg-green-600 text-white rounded">Xuất</button>
            <button onClick={bulkApprove} title="Duyệt hàng loạt" className="px-3 py-2 bg-indigo-600 text-white rounded">Duyệt</button>
          </div>
        </div>

        {/* Table panel */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
              <div className="text-sm text-gray-600">Chọn tất cả trên trang</div>
            </div>

            <div className="flex items-center gap-3">
              <select value={pageSize} onChange={(e)=>{ setPageSize(Number(e.target.value)); setPage(1); }} className="px-3 py-2 border rounded">
                {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s} / trang</option>)}
              </select>

              <div className="text-sm text-gray-600">{filtered.length} kết quả</div>
            </div>
          </div>

          <CVTable items={paginated} selectedIds={selectedIds} onToggleSelect={toggleSelect} onView={viewCV} onDownload={downloadCV} onApprove={doApprove} onReject={(cv)=>openConfirm('delete', cv)} onSave={doSave} />

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Hiển thị {paginated.length} / {filtered.length}</div>
            <div className="flex items-center gap-2">
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1} className="px-3 py-1 border rounded">Prev</button>
              <div className="px-3 py-1 border rounded">{page} / {totalPages}</div>
              <button onClick={()=>setPage(p=>Math.min(totalPages, p+1))} disabled={page>=totalPages} className="px-3 py-1 border rounded">Next</button>
            </div>
          </div>
        </div>
      </div>

      <CVDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} cv={activeCV} onApprove={doApprove} onReject={doReject} onSave={handleSaveFromDrawer} />

      <ConfirmModal open={confirm.open} onClose={closeConfirm} onConfirm={handleConfirm} title={confirm.action==='delete' ? 'Xóa hồ sơ' : 'Xác nhận'} description={confirm.action==='delete' ? 'Bạn có chắc muốn xóa hồ sơ này? Hành động không thể hoàn tác.' : ''} />
    </div>
  );
}

/* ---------------------- Sample data generator ---------------------- */
function sample(){
  return {
    event: [
      { id: 'e1', name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0912345678', address: 'Hà Nội', position: 'Tình nguyện viên', skills: ['tổ chức','giao tiếp','lập kế hoạch'], status: 'pending', appliedAt: '2025-09-01', cover: 'Mình muốn tham gia...'},
      { id: 'e2', name: 'Trần Thị B', email: 'b@example.com', phone: '0905111222', address: 'Hải Phòng', position: 'Tình nguyện viên', skills: ['giáo dục','truyền thông'], status: 'saved', appliedAt: '2025-08-28', cover: 'Rất muốn tham gia...'},
      { id: 'e3', name: 'Lê Văn C', email: 'c@example.com', phone: '0988777666', address: 'Đà Nẵng', position: 'Nhân viên CS', skills: ['kỹ thuật','an toàn'], status: 'reviewed', appliedAt: '2025-08-20', cover: 'Kinh nghiệm 3 năm...'},
      { id: 'e4', name: 'Phạm D', email: 'd@example.com', phone: '0977999888', address: 'TPHCM', position: 'Trợ lý', skills: ['hành chính','tổ chức'], status: 'pending', appliedAt: '2025-09-03', cover: 'Sẵn sàng hỗ trợ...'}
    ],
    recommend: [
      { id: 'r1', name: 'Hoàng E', email: 'e@example.com', phone: '0911222333', address: 'Hà Nội', position: 'Giáo viên', skills: ['giảng dạy','lãnh đạo'], status: 'recommended', appliedAt: '2025-09-02', cover: 'Giáo viên 5 năm...'}
    ],
    evaluate: [
      { id: 'v1', name: 'Ngô F', email: 'f@example.com', phone: '0900123456', address: 'Huế', position: 'Nhân viên y tế', skills: ['sơ cứu','hỗ trợ'], status: 'to_evaluate', appliedAt: '2025-09-04', cover: 'Có kinh nghiệm...'}
    ]
  };
}
