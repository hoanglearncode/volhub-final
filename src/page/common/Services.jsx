import React, { useState } from 'react';
import {
  Users,
  Award,
  Star,
  Target,
  Zap,
  Shield,
  Crown,
  Check,
  ShoppingCart,
  Plus,
  Phone,
  Sparkles,
  Globe,
  ChevronRight,
  Eye,
  MessageSquare
} from 'lucide-react';

const VolunteerRecruitmentService = () => {
  const [activeTab, setActiveTab] = useState('trial');

  // --- Dữ liệu theo yêu cầu của bạn (3 gói trial) ---
  const trialPackages = [
    {
      id: 'max-trial',
      name: 'VolHub Max Trial',
      price: '2.700.000',
      currency: 'VNĐ',
      short: 'Gói cao cấp nhất — cho tổ chức/dự án lớn cần tuyển nhiều và tăng nhận diện.',
      features: [
        'Số bài đăng tuyển dụng: Tối đa 10 bài/tháng',
        'Duyệt & hiển thị ưu tiên hàng đầu trên trang chủ và chuyên mục chính',
        'Xem và tải CV ứng viên không giới hạn',
        'Truy cập cơ sở dữ liệu tình nguyện viên toàn quốc, phân loại theo khu vực, kỹ năng, độ tuổi',
        'Tư vấn và tối ưu nội dung bài đăng + hướng dẫn chọn từ khóa',
        'Quảng bá bài đăng & thương hiệu trên kênh chính thức VolHub (Fanpage, Website, Email)',
        'Báo cáo hiệu quả chiến dịch (lượt xem, hồ sơ, tỷ lệ tương tác)',
        'Hỗ trợ kỹ thuật & tư vấn chuyên sâu 24/7'
      ],
      highlight: true,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'pro-trial',
      name: 'VolHub Pro Trial',
      price: '1.500.000',
      currency: 'VNĐ',
      short: 'Gói phổ biến — phù hợp tổ chức vừa & nhỏ cần tuyển hiệu quả trong phạm vi trung bình.',
      features: [
        'Số bài đăng tuyển dụng: Tối đa 5 bài/tháng',
        'Bài đăng hiển thị ưu tiên trung bình, được duyệt nhanh',
        'Xem CV ứng viên tối đa 50 hồ sơ/bài đăng',
        'Truy cập cơ sở dữ liệu mở rộng (trong khu vực / nhóm lĩnh vực cụ thể)',
        'Hỗ trợ chỉnh sửa & tư vấn cơ bản cho mỗi bài đăng',
        'Quảng bá chọn lọc trên một vài kênh truyền thông',
        'Báo cáo rút gọn kết quả chiến dịch',
        'Hỗ trợ kỹ thuật tiêu chuẩn trong giờ làm việc'
      ],
      highlight: false,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'eco-plus-trial',
      name: 'VolHub Eco Plus Trial',
      price: '800.000',
      currency: 'VNĐ',
      short: 'Gói tiết kiệm — thích hợp câu lạc bộ sinh viên / dự án nhỏ trải nghiệm nền tảng.',
      features: [
        'Số bài đăng tuyển dụng: Tối đa 2 bài/tháng',
        'Bài đăng hiển thị cơ bản, duyệt trong thời gian tiêu chuẩn',
        'Xem CV ứng viên giới hạn 20 hồ sơ/bài đăng',
        'Truy cập cơ sở dữ liệu cơ bản (ứng viên phù hợp với bài đăng)',
        'Cung cấp mẫu bài đăng sẵn để tự điền và đăng tải',
        'Không bao gồm quảng bá truyền thông',
        'Không có báo cáo thống kê',
        'Hỗ trợ cơ bản qua email'
      ],
      highlight: false,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // Overview stats / features / faqs
  const stats = [
    { number: '15,000+', label: 'Tình nguyện viên đã tuyển', icon: Users },
    { number: '2,500+', label: 'Sự kiện thành công', icon: Award },
    { number: '98%', label: 'Độ hài lòng', icon: Star },
    { number: '150+', label: 'Đối tác tin tưởng', icon: Target }
  ];

  const platformFeatures = [
    { icon: Globe, title: 'Cơ sở dữ liệu rộng', desc: 'Truy cập ứng viên theo khu vực, kỹ năng và độ tuổi' },
    { icon: Zap, title: 'Đăng tin nhanh', desc: 'Tạo & đăng tin trong vài phút, duyệt nhanh theo gói' },
    { icon: Shield, title: 'Bảo mật', desc: 'Cam kết bảo mật thông tin tổ chức & ứng viên' },
    { icon: Sparkles, title: 'Tối ưu hiển thị', desc: 'Tư vấn nội dung & từ khóa tăng lượt tiếp cận' }
  ];

  const faqs = [
    {
      q: 'Làm thế nào để đăng tin tuyển dụng?',
      a: 'Đăng ký tài khoản, chọn gói phù hợp, điền thông tin sự kiện và đăng tải. Hệ thống sẽ xử lý & duyệt theo cấp độ gói.'
    },
    {
      q: 'Số lượng bài đăng có cộng dồn không?',
      a: 'Mỗi gói có giới hạn bài đăng theo tháng; không cộng dồn sang tháng sau (trừ gói tùy chỉnh).'
    },
    {
      q: 'Gói trial có cam kết thời hạn không?',
      a: 'Gói trial dùng thử 7 ngày (miễn phí) — trong thời gian đó bạn có thể trải nghiệm tính năng chính.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* HERO */}
      <header className="relative bg-gradient-to-br from-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm justify-center mx-auto">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="font-medium">GÓI DỊCH VỤ TUYỂN TÌNH NGUYỆN VIÊN — VolHub</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Chọn gói phù hợp — Tuyển dụng nhanh chóng, hiệu quả
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-100 mb-6">
            Ba gói dùng thử thiết kế theo nhu cầu: từ tiết kiệm cho dự án nhỏ đến gói cao cấp cho tổ chức cần quy mô tuyển dụng lớn.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2">
              <ShoppingCart size={18} /> Mua ngay
            </button>
            <button className="bg-white flex gap-2 items-center text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
              <Phone size={18} /> Liên hệ tư vấn
            </button>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                    <Icon size={22} />
                  </div>
                  <div className="text-xl font-bold text-gray-900">{s.number}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TABS + PACKAGES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Tab */}
          <div className="flex justify-center mb-10">
            <div className="bg-white rounded-full shadow-md p-1 inline-flex">
              <button
                onClick={() => setActiveTab('trial')}
                className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === 'trial' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-green-600'}`}
              >
                Gói Trial (Dùng thử)
              </button>
              <button
                onClick={() => setActiveTab('compare')}
                className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === 'compare' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-600'}`}
              >
                So sánh tính năng
              </button>
            </div>
          </div>

          {/* Intro */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{activeTab === 'trial' ? 'Gói Trial — Chọn nhanh & Dùng thử' : 'So sánh chi tiết các gói'}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {activeTab === 'trial'
                ? 'Chọn một trong 3 gói trial để bắt đầu tuyển dụng ngay — mỗi gói được cấu hình sẵn theo nhu cầu thực tế.'
                : 'Bảng so sánh giúp bạn thấy rõ quyền lợi & giới hạn của từng gói để chọn phù hợp.'}
            </p>
          </div>

          {/* Packages Grid or Comparison */}
          {activeTab === 'trial' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trialPackages.map((pkg) => (
                <div key={pkg.id} className={`relative bg-white rounded-2xl shadow-lg border ${pkg.highlight ? 'border-green-500 ring-4 ring-green-50' : 'border-gray-200'}`}>
                  <div className="p-8">
                    <div className={`w-14 h-14 rounded-lg mb-4 flex items-center justify-center text-white bg-gradient-to-br ${pkg.color}`}>
                      <Crown size={22} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{pkg.short}</p>

                    <div className="mb-6">
                      <span className="text-3xl font-extrabold text-gray-900 mr-2">{pkg.price}</span>
                      <span className="text-gray-700 mr-2">{pkg.currency}</span>
                      <span className="text-sm text-red-500">*</span>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-2">
                      <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-green-500 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition">
                        <ShoppingCart size={16} /> Thêm vào giỏ
                      </button>
                      <button className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-white rounded-xl font-semibold bg-gradient-to-r ${pkg.color} shadow`}>
                        <Plus size={16} /> Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow p-6">
              <table className="table-auto w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Tính năng</th>
                    {trialPackages.map((p) => (
                      <th key={p.id} className="px-4 py-3 text-center font-semibold text-gray-800">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* số bài */}
                  <tr className="border-t">
                    <td className="px-4 py-3 text-gray-600">Số lượng bài đăng / tháng</td>
                    <td className="px-4 py-3 text-center">10</td>
                    <td className="px-4 py-3 text-center">5</td>
                    <td className="px-4 py-3 text-center">2</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3 text-gray-600">Thời gian & ưu tiên hiển thị</td>
                    <td className="px-4 py-3 text-center">Ưu tiên hàng đầu + hiển thị trên trang chủ</td>
                    <td className="px-4 py-3 text-center">Ưu tiên trung bình, duyệt nhanh</td>
                    <td className="px-4 py-3 text-center">Hiển thị cơ bản, duyệt tiêu chuẩn</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3 text-gray-600">Xem CV ứng viên</td>
                    <td className="px-4 py-3 text-center">Không giới hạn</td>
                    <td className="px-4 py-3 text-center">Tối đa 50 hồ sơ / bài</td>
                    <td className="px-4 py-3 text-center">Giới hạn 20 hồ sơ / bài</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3 text-gray-600">Truy cập database</td>
                    <td className="px-4 py-3 text-center">Toàn quốc, phân loại chi tiết</td>
                    <td className="px-4 py-3 text-center">Mở rộng theo khu vực/nhóm lĩnh vực</td>
                    <td className="px-4 py-3 text-center">Cơ bản, lọc cơ bản theo bài</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3 text-gray-600">Hỗ trợ nội dung</td>
                    <td className="px-4 py-3 text-center">Tư vấn & tối ưu nội dung + hướng dẫn từ khóa</td>
                    <td className="px-4 py-3 text-center">Hỗ trợ chỉnh sửa & tư vấn cơ bản</td>
                    <td className="px-4 py-3 text-center">Cung cấp mẫu bài đăng sẵn</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3 text-gray-600">Quảng bá truyền thông</td>
                    <td className="px-4 py-3 text-center">Quảng bá trên Fanpage, Website, Email</td>
                    <td className="px-4 py-3 text-center">Quảng bá chọn lọc</td>
                    <td className="px-4 py-3 text-center">Không bao gồm</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3 text-gray-600">Báo cáo</td>
                    <td className="px-4 py-3 text-center">Báo cáo hiệu quả chiến dịch chi tiết</td>
                    <td className="px-4 py-3 text-center">Báo cáo rút gọn</td>
                    <td className="px-4 py-3 text-center">Không có báo cáo</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3 text-gray-600">Hỗ trợ kỹ thuật</td>
                    <td className="px-4 py-3 text-center">Tư vấn & kỹ thuật sâu 24/7</td>
                    <td className="px-4 py-3 text-center">Hỗ trợ tiêu chuẩn (giờ hành chính)</td>
                    <td className="px-4 py-3 text-center">Hỗ trợ cơ bản qua email</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Why choose / features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold">Tại sao chọn VolHub?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">Công nghệ + database giúp tối ưu tốc độ tuyển dụng và chất lượng người tham gia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                    <Icon size={22} />
                  </div>
                  <h4 className="font-semibold mb-2">{f.title}</h4>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ & CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-2xl font-bold mb-4">Câu hỏi thường gặp</h4>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-800 mb-1">{f.q}</div>
                  <div className="text-gray-600 text-sm">{f.a}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-xl flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold mb-3">Bắt đầu với VolHub</h4>
              <p className="text-blue-100 mb-4">Dùng thử 7 ngày miễn phí — không cần thẻ tín dụng. Chỉ được kích hoạt 1 gói tại một thời điểm.</p>

              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-white mt-0.5" /> Dùng thử đầy đủ tính năng cơ bản</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-white mt-0.5" /> Tư vấn lựa chọn gói phù hợp</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-white mt-0.5" /> Hỗ trợ kích hoạt nhanh</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-white text-blue-700 font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                <Plus size={18} /> Đăng ký dùng thử 7 ngày
              </button>
              <a href="tel:1900123456" className="w-full inline-flex items-center justify-center gap-2 py-3 border-2 border-white rounded-lg">
                <Phone size={18} /> Gọi tư vấn: 1900 123 456
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerRecruitmentService;
