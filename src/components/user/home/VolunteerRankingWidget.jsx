import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, Trophy } from "lucide-react";
import axios from "axios";
const VolunteerRankingWidget = () => {
  const [mockVolunteerRanking, setMockVolunteerRanking] = useState([
    { rank: 1, name: "Nguyễn Thị Mai", hours: 1250, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=40&h=40&fit=crop&crop=face" },
    { rank: 2, name: "Trần Văn Nam", hours: 1180, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { rank: 3, name: "Lê Thị Hoa", hours: 1050, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
    { rank: 4, name: "Phạm Minh Tuấn", hours: 980, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    { rank: 5, name: "Hoàng Thị Lan", hours: 920, avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face" },
  ]);
  useEffect(() => {}, []);
  return (
    <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-indigo-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-500" />
          Bảng xếp hạng
        </h3>
        <Link to="/leaderboard" className="text-indigo-600 text-sm font-semibold hover:text-indigo-700">
          Xem đầy đủ
        </Link>
      </div>

      <div className="space-y-3">
        {mockVolunteerRanking.map((volunteer) => (
          <div key={volunteer.rank} className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all duration-200">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              volunteer.rank === 1 ? 'bg-yellow-400 text-white' :
              volunteer.rank === 2 ? 'bg-gray-400 text-white' :
              volunteer.rank === 3 ? 'bg-orange-400 text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              {volunteer.rank}
            </div>
            <img src={volunteer.avatar} alt={volunteer.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-sm">{volunteer.name}</div>
              <div className="text-xs text-gray-500">{volunteer.hours} giờ tình nguyện</div>
            </div>
            {volunteer.rank <= 3 && (
              <Trophy className={`w-4 h-4 ${
                volunteer.rank === 1 ? 'text-yellow-500' :
                volunteer.rank === 2 ? 'text-gray-500' :
                'text-orange-500'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerRankingWidget;