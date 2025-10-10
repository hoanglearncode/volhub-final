import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, User, Eye, CheckCircle, AlertCircle, Flag, PauseCircle, ImageIcon, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';


const moks = {
    id: 'EVT-2024-001',
    title: 'Lễ hội Festival Áo Dài Bản Sắc Việt Nam 2025',
    description: `Lễ hội Festival Áo dài Bản Sắc Việt Nam 2025 tôn vinh vẻ đẹp truyền thống của áo dài Việt Nam, thúc đẩy phát triển du lịch, quảng bá hình ảnh đất nước Việt Nam...`,
    category: ['Văn hóa - Nghệ thuật'],
    status: 'active',
    startDate: '2024-12-15',
    startTime: '06:00',
    endTime: '11:00',
    location: 'Vinhomes Oceanpark 3, Hưng Yên',
    organizer: {
      name: 'Green Earth Vietnam',
      rating: 4.8,
    },
    contactInfo: {
      coordinatorName: 'Nguyễn Thị Hương',
      phone: '0901234567',
    },
    volunteersRegistered: 32,
    volunteersConfirmed: 28,
    coverImage: 'https://res.cloudinary.com/dcvrdyzo1/image/upload/v1758554226/p5h9gebipsivdmehftsd.jpg',
    stats: {
      views: 1250,
      applications: 32,
      approved: 28,
    },
    createdAt: '2024-11-20T10:30:00Z',
    createdBy: 'Green Earth Admin',
    slug: ''
  };

const EventSummaryCard = ({event, state = "list"}) => {
  const [isSave, setIsSave] = useState(false)
  const [eventData, setEventData] = useState(moks);

  const handleSave = () => {
    if(isSave) {
      // hủy lưu
      setIsSave(false)
    }else {
      // lưu
      setIsSave(true)
    }

  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Đang tuyển dụng' },
      finish: { color: 'bg-gray-100 text-gray-800', icon: Flag, text: 'Kết thúc' },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: PauseCircle, text: 'Dừng tuyển' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  const ListCard = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="flex">
        {/* Hình ảnh */}
        <div className="w-48 h-40 bg-gray-200 relative flex-shrink-0">
          {eventData?.coverImage ? (
            <img 
              src={eventData?.coverImage} 
              alt={eventData?.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div className="absolute top-2 left-2">
            {getStatusBadge(eventData?.status)}
          </div>
        </div>
        
        {/* Nội dung */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <Link to={`/events/${event?.slug}`}  className="text-lg font-semibold text-gray-900 line-clamp-2">
              {eventData?.title}
            </Link>
            <div className="flex gap-2">
              <button onClick={()=> handleSave()} title='Lưu sự kiện' className={`${isSave ? "text-red-500" : ""}`}><Heart size={18} /></button>
              <button className='px-4 py-2 flex items-center justify-center text-xs bg-green-600 text-white border border-green-200 rounded-lg'>Đăng ký</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(eventData?.startDate)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {formatTime(eventData?.startTime)} - {formatTime(eventData.endTime)}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="truncate">{eventData?.location}</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {eventData?.createdBy}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4 text-gray-500">
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {eventData?.stats?.views}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {eventData?.volunteersConfirmed}/{eventData?.volunteersRegistered}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              Đăng: {formatDate(eventData?.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const GridCard = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="w-full h-48 bg-gray-200 relative">
        {eventData?.coverImage ? (
          <img 
            src={eventData?.coverImage} 
            alt={eventData?.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          {getStatusBadge(eventData?.status)}
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {eventData?.category[0]}
        </div>
      </div>
      
      {/* Nội dung */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/events/${event?.slug}`} className="text-base font-semibold text-gray-900 line-clamp-2 flex-1">
            {eventData?.title}
          </Link>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{formatDate(eventData?.startDate)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{formatTime(eventData?.startTime)} - {formatTime(eventData.endTime)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{eventData?.location}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{eventData?.createdBy}</span>
          </div>
        </div>
        
        <div className=" pb-3 flex justify-between items-center text-sm">
          <div className="flex space-x-3 text-gray-500">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {eventData?.stats?.views}
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {eventData?.volunteersConfirmed}/{eventData?.volunteersRegistered}
            </span>
          </div>
        </div>
        
        <div className='border-t pt-2 flex justify-between items-center'>
          <span className="text-xs text-gray-400 my-2">Đăng: {formatDate(eventData?.createdAt)}</span>
          
          <div className="flex gap-2 items-center">
            <button onClick={()=> handleSave()} title='Lưu sự kiện' className={`${isSave ? "text-red-500" : ""}`}><Heart size={18} /></button>
            <button className='px-2 py-1 flex items-center justify-center text-xs bg-green-600 text-white border border-green-200 rounded-lg'>Đăng ký</button>
          </div>
        </div>

      </div>
    </div>
  );

  if (state === 'grid') {
    return <GridCard />;
  }else {
    return <ListCard />;
  }
};

export default EventSummaryCard;