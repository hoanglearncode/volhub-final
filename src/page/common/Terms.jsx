import React from 'react';
import { FileText, Clock, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="py-10 px-2 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <main className="mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Main Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Nội Dung Đang Được Cập Nhật
            </h2>
            
            <p className="text-lg text-slate-600 mb-6">
              Chúng tôi đang hoàn thiện các điều khoản và điều kiện sử dụng dịch vụ.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Thông báo quan trọng</h3>
                <p className="text-blue-800 leading-relaxed">
                  Trang điều khoản và điều kiện đang trong quá trình soạn thảo và xem xét. 
                  Vui lòng quay lại sau để xem nội dung đầy đủ. Nếu bạn có bất kỳ câu hỏi nào, 
                  xin vui lòng liên hệ với chúng tôi.
                </p>
              </div>
            </div>
          </div>
          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-600">
              Có câu hỏi? Liên hệ với chúng tôi qua email:{' '}
              <a href="mailto:tuyentnvcacsukien@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium underline">
                tuyentnvcacsukien@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}