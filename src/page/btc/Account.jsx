import React, { useState } from "react";
import {
  Lock,
  Settings,
  User,
  Building2,
  Users,
  FileText,
  Bell,
  Shield,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Activity,
  Clock,
  Info
} from "lucide-react";

export default function Account() {
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState({
    basicInfo: {
      id: "123",
      name: "Tổ chức Thanh Niên Việt",
      description:
        "Một tổ chức phi lợi nhuận tập trung vào giáo dục, môi trường và cộng đồng.",
      foundedYear: new Date("2018-05-10").getFullYear(),
      followers: 15820,
      ratting: 4.7,
      totalEvent: 64,
      avatarUrl:
        "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1757697564/logo_gzqetp.svg",
      isVerify: true,
      slug: ""
    },
    contactInfo: {
      mail: "info@tcyv.org",
      phone: "+84 912 345 678",
      websiteUrl: "https://tcyv.org",
      address: "123 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh"
    },
    services: [
      {
        id: "SV001",
        name: "Premium Account",
        status: "active",
        description: "Tài khoản cao cấp với nhiều tính năng nâng cao",
        rateLimit: "Unlimited",
        startDate: "2025-01-15",
        endDate: "2026-01-15"
      },
      {
        id: "SV002",
        name: "Featured Events Package",
        status: "active",
        description: "Gói đẩy sự kiện lên trang chủ trong 3 tháng",
        rateLimit: "20 sự kiện",
        startDate: "2025-02-01",
        endDate: "2025-05-01"
      },
      {
        id: "SV003",
        name: "Advanced Analytics",
        status: "expired",
        description: "Báo cáo và phân tích chuyên sâu",
        rateLimit: "0",
        startDate: "2024-06-01",
        endDate: "2024-12-01"
      }
    ],
    payment: {
      method: {
        type: "Credit Card",
        provider: "Vietcombank",
        lastFourDigits: "1234"
      },
      history: [
        {
          id: "PMT001",
          name: "Thanh toán Premium Account",
          totalBuild: "2,500,000 VND",
          payDate: "2025-01-15"
        },
        {
          id: "PMT002",
          name: "Thanh toán Featured Events Package",
          totalBuild: "1,200,000 VND",
          payDate: "2025-02-01"
        },
        {
          id: "PMT003",
          name: "Thanh toán Advanced Analytics",
          totalBuild: "800,000 VND",
          payDate: "2024-06-01"
        }
      ]
    }
  });

  // snapshot lưu khi bắt đầu edit để revert khi cancel
  const [originalData, setOriginalData] = useState(null);

  // lỗi ngắn (name, mail, phone, ...)
  const [err, setErr] = useState({});

  const menuItems = [
    { id: "info", icon: Building2, label: "Thông tin tổ chức", active: true },
    { id: "password", icon: Lock, label: "Đổi mật khẩu", active: false }
  ];

  const getShortKey = (col) => {
    if (!col) return col;
    const parts = col.split(".");
    return parts[parts.length - 1];
  };

  const handleErr = (col, value) => {
    const shortKey = getShortKey(col);
    const setFieldError = (key, msg) => {
      setErr((prev) => {
        const next = { ...prev };
        if (msg) next[key] = msg;
        else delete next[key];
        return next;
      });
    };

    const val = (value ?? "").toString().trim();

    // NAME
    if (shortKey === "name") {
      if (!val) {
        setFieldError(shortKey, "Tên không được để trống.");
        return false;
      }
      const allDigits = /^[0-9]+$/.test(val);
      if (allDigits) {
        setFieldError(shortKey, "Tên không được chỉ chứa số.");
        return false;
      }
      setFieldError(shortKey, null);
      return true;
    }

    // EMAIL
    if (shortKey === "mail" || shortKey === "email") {
      if (!val) {
        setFieldError(shortKey, "Email không được để trống.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setFieldError(shortKey, "Email không đúng định dạng.");
        return false;
      }
      setFieldError(shortKey, null);
      return true;
    }

    // PHONE (hiện tại chỉ cho phép chữ số khi validate; chấp nhận +/spaces nếu muốn sẽ chỉnh sau)
    if (shortKey === "phone") {
      if (!val) {
        setFieldError(shortKey, "Số điện thoại không được để trống.");
        return false;
      }
      const stripped = val.replace(/\s+/g, "");
      const phoneRegex = /^[0-9]+$/;
      if (!phoneRegex.test(stripped)) {
        setFieldError(shortKey, "Số điện thoại chỉ được chứa chữ số (0-9).");
        return false;
      }
      if (stripped.length < 8 || stripped.length > 15) {
        setFieldError(
          shortKey,
          "Số điện thoại có độ dài không hợp lệ (8-15 chữ số)."
        );
        return false;
      }
      setFieldError(shortKey, null);
      return true;
    }

    // default
    setFieldError(shortKey, null);
    return true;
  };

  const validateAll = () => {
    const v1 = handleErr("basicInfo.name", data.basicInfo.name);
    const v2 = handleErr("contactInfo.mail", data.contactInfo.mail);
    const v3 = handleErr("contactInfo.phone", data.contactInfo.phone);
    return v1 && v2 && v3;
  };

  const startEdit = () => {
    // deep copy snapshot
    setOriginalData(JSON.parse(JSON.stringify(data)));
    setIsEditing(true);
  };

  const cancelEdit = () => {
    if (originalData) {
      setData(JSON.parse(JSON.stringify(originalData)));
      setOriginalData(null);
    }
    setErr({});
    setIsEditing(false);
  };

  const saveEdit = () => {
    const ok = validateAll();
    if (!ok) {
      console.log("Có lỗi, không thể lưu", err);
      return;
    }

    // TODO: gọi API lưu ở đây (fetch/axios). Ví dụ:
    // await api.updateOrganization(data)

    console.log("Lưu thành công (giả lập):", data);

    // giả sử lưu thành công:
    setOriginalData(null);
    setErr({});
    setIsEditing(false);
  };

  const onFieldChange = (path, value) => {
    if (!isEditing) return;
    const parts = path.split(".");
    if (parts.length === 2) {
      const [parent, key] = parts;
      setData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [key]: value
        }
      }));
      handleErr(path, value);
    } else {
      setData((prev) => ({ ...prev, [path]: value }));
      handleErr(path, value);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">
                    Thông tin cơ bản
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Thông tin nhận diện tổ chức.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên tổ chức
                  </label>
                  <input
                    type="text"
                    value={data.basicInfo.name}
                    readOnly={!isEditing}
                    onChange={(e) => onFieldChange("basicInfo.name", e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      err.name ? "border-red-300" : "border-gray-300"
                    } ${!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}`}
                  />
                  {err.name && (
                    <span className="text-red-500 text-xs flex gap-1 items-center mt-2">
                      <Info size={16} /> {err.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã tổ chức
                  </label>
                  <input
                    type="text"
                    value={data.basicInfo.id}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      data.basicInfo.isVerify
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {data.basicInfo.isVerify ? (
                      <Activity className="w-4 h-4 mr-1" />
                    ) : (
                      <Clock className="w-4 h-4 mr-1" />
                    )}
                    {data.basicInfo.isVerify ? "Đã xác thực" : "Chưa xác thực"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Thông tin liên hệ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={data.contactInfo.mail}
                    readOnly={!isEditing}
                    onChange={(e) => onFieldChange("contactInfo.mail", e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      err.mail ? "border-red-300" : "border-gray-300"
                    } ${!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}`}
                  />
                  {err.mail && (
                    <span className="text-red-500 text-xs flex gap-1 items-center mt-2">
                      <Info size={16} /> {err.mail}
                    </span>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={data.contactInfo.phone}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      onFieldChange("contactInfo.phone", e.target.value)
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      err.phone ? "border-red-300" : "border-gray-300"
                    } ${!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}`}
                  />
                  {err.phone && (
                    <span className="text-red-500 text-xs flex gap-1 items-center mt-2">
                      <Info size={16} /> {err.phone}
                    </span>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    Địa chỉ
                  </label>
                  <textarea
                    value={data.contactInfo.address}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      onFieldChange("contactInfo.address", e.target.value)
                    }
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                    }`}
                    rows="3"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "password":
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Đổi mật khẩu
            </h3>
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Cập nhật mật khẩu
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý hồ sơ tổ chức
            </h1>
            <p className="text-gray-600 mt-2">Quản lý thông tin tổ chức</p>
          </div>

          {!isEditing ? (
            <button
              onClick={startEdit}
              className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm hover:bg-yellow-200"
            >
              Chỉnh sửa hồ sơ
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
