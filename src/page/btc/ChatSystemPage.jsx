import React, { useState, useRef, useEffect } from 'react';
import { 
    MessageCircle, 
    Send, 
    Search, 
    Phone, 
    Video, 
    MoreVertical,
    Paperclip,
    Smile,
    Image,
    File,
    Users,
    Settings,
    Archive,
    Star,
    StarOff,
    Pin,
    PinOff,
    Trash2,
    Edit3,
    Check,
    CheckCheck,
    Clock,
    UserPlus,
    Filter,
    Bell,
    BellOff,
    Download,
    Forward,
    Reply,
    Copy,
    Info,
    Shield,
    AlertTriangle
} from 'lucide-react';

export default function ChatSystemPage() {
    const [selectedChat, setSelectedChat] = useState(1);
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showChatInfo, setShowChatInfo] = useState(false);
    const [activeTab, setActiveTab] = useState('all'); // all, groups, direct, archived
    const [selectedMessages, setSelectedMessages] = useState(new Set());
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messageEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // Mock data for chats
    const [chats, setChats] = useState([
        {
            id: 1,
            name: 'Nhóm CTV Khu vực 1',
            type: 'group',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'Cuộc họp sáng mai lúc 9h nhé các bạn',
            lastMessageTime: '14:30',
            unreadCount: 3,
            online: true,
            pinned: true,
            members: 15,
            lastSender: 'Nguyễn Văn A',
            status: 'active'
        },
        {
            id: 2,
            name: 'Trần Thị Mai',
            type: 'direct',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'Em đã hoàn thành báo cáo tháng này',
            lastMessageTime: '13:45',
            unreadCount: 1,
            online: true,
            pinned: false,
            role: 'CTV',
            department: 'Marketing',
            status: 'active'
        },
        {
            id: 3,
            name: 'TNV Dự án Xanh',
            type: 'group',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'Tài liệu đã được cập nhật trong drive',
            lastMessageTime: '12:15',
            unreadCount: 0,
            online: false,
            pinned: true,
            members: 8,
            lastSender: 'Admin',
            status: 'active'
        },
        {
            id: 4,
            name: 'Lê Minh Tuấn',
            type: 'direct',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'Anh có thể hỗ trợ em về vấn đề này không?',
            lastMessageTime: '11:30',
            unreadCount: 0,
            online: false,
            pinned: false,
            role: 'TNV',
            department: 'Tổ chức sự kiện',
            status: 'active'
        },
        {
            id: 5,
            name: 'Quản lý Admin',
            type: 'group',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'Thông báo: Cập nhật chính sách mới',
            lastMessageTime: 'Hôm qua',
            unreadCount: 0,
            online: true,
            pinned: false,
            members: 5,
            lastSender: 'System',
            status: 'active'
        }
    ]);

    // Mock messages for selected chat
    const [messages, setMessages] = useState([
        {
            id: 1,
            senderId: 2,
            senderName: 'Trần Thị Mai',
            senderAvatar: '/api/placeholder/32/32',
            content: 'Chào anh, em có thể hỏi về quy trình báo cáo không ạ?',
            timestamp: '09:15',
            type: 'text',
            status: 'read',
            isOwn: false
        },
        {
            id: 2,
            senderId: 'me',
            senderName: 'Tôi',
            content: 'Chào Mai, anh sẽ hướng dẫn em chi tiết nhé',
            timestamp: '09:16',
            type: 'text',
            status: 'read',
            isOwn: true
        },
        {
            id: 3,
            senderId: 2,
            senderName: 'Trần Thị Mai',
            senderAvatar: '/api/placeholder/32/32',
            content: 'Em cảm ơn anh ạ! Em đang cần làm báo cáo tháng này',
            timestamp: '09:17',
            type: 'text',
            status: 'read',
            isOwn: false
        },
        {
            id: 4,
            senderId: 'me',
            senderName: 'Tôi',
            content: 'Báo cáo tháng cần có các phần: tổng quan hoạt động, kết quả đạt được, khó khăn gặp phải và kế hoạch tháng sau',
            timestamp: '09:20',
            type: 'text',
            status: 'read',
            isOwn: true
        },
        {
            id: 5,
            senderId: 'me',
            senderName: 'Tôi',
            content: '/api/placeholder/200/150',
            timestamp: '09:21',
            type: 'image',
            status: 'read',
            isOwn: true,
            fileName: 'mau_bao_cao_thang.png'
        },
        {
            id: 6,
            senderId: 2,
            senderName: 'Trần Thị Mai',
            senderAvatar: '/api/placeholder/32/32',
            content: 'Em đã hoàn thành báo cáo tháng này. Anh có thể xem giúp em không ạ?',
            timestamp: '13:45',
            type: 'text',
            status: 'delivered',
            isOwn: false,
            attachments: [
                { name: 'bao_cao_thang_12.docx', size: '2.3MB', type: 'document' }
            ]
        }
    ]);

    const emojis = ['😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🎉', '👏', '🔥', '💯'];

    const filteredChats = chats.filter(chat => {
        const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'all' || 
                          (activeTab === 'groups' && chat.type === 'group') ||
                          (activeTab === 'direct' && chat.type === 'direct') ||
                          (activeTab === 'archived' && chat.status === 'archived');
        return matchesSearch && matchesTab;
    });

    const currentChat = chats.find(chat => chat.id === selectedChat);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage = {
            id: Date.now(),
            senderId: 'me',
            senderName: 'Tôi',
            content: message.trim(),
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            type: 'text',
            status: 'sent',
            isOwn: true
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage('');

        // Update last message in chat list
        setChats(prev => prev.map(chat => 
            chat.id === selectedChat 
                ? { ...chat, lastMessage: message.trim(), lastMessageTime: 'Vừa xong' }
                : chat
        ));
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const newMessage = {
            id: Date.now(),
            senderId: 'me',
            senderName: 'Tôi',
            content: file.type.startsWith('image/') ? URL.createObjectURL(file) : file.name,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            type: file.type.startsWith('image/') ? 'image' : 'file',
            status: 'sent',
            isOwn: true,
            fileName: file.name,
            fileSize: (file.size / 1024 / 1024).toFixed(2) + 'MB'
        };

        setMessages(prev => [...prev, newMessage]);
    };

    const handleEmojiClick = (emoji) => {
        setMessage(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    const handlePinChat = (chatId) => {
        setChats(prev => prev.map(chat => 
            chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
        ));
    };

    const handleArchiveChat = (chatId) => {
        setChats(prev => prev.map(chat => 
            chat.id === chatId 
                ? { ...chat, status: chat.status === 'archived' ? 'active' : 'archived' }
                : chat
        ));
    };

    const MessageStatus = ({ status }) => {
        switch (status) {
            case 'sent':
                return <Check className="w-3 h-3 text-gray-400" />;
            case 'delivered':
                return <CheckCheck className="w-3 h-3 text-gray-400" />;
            case 'read':
                return <CheckCheck className="w-3 h-3 text-blue-500" />;
            default:
                return <Clock className="w-3 h-3 text-gray-400" />;
        }
    };

    const ChatItem = ({ chat }) => (
        <div
            onClick={() => setSelectedChat(chat.id)}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat === chat.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
            }`}
        >
            <div className="relative">
                <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-10 h-10 rounded-full"
                />
                {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
            </div>
            
            <div className="flex-1 ml-3 min-w-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                        {chat.pinned && <Pin className="w-3 h-3 text-gray-400" />}
                        {chat.type === 'group' && <Users className="w-3 h-3 text-gray-400" />}
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                        {chat.unreadCount > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[18px] text-center">
                                {chat.unreadCount}
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 truncate">
                        {chat.type === 'group' && chat.lastSender && (
                            <span className="font-medium">{chat.lastSender}: </span>
                        )}
                        {chat.lastMessage}
                    </p>
                    {chat.type === 'group' && (
                        <span className="text-xs text-gray-400 ml-2">{chat.members} thành viên</span>
                    )}
                </div>
            </div>
        </div>
    );

    const MessageItem = ({ message }) => (
        <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            {!message.isOwn && (
                <img
                    src={message.senderAvatar}
                    alt={message.senderName}
                    className="w-8 h-8 rounded-full mr-2 mt-auto"
                />
            )}
            
            <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-1' : ''}`}>
                {!message.isOwn && currentChat?.type === 'group' && (
                    <p className="text-xs text-gray-500 mb-1 ml-2">{message.senderName}</p>
                )}
                
                <div
                    className={`px-4 py-2 rounded-lg ${
                        message.isOwn
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                    }`}
                >
                    {message.type === 'text' && (
                        <p className="text-sm">{message.content}</p>
                    )}
                    
                    {message.type === 'image' && (
                        <div>
                            <img
                                src={message.content}
                                alt="Uploaded"
                                className="rounded-lg max-w-full h-auto mb-2"
                            />
                            {message.fileName && (
                                <p className="text-xs opacity-75">{message.fileName}</p>
                            )}
                        </div>
                    )}
                    
                    {message.type === 'file' && (
                        <div className="flex items-center space-x-2">
                            <File className="w-4 h-4" />
                            <div>
                                <p className="text-sm">{message.fileName || message.content}</p>
                                {message.fileSize && (
                                    <p className="text-xs opacity-75">{message.fileSize}</p>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {message.attachments && (
                        <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center space-x-2 bg-black bg-opacity-10 rounded p-2">
                                    <File className="w-4 h-4" />
                                    <div className="flex-1">
                                        <p className="text-sm">{attachment.name}</p>
                                        <p className="text-xs opacity-75">{attachment.size}</p>
                                    </div>
                                    <Download className="w-4 h-4 cursor-pointer hover:opacity-75" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className={`flex items-center mt-1 space-x-1 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                    {message.isOwn && <MessageStatus status={message.status} />}
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-gray-900">Tin nhắn</h1>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <UserPlus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm cuộc trò chuyện..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    {[
                        { id: 'all', label: 'Tất cả', count: chats.filter(c => c.status !== 'archived').length },
                        { id: 'groups', label: 'Nhóm', count: chats.filter(c => c.type === 'group' && c.status !== 'archived').length },
                        { id: 'direct', label: 'Trực tiếp', count: chats.filter(c => c.type === 'direct' && c.status !== 'archived').length },
                        { id: 'archived', label: 'Lưu trữ', count: chats.filter(c => c.status === 'archived').length }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-3 px-2 text-sm font-medium text-center border-b-2 transition-colors ${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className="ml-1 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                
                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredChats.length === 0 ? (
                        <div className="p-8 text-center">
                            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">Không tìm thấy cuộc trò chuyện nào</p>
                        </div>
                    ) : (
                        filteredChats.map(chat => (
                            <ChatItem key={chat.id} chat={chat} />
                        ))
                    )}
                </div>
            </div>
            
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedChat && currentChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <img
                                            src={currentChat.avatar}
                                            alt={currentChat.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        {currentChat.online && (
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-900">{currentChat.name}</h2>
                                        <p className="text-sm text-gray-500">
                                            {currentChat.type === 'group' 
                                                ? `${currentChat.members} thành viên`
                                                : currentChat.online ? 'Đang hoạt động' : 'Không hoạt động'
                                            }
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                        <Video className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => setShowChatInfo(!showChatInfo)}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <Info className="w-5 h-5" />
                                    </button>
                                    <div className="relative">
                                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map(message => (
                                <MessageItem key={message.id} message={message} />
                            ))}
                            <div ref={messageEndRef} />
                        </div>
                        
                        {/* Message Input */}
                        <div className="bg-white border-t border-gray-200 p-4">
                            <div className="flex items-end space-x-2">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <Paperclip className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <Image className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <Smile className="w-5 h-5" />
                                        </button>
                                    </div>
                                    
                                    {showEmojiPicker && (
                                        <div className="absolute bottom-20 left-4 bg-white rounded-lg shadow-lg border p-3 grid grid-cols-6 gap-2">
                                            {emojis.map(emoji => (
                                                <button
                                                    key={emoji}
                                                    onClick={() => handleEmojiClick(emoji)}
                                                    className="p-2 hover:bg-gray-100 rounded text-lg"
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                        placeholder="Nhập tin nhắn..."
                                        rows={1}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    />
                                </div>
                                
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                            accept="image/*,.pdf,.doc,.docx,.txt"
                        />
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn một cuộc trò chuyện</h3>
                            <p className="text-gray-500">Chọn cuộc trò chuyện từ danh sách bên trái để bắt đầu nhắn tin</p>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Chat Info Sidebar */}
            {showChatInfo && currentChat && (
                <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
                    <div className="text-center mb-6">
                        <img
                            src={currentChat.avatar}
                            alt={currentChat.name}
                            className="w-20 h-20 rounded-full mx-auto mb-3"
                        />
                        <h3 className="font-semibold text-gray-900">{currentChat.name}</h3>
                        <p className="text-sm text-gray-500">
                            {currentChat.type === 'group' 
                                ? `${currentChat.members} thành viên`
                                : currentChat.role && `${currentChat.role} - ${currentChat.department}`
                            }
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                            <button className="flex flex-col items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                                <Phone className="w-5 h-5 mb-1" />
                                <span className="text-xs">Gọi</span>
                            </button>
                            <button className="flex flex-col items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                                <Video className="w-5 h-5 mb-1" />
                                <span className="text-xs">Video</span>
                            </button>
                            <button className="flex flex-col items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                                <Search className="w-5 h-5 mb-1" />
                                <span className="text-xs">Tìm kiếm</span>
                            </button>
                        </div>
                        
                        <div className="border-t pt-4">
                            <h4 className="font-medium text-gray-900 mb-3">Tùy chọn</h4>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handlePinChat(currentChat.id)}
                                    className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
                                >
                                    {currentChat.pinned ? <PinOff className="w-5 h-5 mr-3" /> : <Pin className="w-5 h-5 mr-3" />}
                                    <span>{currentChat.pinned ? 'Bỏ ghim' : 'Ghim cuộc trò chuyện'}</span>
                                </button>
                                
                                <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg">
                                    <Bell className="w-5 h-5 mr-3" />
                                    <span>Tắt thông báo</span>
                                </button>
                                
                                <button
                                    onClick={() => handleArchiveChat(currentChat.id)}
                                    className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
                                >
                                    <Archive className="w-5 h-5 mr-3" />
                                    <span>{currentChat.status === 'archived' ? 'Bỏ lưu trữ' : 'Lưu trữ'}</span>
                                </button>
                                
                                <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg text-red-600">
                                    <Trash2 className="w-5 h-5 mr-3" />
                                    <span>Xóa cuộc trò chuyện</span>
                                </button>
                            </div>
                        </div>
                        
                        {currentChat.type === 'group' && (
                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">Thành viên ({currentChat.members})</h4>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                                        Xem tất cả
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { name: 'Nguyễn Văn A', role: 'Admin', avatar: '/api/placeholder/32/32', online: true },
                                        { name: 'Trần Thị B', role: 'CTV', avatar: '/api/placeholder/32/32', online: false },
                                        { name: 'Lê Văn C', role: 'TNV', avatar: '/api/placeholder/32/32', online: true },
                                        { name: 'Phạm Thị D', role: 'CTV', avatar: '/api/placeholder/32/32', online: false }
                                    ].map((member, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                                            <div className="relative">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                {member.online && (
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border border-white rounded-full"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 text-sm truncate">{member.name}</p>
                                                <p className="text-xs text-gray-500">{member.role}</p>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-3 p-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium">
                                    + Thêm thành viên
                                </button>
                            </div>
                        )}
                        
                        {currentChat.type === 'direct' && (
                            <div className="border-t pt-4">
                                <h4 className="font-medium text-gray-900 mb-3">Thông tin cá nhân</h4>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-gray-500">Vai trò:</span>
                                        <span className="ml-2 font-medium">{currentChat.role}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Phòng ban:</span>
                                        <span className="ml-2 font-medium">{currentChat.department}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Trạng thái:</span>
                                        <span className="ml-2 flex items-center">
                                            {currentChat.online ? (
                                                <><Online className="w-3 h-3 text-green-500 mr-1" />Đang hoạt động</>
                                            ) : (
                                                <><Offline className="w-3 h-3 text-gray-400 mr-1" />Không hoạt động</>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="border-t pt-4">
                            <h4 className="font-medium text-gray-900 mb-3">Files đã chia sẻ</h4>
                            <div className="space-y-2">
                                {[
                                    { name: 'bao_cao_thang_12.docx', size: '2.3MB', date: '15/12/2024', type: 'document' },
                                    { name: 'hinh_anh_su_kien.jpg', size: '1.8MB', date: '14/12/2024', type: 'image' },
                                    { name: 'danh_sach_ctv.xlsx', size: '856KB', date: '13/12/2024', type: 'spreadsheet' }
                                ].map((file, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                            <File className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 text-sm truncate">{file.name}</p>
                                            <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-3 text-blue-600 hover:text-blue-700 text-sm">
                                Xem tất cả files
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}