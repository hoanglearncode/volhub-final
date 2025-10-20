import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Camera,
  Edit,
  Save,
  Mail,
  Phone,
  Globe,
  MapPin,
  Badge,
  X,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import LoadingPage from "../../common/Loading";
import { isValidEmail, isValidPhone, isValidUrl, sanitize } from "../../../utils/validators";

const BASE_API = import.meta.env.VITE_API || "http://localhost:8080";

/* ------------------------------
  Helper upload functions (reuseable)
   - trả về url ảnh nếu thành công
   - nhận onProgress(percent)
-------------------------------*/
const uploadFile = async (endpoint, formKey, file, token, onProgress) => {
  if (!file) throw new Error("No file provided");
  const fd = new FormData();
  fd.append(formKey, file);

  const res = await axios.post(`${BASE_API}${endpoint}`, fd, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onProgress(percent);
      }
    },
  });

  if (res?.data?.result) return res.data.result;
  throw new Error("Upload thất bại");
};

/* ------------------------------
  Small UI helpers
-------------------------------*/
const FieldRow = ({ icon: Icon, label, children, error }) => (
  <div className="flex gap-3 items-start">
    <Icon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
    <div className="flex-1">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      {children}
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  </div>
);

/* ------------------------------
  Main component
-------------------------------*/
const ProfileTab = () => {
  const { user, token } = useAuth();
  const [org, setOrg] = useState(null);
  const [contact, setContact] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // local edit state
  const [editData, setEditData] = useState({ org: {}, contact: {} });
  const [errors, setErrors] = useState({});

  // detect unsaved changes
  const hasChanges = useMemo(() => {
    if (!org || !contact) return false;
    const shallowEqual = (a = {}, b = {}) =>
      Object.keys({ ...a, ...b }).some((k) => String(a[k] ?? "") !== String(b[k] ?? ""));
    return shallowEqual(editData.org, org) || shallowEqual(editData.contact, contact);
  }, [editData, org, contact]);

  // load profile
  useEffect(() => {
    if (!user?.userId) return;
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${BASE_API}/api/organizer/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!mounted) return;
        if (res?.data?.code === 0) {
          const basic = res.data.result.basicInfo || {};
          const cont = res.data.result.contactInfo || {};
          setOrg(basic);
          setContact(cont);
          // initialize editData to safe copy
          setEditData({ org: { ...basic }, contact: { ...cont } });
        } else {
          toast.error("Không tải được profile.");
        }
      } catch (err) {
        console.error("Load profile failed", err);
        toast.error("Không tải được profile.");
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [token, user?.userId]);

  // enable editing: make a fresh copy of current data
  const startEditing = () => {
    setEditData({ org: { ...(org || {}) }, contact: { ...(contact || {}) } });
    setErrors({});
    setEditing(true);
  };

  // CANCEL with confirmation if unsaved
  const cancelEditing = () => {
    if (hasChanges) {
      if (!confirm("Bạn có chắc muốn huỷ thay đổi chưa lưu?")) return;
    }
    setEditData({ org: { ...(org || {}) }, contact: { ...(contact || {}) } });
    setErrors({});
    setEditing(false);
  };

  // validation
  const validateData = () => {
    const newErr = {};
    const o = editData.org || {};
    const c = editData.contact || {};

    if (!o.name?.trim()) newErr.name = "Tên tổ chức không được bỏ trống.";
    if (c.mail && !isValidEmail(c.mail)) newErr.mail = "Email không hợp lệ.";
    if (c.phone && !isValidPhone(c.phone)) newErr.phone = "SĐT không hợp lệ.";
    if (c.websiteUrl && !isValidUrl(c.websiteUrl)) newErr.websiteUrl = "Website không hợp lệ.";
    if (o.description && o.description.length > 500) newErr.description = "Mô tả quá dài (tối đa 500 ký tự).";

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  // SAVE
  const save = async () => {
    if (!validateData()) {
      toast.warning("Vui lòng sửa lỗi trước khi lưu.");
      return;
    }
    try {
      setSaving(true);
      const body = {
        description: sanitize(editData.org.description),
        field: sanitize(editData.org.field),
        email: sanitize(editData.contact.mail),
        phone: sanitize(editData.contact.phone),
        website: sanitize(editData.contact.websiteUrl),
        address: sanitize(editData.contact.address),
        foundedYear: editData.org.foundedYear,
      };

      await axios.patch(`${BASE_API}/api/organizer/profile/update`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Cập nhật thông tin thành công!");
      setOrg({ ...(editData.org || {}) });
      setContact({ ...(editData.contact || {}) });
      setEditing(false);
    } catch (err) {
      console.error("Update profile failed", err);
      toast.error("Không thể lưu thông tin!");
    } finally {
      setSaving(false);
    }
  };

  /* -------------
    Handle avatar / cover selection with preview + upload
  -------------*/
  const handleImageSelect = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn tệp hình ảnh hợp lệ!");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ảnh không được vượt quá 5MB!");
      return;
    }

    // immediate local preview
    const localUrl = URL.createObjectURL(file);
    setEditData((prev) => ({
      ...prev,
      org: { ...(prev.org || {}), [type === "avatar" ? "avatarUrl" : "coverUrl"]: localUrl },
    }));

    try {
      setUploadProgress(1);
      const endpoint = type === "avatar" ? "/api/organizer/profile/update/avatar" : "/api/organizer/profile/update/cover";
      const formKey = type === "avatar" ? "avatar" : "coverImage";
      const uploadedUrl = await uploadFile(endpoint, formKey, file, token, setUploadProgress);
      setEditData((prev) => ({
        ...prev,
        org: { ...(prev.org || {}), [type === "avatar" ? "avatarUrl" : "coverUrl"]: uploadedUrl },
      }));
      toast.success(`${type === "avatar" ? "Ảnh đại diện" : "Ảnh bìa"} đã được cập nhật`);
    } catch (err) {
      console.error(err);
      toast.error("Tải ảnh thất bại!");
    } finally {
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  if (isLoading) return <LoadingPage title="Đang tải dữ liệu profile..." />;

  // fallback images
  const coverSrc = editing ? editData.org?.coverUrl || org?.coverUrl : org?.coverUrl;
  const avatarSrc = editing ? editData.org?.avatarUrl || org?.avatarUrl : org?.avatarUrl;

  return (
    <div className="space-y-4 mx-auto px-4">

      {/* COVER */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div
          className="relative w-full h-44 md:h-56 bg-gray-100 flex items-center justify-center"
          style={{
            backgroundImage: coverSrc ? `url(${coverSrc})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!coverSrc && (
            <div className="text-center text-gray-400">
              <Camera className="mx-auto mb-2" />
              <div className="text-xs">Chưa có ảnh bìa</div>
            </div>
          )}

          {/* cover change button */}
          {editing && (
            <label
              className="absolute right-3 top-3 inline-flex items-center gap-2 bg-black bg-opacity-40 text-white px-3 py-1 rounded-lg cursor-pointer text-sm"
              aria-label="Thay đổi ảnh bìa"
            >
              <Camera className="w-4 h-4" /> Đổi ảnh
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageSelect(e, "cover")}
              />
            </label>
          )}
        </div>

        {/* avatar + name area (responsive) */}
        <div className="px-4 pb-4 md:pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:gap-4 -mt-12 md:-mt-16">
            <div className="mx-auto md:mx-0">
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-white">
                <img
                  src={avatarSrc || "/sub-logo.svg"}
                  alt="Logo tổ chức"
                  className="w-full h-full object-cover"
                />
                {editing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white cursor-pointer">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageSelect(e, "avatar")}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex-1 mt-3 md:mt-0 text-center md:text-left">
              {editing ? (
                <>
                  <input
                    value={editData.org?.name || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, org: { ...(prev.org || {}), name: e.target.value } }))
                    }
                    className="text-lg md:text-xl font-semibold w-full md:w-auto px-2 py-1 border-b border-gray-200 focus:outline-none"
                    placeholder="Tên tổ chức"
                    aria-label="Tên tổ chức"
                  />
                  {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
                </>
              ) : (
                <>
                  <h2 className="text-lg md:text-xl font-semibold">{org?.name || "Event Organizer"}</h2>
                  <div className="text-sm text-gray-500 mt-1 flex items-center justify-center md:justify-start gap-2">
                    <span>Thành lập: {org?.foundedYear || "—"}</span>
                    <span className="inline-flex items-center gap-1">
                      {org?.isVerify ? (
                        <Badge className="w-4 h-4" /> 
                      ) : (
                        <Badge className="w-4 h-4" />
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* action buttons */}
            <div className="mt-3 md:mt-0 flex items-center gap-2 justify-center md:justify-end">
              {editing ? (
                <>
                  <button
                    onClick={save}
                    disabled={saving}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    {saving ? (<><Loader2 className="animate-spin w-4 h-4" /> Đang lưu</>) : (<><Save className="w-4 h-4" /> Lưu</>)}
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm"
                  >
                    <X className="w-4 h-4" /> Huỷ
                  </button>
                </>
              ) : (
                <button
                  onClick={startEditing}
                  className="inline-flex items-center gap-2 bg-white bg-opacity-80 px-3 py-2 rounded-lg text-sm border"
                >
                  <Edit className="w-4 h-4" /> Chỉnh sửa
                </button>
              )}
            </div>
          </div>
        </div>

        {/* upload progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="px-4 pb-3">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full transition-all" style={{ width: `${uploadProgress}%`, background: "linear-gradient(90deg,#3b82f6,#06b6d4)" }} />
            </div>
            <div className="text-xs text-gray-500 mt-1">{uploadProgress}%</div>
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-2">Mô tả</h3>
        {editing ? (
          <>
            <textarea
              value={editData.org?.description || ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, org: { ...(prev.org || {}), description: e.target.value } }))
              }
              className="w-full p-2 border border-gray-200 rounded-lg resize-none text-sm"
              rows={4}
              placeholder="Giới thiệu ngắn (tối đa 500 ký tự)"
            />
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <div>{(editData.org?.description || "").length}/500</div>
              {errors.description && <div className="text-xs text-red-500">{errors.description}</div>}
            </div>
          </>
        ) : (
          <p className="text-gray-700 text-sm">{org?.description || "Chưa có mô tả"}</p>
        )}
      </div>

      {/* CONTACT */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold">Liên hệ</h3>
        <div className="space-y-2">
          <FieldRow icon={Mail} label="Email" error={errors.mail}>
            {editing ? (
              <input
                value={editData.contact?.mail || ""}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, contact: { ...(prev.contact || {}), mail: e.target.value } }))
                }
                placeholder="email@example.com"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                inputMode="email"
              />
            ) : (
              <div className="text-sm text-gray-700">{contact?.mail || "Chưa cập nhật"}</div>
            )}
          </FieldRow>

          <FieldRow icon={Phone} label="Số điện thoại" error={errors.phone}>
            {editing ? (
              <input
                value={editData.contact?.phone || ""}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, contact: { ...(prev.contact || {}), phone: e.target.value } }))
                }
                placeholder="+84..."
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                inputMode="tel"
              />
            ) : (
              <div className="text-sm text-gray-700">{contact?.phone || "Chưa cập nhật"}</div>
            )}
          </FieldRow>

          <FieldRow icon={Globe} label="Website" error={errors.websiteUrl}>
            {editing ? (
              <input
                value={editData.contact?.websiteUrl || ""}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, contact: { ...(prev.contact || {}), websiteUrl: e.target.value } }))
                }
                placeholder="https://your-site.com"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                inputMode="url"
              />
            ) : (
              <div className="text-sm text-gray-700">{contact?.websiteUrl || "Chưa cập nhật"}</div>
            )}
          </FieldRow>

          <FieldRow icon={MapPin} label="Địa chỉ">
            {editing ? (
              <input
                value={editData.contact?.address || ""}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, contact: { ...(prev.contact || {}), address: e.target.value } }))
                }
                placeholder="Địa chỉ"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
              />
            ) : (
              <div className="text-sm text-gray-700">{contact?.address || "Chưa cập nhật"}</div>
            )}
          </FieldRow>
        </div>
      </div>

      {/* small note + mobile sticky actions */}
      <div className="text-xs text-gray-500 text-center">
        Thông tin có thể được cập nhật công khai sau khi lưu (tuỳ quyền). Nếu muốn sửa logo/ảnh bìa, chọn ảnh có kích thước phù hợp.
      </div>

      {/* Floating mobile save button */}
      {editing && (
        <div className="fixed left-0 right-0 bottom-4 md:static md:translate-y-0 md:pt-0 flex justify-center pointer-events-auto z-40">
          <div className="w-full max-w-3xl px-4 md:px-0">
            <div className="md:hidden flex gap-2">
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                {saving ? (<><Loader2 className="animate-spin w-4 h-4" /> Đang lưu</>) : (<><Save className="w-4 h-4" /> Lưu</>)}
              </button>
              <button
                onClick={cancelEditing}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
              >
                <X className="w-4 h-4" /> Huỷ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileTab;
