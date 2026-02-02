import axios from "axios";

export async function deleteFromCloudinary(publicId) {
  await axios.post("/.netlify/functions/delete-cloudinary", { publicId });


  return res.data;
}
