import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Grid, List, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import EventSummaryCard from '../../components/common/UserEventCard'
import NewsUpdatesWidget from "../../components/user/home/NewsUpdatesWidget";
import UpcomingEventsWidget from "../../components/user/home/UpcomingEventsWidget";
import BlogPostsWidget from "../../components/user/home/BlogPostsWidget";
import FAQsWidget from "../../components/user/home/FAQsWidget";

/*
  Cập nhật chính:
  - Chuyển lọc sang gửi params lên server (filter object) thay vì lọc phía client.
  - Thêm tabs trạng thái (Tất cả / Đã tham gia / Chờ duyệt / Bị từ chối / Khác).
  - Thêm phân trang (page, pageSize, prev/next và số trang).
  - Debounce cho ô tìm kiếm.
  - Hiển thị badge trạng thái cho mỗi event.
  - Xử lý nhiều option (workModes, employmentTypes, roles) dưới dạng mảng để dễ serialize.

  Lưu ý API kỳ vọng trả về shape có thể là một trong các dạng sau (hàm fetch xử lý cả 2):
   - { code:0, result: { items: [...], total: 123 } }
   - { code:0, result: [...] }
   - { code:0, items: [...], total: 123 }
*/

function StatusBadge({ status }) {
  const map = {
    joined: { label: 'Đã tham gia', cls: 'bg-green-100 text-green-800' },
    pending: { label: 'Chờ duyệt', cls: 'bg-yellow-100 text-yellow-800' },
    rejected: { label: 'Bị từ chối', cls: 'bg-red-100 text-red-800' },
    cancelled: { label: 'Đã hủy', cls: 'bg-gray-100 text-gray-800' },
    open: { label: 'Mở', cls: 'bg-blue-100 text-blue-800' },
  };
  const info = map[status] || { label: status || 'Không rõ', cls: 'bg-gray-100 text-gray-800' };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${info.cls}`}>{info.label}</span>;
}

function FilterPanel({ onApply, initial = {}, metaOptions = {} }) {
  // initial is an object { q, region, location, workModes:[], employmentTypes:[], roles:[], requireTravel, status }
  const [q, setQ] = useState(initial.q || "");
  const [region, setRegion] = useState(initial.region || "");
  const [location, setLocation] = useState(initial.location || "");
  const [workModes, setWorkModes] = useState(initial.workModes || []);
  const [employmentTypes, setEmploymentTypes] = useState(initial.employmentTypes || []);
  const [roles, setRoles] = useState(initial.roles || []);
  const [requireTravel, setRequireTravel] = useState(Boolean(initial.requireTravel));
  const [status, setStatus] = useState(initial.status || "");

  // derived options from metaOptions (if supplied) to avoid requiring full events list here
  const regions = metaOptions.regions || [];
  const locations = metaOptions.locations || [];

  const toggleArray = (setter, arr, val) => {
    if (arr.includes(val)) setter(arr.filter(x => x !== val));
    else setter([...arr, val]);
  };

  // debounce search so user typing doesn't immediately trigger fetchs
  const debounceRef = useRef(null);
  useEffect(() => {
    // just call onApply with q after short delay so parent can fetch
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (onApply) onApply({ q, region, location, workModes, employmentTypes, roles, requireTravel, status });
    }, 450);
    return () => clearTimeout(debounceRef.current);
  }, [q]); // only debounce q; other changes apply immediately via buttons below

  const applyNow = () => {
    if (onApply) onApply({ q, region, location, workModes, employmentTypes, roles, requireTravel, status });
  };

  const reset = () => {
    setQ("");
    setRegion("");
    setLocation("");
    setWorkModes([]);
    setEmploymentTypes([]);
    setRoles([]);
    setRequireTravel(false);
    setStatus("");
    if (onApply) onApply({});
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 gap-3">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Tìm theo tiêu đề hoặc người tạo..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm"
        />

        <select value={region} onChange={e => setRegion(e.target.value)} className="px-3 py-2 border rounded-md text-sm">
          <option value="">Tất cả khu vực</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <select value={location} onChange={e => setLocation(e.target.value)} className="px-3 py-2 border rounded-md text-sm">
          <option value="">Tất cả địa điểm</option>
          {locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div>
          <div className="mb-2 font-medium">Hình thức</div>
          <div className="flex flex-wrap gap-2">
            {["online","offline","hybrid"].map(m => (
              <button
                key={m}
                type="button"
                onClick={() => toggleArray(setWorkModes, workModes, m)}
                className={`px-3 py-1.5 rounded-md border text-sm ${workModes.includes(m) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}
              >
                {m === 'online' ? 'Online' : m === 'offline' ? 'Offline' : 'Hybrid'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 font-medium">Loại công việc</div>
          <div className="flex flex-wrap gap-2">
            {["part","full"].map(t => (
              <button
                key={t}
                type="button"
                onClick={() => toggleArray(setEmploymentTypes, employmentTypes, t)}
                className={`px-3 py-1.5 rounded-md border text-sm ${employmentTypes.includes(t) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}
              >
                {t === 'part' ? 'Part-time' : 'Full-time'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 font-medium">Vai trò</div>
          <div className="flex flex-wrap gap-2">
            {[
              ['TNV','Tình nguyện viên'],
              ['CTV','Cộng tác viên'],
              ['NV','Nhân viên'],
            ].map(([val,label]) => (
              <button
                key={val}
                type="button"
                onClick={() => toggleArray(setRoles, roles, val)}
                className={`px-3 py-1.5 rounded-md border text-sm ${roles.includes(val) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={applyNow} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Áp dụng</button>
        <button onClick={reset} className="px-3 py-2 border rounded-md text-sm">Đặt lại</button>
        <label className="ml-3 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={requireTravel} onChange={e => { setRequireTravel(e.target.checked); if (onApply) onApply({ q, region, location, workModes, employmentTypes, roles, requireTravel: e.target.checked, status }); }} />
          Yêu cầu đi lại
        </label>

        <div className="ml-auto text-xs text-gray-500 flex gap-3">
          {/* metaOptions có thể chứa counts */}
          <span>Hiển thị: {metaOptions.total ?? '-'} mục</span>
        </div>
      </div>
    </div>
  );
}

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // pagination & meta
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);

  // filters to send to server
  const [filters, setFilters] = useState({});

  // view state
  const [state, setState] = useState('list');

  // status tab (all, joined, pending, rejected ...)
  const [statusTab, setStatusTab] = useState(''); // '' means all

  // meta options (for select lists) - we fetch once or rely on server
  const [metaOptions, setMetaOptions] = useState({ regions: [], locations: [], total: 0 });

  const abortRef = useRef(null);

  useEffect(() => {
    // fetch meta options (regions/locations/counts) optionally
    const loadMeta = async () => {
      try {
        const url = `${import.meta.env.VITE_API}/api/volunteer/events/meta`;
        const res = await axios.get(url);
        if (res.data) {
          // try to extract options
          const { regions, locations } = res.data || {};
          setMetaOptions(prev => ({ ...prev, regions: regions || prev.regions, locations: locations || prev.locations }));
        }
      } catch (err) {
        // silently ignore - not critical
        // console.warn('no meta endpoint or failed to load meta', err);
      }
    };
    loadMeta();
  }, []);

  const buildParams = () => {
    const p = {
      page,
      pageSize,
      status: statusTab || undefined,
    };

    // copy filters
    if (filters.q) p.q = filters.q;
    if (filters.region) p.region = filters.region;
    if (filters.location) p.location = filters.location;
    if (filters.workModes && filters.workModes.length) p.workMode = filters.workModes.join(',');
    if (filters.employmentTypes && filters.employmentTypes.length) p.employmentType = filters.employmentTypes.join(',');
    if (filters.roles && filters.roles.length) p.role = filters.roles.join(',');
    if (filters.requireTravel) p.travel = true;

    return p;
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // cancel previous
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const params = buildParams();
        const url = `${import.meta.env.VITE_API}/api/volunteer/events`;
        const res = await axios.get(url, { params, signal: controller.signal });

        // support multiple shapes
        let items = [];
        let tot = 0;

        if (Array.isArray(res.data?.result)) {
          items = res.data.result;
          tot = res.data.total ?? res.data.result.length;
        } else if (Array.isArray(res.data?.result?.items)) {
          items = res.data.result.items;
          tot = res.data.result.total ?? res.data.meta?.total ?? items.length;
        } else if (Array.isArray(res.data?.items)) {
          items = res.data.items;
          tot = res.data.total ?? items.length;
        } else if (Array.isArray(res.data)) {
          items = res.data;
          tot = items.length;
        }

        setEvents(items || []);
        setTotal(Number(tot || 0));

        // update metaOptions.total for FilterPanel
        setMetaOptions(prev => ({ ...prev, total: Number(tot || 0) }));

      } catch (err) {
        if (axios.isCancel(err)) {
          // request canceled
        } else if (err.name === 'CanceledError') {
          // fetch canceled by AbortController in modern axios
        } else {
          console.error('Error fetching events', err);
          toast.error('Đã xảy ra lỗi khi tải sự kiện.');
        }
      } finally {
        setLoading(false);
      }
    };

    load();

    // cleanup abort on unmount
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, []);

  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));

  const applyFilters = (f) => {
    setFilters(f || {});
    setPage(1); // reset to first page when filters change
  };

  // status tabs with simple counts from metaOptions not guaranteed; counts can be fetched from server endpoint if available
  const statusTabs = [
    { key: '', label: 'Tất cả' },
    { key: 'joined', label: 'Đã tham gia' },
    { key: 'pending', label: 'Chờ duyệt' },
    { key: 'rejected', label: 'Bị từ chối' },
    { key: 'cancelled', label: 'Đã hủy' },
  ];

  if (loading) {
    return (
      <div className="bg-gray-50 w-full">
        <div className="px-6 w-full h-full overflow-y-auto pb-8">
          <div className="flex flex-col items-center justify-center py-8 text-gray-600 min-h-[60vh]">
            <Loader2 className="w-20 h-20 animate-spin mb-3 text-blue-500" />
            <p className="text-base md:text-sm mt-4 font-medium italic tracking-wide text-center">
              Đang tải dữ liệu... <br /> Vui lòng chờ một chút
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:px-16 px-2 bg-gray-50 grid grid-cols-1 md:grid-cols-12 py-2 gap-5">
      <div className="md:col-span-8 flex flex-col justify-between space-y-4 mt-2 h-full">
        {/* FILTER PANEL */}
        <FilterPanel onApply={applyFilters} initial={filters} metaOptions={metaOptions} />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Các sự kiện tình nguyện</h1>
            <p className="text-sm text-gray-500 mt-1">Tổng: <strong>{total}</strong> kết quả</p>
          </div>

          <div className="flex items-center space-x-2 hidden sm:flex">
            <button
              onClick={() => setState("list")}
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${state === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200"}`}
              aria-pressed={state === "list"}
            >
              <List className="w-4 h-4 mr-2" />
              Chế độ danh sách
            </button>

            <button
              onClick={() => setState("grid")}
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${state === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200"}`}
              aria-pressed={state === "grid"}
            >
              <Grid className="w-4 h-4 mr-2" />
              Chế độ lưới
            </button>
          </div>
        </div>

        {/* STATUS TABS */}
        <div className="flex gap-2 items-center flex-wrap">
          {statusTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setStatusTab(tab.key); setPage(1); }}
              className={`px-3 py-1 rounded-md text-sm ${statusTab === tab.key ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col w-full">
          {events.length === 0 ? (
            <div className="px-6 py-10 bg-white rounded-md shadow-sm text-center text-gray-600">Không có kết quả nào</div>
          ) : (
            state === "list" ? (
              <div className="space-y-4">
                {events.map((item, idx) => (
                  <div key={item.id ?? idx} className="bg-white p-3 rounded-md shadow-sm">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <EventSummaryCard event={item} state="list" />
                      </div>
                      <div className="ml-3">
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {events.map((item, idx) => (
                  <div key={item.id ?? idx} className="col-span-1 bg-white p-3 rounded-md shadow-sm">
                    <EventSummaryCard event={item} state="grid" />
                    <div className="mt-2"><StatusBadge status={item.status} /></div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* PAGINATION */}
        <div className="my-4 w-full flex items-center justify-between border-t pt-3 border-gray-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-2 rounded-md border bg-white text-sm"
            >Prev</button>

            {/* page numbers (simple) */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }).slice(0, 10).map((_, i) => {
                const pNum = i + 1;
                return (
                  <button key={pNum} onClick={() => setPage(pNum)} className={`px-2 py-1 rounded text-sm ${pNum === page ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'}`}>{pNum}</button>
                );
              })}
              {totalPages > 10 && <span className="text-sm px-2">... {totalPages}</span>}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-2 rounded-md border bg-white text-sm"
            >Next</button>

            <div className="ml-4 text-sm text-gray-600">Trang {page} / {totalPages}</div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm">Hiển thị</label>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} className="px-2 py-1 border rounded-md">
              {[12, 24, 48].map(s => <option key={s} value={s}>{s} / trang</option>)}
            </select>

            <div className="text-sm text-gray-500">Tổng: {total} mục</div>
          </div>
        </div>

      </div>

      <div className="md:col-span-4 space-y-6 hidden md:block">
        <UpcomingEventsWidget />
        <FAQsWidget />
      </div>
    </div>
  )
}
