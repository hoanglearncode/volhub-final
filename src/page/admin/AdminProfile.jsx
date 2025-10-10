import React, { useState } from 'react';
import {
  User,
  Settings,
  Shield,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Save,
  Camera,
  Edit3,
  Smartphone,
  Mail,
  Globe,
  Clock,
  Key,
  AlertTriangle,
  Check,
  X,
  UserCheck,
  Activity,
  Database
} from 'lucide-react';

import ProfileTab from '../../components/admin/profile/ProfileTab';
import SecurityTab from '../../components/admin/profile/SecurityTab';
import NotificationsTab from '../../components/admin/profile/NotificationsTab';
import SystemTab from '../../components/admin/profile/SystemTab';

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: User },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'system', label: 'Hệ thống', icon: Settings }
  ];

  const handleSave = () => {
    // Simulate save action
    alert('Đã lưu thay đổi thành công!');
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <UserCheck size={28} className="text-blue-600" />
            Hồ sơ & Cài đặt
          </h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin cá nhân và tùy chọn hệ thống</p>
        </div>
      </div>

      <div className="px-6">
        <div className="flex flex-col gap-6">
          {/* Sidebar Navigation */}
          <div className="flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <nav className="space-x-2 flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'profile' && (<ProfileTab />)}
            {activeTab === 'security' && (<SecurityTab />)}
            {activeTab === 'notifications' && (<NotificationsTab />)}
            {activeTab === 'system' && (<SystemTab />)}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;