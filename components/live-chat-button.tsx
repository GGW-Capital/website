"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { AnimatePresence, motion } from "framer-motion";

export default function LiveChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatPopupRef = useRef<HTMLDivElement>(null);

  // Phone number for WhatsApp
  const phoneNumber = "971501234567"; // Replace with your actual phone number

  // Toggle chat popup
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle sending WhatsApp message
  const handleSendChat = () => {
    if (chatMessage.trim()) {
      const encodedMessage = encodeURIComponent(chatMessage);
      window.open(
        `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`,
        "_blank"
      );
      setChatMessage("");
    }
  };

  // Handle Enter key press in chat input
  const handleChatKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChat();
    }
  };

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen && chatInputRef.current) {
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 300);
    }
  }, [isChatOpen]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatPopupRef.current &&
        !chatPopupRef.current.contains(event.target as Node)
      ) {
        setIsChatOpen(false);
      }
    };

    if (isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen]);

  return (
    <>
      <GradientButton
        onClick={toggleChat}
        className="w-full text-black"
      >
        Start Live Chat
      </GradientButton>

      {/* Chat Popup */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            ref={chatPopupRef}
            className="fixed top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[350px] max-h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-ggw-gold/30 bg-[#0a0a0a]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-ggw-gradient p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-black/20 mr-3">
                  <Image
                    src="/images/ggw-capital-logo.svg"
                    alt="GGW Capital"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-black">GGW Capital</h3>
                  <p className="text-xs text-black/70">
                    Luxury Real Estate
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-black/70 hover:text-black transition-colors"
                aria-label="Close chat"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-[300px] overflow-y-auto bg-[#0a0a0a] flex flex-col">
              <div className="bg-[#111] rounded-lg p-3 max-w-[80%] mb-4">
                <p className="text-white/90">
                  Hello! Welcome to GGW Capital. How can we assist you with your luxury real estate needs today?
                </p>
                <span className="text-xs text-white/50 mt-1 inline-block">
                  GGW Support • just now
                </span>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-[#D4AF37]/20 bg-[#0a0a0a]">
              <div className="flex gap-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={handleChatKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#111] border border-[#D4AF37]/20 rounded-full px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]/60"
                />
                <button
                  onClick={handleSendChat}
                  className="bg-ggw-gradient w-10 h-10 rounded-full flex items-center justify-center text-black"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-white/50 mt-2 text-center">
                Continue this conversation on WhatsApp
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}