import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImagePreviewModal({ img, onClose, onLike }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 1));
  const resetZoom = () => setZoom(1);

  return (
    <AnimatePresence>
      <motion.div
        className="preview-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="preview-pane"
          initial={{ scale: 0.96, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="preview-top">
            <button className="preview-close" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Image */}
          <div className="preview-body">
            <div className="preview-img-wrap">
              <img
                src={img.url}
                alt="preview"
                className="preview-img"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            {/* Controls */}
            <div className="preview-controls">
              <button onClick={zoomOut} className="control-btn">
                ➖
              </button>
              <button onClick={resetZoom} className="control-btn">
                Reset
              </button>
              <button onClick={zoomIn} className="control-btn">
                ➕
              </button>

              <button onClick={onLike} className="control-like">
                ❤️ Like <span>({img.likes || 0})</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
