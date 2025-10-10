import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  User, Mail, Phone, MapPin, Calendar, Star, Award, Clock, 
  FileText, Edit3, Save, X, Check, AlertCircle, MessageSquare, 
  Video, Send, Download, Printer, Copy, Eye, EyeOff, Settings,
  Trash2, Archive, UserCheck, UserX, Users, Target, TrendingUp,
  Filter, Search, BookOpen, Heart, Zap, Shield
} from "lucide-react";

// Enhanced demo data with more fields
const demoVolunteers = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
    phone: "0901234567",
    role: "event_coordinator",
    status: "active",
    experience: "experienced",
    availability: "weekends",
    location: "Hanoi",
    skills: ["event_management", "communication", "leadership", "project_planning", "team_building"],
    joinDate: "2024-01-15",
    created_at: "2024-01-15T10:30:00Z",
    lastActive: "2024-09-08",
    completedTasks: 15,
    rating: 4.8,
    avatarColor: "from-green-400 to-blue-500",
    bio: "Mình có 3 năm kinh nghiệm điều phối sự kiện cộng đồng, ưu tiên làm việc theo nhóm, có khả năng dẫn dắt và đào tạo tình nguyện viên mới. Đặc biệt quan tâm đến các dự án giáo dục và môi trường.",
    age: 28,
    gender: "Nam",
    education: "Đại học",
    profession: "Marketing Manager",
    languages: ["Vietnamese", "English", "Japanese"],
    interests: ["Photography", "Hiking", "Community Service"],
    certifications: ["Event Management Certificate", "First Aid Certificate"],
    socialMedia: {
      facebook: "facebook.com/nguyenvanan",
      linkedin: "linkedin.com/in/nguyenvanan"
    },
    emergencyContact: {
      name: "Nguyễn Thị Lan",
      phone: "0987654321",
      relationship: "Vợ"
    },
    events: [
      { 
        id: "E001", 
        title: "Giáo dục môi trường Mù Cang Chải", 
        role: "Facilitator", 
        date: "2025-02-15", 
        impact: "200 học sinh",
        feedback: "Excellent leadership and organization skills",
        rating: 5
      },
      { 
        id: "E010", 
        title: "Trồng rừng Đà Lạt", 
        role: "Team Lead", 
        date: "2025-03-01", 
        impact: "1.000 cây",
        feedback: "Great coordination and team motivation",
        rating: 4.8
      }
    ],
    documents: [
      { type: "CV", filename: "cv_nguyen_van_an.pdf", uploadDate: "2024-01-15" },
      { type: "ID Copy", filename: "id_copy.pdf", uploadDate: "2024-01-15" },
      { type: "Certificate", filename: "event_cert.pdf", uploadDate: "2024-02-01" }
    ],
    performanceMetrics: {
      attendance: 95,
      punctuality: 98,
      teamwork: 92,
      leadership: 89,
      communication: 94
    }
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "tran.thi.binh@email.com",
    phone: "0912345678",
    role: "community_outreach",
    status: "active",
    experience: "intermediate",
    availability: "flexible",
    location: "Ho Chi Minh",
    skills: ["communication", "social_media", "outreach", "content_creation"],
    joinDate: "2024-02-20",
    created_at: "2024-02-20T14:15:00Z",
    lastActive: "2024-09-09",
    completedTasks: 12,
    rating: 4.6,
    avatarColor: "from-purple-400 to-pink-500",
    bio: "Đam mê hoạt động cộng đồng, có kinh nghiệm chạy chiến dịch gây quỹ nhỏ, am hiểu social media và tạo nội dung.",
    age: 25,
    gender: "Nữ",
    education: "Đại học",
    profession: "Content Creator",
    languages: ["Vietnamese", "English"],
    interests: ["Social Media", "Writing", "Photography"],
    certifications: ["Social Media Marketing Certificate"],
    socialMedia: {
      facebook: "facebook.com/tranbinh",
      instagram: "@tranbinh"
    },
    emergencyContact: {
      name: "Trần Văn Minh",
      phone: "0976543210",
      relationship: "Anh trai"
    },
    events: [
      { 
        id: "E005", 
        title: "Dạy tiếng Anh cho trẻ em", 
        role: "Volunteer", 
        date: "2025-02-20", 
        impact: "50 học sinh",
        feedback: "Very enthusiastic and creative",
        rating: 4.5
      }
    ],
    documents: [
      { type: "CV", filename: "cv_tran_thi_binh.pdf", uploadDate: "2024-02-20" },
      { type: "Portfolio", filename: "portfolio.pdf", uploadDate: "2024-02-25" }
    ],
    performanceMetrics: {
      attendance: 88,
      punctuality: 92,
      teamwork: 96,
      leadership: 78,
      communication: 91
    }
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "le.van.cuong@email.com",
    phone: "0923456789",
    role: "fundraising",
    status: "pending",
    experience: "beginner",
    availability: "weekdays",
    location: "Da Nang",
    skills: ["sales", "networking", "presentation"],
    joinDate: "2024-08-30",
    created_at: "2024-08-30T09:20:00Z",
    lastActive: "2024-09-05",
    completedTasks: 2,
    rating: 4.2,
    avatarColor: "from-yellow-400 to-orange-500",
    bio: "Mới gia nhập nhưng có kinh nghiệm bán hàng và networking cho các dự án nhỏ. Muốn học hỏi về gây quỹ và phát triển kỹ năng tổ chức sự kiện.",
    age: 30,
    gender: "Nam",
    education: "Cao đẳng",
    profession: "Sales Executive",
    languages: ["Vietnamese", "English"],
    interests: ["Networking", "Business", "Charity"],
    certifications: ["Sales Certificate"],
    socialMedia: {
      linkedin: "linkedin.com/in/levanstrong"
    },
    emergencyContact: {
      name: "Lê Thị Mai",
      phone: "0965432109",
      relationship: "Mẹ"
    },
    events: [],
    documents: [
      { type: "CV", filename: "cv_le_van_cuong.pdf", uploadDate: "2024-08-30" }
    ],
    performanceMetrics: {
      attendance: 75,
      punctuality: 85,
      teamwork: 82,
      leadership: 70,
      communication: 78
    }
  }
];

