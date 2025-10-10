import { useState } from "react";

export default function FilterPanel({ events = [], onApply }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [location, setLocation] = useState("");
  const [workModes, setWorkModes] = useState(new Set());
  const [employmentTypes, setEmploymentTypes] = useState(new Set());
  const [roles, setRoles] = useState(new Set());
  const [requireTravel, setRequireTravel] = useState(false);

  // derive options
  const regions = Array.from(new Set(events.map(e => e.region).filter(Boolean))).sort();
  const locations = Array.from(new Set(events.map(e => e.location).filter(Boolean))).sort();

  const toggleSet = (setter, val) => {
    setter(prev => {
      const next = new Set(prev);
      if (next.has(val)) next.delete(val);
      else next.add(val);
      return next;
    });
  };

  const reset = () => {
    setQ("");
    setRegion("");
    setLocation("");
    setWorkModes(new Set());
    setEmploymentTypes(new Set());
    setRoles(new Set());
    setRequireTravel(false);
    if (onApply) onApply(events);
  };

  const apply = () => {
    const qLower = q.trim().toLowerCase();
    const filtered = events.filter(e => {
      // text search
      if (qLower) {
        const hay = `${e.title||""} ${e.fullName||""} ${e.description||""}`.toLowerCase();
        if (!hay.includes(qLower)) return false;
      }
      if (region && e.region !== region) return false;
      if (location && e.location !== location) return false;

      if (workModes.size > 0) {
        if (!e.workMode || !Array.from(workModes).includes(e.workMode)) return false;
      }

      if (employmentTypes.size > 0) {
        if (!e.employmentType || !Array.from(employmentTypes).includes(e.employmentType)) return false;
      }

      if (roles.size > 0) {
        if (!e.role || !Array.from(roles).includes(e.role)) return false;
      }

      if (requireTravel) {
        if (!e.travel) return false;
      }

      return true;
    });

    if (onApply) onApply(filtered);
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
                onClick={() => toggleSet(setWorkModes, m)}
                className={`px-3 py-1.5 rounded-md border text-sm ${workModes.has(m) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}
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
                onClick={() => toggleSet(setEmploymentTypes, t)}
                className={`px-3 py-1.5 rounded-md border text-sm ${employmentTypes.has(t) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}
              >
                {t === 'part' ? 'Part-time' : 'Full-time'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 font-medium">Vai trò</div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {[
                ['TNV','Tình nguyện viên'],
                ['CTV','Cộng tác viên'],
                ['NV','Nhân viên'],
              ].map(([val,label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => toggleSet(setRoles, val)}
                  className={`px-3 py-1.5 rounded-md border text-sm ${roles.has(val) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={apply} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Áp dụng</button>
        <button onClick={reset} className="px-3 py-2 border rounded-md text-sm">Đặt lại</button>
        <div className="ml-auto text-xs text-gray-500 flex gap-3">
          <span>Hiển thị: {events.length} mục</span>
          <span>Nguồn: {events.length} mục</span>
        </div>
      </div>
    </div>
  );
}
