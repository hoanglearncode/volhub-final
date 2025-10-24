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
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const mockAPI = {
  getStats: () =>
    Promise.resolve([
      { number: "12,000+", label: "Tình nguyện viên", icon: "Users", color: "from-blue-500 to-cyan-500" },
      { number: "850+", label: "Dự án hoàn thành", icon: "Award", color: "from-purple-500 to-pink-500" },
      { number: "120+", label: "Tổ chức đối tác", icon: "Handshake", color: "from-orange-500 to-red-500" },
      { number: "63+", label: "Tỉnh thành", icon: "Globe", color: "from-green-500 to-emerald-500" },
    ]),

  getAchievements: () =>
    Promise.resolve([
      { icon: "Star", title: "Top 1 Nền tảng tình nguyện", desc: "Được bình chọn là nền tảng tình nguyện hàng đầu Việt Nam 2024" },
      { icon: "Award", title: "Giải thưởng Công nghệ vì Cộng đồng", desc: "Nhận giải thưởng từ Bộ TT&TT cho đóng góp vì xã hội" },
      { icon: "TrendingUp", title: "500M+ giờ tình nguyện", desc: "Tổng số giờ tình nguyện được thực hiện qua nền tảng" },
    ]),

  getValues: () =>
    Promise.resolve([
      {
        icon: "Heart",
        title: "Tình yêu thương",
        description: "Lan tỏa tình yêu thương và sự quan tâm sâu sắc đến cộng đồng thông qua mỗi hành động ý nghĩa.",
        gradient: "from-rose-500 to-pink-500",
      },
      {
        icon: "Shield",
        title: "Minh bạch",
        description: "Cam kết minh bạch trong hoạt động và thông tin, giúp người tham gia hiểu rõ luồng quy trình và nguồn lực.",
        gradient: "from-blue-500 to-cyan-500",
      },
      {
        icon: "Users",
        title: "Đoàn kết cộng đồng",
        description: "Xây dựng mạng lưới tình nguyện viên đoàn kết, hỗ trợ và phát triển cùng nhau.",
        gradient: "from-purple-500 to-indigo-500",
      },
      {
        icon: "Target",
        title: "Tác động bền vững",
        description: "Tạo ra những thay đổi tích cực lâu dài, góp phần xây dựng xã hội tốt đẹp hơn.",
        gradient: "from-green-500 to-emerald-500",
      },
    ]),

  getTeam: () =>
    Promise.resolve([
      {
        name: "Nguyễn Thị Huệ",
        role: "Founder & CEO",
        description: "15 năm kinh nghiệm phát triển các dự án tác động xã hội. Từng làm việc tại các tổ chức quốc tế.",
        avatar: "👩‍💼",
        achievements: "TEDx Speaker, Forbes 30 Under 30",
      },
    ]),

  getTestimonials: () =>
    Promise.resolve([
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
    ]),

  getTimeline: () =>
    Promise.resolve([
      { year: "2019", title: "Ý tưởng khởi nguồn", desc: "Nhóm sáng lập gặp nhau tại một dự án tình nguyện và nhận ra nhu cầu kết nối", icon: "Lightbulb" },
      { year: "2020", title: "Ra mắt MVP", desc: "Phiên bản đầu tiên được phát triển và thử nghiệm với 100 tình nguyện viên", icon: "Play" },
      { year: "2021", title: "Tăng trưởng vượt bậc", desc: "Đạt 10,000 người dùng và mở rộng ra 20 tỉnh thành trên cả nước", icon: "TrendingUp" },
      { year: "2022", title: "Đối tác chiến lược", desc: "Hợp tác với 100+ tổ chức và ra mắt ứng dụng di động", icon: "Handshake" },
      { year: "2023", title: "Công nhận quốc gia", desc: "Nhận các giải thưởng prestigious và đạt 50,000 tình nguyện viên", icon: "Award" },
      { year: "2024", title: "Dẫn đầu thị trường", desc: "Trở thành nền tảng #1 và chuẩn bị mở rộng quốc tế", icon: "Globe" },
    ]),
};

// ==================== ICON MAPPER ====================
const iconMap = {
  Users,
  Award,
  Handshake,
  Globe,
  Star,
  TrendingUp,
  Heart,
  Shield,
  Target,
  Lightbulb,
  Play,
};

// ==================== COMPONENTS ====================

