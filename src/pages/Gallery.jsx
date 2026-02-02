import React, { useMemo, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import ImageCard from "../components/ImageCard";
import FullscreenPreview from "../components/FullscreenPreview";

export default function Gallery({
  images = [],     // ✅ default value
  isAdmin,
  onDelete,
  onLike,
}) {
  const [selected, setSelected] = useState(null);

  // ✅ make it safe even if images is null/undefined/object
  const safeImages = Array.isArray(images) ? images : [];

  const sortedImages = useMemo(() => {
    return [...safeImages].sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );
  }, [safeImages]);

  return (
    <PageWrapper>
      <div className="section">
        <div className="section-head">
          <h2>Gallery</h2>
          {isAdmin && <div className="note">Admin mode enabled ✅</div>}
        </div>

        {!sortedImages.length ? (
          <div className="empty">
            <h3>No photos yet</h3>
            <p>Admin can upload photos.</p>
          </div>
        ) : (
          <div className="p-grid">
            {sortedImages.map((img) => (
              <div key={img.id} className="p-item">
                <div className="p-card">
                  <ImageCard
                    img={img}
                    onOpen={() => setSelected(img)}
                    onLike={() => onLike?.(img)}   // ✅ optional safe call
                  />
                </div>

                {isAdmin && (
                  <button className="p-delete" onClick={() => onDelete?.(img)}>
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ✅ Fullscreen Preview */}
        {selected && (
          <FullscreenPreview
            img={selected}
            onClose={() => setSelected(null)}
            onLike={() => onLike?.(selected)}   // ✅ safe call
          />
        )}
      </div>
    </PageWrapper>
  );
}
