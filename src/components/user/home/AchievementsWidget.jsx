import React, { useEffect, useState } from "react";
import { Trophy, CheckCircle } from "lucide-react";
import axios from "axios";

const AchievementsWidget = () => {
    const [mockAchievements, setMockAchievements] = useState( [
        { id: 1, title: "Người mới năng động", description: "Hoàn thành dự án đầu tiên", icon: "🌟", earned: true },
        { id: 2, title: "Tình nguyện viên tận tâm", description: "Tham gia 10 dự án", icon: "❤️", earned: true },
        { id: 3, title: "Nhà lãnh đạo", description: "Dẫn dắt 3 nhóm tình nguyện", icon: "👑", earned: false },
        { id: 4, title: "Chuyên gia môi trường", description: "50 giờ bảo vệ môi trường", icon: "🌱", earned: true },
        { id: 5, title: "Người thầy", description: "Đào tạo 20 tình nguyện viên mới", icon: "📚", earned: false },
        { id: 6, title: "Huyền thoại", description: "1000 giờ tình nguyện", icon: "🏆", earned: false },
    ])
    return (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-100">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Thành tích của bạn
            </h3>
            <span className="text-sm text-gray-600">{mockAchievements.filter(a => a.earned).length}/{mockAchievements.length} đạt được</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
            {mockAchievements.map((achievement) => (
            <div
                key={achievement.id}
                className={`relative p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                achievement.earned
                    ? 'bg-white border-yellow-300 hover:border-yellow-400'
                    : 'bg-gray-50 border-gray-200 opacity-70'
                }`}
                title={achievement.description}
            >
                <div className="text-center">
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <div className="text-xs font-semibold text-gray-700 line-clamp-2">{achievement.title}</div>
                </div>
                {achievement.earned && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                </div>
                )}
            </div>
            ))}
        </div>
        </div>
    );
};
export default AchievementsWidget;