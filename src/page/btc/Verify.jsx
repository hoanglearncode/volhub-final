import React, { useState } from 'react';
import {
  ArrowLeft, ArrowRight, User, Building, FileText, Check, Mail, 
  Shield, Award, Phone, CheckCircle, XCircle, AlertCircle, 
  Upload, Camera, MapPin, Globe, Users, Clock, BadgeCheck,
  Sparkles, TrendingUp, Target, Star, Lock, Unlock
} from 'lucide-react';

// Email Verification Component
const EmailVerificationStep = ({ onBack, onNext }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto focus next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Bước 1 / 3</span>
            <span className="text-sm font-medium text-blue-600">33% hoàn thành</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '33%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Xác thực Email</h1>
            <p className="text-gray-600 mt-1">Bảo vệ tài khoản và tăng độ tin cậy</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Email Status Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Mail className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Email của bạn</h3>
                  <p className="text-gray-700 mb-4">nguyenvana@email.com</p>
                  
                  {!isVerified ? (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Chúng tôi đã gửi mã xác thực 6 số đến email của bạn. Vui lòng kiểm tra hộp thư và nhập mã bên dưới.
                      </p>
                      
                      {/* Verification Code Input */}
                      <div className="flex gap-2">
                        {verificationCode.map((digit, index) => (
                          <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Gửi lại mã
                        </button>
                        <span className="text-sm text-gray-500">Mã hết hạn sau 05:00</span>
                      </div>

                      <button
                        onClick={() => setIsVerified(true)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Xác thực Email
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
                      <CheckCircle size={20} />
                      <span className="font-medium">Email đã được xác thực</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Phone Verification Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Phone className="text-gray-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Số điện thoại (Tùy chọn)</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Thêm số điện thoại để tăng bảo mật và dễ dàng khôi phục tài khoản
                  </p>
                  
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      placeholder="0901234567"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      Xác thực
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Info */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <BadgeCheck className="text-green-600" size={24} />
                <h3 className="font-semibold text-lg">Lợi ích khi xác thực</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-700">Tăng 40% độ tin cậy với ứng viên</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-700">Bảo vệ tài khoản khỏi truy cập trái phép</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-700">Ưu tiên hiển thị tin tuyển dụng</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-700">Nhận thông báo quan trọng qua email/SMS</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Security Score */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="text-blue-600" size={20} />
                Điểm bảo mật
              </h3>
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="#3b82f6" strokeWidth="8" fill="none"
                      strokeDasharray="351.86" strokeDashoffset="105.56" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">70</div>
                      <div className="text-xs text-gray-500">/ 100</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Hoàn thành xác thực để đạt điểm tối đa
              </p>
            </div>

            {/* Verification Checklist */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Tiến trình xác thực</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-sm font-medium">Tạo tài khoản</span>
                  </div>
                  <span className="text-xs text-green-600">+20đ</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-blue-600" size={16} />
                    <span className="text-sm font-medium">Xác thực Email</span>
                  </div>
                  <span className="text-xs text-blue-600">+30đ</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Lock className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-500">Thông tin tổ chức</span>
                  </div>
                  <span className="text-xs text-gray-500">+30đ</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Lock className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-500">Tin tuyển dụng đầu tiên</span>
                  </div>
                  <span className="text-xs text-gray-500">+20đ</span>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="text-yellow-600" size={20} />
                Cần hỗ trợ?
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Không nhận được email xác thực?
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Liên hệ hỗ trợ →
              </button>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button 
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Quay lại
          </button>
          <button 
            onClick={onNext}
            disabled={!isVerified}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <span>Tiếp tục</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

// Organization Verification Component
const OrganizationVerificationStep = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    taxCode: '',
    address: '',
    city: '',
    district: '',
    companySize: '',
    industry: '',
    website: '',
    description: '',
    logo: null
  });

  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Bước 2 / 3</span>
            <span className="text-sm font-medium text-orange-600">66% hoàn thành</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-600 h-2 rounded-full transition-all duration-300" style={{ width: '66%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Thông tin Tổ chức</h1>
            <p className="text-gray-600 mt-1">Xây dựng hồ sơ tổ chức chuyên nghiệp</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Logo Upload */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Logo công ty</h3>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building className="text-gray-400" size={32} />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                  >
                    <Camera size={18} />
                    Tải logo lên
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Kích thước đề xuất: 500x500px, định dạng PNG hoặc JPG
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Thông tin cơ bản</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên công ty <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Công ty TNHH ABC"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mã số thuế <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.taxCode}
                      onChange={(e) => setFormData({ ...formData, taxCode: e.target.value })}
                      placeholder="0123456789"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quy mô công ty <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                      <option value="">Chọn quy mô</option>
                      <option value="1-10">1-10 nhân viên</option>
                      <option value="11-50">11-50 nhân viên</option>
                      <option value="51-200">51-200 nhân viên</option>
                      <option value="201-500">201-500 nhân viên</option>
                      <option value="500+">Trên 500 nhân viên</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lĩnh vực hoạt động <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option value="">Chọn lĩnh vực</option>
                    <option value="tech">Công nghệ thông tin</option>
                    <option value="education">Giáo dục</option>
                    <option value="healthcare">Y tế</option>
                    <option value="finance">Tài chính - Ngân hàng</option>
                    <option value="retail">Bán lẻ</option>
                    <option value="manufacturing">Sản xuất</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website (Tùy chọn)
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://congty.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Địa chỉ</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ chi tiết <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Số nhà, tên đường"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thành phố <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                      <option value="">Chọn thành phố</option>
                      <option value="hanoi">Hà Nội</option>
                      <option value="hcm">TP. Hồ Chí Minh</option>
                      <option value="danang">Đà Nẵng</option>
                      <option value="haiphong">Hải Phòng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quận/Huyện <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="Quận 1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Company Description */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Giới thiệu công ty</h3>
              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả ngắn về công ty, lĩnh vực hoạt động, văn hóa làm việc..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.description.length} / 500 ký tự
              </p>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Why Verify */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-orange-600" size={24} />
                <h3 className="font-semibold">Tại sao cần xác thực?</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <TrendingUp className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Tăng 3x lượt xem tin tuyển dụng</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Tiếp cận ứng viên chất lượng cao</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Hiển thị huy hiệu "Đã xác thực"</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Ưu tiên trong kết quả tìm kiếm</span>
                </li>
              </ul>
            </div>

            {/* Verification Stats */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Thống kê xác thực</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">12,458</div>
                  <div className="text-sm text-gray-600">Tổ chức đã xác thực</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">85%</div>
                  <div className="text-sm text-gray-600">Tăng lượng ứng tuyển</div>
                </div>
              </div>
            </div>

            {/* Document Requirements */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Giấy tờ cần thiết</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Giấy phép kinh doanh</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Mã số thuế</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Thông tin pháp nhân</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                Thông tin sẽ được bảo mật và chỉ dùng để xác thực
              </p>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button 
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Quay lại
          </button>
          <button 
            onClick={onNext}
            className="flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            <span>Lưu và tiếp tục</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

// First Post Component
const FirstPostStep = ({ onBack, onFinish }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Bước 3 / 3</span>
            <span className="text-sm font-medium text-purple-600">100% hoàn thành</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tin Tuyển Dụng Đầu Tiên</h1>
            <p className="text-gray-600 mt-1">Bắt đầu thu hút ứng viên ngay hôm nay</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Success Message */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-600 rounded-lg">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Chúc mừng! Xác thực thành công</h3>
                  <p className="text-gray-700 mb-3">
                    Tài khoản của bạn đã được xác thực và sẵn sàng để đăng tin tuyển dụng. 
                    Hãy tạo tin đầu tiên để bắt đầu thu hút ứng viên.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <BadgeCheck size={16} />
                    <span>Điểm tin cậy: 100/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Options */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">Bắt đầu nhanh</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <button className="group p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <FileText className="text-purple-600" size={24} />
                    </div>
                    <h4 className="font-semibold">Tạo tin từ đầu</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Tạo tin tuyển dụng hoàn toàn mới với trình soạn thảo đầy đủ tính năng
                  </p>
                  <div className="mt-4 flex items-center text-purple-600 font-medium text-sm">
                    <span>Bắt đầu</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </div>
                </button>

                <button className="group p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Sparkles className="text-blue-600" size={24} />
                    </div>
                    <h4 className="font-semibold">Dùng mẫu có sẵn</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Chọn từ thư viện mẫu và tùy chỉnh theo nhu cầu của bạn
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                    <span>Xem mẫu</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </div>
                </button>

              </div>
            </div>

            {/* Tips for Success */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Award className="text-yellow-500" size={24} />
                Mẹo để tin đăng thành công
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Check className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Tiêu đề hấp dẫn</h4>
                    <p className="text-sm text-gray-600">
                      Sử dụng tiêu đề rõ ràng, cụ thể về vị trí và mức lương để thu hút ứng viên
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Check className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Mô tả chi tiết</h4>
                    <p className="text-sm text-gray-600">
                      Mô tả đầy đủ về công việc, yêu cầu và quyền lợi để ứng viên hiểu rõ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Check className="text-purple-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Thông tin liên hệ</h4>
                    <p className="text-sm text-gray-600">
                      Cung cấp nhiều kênh liên hệ để ứng viên dễ dàng tiếp cận
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Check className="text-orange-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Hình ảnh chất lượng</h4>
                    <p className="text-sm text-gray-600">
                      Thêm ảnh công ty và môi trường làm việc để tăng độ tin cậy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Templates Preview */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">Mẫu tin đăng phổ biến</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Users className="text-blue-600" size={16} />
                    </div>
                    <h4 className="font-medium">Nhân viên văn phòng</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Phù hợp cho vị trí hành chính, kinh doanh</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-medium">Đã dùng: 1,234 lần</span>
                    <ArrowRight className="text-blue-600" size={14} />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <Building className="text-purple-600" size={16} />
                    </div>
                    <h4 className="font-medium">Kỹ thuật viên</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Phù hợp cho vị trí kỹ thuật, IT</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-medium">Đã dùng: 892 lần</span>
                    <ArrowRight className="text-purple-600" size={14} />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <Star className="text-green-600" size={16} />
                    </div>
                    <h4 className="font-medium">Quản lý cấp trung</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Phù hợp cho vị trí quản lý, trưởng phòng</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-medium">Đã dùng: 567 lần</span>
                    <ArrowRight className="text-green-600" size={14} />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                      <Award className="text-orange-600" size={16} />
                    </div>
                    <h4 className="font-medium">Thực tập sinh</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Phù hợp cho sinh viên, người mới</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-medium">Đã dùng: 1,456 lần</span>
                    <ArrowRight className="text-orange-600" size={14} />
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Achievement Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-3">
                  <Award className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-xl text-purple-900">Hoàn thành!</h3>
                <p className="text-sm text-purple-700 mt-1">Bạn đã hoàn thành tất cả bước xác thực</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-sm">Xác thực Email</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">+30đ</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-sm">Thông tin tổ chức</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">+30đ</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="text-orange-600" size={16} />
                    <span className="text-sm">Tin đầu tiên</span>
                  </div>
                  <span className="text-xs text-orange-600 font-medium">+20đ</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">80/100</div>
                <p className="text-xs text-gray-600">Điểm tin cậy hiện tại</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Bước tiếp theo</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-blue-100 rounded">
                    <Check className="text-blue-600" size={14} />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Tạo tin tuyển dụng</p>
                    <p className="text-gray-500 text-xs">Đăng tin đầu tiên để bắt đầu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-gray-100 rounded">
                    <Check className="text-gray-400" size={14} />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-500">Quản lý ứng viên</p>
                    <p className="text-gray-400 text-xs">Xem và phản hồi đơn ứng tuyển</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-gray-100 rounded">
                    <Check className="text-gray-400" size={14} />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-500">Tối ưu hóa tin</p>
                    <p className="text-gray-400 text-xs">Cải thiện hiệu suất tuyển dụng</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Dự báo hiệu suất</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="text-blue-600" size={18} />
                    <span className="text-sm">Lượt xem ước tính</span>
                  </div>
                  <span className="font-bold text-blue-600">500+</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-green-600" size={18} />
                    <span className="text-sm">Ứng viên tiềm năng</span>
                  </div>
                  <span className="font-bold text-green-600">50+</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="text-purple-600" size={18} />
                    <span className="text-sm">Tỷ lệ phù hợp</span>
                  </div>
                  <span className="font-bold text-purple-600">75%</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="text-blue-600" size={20} />
                Hỗ trợ 24/7
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Cần giúp đỡ? Đội ngũ hỗ trợ sẵn sàng giúp bạn
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Liên hệ hỗ trợ →
              </button>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button 
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Quay lại
          </button>
          <div className="flex gap-3">
            <button 
              onClick={onFinish}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Thực hiện sau
            </button>
            <button className="flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
              <FileText size={18} />
              <span>Tạo tin ngay</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Welcome/Default Component
const WelcomePage = ({ onNavigate }) => {
  const steps = [
    {
      id: 'email',
      title: 'Xác thực Email & SĐT',
      completed: false,
      icon: Mail,
      color: 'blue',
      description: 'Bảo vệ tài khoản và tăng độ tin cậy',
      time: '2 phút',
      points: '+30 điểm'
    },
    {
      id: 'organization',
      title: 'Thông tin Tổ chức',
      completed: false,
      icon: Building,
      color: 'orange',
      description: 'Xây dựng hồ sơ tổ chức chuyên nghiệp',
      time: '5 phút',
      points: '+30 điểm'
    },
    {
      id: 'first-post',
      title: 'Tin Tuyển Dụng Đầu Tiên',
      completed: false,
      icon: FileText,
      color: 'purple',
      description: 'Bắt đầu thu hút ứng viên ngay',
      time: '10 phút',
      points: '+20 điểm'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        
        {/* Hero Section */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Chào mừng đến với <span className="text-blue-600">VolunHub</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hoàn thành các bước xác thực để xây dựng hồ sơ tuyển dụng chuyên nghiệp và bắt đầu thu hút ứng viên chất lượng cao
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tiến trình của bạn</h2>
              <p className="text-gray-600">0% hoàn thành - Còn 3 bước để hoàn tất</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">0/100</div>
              <p className="text-sm text-gray-600">Điểm tin cậy</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                onClick={() => onNavigate(step.id)}
                className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-medium text-gray-500">
                  <Clock size={12} />
                  {step.time}
                </div>

                <div className={`inline-flex p-3 rounded-lg mb-4 ${
                  step.color === 'blue' ? 'bg-blue-100' :
                  step.color === 'orange' ? 'bg-orange-100' :
                  'bg-purple-100'
                }`}>
                  <Icon className={`${
                    step.color === 'blue' ? 'text-blue-600' :
                    step.color === 'orange' ? 'text-orange-600' :
                    'text-purple-600'
                  }`} size={28} />
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    step.color === 'blue' ? 'text-blue-600' :
                    step.color === 'orange' ? 'text-orange-600' :
                    'text-purple-600'
                  }`}>
                    {step.points}
                  </span>
                  <ArrowRight className={`group-hover:translate-x-1 transition-transform ${
                    step.color === 'blue' ? 'text-blue-600' :
                    step.color === 'orange' ? 'text-orange-600' :
                    'text-purple-600'
                  }`} size={20} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Sparkles className="text-yellow-500" size={24} />
              Lợi ích khi hoàn thành
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-700">Tăng 3x khả năng tiếp cận ứng viên chất lượng</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-700">Hiển thị huy hiệu "Đã xác thực" trên tin đăng</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-700">Ưu tiên trong kết quả tìm kiếm và gợi ý</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-700">Bảo mật tài khoản tối đa, tránh truy cập trái phép</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-600" size={24} />
              Thống kê nền tảng
            </h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600 mb-1">15,420+</div>
                <p className="text-sm text-gray-600">Nhà tuyển dụng đã xác thực</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600 mb-1">85%</div>
                <p className="text-sm text-gray-600">Tăng tỷ lệ ứng tuyển thành công</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-600 mb-1">4.8/5</div>
                <p className="text-sm text-gray-600">Đánh giá từ người dùng</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('email')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
          >
            <span>Bắt đầu ngay</span>
            <ArrowRight size={20} />
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Chỉ mất 15-20 phút để hoàn thành
          </p>
        </div>

      </div>
    </div>
  );
};

// Main Component
export default function VerificationPage() {
  const [currentStep, setCurrentStep] = useState('welcome');

  const handleNavigate = (step) => {
    setCurrentStep(step);
  };

  const handleBack = () => {
    setCurrentStep('welcome');
  };

  const handleNext = (nextStep) => {
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const handleFinish = () => {
    // Navigate to dashboard or main page
    console.log('Verification completed!');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'email':
        return (
          <EmailVerificationStep
            onBack={handleBack}
            onNext={() => handleNext('organization')}
          />
        );
      case 'organization':
        return (
          <OrganizationVerificationStep
            onBack={handleBack}
            onNext={() => handleNext('first-post')}
          />
        );
      case 'first-post':
        return (
          <FirstPostStep
            onBack={handleBack}
            onFinish={handleFinish}
          />
        );
      default:
        return <WelcomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderStep()}
    </div>
  );
}