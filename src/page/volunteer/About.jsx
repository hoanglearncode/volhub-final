"use client";
import React, { useState, useEffect } from "react";
import {
  Heart,
  Phone,
  Mail,
  Clock,
  Users,
  Globe,
  Award,
  Target,
  Lightbulb,
  Shield,
  Handshake,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";



const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // reveal hero
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // auto rotate testimonials every 6s
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTestimonial((s) => (s + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { number: "75,000+", label: "Tình nguyện viên", icon: Users, color: "from-blue-500 to-blue-600" },
    { number: "3,500+", label: "Dự án hoàn thành", icon: Award, color: "from-blue-600 to-blue-700" },
    { number: "250+", label: "Tổ chức đối tác", icon: Handshake, color: "from-blue-500 to-blue-600" },
    { number: "63+", label: "Tỉnh thành", icon: Globe, color: "from-blue-600 to-blue-700" },
  ];

  const achievements = [
    { icon: Star, title: "Top 1 Nền tảng tình nguyện", desc: "Được bình chọn là nền tảng tình nguyện hàng đầu Việt Nam 2024" },
    { icon: Award, title: "Giải thưởng Công nghệ vì Cộng đồng", desc: "Nhận giải thưởng từ Bộ TT&TT cho đóng góp vì xã hội" },
    { icon: TrendingUp, title: "500M+ giờ tình nguyện", desc: "Tổng số giờ tình nguyện được thực hiện qua nền tảng" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Tình yêu thương",
      description: "Lan tỏa tình yêu thương và sự quan tâm sâu sắc đến cộng đồng thông qua mỗi hành động ý nghĩa.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Shield,
      title: "Minh bạch",
      description: "Cam kết minh bạch trong hoạt động và thông tin, giúp người tham gia hiểu rõ luồng quy trình và nguồn lực.",
      gradient: "from-blue-600 to-blue-700",
    },
    {
      icon: Users,
      title: "Đoàn kết cộng đồng",
      description: "Xây dựng mạng lưới tình nguyện viên đoàn kết, hỗ trợ và phát triển cùng nhau.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Target,
      title: "Tác động bền vững",
      description: "Tạo ra những thay đổi tích cực lâu dài, góp phần xây dựng xã hội tốt đẹp hơn.",
      gradient: "from-blue-600 to-blue-700",
    },
  ];

  const team = [
    {
      name: "Nguyễn Thị Huệ",
      role: "Founder",
      description: "15 năm kinh nghiệm phát triển các dự án tác động xã hội. Từng làm việc tại các tổ chức quốc tế.",
      avatar: "👨‍💼",
      linkedin: "#",
      achievements: "TEDx Speaker, Forbes 30 Under 30",
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Thị Mai",
      role: "Tình nguyện viên 3 năm",
      content: "Nền tảng này đã thay đổi cuộc sống tôi. Tôi đã tìm thấy mục đích sống và kết nối với những người cùng chí hướng.",
      avatar: "👩‍🦰",
      rating: 5,
    },
    {
      name: "Trần Văn Hùng",
      role: "Trưởng phòng tại NGO",
      content: "Việc tìm kiếm tình nguyện viên chất lượng trở nên dễ dàng hơn bao giờ hết. Nền tảng thực sự hiệu quả.",
      avatar: "👨‍💼",
      rating: 5,
    },
    {
      name: "Lê Thị Hoa",
      role: "Sinh viên năm 3",
      content: "Giao diện thân thiện, dễ sử dụng. Tôi đã tham gia nhiều dự án ý nghĩa và học hỏi được rất nhiều.",
      avatar: "👩‍🎓",
      rating: 5,
    },
  ];

  const timeline = [
    { year: "2019", title: "Ý tưởng khởi nguồn", desc: "Nhóm sáng lập gặp nhau tại một dự án tình nguyện và nhận ra nhu cầu kết nối", icon: Lightbulb },
    { year: "2020", title: "Ra mắt MVP", desc: "Phiên bản đầu tiên được phát triển và thử nghiệm với 100 tình nguyện viên", icon: Play },
    { year: "2021", title: "Tăng trưởng vượt bậc", desc: "Đạt 10,000 người dùng và mở rộng ra 20 tỉnh thành trên cả nước", icon: TrendingUp },
    { year: "2022", title: "Đối tác chiến lược", desc: "Hợp tác với 100+ tổ chức và ra mắt ứng dụng di động", icon: Handshake },
    { year: "2023", title: "Công nhận quốc gia", desc: "Nhận các giải thưởng prestigous và đạt 50,000 tình nguyện viên", icon: Award },
    { year: "2024", title: "Dẫn đầu thị trường", desc: "Trở thành nền tảng #1 và chuẩn bị mở rộng quốc tế", icon: Globe },
  ];

  const tabContent = {
    mission: {
      title: "Sứ mệnh & Tầm nhìn",
      content: (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <Target className="mr-3 text-blue-600" size={28} />
              Sứ mệnh của chúng tôi
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
              Chúng tôi tin rằng mỗi con người đều có tiềm năng tạo ra những thay đổi tích cực cho thế giới.
              Sứ mệnh của VolHub là xây dựng cầu nối giữa những trái tim nhân ái và những cơ hội tình nguyện
              ý nghĩa — tạo nên hệ sinh thái tình nguyện bền vững và hiệu quả.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <Globe className="mr-3 text-blue-600" size={28} />
              Tầm nhìn 2030
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              Trở thành nền tảng tình nguyện hàng đầu Đông Nam Á, kết nối 1 triệu tình nguyện viên và tạo ra 1
              tỷ giờ tình nguyện, góp phần xây dựng một xã hội nhân văn và phát triển bền vững.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <CheckCircle className="mr-2 text-blue-600" size={18} />
                  Mục tiêu 2025
                </h4>
                <ul className="space-y-2 text-gray-700 list-inside">
                  <li>• 200,000 tình nguyện viên tích cực</li>
                  <li>• 10,000 dự án cộng đồng</li>
                  <li>• 500 tổ chức đối tác</li>
                  <li>• Mở rộng ra các nước ASEAN</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <TrendingUp className="mr-2 text-blue-600" size={18} />
                  Tác động dự kiến
                </h4>
                <ul className="space-y-2 text-gray-700 list-inside">
                  <li>• 50 triệu người được hỗ trợ</li>
                  <li>• 100 triệu giờ tình nguyện</li>
                  <li>• 1000 tỷ VNĐ giá trị xã hội</li>
                  <li>• Giảm 30% bất bình đẳng xã hội tại các vùng mục tiêu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    story: {
      title: "Hành trình phát triển",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Từ ý tưởng đến hiện thực</h3>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Được truyền cảm hứng từ niềm đam mê, khát khao được cống hiến của người trẻ Việt Nam, đội ngũ VolHub
              hiện thực hóa một cộng đồng nơi mọi người có thể tìm kiếm và chia sẻ hoạt động tình nguyện.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
            <div className="space-y-8 pl-3">
              {timeline.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="relative flex flex-col items-start gap-6">
                    <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">{item.year}</span>
                        <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                      </div>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
    team: {
      title: "Đội ngũ lãnh đạo",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Những người kiến tạo</h3>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Đội ngũ lãnh đạo giàu kinh nghiệm với tầm nhìn chung về một thế giới tốt đẹp hơn
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-lg transition-all group">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="text-3xl bg-gradient-to-br from-blue-500 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                    {member.avatar}
                  </div>
                  <div className="flex flex-col md:flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h4>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 mb-3 text-sm">{member.description}</p>
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500 text-sm">
                      <p className="text-blue-800 font-medium">{member.achievements}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    impact: {
      title: "Tác động & Thành tựu",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Những thành tựu đáng tự hào</h3>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              VolHub tự hào đã mang đến những giá trị cộng đồng được ghi nhận bởi các tổ chức, doanh nghiệp uy tín
              trong và ngoài nước.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-blue-100 text-center hover:shadow-lg transition-all">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <IconComponent size={22} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                  <p className="text-gray-600 text-sm">{achievement.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Testimonial block */}
          <div className="bg-gradient-to-r from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100">
            <h4 className="text-xl font-bold text-blue-900 mb-4 text-center">Lời cảm ơn từ cộng đồng</h4>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{testimonials[currentTestimonial].avatar}</div>
                <div>
                  <h5 className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h5>
                  <p className="text-blue-600 text-sm">{testimonials[currentTestimonial].role}</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-gray-700 italic">"{testimonials[currentTestimonial].content}"</p>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Đọc đánh giá ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial ? "bg-blue-500" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <header className="relative bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28 transition-all duration-700 ease-out transform-gpu">
          <div className={`mx-auto text-center max-w-3xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Chào mừng đến với{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-400 to-yellow-400">
                VolHub
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              VolHub là cộng đồng những người trẻ đam mê chia sẻ và lan tỏa giá trị tốt đẹp đến xã hội. Với mục tiêu
              kết nối những trái tim tình nguyện — những người sẵn sàng đóng góp thời gian, sức lực và kỹ năng để cùng
              nhau tạo nên những thay đổi tích cực. VolHub trở thành cầu nối giữa các tổ chức, dự án cộng đồng và các bạn
              tình nguyện viên, giúp việc tham gia hoạt động thiện nguyện trở nên dễ dàng, minh bạch và đầy cảm hứng.
            </p>

            <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed">
              Mỗi hành động nhỏ đều có sức mạnh tạo nên khác biệt. Dù bạn là ai, bạn đều có thể góp phần xây dựng một
              cộng đồng tốt đẹp hơn.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300 transition"
                aria-label="Đăng ký VolHub"
              >
                <Heart size={18} />
                Đăng ký liền tay - Lan tỏa điều hay
              </Link>
            </div>
          </div>
        </div>

        {/* decorative blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 w-72 h-72 bg-white/8 rounded-full blur-3xl" />
      </header>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Những con số ấn tượng</h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              VolHub mang trong mình giá trị tiềm năng với con số tăng trưởng ấn tượng. Chỉ trong thời gian ngắn, sở hữu
              hơn 500.000 lượt đăng ký mới — minh chứng cho sự nỗ lực và quyết tâm của đội ngũ trẻ. VolHub trở thành cầu
              nối giữa doanh nghiệp, đối tác và tình nguyện viên, cam kết mang tới hành trình gắn bó lâu dài, chất lượng
              và minh bạch trong thông tin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className={`mx-auto mb-4 w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <IconComponent size={28} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Giá trị cốt lõi</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Hành trình xây dựng cộng đồng tình nguyện bền vững và đầy cảm hứng luôn hướng tới những nguyên tắc và giá trị
              nhằm đảm bảo quyền lợi cho tình nguyện viên.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <article key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-white bg-gradient-to-br ${value.gradient} shadow-lg`}>
                    <IconComponent size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed area (tabs + sidebar) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-6 bg-gradient-to-b from-blue-50 to-white rounded-2xl p-4 sm:p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Khám phá thêm</h3>
                <nav aria-label="Nội dung về chúng tôi" className="space-y-3">
                  {Object.entries(tabContent).map(([key, tab]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                        activeTab === key ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow" : "text-gray-700 hover:bg-white hover:shadow-sm"
                      }`}
                      aria-current={activeTab === key ? "true" : "false"}
                    >
                      <span className="font-medium">{tab.title}</span>
                      <ArrowRight size={18} className={`${activeTab === key ? "text-white" : "text-blue-500"}`} />
                    </button>
                  ))}
                </nav>

                <div className="mt-4 pt-4 border-t border-blue-100">
                  <Link to="/register" className="block w-full text-center px-4 py-3 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-500 transition">
                    Đăng ký liền tay - Lan tỏa điều hay
                  </Link>
                </div>
              </div>
            </aside>

            {/* main content */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 mr-4" />
                  {tabContent[activeTab].title}
                </h2>

                <div className="space-y-6 transition-all duration-300">{tabContent[activeTab].content}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Impact */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Tham gia hành trình ý nghĩa</h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-white/90">
            Hãy trở thành một phần của cộng đồng tình nguyện viên năng động và cùng chúng tôi tạo ra những thay đổi
            tích cực, ý nghĩa cho xã hội.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl transition">
              <Heart size={18} />
              Đăng ký tình nguyện viên
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <Calendar className="mx-auto mb-3" size={28} />
              <h4 className="font-semibold">Sự kiện sắp tới</h4>
              <p className="text-sm text-white/90">Tham gia các workshop và hoạt động cộng đồng</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <Trophy className="mx-auto mb-3" size={28} />
              <h4 className="font-semibold">Thành tích nổi bật</h4>
              <p className="text-sm text-white/90">Nhận về các thành tích nổi trội trong quá trình phát triển</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <Users className="mx-auto mb-3" size={28} />
              <h4 className="font-semibold">Kết nối với cộng đồng</h4>
              <p className="text-sm text-white/90">Hướng đến các hoạt động cộng đồng thông qua việc kết nối mở.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Liên hệ với chúng tôi</h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Hãy kết nối với VolHub để cùng nhau tạo nên những thay đổi tích cực trong cộng đồng. 
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6 h-full">
              <div className="bg-white rounded-2xl h-full p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 mr-4" />
                  Thông tin liên hệ
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Địa chỉ</h4>
                      <p className="text-gray-600 text-sm">
                        Tầng 12, Tòa nhà ABC, 123 Nguyễn Trãi<br />
                        Quận Thanh Xuân, Hà Nội
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Điện thoại</h4>
                      <p className="text-gray-600 text-sm">
                        Hotline: <a href="tel:+84901234567" className="text-blue-600 hover:underline">0901 234 567</a><br />
                        Hỗ trợ: <a href="tel:+84907654321" className="text-blue-600 hover:underline">0907 654 321</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600 text-sm">
                        Chung: <a href="mailto:hello@volhub.vn" className="text-blue-600 hover:underline">hello@volhub.vn</a><br />
                        Hỗ trợ: <a href="mailto:support@volhub.vn" className="text-blue-600 hover:underline">support@volhub.vn</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Giờ làm việc</h4>
                      <p className="text-gray-600 text-sm">
                        Thứ 2 - Thứ 6: 8:00 - 18:00<br />
                        Thứ 7: 8:00 - 12:00<br />
                        Chủ nhật: Nghỉ
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4">Theo dõi chúng tôi</h4>
                  <div className="flex space-x-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <span className="text-sm font-semibold">f</span>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-colors">
                      <span className="text-sm font-semibold">📷</span>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
                      <span className="text-sm font-semibold">📧</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-green-500 to-green-600 mr-4" />
                Gửi tin nhắn cho chúng tôi
              </h3>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên lót
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Nguyễn Văn"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Tên
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="An"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="0901234567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ đề
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="volunteer">Đăng ký tình nguyện viên</option>
                    <option value="organization">Hợp tác tổ chức</option>
                    <option value="partnership">Đối tác chiến lược</option>
                    <option value="support">Hỗ trợ kỹ thuật</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tin nhắn
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Chia sẻ với chúng tôi những điều bạn muốn..."
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-600">
                    Tôi đồng ý với <a href="#" className="text-blue-600 hover:underline">điều khoản sử dụng</a> và{" "}
                    <a href="#" className="text-blue-600 hover:underline">chính sách bảo mật</a> của VolHub
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
