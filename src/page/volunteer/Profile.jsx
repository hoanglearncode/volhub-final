import React, { useState } from "react";
import { 
  User, 
  Edit3,
  Camera,
  Mail,
  Phone,
  MapPin,
  Award,
  Star,
  Trophy,
  Clock,
  Users,
  Heart,
  Shield,
  Globe,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Link,
  Settings,
  Eye,
  EyeOff,
  Check,
  X,
  Plus,
  Trash2,
  Save,
  Upload,
  Download,
  Share2,
  Flag,
  BookOpen,
  Briefcase,
  GraduationCap,
  Target,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar as CalendarIcon,
  MessageSquare,
  Bell,
  Lock,
  ChevronRight,
  ExternalLink,
  Copy,
  QrCode,
  UserCheck,
  Zap,
  CheckCircle,
  Leaf,
  TreePine,
  Sparkles
} from "lucide-react";

export default function VolunteerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showQRCode, setShowQRCode] = useState(false);

  const [data, setData] = useState({
    basicInfo : {
      name : "", 
      description: "",
      foundedYear: new Date(),
      totalFollow: '',
      ratting: 0.0,
      totalEvent: 0,
      avatarUrl: '',
      isVerify: '',
      slug: '',
      AreasOfInterest: [
        {
          id: '',
          name: '',
          slug: ''
        }
      ]
    },
    contactInfo : {
      mail: '',
      phone: '',
      address: '',
      socialLinks: [
        {
          id: '',
          type: '', // fb - youtube - vv,
          link: ''
        }
      ]
    },
    skill: [
      {
        id: '',
        name: '',
        description: '',
        tag: [
          {
            id: '',
            tagName: '',
          }
        ]
      }
    ],
    history: [
      {
        id: '',
        name: '',
        description: '',
        dateEnd: '',
        slug: '',
      }
    ],
    setting : {
      emailNotification: true,
      showProfile: true
    }
  });
  
  // User profile data
  const [userProfile, setUserProfile] = useState({
    // Basic Info
    name: "Nguyễn Thị Mai Linh",
    email: "mailinh.volunteer@gmail.com",
    phone: "0987654321",
    dateOfBirth: "1995-08-20",
    gender: "female",
    location: "Quận Ba Đình, Hà Nội",
    bio: "Tôi là một tình nguyện viên đam mê với hơn 4 năm kinh nghiệm trong các hoạt động bảo vệ môi trường và giáo dục cộng đồng. Tin tưởng rằng mỗi hành động nhỏ đều có thể tạo nên sự thay đổi tích cực cho xã hội và hành tinh của chúng ta.",
    avatar: null,
    coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=400&fit=crop",
    
    // Verification & Status
    isVerified: true,
    level: "Emerald",
    joinDate: "2020-06-12",
    lastActive: "Đang hoạt động",
    
    // Social Links
    socialLinks: {
      facebook: "https://facebook.com/mailinh.eco",
      linkedin: "https://linkedin.com/in/mai-linh-nguyen",
      instagram: "@mailinh_green",
      website: "https://ecovolunteer-mailinh.blog"
    },
    
    // Skills & Interests
    skills: [
      { name: "Giáo dục môi trường", level: 95, category: "environment" },
      { name: "Tổ chức cộng đồng", level: 90, category: "management" },
      { name: "Giao tiếp công chúng", level: 88, category: "soft" },
      { name: "Làm vườn sinh thái", level: 85, category: "environment" },
      { name: "Nhiếp ảnh thiên nhiên", level: 80, category: "creative" },
      { name: "Tiếng Anh", level: 75, category: "language" }
    ],
    
    interests: [
      "Bảo vệ môi trường", "Giáo dục xanh", "Nông nghiệp bền vững", "Chăm sóc động vật", 
      "Du lịch sinh thái", "Năng lượng tái tạo", "Zero Waste", "Vườn cộng đồng"
    ],
    
    // Professional Info
    education: [
      {
        school: "Đại học Tài nguyên và Môi trường Hà Nội",
        degree: "Cử nhân Khoa học Môi trường",
        year: "2017-2021",
        gpa: "3.8/4.0"
      },
      {
        school: "Trường THPT Chu Văn An",
        degree: "Tốt nghiệp THPT",
        year: "2014-2017",
        gpa: "9.2/10"
      }
    ],
    
    experience: [
      {
        title: "Trưởng nhóm Dự án Rừng Xanh",
        organization: "Tổ chức Môi trường Xanh Việt Nam",
        period: "2023 - Hiện tại",
        description: "Lãnh đạo đội ngũ 25 tình nguyện viên trồng và chăm sóc hơn 1000 cây xanh tại các khu vực đô thị"
      },
      {
        title: "Giảng viên tình nguyện về môi trường",
        organization: "Trung tâm Giáo dục Môi trường Cộng đồng",
        period: "2021 - 2023", 
        description: "Giảng dạy kiến thức môi trường cho hơn 500 học sinh tiểu học và trung học"
      }
    ],
    
    // Privacy Settings
    privacy: {
      showEmail: "friends",
      showPhone: "private",
      showLocation: "public",
      showStats: "public",
      showBadges: "public"
    }
  });

  // Statistics data
  const stats = {
    totalHours: 380,
    eventsJoined: 67,
    eventsOrganized: 15, 
    reputation: 4.9,
    badgesEarned: 22,
    friendsCount: 298,
    followersCount: 456,
    followingCount: 189,
    certificatesEarned: 18,
    treesPlanted: 1247,
    co2Reduced: 2.8 // tons
  };


  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: "event_completed",
      title: "Hoàn thành 'Chiến dịch Làm sạch Sông Hồng'",
      description: "Tham gia 8 giờ, thu gom 45kg rác thải, nhận đánh giá xuất sắc",
      timestamp: "3 ngày trước",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "badge_earned", 
      title: "Đạt huy hiệu 'Trái tim Xanh'",
      description: "Nhận 200 lượt cảm ơn từ cộng đồng môi trường",
      timestamp: "1 tuần trước",
      icon: Heart,
      color: "text-rose-500"
    },
    {
      id: 3,
      type: "event_organized",
      title: "Tổ chức thành công 'Ngày Trồng cây Cộng đồng'", 
      description: "150 tình nguyện viên tham gia, trồng được 300 cây xanh",
      timestamp: "2 tuần trước",
      icon: TreePine,
      color: "text-green-600"
    }
  ];

  // Profile tabs
  const profileTabs = [
    { id: "overview", label: "Tổng quan", icon: User },
    { id: "stats", label: "Thống kê", icon: BarChart3 },
    { id: "timeline", label: "Hoạt động", icon: Activity },
    { id: "settings", label: "Cài đặt", icon: Settings }
  ];

  // Get user level color
  const getUserLevelColor = (level) => {
    const colors = {
      Bronze: "from-amber-600 to-orange-600",
      Silver: "from-slate-400 to-slate-600", 
      Gold: "from-yellow-400 to-yellow-600",
      Emerald: "from-emerald-400 to-green-600",
      Diamond: "from-blue-400 to-cyan-600"
    };
    return colors[level] || "from-green-500 to-emerald-600";
  };
  

  // Handle profile update
  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save logic here
  };

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* About Section */}
      <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-lg shadow-green-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <User className="text-green-600" size={24} />
            Giới thiệu
          </h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200 border border-green-200"
            >
              <Edit3 size={16} />
              <span className="text-sm font-medium">Chỉnh sửa</span>
            </button>
          )}
        </div>
        
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={userProfile.bio}
              onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-all duration-200"
              rows={5}
              placeholder="Chia sẻ câu chuyện tình nguyện của bạn..."
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg shadow-green-200"
              >
                <Save size={16} />
                Lưu thay đổi
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border-2 border-green-200 text-green-700 rounded-xl hover:bg-green-50 transition-all duration-200 font-medium"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        ) : (
          <p className="text-slate-700 leading-relaxed text-lg">{userProfile.bio}</p>
        )}
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-lg shadow-green-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Target className="text-green-600" size={24} />
            Kỹ năng chuyên môn
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200 border border-green-200">
            <Plus size={16} />
            <span className="text-sm font-medium">Thêm kỹ năng</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProfile.skills.map((skill, index) => (
            <div key={index} className="space-y-3 p-4 bg-green-200 rounded-lg border border-gray-100">
              <div className="flex items-start justify-between gap-4 ">
                <div className="min-w-0">
                  <h4 className="text-base font-semibold truncate text-green-700">{skill.name}</h4>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{skill.description || 'Chưa có mô tả'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Interests Section */}
      <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-lg shadow-green-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Heart className="text-green-600" size={24} />
            Lĩnh vực quan tâm
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200 border border-green-200">
            <Edit3 size={16} />
            <span className="text-sm font-medium">Chỉnh sửa</span>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {userProfile.interests.map((interest, index) => (
            <span 
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium hover:from-green-200 hover:to-emerald-200 transition-all duration-200 cursor-pointer border border-green-200"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-lg shadow-green-50">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Mail className="text-green-600" size={24} />
          Thông tin liên hệ
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="text-blue-600" size={20} />
            </div>
            <div className="flex-1">
              <span className="text-slate-700 font-medium">{userProfile.email}</span>
              {userProfile.privacy.showEmail === "private" && (
                <EyeOff className="inline-block ml-2 text-slate-400" size={16} />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="p-2 bg-green-100 rounded-lg">
              <Phone className="text-green-600" size={20} />
            </div>
            <div className="flex-1">
              <span className="text-slate-700 font-medium">{userProfile.phone}</span>
              {userProfile.privacy.showPhone === "private" && (
                <EyeOff className="inline-block ml-2 text-slate-400" size={16} />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
            <div className="p-2 bg-red-100 rounded-lg">
              <MapPin className="text-red-600" size={20} />
            </div>
            <span className="text-slate-700 font-medium">{userProfile.location}</span>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CalendarIcon className="text-purple-600" size={20} />
            </div>
            <span className="text-slate-700 font-medium">Tham gia từ {new Date(userProfile.joinDate).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-6 border-t border-green-100">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Globe className="text-green-600" size={20} />
            Mạng xã hội
          </h4>
          <div className="flex items-center gap-4">
            {userProfile.socialLinks.facebook && (
              <a href={userProfile.socialLinks.facebook} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-blue-200" target="_blank" rel="noreferrer">
                <Facebook size={24} />
              </a>
            )}
            {userProfile.socialLinks.linkedin && (
              <a href={userProfile.socialLinks.linkedin} className="p-3 text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-blue-200" target="_blank" rel="noreferrer">
                <Linkedin size={24} />
              </a>
            )}
            {userProfile.socialLinks.instagram && (
              <a href={userProfile.socialLinks.instagram} className="p-3 text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-200 border border-pink-200" target="_blank" rel="noreferrer">
                <Instagram size={24} />
              </a>
            )}
            {userProfile.socialLinks.website && (
              <a href={userProfile.socialLinks.website} className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 border border-emerald-200" target="_blank" rel="noreferrer">
                <Globe size={24} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-green-100 text-center shadow-lg shadow-green-50">
          <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
            <Clock className="text-green-600" size={32} />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalHours}</div>
          <div className="text-sm font-medium text-slate-600">Giờ tình nguyện</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-green-100 text-center shadow-lg shadow-green-50">
          <div className="p-4 bg-emerald-100 rounded-full w-fit mx-auto mb-4">
            <CalendarIcon className="text-emerald-600" size={32} />
          </div>
          <div className="text-3xl font-bold text-emerald-600 mb-2">{stats.eventsJoined}</div>
          <div className="text-sm font-medium text-slate-600">Sự kiện tham gia</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-green-100 text-center shadow-lg shadow-green-50">
          <div className="p-4 bg-teal-100 rounded-full w-fit mx-auto mb-4">
            <Trophy className="text-teal-600" size={32} />
          </div>
          <div className="text-3xl font-bold text-teal-600 mb-2">{stats.eventsOrganized}</div>
          <div className="text-sm font-medium text-slate-600">Sự kiện tổ chức</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-green-100 text-center shadow-lg shadow-green-50">
          <div className="p-4 bg-yellow-100 rounded-full w-fit mx-auto mb-4">
            <Star className="text-yellow-600" size={32} />
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.reputation}</div>
          <div className="text-sm font-medium text-slate-600">Đánh giá trung bình</div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-2xl border border-green-100 p-8 shadow-lg shadow-green-50">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp className="text-green-600" size={24} />
          Tiến độ theo thời gian
        </h3>
        <div className="h-80 flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="text-center">
            <BarChart3 size={64} className="text-green-400 mx-auto mb-4" />
            <p className="text-slate-600 text-lg font-medium">Biểu đồ thống kê chi tiết</p>
            <p className="text-slate-500 text-sm mt-2">Dữ liệu sẽ được cập nhật theo thời gian thực</p>
          </div>
        </div>
      </div>
    </div>
  );


  const renderTimelineTab = () => (
    <div className="space-y-8">
      {/* Activity Timeline */}
      <div className="bg-white rounded-2xl border border-green-100 py-3 px-8 shadow-lg shadow-green-50">
        <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <Activity className="text-green-600" size={24} />
          Hoạt động gần đây
        </h3>
        <div className="space-y-8 relative">
          {/* Timeline line */}
          {recentActivities.slice(0,10).map((activity) => {
            return (
              <div key={activity.id} className="flex items-start gap-6 relative">
                <div className="flex-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-bold text-slate-800 text-lg mb-2">{activity.title}</h4>
                  <p className="text-slate-700 mb-3 leading-relaxed">{activity.description}</p>
                  <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">{activity.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-center mt-2 border-t border-gray-300 pt-3 border-gray-300">
          <button onClick={()=> {}} className="w-50 px-5 py-2 bg-blue-600 text-medium font-semibold  text-white rounded-lg border-1 border-gray-50">Tải thêm</button>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white rounded-2xl border border-green-100 p-8 shadow-lg shadow-green-50">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <CalendarIcon className="text-green-600" size={24} />
          Tóm tắt tháng này
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="text-2xl font-bold text-green-600 mb-2">32h</div>
            <div className="text-sm font-medium text-slate-600">Giờ tình nguyện</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <div className="text-2xl font-bold text-blue-600 mb-2">8</div>
            <div className="text-sm font-medium text-slate-600">Sự kiện tham gia</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <div className="text-2xl font-bold text-purple-600 mb-2">2</div>
            <div className="text-sm font-medium text-slate-600">Sự kiện tổ chức</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
            <div className="text-2xl font-bold text-yellow-600 mb-2">3</div>
            <div className="text-sm font-medium text-slate-600">Huy hiệu mới</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-8">
      {/* Account Settings */}
      <div className="bg-white rounded-2xl border border-green-100 p-8 shadow-lg shadow-green-50">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Settings className="text-green-600" size={24} />
          Cài đặt tài khoản
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <div>
              <div className="font-semibold text-slate-800">Thông báo email</div>
              <div className="text-sm text-slate-600">Nhận thông báo về sự kiện và hoạt động mới</div>
            </div>
            <input type="checkbox" className="w-5 h-5 text-green-600" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div>
              <div className="font-semibold text-slate-800">Thông báo đẩy</div>
              <div className="text-sm text-slate-600">Nhận thông báo đẩy trên thiết bị di động</div>
            </div>
            <input type="checkbox" className="w-5 h-5 text-green-600" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <div>
              <div className="font-semibold text-slate-800">Hiển thị trong tìm kiếm</div>
              <div className="text-sm text-slate-600">Cho phép người khác tìm thấy hồ sơ của bạn</div>
            </div>
            <input type="checkbox" className="w-5 h-5 text-green-600" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );

  // MAIN RENDER
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl border border-green-100 overflow-hidden mb-8 shadow-xl shadow-green-100">
          {/* Cover Image */}
          <div className="relative h-48 md:h-64">
            <img src={userProfile.coverImage} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <label className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 cursor-pointer">
              <Camera size={24} />
              <input type="file" accept="image/*" onChange={() => {}} className="hidden" />
            </label>

            {/* Avatar & basic info */}
            <div className="absolute left-8 bottom-[-40px] flex items-end gap-6">
              <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${getUserLevelColor(userProfile.level)} flex items-center justify-center text-white overflow-hidden border-4 border-white shadow-lg shadow-green-200`}>
                <img src={userProfile.avatar || "logo.svg"} alt={userProfile.name} className="w-full h-full object-cover rounded-full" />
              </div>

              <div className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg">{userProfile.name}</h2>
                  {userProfile.isVerified && 
                    <div className="bg-green-500 text-white rounded-full px-3 py-1 text-sm flex items-center gap-2 shadow-lg">
                      <UserCheck size={16} /> 
                      Verified
                    </div>
                  }
                </div>
                <div className="text-lg text-green-500 font-medium drop-shadow">
                  {userProfile.level} Level • {userProfile.lastActive}
                </div>
              </div>
            </div>

            {/* Cover action buttons */}
            <div className="absolute right-6 bottom-6 flex items-center gap-3">
              <button className="px-4 py-2 bg-white text-slate-800 rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg">
                <Share2 size={18} /> Chia sẻ hồ sơ
              </button>
            </div>
          </div>

          {/* Spacer */}
          <div className="h-24"></div>

          {/* Header content area */}
          <div className="px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-slate-700 text-lg leading-relaxed max-w-2xl">
                  {userProfile.bio.substring(0, 120)}...
                </p>
                <div className="flex items-center gap-4 mt-3 text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-green-600" size={18} />
                    <span className="font-medium">{userProfile.location}</span>
                  </div>
                  <span className="text-green-400">•</span>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="text-green-600" size={18} />
                    <span className="font-medium">Tham gia {new Date(userProfile.joinDate).getFullYear()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsEditing(prev => !prev)} 
                  className="px-5 py-3 border-2 border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2 hover:bg-green-50 transition-all duration-200 font-medium"
                >
                  <Edit3 size={18} /> {isEditing ? "Đang chỉnh sửa" : "Chỉnh sửa hồ sơ"}
                </button>
                <button className="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm flex items-center gap-2 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg shadow-green-200">
                  <MessageSquare size={18} /> Nhắn tin
                </button>
                <button className="px-5 py-3 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-xl text-sm flex items-center gap-2 hover:from-blue-600 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg shadow-blue-200">
                  <ExternalLink size={18} /> Xem công khai
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { label: "Giờ TN", value: stats.totalHours, color: "from-green-100 to-emerald-100" },
                { label: "Sự kiện", value: stats.eventsJoined, color: "from-blue-100 to-cyan-100" },
                { label: "Đánh giá", value: stats.reputation, color: "from-yellow-100 to-orange-100" },
                { label: "Theo dõi", value: stats.followersCount, color: "from-indigo-100 to-purple-100" },
                { label: "Chứng chỉ", value: stats.certificatesEarned, color: "from-emerald-100 to-teal-100" }
              ].map((stat, index) => (
                <div key={index} className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl text-center border border-white/50 shadow-sm hover:shadow-md transition-all duration-200`}>
                  <div className="text-sm text-slate-600 font-medium mb-1">{stat.label}</div>
                  <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-8 border-t border-green-100 pt-6">
              <div className="flex flex-wrap gap-2">
                {profileTabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)} 
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        activeTab === tab.id 
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-200" 
                          : "text-slate-700 hover:bg-green-50 border border-green-100"
                      }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "overview" && renderOverviewTab()}
          {activeTab === "stats" && renderStatsTab()}
          {activeTab === "timeline" && renderTimelineTab()}
          {activeTab === "settings" && renderSettingsTab()}
        </div>
      </div>
    </div>
  );
}