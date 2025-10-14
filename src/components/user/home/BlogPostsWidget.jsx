import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogPostsWidget = () => {
  const [mockBlogPosts, setMockBlogPosts] = useState([
    {
      id: 1,
      title: "5 kỹ năng cần thiết cho tình nguyện viên mới",
      excerpt: "Khám phá những kỹ năng cơ bản giúp bạn thành công trong công việc tình nguyện đầu tiên",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
      author: "Mai Linh",
      date: "2024-09-15",
      readTime: "5 phút",
      category: "Hướng dẫn",
    },
    {
      id: 2,
      title: "Tác động tích cực của hoạt động tình nguyện",
      excerpt: "Nghiên cứu mới cho thấy lợi ích to lớn của việc tham gia hoạt động tình nguyện đối với sức khỏe tinh thần",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop",
      author: "Đức Minh",
      date: "2024-09-12",
      readTime: "7 phút",
      category: "Nghiên cứu",
    },
  ]);
  useEffect(() => {},[]); // cần một api lấy ra max 5 bài viết có đánh giá cao nhât
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">Bài viết hữu ích</h3>
        <Link to="/community" className="text-sm text-gray-600 hover:text-gray-800">Xem thêm</Link>
      </div>

      <div className="flex flex-col gap-4">
        {mockBlogPosts.slice(0,10).map((post) => (
          <article key={post.id} className="flex gap-3 bg-gray-50 rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-28 h-full object-cover" />
            <div className="p-3">
              <Link to={`community/${post?.slug}`} className="font-semibold text-sm">{post.title}</Link>
              <p className="text-xs text-gray-600 my-2 line-clamp-2">{post.excerpt}</p>
              <div className="text-xs text-gray-500">{post.author} • {post.readTime}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
export default BlogPostsWidget;