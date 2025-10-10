import React, { useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";


const FeaturedEventsCarousel = () => {
  const [mockFeaturedEvents, setMockFeaturedEvents] = useState([
    {
      id: 1,
      title: "Chương trình Mùa hè xanh 2024",
      description: "Cùng 10,000 bạn trẻ tạo nên những thay đổi tích cực",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop",
      participants: 8500,
      duration: "3 tháng",
    },
    {
      id: 2,
      title: "Tiếp sức mùa thi 2024",
      description: "Đồng hành cùng thí sinh trên con đường chinh phục ước mơ",
      image:
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=400&fit=crop",
      participants: 5200,
      duration: "1 tháng",
    },
    {
      id: 3,
      title: "Mái ấm cho em",
      description: "Xây dựng ngôi nhà hạnh phúc cho trẻ em có hoàn cảnh khó khăn",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop",
      participants: 1200,
      duration: "6 tháng",
    },
  ]);

  const [index, setIndex] = useState(0);
  const len = mockFeaturedEvents.length;
  const prev = () => setIndex((i) => (i - 1 + len) % len);
  const next = () => setIndex((i) => (i + 1) % len);

  useEffect(() => {}, []);

  if (mockFeaturedEvents.length === 0) {
    return (
      <div>
        Không có sự kiện nào đáng chú ý 
      </div>
    )
  }

  return (
    // IMPORTANT: flex column + min-h-0 để flex-1 bên trong hoạt động đúng
    <div className="bg-white rounded-2xl h-full shadow-lg p-4 border border-gray-100 flex flex-col min-h-90">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-500" />
          Sự kiện nổi bật
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={prev} className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* phần nội dung sẽ chiếm phần height còn lại */}
      <div className="relative flex-1 rounded-lg overflow-hidden min-h-0">
        {mockFeaturedEvents.map((ev, i) => (
          <div
            key={ev.id}
            className={`absolute inset-0 transition-transform duration-500 ${i === index ? 'translate-x-0' : i < index ? '-translate-x-full' : 'translate-x-full'}`}
          >
            {/* ảnh sẽ phủ đầy vùng (h-full) */}
            <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
            <div className="absolute md:left-4 md:bottom-10 left-2 bottom-2 bg-white/90 p-3 rounded-lg shadow max-w-xs">
              <Link to={`/events/${ev?.slug}`} className="font-bold text-sm">{ev.title}</Link>
              <p className="text-xs text-gray-600 line-clamp-2">{ev.description}</p>
              <div className="text-xs text-gray-500 mt-1">{ev.participants.toLocaleString()} người tham gia • {ev.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FeaturedEventsCarousel;