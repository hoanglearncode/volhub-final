// Dashboard.jsx
import React, { useState, useRef,useEffect, use } from "react";
import { Link } from "react-router-dom";


import TestimonialsWidget from "../../components/user/home/TestimonialsWidget";
import UpcomingEventsWidget from "../../components/user/home/UpcomingEventsWidget";
import BlogPostsWidget from "../../components/user/home/BlogPostsWidget";
import FAQsWidget from "../../components/user/home/FAQsWidget";
import NewsUpdatesWidget from "../../components/user/home/NewsUpdatesWidget";
import CommunityFeedWidget from "../../components/user/home/CommunityFeedWidget";
import FeaturedEventsCarousel from "../../components/user/home/FeaturedEventsCarousel";
import { useAuth } from "../../context/AuthContext";


export default function Dashboard() {
  const {user} = useAuth();
  const [mockSuccessStories, setMockSuccessStories] = useState([]);

  useEffect(() => {}, []);


  return (
    <div className="min-h-screen bg-gray-50 md:p-6 py-6 md:py-0">
      <div className="mx-auto space-y-6">
        {/* Top row: featured + news */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col min-h-[40vh]"> 
            <FeaturedEventsCarousel />
          </div>

          <div className="flex flex-col min-h-[40vh]">
            <NewsUpdatesWidget />
          </div>
        </div>


        {/* Middle row: events, virtual tours, testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col h-full"> 
            <UpcomingEventsWidget />
          </div>
          <TestimonialsWidget />
        </div>

        {/* Fourth row: community feed (wide) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CommunityFeedWidget />
          </div>
          <div className="space-y-6">
            <BlogPostsWidget />
            <FAQsWidget />
          </div>
        </div>

        {/* Bottom row: success stories */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockSuccessStories.map((s, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex gap-3">
                <img src={s.image} alt={s.title} className="w-28 h-20 object-cover rounded-lg" />
                <div>
                  <Link to={`/events/${s?.slug}`} className="font-semibold text-sm">{s.title}</Link>
                  <p className="text-xs text-gray-500 line-clamp-2 my-1">{s.description}</p>
                  <div className="text-xs text-gray-400">{s.impact} • {s.volunteers} • {s.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
