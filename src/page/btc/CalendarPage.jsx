import { useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter, Search, Clock, MapPin, Users, Edit, Trash2, Eye } from "lucide-react";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data for events
  const mockEvents = [
    {
      id: 1,
      title: "Phỏng vấn Frontend Developer",
      description: "Phỏng vấn ứng viên vị trí Frontend Developer",
      date: "2025-01-15",
      time: "09:00",
      duration: "60 phút",
      type: "interview",
      location: "Phòng họp A",
      attendees: ["HR Manager", "Tech Lead"],
      status: "scheduled",
      priority: "high"
    },
    {
      id: 2,
      title: "Hội thảo kỹ năng mềm",
      description: "Workshop về kỹ năng giao tiếp và làm việc nhóm",
      date: "2025-01-16",
      time: "14:00",
      duration: "120 phút",
      type: "workshop",
      location: "Hội trường",
      attendees: ["All Staff"],
      status: "scheduled",
      priority: "medium"
    },
    {
      id: 3,
      title: "Review dự án Q4",
      description: "Đánh giá kết quả và lập kế hoạch Q1",
      date: "2025-01-17",
      time: "10:00",
      duration: "90 phút",
      type: "meeting",
      location: "Online",
      attendees: ["Management Team"],
      status: "completed",
      priority: "high"
    },
    {
      id: 4,
      title: "Training AI và Automation",
      description: "Khóa đào tạo về AI và tự động hóa quy trình",
      date: "2025-01-20",
      time: "09:00",
      duration: "480 phút",
      type: "training",
      location: "Training Room",
      attendees: ["Technical Team"],
      status: "scheduled",
      priority: "medium"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter events based on search and type
  useEffect(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || event.type === filterType;
      return matchesSearch && matchesType;
    });
    setFilteredEvents(filtered);
  }, [events, searchQuery, filterType]);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();
    
    const days = [];
    
    // Previous month's days
    for (let i = startDate - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Next month's days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => event.date === dateStr);
  };

  const getEventTypeColor = (type) => {
    const colors = {
      interview: 'bg-blue-500',
      workshop: 'bg-green-500',
      meeting: 'bg-purple-500',
      training: 'bg-orange-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getEventTypeLabel = (type) => {
    const labels = {
      interview: 'Phỏng vấn',
      workshop: 'Workshop',
      meeting: 'Họp',
      training: 'Đào tạo'
    };
    return labels[type] || type;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600 bg-red-50',
      medium: 'text-yellow-600 bg-yellow-50',
      low: 'text-green-600 bg-green-50'
    };
    return colors[priority] || 'text-gray-600 bg-gray-50';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 w-full min-h-screen">
        <div className="px-6 w-full h-full overflow-y-auto pb-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full min-h-screen transition-all duration-300">
      <div className="px-6 w-full h-full overflow-y-auto pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mt-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  Lịch Sự Kiện
                </h1>
                <p className="text-gray-600 mt-2">Quản lý và theo dõi các sự kiện, cuộc họp, và hoạt động</p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                <Plus className="h-5 w-5" />
                Thêm Sự Kiện
              </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm sự kiện..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="all">Tất cả loại</option>
                      <option value="interview">Phỏng vấn</option>
                      <option value="workshop">Workshop</option>
                      <option value="meeting">Họp</option>
                      <option value="training">Đào tạo</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Tháng
                  </button>
                  <button
                    onClick={() => setViewMode('week')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Tuần
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Danh sách
                  </button>
                </div>
              </div>
            </div>
          </div>

          {viewMode === 'month' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                    <div key={day} className="text-center font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-4">
                  {getDaysInMonth(currentDate).map((day, index) => {
                    const dayEvents = getEventsForDate(day.date);
                    const isToday = day.date.toDateString() === new Date().toDateString();
                    
                    return (
                      <div
                        key={index}
                        className={`min-h-[120px] p-2 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                          !day.isCurrentMonth ? 'opacity-50' : ''
                        } ${isToday ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
                        onClick={() => setSelectedDate(day.date)}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isToday ? 'text-blue-600' : day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {day.date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs px-2 py-1 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 px-2">
                              +{dayEvents.length - 2} khác
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Không có sự kiện nào</h3>
                  <p className="text-gray-500">Chưa có sự kiện nào phù hợp với tìm kiếm của bạn.</p>
                </div>
              ) : (
                filteredEvents.map(event => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getEventTypeColor(event.type)}`}>
                            {getEventTypeLabel(event.type)}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                            {event.priority === 'high' ? 'Cao' : event.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {event.status === 'completed' ? 'Hoàn thành' : 'Đã lên lịch'}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{event.time} - {event.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Today's Events Sidebar */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sự kiện hôm nay - {formatDate(new Date())}
              </h3>
              {getEventsForDate(new Date()).length === 0 ? (
                <p className="text-gray-500 text-center py-8">Không có sự kiện nào hôm nay</p>
              ) : (
                <div className="space-y-3">
                  {getEventsForDate(new Date()).map(event => (
                    <div key={event.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-500">{event.time} • {event.location}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(event.priority)}`}>
                        {event.priority === 'high' ? 'Cao' : event.priority === 'medium' ? 'TB' : 'Thấp'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}