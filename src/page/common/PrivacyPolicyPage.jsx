import { Shield, AlertCircle, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-8 bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100">
      <main className="mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
              <Lock className="w-10 h-10 text-purple-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Nội Dung Đang Được Cập Nhật
            </h2>
            
            <p className="text-lg text-slate-600 mb-6">
              Chúng tôi đang hoàn thiện chính sách bảo mật thông tin của bạn.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Cam kết bảo mật</h3>
                <p className="text-purple-800 leading-relaxed">
                  Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. 
                  Chính sách bảo mật đang được soạn thảo chi tiết để đảm bảo tính minh bạch 
                  và tuân thủ các quy định về bảo vệ dữ liệu. Vui lòng quay lại sau để xem 
                  nội dung đầy đủ.
                </p>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-900">Bảo mật dữ liệu</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <Lock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-900">Mã hóa thông tin</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-900">Tuân thủ quy định</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-600">
              Có câu hỏi về quyền riêng tư? Liên hệ với chúng tôi qua email:{' '}
              <a href="mailto:tuyentnvcacsukien@gmail.com" className="text-purple-600 hover:text-purple-700 font-medium underline">
                tuyentnvcacsukien@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}