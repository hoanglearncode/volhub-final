import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Users,
  Tag,
  Shield,
  Star,
  Share2,
  ArrowRightCircle
} from 'lucide-react';
import axios from 'axios';

import FAQsWidget from '../../components/user/home/FAQsWidget';
import UpcomingEventsWidget from '../../components/user/home/UpcomingEventsWidget';
import NewsUpdatesWidget from '../../components/user/home/NewsUpdatesWidget';
import BlogPostsWidget from '../../components/user/home/BlogPostsWidget';
import EventSummaryCard from '../../components/common/UserEventCard';
import BenefitsCard from '../../components/common/BenefitsCard';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

/* ---------------- SAMPLE EVENTS (nguyên bản) ---------------- */
const sampleFeaturedEvents = [
  {
    id: 1,
    title: "Aquafina Vietnam International Fashion Week 2025",
    slug: "aquafina-vietnam-international-fashion-week-2025",
    category: "Môi trường",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318555/z7109028936008_a65537e87f2bfcff7f1e3f77c600c9c1_z936mc.jpg",
    slotsLeft: 0,
    location: "Hà Nội",
    date: "2025-11-12T08:00:00",
    volunteers: 56,
  },
  {
    id: 2,
    title: "Hạnh phúc học sinh thủ đô - Hà Nội",
    slug: "ho-tro-hoc-bong-tre-em",
    category: "Giáo dục",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028928483_8ba16d5034671c86bab6cc6929c020cb_bouzqn.jpg",
    slotsLeft: 0,
    location: "Hà Nội",
    date: "2025-08-20T09:00:00",
    volunteers: 34,
  },
  {
    id: 3,
    title: "Khám sức khỏe cộng đồng miễn phí",
    slug: "kham-suc-khoe-cong-dong",
    category: "Y tế",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318555/z7109029100703_1ac168147245feb522a03566b7d07eae_pwuqe5.jpg",
    slotsLeft: 0,
    location: "Hà Nội",
    date: "2025-12-05T07:30:00",
    volunteers: 18,
  },
  {
    id: 4,
    title: "Trồng cây xanh ven đường",
    slug: "trong-cay-xanh-ven-duong",
    category: "Môi trường",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109079974801_9d0021971c329740695512d0123f969c_l9qatk.jpg",
    slotsLeft: 8,
    location: "Đường Nguyễn Trãi, Hà Nội",
    date: "2025-11-28T08:00:00",
    volunteers: 72,
  },
  {
    id: 5,
    title: "Hướng nghiệp cho sinh viên năm nhất",
    slug: "huong-nghiep-sinh-vien",
    category: "Giáo dục",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028918873_8df1c77d7acda23cb7e2aeda0f17dbfe_ejtfnr.jpg",
    slotsLeft: 30,
    location: "Hội trường A, Đại học X",
    date: "2025-11-15T13:30:00",
    volunteers: 45,
  },
  {
    id: 6,
    title: "Gian hàng 0 đồng cho người khó khăn",
    slug: "gian-hang-0-dong",
    category: "An sinh",
    image:
      "https://res.cloudinary.com/dqjrrgi4i/image/upload/v1761318554/z7109028913787_f1421e0eedc5c42b23441ff91b03c5e6_fha3jv.jpg",
    slotsLeft: 20,
    location: "Công viên trung tâm, Cần Thơ",
    date: "2025-12-02T09:00:00",
    volunteers: 29,
  },
];

