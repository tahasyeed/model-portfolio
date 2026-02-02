import imageCompression from "browser-image-compression";

export async function compressToWebP(file) {
  const options = {
    // ✅ Strong compression but HQ for portfolio
    maxSizeMB: 1.2,
    maxWidthOrHeight: 2200,
    useWebWorker: true,
    initialQuality: 0.86,

    // ✅ Convert to WebP
    fileType: "image/webp",
  };

  const compressed = await imageCompression(file, options);

  // (optional) rename file
  const webpFile = new File(
    [compressed],
    (file.name || "image").replace(/\.[^/.]+$/, "") + ".webp",
    { type: "image/webp" }
  );

  return webpFile;
}
