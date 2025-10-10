import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Search, User, FileText, Settings, BarChart3, MessageSquare, Phone, Mail, HelpCircle, Book, Video, Download } from 'lucide-react';

const RecruiterSupportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeSection, setActiveSection] = useState('getting-started');

  const navigationItems = [
    { id: 'getting-started', label: 'Bắt Đầu', icon: Book },
    { id: 'job-posting', label: 'Đăng Tin Tuyển Dụng', icon: FileText },
    { id: 'candidate-management', label: 'Quản Lý Ứng Viên', icon: User },
    { id: 'analytics', label: 'Báo Cáo & Phân Tích', icon: BarChart3 },
    { id: 'account-settings', label: 'Cài Đặt Tài Khoản', icon: Settings },
  ];

  const faqItems = [
    {
      question: 'Làm thế nào để đăng tin tuyển dụng mới?',
      answer: 'Để đăng tin tuyển dụng mới, hãy vào mục "Đăng Tin" trên thanh điều hướng, điền đầy đủ thông tin công việc, yêu cầu ứng viên và nhấn "Đăng Tin". Tin của bạn sẽ được duyệt trong vòng 2-4 giờ.'
    },
    {
      question: 'Tôi có thể xem được bao nhiêu hồ sơ ứng viên?',
      answer: 'Tùy thuộc vào gói dịch vụ bạn đăng ký. Gói cơ bản cho phép xem 50 hồ sơ/tháng, gói chuyên nghiệp 200 hồ sơ/tháng và gói doanh nghiệp không giới hạn.'
    },
    {
      question: 'Làm sao để tìm kiếm ứng viên phù hợp?',
      answer: 'Sử dụng bộ lọc tìm kiếm nâng cao với các tiêu chí như kinh nghiệm, kỹ năng, địa điểm, mức lương mong muốn. Bạn cũng có thể lưu các tìm kiếm thường dùng để sử dụng sau.'
    },
    {
      question: 'Chi phí đăng tin tuyển dụng là bao nhiêu?',
      answer: 'Tin tuyển dụng cơ bản: 500.000 VND/30 ngày. Tin VIP: 1.200.000 VND/30 ngày. Tin Hot: 2.000.000 VND/30 ngày. Có nhiều gói combo ưu đãi cho nhiều tin đăng.'
    },
    {
      question: 'Tôi có thể chỉnh sửa tin đã đăng không?',
      answer: 'Có, bạn có thể chỉnh sửa tin tuyển dụng bất kỳ lúc nào trong thời gian tin còn hiệu lực. Vào mục "Quản Lý Tin Đăng" và chọn "Chỉnh Sửa".'
    }
  ];

  const guides = {
    'getting-started': {
      title: 'Hướng Dẫn Bắt Đầu',
      content: [
        {
          step: 'Bước 1: Tạo Tài Khoản Nhà Tuyển Dụng',
          details: 'Đăng ký tài khoản với email công ty, xác thực thông tin doanh nghiệp và tải lên giấy phép kinh doanh.'
        },
        {
          step: 'Bước 2: Thiết Lập Hồ Sơ Công Ty',
          details: 'Hoàn thiện thông tin công ty, thêm logo, mô tả về công ty và văn hóa làm việc để thu hút ứng viên.'
        },
        {
          step: 'Bước 3: Nạp Credit Hoặc Chọn Gói Dịch Vụ',
          details: 'Chọn gói dịch vụ phù hợp với nhu cầu tuyển dụng của công ty bạn.'
        },
        {
          step: 'Bước 4: Đăng Tin Tuyển Dụng Đầu Tiên',
          details: 'Sử dụng mẫu có sẵn hoặc tự tạo tin tuyển dụng với đầy đủ thông tin về vị trí và yêu cầu.'
        }
      ]
    },
    'job-posting': {
      title: 'Đăng Tin Tuyển Dụng',
      content: [
        {
          step: 'Tạo Tiêu Đề Hấp Dẫn',
          details: 'Viết tiêu đề rõ ràng, cụ thể về vị trí tuyển dụng. VD: "Tuyển Lập Trình Viên Java - Lương 15-25 triệu - Làm Việc Hybrid"'
        },
        {
          step: 'Mô Tả Công Việc Chi Tiết',
          details: 'Bao gồm trách nhiệm chính, yêu cầu kỹ năng, kinh nghiệm, quyền lợi và môi trường làm việc.'
        },
        {
          step: 'Thiết Lập Câu Hỏi Sàng Lọc',
          details: 'Tạo các câu hỏi để lọc ứng viên phù hợp ngay từ bước đầu, tiết kiệm thời gian review hồ sơ.'
        },
        {
          step: 'Chọn Gói Đăng Tin',
          details: 'Tin thường, tin VIP có logo nổi bật, tin Hot xuất hiện đầu danh sách tìm kiếm.'
        }
      ]
    },
    'candidate-management': {
      title: 'Quản Lý Ứng Viên',
      content: [
        {
          step: 'Xem và Lọc Hồ Sơ',
          details: 'Sử dụng bộ lọc theo kỹ năng, kinh nghiệm, học vấn để tìm ứng viên phù hợp nhất.'
        },
        {
          step: 'Gửi Lời Mời Ứng Tuyển',
          details: 'Chủ động tiếp cận ứng viên tiềm năng bằng cách gửi lời mời ứng tuyển cá nhân hóa.'
        },
        {
          step: 'Quản Lý Pipeline Tuyển Dụng',
          details: 'Theo dõi trạng thái ứng viên: Mới ứng tuyển → Đã xem → Phù hợp → Phỏng vấn → Trúng tuyển/Loại'
        },
        {
          step: 'Trao Đổi với Ứng Viên',
          details: 'Sử dụng hệ thống tin nhắn tích hợp để liên lạc, hẹn lịch phỏng vấn và thông báo kết quả.'
        }
      ]
    },
    'analytics': {
      title: 'Báo Cáo & Phân Tích',
      content: [
        {
          step: 'Theo Dõi Hiệu Suất Tin Đăng',
          details: 'Xem số lượt xem, ứng tuyển, tỷ lệ chuyển đổi của từng tin tuyển dụng.'
        },
        {
          step: 'Phân Tích Nguồn Ứng Viên',
          details: 'Biết ứng viên đến từ kênh nào: tìm kiếm trực tiếp, mạng xã hội, giới thiệu...'
        },
        {
          step: 'Báo Cáo Thời Gian Tuyển Dụng',
          details: 'Theo dõi thời gian từ lúc đăng tin đến khi tìm được ứng viên phù hợp.'
        },
        {
          step: 'So Sánh Hiệu Quả Các Gói Tin',
          details: 'Đánh giá ROI của tin thường, VIP, Hot để tối ưu hóa ngân sách tuyển dụng.'
        }
      ]
    },
    'account-settings': {
      title: 'Cài Đặt Tài Khoản',
      content: [
        {
          step: 'Quản Lý Thông Tin Công Ty',
          details: 'Cập nhật thông tin liên hệ, logo, địa chỉ các chi nhánh và thông tin pháp lý.'
        },
        {
          step: 'Thiết Lập Quyền Người Dùng',
          details: 'Thêm thành viên team HR, phân quyền xem hồ sơ, đăng tin, quản lý tài khoản.'
        },
        {
          step: 'Cài Đặt Thông Báo',
          details: 'Tùy chỉnh nhận thông báo qua email/SMS khi có ứng viên mới, tin sắp hết hạn.'
        },
        {
          step: 'Quản Lý Gói Dịch Vụ',
          details: 'Xem lịch sử thanh toán, gia hạn gói, nâng cấp hoặc hạ cấp dịch vụ.'
        }
      ]
    }
  };

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Trung Tâm Hỗ Trợ</h1>
                <p className="text-sm text-gray-600">Dành cho Nhà Tuyển Dụng</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Hotline: 1900-1234</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Sidebar */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Danh Mục Hướng Dẫn</h3>
              <nav className="space-x-2 flex">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-700 border-b-4 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-blue-500">
                <div className="flex items-center space-x-3">
                  <Video className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Video Hướng Dẫn</h4>
                    <p className="text-sm text-gray-600">Học qua video chi tiết</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-green-500">
                <div className="flex items-center space-x-3">
                  <Download className="w-8 h-8 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Tài Liệu PDF</h4>
                    <p className="text-sm text-gray-600">Tải tài liệu hướng dẫn</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-purple-500">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-8 h-8 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Chat Hỗ Trợ</h4>
                    <p className="text-sm text-gray-600">Tư vấn trực tuyến 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guide Content */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{guides[activeSection].title}</h2>
              <div className="space-y-6">
                {guides[activeSection].content.map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.step}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Câu Hỏi Thường Gặp</h2>
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm câu hỏi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-4 pb-4 text-gray-700 leading-relaxed border-t border-gray-100">
                        <div className="pt-4">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSupportPage;