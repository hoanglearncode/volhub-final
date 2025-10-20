import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Search,
  User,
  FileText,
  Settings,
  BarChart3,
  MessageSquare,
  Phone,
  Mail,
  HelpCircle,
  Book,
  Video,
  Download,
  Globe
} from 'lucide-react';

// RecruiterSupportMobile.jsx
// Mobile-first support center UI for recruiters
// - Focused on presentation and touch-friendly layout
// - Removes any non-UI logic (no network calls, no console logs)
// - Accepts data via props for easy integration

export default function RecruiterSupportMobile({
  initialNavigation = null,
  initialGuides = null,
  initialFAQ = null,
  hotline = '1900-1234'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeSection, setActiveSection] = useState('getting-started');

  const navigationItems = initialNavigation || [
    { id: 'getting-started', label: 'Bắt Đầu', icon: Book },
    { id: 'job-posting', label: 'Đăng Tin', icon: FileText },
    { id: 'candidate-management', label: 'Ứng Viên', icon: User },
    { id: 'analytics', label: 'Báo Cáo', icon: BarChart3 },
    { id: 'account-settings', label: 'Tài Khoản', icon: Settings }
  ];

  const guides = initialGuides || {
    'getting-started': {
      title: 'Hướng Dẫn Bắt Đầu',
      content: [
        { step: 'Tạo tài khoản nhà tuyển dụng', details: 'Đăng ký bằng email công ty và hoàn thiện hồ sơ doanh nghiệp.' },
        { step: 'Thiết lập hồ sơ công ty', details: 'Thêm logo, mô tả công ty, và địa chỉ liên hệ.' },
        { step: 'Chọn gói dịch vụ', details: 'Lựa chọn gói phù hợp để bắt đầu tuyển dụng.' },
        { step: 'Đăng tin tuyển dụng', details: 'Sử dụng mẫu hoặc tự tạo tin mới, điền thông tin và đăng.' }
      ]
    },
    'job-posting': {
      title: 'Đăng Tin Tuyển Dụng',
      content: [
        { step: 'Tạo tiêu đề hấp dẫn', details: 'Tiêu đề rõ ràng, nêu vị trí và mức lương (nếu có).' },
        { step: 'Mô tả chi tiết', details: 'Nhiệm vụ, yêu cầu, quyền lợi, địa điểm.' },
        { step: 'Thiết lập câu hỏi sàng lọc', details: 'Thêm câu hỏi để lọc hồ sơ phù hợp.' }
      ]
    },
    'candidate-management': {
      title: 'Quản Lý Ứng Viên',
      content: [
        { step: 'Xem & Lọc hồ sơ', details: 'Sử dụng bộ lọc kỹ năng, kinh nghiệm và vùng miền.' },
        { step: 'Quản lý pipeline', details: 'Theo dõi trạng thái từ nộp -> phỏng vấn -> trúng tuyển.' }
      ]
    },
    'analytics': {
      title: 'Báo Cáo & Phân Tích',
      content: [
        { step: 'Hiệu suất tin đăng', details: 'Xem lượt xem, lượt nộp, tỷ lệ chuyển đổi.' },
        { step: 'Nguồn ứng viên', details: 'Biết ứng viên đến từ kênh nào để tối ưu ngân sách.' }
      ]
    },
    'account-settings': {
      title: 'Cài Đặt Tài Khoản',
      content: [
        { step: 'Thông tin công ty', details: 'Cập nhật liên hệ, chi nhánh, giấy tờ.' },
        { step: 'Quyền truy cập', details: 'Thêm thành viên và phân quyền.' }
      ]
    }
  };

  const faqItems = initialFAQ || [
    { question: 'Làm thế nào để đăng tin tuyển dụng mới?', answer: 'Vào mục Đăng Tin, điền thông tin công việc và gửi. Tin sẽ được duyệt trong 2-4 giờ.' },
    { question: 'Tôi có thể xem được bao nhiêu hồ sơ?', answer: 'Số hồ sơ hiển thị tùy gói dịch vụ; kiểm tra phần Gói Dịch Vụ để biết chi tiết.' },
    { question: 'Chi phí đăng tin là bao nhiêu?', answer: 'Có nhiều gói: Cơ bản, VIP và Hot. Xem chi tiết ở trang gói dịch vụ.' }
  ];

  // Lightweight FAQ search
  const filteredFAQ = useMemo(() => {
    const q = (searchTerm || '').trim().toLowerCase();
    if (!q) return faqItems;
    return faqItems.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }, [faqItems, searchTerm]);

  const toggleFAQ = (i) => setExpandedFAQ(expandedFAQ === i ? null : i);
  const changeSection = (id) => setActiveSection(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mb-18">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-900">Trung tâm Hỗ trợ</h1>
              <div className="text-xs text-gray-500">Dành cho nhà tuyển dụng</div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-xs">
            <Phone className="w-4 h-4" />
            <span className="font-medium">{hotline}</span>
          </button>
        </div>

        {/* Search */}
        <div className="mx-auto px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm hướng dẫn hoặc câu hỏi..."
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 py-4 space-y-4">
        {/* Horizontal navigation (touch-friendly) */}
        <nav className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {navigationItems.map((nav) => {
            const Icon = nav.icon;
            const active = activeSection === nav.id;
            return (
              <button
                key={nav.id}
                onClick={() => changeSection(nav.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${active ? 'bg-blue-600 text-white' : 'bg-white shadow-sm'}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{nav.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center bg-white rounded-lg p-3 shadow-sm">
            <Video className="w-6 h-6 text-blue-600" />
            <span className="text-xs mt-2">Video</span>
          </button>
          <button className="flex flex-col items-center bg-white rounded-lg p-3 shadow-sm">
            <Download className="w-6 h-6 text-green-600" />
            <span className="text-xs mt-2">PDF</span>
          </button>
          <button className="flex flex-col items-center bg-white rounded-lg p-3 shadow-sm">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <span className="text-xs mt-2">Chat</span>
          </button>
        </div>

        {/* Guide content */}
        <section className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{guides[activeSection].title}</h2>
          <div className="space-y-3">
            {guides[activeSection].content.map((c, idx) => (
              <div key={idx} className="border-l-2 border-blue-100 pl-3">
                <div className="text-sm font-medium text-gray-900">{c.step}</div>
                <div className="text-sm text-gray-600 mt-1">{c.details}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Câu hỏi thường gặp</h3>
            <div className="text-xs text-gray-500">{filteredFAQ.length} kết quả</div>
          </div>

          <div className="space-y-3">
            {filteredFAQ.map((f, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                      <Book className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{f.question}</div>
                  </div>
                  <div className="text-gray-400">
                    {expandedFAQ === i ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </button>
                {expandedFAQ === i && (
                  <div className="p-3 border-t text-sm text-gray-700">{f.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Resources */}
        <section className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-2">Cần hỗ trợ thêm?</h3>
          <div className="flex items-center gap-3 mb-3">
            <button className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 justify-center">
              <Mail className="w-4 h-4" />
              Gửi email hỗ trợ
            </button>
            <button className="py-2 px-3 border rounded-lg">
              <Globe className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-gray-500">Hoặc gọi hotline: <span className="font-medium text-gray-900">{hotline}</span></div>
        </section>
      </main>
    </div>
  );
}
