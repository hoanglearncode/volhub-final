// EventDetailPage.jsx
import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Phone,
  Mail,
  Star,
  Share2,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  MessageSquare,
  Download,
  Tag,
  Shield,
  TrendingUp,
  UserCheck,
  Clock3,
  BarChart3,
  Flag,
  Ban,
  Bell,
  QrCode,
  Search,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from 'recharts';
import { Link } from 'react-router-dom';

/**
 * BenefitsCard: hiển thị quyền lợi + extras
 */
function BenefitsCard({ eventData = {} }) {
  const benefitsObj = eventData.benefits || {};

  const benefitLabels = {
    meals: { label: 'Bữa ăn', desc: 'Các buổi ăn chính trong sự kiện' },
    transportation: { label: 'Đi lại', desc: 'Hỗ trợ chi phí đi lại theo quy định' },
    insurance: { label: 'Bảo hiểm', desc: 'Bảo hiểm tai nạn sự kiện' },
    certificate: { label: 'Chứng nhận', desc: 'Cấp chứng nhận tham gia' },
    uniform: { label: 'Trang phục', desc: 'Trang phục/đồng phục nếu có' },
    training: { label: 'Đào tạo', desc: 'Chương trình đào tạo/huấn luyện' },
    allowance: { label: 'Phụ cấp', desc: 'Phụ cấp (nếu có)' },
  };

  const activeBenefits = Object.entries(benefitsObj).filter(([_, v]) => v === true).map(([k]) => k);

  const extras = [
    {
      key: 'supportFee',
      Icon: DollarSign,
      title: 'Phí hỗ trợ',
      text: 'Cộng tác viên: 500.000 ₫/ngày',
      highlight: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(500000),
    },
    {
      key: 'mealsDetail',
      Icon: Tag,
      title: 'Các buổi ăn chính',
      text: 'Cung cấp các buổi ăn chính trong suốt thời gian sự kiện.',
    },
    {
      key: 'accommodation',
      Icon: Shield,
      title: 'Chi phí ăn ở',
      text: 'Toàn bộ chi phí ăn ở được hỗ trợ nếu bạn cần ở lại khu vực tổ chức.',
    },
    {
      key: 'experience',
      Icon: UserCheck,
      title: 'Cập nhật kinh nghiệm',
      text: 'Cơ hội nâng cao và cập nhật kinh nghiệm trong lĩnh vực Tổ chức sự kiện.',
    },
    {
      key: 'networking',
      Icon: Users,
      title: 'Mở rộng mối quan hệ',
      text: 'Kết nối mở rộng các mối quan hệ nghề nghiệp và hợp tác.',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Quyền lợi</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {activeBenefits.length === 0 ? (
          <div className="col-span-2 text-sm text-gray-500">Không có quyền lợi cụ thể được liệt kê.</div>
        ) : (
          activeBenefits.map((key) => {
            const info = benefitLabels[key] || { label: key };
            return (
              <div
                key={key}
                className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg"
                title={info.desc || ''}
                role="listitem"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-800">{info.label}</div>
                  {info.desc && <div className="text-xs text-gray-500">{info.desc}</div>}
                </div>
              </div>
            );
          })
        )}
      </div>

      <hr className="border-t border-gray-100 my-4" />

      <div className="space-y-5">
        {extras.map((ex) => {
          return (
            <div key={ex.key} className="flex items-start space-x-3">
              <div className="w-full flex flex-col items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="flex items-baseline space-x-2">
                  <h4 className="text-sm font-semibold text-gray-800">{ex.title}</h4>
                  {ex.highlight && <span className="text-xs text-green-600 font-medium">{ex.highlight}</span>}
                </div>
                <p className="text-sm text-gray-600">{ex.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Main EventDetailPage
 */
export default function EventDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [eventStatus, setEventStatus] = useState('active');

  // MOCK DATA (giữ nguyên từ yêu cầu)
  const eventData = {
    id: 'EVT-2024-001',
    title: 'Lễ hội Festival Áo Dài Bản Sắc Việt Nam 2025',
    description: `Lễ hội Festival Áo dài Bản Sắc Việt Nam 2025 tôn vinh vẻ đẹp truyền thống của áo dài Việt Nam, thúc đẩy phát triển du lịch, quảng bá hình ảnh đất nước Việt Nam, bạn bè trong nước và quốc tế, gắn kết cộng đồng qua các hoạt động. Chương trình biểu diễn và diễu hành được thực hiện với quy mô lớn do Công ty CP Tập đoàn thương mại Toàn Cầu HB, Công Ty Cổ Phần Vinhomes, cùng với Liên hiệp Phụ nữ tỉnh Hưng Yên phối hợp với Sở Du lịch, CLB liên kết trẻ đoàn Thanh niên Việt Nam và Hội phụ nữ Việt Toàn Cầu, Công ty CP thiết kế và xây dựng SABO HOME tổ chức nhằm lan toả tình yêu áo dài đến đông đảo người dân, bạn bè và du khách quốc tế.
Chúng mình hoan nghênh tất cả những bạn trẻ năng động và nhiệt tình với những kinh nghiệm trong công tác tổ chức các sự kiện trước đây, đặc biệt là những bạn mà chúng mình đã từng được làm việc cùng ở những sự kiện trước.
Chúng mình rất hy vọng đem đến những trải nghiệm đáng nhớ cho tất cả các khán giả tham gia sự kiện và Cộng tác viên!`,
    category: ['Văn hóa - Nghệ thuật'],
    eventType: 'volunteer',
    status: 'active',
    priority: 'high',
    startDate: '2024-12-15',
    endDate: '2024-12-15',
    startTime: '06:00',
    endTime: '11:00',
    location: 'Vinhomes Oceanpark 3, Hưng Yên',
    address: null,
    coordinates: { lat: 10.3364, lng: 107.0861 },
    organizer: {
      name: 'Green Earth Vietnam',
      type: 'verified_partner',
      logo: 'https://cdn-new.topcv.vn/unsafe/80x/https://static.topcv.vn/company_logos/cong-ty-tnhh-carbon-billiards-9295ac6b19af9e7bbd93ad045907a69b-6597af4fd3fe4.jpg',
      rating: 4.8,
      eventsOrganized: 45,
      trustScore: 95,
    },
    contactInfo: {
      coordinatorName: 'Nguyễn Thị Hương',
      phone: '0901234567',
      email: 'huong@greenearth.vn',
      alternateContact: '0907654321',
    },
    volunteersNeeded: null,
    volunteersRegistered: 32,
    volunteersConfirmed: 28,
    minAge: 16,
    maxAge: 60,
    genderRequirement: 'any',
    experienceLevel: 'beginner',
    skillsRequired: ['Thể lực tốt', 'Tinh thần trách nhiệm'],
    desSkill: [
      'Nhiệt tình, có trách nhiệm với công việc được giao.',
      'Tham gia đầy đủ những buổi họp - tập huấn (cụ thể sẽ được thông báo sau).',
      'Tham gia ít nhất 2 ngày liên tiếp trong thời gian diễn ra sự kiện.',
      'Tuân thủ mọi thông tin, yêu cầu của Ban Tổ Chức, trong mọi trường hợp quyết định của BTC sẽ là quyết định cuối cùng.',
    ],
    registrationDeadline: '2024-12-13',
    benefits: {
      meals: true,
      transportation: true,
      insurance: true,
      certificate: true,
      uniform: true,
      training: false,
      allowance: false,
      allowanceAmount: 0,
    },
    coverImage:
      'https://res.cloudinary.com/dcvrdyzo1/image/upload/v1758554226/p5h9gebipsivdmehftsd.jpg',
    additionalImages: [],
    autoApprove: false,
    requireBackground: false,
    isPublic: true,
    tags: ['môi trường', 'biển', 'tình nguyện', 'vũng tàu', 'làm sạch'],
    stats: {
      views: 1250,
      applications: 32,
      approved: 28,
      pending: 4,
      rejected: 0,
      completionRate: 92,
      avgRating: 4.6,
    },
    createdAt: '2024-11-20T10:30:00Z',
    updatedAt: '2024-12-01T15:45:00Z',
    createdBy: 'Green Earth Admin',
    isFinite: false,
  };

  const applications = [
    {
      id: 1,
      volunteer: {
        id: 1,
        name: 'Trần Văn Minh',
        avatar: '/api/placeholder/40/40',
        age: 24,
        experience: 'intermediate',
        skills: ['Thể lực tốt', 'Kinh nghiệm môi trường'],
        rating: 4.8,
        completedEvents: 15,
        verificationStatus: 'verified',
      },
      applicationDate: '2024-11-25T09:15:00Z',
      status: 'approved',
      message: 'Tôi rất quan tâm đến vấn đề môi trường và đã tham gia nhiều hoạt động tương tự.',
      adminNotes: 'TNV có kinh nghiệm, profile tốt',
    },
    {
      id: 2,
      volunteer: {
        id: 2,
        name: 'Lê Thị Hoa',
        avatar: '/api/placeholder/40/40',
        age: 28,
        experience: 'beginner',
        skills: ['Nhiệt huyết', 'Tinh thần trách nhiệm'],
        rating: 4.5,
        completedEvents: 3,
        verificationStatus: 'verified',
      },
      applicationDate: '2024-11-26T14:20:00Z',
      status: 'pending',
      message: 'Đây là lần đầu tôi tham gia hoạt động môi trường, mong được học hỏi.',
      adminNotes: '',
    },
  ];

  const applicationTrendData = [
    { date: '20/11', applications: 5, approvals: 4 },
    { date: '21/11', applications: 8, approvals: 7 },
    { date: '22/11', applications: 6, approvals: 5 },
    { date: '25/11', applications: 10, approvals: 9 },
    { date: '26/11', applications: 3, approvals: 3 },
  ];

  const skillsDistribution = [
    { skill: 'Thể lực tốt', count: 28 },
    { skill: 'Kinh nghiệm môi trường', count: 15 },
    { skill: 'Tinh thần trách nhiệm', count: 32 },
    { skill: 'Nhiệt huyết', count: 25 },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      draft: { label: 'Nháp' },
      pending: { label: 'Chờ duyệt' },
      active: { label: 'Đang hoạt động' },
      paused: { label: 'Tạm dừng' },
      completed: { label: 'Hoàn thành' },
      cancelled: { label: 'Đã hủy' },
    };
    return configs[status] || configs.draft;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      low: { label: 'Thấp' },
      normal: { label: 'Bình thường' },
      high: { label: 'Cao' },
      urgent: { label: 'Khẩn cấp' },
    };
    return configs[priority] || configs.normal;
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const formatTime = (timeString) => timeString;

  const handleStatusChange = (newStatus) => {
    setEventStatus(newStatus);
    console.log(`Updating event status to: ${newStatus}`);
  };

  const handleApplicationAction = (applicationId, action) => {
    console.log(`${action} application ${applicationId}`);
  };

  const statusConfig = getStatusConfig(eventData.status);
  const priorityConfig = getPriorityConfig(eventData.priority);

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: Eye },
    { id: 'applications', label: `Đăng ký (${eventData.stats.applications})`, icon: Users },
    { id: 'analytics', label: 'Thống kê', icon: BarChart3 },
    { id: 'settings', label: 'Cài đặt', icon: Edit },
  ];

  return (
    <div className="mt-1 mb-18 md:mb-0 min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl text-wrap font-bold text-gray-900 truncate">{eventData.title}</h1>
              <div className="flex flex-row flex-wrap md:items-center gap-4 text-xs sm:text-sm text-gray-600 mt-3">
                <span>ID: {eventData.id}</span>
                <span> Tạo: {formatDate(eventData.createdAt)}</span>
                <span> Bởi: {eventData.createdBy}</span>
                <span> Priority: {priorityConfig.label}</span>
                <span> Trạng thái: {statusConfig.label}</span>
              </div>
            </div>

            <div className="flex flex-row items-stretch gap-2">
              <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Share2 className="w-4 h-4 mr-2" />
                Chia sẻ
              </button>
              <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <QrCode className="w-4 h-4 mr-2" />
                Tạo QR sự kiện
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          {[
            { label: 'Lượt xem', value: eventData.stats.views, Icon: Eye, color: 'text-blue-500' },
            { label: 'Đăng ký', value: eventData.stats.applications, Icon: Users, color: 'text-green-500' },
            { label: 'Đã duyệt', value: eventData.stats.approved, Icon: CheckCircle, color: 'text-emerald-500' },
            { label: 'Chờ duyệt', value: eventData.stats.pending, Icon: Clock3, color: 'text-yellow-500' },
            { label: 'Tỷ lệ hoàn thành', value: `${eventData.stats.completionRate}%`, Icon: TrendingUp, color: 'text-purple-500' },
            { label: 'Đánh giá', value: eventData.stats.avgRating, Icon: Star, color: 'text-yellow-500' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{card.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{card.value.toString()}</p>
                </div>
                <card.Icon className={`w-8 h-8 ${card.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img src={eventData.coverImage} alt="Event cover" className="w-full h-56 sm:h-72 md:h-80 object-cover" />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Mô tả sự kiện</h3>
                <div className="prose max-w-none">
                  {eventData.description.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Yêu cầu tình nguyện viên</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="flex justify-between"><span className="text-gray-600">Số lượng cần tuyển:</span><span className="font-medium">{eventData.volunteersNeeded !== null ? `${eventData.volunteersNeeded} Người` : ''}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Độ tuổi:</span><span className="font-medium">{eventData.minAge !== null && eventData.maxAge !== null ? `${eventData.minAge} - ${eventData.maxAge} tuổi` : 'Không yêu cầu'}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Giới tính:</span><span className="font-medium">{eventData.genderRequirement === 'any' ? 'Không yêu cầu' : eventData.genderRequirement}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Kinh nghiệm:</span><span className="font-medium capitalize">{eventData.experienceLevel}</span></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-3">Yêu cầu thêm:</h4>
                  <p className="mb-2 text-sm font-semibold text-gray-500">BTC đang tìm kiếm những bạn có thể đáp ứng những tiêu chí sau:</p>
                  <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
                    {eventData.desSkill.map((skill, idx) => (
                      <li key={`${skill}-${idx}`}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <BenefitsCard eventData={eventData} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin sự kiện</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{formatDate(eventData.startDate)}</p>
                      <p className="text-sm text-gray-600">{formatTime(eventData.startTime)} - {formatTime(eventData.endTime)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{eventData.location}</p>
                      <p className="text-sm text-gray-600">{eventData.address || ''}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{eventData.volunteersRegistered || 0} người</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Tag className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h4 className="font-medium mb-2">Danh mục sự kiện:</h4>
                      <ul className="list-none ml-0 space-y-2">
                        {eventData.category.map((cat, idx) => (
                          <li key={`${cat}-${idx}`}>
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">{cat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin tổ chức</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <img src={eventData.organizer.logo} alt="Organizer logo" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-medium">{eventData.organizer.name}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{eventData.organizer.rating}</span>
                      </div>
                      {eventData.organizer.type === 'verified_partner' && <Shield className="w-4 h-4 text-blue-500" />}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Sự kiện đã tổ chức:</span><span className="font-medium">{eventData.organizer.eventsOrganized}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Điểm tin cậy:</span><span className="font-medium">{eventData.organizer.trustScore}%</span></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3"><Users className="w-4 h-4 text-gray-500" /><span>{eventData.contactInfo.coordinatorName}</span></div>
                  <div className="flex items-center space-x-3"><Phone className="w-4 h-4 text-gray-500" /><a href={`tel:${eventData.contactInfo.phone}`} className="text-blue-600 hover:underline">{eventData.contactInfo.phone}</a></div>
                  <div className="flex items-center space-x-3"><Mail className="w-4 h-4 text-gray-500" /><a href={`mailto:${eventData.contactInfo.email}`} className="text-blue-600 hover:underline">{eventData.contactInfo.email}</a></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {eventData.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Hành động nhanh</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"><CheckCircle className="w-4 h-4 mr-2" />Phê duyệt tất cả</button>
                  <button className="w-full flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"><MessageSquare className="w-4 h-4 mr-2" />Gửi thông báo</button>
                  <button className="w-full flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100"><Ban className="w-4 h-4 mr-2" />Tạm dừng</button>
                </div>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">Danh sách đăng ký ({applications.length})</h3>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Tìm kiếm tình nguyện viên..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-72 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ duyệt</option>
                  <option value="approved">Đã duyệt</option>
                  <option value="rejected">Đã từ chối</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {applications.map((application) => (
                <div key={application.id} className="p-4 md:p-6 hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    <img src={application.volunteer.avatar} alt="Volunteer avatar" className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <Link to={`/btc/volunteers/detail/${application.volunteer.id}`} className="font-semibold text-gray-900">{application.volunteer.name}</Link>
                          <span className="text-sm text-gray-500">({application.volunteer.age} tuổi)</span>
                          {application.volunteer.verificationStatus === 'verified' && <Shield className="w-4 h-4 text-blue-500" />}
                        </div>

                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          application.status === 'approved' ? 'bg-green-100 text-green-800' :
                          application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {application.status === 'approved' ? 'Đã duyệt' : application.status === 'pending' ? 'Chờ duyệt' : 'Đã từ chối'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm text-gray-600">
                        <div><span className="font-medium">Kinh nghiệm: </span><span className="capitalize">{application.volunteer.experience}</span></div>
                        <div><span className="font-medium">Đánh giá: </span><div className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-1" />{application.volunteer.rating}</div></div>
                        <div><span className="font-medium">Sự kiện đã tham gia: </span><span>{application.volunteer.completedEvents}</span></div>
                      </div>

                      <div className="mt-3">
                        <span className="font-medium text-sm text-gray-700">Kỹ năng: </span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {application.volunteer.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="font-medium text-sm text-gray-700">Lời nhắn: </span>
                        <p className="text-sm text-gray-600 mt-1">{application.message}</p>
                      </div>

                      {application.adminNotes && (
                        <div className="bg-gray-50 p-3 rounded-lg mt-3">
                          <span className="font-medium text-sm text-gray-700">Ghi chú Admin: </span>
                          <p className="text-sm text-gray-600 mt-1">{application.adminNotes}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4 text-sm">
                        <span className="text-xs text-gray-500">Đăng ký: {new Date(application.applicationDate).toLocaleDateString('vi-VN')}</span>

                        {application.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleApplicationAction(application.id, 'approve')} className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Duyệt</button>
                            <button onClick={() => handleApplicationAction(application.id, 'reject')} className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Từ chối</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><CheckCircle className="w-4 h-4 mr-2" />Duyệt tất cả</button>
                {eventData.isFinite && <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Download className="w-4 h-4 mr-2" />Xuất danh sách</button>}
              </div>
              <div className="text-sm text-gray-600">Hiển thị {applications.length} / {eventData.stats.applications} đăng ký</div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Xu hướng đăng ký</h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <LineChart data={applicationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} name="Đăng ký" />
                    <Line type="monotone" dataKey="approvals" stroke="#10b981" strokeWidth={2} name="Được duyệt" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Phân bố kỹ năng</h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={skillsDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="skill" angle={-35} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Trạng thái đăng ký</h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Đã duyệt', value: eventData.stats.approved, fill: '#10b981' },
                          { name: 'Chờ duyệt', value: eventData.stats.pending, fill: '#f59e0b' },
                          { name: 'Đã từ chối', value: eventData.stats.rejected, fill: '#ef4444' },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-gray-600">Conversion Rate</p><p className="text-2xl font-bold text-gray-900">{Math.round((eventData.stats.approved / eventData.stats.views) * 100)}%</p></div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-gray-600">Approval Rate</p><p className="text-2xl font-bold text-gray-900">{Math.round((eventData.stats.approved / eventData.stats.applications) * 100)}%</p></div>
                  <UserCheck className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-gray-600">Avg Response Time</p><p className="text-2xl font-bold text-gray-900">2.5h</p></div>
                  <Clock3 className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-gray-600">Quality Score</p><p className="text-2xl font-bold text-gray-900">8.7/10</p></div>
                  <Star className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Cài đặt sự kiện</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Trạng thái sự kiện</h4>
                <div className="flex flex-wrap gap-3">
                  {Object.entries({
                    active: 'Đang hoạt động',
                    paused: 'Tạm dừng',
                    completed: 'Hoàn thành',
                    cancelled: 'Hủy bỏ',
                  }).map(([status, label]) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`px-4 py-2 rounded-lg border ${
                        eventData.status === status ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Cài đặt đăng ký</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={eventData.autoApprove} onChange={() => {}} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Tự động phê duyệt đăng ký</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={eventData.requireBackground} onChange={() => {}} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Yêu cầu kiểm tra lý lịch</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={eventData.isPublic} onChange={() => {}} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Hiển thị công khai</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Thông báo</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"><MessageSquare className="w-5 h-5 mr-2" />Gửi thông báo cho ứng viên</button>
                  <button className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"><Bell className="w-5 h-5 mr-2" />Nhắc nhở deadline</button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-medium text-red-900 mb-3">Vùng nguy hiểm</h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700 mb-4">Các hành động này không thể hoàn tác. Vui lòng cân nhắc kỹ trước khi thực hiện.</p>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"><Trash2 className="w-4 h-4 inline mr-2" />Xóa sự kiện</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
