import { useState } from "react";
import { Calendar, Users, MapPin, Clock, Star, Heart, Share2, Download, Camera, Trophy, TrendingUp } from "lucide-react";

export default function EventRecapPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [liked, setLiked] = useState(false);

  const eventData = {
    title: "Tech Innovation Summit 2024",
    date: "September 10-12, 2024",
    location: "Hanoi Convention Center",
    attendees: 1250,
    rating: 4.8,
    totalPhotos: 847,
    totalVideos: 23,
    highlights: [
      { title: "Opening Keynote", speaker: "Dr. Sarah Chen", views: 15420 },
      { title: "AI Workshop", speaker: "Team Google", views: 12300 },
      { title: "Startup Pitch", speaker: "5 Startups", views: 9800 },
      { title: "Closing Ceremony", speaker: "Event Team", views: 8500 }
    ],
    stats: {
      totalReach: "2.4M",
      socialMentions: "15.7K",
      mediaDownloads: "3.2K",
      satisfaction: "96%"
    },
    topMoments: [
      {
        time: "09:30 AM",
        title: "Grand Opening",
        description: "Spectacular drone show kicked off the event",
        engagement: 95
      },
      {
        time: "02:15 PM",
        title: "Innovation Awards",
        description: "Top 3 startups received recognition",
        engagement: 88
      },
      {
        time: "06:00 PM",
        title: "Networking Gala",
        description: "500+ professionals connected",
        engagement: 92
      }
    ]
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        activeTab === id
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color} mb-4`}>
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );

  const HighlightCard = ({ highlight, index }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
        <span className="text-sm text-gray-500">{highlight.views.toLocaleString()} views</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
      <p className="text-gray-600 mb-4">{highlight.speaker}</p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
          style={{ width: `${Math.max(20, (highlight.views / 15420) * 100)}%` }}
        ></div>
      </div>
    </div>
  );

  const MomentCard = ({ moment }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-purple-600">{moment.time}</span>
        <div className="flex items-center gap-1">
          <TrendingUp size={16} className="text-green-500" />
          <span className="text-sm text-green-500">{moment.engagement}%</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{moment.title}</h3>
      <p className="text-gray-600">{moment.description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 mb-18">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{eventData.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{eventData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{eventData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{eventData.attendees.toLocaleString()} attendees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-yellow-500" />
                  <span>{eventData.rating}/5.0</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  liked 
                    ? "bg-red-500 text-white shadow-lg" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
                <span>{liked ? "Liked" : "Like"}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                <Share2 size={18} />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                <Download size={18} />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-3">
          <TabButton id="overview" label="Overview" icon={TrendingUp} />
          <TabButton id="highlights" label="Highlights" icon={Trophy} />
          <TabButton id="moments" label="Key Moments" icon={Clock} />
          <TabButton id="media" label="Media" icon={Camera} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Users} 
                label="Total Reach" 
                value={eventData.stats.totalReach} 
                color="bg-blue-500" 
              />
              <StatCard 
                icon={Heart} 
                label="Social Mentions" 
                value={eventData.stats.socialMentions} 
                color="bg-pink-500" 
              />
              <StatCard 
                icon={Download} 
                label="Media Downloads" 
                value={eventData.stats.mediaDownloads} 
                color="bg-green-500" 
              />
              <StatCard 
                icon={Star} 
                label="Satisfaction Rate" 
                value={eventData.stats.satisfaction} 
                color="bg-yellow-500" 
              />
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Summary</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Attendance Rate</span>
                        <span className="font-semibold">94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Engagement Score</span>
                        <span className="font-semibold">88%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Content Quality</span>
                        <span className="font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Assets</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Camera className="text-blue-500" size={20} />
                        <span className="text-gray-700">Photos</span>
                      </div>
                      <span className="font-semibold text-gray-900">{eventData.totalPhotos}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="text-red-500" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                        </svg>
                        <span className="text-gray-700">Videos</span>
                      </div>
                      <span className="font-semibold text-gray-900">{eventData.totalVideos}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "highlights" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {eventData.highlights.map((highlight, index) => (
              <HighlightCard key={index} highlight={highlight} index={index} />
            ))}
          </div>
        )}

        {activeTab === "moments" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {eventData.topMoments.map((moment, index) => (
              <MomentCard key={index} moment={moment} />
            ))}
          </div>
        )}

        {activeTab === "media" && (
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Media Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <Camera className="text-gray-500" size={24} />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                View All Media ({eventData.totalPhotos + eventData.totalVideos} items)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}