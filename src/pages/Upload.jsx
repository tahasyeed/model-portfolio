import React from "react";
import PageWrapper from "../components/PageWrapper";
import UploadBox from "../components/UploadBox";

export default function Upload({ onUpload, uploading, total, uploads = [] }) {
  return (
    <PageWrapper>
      <div className="section">
        <div className="section-head">
          <h2>Upload Photos</h2>
          <div className="note">Total photos: {total}</div>
        </div>

        <UploadBox onUpload={onUpload} uploading={uploading} />

        {/* ✅ Upload thumbnails preview */}
        {!!uploads.length && (
          <div style={{ marginTop: 20 }}>
            <h3 style={{ fontWeight: 950, marginBottom: 10 }}>
              Upload Queue
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              {uploads.map((u) => (
                <div
                  key={u.id}
                  style={{
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "#fff",
                  }}
                >
                  <img
                    src={u.preview}
                    alt="preview"
                    style={{ width: "100%", height: 240, objectFit: "cover" }}
                  />

                  <div style={{ padding: 12 }}>
                    <div style={{ fontWeight: 900, fontSize: 13 }}>
                      {u.name}
                    </div>

                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        color: "rgba(0,0,0,0.65)",
                      }}
                    >
                      {u.status.toUpperCase()} • {u.progress}%
                    </div>

                    {!!u.savedPercent && (
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 12,
                          fontWeight: 800,
                          color: "rgba(0,0,0,0.65)",
                        }}
                      >
                        Saved: {u.savedPercent}% • {u.originalSizeMB}MB →{" "}
                        {u.compressedSizeMB}MB
                      </div>
                    )}

                    {/* mini progress bar */}
                    <div
                      style={{
                        height: 8,
                        width: "100%",
                        borderRadius: 999,
                        background: "rgba(0,0,0,0.08)",
                        overflow: "hidden",
                        marginTop: 10,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${u.progress}%`,
                          background: "#111",
                          transition: "width 0.2s ease",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
