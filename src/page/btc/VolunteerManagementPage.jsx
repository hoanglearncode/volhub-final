import React, { useEffect, useMemo, useState, useRef } from "react";
import { Search, Plus, Edit2, Trash2, X, UserCheck, Download, ChevronDown, ChevronUp } from "lucide-react";

// Mock data
const initialVolunteers = [
  { id: 1, name: "Nguyễn Văn An", email: "nguyenvanan@gmail.com", phone: "0901234567", address: "Hà Nội", skills: "Tổ chức sự kiện, Hỗ trợ kỹ thuật", status: "active", joinDate: "2024-01-15", hoursContributed: 45 },
  { id: 2, name: "Trần Thị Bình", email: "tranthibinh@gmail.com", phone: "0912345678", address: "TP Hồ Chí Minh", skills: "Giảng dạy, Tư vấn", status: "active", joinDate: "2024-02-20", hoursContributed: 32 },
  { id: 3, name: "Lê Hoàng Cường", email: "lehoangcuong@gmail.com", phone: "0923456789", address: "Đà Nẵng", skills: "Y tế, Sơ cứu", status: "inactive", joinDate: "2023-11-10", hoursContributed: 78 },
  { id: 4, name: "Phạm Thị Dung", email: "phamthidung@gmail.com", phone: "0934567890", address: "Hải Phòng", skills: "Nấu ăn, Tổ chức", status: "active", joinDate: "2024-03-05", hoursContributed: 28 },
  { id: 5, name: "Hoàng Văn Em", email: "hoangvanem@gmail.com", phone: "0945678901", address: "Cần Thơ", skills: "Thiết kế, Truyền thông", status: "active", joinDate: "2024-01-28", hoursContributed: 56 },
  { id: 6, name: "Đặng Thị Phương", email: "dangthiphuong@gmail.com", phone: "0956789012", address: "Huế", skills: "Dịch thuật, Hướng dẫn", status: "active", joinDate: "2024-04-12", hoursContributed: 19 }
];

const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "name", label: "Họ tên" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Điện thoại" },
  { key: "address", label: "Địa chỉ" },
  { key: "skills", label: "Kỹ năng" },
  { key: "status", label: "Trạng thái" },
  { key: "joinDate", label: "Ngày tham gia" },
  { key: "hoursContributed", label: "Giờ" }
];

