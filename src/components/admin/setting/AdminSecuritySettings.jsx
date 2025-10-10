import { useState } from "react";
export default function AdminSecuritySettings () {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thời gian hết phiên (phút)
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="5"
            max="480"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số lần đăng nhập tối đa
          </label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="3"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Độ dài mật khẩu tối thiểu
          </label>
          <input
            type="number"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="6"
            max="20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giới hạn API (request/giờ)
          </label>
          <input
            type="number"
            value={settings.security.apiRateLimit}
            onChange={(e) => handleSettingChange('security', 'apiRateLimit', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IP Whitelist (một IP trên mỗi dòng)
          </label>
          <textarea
            value={settings.security.ipWhitelist}
            onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
            placeholder="192.168.1.1&#10;10.0.0.1"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Xác thực 2 lớp</h4>
            <p className="text-sm text-gray-500">Bắt buộc admin sử dụng 2FA</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorEnabled}
              onChange={(e) => handleSettingChange('security', 'twoFactorEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Mật khẩu mạnh</h4>
            <p className="text-sm text-gray-500">Yêu cầu chữ hoa, số và ký tự đặc biệt</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.requireStrongPassword}
              onChange={(e) => handleSettingChange('security', 'requireStrongPassword', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Bắt buộc SSL</h4>
            <p className="text-sm text-gray-500">Chuyển hướng HTTP sang HTTPS</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.sslRequired}
              onChange={(e) => handleSettingChange('security', 'sslRequired', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
      </div>
    </div>
  );
}