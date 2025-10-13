import { Link } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function MobileNav ({mobileOpen,
    setMobileOpen,
    navItems, 
    mobilePanelRef, 
    user, 
    notificationCount, 
    userStats, 
    firstMobileLinkRef,
    activeIndex,
    userMenuItems }) {
    const { logout } = useAuth();
    return (
        <div
            className={`fixed w-full h-full inset-x-0 z-40 ${mobileOpen ? "visible" : "invisible"} transition-opacity duration-200 px-4`}
            aria-hidden={!mobileOpen}
        >
            {/* Overlay */}
            <div
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm ${mobileOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-200"}`}
            onClick={() => setMobileOpen(false)}
            aria-hidden
            />

            <div
            ref={mobilePanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng"
            // bottom-sheet style: small devices bottom:0, takes 60-80% height; on slightly larger screens behave like panel top
            style={{ paddingBottom: typeof window !== "undefined" ? `env(safe-area-inset-bottom)` : undefined }}
            className={`relative bg-white shadow-2xl border-t border-gray-200 w-full max-h-[85vh] overflow-y-auto transform ${mobileOpen ? "translate-y-0" : "translate-y-full"} transition-transform duration-300"} rounded-t-2xl`}
            >
            <div className="py-4 px-4 md:py-6 md:px-6">
                {/* User info */}
                {user !== null && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white overflow-hidden`}>
                        {user?.avatar ? (
                        <img src={user.avatar} alt={`${user.name} avatar`} className="w-full h-full object-cover" />
                        ) : (
                        <span className="font-bold">{user?.name?.charAt(0) ?? "U"}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold text-slate-800">{user?.name ?? "Người dùng"}</div>
                        <div className="text-sm text-slate-600 flex items-center gap-1">
                        {user?.verified && <span className="text-blue-500">• Đã xác minh</span>}
                        </div>
                    </div>
                    {notificationCount > 0 && (
                        <Link
                        to="/notifications"
                        onClick={() => setMobileOpen(false)}
                        className="relative p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-100 transition-all"
                        aria-label={`Thông báo (${notificationCount})`}
                        >
                        <Bell size={20} aria-hidden />
                        <span className="absolute -top-1 -right-1 min-w-[18px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                            {notificationCount > 9 ? '9+' : notificationCount}
                        </span>
                        </Link>
                    )}
                    </div>

                    {/* Mobile quick stats */}
                    <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                        <div className="text-lg font-bold text-slate-800">{userStats.totalHours}</div>
                        <div className="text-xs text-slate-500">Giờ</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-slate-800">{userStats.eventsCount}</div>
                        <div className="text-xs text-slate-500">Sự kiện</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-slate-800">{userStats.reputation}</div>
                        <div className="text-xs text-slate-500">Uy tín</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-slate-800">{userStats.badgeCount}</div>
                        <div className="text-xs text-slate-500">Huy hiệu</div>
                    </div>
                    </div>
                </div>
                )}

                {/* Navigation items */}
                <div className="space-y-2 mb-6">
                {navItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                    <Link
                        key={idx}
                        to={item.to}
                        ref={idx === 0 ? firstMobileLinkRef : undefined}
                        onClick={() => {
                        setActiveIndex(idx);
                        setMobileOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium ${idx === activeIndex ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"}`}
                        aria-current={idx === activeIndex ? "page" : undefined}
                    >
                        <Icon size={20} aria-hidden />
                        <span className="truncate">{item.label}</span>
                        {idx === activeIndex && <div className="ml-auto w-2 h-2 rounded-full bg-blue-500" />}
                    </Link>
                    );
                })}
                </div>

                {/* Additional menu items for authenticated users */}
                {user !== null && user.scope === 'ROLE_VOLUNTEER' && (
                <div className="border-t border-gray-200 pt-6 mb-6">
                    <div className="space-y-2">
                    {userMenuItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                        <Link 
                            key={idx}
                            to={item.to} 
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Icon size={20} aria-hidden />
                            {item.label}
                        </Link>
                        );
                    })}
                    </div>
                </div>
                )}

                {/* Auth actions */}
                <div className="border-t border-gray-200 pt-6">
                {user !== null ? (
                    <div className="space-y-3">
                    <button
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 w-full"
                    >
                        <LogOut size={20} aria-hidden />
                        Đăng xuất
                    </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                    <Link 
                        to="/register" 
                        onClick={() => setMobileOpen(false)}
                        className="block w-full text-center px-4 py-3.5 rounded-xl border border-gray-300 text-slate-600 font-medium hover:bg-blue-50 hover:text-blue-600"
                    >
                        Đăng ký tài khoản
                    </Link>
                    <Link 
                        to="/login" 
                        onClick={() => setMobileOpen(false)}
                        className="block w-full text-center px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg"
                    >
                        Đăng nhập
                    </Link>
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>
    )
}