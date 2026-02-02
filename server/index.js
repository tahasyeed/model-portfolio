import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Home test route
app.get("/", (req, res) => {
  res.json({ status: "Cloudinary signature server running ✅" });
});

// ✅ Signed Upload Signature Route
app.get("/api/sign-cloudinary", (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = process.env.FOLDER_NAME || "bbw-portfolio";

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET
    );

    return res.status(200).json({
      timestamp,
      signature,
      folder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (err) {
    console.error("SIGNATURE ERROR:", err);
    return res.status(500).json({ error: "Signature generation failed" });
  }
});

// ✅ Delete from Cloudinary Route
app.delete("/api/delete-cloudinary", async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: "publicId is required" });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.error("CLOUDINARY DELETE ERROR:", err);
    return res.status(500).json({ error: "Cloudinary delete failed" });
  }
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running: http://localhost:${PORT}`));
