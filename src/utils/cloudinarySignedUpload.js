import axios from "axios";

export async function uploadToCloudinarySigned(file) {
  try {
    const sigRes = await axios.get("/.netlify/functions/sign-cloudinary");

    console.log("SIGN RESPONSE:", sigRes.data);

    const { timestamp, signature, folder, apiKey, cloudName } = sigRes.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const uploadRes = await axios.post(uploadUrl, formData);
    console.log("CLOUDINARY RESPONSE:", uploadRes.data);

    return uploadRes.data;
  } catch (err) {
    console.error("CLOUDINARY UPLOAD ERROR:", err?.response?.data || err.message);
    throw err;
  }
}
