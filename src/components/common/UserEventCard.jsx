import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  User,
  Eye,
  CheckCircle,
  Flag,
  PauseCircle,
  ImageIcon,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

/**
 * EventSummaryCard
 * props:
 *  - event: object chứa dữ liệu event
 *  - state: "list" | "grid"
 */
const EventSummaryCard = ({ event = {}, state = "list" }) => {
  const [isSave, setIsSave] = useState(false);
  const [eventData, setEventData] = useState(event || {});

  useEffect(() => {
    setEventData(event || {});
  }, [event]);

  const handleSave = () => {
    setIsSave((s) => !s);
    // nếu muốn, bạn có thể lưu trạng thái vào localStorage hoặc gọi API ở đây
  };

  // parse flexibel dd/mm/yyyy or ISO
  const parseFlexibleDate = (dateString) => {
    if (!dateString) return null;
    // try ISO
    const iso = Date.parse(dateString);
    if (!isNaN(iso)) return new Date(iso);

    // try dd/mm/yyyy or dd/mm/yyyy, hh:mm
    try {
      const parts = dateString.split(",");
      const datePart = parts[0].trim();
      const timePart = parts[1] ? parts[1].trim() : "00:00";
      const dmy = datePart.split("/");
      if (dmy.length === 3) {
        const [dd, mm, yyyy] = dmy;
        const isoStr = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}T${timePart}`;
        const parsed = Date.parse(isoStr);
        if (!isNaN(parsed)) return new Date(parsed);
      }
    } catch (e) {
      // ignore
    }
    const fallback = new Date(dateString);
    return isNaN(fallback.getTime()) ? null : fallback;
  };

  const formatDate = (dateString) => {
    const d = parseFlexibleDate(dateString);
    if (!d) return dateString ?? "-";
    return d.toLocaleDateString("vi-VN");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    return timeString;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle, text: "Đang tuyển dụng" },
      finish: { color: "bg-gray-100 text-gray-800", icon: Flag, text: "Kết thúc" },
      inactive: { color: "bg-gray-100 text-gray-800", icon: PauseCircle, text: "Dừng tuyển" },
    };
    const config = statusConfig[status] ?? { color: "bg-gray-100 text-gray-800", icon: Flag, text: "Trạng thái" };
    const IconComponent = config.icon;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  // List layout
  const ListCard = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="flex">
        {/* Image */}
        <div className="w-48 h-40 bg-gray-200 relative flex-shrink-0">
          {eventData?.coverImage || eventData?.image ? (
            <img src={eventData?.coverImage ?? eventData?.image} alt={eventData?.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div className="absolute top-2 left-2">{getStatusBadge(eventData?.status)}</div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <Link to={`/events/${eventData?.slug ?? event?.slug}`} className="text-lg font-semibold text-gray-900 line-clamp-2">
              {eventData?.title ?? "Sự kiện"}
            </Link>
            <div className="flex gap-2">
              <button onClick={handleSave} title="Lưu sự kiện" className={`${isSave ? "text-red-500" : "text-gray-600"}`}>
                <Heart size={18} />
              </button>
              <button className="px-4 py-2 flex items-center justify-center text-xs bg-green-600 text-white border border-green-200 rounded-lg">
                Đăng ký
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(eventData?.startDate ?? eventData?.date)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {formatTime(eventData?.startTime ?? "")} {eventData?.endTime ? `- ${formatTime(eventData.endTime)}` : ""}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="truncate">{eventData?.location ?? "-"}</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {eventData?.createdBy ?? "-"}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4 text-gray-500">
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {eventData?.stats?.views ?? eventData?.views ?? 0}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {eventData?.volunteersConfirmed ?? eventData?.volunteers ?? 0}/{eventData?.volunteersRegistered ?? eventData?.capacity ?? "-"}
              </span>
            </div>
            <div className="text-xs text-gray-400">Đăng: {formatDate(eventData?.createdAt ?? eventData?.date)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Grid layout
  const GridCard = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="w-full h-48 bg-gray-200 relative">
        {eventData?.image || eventData?.coverImage ? (
          <img src={eventData?.image ?? eventData?.coverImage} alt={eventData?.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2">{getStatusBadge(eventData?.status)}</div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {(eventData?.category ?? "—").toString().slice(0, 12)}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/events/${eventData?.slug ?? event?.slug}`} className="text-base font-semibold text-gray-900 line-clamp-2 flex-1">
            {eventData?.title ?? "Sự kiện"}
          </Link>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{formatDate(eventData?.startDate ?? eventData?.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>
              {formatTime(eventData?.startTime ?? "")} {eventData?.endTime ? `- ${formatTime(eventData.endTime)}` : ""}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{eventData?.location ?? "-"}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{eventData?.createdBy ?? "-"}</span>
          </div>
        </div>

        <div className="pb-3 flex justify-between items-center text-sm">
          <div className="flex space-x-3 text-gray-500">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {eventData?.stats?.views ?? eventData?.views ?? 0}
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {eventData?.volunteersConfirmed ?? eventData?.volunteers ?? 0}/{eventData?.volunteersRegistered ?? eventData?.capacity ?? "-"}
            </span>
          </div>
        </div>

        <div className="border-t pt-2 flex justify-between items-center">
          <span className="text-xs text-gray-400 my-2">Đăng: {formatDate(eventData?.createdAt ?? eventData?.date)}</span>

          <div className="flex gap-2 items-center">
            <button onClick={handleSave} title="Lưu sự kiện" className={`${isSave ? "text-red-500" : "text-gray-600"}`}>
              <Heart size={18} />
            </button>
            <button className="px-2 py-1 flex items-center justify-center text-xs bg-green-600 text-white border border-green-200 rounded-lg">Đăng ký</button>
          </div>
        </div>
      </div>
    </div>
  );

  return state === "grid" ? <GridCard /> : <ListCard />;
};

export default EventSummaryCard;