const Data = {
  id: '953428d8-f74e-46d9-80db-5b4c6c34a3e7',
  title: 'Lễ hội Festival Áo Dài Bản Sắc Việt Nam 2025',
  description: `Lễ hội Festival Áo dài Bản Sắc Việt Nam 2025 tôn vinh vẻ đẹp truyền thống của áo dài Việt Nam, thúc đẩy phát triển du lịch, quảng bá hình ảnh đất nước Việt Nam, bạn bè trong nước và quốc tế, gắn kết cộng đồng qua các hoạt động. Chương trình biểu diễn và diễu hành được thực hiện với quy mô lớn do Công ty CP Tập đoàn thương mại Toàn Cầu HB, Công Ty Cổ Phần Vinhomes, cùng với Liên hiệp Phụ nữ tỉnh Hưng Yên phối hợp với Sở Du lịch, CLB liên kết trẻ đoàn Thanh niên Việt Nam và Hội phụ nữ Việt Toàn Cầu, Công ty CP thiết kế và xây dựng SABO HOME tổ chức nhằm lan toả tình yêu áo dài đến đông đảo người dân, bạn bè và du khách quốc tế.
Chúng mình hoan nghênh tất cả những bạn trẻ năng động và nhiệt tình với những kinh nghiệm trong công tác tổ chức các sự kiện trước đây, đặc biệt là những bạn mà chúng mình đã từng được làm việc cùng ở những sự kiện trước.
Chúng mình rất hy vọng đem đến những trải nghiệm đáng nhớ cho tất cả các khán giả tham gia sự kiện và Cộng tác viên!`,
  category: ['Văn hóa - Nghệ thuật'],
  eventType: 'volunteer',
  status: 'active',
  priority: 'high',
  startDate: '2024-12-15',
  endDate: '2024-12-15',
  startTime: '06:00',
  endTime: '11:00',
  deadline: '2024-12-13',
  location: 'Vinhomes Oceanpark 3, Hưng Yên',
  address: null,
  coordinates: { lat: 10.3364, lng: 107.0861 },
  organizer: {
    name: 'Green Earth Vietnam',
    type: 'verified_partner',
    logo: 'https://cdn-new.topcv.vn/unsafe/80x/https://static.topcv.vn/company_logos/cong-ty-tnhh-carbon-billiards-9295ac6b19af9e7bbd93ad045907a69b-6597af4fd3fe4.jpg',
    rating: 4.8,
    eventsOrganized: 45,
    trustScore: 95,
  },
  contactInfo: {
    coordinatorName: 'Nguyễn Thị Hương',
    phone: '0901234567',
    email: 'huong@greenearth.vn',
    alternateContact: '0907654321',
  },
  volunteersNeeded: null,
  volunteersRegistered: 32,
  volunteersConfirmed: 28,
  minAge: 16,
  maxAge: 60,
  genderRequirement: 'any',
  experienceLevel: 'beginner',
  skillsRequired: ['Thể lực tốt', 'Tinh thần trách nhiệm'],
  desSkill: [
    'Nhiệt tình, có trách nhiệm với công việc được giao.',
    'Tham gia đầy đủ những buổi họp - tập huấn (cụ thể sẽ được thông báo sau).',
    'Tham gia ít nhất 2 ngày liên tiếp trong thời gian diễn ra sự kiện.',
    'Tuân thủ mọi thông tin, yêu cầu của Ban Tổ Chức, trong mọi trường hợp quyết định của BTC sẽ là quyết định cuối cùng.',
  ],
  registrationDeadline: '2024-12-13',
  benefits: {
    meals: true,
    transportation: true,
    insurance: true,
    certificate: true,
    uniform: true,
    training: false,
    allowance: false,
    allowanceAmount: 0,
  },
  coverImage:
    'https://res.cloudinary.com/dcvrdyzo1/image/upload/v1758554226/p5h9gebipsivdmehftsd.jpg',
  additionalImages: [],
  autoApprove: false,
  requireBackground: false,
  isPublic: true,
  tags: ['môi trường', 'biển', 'tình nguyện', 'vũng tàu', 'làm sạch'],
  stats: {
    views: 1250,
    applications: 32,
    approved: 28,
    pending: 4,
    rejected: 0,
    completionRate: 92,
    avgRating: 4.6,
  },
  createdAt: '2024-11-20T10:30:00Z',
  updatedAt: '2024-12-01T15:45:00Z',
  createdBy: 'Green Earth Admin',
  isFinite: false,
};

