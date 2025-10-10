import { DollarSign, Tag, Shield, UserCheck, Users, CheckCircle  } from "lucide-react";

function BenefitsCard({ eventData = {} }) {
  const benefitsObj = eventData.benefits || {};

  const benefitLabels = {
    meals: { label: 'Bữa ăn', desc: 'Các buổi ăn chính trong sự kiện' },
    transportation: { label: 'Đi lại', desc: 'Hỗ trợ chi phí đi lại theo quy định' },
    insurance: { label: 'Bảo hiểm', desc: 'Bảo hiểm tai nạn sự kiện' },
    certificate: { label: 'Chứng nhận', desc: 'Cấp chứng nhận tham gia' },
    uniform: { label: 'Trang phục', desc: 'Trang phục/đồng phục nếu có' },
    training: { label: 'Đào tạo', desc: 'Chương trình đào tạo/huấn luyện' },
    allowance: { label: 'Phụ cấp', desc: 'Phụ cấp (nếu có)' },
  };

  const activeBenefits = Object.entries(benefitsObj).filter(([_, v]) => v === true).map(([k]) => k);

  const extras = [
    {
      key: 'supportFee',
      Icon: DollarSign,
      title: 'Phí hỗ trợ',
      text: 'Cộng tác viên: 500.000 ₫/ngày',
      highlight: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(500000),
    },
    {
      key: 'mealsDetail',
      Icon: Tag,
      title: 'Các buổi ăn chính',
      text: 'Cung cấp các buổi ăn chính trong suốt thời gian sự kiện.',
    },
    {
      key: 'accommodation',
      Icon: Shield,
      title: 'Chi phí ăn ở',
      text: 'Toàn bộ chi phí ăn ở được hỗ trợ nếu bạn cần ở lại khu vực tổ chức.',
    },
    {
      key: 'experience',
      Icon: UserCheck,
      title: 'Cập nhật kinh nghiệm',
      text: 'Cơ hội nâng cao và cập nhật kinh nghiệm trong lĩnh vực Tổ chức sự kiện.',
    },
    {
      key: 'networking',
      Icon: Users,
      title: 'Mở rộng mối quan hệ',
      text: 'Kết nối mở rộng các mối quan hệ nghề nghiệp và hợp tác.',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Quyền lợi</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {activeBenefits.length === 0 ? (
          <div className="col-span-2 text-sm text-gray-500">Không có quyền lợi cụ thể được liệt kê.</div>
        ) : (
          activeBenefits.map((key) => {
            const info = benefitLabels[key] || { label: key };
            return (
              <div
                key={key}
                className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg"
                title={info.desc || ''}
                role="listitem"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-800">{info.label}</div>
                  {info.desc && <div className="text-xs text-gray-500">{info.desc}</div>}
                </div>
              </div>
            );
          })
        )}
      </div>

      <hr className="border-t border-gray-100 my-4" />

      <div className="space-y-3">
        {extras.map((ex) => {
          const Icon = ex.Icon;
          return (
            <div key={ex.key} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-gray-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline space-x-2">
                  <h4 className="text-sm font-semibold text-gray-800">{ex.title}</h4>
                  {ex.highlight && <span className="text-xs text-green-600 font-medium">{ex.highlight}</span>}
                </div>
                <p className="text-sm text-gray-600">{ex.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BenefitsCard;