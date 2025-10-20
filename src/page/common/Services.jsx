import React, { useState } from 'react';
import { 
  Users, Award, Target, Zap, Star, ShoppingCart, Plus, 
  Check, Crown, Sparkles, TrendingUp, Globe, Shield,
  Calendar, MapPin, Clock, Phone, Mail, HeartHandshake,
  ChevronRight, Eye, MessageSquare, UserPlus, Gift
} from 'lucide-react';

const VolunteerRecruitmentService = () => {
  const [activeTab, setActiveTab] = useState('trial');

  // Trial packages data
  const trialPackages = [
    {
      name: "VOLHUB MAX TRIAL",
      price: "2.887.500",
      currency: "VNĐ",
      highlight: true,
      description: "Trải nghiệm tuyển dụng tình nguyện viên hiệu quả với vị trí nổi bật trong Việc làm tốt nhất kết hợp cùng các dịch vụ cao cấp, giá đúng thú hấp dẫn.",
      color: "from-green-500 to-green-600",
      features: [
        "Đăng tin không giới hạn 30 ngày",
        "Hiển thị nổi bật trên trang chủ",
        "Tìm kiếm CV ứng viên chất lượng",
        "Hỗ trợ 24/7 qua hotline",
        "Báo cáo thống kê chi tiết"
      ]
    },
    {
      name: "VOLHUB PRO TRIAL", 
      price: "2.448.000",
      currency: "VNĐ",
      description: "Trải nghiệm tuyển dụng tối ưu với vị trí ưu tiên trong Việc làm hấp dẫn kết hợp cùng các dịch vụ cao cấp, giá đúng thú hấp dẫn.",
      color: "from-blue-500 to-blue-600",
      features: [
        "Đăng tin không giới hạn 30 ngày",
        "Vị trí ưu tiên trong kết quả tìm kiếm",
        "Truy cập database ứng viên",
        "Email marketing tự động",
        "Thống kê lượt xem chi tiết"
      ]
    },
    {
      name: "VOLHUB ECO PLUS TRIAL",
      price: "2.112.000", 
      currency: "VNĐ",
      description: "Trải nghiệm tuyển dụng tiết kiệm với vị trí hiển thị trong Đề xuất việc làm liên quan kết hợp cùng các dịch vụ khác, giá đúng thú hấp dẫn.",
      color: "from-purple-500 to-purple-600",
      features: [
        "Đăng tin 15 bài/tháng",
        "Hiển thị trong danh sách chuẩn",
        "Tìm kiếm ứng viên cơ bản",
        "Hỗ trợ email trong giờ hành chính",
        "Thống kê cơ bản"
      ]
    }
  ];

  // Premium packages data
  const premiumPackages = [
    {
      name: "VOLHUB MAX PLUS",
      price: "9.650.000",
      currency: "VNĐ",
      badge: "VIP",
      badgeColor: "bg-yellow-500",
      description: "Tuyển dụng tình nguyện viên hiệu quả với vị trí nổi bật trong Việc làm tốt nhất, x2 lượt đẩy Top, được sử dụng tính năng CV để xuất kết hợp các dịch vụ cao cấp và được bảo hành với nhiều quyền lợi ưu tiên.",
      color: "from-emerald-500 to-emerald-600",
      features: [
        "Đăng tin không giới hạn 60 ngày",
        "Top 1 trong kết quả tìm kiếm",
        "Đẩy tin x2 lần/ngày",
        "AI matching ứng viên",
        "Dedicated account manager",
        "Báo cáo ROI chi tiết",
        "Tích hợp social media"
      ]
    },
    {
      name: "VOLHUB MAX",
      price: "7.500.000",
      currency: "VNĐ", 
      badge: "VIP",
      badgeColor: "bg-yellow-500",
      description: "Tuyển dụng tình nguyện viên hiệu quả với vị trí nổi bật trong Việc làm tốt nhất, được sử dụng tính năng CV để xuất kết hợp các dịch vụ cao cấp và được bảo hành với nhiều quyền lợi ưu tiên.",
      color: "from-blue-500 to-blue-600", 
      features: [
        "Đăng tin không giới hạn 45 ngày",
        "Vị trí nổi bật garanteed",
        "Tìm kiếm CV nâng cao",
        "Multi-channel posting",
        "Priority customer support",
        "Advanced analytics",
        "Branding customization"
      ]
    },
    {
      name: "VOLHUB PRO",
      price: "5.990.000",
      currency: "VNĐ",
      badge: "NEW",
      badgeColor: "bg-green-500", 
      isNew: true,
      description: "Tuyển dụng tình nguyện viên tối ưu với vị trí ưu tiên trong Việc làm hấp dẫn, được sử dụng tính năng CV để xuất kết hợp các dịch vụ cao cấp và được bảo hành.",
      color: "from-indigo-500 to-indigo-600",
      features: [
        "Đăng tin 50 bài/tháng", 
        "Vị trí ưu tiên trong danh sách",
        "CV search với filter",
        "Automated responses",
        "Standard support",
        "Basic reporting",
        "Mobile app access"
      ]
    }
  ];

  const stats = [
    { number: "15,000+", label: "Tình nguyện viên đã tuyển", icon: Users },
    { number: "2,500+", label: "Sự kiện thành công", icon: Award },
    { number: "98%", label: "Độ hài lòng khách hàng", icon: Star },
    { number: "150+", label: "Đối tác tin tưởng", icon: Target }
  ];

  const features = [
    {
      icon: HeartHandshake,
      title: "Tuyển dụng tình nguyện viên chất lượng",
      description: "Database 50,000+ tình nguyện viên tích cực với đa dạng kỹ năng và kinh nghiệm"
    },
    {
      icon: Zap,
      title: "Đăng tin nhanh chóng", 
      description: "Đăng tin tuyển dụng chỉ trong 5 phút, duyệt tự động trong 2 giờ"
    },
    {
      icon: Target,
      title: "Targeting chính xác",
      description: "Nhắm đúng đối tượng theo độ tuổi, kỹ năng, kinh nghiệm và vị trí địa lý"
    },
    {
      icon: Shield,
      title: "Bảo mật thông tin",
      description: "Cam kết bảo mật tuyệt đối thông tin tổ chức và ứng viên theo tiêu chuẩn ISO 27001"
    }
  ];

  const testimonials = [
    {
      name: "Nguyễn Thị Hoa",
      role: "Trưởng ban tổ chức sự kiện",
      company: "Green Vietnam Foundation",
      avatar: "👩‍💼",
      content: "Chỉ trong 3 ngày đã tuyển được 50 tình nguyện viên chất lượng cho chương trình trồng rừng. Hệ thống rất dễ sử dụng!",
      rating: 5
    },
    {
      name: "Trần Văn Minh", 
      role: "Giám đốc dự án",
      company: "Hội Chữ thập đỏ TP.HCM",
      avatar: "👨‍💼",
      content: "Tiết kiệm được 70% thời gian tuyển dụng so với trước. Các tình nguyện viên đều có trách nhiệm và nhiệt tình.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Làm thế nào để đăng tin tuyển dụng tình nguyện viên?",
      answer: "Bạn chỉ cần đăng ký tài khoản, chọn gói dịch vụ phù hợp và điền thông tin sự kiện. Hệ thống sẽ tự động đăng tin và kết nối với ứng viên."
    },
    {
      question: "Tôi có thể tùy chỉnh yêu cầu ứng viên không?",
      answer: "Có, bạn có thể thiết lập các tiêu chí như: độ tuổi, kinh nghiệm, kỹ năng, địa điểm và thời gian có thể tham gia."
    },
    {
      question: "Chi phí dịch vụ như thế nào?",
      answer: "Chúng tôi có nhiều gói dịch vụ từ 2.1 triệu đến 9.6 triệu VNĐ tùy theo nhu cầu. Tất cả đều có thể dùng thử 7 ngày miễn phí."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">VOLHUB SERVICES</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-green-300">TUYỂN DỤNG</span> TÌNH NGUYỆN VIÊN
            </h1>
            <p className="text-xl text-blue-100 mb-4 max-w-4xl mx-auto">
              Trải nghiệm công nghệ sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển dụng của Doanh nghiệp với chi phí tối ưu
            </p>
            <p className="text-lg text-red-300 font-semibold mb-8">
              Nhà tuyển dụng sẽ chỉ được mua và kích hoạt duy nhất 1 gói dịch vụ trong cùng thời điểm
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105">
                Bắt đầu ngay
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all">
                Tư vấn miễn phí
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                    <IconComponent size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Package Selection Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <div className="flex rounded-full overflow-hidden">
                  <button
                    onClick={() => setActiveTab('trial')}
                    className={`px-6 py-3 font-semibold transition-all ${
                      activeTab === 'trial'
                        ? 'bg-green-500 text-white'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    GÓI TRIAL - DÙNG THỬ
                  </button>
                  <button
                    onClick={() => setActiveTab('premium')}
                    className={`px-6 py-3 font-semibold transition-all ${
                      activeTab === 'premium'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    GÓI PREMIUM - HIỆU SUẤT CAO
                  </button>
                </div>
              </div>
            </div>

            {activeTab === 'trial' && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  <span className="text-green-600">VOLHUB TRIAL</span> | ĐĂNG TIN TUYỂN DỤNG
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Trải nghiệm công nghệ sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển dụng của Doanh nghiệp với chi phí tối ưu
                </p>
              </>
            )}

            {activeTab === 'premium' && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  <span className="text-blue-600">VOLHUB</span> | ĐĂNG TIN TUYỂN DỤNG HIỆU SUẤT CAO
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Công nghệ sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển dụng của Doanh nghiệp
                </p>
              </>
            )}
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {(activeTab === 'trial' ? trialPackages : premiumPackages).map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl border-2 overflow-hidden transition-all hover:scale-105 ${
                  pkg.highlight ? 'border-green-500 ring-4 ring-green-100' : 'border-gray-200'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute top-4 right-4">
                    <div className={`${pkg.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
                      {pkg.badge}
                    </div>
                  </div>
                )}
                
                {pkg.isNew && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-green-500 text-white px-6 py-2 text-sm font-bold transform rotate-12 translate-x-4 -translate-y-2 shadow-lg">
                      TÍNH NĂNG MỚI
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    <Crown size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-green-600">{pkg.price}</span>
                    <span className="text-green-600 ml-2">{pkg.currency}</span>
                    <span className="text-red-600 text-lg">*</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all">
                      <ShoppingCart size={20} />
                      Thêm vào giỏ
                    </button>
                    <button className={`w-full px-6 py-3 bg-gradient-to-r ${pkg.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all`}>
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại sao chọn VolHub?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Nền tảng tuyển dụng tình nguyện viên hàng đầu với công nghệ AI và database chất lượng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

   
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sẵn sàng tuyển dụng tình nguyện viên?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Bắt đầu dùng thử miễn phí 7 ngày - Không cần thẻ tín dụng
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
              <Plus size={20} />
              Đăng tin miễn phí
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all flex items-center gap-2">
              <Phone size={20} />
              Liên hệ tư vấn: 1900 123 456
            </button>
          </div>
        </div>
      </section>

      {/* Back to top button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default VolunteerRecruitmentService;