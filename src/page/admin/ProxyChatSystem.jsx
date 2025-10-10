import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle,
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  Building, Phone, Mail, Globe, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, Crown, Zap, Package,
  BarChart3, PlusCircle, ExternalLink, Briefcase, DollarSign,
  Send, Paperclip, Image, Smile, MoreVertical, Archive,
  AlertCircle, Info, UserCheck, UserX, Volume2, VolumeX,
  Lock, Unlock, Copy, Reply, Forward, Bookmark, User
} from 'lucide-react';

/**
 * ProxyChatSystem
 * - Demo admin/moderation interface for proxy chat between partners <-> volunteers.
 * - Mock data stored in component state so UI interactions persist during the session.
 *
 * Note: handlers currently mock (console.log) backend behavior. Replace with API calls as needed.
 */
export default function ProxyChatSystem() {
  const [activeTab, setActiveTab] = useState('active'); // active | flagged | archived | all
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all'); // high_risk | unread | monitored
  const [showChatModal, setShowChatModal] = useState(false);
  const [moderationMode, setModerationMode] = useState(false); // global moderator mode (admin writes)
  const [autoModeration, setAutoModeration] = useState(true);

  // -------------------------
  // Initial mock chats (moved to state)
  // -------------------------
  const [chats, setChats] = useState(() => ([
    {
      id: 'CHAT-001',
      connectionId: 'CNX-001',
      partnerId: 1,
      partnerName: 'UNICEF Việt Nam',
      partnerAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150',
      volunteerId: 12,
      volunteerName: 'Nguyễn Thị Lan',
      volunteerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150',
      eventId: 'EVT-123',
      eventName: 'Chương trình giáo dục trẻ em vùng cao',
      status: 'active',
      lastMessage: 'Cảm ơn chị đã đồng ý tham gia. Chúng tôi sẽ gửi thêm thông tin chi tiết về lịch trình.',
      lastMessageTime: '2024-12-05T14:30:00Z',
      lastMessageBy: 'partner',
      messageCount: 15,
      unreadCount: 2,
      isMonitored: true,
      riskLevel: 'low',
      privacyLevel: 'hidden_contact',
      createdDate: '2024-12-05T10:30:00Z',
      messages: [
        {
          id: 'MSG-001',
          senderId: 1,
          senderType: 'partner',
          senderName: 'UNICEF Việt Nam',
          content: 'Xin chào chị Lan! Cảm ơn chị đã quan tâm đến chương trình giáo dục trẻ em vùng cao của chúng tôi.',
          timestamp: '2024-12-05T10:35:00Z',
          messageType: 'text',
          isModerated: false,
          moderationFlags: [],
          isRead: true
        },
        {
          id: 'MSG-002',
          senderId: 12,
          senderType: 'volunteer',
          senderName: 'Nguyễn Thị Lan',
          content: 'Xin chào! Em rất hứng thú với chương trình này. Có thể cho em biết thêm về thời gian và địa điểm cụ thể không ạ?',
          timestamp: '2024-12-05T10:42:00Z',
          messageType: 'text',
          isModerated: false,
          moderationFlags: [],
          isRead: true
        },
        {
          id: 'MSG-003',
          senderId: 1,
          senderType: 'partner',
          senderName: 'UNICEF Việt Nam',
          content: 'Chương trình sẽ diễn ra từ ngày 15-17/12/2024 tại Sapa, Lào Cai. Chúng tôi sẽ hỗ trợ chi phí di chuyển và lưu trú.',
          timestamp: '2024-12-05T11:15:00Z',
          messageType: 'text',
          isModerated: false,
          moderationFlags: [],
          isRead: true
        },
        {
          id: 'MSG-004',
          senderId: 12,
          senderType: 'volunteer',
          senderName: 'Nguyễn Thị Lan',
          content: 'Nghe tuyệt vời! Em có kinh nghiệm dạy học 3 năm và rất yêu trẻ em. Khi nào em có thể nhận được thông tin chi tiết hơn?',
          timestamp: '2024-12-05T12:20:00Z',
          messageType: 'text',
          isModerated: false,
          moderationFlags: [],
          isRead: true
        },
        {
          id: 'MSG-005',
          senderId: 1,
          senderType: 'partner',
          senderName: 'UNICEF Việt Nam',
          content: 'Cảm ơn chị đã đồng ý tham gia. Chúng tôi sẽ gửi thêm thông tin chi tiết về lịch trình.',
          timestamp: '2024-12-05T14:30:00Z',
          messageType: 'text',
          isModerated: false,
          moderationFlags: [],
          isRead: false
        }
      ],
      moderationSettings: {
        autoModerationEnabled: true,
        keywordFiltering: true,
        contactInfoBlocking: true,
        linkScanning: true,
        imageModeration: false
      },
      participantInfo: {
        partnerTier: 'premium',
        volunteerTrustScore: 4.8,
        connectionApproved: true,
        escalationCount: 0
      }
    },
    {
      id: 'CHAT-002',
      connectionId: 'CNX-002',
      partnerId: 5,
      partnerName: 'Local Community Center',
      partnerAvatar: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150',
      volunteerId: 8,
      volunteerName: 'Trần Văn Minh',
      volunteerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      eventId: 'EVT-124',
      eventName: 'Hỗ trợ người cao tuổi Neo Đơn',
      status: 'flagged',
      lastMessage: 'Anh có thể cho em số điện thoại để liên lạc trực tiếp không?',
      lastMessageTime: '2024-12-04T16:45:00Z',
      lastMessageBy: 'partner',
      messageCount: 8,
      unreadCount: 1,
      isMonitored: true,
      riskLevel: 'high',
      privacyLevel: 'full_hidden',
      createdDate: '2024-12-04T14:20:00Z',
      messages: [
        {
          id: 'MSG-006',
          senderId: 5,
          senderType: 'partner',
          senderName: 'Local Community Center',
          content: 'Chào anh Minh! Cảm ơn anh đã quan tâm đến hoạt động hỗ trợ người cao tuổi của chúng tôi.',
          timestamp: '2024-12-04T14:25:00Z',
          messageType: 'text',
          isModerated: false,
          moderationFlags: [],
          isRead: true
        },
        {
          id: 'MSG-007',
          senderId: 8,
          senderType: 'volunteer',
          senderName: 'Trần Văn Minh',
          content: 'Chào bạn! Tôi muốn tìm hiểu thêm về công việc này. Thời gian làm việc như thế nào?',
          timestamp: '2024-12-04T14:30:00Z',
          messageType: 'text',
          isModerated: false,
          moderationFlags: [],
          isRead: true
        },
        {
          id: 'MSG-008',
          senderId: 5,
          senderType: 'partner',
          senderName: 'Local Community Center',
          content: 'Anh có thể làm linh hoạt, chủ yếu cuối tuần. Chúng tôi sẽ trả công theo giờ.',
          timestamp: '2024-12-04T15:10:00Z',
          messageType: 'text',
          isModerated: true,
          moderationFlags: ['payment_mention'],
          isRead: true
        },
        {
          id: 'MSG-009',
          senderId: 5,
          senderType: 'partner',
          senderName: 'Local Community Center',
          content: 'Anh có thể cho em số điện thoại để liên lạc trực tiếp không?',
          timestamp: '2024-12-04T16:45:00Z',
          messageType: 'text',
          isModerated: true,
          moderationFlags: ['contact_info_request'],
          isRead: false
        }
      ],
      moderationSettings: {
        autoModerationEnabled: true,
        keywordFiltering: true,
        contactInfoBlocking: true,
        linkScanning: true,
        imageModeration: true
      },
      participantInfo: {
        partnerTier: 'unverified',
        volunteerTrustScore: 4.2,
        connectionApproved: false,
        escalationCount: 2
      }
    },
    {
      id: 'CHAT-003',
      connectionId: 'CNX-003',
      partnerId: 2,
      partnerName: 'Samsung Electronics Vietnam',
      partnerAvatar: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150',
      volunteerId: 15,
      volunteerName: 'Lê Thị Hương',
      volunteerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      eventId: 'EVT-125',
      eventName: 'Chương trình STEM cho học sinh',
      status: 'archived',
      lastMessage: 'Cảm ơn chị đã tham gia chương trình! Chúng tôi đã gửi chứng chỉ qua email.',
      lastMessageTime: '2024-12-03T18:30:00Z',
      lastMessageBy: 'partner',
      messageCount: 22,
      unreadCount: 0,
      isMonitored: false,
      riskLevel: 'low',
      privacyLevel: 'partial_hidden',
      createdDate: '2024-12-03T09:15:00Z',
      messages: [],
      moderationSettings: {
        autoModerationEnabled: true,
        keywordFiltering: false,
        contactInfoBlocking: false,
        linkScanning: true,
        imageModeration: false
      },
      participantInfo: {
        partnerTier: 'verified',
        volunteerTrustScore: 4.6,
        connectionApproved: true,
        escalationCount: 0
      }
    }
  ]));

  // -------------------------
  // Stats (mock)
  // -------------------------
  const stats = {
    totalChats: 156,
    activeChats: 45,
    flaggedChats: 12,
    archivedChats: 99,
    totalMessages: 3847,
    moderatedMessages: 156,
    blockedMessages: 23,
    avgResponseTime: 2.4,
    satisfactionScore: 4.3
  };

  // -------------------------
  // Helpers
  // -------------------------
  const getStatusConfig = (status) => {
    const configs = {
      active: { color: 'bg-green-100 text-green-800', label: 'Đang hoạt động', icon: MessageSquare },
      flagged: { color: 'bg-red-100 text-red-800', label: 'Bị gắn cờ', icon: Flag },
      archived: { color: 'bg-gray-100 text-gray-800', label: 'Đã lưu trữ', icon: Archive },
      paused: { color: 'bg-yellow-100 text-yellow-800', label: 'Tạm dừng', icon: Clock }
    };
    return configs[status] || configs.active;
  };

  const getRiskConfig = (level) => {
    const configs = {
      high: { color: 'text-red-600 bg-red-50', label: 'Cao' },
      medium: { color: 'text-orange-600 bg-orange-50', label: 'Trung bình' },
      low: { color: 'text-green-600 bg-green-50', label: 'Thấp' }
    };
    return configs[level] || configs.low;
  };

  const moderationFlagConfig = {
    'contact_info_request': { label: 'Yêu cầu thông tin liên lạc', color: 'bg-red-100 text-red-800' },
    'payment_mention': { label: 'Đề cập thanh toán', color: 'bg-orange-100 text-orange-800' },
    'external_link': { label: 'Liên kết bên ngoài', color: 'bg-yellow-100 text-yellow-800' },
    'inappropriate_content': { label: 'Nội dung không phù hợp', color: 'bg-red-100 text-red-800' },
    'spam_detected': { label: 'Phát hiện spam', color: 'bg-red-100 text-red-800' }
  };

  const getModerationFlags = (flags) => {
    return flags.map(f => moderationFlagConfig[f] || { label: f, color: 'bg-gray-100 text-gray-800' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    const hours = Math.floor(diffInMinutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    return `${days} ngày trước`;
  };

  // -------------------------
  // Filtering / Derived
  // -------------------------
  const filteredChats = useMemo(() => {
    return chats.filter(chat => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch = !q || (
        chat.partnerName.toLowerCase().includes(q) ||
        chat.volunteerName.toLowerCase().includes(q) ||
        chat.eventName.toLowerCase().includes(q) ||
        chat.id.toLowerCase().includes(q)
      );

      let matchesTab = (activeTab === 'all') ? true : chat.status === activeTab;

      let matchesFilter = true;
      if (selectedFilter !== 'all') {
        if (selectedFilter === 'high_risk') matchesFilter = chat.riskLevel === 'high';
        else if (selectedFilter === 'unread') matchesFilter = chat.unreadCount > 0;
        else if (selectedFilter === 'monitored') matchesFilter = chat.isMonitored;
      }

      return matchesSearch && matchesTab && matchesFilter;
    });
  }, [chats, searchTerm, activeTab, selectedFilter]);

  // -------------------------
  // Actions
  // -------------------------
  function openChat(chatId) {
    setSelectedChatId(chatId);
    setShowChatModal(true);

    // mark messages read (mock)
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, unreadCount: 0 } : c));
  }

  function closeChat() {
    setShowChatModal(false);
    setSelectedChatId(null);
  }

  // Very simple auto-detect function (mock) to flag contact info or payment mentions
  function detectModerationFlags(text) {
    const flags = [];
    // rudimentary phone detection: sequence of 7+ digits
    if (/\d{7,}/.test(text)) flags.push('contact_info_request');
    // mention of tiền/chi trả/thuê... (payment)
    if (/\b(điền|tiền|trả|chi trả|thanh toán|tiền công|lương)\b/i.test(text)) flags.push('payment_mention');
    // external link
    if (/https?:\/\/|www\./i.test(text)) flags.push('external_link');
    // spam-like
    if (/free|giveaway|click here/i.test(text)) flags.push('spam_detected');
    // inappropriate words -> simplified example
    if (/\b(thô tục|lăng mạ)\b/i.test(text)) flags.push('inappropriate_content');

    return Array.from(new Set(flags));
  }

  function handleSendMessage(chatId, messageText, from = 'admin') {
    if (!messageText || !chatId) return;
    const newMsg = {
      id: `MSG-${Date.now()}`,
      senderId: 0,
      senderType: from === 'admin' ? 'moderator' : from,
      senderName: from === 'admin' ? 'Moderator' : from,
      content: messageText,
      timestamp: new Date().toISOString(),
      messageType: 'text',
      isModerated: false,
      moderationFlags: [],
      isRead: true
    };

    setChats(prev => prev.map(chat => {
      if (chat.id !== chatId) return chat;

      // auto-moderation detection
      let flags = [];
      if (autoModeration && chat.moderationSettings.autoModerationEnabled) {
        flags = detectModerationFlags(messageText);
      }

      if (flags.length > 0) {
        newMsg.moderationFlags = flags;
        newMsg.isModerated = true;
      }

      const updated = {
        ...chat,
        messages: [...chat.messages, newMsg],
        lastMessage: messageText,
        lastMessageTime: newMsg.timestamp,
        lastMessageBy: newMsg.senderType,
        messageCount: chat.messageCount + 1,
        // if admin sends message, it's considered read; otherwise set unread for volunteer side (mock)
        unreadCount: from === 'admin' ? chat.unreadCount : chat.unreadCount + 1
      };
      return updated;
    }));
  }

  function handleModerationAction(chatId, messageId, action) {
    // action: clear_flags | mark_safe | block_sender | delete
    console.log('Moderation action', { chatId, messageId, action });
    setChats(prev => prev.map(chat => {
      if (chat.id !== chatId) return chat;
      const messages = chat.messages.map(m => {
        if (m.id !== messageId) return m;
        if (action === 'clear_flags') {
          return { ...m, moderationFlags: [], isModerated: false };
        }
        if (action === 'mark_safe') {
          return { ...m, moderationFlags: [], isModerated: false };
        }
        if (action === 'block_sender') {
          // mock: add escalation count
          return { ...m, moderationFlags: [...m.moderationFlags, 'sender_blocked'] };
        }
        if (action === 'delete') {
          return { ...m, content: '[Đã xoá bởi moderator]', moderationFlags: [], isModerated: true };
        }
        return m;
      });
      return { ...chat, messages };
    }));
  }

  function toggleModerationSetting(chatId, key) {
    setChats(prev => prev.map(chat => chat.id === chatId ? {
      ...chat,
      moderationSettings: { ...chat.moderationSettings, [key]: !chat.moderationSettings[key] }
    } : chat));
  }

  function toggleMonitorChat(chatId) {
    setChats(prev => prev.map(chat => chat.id === chatId ? { ...chat, isMonitored: !chat.isMonitored } : chat));
  }

  // Delete message (mock)
  function deleteMessage(chatId, messageId) {
    setChats(prev => prev.map(chat => chat.id === chatId ? {
      ...chat,
      messages: chat.messages.filter(m => m.id !== messageId)
    } : chat));
  }

  // -------------------------
  // Selected chat derived
  // -------------------------
  const selectedChat = useMemo(() => chats.find(c => c.id === selectedChatId) || null, [chats, selectedChatId]);

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proxy Chat System</h1>
          <p className="text-sm text-gray-600 mt-1">Giao diện moderation / proxy chat giữa Đối tác & Tình nguyện viên</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500 text-right">
            <div>Tổng cuộc hội thoại</div>
            <div className="font-semibold">{stats.totalChats}</div>
          </div>

          <button
            onClick={() => setModerationMode(m => !m)}
            className={`px-3 py-2 rounded-md ${moderationMode ? 'bg-blue-600 text-white' : 'border'}`}
            title="Toggle moderator input mode"
          >
            {moderationMode ? 'Moderator ON' : 'Moderator OFF'}
          </button>

          <label className="flex items-center space-x-2 text-sm">
            <span>Tự động kiểm duyệt</span>
            <input type="checkbox" checked={autoModeration} onChange={() => setAutoModeration(v => !v)} className="h-4 w-4" />
          </label>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {[
              { key: 'active', label: `Active (${chats.filter(c => c.status === 'active').length})` },
              { key: 'flagged', label: `Flagged (${chats.filter(c => c.status === 'flagged').length})` },
              { key: 'archived', label: `Archived (${chats.filter(c => c.status === 'archived').length})` },
              { key: 'all', label: 'All' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-2 rounded text-sm ${activeTab === tab.key ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo đối tác, TNV, sự kiện, mã..."
                className="pl-9 pr-3 py-2 border rounded-md w-80"
              />
            </div>

            <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="px-3 py-2 border rounded-md">
              <option value="all">Tất cả bộ lọc</option>
              <option value="high_risk">Rủi ro cao</option>
              <option value="unread">Chưa đọc</option>
              <option value="monitored">Đang theo dõi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chat list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border rounded-lg overflow-hidden h-[70vh]">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="font-medium">Conversations</div>
            <div className="text-sm text-gray-500">{filteredChats.length} kết quả</div>
          </div>

          <div className="overflow-y-auto h-[calc(70vh-56px)]">
            {filteredChats.map(chat => {
              const statusCfg = getStatusConfig(chat.status);
              const riskCfg = getRiskConfig(chat.riskLevel);
              return (
                <div key={chat.id} className="px-4 py-3 border-b hover:bg-gray-50 flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1 cursor-pointer" onClick={() => openChat(chat.id)}>
                    <img src={chat.partnerAvatar} alt={chat.partnerName} className="w-10 h-10 rounded-md object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{chat.partnerName} ↔ {chat.volunteerName}</div>
                          <div className="text-xs text-gray-500">{chat.eventName}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">{getTimeAgo(chat.lastMessageTime)}</div>
                          {chat.unreadCount > 0 && <div className="mt-1 text-xs bg-blue-600 text-white px-2 rounded">{chat.unreadCount}</div>}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-700 truncate">{chat.lastMessage}</div>
                      <div className="mt-2 flex items-center space-x-2 text-xs">
                        <span className={`px-2 py-0.5 rounded-full ${statusCfg.color}`}>{statusCfg.label}</span>
                        <span className={`px-2 py-0.5 rounded-full ${riskCfg.color}`}>Risk: {riskCfg.label}</span>
                        {chat.isMonitored && <span className="px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-800">Monitored</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center ml-3 space-x-2">
                    <button title="Toggle monitor" onClick={() => toggleMonitorChat(chat.id)} className="p-2 rounded hover:bg-gray-100">
                      {chat.isMonitored ? <Shield className="w-4 h-4 text-yellow-600" /> : <Shield className="w-4 h-4 text-gray-400" />}
                    </button>
                    <button title="Open" onClick={() => openChat(chat.id)} className="p-2 rounded hover:bg-gray-100">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredChats.length === 0 && (
              <div className="p-6 text-center text-gray-500">Không có cuộc trò chuyện nào phù hợp</div>
            )}
          </div>
        </div>

        {/* Right panels: quick stats + last actions */}
        <div className="col-span-2 grid grid-rows-[auto_auto] gap-6">
          <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Tổng tin nhắn</div>
              <div className="text-2xl font-semibold">{stats.totalMessages}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Tin đã kiểm duyệt</div>
              <div className="text-2xl font-semibold">{stats.moderatedMessages}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Blocked</div>
              <div className="text-2xl font-semibold">{stats.blockedMessages}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Satisfaction</div>
              <div className="text-2xl font-semibold">{stats.satisfactionScore} / 5</div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4 h-[calc(70vh-72px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="font-medium">Hoạt động gần đây</div>
              <div className="text-sm text-gray-500">Realtime (mock)</div>
            </div>

            {/* Recent sample actions (mock) */}
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="p-2 bg-blue-50 rounded-md">
                  <Send className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm"><strong>Moderator</strong> gửi tin nhắn can thiệp trong <strong>CHAT-001</strong></div>
                  <div className="text-xs text-gray-500">2 phút trước</div>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <div className="p-2 bg-orange-50 rounded-md">
                  <Flag className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-sm">Hệ thống gắn cờ tin nhắn có chứa <em>số điện thoại</em> trong <strong>CHAT-002</strong></div>
                  <div className="text-xs text-gray-500">1 giờ trước</div>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <div className="p-2 bg-gray-50 rounded-md">
                  <Archive className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm">Cuộc trò chuyện <strong>CHAT-003</strong> được lưu trữ</div>
                  <div className="text-xs text-gray-500">Hôm qua</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && selectedChat && (
        <ChatDetailModal
          chat={selectedChat}
          onClose={closeChat}
          onSend={(msg) => handleSendMessage(selectedChat.id, msg, 'admin')}
          onModerationAction={(messageId, action) => handleModerationAction(selectedChat.id, messageId, action)}
          onToggleSetting={(key) => toggleModerationSetting(selectedChat.id, key)}
          moderationMode={moderationMode}
        />
      )}
    </div>
  );
}

/* -------------------------
   ChatDetailModal component
   ------------------------- */
function ChatDetailModal({ chat, onClose, onSend, onModerationAction, onToggleSetting, moderationMode }) {
  const [newMessage, setNewMessage] = useState('');
  const [showModerationPanel, setShowModerationPanel] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat.messages]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] overflow-hidden grid grid-cols-1 lg:grid-cols-3">
        {/* Main chat area */}
        <div className={`lg:col-span-2 flex flex-col`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <img src={chat.partnerAvatar} alt={chat.partnerName} className="w-10 h-10 rounded-md object-cover" />
              <div>
                <div className="font-medium">{chat.partnerName} ↔ {chat.volunteerName}</div>
                <div className="text-xs text-gray-500">{chat.eventName}</div>
              </div>
              <div className="ml-4">
                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadge(chat.status)}`}>{getStatusLabel(chat.status)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button onClick={() => setShowModerationPanel(s => !s)} className={`px-3 py-1 rounded ${showModerationPanel ? 'bg-blue-600 text-white' : 'border'}`}>
                <Shield className="w-4 h-4" /> Kiểm duyệt
              </button>
              <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chat.messages.length === 0 && (
              <div className="text-center text-gray-500 mt-12">Không có tin nhắn trong cuộc trò chuyện này</div>
            )}

            {chat.messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.senderType === 'partner' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[70%] ${msg.senderType === 'partner' ? 'order-2' : 'order-1'}`}>
                  <div className={`relative px-4 py-2 rounded-lg ${msg.senderType === 'partner' ? 'bg-white text-gray-900' : 'bg-blue-600 text-white'}`}>
                    {msg.isModerated && (
                      <div className="absolute -top-2 -right-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      </div>
                    )}

                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>

                    {msg.moderationFlags && msg.moderationFlags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {getModerationFlags(msg.moderationFlags).map((f, i) => (
                          <span key={i} className={`px-2 py-1 text-xs rounded-full ${f.color}`}>{f.label}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-1 text-xs opacity-70">
                      <span>{msg.senderName}</span>
                      <div className="flex items-center space-x-2">
                        <span>{formatDate(msg.timestamp)}</span>
                        <div className="relative">
                          <button className="p-1 hover:bg-gray-100 rounded" title="More">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 top-6 bg-white border rounded shadow-sm hidden group-hover:block">
                            {/* optional menu */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${msg.senderType === 'partner' ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                  <img src={msg.senderType === 'partner' ? chat.partnerAvatar : chat.volunteerAvatar} alt={msg.senderName} className="w-7 h-7 rounded-full" />
                </div>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          {/* Admin input (moderationMode controls whether admin can send) */}
          {moderationMode && (
            <div className="border-t p-4 bg-white">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Gửi tin nhắn can thiệp (Moderator)..."
                  className="flex-1 px-3 py-2 border rounded-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newMessage.trim()) {
                      onSend(newMessage.trim());
                      setNewMessage('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (!newMessage.trim()) return;
                    onSend(newMessage.trim());
                    setNewMessage('');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Moderation panel */}
        <div className="border-l p-4 bg-gray-50 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Moderation & Settings</h4>
            <div className="text-xs text-gray-500">{chat.messages.length} messages</div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Auto moderation</div>
                  <div className="text-xs text-gray-500">Bật/tắt chế độ kiểm duyệt tự động cho cuộc trò chuyện này</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chat.moderationSettings.autoModerationEnabled}
                    onChange={() => onToggleSetting('autoModerationEnabled')}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-transform peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Keyword filtering</div>
                  <div className="text-xs text-gray-500">Lọc từ khóa nguy hiểm / vi phạm</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chat.moderationSettings.keywordFiltering}
                    onChange={() => onToggleSetting('keywordFiltering')}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-transform peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Contact info blocking</div>
                  <div className="text-xs text-gray-500">Tự động chặn / gắn cờ khi xuất hiện số điện thoại / email</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chat.moderationSettings.contactInfoBlocking}
                    onChange={() => onToggleSetting('contactInfoBlocking')}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-transform peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Link scanning</div>
                  <div className="text-xs text-gray-500">Phát hiện đường link / external content</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chat.moderationSettings.linkScanning}
                    onChange={() => onToggleSetting('linkScanning')}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-transform peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <h5 className="font-medium mb-2">Participant Info</h5>
              <div className="text-sm text-gray-700 mb-2">{chat.partnerName} • {chat.participantInfo.partnerTier}</div>
              <div className="text-sm text-gray-700">Volunteer: {chat.volunteerName} • Trust: {chat.participantInfo.volunteerTrustScore}</div>
              {chat.participantInfo.escalationCount > 0 && <div className="mt-2 text-xs text-red-600">{chat.participantInfo.escalationCount} cảnh báo</div>}
            </div>

            <div className="bg-white p-3 rounded-lg">
              <h5 className="font-medium mb-2">Quick moderation</h5>
              <div className="grid grid-cols-1 gap-2">
                <button className="px-3 py-2 border rounded text-sm" onClick={() => alert('Flagged chat (mock)')}>Flag chat</button>
                <button className="px-3 py-2 border rounded text-sm" onClick={() => alert('Escalated to safety team (mock)')}>Escalate</button>
                <button className="px-3 py-2 border rounded text-sm" onClick={() => alert('Export transcript (mock)')}>Export transcript</button>
              </div>
            </div>

            {/* If a moderator wants to act on each message, they can via the message UI '...' or via selecting a message */}
            <div className="text-xs text-gray-500 mt-4">Lưu ý: Hành động hiện là mock — thay bằng API gọi backend để thực thi.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------
   Small helpers used in render
   ------------------------- */
function getStatusBadge(status) {
  const map = {
    active: 'bg-green-100 text-green-800',
    flagged: 'bg-red-100 text-red-800',
    archived: 'bg-gray-100 text-gray-800',
    paused: 'bg-yellow-100 text-yellow-800'
  };
  return map[status] || map.active;
}
function getStatusLabel(status) {
  const map = {
    active: 'Đang hoạt động',
    flagged: 'Bị gắn cờ',
    archived: 'Đã lưu trữ',
    paused: 'Tạm dừng'
  };
  return map[status] || 'Đang hoạt động';
}
function getModerationFlags(flags) {
  const cfg = {
    contact_info_request: { label: 'Yêu cầu thông tin liên lạc', color: 'bg-red-100 text-red-800' },
    payment_mention: { label: 'Đề cập thanh toán', color: 'bg-orange-100 text-orange-800' },
    external_link: { label: 'Liên kết bên ngoài', color: 'bg-yellow-100 text-yellow-800' },
    inappropriate_content: { label: 'Nội dung không phù hợp', color: 'bg-red-100 text-red-800' },
    spam_detected: { label: 'Phát hiện spam', color: 'bg-red-100 text-red-800' }
  };
  return flags.map(f => cfg[f] || { label: f, color: 'bg-gray-100 text-gray-800' });
}
function formatDate(dateString) {
  if (!dateString) return '-';
  try {
    return new Date(dateString).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return dateString;
  }
}
