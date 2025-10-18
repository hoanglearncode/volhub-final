import React, { useEffect, useState } from 'react';
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
  Target
} from 'lucide-react';

/*
  Mobile-first, UI-focused version of OrgProfileManagement.
  - Kept layout and visual system (colors, spacing)
  - Removed network/API logic (no axios, no localStorage)
  - Exposes three props for integration:
      initialData: object with shape similar to previous `data`
      onSaveProfile: async callback(payload) => boolean | throw
      onPurchaseService: async callback(service) => boolean | throw
  - All other behaviour is UI only (validation, edit state, modals)
*/

const defaultServices = [
  {
    id: 'NEW001',
    name: 'AI Assistant Pro',
    category: 'ai',
    price: '1.500.000 VND',
    period: '6 tháng',
    description: 'Trợ lý AI giúp tối ưu hóa tuyển dụng tình nguyện viên',
    features: ['Gợi ý tình nguyện viên', 'Soạn email tự động', 'Phân tích hiệu quả'],
    icon: Sparkles,
    color: 'purple',
    popular: true,
    discount: '20%'
  },
  {
    id: 'NEW002',
    name: 'Multi-Channel Marketing',
    category: 'marketing',
    price: '2.000.000 VND',
    period: '12 tháng',
    description: 'Quảng bá sự kiện trên nhiều kênh',
    features: ['Facebook Ads', 'Google Ads', 'Email campaigns'],
    icon: Megaphone,
    color: 'blue',
    popular: false,
    discount: null
  }
];

const serviceCategories = {
  account: { label: 'Tài khoản', icon: Crown },
  promotion: { label: 'Quảng bá', icon: TrendingUp },
  analytics: { label: 'Phân tích', icon: BarChart3 },
  ai: { label: 'AI', icon: Sparkles },
  marketing: { label: 'Marketing', icon: Megaphone },
  security: { label: 'Bảo mật', icon: Shield },
  streaming: { label: 'Live', icon: Target }
};

const colorMap = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  gray: 'bg-gray-100 text-gray-600'
};

// ---------- Small UI helpers ----------
const Badge = ({ children, className = '' }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
);

