import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TestimonialsWidget = () => {
  const [mockTestimonials, setMockTestimonials] = useState([]);
  useEffect(() => {}, []); 
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          Chia sẻ của mọi người
        </h3>
        <Link to="/blog" className="text-sm text-gray-600 hover:text-gray-800">Xem thêm</Link>
      </div>
      

      {mockTestimonials.length > 0 ? (
        <div className="flex flex-col gap-6">
          {mockTestimonials.map((item, i) => (
            <div className="flex items-start gap-4" key={i}>
              <img src={item.avatar} alt={item.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-xs text-gray-500 mb-2">{item.role} • {item.duration}</div>
                <p className="text-gray-700">{item.content}</p>
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
export default TestimonialsWidget;