import React from "react";
import { CheckCircle, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    repassword: ""
  });
  
  // UI state
  const [viewPassword, setViewPassword] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [filterStatus, setFilterStatus] = useState('VOLUNTEER');
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state
  const [errors, setErrors] = useState({});

    const loginWithProvider = async (provider) => {
    setIsLoading(true);
    const endpoint = `${import.meta.env.VITE_API}/oauth2/authorization/${provider}`;

    try {
      const res = await axios.get(endpoint, { validateStatus: () => true, maxRedirects: 0 })
        .catch(err => err.response || null);

      const locationHeader = res?.headers?.location;
      const bodyUrl = res?.data?.url || res?.data?.redirectUrl || res?.data?.redirect_uri;
      const responseURL = res?.request?.responseURL;

      // uu tiên ủl redirect mà backend trả về 
      const redirectUrl = locationHeader || bodyUrl || responseURL;

      if (redirectUrl) {
        // Điều hướng sang trang xác thực Google/Facebook
        window.location.href = redirectUrl;
      } else {
        // fallback — backend sẽ 302 trực tiếp
        window.location.href = endpoint;
      }
    } catch (error) {
      console.error("OAuth login error:", error);
      window.location.href = endpoint; // fallback
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => loginWithProvider("google");
  const loginWithFacebook = () => loginWithProvider("facebook");

  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Họ và tên không được để trống';
        if (value.trim().length < 2) return 'Họ và tên phải có ít nhất 2 ký tự';
        if (value.trim().length > 50) return 'Họ và tên không được quá 50 ký tự';
        if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value.trim())) return 'Họ và tên chỉ được chứa chữ cái và khoảng trắng';
        return '';

      case 'email':
        if (!value.trim()) return 'Email không được để trống';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Email không đúng định dạng';
        if (value.length > 100) return 'Email không được quá 100 ký tự';
        return '';

      case 'password':
        if (!value) return 'Mật khẩu không được để trống';
        if (value.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự';
        if (value.length > 128) return 'Mật khẩu không được quá 128 ký tự';
        if (!/(?=.*[a-z])/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ thường';
        if (!/(?=.*[A-Z])/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ hoa';
        if (!/(?=.*\d)/.test(value)) return 'Mật khẩu phải có ít nhất 1 số';
        if (!/(?=.*[@$!%*?&])/.test(value)) return 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt (@$!%*?&)';
        return '';

      case 'repassword':
        if (!value) return 'Vui lòng nhập lại mật khẩu';
        if (value !== allValues.password) return 'Mật khẩu nhập lại không khớp';
        return '';

      default:
        return '';
    }
  };

  // Handle input change with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Validate field
    const error = validateField(name, value, newFormData);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // If retyping password, also validate repassword
    if (name === 'password' && formData.repassword) {
      const repasswordError = validateField('repassword', formData.repassword, newFormData);
      setErrors(prev => ({
        ...prev,
        repassword: repasswordError
      }));
    }
  };

  // Validate all fields
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field], formData);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!isRead) {
        toast.warning('Bạn cần đồng ý với điều khoản dịch vụ để tiếp tục!');
        setIsLoading(false);
        return;
      }

      if (!validateAllFields()) {
        toast.error('Vui lòng kiểm tra lại thông tin đã nhập!');
        setIsLoading(false);
        return;
      }

      const requestData = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        fullName: formData.fullName.trim(),
        role: filterStatus
      };

      const response = await axios.post(`${import.meta.env.VITE_API}/api/auth/users/create`, requestData);
      if (response?.data?.result) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API}/auth/token`, {
            email: formData.email,
            password: formData.password
          }, { headers: { Accept: 'application/json' }, timeout: 1000 });

          const tokenData = res.data;
          if (tokenData?.result?.authenticated && tokenData.code == 0) {
            loginWithToken(tokenData.result.token);
            try {
              await axios.post(`${import.meta.env.VITE_API}/api/otp/create`, {}, {
                headers: {
                  Authorization: `Bearer ${tokenData.result.token}`,
                }
              });
            } catch (errOtp) {
            }

            navigate('/auth/verify');
            setIsLoading(false);
            return;
          } else {
            toast.error('Xác thực tài khoản thất bại.');
          }
        } catch (innerErr) {
          console.error('Token error:', innerErr);
          const msg = innerErr?.response?.data?.message || innerErr.message || 'Lỗi khi đăng nhập tự động';
          toast.error(String(msg));
        }
      } else {
        // server trả success = false
        const serverMsg = json?.result?.message || json?.message;
        toast.error(serverMsg ? String(serverMsg) : 'Đăng ký không thành công. Vui lòng thử lại!');
      }

    } catch (error) {
      console.error('Registration error:', error);

      if (error.code === 'ECONNABORTED') {
        toast.error('Kết nối bị timeout. Vui lòng thử lại!');
      } else if (error.response) {
        // Nếu server trả HTML bên trong error.response.data, đừng truyền nguyên object vào toast
        const ct = (error.response.headers && error.response.headers['content-type']) || '';
        if (!ct.includes('application/json')) {
          console.error('Error response (non-json):', error.response.data);
          toast.error('Máy chủ trả về nội dung không hợp lệ. Vui lòng thử lại hoặc liên hệ admin.');
        } else {
          const errorMessage = error.response.data?.message || 'Có lỗi xảy ra từ server';
          const statusCode = error.response.status;
          switch (statusCode) {
            case 400:
              toast.error(`Dữ liệu không hợp lệ: ${errorMessage}`);
              break;
            case 409:
              toast.error('Email đã được sử dụng. Vui lòng chọn email khác!');
              break;
            case 422:
              toast.error('Dữ liệu không đúng định dạng. Vui lòng kiểm tra lại!');
              break;
            case 500:
              toast.error('Lỗi server. Vui lòng thử lại sau!');
              break;
            default:
              toast.error(`Lỗi: ${errorMessage}`);
          }
        }
      } else if (error.request) {
        toast.error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!');
      } else {
        toast.error('Có lỗi không xác định xảy ra. Vui lòng thử lại!');
      }
    } finally {
      setIsLoading(false);
    }
  };


  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand/Marketing (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 opacity-90"></div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 opacity-95"></div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 opacity-95"></div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 opacity-90"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          {/* Brand Header */}
          <div className="flex gap-4 items-center text-white pb-8">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img src="/logo.svg" alt="logo" className="rounded-full" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {import.meta.env.VITE_NAME}
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/90 text-lg w-4/5 leading-relaxed mb-8">
            Nền tảng kết nối tình nguyện viên và cộng tác viên 
            để lan tỏa những giá trị nhân văn trong cộng đồng
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex gap-3 text-white items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/30 backdrop-blur-sm flex items-center justify-center">
                <CheckCircle size={18} className="text-purple-300" />
              </div>
              <span className="text-white/90">
                Cơ hội tham gia đa dạng hoạt động thiện nguyện
              </span>
            </div>
            <div className="flex gap-3 text-white items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/30 backdrop-blur-sm flex items-center justify-center">
                <CheckCircle size={18} className="text-purple-300" />
              </div>
              <span className="text-white/90">
                Kết nối cộng đồng người trẻ nhiệt huyết
              </span>
            </div>
            <div className="flex gap-3 text-white items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/30 backdrop-blur-sm flex items-center justify-center">
                <CheckCircle size={18} className="text-purple-300" />
              </div>
              <span className="text-white/90">Học hỏi kỹ năng mềm & phát triển bản thân</span>
            </div>
          </div>
        </div>
      </div>  

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-4 lg:p-8">
        <div className="w-full">
          {/* Mobile Logo (Visible only on mobile) */}
          <div className="text-center pb-8 lg:pb-10 lg:hidden">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg">
              <img src="/logo.svg" alt="logo" className="rounded-full" />
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center pb-8 lg:pb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 pb-2 lg:pb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Đăng ký
            </h1>
            <span className="text-gray-600 text-base lg:text-lg font-semibold">
              Mỗi hành động nhỏ đều có sức mạnh tạo nên khác biệt. 
            </span>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl lg:rounded-none shadow-xl lg:shadow-none p-6 lg:p-0">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5 lg:space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block font-semibold text-gray-800 text-sm">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-700 lg:w-5 lg:h-5" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    placeholder="Nhập họ và tên của bạn..."
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`text-gray-700 w-full pl-10 lg:pl-12 pr-4 py-3 border rounded-xl lg:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                      errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 lg:border-gray-300'
                    }`}
                    disabled={isLoading}
                    required
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-600 text-xs mt-1 ml-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block font-semibold text-gray-800 text-sm">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-700 lg:w-5 lg:h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    placeholder="Nhập email của bạn..."
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`text-gray-700 w-full pl-10 lg:pl-12 pr-4 py-3 border rounded-xl lg:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 lg:border-gray-300'
                    }`}
                    disabled={isLoading}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1 ml-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block font-semibold text-gray-800 text-sm">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-700 lg:w-5 lg:h-5" />
                  </div>
                  <input
                    type={viewPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    placeholder="Nhập mật khẩu của bạn..."
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`text-gray-700 w-full pl-10 lg:pl-12 pr-12 py-3 border rounded-xl lg:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 lg:border-gray-300'
                    }`}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setViewPassword(!viewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 lg:pr-4 flex items-center text-gray-700 hover:text-gray-900"
                    disabled={isLoading}
                  >
                    {viewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1 ml-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="repassword" className="block font-semibold text-gray-800 text-sm">
                  Nhập lại mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-700 lg:w-5 lg:h-5" />
                  </div>
                  <input
                    type={viewPassword ? "text" : "password"}
                    name="repassword"
                    id="repassword"
                    value={formData.repassword}
                    placeholder="Nhập lại mật khẩu của bạn..."
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`text-gray-700 w-full pl-10 lg:pl-12 pr-4 py-3 border rounded-xl lg:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                      errors.repassword ? 'border-red-300 bg-red-50' : 'border-gray-200 lg:border-gray-300'
                    }`}
                    disabled={isLoading}
                    required
                  />
                </div>
                {errors.repassword && (
                  <p className="text-red-600 text-xs mt-1 ml-1">{errors.repassword}</p>
                )}
              </div>

              {/* Options Row */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={viewPassword}
                    onChange={(e) => setViewPassword(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <span className="text-sm font-semibold text-gray-600">
                    Hiện mật khẩu
                  </span>
                </label>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-gray-700"
                  disabled={isLoading}
                >
                  <option value="VOLUNTEER">Tình nguyện viên</option>
                  <option value="ORGANIZER">Ban tổ chức</option>
                </select>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={isRead}
                  onChange={(e) => setIsRead(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 flex-shrink-0"
                  disabled={isLoading}
                  required
                />
                <span className="text-sm text-gray-600">
                  Tôi đã đọc và đồng ý với{" "}
                  <Link to="/terms" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                    Điều khoản dịch vụ
                  </Link>{" "}
                  và{" "}
                  <Link to="/privacy-policy" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                    Chính sách bảo mật
                  </Link>{" "}
                  của {import.meta.env.VITE_NAME} <span className="text-red-500">*</span>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl lg:rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    Đăng ký
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 lg:mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 lg:border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Hoặc đăng ký với
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="mt-4 lg:mt-6 grid grid-cols-2 gap-3">
                <button
                  onclick={()=>loginWithGoogle()}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 lg:border-gray-300 rounded-xl lg:rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  onClick={()=> loginWithFacebook()}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 lg:border-gray-300 rounded-xl lg:rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 mr-2"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>

            {/* Login Link */}
            <div className="mt-6 lg:mt-8 text-center">
              <span className="text-gray-600 text-sm lg:text-base">
                Bạn đã có tài khoản?{" "}
              </span>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm lg:text-base hover:underline transition-colors"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}