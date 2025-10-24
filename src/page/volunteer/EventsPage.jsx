import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, List, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

import EventSummaryCard from "../../components/common/UserEventCard"; // Nếu bạn lưu file khác đường dẫn thì sửa lại
import NewsUpdatesWidget from "../../components/user/home/NewsUpdatesWidget";
import UpcomingEventsWidget from "../../components/user/home/UpcomingEventsWidget";
import BlogPostsWidget from "../../components/user/home/BlogPostsWidget";
import FAQsWidget from "../../components/user/home/FAQsWidget";
import FilterPanel from "../../components/common/FilterPanel";

// ----------------------- Pagination (tái sử dụng) -----------------------
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        className={`p-2 rounded-lg border-2 transition-all ${
          currentPage === 1
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] h-10 px-3 rounded-lg border-2 font-medium transition-all ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            }`}
            aria-label={`Trang ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
            {page}
          </span>
        )
      )}

      <button
        className={`p-2 rounded-lg border-2 transition-all ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Trang sau"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// ----------------------- Dữ liệu mẫu fallback -----------------------
const sampleFeaturedEvents = [
  {
    id: 1,
    title: "Aquafina Vietnam International Fashion Week 2025",
    slug: "aquafina-vietnam-international-fashion-week-2025",
    category: "Môi trường",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318555/z7109028936008_a65537e87f2bfcff7f1e3f77c600c9c1_z936mc.jpg",
    slotsLeft: 0,
    location: "Hà Nội",
    date: "2025-11-12T08:00:00",
    volunteers: 56,
  },
  {
    id: 2,
    title: "Hạnh phúc học sinh thủ đô - Hà Nội",
    slug: "ho-tro-hoc-bong-tre-em",
    category: "Giáo dục",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028928483_8ba16d5034671c86bab6cc6929c020cb_bouzqn.jpg",
    slotsLeft: 0,
    location: "Hà Nội",
    date: "2025-08-20T09:00:00",
    volunteers: 34,
  },
  {
    id: 3,
    title: "Khám sức khỏe cộng đồng miễn phí",
    slug: "kham-suc-khoe-cong-dong",
    category: "Y tế",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318555/z7109029100703_1ac168147245feb522a03566b7d07eae_pwuqe5.jpg",
    slotsLeft: 0,
    location: "Hà Nội",
    date: "2025-12-05T07:30:00",
    volunteers: 18,
  },
  {
    id: 4,
    title: "Trồng cây xanh ven đường",
    slug: "trong-cay-xanh-ven-duong",
    category: "Môi trường",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109079974801_9d0021971c329740695512d0123f969c_l9qatk.jpg",
    slotsLeft: 8,
    location: "Đường Nguyễn Trãi, Hà Nội",
    date: "2025-11-28T08:00:00",
    volunteers: 72,
  },
  {
    id: 5,
    title: "Hướng nghiệp cho sinh viên năm nhất",
    slug: "huong-nghiep-sinh-vien",
    category: "Giáo dục",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028918873_8df1c77d7acda23cb7e2aeda0f17dbfe_ejtfnr.jpg",
    slotsLeft: 30,
    location: "Hội trường A, Đại học X",
    date: "2025-11-15T13:30:00",
    volunteers: 45,
  },
  {
    id: 6,
    title: "Gian hàng 0 đồng cho người khó khăn",
    slug: "gian-hang-0-dong",
    category: "An sinh",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028913787_f1421e0eedc5c42b23441ff91b03c5e6_fha3jv.jpg",
    slotsLeft: 20,
    location: "Công viên trung tâm, Cần Thơ",
    date: "2025-12-02T09:00:00",
    volunteers: 29,
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (import.meta.env.VITE_API) {
          const res = await axios.get(`${import.meta.env.VITE_API}/api/volunteer/events`, {
            params: { size: itemsPerPage, page: currentPage - 1 },
          });
          if ( res?.data?.code === 0 && res.data.result.length > 0) {
            const data = res.data.result;
            setEvents(data);
            setFilteredEvents(data);
            setTotalElements(res.data.totalElements ?? data.length);
            setTotalPages(Math.max(1, Math.ceil((res.data.totalElements ?? data.length) / itemsPerPage)));
            setLoading(false);
          } else {
            setEvents(sampleFeaturedEvents);
            setFilteredEvents(sampleFeaturedEvents);
            setTotalElements(sampleFeaturedEvents.length);
            setTotalPages(Math.max(1, Math.ceil(sampleFeaturedEvents.length / itemsPerPage)));
          }
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu sự kiện:", err);
        setEvents(sampleFeaturedEvents);
        setFilteredEvents(sampleFeaturedEvents);
        setTotalElements(sampleFeaturedEvents.length);
        setTotalPages(Math.max(1, Math.ceil(sampleFeaturedEvents.length / itemsPerPage)));
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle filter apply from FilterPanel
  const handleFilterApply = (filtered) => {
    // Filtered is expected to be an array of events (from FilterPanel)
    setFilteredEvents(filtered);
    setTotalElements(filtered.length);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / itemsPerPage)));
    setCurrentPage(1);
  };

  // Toggle view mode
  const handleViewModeChange = (mode) => setViewMode(mode);

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
    <div className="min-h-screen mb-6 md:px-16 px-2 bg-gray-50 grid grid-cols-1 md:grid-cols-12 py-2 gap-5">
      <div className="md:col-span-8 flex flex-col space-y-4 mt-2">
        {/* FILTER PANEL */}
        <FilterPanel events={events} onApply={handleFilterApply} />

        <div>
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Các sự kiện tình nguyện mới</h1>
              <p className="text-sm text-gray-500 mt-1">
                Khám phá và tham gia các sự kiện tình nguyện gần bạn
                {totalElements > 0 && <span className="ml-1">({totalElements} sự kiện)</span>}
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 hidden sm:flex">
              <button
                onClick={() => handleViewModeChange("list")}
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm transition-all ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
                aria-pressed={viewMode === "list"}
              >
                <List className="w-4 h-4 mr-2" />
                Chế độ danh sách
              </button>

              <button
                onClick={() => handleViewModeChange("grid")}
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm transition-all ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
                aria-pressed={viewMode === "grid"}
              >
                <Grid className="w-4 h-4 mr-2" />
                Chế độ lưới
              </button>
            </div>
          </div>

          {/* Events Display */}
          <div className="mt-6">
            {(!filteredEvents || filteredEvents.length === 0) ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">Không tìm thấy sự kiện nào</p>
                <p className="text-gray-400 text-sm mt-2">Vui lòng thử điều chỉnh bộ lọc của bạn</p>
              </div>
            ) : viewMode === "list" ? (
              <div className="space-y-4">
                {filteredEvents.map((item, idx) => (
                  <div key={item.id ?? `event-${idx}`}>
                    <EventSummaryCard event={item} state="list" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((item, idx) => (
                  <div key={item.id ?? `event-${idx}`} className="col-span-1">
                    <EventSummaryCard event={item} state="grid" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredEvents && filteredEvents.length > 0 && totalPages > 1 && (
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          )}
        </div>
      </div>

      {/* Sidebar Widgets */}
      <div className="md:col-span-4 space-y-6 hidden md:block">
        <NewsUpdatesWidget />
        <UpcomingEventsWidget />
        <BlogPostsWidget />
        <FAQsWidget />
      </div>
    </div>
  );
}
