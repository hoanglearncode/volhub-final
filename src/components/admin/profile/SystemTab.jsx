import { Settings, Database, AlertTriangle, X } from "lucide-react";
const SystemTab = () => {
    return (
    <div className="space-y-6">
      {/* System Preferences */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings size={20} />
          Tùy chọn hệ thống
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Múi giờ</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>GMT+7 (Hồ Chí Minh)</option>
              <option>GMT+0 (UTC)</option>
              <option>GMT-5 (New York)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ giao diện</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Tiếng Việt</option>
              <option>English</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số mục hiển thị mỗi trang</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Database size={20} />
          Dữ liệu & Quyền riêng tư
        </h3>
        <div className="space-y-4">
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-yellow-600" />
              <p className="font-medium text-yellow-800">Xuất dữ liệu cá nhân</p>
            </div>
            <p className="text-sm text-yellow-700 mb-3">Tải xuống bản sao dữ liệu cá nhân của bạn</p>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm">
              Yêu cầu xuất dữ liệu
            </button>
          </div>
          
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <X size={18} className="text-red-600" />
              <p className="font-medium text-red-800">Xóa tài khoản</p>
            </div>
            <p className="text-sm text-red-700 mb-3">Xóa vĩnh viễn tài khoản và tất cả dữ liệu liên quan</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
              Yêu cầu xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemTab;