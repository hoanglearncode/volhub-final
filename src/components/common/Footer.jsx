import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  Award,
  Users,
  Calendar,
  Star,
  ArrowRight
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full translate-x-40 translate-y-40"></div>
      
      <div className="relative">
        {/* Main footer content */}
        <div className="md:px-20 mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8">
            {/* Company info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 group mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <img
                    className="relative h-12 w-12 rounded-xl object-cover shadow-lg ring-2 ring-blue-400/20 group-hover:ring-blue-400/40 transition-all duration-300"
                    src="logo.svg"
                    alt="Volunteer Logo"
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {import.meta.env.VITE_NAME}
                  </div>
                  <div className="text-sm text-slate-400">
                    Kết nối BTC & Tình nguyện viên
                  </div>
                </div>
              </Link>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Nền tảng kết nối hàng đầu Việt Nam giữa Ban Tổ Chức và cộng đồng tình nguyện viên. 
                Tạo cơ hội đóng góp, sẻ chia và lan tỏa giá trị nhân văn trong xã hội.
              </p>

              {/* Contact info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>volhub.hou@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span>+84 (024) 3333 9999</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                {[
                  { icon: Facebook, color: "text-blue-400", hoverColor: "hover:text-blue-300", to: "https://www.facebook.com/profile.php?id=61552728892066&mibextid=wwXIfr" },
                  { icon: Instagram, color: "text-pink-400", hoverColor: "hover:text-pink-300", to: null },
                  { icon: Twitter, color: "text-sky-400", hoverColor: "hover:text-sky-300", to: null},
                  { icon: Linkedin, color: "text-blue-500", hoverColor: "hover:text-blue-400", to: null },
                  { icon: Youtube, color: "text-red-400", hoverColor: "hover:text-red-300", to: null }
                ].map(({ icon: Icon, color, hoverColor, to }, index) => (
                  <a
                    key={index}
                    href={`${to !== null ? to : "#"}`}
                    className={`p-3 rounded-xl bg-slate-700/50 ${color} ${hoverColor} hover:bg-slate-600/50 transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* For Volunteers */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                Tình Nguyện Viên
              </h4>
              <ul className="space-y-3">
                {[
                  {value: "Tìm Hoạt Động", to: '/events'},
                  {value: "Đăng Ký Tham Gia", to: '/register'},
                  {value: "Quản Lý Hồ Sơ", to: '/profile'},
                  {value: "Chứng Chí Tình Nguyện", to: '/certifications'},
                  {value: "Blog & Kinh Nghiệm", to: '/community'},
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={`${item.to}`} 
                      className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Organizations */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Ban Tổ Chức
              </h4>
              <ul className="space-y-3">
                {[
                  {value: "Đăng Hoạt Động", to: '/btc/events/recruitment-post'},
                  {value: "Tìm Tình Nguyện Viên", to: '/btc/volunteers'},
                  {value: "Quản Lý Sự Kiện", to: '/btc/events'},
                  {value: "Thống Kê & Báo Cáo", to: '/btc/analytics'},
                  {value: "Gói Hỗ Trợ Premium", to: '/btc/services'},
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={`${item.to}`} 
                      className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-400" />
                Hỗ Trợ
              </h4>
              <ul className="space-y-3">
                {[
                  {value: "Trung Tâm Trợ Giúp", to: '/support'},
                  {value: "Hướng Dẫn Sử Dụng", to: '/user-manual'},
                  {value: "Câu Hỏi Thường Gặp", to: '/about?question=common'},
                  {value: "Điều Khoản Dịch Vụ", to: '/terms'},
                  {value: "Chính Sách Bảo Mật", to: '/privacy-policy'},
                  {value: "Liên Hệ & Hỗ Trợ", to: '/contact'},
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={`${item.to}`} 
                      className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
          <div className="md:px-20 mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-slate-300">
                  &copy; {new Date().getFullYear()} {import.meta.env.VITE_NAME}. Phát triển bởi{" "}
                  <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {import.meta.env.VITE_NAME}
                  </span>
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Tất cả quyền được bảo lưu. Sản phẩm của đội ngũ công nghệ trẻ Việt Nam.
                </p>
              </div>
              <div className="flex gap-6 text-sm">
                <a href="/privacy-policy" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Chính Sách Bảo Mật
                </a>
                <a href="/terms" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Điều Khoản Dịch Vụ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}