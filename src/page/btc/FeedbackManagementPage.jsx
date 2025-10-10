import { useState } from "react";
import { 
  MessageCircle, Star, TrendingUp, TrendingDown, AlertTriangle, 
  Clock, CheckCircle, XCircle, Filter, Search, Download, 
  BarChart3, PieChart, Users, Calendar, Eye, Reply, 
  ThumbsUp, ThumbsDown, Heart, Flag, MoreHorizontal,
  Send, Settings, Plus, RefreshCw, Tag
} from "lucide-react";

export default function FeedbackManagementPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const feedbackStats = {
    totalFeedback: 2847,
    averageRating: 4.2,
    responseRate: "94%",
    pendingReviews: 23
  };

  const sentimentData = {
    positive: 65,
    neutral: 25,
    negative: 10
  };

  const feedbackItems = [
    {
      id: 1,
      customer: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      rating: 5,
      sentiment: "positive",
      subject: "Excellent service quality",
      message: "Tôi rất hài lòng với dịch vụ của công ty. Đội ngũ hỗ trợ rất chuyên nghiệp và nhiệt tình.",
      date: "2024-09-12",
      status: "responded",
      category: "service",
      priority: "medium",
      responseTime: "2h",
      tags: ["service", "support"]
    },
    {
      id: 2,
      customer: "Trần Thị Bình",
      email: "binh.tran@email.com", 
      rating: 2,
      sentiment: "negative",
      subject: "Delivery issues",
      message: "Đơn hàng của tôi bị chậm trễ 3 ngày so với dự kiến. Không có thông báo trước.",
      date: "2024-09-11",
      status: "pending",
      category: "shipping",
      priority: "high",
      responseTime: "12h",
      tags: ["shipping", "delay"]
    },
    {
      id: 3,
      customer: "Lê Minh Cường",
      email: "cuong.le@email.com",
      rating: 4,
      sentiment: "positive", 
      subject: "Good product quality",
      message: "Sản phẩm chất lượng tốt, đóng gói cẩn thận. Giá cả hợp lý.",
      date: "2024-09-10",
      status: "new",
      category: "product",
      priority: "low",
      responseTime: "1h",
      tags: ["product", "quality"]
    },
    {
      id: 4,
      customer: "Phạm Thị Diệu",
      email: "dieu.pham@email.com",
      rating: 3,
      sentiment: "neutral",
      subject: "Website navigation could be better",
      message: "Giao diện website hơi khó sử dụng, cần cải thiện trải nghiệm người dùng.",
      date: "2024-09-09",
      status: "in_progress",
      category: "website",
      priority: "medium",
      responseTime: "6h",
      tags: ["website", "ux"]
    }
  ];

  const TabButton = ({ id, label, icon: Icon, count }) => (
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
      {count && (
        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
          activeTab === id ? "bg-blue-500" : "bg-gray-200 text-gray-600"
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  const StatCard = ({ icon: Icon, label, value, color, trend, trendValue }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );

  const FeedbackCard = ({ feedback }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'new': return 'bg-blue-100 text-blue-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'in_progress': return 'bg-purple-100 text-purple-800';
        case 'responded': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high': return 'text-red-500';
        case 'medium': return 'text-yellow-500';
        case 'low': return 'text-green-500';
        default: return 'text-gray-500';
      }
    };

    const getSentimentIcon = (sentiment) => {
      switch (sentiment) {
        case 'positive': return <ThumbsUp className="text-green-500" size={16} />;
        case 'negative': return <ThumbsDown className="text-red-500" size={16} />;
        default: return <MessageCircle className="text-gray-500" size={16} />;
      }
    };

    return (
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {feedback.customer.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{feedback.customer}</h3>
              <p className="text-sm text-gray-500">{feedback.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            {getSentimentIcon(feedback.sentiment)}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">{feedback.subject}</h4>
          <p className="text-gray-600 text-sm line-clamp-2">{feedback.message}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
              {feedback.status.replace('_', ' ')}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gray-100 ${getPriorityColor(feedback.priority)}`}>
              {feedback.priority} priority
            </span>
            {feedback.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {feedback.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {feedback.responseTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300">
              <Eye size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-300">
              <Reply size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-300">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SentimentChart = () => (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2 text-green-600">
              <ThumbsUp size={16} />
              Positive
            </span>
            <span className="font-semibold">{sentimentData.positive}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${sentimentData.positive}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2 text-gray-600">
              <MessageCircle size={16} />
              Neutral
            </span>
            <span className="font-semibold">{sentimentData.neutral}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gray-500 h-2 rounded-full" style={{ width: `${sentimentData.neutral}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2 text-red-600">
              <ThumbsDown size={16} />
              Negative
            </span>
            <span className="font-semibold">{sentimentData.negative}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${sentimentData.negative}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const filteredFeedback = feedbackItems.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Feedback Management</h1>
              <p className="text-gray-600">Monitor, analyze, and respond to customer feedback</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                <Download size={18} />
                <span>Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                <RefreshCw size={18} />
                <span>Refresh</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                <Settings size={18} />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={MessageCircle} 
            label="Total Feedback" 
            value={feedbackStats.totalFeedback.toLocaleString()} 
            color="bg-blue-500" 
            trend="up"
            trendValue="+12%"
          />
          <StatCard 
            icon={Star} 
            label="Average Rating" 
            value={feedbackStats.averageRating}
            color="bg-yellow-500" 
            trend="up"
            trendValue="+0.3"
          />
          <StatCard 
            icon={CheckCircle} 
            label="Response Rate" 
            value={feedbackStats.responseRate} 
            color="bg-green-500" 
            trend="up"
            trendValue="+5%"
          />
          <StatCard 
            icon={Clock} 
            label="Pending Reviews" 
            value={feedbackStats.pendingReviews} 
            color="bg-orange-500" 
            trend="down"
            trendValue="-8"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <TabButton id="overview" label="Overview" icon={BarChart3} />
          <TabButton id="feedback" label="All Feedback" icon={MessageCircle} count={feedbackItems.length} />
          <TabButton id="pending" label="Pending" icon={Clock} count={feedbackItems.filter(f => f.status === 'pending').length} />
          <TabButton id="analytics" label="Analytics" icon={TrendingUp} />
          <TabButton id="reports" label="Reports" icon={PieChart} />
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Feedback</h2>
                  <div className="space-y-4">
                    {feedbackItems.slice(0, 3).map((feedback) => (
                      <div key={feedback.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {feedback.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{feedback.customer}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={12} 
                                  className={i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{feedback.subject}</p>
                        </div>
                        <span className="text-xs text-gray-500">{feedback.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <SentimentChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Response Time Trends</h2>
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto text-gray-400 mb-2" size={48} />
                    <p className="text-gray-500">Response time chart</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h2>
                <div className="space-y-3">
                  {[
                    { category: "Service", count: 45, color: "bg-blue-500" },
                    { category: "Product", count: 32, color: "bg-green-500" },
                    { category: "Shipping", count: 28, color: "bg-orange-500" },
                    { category: "Website", count: 15, color: "bg-purple-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-gray-700">{item.category}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "feedback" || activeTab === "pending") && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search feedback..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="responded">Responded</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Feedback Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFeedback.length > 0 ? (
                filteredFeedback
                  .filter(feedback => activeTab === "feedback" || feedback.status === "pending")
                  .map((feedback) => (
                    <FeedbackCard key={feedback.id} feedback={feedback} />
                  ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <MessageCircle className="mx-auto text-gray-400 mb-4" size={64} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Rating Distribution</h2>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm text-gray-600">{rating}</span>
                      <Star className="text-yellow-400 fill-current" size={14} />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${rating === 5 ? 45 : rating === 4 ? 30 : rating === 3 ? 15 : rating === 2 ? 7 : 3}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {rating === 5 ? 45 : rating === 4 ? 30 : rating === 3 ? 15 : rating === 2 ? 7 : 3}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Trends</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-500">Monthly trends chart</p>
                </div>
              </div>
            </div>

            <SentimentChart />

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top Issues</h2>
              <div className="space-y-3">
                {[
                  { issue: "Delivery delays", count: 23, trend: "up" },
                  { issue: "Product quality", count: 18, trend: "down" },
                  { issue: "Customer service", count: 15, trend: "up" },
                  { issue: "Website issues", count: 12, trend: "down" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{item.issue}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{item.count}</span>
                      {item.trend === "up" ? (
                        <TrendingUp className="text-red-500" size={16} />
                      ) : (
                        <TrendingDown className="text-green-500" size={16} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="text-center">
              <PieChart className="mx-auto text-gray-400 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Detailed Reports</h2>
              <p className="text-gray-600 mb-6">Generate comprehensive feedback reports</p>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Generate Report
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                  Schedule Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}