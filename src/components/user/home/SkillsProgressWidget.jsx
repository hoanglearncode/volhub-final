import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Target } from "lucide-react";
import axios from "axios";
const SkillsProgressWidget = () => {
  const [mockSkills, setMockSkills] = useState([
    { name: "Giao tiếp", level: 85, icon: "💬" },
    { name: "Làm việc nhóm", level: 92, icon: "👥" },
    { name: "Lãnh đạo", level: 78, icon: "👑" },
    { name: "Giải quyết vấn đề", level: 88, icon: "🧠" },
    { name: "Quản lý thời gian", level: 75, icon: "⏰" },
    { name: "Sáng tạo", level: 90, icon: "✨" },
  ]);
  useEffect(() => {}, []);
  return (
    <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-500" />
          Kỹ năng phát triển
        </h3>
        <Link to="/profile" className="text-orange-600 text-sm font-semibold hover:text-orange-700">
          Xem hồ sơ
        </Link>
      </div>

      <div className="space-y-4">
        {mockSkills.map((skill, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{skill.icon}</span>
                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsProgressWidget;