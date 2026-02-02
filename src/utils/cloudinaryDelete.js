import axios from "axios";

export async function deleteFromCloudinary(publicId) {
  const res = await axios.post("/.netlify/functions/delete-cloudinary", {
    publicId,
  });

  return res.data;
}