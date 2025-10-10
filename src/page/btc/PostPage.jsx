import { useEffect, useState } from "react";
import { 
  Mail, 
  User, 
  Calendar, 
  FileText, 
  Search, 
  Filter, 
  Star, 
  Archive, 
  Trash2, 
  Reply, 
  Forward, 
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  UserCheck,
  Briefcase,
  Send,
  X
} from 'lucide-react';

export default function PostBoxPage() {
    const [postData, setPostData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(200);
    const [isError, setIsError] = useState(false);

    const [active, setActive] = useState('all');
    const [visibleData, setVisibleData] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showEmailModal, setShowEmailModal] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);
        
        try {
            const value = {};
            if (value.success) {
                setPostData(value.data);
                setVisibleData(value.data); // Set initial visible data
            }
            setIsError(!value.success);
        } catch (error) {
            setIsError(true);
            setStatus(404);
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterData = () => {
        let filtered = postData;

        // Apply category filter
        switch (active) {
            case 'important':
                filtered = postData.filter((e) => e.isImportant);
                break;
            case 'unread':
                filtered = postData.filter((e) => !e.isRead);
                break;
            case 'sent':
                filtered = postData.filter((e) => e.type === 'sent');
                break;
            case 'trash':
                filtered = postData.filter((e) => e.isDeleted);
                break;
            default:
                filtered = postData.filter((e) => !e.isDeleted);
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(item => 
                item.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.content?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setVisibleData(filtered);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'new': return 'bg-green-100 text-green-800';
            case 'review': return 'bg-blue-100 text-blue-800';
            case 'scheduled': return 'bg-purple-100 text-purple-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityIcon = (priority) => {
        switch(priority) {
            case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
            default: return null;
        }
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case 'application': return <FileText className="w-4 h-4 text-blue-500" />;
            case 'interview': return <Calendar className="w-4 h-4 text-purple-500" />;
            case 'followup': return <Reply className="w-4 h-4 text-green-500" />;
            case 'sent': return <Send className="w-4 h-4 text-gray-500" />;
            default: return <Mail className="w-4 h-4 text-gray-500" />;
        }
    };

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
        setShowEmailModal(true);
        
        // Mark as read if not already read
        if (!email.isRead) {
            // Update local state
            const updatedData = postData.map(item => 
                item.id === email.id ? { ...item, isRead: true } : item
            );
            setPostData(updatedData);
            
            // TODO: Call API to mark as read
            // postBoxService.markAsRead(email.id);
        }
    };

    const handleMarkImportant = (emailId) => {
        const updatedData = postData.map(item => 
            item.id === emailId ? { ...item, isImportant: !item.isImportant } : item
        );
        setPostData(updatedData);
        // TODO: Call API to update importance
    };

    const handleDelete = (emailId) => {
        const updatedData = postData.map(item => 
            item.id === emailId ? { ...item, isDeleted: true } : item
        );
        setPostData(updatedData);
        // TODO: Call API to delete
    };

    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Vừa xong';
        if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} giờ trước`;
        return `${Math.floor(diff / 86400000)} ngày trước`;
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [active, postData, searchTerm]);

    const filterButtons = [
        { key: 'all', label: 'Tất cả', icon: Mail },
        { key: 'important', label: 'Quan trọng', icon: Star },
        { key: 'unread', label: 'Chưa đọc', icon: Eye },
        { key: 'sent', label: 'Đã gửi', icon: Send },
        { key: 'trash', label: 'Thùng rác', icon: Trash2 }
    ];

    return (
        <div className="bg-gray-50 w-full min-h-screen transition-all duration-300">
            {/* Content */}
            <div className="px-3 w-full h-full overflow-y-auto pb-8">
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ): (
                    <div className="max-w-7xl mx-auto py-4">
                        <div className="mt-3 space-y-6 bg-white w-full h-full rounded-lg shadow-sm">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-6">
                                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        <Briefcase className="w-6 h-6 text-blue-600" />
                                        Hộp thư tuyển dụng
                                    </h1>
                                    
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                                            <Filter className="w-4 h-4 text-gray-500" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                                            <MoreHorizontal className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>

                                {/* Search */}
                                <div className="relative mb-6">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm email, ứng viên..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Filter Buttons */}
                                <div className="flex gap-2 overflow-x-auto py-2">
                                    {filterButtons.map((btn) => {
                                        const IconComponent = btn.icon;
                                        return (
                                            <button
                                                key={btn.key}
                                                onClick={() => setActive(btn.key)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                                                    active === btn.key
                                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                <IconComponent className="w-4 h-4" />
                                                {btn.label}
                                                {btn.key === 'unread' && (
                                                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                                                        {postData.filter(item => !item.isRead && !item.isDeleted).length}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Email List */}
                            <div className="px-6 py-3">
                                <div className="mb-4">
                                    <span className="text-sm text-gray-600">
                                        Hiển thị {visibleData.length} email
                                    </span>
                                </div>

                                {visibleData.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                                            Không có email nào
                                        </h3>
                                        <p className="text-gray-600">
                                            {active === 'all' ? 'Hộp thư của bạn đang trống' : `Không có email nào trong danh mục "${filterButtons.find(b => b.key === active)?.label}"`}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {visibleData.map(item => (
                                            <div
                                                key={item.id}
                                                onClick={() => handleEmailClick(item)}
                                                className={`p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                                                    !item.isRead ? 'bg-blue-25 border-blue-200' : 'bg-white'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                            <User className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className={`font-medium ${!item.isRead ? 'font-bold' : ''}`}>
                                                                {item.sender || item.from || 'Người gửi không xác định'}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {item.senderEmail || item.email || 'email@example.com'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleMarkImportant(item.id);
                                                            }}
                                                            className="p-1 hover:bg-gray-200 rounded"
                                                        >
                                                            <Star 
                                                                className={`w-4 h-4 ${
                                                                    item.isImportant 
                                                                        ? 'text-yellow-500 fill-current' 
                                                                        : 'text-gray-400'
                                                                }`} 
                                                            />
                                                        </button>
                                                        {getPriorityIcon(item.priority)}
                                                        <span className="text-xs text-gray-500">
                                                            {formatTime(item.createdAt || item.time)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mb-2">
                                                    {getTypeIcon(item.type)}
                                                    <span className={`text-sm font-medium ${!item.isRead ? 'font-bold' : ''}`}>
                                                        {item.subject || 'Không có tiêu đề'}
                                                    </span>
                                                </div>

                                                <div className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {item.preview || item.content || 'Nội dung email...'}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        {item.status && (
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                                                {item.status === 'new' && 'Mới'}
                                                                {item.status === 'review' && 'Đang xem xét'}
                                                                {item.status === 'scheduled' && 'Đã lên lịch'}
                                                                {item.status === 'completed' && 'Hoàn thành'}
                                                                {item.status === 'pending' && 'Chờ phản hồi'}
                                                            </span>
                                                        )}
                                                        {item.position && (
                                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                                {item.position}
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-2">
                                                        {item.attachments > 0 && (
                                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                <FileText className="w-3 h-3" />
                                                                {item.attachments}
                                                            </div>
                                                        )}
                                                        
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(item.id);
                                                            }}
                                                            className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-500"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {item.tags && item.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {item.tags.slice(0, 3).map((tag, index) => (
                                                            <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {item.tags.length > 3 && (
                                                            <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                                                                +{item.tags.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Email Detail Modal */}
            {showEmailModal && selectedEmail && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {selectedEmail.sender || selectedEmail.from || 'Người gửi'}
                                    </h2>
                                    <p className="text-gray-600">
                                        {selectedEmail.senderEmail || selectedEmail.email || ''}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                    <Reply className="w-4 h-4" />
                                    Trả lời
                                </button>
                                <button 
                                    onClick={() => setShowEmailModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {selectedEmail.subject || 'Không có tiêu đề'}
                                </h3>
                                <div className="text-sm text-gray-500 mb-4">
                                    Thời gian: {formatTime(selectedEmail.createdAt || selectedEmail.time)}
                                </div>
                            </div>

                            <div className="prose max-w-none">
                                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedEmail.content || selectedEmail.preview || 'Nội dung email...'}
                                </div>
                            </div>

                            {/* Attachments */}
                            {selectedEmail.attachments > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Tệp đính kèm ({selectedEmail.attachments})
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                                    <FileText className="w-4 h-4 text-red-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">CV_Document.pdf</div>
                                                    <div className="text-xs text-gray-500">1.2 MB</div>
                                                </div>
                                            </div>
                                            <button className="p-2 hover:bg-gray-200 rounded-lg">
                                                <Download className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                                    <UserCheck className="w-4 h-4" />
                                    Chấp nhận
                                </button>
                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                                    <XCircle className="w-4 h-4" />
                                    Từ chối
                                </button>
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Lên lịch PV
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                    <Archive className="w-4 h-4 text-gray-500" />
                                </button>
                                <button 
                                    onClick={() => {
                                        handleDelete(selectedEmail.id);
                                        setShowEmailModal(false);
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <Trash2 className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}