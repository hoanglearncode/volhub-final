import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Search, Paperclip, Smile, Image, File } from 'lucide-react';

// ChatMobile.jsx
// Mobile-first, simplified chat UI
// - Drawer-style chat list for small screens
// - Minimal logic: select chat, send text/file messages, basic search
// - No bulk actions, no archived/pinned toggles, no sidebars
// - Accepts `initialChats` and `initialMessagesByChat` via props for easy integration

export default function ChatMobile({ initialChats = null, initialMessagesByChat = null }) {
  // sample minimal data if not provided
  const sampleChats = [
    { id: 1, name: 'Nhóm CTV Khu 1', avatar: 'https://via.placeholder.com/80', lastMessage: 'Meeting 9AM', lastTime: '09:30', unread: 2, online: true, type: 'group' },
    { id: 2, name: 'Trần Thị Mai', avatar: 'https://via.placeholder.com/80', lastMessage: 'Cập nhật báo cáo', lastTime: '13:45', unread: 0, online: true, type: 'direct' }
  ];

  const sampleMessages = {
    1: [
      { id: 1, isOwn: false, sender: 'Nguyễn A', type: 'text', content: 'Sáng mai họp 9h', time: '08:45' },
      { id: 2, isOwn: true, sender: 'Bạn', type: 'text', content: 'Ok, có mặt', time: '08:46' }
    ],
    2: [
      { id: 1, isOwn: false, sender: 'Mai', type: 'text', content: 'Em gửi báo cáo rồi ạ', time: '13:44' }
    ]
  };

  const chatsInit = initialChats || sampleChats;
  const messagesInit = initialMessagesByChat || sampleMessages;

  const [chats, setChats] = useState(chatsInit);
  const [activeChatId, setActiveChatId] = useState(chatsInit[0]?.id ?? null);
  const [messagesByChat, setMessagesByChat] = useState(messagesInit);
  const [messageText, setMessageText] = useState('');
  const [showList, setShowList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const fileRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    // scroll to bottom when active chat messages change
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChatId, messagesByChat]);

  const activeChat = chats.find(c => c.id === activeChatId) || null;
  const activeMessages = messagesByChat[activeChatId] || [];

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setShowList(false);
    // mark as read (local only)
    setChats(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const handleSend = () => {
    const text = messageText.trim();
    if (!text) return;
    const newMsg = { id: Date.now(), isOwn: true, sender: 'Bạn', type: 'text', content: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessagesByChat(prev => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), newMsg] }));
    setMessageText('');
    // update last message on chat list
    setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, lastMessage: text, lastTime: 'Vừa xong' } : c));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    const content = isImage ? URL.createObjectURL(file) : file.name;
    const newMsg = { id: Date.now(), isOwn: true, sender: 'Bạn', type: isImage ? 'image' : 'file', content, fileName: file.name, fileSize: (file.size/1024/1024).toFixed(2)+'MB', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessagesByChat(prev => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), newMsg] }));
    // clear input
    e.target.value = '';
  };

  const filteredChats = chats.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const emojis = ['😊','👍','🎉','❤️','😂','😮'];
  const toggleEmoji = (e) => setMessageText(prev => prev + e);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-14 left-0 right-0 z-20">
        <div className=" mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowList(s => !s)} className="p-2 bg-gray-100 rounded-lg">
              <MessageCircle className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <div className="text-sm font-semibold">Tin nhắn</div>
              <div className="text-xs text-gray-500">{activeChat ? activeChat.name : 'Chọn cuộc trò chuyện'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-100 rounded-lg">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg">
              <SettingsPlaceholder />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pb-28">
        {/* Chat list drawer */}
        {showList && (
          <div className="fixed top-14 inset-0 z-30">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowList(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-full max-w-md bg-white shadow-lg overflow-y-auto">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Cuộc trò chuyện</div>
                </div>
                <div className="mt-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Tìm kiếm" className="w-full pl-10 pr-3 py-2 border rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="p-2">
                {filteredChats.map(chat => (
                  <button key={chat.id} onClick={() => handleSelectChat(chat.id)} className="w-full flex items-center gap-3 p-3 rounded hover:bg-gray-50 text-left">
                    <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium truncate">{chat.name}</div>
                        <div className="text-xs text-gray-400">{chat.lastTime}</div>
                      </div>
                      <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                    </div>
                    {chat.unread > 0 && <div className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">{chat.unread}</div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="mt-4">
          {activeChat ? (
            <div>
              <div className="space-y-3">
                {activeMessages.map(m => (
                  <div key={m.id} className={`${m.isOwn ? 'text-right' : 'text-left'}`}> 
                    <div className={`${m.isOwn ? 'inline-block bg-blue-500 text-white' : 'inline-block bg-gray-100 text-gray-900'} px-4 py-2 rounded-lg max-w-[85%]`}>
                      {m.type === 'text' && <div className="text-sm">{m.content}</div>}
                      {m.type === 'image' && <img src={m.content} alt={m.fileName || 'img'} className="rounded-lg max-w-full h-auto" />}
                      {m.type === 'file' && (
                        <div className="flex items-center gap-2">
                          <File className="w-4 h-4" />
                          <div className="text-sm">{m.fileName}</div>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{m.time}</div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>
            </div>
          ) : (
            <div className="pt-12 text-center text-gray-500">
              <MessageCircle className="w-14 h-14 mx-auto mb-4" />
              <div className="font-medium">Chọn một cuộc trò chuyện</div>
              <div className="text-sm">Mở danh sách để chọn hoặc tạo cuộc trò chuyện mới</div>
            </div>
          )}
        </div>
      </main>

      {/* Input Bar fixed bottom */}
      <div className="fixed left-0 right-0 bottom-18 md:bottom-0 bg-white border-t py-3 px-4 max-w-md mx-auto">
        <div className="flex items-end gap-2">
          <div className="flex items-center gap-1">
            <button onClick={() => fileRef.current?.click()} className="p-2 bg-gray-100 rounded-lg">
              <Paperclip className="w-4 h-4 text-gray-600" />
            </button>
            <button onClick={() => setShowEmoji(s => !s)} className="p-2 bg-gray-100 rounded-lg">
              <Smile className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="flex-1">
            {showEmoji && (
              <div className="bg-white p-2 rounded-lg shadow mb-2 flex gap-2">
                {emojis.map(e => (
                  <button key={e} onClick={() => toggleEmoji(e)} className="text-lg">{e}</button>
                ))}
              </div>
            )}

            <textarea
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              rows={1}
              placeholder="Nhập tin nhắn..."
              className="w-full p-3 border rounded-lg resize-none"
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            />
          </div>

          <button onClick={handleSend} disabled={!messageText.trim()} className="p-3 bg-blue-600 text-white rounded-lg disabled:opacity-50">
            <Send className="w-4 h-4" />
          </button>
        </div>

        <input ref={fileRef} type="file" onChange={handleFile} className="hidden" accept="image/*,.pdf,.doc,.docx" />
      </div>
    </div>
  );
}

// Small placeholder component to avoid bringing Settings icon if not needed
function SettingsPlaceholder() {
  return <div className="w-5 h-5 bg-gray-200 rounded" />;
}
