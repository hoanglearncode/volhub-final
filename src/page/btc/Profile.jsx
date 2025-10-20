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
import ProfileTab from '../../components/btc/profile/ProfileTab';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

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

const Badge = ({ children, className = '' }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
);

const BASE_API = import.meta.env.VITE_API


const ServicesTab = () => {
  const [services, setServices] = useState([]);
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
        <div key={s?.id} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">{s?.name}</h4>
                <Badge className={s?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>{s?.status === 'active' ? 'Đang hoạt động' : 'Đã hết hạn'}</Badge>
              </div>
              <p className="text-sm text-gray-600">{s?.description}</p>
              <div className="text-xs text-gray-500 mt-2">{s?.startDate || '-'} • Hết hạn: {s?.endDate || '-'}</div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button onClick={() => onView && onView(s?.id)} className="p-2 rounded-lg bg-gray-50">
                  <Eye className="w-4 h-4" />
                </button>
                <button onClick={() => onConfig && onConfig(s?.id)} className="p-2 rounded-lg bg-gray-50">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              {s?.status !== 'active' && (
                <button onClick={() => onDelete && onDelete(s?.id)} className="text-red-600 text-sm">Xóa</button>
              )}
            </div>
          </div>

          {s?.status === 'active' && s?.rateLimit && (
            <div className="mt-3 text-sm text-gray-600 border-t pt-3">Sử dụng trong tháng: <span className="font-medium">{s?.rateLimit}</span></div>
          )}
        </div>
      ))}
    </div>
  );
};

