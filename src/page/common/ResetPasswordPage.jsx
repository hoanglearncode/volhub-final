import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import parseJwtNoLib from "../../utils/tokenParser";
import { useAuth } from "../../context/AuthContext";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const { loginWithToken} = useAuth();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [appPassword, setAppPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [visibleAppPassword, setVisibleAppPassword] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const validatePassword = (pw) => {
    if (!pw || pw.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
    if (!/[0-9]/.test(pw)) return "Mật khẩu nên chứa ít nhất 1 chữ số.";
    if (!/[A-Z]/.test(pw)) return "Mật khẩu nên chứa ít nhất 1 chữ cái in hoa.";
    if (!/[!@#$%^&*()_\-+=[\]{};':\"\\|,.<>/?`~]/.test(pw)) return "Mật khẩu nên chứa ít nhất 1 ký tự đặc biệt.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const val = validatePassword(password.trim()) 
    if(val){
      toast.error("Mật khẩu không đúng định dạng!");
      setError(val);
      return;
    } 
    if (password.trim() !== confirm.trim()) {
      toast.error("Mật khẩu - Xác nhận mật khẩu không khớp!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/api/users/change/forget-password`, {
        email: token,
        appPassword: appPassword,
        password: password,
      });
      console.log(res);
      if (res.data?.code === 0 && res.data?.result) {
        const res = await axios.post(`${import.meta.env.VITE_API}/auth/token`, {
          email: token.toLowerCase(),
          password: password,
        });
        if (res.data.result?.authenticated && res.data.result.token) {
          loginWithToken(res.data.result.token);
          const user = parseJwtNoLib(res.data.result.token);
          if (user?.scope === "ROLE_ORGANIZER") navigate("/btc");
          else navigate("/");
        } else {
          navigate("/login");
        }
      } 
    } catch (err) {
      console.log(err)
      if ( err.response.data?.code === 1001 ) {
        setError("Thông tin email không chính xác!");
        toast.error("Thông tin email không chính xác!");  
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-5">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Đặt lại mật khẩu</h1>
        <p className="text-sm text-slate-600 mb-6">
          Nhập mật khẩu mới. Mật khẩu nên có ít nhất 8 ký tự và chứa chữ số.
        </p>

        <form onSubmit={onSubmit} className="space-y-6" aria-live="polite">
          <div>
            <label className="block text-sm font-medium text-slate-700">Mật khẩu được cấp</label>
            <div className="mt-2 relative">
              <input
                type={visibleAppPassword ? "text" : "password"}
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Mật khẩu được cấp"
                aria-required
                aria-describedby="pw-hint"
              />
              <button
                type="button"
                onClick={() => setVisibleAppPassword((v) => !v)}
                aria-pressed={visibleConfirm}
                aria-label={visibleConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded p-1 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
                <span className="sr-only">{visibleConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}</span>
                {visibleConfirm ? <Eye size={18} aria-hidden /> : <EyeOff size={18} aria-hidden />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700">Mật khẩu mới</label>
            <div className="mt-2 relative"> 
              <input
                type={visiblePassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Mật khẩu mới"
                aria-required
                aria-describedby="pw-hint"
              />
              <button
                type="button"
                onClick={() => setVisiblePassword((v) => !v)}
                aria-pressed={visibleConfirm}
                aria-label={visibleConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded p-1 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
                <span className="sr-only">{visibleConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}</span>
                {visibleConfirm ? <Eye size={18} aria-hidden /> : <EyeOff size={18} aria-hidden />}
              </button>
            </div>
            { error === null ? (
              <div id="pw-hint" className="text-xs text-slate-500 mt-1">
                Ít nhất 8 ký tự, nên chứa chữ số.
              </div>
            ) : (
              <div className="text-sm text-red-600 px-2 pt-2">{error}</div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700">Xác nhận mật khẩu</label>
            <div className="mt-2 relative">
              <input
                type={visibleConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Nhập lại mật khẩu"
                className={`w-full pr-12 px-4 py-3 rounded-lg border border-gray-200 transition-colors outline-none focus:ring-2 focus:ring-blue-200`}/>
              <button
                type="button"
                onClick={() => setVisibleConfirm((v) => !v)}
                aria-pressed={visibleConfirm}
                aria-label={visibleConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded p-1 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
                <span className="sr-only">{visibleConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}</span>
                {visibleConfirm ? <Eye size={18} aria-hidden /> : <EyeOff size={18} aria-hidden />}
              </button>
            </div>
          </div>
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
