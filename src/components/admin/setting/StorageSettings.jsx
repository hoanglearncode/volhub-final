import { useState } from "react";

export default function StorageSettings (){ 
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
  
    const [showPassword, setShowPassword] = useState({});   
    return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kích thước file tối đa (MB)
          </label>
          <input
            type="number"
            value={settings.storage.maxFileSize}
            onChange={(e) => handleSettingChange('storage', 'maxFileSize', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="1"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Storage Provider
          </label>
          <select
            value={settings.storage.storageProvider}
            onChange={(e) => handleSettingChange('storage', 'storageProvider', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="local">Local Storage</option>
            <option value="s3">Amazon S3</option>
            <option value="cloudinary">Cloudinary</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Định dạng file cho phép
          </label>
          <input
            type="text"
            value={settings.storage.allowedFileTypes}
            onChange={(e) => handleSettingChange('storage', 'allowedFileTypes', e.target.value)}
            placeholder="jpg,jpeg,png,pdf,doc,docx"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-sm text-gray-500 mt-1">Phân tách bằng dấu phẩy</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tần suất backup
          </label>
          <select
            value={settings.storage.backupFrequency}
            onChange={(e) => handleSettingChange('storage', 'backupFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="daily">Hàng ngày</option>
            <option value="weekly">Hàng tuần</option>
            <option value="monthly">Hàng tháng</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thời gian lưu trữ (ngày)
          </label>
          <input
            type="number"
            value={settings.storage.retentionDays}
            onChange={(e) => handleSettingChange('storage', 'retentionDays', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="1"
          />
        </div>
      </div>

      {/* S3 Settings */}
      {settings.storage.storageProvider === 's3' && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Cài đặt Amazon S3</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                S3 Bucket Name
              </label>
              <input
                type="text"
                value={settings.storage.s3Bucket}
                onChange={(e) => handleSettingChange('storage', 's3Bucket', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Key
              </label>
              <input
                type="text"
                value={settings.storage.s3AccessKey}
                onChange={(e) => handleSettingChange('storage', 's3AccessKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Key
              </label>
              <div className="relative">
                <input
                  type={showPassword.s3SecretKey ? 'text' : 'password'}
                  value={settings.storage.s3SecretKey}
                  onChange={(e) => handleSettingChange('storage', 's3SecretKey', e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('s3SecretKey')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword.s3SecretKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cloudinary Settings */}
      {settings.storage.storageProvider === 'cloudinary' && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Cài đặt Cloudinary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cloud Name
              </label>
              <input
                type="text"
                value={settings.storage.cloudinaryCloudName}
                onChange={(e) => handleSettingChange('storage', 'cloudinaryCloudName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="text"
                value={settings.storage.cloudinaryApiKey}
                onChange={(e) => handleSettingChange('storage', 'cloudinaryApiKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}