import React, { useEffect, useMemo, useState, useRef } from 'react';
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
  Zap
} from 'lucide-react';

/*
  CVManager.mobile.ui.jsx
  - UI-only, mobile-first, responsive version of CVManager
  - All API calls & heavy logic removed (stubs kept where UI needs handlers)
  - Use sample() at bottom for demo data
  - Put into your project and wire real handlers later
*/

const formatDate = (iso) => {
  if (!iso) return '-';
  try { return new Date(iso).toLocaleDateString('vi-VN'); } catch(e) { return iso; }
};

function Badge({ children, className = '' }){
  return <div className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded ${className}`}>{children}</div>;
}

function Empty({ title='Không có dữ liệu', subtitle='' }){
  return (
    <div className="py-10 text-center text-gray-500">
      <FileText className="mx-auto mb-3 w-8 h-8 text-gray-300" />
      <h4 className="font-semibold">{title}</h4>
      {subtitle && <p className="mt-2 text-sm">{subtitle}</p>}
    </div>
  );
}

function Drawer({ open, onClose, cv }){
  return (
    <div className={`fixed inset-y-0 right-0 z-40 w-full max-w-md bg-white shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`} aria-hidden={!open}>
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold">{(cv?.name||'U').charAt(0)}</div>
          <div>
            <div className="font-semibold">{cv?.name || '-'}</div>
            <div className="text-sm text-gray-500">{cv?.position || '-'}</div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded hover:bg-gray-100" aria-label="Đóng"><X size={18} /></button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100vh-140px)]">
        {!cv ? <Empty /> : (
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <div className="text-xs text-gray-500">Email</div>
              <div className="mt-1">{cv.email || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Số điện thoại</div>
              <div className="mt-1">{cv.phone || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Địa chỉ</div>
              <div className="mt-1">{cv.address || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Kỹ năng</div>
              <div className="mt-2 flex flex-wrap gap-2">{(cv.skills||[]).map((s,i)=>(<Badge key={i} className="bg-gray-100 text-gray-700">{s}</Badge>))}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Thư ứng tuyển</div>
              <div className="mt-2 whitespace-pre-wrap text-sm text-gray-600">{cv.cover || '-'}</div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded">Phê duyệt</button>
              <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded">Từ chối</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Mobile card item */
function CardRow({ cv, onView, onDownload, onAction }){
  return (
    <div className="p-4 bg-white border-b flex items-start justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-medium text-gray-900 truncate">{cv.name}</div>
          <div className={`ml-2 text-xs px-2 py-0.5 rounded-full ${cv.status==='pending'?'bg-yellow-100 text-yellow-800':cv.status==='saved'?'bg-purple-100 text-purple-700':cv.status==='reviewed'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{cv.status}</div>
        </div>
        <div className="text-xs text-gray-500 truncate">{cv.position} • {formatDate(cv.appliedAt)}</div>
        <div className="text-sm text-gray-600 mt-2 truncate">{(cv.skills||[]).slice(0,3).join(', ')}{(cv.skills||[]).length>3 ? '…' : ''}</div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <button onClick={() => onView && onView(cv)} className="p-2 bg-white border rounded text-gray-600" aria-label="Xem"><Eye size={16} /></button>
          <button onClick={() => onDownload && onDownload(cv)} className="p-2 bg-white border rounded text-gray-600" aria-label="Tải"><Download size={16} /></button>
        </div>
        <button onClick={() => onAction && onAction(cv)} className="text-sm text-gray-500">Chi tiết</button>
      </div>
    </div>
  );
}

export default function CVManagerMobile(){
  // UI state only
  const [activeTab, setActiveTab] = useState('event');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCV, setActiveCV] = useState(null);

  // sample data for UI demo
  const [data, setData] = useState(sample());

  const list = useMemo(() => data[activeTab] || [], [data, activeTab]);

  const filtered = useMemo(() => {
    const q = (search || '').trim().toLowerCase();
    if(!q) return list;
    return list.filter(cv => (`${cv.name} ${cv.position} ${(cv.skills||[]).join(' ')}`.toLowerCase()).includes(q));
  }, [list, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages]);
  const paginated = useMemo(() => filtered.slice((page-1)*pageSize, (page-1)*pageSize + pageSize), [filtered, page, pageSize]);

  const openDrawer = (cv) => { setActiveCV(cv); setDrawerOpen(true); };
  const closeDrawer = () => { setDrawerOpen(false); setActiveCV(null); };

  // stubs: UI shows these but user will wire logic later
  const onDownload = (cv) => { alert('Stub: download ' + cv.name); };
  const onApprove = (cv) => { alert('Stub: approve ' + cv.name); };
  const onReject = (cv) => { alert('Stub: reject ' + cv.name); };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 mb-18">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Quản lý hồ sơ</h1>
            <p className="text-sm text-gray-500">Xem, lọc và xử lý hồ sơ — giao diện tối ưu cho mobile</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center"><Users className="text-blue-600"/></div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg shadow">
            <div className="text-xs text-gray-500">Tổng hồ sơ</div>
            <div className="text-lg font-bold">{data.event.length + data.recommend.length + data.evaluate.length}</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow">
            <div className="text-xs text-gray-500">Đang chờ</div>
            <div className="text-lg font-bold">{data.event.filter(c=>c.status==='pending').length}</div>
          </div>
        </div>

        {/* controls */}
        <div className="bg-white p-3 rounded-lg shadow flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e)=>{ setSearch(e.target.value); setPage(1); }} placeholder="Tìm kiếm tên, vị trí, kỹ năng..." className="w-full pl-10 pr-3 py-2 border rounded" />
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <select value={pageSize} onChange={(e)=>{ setPageSize(Number(e.target.value)); setPage(1); }} className="px-3 py-2 border rounded">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-gray-100 rounded px-1">
              <button onClick={()=>setActiveTab('event')} className={`px-3 py-1 rounded ${activeTab==='event'?'bg-blue-600 text-white':'text-gray-600'}`}>Sự kiện</button>
              <button onClick={()=>setActiveTab('recommend')} className={`px-3 py-1 rounded ${activeTab==='recommend'?'bg-blue-600 text-white':'text-gray-600'}`}>Đề xuất</button>
              <button onClick={()=>setActiveTab('evaluate')} className={`px-3 py-1 rounded ${activeTab==='evaluate'?'bg-blue-600 text-white':'text-gray-600'}`}>Đánh giá</button>
            </div>
          </div>
        </div>

        {/* list (mobile cards) */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {paginated.length === 0 ? <Empty title="Không tìm thấy hồ sơ" /> : (
            <div className="divide-y">
              {paginated.map(cv => (
                <CardRow key={cv.id} cv={cv} onView={openDrawer} onDownload={onDownload} onAction={(c)=>openDrawer(c)} />
              ))}
            </div>
          )}

          {/* pagination */}
          <div className="p-3 flex items-center justify-between text-sm text-gray-600">
            <div>Hiển thị {(page-1)*pageSize + 1} - {Math.min(page*pageSize, filtered.length)} trên {filtered.length}</div>
            <div className="flex items-center gap-2">
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded" disabled={page<=1}>Trước</button>
              <div className="px-3 py-1 border rounded">{page} / {totalPages}</div>
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 border rounded" disabled={page>=totalPages}>Sau</button>
            </div>
          </div>
        </div>

      </div>

      <Drawer open={drawerOpen} onClose={closeDrawer} cv={activeCV} />
    </div>
  );
}

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
