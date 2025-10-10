import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
export default function OTPVerification() {
  const {user, token, refreshToken} = useAuth();
  const navigate = useNavigate();
  const DIGITS = 6;
  const [values, setValues] = useState(Array(DIGITS).fill("") );
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputsRef.current[0]?.focus?.();
  }, []);

  // When all digits set, auto-submit
  useEffect(() => {
    if (values.every((v) => v !== "")) {
      submitOTP(values.join(""));
    }
  }, [values.join("")]);

  const handleChange = (e, idx) => {
    const char = e.target.value;
    if (!char) {
      updateValue("", idx);
      return;
    }

    // Accept only the first numeric character
    const matched = char.match(/\d/);
    if (!matched) return;
    const digit = matched[0];

    updateValue(digit, idx);
    // move focus to next
    const next = idx + 1;
    if (next < DIGITS) inputsRef.current[next]?.focus?.();
  };

  const updateValue = (val, idx) => {
    setValues((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  const handleKeyDown = (e, idx) => {
    const key = e.key;
    if (key === "Backspace") {
      if (values[idx] === "") {
        const prev = idx - 1;
        if (prev >= 0) {
          updateValue("", prev);
          inputsRef.current[prev]?.focus?.();
        }
      } else {
        updateValue("", idx);
      }
      e.preventDefault();
    }

    if (key === "ArrowLeft") {
      const prev = idx - 1;
      if (prev >= 0) inputsRef.current[prev]?.focus?.();
      e.preventDefault();
    }
    if (key === "ArrowRight") {
      const next = idx + 1;
      if (next < DIGITS) inputsRef.current[next]?.focus?.();
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, DIGITS).split("");
    if (digits.length === 0) return;
    setValues((prev) => {
      const copy = [...prev];
      for (let i = 0; i < DIGITS; i++) {
        copy[i] = digits[i] ?? "";
      }
      return copy;
    });
  };

  const handelReset = async (e)=> {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API}/api/otp/create`,{}, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
      });
      refreshToken();
      toast.success("Gửi thành công. Vui lòng kiểm tra Email!");
    } catch (error) {
      toast.error(`Lỗi: ${error?.response?.data?.message || error.message}`);
    }finally {
      setLoading(false);
      setValues(Array(DIGITS).fill(""));
      inputsRef.current[0]?.focus?.();
    }
  }

  const submitOTP = async (otp) => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/api/otp/verify`,{
        code: otp
      }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      });

      if(res.data?.result){
        if (user?.scope === "ROLE_ADMIN") navigate("/admin");
        else if (user?.scope === "ROLE_ORGANIZER") navigate("/btc");
        else navigate("/");
        setLoading(false);
      }else {
        toast.error("Sai OTP vui lòng kiểm tra lại");
        setLoading(false);
        setValues(Array(DIGITS).fill(""));
        inputsRef.current[0]?.focus?.();
      }
    } catch (err) {
      console.log(err);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-2">Xác thực email</h2>
        <p className="text-sm text-gray-500 mb-6">Nhập mã 6 chữ số đã gửi vào email của bạn.</p>

        <div className="flex items-center justify-between gap-2 mb-4">
          {values.map((val, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              value={val}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={idx === 0 ? handlePaste : undefined}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-full h-14 text-center text-xl font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1"
              aria-label={`OTP digit ${idx + 1}`}
              disabled={loading}
            />
          ))}
        </div>

        <button
          onClick={() => submitOTP(values.join("").toString())}
          disabled={loading || values.some((v) => v === "")}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium disabled:opacity-50"
        >
          {loading ? "Đang xác thực..." : "Xác thực"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          <button
            className="underline"
            onClick={() => {handelReset()}}
          >
            Gửi lại mã
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
