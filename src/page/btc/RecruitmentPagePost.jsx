// RecruitmentEventPage.jsx
import React, { useEffect, useState } from "react";
import {
  Calendar, Clock, MapPin, Users, Award, DollarSign,
  Upload, Tag, Shield, Heart, Star, Building, Phone,
  Mail, Globe, Image, X, Plus, CheckCircle, Info,
  AlertCircle, Save, Send, Ban, MessageSquare, Eye,
  Edit
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API || ""; // base url

// Format date+time -> "YYYY-MM-DDTHH:mm:ss" (ISO LocalDateTime)
function formatDateTimeISO(dateStr /* 'YYYY-MM-DD' */, timeStr /* 'HH:mm' or '' */) {
  if (!dateStr) return null;
  const dateParts = dateStr.split("-").map(Number);
  if (dateParts.length !== 3) return null;
  let hh = "00", mm = "00", ss = "00";
  if (timeStr) {
    const t = timeStr.split(":");
    hh = String(Number(t[0] || 0)).padStart(2, "0");
    mm = String(Number(t[1] || 0)).padStart(2, "0");
  }
  // standard ISO LocalDateTime (no timezone)
  return `${dateStr}T${hh}:${mm}:${ss}`;
}

// If backend for some reason expects "YYYY-MM-DDThh-mm-ss" (dashes between time parts) 
// change separator here (not recommended). Example: return `${dateStr}T${hh}-${mm}-${ss}`;
function formatDateTimeForBackend(dateStr, timeStr) {
  return formatDateTimeISO(dateStr, timeStr);
}

function isValidEmail(s) {
  if (!s) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(s).trim());
}

function isValidPhone(s) {
  if (!s) return false;
  const cleaned = String(s).trim().replace(/\s+/g, "");
  if (/^\+?[0-9]+$/.test(cleaned)) {
    const digits = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
    return digits.length >= 8 && digits.length <= 15;
  }
  return false;
}

function isAllDigits(str) {
  const s = String(str ?? "").trim().replace(/\s+/g, "");
  return /^[0-9]+$/.test(s);
}

/* -------------------- Component -------------------- */

