import React, { useEffect, useState, useMemo } from 'react';
import { Users, Calendar } from 'lucide-react';

export default function LoadingPage({
  title = 'Volhub - Tình nguyện với chúng tôi!',
  subtitle = 'Đang tải dữ liệu — kết nối hệ thống tổ chức các hoạt động tình nguyện..',
  accentColor = 'blue',
  simulate = true,
  onComplete = null,
}) {



  const colors = {
    blue: {
      gradient: 'from-blue-50 via-white to-blue-100',
      circles: ['bg-blue-200', 'bg-blue-300', 'bg-blue-100'],
      icon: 'text-blue-500',
      iconSecondary: 'text-blue-400',
      ring: 'border-blue-500',
      ringSecondary: 'border-blue-400',
      progress: 'from-blue-500 to-blue-400',
      dot: 'bg-blue-500',
      text: 'text-blue-500',
    },
  };

  const theme = colors[accentColor] || colors.blue;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} flex items-center justify-center relative overflow-hidden p-4`}>
      {/* Animated Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute top-12 left-4 w-24 h-24 md:w-64 md:h-64 ${theme.circles[0]} rounded-full mix-blend-multiply filter blur-2xl opacity-30 motion-safe:animate-pulse`} />
        <div className={`absolute top-1/3 right-6 w-28 h-28 md:w-72 md:h-72 ${theme.circles[1]} rounded-full mix-blend-multiply filter blur-2xl opacity-20 motion-safe:animate-pulse`} style={{ animationDelay: '75ms' }} />
        <div className={`absolute bottom-16 left-1/4 w-32 h-32 md:w-80 md:h-80 ${theme.circles[2]} rounded-full mix-blend-multiply filter blur-2xl opacity-36 motion-safe:animate-pulse`} style={{ animationDelay: '150ms' }} />
      </div>

      {/* Main Card */}
      <div
        className="relative z-10 w-full max-w-3xl bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col items-center text-center"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        {/* Icon Container */}
        <div className="relative mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl shadow-lg">
            <div className="relative flex items-center justify-center">
              <Users className={`w-10 h-10 md:w-14 md:h-14 ${theme.icon} motion-safe:animate-bounce`} strokeWidth={1.5} />
            </div>
          </div>

          {/* Pulsing Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`hidden md:block absolute w-28 h-28 rounded-full border-4 ${theme.ring} opacity-20 motion-safe:animate-ping`} />
            <div className={`hidden md:block absolute w-36 h-36 rounded-full border-4 ${theme.ringSecondary} opacity-12 motion-safe:animate-ping`} style={{ animationDelay: '150ms' }} />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-serif text-lg sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          <span className={theme.text}>{title}</span>
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl mb-8 px-2 leading-relaxed">
          {subtitle}
        </p>

        {/* Two Column Layout */}
        <div className="w-full flex items-center justify-center gap-6 md:gap-8 items-start">
          <div className="w-full space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 bg-white/60 rounded-xl shadow-sm border border-white/40 hover:shadow-md transition-shadow"
                >
                  <div 
                    className="w-10 h-10 rounded-lg bg-gray-200 motion-safe:animate-pulse shrink-0"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                  <div className="flex-1 space-y-2">
                    <div 
                      className="h-3 w-5/6 bg-gray-200 rounded motion-safe:animate-pulse"
                      style={{ animationDelay: `${i * 100 + 50}ms` }}
                    />
                    <div 
                      className="h-2 w-1/2 bg-gray-200 rounded motion-safe:animate-pulse"
                      style={{ animationDelay: `${i * 100 + 100}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center md:text-left">
              Đang tải dữ liệu mới!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}