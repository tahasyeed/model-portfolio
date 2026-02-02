import { v2 as cloudinary } from "cloudinary";

export const handler = async (event) => {
  try {
    const { publicId } = JSON.parse(event.body || "{}");

    if (!publicId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "publicId is required" }),
      };
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.destroy(publicId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result }),
    };
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Cloudinary delete failed" }),
    };
  }
};