// Loading Skeleton
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Stat Card Component
const StatCard = ({ stat, index }) => {
  const IconComponent = iconMap[stat.icon];
  return (
    <div
      className="text-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`mx-auto mb-4 w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${stat.color} shadow-lg transform hover:rotate-6 hover:scale-110 transition-transform duration-300`}
      >
        <IconComponent size={32} />
      </div>
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        {stat.number}
      </div>
      <div className="text-gray-600 mt-2 font-medium">{stat.label}</div>
    </div>
  );
};

// Value Card Component
const ValueCard = ({ value, index }) => {
  const IconComponent = iconMap[value.icon];
  return (
    <article
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white bg-gradient-to-br ${value.gradient} shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}
      >
        <IconComponent size={24} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
      <p className="text-gray-600 leading-relaxed">{value.description}</p>
    </article>
  );
};

// Achievement Badge Component
const AchievementBadge = ({ achievement, index }) => {
  const IconComponent = iconMap[achievement.icon];
  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <IconComponent size={28} />
      </div>
      <h4 className="font-bold text-gray-900 mb-2 text-lg">{achievement.title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{achievement.desc}</p>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500">
    <div className="flex items-start gap-4 mb-4">
      <div className="text-4xl">{testimonial.avatar}</div>
      <div className="flex-1">
        <h5 className="font-bold text-gray-900 text-lg">{testimonial.name}</h5>
        <p className="text-blue-600 text-sm font-medium">{testimonial.role}</p>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>
    </div>
    <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
  </div>
);

// Timeline Item Component
const TimelineItem = ({ item, index }) => {
  const IconComponent = iconMap[item.icon];
  return (
    <div className="relative flex items-start gap-6 group">
      <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg border-4 border-white z-10" />
      <div
        className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-x-2 transition-all duration-300 ml-6"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
            {item.year}
          </span>
          <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <IconComponent size={20} className="text-blue-500" />
            {item.title}
          </h4>
        </div>
        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loading, setLoading] = useState(true);

  // State for data
  const [stats, setStats] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [values, setValues] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [timeline, setTimeline] = useState([]);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [statsData, achievementsData, valuesData, teamData, testimonialsData, timelineData] = await Promise.all([
          mockAPI.getStats(),
          mockAPI.getAchievements(),
          mockAPI.getValues(),
          mockAPI.getTeam(),
          mockAPI.getTestimonials(),
          mockAPI.getTimeline(),
        ]);

        setStats(statsData);
        setAchievements(achievementsData);
        setValues(valuesData);
        setTeam(teamData);
        setTestimonials(testimonialsData);
        setTimeline(timelineData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const id = setInterval(() => {
      setCurrentTestimonial((s) => (s + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [testimonials]);

  // Simple validation
  const validateForm = (values) => {
    const errors = {};
    if (!values.name.trim()) errors.name = "Vui lòng nhập tên.";
    if (!values.email.trim()) {
      errors.email = "Vui lòng nhập email.";
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(values.email)) errors.email = "Email không hợp lệ.";
    }
    if (!values.message.trim() || values.message.trim().length < 10) errors.message = "Nội dung quá ngắn (ít nhất 10 ký tự).";
    return errors;
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((s) => ({ ...s, [name]: value }));
    setFormErrors((s) => ({ ...s, [name]: undefined }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(contactForm);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setSubmitting(true);
    setFormErrors({});
    setSubmitSuccess(false);

    // Simulate sending to backend
    try {
      await new Promise((res) => setTimeout(res, 900));
      // In real app: await api.sendContact(contactForm)
      setSubmitSuccess(true);
      toast.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
      setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("Send contact error:", err);
      setFormErrors({ submit: "Gửi thất bại. Vui lòng thử lại sau." });
    } finally {
      setSubmitting(false);
      // hide success after a while
      setTimeout(() => setSubmitSuccess(false), 6000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-slate-900">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Nền tảng tình nguyện #1 Việt Nam</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Chào mừng đến với{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 animate-pulse">
                VolHub
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-4 max-w-3xl mx-auto">
              VolHub là cộng đồng những người trẻ đam mê chia sẻ và lan tỏa giá trị tốt đẹp đến xã hội. Với mục tiêu kết
              nối những trái tim tình nguyện — những người sẵn sàng đóng góp thời gian, sức lực và kỹ năng để cùng nhau
              tạo nên những thay đổi tích cực.
            </p>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
              Mỗi hành động nhỏ đều có sức mạnh tạo nên khác biệt. Dù bạn là ai, bạn đều có thể góp phần xây dựng một cộng
              đồng tốt đẹp hơn.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105">
                <Heart size={20} className="group-hover:animate-pulse" />
                Đăng ký liền tay - Lan tỏa điều hay
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </header>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Những con số ấn tượng</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              VolHub mang trong mình giá trị tiềm năng với con số tăng trưởng ấn tượng. Chỉ trong thời gian ngắn, sở hữu hơn
              500.000 lượt đăng ký mới — minh chứng cho sự nỗ lực và quyết tâm của đội ngũ trẻ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hành trình xây dựng cộng đồng tình nguyện bền vững và đầy cảm hứng luôn hướng tới những nguyên tắc và giá trị
              nhằm đảm bảo quyền lợi cho tình nguyện viên.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Tham gia hành trình ý nghĩa</h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            Hãy trở thành một phần của cộng đồng tình nguyện viên năng động và cùng chúng tôi tạo ra những thay đổi tích
            cực, ý nghĩa cho xã hội.
          </p>

          <Link to='/register' className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-blue-600 font-bold shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105">
            <Heart size={24} />
            Đăng ký tình nguyện viên
          </Link>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Calendar, title: "Sự kiện sắp tới", desc: "Tham gia các workshop và hoạt động cộng đồng" },
              { icon: Trophy, title: "Thành tích nổi bật", desc: "Nhận về các thành tích nổi trội trong quá trình phát triển" },
              { icon: Users, title: "Kết nối với cộng đồng", desc: "Hướng đến các hoạt động cộng đồng thông qua việc kết nối mở" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <item.icon className="mx-auto mb-4" size={32} />
                <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                <p className="text-sm text-white/90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Liên hệ với chúng tôi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hãy kết nối với VolHub để cùng nhau tạo nên những thay đổi tích cực trong cộng đồng. Chúng tôi luôn sẵn sàng
              lắng nghe và hỗ trợ bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-lg border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <Phone size={16} />
                </div>
                Thông tin liên hệ
              </h3>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Địa chỉ",
                    content: "301 nguyễn trãi, phường Khương Đình, Hà Nội",
                    gradient: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: "volhub.hou@gmail.com | tuyentnvcacsukien@gmail.com",
                    gradient: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: Clock,
                    title: "Giờ làm việc",
                    content: "T2-T6: 8:00-18:00 | T7: 8:00-12:00",
                    gradient: "from-orange-500 to-red-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white transition-all duration-300">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                    >
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-blue-100">
                <h4 className="font-bold text-gray-900 mb-4">Theo dõi chúng tôi</h4>
                <div className="flex gap-3">
                  <Link 
                      to="https://www.facebook.com/profile.php?id=61552728892066"
                      className={`w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg`}
                    >
                      <span className="text-lg font-bold">f</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gửi tin nhắn cho chúng tôi</h3>
              <p className="text-sm text-gray-600 mb-6">Mô tả ngắn: Nếu bạn có câu hỏi hoặc cần hỗ trợ, hãy gửi thông tin bên dưới.</p>

              <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ & Tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                        formErrors.name ? "border-red-400" : "border-gray-200"
                      }`}
                      placeholder="Nguyễn Văn A"
                      aria-invalid={!!formErrors.name}
                    />
                    {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                        formErrors.email ? "border-red-400" : "border-gray-200"
                      }`}
                      placeholder="you@example.com"
                      aria-invalid={!!formErrors.email}
                    />
                    {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="0901 234 567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
                  <input
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Ví dụ: Hợp tác / Hỗ trợ kỹ thuật"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      formErrors.message ? "border-red-400" : "border-gray-200"
                    }`}
                    placeholder="Viết nội dung tin nhắn..."
                    aria-invalid={!!formErrors.message}
                  />
                  {formErrors.message && <p className="text-xs text-red-500 mt-1">{formErrors.message}</p>}
                </div>

                {formErrors.submit && <p className="text-sm text-red-500">{formErrors.submit}</p>}

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    onClick={()=> {handleContact()}}
                    disabled={submitting}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-200 ${
                      submitting ? "opacity-70 cursor-wait" : ""
                    }`}
                  >
                    <Send size={16} />
                    {submitting ? "Đang gửi..." : "Gửi liên hệ"}
                  </button>

                  {submitSuccess && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-100"
                    >
                      <CheckCircle size={18} />
                      <span className="text-sm font-medium">Gửi thành công — chúng tôi sẽ liên hệ sớm nhất có thể.</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default AboutPage;
