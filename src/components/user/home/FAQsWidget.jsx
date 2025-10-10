import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const ChevronRightIconPlaceholder = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6l6 6-6 6" /></svg>;


const FAQsWidget = () => {
  const [mockFAQs, setFAQs] = useState([
    {
      question: "Làm thế nào để đăng ký tham gia tình nguyện?",
      answer:
        "Bạn chỉ cần tạo tài khoản trên VHub, hoàn thiện hồ sơ cá nhân và ứng tuyển vào các dự án phù hợp. Chúng tôi sẽ kết nối bạn với tổ chức tương ứng.",
    },
    {
      question: "Có cần kinh nghiệm trước khi tham gia không?",
      answer:
        "Không nhất thiết! Nhiều dự án chào đón tình nguyện viên mới. Chúng tôi có chương trình đào tạo cơ bản cho những người mới bắt đầu.",
    },
    {
      question: "Chi phí tham gia tình nguyện như thế nào?",
      answer: "Hầu hết các hoạt động tình nguyện đều miễn phí. Một số dự án còn hỗ trợ chi phí đi lại, ăn uống và chỗ ở cho tình nguyện viên.",
    },
  ]);
  const [openIndex, setOpenIndex] = useState(null);
  useEffect(() => {},[]);
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-3">Câu hỏi thường gặp</h3>
      <div className="space-y-3">
        {mockFAQs.map((faq, i) => (
          <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-3 text-left"
            >
              <span className="font-medium text-gray-700">{faq.question}</span>
              <span className="text-gray-500">{openIndex === i ? <X className="w-4 h-4" /> : <ChevronRightIconPlaceholder />}</span>
            </button>
            {openIndex === i && (
              <div className="p-3 border-t border-gray-100 text-sm text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsWidget;