const MarketplaceTab = () => {
  const [serviceCategories, setServiceCategories] = useState([]);
  const [available, setAvailable] = useState([]);
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-3 overflow-x-auto">
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">Tất cả</button>
          {Object.keys(serviceCategories).map((k) => {
            const Icon = serviceCategories[k]?.icon;
            return (
              <button key={k} className="px-3 py-2 border border-gray-200 rounded-lg flex items-center gap-2">
                <Icon className="w-4 h-4" />{serviceCategories[k]?.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {available.map((s) => {
          const Icon = s?.icon || Sparkles;
          const color = colorMap[s?.color] || colorMap.gray;
          return (
            <div key={s?.id} className="bg-white rounded-xl p-4 shadow-sm relative">
              {s?.discount && <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">-{s.discount}</div>}
              <div className="flex items-start gap-3">
                <div className={`${color.split(' ')[0]} p-3 rounded-lg`}>
                  <Icon className={`${color.split(' ')[1]} w-6 h-6`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{s?.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{s?.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{s?.period}</div>
                      <div className="font-semibold text-gray-900">{s?.price}</div>
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

const BillingTab = () => {
  const { user, token } = useAuth();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ type: "", provider: "", lastFourDigits: "" });
  const [errors, setErrors] = useState({});

  // ✅ Load thông tin thanh toán
  useEffect(() => {
    if (!user?.userId) return;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_API}/api/payment/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res?.data?.code === 0) {
          setPayment(res.data.result);
        } else {
          setPayment(null);
        }
      } catch (err) {
        console.error("Lỗi tải thông tin thanh toán:", err);
        toast.error("Không thể tải thông tin thanh toán.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.userId]);

  // ✅ Validate dữ liệu trước khi lưu
  const validatePayment = (data) => {
    const newErrors = {};
    const safeText = /^[a-zA-Z0-9\s\-_.,]+$/;
    const safeDigits = /^[0-9]{4}$/;

    if (!data.type || !safeText.test(data.type)) newErrors.type = "Loại thanh toán không hợp lệ";
    if (!data.provider || !safeText.test(data.provider)) newErrors.provider = "Nhà cung cấp không hợp lệ";
    if (!safeDigits.test(data.lastFourDigits)) newErrors.lastFourDigits = "4 số cuối không hợp lệ";

    return newErrors;
  };

  // ✅ Lưu thay đổi hoặc thêm mới
  const handleSave = async () => {
    const newErrors = validatePayment(editData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await axios.post(
        `${BASE_API}/api/payment/save`,
        { ...editData, userId: user.userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res?.data?.code === 0) {
        toast.success("Cập nhật phương thức thanh toán thành công!");
        setPayment(res.data.result);
        setEditing(false);
      } else {
        toast.error("Lưu thất bại, vui lòng thử lại!");
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Có lỗi khi lưu phương thức thanh toán.");
    }
  };

  // ✅ Xóa phương thức thanh toán
  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa phương thức thanh toán này?")) return;
    try {
      const res = await axios.delete(`${BASE_API}/api/payment/${user.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res?.data?.code === 0) {
        setPayment(null);
        toast.success("Xóa phương thức thanh toán thành công!");
      } else {
        toast.error("Không thể xóa phương thức thanh toán.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi xóa dữ liệu.");
    }
  };

  // ✅ Hiển thị khi chưa có dữ liệu
  if (loading) {
    return <div className="text-center py-8 text-gray-500">Đang tải thông tin thanh toán...</div>;
  }

  if (!payment && !editing) {
    return (
      <div className="bg-white rounded-xl p-6 text-center">
        <CreditCard className="w-14 h-14 text-gray-300 mx-auto mb-4" />
        <div className="font-semibold text-gray-800">Chưa có thông tin thanh toán</div>
        <div className="text-sm text-gray-500 mt-2 mb-4">
          Thêm phương thức để mua dịch vụ nhanh hơn
        </div>
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="inline w-4 h-4 mr-1" /> Thêm phương thức
        </button>
      </div>
    );
  }

  // ✅ Form chỉnh sửa hoặc thêm
  if (editing) {
    return (
      <div className="bg-white rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Cập nhật phương thức thanh toán</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Loại phương thức</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={editData.type}
              onChange={(e) => setEditData((p) => ({ ...p, type: e.target.value }))}
            />
            {errors.type && <div className="text-xs text-red-500 mt-1">{errors.type}</div>}
          </div>
          <div>
            <label className="text-sm text-gray-600">Nhà cung cấp</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={editData.provider}
              onChange={(e) => setEditData((p) => ({ ...p, provider: e.target.value }))}
            />
            {errors.provider && <div className="text-xs text-red-500 mt-1">{errors.provider}</div>}
          </div>
          <div>
            <label className="text-sm text-gray-600">4 số cuối thẻ</label>
            <input
              type="text"
              maxLength={4}
              className="w-full border rounded-lg p-2"
              value={editData.lastFourDigits}
              onChange={(e) => setEditData((p) => ({ ...p, lastFourDigits: e.target.value }))}
            />
            {errors.lastFourDigits && (
              <div className="text-xs text-red-500 mt-1">{errors.lastFourDigits}</div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setEditing(false)}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Lưu
          </button>
        </div>
      </div>
    );
  }

  // ✅ Hiển thị thông tin thanh toán và lịch sử
  return (
    <div className="space-y-3">
      <div className="bg-white p-4 rounded-xl flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-700 font-medium">{payment.method?.type}</div>
          <div className="text-xs text-gray-500">{payment.method?.provider}</div>
          <div className="text-sm font-semibold text-gray-900 mt-2">
            **** **** **** {payment.method?.lastFourDigits}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditData(payment.method);
              setEditing(true);
            }}
            className="px-3 py-2 border rounded-lg flex items-center gap-1"
          >
            <Edit3 className="w-4 h-4" /> Chỉnh sửa
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-600 text-white rounded-lg flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Xóa
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl">
        <h4 className="font-semibold mb-2">Lịch sử hóa đơn</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {(payment.history || []).length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-4">Chưa có hóa đơn</div>
          ) : (
            payment.history.map((it) => (
              <div
                key={it.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <div className="text-sm font-medium text-gray-800">{it.name}</div>
                  <div className="text-xs text-gray-500">{it.payDate}</div>
                </div>
                <div className="font-semibold text-gray-900">{it.totalBuild}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

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

export default function OrgProfileManagement() {
  const [active, setActive] = useState('profile');

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
        {active === 'profile' && <ProfileTab />}
        {active === 'services' && <ServicesTab />}
        {active === 'marketplace' && <MarketplaceTab />}
        {active === 'billing' && <BillingTab />}
        {active === 'settings' && <SettingsTab />}
      </div>

      <ToastContainer />
    </div>
  );
}
