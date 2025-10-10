import {Smartphone, Globe, Key, Eye, EyeOff, Lock} from 'lucide-react';
import { useState, useEffect } from 'react';
export default function SecurityTab() {
    const [showPassword, setShowPassword] = useState(false);
    const [twoFAEnabled, setTwoFAEnabled] = useState(false);
    return (
        <div className="space-y-6">
        {/* Change Password */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock size={20} />
            Đổi mật khẩu
            </h3>
            <div className="space-y-4 max-w-md">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu hiện tại</label>
                <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
                <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
                <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <button onClick={() => handleChangePassword()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Cập nhật mật khẩu
            </button>
            </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Key size={20} />
            Xác thực hai yếu tố (2FA)
            </h3>
            <div className="flex items-center justify-between">
            <div>
                <p className="font-medium">Kích hoạt 2FA</p>
                <p className="text-sm text-gray-600">Tăng cường bảo mật tài khoản với xác thực hai yếu tố</p>
            </div>
            <button
                onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFAEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
            >
                <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFAEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
                />
            </button>
            </div>
            {twoFAEnabled && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                ✓ 2FA đã được kích hoạt. Quét mã QR bằng ứng dụng Google Authenticator để hoàn tất.
                </p>
            </div>
            )}
        </div>

        {/* Session Management */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe size={20} />
            Quản lý phiên đăng nhập
            </h3>
            <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Smartphone size={18} className="text-green-600" />
                </div>
                <div>
                    <p className="font-medium">Chrome trên Windows</p>
                    <p className="text-sm text-gray-500">IP: 192.168.1.1 • Hiện tại</p>
                </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Hoạt động</span>
            </div>
            
            </div>
        </div>
        </div>
    );
}