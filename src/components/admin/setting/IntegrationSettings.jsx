import { useState } from "react";
import { Mail, Smartphone, BarChart3, Eye } from "lucide-react";
export default function IntegrationSettings () {
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
    const [activeTab, setActiveTab] = useState('general');

  
    const [showPassword, setShowPassword] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    return (
    <div className="space-y-6">
      {/* Email Settings */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail size={20} />
          Cài đặt Email
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Provider
            </label>
            <select
              value={settings.integration.emailProvider}
              onChange={(e) => handleSettingChange('integration', 'emailProvider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="smtp">SMTP Custom</option>
              <option value="gmail">Gmail</option>
              <option value="sendgrid">SendGrid</option>
              <option value="mailgun">Mailgun</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Host
            </label>
            <input
              type="text"
              value={settings.integration.smtpHost}
              onChange={(e) => handleSettingChange('integration', 'smtpHost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="smtp.gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Port
            </label>
            <input
              type="number"
              value={settings.integration.smtpPort}
              onChange={(e) => handleSettingChange('integration', 'smtpPort', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Username
            </label>
            <input
              type="text"
              value={settings.integration.smtpUsername}
              onChange={(e) => handleSettingChange('integration', 'smtpUsername', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Password
            </label>
            <div className="relative">
              <input
                type={showPassword.smtpPassword ? 'text' : 'password'}
                value={settings.integration.smtpPassword}
                onChange={(e) => handleSettingChange('integration', 'smtpPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('smtpPassword')}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword.smtpPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Mail size={16} />
            Test Email Connection
          </button>
        </div>
      </div>

      {/* SMS Settings */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Smartphone size={20} />
          Cài đặt SMS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMS Provider
            </label>
            <select
              value={settings.integration.smsProvider}
              onChange={(e) => handleSettingChange('integration', 'smsProvider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="twilio">Twilio</option>
              <option value="nexmo">Nexmo</option>
              <option value="sms77">SMS77</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twilio Account SID
            </label>
            <input
              type="text"
              value={settings.integration.twilioAccountSid}
              onChange={(e) => handleSettingChange('integration', 'twilioAccountSid', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twilio Auth Token
            </label>
            <div className="relative">
              <input
                type={showPassword.twilioAuthToken ? 'text' : 'password'}
                value={settings.integration.twilioAuthToken}
                onChange={(e) => handleSettingChange('integration', 'twilioAuthToken', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('twilioAuthToken')}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword.twilioAuthToken ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Tracking */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 size={20} />
          Analytics & Tracking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Analytics ID
            </label>
            <input
              type="text"
              value={settings.integration.googleAnalyticsId}
              onChange={(e) => handleSettingChange('integration', 'googleAnalyticsId', e.target.value)}
              placeholder="GA-XXXXXXXXX-X"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook Pixel ID
            </label>
            <input
              type="text"
              value={settings.integration.facebookPixelId}
              onChange={(e) => handleSettingChange('integration', 'facebookPixelId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zalo OA ID
            </label>
            <input
              type="text"
              value={settings.integration.zaloOAId}
              onChange={(e) => handleSettingChange('integration', 'zaloOAId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}