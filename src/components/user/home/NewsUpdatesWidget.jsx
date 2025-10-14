import React, { useEffect, useState } from "react";
import { Bell, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NewsUpdatesWidget = () => {
  const [mockNewsUpdates, setMockNewsUpdates] = useState([]);

  useEffect(() => {
    const loaded = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/`);  // lấy tin tức nổi bật (max 5 tin)
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra trong quá trình lấy dữ liệu!");
      }
    }
    loaded();
  }, []);

  return (
    <div className="bg-gradient-to-br flex flex-col from-purple-50 to-blue-50 min-h-80 max-h-90 rounded-2xl shadow-lg p-6 border border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-500" />
          Tin tức nổi bật
        </h3>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>

      {mockNewsUpdates.length > 0 ? (
        <div className="space-y-4">
          {mockNewsUpdates.slice(0, 10).map((news) => (
            <div key={news.id} className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
                  <Zap className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <Link to={`/community/${news?.slug}`} className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">{news.title}</Link>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">{news.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{news.type}</span>
                    <span className="text-xs text-gray-500">{news.timestamp}</span>
                  </div>
                </div>
              </div>
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

export default NewsUpdatesWidget;