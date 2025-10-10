import { 
    Settings, 
    Bell, 
    Shield, 
    Globe, 
    User, 
    Mail, 
    Database, 
    Palette, 
    Clock, 
    FileText,
    ToggleLeft,
    ToggleRight,
    Save,
    RefreshCw,
    Download,
    Upload,
    Trash2,
    Eye,
    EyeOff
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('general');
    const [settings, setSettings] = useState({
        // General Settings
        organizationName: 'Tổ chức Tình nguyện Xanh',
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh',
        dateFormat: 'DD/MM/YYYY',
        
        // Notification Settings
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        weeklyReports: true,
        monthlyReports: true,
        
        // Privacy Settings
        profileVisible: true,
        activityTracking: true,
        dataCollection: false,
        cookieAcceptance: true,
        
        // System Settings
        autoBackup: true,
        maintenanceMode: false,
        debugMode: false,
        logLevel: 'info',
        
        // Display Settings
        theme: 'light',
        compactMode: false,
        showAvatars: true,
        animationsEnabled: true
    });

    const settingsSections = [
        { id: 'general', icon: Settings, label: 'Cài đặt chung' },
        { id: 'notifications', icon: Bell, label: 'Thông báo' },
        { id: 'privacy', icon: Shield, label: 'Quyền riêng tư' },
        { id: 'display', icon: Palette, label: 'Giao diện' },
        { id: 'system', icon: Database, label: 'Hệ thống' },
        { id: 'backup', icon: Download, label: 'Sao lưu & Khôi phục' }
    ];

    const handleToggle = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSelectChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const renderGeneralSettings = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin cơ bản</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên tổ chức
                        </label>
                        <input
                            type="text"
                            value={settings.organizationName}
                            onChange={(e) => handleSelectChange('organizationName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Globe className="w-4 h-4 inline mr-2" />
                                Ngôn ngữ
                            </label>
                            <select
                                value={settings.language}
                                onChange={(e) => handleSelectChange('language', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="vi">Tiếng Việt</option>
                                <option value="en">English</option>
                                <option value="zh">中文</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Clock className="w-4 h-4 inline mr-2" />
                                Múi giờ
                            </label>
                            <select
                                value={settings.timezone}
                                onChange={(e) => handleSelectChange('timezone', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
                                <option value="Asia/Bangkok">Bangkok (GMT+7)</option>
                                <option value="Asia/Singapore">Singapore (GMT+8)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Định dạng ngày tháng
                        </label>
                        <select
                            value={settings.dateFormat}
                            onChange={(e) => handleSelectChange('dateFormat', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationSettings = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Cài đặt thông báo</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                                <p className="font-medium text-gray-800">Thông báo Email</p>
                                <p className="text-sm text-gray-600">Nhận thông báo qua email</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleToggle('emailNotifications')}
                            className="flex items-center"
                        >
                            {settings.emailNotifications ? 
                                <ToggleRight className="w-8 h-8 text-blue-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <Bell className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                                <p className="font-medium text-gray-800">Thông báo Push</p>
                                <p className="text-sm text-gray-600">Nhận thông báo trên trình duyệt</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleToggle('pushNotifications')}
                            className="flex items-center"
                        >
                            {settings.pushNotifications ? 
                                <ToggleRight className="w-8 h-8 text-blue-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <FileText className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                                <p className="font-medium text-gray-800">Báo cáo hàng tuần</p>
                                <p className="text-sm text-gray-600">Nhận báo cáo tổng hợp hàng tuần</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleToggle('weeklyReports')}
                            className="flex items-center"
                        >
                            {settings.weeklyReports ? 
                                <ToggleRight className="w-8 h-8 text-blue-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center">
                            <FileText className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                                <p className="font-medium text-gray-800">Báo cáo hàng tháng</p>
                                <p className="text-sm text-gray-600">Nhận báo cáo chi tiết hàng tháng</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleToggle('monthlyReports')}
                            className="flex items-center"
                        >
                            {settings.monthlyReports ? 
                                <ToggleRight className="w-8 h-8 text-blue-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPrivacySettings = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Quyền riêng tư & Bảo mật</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <Eye className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                                <p className="font-medium text-gray-800">Hiển thị hồ sơ công khai</p>
                                <p className="text-sm text-gray-600">Cho phép người khác xem thông tin cơ bản</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleToggle('profileVisible')}
                            className="flex items-center"
                        >
                            {settings.profileVisible ? 
                                <ToggleRight className="w-8 h-8 text-blue-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <Database className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                                <p className="font-medium text-gray-800">Thu thập dữ liệu phân tích</p>
                                <p className="text-sm text-gray-600">Giúp cải thiện dịch vụ</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleToggle('dataCollection')}
                            className="flex items-center"
                        >
                            {settings.dataCollection ? 
                                <ToggleRight className="w-8 h-8 text-blue-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center">
                            <Shield className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                                <p className="font-medium text-gray-800">Theo dõi hoạt động</p>
                                <p className="text-sm text-gray-600">Lưu lịch sử hoạt động của bạn</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleToggle('activityTracking')}
                            className="flex items-center"
                        >
                            {settings.activityTracking ? 
                                <ToggleRight className="w-8 h-8 text-blue-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDisplaySettings = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Cài đặt giao diện</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Chủ đề
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {['light', 'dark', 'auto'].map((theme) => (
                                <button
                                    key={theme}
                                    onClick={() => handleSelectChange('theme', theme)}
                                    className={`p-3 rounded-lg border text-center ${
                                        settings.theme === theme 
                                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <Palette className="w-5 h-5 mx-auto mb-1" />
                                    <div className="text-sm">
                                        {theme === 'light' ? 'Sáng' : theme === 'dark' ? 'Tối' : 'Tự động'}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-medium text-gray-800">Chế độ compact</p>
                            <p className="text-sm text-gray-600">Giảm khoảng cách giữa các phần tử</p>
                        </div>
                        <button 
                            onClick={() => handleToggle('compactMode')}
                            className="flex items-center"
                        >
                            {settings.compactMode ? 
                                <ToggleRight className="w-8 h-8 text-blue-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-gray-800">Hiển thị avatar</p>
                            <p className="text-sm text-gray-600">Hiện ảnh đại diện trong danh sách</p>
                        </div>
                        <button 
                            onClick={() => handleToggle('showAvatars')}
                            className="flex items-center"
                        >
                            {settings.showAvatars ? 
                                <ToggleRight className="w-8 h-8 text-blue-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSystemSettings = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Cài đặt hệ thống</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <Database className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                                <p className="font-medium text-gray-800">Tự động sao lưu</p>
                                <p className="text-sm text-gray-600">Sao lưu dữ liệu hàng ngày</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleToggle('autoBackup')}
                            className="flex items-center"
                        >
                            {settings.autoBackup ? 
                                <ToggleRight className="w-8 h-8 text-blue-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <RefreshCw className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                                <p className="font-medium text-gray-800">Chế độ bảo trì</p>
                                <p className="text-sm text-gray-600">Tạm dừng hệ thống để bảo trì</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleToggle('maintenanceMode')}
                            className="flex items-center"
                        >
                            {settings.maintenanceMode ? 
                                <ToggleRight className="w-8 h-8 text-orange-600" /> : 
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                            }
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mức độ log
                        </label>
                        <select
                            value={settings.logLevel}
                            onChange={(e) => handleSelectChange('logLevel', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="error">Error - Chỉ lỗi</option>
                            <option value="warn">Warning - Cảnh báo</option>
                            <option value="info">Info - Thông tin</option>
                            <option value="debug">Debug - Chi tiết</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderBackupSettings = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Sao lưu & Khôi phục</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
                            <Download className="w-6 h-6 text-blue-600 mr-2" />
                            <span className="text-blue-600 font-medium">Tải xuống bản sao lưu</span>
                        </button>
                        
                        <button className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
                            <Upload className="w-6 h-6 text-green-600 mr-2" />
                            <span className="text-green-600 font-medium">Khôi phục từ file</span>
                        </button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Lịch sử sao lưu</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-sm text-gray-600">backup_20241201_143022.zip</span>
                                <div className="flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">Tải xuống</button>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Xóa</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-sm text-gray-600">backup_20241130_143022.zip</span>
                                <div className="flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">Tải xuống</button>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-800">Vùng nguy hiểm</h3>
                <div className="space-y-4">
                    <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Xóa tất cả dữ liệu
                    </button>
                    <p className="text-sm text-red-700">
                        ⚠️ Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.
                    </p>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activeSection) {
            case 'general': return renderGeneralSettings();
            case 'notifications': return renderNotificationSettings();
            case 'privacy': return renderPrivacySettings();
            case 'display': return renderDisplaySettings();
            case 'system': return renderSystemSettings();
            case 'backup': return renderBackupSettings();
            default: return renderGeneralSettings();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
                    <p className="text-gray-600 mt-2">Quản lý các cài đặt và tùy chọn của hệ thống</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <nav className="space-y-2">
                                {settingsSections.map((section) => {
                                    const IconComponent = section.icon;
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                                                activeSection === section.id 
                                                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                                                    : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            <IconComponent className="w-5 h-5 mr-3" />
                                            {section.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {renderContent()}
                        
                        {/* Save Button */}
                        <div className="mt-8 flex justify-end space-x-4">
                            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                Hủy bỏ
                            </button>
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                <Save className="w-4 h-4 mr-2" />
                                Lưu cài đặt
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}