export default function VolunteerManage() {
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", skills: "", status: "active", joinDate: new Date().toISOString().split('T')[0], hoursContributed: 0 });

  // table features
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [sortBy, setSortBy] = useState({ key: 'id', dir: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState(() => {
    // default: show id, name, email, status, actions on small screens
    const map = {};
    COLUMNS.forEach(col => { map[col.key] = true; });
    return map;
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const modalRef = useRef(null);

  // filtering
  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return volunteers.filter(v => {
      const matchesSearch = !term || (
        v.name.toLowerCase().includes(term) ||
        v.email.toLowerCase().includes(term) ||
        v.phone.includes(term)
      );
      const matchesFilter = filterStatus === 'all' || v.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [volunteers, searchTerm, filterStatus]);

  // sorting
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const { key, dir } = sortBy;
    arr.sort((a, b) => {
      const va = a[key];
      const vb = b[key];
      // try numeric
      if (typeof va === 'number' && typeof vb === 'number') return dir === 'asc' ? va - vb : vb - va;
      // try date
      if (key === 'joinDate') {
        const da = new Date(va).getTime();
        const db = new Date(vb).getTime();
        return dir === 'asc' ? da - db : db - da;
      }
      // fallback string
      return dir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
    return arr;
  }, [filtered, sortBy]);

  // pagination
  const pageCount = Math.max(1, Math.ceil(sorted.length / perPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, currentPage, perPage]);

  useEffect(() => { // reset page if data changes
    setCurrentPage(1);
  }, [searchTerm, filterStatus, perPage]);

  // selection helpers
  const toggleRow = (id) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      setSelectAllChecked(next.size === paginated.length && paginated.length > 0);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedRows(new Set());
      setSelectAllChecked(false);
    } else {
      const allIds = paginated.map(r => r.id);
      setSelectedRows(new Set(allIds));
      setSelectAllChecked(true);
    }
  };

  const handleOpenModal = (volunteer = null) => {
    if (volunteer) {
      setEditingVolunteer(volunteer);
      setFormData({ ...volunteer });
    } else {
      setEditingVolunteer(null);
      setFormData({ name: "", email: "", phone: "", address: "", skills: "", status: "active", joinDate: new Date().toISOString().split('T')[0], hoursContributed: 0 });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVolunteer(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }
    if (editingVolunteer) {
      setVolunteers(prev => prev.map(v => v.id === editingVolunteer.id ? { ...formData, id: v.id } : v));
    } else {
      const newId = volunteers.length ? Math.max(...volunteers.map(v => v.id)) + 1 : 1;
      setVolunteers(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tình nguyện viên này?')) return;
    setVolunteers(prev => prev.filter(v => v.id !== id));
    setSelectedRows(prev => { const next = new Set(prev); next.delete(id); return next; });
  };

  const handleBulkDelete = () => {
    if (selectedRows.size === 0) return alert('Chưa chọn bản ghi nào');
    if (!window.confirm(`Xóa ${selectedRows.size} bản ghi?`)) return;
    setVolunteers(prev => prev.filter(v => !selectedRows.has(v.id)));
    setSelectedRows(new Set());
    setSelectAllChecked(false);
  };

  const handleExportCSV = () => {
    const rows = volunteers.filter(v => selectedRows.size === 0 ? true : selectedRows.has(v.id));
    if (rows.length === 0) return alert('Không có dữ liệu để xuất');
    const headers = COLUMNS.filter(c => visibleColumns[c.key]).map(c => c.label);
    const csv = [headers.join(',')].concat(rows.map(r => COLUMNS.filter(c => visibleColumns[c.key]).map(c => `"${(r[c.key] ?? '')}"`).join(','))).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `volunteers_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSort = (key) => {
    setSortBy(prev => ({ key, dir: prev.key === key ? (prev.dir === 'asc' ? 'desc' : 'asc') : 'asc' }));
  };

  const toggleColumn = (key) => {
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // stats
  const stats = useMemo(() => ({ total: volunteers.length, active: volunteers.filter(v => v.status === 'active').length, totalHours: volunteers.reduce((s, v) => s + (Number(v.hoursContributed) || 0), 0) }), [volunteers]);

  // click outside for column menu/modal (simple)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setShowColumnMenu(false); setShowModal(false); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Quản lý Tình nguyện viên</h1>
          <p className="text-gray-600 mt-1">Quản lý và theo dõi thông tin tình nguyện viên</p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng số TNV</p>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <UserCheck className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Đang hoạt động</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <UserCheck className="w-10 h-10 text-green-600 opacity-20" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng giờ đóng góp</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalHours}h</p>
            </div>
            <UserCheck className="w-10 h-10 text-purple-600 opacity-20" />
          </div>
        </div>

        {/* controls */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex-1 flex items-center gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input aria-label="Tìm kiếm" type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm kiếm theo tên, email, điện thoại..." className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <select aria-label="Trạng thái" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-lg">
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>

              <div className="relative">
                <button onClick={() => setShowColumnMenu(prev => !prev)} className="px-3 py-2 border rounded-lg flex items-center gap-2">
                  Cột <ChevronDown className="w-4 h-4" />
                </button>
                {showColumnMenu && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow p-2 z-40">
                    {COLUMNS.map(col => (
                      <label key={col.key} className="flex items-center gap-2 text-sm py-1">
                        <input type="checkbox" checked={!!visibleColumns[col.key]} onChange={() => toggleColumn(col.key)} />
                        <span>{col.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => handleOpenModal(null)} className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" /> Thêm
              </button>
              <button onClick={handleBulkDelete} className="px-3 py-2 border rounded-lg text-red-600">Xóa chọn</button>
              <button onClick={handleExportCSV} className="px-3 py-2 border rounded-lg flex items-center gap-2"><Download className="w-4 h-4" /> Xuất</button>
            </div>
          </div>
        </div>

        {/* responsive table: desktop table + mobile cards */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* desktop table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left"><input type="checkbox" checked={selectAllChecked} onChange={toggleSelectAll} aria-label="Chọn tất cả" /></th>
                    {COLUMNS.filter(c => visibleColumns[c.key]).map(col => (
                      <th key={col.key} onClick={() => toggleSort(col.key)} className="px-4 py-3 text-left cursor-pointer select-none">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600">{col.label}</span>
                          {sortBy.key === col.key && (sortBy.dir === 'asc' ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />)}
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginated.map(volunteer => (
                    <tr key={volunteer.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3"><input type="checkbox" checked={selectedRows.has(volunteer.id)} onChange={() => toggleRow(volunteer.id)} aria-label={`Chọn ${volunteer.name}`} /></td>
                      {visibleColumns.id && <td className="px-4 py-3">{volunteer.id}</td>}
                      {visibleColumns.name && <td className="px-4 py-3 font-medium">{volunteer.name}</td>}
                      {visibleColumns.email && <td className="px-4 py-3 text-gray-600">{volunteer.email}</td>}
                      {visibleColumns.phone && <td className="px-4 py-3 text-gray-600">{volunteer.phone}</td>}
                      {visibleColumns.address && <td className="px-4 py-3 text-gray-600">{volunteer.address}</td>}
                      {visibleColumns.skills && <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{volunteer.skills}</td>}
                      {visibleColumns.status && <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${volunteer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{volunteer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}</span>
                      </td>}
                      {visibleColumns.joinDate && <td className="px-4 py-3">{volunteer.joinDate}</td>}
                      {visibleColumns.hoursContributed && <td className="px-4 py-3">{volunteer.hoursContributed}</td>}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleOpenModal(volunteer)} className="text-blue-600 hover:text-blue-900" aria-label={`Chỉnh sửa ${volunteer.name}`}><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(volunteer.id)} className="text-red-600 hover:text-red-900" aria-label={`Xóa ${volunteer.name}`}><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Hiển thị</span>
                <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className="border rounded px-2 py-1">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
                <span>trên tổng {filtered.length} bản ghi</span>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Trước</button>
                <div className="text-sm">{currentPage} / {pageCount}</div>
                <button onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))} className="px-3 py-1 border rounded">Sau</button>
              </div>
            </div>
          </div>

          {/* mobile cards */}
          <div className="md:hidden">
            <div className="divide-y">
              {paginated.map(v => (
                <div key={v.id} className="p-4 flex items-start justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-900 truncate">{v.name}</div>
                      <div className={`ml-2 text-xs px-2 py-0.5 rounded-full ${v.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{v.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}</div>
                    </div>
                    <div className="text-sm text-gray-600 truncate">{v.email} • {v.phone}</div>
                    <div className="text-sm text-gray-500 mt-1">{v.skills}</div>
                    <div className="text-xs text-gray-400 mt-1">Tham gia: {v.joinDate} • {v.hoursContributed}h</div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenModal(v)} className="text-blue-600" aria-label={`Chỉnh sửa ${v.name}`}><Edit2 className="w-5 h-5" /></button>
                      <button onClick={() => handleDelete(v.id)} className="text-red-600" aria-label={`Xóa ${v.name}`}><Trash2 className="w-5 h-5" /></button>
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={selectedRows.has(v.id)} onChange={() => toggleRow(v.id)} />
                      <span>Chọn</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* mobile pagination */}
            <div className="flex items-center justify-between p-3 border-t">
              <div className="text-sm text-gray-600">{(currentPage-1)*perPage + 1} - {Math.min(currentPage*perPage, filtered.length)} trên {filtered.length}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Trước</button>
                <button onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))} className="px-3 py-1 border rounded">Sau</button>
              </div>
            </div>
          </div>

        </div>

        {/* modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black opacity-40" onClick={handleCloseModal} />
            <div ref={modalRef} className="relative bg-white w-full max-w-3xl rounded-lg overflow-y-auto max-h-[90vh] shadow-lg">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">{editingVolunteer ? 'Chỉnh sửa' : 'Thêm tình nguyện viên'}</h2>
                <button onClick={handleCloseModal} className="text-gray-500"><X /></button>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-700">Họ và tên *</label>
                    <input className="w-full mt-1 px-3 py-2 border rounded" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Email *</label>
                    <input type="email" className="w-full mt-1 px-3 py-2 border rounded" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Điện thoại *</label>
                    <input className="w-full mt-1 px-3 py-2 border rounded" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Địa chỉ</label>
                    <input className="w-full mt-1 px-3 py-2 border rounded" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Ngày tham gia</label>
                    <input type="date" className="w-full mt-1 px-3 py-2 border rounded" value={formData.joinDate} onChange={(e) => setFormData({...formData, joinDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Trạng thái</label>
                    <select className="w-full mt-1 px-3 py-2 border rounded" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="active">Đang hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Giờ đóng góp</label>
                    <input type="number" min={0} className="w-full mt-1 px-3 py-2 border rounded" value={formData.hoursContributed} onChange={(e) => setFormData({...formData, hoursContributed: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-gray-700">Kỹ năng</label>
                    <textarea rows={3} className="w-full mt-1 px-3 py-2 border rounded" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button onClick={handleCloseModal} className="px-4 py-2 border rounded">Hủy</button>
                  <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">{editingVolunteer ? 'Cập nhật' : 'Thêm'}</button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
