"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, User } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

// Static WhatsApp chat component - no CMS integration
export default function WhatsAppChat() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  
  // Don't render the WhatsApp chat on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // Static phone number for WhatsApp
  const phoneNumber = "971501234567"

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSend = () => {
    if (message.trim()) {
      const encodedMessage = encodeURIComponent(message)
      window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, "_blank")
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-ggw-gradient shadow-lg flex items-center justify-center animate-shimmer bg-[length:200%_100%] hover:scale-105 transition-transform"
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with us on WhatsApp"
      >
        <MessageSquare className="h-7 w-7 text-black" />
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            className="fixed bottom-28 right-8 z-40 w-4/5 md:w-[350px] max-h-[70vh] overflow-y-auto rounded-2xl overflow-hidden shadow-2xl border border-ggw-gold/30 bg-[#0a0a0a]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-ggw-gradient p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-black/20 mr-3">
                  <Image src="/images/ggw-capital-logo.svg" alt="GGW Capital" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-black">GGW Capital</h3>
                  <p className="text-xs text-black/70">Luxury Real Estate</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black/70 hover:text-black transition-colors"
                aria-label="Close chat"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-[300px] overflow-y-auto bg-[#0a0a0a] flex flex-col">
              {/* Welcome Message */}
              <div className="flex mb-4">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-ggw-gold/20 flex items-center justify-center mr-2 flex-shrink-0">
                  <Image src="/images/ggw-capital-logo.svg" alt="GGW Capital" fill className="object-cover" />
                </div>
                <div className="bg-[#111] rounded-lg rounded-tl-none p-3 max-w-[80%]">
                  <p className="text-white text-sm">
                    Welcome to GGW Capital! How can we assist you with your luxury real estate needs today?
                  </p>
                  <span className="text-[10px] text-white/50 mt-1 block">
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>

              {/* User Message Preview */}
              {message && (
                <div className="flex justify-end mb-4">
                  <div className="bg-ggw-gold/20 rounded-lg rounded-tr-none p-3 max-w-[80%]">
                    <p className="text-white text-sm">{message}</p>
                  </div>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-ggw-gold/10 flex items-center justify-center ml-2 flex-shrink-0">
                    <User className="h-4 w-4 text-ggw-gold" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-ggw-gold/20 bg-[#0a0a0a] flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-[#111] border border-ggw-gold/20 rounded-full py-2 px-4 text-white placeholder:text-white/50 focus:outline-none focus:border-ggw-gold/50"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className={`ml-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  message.trim() ? "bg-ggw-gradient text-black" : "bg-ggw-gold/20 text-white/50"
                }`}
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}