import { MessageCircle } from "lucide-react";
import { waGeneral } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={waGeneral}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-transform hover:scale-105"
      style={{ backgroundImage: "linear-gradient(135deg,#2fdd6f,#1faa55)" }}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
      <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
    </a>
  );
}
