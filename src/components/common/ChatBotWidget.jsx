import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User,
  ChevronDown,
  ChevronUp
} from "lucide-react";
export default function ChatBotWidget({
  title = "Hỗ trợ",
  subtitle = "Gặp vấn đề? Mình giúp nhé!",
  initialOpen = false,
  initialMessages = [
    { id: 1, from: "bot", text: "Xin chào! Mình có thể giúp gì cho bạn hôm nay?" }
  ],
  onSend
}) {
  const [open, setOpen] = useState(initialOpen);
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function addMessage(msg) {
    setMessages((m) => [...m, { id: Date.now(), ...msg }]);
  }

  async function handleSend(e) {
    e?.preventDefault?.();
    const trimmed = text.trim();
    if (!trimmed) return;
    // add user message
    addMessage({ from: "user", text: trimmed });
    setText("");

    // allow parent to handle sending (API, websocket). Show a tiny spinner state.
    try {
      setSending(true);
      if (onSend) {
        const reply = await onSend(trimmed);
        // if parent returns a reply string, show it
        if (typeof reply === "string") {
          addMessage({ from: "bot", text: reply });
        }
      } else {
        // demo bot reply (fallback)
        setTimeout(() => {
          addMessage({ from: "bot", text: "Mình đã nhận được tin nhắn — đang xử lý..." });
        }, 700);
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={`fixed bottom-7 right-3 md:right-10 z-50`}> 
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="w-[320px] md:w-[380px] h-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            role="dialog"
            aria-label="Chat hỗ trợ"
          >
            <header className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 rounded-full p-2">
                  <Bot size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{title}</h4>
                  <p className="text-xs text-gray-500">{subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Đóng chat"
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {/* Messages area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gradient-to-b from-white to-gray-50"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[78%] p-3 rounded-lg ${m.from === "bot" ? "bg-gray-100 text-gray-800" : "bg-indigo-500 text-white"}`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
                    <div className="text-[10px] text-gray-400 mt-1 text-right">{m.from === "bot" ? "Bot" : "Bạn"}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <form onSubmit={handleSend} className="px-3 py-3 border-t bg-white">
              <div className="flex items-center gap-2">
                <input
                  aria-label="Nhập tin nhắn"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 resize-none px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
                  placeholder="Viết tin nhắn..."
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm disabled:opacity-60"
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">Gửi</span>
                </button>
              </div>
              <div className="mt-2 text-[12px] text-gray-400">Nhấn Enter để gửi — Shift+Enter xuống dòng.</div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger */}
      <div className="mt-3 flex items-end justify-end">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Thu gọn chat" : "Mở chat hỗ trợ"}
          className="flex items-center gap-3 p-4 rounded-full shadow-lg bg-indigo-500 hover:bg-fuchsia-500 text-white focus:outline-none"
        >
          <Bot size={24} />
        </motion.button>
      </div>
    </div>
  );
}
