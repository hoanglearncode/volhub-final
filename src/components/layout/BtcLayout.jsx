import React, { useEffect, useRef, useState } from "react";
import { 
  Bell, 
  BellOff, 
  X, 
  Menu, 
  User, 
  Boxes, 
  Building, 
  History, 
  WandSparkles, 
  ShoppingCart, 
  ChartNoAxesCombined, 
  Megaphone, 
  BriefcaseBusiness, 
  ThumbsUp, 
  Headphones,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  Home,
  Settings,
  Mail,
  Users,
  Calendar,
  BarChart3,
  UserCheck,
  ClipboardList,
  Star,
  MessageCircle,
  Camera,
  FileText,
  HelpCircle,
  Shield,
  Badge,
  LogOut,
  Users2
} from "lucide-react";
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Notification = {
  getNotification: () => [
    {
      id: 1,
      title: "Có ứng viên mới ứng tuyển",
      body: "Nguyễn Văn A đã ứng tuyển vào sự kiện 'Dọn dẹp môi trường'",
      time: "2 phút trước",
      link: "/btc/volunteers",
      read: false
    },
    {
      id: 2,
      title: "Sự kiện sắp diễn ra",
      body: "Sự kiện 'Hỗ trợ trẻ em vùng cao' sẽ bắt đầu trong 2 ngày",
      time: "1 giờ trước",
      link: "/btc/events",
      read: true
    }
  ]
};

