import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import { Mail, Phone, MapPin, Facebook, Youtube, Calendar, Award, Star, Users, TrendingUp, Edit2, Check, X, Clock, Save, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const [data, setData] = useState({
    basicInfo: {
      name: "Nguyễn Văn An",
      description: "Là một người đam mê tình nguyện và phát triển cộng đồng. Tôi luôn tìm kiếm cơ hội để đóng góp và tạo ra những thay đổi tích cực cho xã hội.",
      foundedYear: new Date('2020-01-15'),
      totalFollow: '2,450',
      ratting: 4.8,
      totalEvent: 45,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      isVerify: true,
      slug: 'nguyen-van-an',
      AreasOfInterest: [
        { id: '1', name: 'Giáo dục', slug: 'giao-duc' },
        { id: '2', name: 'Môi trường', slug: 'moi-truong' },
        { id: '3', name: 'Y tế cộng đồng', slug: 'y-te-cong-dong' }
      ]
    },
    contactInfo: {
      mail: 'nguyenvanan@email.com',
      phone: '+84 123 456 789',
      address: 'Hải Phòng, Việt Nam',
      socialLinks: [
        { id: '1', type: 'facebook', link: 'https://facebook.com/nguyenvanan' },
        { id: '2', type: 'youtube', link: 'https://youtube.com/@nguyenvanan' }
      ]
    },
    skill: [
      {
        id: '1',
        name: 'Tổ chức sự kiện',
        description: 'Kinh nghiệm tổ chức và điều phối các sự kiện tình nguyện quy mô lớn',
        tag: [
          { id: '1', tagName: 'Lãnh đạo' },
          { id: '2', tagName: 'Quản lý' }
        ]
      },
      {
        id: '2',
        name: 'Giao tiếp cộng đồng',
        description: 'Khả năng kết nối và làm việc hiệu quả với các nhóm đối tượng khác nhau',
        tag: [
          { id: '3', tagName: 'Teamwork' },
          { id: '4', tagName: 'Communication' }
        ]
      }
    ],
    history: [
      {
        id: '1',
        name: 'Chiến dịch Môi trường Xanh 2024',
        description: 'Tham gia tổ chức chiến dịch trồng 1000 cây xanh tại khu vực ven biển Hải Phòng',
        dateEnd: '2024-09-15',
        slug: 'moi-truong-xanh-2024',
      },
      {
        id: '2',
        name: 'Hỗ trợ giáo dục vùng cao',
        description: 'Đồng hành cùng trẻ em vùng cao, mang sách và đồ dùng học tập đến các em',
        dateEnd: '2024-06-20',
        slug: 'ho-tro-giao-duc',
      },
      {
        id: '3',
        name: 'Ngày hội hiến máu nhân đạo',
        description: 'Phối hợp tổ chức ngày hội hiến máu, thu hút hơn 300 đơn vị máu',
        dateEnd: '2024-03-10',
        slug: 'ngay-hoi-hien-mau',
      }
    ],
    setting: {
      emailNotification: true,
      showProfile: true
    }
  });

  // deep-clone initial editData to avoid accidental mutation of `data`
  const [editData, setEditData] = useState(() => JSON.parse(JSON.stringify(data)));
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const feedbacks = [
    {
      id: '1',
      organizerName: 'Hội Chữ Thập Đỏ Hải Phòng',
      event: 'Ngày hội hiến máu nhân đạo',
      rating: 5,
      comment: 'An là một tình nguyện viên tận tâm và nhiệt huyết. Khả năng tổ chức và điều phối xuất sắc!',
      date: '2024-03-15'
    },
    {
      id: '2',
      organizerName: 'Trung tâm Hỗ trợ Giáo dục',
      event: 'Hỗ trợ giáo dục vùng cao',
      rating: 5,
      comment: 'Rất ấn tượng với tinh thần trách nhiệm và sự tận tình của An với các em nhỏ.',
      date: '2024-06-25'
    },
    {
      id: '3',
      organizerName: 'Tổ chức Xanh Việt Nam',
      event: 'Chiến dịch Môi trường Xanh 2024',
      rating: 4,
      comment: 'An đã đóng góp tích cực cho sự thành công của chiến dịch. Hy vọng sẽ có cơ hội hợp tác thêm!',
      date: '2024-09-20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50/30 pb-24">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Avatar & Stats */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative group">
                <img 
                  src={isEditing ? editData.basicInfo.avatarUrl : data.basicInfo.avatarUrl} 
                  alt={isEditing ? editData.basicInfo.name : data.basicInfo.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                />
                {(isEditing ? editData.basicInfo.isVerify : data.basicInfo.isVerify) ? (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg" title='Đã xác thực'>
                    <Check className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-2 shadow-lg" title='Chưa xác thực!'>
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Only show file input overlay in edit mode; DO NOT set `value` on file inputs */}
                {isEditing && (
                  <>
                    <input 
                      type='file' 
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      aria-label="Thay đổi ảnh đại diện"
                    />
                    <label 
                      className="absolute inset-0 w-32 h-32 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      aria-hidden
                    >
                      <Edit2 className="w-6 h-6 text-white" />
                    </label>
                  </>
                )}
              </div>
              
              <div className="flex-1 text-center sm:text-left w-full">
                {isEditing ? (
                  <input 
                    type='text' 
                    value={editData.basicInfo.name}
                    onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                    className="text-3xl font-bold text-gray-900 mb-2 w-full border-b-2 border-blue-300 focus:border-blue-500 outline-none px-2 py-1 bg-transparent text-center sm:text-left" 
                    placeholder="Tên của bạn"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {data.basicInfo.name}
                  </h1>
                )}
                <p className="text-gray-600 mb-4">
                  Tham gia từ {new Date((isEditing ? editData : data).basicInfo.foundedYear).getFullYear()}
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-bold text-lg">{(isEditing ? editData : data).basicInfo.totalEvent}</span>
                    </div>
                    <p className="text-xs text-gray-600">Sự kiện</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="font-bold text-lg">{(isEditing ? editData : data).basicInfo.totalFollow}</span>
                    </div>
                    <p className="text-xs text-gray-600">Người theo dõi</p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-600 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-lg">{(isEditing ? editData : data).basicInfo.ratting}</span>
                    </div>
                    <p className="text-xs text-gray-600">Đánh giá</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Info */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Thông tin liên hệ</h2>
                {isEditing ? ( 
                  <div className='flex gap-2'>
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
                      value={editData.contactInfo.mail}
                      onChange={(e) => handleContactInfoChange('mail', e.target.value)}
                      placeholder="example@domain.com"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  ) : (
                    <div className="flex-1 text-sm text-gray-800">{data.contactInfo.mail || <span className="text-gray-400">Chưa cập nhật</span>}</div>
                  )}
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <label htmlFor="contact-phone" className="text-sm w-28">Số điện thoại</label>

                  {isEditing ? (
                    <input
                      id="contact-phone"
                      type="tel"
                      value={editData.contactInfo.phone}
                      onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                      placeholder="+84 9xx xxx xxx"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  ) : (
                    <div className="flex-1 text-sm text-gray-800">{data.contactInfo.phone || <span className="text-gray-400">Chưa cập nhật</span>}</div>
                  )}
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <label htmlFor="contact-address" className="text-sm w-28">Địa chỉ</label>

                  {isEditing ? (
                    <input
                      id="contact-address"
                      type="text"
                      value={editData.contactInfo.address}
                      onChange={(e) => handleContactInfoChange('address', e.target.value)}
                      placeholder="Thành phố, Tỉnh"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                  ) : (
                    <div className="flex-1 text-sm text-gray-800">{data.contactInfo.address || <span className="text-gray-400">Chưa cập nhật</span>}</div>
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
                    {(isEditing ? editData.contactInfo.socialLinks : data.contactInfo.socialLinks)?.length ? (
                      (isEditing ? editData.contactInfo.socialLinks : data.contactInfo.socialLinks).map((link) => (
                        <div key={link.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                          <a href={link.link || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm ${link.link ? 'text-gray-700 hover:text-blue-600' : 'text-gray-400'}`}>
                            <span className="flex-shrink-0">{getSocialIcon(link.type)}</span>
                            <span className="truncate max-w-[10rem]">{link.type}</span>
                          </a>

                          {isEditing && (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  const newUrl = prompt('Nhập URL cho ' + link.type, link.link || '');
                                  if (newUrl !== null) handleSocialLinkChange(link.id, 'link', newUrl);
                                }}
                                className="text-sm text-gray-500 hover:text-gray-700 px-1"
                                title="Chỉnh sửa URL"
                              >
                                Sửa
                              </button>

                              <button
                                type="button"
                                onClick={() => removeSocialLink(link.id)}
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
      </div> {/* end header */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Giới thiệu</h2>
            </div>
            
            {isEditing ? (
              <textarea
                value={editData.basicInfo.description}
                onChange={(e) => handleBasicInfoChange('description', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg p-4 text-gray-700 leading-relaxed mb-6 focus:border-blue-500 outline-none min-h-32"
                placeholder="Viết giới thiệu về bản thân..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.basicInfo.description}
              </p>
            )}
            
            <div className="flex flex-wrap flex-row justify-between gap-2">
              <div className='flex flex-col gap-2'>
                <span className="text-sm font-medium text-gray-700 mr-2">Lĩnh vực quan tâm:</span>
                <div className='flex gap-2 flex-wrap max-w-5xl'>
                  {(isEditing ? editData : data).basicInfo.AreasOfInterest.map(area => (
                    <span key={area.id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {area.name}
                    </span>
                  ))}                         
                </div>
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

            {isEditing ? (
              <div className="space-y-4">
                {editData.skill.map((skill, index) => (
                  <div key={skill.id} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border-2 border-blue-200">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => handleSkillChange(skill.id, 'name', e.target.value)}
                          className="w-full font-semibold text-gray-900 border-b-2 border-blue-300 focus:border-blue-500 outline-none px-2 py-1 bg-transparent"
                          placeholder="Tên kỹ năng"
                        />
                        <textarea
                          value={skill.description}
                          onChange={(e) => handleSkillChange(skill.id, 'description', e.target.value)}
                          className="w-full text-sm text-gray-600 border border-gray-300 rounded p-2 focus:border-blue-500 outline-none"
                          placeholder="Mô tả kỹ năng"
                          rows="2"
                        />
                      </div>
                      <button onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-600 p-2">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Tags:</span>
                        <button onClick={() => addSkillTag(skill.id)} className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm">
                          <Plus className="w-3 h-3" /> Thêm tag
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.tag.map(tag => (
                          <div key={tag.id} className="flex items-center gap-1 bg-white border border-gray-300 rounded-full px-3 py-1">
                            <span className="text-gray-500 text-xs">#</span>
                            <input
                              type="text"
                              value={tag.tagName}
                              onChange={(e) => handleSkillTagChange(skill.id, tag.id, e.target.value)}
                              className="text-xs font-medium text-gray-700 outline-none w-20"
                              placeholder="tag"
                            />
                            <button onClick={() => removeSkillTag(skill.id, tag.id)} className="text-red-500 hover:text-red-600">
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
                {data.skill.map(skill => (
                  <div key={skill.id} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-100">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{skill.name}</h3>
                        <p className="text-sm text-gray-600">{skill.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skill.tag.map(tag => (
                        <span key={tag.id} className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                          #{tag.tagName}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* History & Feedback sections remain the same (unchanged) */}
          {/* ... (kept as in your original) */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hoạt động đã tham gia</h2>
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
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá từ Ban tổ chức</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.map(feedback => (
                <div key={feedback.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-5 border border-yellow-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />))}
                    </div>
                    <span className="text-xs text-gray-500">{new Date(feedback.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{feedback.organizerName}</h4>
                  <p className="text-xs text-blue-600 mb-3">{feedback.event}</p>
                  <p className="text-sm text-gray-700 italic">"{feedback.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
