import { useState } from "react";
export default function AdminNotificationSettings () {
      const [settings, setSettings] = useState({
    security: {
      twoFactorEnabled: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireStrongPassword: true,
      allowRememberMe: true,
      ipWhitelist: '',
      sslRequired: true,
      apiRateLimit: 1000
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      newUserRegistration: true,
      eventSubmission: true,
      reportSubmission: true,
      systemAlerts: true,
      maintenanceNotices: true,
      weeklyReports: true
    },
    moderation: {
      autoApproveVerifiedPartners: true,
      contentModerationLevel: 'medium', // low, medium, high
      aiContentScanningEnabled: true,
      profanityFilterEnabled: true,
      imageModeration: true,
      videoModeration: false,
      maxEventDuration: 30,
      maxVolunteersPerEvent: 500,
      requireEventDescription: true
    },
    integration: {
      emailProvider: 'smtp',
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: '',
      smtpPassword: '',
      smsProvider: 'twilio',
      twilioAccountSid: '',
      twilioAuthToken: '',
      googleAnalyticsId: '',
      facebookPixelId: '',
      zaloOAId: ''
    },
    storage: {
      maxFileSize: 10, // MB
      allowedFileTypes: 'jpg,jpeg,png,pdf,doc,docx',
      storageProvider: 'local', // local, s3, cloudinary
      s3Bucket: '',
      s3AccessKey: '',
      s3SecretKey: '',
      cloudinaryCloudName: '',
      cloudinaryApiKey: '',
      backupFrequency: 'daily',
      retentionDays: 30
    }
  });
    return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(settings.notifications).map(([key, value]) => {
          const labels = {
            emailNotifications: 'Thông báo email',
            smsNotifications: 'Thông báo SMS',
            pushNotifications: 'Push notifications',
            newUserRegistration: 'Đăng ký người dùng mới',
            eventSubmission: 'Gửi sự kiện mới',
            reportSubmission: 'Báo cáo vi phạm',
            systemAlerts: 'Cảnh báo hệ thống',
            maintenanceNotices: 'Thông báo bảo trì',
            weeklyReports: 'Báo cáo tuần'
          };

          const descriptions = {
            emailNotifications: 'Gửi thông báo qua email',
            smsNotifications: 'Gửi thông báo qua SMS',
            pushNotifications: 'Thông báo đẩy trên trình duyệt',
            newUserRegistration: 'Thông báo khi có user mới đăng ký',
            eventSubmission: 'Thông báo khi có sự kiện mới chờ duyệt',
            reportSubmission: 'Thông báo khi có báo cáo vi phạm',
            systemAlerts: 'Cảnh báo lỗi hệ thống',
            maintenanceNotices: 'Thông báo khi bảo trì hệ thống',
            weeklyReports: 'Báo cáo tổng kết hàng tuần'
          };

          return (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{labels[key]}</h4>
                <p className="text-sm text-gray-500">{descriptions[key]}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}