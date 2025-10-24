import React, { useEffect, useState } from "react";
import { Bell, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const sampleBlogPosts = [
  {
    id: 101,
    slug: "hanh-trinh-cua-minh-khi-lam-tinh-nguyen",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109110921139_effab7eac081da9e902324a6a3c82f5a_m5gtqe.jpg",
    title: "Hành trình của mình khi làm tình nguyện ở miền núi",
    author: "Lan Nguyễn",
    comments: 12,
    excerpt:
      "Chia sẻ trải nghiệm, khó khăn và niềm vui khi tham gia hoạt động thiện nguyện tại vùng cao.",
    date: "2025-09-20T10:00:00",
    readTime: "6 phút",
    views: 1200,
    likes: 95,
    category: "Môi trường",
    featured: true
  },
  {
    id: 102,
    slug: "chia-se-kinh-nghiem-to-chuc-su-kien",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109086172895_b1c94141809c0b5184e888a1c145db95_lqudg2.jpg",
    title: "Chia sẻ kinh nghiệm tổ chức sự kiện thiện nguyện nhỏ",
    author: "Minh Trần",
    comments: 8,
    excerpt:
      "Checklist, mẹo vận hành và cách kêu gọi tài trợ cho sự kiện cộng đồng quy mô nhỏ.",
    date: "2025-10-03T14:30:00",
    readTime: "5 phút",
    views: 890,
    likes: 47,
    category: "Hoạt động",
    featured: true
  },
  {
    id: 103,
    slug: "nhung-khoanh-khac-khong-the-quen",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109080260322_32ac4071981d2bfdd527deee7236578b_nx3k51.jpg",
    title: "Những khoảnh khắc không thể quên khi đi trao quà",
    author: "Huyền Phạm",
    comments: 21,
    excerpt:
      "Kỷ niệm đẹp khi mang niềm vui đến những gia đình khó khăn, những bài học cảm động.",
    date: "2025-07-18T08:00:00",
    readTime: "4 phút",
    views: 2350,
    likes: 210,
    category: "An sinh",
    featured: false
  },
  {
    id: 104,
    slug: "loi-khuyen-cho-tinh-nguyen-vien-moi",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109155569192_f66e3af8802e7886cb71df0519df037c_bsahh9.jpg",
    title: "Lời khuyên cho tình nguyện viên mới: chuẩn bị gì trước khi đi?",
    author: "Quốc Bảo",
    comments: 5,
    excerpt:
      "Danh sách cần chuẩn bị, cách giao tiếp với cộng đồng địa phương và bảo vệ sức khoẻ khi đi dài ngày.",
    date: "2025-06-01T09:30:00",
    readTime: "3 phút",
    views: 410,
    likes: 28,
    category: "Hướng dẫn",
    featured: false
  },
  {
    id: 105,
    slug: "ket-noi-cung-nhung-nguoi-ban-moi",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109086625073_1fe2d64159a2b7382f0782c37596551e_ebnzgy.jpg",
    title: "Kết nối cùng những người bạn mới qua dự án cộng đồng",
    author: "Thanh Hà",
    comments: 9,
    excerpt:
      "Cách tạo mối quan hệ bền vững với đồng đội và tình nguyện viên sau dự án kết thúc.",
    date: "2025-10-11T18:00:00",
    readTime: "4 phút",
    views: 760,
    likes: 64,
    category: "Kết nối",
    featured: false
  },
  {
    id: 106,
    slug: "lam-the-nao-de-quan-ly-thoi-gian-hieu-qua",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318550/z7109682571210_fd02d80da162557732917e776d28f54b_fanfhv.jpg",
    title: "Làm thế nào để quản lý thời gian khi tham gia nhiều dự án?",
    author: "Hoàng Việt",
    comments: 3,
    excerpt:
      "Kỹ thuật Pomodoro, ưu tiên công việc và cách giữ sự cân bằng giữa học/tập và tình nguyện.",
    date: "2025-05-21T07:45:00",
    readTime: "5 phút",
    views: 320,
    likes: 24,
    category: "Kỹ năng",
    featured: false
  }
];

const NewsUpdatesWidget = () => {
  const [mockNewsUpdates, setMockNewsUpdates] = useState([]);

  useEffect(() => {
    const loaded = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/volunteer/posts/top5`); 
        if(res.data.code === 0 && res.data.result.length > 0) {
          setMockNewsUpdates(res.data.result);
        } else {
          setMockNewsUpdates(sampleBlogPosts);
        }
      } catch (error) {
        console.log(error);
        setMockNewsUpdates(sampleBlogPosts);
      }
    }
    loaded();
  }, []);

  return (
    <div className="bg-gradient-to-br flex flex-col from-purple-50 to-blue-50 min-h-80 rounded-2xl shadow-lg p-6 border border-purple-100">
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