export default function RecruitmentEventPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { slug } = useParams(); // if using react-router with :slug
  const isEditMode = !!slug;

  // Organization info
  const [orzInfo, setOrzInfo] = useState({});

  // Cover file + preview
  const [media, setMedia] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  // Basic pieces (kept similar to your original)
  const [basicInfor, setBasicInfor] = useState({
    title: "",
    description: "",
    category: "",
    eventType: "NON_PROFIT"
  });

  const [timeLocaltion, setTimeLocaltion] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    isOnline: false,
    location: "",
    detailLocation: "",
    onlineLink: ""
  });

  const [Requirements, setRequirements] = useState({
    volunteersNeeded: 10,
    registrationDeadline: "", // store as date 'YYYY-MM-DD' (we will format when sending)
    minAge: 16,
    maxAge: 40,
    genderRequirement: "NONE",
    experienceLevel: "NEWBIE",
    detail: ""
  });

  const [contactInfo, setContactInfo] = useState({
    coordinatorName: "",
    phone: "",
    email: "",
    alternateContact: ""
  });

  // extra form state (tags, benefits, priority, flags)
  const [formExtras, setFormExtras] = useState({
    tags: [],
    benefits: {
      meals: false, transportation: false, accommodation: false,
      insurance: false, certificate: true, allowance: false,
      allowanceAmount: 0, descriptionBenfits: '', uniform: false,
      training: false, another: false
    },
    discriptions: "",
    autoApprove: false,
    requireBackground: false,
    priority: "NORMAL"
  });

  // errors
  const [err, setErr] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock choices
  const categories = ["Môi trường", "Giáo dục", "Y tế", "Cộng đồng"];
  const tagsList = ["Thiện nguyện", "Cộng đồng", "Thanh niên"];
  const interest = [
    { value: "allowance", label: "Phụ cấp" },
    { value: "accommodation", label: "Chỗ ở" },
    { value: "meals", label: "Ăn uống" },
    { value: "certificate", label: "Chứng nhận" },
    { value: "training", label: "Đào tạo" },
    { value: "transportation", label: "Hỗ trợ đi lại" },
    { value: "insurance", label: "Bảo hiểm" },
    { value: "uniform", label: "Đồng phục" },
    { value: "another", label: "Khác" }
  ];

  useEffect(() => {
    (async () => {
      try {
        const infoData = await axios.get(`${API_BASE}/api/btc/profile/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (infoData?.data?.code === 0) {
          setOrzInfo(infoData.data.result.basicInfo || {});
        } else {
          // may be unauthorized or empty; keep defaults
        }
      } catch (e) {
        console.error("Load org info failed", e);
        toast.error("Lỗi khi tải thông tin tổ chức");
      }
    })();
  }, [token]);

  useEffect(() => {
    if (!isEditMode) return;
    // load event data by slug and populate form
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/events/${encodeURIComponent(slug)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const event = res?.data?.result || res?.data || null;
        if (!event) {
          toast.error("Không tìm thấy sự kiện để chỉnh sửa.");
          return;
        }

        // Map server event to local state
        // Trying to be resilient: accept event fields like startDateTime, startAt, start, etc.
        const startSource = event.startDateTime || event.startDate || event.startAt || event.start;
        const endSource = event.endDateTime || event.endDate || event.endAt || event.end;

        // helper parse 'YYYY-MM-DDTHH:mm:ss' -> { date, time }
        const splitDateTime = (s) => {
          if (!s) return { date: "", time: "" };
          // Accept possible formats:
          // 1) '2025-10-07T14:30:00'
          // 2) '2025-10-07 14:30:00'
          // 3) '2025-10-07T14-30-00' (rare)
          const normalized = String(s).replace(" ", "T");
          const parts = normalized.split("T");
          if (parts.length < 2) return { date: parts[0] || "", time: "" };
          let time = parts[1].split(".")[0]; // strip zone or ms
          // if time contains '-' as separator, convert to ':'
          time = time.replace(/-/g, ":");
          // keep only hh:mm
          const hhmm = time.split(":").slice(0, 2).join(":");
          return { date: parts[0], time: hhmm };
        };

        const start = splitDateTime(startSource);
        const end = splitDateTime(endSource);

        setBasicInfor((p) => ({
          ...p,
          title: event.title || event.name || p.title,
          description: event.description || p.description,
          category: event.category || p.category,
          eventType: event.eventType || p.eventType
        }));

        setTimeLocaltion((p) => ({
          ...p,
          startDate: start.date || "",
          startTime: start.time || "",
          endDate: end.date || "",
          endTime: end.time || "",
          isOnline: !!event.isOnline,
          location: event.location || p.location,
          detailLocation: event.address || event.detailLocation || p.detailLocation,
          onlineLink: event.onlineLink || p.onlineLink || ""
        }));

        setRequirements((p) => ({
          ...p,
          volunteersNeeded: event.volunteersNeeded ?? p.volunteersNeeded,
          registrationDeadline: event.registrationDeadline ? (String(event.registrationDeadline).split("T")[0]) : p.registrationDeadline,
          minAge: event.minAge ?? p.minAge,
          maxAge: event.maxAge ?? p.maxAge,
          genderRequirement: event.genderRequirement || p.genderRequirement,
          experienceLevel: event.experienceLevel || p.experienceLevel,
          detail: event.requirementsDetail || p.detail
        }));

        setContactInfo((p) => ({
          ...p,
          coordinatorName: event.coordinatorName || p.coordinatorName,
          phone: event.phone || p.phone,
          email: event.email || p.email,
          alternateContact: event.alternateContact || p.alternateContact
        }));

        // extras
        setFormExtras((p) => ({
          ...p,
          tags: event.tags || p.tags,
          benefits: {
            ...p.benefits,
            ...event.benefits // assume backend uses same shape
          },
          autoApprove: !!event.autoApprove,
          requireBackground: !!event.requireBackground,
          priority: event.priority || p.priority
        }));

        // cover preview if event.coverUrl or similar
        if (event.coverUrl) {
          setCoverPreview(event.coverUrl);
        }

      } catch (e) {
        console.error("Load event fail", e);
        toast.error("Lỗi khi tải dữ liệu sự kiện để chỉnh sửa.");
      }
    })();
  }, [isEditMode, slug, token]);

  /* ------------------ Basic handlers ------------------ */

  const handleInfo = (field, value) => {
    setBasicInfor(prev => ({ ...prev, [field]: value }));
    // quick validation: title not all digits
    if (field === "title") {
      if (isAllDigits(value)) {
        setErr(prev => ({ ...prev, title: "Tiêu đề không được chỉ gồm chữ số." }));
      } else {
        setErr(prev => { const n = { ...prev }; delete n.title; return n; });
      }
    }
  };

  const handleTimeLocaltion = (col, val) => {
    // reuse most of your original validation logic, but update state at end
    const next = { ...timeLocaltion, [col]: val };

    const parseDate = (d) => {
      if (!d) return null;
      const parts = d.split("-").map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) return null;
      return new Date(parts[0], parts[1] - 1, parts[2]);
    };
    const parseDateTime = (date, time) => {
      if (!date) return null;
      const dObj = parseDate(date);
      if (!dObj) return null;
      const [hhStr = "00", mmStr = "00"] = (time || "00:00").split(":");
      const hh = Number(hhStr), mm = Number(mmStr);
      if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
      return new Date(dObj.getFullYear(), dObj.getMonth(), dObj.getDate(), hh, mm, 0);
    };
    const isValidTimeFormat = (t) => {
      if (!t) return false;
      return /^([01]\d|2[0-3]):([0-5]\d)$/.test(t);
    };

    const newErr = { ...err };

    // startDate mandatory
    if (!next.startDate) newErr.startDate = "Ngày bắt đầu là bắt buộc.";
    else delete newErr.startDate;

    // startTime format if provided
    if (next.startTime) {
      if (!isValidTimeFormat(next.startTime)) newErr.startTime = "Giờ bắt đầu không hợp lệ (HH:MM).";
      else delete newErr.startTime;
    } else delete newErr.startTime;

    // endTime requires endDate
    if (next.endTime && !next.endDate) {
      newErr.endDate = "Vui lòng chọn ngày kết thúc khi nhập giờ kết thúc.";
    } else {
      // keep other errors
    }

    // compare dates
    if (next.startDate && next.endDate) {
      const sd = parseDate(next.startDate), ed = parseDate(next.endDate);
      if (!sd) newErr.startDate = "Ngày bắt đầu không hợp lệ.";
      if (!ed) newErr.endDate = "Ngày kết thúc không hợp lệ.";
      if (sd && ed) {
        if (ed < sd) newErr.endDate = "Ngày kết thúc phải không sớm hơn ngày bắt đầu.";
        else delete newErr.endDate;
      }
    }

    // compare times if both available
    if (next.startDate && next.startTime && next.endDate && next.endTime) {
      const sdt = parseDateTime(next.startDate, next.startTime);
      const edt = parseDateTime(next.endDate, next.endTime);
      if (!sdt) newErr.startTime = "Giờ bắt đầu không hợp lệ.";
      if (!edt) newErr.endTime = "Giờ kết thúc không hợp lệ.";
      if (sdt && edt) {
        if (edt <= sdt) newErr.endTime = "Giờ kết thúc phải lớn hơn giờ bắt đầu.";
        else delete newErr.endTime;
      }
    }

    // online vs location
    if (next.isOnline) {
      if (next.onlineLink) {
        try { new URL(next.onlineLink); delete newErr.onlineLink; }
        catch { newErr.onlineLink = "Link tham gia không hợp lệ."; }
      } else delete newErr.onlineLink;
      delete newErr.location;
    } else {
      if (!next.location || !String(next.location).trim()) newErr.location = "Địa điểm là bắt buộc cho sự kiện offline.";
      else delete newErr.location;
      delete newErr.onlineLink;
    }

    setTimeLocaltion(next);
    setErr(newErr);
  };

  const handleRequirementsChange = (field, value) => {
    setRequirements(prev => ({ ...prev, [field]: value }));
    // simple checks for ages and volunteers
    const newErr = { ...err };
    if (field === "minAge" || field === "maxAge") {
      const min = Number(field === "minAge" ? value : Requirements.minAge);
      const max = Number(field === "maxAge" ? value : Requirements.maxAge);
      if (min && max && min > max) newErr.minAge = "Tuổi tối thiểu không lớn hơn tuổi tối đa.";
      else { delete newErr.minAge; delete newErr.maxAge; }
    }
    if (field === "volunteersNeeded") {
      if (value !== null && value !== undefined && (!isAllDigits(String(value)) || Number(value) <= 0)) {
        newErr.volunteersNeeded = "Số lượng phải là số lớn hơn 0.";
      } else delete newErr.volunteersNeeded;
    }
    setErr(newErr);
  };

  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
    const newErr = { ...err };
    if (field === "email") {
      if (value && !isValidEmail(value)) newErr.email = "Email không hợp lệ.";
      else delete newErr.email;
    }
    if (field === "phone") {
      if (value && !isValidPhone(value)) newErr.phone = "Số điện thoại không hợp lệ.";
      else delete newErr.phone;
    }
    setErr(newErr);
  };

  const handleExtrasChange = (field, value) => {
    setFormExtras(prev => ({ ...prev, [field]: value }));
  };

  const handleBenefitToggle = (name, checked) => {
    setFormExtras(prev => ({ ...prev, benefits: { ...prev.benefits, [name]: checked } }));
  };

  const handleNestedInputChange = (group, key, value) => {
    if (group === "benefits") {
      setFormExtras(prev => ({ ...prev, benefits: { ...prev.benefits, [key]: value } }));
    } else if (group === "contactInfo") {
      handleContactChange(key, value);
    }
  };

  const handleArrayAdd = (field, value) => {
    if (field === "tags") {
      setFormExtras(prev => ({ ...prev, tags: Array.from(new Set([...prev.tags, value])) }));
    }
  };
  const handleArrayRemove = (field, value) => {
    if (field === "tags") {
      setFormExtras(prev => ({ ...prev, tags: prev.tags.filter(t => t !== value) }));
    }
  };

  /* ------------------ Cover upload ------------------ */
  const onCoverSelected = (file) => {
    if (!file) {
      setMedia(null);
      if (coverPreview) {
        try { URL.revokeObjectURL(coverPreview); } catch (e) { }
        setCoverPreview(null);
      }
      return;
    }
    const url = URL.createObjectURL(file);
    if (coverPreview) {
      try { URL.revokeObjectURL(coverPreview); } catch (e) { }
    }
    setMedia(file);
    setCoverPreview(url);
  };

  async function uploadCoverIfAny() {
    if (!media) return null;
    try {
      // Example: upload to /api/upload -> return { url: 'https://...' }
      const form = new FormData();
      form.append("file", media);
      const res = await axios.post(`${API_BASE}/api/upload`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      return res?.data?.url || res?.data?.result?.url || null;
    } catch (e) {
      console.error("Upload cover failed", e);
      toast.error("Tải ảnh bìa thất bại.");
      return null;
    }
  }

  /* ------------------ Submit (create / update) ------------------ */

  const validateBeforeSubmit = () => {
    const nextErr = { ...err };

    // required fields
    if (!basicInfor.title || !basicInfor.title.trim()) nextErr.title = "Tiêu đề là bắt buộc.";
    if (!basicInfor.description || !basicInfor.description.trim()) nextErr.description = "Mô tả là bắt buộc.";
    if (!basicInfor.category) nextErr.category = "Danh mục là bắt buộc.";

    // time
    if (!timeLocaltion.startDate) nextErr.startDate = "Ngày bắt đầu là bắt buộc.";
    if (!timeLocaltion.isOnline && (!timeLocaltion.location || !String(timeLocaltion.location).trim())) nextErr.location = "Địa điểm là bắt buộc cho sự kiện offline.";

    // contact
    if (!contactInfo.coordinatorName || !contactInfo.coordinatorName.trim()) nextErr.coordinatorName = "Tên điều phối viên là bắt buộc.";
    if (!contactInfo.phone || !isValidPhone(contactInfo.phone)) nextErr.phone = "Số điện thoại liên hệ không hợp lệ.";
    if (!contactInfo.email || !isValidEmail(contactInfo.email)) nextErr.email = "Email liên hệ không hợp lệ.";

    // volunteers
    if (!Requirements.volunteersNeeded || Number(Requirements.volunteersNeeded) <= 0) nextErr.volunteersNeeded = "Số lượng tình nguyện viên phải lớn hơn 0.";

    setErr(nextErr);
    return Object.keys(nextErr).length === 0;
  };

  const buildPayload = async () => {
    // Build event payload expected by backend
    // You must adapt names to match backend EventCreationRequest fields.
    const coverUrl = await uploadCoverIfAny();

    // Format datetimes
    const startDateTime = formatDateTimeForBackend(timeLocaltion.startDate, timeLocaltion.startTime);
    const endDateTime = formatDateTimeForBackend(timeLocaltion.endDate, timeLocaltion.endTime);
    // registrationDeadline maybe only date -> convert to end of day or keep as date string:
    const registrationDeadline = Requirements.registrationDeadline ? `${Requirements.registrationDeadline}T23:59:59` : null;

    const payload = {
      title: basicInfor.title,
      description: basicInfor.description,
      category: basicInfor.category,
      eventType: basicInfor.eventType,
      startDateTime, // e.g. "2025-10-07T14:30:00"
      endDateTime,   // or null
      isOnline: !!timeLocaltion.isOnline,
      location: timeLocaltion.location || null,
      address: timeLocaltion.detailLocation || null,
      onlineLink: timeLocaltion.onlineLink || null,
      volunteersNeeded: Requirements.volunteersNeeded,
      registrationDeadline,
      minAge: Requirements.minAge,
      maxAge: Requirements.maxAge,
      genderRequirement: Requirements.genderRequirement,
      experienceLevel: Requirements.experienceLevel,
      requirementsDetail: Requirements.detail,
      coordinatorName: contactInfo.coordinatorName,
      phone: contactInfo.phone,
      email: contactInfo.email,
      alternateContact: contactInfo.alternateContact || null,
      tags: formExtras.tags,
      benefits: formExtras.benefits,
      autoApprove: formExtras.autoApprove,
      requireBackground: formExtras.requireBackground,
      priority: formExtras.priority,
      coverUrl // optional
    };

    return payload;
  };

  const handleSubmit = async (action = "send") => {
    if (!validateBeforeSubmit()) {
      toast.error("Vui lòng sửa các lỗi trên form trước khi gửi.");
      return;
    }
    try {
      setIsLoading(true)
      const payload = await buildPayload();

      // add a flag for draft/publish based on action if backend expects
      if (action === "save") payload.status = "DRAFT";
      if (action === "send") payload.status = "PENDING_APPROVAL";

      const url = isEditMode ? `${API_BASE}/api/events/${encodeURIComponent(slug)}` : `${API_BASE}/api/events`;
      const method = isEditMode ? "put" : "post";

      const res = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: payload
      });

      if (res?.data?.code === 0 || (res.status >= 200 && res.status < 300)) {
        toast.success(isEditMode ? "Cập nhật sự kiện thành công" : "Tạo sự kiện thành công");
        const newSlug = res?.data?.result?.slug || (isEditMode ? slug : null);
        if (newSlug) navigate(`/events/${newSlug}`);
        else navigate("/events");
      } else {
        console.error("Response error", res);
        toast.error(res?.data?.message || "Lỗi khi gửi dữ liệu sự kiện");
      }
    } catch (e) {
      console.error("Submit fail", e);
      toast.error("Lỗi khi gửi sự kiện. Vui lòng thử lại.");
    }finally {
      setIsLoading(false);
    }
  };

  /* ------------------ JSX (view) ------------------ */
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{isEditMode ? "Chỉnh sửa sự kiện" : "Tạo Sự Kiện Tuyển Dụng"}</h1>
          <p className="text-gray-600 mt-2">Điền thông tin chi tiết về sự kiện của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Ảnh bìa sự kiện</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {media && coverPreview ? (
                  <div className="relative inline-block w-full">
                    <img src={coverPreview} alt="Cover" className="w-full h-64 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => onCoverSelected(null)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      title="Xóa ảnh"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : coverPreview ? (
                  <div className="relative inline-block w-full">
                    <img src={coverPreview} alt="Cover" className="w-full h-64 object-cover rounded-lg" />
                    <div className="mt-3">
                      <button onClick={() => { setMedia(null); setCoverPreview(null); }} className="px-4 py-2 bg-red-500 text-white rounded">Xóa</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-3">Kéo thả hoặc click để tải ảnh bìa</p>
                    <input
                      id="coverImageInput"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files && e.target.files[0];
                        if (f) onCoverSelected(f);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="coverImageInput"
                      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition"
                    >
                      Chọn ảnh
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên sự kiện <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={basicInfor.title}
                    onChange={(e) => handleInfo("title", e.target.value)}
                    placeholder="VD: Làm sạch bờ biển Vũng Tàu"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {err.title && <span className="text-red-500 text-sm pt-3 px-2">{err.title}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả sự kiện <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={8}
                    value={basicInfor.description}
                    onChange={(e) => handleInfo("description", e.target.value)}
                    placeholder="Mô tả chi tiết về sự kiện..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {err.description && <span className="text-red-500 text-sm pt-3 px-2">{err.description}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danh mục <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={basicInfor.category}
                      onChange={(e) => handleInfo("category", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {err.category && <span className="text-red-500 text-sm pt-3 px-2">{err.category}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loại sự kiện</label>
                    <select
                      value={basicInfor.eventType}
                      onChange={(e) => handleInfo("eventType", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="NON_PROFIT">Phi lợi nhuận</option>
                      <option value="PROFIT">Lợi nhuận</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule & Location */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Thời gian & Địa điểm
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày bắt đầu <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={timeLocaltion.startDate}
                      onChange={(e) => handleTimeLocaltion("startDate", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {err.startDate && <p className="text-xs pl-2 pt-2 text-red-500">{err.startDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Giờ bắt đầu</label>
                    <input
                      type="time"
                      value={timeLocaltion.startTime}
                      onChange={(e) => handleTimeLocaltion("startTime", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {err.startTime && <p className="text-xs pl-2 pt-2 text-red-500">{err.startTime}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc</label>
                    <input
                      type="date"
                      value={timeLocaltion.endDate}
                      onChange={(e) => handleTimeLocaltion("endDate", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {err.endDate && <p className="text-xs pl-2 pt-2 text-red-500">* {err.endDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Giờ kết thúc</label>
                    <input
                      type="time"
                      value={timeLocaltion.endTime}
                      onChange={(e) => handleTimeLocaltion("endTime", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {err.endTime && <p className="text-xs pl-2 pt-2 text-red-500">{err.endTime}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isOnline"
                    checked={timeLocaltion.isOnline}
                    onChange={(e) => handleTimeLocaltion("isOnline", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isOnline" className="text-sm font-medium text-gray-700">
                    Sự kiện trực tuyến
                  </label>
                </div>

                {!timeLocaltion.isOnline ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa điểm <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={timeLocaltion.location}
                        onChange={(e) => handleTimeLocaltion("location", e.target.value)}
                        placeholder="VD: Bãi biển Bãi Trước, Vũng Tàu"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {err.location && <p className="text-xs pl-2 pt-2 text-red-500">{err.location}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ chi tiết</label>
                      <textarea
                        rows={3}
                        value={timeLocaltion.detailLocation}
                        onChange={(e) => handleTimeLocaltion("detailLocation", e.target.value)}
                        placeholder="Địa chỉ cụ thể..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Link tham gia online</label>
                    <input
                      type="url"
                      value={timeLocaltion.onlineLink}
                      onChange={(e) => handleTimeLocaltion("onlineLink", e.target.value)}
                      placeholder="https://meet.google.com/..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {err.onlineLink && <p className="text-xs pl-2 pt-2 text-red-500">{err.onlineLink}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Yêu cầu tình nguyện viên
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số lượng TNV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={Requirements.volunteersNeeded ?? ""}
                      onChange={(e) => handleRequirementsChange("volunteersNeeded", Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {err.volunteersNeeded && <span className="text-red-500 text-sm pt-3 px-2">{err.volunteersNeeded}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hạn đăng ký</label>
                    <input
                      type="date"
                      value={Requirements.registrationDeadline}
                      onChange={(e) => handleRequirementsChange("registrationDeadline", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {err.registrationDeadline && <span className="text-red-500 text-sm pt-3 px-2">{err.registrationDeadline}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tuổi tối thiểu</label>
                    <input
                      type="number"
                      min="0"
                      value={Requirements.minAge ?? ""}
                      onChange={(e) => handleRequirementsChange("minAge", Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {err.minAge && <span className="text-red-500 text-sm pt-3 px-2">{err.minAge}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tuổi tối đa</label>
                    <input
                      type="number"
                      min="0"
                      value={Requirements.maxAge ?? ""}
                      onChange={(e) => handleRequirementsChange("maxAge", Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {err.maxAge && <span className="text-red-500 text-sm pt-3 px-2">{err.maxAge}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                    <select
                      value={Requirements.genderRequirement}
                      onChange={(e) => handleRequirementsChange("genderRequirement", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="NONE">Không yêu cầu</option>
                      <option value="MALE">Nam</option>
                      <option value="FEMALE">Nữ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kinh nghiệm</label>
                  <select
                    value={Requirements.experienceLevel}
                    onChange={(e) => handleRequirementsChange("experienceLevel", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="NEWBIE">Người mới</option>
                    <option value="EXPERIENCED">Có kinh nghiệm</option>
                    <option value="PROFESSIONAL">Chuyên nghiệp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả yêu cầu</label>
                  <textarea
                    rows={5}
                    value={Requirements.detail}
                    onChange={(e) => handleRequirementsChange("detail", e.target.value)}
                    placeholder="Chi tiết yêu cầu..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Benefits (condensed) */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Quyền lợi cho tình nguyện viên
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {interest.map(b => (
                  <label
                    key={b.value}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!formExtras.benefits[b.value]}
                      onChange={(e) => handleBenefitToggle(b.value, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{b.label}</span>
                  </label>
                ))}
              </div>

              {/* conditional inputs */}
              {formExtras.benefits.allowance && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mức phụ cấp (VNĐ)</label>
                  <input
                    type="number"
                    min="0"
                    value={formExtras.benefits.allowanceAmount || 0}
                    onChange={(e) => handleNestedInputChange("benefits", "allowanceAmount", Number(e.target.value || 0))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="VD: 200000"
                  />
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex">
                  <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Lưu ý</h4>
                    <p className="text-sm text-blue-700 mt-1">Quyền lợi hấp dẫn giúp thu hút TNV chất lượng cao hơn.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-600" />
                Thông tin liên hệ
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên điều phối viên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactInfo.coordinatorName}
                    onChange={(e) => handleContactChange("coordinatorName", e.target.value)}
                    placeholder="Tên người phụ trách"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {err.coordinatorName && <p className="text-xs pl-2 pt-2 text-red-500">{err.coordinatorName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => handleContactChange("phone", e.target.value)}
                    placeholder="0901234567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {err.phone && <p className="text-xs pl-2 pt-2 text-red-500">{err.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleContactChange("email", e.target.value)}
                    placeholder="contact@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {err.email && <p className="text-xs pl-2 pt-2 text-red-500">{err.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Liên hệ dự phòng</label>
                  <input
                    type="text"
                    value={contactInfo.alternateContact}
                    onChange={(e) => handleContactChange("alternateContact", e.target.value)}
                    placeholder="Số điện thoại hoặc email dự phòng"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Cài đặt</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="autoApprove"
                    checked={formExtras.autoApprove}
                    onChange={(e) => handleExtrasChange("autoApprove", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="autoApprove" className="text-sm font-medium text-gray-700">
                    Tự động phê duyệt
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="requireBackground"
                    checked={formExtras.requireBackground}
                    onChange={(e) => handleExtrasChange("requireBackground", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="requireBackground" className="text-sm font-medium text-gray-700">
                    Kiểm tra lý lịch
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mức độ ưu tiên</label>
                <select
                  value={formExtras.priority}
                  onChange={(e) => handleExtrasChange("priority", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="LOW">Thấp</option>
                  <option value="NORMAL">Bình thường</option>
                  <option value="HIGH">Cao</option>
                  <option value="URGENT">Khẩn cấp</option>
                </select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900">Lưu ý</h4>
                    <p className="text-sm text-yellow-700 mt-1">Sự kiện cần phê duyệt từ Admin trước khi công bố (24-48h).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-blue-600" />
                Tags
              </h3>

              <div className="flex flex-wrap gap-2 mb-3">
                {formExtras.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleArrayRemove("tags", tag)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-2">
                {tagsList.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleArrayAdd("tags", tag)}
                    disabled={formExtras.tags.includes(tag)}
                    className="flex items-center justify-start px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Tag className="w-4 h-4 mr-2 text-blue-600" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-4">Thông tin tổ chức</h3>
                <button onClick={() => navigate("/btc/profile")} className="p-2 flex item-center justify-center border mb-2 rounded-full bg-green-200 text-green-700 border-green-100 hover:scale-110 transition-all delay-75" title="Chỉnh sửa hồ sơ"><Edit size={18} /></button>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium mb-1">{orzInfo?.name || "Ban tổ chức"}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{orzInfo?.ratting === 0 ? 5 : orzInfo?.ratting}</span>
                    </div>
                    {orzInfo?.isVerify ? (
                      <div className="text-blue-500 space-x-1 flex">
                        <Shield className="w-4 h-4 " title="Đã xác thực" />
                        <span className="text-xs">Đã xác thực</span>
                      </div>
                    ) : (
                      <div className="text-yellow-500 space-x-1 flex">
                        <Clock className="w-4 h-4" title="Chờ xác thực" />
                        <span className="text-xs">Đang chờ xác thực</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sự kiện đã tổ chức:</span>
                  <span className="font-medium">{orzInfo?.totalEvent ?? 0}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Hành động</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleSubmit("send")}
                  className={`w-full flex items-center justify-center px-4 py-3 ${isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg  transition font-medium`}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : <Send className="w-4 h-4 mr-2" />}
                  Gửi phê duyệt
                </button>
                <button
                  onClick={() => handleSubmit("save")}
                  className={`w-full flex items-center justify-center px-4 py-3 text-white rounded-lg ${isLoading ? "bg-gray-500" : "bg-gray-600 hover:bg-gray-700"} transition font-medium`}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Lưu nháp
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Action Bar - Mobile */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 p-4 shadow-lg z-10">
          <div className="flex space-x-3">
            <button disabled={isLoading} onClick={() => handleSubmit("save")} className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium">
              <Save className="w-4 h-4 mr-2" />
              Lưu nháp
            </button>
            <button disabled={isLoading} onClick={() => handleSubmit("send")} className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Send className="w-4 h-4 mr-2" />
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
