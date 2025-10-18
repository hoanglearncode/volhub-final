import React, { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  Save,
  Send,
  Image,
  X,
  Plus,
  Tag,
  Calendar,
  User,
  Globe,
  Lock,
  ChevronDown,
  Link,
  Bold,
  Italic,
  List,
  AlertCircle
} from 'lucide-react';

export default function BlogCreateForm() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    author: '',
    publishDate: '',
    publishTime: '',
    visibility: 'public',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  const [newTag, setNewTag] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = [
    { id: 'huong-dan', name: 'Hướng dẫn' },
    { id: 'quan-ly', name: 'Quản lý' },
    { id: 'su-kien', name: 'Sự kiện' },
    { id: 'tin-tuc', name: 'Tin tức' }
  ];

  const authors = [
    { id: '1', name: 'Nguyễn Văn A' },
    { id: '2', name: 'Trần Thị Mai' },
    { id: '3', name: 'Lê Hoàng' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value) => {
    handleChange('title', value);
    if (!formData.slug) {
      handleChange('slug', generateSlug(value));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const addTag = () => {
    const tag = newTag.trim();
    if (tag && !formData.tags.includes(tag)) {
      handleChange('tags', [...formData.tags, tag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    handleChange('tags', formData.tags.filter(t => t !== tagToRemove));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề';
    if (!formData.category) newErrors.category = 'Vui lòng chọn danh mục';
    if (!formData.author) newErrors.author = 'Vui lòng chọn tác giả';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Vui lòng nhập mô tả ngắn';
    if (!formData.content.trim()) newErrors.content = 'Vui lòng nhập nội dung';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    alert('✅ Đã lưu bản nháp!');
  };

  const handlePublish = () => {
    if (validate()) {
      alert('🎉 Bài viết đã được xuất bản thành công!');
    } else {
      alert('⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!');
    }
  };

  const PreviewModal = () => (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 flex items-center justify-between z-10 shadow-sm">
        <button
          onClick={() => setShowPreview(false)}
          className="flex items-center gap-2 text-gray-700 font-medium active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </button>
        <span className="text-sm text-gray-500">Xem trước</span>
      </div>

      <article className="max-w-3xl mx-auto p-6 pb-20">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Featured"
            className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
          />
        )}
        
        <div className="mb-4">
          <span className="inline-block px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
            {categories.find(c => c.id === formData.category)?.name || 'Chưa có danh mục'}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {formData.title || 'Tiêu đề bài viết'}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{authors.find(a => a.id === formData.author)?.name || 'Tác giả'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formData.publishDate || new Date().toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
            {formData.excerpt || 'Mô tả ngắn của bài viết sẽ hiển thị ở đây...'}
          </p>
          <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {formData.content || 'Nội dung bài viết của bạn sẽ hiển thị ở đây...'}
          </div>
        </div>

        {formData.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );

  if (showPreview) return <PreviewModal />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-700 active:scale-95 transition-transform font-medium"
            >
              <ArrowLeft size={20} />
              <span>Quay lại</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(true)}
                className="p-2.5 rounded-xl bg-gray-100 active:scale-95 transition-transform"
                aria-label="Xem trước"
              >
                <Eye size={18} />
              </button>
              <button
                onClick={handleSaveDraft}
                className="p-2.5 rounded-xl bg-gray-100 active:scale-95 transition-transform"
                aria-label="Lưu nháp"
              >
                <Save size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-28">
        <div className="space-y-5">
          {/* Title */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tiêu đề bài viết <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
              className={`w-full p-4 border-2 ${errors.title ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg font-semibold`}
            />
            {errors.title && (
              <div className="flex items-center gap-1.5 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          {/* Slug */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Đường dẫn (URL Slug)
            </label>
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <Link size={18} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                placeholder="duong-dan-bai-viet"
                className="flex-1 bg-transparent outline-none text-gray-700"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <Globe size={12} />
              example.com/blog/<span className="font-medium text-blue-600">{formData.slug || 'duong-dan'}</span>
            </p>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Ảnh đại diện
            </label>
            
            {imagePreview ? (
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-56 object-cover rounded-xl"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2.5 bg-red-500 text-white rounded-full shadow-lg active:scale-95 transition-transform opacity-0 group-hover:opacity-100"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label className="block w-full h-56 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <Image size={48} className="mb-3 text-gray-400" />
                  <p className="text-base font-semibold">Chọn ảnh đại diện</p>
                  <p className="text-sm mt-1.5">PNG, JPG, GIF tối đa 5MB</p>
                </div>
              </label>
            )}
          </div>

          {/* Category & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full p-4 border-2 ${errors.category ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white cursor-pointer`}
              >
                <option value="">Chọn danh mục</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.category && (
                <div className="flex items-center gap-1.5 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.category}</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tác giả <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                className={`w-full p-4 border-2 ${errors.author ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white cursor-pointer`}
              >
                <option value="">Chọn tác giả</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
              {errors.author && (
                <div className="flex items-center gap-1.5 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.author}</span>
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mô tả ngắn <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              placeholder="Viết một đoạn tóm tắt ngắn gọn, hấp dẫn về nội dung bài viết..."
              rows={3}
              maxLength={200}
              className={`w-full p-4 border-2 ${errors.excerpt ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none`}
            />
            <div className="flex items-center justify-between mt-2">
              {errors.excerpt && (
                <div className="flex items-center gap-1.5 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.excerpt}</span>
                </div>
              )}
              <span className={`text-sm ml-auto ${formData.excerpt.length > 180 ? 'text-orange-600 font-semibold' : 'text-gray-500'}`}>
                {formData.excerpt.length}/200
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nội dung bài viết <span className="text-red-500">*</span>
            </label>
            
            {/* Simple toolbar */}
            <div className="flex items-center gap-1 mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="Bold">
                <Bold size={18} />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="Italic">
                <Italic size={18} />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="List">
                <List size={18} />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <span className="text-xs text-gray-500 ml-auto font-medium">
                {formData.content.length} ký tự
              </span>
            </div>

            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Bắt đầu viết nội dung bài viết của bạn tại đây..."
              rows={14}
              className={`w-full p-4 border-2 ${errors.content ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none leading-relaxed`}
            />
            {errors.content && (
              <div className="flex items-center gap-1.5 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{errors.content}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Thẻ (Tags)
            </label>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Nhập thẻ và nhấn Enter"
                className="flex-1 p-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <button
                onClick={addTag}
                className="p-3.5 bg-blue-600 text-white rounded-xl active:scale-95 transition-transform shadow-lg shadow-blue-600/30"
              >
                <Plus size={20} />
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    <Tag size={14} />
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:bg-blue-100 rounded-full p-0.5 transition-colors active:scale-95"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Advanced Settings */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors active:bg-gray-100"
            >
              <span className="text-sm font-semibold text-gray-700">⚙️ Cài đặt nâng cao</span>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              />
            </button>

            {showAdvanced && (
              <div className="p-5 pt-0 space-y-5 border-t border-gray-100">
                {/* Publish Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📅 Ngày xuất bản
                    </label>
                    <input
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => handleChange('publishDate', e.target.value)}
                      className="w-full p-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🕐 Giờ xuất bản
                    </label>
                    <input
                      type="time"
                      value={formData.publishTime}
                      onChange={(e) => handleChange('publishTime', e.target.value)}
                      className="w-full p-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    👁️ Hiển thị
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleChange('visibility', 'public')}
                      className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all active:scale-98 ${
                        formData.visibility === 'public'
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      <Globe size={18} />
                      <span className="font-semibold">Công khai</span>
                    </button>
                    <button
                      onClick={() => handleChange('visibility', 'private')}
                      className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all active:scale-98 ${
                        formData.visibility === 'private'
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      <Lock size={18} />
                      <span className="font-semibold">Riêng tư</span>
                    </button>
                  </div>
                </div>

                {/* SEO */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    🚀 Tối ưu SEO
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Tiêu đề SEO (60 ký tự)
                      </label>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => handleChange('seoTitle', e.target.value)}
                        placeholder={formData.title || "Tiêu đề tối ưu cho công cụ tìm kiếm"}
                        maxLength={60}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      />
                      <span className="text-xs text-gray-500 mt-1 block">{formData.seoTitle.length}/60</span>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Mô tả SEO (160 ký tự)
                      </label>
                      <textarea
                        value={formData.seoDescription}
                        onChange={(e) => handleChange('seoDescription', e.target.value)}
                        placeholder={formData.excerpt || "Mô tả ngắn gọn cho kết quả tìm kiếm"}
                        rows={2}
                        maxLength={160}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                      />
                      <span className="text-xs text-gray-500 mt-1 block">{formData.seoDescription.length}/160</span>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Từ khóa SEO (phân cách bằng dấu phẩy)
                      </label>
                      <input
                        type="text"
                        value={formData.seoKeywords}
                        onChange={(e) => handleChange('seoKeywords', e.target.value)}
                        placeholder="tình nguyện, cộng đồng, hoạt động xã hội"
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-40">
        <div className="max-w-4xl mx-auto flex gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold active:scale-98 transition-transform flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <Save size={20} />
            Lưu nháp
          </button>
          <button
            onClick={handlePublish}
            className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold active:scale-98 transition-transform shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Xuất bản
          </button>
        </div>
      </div>
    </div>
  );
}