// ---------- ProfileTab (UI + small local validation) ----------
const ProfileTab = ({ basicInfo = {}, contactInfo = {}, onSave }) => {
  const [org, setOrg] = useState({ ...basicInfo });
  const [contact, setContact] = useState({ ...contactInfo });
  const [editing, setEditing] = useState(false);
  const [snapshot, setSnapshot] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => setOrg({ ...basicInfo }), [basicInfo]);
  useEffect(() => setContact({ ...contactInfo }), [contactInfo]);

  const isAllDigits = (s) => /^[0-9]+$/.test(String(s || ''));
  const isValidEmail = (s) => !!s && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  const isValidPhone = (s) => {
    if (!s) return false;
    const cleaned = String(s).trim().replace(/\s+/g, '');
    if (/^\+?[0-9]+$/.test(cleaned)) {
      const digits = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
      return digits.length >= 8 && digits.length <= 15;
    }
    return false;
  };

  const validate = () => {
    const e = {};
    if (!org.name || String(org.name).trim() === '') e.name = 'Tên không được để trống.';
    else if (isAllDigits(org.name)) e.name = 'Tên không thể chỉ chứa số.';
    if (!contact.mail || !isValidEmail(contact.mail)) e.mail = 'Email không hợp lệ.';
    if (!contact.phone || !isValidPhone(contact.phone)) e.phone = 'Số điện thoại không hợp lệ.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const startEdit = () => {
    setSnapshot({ org: { ...org }, contact: { ...contact } });
    setEditing(true);
    setErrors({});
  };
  const cancelEdit = () => {
    if (snapshot) {
      setOrg(snapshot.org);
      setContact(snapshot.contact);
      setSnapshot(null);
    }
    setEditing(false);
    setErrors({});
  };

  const save = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      if (onSave) await onSave({ basicInfo: org, contactInfo: contact });
      setSnapshot(null);
      setEditing(false);
    } catch (err) {
      // parent will handle error if needed
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="h-40 bg-gradient-to-r from-green-500 to-blue-600 relative">
          <div className="absolute left-4 bottom-4 flex items-end gap-4">
            <div className="relative">
              <img
                src={org.avatarUrl || 'https://via.placeholder.com/96'}
                alt="logo"
                className="w-24 h-24 rounded-lg border-4 border-white shadow-md object-cover"
              />
              {editing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files && e.target.files[0];
                      if (f) setOrg((p) => ({ ...p, avatarUrl: URL.createObjectURL(f) }));
                    }}
                  />
                </label>
              )}
            </div>

            <div className="text-white pb-1">
              {editing ? (
                <>
                  <input
                    value={org.name || ''}
                    onChange={(e) => setOrg((p) => ({ ...p, name: e.target.value }))}
                    className="bg-transparent text-xl font-bold border-b border-white placeholder-white focus:outline-none w-48"
                    placeholder="Tên tổ chức"
                  />
                  {errors.name && <div className="text-sm text-yellow-200 mt-1">{errors.name}</div>}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{org.name || 'Chưa đặt tên'}</h2>
                  {org.isVerify ? (
                    <Badge className="bg-blue-500 text-white">Đã xác minh</Badge>
                  ) : (
                    <Badge className="bg-yellow-400 text-black">Đang chờ</Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="absolute right-3 bottom-3">
            {editing ? (
              <div className="flex gap-2">
                <button onClick={save} disabled={saving} className="bg-green-600 px-3 py-2 rounded-lg text-white font-medium">
                  {saving ? 'Đang lưu...' : <><Save className="inline w-4 h-4 mr-1"/>Lưu</>}
                </button>
                <button onClick={cancelEdit} className="bg-gray-200 px-3 py-2 rounded-lg text-gray-700">Hủy</button>
              </div>
            ) : (
              <button onClick={startEdit} className="bg-white bg-opacity-20 px-3 py-2 rounded-lg text-gray-800 backdrop-blur-sm">
                <Edit className="w-4 h-4 inline mr-1"/>Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        <div className="p-4 bg-gray-50 grid grid-cols-3 text-center">
          <div>
            <div className="text-xl font-semibold text-gray-900">{org.followers ?? 0}</div>
            <div className="text-xs text-gray-500">Người theo dõi</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl font-semibold">{org.ratting ?? 0}</span>
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-xs text-gray-500">Đánh giá</div>
          </div>
          <div>
            <div className="text-xl font-semibold">{org.totalEvent ?? 0}</div>
            <div className="text-xs text-gray-500">Sự kiện</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4">
        <h3 className="font-semibold mb-2">Mô tả</h3>
        {editing ? (
          <textarea value={org.description || ''} onChange={(e) => setOrg((p) => ({ ...p, description: e.target.value }))} className="w-full p-2 border border-gray-200 rounded-lg resize-none" rows={4} />
        ) : (
          <p className="text-gray-700">{org.description || 'Chưa có mô tả'}</p>
        )}
      </div>

      <div className="bg-white rounded-xl p-4">
        <h3 className="font-semibold mb-3">Liên hệ</h3>
        <div className="space-y-3">
          {[{ field: 'mail', label: 'Email', Icon: Mail }, { field: 'phone', label: 'SĐT', Icon: Phone }, { field: 'websiteUrl', label: 'Website', Icon: Globe }, { field: 'address', label: 'Địa chỉ', Icon: MapPin }].map(({ field, label, Icon }) => (
            <div key={field} className="flex items-start gap-3">
              <Icon className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                {editing ? (
                  <>
                    <input value={contact[field] ?? ''} onChange={(e) => setContact((p) => ({ ...p, [field]: e.target.value }))} placeholder={label} className="w-full p-2 border border-gray-200 rounded-lg" />
                    {field === 'mail' && errors.mail && <div className="text-xs text-red-500 mt-1">{errors.mail}</div>}
                    {field === 'phone' && errors.phone && <div className="text-xs text-red-500 mt-1">{errors.phone}</div>}
                  </>
                ) : (
                  <div className="text-gray-700">{contact[field] || 'Chưa cập nhật'}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------- Services Tab UI ----------
const ServicesTab = ({ services = [], onConfig, onView, onDelete, onBuy }) => {
  if (!services || services.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 text-center">
        <Package className="w-14 h-14 text-gray-300 mx-auto mb-4" />
        <div className="font-semibold text-gray-800">Bạn chưa mua dịch vụ nào</div>
        <div className="text-sm text-gray-500 mt-2">Khám phá gói dịch vụ để mở rộng khả năng</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {services.map((s) => (
        <div key={s.id} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">{s.name}</h4>
                <Badge className={s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>{s.status === 'active' ? 'Đang hoạt động' : 'Đã hết hạn'}</Badge>
              </div>
              <p className="text-sm text-gray-600">{s.description}</p>
              <div className="text-xs text-gray-500 mt-2">{s.startDate || '-'} • Hết hạn: {s.endDate || '-'}</div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button onClick={() => onView && onView(s.id)} className="p-2 rounded-lg bg-gray-50">
                  <Eye className="w-4 h-4" />
                </button>
                <button onClick={() => onConfig && onConfig(s.id)} className="p-2 rounded-lg bg-gray-50">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              {s.status !== 'active' && (
                <button onClick={() => onDelete && onDelete(s.id)} className="text-red-600 text-sm">Xóa</button>
              )}
            </div>
          </div>

          {s.status === 'active' && s.rateLimit && (
            <div className="mt-3 text-sm text-gray-600 border-t pt-3">Sử dụng trong tháng: <span className="font-medium">{s.rateLimit}</span></div>
          )}
        </div>
      ))}
    </div>
  );
};

// ---------- Marketplace Tab UI ----------
const MarketplaceTab = ({ available = [], onBuy }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-3 overflow-x-auto">
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">Tất cả</button>
          {Object.keys(serviceCategories).map((k) => {
            const Icon = serviceCategories[k].icon;
            return (
              <button key={k} className="px-3 py-2 border border-gray-200 rounded-lg flex items-center gap-2">
                <Icon className="w-4 h-4" />{serviceCategories[k].label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {available.map((s) => {
          const Icon = s.icon || Sparkles;
          const color = colorMap[s.color] || colorMap.gray;
          return (
            <div key={s.id} className="bg-white rounded-xl p-4 shadow-sm relative">
              {s.discount && <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">-{s.discount}</div>}
              <div className="flex items-start gap-3">
                <div className={`${color.split(' ')[0]} p-3 rounded-lg`}>
                  <Icon className={`${color.split(' ')[1]} w-6 h-6`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{s.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{s.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{s.period}</div>
                      <div className="font-semibold text-gray-900">{s.price}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => onBuy && onBuy(s)} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                  <Plus className="w-4 h-4" />Mua ngay
                </button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />Chi tiết
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---------- Billing Tab UI ----------
const BillingTab = ({ payment }) => {
  if (!payment) {
    return (
      <div className="bg-white rounded-xl p-6 text-center">
        <CreditCard className="w-14 h-14 text-gray-300 mx-auto mb-4" />
        <div className="font-semibold text-gray-800">Chưa có thông tin thanh toán</div>
        <div className="text-sm text-gray-500 mt-2">Thêm phương thức để mua dịch vụ nhanh hơn</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-white p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-700 font-medium">{payment.method?.type}</div>
            <div className="text-xs text-gray-500">{payment.method?.provider}</div>
            <div className="text-sm font-semibold text-gray-900 mt-2">{payment.method?.lastFourDigits}</div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border rounded-lg">Chỉnh sửa</button>
            <button className="px-3 py-2 bg-red-600 text-white rounded-lg">Xóa</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl">
        <h4 className="font-semibold mb-2">Lịch sử hóa đơn</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {(payment.history || []).length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-4">Chưa có hóa đơn</div>
          ) : (
            payment.history.map((it) => (
              <div key={it.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div>
                  <div className="text-sm font-medium text-gray-800">{it.name}</div>
                  <div className="text-xs text-gray-500">{it.payDate}</div>
                </div>
                <div className="font-semibold">{it.totalBuild}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- Settings Tab UI ----------
const SettingsTab = () => (
  <div className="bg-white rounded-xl p-4 space-y-4">
    <div>
      <h4 className="font-semibold mb-2">Thông báo</h4>
      <label className="flex items-center gap-3"><input type="checkbox" defaultChecked />Nhận email</label>
      <label className="flex items-center gap-3"><input type="checkbox" defaultChecked />Thông báo sự kiện</label>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Bảo mật</h4>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Đổi mật khẩu</button>
    </div>
  </div>
);

// ---------- Main Mobile Component (UI only) ----------
export default function OrgProfileManagementMobile({ initialData = {}, onSaveProfile, onPurchaseService }) {
  const [active, setActive] = useState('profile');
  const [data, setData] = useState({ basicInfo: {}, contactInfo: {}, services: [], payment: null });
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Accept data from parent; avoid internal API calls - UI-focused
    setData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const availableServices = initialData.availableServices || defaultServices;

  const handleSave = async (payload) => {
    // Propagate to parent; parent handles persistence
    if (onSaveProfile) await onSaveProfile(payload);
    // Optionally update local snapshot for immediate UI feedback
    setData((d) => ({ ...d, basicInfo: payload.basicInfo, contactInfo: payload.contactInfo }));
  };

  const handleBuy = async (service) => {
    if (onPurchaseService) await onPurchaseService(service);
    // close modal and set small local state
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 bg-gray-50 p-4 pb-24 mb-18">
      <nav className="bg-white rounded-2xl shadow-lg p-2 flex justify-between items-center">
        {[
          { id: 'profile', label: 'Hồ sơ', icon: Building },
          { id: 'services', label: 'Dịch vụ', icon: Package },
          { id: 'marketplace', label: 'Mua', icon: ShoppingCart },
          { id: 'billing', label: 'Thanh toán', icon: CreditCard },
          { id: 'settings', label: 'Cài đặt', icon: Settings }
        ].map((t) => {
          const Icon = t.icon;
          const activeCls = active === t.id ? 'bg-blue-600 text-white' : 'text-gray-700';
          return (
            <button key={t.id} onClick={() => setActive(t.id)} className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg ${activeCls}`}>
              <Icon className="w-5 h-5" />
              <span className="text-xs">{t.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="space-y-4">
        {active === 'profile' && <ProfileTab basicInfo={data.basicInfo} contactInfo={data.contactInfo} onSave={handleSave} />}
        {active === 'services' && <ServicesTab services={data.services} onView={() => {}} onConfig={() => {}} onDelete={() => {}} />}
        {active === 'marketplace' && <MarketplaceTab available={availableServices} onBuy={(s) => { setSelectedService(s); setShowModal(true); }} />}
        {active === 'billing' && <BillingTab payment={data.payment} />}
        {active === 'settings' && <SettingsTab />}
      </div>

      {showModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => { setShowModal(false); setSelectedService(null); }} />
          <div className="relative w-full bg-white rounded-t-2xl p-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`${(colorMap[selectedService.color] || colorMap.gray).split(' ')[0]} p-3 rounded-lg`}>
                  <selectedService.icon className={`${(colorMap[selectedService.color] || colorMap.gray).split(' ')[1]} w-6 h-6`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedService.name}</h3>
                  <div className="text-sm text-gray-500">{selectedService.period} • {selectedService.price}</div>
                </div>
              </div>
              <button onClick={() => { setShowModal(false); setSelectedService(null); }} className="p-2 rounded-lg bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-700 mb-4">{selectedService.description}</p>
            <div className="space-y-2 mb-4">
              {(selectedService.features || []).map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1" />
                  <div className="text-gray-700">{f}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => { setShowModal(false); setSelectedService(null); }} className="flex-1 px-4 py-2 border rounded-lg">Đóng</button>
              <button onClick={() => handleBuy(selectedService)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Mua ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
