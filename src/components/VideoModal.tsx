import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoplayMuted?: boolean;
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      // If the modal was opened by autoplay, mute to satisfy autoplay policies.
      if ((videoRef.current as HTMLVideoElement).muted !== !!autoplayMuted) {
        videoRef.current.muted = !!autoplayMuted;
      }
      const p = videoRef.current.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    }
  }, [isOpen, autoplayMuted]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Premium Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-14 right-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </button>

            {/* Video container with premium frame */}
            <div className="rounded-3xl overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] border border-white/5 bg-black">
              <video
                  ref={videoRef}
                  src="/demo-video.mp4"
                  poster="/logo.jpg"
                  preload="metadata"
                  className="w-full aspect-video"
                  controls
                  playsInline
                />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
