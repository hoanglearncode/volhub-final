import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, 
  Send,
  User,
  Circle
} from "lucide-react";

export default function SimpleChatApp() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock chat data
  const [chats] = useState([
    {
      id: 1,
      name: "Nguyễn Thị Mai",
      lastMessage: "Xin chào!",
      isOnline: true,
      unreadCount: 2
    },
    {
      id: 2,
      name: "Trần Văn Nam",
      lastMessage: "Cảm ơn bạn nhé",
      isOnline: false,
      unreadCount: 0
    },
    {
      id: 3,
      name: "Lê Thị Hoa",
      lastMessage: "Hẹn gặp lại!",
      isOnline: true,
      unreadCount: 1
    }
  ]);

  // Mock messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Xin chào! Bạn khỏe không?",
      sender: "other",
      timestamp: "10:30"
    },
    {
      id: 2,
      content: "Chào bạn! Mình khỏe, cảm ơn bạn.",
      sender: "me",
      timestamp: "10:32"
    },
    {
      id: 3,
      content: "Hôm nay có kế hoạch gì không?",
      sender: "other",
      timestamp: "10:35"
    }
  ]);

  // Simulate proxy connection
  const connectToProxy = () => {
    setIsConnected(true);
    // Simulate connection delay
    setTimeout(() => {
      console.log("Connected to proxy server");
    }, 1000);
  };

  // Send message through proxy
  const sendMessage = async () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      content: messageInput.trim(),
      sender: "me",
      timestamp: new Date().toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    // Add message to UI immediately
    setMessages(prev => [...prev, newMessage]);
    setMessageInput("");

    // Simulate sending through proxy
    try {
      // In real app, this would be actual proxy API call
      await simulateProxyRequest({
        to: selectedChat.id,
        message: newMessage.content,
        timestamp: newMessage.timestamp
      });

      console.log("Message sent through proxy");

      // Simulate receiving a response after delay
      setTimeout(() => {
        const responseMessage = {
          id: Date.now() + 1,
          content: "Tin nhắn đã được gửi qua proxy!",
          sender: "other",
          timestamp: new Date().toLocaleTimeString('vi-VN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);

    } catch (error) {
      console.error("Failed to send message through proxy:", error);
    }
  };

  // Simulate proxy API request
  const simulateProxyRequest = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Proxy request:", data);
        resolve({ success: true });
      }, 500);
    });
  };

  // Handle enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto connect and select first chat
  useEffect(() => {
    connectToProxy();
    if (chats.length > 0) {
      setSelectedChat(chats[0]);
    }
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">{import.meta.env.VITE_NAME}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isConnected ? 'Đã kết nối' : 'Đang kết nối...'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Chat List */}
        <div className="w-1/3 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Danh sách chat</h2>
          </div>
          
          <div className="overflow-y-auto">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <User size={20} className="text-gray-600" />
                    </div>
                    {chat.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800">{chat.name}</h3>
                      {chat.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{selectedChat.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedChat.isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!isConnected}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!messageInput.trim() || !isConnected}
                    className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </div>
                
                {!isConnected && (
                  <p className="text-xs text-red-500 mt-2">
                    Đang kết nối đến proxy server...
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Chọn một cuộc trò chuyện
                </h3>
                <p className="text-gray-500">
                  Chọn người để bắt đầu nhắn tin
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 text-white px-4 py-2 text-xs">
        <div className="flex items-center justify-between">
          <span>Proxy Status: {isConnected ? 'Connected' : 'Connecting...'}</span>
          <span>Messages: {messages.length}</span>
        </div>
      </div>
    </div>
  );
}