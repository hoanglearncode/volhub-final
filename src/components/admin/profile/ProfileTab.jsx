import {Check, Activity, Edit3, Camera} from 'lucide-react';
import { useState, useEffect } from 'react';
export default function ProfileTab () {
    const [profileData, setProfileData] = useState({
        username: null,
        fullName: null,
        email: null,
        phone: null,
        role: null,
        department: null,
        joinDate: null,
        lastLogin: null,
        status: null,
        avatar: null
    });

    useEffect(()=> {
        
    }, [])
    return (
        <div className="space-y-6">
        {/* Avatar Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Camera size={20} />
            Ảnh đại diện
            </h3>
            <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                A
            </div>
            <div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Tải ảnh mới
                </button>
                <p className="text-sm text-gray-500 mt-1">JPG, PNG tối đa 2MB</p>
            </div>
            </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Edit3 size={20} />
            Thông tin cá nhân
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập</label>
                <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                <input
                type="text"
                value={profileData.role}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phòng ban</label>
                <input
                type="text"
                value={profileData.department}
                onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            </div>
        </div>

        {/* Account Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} />
            Trạng thái tài khoản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Trạng thái</p>
                <p className="font-semibold text-green-700 flex items-center gap-2">
                <Check size={16} />
                {profileData.status}
                </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Ngày tham gia</p>
                <p className="font-semibold text-blue-700">{profileData.joinDate}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Đăng nhập cuối</p>
                <p className="font-semibold text-purple-700">{profileData.lastLogin}</p>
            </div>
            </div>
        </div>
        </div>
    );
}