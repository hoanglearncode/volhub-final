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
import axios from "axios";


export default function Dashboard() {
  const {user, token} = useAuth();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/users/my-info`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        console.log(res)
      } catch (error) {
        
      }
    }
  }, []);

  console.log(user)

  return (
    <div className="min-h-screen bg-gray-50 md:p-6 py-6 md:py-0">
      <div className="mx-auto space-y-6">
        {!profile && (
          <aside role="status" aria-live="polite"
            class="p-2.5 rounded-lg bg-yellow-100 text-slate-900 text-sm">
            <strong class="inline-block mr-2 font-semibold">Mẹo:</strong>
            <span>Hãy cập nhật thông tin <Link to={'/profile'} className="hover:underline text-yellow-400 font-semibold">profile</Link>  để bắt đầu hành trình</span>
          </aside>

        )}
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
          <BlogPostsWidget />
          <FAQsWidget />
        </div>
      </div>
    </div>
  );
}
