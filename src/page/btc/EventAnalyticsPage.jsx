import { useState } from "react";
import { 
  BarChart3, PieChart, TrendingUp, TrendingDown, Users, Calendar,
  Eye, Heart, Share2, MessageCircle, Clock, MapPin, Star,
  Download, Filter, Search, RefreshCw, Settings, Plus,
  ArrowUp, ArrowDown, Minus, Activity, Zap, Target,
  Globe, Smartphone, Monitor, Tablet, Facebook, Twitter,
  Instagram, Linkedin, Youtube, Mail, Phone, CheckCircle,
  XCircle, AlertTriangle, PlayCircle, Pause, MoreHorizontal
} from "lucide-react";

export default function EventAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [timeRange, setTimeRange] = useState("7days");
  const [showRealTime, setShowRealTime] = useState(true);

  const analyticsStats = {
    totalEvents: 12,
    totalAttendees: 8542,
    totalEngagement: "342K",
    avgSatisfaction: 4.3
  };

  const events = [
    {
      id: 1,
      name: "Tech Innovation Summit 2024",
      date: "2024-09-10",
      status: "completed",
      attendees: 1250,
      registrations: 1456,
      showUpRate: "85.9%",
      engagement: 4.8,
      duration: "8 hours",
      location: "Hanoi Convention Center",
      type: "Conference",
      revenue: "250M VNĐ",
      cost: "180M VNĐ",
      roi: "38.9%"
    },
    {
      id: 2,
      name: "Digital Marketing Workshop",
      date: "2024-09-05",
      status: "completed",
      attendees: 345,
      registrations: 398,
      showUpRate: "86.7%",
      engagement: 4.2,
      duration: "4 hours",
      location: "Co-working Space TPHCM",
      type: "Workshop",
      revenue: "68M VNĐ",
      cost: "45M VNĐ",
      roi: "51.1%"
    },
    {
      id: 3,
      name: "Startup Networking Night",
      date: "2024-08-28",
      status: "completed", 
      attendees: 189,
      registrations: 210,
      showUpRate: "90.0%",
      engagement: 4.6,
      duration: "3 hours",
      location: "Sky Bar Hanoi",
      type: "Networking",
      revenue: "42M VNĐ",
      cost: "28M VNĐ",
      roi: "50.0%"
    }
  ];

  const realTimeData = {
    activeUsers: 1247,
    pageViews: 8934,
    sessionDuration: "4m 32s",
    bounceRate: "23.4%",
    newVisitors: "67.8%"
  };

  const audienceData = {
    demographics: {
      age: {
        "18-24": 25,
        "25-34": 45,
        "35-44": 20,
        "45-54": 8,
        "55+": 2
      },
      gender: {
        male: 58,
        female: 40,
        other: 2
      },
      location: {
        "Hà Nội": 45,
        "TP.HCM": 35,
        "Đà Nẵng": 12,
        "Khác": 8
      }
    },
    devices: {
      desktop: 52,
      mobile: 38,
      tablet: 10
    },
    sources: {
      organic: 34,
      social: 28,
      direct: 22,
      email: 16
    }
  };

  const engagementMetrics = [
    {
      metric: "Session Duration",
      value: "8m 42s",
      change: "+15%",
      trend: "up",
      description: "Thời gian tham dự trung bình"
    },
    {
      metric: "Interaction Rate", 
      value: "78.5%",
      change: "+12%",
      trend: "up",
      description: "Tỷ lệ tương tác trong sự kiện"
    },
    {
      metric: "Q&A Participation",
      value: "56.2%", 
      change: "+8%",
      trend: "up",
      description: "Tham gia hỏi đáp"
    },
    {
      metric: "Social Shares",
      value: "2,847",
      change: "-5%",
      trend: "down", 
      description: "Lượt chia sẻ trên mạng xã hội"
    }
  ];

  const TabButton = ({ id, label, icon: Icon, isActive }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        activeTab === id
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Icon size={18} />
      {label}
      {isActive && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
    </button>
  );

  const StatCard = ({ icon: Icon, label, value, color, change, trend, subtitle }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 'text-gray-500'
          }`}>
            {trend === 'up' && <ArrowUp size={16} />}
            {trend === 'down' && <ArrowDown size={16} />}
            {trend === 'neutral' && <Minus size={16} />}
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{label}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  const EventCard = ({ event }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'live': return 'bg-red-100 text-red-800';
        case 'upcoming': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {event.duration}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {event.location}
              </span>
            </div>
            <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
              {event.type}
            </span>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
            {event.status === 'live' && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
            {event.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{event.attendees}</div>
            <div className="text-xs text-gray-600">Tham dự</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">{event.showUpRate}</div>
            <div className="text-xs text-gray-600">Show-up rate</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="font-medium text-gray-900">{event.engagement}</span>
            <span className="text-sm text-gray-500">satisfaction</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-green-600">ROI: {event.roi}</div>
            <div className="text-xs text-gray-500">{event.revenue} revenue</div>
          </div>
        </div>

        <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium">
          View Details
        </button>
      </div>
    );
  };

  const MetricCard = ({ metric }) => (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{metric.metric}</h3>
        <div className={`flex items-center gap-1 ${
          metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          {metric.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span className="text-sm font-medium">{metric.change}</span>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
      <p className="text-sm text-gray-600">{metric.description}</p>
    </div>
  );

  const RealTimeWidget = () => (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Real-time Overview</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{realTimeData.activeUsers}</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{realTimeData.pageViews}</div>
          <div className="text-sm text-gray-600">Page Views</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{realTimeData.sessionDuration}</div>
          <div className="text-sm text-gray-600">Avg. Session</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600">{realTimeData.bounceRate}</div>
          <div className="text-sm text-gray-600">Bounce Rate</div>
        </div>
      </div>
    </div>
  );

  const ChartPlaceholder = ({ title, type, height = "h-64" }) => (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className={`${height} bg-gray-50 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          {type === 'bar' && <BarChart3 className="mx-auto text-gray-400 mb-2" size={48} />}
          {type === 'pie' && <PieChart className="mx-auto text-gray-400 mb-2" size={48} />}
          {type === 'trend' && <TrendingUp className="mx-auto text-gray-400 mb-2" size={48} />}
          <p className="text-gray-500">{title} Chart</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Analytics</h1>
              <p className="text-gray-600">Comprehensive insights and performance metrics for your events</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <select 
                  value={selectedEvent} 
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Events</option>
                  {events.map(event => (
                    <option key={event.id} value={event.id.toString()}>{event.name}</option>
                  ))}
                </select>
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="24hours">Last 24 hours</option>
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                <Download size={18} />
                <span>Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                <RefreshCw size={18} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Calendar} 
            label="Total Events" 
            value={analyticsStats.totalEvents} 
            color="bg-blue-500" 
            change="+3"
            trend="up"
          />
          <StatCard 
            icon={Users} 
            label="Total Attendees" 
            value={analyticsStats.totalAttendees.toLocaleString()} 
            color="bg-green-500" 
            change="+18%"
            trend="up"
          />
          <StatCard 
            icon={Activity} 
            label="Total Engagement" 
            value={analyticsStats.totalEngagement} 
            color="bg-purple-500" 
            change="+25%"
            trend="up"
          />
          <StatCard 
            icon={Star} 
            label="Avg Satisfaction" 
            value={analyticsStats.avgSatisfaction} 
            color="bg-yellow-500" 
            change="+0.3"
            trend="up"
            subtitle="out of 5.0"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <TabButton id="overview" label="Overview" icon={BarChart3} />
          <TabButton id="realtime" label="Real-time" icon={Zap} isActive={showRealTime} />
          <TabButton id="events" label="Events" icon={Calendar} />
          <TabButton id="audience" label="Audience" icon={Users} />
          <TabButton id="engagement" label="Engagement" icon={Heart} />
          <TabButton id="performance" label="Performance" icon={Target} />
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChartPlaceholder title="Events Performance Trends" type="trend" />
              </div>
              <RealTimeWidget />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartPlaceholder title="Attendance vs Registrations" type="bar" />
              <ChartPlaceholder title="Event Types Distribution" type="pie" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Events</h3>
                <div className="space-y-3">
                  {events.slice(0, 3).map((event, index) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-500' : 
                        'bg-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{event.name}</div>
                        <div className="text-xs text-gray-500">{event.attendees} attendees</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600">{event.roi}</div>
                        <div className="text-xs text-gray-500">ROI</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
                <div className="space-y-3">
                  {Object.entries(audienceData.sources).map(([source, percentage]) => (
                    <div key={source} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-700 capitalize">{source}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Usage</h3>
                <div className="space-y-4">
                  {Object.entries(audienceData.devices).map(([device, percentage]) => (
                    <div key={device}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          {device === 'desktop' && <Monitor size={16} className="text-gray-600" />}
                          {device === 'mobile' && <Smartphone size={16} className="text-gray-600" />}
                          {device === 'tablet' && <Tablet size={16} className="text-gray-600" />}
                          <span className="text-gray-700 capitalize">{device}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "realtime" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RealTimeWidget />
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Activity Feed</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { action: "New user joined", time: "2 seconds ago", type: "join" },
                    { action: "Question submitted", time: "15 seconds ago", type: "question" },
                    { action: "Poll response received", time: "23 seconds ago", type: "poll" },
                    { action: "Chat message sent", time: "45 seconds ago", type: "chat" },
                    { action: "Screen shared", time: "1 minute ago", type: "share" },
                    { action: "Breakout room created", time: "2 minutes ago", type: "room" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'join' ? 'bg-green-500' :
                        activity.type === 'question' ? 'bg-blue-500' :
                        activity.type === 'poll' ? 'bg-purple-500' :
                        activity.type === 'chat' ? 'bg-yellow-500' :
                        activity.type === 'share' ? 'bg-red-500' :
                        'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ChartPlaceholder title="Real-time Attendance" type="trend" height="h-48" />
              <ChartPlaceholder title="Live Engagement Rate" type="trend" height="h-48" />
              <ChartPlaceholder title="Active Sessions" type="bar" height="h-48" />
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {activeTab === "audience" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Age Demographics</h2>
              <div className="space-y-3">
                {Object.entries(audienceData.demographics.age).map(([age, percentage]) => (
                  <div key={age}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700">{age} years</span>
                      <span className="font-semibold text-gray-900">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Geographic Distribution</h2>
              <div className="space-y-3">
                {Object.entries(audienceData.demographics.location).map(([location, percentage]) => (
                  <div key={location} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-gray-600" />
                      <span className="text-gray-700">{location}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <ChartPlaceholder title="Audience Growth Over Time" type="trend" />
            <ChartPlaceholder title="Gender Distribution" type="pie" />
          </div>
        )}

        {activeTab === "engagement" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {engagementMetrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartPlaceholder title="Engagement Timeline" type="trend" />
              <ChartPlaceholder title="Interaction Types" type="pie" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Reach</h3>
                <div className="space-y-3">
                  {[
                    { platform: "Facebook", reach: "45.2K", icon: Facebook, color: "text-blue-600" },
                    { platform: "LinkedIn", reach: "32.1K", icon: Linkedin, color: "text-blue-700" },
                    { platform: "Twitter", reach: "28.9K", icon: Twitter, color: "text-blue-400" },
                    { platform: "Instagram", reach: "22.5K", icon: Instagram, color: "text-pink-600" }
                  ].map((social, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <social.icon size={20} className={social.color} />
                        <span className="text-gray-700">{social.platform}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{social.reach}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Actions</h3>
                <div className="space-y-3">
                  {[
                    { action: "Likes", count: "8,247", icon: Heart, color: "text-red-500" },
                    { action: "Comments", count: "3,156", icon: MessageCircle, color: "text-blue-500" },
                    { action: "Shares", count: "2,847", icon: Share2, color: "text-green-500" },
                    { action: "Views", count: "45.2K", icon: Eye, color: "text-purple-500" }
                  ].map((engagement, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <engagement.icon size={16} className={engagement.color} />
                        <span className="text-gray-700">{engagement.action}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{engagement.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Content</h3>
                <div className="space-y-3">
                  {[
                    { title: "Opening Keynote", engagement: "95%", views: "12.4K" },
                    { title: "Panel Discussion", engagement: "87%", views: "9.8K" },
                    { title: "Workshop Demo", engagement: "82%", views: "8.2K" },
                    { title: "Q&A Session", engagement: "78%", views: "7.1K" }
                  ].map((content, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">{content.title}</span>
                        <span className="text-sm text-gray-500">{content.views} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: content.engagement }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{content.engagement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                icon={Target} 
                label="Conversion Rate" 
                value="68.5%" 
                color="bg-green-500" 
                change="+8.2%"
                trend="up"
                subtitle="Registration to attendance"
              />
              <StatCard 
                icon={DollarSign} 
                label="Revenue Generated" 
                value="360M VNĐ" 
                color="bg-blue-500" 
                change="+15%"
                trend="up"
                subtitle="Total across all events"
              />
              <StatCard 
                icon={TrendingUp} 
                label="ROI Average" 
                value="46.7%" 
                color="bg-purple-500" 
                change="+12%"
                trend="up"
                subtitle="Return on investment"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Event Performance Comparison</h2>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900">{event.name}</h3>
                        <span className="text-sm font-semibold text-green-600">{event.roi} ROI</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-900">{event.attendees}</div>
                          <div className="text-gray-600">Attendees</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{event.showUpRate}</div>
                          <div className="text-gray-600">Show-up</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{event.engagement}</div>
                          <div className="text-gray-600">Rating</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ChartPlaceholder title="Revenue vs Cost Analysis" type="bar" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { category: "Venue", amount: "120M VNĐ", percentage: 35, color: "bg-blue-500" },
                    { category: "Marketing", amount: "85M VNĐ", percentage: 25, color: "bg-green-500" },
                    { category: "Technology", amount: "68M VNĐ", percentage: 20, color: "bg-purple-500" },
                    { category: "Catering", amount: "51M VNĐ", percentage: 15, color: "bg-orange-500" },
                    { category: "Others", amount: "17M VNĐ", percentage: 5, color: "bg-gray-500" }
                  ].map((cost, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700">{cost.category}</span>
                        <span className="font-semibold text-gray-900">{cost.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${cost.color} h-2 rounded-full`}
                          style={{ width: `${cost.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h3>
                <div className="space-y-4">
                  {[
                    { month: "June 2024", attendees: 892, change: "+12%", trend: "up" },
                    { month: "July 2024", attendees: 1456, change: "+63%", trend: "up" },
                    { month: "August 2024", attendees: 1189, change: "-18%", trend: "down" },
                    { month: "September 2024", attendees: 1784, change: "+50%", trend: "up" }
                  ].map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{month.month}</div>
                        <div className="text-sm text-gray-500">{month.attendees.toLocaleString()} attendees</div>
                      </div>
                      <div className={`flex items-center gap-1 ${
                        month.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {month.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        <span className="text-sm font-medium">{month.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics Summary</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">85.2%</div>
                    <div className="text-sm text-gray-600">Average Show-up Rate</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">4.4</div>
                    <div className="text-sm text-gray-600">Average Satisfaction</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">78.5%</div>
                    <div className="text-sm text-gray-600">Engagement Rate</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">6.2h</div>
                    <div className="text-sm text-gray-600">Avg Session Duration</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Benchmarks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { metric: "Registration Completion", current: "94.2%", benchmark: "85%", status: "excellent" },
                  { metric: "Email Open Rate", current: "68.5%", benchmark: "70%", status: "good" },
                  { metric: "Social Media Engagement", current: "8.7%", benchmark: "6%", status: "excellent" },
                  { metric: "Post-Event Survey Response", current: "42.3%", benchmark: "50%", status: "needs_improvement" }
                ].map((benchmark, index) => (
                  <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{benchmark.metric}</h4>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{benchmark.current}</div>
                    <div className="text-sm text-gray-500 mb-2">vs {benchmark.benchmark} benchmark</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      benchmark.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      benchmark.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {benchmark.status === 'excellent' ? 'Excellent' :
                       benchmark.status === 'good' ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}