import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (val) =>
    /^\S+@\S+\.\S+$/.test(val);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!validateEmail(email)) {
      setError("Vui lòng nhập email hợp lệ.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/api/users/forget/${email}`);

      if (res.data?.code === 0) {
        setTimeout(() => {
          toast.success("Thông tin lấy lại mật khẩu đã được gửi về gmail của bạn!");
        }, 2000);  
        navigate('/auth/reset');
      }

    } catch (err) {
      setError(err.message || "Không thể gửi yêu cầu, thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Quên mật khẩu</h1>
        <p className="text-sm text-slate-600 mb-6">
          Nhập email bạn đã dùng để đăng ký. Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
        </p>

        <form onSubmit={onSubmit} className="space-y-4" aria-live="polite">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-300 outline-none"
              placeholder="you@example.com"
            />
          </label>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {message && <div className="text-sm text-green-600">{message}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-4 py-3 bg-rose-600 text-white font-semibold rounded-lg shadow hover:bg-rose-500 disabled:opacity-60 transition"
          >
            {loading ? "Đang gửi..." : "Gửi hướng dẫn đặt lại"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <Link to="/login" className="text-blue-600 hover:underline">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
