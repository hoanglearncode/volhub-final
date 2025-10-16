import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Link,
  useNavigate,
  useLocation,
  Outlet
} from "react-router-dom";
import {
  Bell,
  BellOff,
  X,
  Package,
  Menu,
  User,
  ChartColumn,
  Calendar,
  MessageSquare,
  BookText,
  ChartLine,
  Monitor,
  Database,
  CircleQuestionMark,
  User2,
  TriangleAlert,
  ChevronDown,
  History,
  Settings,
  Chromium,
  Users,
  Shield,
  AlertCircle,
  FileText,
  UserCheck,
  Clock,
  Star,
  TrendingUp,
  Activity,
  Building,
  CreditCard,
  BarChart3,
  PieChart,
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  Flag,
  Globe,
  Lock,
  Link2,
  Download,
  Upload,
  Tag,
  Award,
  Smartphone,
  Construction,
  AlertOctagon,
  RefreshCw
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import useIsMobile from "../../hook/system/useIsMobile.js";
import 'react-toastify/dist/ReactToastify.css';

function AdminLayout() {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [pendingQueue, setPendingQueue] = useState({
    events: 0,
    connections: 0,
    content: 0,
    admin: 0,
    user: 0,
    partners: 0,
    services: 0,
    reports: 0,
    systemAlerts: 0,
    backup: 0,
    support: 0,
    setting: 0
  });
  const [statusSystem, setStatusSystem] = useState(true);
  const [version, setVersion] = useState(import.meta.env.VITE_VERSION);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [navData, setNavData] = useState([]);

  // helper (hoisted style)
  function getNumber(number) {
    const n = Number(number) || 0;
    if (n > 100) return 99;
    return n;
  }

  // build navData based on pendingQueue
  useEffect(() => {
    const buildNav = () => [
      { 
        to: "/admin", 
        title: "Dashboard Tổng quan", 
        Icon: ChartColumn, 
        badge: getNumber(pendingQueue.admin) || null,
        submenu: [
          { to: "/admin/analytics/platform", title: "Phân tích nền tảng", Icon: TrendingUp },
          { to: "/admin/alerts", title: "Cảnh báo hệ thống", Icon: AlertTriangle }
        ]
      },
      { 
        to: "/admin/events", 
        title: "Quản lý sự kiện", 
        Icon: Calendar, 
        badge: getNumber(pendingQueue.events) || null,
        submenu: [
          { to: "/admin/events", title: "Danh sách sự kiện", Icon: Calendar },
          { to: "/admin/events/approval-queue", title: "Hàng đợi duyệt", Icon: Clock },
          { to: "/admin/events/quality-control", title: "Kiểm soát chất lượng", Icon: Shield },
          { to: "/admin/events/analytics", title: "Phân tích sự kiện", Icon: BarChart3 }
        ]
      },
      { 
        to: "/admin/volunteers", 
        title: "Quản lý TNV", 
        Icon: Users, 
        badge: getNumber(pendingQueue.user) || null,
        submenu: [
          { to: "/admin/volunteers", title: "Danh sách TNV", Icon: Users },
          { to: "/admin/volunteers/verification", title: "Xác minh hồ sơ", Icon: UserCheck },
          { to: "/admin/volunteers/violations", title: "Quản lý vi phạm", Icon: AlertCircle },
          { to: "/admin/volunteers/certifications", title: "Chứng nhận", Icon: Award }
        ]
      },
      { 
        to: "/admin/partners", 
        title: "Quản lý đối tác", 
        Icon: Building, 
        badge: getNumber(pendingQueue.partners) || null,
        submenu: [
          { to: "/admin/partners", title: "Danh sách đối tác", Icon: Building },
          { to: "/admin/partners/verification", title: "Xác minh đối tác", Icon: Shield },
          { to: "/admin/partners/tiers", title: "Quản lý tier", Icon: Star },
          { to: "/admin/partners/analytics", title: "Phân tích đối tác", Icon: PieChart }
        ]
      },
      { 
        to: "/admin/connections", 
        title: "Kết nối & Tin nhắn", 
        Icon: MessageSquare, 
        badge: getNumber(pendingQueue.connections) || null,
        submenu: [
          { to: "/admin/connections", title: "Hàng đợi kết nối", Icon: MessageSquare },
          { to: "/admin/connections/approval-queue", title: "Duyệt kết nối", Icon: CheckCircle },
          { to: "/admin/connections/proxy-chat", title: "Chat Proxy", Icon: MessageCircle },
          { to: "/admin/connections/abuse-reports", title: "Báo cáo lạm dụng", Icon: Flag }
        ]
      },
      { 
        to: "/admin/content", 
        title: "Kiểm duyệt nội dung", 
        Icon: BookText, 
        badge: getNumber(pendingQueue.content) || null,
        submenu: [
          { to: "/admin/content", title: "Hàng đợi kiểm duyệt", Icon: BookText },
          { to: "/admin/content/queue", title: "Nội dung chờ duyệt", Icon: Clock },
          { to: "/admin/content/spotlight", title: "Spotlight", Icon: Star },
          { to: "/admin/content/community-feed", title: "Feed cộng đồng", Icon: Globe }
        ]
      },
      { 
        to: "/admin/services", 
        title: "Quản lý dịch vụ", 
        Icon: Chromium, 
        badge: getNumber(pendingQueue.services) || null,
        submenu: [
          { to: "/admin/services", title: "Danh sách dịch vụ", Icon: Chromium },
          { to: "/admin/services/pricing", title: "Quản lý giá", Icon: CreditCard },
          { to: "/admin/services/subscriptions", title: "Gói đăng ký", Icon: Package }
        ]
      },
      { 
        to: "/admin/report", 
        title: "Báo cáo & Phân tích", 
        Icon: ChartLine, 
        badge: getNumber(pendingQueue.reports) || null,
        submenu: [
          { to: "/admin/report", title: "Báo cáo tổng quan", Icon: ChartLine },
          { to: "/admin/report/comparison", title: "So sánh kỳ", Icon: TrendingUp },
          { to: "/admin/report/connection-funnel", title: "Phễu kết nối", Icon: Activity },
          { to: "/admin/analytics/platform", title: "Analytics nền tảng", Icon: BarChart3 }
        ]
      },
      { 
        to: "/admin/system", 
        title: "Hệ thống & Giám sát", 
        Icon: Monitor, 
        badge: getNumber(pendingQueue.systemAlerts) || null,
        submenu: [
          { to: "/admin/system", title: "Giám sát hệ thống", Icon: Monitor },
          { to: "/admin/system/alerts", title: "Cảnh báo", Icon: AlertTriangle },
          { to: "/admin/system/audit-log", title: "Nhật ký hoạt động", Icon: FileText },
          { to: "/admin/system/roles", title: "Phân quyền", Icon: Lock },
          { to: "/admin/system/integrations", title: "Tích hợp", Icon: Link2 }
        ]
      },
      { 
        to: "/admin/backup", 
        title: "Backup & Export", 
        Icon: Database, 
        badge: getNumber(pendingQueue.backup) || null,
        submenu: [
          { to: "/admin/backup", title: "Quản lý Backup", Icon: Database },
          { to: "/admin/backup/export", title: "Xuất dữ liệu", Icon: Download },
          { to: "/admin/backup/import", title: "Nhập dữ liệu", Icon: Upload }
        ]
      },
      { 
        to: "/admin/support", 
        title: "Hỗ trợ & Khiếu nại", 
        Icon: CircleQuestionMark, 
        badge: getNumber(pendingQueue.support) || null,
        submenu: [
          { to: "/admin/support", title: "Trung tâm hỗ trợ", Icon: CircleQuestionMark },
          { to: "/admin/support/tickets", title: "Quản lý Ticket", Icon: Tag },
          { to: "/admin/support/complaints", title: "Xử lý khiếu nại", Icon: AlertCircle }
        ]
      },
      { 
        to: "/admin/settings", 
        title: "Cài đặt & Hồ sơ", 
        Icon: Settings, 
        badge: getNumber(pendingQueue.setting) || null,
        submenu: [
          { to: "/admin/profile", title: "Hồ sơ Admin", Icon: User2 },
          { to: "/admin/settings", title: "Cài đặt hệ thống", Icon: Settings },
          { to: "/admin/notifications/manage", title: "Quản lý thông báo", Icon: Bell }
        ]
      },
    ];
    setNavData(buildNav());
  }, [pendingQueue]);

  useEffect(() => {
    let mounted = true;
    const loaded = async () => {
      try {
        const data = await axios.get(`http://localhost:8080/admin/layout`);
        if (!mounted) return;
        if (data.data.success) {
          setPendingQueue(prev => ({ ...prev, ...data.data.pendingQueue }));
          setNotification(data.data.notification || []);
          setVersion(data.data.version || version);
          setStatusSystem(typeof data.data.systemStatus !== 'undefined' ? data.data.systemStatus : statusSystem);
        }
      } catch (error) { 
        toast.error(`Lỗi: ${error.message}`);
      }
    }
    loaded();
    return () => { mounted = false; };
  }, []);

  const pq = pendingQueue || {};

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="fixed top-0 inset-x-0 bg-slate-800 text-white z-50 shadow-lg">
        <div className="mx-auto w-full flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>

            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center font-bold text-sm">
                A
              </div>
              <span className="font-bold text-lg hidden sm:block">Admin Hub</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 ${statusSystem ? "bg-green-600" : "bg-red-600"} rounded-lg`}>
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Hệ thống ổn định</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span className="text-slate-300">Chờ duyệt:</span>
              <div className="flex gap-1">
                <span className="px-2 py-1 bg-blue-600 rounded text-white">{pq.events || 0}SK</span>
                <span className="px-2 py-1 bg-green-600 rounded text-white">{pq.connections || 0}KN</span>
                <span className="px-2 py-1 bg-yellow-600 rounded text-white">{pq.content || 0}ND</span>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setNotificationMenuOpen(!notificationMenuOpen);
                  if (userMenuOpen) setUserMenuOpen(false);
                }}
                className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Bell size={18} />
                {notification.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notification.length}
                  </span>
                )}
              </button>

              <div className={`absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 transition-all origin-top-right ${
                notificationMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}>
                {notification.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <BellOff size={40} className="mb-3 text-gray-400" />
                    <p className="text-sm">Không có thông báo mới</p>
                  </div>
                ) : (
                  <div className="flex flex-col max-h-96">
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-lg text-gray-800">Thông báo Admin</p>
                      <button
                        onClick={() => setNotificationMenuOpen(false)}
                        className="w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white transition rounded-full flex items-center justify-center"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-80">
                      {notification.map((item, idx) => (
                        <Link
                          to={item.link || "#"}
                          key={idx}
                          className={`group flex flex-col gap-1 px-4 py-3 transition border-b last:border-0 ${
                            item.read ? "bg-white hover:bg-gray-50" : "bg-red-50 hover:bg-red-100"
                          }`}
                          onClick={() => setNotificationMenuOpen(false)}
                        >
                          <span className="font-medium text-gray-900 group-hover:text-red-600">{item.title}</span>
                          <span className="text-sm text-gray-600">{item.body}</span>
                          <span className="text-xs text-gray-400">{item.time}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => navigate("/admin/system/alerts")} 
              className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors" 
              title="Cảnh báo hệ thống"
            >
              <TriangleAlert size={18} />
              {pq?.systemAlerts > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pq?.systemAlerts}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  if (notificationMenuOpen) setNotificationMenuOpen(false);
                }}
                className="flex items-center gap-2 hover:bg-slate-700 rounded-lg p-1 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    A
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs text-slate-300">{user?.scope === 'ROLE_ADMIN' ? "ADMIN" : "Không xác định"}</div>
                  <div className="text-sm font-medium">{user?.sub || "Admin"}</div>
                </div>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>

              <div className={`absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 transition-all origin-top-right ${
                userMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}>
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-800">{user?.sub}</p>
                  <p className="text-sm text-gray-500">{user?.scope === 'ROLE_ADMIN' ? "Super Administrator" : "Không xác định"}</p>
                </div>

                <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50" onClick={() => setUserMenuOpen(false)}>
                  <User2 size={16} /> Hồ sơ Admin
                </Link>

                <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50" onClick={() => setUserMenuOpen(false)}>
                  <Settings size={16} /> Cài đặt hệ thống
                </Link>

                <Link to="/admin/system/audit-log" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50" onClick={() => setUserMenuOpen(false)}>
                  <History size={16} /> Nhật ký hoạt động
                </Link>

                <Link to="/admin/system/alerts" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50" onClick={() => setUserMenuOpen(false)}>
                  <AlertTriangle size={16} /> Cảnh báo hệ thống
                </Link>

                <hr className="my-2" />

                <button
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Đăng xuất Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* {isMobile ? (
        <div className="block pt-16 min-h-screen">
          <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] px-6 text-center bg-gradient-to-br from-red-50 to-orange-50">
            <div className="mb-8 relative">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Smartphone className="text-white" size={40} />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <Construction className="text-white" size={16} />
              </div>
            </div>

            <div className="max-w-md space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-gray-800">Chức năng đang phát triển</h2>
                <p className="text-gray-600 leading-relaxed">Giao diện quản trị admin hiện tại chưa được tối ưu hóa cho thiết bị di động.
                Bạn có thể truy cập các chức năng quản trị trên thiết bị desktop để có trải nghiệm đầy đủ.</p>
              </div>

              <div className="flex gap-3 w-full justify-center">
                <Link to="/" className="px-4 py-2 bg-white rounded-lg shadow">Về trang chính</Link>
              </div>
            </div>
          </div>
        </div>        
      ) : ( */}
        <div className="flex pt-14">
          <aside className={`fixed left-0 top-14 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
            isCollapsed ? "w-16" : "w-64"
          } overflow-hidden`}>
            <div className="flex flex-col h-full w-full">
              <div className={`p-4 border-b border-gray-200 bg-red-50 ${isCollapsed ? 'px-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="text-white" size={18} />
                  </div>
                  <div className={`${isCollapsed ? 'hidden' : 'flex flex-col'} min-w-0 flex-1`}>
                    <span className="font-semibold text-sm text-red-800">Super Admin</span>
                    <span className="text-xs text-red-600">Full System Access</span>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-600">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 px-2">
                  {navData.map((item) => {
                    const Icon = item.Icon;
                    const isActive = location.pathname === item.to || 
                      (item.submenu && item.submenu.some(sub => location.pathname === sub.to)) ||
                      (item.to !== '/admin' && location.pathname.startsWith(item.to));

                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative ${
                          isActive 
                            ? "bg-red-50 text-red-700 border-r-2 border-red-500" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {Icon && (
                            <Icon 
                              size={18} 
                              className={isActive ? "text-red-600" : "text-gray-500 group-hover:text-gray-700"} 
                            />
                          )}
                        </div>

                        <span className={`${isCollapsed ? "hidden" : "block"} text-sm font-medium truncate`}>
                          {item.title}
                        </span>

                        {item.badge && item.badge > 0 && (
                          <span className={`${isCollapsed ? "hidden" : "inline-flex"} items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full ml-auto`}>
                            {item.badge}
                          </span>
                        )}

                        {isCollapsed && (
                          <div className="absolute left-full ml-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                            {item.title}
                            {item.badge && item.badge > 0 && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-500 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              <div className="border-t border-gray-200 p-4 space-y-2">
                {!isCollapsed && (
                  <div className="text-center space-y-2">
                    <div className="text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>Version:</span>
                        <span className="font-mono">{version}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      <p>© {new Date().getFullYear()} VolunteerHub Admin</p>
                      <p>All rights reserved</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}>
            <div className="p-3">
              <Outlet />
            </div>
          </main>
        </div>
      {/* )} */}




      <ToastContainer position="top-right" />
    </div>
  );
}

export default AdminLayout;