/* ---------------- Helpers ---------------- */
const clone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Nếu slug khớp một mục sampleFeaturedEvents, trả về object
 * dựa trên Data nhưng merge một số trường từ mẫu để đảm bảo tính nhất quán.
 * Nếu không khớp, trả về Data (bản gốc).
 */
const getHashedDataForSlug = (slug) => {
  const sample = sampleFeaturedEvents.find((s) => s.slug === slug);
  if (!sample) {
    return clone(Data);
  }

  // clone Data và ghi đè các trường thích hợp từ sample
  const mapped = clone(Data);

  mapped.id = `${Data.id}-${sample.id}`; // giữ dạng "hash" nhưng có tham chiếu sample id
  mapped.title = sample.title ?? mapped.title;
  mapped.slug = sample.slug ?? sample.title?.toLowerCase().replace(/\s+/g, '-');
  // nếu sample có date (ISO), map thành startDate
  if (sample.date) {
    try {
      const d = new Date(sample.date);
      if (!Number.isNaN(d.getTime())) {
        // giữ cả dạng ISO (startDate) để UI hiển thị
        mapped.startDate = d.toISOString().split('T')[0];
        mapped.startTime = d.toISOString().split('T')[1]?.slice(0,5) ?? mapped.startTime;
      } else {
        mapped.startDate = mapped.startDate;
      }
    } catch (e) {
      // noop
    }
  }
  mapped.coverImage = sample.image ?? mapped.coverImage;
  mapped.location = sample.location ?? mapped.location;
  // volunteers
  mapped.volunteersRegistered = sample.volunteers ?? mapped.volunteersRegistered;
  mapped.volunteersConfirmed = sample.volunteers ?? mapped.volunteersConfirmed;
  // category
  mapped.category = sample.category ? [sample.category] : mapped.category;
  // tags: keep existing tags but include sample slug/category
  mapped.tags = Array.from(new Set([...(mapped.tags || []), ...(sample.category ? [sample.category] : []), ...(sample.tags || [])]));
  // stats
  mapped.stats = {
    ...(mapped.stats || {}),
    views: mapped.stats?.views ?? 0,
    applications: mapped.stats?.applications ?? mapped.volunteersRegistered ?? 0,
    approved: mapped.stats?.approved ?? mapped.volunteersConfirmed ?? 0
  };

  // Keep original description etc from Data (so "hashed" object contains full fields)
  return mapped;
};

