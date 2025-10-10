import { useState } from "react";
import { 
  Megaphone, Share2, Mail, MessageSquare, Gift, Target, 
  BarChart3, Users, Calendar, Zap, Download, Copy, 
  Eye, Clock, TrendingUp, Star, Settings, Plus,
  Facebook, Twitter, Instagram, Linkedin, Send, Globe
} from "lucide-react";

export default function PromotionToolsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [copied, setCopied] = useState(false);

  const promotionStats = {
    activeCampaigns: 12,
    totalReach: "2.8M",
    engagementRate: "8.4%",
    conversionRate: "3.2%"
  };

  const promotionTools = [
    {
      id: "social-media",
      title: "Social Media Campaigns",
      description: "Create engaging posts for all platforms",
      icon: Share2,
      color: "bg-blue-500",
      features: ["Auto-posting", "Content templates", "Analytics", "Hashtag generator"]
    },
    {
      id: "email-marketing",
      title: "Email Marketing",
      description: "Design and send promotional emails",
      icon: Mail,
      color: "bg-green-500",
      features: ["Email templates", "A/B testing", "Automation", "Segmentation"]
    },
    {
      id: "discount-codes",
      title: "Discount & Coupons",
      description: "Generate promotional codes and offers",
      icon: Gift,
      color: "bg-purple-500",
      features: ["QR codes", "Usage tracking", "Time limits", "Bulk generation"]
    },
    {
      id: "influencer",
      title: "Influencer Outreach",
      description: "Connect with content creators",
      icon: Users,
      color: "bg-pink-500",
      features: ["Influencer database", "Contact templates", "Campaign tracking", "ROI analytics"]
    },
    {
      id: "advertising",
      title: "Digital Advertising",
      description: "Manage paid promotion campaigns",
      icon: Target,
      color: "bg-orange-500",
      features: ["Ad creation", "Budget optimization", "Audience targeting", "Performance tracking"]
    },
    {
      id: "sms-marketing",
      title: "SMS Marketing",
      description: "Send promotional text messages",
      icon: MessageSquare,
      color: "bg-cyan-500",
      features: ["Bulk SMS", "Personalization", "Delivery reports", "Opt-out management"]
    }
  ];

  const templates = [
    {
      id: 1,
      type: "Social Media Post",
      platform: "Instagram",
      title: "Product Launch Announcement",
      preview: "🚀 Exciting news! Our latest innovation is here...",
      engagement: "High",
      category: "product-launch"
    },
    {
      id: 2,
      type: "Email Campaign",
      platform: "Email",
      title: "Flash Sale Alert",
      preview: "⚡ 24-Hour Flash Sale - Up to 50% OFF!",
      engagement: "Very High", 
      category: "sales"
    },
    {
      id: 3,
      type: "Social Media Post",
      platform: "Facebook",
      title: "Behind the Scenes",
      preview: "Take a peek behind the curtain at our...",
      engagement: "Medium",
      category: "engagement"
    }
  ];

  const campaigns = [
    {
      id: 1,
      name: "Summer Sale 2024",
      status: "Active",
      reach: "450K",
      clicks: "12.3K",
      conversions: "890",
      budget: "$2,500",
      progress: 75
    },
    {
      id: 2,
      name: "Product Launch Campaign",
      status: "Scheduled",
      reach: "0",
      clicks: "0",
      conversions: "0",
      budget: "$1,800",
      progress: 100
    },
    {
      id: 3,
      name: "Black Friday Prep",
      status: "Draft",
      reach: "0",
      clicks: "0", 
      conversions: "0",
      budget: "$5,000",
      progress: 25
    }
  ];

  const TabButton = ({ id, label, icon: Icon }) => (
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
    </button>
  );

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-500">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">+{trend}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );

  const ToolCard = ({ tool }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg ${tool.color}`}>
          <tool.icon className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{tool.title}</h3>
          <p className="text-gray-600 text-sm">{tool.description}</p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {tool.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            {feature}
          </div>
        ))}
      </div>
      <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium">
        Launch Tool
      </button>
    </div>
  );

  const TemplateCard = ({ template }) => (
    <div 
      className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
        selectedTemplate === template.id ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-600 rounded">
          {template.type}
        </span>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${
          template.engagement === "Very High" ? "bg-green-100 text-green-600" :
          template.engagement === "High" ? "bg-yellow-100 text-yellow-600" :
          "bg-gray-100 text-gray-600"
        }`}>
          {template.engagement} Engagement
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{template.preview}</p>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {template.platform === "Instagram" && <Instagram size={14} />}
        {template.platform === "Facebook" && <Facebook size={14} />}
        {template.platform === "Email" && <Mail size={14} />}
        <span>{template.platform}</span>
      </div>
      {selectedTemplate === template.id && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
          <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium">
            Use Template
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300">
            <Eye size={16} />
          </button>
        </div>
      )}
    </div>
  );

  const CampaignRow = ({ campaign }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Megaphone className="text-white" size={16} />
          </div>
          <div>
            <div className="font-medium text-gray-900">{campaign.name}</div>
            <div className="text-sm text-gray-500">Campaign #{campaign.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          campaign.status === "Active" ? "bg-green-100 text-green-800" :
          campaign.status === "Scheduled" ? "bg-yellow-100 text-yellow-800" :
          "bg-gray-100 text-gray-800"
        }`}>
          {campaign.status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-900">{campaign.reach}</td>
      <td className="px-6 py-4 text-gray-900">{campaign.clicks}</td>
      <td className="px-6 py-4 text-gray-900">{campaign.conversions}</td>
      <td className="px-6 py-4 text-gray-900">{campaign.budget}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              style={{ width: `${campaign.progress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{campaign.progress}%</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <button className="text-gray-400 hover:text-gray-600">
          <Settings size={16} />
        </button>
      </td>
    </tr>
  );

  const handleCopyText = () => {
    navigator.clipboard.writeText("Check out our amazing promotion tools!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Promotion Tools</h1>
              <p className="text-gray-600">Create, manage, and optimize your marketing campaigns</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                <Download size={18} />
                <span>Export Data</span>
              </button>
              <button 
                onClick={handleCopyText}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                  copied ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Copy size={18} />
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                <Plus size={18} />
                <span>New Campaign</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Zap} 
            label="Active Campaigns" 
            value={promotionStats.activeCampaigns} 
            color="bg-blue-500" 
            trend="12"
          />
          <StatCard 
            icon={Eye} 
            label="Total Reach" 
            value={promotionStats.totalReach} 
            color="bg-green-500" 
            trend="8"
          />
          <StatCard 
            icon={BarChart3} 
            label="Engagement Rate" 
            value={promotionStats.engagementRate} 
            color="bg-purple-500" 
            trend="15"
          />
          <StatCard 
            icon={Target} 
            label="Conversion Rate" 
            value={promotionStats.conversionRate} 
            color="bg-orange-500" 
            trend="5"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <TabButton id="overview" label="Overview" icon={BarChart3} />
          <TabButton id="tools" label="Tools" icon={Zap} />
          <TabButton id="templates" label="Templates" icon={Copy} />
          <TabButton id="campaigns" label="Campaigns" icon={Megaphone} />
          <TabButton id="analytics" label="Analytics" icon={TrendingUp} />
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-300">
                    <Share2 className="text-blue-600" size={20} />
                    <span className="font-medium text-gray-900">Create Social Media Post</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-300">
                    <Mail className="text-green-600" size={20} />
                    <span className="font-medium text-gray-900">Send Email Campaign</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-300">
                    <Gift className="text-purple-600" size={20} />
                    <span className="font-medium text-gray-900">Generate Discount Code</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { action: "Campaign launched", time: "2 hours ago", status: "success" },
                    { action: "Email sent", time: "5 hours ago", status: "success" },
                    { action: "Template created", time: "1 day ago", status: "info" },
                    { action: "Campaign paused", time: "2 days ago", status: "warning" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === "success" ? "bg-green-500" :
                        activity.status === "warning" ? "bg-yellow-500" :
                        "bg-blue-500"
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
          </div>
        )}

        {activeTab === "tools" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotionTools.map((tool, index) => (
              <ToolCard key={index} tool={tool} />
            ))}
          </div>
        )}

        {activeTab === "templates" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Marketing Templates</h2>
              <div className="flex items-center gap-3">
                <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
                  <option>All Categories</option>
                  <option>Product Launch</option>
                  <option>Sales</option>
                  <option>Engagement</option>
                </select>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Create Template
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "campaigns" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Campaign Management</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  New Campaign
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reach</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <CampaignRow key={campaign.id} campaign={campaign} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Trends</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Content</h2>
              <div className="space-y-4">
                {[
                  { title: "Summer Sale Announcement", engagement: "12.4K", platform: "Instagram" },
                  { title: "Product Demo Video", engagement: "8.7K", platform: "YouTube" },
                  { title: "Customer Testimonial", engagement: "6.3K", platform: "Facebook" }
                ].map((content, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{content.title}</div>
                      <div className="text-sm text-gray-500">{content.platform}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{content.engagement}</div>
                      <div className="text-sm text-gray-500">engagements</div>
                    </div>
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