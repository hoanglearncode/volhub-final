import React, { useState } from "react";
import {
  Shield,
  Eye,
  EyeOff,
  Users,
  Mail,
  Phone,
  Globe,
  Lock,
  Bell,
  MessageSquare,
  Calendar,
  User,
  Settings,
  ChevronRight,
  Info,
  Check,
  X
} from "lucide-react";

export default function PrivacySettings() {
  // Privacy states
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [emailVisibility, setEmailVisibility] = useState("friends");
  const [phoneVisibility, setPhoneVisibility] = useState("private");
  const [activityStatus, setActivityStatus] = useState(true);
  const [eventParticipation, setEventParticipation] = useState("public");
  const [directMessages, setDirectMessages] = useState("anyone");
  const [eventInvitations, setEventInvitations] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Notification states
  const [emailNotifications, setEmailNotifications] = useState({
    eventUpdates: true,
    newMessages: true,
    eventInvitations: true,
    systemUpdates: false,
    weeklyDigest: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    eventReminders: true,
    newMessages: true,
    eventInvitations: true,
    communityUpdates: false
  });

  const [activeSection, setActiveSection] = useState("profile");

  // Toggle helpers
  const toggleSwitch = (setter, value) => setter(!value);

  const toggleEmailNotification = (key) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const togglePushNotification = (key) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Sections meta
  const privacySections = [
    {
      id: "profile",
      title: "Hồ sơ & Thông tin",
      icon: User,
      description: "Kiểm soát ai có thể xem thông tin cá nhân của bạn"
    },
    {
      id: "communication",
      title: "Giao tiếp",
      icon: MessageSquare,
      description: "Quản lý cách người khác có thể liên lạc với bạn"
    },
    {
      id: "notifications",
      title: "Thông báo",
      icon: Bell,
      description: "Tùy chỉnh thông báo bạn nhận được"
    },
    {
      id: "data",
      title: "Dữ liệu & Bảo mật",
      icon: Shield,
      description: "Kiểm soát việc thu thập và sử dụng dữ liệu"
    }
  ];

  const visibilityOptions = [
    { value: "public", label: "Công khai", description: "Mọi người có thể xem" },
    { value: "friends", label: "Bạn bè", description: "Chỉ những người trong mạng lưới của bạn" },
    { value: "private", label: "Riêng tư", description: "Chỉ mình bạn có thể xem" }
  ];

  // Small UI primitives
  const Switch = ({ checked, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange()}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? 'bg-blue-600' : 'bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      aria-pressed={checked}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const RadioGroup = ({ value, onChange, options, name }) => (
    <div className="space-y-3">
      {options.map((option) => (
        <label key={option.value} className="flex items-start gap-3 cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <div className="flex-1">
            <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
              {option.label}
            </div>
            <div className="text-sm text-slate-600">{option.description}</div>
          </div>
        </label>
      ))}
    </div>
  );

  // Section renderers
  const renderProfileSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Khả năng hiển thị hồ sơ</h3>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-start gap-3 mb-4">
            <Globe className="text-blue-500 mt-1" size={20} />
            <div className="flex-1">
              <div className="font-medium text-slate-800">Hồ sơ công khai</div>
              <div className="text-sm text-slate-600 mt-1">Ai có thể xem hồ sơ của bạn</div>
            </div>
          </div>
          <RadioGroup
            value={profileVisibility}
            onChange={setProfileVisibility}
            options={visibilityOptions}
            name="profileVisibility"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Thông tin liên lạc</h3>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-start gap-3 mb-4">
              <Mail className="text-green-500 mt-1" size={20} />
              <div className="flex-1">
                <div className="font-medium text-slate-800">Email</div>
                <div className="text-sm text-slate-600 mt-1">Ai có thể xem địa chỉ email của bạn</div>
              </div>
            </div>
            <RadioGroup
              value={emailVisibility}
              onChange={setEmailVisibility}
              options={visibilityOptions}
              name="emailVisibility"
            />
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-start gap-3 mb-4">
              <Phone className="text-purple-500 mt-1" size={20} />
              <div className="flex-1">
                <div className="font-medium text-slate-800">Số điện thoại</div>
                <div className="text-sm text-slate-600 mt-1">Ai có thể xem số điện thoại của bạn</div>
              </div>
            </div>
            <RadioGroup
              value={phoneVisibility}
              onChange={setPhoneVisibility}
              options={visibilityOptions}
              name="phoneVisibility"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Hoạt động</h3>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Eye className="text-blue-500 mt-1" size={20} />
                <div>
                  <div className="font-medium text-slate-800">Hiển thị trạng thái hoạt động</div>
                  <div className="text-sm text-slate-600 mt-1">Cho phép người khác biết khi bạn đang online</div>
                </div>
              </div>
              <Switch
                checked={showOnlineStatus}
                onChange={() => toggleSwitch(setShowOnlineStatus, showOnlineStatus)}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-start gap-3 mb-4">
              <Calendar className="text-orange-500 mt-1" size={20} />
              <div className="flex-1">
                <div className="font-medium text-slate-800">Tham gia sự kiện</div>
                <div className="text-sm text-slate-600 mt-1">Ai có thể xem các sự kiện bạn tham gia</div>
              </div>
            </div>
            <RadioGroup
              value={eventParticipation}
              onChange={setEventParticipation}
              options={visibilityOptions}
              name="eventParticipation"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunicationSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Tin nhắn trực tiếp</h3>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-start gap-3 mb-4">
            <MessageSquare className="text-blue-500 mt-1" size={20} />
            <div className="flex-1">
              <div className="font-medium text-slate-800">Ai có thể gửi tin nhắn cho bạn</div>
              <div className="text-sm text-slate-600 mt-1">Kiểm soát ai có thể liên lạc trực tiếp với bạn</div>
            </div>
          </div>
          <RadioGroup
            value={directMessages}
            onChange={setDirectMessages}
            options={[
              { value: "anyone", label: "Bất kỳ ai", description: "Tất cả người dùng có thể gửi tin nhắn" },
              { value: "friends", label: "Bạn bè", description: "Chỉ người trong mạng lưới của bạn" },
              { value: "none", label: "Không ai", description: "Không cho phép tin nhắn trực tiếp" }
            ]}
            name="directMessages"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Lời mời sự kiện</h3>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Calendar className="text-green-500 mt-1" size={20} />
              <div>
                <div className="font-medium text-slate-800">Nhận lời mời sự kiện</div>
                <div className="text-sm text-slate-600 mt-1">Cho phép BTC gửi lời mời tham gia sự kiện</div>
              </div>
            </div>
            <Switch
              checked={eventInvitations}
              onChange={() => toggleSwitch(setEventInvitations, eventInvitations)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Thông báo qua Email</h3>
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
          {Object.entries(emailNotifications).map(([key, value]) => {
            const labels = {
              eventUpdates: "Cập nhật sự kiện",
              newMessages: "Tin nhắn mới",
              eventInvitations: "Lời mời sự kiện",
              systemUpdates: "Cập nhật hệ thống",
              weeklyDigest: "Tóm tắt hàng tuần"
            };

            const descriptions = {
              eventUpdates: "Thông báo khi có thay đổi trong sự kiện bạn tham gia",
              newMessages: "Thông báo khi có tin nhắn mới trong hộp thư",
              eventInvitations: "Thông báo khi được mời tham gia sự kiện",
              systemUpdates: "Thông báo về các cập nhật quan trọng của hệ thống",
              weeklyDigest: "Tóm tắt hoạt động hàng tuần của bạn"
            };

            return (
              <div key={key} className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium text-slate-800">{labels[key]}</div>
                  <div className="text-sm text-slate-600">{descriptions[key]}</div>
                </div>
                <Switch
                  checked={value}
                  onChange={() => toggleEmailNotification(key)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Thông báo đẩy</h3>
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
          {Object.entries(pushNotifications).map(([key, value]) => {
            const labels = {
              eventReminders: "Nhắc nhở sự kiện",
              newMessages: "Tin nhắn mới",
              eventInvitations: "Lời mời sự kiện",
              communityUpdates: "Cập nhật cộng đồng"
            };

            const descriptions = {
              eventReminders: "Nhắc nhở trước khi sự kiện diễn ra",
              newMessages: "Thông báo tin nhắn mới ngay lập tức",
              eventInvitations: "Thông báo lời mời sự kiện mới",
              communityUpdates: "Cập nhật từ cộng đồng bạn theo dõi"
            };

            return (
              <div key={key} className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium text-slate-800">{labels[key]}</div>
                  <div className="text-sm text-slate-600">{descriptions[key]}</div>
                </div>
                <Switch
                  checked={value}
                  onChange={() => togglePushNotification(key)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderDataSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Thu thập dữ liệu</h3>
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-start gap-3">
              <Shield className="text-blue-500 mt-1" size={20} />
              <div>
                <div className="font-medium text-slate-800">Phân tích hoạt động</div>
                <div className="text-sm text-slate-600">Cho phép thu thập dữ liệu để cải thiện trải nghiệm</div>
              </div>
            </div>
            <Switch
              checked={dataCollection}
              onChange={() => toggleSwitch(setDataCollection, dataCollection)}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-start gap-3">
              <Mail className="text-green-500 mt-1" size={20} />
              <div>
                <div className="font-medium text-slate-800">Email marketing</div>
                <div className="text-sm text-slate-600">Nhận email về các tính năng mới và cập nhật</div>
              </div>
            </div>
            <Switch
              checked={marketingEmails}
              onChange={() => toggleSwitch(setMarketingEmails, marketingEmails)}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quản lý dữ liệu</h3>
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Info className="text-blue-500" size={20} />
              <div>
                <div className="font-medium text-slate-800">Tải xuống dữ liệu</div>
                <div className="text-sm text-slate-600">Tải xuống tất cả dữ liệu cá nhân của bạn</div>
              </div>
            </div>
            <button
              onClick={() => alert("Yêu cầu tải dữ liệu đã gửi.")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tải xuống
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-3">
              <X className="text-red-500" size={20} />
              <div>
                <div className="font-medium text-slate-800">Xóa tài khoản</div>
                <div className="text-sm text-slate-600">Xóa vĩnh viễn tài khoản và tất cả dữ liệu</div>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm("Bạn có chắc muốn xóa tài khoản vĩnh viễn?")) {
                  alert("Yêu cầu xóa đã gửi.");
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "communication":
        return renderCommunicationSection();
      case "notifications":
        return renderNotificationsSection();
      case "data":
        return renderDataSection();
      default:
        return renderProfileSection();
    }
  };

  // Save handler (stub - replace with API call)
  const handleSave = () => {
    const payload = {
      profileVisibility,
      emailVisibility,
      phoneVisibility,
      showOnlineStatus,
      eventParticipation,
      directMessages,
      eventInvitations,
      emailNotifications,
      pushNotifications,
      dataCollection,
      marketingEmails
    };
    console.log("Saving privacy settings:", payload);
    alert("Cài đặt đã được lưu (console có payload).");
  };

  const handleReset = () => {
    if (!confirm("Đặt lại cài đặt về mặc định?")) return;
    // reset to defaults
    setProfileVisibility("public");
    setEmailVisibility("friends");
    setPhoneVisibility("private");
    setShowOnlineStatus(true);
    setEventParticipation("public");
    setDirectMessages("anyone");
    setEventInvitations(true);
    setEmailNotifications({
      eventUpdates: true,
      newMessages: true,
      eventInvitations: true,
      systemUpdates: false,
      weeklyDigest: true
    });
    setPushNotifications({
      eventReminders: true,
      newMessages: true,
      eventInvitations: true,
      communityUpdates: false
    });
    setDataCollection(true);
    setMarketingEmails(false);
    alert("Đã đặt lại về mặc định.");
  };

  return (
    <div className="min-h-[60vh] bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-green-600" size={28} />
            <div>
              <h2 className="text-2xl font-bold">Cài đặt quyền riêng tư</h2>
              <div className="text-sm text-slate-600">Quản lý ai có thể nhìn thấy thông tin và cách bạn nhận thông báo</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleReset} className="px-4 py-2 border rounded-md text-sm">Đặt lại</button>
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md text-sm">Lưu</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left menu */}
          <aside className="md:col-span-1 bg-white rounded-xl border border-gray-200 p-4">
            <div className="space-y-2">
              {privacySections.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      activeSection === s.id ? "bg-green-50 border border-green-100" : "hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} className="text-slate-700 mt-1" />
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">{s.title}</div>
                      <div className="text-xs text-slate-500">{s.description}</div>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content */}
          <main className="md:col-span-3">
            {renderSectionContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
