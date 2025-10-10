import React, { useState, useCallback } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Award, DollarSign, 
  Camera, FileText, Settings, Eye, Save, Send, X, Plus,
  AlertCircle, Info, CheckCircle, Upload, Tag, Shield,
  Heart, Star, Building, Phone, Mail, Globe, Image
} from 'lucide-react';

export default function EventCreatePage() {
  const [currentStep, setCurrentStep] = useState(4);
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    category: '',
    eventType: 'volunteer', // volunteer, charity, community
    organizerType: 'partner', // partner, individual, organization
    
    // Schedule & Location
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    timezone: 'Asia/Ho_Chi_Minh',
    location: '',
    address: '',
    coordinates: null,
    isOnline: false,
    onlineLink: '',
    
    // Volunteer Requirements
    minAge: 16,
    maxAge: 65,
    genderRequirement: 'any', // any, male, female
    skillsRequired: [],
    experienceLevel: 'beginner', // beginner, intermediate, advanced
    volunteersNeeded: 10,
    registrationDeadline: '',
    
    // Benefits & Support
    benefits: {
      meals: false,
      transportation: false,
      accommodation: false,
      insurance: false,
      certificate: true,
      allowance: false,
      allowanceAmount: 0,
      descriptionBenfits : "",
      uniform: false,
      training: false,
      another: false,
    },
    
    // Media & Documents
    coverImage: null,
    additionalImages: [],
    documents: [],
    contactInfo: {
      coordinatorName: '',
      phone: '',
      email: '',
      alternateContact: ''
    },
    
    // Advanced Settings
    autoApprove: false,
    requireBackground: false,
    isPublic: true,
    tags: [],
    customFields: [],
    
    // Approval Settings
    needsApproval: true,
    priority: 'normal', // low, normal, high, urgent
    targetAudience: 'general' // general, students, professionals, seniors
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const categories = [
    'Môi trường', 'Giáo dục', 'Y tế', 'Trẻ em', 'Người cao tuổi',
    'Người khuyết tật', 'Cộng đồng', 'Văn hóa', 'Thể thao', 'Khác'
  ];

  const skillOptions = [
    'Tiếng Anh', 'Tin học', 'Y tế', 'Giảng dạy', 'Tổ chức sự kiện',
    'Nhiếp ảnh', 'Thiết kế', 'Marketing', 'Kế toán', 'Pháp lý',
    'Nấu ăn', 'Thủ công', 'Âm nhạc', 'Múa hát', 'Thể thao'
  ];

  const steps = [
    { id: 1, title: 'Thông tin cơ bản', icon: FileText },
    { id: 2, title: 'Thời gian & Địa điểm', icon: Calendar },
    { id: 3, title: 'Yêu cầu TNV', icon: Users },
    { id: 4, title: 'Quyền lợi & Hỗ trợ', icon: Award },
    { id: 5, title: 'Media & Liên hệ', icon: Camera },
    { id: 6, title: 'Cài đặt nâng cao', icon: Settings }
  ];

  const interest = [
                  { key: 'meals', label: 'Bữa ăn', icon: '🍽️' },
                  { key: 'transportation', label: 'Hỗ trợ đi lại', icon: '🚌' },
                  { key: 'accommodation', label: 'Chỗ ở', icon: '🏠' },
                  { key: 'insurance', label: 'Bảo hiểm', icon: '🛡️' },
                  { key: 'certificate', label: 'Chứng nhận', icon: '🏆' },
                  { key: 'uniform', label: 'Trang phục', icon: '👕' },
                  { key: 'training', label: 'Đào tạo', icon: '📚' },
                  { key: 'allowance', label: 'Phụ cấp', icon: '💰' },
                  { key: 'another', label: 'Khác', icon: '💰' }
                ]
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  }, [errors]);

  const handleNestedInputChange = useCallback((section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  const handleArrayAdd = useCallback((field, value) => {
    if (value && !formData[field].includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
    }
  }, [formData]);

  const handleArrayRemove = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item !== value)
    }));
  }, []);

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.title) newErrors.title = 'Tên sự kiện là bắt buộc';
        if (!formData.description) newErrors.description = 'Mô tả sự kiện là bắt buộc';
        if (!formData.category) newErrors.category = 'Danh mục là bắt buộc';
        break;
      case 2:
        if (!formData.startDate) newErrors.startDate = 'Ngày bắt đầu là bắt buộc';
        if (!formData.startTime) newErrors.startTime = 'Giờ bắt đầu là bắt buộc';
        if (!formData.isOnline && !formData.location) newErrors.location = 'Địa điểm là bắt buộc';
        break;
      case 3:
        if (formData.volunteersNeeded < 1) newErrors.volunteersNeeded = 'Cần ít nhất 1 tình nguyện viên';
        break;
      case 5:
        if (!formData.contactInfo.coordinatorName) newErrors.coordinatorName = 'Tên điều phối viên là bắt buộc';
        if (!formData.contactInfo.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
        if (!formData.contactInfo.email) newErrors.email = 'Email là bắt buộc';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (asDraft = false) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submitData = {
        ...formData,
        status: asDraft ? 'draft' : 'pending_approval',
        createdAt: new Date().toISOString(),
        submittedBy: 'current_user_id'
      };
      
      console.log('Submitting event:', submitData);
      
      // Show success message and redirect
      alert(asDraft ? 'Sự kiện đã được lưu nháp!' : 'Sự kiện đã được gửi phê duyệt!');
      
    } catch (error) {
      console.error('Submit error:', error);
      alert('Có lỗi xảy ra khi tạo sự kiện. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên sự kiện <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="VD: Làm sạch bờ biển Vũng Tàu"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả sự kiện <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Mô tả chi tiết về sự kiện, mục đích, ý nghĩa..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại sự kiện
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => handleInputChange('eventType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="volunteer">Tình nguyện</option>
                  <option value="charity">Từ thiện</option>
                  <option value="community">Cộng đồng</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đối tượng mục tiêu
              </label>
              <select
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="general">Tất cả mọi người</option>
                <option value="students">Sinh viên</option>
                <option value="professionals">Người đi làm</option>
                <option value="seniors">Người cao tuổi</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ bắt đầu <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.startTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ kết thúc
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isOnline"
                checked={formData.isOnline}
                onChange={(e) => handleInputChange('isOnline', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isOnline" className="text-sm font-medium text-gray-700">
                Sự kiện trực tuyến
              </label>
            </div>

            {!formData.isOnline ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa điểm <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="VD: Bãi biển Bãi Trước, Vũng Tàu"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ chi tiết
                  </label>
                  <textarea
                    rows={3}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Địa chỉ cụ thể, hướng dẫn đường đi..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link tham gia online
                </label>
                <input
                  type="url"
                  value={formData.onlineLink}
                  onChange={(e) => handleInputChange('onlineLink', e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng TNV cần tuyển <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.volunteersNeeded}
                  onChange={(e) => handleInputChange('volunteersNeeded', parseInt(e.target.value) || 0)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.volunteersNeeded ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.volunteersNeeded && <p className="mt-1 text-sm text-red-600">{errors.volunteersNeeded}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hạn đăng ký
                </label>
                <input
                  type="date"
                  value={formData.registrationDeadline}
                  onChange={(e) => handleInputChange('registrationDeadline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tuổi tối thiểu
                </label>
                <input
                  type="number"
                  min="16"
                  max="65"
                  value={formData.minAge}
                  onChange={(e) => handleInputChange('minAge', parseInt(e.target.value) || 16)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tuổi tối đa
                </label>
                <input
                  type="number"
                  min="16"
                  max="99"
                  value={formData.maxAge}
                  onChange={(e) => handleInputChange('maxAge', parseInt(e.target.value) || 65)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yêu cầu giới tính
                </label>
                <select
                  value={formData.genderRequirement}
                  onChange={(e) => handleInputChange('genderRequirement', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="any">Không yêu cầu</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mức độ kinh nghiệm
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="beginner">Người mới bắt đầu</option>
                <option value="intermediate">Có kinh nghiệm</option>
                <option value="advanced">Chuyên nghiệp</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kỹ năng yêu cầu
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleArrayRemove('skillsRequired', skill)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleArrayAdd('skillsRequired', e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Chọn kỹ năng</option>
                {skillOptions.filter(skill => !formData.skillsRequired.includes(skill)).map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quyền lợi cho tình nguyện viên</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interest?.map((benefit) => (
                  <label key={benefit.key} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.benefits[benefit.key]}
                      onChange={(e) => handleNestedInputChange('benefits', benefit.key, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{benefit.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.benefits.allowance && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức phụ cấp (VNĐ)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.benefits.allowanceAmount}
                  onChange={(e) => handleNestedInputChange('benefits', 'allowanceAmount', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="VD: 200000"
                />
              </div>
            )}

            {formData.benefits.another && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả về quyền lợi:
                </label>
                <input
                  type="text"
                  value={formData.benefits.descriptionBenfits}
                  onChange={(e) => handleNestedInputChange('benefits', 'descriptionBenfits', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mô tả quyền lợi"
                />
              </div>
            )}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Lưu ý về quyền lợi</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Việc cung cấp quyền lợi tốt sẽ giúp thu hút nhiều tình nguyện viên chất lượng hơn và tăng tỷ lệ hoàn thành sự kiện.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ảnh bìa sự kiện
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {formData.coverImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(formData.coverImage)}
                      alt="Cover"
                      className="mx-auto h-48 w-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('coverImage', null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click để tải lên ảnh bìa</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange('coverImage', e.target.files[0])}
                      className="hidden"
                      id="coverImage"
                    />
                    <label
                      htmlFor="coverImage"
                      className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      Chọn ảnh
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin liên hệ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên điều phối viên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.coordinatorName}
                    onChange={(e) => handleNestedInputChange('contactInfo', 'coordinatorName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.coordinatorName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tên người phụ trách sự kiện"
                  />
                  {errors.coordinatorName && <p className="mt-1 text-sm text-red-600">{errors.coordinatorName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleNestedInputChange('contactInfo', 'phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0901234567"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleNestedInputChange('contactInfo', 'email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="contact@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Liên hệ dự phòng
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.alternateContact}
                    onChange={(e) => handleNestedInputChange('contactInfo', 'alternateContact', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Số điện thoại hoặc email dự phòng"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ảnh bổ sung
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.additionalImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Additional ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...formData.additionalImages];
                        newImages.splice(index, 1);
                        handleInputChange('additionalImages', newImages);
                      }}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {formData.additionalImages.length < 8 && (
                  <label className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer">
                    <Plus className="w-6 h-6 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const newImages = [...formData.additionalImages, ...Array.from(e.target.files)];
                        handleInputChange('additionalImages', newImages.slice(0, 8));
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">Tối đa 8 ảnh bổ sung</p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cài đặt phê duyệt</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="autoApprove"
                    checked={formData.autoApprove}
                    onChange={(e) => handleInputChange('autoApprove', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="autoApprove" className="text-sm font-medium text-gray-700">
                    Tự động phê duyệt đăng ký (chỉ với TNV đã xác minh)
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="requireBackground"
                    checked={formData.requireBackground}
                    onChange={(e) => handleInputChange('requireBackground', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="requireBackground" className="text-sm font-medium text-gray-700">
                    Yêu cầu kiểm tra lý lịch
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
                    Công khai trên trang chủ
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mức độ ưu tiên
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Thấp</option>
                <option value="normal">Bình thường</option>
                <option value="high">Cao</option>
                <option value="urgent">Khẩn cấp</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleArrayRemove('tags', tag)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Thêm tag mới..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      handleArrayAdd('tags', e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    if (input.value.trim()) {
                      handleArrayAdd('tags', input.value.trim());
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-900">Lưu ý về phê duyệt</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Sự kiện sẽ được gửi đến Admin để phê duyệt trước khi công bố. Thời gian phê duyệt thông thường là 24-48 giờ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tạo sự kiện tình nguyện</h1>
          <p className="text-gray-600 mt-2">Tạo và quản lý sự kiện tình nguyện mới</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex items-center ${step.id < steps.length ? 'flex-1' : ''}`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= step.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        Step {step.id}
                      </p>
                      <p className={`text-xs ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {step.id < steps.length && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps.find(s => s.id === currentStep)?.title}
            </h2>
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Quay lại
            </button>

            <div className="flex space-x-3">
              {currentStep === steps.length ? (
                <>
                  <button
                    onClick={() => setPreviewMode(true)}
                    className="flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                  <button
                    onClick={() => handleSubmit(true)}
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Đang lưu...' : 'Lưu nháp'}
                  </button>
                  <button
                    onClick={() => handleSubmit(false)}
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Đang gửi...' : 'Gửi phê duyệt'}
                  </button>
                </>
              ) : (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tiếp tục
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}