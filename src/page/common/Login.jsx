import React from "react";
import { CheckCircle, Lock, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {toast, ToastContainer} from 'react-toastify';
import parseJwtNoLib from "../../utils/tokenParser";
import axios from "axios";
export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithToken} = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginWithProvider = async (provider) => {
    setIsLoading(true);
    const endpoint = `${import.meta.env.VITE_API}/oauth2/authorization/${provider}`;

    try {
      // Thử gọi để lấy redirect URL nếu backend trả JSON hoặc Location header.
      // Note: một số backend trả 302 trực tiếp (thì axios có thể follow). 
      // Thử đọc các chỗ có thể chứa URL và fallback sang window.location.
      const res = await axios.get(endpoint, { validateStatus: () => true, maxRedirects: 0 })
        .catch(err => err.response || null);

      // 1) Nếu backend trả Location header (redirect)
      const locationHeader = res?.headers?.location;
      // 2) Nếu backend trả JSON { url: "..."} hay {redirectUrl: "..."}
      const bodyUrl = res?.data?.url || res?.data?.redirectUrl || res?.data?.redirect_uri;
      // 3) axios.response.request.responseURL (nếu follow redirect)
      const responseURL = res?.request?.responseURL;

      const redirectUrl = locationHeader || bodyUrl || responseURL;

      if (redirectUrl) {
        // điều hướng trình duyệt tới URL của provider (hoặc URL backend trả)
        window.location.href = redirectUrl;
      } else {
        // fallback: chuyển trực tiếp tới endpoint (backend sẽ 302 tới provider)
        window.location.href = endpoint;
      }
    } catch (error) {
      console.error("OAuth login error:", error);
      // fallback an toàn
      window.location.href = endpoint;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => loginWithProvider("google");
  const loginWithFacebook = () => loginWithProvider("facebook");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/auth/token`, {
        email: username.toLowerCase(),
        password: password,
      });
      if (res.data.result?.authenticated && res.data.result.token) {
        // update centralized auth
        loginWithToken(res.data.result.token);

        // parse local để lấy role nhanh (tùy chọn)
        const user = parseJwtNoLib(res.data.result.token);

        // điều hướng ngay (không dùng setTimeout)
        if (user?.scope === "ROLE_ADMIN") navigate("/admin");
        else if (user?.scope === "ROLE_ORGANIZER") navigate("/btc");
        else navigate("/");
      } else {
        toast.error("Đăng nhập thất bại.");
      }
    } catch (error) {
      toast.error(`Lỗi: ${error?.response?.data?.message || error.message}`);
    }finally {
      setIsLoading(false);
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

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-4 lg:p-8">
        <div className="w-full max-w-md">
          <div className="text-center lg:pb-8 lg:pb-10 lg:hidden">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg">
              <img src="/logo.svg" alt="logo" className="rounded-full" />
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center pb-8 lg:pb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 pb-2 lg:pb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Đăng nhập
            </h1>
            <span className="text-gray-600 text-base lg:text-lg">
              Bắt đâu hành trình tình nguyện của bạn
            </span>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl lg:rounded-none shadow-xl lg:shadow-none p-6 lg:p-0">
            <div className="space-y-5 lg:space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block font-semibold text-gray-800 text-sm"
                >
                  Username
                </label>
                <div className="relative ">
                  <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-700 lg:w-5 lg:h-5" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    placeholder="Nhập Username của bạn..."
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-gray-700 w-full pl-10 lg:pl-12 pr-4 py-3 border border-gray-200 lg:border-gray-300 rounded-xl lg:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block font-semibold text-gray-800 text-sm"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-700 lg:w-5 lg:h-5" />
                  </div>
                  <input
                    type={`${isRead ? "text" : "password"}`}
                    name="password"
                    id="password"
                    value={password}
                    placeholder="Nhập mật khẩu của bạn..."
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-gray-700 w-full pl-10 lg:pl-12 pr-4 py-3 border border-gray-200 lg:border-gray-300 rounded-xl lg:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between" role="presentation" aria-hidden="true" tabIndex={-1}>
                <div className="flex items-center justify-between ml-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRead}
                      tabIndex={-1}
                      onChange={(e) => setIsRead(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-600">
                      <span className="inline">Hiện mật khẩu</span>
                    </span>
                  </label>
                </div>

                <Link
                  to="/forgot"
                  tabIndex={-1}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {isLoading ? (
                <button
                  className="w-full bg-gradient-to-r from-blue-400 to-purple-400 bg-blur-md text-white font-semibold py-3 px-4 rounded-xl lg:rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Đang đăng nhập
                  <div className="w-5 h-5 border-t-2 animate-spin ml-2 border-white rounded-full"></div>
                </button>
              ) : (
                <button
                  onClick={()=> {handleSubmit()}}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl lg:rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Đăng nhập
                  <ArrowRight size={18} />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="mt-6 lg:mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 lg:border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Hoặc đăng nhập với
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="mt-4 lg:mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={()=> loginWithGoogle()}
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

            {/* Register Link */}
            <div className="mt-6 lg:mt-8 text-center">
              <span className="text-gray-600 text-sm lg:text-base">
                Bạn chưa có tài khoản?{" "}
              </span>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm lg:text-base hover:underline transition-colors"
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}