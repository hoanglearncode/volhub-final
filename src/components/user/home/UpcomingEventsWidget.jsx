import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import axios from "axios";
const UpcomingEventsWidget = () => {
  const [mockUpcomingEvents, setMockUpcomingEvents] = useState([]);

  useEffect(() => {
    const loaded = async () => {
      try {
        const event = await axios.get(`${import.meta.env.VITE_API}/api/volunteer/events`); // các sự kiện diễn ra trong
        // 1 tháng tới - sắp xếp theo thời gian - lấy sự kiện gần với ngày hôm nay nhât
        if (event.data.code === 0){
          setMockUpcomingEvents(event.data?.result);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Đã xảy ra lỗi khi tải sự kiện.");
      }
    }

    loaded();
  },[]);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Sự kiện sắp diễn ra
        </h3>
        <Link to="/events" className="text-blue-600 text-sm font-semibold hover:text-blue-700">
          Xem tất cả
        </Link>
      </div>

      {mockUpcomingEvents.length > 0 ? (
        <div className="space-y-4">
          {mockUpcomingEvents.slice(0,10).map((event) => (
            <div key={event?.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/events/${event?.slug}`} className="font-semibold text-gray-900 text-sm line-clamp-1">{event?.title}</Link>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>{new Date(event?.date).toLocaleDateString('vi-VN')}</span>
                  <span>•</span>
                  <span>{event?.time}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{event?.type}</span>
                  <span className="text-xs text-gray-500">{event?.attendees} người tham gia</span>
                </div>
              </div>
              <div className="text-xs text-gray-400">{event?.location && <MapPin className="w-4 h-4 inline-block mr-1" />} </div>
            </div>
          ))}
        </div>

      ) : (
        <div className="rounded-2xl border flex-1 min-h-0 border-dashed border-slate-400 bg-slate-50 p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13l3 3L22 4" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h11" />
          </svg>
          <p className="mt-3 text-sm text-slate-600">Không tìm thấy tin tức nào mới.</p>
        </div>
      )}
    </div>
  );
};
export default UpcomingEventsWidget;