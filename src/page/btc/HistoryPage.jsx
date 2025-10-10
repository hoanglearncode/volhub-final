import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function HistoryPage () {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState({ isErr: false, message: null });

  const [historyData, setHistoryData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // helper: normalize text (loại bỏ dấu & trim)
  const normalize = (s = '') =>
    s.normalize?.('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

  // load data
  useEffect(()=> {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = {};
        if (res && res.success) {
          if (mounted) {
            setHistoryData(Array.isArray(res.data) ? res.data : []);
          }
        } else {
          throw new Error(res?.message || 'Lỗi khi lấy lịch sử');
        }
      } catch (error) {
        if (mounted) setErr({ isErr: true, message: `Có lỗi xảy ra: ${error.message}` });
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // update visibleData khi historyData hoặc searchValue thay đổi
  useEffect(()=> {
    const q = normalize(searchValue);
    if (!q) {
      setVisibleData(historyData);
      return;
    }
    const filtered = historyData.filter(act => {
      // convert each field to string to be safe
      const a = normalize(String(act?.action || ''));
      const d = normalize(String(act?.description || ''));
      const t = normalize(String(act?.timestamp || ''));
      return a.includes(q) || d.includes(q) || t.includes(q);
    });
    setVisibleData(filtered);
  }, [searchValue, historyData]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  return (
    <div className="w-full bg-white">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, vị trí hoặc kỹ năng..."
              value={searchValue}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Lịch sử hoạt động của bạn</h3>

        {visibleData.length === 0 ? (
          <div className="text-gray-500">Không có dữ liệu</div>
        ) : (
          visibleData.map((item) => (
            <div key={item?.id ?? Math.random()} className="mb-3 p-3 border rounded">
              <div className="font-medium">{item?.action}</div>
              <div className="text-sm text-gray-600">{item?.description}</div>
              <div className="text-xs text-gray-400">{item?.timestamp}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
