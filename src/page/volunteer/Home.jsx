import React, { useState, useEffect } from 'react';
import { Calendar, Users, Heart, ArrowRight, MapPin, Clock, Search, TrendingUp, Award, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
export default function Home() {
  const { token } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredEvents = [
    {
      id: 1,
      title: "Chiến dịch trồng cây xanh Hà Nội",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      location: "Hồ Tây, Hà Nội",
      date: "25/10/2025",
      volunteers: 45,
      slotsLeft: 15,
      category: "Môi trường"
    },
    {
      id: 2,
      title: "Hỗ trợ trẻ em vùng cao học tập",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      location: "Sơn La",
      date: "28/10/2025",
      volunteers: 32,
      slotsLeft: 8,
      category: "Giáo dục"
    },
    {
      id: 3,
      title: "Chăm sóc người cao tuổi neo đơn",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
      location: "Quận Đống Đa, Hà Nội",
      date: "30/10/2025",
      volunteers: 28,
      slotsLeft: 12,
      category: "Cộng đồng"
    }
  ];

  const stats = [
    { icon: Users, label: "Tình nguyện viên", value: "12,500+", color: "bg-blue-500" },
    { icon: Calendar, label: "Sự kiện đã tổ chức", value: "850+", color: "bg-green-500" },
    { icon: Heart, label: "Giờ tình nguyện", value: "45,000+", color: "bg-red-500" },
    { icon: Award, label: "Đối tác", value: "120+", color: "bg-purple-500" }
  ];

  const communities = [
    {
      title: "Làm thế nào để bắt đầu với hoạt động tình nguyện?",
      author: "Nguyễn Văn A",
      comments: 24,
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80"
    },
    {
      title: "Chia sẻ kinh nghiệm từ chiến dịch trồng rừng",
      author: "Trần Thị B",
      comments: 18,
      image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&q=80"
    },
    {
      title: "Kỹ năng cần thiết cho tình nguyện viên",
      author: "Lê Văn C",
      comments: 31,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80"
    }
  ];

  const data = {
    stats: {
      totalVolunteer: 0,
      weEvent: 0,
      houseActive: 0,
      totalPanner: 0,
    },
    event : [
      // 6 sự kiện từ `${import.meta.env.VITE_API}/api/volunteer/events`, 
    ],
    communities: [
      // 6 bài viết từ api bài viết 
    ]
  }

  const handleRegister = (id) => {}
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                transition: 'transform 0.1s'
              }}
            >
              🌟 Cùng nhau tạo nên sự khác biệt
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Hành trình tình nguyện<br />
              <span className="text-yellow-300">bắt đầu từ đây</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Kết nối với hàng nghìn cơ hội tình nguyện ý nghĩa,<br className="hidden md:block" />
              góp phần xây dựng cộng đồng tốt đẹp hơn mỗi ngày
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to='/' className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Tham gia ngay
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to='/events' className="bg-transparent border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                Khám phá sự kiện
              </Link>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-white rounded-xl">
                  <Search className="text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm sự kiện tình nguyện..." 
                    className="flex-1 outline-none text-gray-700"
                  />
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248, 250, 252)"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-16 relative z-10 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 mb-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Sự kiện nổi bật</h2>
            <p className="text-gray-600">Những cơ hội tình nguyện đang chờ bạn tham gia</p>
          </div>
          <Link to='/events?q=all' className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
            Xem tất cả
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <div 
              key={event.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Link to={`/events?c=${event.category}`} className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                  {event.category}
                </Link>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Còn {event.slotsLeft} chỗ
                </div>
              </div>
              
              <div className="p-6">
                <Link to={`/events/${event?.slug}`} className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </Link>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} className="text-blue-500" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} className="text-green-500" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} className="text-purple-500" />
                    <span className="text-sm">{event.volunteers} người đã đăng ký</span>
                  </div>
                </div>

                <button onClick={()=> handleRegister(event.id)} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2">
                  Đăng ký ngay
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 mb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Tại sao nên tham gia?</h2>
            <p className="text-xl text-gray-600">Những giá trị bạn nhận được khi trở thành tình nguyện viên</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Tạo tác động ý nghĩa</h3>
              <p className="text-gray-600 leading-relaxed">
                Góp phần cải thiện cuộc sống của cộng đồng và tạo ra sự thay đổi tích cực cho xã hội.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Phát triển bản thân</h3>
              <p className="text-gray-600 leading-relaxed">
                Rèn luyện kỹ năng mềm, mở rộng kiến thức và trải nghiệm thực tế qua các hoạt động đa dạng.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Kết nối cộng đồng</h3>
              <p className="text-gray-600 leading-relaxed">
                Gặp gỡ những người cùng chí hướng, xây dựng mạng lưới quan hệ và tạo dựng tình bạn đẹp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Posts */}
      <section className="container mx-auto px-4 mb-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Cộng đồng chia sẻ</h2>
            <p className="text-gray-600">Câu chuyện và kinh nghiệm từ các tình nguyện viên</p>
          </div>
          <Link to='/community' className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
            Xem thêm
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {communities.map((post, index) => (
            <Link 
              to={`/community/${post?.slug}`} 
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 cursor-pointer"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!token && 
        <section className="container mx-auto px-4 mb-20">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-1 p-12 text-white">
                <h2 className="text-4xl font-bold mb-4">Sẵn sàng tạo nên sự khác biệt?</h2>
                <p className="text-xl mb-8 text-blue-100">
                  Tham gia cộng đồng tình nguyện viên hôm nay và bắt đầu hành trình ý nghĩa của bạn.
                </p>
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Đăng ký tài khoản miễn phí
                </button>
              </div>
              <div className="flex-1 relative h-80 md:h-96">
                <img 
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                  alt="Join volunteers"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>      
      }
    </div>
  );
}