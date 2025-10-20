import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import parseJwtNoLib from "../../utils/tokenParser";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { loginWithToken } = useAuth();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const token = params.get("token");
                const refreshToken = params.get("refreshToken");
                const provider = params.get("provider");

                if (!token || !refreshToken) {
                    toast.error("Thiếu token hoặc refresh token, vui lòng đăng nhập lại!");
                    navigate("/login");
                    return;
                }

                // Lưu token tạm vào localStorage (hoặc sessionStorage)
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("provider", provider || "");

                // Cập nhật AuthContext (để các component khác biết user đã đăng nhập)
                loginWithToken(token);

                // Giải mã JWT để điều hướng theo quyền
                const user = parseJwtNoLib(token);
                if (user?.scope === "ROLE_ADMIN") navigate("/admin");
                else if (user?.scope === "ROLE_ORGANIZER") navigate("/organizer");
                else navigate("/");

            } catch (err) {
                console.error("Lỗi callback:", err);
                toast.error("Đăng nhập thất bại. Vui lòng thử lại!");
                navigate("/login");
            }
        };

        handleOAuthCallback();
    }, [navigate, loginWithToken]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Đang xác thực, vui lòng chờ...</p>
            </div>
        </div>
    );
}