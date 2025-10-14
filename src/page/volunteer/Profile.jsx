import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import { Mail, Phone, MapPin, Facebook, Youtube, Pencil, Calendar, Award, Star, Users, TrendingUp, Edit2, Check, X, Clock, Save, Plus, Trash2, Notebook } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const {token} = useAuth();

  const [data, setData] = useState({
    setting: {
      emailNotification: true,
      showProfile: true
    }
  });

  // deep-clone initial editData to avoid accidental mutation of `data`
  const [editData, setEditData] = useState(() => JSON.parse(JSON.stringify(data)));
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);


  useEffect(() => {
    if (!token) return; 

    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/volunteer/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if(res.data?.code === 0){ 
          setData(res.data?.result);
        }
      } catch (rawError) {
        if (axios.isAxiosError(rawError)) {
          const ae = rawError;
          console.error("Axios error snapshot:", JSON.parse(JSON.stringify({
            message: ae.message,
            code: ae.code,
            status: ae.response?.status,
            data: ae.response?.data,
            headers: ae.response?.headers,
            hasRequest: !!ae.request
          })));
          if (ae.response?.status === 403) {
            console.warn("Access denied — token invalid/expired or user lacks role");
          }
        } else {
          console.error("Non-axios error", rawError);
        }
      }
    };

    load();
  }, [token]);

    useEffect(() => {
    if (!token) return; 

    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/volunteer/profile/me`, { // lấy ra đánh giá của btc
          // với tôi
          headers: { Authorization: `Bearer ${token}` },
        });
        if(res.data?.code === 0){ 
          setData(res.data?.result);
        }
      } catch (rawError) {
        if (axios.isAxiosError(rawError)) {
          const ae = rawError;
          console.error("Axios error snapshot:", JSON.parse(JSON.stringify({
            message: ae.message,
            code: ae.code,
            status: ae.response?.status,
            data: ae.response?.data,
            headers: ae.response?.headers,
            hasRequest: !!ae.request
          })));
          if (ae.response?.status === 403) {
            console.warn("Access denied — token invalid/expired or user lacks role");
          }
        } else {
          console.error("Non-axios error", rawError);
        }
      }
    };

    load();
  }, [token]);

  // Helpers
  const handleBasicInfoChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value
      }
    }));
  };

  const handleContactInfoChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  // Skills
  const handleSkillChange = (skillId, field, value) => {
    setEditData(prev => ({
      ...prev,
      skill: prev.skill.map(skill => 
        skill.id === skillId ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const handleSkillTagChange = (skillId, tagId, value) => {
    setEditData(prev => ({
      ...prev,
      skill: prev.skill.map(skill => 
        skill.id === skillId ? {
          ...skill,
          tag: skill.tag.map(tag => 
            tag.id === tagId ? { ...tag, tagName: value } : tag
          )
        } : skill
      )
    }));
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: '',
      description: '',
      tag: []
    };
    setEditData(prev => ({
      ...prev,
      skill: [...prev.skill, newSkill]
    }));
  };

  const removeSkill = (skillId) => {
    setEditData(prev => ({
      ...prev,
      skill: prev.skill.filter(skill => skill.id !== skillId)
    }));
  };

  const addSkillTag = (skillId) => {
    setEditData(prev => ({
      ...prev,
      skill: prev.skill.map(skill => 
        skill.id === skillId ? {
          ...skill,
          tag: [...skill.tag, { id: Date.now().toString(), tagName: '' }]
        } : skill
      )
    }));
  };

  const removeSkillTag = (skillId, tagId) => {
    setEditData(prev => ({
      ...prev,
      skill: prev.skill.map(skill => 
        skill.id === skillId ? {
          ...skill,
          tag: skill.tag.filter(tag => tag.id !== tagId)
        } : skill
      )
    }));
  };

  // --- FIXED: add area of interest correctly (no skill param) ---
  const addAreaOfInterest = () => {
    const newArea = { id: Date.now().toString(), name: 'Lĩnh vực mới', slug: '' };
    setEditData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        AreasOfInterest: [...prev.basicInfo.AreasOfInterest, newArea]
      }
    }));
  };

  const removeArea = (areaId) => {
    setEditData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        AreasOfInterest: prev.basicInfo.AreasOfInterest.filter(a => a.id !== areaId)
      }
    }));
  };

  // Avatar upload (works for edit mode)
  const handleAvatarChange = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      // reader.result is a data URL string
      handleBasicInfoChange('avatarUrl', reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Social links
  const handleSocialLinkChange = (linkId, field, value) => {
    setEditData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        socialLinks: prev.contactInfo.socialLinks.map(link =>
          link.id === linkId ? { ...link, [field]: value } : link
        )
      }
    }));
  };

  const addSocialLink = () => {
    const newLink = {
      id: Date.now().toString(),
      type: 'facebook',
      link: ''
    };
    setEditData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        socialLinks: [...prev.contactInfo.socialLinks, newLink]
      }
    }));
  };

  const removeSocialLink = (linkId) => {
    setEditData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        socialLinks: prev.contactInfo.socialLinks.filter(link => link.id !== linkId)
      }
    }));
  };

  // Save changes (keeps your simulated API)
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: replace with real API call if needed
      // await axios.put('/api/profile/update', editData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(JSON.parse(JSON.stringify(editData))); // clone to avoid reference issues
      setIsEditing(false);
      toast.success('Cập nhật thành công!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Có lỗi xảy ra khi lưu dữ liệu!');
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel editing -> reset editData from data (deep clone)
  const handleCancel = () => {
    setEditData(JSON.parse(JSON.stringify(data)));
    setIsEditing(false);
  };

  const getSocialIcon = (type) => {
    switch(type) {
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50/30">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center gap-6 w-full py-2">
              {/* Header row - responsive: column trên mobile, row trên sm+ */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full max-w-4xl px-4">
                {/* Avatar */}
                <div className="relative group w-32 h-32 flex-shrink-0">
                  <img
                    src={
                      (isEditing ? editData?.basicInfo?.avatarUrl : data?.basicInfo?.avatarUrl)
                        ? (isEditing ? editData?.basicInfo?.avatarUrl : data?.basicInfo?.avatarUrl)
                        : "sub-logo.svg"
                    }
                    alt={isEditing ? editData?.basicInfo?.name : data?.basicInfo?.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                  />

                  {/* Verified badge */}
                  { (isEditing ? editData?.basicInfo?.isVerify : data?.basicInfo?.isVerify) ? (
                    <div
                      className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg"
                      title="Đã xác thực"
                      aria-hidden
                    >
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div
                      className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-2 shadow-lg"
                      title="Chưa xác thực!"
                      aria-hidden
                    >
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                  )}

                  {/* File input overlay khi chỉnh sửa */}
                  {isEditing && editData?.basicInfo && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        aria-label="Thay đổi ảnh đại diện"
                      />
                      <div
                        className="absolute inset-0 w-32 h-32 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        aria-hidden
                      >
                        <Edit2 className="w-6 h-6 text-white" />
                      </div>
                    </>
                  )}
                </div>

                {/* Name + meta */}
                <div className="flex-1 text-center sm:text-left w-full">
                  {isEditing && editData?.basicInfo ? (
                    <input
                      type="text"
                      value={editData?.basicInfo?.name}
                      onChange={(e) => handleBasicInfoChange("name", e.target.value)}
                      className="block mx-auto sm:mx-0 text-3xl font-bold text-gray-900 mb-2 w-full max-w-xl border-b-2 border-transparent focus:border-blue-400 outline-none px-2 py-1 bg-transparent text-center sm:text-left"
                      placeholder="Tên của bạn"
                      aria-label="Tên"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {data?.basicInfo?.name ? data?.basicInfo?.name : "Người dùng"}
                    </h1>
                  )}

                  <p className="text-gray-600 mb-4">
                    Tham gia từ { data?.basicInfo?.foundedYear ? new Date((isEditing ? editData : data)?.basicInfo?.foundedYear).getFullYear() : new Date(Date.now()).getFullYear() }
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-2xl px-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-bold text-lg">{(isEditing ? editData : data).basicInfo?.totalEvent ?? 0}</span>
                  </div>
                  <p className="text-xs text-gray-600">Sự kiện</p>
                </div>

                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="font-bold text-lg">{(isEditing ? editData : data)?.basicInfo?.totalFollow ?? 0}</span>
                  </div>
                  <p className="text-xs text-gray-600">Người theo dõi</p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-yellow-600 mb-1">
                    <Star className="w-4 h-4" />
                    <span className="font-bold text-lg">{(isEditing ? editData : data)?.basicInfo?.ratting ?? 0}</span>
                  </div>
                  <p className="text-xs text-gray-600">Đánh giá</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Thông tin liên hệ</h2>
                {isEditing ? ( 
                  <div className='flex sm:flex-row flex-col gap-2'>
                    <button 
                      onClick={() => handleSave()}
                      disabled={isSaving}
                      title='Cập nhật thông tin!'
                      className="py-2 px-4 bg-blue-500 hover:bg-blue-600 font-semibold text-white hover:scale-105 transition-all duration-300 border border-gray-200 flex items-center gap-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" /> Lưu
                    </button>
                    <button 
                      onClick={() => handleCancel()}
                      title='Hủy'
                      className="py-2 px-4 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 font-semibold text-gray-600 hover:scale-105 transition-all duration-300 border border-gray-200 flex items-center gap-2 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600 font-semibold" /> Hủy
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setIsEditing(true); setEditData(JSON.parse(JSON.stringify(data))); }}
                    title='Cập nhật thông tin!'
                    className="p-2 bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <label htmlFor="contact-email" className="text-sm w-28">Email</label>

                  {isEditing ? (
                    <input
                      id="contact-email"
                      type="email"
                      value={editData?.contactInfo?.mail}
                      onChange={(e) => handleContactInfoChange('mail', e.target.value)}
                      placeholder="example@domain.com"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  ) : (
                    <div className="flex-1 text-sm text-gray-800">{data?.contactInfo?.mail || <span className="text-gray-400">Chưa cập nhật</span>}</div>
                  )}
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <label htmlFor="contact-phone" className="text-sm w-28">Số điện thoại</label>

                  {isEditing ? (
                    <input
                      id="contact-phone"
                      type="tel"
                      value={editData?.contactInfo?.phone}
                      onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                      placeholder="+84 9xx xxx xxx"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  ) : (
                    <div className="flex-1 text-sm text-gray-800">{data?.contactInfo?.phone || <span className="text-gray-400">Chưa cập nhật</span>}</div>
                  )}
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <label htmlFor="contact-address" className="text-sm w-28">Địa chỉ</label>

                  {isEditing ? (
                    <input
                      id="contact-address"
                      type="text"
                      value={editData?.contactInfo?.address}
                      onChange={(e) => handleContactInfoChange('address', e.target.value)}
                      placeholder="Thành phố, Tỉnh"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                  ) : (
                    <div className="flex-1 text-sm text-gray-800">{data?.contactInfo?.address || <span className="text-gray-400">Chưa cập nhật</span>}</div>
                  )}
                </div>

                {/* Social links */}
                <div className="pt-3 border-t border-white/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Mạng xã hội</span>

                    {isEditing && (
                      <button
                        type="button"
                        onClick={addSocialLink}
                        className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" /> Thêm
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                    {(isEditing ? editData?.contactInfo?.socialLinks : data?.contactInfo?.socialLinks)?.length ? (
                      (isEditing ? editData?.contactInfo?.socialLinks : data?.contactInfo?.socialLinks)?.map((link) => (
                        <div key={link?.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                          <a href={link?.link || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm ${link.link ? 'text-gray-700 hover:text-blue-600' : 'text-gray-400'}`}>
                            <span className="flex-shrink-0">{getSocialIcon(link?.type)}</span>
                            <span className="truncate max-w-[10rem]">{link?.type}</span>
                          </a>

                          {isEditing && (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  const newUrl = prompt('Nhập URL cho ' + link?.type, link?.link || '');
                                  if (newUrl !== null) handleSocialLinkChange(link?.id, 'link', newUrl);
                                }}
                                className="text-sm text-gray-500 hover:text-gray-700 px-1"
                                title="Chỉnh sửa URL"
                              >
                                Sửa
                              </button>

                              <button
                                type="button"
                                onClick={() => removeSocialLink(link?.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Xóa"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-400">Chưa có liên kết mạng xã hội</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Giới thiệu</h2>
            </div>
            
            <div className="w-full flex flex-col  gap-4">
              {isEditing && data?.basicInfo ? (
                <textarea
                  value={editData?.basicInfo?.description ?? ""}
                  onChange={(e) => handleBasicInfoChange("description", e.target.value)}
                  rows={4}
                  placeholder="Viết mô tả..."
                  aria-label="Mô tả"
                  className="w-full rounded-md border border-gray-200 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y"
                />
              ) : (
                <>
                  {(((isEditing ? editData : data)?.basicInfo?.description ?? "").toString().trim() === "") ? (
                    <div className="flex items-center justify-between gap-4 border-2 border-dashed border-gray-200 rounded-lg p-2 bg-gradient-to-r from-white to-gray-50 shadow-sm w-full">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 rounded-full bg-gray-100 p-2">
                          <Pencil className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-gray-800 font-semibold">Chưa có mô tả</div>
                          <div className="text-sm text-gray-500">Thêm chút giới thiệu giúp người khác hiểu bạn hơn.</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {(isEditing ? editData : data)?.basicInfo?.description}
                    </p>
                  )}
                </>
              )}
            </div>

            
            <div className="flex flex-wrap flex-row justify-between gap-2 mt-4">
              <div className='flex flex-col gap-2'>
                <span className="text-sm font-medium text-gray-700 mr-2">Lĩnh vực quan tâm:</span>
                {!data?.basicInfo?.AreasOfInterest ? (
                  <span className="flex gap-2 flex-wrap max-w-5xl text-gray-500 text-sm">Chưa cập nhật</span>
                ): ( 
                  <div className='flex gap-2 flex-wrap max-w-5xl'>
                    {(isEditing ? editData : data).basicInfo?.AreasOfInterest.map(area => (
                      <span key={area.id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {area.name}
                      </span>
                    ))}                         
                  </div>                  
                )}

              </div>

              <button onClick={addAreaOfInterest} className="max-h-10 text-blue-500 bg-blue-100 px-3 py-1 rounded hover:bg-blue-200 hover:text-blue-600 flex items-center gap-1 text-sm">
                <Plus className="w-3 h-3" /> Thêm lĩnh vực
              </button>
            </div>
          </div>

          {/* Skills Section (unchanged logic) */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Kỹ năng & Năng lực</h2>
              {isEditing && (
                <button onClick={addSkill} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Thêm kỹ năng
                </button>
              )}
            </div>

            {!data?.skill || data.skill.length === 0 ? (
              <div className="flex items-center justify-between gap-4 border-2 p-2 border-dashed border-gray-200 rounded-lg bg-gradient-to-r from-white to-gray-50 shadow-sm w-full">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 rounded-full bg-gray-100 p-2">
                    <Pencil className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                  <div className="text-gray-800 font-semibold">Chưa có kĩ năng</div>
                    <div className="text-sm text-gray-500">Thêm chút kĩ năng mới để gây ấn tượng và nhận thêm sự kiện phù hợp.</div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {isEditing ? (
                  <div className="space-y-4">
                    {editData?.skill?.map((skill) => (
                      <div key={skill?.id} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border-2 border-blue-200">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="p-2 bg-blue-500 rounded-lg">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <input
                              type="text"
                              value={skill?.name}
                              onChange={(e) => handleSkillChange(skill?.id, 'name', e.target.value)}
                              className="w-full font-semibold text-gray-900 border-b-2 border-blue-300 focus:border-blue-500 outline-none px-2 py-1 bg-transparent"
                              placeholder="Tên kỹ năng"
                            />
                            <textarea
                              value={skill?.description}
                              onChange={(e) => handleSkillChange(skill?.id, 'description', e.target.value)}
                              className="w-full text-sm text-gray-600 border border-gray-300 rounded p-2 focus:border-blue-500 outline-none"
                              placeholder="Mô tả kỹ năng"
                              rows="2"
                            />
                          </div>
                          <button onClick={() => removeSkill(skill?.id)} className="text-red-500 hover:text-red-600 p-2">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Tags:</span>
                            <button onClick={() => addSkillTag(skill?.id)} className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm">
                              <Plus className="w-3 h-3" /> Thêm tag
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {skill?.tag.map(tag => (
                              <div key={tag?.id} className="flex items-center gap-1 bg-white border border-gray-300 rounded-full px-3 py-1">
                                <span className="text-gray-500 text-xs">#</span>
                                <input
                                  type="text"
                                  value={tag?.tagName}
                                  onChange={(e) => handleSkillTagChange(skill?.id, tag?.id, e.target.value)}
                                  className="text-xs font-medium text-gray-700 outline-none w-20"
                                  placeholder="tag"
                                />
                                <button onClick={() => removeSkillTag(skill?.id, tag?.id)} className="text-red-500 hover:text-red-600">
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data?.skill?.map(skill => (
                      <div key={skill?.id} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-100">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-blue-500 rounded-lg">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{skill?.name}</h3>
                            <p className="text-sm text-gray-600">{skill?.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {skill?.tag?.map(tag => (
                            <span key={tag?.id} className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                              #{tag?.tagName}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}                
              </div>
            )}

          </div>

          {/* History & Feedback sections remain the same (unchanged) */}
          {/* ... (kept as in your original) */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hoạt động đã tham gia</h2>
            {!data?.history || data.history.length === 0 ? (
              <div className="w-full mx-auto">
                <div className="flex flex-col items-center justify-center gap-4 border border-dashed rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 shadow-sm text-center">
                  <div className="flex items-center justify-center w-22 h-22 rounded-full bg-blue-50">
                    <Notebook className="w-12 h-12 text-blue-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800">
                    Chưa có hoạt động nào gần đây
                  </h3>

                  <p className="text-sm text-gray-500 max-w-prose">
                    Tất cả hoạt động sẽ được hiển thị tại đây.
                    Hãy tham gia hoạt động đầu tiên hoặc khám phá những sự kiện đang có.
                  </p>

                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {data.history.map((event, index) => (
                  <div key={event.id} className="flex gap-4 pb-4 border-b last:border-b-0 border-gray-100">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">{index+1}</div>
                      {index < data.history.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{event.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500"><Calendar className="w-4 h-4" /> <span>Hoàn thành: {new Date(event.dateEnd).toLocaleDateString('vi-VN')}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá từ Ban tổ chức</h2>
            {feedbacks.length === 0 ? (
              <div className="w-full mx-auto">
                <div className="flex flex-col items-center justify-center gap-4 border border-dashed rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 shadow-sm text-center">
                  <div className="flex items-center justify-center w-22 h-22 rounded-full bg-blue-50">
                    <Notebook className="w-12 h-12 text-blue-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800">
                    Chưa có đánh giá nào 
                  </h3>

                  <p className="text-sm text-gray-500 max-w-prose">
                    Tất cả đánh giá sẽ được hiển thị tại đây.
                    Hãy tham gia hoạt động đầu tiên hoặc khám phá những sự kiện đang có.
                  </p>

                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbacks?.map(feedback => (
                  <div key={feedback?.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-5 border border-yellow-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < feedback?.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />))}
                      </div>
                      <span className="text-xs text-gray-500">{new Date(feedback?.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feedback?.organizerName}</h4>
                    <p className="text-xs text-blue-600 mb-3">{feedback?.event}</p>
                    <p className="text-sm text-gray-700 italic">"{feedback?.comment}"</p>
                  </div>
                ))}
              </div>              
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