function BtcLayout() {
  const { user, logout, token } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notification, setNotification] = useState([]);
  const [navData, setNavData] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState({});

  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const mobileSidebarRef = useRef(null);
  const mobileToggleButtonRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  useEffect(() => {
    const data = Notification.getNotification();
    setNavData([
      { 
        to: "/btc", 
        title: "Bảng tin tổng quan", 
        Icon: Home, 
        badge: null 
      },
      { 
        to: "/btc/events", 
        title: "Sự kiện của tôi", 
        Icon: Calendar, 
        badge: null,
        submenu: [
          { to: "/btc/events", title: "Danh sách sự kiện", Icon: ClipboardList },
          { to: "/btc/events/recruitment-post", title: "Tạo sự kiện mới", Icon: Plus }
        ]
      },
      { 
        to: "/btc/volunteers", 
        title: "Ứng viên của tôi", 
        Icon: Users, 
        badge: null,
        submenu: [
          { to: "/btc/volunteers", title: "Tất cả ứng viên", Icon: Users },
          { to: "/btc/cv-manage", title: "Quản lý hồ sơ", Icon: User }
        ]
      },
      { 
        to: "/btc/analytics", 
        title: "Báo cáo & Thống kê", 
        Icon: BarChart3, 
        badge: null,
        submenu: [
          { to: "/btc/analytics", title: "Tổng quan", Icon: ChartNoAxesCombined },
          { to: "/btc/recruitment-report", title: "Báo cáo tuyển dụng", Icon: FileText },
          { to: "/btc/analytics/events", title: "Phân tích sự kiện", Icon: BarChart3 }
        ]
      },
      { 
        to: "/btc/profile", 
        title: "Hồ sơ tổ chức", 
        Icon: Building, 
        badge: null,
        submenu: [
          { to: "/btc/profile", title: "Thông tin cơ bản", Icon: Building },
          { to: "/btc/profile/verification", title: "Xác minh tổ chức", Icon: Shield },
          { to: "/btc/feedback", title: "Feedback & Đánh giá", Icon: Star }
        ]
      },
      { 
        to: "/btc/promotion/recap", 
        title: "Công cụ truyền thông", 
        Icon: Megaphone, 
        submenu: [
          { to: "/btc/promotion/recap", title: "Album Recap", Icon: Camera },
          { to: "/btc/blog", title: "Quản lý Blog", Icon: FileText }
        ]
      },
      { 
        to: "/btc/support", 
        title: "Hỗ trợ", 
        Icon: Headphones, 
        badge: 5,
        submenu: [
          { to: "/btc/support", title: "Trung tâm hỗ trợ", Icon: HelpCircle },
          { to: "/btc/chat", title: "Chat với TNV", Icon: MessageCircle }
        ]
      },
    ]);

    if (data.length > 0) {
      setNotification(data);
    }
  }, []);

  // load user profile when token available
  useEffect(()=> {
    let isMounted = true;
    const loaded =  async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/organizer/profile/me`,  {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (!isMounted) return;
        if(res.data?.code === 0) {
          setUserData(res.data?.result);
        }
      } catch (error) {
        // safe logging for debug
        console.error('Load profile error:', error?.response || error?.message || error);
      }
    }
    loaded();
    return () => { isMounted = false; }
  }, [token]);

  const toggleSubmenu = (index) => {
    setExpandedMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Đóng menu khi click outside (sử dụng ref)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationMenuOpen(false);
      }
      if (mobileSidebarRef.current && !mobileSidebarRef.current.contains(event.target) && mobileToggleButtonRef.current && !mobileToggleButtonRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setUserMenuOpen(false);
        setNotificationMenuOpen(false);
        setMobileMenuOpen(false);
        setMobileSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [mobileMenuOpen]);

  const renderNavItem = (item, index, isMobile = false) => {
    const Icon = item.Icon;
    const isActive = location.pathname === item.to || 
      (item.submenu && item.submenu.some(sub => location.pathname === sub.to)) ||
      (item.to !== '/btc' && location.pathname.startsWith(item.to));
    
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = !!expandedMenus[index];

    return (
      <div key={item.to}>
        <div className="flex items-center">
          <Link
            to={item.to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative flex-1 ${
              isActive 
                ? 'bg-green-50 text-green-700 border-r-2 border-green-500' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => { if (isMobile) setMobileMenuOpen(false); }}
          >
            <div className="flex-shrink-0">
              {Icon && (
                <Icon 
                  size={18} 
                  className={isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'} 
                />
              )}
            </div>
            <span className={`text-sm font-medium truncate`}>
              {item.title}
            </span>
            {item.badge && item.badge > 0 && (
              <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2 py-0.5">{item.badge}</span>
            )}
          </Link>

          {/* Submenu toggle button */}
          {hasSubmenu && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu(index);
              }}
              className="p-2 hover:bg-gray-100 rounded transition-colors mr-2"
              aria-expanded={isExpanded}
              aria-controls={`submenu-${index}`}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>

        {/* Submenu */}
        {hasSubmenu && isExpanded && (
          <div id={`submenu-${index}`} className="ml-6 mt-1 space-y-1">
            {item.submenu.map((subItem) => {
              const SubIcon = subItem.Icon;
              const isSubActive = location.pathname === subItem.to;
              
              return (
                <Link
                  key={subItem.to}
                  to={subItem.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isSubActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => { if (isMobile) setMobileMenuOpen(false); }}
                >
                  <SubIcon 
                    size={16} 
                    className={isSubActive ? 'text-green-600' : 'text-gray-400'} 
                  />
                  <span>{subItem.title}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-800 text-white z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button 
              ref={mobileToggleButtonRef}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileMenuOpen(prev => !prev);
                } else {
                  setIsCollapsed(prev => !prev);
                }
              }}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={20} />
            </button>
            
            <Link to="/btc" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center font-bold text-sm">
                V
              </div>
              <span className="font-bold text-lg hidden sm:block">{import.meta.env.VITE_NAME}</span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search - Hidden on mobile */}
            <div className="hidden md:flex items-center bg-slate-700 rounded-lg px-3 py-2 min-w-[200px]">
              <Search size={16} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Tìm kiếm sự kiện, TNV..."
                className="bg-transparent text-white placeholder-slate-400 text-sm outline-none flex-1"
              />
            </div>

            {/* Mobile search button */}
            <div className="flex md:hidden items-center">
              {!mobileSearchOpen ? (
                <button onClick={() => { setMobileSearchOpen(true); setTimeout(()=> mobileSearchInputRef.current?.focus(), 50); }} className="p-2 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Search">
                  <Search size={18} />
                </button>
              ) : (
                <div className="flex items-center bg-slate-700 rounded-lg px-2 py-1 w-[60vw] max-w-sm">
                  <Search size={16} className="text-slate-400 mr-2" />
                  <input ref={mobileSearchInputRef} type="text" placeholder="Tìm kiếm" className="bg-transparent text-white placeholder-slate-400 text-sm outline-none flex-1" />
                  <button onClick={() => setMobileSearchOpen(false)} className="p-1 ml-2">
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Notification */}
            <div className="relative menu-container" ref={notificationRef}>
              <button 
                onClick={() => {
                  setNotificationMenuOpen(prev => !prev);
                  if (userMenuOpen) setUserMenuOpen(false);
                }}
                className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors"
                aria-haspopup="true"
                aria-expanded={notificationMenuOpen}
                aria-label="Notifications"
              >
                <Bell size={18} />
                {notification.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notification.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              <div className={`absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-200 transition-all origin-top-right ${
                notificationMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}>
                {notification.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <BellOff size={40} className="mb-3 text-gray-400" />
                    <p className="text-sm">Bạn không có thông báo nào mới</p>
                  </div>
                ) : (
                  <div className="flex flex-col max-h-96">
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-lg text-gray-800">Thông báo</p>
                      <button 
                        onClick={() => setNotificationMenuOpen(false)} 
                        className="w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white transition rounded-full flex items-center justify-center"
                        aria-label="Close notifications"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-80">
                      {notification.map((item, idx) => (
                        <Link
                          to={item.link}
                          key={idx}
                          className={`group flex flex-col gap-1 px-4 py-3 transition border-b last:border-0 ${
                            item.read ? "bg-white hover:bg-gray-50" : "bg-blue-50 hover:bg-blue-100"
                          }`}
                          onClick={() => setNotificationMenuOpen(false)}
                        >
                          <span className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">
                            {item.title}
                          </span>
                          <span className="text-sm text-gray-600">{item.body}</span>
                          <span className="text-xs text-gray-400">{item.time}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 py-2 text-gray-700 text-center hover:text-blue-600">
                      <Link to={'/btc/notification-system'} onClick={() => setNotificationMenuOpen(false)}>Xem tất cả</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cart */}
            <button onClick={() => navigate('/btc/my-cart')} className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Cart">
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* User Menu */}
            <div className="relative menu-container" ref={userMenuRef}>
              <button 
                onClick={() => {
                  setUserMenuOpen(prev => !prev);
                  if (notificationMenuOpen) setNotificationMenuOpen(false);
                }}
                className="flex items-center gap-2 hover:bg-slate-700 rounded-lg p-1 transition-colors"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
                aria-label="User menu"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User />
                </div>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>

              {/* User Dropdown */}
              <div className={`absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 transition-all origin-top-right ${
                userMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}>
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-800 text-sm truncate">{userData?.fullName}</p>
                  <p className="text-xs text-gray-500">{user?.scope}</p>
                  <div className="flex items-center gap-1">
                    {user?.status === "VERIFIED" && <Badge size={12} className="text-green-600" />}
                    <p className="text-xs text-green-600">{user?.status}</p>
                  </div>
                </div>
                <Link 
                  to="/btc/account" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User size={16} /> Cài đặt tài khoản
                </Link>
                <Link 
                  to="/btc/settings" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Settings size={16} /> Cài đặt tổ chức
                </Link>
                <Link 
                  to="/btc/post-box" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Mail size={16} /> Hộp thư
                </Link>
                <Link 
                  to="/btc/history" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <History size={16} /> Lịch sử hoạt động
                </Link>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} /> Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Desktop Sidebar */}
        <aside className={`fixed left-0 top-14 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 hidden lg:block ${
          isCollapsed ? 'w-16' : 'w-64'
        } overflow-hidden`}>
          <div className="flex flex-col h-full w-full">
            {/* User Profile Section */}
            <div className={`p-4 border-b border-gray-200 ${isCollapsed ? 'px-2' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">
                    {userData?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className={`${isCollapsed ? 'hidden' : 'flex flex-col'} min-w-0 flex-1`}>
                  <span className="font-semibold text-sm text-gray-800 truncate">{userData?.fullName}</span>
                  <span className="text-xs text-gray-500 truncate">{user?.scope}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-600">{user?.status}</span>
                    {user?.verified && <Badge size={12} className="text-green-600" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="space-y-1 px-2">
                {navData.map((item, index) => renderNavItem(item, index, false))}
              </div>
            </nav>

            {/* Bottom Actions */}
            <div className="border-t border-gray-200 p-2 space-y-2">
              <Link 
                to={'/btc/events/recruitment-post'} 
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium`}>Tạo sự kiện mới</span>
              </Link>
              
              {!isCollapsed && (
                <div className="text-center">
                  <p className="text-xs text-gray-500">Phiên bản: {import.meta.env.VITE_VERSION}</p>
                  <p className="text-xs text-gray-400">© {new Date().getFullYear()} {import.meta.env.VITE_NAME}</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-40 lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} aria-hidden={!mobileMenuOpen}>
          <div className="fixed inset-0 bg-gray-500/60" onClick={() => setMobileMenuOpen(false)} />
          <aside ref={mobileSidebarRef} className="fixed left-0 top-14 bottom-0 w-64 bg-white border-r border-gray-200 overflow-hidden">
            <div className="flex flex-col h-full">
              {/* User Profile Section */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">
                      {userData?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-semibold text-sm text-gray-800 truncate">{userData?.fullName}</span>
                    <span className="text-xs text-gray-500 truncate">{user?.role}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-600">{user?.status}</span>
                      {user?.verified && <Badge size={12} className="text-green-600" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 px-2">
                  {navData.map((item, index) => renderNavItem(item, index, true))}
                </div>
              </nav>

              <div className="border-t p-3">
                <Link to={'/btc/events/recruitment-post'} className="w-full block text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">Tạo sự kiện mới</Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}> 
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden">
        <div className="flex items-center justify-around py-2">
          <Link 
            to="/btc"
            className={`flex flex-col items-center gap-1 rounded-lg transition-colors min-w-0 ${
              location.pathname === '/btc' 
                ? 'text-green-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home size={20} />
            <span className="text-xs truncate">Trang chủ</span>
          </Link>
          
          <Link 
            to="/btc/events"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0 ${
              location.pathname.includes('/events') 
                ? 'text-green-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar size={20} />
            <span className="text-xs truncate">Sự kiện</span>
          </Link>
          
          <Link 
            to="/btc/volunteers"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0 relative ${
              location.pathname.includes('/volunteers') || location.pathname.includes('/cv-manage')
                ? 'text-green-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users size={20} />
            <span className="text-xs truncate">Ứng viên</span>
          </Link>
          
          <Link 
            to="/btc/analytics"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0 ${
              location.pathname.includes('/analytics') || location.pathname.includes('/recruitment-report')
                ? 'text-green-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 size={20} />
            <span className="text-xs truncate">Báo cáo</span>
          </Link>
          
          <Link 
            to="/btc/profile"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0 ${
              location.pathname.includes('/profile') || location.pathname.includes('/feedback')
                ? 'text-green-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Building size={20} />
            <span className="text-xs truncate">Hồ sơ</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default BtcLayout;