/* ---------------- Component ---------------- */
export default function EventDetailPage() {
  const { user, token } = useAuth();
  const { slug } = useParams();

  const [events, setEvents] = useState([]); // danh sách sự kiện (sidebar / tương tự)
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState(clone(Data));

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);

      // init with hashed data for quick render if slug matches sample, else Data base
      try {
        const initial = getHashedDataForSlug(slug);
        if (!cancelled) setEventData(initial);
      } catch (e) {
        if (!cancelled) setEventData(clone(Data));
      }

      // fetch detail + list in parallel, robust to failures
      try {
        const baseUrl = import.meta.env.VITE_API || '';
        const detailUrl = baseUrl ? `${baseUrl}/api/volunteer/events/${slug}` : null;
        const listUrl = baseUrl ? `${baseUrl}/api/volunteer/events` : null;

        const detailPromise = detailUrl ? axios.get(detailUrl).catch((err) => ({ error: err })) : Promise.resolve({ error: true });
        const listPromise = listUrl ? axios.get(listUrl, { params: { size: 20 } }).catch((err) => ({ error: err })) : Promise.resolve({ error: true });

        const [detailRes, listRes] = await Promise.all([detailPromise, listPromise]);

        // Process list (for similar events)
        if (!cancelled) {
          if (listRes && !listRes.error && listRes.data && Array.isArray(listRes.data.result) && listRes.data.result.length > 0) {
            setEvents(listRes.data.result);
          } else {
            // fallback to sampleFeaturedEvents
            setEvents(sampleFeaturedEvents);
          }
        }

        // Process detail
        if (!cancelled) {
          if (detailRes && !detailRes.error && detailRes.data && detailRes.data.code === 0 && detailRes.data.result) {
            // Use API result
            setEventData(detailRes.data.result);
          } else {
            const matchedSample = sampleFeaturedEvents.find((s) => s.slug === slug);
            if (matchedSample) {
              const hashed = getHashedDataForSlug(slug);
              setEventData(hashed);
            } else {
              setEventData(clone(Data));
            }
          }
        }
      } catch (err) {
        // unexpected error: fallback to sample or hashed Data
        console.error('Error loading event detail/list:', err);
        if (!cancelled) {
          const matchedSample = sampleFeaturedEvents.find((s) => s.slug === slug);
          if (matchedSample) {
            setEventData(getHashedDataForSlug(slug));
          } else {
            setEventData(clone(Data));
          }
          setEvents(sampleFeaturedEvents);
          toast.error('Lỗi kết nối — đang dùng dữ liệu mẫu.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const formatDateDMY = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString || '';
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatTime = (timeString) => timeString || '';

  const handleShare = () => {
    const url = `${window.location.origin}/events/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => toast.success('Đã copy link sự kiện!'))
        .catch((err) => {
          console.error('Copy thất bại:', err);
          toast.error('Copy link thất bại.');
        });
    } else {
      toast.info('Trình duyệt không hỗ trợ copy tự động. Hãy copy thủ công.');
    }
  };

  const handleRegisterEvent = async () => {
    if (!user) {
      toast.info('Hãy đăng nhập hoặc đăng ký tài khoản để ứng tuyển vào sự kiện nhé!');
      return;
    }
    try {
      const baseUrl = import.meta.env.VITE_API || '';
      const res = await axios.post(`${baseUrl}/api/volunteer/events/apply`, {
        eventId: eventData.id
      }, { headers: { Authorization: `Bearer ${token}` } });
      if (res?.data?.result) {
        toast.success('Đăng ký thành công! Hãy chờ thông báo mới nhất của chúng tôi.');
      } else {
        toast.error('Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Đăng ký thất bại:', err?.response || err);
      toast.error('Có lỗi xảy ra! Vui lòng thử lại.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="mt-14 md:mt-0 min-h-screen bg-gray-50 p-4 sm:px-20">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-5 md:mb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">{eventData?.title}</h1>
              <div className="flex flex-col md:flex-row flex-wrap md:items-center gap-4 text-sm text-gray-600 mt-3">
                <span>Đăng lúc: {formatDateDMY(eventData?.createdAt)}</span>
                <span>Bởi: {eventData?.createdBy}</span>
                <span className="font-semibold text-red-700">Hạn đăng ký: {formatDateDMY(eventData?.deadline ?? eventData?.registrationDeadline)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button onClick={handleShare} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Share2 className="w-4 h-4 mr-2" /> Chia sẻ
              </button>
              <button onClick={handleRegisterEvent} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <ArrowRightCircle className="w-4 h-4 mr-2" /> Ứng tuyển
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl overflow-hidden shadow-sm">
              <div className="bg-white shadow-sm overflow-hidden">
                <img src={eventData?.coverImage} alt="Event cover" className="w-full h-56 sm:h-72 md:h-80 object-cover" />
              </div>
              <div className="bg-white p-6">
                <h3 className="text-lg font-semibold mb-4">Mô tả sự kiện</h3>
                <div className="prose max-w-none">
                  {eventData?.description?.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Yêu cầu tình nguyện viên</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between"><span className="text-gray-600">Số lượng cần tuyển:</span><span className="font-medium">{eventData?.volunteersNeeded !== null ? `${eventData?.volunteersNeeded} Người` : (eventData?.volunteersRegistered ? `${eventData?.volunteersRegistered} Người (đã đăng ký)` : 'Không rõ')}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Độ tuổi:</span><span className="font-medium">{(eventData?.minAge !== null && eventData?.maxAge !== null) ? `${eventData?.minAge} - ${eventData?.maxAge} tuổi` : 'Không yêu cầu'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Giới tính:</span><span className="font-medium">{eventData?.genderRequirement === 'any' ? 'Không yêu cầu' : eventData?.genderRequirement}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Kinh nghiệm:</span><span className="font-medium capitalize">{eventData?.experienceLevel ?? '-'}</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-3">Yêu cầu thêm:</h4>
                <p className="mb-2 text-sm font-semibold text-gray-500">BTC đang tìm kiếm những bạn có thể đáp ứng những tiêu chí sau:</p>
                <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
                  {Array.isArray(eventData?.desSkill) && eventData.desSkill.length > 0 ? eventData.desSkill.map((skill, idx) => (
                    <li key={`${skill}-${idx}`}>{skill}</li>
                  )) : <li>Không có yêu cầu chi tiết.</li>}
                </ul>
              </div>
            </div>

            <BenefitsCard eventData={eventData} />

            <div className="mt-3 flex flex-col w-full mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {events?.filter(i => i?.id !== eventData?.id).slice(0, 6).map((item, idx) => (
                  <div key={idx} className="col-span-1">
                    <EventSummaryCard event={item} state="grid" />
                  </div>
                ))}
              </div>

              {(!events || events.filter(i => i.id !== eventData?.id).length === 0) &&
                <div className="rounded-2xl border border-dashed border-slate-400 bg-slate-50 p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13l3 3L22 4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h11" />
                  </svg>
                  <p className="mt-3 text-sm text-slate-600">Không tìm thấy sự kiện tương tự.</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Link to="/events" className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-white border shadow-sm hover:shadow-md">Về danh sách sự kiện</Link>
                  </div>
                </div>
              }
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin sự kiện</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{formatDateDMY(eventData?.startDate ?? eventData?.date)}</p>
                    <p className="text-sm text-gray-600">{formatTime(eventData?.startTime)} - {formatTime(eventData?.endTime)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{eventData?.location}</p>
                    <p className="text-sm text-gray-600">{eventData?.address || ''}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{eventData?.volunteersRegistered ?? 0} người</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Tag className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <h4 className="font-medium mb-2">Danh mục sự kiện:</h4>
                    <ul className="list-none ml-0 space-y-2">
                      {Array.isArray(eventData?.category) ? eventData.category.map((cat, idx) => (
                        <li key={`${cat}-${idx}`}><span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">{cat}</span></li>
                      )) : <li><span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">{eventData?.category || '—'}</span></li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin tổ chức</h3>
              <div className="flex items-center space-x-3 mb-4">
                {eventData?.organizer?.logo ? (
                  <img src={eventData.organizer.logo} alt="Organizer logo" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">ORG</div>
                )}
                <div>
                  <Link to={`profile/${eventData?.slug}`} className="font-medium">{eventData?.organizer?.name ?? 'Ban tổ chức'}</Link>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-1" /> <span>{eventData?.organizer?.rating ?? '-'}</span></div>
                    {eventData?.organizer?.type === 'verified_partner' && <Shield className="w-4 h-4 text-blue-500" />}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Sự kiện đã tổ chức:</span><span className="font-medium">{eventData?.organizer?.eventsOrganized ?? '-'}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Điểm tin cậy:</span><span className="font-medium">{eventData?.organizer?.trustScore ?? '-'}%</span></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(eventData?.tags) && eventData.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#{tag}</span>
                ))}
                {(!eventData?.tags || eventData.tags.length === 0) && <span className="text-sm text-gray-500">Không có tag</span>}
              </div>
            </div>

            <UpcomingEventsWidget />
            <NewsUpdatesWidget />
            <BlogPostsWidget />
            <FAQsWidget />
          </aside>
        </div>
      </div>
    </div>
  );
}
