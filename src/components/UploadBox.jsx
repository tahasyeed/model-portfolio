import React from "react";

export default function UploadBox({ onUpload, uploading }) {
  const onChange = (e) => {
    onUpload(e.target.files);
    e.target.value = "";
  };

  return (
    <div className="dropzone">
      <p className="drop-title">{uploading ? "Uploading..." : "Upload Photos"}</p>
      <p className="drop-sub">Select images and publish them to the gallery</p>

      <label className="btn">
        Choose Files
        <input
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={onChange}
          disabled={uploading}
        />
      </label>

      <p className="hint">Supported: JPG / PNG / WEBP</p>
    </div>
  );
}
