"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }));
    // Clear error when user makes a selection
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Success handling
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Your message has been sent successfully!");

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "",
          message: "",
        });
      }, 3000);
    } catch (err) {
      setIsSubmitting(false);
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Contact form error:", err);
    }
  };

  return (
    <>
      {error && (
        <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded-md text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">
            Full Name
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="bg-transparent border-[#D4AF37]/30 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">
            Email Address
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            className="bg-transparent border-[#D4AF37]/30 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">
            Phone Number
          </label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className="bg-transparent border-[#D4AF37]/30 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">
            I'm interested in
          </label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="bg-transparent border-[#D4AF37]/30 text-white">
              <SelectValue placeholder="Select your interest" />
            </SelectTrigger>
            <SelectContent className="bg-black border-[#D4AF37]/30 text-white">
              <SelectItem value="buying">Buying a property</SelectItem>
              <SelectItem value="renting">
                Renting a property
              </SelectItem>
              <SelectItem value="offplan">
                Off-plan investment
              </SelectItem>
              <SelectItem value="company">
                Setting up a UAE company
              </SelectItem>
              <SelectItem value="other">Other services</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">
            Message
          </label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your requirements"
            rows={4}
            className="bg-transparent border-[#D4AF37]/30 text-white resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-ggw-gradient text-black hover:bg-ggw-gradient-hover flex items-center justify-center gap-2"
          disabled={isSubmitting || isSubmitted}
        >
          {isSubmitting ? (
            "Sending..."
          ) : isSubmitted ? (
            "Message Sent!"
          ) : (
            <>
              <Send className="h-4 w-4" /> Send Message
            </>
          )}
        </Button>
      </form>
    </>
  );
}