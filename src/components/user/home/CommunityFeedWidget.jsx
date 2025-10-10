import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Heart, MessageCircle, Share2 } from "lucide-react";
import axios from "axios";
const CommunityFeedWidget = () => {
  const [mockCommunityPosts, setMockCommunityPosts] = useState([
    {
      id: 1,
      author: "Mai Linh",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=50&h=50&fit=crop&crop=face",
      content: "Vừa hoàn thành dự án dạy học ở vùng cao. Cảm ơn VHub đã cho mình cơ hội tuyệt vời này! 🎓❤️",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop",
      likes: 45,
      comments: 12,
      time: "2 giờ trước",
    },
    {
      id: 2,
      author: "Minh Khôi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      content: "Chiến dịch trồng cây hôm nay thật ý nghĩa! 50 cây xanh đã được trồng. 🌱💚",
      likes: 32,
      comments: 8,
      time: "4 giờ trước",
    },
    {
      id: 3,
      author: "Thu Hương",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      content: "Workshop về kỹ năng giao tiếp rất bổ ích. Cảm ơn các mentor đã chia sẻ! 🗣️✨",
      likes: 28,
      comments: 15,
      time: "6 giờ trước",
    },
  ]);
  useEffect(() => {}, []);
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-500" />
          Hoạt động cộng đồng
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {mockCommunityPosts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">{post.author}</span>
                  <span className="text-sm text-gray-500">{post.time}</span>
                </div>
                <p className="text-gray-700 mb-3">{post.content}</p>
                {post.image && (
                  <img src={post.image} alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100">
        <Link to="/community" className="block w-full text-center py-2 text-green-600 font-semibold hover:text-green-700 transition-colors">
          Xem thêm hoạt động
        </Link>
      </div>
    </div>
  );
};
export default CommunityFeedWidget;