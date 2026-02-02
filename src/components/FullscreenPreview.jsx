import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FullscreenPreview({ img, onClose, onLike }) {
  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fs-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="fs-pane"
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Controls */}
          <div className="fs-top">
            <button className="fs-close" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Image */}
          <div className="fs-body">
            <img src={img.url} alt="fullscreen" className="fs-img" />
          </div>

          {/* Like bar */}
          <div className="fs-actions">
            <button className="fs-like" onClick={onLike}>
              ❤️ Like <span>({img.likes || 0})</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