// Helper functions
const toTitle = (s) =>
  String(s || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

const formatDate = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", { year: "numeric", month: "short", day: "numeric" });
};

const formatDateTime = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString("vi-VN");
};

// Main Component
export default function VolunteerDetailPage() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const volunteerId = idParam ? Number(idParam) : null;

  // States
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [volunteer, setVolunteer] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  
  // Admin functions
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("volunteer_notes") || "{}");
    } catch {
      return {};
    }
  });
  const [adminNote, setAdminNote] = useState("");
  const [status, setStatus] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [showContactPanel, setShowContactPanel] = useState(true);
  const [notification, setNotification] = useState(null);
  
  // Communication states
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState("email");
  
  // Interview states
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewType, setInterviewType] = useState("video");
  const [interviewNotes, setInterviewNotes] = useState("");

  // Load volunteer data
  useEffect(() => {
    setLoading(true);
    setIsError(false);
    const t = setTimeout(() => {
      const found = volunteerId ? demoVolunteers.find((v) => v.id === volunteerId) : demoVolunteers[0];
      if (!found) {
        setIsError(true);
        setLoading(false);
        return;
      }
      setVolunteer(found);
      setEditData(found);
      setAdminNote(notes[found.id] || "");
      setStatus(found.status || "pending");
      setLoading(false);
    }, 800);

    return () => clearTimeout(t);
  }, [volunteerId, notes]);

  // Notification auto-hide
  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(t);
  }, [notification]);

  // Save functions
  const saveNote = (id, text) => {
    const copy = { ...notes };
    copy[id] = text;
    setNotes(copy);
    localStorage.setItem("volunteer_notes", JSON.stringify(copy));
    setAdminNote(text);
    setNotification({ type: "success", message: "Ghi chú đã được lưu" });
  };

  const saveEditData = async () => {
    setActionLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setVolunteer(editData);
    setEditMode(false);
    setActionLoading(false);
    setNotification({ type: "success", message: "Thông tin đã được cập nhật" });
  };

  // Actions
  const performAction = async (action) => {
    if (!volunteer) return;
    setActionLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    
    let newStatus = status;
    let message = "";
    
    switch(action) {
      case "shortlist":
        newStatus = "shortlisted";
        message = "Đã thêm vào danh sách ưu tiên";
        break;
      case "activate":
        newStatus = "active";
        message = "Đã kích hoạt tài khoản";
        break;
      case "reject":
        newStatus = "inactive";
        message = "Đã từ chối hồ sơ";
        break;
      case "archive":
        newStatus = "archived";
        message = "Đã lưu trữ hồ sơ";
        break;
    }
    
    setStatus(newStatus);
    setVolunteer(v => ({ ...v, status: newStatus }));
    setActionLoading(false);
    setNotification({ type: "success", message });
  };

  const sendMessage = async () => {
    if (!messageContent.trim()) return;
    setActionLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setShowMessageModal(false);
    setMessageContent("");
    setActionLoading(false);
    setNotification({ type: "success", message: `Đã gửi ${messageType === 'email' ? 'email' : 'tin nhắn'}` });
  };

  const scheduleInterview = async () => {
    if (!interviewDate) return;
    setActionLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setShowInterviewModal(false);
    setInterviewDate("");
    setInterviewNotes("");
    setActionLoading(false);
    setNotification({ type: "success", message: "Đã lên lịch phỏng vấn" });
  };

  // Export functions
  const exportData = (format) => {
    if (!volunteer) return;
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `volunteer_${volunteer.id}_${timestamp}`;
    
    if (format === "json") {
      const blob = new Blob([JSON.stringify(volunteer, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === "csv") {
      const keys = ["id", "name", "email", "phone", "role", "location", "experience", "rating", "completedTasks"];
      const values = keys.map(k => `"${String(volunteer[k] || "").replace(/"/g, '""')}"`);
      const csv = `${keys.join(",")}\n${values.join(",")}`;
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    setNotification({ type: "success", message: `Đã xuất file ${format.toUpperCase()}` });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-gray-700 font-medium">Đang tải hồ sơ tình nguyện viên...</div>
          <div className="text-gray-500 text-sm mt-2">Vui lòng đợi trong giây lát</div>
        </div>
      </div>
    );
  }

  if (isError || !volunteer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy hồ sơ</h2>
          <p className="text-gray-600 mb-4">ID không hợp lệ hoặc hồ sơ đã bị xóa</p>
          <button 
            onClick={() => window.history.back()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: User },
    { id: "details", label: "Chi tiết", icon: FileText },
    { id: "performance", label: "Hiệu suất", icon: TrendingUp },
    { id: "events", label: "Sự kiện", icon: Calendar },
    { id: "documents", label: "Tài liệu", icon: BookOpen },
    { id: "communication", label: "Liên lạc", icon: MessageSquare }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200", 
      shortlisted: "bg-blue-100 text-blue-800 border-blue-200",
      inactive: "bg-red-100 text-red-800 border-red-200",
      archived: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return colors[status] || colors.pending;
  };

  const StatusIcon = ({ status }) => {
    const icons = {
      active: <Check className="h-4 w-4" />,
      pending: <Clock className="h-4 w-4" />,
      shortlisted: <Star className="h-4 w-4" />,
      inactive: <X className="h-4 w-4" />,
      archived: <Archive className="h-4 w-4" />
    };
    return icons[status] || icons.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`relative h-16 w-16 rounded-xl bg-gradient-to-br ${volunteer.avatarColor} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                {volunteer.name?.charAt(0) || "U"}
                <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white ${status === 'active' ? 'bg-green-500' : status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{volunteer.name}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {toTitle(volunteer.role)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {volunteer.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Tham gia {formatDate(volunteer.joinDate)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 ${getStatusColor(status)}`}>
                <StatusIcon status={status} />
                {status?.toUpperCase()}
              </div>
              
              <div className="flex items-center gap-2 border-l pl-3">
                <button
                  onClick={() => setShowMessageModal(true)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title="Gửi tin nhắn"
                >
                  <Send className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowInterviewModal(true)}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                  title="Lên lịch phỏng vấn"
                >
                  <Video className="h-5 w-5" />
                </button>
                <button
                  onClick={() => exportData("json")}
                  className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  title="Xuất dữ liệu"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
          <div className={`p-4 rounded-lg shadow-lg border ${
            notification.type === "success" ? "bg-green-50 border-green-200 text-green-800" :
            notification.type === "error" ? "bg-red-50 border-red-200 text-red-800" :
            "bg-blue-50 border-blue-200 text-blue-800"
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === "success" && <Check className="h-5 w-5" />}
              {notification.type === "error" && <X className="h-5 w-5" />}
              {notification.type === "info" && <AlertCircle className="h-5 w-5" />}
              {notification.message}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê nhanh</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Đánh giá</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{volunteer.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Nhiệm vụ</span>
                  <span className="font-semibold text-green-600">{volunteer.completedTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Sự kiện</span>
                  <span className="font-semibold text-blue-600">{volunteer.events?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Hoạt động cuối</span>
                  <span className="text-sm text-gray-500">{formatDate(volunteer.lastActive)}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
              <div className="space-y-3">
                <button
                  onClick={() => performAction("shortlist")}
                  disabled={actionLoading}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                  <Star className="h-4 w-4" />
                  Ưu tiên
                </button>
                <button
                  onClick={() => performAction("activate")}
                  disabled={actionLoading}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                >
                  <UserCheck className="h-4 w-4" />
                  Kích hoạt
                </button>
                <button
                  onClick={() => performAction("reject")}
                  disabled={actionLoading}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  <UserX className="h-4 w-4" />
                  Từ chối
                </button>
                <button
                  onClick={() => performAction("archive")}
                  disabled={actionLoading}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <Archive className="h-4 w-4" />
                  Lưu trữ
                </button>
              </div>
            </div>

            {/* Admin Notes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ghi chú quản lý</h3>
              <textarea
                placeholder="Nhập ghi chú nội bộ..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                rows={4}
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => saveNote(volunteer.id, adminNote)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Lưu
                </button>
                <button
                  onClick={() => { setAdminNote(""); saveNote(volunteer.id, ""); }}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Info */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Thông tin cá nhân</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Họ tên</div>
                            <div className="font-medium text-gray-900">{volunteer.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Email</div>
                            <a href={`mailto:${volunteer.email}`} className="font-medium text-blue-600 hover:text-blue-700">
                              {volunteer.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Điện thoại</div>
                            <a href={`tel:${volunteer.phone}`} className="font-medium text-blue-600 hover:text-blue-700">
                              {volunteer.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Địa điểm</div>
                            <div className="font-medium text-gray-900">{volunteer.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Tuổi</div>
                            <div className="font-medium text-gray-900">{volunteer.age} tuổi</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Học vấn</div>
                            <div className="font-medium text-gray-900">{volunteer.education}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Professional Info */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Thông tin nghề nghiệp</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Vai trò mong muốn</div>
                            <div className="font-medium text-gray-900">{toTitle(volunteer.role)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Target className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Kinh nghiệm</div>
                            <div className="font-medium text-gray-900">{toTitle(volunteer.experience)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Thời gian rảnh</div>
                            <div className="font-medium text-gray-900">{toTitle(volunteer.availability)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Nghề nghiệp</div>
                            <div className="font-medium text-gray-900">{volunteer.profession}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Heart className="h-5 w-5 text-gray-400 mt-1" />
                          <div>
                            <div className="text-sm text-gray-500">Sở thích</div>
                            <div className="font-medium text-gray-900">
                              {volunteer.interests?.join(", ") || "Chưa có thông tin"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Giới thiệu bản thân</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-700 leading-relaxed">{volunteer.bio}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Kỹ năng</h3>
                    <div className="flex flex-wrap gap-2">
                      {volunteer.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {toTitle(skill)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Ngôn ngữ</h3>
                    <div className="flex flex-wrap gap-2">
                      {volunteer.languages?.map((lang) => (
                        <span
                          key={lang}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Thông tin chi tiết</h3>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      {editMode ? "Hủy" : "Chỉnh sửa"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Thông tin liên hệ</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        {editMode ? (
                          <input
                            type="email"
                            value={editData.email || ""}
                            onChange={(e) => setEditData({...editData, email: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="p-3 bg-gray-50 rounded-lg">{volunteer.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại</label>
                        {editMode ? (
                          <input
                            type="tel"
                            value={editData.phone || ""}
                            onChange={(e) => setEditData({...editData, phone: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="p-3 bg-gray-50 rounded-lg">{volunteer.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editData.location || ""}
                            onChange={(e) => setEditData({...editData, location: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="p-3 bg-gray-50 rounded-lg">{volunteer.location}</p>
                        )}
                      </div>

                      {/* Social Media */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mạng xã hội</label>
                        <div className="space-y-2">
                          {volunteer.socialMedia?.facebook && (
                            <a href={`https://${volunteer.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                              Facebook: {volunteer.socialMedia.facebook}
                            </a>
                          )}
                          {volunteer.socialMedia?.linkedin && (
                            <a href={`https://${volunteer.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                              LinkedIn: {volunteer.socialMedia.linkedin}
                            </a>
                          )}
                          {volunteer.socialMedia?.instagram && (
                            <a href={`https://instagram.com/${volunteer.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="block p-3 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100">
                              Instagram: {volunteer.socialMedia.instagram}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contact & Additional Info */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Thông tin khẩn cấp</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Người liên hệ khẩn cấp</label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium">{volunteer.emergencyContact?.name}</p>
                          <p className="text-gray-600">{volunteer.emergencyContact?.phone}</p>
                          <p className="text-sm text-gray-500">{volunteer.emergencyContact?.relationship}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chứng chỉ</label>
                        <div className="space-y-2">
                          {volunteer.certifications?.map((cert, index) => (
                            <div key={index} className="p-3 bg-green-50 text-green-800 rounded-lg">
                              {cert}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả bản thân</label>
                        {editMode ? (
                          <textarea
                            value={editData.bio || ""}
                            onChange={(e) => setEditData({...editData, bio: e.target.value})}
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            {volunteer.bio}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {editMode && (
                    <div className="flex gap-3 mt-8 pt-6 border-t">
                      <button
                        onClick={saveEditData}
                        disabled={actionLoading}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                        {actionLoading ? "Đang lưu..." : "Lưu thay đổi"}
                      </button>
                      <button
                        onClick={() => {setEditMode(false); setEditData(volunteer);}}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        Hủy
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "performance" && (
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Hiệu suất làm việc</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {Object.entries(volunteer.performanceMetrics || {}).map(([key, value]) => (
                      <div key={key} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">{toTitle(key)}</h4>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl font-bold text-gray-900">{value}%</div>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Performance Chart Placeholder */}
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Biểu đồ hiệu suất</h4>
                    <p className="text-gray-600">Biểu đồ chi tiết sẽ được hiển thị khi tích hợp với hệ thống thực tế</p>
                  </div>
                </div>
              )}

              {activeTab === "events" && (
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Lịch sử sự kiện ({volunteer.events?.length || 0})</h3>
                  
                  {!volunteer.events?.length ? (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Chưa có sự kiện nào</h4>
                      <p className="text-gray-600">Tình nguyện viên chưa tham gia sự kiện nào</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {volunteer.events.map((event) => (
                        <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                  {event.role}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(event.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Target className="h-4 w-4" />
                                  {event.impact}
                                </span>
                              </div>
                              {event.feedback && (
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <p className="text-green-800 text-sm">{event.feedback}</p>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1 ml-4">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-semibold text-gray-900">{event.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "documents" && (
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Tài liệu đính kèm</h3>
                  
                  {!volunteer.documents?.length ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Chưa có tài liệu nào</h4>
                      <p className="text-gray-600">Chưa có tài liệu nào được tải lên</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {volunteer.documents.map((doc, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                          <div className="flex items-center gap-3 mb-3">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <div>
                              <h4 className="font-medium text-gray-900">{doc.type}</h4>
                              <p className="text-sm text-gray-600">{doc.filename}</p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mb-3">
                            Tải lên: {formatDate(doc.uploadDate)}
                          </div>
                          <div className="flex gap-2">
                            <button className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100">
                              <Eye className="h-3 w-3" />
                              Xem
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-700 rounded text-sm hover:bg-gray-100">
                              <Download className="h-3 w-3" />
                              Tải
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "communication" && (
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Lịch sử liên lạc</h3>
                  
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Chưa có lịch sử liên lạc</h4>
                    <p className="text-gray-600 mb-4">Tất cả email, tin nhắn và cuộc gọi sẽ được ghi lại tại đây</p>
                    <div className="flex gap-3 justify-center">
                      <button 
                        onClick={() => setShowMessageModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4" />
                        Gửi tin nhắn
                      </button>
                      <button 
                        onClick={() => setShowInterviewModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Video className="h-4 w-4" />
                        Lên lịch họp
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Gửi tin nhắn</h3>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phương thức</label>
                <select
                  value={messageType}
                  onChange={(e) => setMessageType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="call">Gọi điện</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Nhập nội dung tin nhắn..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={sendMessage}
                  disabled={!messageContent.trim() || actionLoading}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? "Đang gửi..." : "Gửi"}
                </button>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Lên lịch phỏng vấn</h3>
                <button 
                  onClick={() => setShowInterviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày giờ</label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hình thức</label>
                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="video">Video call</option>
                  <option value="phone">Điện thoại</option>
                  <option value="in-person">Trực tiếp</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                <textarea
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  placeholder="Ghi chú về cuộc phỏng vấn..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={scheduleInterview}
                  disabled={!interviewDate || actionLoading}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? "Đang lên lịch..." : "Lên lịch"}
                </button>
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}