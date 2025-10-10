import React, { useState, useEffect } from 'react';
import {
  Building,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Crown,
  Star,
  Phone,
  Mail,
  Globe,
  Camera,
  Package,
  ShoppingCart,
  CreditCard,
  Settings,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Megaphone,
  BarChart3,
  Clock,
  AlertTriangle,
  Check,
  ArrowRight,
  Sparkles,
  Target,
  Heart
} from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

// ==================== ProfileTab Component ====================
const ProfileTab = ({ data, contactInfo, setData, onSave }) => {
  const [orgInfo, setOrgInfo] = useState(data || {});
  const [contact, setContact] = useState(contactInfo || {});
  const [isEditing, setIsEditing] = useState(false);
  const [originalSnapshot, setOriginalSnapshot] = useState(null);
  const [err, setErr] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setOrgInfo(data || {});
  }, [data]);

  useEffect(() => {
    setContact(contactInfo || {});
  }, [contactInfo]);

  const isAllDigits = (str) => {
    return /^[0-9]+$/.test(String(str));
  };

  const isValidEmail = (s) => {
    if (!s) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(s).trim());
  };

  const isValidPhone = (s) => {
    if (!s) return false;
    const cleaned = String(s).trim().replace(/\s+/g, '');
    if (/^\+?[0-9]+$/.test(cleaned)) {
      const digits = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
      return digits.length >= 8 && digits.length <= 15;
    }
    return false;
  };

  const handleFieldError = (section, field, value) => {
    const nextErr = { ...err };

    const setField = (k, msg) => {
      if (msg) nextErr[k] = msg;
      else delete nextErr[k];
    };

    if (section === 'basicInfo' && field === 'name') {
      const v = String(value ?? '').trim();
      if (!v) {
        setField('name', 'Tên không được để trống.');
        setErr(nextErr);
        return false;
      }
      if (isAllDigits(v)) {
        setField('name', 'Tên không được chỉ chứa số.');
        setErr(nextErr);
        return false;
      }
      setField('name', null);
      setErr(nextErr);
      return true;
    }

    if (section === 'contactInfo' && field === 'mail') {
      const v = String(value ?? '').trim();
      if (!v) {
        setField('mail', 'Email không được để trống.');
        setErr(nextErr);
        return false;
      }
      if (!isValidEmail(v)) {
        setField('mail', 'Email không đúng định dạng.');
        setErr(nextErr);
        return false;
      }
      setField('mail', null);
      setErr(nextErr);
      return true;
    }

    if (section === 'contactInfo' && field === 'phone') {
      const v = String(value ?? '').trim();
      if (!v) {
        setField('phone', 'Số điện thoại không được để trống.');
        setErr(nextErr);
        return false;
      }
      if (!isValidPhone(v)) {
        setField('phone', 'Số điện thoại không hợp lệ. Ví dụ: +84 912 345 678 hoặc 0912345678');
        setErr(nextErr);
        return false;
      }
      setField('phone', null);
      setErr(nextErr);
      return true;
    }

    setField(field, null);
    setErr(nextErr);
    return true;
  };

  const validateAll = () => {
    let ok = true;
    ok = handleFieldError('basicInfo', 'name', orgInfo.name) && ok;
    ok = handleFieldError('contactInfo', 'mail', contact.mail) && ok;
    ok = handleFieldError('contactInfo', 'phone', contact.phone) && ok;
    return ok;
  };

  const handleEdit = () => {
    setOriginalSnapshot({
      orgInfo: JSON.parse(JSON.stringify(orgInfo)),
      contact: JSON.parse(JSON.stringify(contact))
    });
    setIsEditing(true);
    setErr({});
  };

  const handleCancel = () => {
    if (originalSnapshot) {
      setOrgInfo(JSON.parse(JSON.stringify(originalSnapshot.orgInfo)));
      setContact(JSON.parse(JSON.stringify(originalSnapshot.contact)));
      setOriginalSnapshot(null);
    }
    setErr({});
    setIsEditing(false);
  };

  const handleSave = async () => {
    const ok = validateAll();
    if (!ok) {
      toast.error('Vui lòng kiểm tra lại thông tin');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        basicInfo: {
          name: orgInfo.name,
          description: orgInfo.description,
          foundedYear: orgInfo.foundedYear,
          avatarUrl: orgInfo.avatarUrl
        },
        contactInfo: {
          mail: contact.mail,
          phone: contact.phone,
          websiteUrl: contact.websiteUrl,
          address: contact.address
        }
      };

      // Gọi callback onSave từ parent component
      await onSave(payload);
      
      setOriginalSnapshot(null);
      setErr({});
      setIsEditing(false);
      toast.success('Cập nhật thông tin thành công!');
    } catch (e) {
      console.error('Save failed', e);
      toast.error('Cập nhật thông tin thất bại');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section === 'basicInfo') {
      setOrgInfo(prev => {
        const next = { ...prev, [field]: value };
        return next;
      });
      if (field === 'name') handleFieldError('basicInfo', 'name', value);
    } else if (section === 'contactInfo') {
      setContact(prev => {
        const next = { ...prev, [field]: value };
        return next;
      });
      if (field === 'mail') handleFieldError('contactInfo', 'mail', value);
      if (field === 'phone') handleFieldError('contactInfo', 'phone', value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-green-500 to-blue-600 relative">
          <div className="absolute bottom-4 left-6 flex items-end gap-4">
            <div className="relative">
              <img
                src={orgInfo?.avatarUrl || 'https://via.placeholder.com/80'}
                alt="Logo"
                className="w-20 h-20 rounded-lg border-4 border-white shadow-lg object-cover bg-white"
              />
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer hover:bg-opacity-70">
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files && e.target.files[0];
                      if (f) {
                        const url = URL.createObjectURL(f);
                        setOrgInfo(prev => ({ ...prev, avatarUrl: url }));
                      }
                    }}
                  />
                </label>
              )}
            </div>

            <div className="text-white pb-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={orgInfo.name || ''}
                    onChange={(e) => handleInputChange('basicInfo', 'name', e.target.value)}
                    className="text-xl font-bold bg-transparent border-b border-white text-white placeholder-white focus:outline-none"
                    placeholder="Tên tổ chức"
                  />
                  {err.name && <div className="text-sm text-yellow-200 mt-1">{err.name}</div>}
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold">{orgInfo?.name || 'Chưa có tên'}</h1>
                  <div className="flex gap-2">
                    {orgInfo?.isVerify ? (
                      <div className="bg-blue-500 p-1 rounded-full" title='Đã xác minh'>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="bg-yellow-500 p-1 rounded-full" title='Đang chờ'>
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-4 right-6">
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Đang lưu...' : 'Lưu'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Hủy
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-gray-700 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 backdrop-blur-sm"
              >
                <Edit className="w-4 h-4" />
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{orgInfo?.followers ?? 0}</div>
            <div className="text-sm text-gray-500">Người theo dõi</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-gray-900">{orgInfo?.ratting ?? 0}</span>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-sm text-gray-500">Đánh giá TB</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{orgInfo?.totalEvent ?? 0}</div>
            <div className="text-sm text-gray-500">Sự kiện đã tạo</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả tổ chức</label>
              {isEditing ? (
                <textarea
                  value={orgInfo?.description || ''}
                  onChange={(e) => handleInputChange('basicInfo', 'description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                  placeholder="Nhập mô tả về tổ chức của bạn..."
                />
              ) : (
                <p className="text-gray-700">{orgInfo?.description || 'Chưa có mô tả'}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Năm thành lập</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={orgInfo?.foundedYear || ''}
                    onChange={(e) => handleInputChange('basicInfo', 'foundedYear', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="VD: 2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{orgInfo?.foundedYear || 'Chưa cập nhật'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
          <div className="space-y-4">
            {[
              { field: 'mail', label: 'Email', icon: Mail, type: 'email' },
              { field: 'phone', label: 'Điện thoại', icon: Phone, type: 'tel' },
              { field: 'websiteUrl', label: 'Website', icon: Globe, type: 'url' },
              { field: 'address', label: 'Địa chỉ', icon: MapPin, type: 'text' }
            ].map(({ field, label, icon: Icon, type }) => (
              <div key={field} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <div className="flex-1">
                    <input
                      type={type}
                      value={contact[field] ?? ''}
                      onChange={(e) => handleInputChange('contactInfo', field, e.target.value)}
                      placeholder={label}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {field === 'mail' && err.mail && <div className="text-sm text-red-500 mt-1">{err.mail}</div>}
                    {field === 'phone' && err.phone && <div className="text-sm text-red-500 mt-1">{err.phone}</div>}
                  </div>
                ) : (
                  <span className="text-gray-700">{contact[field] || 'Chưa cập nhật'}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== RenderServicesTab Component ====================
const RenderServicesTab = ({ data }) => {
  const handleDeleteService = (id) => {
    // TODO: Implement delete service API call
    console.log('Delete service:', id);
  };

  const handleViewService = (id) => {
    // TODO: Implement view service details
    console.log('View service:', id);
  };

  const handleConfigService = (id) => {
    // TODO: Implement config service
    console.log('Config service:', id);
  };

  if (!data.services || data.services.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Dịch vụ đã mua</h3>
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">Chưa có dịch vụ nào</p>
            <p className="text-gray-400 text-sm">Hãy mua dịch vụ để nâng cao trải nghiệm của bạn</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Dịch vụ đã mua</h3>
        <div className="space-y-4">
          {data.services.map((service) => {
            const isExpiring = new Date(service.endDate) - new Date() < 30 * 24 * 60 * 60 * 1000;

            return (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.status === 'active' ? 'bg-green-100 text-green-800' :
                          service.status === 'expired' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {service.status === 'active' ? 'Đang hoạt động' :
                          service.status === 'expired' ? 'Đã hết hạn' : 'Tạm dừng'}
                        </span>
                        {isExpiring && service.status === 'active' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1">
                            <AlertTriangle size={10} />
                            Sắp hết hạn
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Mua: {service.startDate}</span>
                        <span>Hết hạn: {service.endDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleViewService(service.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleConfigService(service.id)}
                      className="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50"
                      title="Cấu hình"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    {service.status !== 'active' && (
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {service.status === 'active' && service.rateLimit && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Sử dụng trong tháng</span>
                      <span className="text-sm font-medium">
                        {service.rateLimit}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==================== RenderSettingsTab Component ====================
const RenderSettingsTab = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Cài đặt</h3>
        <p className="text-sm text-gray-600 mb-4">Quản lý cài đặt tài khoản và quyền riêng tư.</p>
        
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium mb-2">Thông báo</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Nhận thông báo qua email</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Thông báo về sự kiện mới</span>
              </label>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium mb-2">Bảo mật</h4>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
              Đổi mật khẩu
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

// ==================== Main OrgProfileManagement Component ====================
const OrgProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [data, setData] = useState({
    basicInfo: {},
    contactInfo: {},
    services: [],
    payment: null
  });
  const [loading, setLoading] = useState(true);

  const [availableServices, setAvailableServices] = useState([]);

  const tabs = [
    { id: 'profile', label: 'Thông tin cơ bản', icon: Building },
    { id: 'services', label: 'Dịch vụ đã mua', icon: Package },
    { id: 'marketplace', label: 'Mua thêm dịch vụ', icon: ShoppingCart },
    { id: 'billing', label: 'Thanh toán', icon: CreditCard },
    { id: 'settings', label: 'Cài đặt', icon: Settings }
  ];

  const serviceCategories = {
    account: { label: 'Tài khoản', color: 'blue', icon: Crown },
    promotion: { label: 'Quảng bá', color: 'purple', icon: TrendingUp },
    analytics: { label: 'Phân tích', color: 'green', icon: BarChart3 },
    ai: { label: 'AI/Automation', color: 'purple', icon: Sparkles },
    marketing: { label: 'Marketing', color: 'blue', icon: Megaphone },
    security: { label: 'Bảo mật', color: 'green', icon: Shield },
    streaming: { label: 'Live Stream', color: 'red', icon: Target }
  };

  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    gray: 'bg-gray-100 text-gray-600'
  };

  // Load organization profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${import.meta.env.VITE_API}/api/btc/profile/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Profile data:', response.data);

        if (response?.data?.code === 0) {
          setData(response.data.result);
        } else {
          toast.error('Không thể tải thông tin tổ chức');
        }
      } catch (error) {
        console.error('Load profile failed:', error);
        toast.error('Lỗi khi tải thông tin tổ chức');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);
  useEffect(() => {
    // const loadServices = async () => {
    //   const response = await axios.get(`${import.meta.env.VITE_API}/api/services`);
    //   setAvailableServices(response.data.result);
    // };
    // loadServices();
    setAvailableServices([
    {
      id: 'NEW001',
      name: 'AI Assistant Pro',
      category: 'ai',
      price: '1,500,000 VND',
      period: '6 tháng',
      description: 'Trợ lý AI giúp tối ưu hóa tuyển dụng tình nguyện viên',
      features: ['Gợi ý tình nguyện viên phù hợp', 'Tự động soạn thảo email', 'Phân tích hiệu quả sự kiện'],
      icon: Sparkles,
      color: 'purple',
      popular: true,
      discount: '20%'
    },
    {
      id: 'NEW002',
      name: 'Multi-Channel Marketing',
      category: 'marketing',
      price: '2,000,000 VND',
      period: '12 tháng',
      description: 'Quảng bá sự kiện trên nhiều kênh đồng thời',
      features: ['Facebook Ads tự động', 'Google Ads', 'Influencer network', 'Email campaigns'],
      icon: Megaphone,
      color: 'blue',
      popular: false,
      discount: null
    },
    {
      id: 'NEW003',
      name: 'Enterprise Security',
      category: 'security',
      price: '3,000,000 VND',
      period: '12 tháng',
      description: 'Bảo mật cấp doanh nghiệp cho dữ liệu tổ chức',
      features: ['SSL certificate', 'Data encryption', 'Backup tự động', '2FA bắt buộc'],
      icon: Shield,
      color: 'green',
      popular: false,
      discount: '15%'
    },
    {
      id: 'NEW004',
      name: 'Event Live Streaming',
      category: 'streaming',
      price: '500,000 VND',
      period: 'Per event',
      description: 'Live stream sự kiện chuyên nghiệp',
      features: ['HD streaming', 'Multi-platform', 'Recording', 'Chat moderation'],
      icon: Target,
      color: 'red',
      popular: false,
      discount: null
    }
  ])
  }, []);

  // Handle save profile changes
  const handleSaveProfile = async (payload) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.put(
        `${import.meta.env.VITE_API}/api/btc/profile/update`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response?.data?.code === 0) {
        // Reload profile after successful update
        const updatedProfile = await axios.get(`${import.meta.env.VITE_API}/api/btc/profile/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (updatedProfile?.data?.code === 0) {
          setData(updatedProfile.data.result);
        }
        
        return true;
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Save profile failed:', error);
      throw error;
    }
  };
  // Handle purchase service
  const handlePurchaseService = async (service) => {
    try {
      const token = localStorage.getItem('token');
      
      // TODO: Replace with actual API call when backend is ready
      console.log('Purchasing service:', service);
      
      // Mock API call for now
      // const response = await axios.post(
      //   `${import.meta.env.VITE_API}/api/btc/services/purchase`,
      //   { serviceId: service.id },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      toast.success(`Đã mua dịch vụ ${service.name} thành công!`);
      setShowServiceModal(false);
      setSelectedService(null);
      
      // Reload profile to get updated services
      // await loadProfile();
    } catch (error) {
      console.error('Purchase failed:', error);
      toast.error('Không thể mua dịch vụ. Vui lòng thử lại!');
    }
  };

  const renderMarketplaceTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-3 overflow-x-auto">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium whitespace-nowrap">
            Tất cả dịch vụ
          </button>
          {Object.entries(serviceCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <button 
                key={key} 
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">Gợi ý cho bạn</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableServices.filter(s => s.popular).map((service) => {
            const Icon = service.icon;
            const serviceColor = colorMap[service.color] || colorMap.gray;
            return (
              <div key={service.id} className="bg-white rounded-lg border border-purple-200 p-4 relative">
                {service.discount && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    -{service.discount}
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`${serviceColor.split(' ')[0]} p-3 rounded-lg`}>
                    <Icon className={`${serviceColor.split(' ')[1]} w-6 h-6`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500">{service.period}</div>
                        <div className="font-semibold text-gray-900">{service.price}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {service.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{f}</span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => { setSelectedService(service); setShowServiceModal(true); }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Mua ngay
                      </button>
                      <button
                        onClick={() => { setSelectedService(service); setShowServiceModal(true); }}
                        className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center gap-2 text-sm"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other services */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Dịch vụ khác</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableServices.filter(s => !s.popular).map((service) => {
              const Icon = service.icon;
              const serviceColor = colorMap[service.color] || colorMap.gray;
              return (
                <div key={service.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors relative">
                  {service.discount && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      -{service.discount}
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={`${serviceColor.split(' ')[0]} p-3 rounded-lg`}>
                      <Icon className={`${serviceColor.split(' ')[1]} w-6 h-6`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{service.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm text-gray-500">{service.period}</div>
                          <div className="font-semibold text-gray-900">{service.price}</div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => { setSelectedService(service); setShowServiceModal(true); }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Mua ngay
                        </button>
                        <button
                          onClick={() => { setSelectedService(service); setShowServiceModal(true); }}
                          className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center gap-2 text-sm"
                        >
                          <ArrowRight className="w-4 h-4" />
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Thanh toán</h3>
        <p className="text-sm text-gray-600 mb-6">Quản lý phương thức thanh toán và lịch sử hóa đơn.</p>

        {!data.payment ? (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">Chưa có thông tin thanh toán</p>
            <p className="text-gray-400 text-sm mb-4">Thêm phương thức thanh toán để dễ dàng mua dịch vụ</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Thêm phương thức thanh toán
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Phương thức thanh toán
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-700 font-medium">{data.payment.method?.type}</div>
                  <div className="text-xs text-gray-500 mt-1">{data.payment.method?.provider}</div>
                  <div className="text-sm font-semibold text-gray-700 mt-2">{data.payment.method?.lastFourDigits}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-sm">
                    Chỉnh sửa
                  </button>
                  <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">
                    Xóa
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-4">Lịch sử hóa đơn</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {data.payment.history?.length > 0 ? (
                  data.payment.history.map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className='flex flex-col gap-1'>
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.payDate}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.totalBuild}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">Chưa có hóa đơn nào</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Desktop Tabs */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <nav className="flex gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="lg:hidden">
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${
                    activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="space-y-6">
          {activeTab === 'profile' && (
            <ProfileTab 
              data={data.basicInfo} 
              contactInfo={data.contactInfo} 
              setData={setData}
              onSave={handleSaveProfile}
            />
          )}
          {activeTab === 'services' && <RenderServicesTab data={data} />}
          {activeTab === 'marketplace' && renderMarketplaceTab()}
          {activeTab === 'billing' && renderBillingTab()}
          {activeTab === 'settings' && <RenderSettingsTab data={data} />}
        </div>
      </main>

      {/* Service Modal */}
      {showServiceModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black opacity-50" 
            onClick={() => { setShowServiceModal(false); setSelectedService(null); }} 
          />
          <div className="relative bg-white rounded-xl w-full max-w-2xl p-6 z-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`${(colorMap[selectedService.color] || colorMap.gray).split(' ')[0]} p-3 rounded-lg`}>
                  <selectedService.icon className={`${(colorMap[selectedService.color] || colorMap.gray).split(' ')[1]} w-8 h-8`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedService.name}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    {selectedService.period} • <span className="font-semibold text-blue-600">{selectedService.price}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { setShowServiceModal(false); setSelectedService(null); }} 
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {selectedService.discount && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  Giảm giá {selectedService.discount} - Ưu đãi có thời hạn!
                </span>
              </div>
            )}

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Mô tả</h4>
              <p className="text-gray-700 leading-relaxed">{selectedService.description}</p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Tính năng chính</h4>
              <div className="space-y-2">
                {selectedService.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tổng thanh toán</p>
                <p className="text-2xl font-bold text-gray-900">{selectedService.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setShowServiceModal(false); setSelectedService(null); }} 
                  className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium"
                >
                  Đóng
                </button>
                <button
                  onClick={() => handlePurchaseService(selectedService)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgProfileManagement;