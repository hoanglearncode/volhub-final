"use client";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || ""; // backend gửi link: /reset-password?token=...

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // optional: redirect if no token
    if (!token) {
      setError("Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.");
    }
  }, [token]);

  const validatePassword = (pw) => {
    if (pw.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
    if (!/[0-9]/.test(pw)) return "Mật khẩu nên chứa ít nhất 1 chữ số.";
    // thêm rule nếu muốn: uppercase, symbol, etc.
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Thiếu token. Vui lòng kiểm tra email hướng dẫn.");
      return;
    }

    const pwErr = validatePassword(password);
    if (pwErr) {
      setError(pwErr);
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Đặt lại mật khẩu thất bại.");
      }

      setSuccess("Đặt lại mật khẩu thành công. Bạn sẽ được chuyển đến trang đăng nhập...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Đặt lại mật khẩu</h1>
        <p className="text-sm text-slate-600 mb-6">
          Nhập mật khẩu mới. Mật khẩu nên có ít nhất 8 ký tự và chứa chữ số.
        </p>

        <form onSubmit={onSubmit} className="space-y-4" aria-live="polite">
          <div>
            <label className="block text-sm font-medium text-slate-700">Mật khẩu được cấp</label>
            <div className="mt-2 relative">
              <input
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Mật khẩu được cấp"
                aria-required
                aria-describedby="pw-hint"
              />
          
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Mật khẩu mới</label>
            <div className="mt-2 relative">
              <input
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Mật khẩu mới"
                aria-required
                aria-describedby="pw-hint"
              />
          
            </div>
            <div id="pw-hint" className="text-xs text-slate-500 mt-1">
              Ít nhất 8 ký tự, nên chứa chữ số.
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Xác nhận mật khẩu</label>
            <input
              type={visible ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <button
                type="button"
                onClick={() => setVisible((s) => !s)}
                aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                className="flex  items-center gap-2 border px-2 rounded-lg text-sm text-slate-500"
              >
                <Eye size={18}/>{visible ? "Ẩn" : "Hiện"}
          </button>
          <button
            type="submit"
            disabled={loading || !!success}
            className="w-full inline-flex items-center justify-center px-4 py-3 bg-rose-600 text-white font-semibold rounded-lg shadow hover:bg-rose-500 disabled:opacity-60 transition"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <Link to="/login" className="text-blue-600 hover:underline">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
