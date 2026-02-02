import React, { useMemo, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import ImageCard from "../components/ImageCard";
import FullscreenPreview from "../components/FullscreenPreview";

export default function Gallery({ images = [], isAdmin, onDelete, onLike }) {
  const [selected, setSelected] = useState(null);

  // ✅ SPEED: Only load first 20 images
  const [limit, setLimit] = useState(20);

  const safeImages = Array.isArray(images) ? images : [];

  const sortedImages = useMemo(() => {
    return [...safeImages].sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );
  }, [safeImages]);

  // ✅ Only show limited images
  const visibleImages = useMemo(() => {
    return sortedImages.slice(0, limit);
  }, [sortedImages, limit]);

  const canLoadMore = visibleImages.length < sortedImages.length;

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
          <>
            {/* ✅ Pinterest grid */}
            <div className="p-grid">
              {visibleImages.map((img) => (
                <div key={img.id} className="p-item">
                  <div className="p-card">
                    <ImageCard
                      img={img}
                      onOpen={() => setSelected(img)}
                      onLike={() => onLike?.(img)}
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

            {/* ✅ Load More Button */}
            {canLoadMore && (
              <div className="loadmore-wrap">
                <button
                  className="loadmore-btn"
                  onClick={() => setLimit((prev) => prev + 20)}
                >
                  Load More (+20)
                </button>

                <p className="loadmore-text">
                  Showing <b>{visibleImages.length}</b> of{" "}
                  <b>{sortedImages.length}</b>
                </p>
              </div>
            )}
          </>
        )}

        {/* ✅ Fullscreen preview */}
        {selected && (
          <FullscreenPreview
            img={selected}
            onClose={() => setSelected(null)}
            onLike={() => onLike?.(selected)}
          />
        )}
      </div>
    </PageWrapper>
  );
}