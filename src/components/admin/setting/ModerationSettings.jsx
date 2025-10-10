import { useState } from "react";
export default function ModerationSettings () {
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
            Mức độ kiểm duyệt nội dung
          </label>
          <select
            value={settings.moderation.contentModerationLevel}
            onChange={(e) => handleSettingChange('moderation', 'contentModerationLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="low">Thấp - Chỉ kiểm duyệt khi có báo cáo</option>
            <option value="medium">Vừa - Kiểm duyệt tự động + thủ công</option>
            <option value="high">Cao - Tất cả nội dung phải được duyệt</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thời gian sự kiện tối đa (ngày)
          </label>
          <input
            type="number"
            value={settings.moderation.maxEventDuration}
            onChange={(e) => handleSettingChange('moderation', 'maxEventDuration', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="1"
            max="365"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số TNV tối đa mỗi sự kiện
          </label>
          <input
            type="number"
            value={settings.moderation.maxVolunteersPerEvent}
            onChange={(e) => handleSettingChange('moderation', 'maxVolunteersPerEvent', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="1"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Tự động duyệt đối tác đã xác minh</h4>
            <p className="text-sm text-gray-500">Sự kiện từ đối tác verified được duyệt tự động</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.autoApproveVerifiedPartners}
              onChange={(e) => handleSettingChange('moderation', 'autoApproveVerifiedPartners', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Quét nội dung bằng AI</h4>
            <p className="text-sm text-gray-500">Sử dụng AI để phát hiện nội dung không phù hợp</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.aiContentScanningEnabled}
              onChange={(e) => handleSettingChange('moderation', 'aiContentScanningEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Bộ lọc từ ngữ không phù hợp</h4>
            <p className="text-sm text-gray-500">Tự động ẩn nội dung chứa từ ngữ không phù hợp</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.profanityFilterEnabled}
              onChange={(e) => handleSettingChange('moderation', 'profanityFilterEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Kiểm duyệt hình ảnh</h4>
            <p className="text-sm text-gray-500">Quét hình ảnh để phát hiện nội dung không phù hợp</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.imageModeration}
              onChange={(e) => handleSettingChange('moderation', 'imageModeration', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Kiểm duyệt video</h4>
            <p className="text-sm text-gray-500">Quét video để phát hiện nội dung không phù hợp</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.videoModeration}
              onChange={(e) => handleSettingChange('moderation', 'videoModeration', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
      </div>
    </div>
  );
}