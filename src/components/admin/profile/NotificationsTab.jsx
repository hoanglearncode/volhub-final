import { Bell,AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
const NotificationsTab = () => {
    const [notificationSettings, setNotificationSettings] = useState({
        email: true,
        push: true,
        sms: false,
        eventAlerts: true,
        systemAlerts: true,
        moderationQueue: true
    });

    return (
        <div className="space-y-6">
        {/* Notification Preferences */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell size={20} />
            Tùy chọn thông báo
            </h3>
            <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                <p className="font-medium">Thông báo Email</p>
                <p className="text-sm text-gray-600">Nhận thông báo qua email</p>
                </div>
                <button
                onClick={() => setNotificationSettings({...notificationSettings, email: !notificationSettings.email})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.email ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
                </button>
            </div>
            
            <div className="flex items-center justify-between">
                <div>
                <p className="font-medium">Thông báo Push</p>
                <p className="text-sm text-gray-600">Nhận thông báo trên trình duyệt</p>
                </div>
                <button
                onClick={() => setNotificationSettings({...notificationSettings, push: !notificationSettings.push})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.push ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.push ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                <p className="font-medium">Thông báo SMS</p>
                <p className="text-sm text-gray-600">Nhận thông báo qua tin nhắn</p>
                </div>
                <button
                onClick={() => setNotificationSettings({...notificationSettings, sms: !notificationSettings.sms})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.sms ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.sms ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
                </button>
            </div>
            </div>
        </div>

        {/* Alert Categories */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle size={20} />
            Loại cảnh báo
            </h3>
            <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                <p className="font-medium">Cảnh báo sự kiện</p>
                <p className="text-sm text-gray-600">Sự kiện mới cần duyệt, vi phạm</p>
                </div>
                <button
                onClick={() => setNotificationSettings({...notificationSettings, eventAlerts: !notificationSettings.eventAlerts})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.eventAlerts ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.eventAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                <p className="font-medium">Cảnh báo hệ thống</p>
                <p className="text-sm text-gray-600">Lỗi hệ thống, bảo trì, sự cố</p>
                </div>
                <button
                onClick={() => setNotificationSettings({...notificationSettings, systemAlerts: !notificationSettings.systemAlerts})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.systemAlerts ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.systemAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                <p className="font-medium">Hàng đợi kiểm duyệt</p>
                <p className="text-sm text-gray-600">Nội dung, kết nối cần xử lý</p>
                </div>
                <button
                onClick={() => setNotificationSettings({...notificationSettings, moderationQueue: !notificationSettings.moderationQueue})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.moderationQueue ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.moderationQueue ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}

export default NotificationsTab;