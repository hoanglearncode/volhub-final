// RecruitmentEventPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  Calendar, Clock, MapPin, Users, Award,
  Upload, Tag, Shield, Heart, Star, Building, Phone,
  Mail, Globe, Image, X, Plus, CheckCircle, Info,
  AlertCircle, Save, Send, Edit
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API || "";
const CREATE_ENDPOINT = `${API_BASE}/events/create`; // endpoint that accepts multipart/form-data (RequestPart("event"))

/* -------------------------
  Helpers
------------------------- */
const formatDateTimeISO = (date, time) => {
  if (!date) return null;
  // date: YYYY-MM-DD, time: HH:mm or HH:mm:ss
  const t = time ? time : "00:00:00";
  const timeFixed = t.length === 5 ? `${t}:00` : t;
  return `${date}T${timeFixed}`;
};

const isValidEmail = (s) => /\S+@\S+\.\S+/.test(s);
const isValidPhone = (s) => /^[0-9+()\-\s]{7,20}$/.test(s);

/* -------------------------
  Component
------------------------- */
export default function RecruitmentEventPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [orzInfo, setOrzInfo] = useState({});
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]); // additional media
  const [mediaPreviews, setMediaPreviews] = useState([]);

  const [basicInfo, setBasicInfo] = useState({
    title: "",
    description: "",
    category: "",
    eventType: "NON_PROFIT"
  });

  const [timeLocation, setTimeLocation] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    isOnline: false,
    location: "",
    detailLocation: "",
    onlineLink: ""
  });

  const [requirements, setRequirements] = useState({
    volunteersNeeded: 10,
    registrationDeadline: "",
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

  const [formExtras, setFormExtras] = useState({
    tags: [],
    benefits: {
      meals: false,
      transportation: false,
      accommodation: false,
      insurance: false,
      certificate: true,
      allowance: false,
      allowanceAmount: 0,
      descriptionBenfits: '',
      uniform: false,
      training: false,
      another: false
    },
    autoApprove: false,
    requireBackground: false,
    priority: "NORMAL",
    skills: [],
    interests: []
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Môi trường", "Giáo dục", "Y tế", "Cộng đồng"];
  const tagsList = ["Thiện nguyện", "Cộng đồng", "Thanh niên"];
  const benefits = [
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
    const loadOrgInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/organizer/profile/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res?.data?.code === 0) {
          setOrzInfo(res.data.result.basicInfo || {});
        }
      } catch (e) {
        console.error("Load org info failed", e);
        toast.error("Lỗi khi tải thông tin tổ chức");
      }
    };
    loadOrgInfo();
  }, [token]);

  // ----- Cover select & preview -----
  const handleCoverSelect = (file) => {
    if (!file) {
      if (coverPreview) {
        try { URL.revokeObjectURL(coverPreview); } catch {}
      }
      setCoverFile(null);
      setCoverPreview(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn ảnh hợp lệ cho ảnh bìa.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Ảnh bìa không được vượt quá 8MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    if (coverPreview) {
      try { URL.revokeObjectURL(coverPreview); } catch {}
    }
    setCoverFile(file);
    setCoverPreview(url);
  };

  // ----- Media select (multiple) -----
  const handleAddMediaFiles = (files) => {
    if (!files || !files.length) return;
    const newFiles = Array.from(files).slice(0, 10); // limit 10
    const valid = [];
    const previews = [];
    newFiles.forEach((f) => {
      if (!f.type.startsWith("image/") && !f.type.startsWith("video/")) {
        toast.warn(`${f.name} - không phải ảnh/video, bỏ qua.`);
        return;
      }
      if (f.size > 50 * 1024 * 1024) {
        toast.warn(`${f.name} - vượt quá 50MB, bỏ qua.`);
        return;
      }
      valid.push(f);
      try { previews.push({ url: URL.createObjectURL(f), type: f.type.startsWith("video/") ? "video" : "image", name: f.name }); } catch {}
    });
    setMediaFiles((prev) => [...prev, ...valid]);
    setMediaPreviews((prev) => [...prev, ...previews]);
  };

  const removeMediaAt = (idx) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== idx));
    setMediaPreviews((prev) => {
      try { URL.revokeObjectURL(prev[idx]?.url); } catch {}
      return prev.filter((_, i) => i !== idx);
    });
  };

  // ----- Basic handlers -----
  const handleBasicInfo = (key, value) => setBasicInfo(prev => ({ ...prev, [key]: value }));
  const handleTimeLocation = (key, value) => setTimeLocation(prev => ({ ...prev, [key]: value }));
  const handleRequirements = (key, value) => setRequirements(prev => ({ ...prev, [key]: value }));
  const handleContact = (key, value) => setContactInfo(prev => ({ ...prev, [key]: value }));

  // ----- tags & skills & interests -----
  const handleTagAdd = (tag) => setFormExtras(prev => ({ ...prev, tags: [...prev.tags, tag] }));
  const handleTagRemove = (tag) => setFormExtras(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  const handleSkillAdd = (skill) => setFormExtras(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  const handleSkillRemove = (skill) => setFormExtras(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  const handleInterestAdd = (i) => setFormExtras(prev => ({ ...prev, interests: [...prev.interests, i] }));
  const handleInterestRemove = (i) => setFormExtras(prev => ({ ...prev, interests: prev.interests.filter(x => x !== i) }));

  // ----- benefits handlers -----
  const handleBenefitToggle = (key, checked) => {
    setFormExtras(prev => ({ ...prev, benefits: { ...prev.benefits, [key]: checked } }));
  };
  const handleBenefitAmount = (value) => {
    const num = Number(value) || 0;
    setFormExtras(prev => ({ ...prev, benefits: { ...prev.benefits, allowanceAmount: num } }));
  };

  // ----- validation -----
  const validate = () => {
    const e = {};
    if (!basicInfo.title || !basicInfo.title.trim()) e.title = "Tên sự kiện không được bỏ trống.";
    if (!basicInfo.description || basicInfo.description.trim().length < 10) e.description = "Mô tả tối thiểu 10 ký tự.";
    if (basicInfo.description && basicInfo.description.length > 1000) e.description = "Mô tả quá dài (tối đa 1000 ký tự).";
    if (!basicInfo.category) e.category = "Chọn danh mục.";
    if (!timeLocation.startDate) e.startDate = "Chọn ngày bắt đầu.";
    if (!requirements.volunteersNeeded || Number(requirements.volunteersNeeded) < 1) e.volunteersNeeded = "Nhập số lượng TNV hợp lệ.";
    if (!contactInfo.coordinatorName) e.coordinatorName = "Nhập tên điều phối viên.";
    if (!contactInfo.phone || !isValidPhone(contactInfo.phone)) e.phone = "Số điện thoại không hợp lệ.";
    if (!contactInfo.email || !isValidEmail(contactInfo.email)) e.email = "Email không hợp lệ.";
    if (!timeLocation.isOnline && !timeLocation.location) e.location = "Nhập địa điểm tổ chức.";
    if (timeLocation.isOnline && timeLocation.onlineLink && !/^https?:\/\//.test(timeLocation.onlineLink)) e.onlineLink = "Link online phải có http(s)://";
    // start/end order
    if (timeLocation.startDate && timeLocation.endDate) {
      const s = new Date(formatDateTimeISO(timeLocation.startDate, timeLocation.startTime) || timeLocation.startDate);
      const en = new Date(formatDateTimeISO(timeLocation.endDate, timeLocation.endTime) || timeLocation.endDate);
      if (s > en) e.endDate = "Ngày kết thúc phải sau ngày bắt đầu.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Build FormData: event JSON in 'event' RequestPart + coverImage + listEventMedia
  const buildFormData = () => {
    const startAt = formatDateTimeISO(timeLocation.startDate, timeLocation.startTime);
    const endAt = formatDateTimeISO(timeLocation.endDate, timeLocation.endTime);
    const registrationDeadline = requirements.registrationDeadline ? `${requirements.registrationDeadline}T23:59:59` : null;

    const eventObj = {
      title: basicInfo.title,
      description: basicInfo.description,
      category: basicInfo.category,
      eventType: basicInfo.eventType,
      startAt,
      endAt,
      isOnline: !!timeLocation.isOnline,
      location: timeLocation.location || null,
      address: timeLocation.detailLocation || null,
      onlineLink: timeLocation.onlineLink || null,
      volunteersNeeded: Number(requirements.volunteersNeeded) || 0,
      registrationDeadline,
      minAge: requirements.minAge || null,
      maxAge: requirements.maxAge || null,
      genderRequirement: requirements.genderRequirement || null,
      experienceLevel: requirements.experienceLevel || null,
      requirementsDetail: requirements.detail || null,
      coordinatorName: contactInfo.coordinatorName || null,
      phone: contactInfo.phone || null,
      email: contactInfo.email || null,
      alternateContact: contactInfo.alternateContact || null,
      tags: formExtras.tags || [],
      skills: formExtras.skills || [],
      interests: formExtras.interests || [],
      benefits: formExtras.benefits || {},
      autoApprove: !!formExtras.autoApprove,
      requireBackground: !!formExtras.requireBackground,
      priority: formExtras.priority || "NORMAL",
      isDraft: false
    };

    const fd = new FormData();
    fd.append("event", JSON.stringify(eventObj)); // RequestPart("event")

    if (coverFile) fd.append("coverImage", coverFile);

    if (mediaFiles && mediaFiles.length) {
      mediaFiles.forEach((f) => fd.append("listEventMedia", f));
    }

    return fd;
  };

  // Submit
  const handleSubmit = async (action = "send") => {
    if (!validate()) {
      toast.error("Vui lòng sửa các lỗi trên form trước khi gửi.");
      return;
    }
    try {
      setIsLoading(true);

      const formData = buildFormData();
      // set status by appending small info inside event object or append separate part
      // append small metadata as part: e.g. eventStatus -> we'll include inside JSON via isDraft flag
      // modify isDraft based on action:
      const isDraft = action === "save";
      // We need to update the event json inside formData -> easiest rebuild with isDraft flag:
      const payloadObj = JSON.parse(formData.get("event"));
      payloadObj.isDraft = isDraft;
      formData.set("event", JSON.stringify(payloadObj));

      const res = await axios.post(`${import.meta.env.VITE_API}/api/organizer/events/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data?.code === 0 || (res.status >= 200 && res.status < 300)) {
        toast.success("Tạo sự kiện thành công");
        const newSlug = res?.data?.result?.slug;
        if (newSlug) {
          navigate(`/events/${newSlug}`);
        } else {
          navigate("/events");
        }
      } else {
        toast.error(res?.data?.message || "Lỗi khi gửi dữ liệu sự kiện");
      }
    } catch (e) {
      console.error("Submit fail", e);
      // try to read backend error code
      const msg = e?.response?.data?.message || "Lỗi khi gửi sự kiện. Vui lòng thử lại.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // derived: preview count
  const mediaCount = useMemo(() => mediaFiles.length, [mediaFiles]);

  /* -------------------------
     Render
  ------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-6 mb-18">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Tạo Sự Kiện Tuyển Dụng</h1>
          <p className="text-gray-600 mt-2">Điền thông tin chi tiết về sự kiện của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover Image */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Ảnh bìa sự kiện</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {coverPreview ? (
                  <div className="relative inline-block w-full">
                    <img src={coverPreview} alt="Cover" className="w-full h-64 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => handleCoverSelect(null)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      title="Xóa ảnh"
                    >
                      <X className="w-5 h-5" />
                    </button>
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
                        if (f) handleCoverSelect(f);
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
                <div className="mt-3 text-sm text-gray-500">Định dạng: JPG/PNG. Kích thước tối ưu: 1200x600</div>

                {/* Media upload (images/videos) */}
                <div className="mt-4 border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh/Video bổ sung</label>
                  <div className="flex items-center gap-3">
                    <input
                      id="mediaInput"
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={(e) => handleAddMediaFiles(e.target.files)}
                      className="hidden"
                    />
                    <label
                      htmlFor="mediaInput"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" /> Thêm
                    </label>
                    <div className="text-sm text-gray-500">{mediaCount} file đã chọn (tối đa 10)</div>
                  </div>

                  {mediaPreviews.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      {mediaPreviews.map((p, idx) => (
                        <div key={idx} className="relative rounded overflow-hidden border">
                          {p.type === "video" ? (
                            <video src={p.url} className="w-full h-24 object-cover" controls />
                          ) : (
                            <img src={p.url} alt={p.name} className="w-full h-24 object-cover" />
                          )}
                          <button
                            onClick={() => removeMediaAt(idx)}
                            className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white"
                            title="Xóa"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                    value={basicInfo.title}
                    onChange={(e) => handleBasicInfo("title", e.target.value)}
                    placeholder="VD: Làm sạch bờ biển Vũng Tàu"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.title && <span className="text-red-500 text-sm pt-3 px-2">{errors.title}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả sự kiện <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={8}
                    value={basicInfo.description}
                    onChange={(e) => handleBasicInfo("description", e.target.value)}
                    placeholder="Mô tả chi tiết về sự kiện..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.description && <span className="text-red-500 text-sm pt-3 px-2">{errors.description}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danh mục <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={basicInfo.category}
                      onChange={(e) => handleBasicInfo("category", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <span className="text-red-500 text-sm pt-3 px-2">{errors.category}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loại sự kiện</label>
                    <select
                      value={basicInfo.eventType}
                      onChange={(e) => handleBasicInfo("eventType", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="NON_PROFIT">Phi lợi nhuận</option>
                      <option value="PROFIT">Lợi nhuận</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Time & Location */}
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
                      value={timeLocation.startDate}
                      onChange={(e) => handleTimeLocation("startDate", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.startDate && <p className="text-xs pl-2 pt-2 text-red-500">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc</label>
                    <input
                      type="date"
                      value={timeLocation.endDate}
                      onChange={(e) => handleTimeLocation("endDate", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.endDate && <p className="text-xs pl-2 pt-2 text-red-500">{errors.endDate}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isOnline"
                    checked={timeLocation.isOnline}
                    onChange={(e) => handleTimeLocation("isOnline", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isOnline" className="text-sm font-medium text-gray-700">
                    Sự kiện trực tuyến
                  </label>
                </div>

                {!timeLocation.isOnline ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa điểm <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={timeLocation.location}
                        onChange={(e) => handleTimeLocation("location", e.target.value)}
                        placeholder="VD: Bãi biển Bãi Trước, Vũng Tàu"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.location && <p className="text-xs pl-2 pt-2 text-red-500">{errors.location}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ chi tiết</label>
                      <textarea
                        rows={3}
                        value={timeLocation.detailLocation}
                        onChange={(e) => handleTimeLocation("detailLocation", e.target.value)}
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
                      value={timeLocation.onlineLink}
                      onChange={(e) => handleTimeLocation("onlineLink", e.target.value)}
                      placeholder="https://meet.google.com/..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.onlineLink && <p className="text-xs pl-2 pt-2 text-red-500">{errors.onlineLink}</p>}
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
                      value={requirements.volunteersNeeded}
                      onChange={(e) => handleRequirements("volunteersNeeded", Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.volunteersNeeded && <span className="text-red-500 text-sm pt-3 px-2">{errors.volunteersNeeded}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hạn đăng ký</label>
                    <input
                      type="date"
                      value={requirements.registrationDeadline}
                      onChange={(e) => handleRequirements("registrationDeadline", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tuổi tối thiểu</label>
                    <input
                      type="number"
                      min="0"
                      value={requirements.minAge}
                      onChange={(e) => handleRequirements("minAge", Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.minAge && <span className="text-red-500 text-sm pt-3 px-2">{errors.minAge}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tuổi tối đa</label>
                    <input
                      type="number"
                      min="0"
                      value={requirements.maxAge}
                      onChange={(e) => handleRequirements("maxAge", Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                    <select
                      value={requirements.genderRequirement}
                      onChange={(e) => handleRequirements("genderRequirement", e.target.value)}
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
                    value={requirements.experienceLevel}
                    onChange={(e) => handleRequirements("experienceLevel", e.target.value)}
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
                    value={requirements.detail}
                    onChange={(e) => handleRequirements("detail", e.target.value)}
                    placeholder="Chi tiết yêu cầu..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Quyền lợi cho tình nguyện viên
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {benefits.map(b => (
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

              {formExtras.benefits.allowance && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mức phụ cấp (VNĐ)</label>
                  <input
                    type="number"
                    min="0"
                    value={formExtras.benefits.allowanceAmount || 0}
                    onChange={(e) => handleBenefitAmount(e.target.value)}
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
                    onChange={(e) => handleContact("coordinatorName", e.target.value)}
                    placeholder="Tên người phụ trách"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.coordinatorName && <p className="text-xs pl-2 pt-2 text-red-500">{errors.coordinatorName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => handleContact("phone", e.target.value)}
                    placeholder="0901234567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && <p className="text-xs pl-2 pt-2 text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleContact("email", e.target.value)}
                    placeholder="contact@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-xs pl-2 pt-2 text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Liên hệ dự phòng</label>
                  <input
                    type="text"
                    value={contactInfo.alternateContact}
                    onChange={(e) => handleContact("alternateContact", e.target.value)}
                    placeholder="Số điện thoại hoặc email dự phòng"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 ">
            {/* Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Cài đặt</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="autoApprove"
                    checked={formExtras.autoApprove}
                    onChange={(e) => setFormExtras(prev => ({ ...prev, autoApprove: e.target.checked }))}
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
                    onChange={(e) => setFormExtras(prev => ({ ...prev, requireBackground: e.target.checked }))}
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
                  onChange={(e) => setFormExtras(prev => ({ ...prev, priority: e.target.value }))}
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
                      onClick={() => handleTagRemove(tag)}
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
                    onClick={() => handleTagAdd(tag)}
                    disabled={formExtras.tags.includes(tag)}
                    className="flex items-center justify-start px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Tag className="w-4 h-4 mr-2 text-blue-600" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Organization Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Thông tin tổ chức</h3>
                <button
                  onClick={() => navigate("/btc/profile")}
                  className="p-2 flex item-center justify-center border rounded-full bg-green-200 text-green-700 border-green-100 hover:scale-110 transition-all"
                  title="Chỉnh sửa hồ sơ"
                >
                  <Edit size={18} />
                </button>
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
                        <Shield className="w-4 h-4" title="Đã xác thực" />
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

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 ">
              <h3 className="text-lg font-semibold mb-4">Hành động</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleSubmit("send")}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center px-4 py-3 ${isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg transition font-medium`}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Gửi phê duyệt
                </button>
                <button
                  onClick={() => handleSubmit("save")}
                  disabled={isLoading}
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
            <button
              disabled={isLoading}
              onClick={() => handleSubmit("save")}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Lưu nháp
            </button>
            <button
              disabled={isLoading}
              onClick={() => handleSubmit("send")}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
