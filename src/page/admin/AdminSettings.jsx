import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Mail,
  Database,
  Globe,
  Lock,
  Users,
  Calendar,
  MessageSquare,
  AlertTriangle,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Key,
  Server,
  Smartphone,
  Clock,
  FileText,
  Image,
  Video,
  Upload,
  Download,
  Zap,
  CheckCircle,
  XCircle,
  Info,
  RefreshCw,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  BarChart3,
  Activity
} from 'lucide-react';
import AdminGeneralSettings from '../../components/admin/setting/AdminGeneralSettings';
import AdminSecuritySettings from '../../components/admin/setting/AdminSecuritySettings';
import AdminNotificationSettings from '../../components/admin/setting/AdminNotificationSettings';
import ModerationSettings from '../../components/admin/setting/ModerationSettings';
import IntegrationSettings from '../../components/admin/setting/IntegrationSettings';
import StorageSettings from '../../components/admin/setting/StorageSettings';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
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
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const tabs = [
    { id: 'general', label: 'Cài đặt chung', icon: Settings },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'moderation', label: 'Kiểm duyệt', icon: Eye },
    { id: 'integration', label: 'Tích hợp', icon: Zap },
    { id: 'storage', label: 'Lưu trữ', icon: Database }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      setLastSaved(new Date());
      // TODO: replace with real API call (axios/fetch)
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục cài đặt mặc định?')) {
      // In real app, request default settings or reset on server
      window.location.reload();
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };




  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (<AdminGeneralSettings />);
      case 'security':
        return (<AdminSecuritySettings />);
      case 'notifications':
        return (<AdminNotificationSettings />);
      case 'moderation':
        return (<ModerationSettings />);
      case 'integration':
        return (<IntegrationSettings />);
      case 'storage':
        return (<StorageSettings />);
      default:
        return (<AdminGeneralSettings />);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Settings size={28} />
              Cài đặt Admin
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý cấu hình hệ thống và các tùy chọn nâng cao
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw size={16} />
              Khôi phục mặc định
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isSaving ? 'Đang lưu...' : 'Lưu cài đặt'}
            </button>
          </div>
        </div>

        {lastSaved && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            <CheckCircle size={16} />
            Đã lưu lần cuối: {lastSaved.toLocaleString('vi-VN')}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Server size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">System Status</h3>
              <p className="text-sm text-gray-500">Trạng thái hệ thống</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Redis</span>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Performance</h3>
              <p className="text-sm text-gray-500">Hiệu suất hệ thống</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">CPU Usage</span>
              <span className="text-sm text-blue-600 font-medium">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Memory</span>
              <span className="text-sm text-blue-600 font-medium">62%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Disk</span>
              <span className="text-sm text-blue-600 font-medium">38%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Alerts</h3>
              <p className="text-sm text-gray-500">Cảnh báo hệ thống</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Critical</span>
              <span className="text-sm text-red-600 font-medium">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Warning</span>
              <span className="text-sm text-yellow-600 font-medium">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Info</span>
              <span className="text-sm text-blue-600 font-medium">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}