import React from "react";

export default function ImageCard({ img, onOpen, onLike }) {
  if (!img) return null;

  return (
    <div className="pin-wrap" onClick={onOpen}>
      <img
        src={img.url}
        alt="portfolio"
        className="p-img"
        loading="lazy"
      />

      {/* Like icon */}
      <button
        className="like-btn"
        onClick={(e) => {
          e.stopPropagation();
          onLike?.();
        }}
        title="Like"
      >
        ❤️ <span className="like-count">{img.likes || 0}</span>
      </button>
    </div>
  );
}
