import React, { useState, useEffect } from 'react';
import { Calendar, Users, Heart, ArrowRight, MapPin, Clock, Search, TrendingUp, Award, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

export default function Home() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [communities, setCommunities] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Dữ liệu mẫu (6 sự kiện, 6 bài cộng đồng) ---
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

  const sampleCommunities = [
    {
      slug: "hanh-trinh-cua-minh-khi-lam-tinh-nguyen",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109110921139_effab7eac081da9e902324a6a3c82f5a_m5gtqe.jpg",
      title: "Hành trình của mình khi làm tình nguyện ở miền núi",
      author: "Lan Nguyễn",
      comments: 12,
    },
    {
      slug: "chia-se-kinh-nghiem-to-chuc-su-kien",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109086172895_b1c94141809c0b5184e888a1c145db95_lqudg2.jpg",
      title: "Chia sẻ kinh nghiệm tổ chức sự kiện thiện nguyện nhỏ",
      author: "Minh Trần",
      comments: 8,
    },
    {
      slug: "nhung-khoanh-khac-khong-the-quen",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109080260322_32ac4071981d2bfdd527deee7236578b_nx3k51.jpg",
      title: "Những khoảnh khắc không thể quên khi đi trao quà",
      author: "Huyền Phạm",
      comments: 21,
    },
    {
      slug: "loi-khuyen-cho-tinh-nguyen-vien-moi",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109155569192_f66e3af8802e7886cb71df0519df037c_bsahh9.jpg",
      title: "Lời khuyên cho tình nguyện viên mới: chuẩn bị gì trước khi đi?",
      author: "Quốc Bảo",
      comments: 5,
    },
    {
      slug: "ket-noi-cung-nhung-nguoi-ban-moi",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318549/z7109086625073_1fe2d64159a2b7382f0782c37596551e_ebnzgy.jpg",
      title: "Kết nối cùng những người bạn mới qua dự án cộng đồng",
      author: "Thanh Hà",
      comments: 9,
    },
    {
      slug: "lam-the-nao-de-quan-ly-thoi-gian-hieu-qua",
      image: "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318550/z7109682571210_fd02d80da162557732917e776d28f54b_fanfhv.jpg",
      title: "Làm thế nào để quản lý thời gian khi tham gia nhiều dự án?",
      author: "Hoàng Việt",
      comments: 3,
    },
  ];

  // Gán dữ liệu mẫu vào state khi component mount
  useEffect(() => {
    setFeaturedEvents(sampleFeaturedEvents);
    setCommunities(sampleCommunities);
  }, []);

  const stats = [
    { icon: Users, label: "Tình nguyện viên", value: "12,500+", color: "bg-blue-500" },
    { icon: Calendar, label: "Sự kiện đã tổ chức", value: "850+", color: "bg-green-500" },
    { icon: Heart, label: "Giờ tình nguyện", value: "45,000+", color: "bg-red-500" },
    { icon: Award, label: "Đối tác", value: "120+", color: "bg-purple-500" }
  ];

  const handleSearch = () => {
    navigate(`/events?q=${encodeURIComponent(searchValue)}`);
  }

  const handleRegister = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/events/${id}/register`);
      // bạn có thể xử lý response ở đây nếu cần
    } catch (error) {
      console.error("Đăng ký thất bại", error);
    }
  }
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
              <Link to='/events' className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
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
                    value={searchValue}
                    placeholder="Tìm kiếm sự kiện tình nguyện..." 
                    className="flex-1 outline-none text-gray-700"
                  />
                </div>
                <button onClick={()=> handleSearch()} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
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
                <Link to={'/login'} className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Đăng ký tài khoản miễn phí
                </Link>
              </div>
              <div className="flex-1 relative h-80 md:h-96">
                <img 
                  src="https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761315054/z7109682772711_88ef39166e4c0259c896e8ae02714fd2_zlgn1k.jpg"
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