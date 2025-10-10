import { useState } from "react";

  const AdminGeneralSettings = () => {
    const [general, setGeneral] = useState({
      siteName: 'VolunteerHub',
      siteDescription: 'Nền tảng kết nối tình nguyện viên và tổ chức',
      adminEmail: 'admin@volunteerhub.vn',
      contactEmail: 'support@volunteerhub.vn',
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      maintenanceMode: false,
      registrationEnabled: true,
      eventCreationRequiresApproval: true
    });
    const [moderation, setModeration] = useState({
      autoApproveVerifiedPartners: true,
      contentModerationLevel: 'medium', // low, medium, high
      aiContentScanningEnabled: true,
      profanityFilterEnabled: true,
      imageModeration: true,
      videoModeration: false,
      maxEventDuration: 30,
      maxVolunteersPerEvent: 500,
      requireEventDescription: true
    });

    return (
        <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên website
            </label>
            <input
                type="text"
                value={general.siteName}
                // onChange={(e) => handleGeneralChange('siteName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Email quản trị
            </label>
            <input
                type="email"
                value={general.adminEmail}
                // onChange={(e) => handleGeneralChange('adminEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            </div>

            <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả website
            </label>
            <textarea
                value={general.siteDescription}
                // onChange={(e) => handleGeneralChange('siteDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Múi giờ
            </label>
            <select
                value={general.timezone}
                // onChange={(e) => handleGeneralChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
                <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</option>
                <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
                <option value="UTC">UTC (GMT+0)</option>
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngôn ngữ mặc định
            </label>
            <select
                value={general.language}
                // onChange={(e) => handleGeneralChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
            </select>
            </div>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
                <h4 className="font-medium text-gray-900">Chế độ bảo trì</h4>
                <p className="text-sm text-gray-500">Tạm thời tắt website cho người dùng</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                checked={general.maintenanceMode}
                // onChange={(e) => handleGeneralChange('maintenanceMode', e.target.checked)}
                className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
                <h4 className="font-medium text-gray-900">Bắt buộc mô tả sự kiện</h4>
                <p className="text-sm text-gray-500">Sự kiện phải có mô tả chi tiết</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                checked={moderation.requireEventDescription}
                // onChange={(e) => handleGeneralChange('requireEventDescription', e.target.checked)}
                className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
                <h4 className="font-medium text-gray-900">Cho phép đăng ký</h4>
                <p className="text-sm text-gray-500">Người dùng có thể tự đăng ký tài khoản</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                checked={general.registrationEnabled}
                // onChange={(e) => handleGeneralChange('registrationEnabled', e.target.checked)}
                className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
                <h4 className="font-medium text-gray-900">Duyệt sự kiện</h4>
                <p className="text-sm text-gray-500">Sự kiện cần được duyệt trước khi công khai</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                checked={general.eventCreationRequiresApproval}
                // onChange={(e) => handleGeneralChange('eventCreationRequiresApproval', e.target.checked)}
                className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
            </div>
        </div>
        </div>
    );
}
export default AdminGeneralSettings;