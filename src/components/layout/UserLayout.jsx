// UserLayoutResponsive.jsx
import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  Bell, 
  ChevronDown, 
  User, 
  Home as HomeIcon,
  Calendar,
  Users,
  Trophy,
  Phone,
  Info,
  MessageSquare,
  Settings,
  Award,
  Activity,
  Star,
  Shield,
  LogOut,
  X,
  Menu,
  Heart,
  MapPin,
  Clock,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Telescope
} from "lucide-react";

import Footer from "../../components/common/Footer.jsx";
import FloatingActionButton from "../common/ChatBotWidget.jsx";
import MobileNav from "../common/MobileNav.jsx";
import axios from "axios";

const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';


function trapFocus(containerRef, active) {
  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll(focusableSelector));
    if (nodes.length) nodes[0].focus();

    const handleKey = (e) => {
      if (e.key !== "Tab") return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [containerRef, active]);
}

function TopNav() {
  const { logout, token } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  const [activeIndex, setActiveIndex] = useState(-1);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [user, setUser] = useState({
    scope: 'ROLE_VOLUNTEER',
    verified: true,
    userStats : {
      totalHours: 0,
      eventsCount: 0,
      reputation: 0,
      badgeCount: 0
    }
  })

  const userMenuRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const firstMobileLinkRef = useRef(null);

  // trap focus while open
  trapFocus(userMenuRef, userMenuOpen);
  trapFocus(mobilePanelRef, mobileOpen);

  // Navigation items (unchanged)
  const navItems = [
    { to: "/", label: "Trang chủ", icon: HomeIcon },
    { to: "/about", label: "Giới thiệu", icon: Info },
    { to: "/events", label: "Sự kiện", icon: Calendar },
    { to: "/community", label: "Cộng đồng", icon: Users },
    { to: "/services", label: "Dịch vụ", icon: Telescope },
  ];

  const userMenuItems = [
    { to: "/profile", label: "Hồ sơ cá nhân", icon: User },
    { to: "/my-events", label: "Sự kiện của tôi", icon: Calendar },
    { to: "/connect-inbox", label: "Hộp thư kết nối", icon: MessageSquare },
    { to: "/settings", label: "Cài đặt", icon: Settings },
  ];

  // effects: set active nav index on route change
  useEffect(() => {
    const idx = navItems.findIndex((it) => {
      if (it.to === "/") return pathname === "/";
      return pathname.startsWith(it.to);
    });
    setActiveIndex(idx);
    // close overlays on route change for mobile-friendly navigation
    setUserMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // shadow on scroll (preserve)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // clicks outside to close user menu
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [userMenuOpen]);

  // clicks outside to close mobile panel
  useEffect(() => {
    const handler = (e) => {
      if (mobilePanelRef.current && !mobilePanelRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [mobileOpen]);

  // Escape closes overlays
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // when mobile opens, disable body scroll and focus first link
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setTimeout(() => firstMobileLinkRef.current?.focus(), 80);
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!token) return; 

    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/volunteer/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if(res.data?.code === 0){ 
          setUser(res.data?.result);
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

  // helper classes
  const transitionBase = "transition-all duration-300";
  const itemClass = (idx) =>
    `relative px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${transitionBase} ${
      idx === activeIndex
        ? "text-blue-600 bg-blue-50 shadow-sm"
        : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/60"
    }`;

  
  return (
    <header
      className={`fixed px-4 py-2 md:px-6 md:py-3 lg:px-20 top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b ${transitionBase} ${scrolled ? "shadow-lg border-gray-200" : "border-transparent"}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left: Logo + Desktop nav */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="/" className="flex items-center gap-2 md:gap-3 group" aria-label="VHub - Trang chủ">
              <div className="relative">
                <img
                  src="/logo.svg"
                  alt="VHub"
                  className="h-10 w-10 md:h-12 md:w-12 rounded-xl object-cover shadow-md transition-transform group-hover:scale-105"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="block">
                <div className="font-bold text-lg md:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {import.meta.env.VITE_NAME || "VolHub"}
                </div>
                <div className="text-xs text-slate-500">
                  <i>Tuyển TNV các sự kiện</i>
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    to={item.to}
                    onClick={() => setActiveIndex(idx)}
                    className={itemClass(idx)}
                    aria-current={idx === activeIndex ? "page" : undefined}
                  >
                    <Icon size={16} aria-hidden />
                    <span className="truncate">{item.label}</span>
                    {idx === activeIndex && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              {token ? (
                <>
                  {/* Notifications */}
                  <Link
                    to="/notifications"
                    className="relative p-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    aria-label={`Thông báo (${notificationCount})`}
                    aria-live="polite"
                  >
                    <Bell size={18} aria-hidden />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[18px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium" role="status" aria-label={`${notificationCount} thông báo`}>
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </span>
                    )}
                  </Link>

                  {/* User dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 md:gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-150 group"
                      aria-haspopup="menu"
                      aria-expanded={userMenuOpen}
                      aria-label="Mở menu người dùng"
                    >
                      <div className={`relative w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white shadow-lg overflow-hidden`}>
                        {user?.basicInfo?.avatarUr? (
                          <img src={user?.basicInfo?.avatarUr} alt={`${user?.basicInfo?.name} avatar`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-bold text-sm">{user?.basicInfo?.name?.charAt(0) ?? "U"}</span>
                        )}
                      </div>
                      <div className="hidden xl:block text-left">
                        <div className="text-sm font-semibold text-slate-800">{user?.basicInfo?.name ?? "Người dùng"}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-1.5">
                          {user?.basicInfo?.isVerify && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">Đã xác minh</span>
                              )}
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`hidden md:block text-slate-500 transition-transform duration-150 ${userMenuOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>

                    {/* User Dropdown Menu */}
                    <div
                      className={`absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl from-amber-600 to-orange-600 border border-gray-200 py-3 transform origin-top-right ${userMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"} `}
                      role="menu"
                      aria-label="Menu người dùng"
                    >
                      {/* User info header */}
                      <div className="px-4 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white overflow-hidden`}>
                            {user?.basicInfo?.avatarUrl ? (
                              <img src={user?.basicInfo?.avatarUrl} alt={`${user?.basicInfo?.name} avatar`} className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-bold">{user?.name?.charAt(0) ?? "U"}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-800">{user?.basicInfo?.name ?? "Người dùng"}</div>
                            <div className="flex items-center gap-2 mt-1">
                              {user?.basicInfo?.isVerify && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">Đã xác minh</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Quick stats in dropdown */}
                        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-gray-100">
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{user?.basicInfo?.followers}</div>
                            <div className="text-xs text-slate-500">Người theoo dõi</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{user?.basicInfo?.followings}</div>
                            <div className="text-xs text-slate-500">Đang theo dõi</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{user?.basicInfo?.ratting}</div>
                            <div className="text-xs text-slate-500">Uy tín</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{user?.basicInfo?.totalEvent}</div>
                            <div className="text-xs text-slate-500">Sự kiện</div>
                          </div>
                        </div>
                      </div>  
                      <div className="py-2" role="none">
                        {userMenuItems.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link 
                              key={idx}
                              to={item.to} 
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              role="menuitem"
                            >
                              <Icon size={16} aria-hidden />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
 
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={() => logout?.()}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                          role="menuitem"
                        >
                          <LogOut size={16} aria-hidden />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Guest user actions */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <Link
                      to="/register"
                      className="px-3 py-2 md:px-4 md:py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50 border border-gray-300 rounded-xl"
                    >
                      Đăng ký
                    </Link>
                    <Link
                      to="/login"
                      className="px-3 py-2 md:px-4 md:py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg"
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-3 rounded-xl text-slate-700 hover:bg-gray-100 transition-colors"
                aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel - bottom sheet on small screens */}
      {mobileOpen && <MobileNav 
          mobileOpen={mobileOpen} 
          setMobileOpen={setMobileOpen} 
          navItems={navItems} 
          mobilePanelRef={mobilePanelRef} 
          user={user} 
          notificationCount={notificationCount} 
          activeIndex={activeIndex}
          userMenuItems ={userMenuItems}
          firstMobileLinkRef={firstMobileLinkRef}/>}
    </header>
  );
}

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNav />
      {/* main: ensure top padding matches header and allow content to stretch */}
      <main className="pt-14 md:pt-20 lg:pt-24 flex-1 min-h-0">
        {/* Outlet area should be flexible: children can use h-full / flex to fill viewport */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-0">
          <Outlet />
        </div>

        {/* Floating action button preserved; on mobile it's overlay and touch-friendly */}
        <FloatingActionButton />
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;
