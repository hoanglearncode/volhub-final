import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import axios from "axios";

const sampleFeaturedEvents = [
    {
      id: 1,
      title: "Aquafina Vietnam International Fashion Week 2025",
      slug: "aquafina-vietnam-international-fashion-week-2025",
      category: "Môi trường",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318555/z7109028936008_a65537e87f2bfcff7f1e3f77c600c9c1_z936mc.jpg",
      slotsLeft: 0,
      location: "Hà Nội",
      date: "12/11/2025, 08:00",
      volunteers: 56,
    },
    {
      id: 2,
      title: "Hạnh phúc học sinh thủ đô - Hà Nội",
      slug: "ho-tro-hoc-bong-tre-em",
      category: "Giáo dục",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028928483_8ba16d5034671c86bab6cc6929c020cb_bouzqn.jpg",
      slotsLeft: 0,
      location: "Hà Nội",
      date: "20/8/2025, 09:00",
      volunteers: 34,
    },
    {
      id: 3,
      title: "Khám sức khỏe cộng đồng miễn phí",
      slug: "kham-suc-khoe-cong-dong",
      category: "Y tế",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318555/z7109029100703_1ac168147245feb522a03566b7d07eae_pwuqe5.jpg",
      slotsLeft: 0,
      location: "Hà Nội",
      date: "05/12/2025, 07:30",
      volunteers: 18,
    },
    {
      id: 4,
      title: "Trồng cây xanh ven đường",
      slug: "trong-cay-xanh-ven-duong",
      category: "Môi trường",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109079974801_9d0021971c329740695512d0123f969c_l9qatk.jpg",
      slotsLeft: 8,
      location: "Đường Nguyễn Trãi, Hà Nội",
      date: "28/11/2025, 08:00",
      volunteers: 72,
    },
    {
      id: 5,
      title: "Hướng nghiệp cho sinh viên năm nhất",
      slug: "huong-nghiep-sinh-vien",
      category: "Giáo dục",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028918873_8df1c77d7acda23cb7e2aeda0f17dbfe_ejtfnr.jpg",
      slotsLeft: 30,
      location: "Hội trường A, Đại học X",
      date: "15/11/2025, 13:30",
      volunteers: 45,
    },
    {
      id: 6,
      title: "Gian hàng 0 đồng cho người khó khăn",
      slug: "gian-hang-0-dong",
      category: "An sinh",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028913787_f1421e0eedc5c42b23441ff91b03c5e6_fha3jv.jpg",
      slotsLeft: 20,
      location: "Công viên trung tâm, Cần Thơ",
      date: "02/12/2025, 09:00",
      volunteers: 29,
    },
  ];


const UpcomingEventsWidget = () => {
  const [mockUpcomingEvents, setMockUpcomingEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_API}/api/volunteer/events/coming-month`, { params: { size: 6 } });
        console.log("Featured Events Data:", data);
        if(data.data.code === 0 && data.data.result.length > 0) {
          setMockUpcomingEvents(data.data.result || sampleFeaturedEvents);
        } else {
          setMockUpcomingEvents(sampleFeaturedEvents);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu trang chủ", error);
        setMockUpcomingEvents(sampleFeaturedEvents);
      }
    })();
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