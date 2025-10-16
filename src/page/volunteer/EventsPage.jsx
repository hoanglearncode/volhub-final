import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, List, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

import EventSummaryCard from '../../components/common/UserEventCard';
import NewsUpdatesWidget from "../../components/user/home/NewsUpdatesWidget";
import UpcomingEventsWidget from "../../components/user/home/UpcomingEventsWidget";
import BlogPostsWidget from "../../components/user/home/BlogPostsWidget";
import FAQsWidget from "../../components/user/home/FAQsWidget";
import FilterPanel from "../../components/common/FilterPanel";


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
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
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
            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
            : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] h-10 px-3 rounded-lg border-2 font-medium transition-all ${
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
            aria-label={`Trang ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
            {page}
          </span>
        )
      ))}

      <button
        className={`p-2 rounded-lg border-2 transition-all ${
          currentPage === totalPages
            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
            : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
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

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('list'); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/volunteer/events`, 
          { params: { page: currentPage - 1 } }
        ); 
        
        if (response.data.code === 0) {
          const result = response.data.result;
          setEvents(result.content || []);
          setFilteredEvents(result.content || []);
          setTotalPages(result.totalPages || 0);
          setTotalElements(result.totalElements || 0);
        } else {
          toast.error("Không thể tải dữ liệu sự kiện.");
          setEvents([]);
          setFilteredEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Đã xảy ra lỗi khi tải sự kiện.");
        setEvents([]);
        setFilteredEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle filter apply
  const handleFilterApply = (filtered) => {
    setFilteredEvents(filtered);
  };

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

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

        <div className="">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Các sự kiện tình nguyện mới
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Khám phá và tham gia các sự kiện tình nguyện gần bạn
                {totalElements > 0 && (
                  <span className="ml-1">({totalElements} sự kiện)</span>
                )}
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
            {filteredEvents?.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">Không tìm thấy sự kiện nào</p>
                <p className="text-gray-400 text-sm mt-2">
                  Vui lòng thử điều chỉnh bộ lọc của bạn
                </p>
              </div>
            ) : viewMode === "list" ? (
              <div className="space-y-4">
                {filteredEvents?.map((item, idx) => (
                  <div key={item.id ?? `event-${idx}`}>
                    <EventSummaryCard event={item} state="list" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents?.map((item, idx) => (
                  <div key={item.id ?? `event-${idx}`} className="col-span-1">
                    <EventSummaryCard event={item} state="grid" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredEvents?.length > 0 && totalPages > 1 && (
            <Pagination 
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
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