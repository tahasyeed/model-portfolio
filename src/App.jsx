// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import "./App.css";
// import { compressImage } from "./utils/compressImage";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Home from "./pages/Home";
// import Gallery from "./pages/Gallery";
// import Upload from "./pages/Upload";
// import About from "./pages/About";
// import AdminLogin from "./pages/AdminLogin";

// import { db } from "./firebase/db";
// import { uploadToCloudinarySigned } from "./utils/cloudinarySignedUpload";



// import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

// export default function App() {
//   const [images, setImages] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const fetchImages = async () => {
//     const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));
//     const snap = await getDocs(q);

//     const list = snap.docs.map((d) => ({
//       id: d.id,
//       ...d.data(),
//     }));

//     setImages(list);
//   };

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const handleUpload = async (files) => {
//     const fileArray = Array.from(files || []);
//     if (!fileArray.length) return;
  
//     setUploading(true);
  
//     try {
//       for (const file of fileArray) {
//         const cloudinaryData = await uploadToCloudinarySigned(file);
  
//         console.log("Uploaded URL:", cloudinaryData.secure_url);
  
//         await addDoc(collection(db, "photos"), {
//           url: cloudinaryData.secure_url,
//           publicId: cloudinaryData.public_id,
//           createdAt: Date.now(),
//         });
//       }
  
//       await fetchImages();
//       alert("Uploaded successfully ✅");
//     } catch (err) {
//       console.error("UPLOAD FAILED:", err);
//       console.log("ERROR RESPONSE:", err?.response?.data || err?.message);
//       alert("Upload failed ❌ (check console)");
//     } finally {
//       setUploading(false);
//     }
//   };
  

//   return (
//     <BrowserRouter>
//       <div className="app">
//         <Navbar />

//         <main className="container">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/gallery" element={<Gallery images={images} />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/admin" element={<AdminLogin />} />

//             <Route
//               path="/upload"
//               element={
//                 <ProtectedRoute>
//                   <Upload
//                     onUpload={handleUpload}
//                     uploading={uploading}
//                     total={images.length}
//                   />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }













import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";

import { db } from "./firebase/db";
import { auth, ensureAnonAuth } from "./firebase/auth";
import { onAuthStateChanged } from "firebase/auth";


import { uploadToCloudinarySigned } from "./utils/cloudinarySignedUpload";
import { deleteFromCloudinary } from "./utils/cloudinaryDelete";
import { compressToWebP } from "./utils/compressImage";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
  deleteDoc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";





export default function App() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  
const [isAdmin, setIsAdmin] = useState(false);

  // ✅ upload status + thumbnails
  const [uploads, setUploads] = useState([]);

  // const isAdmin = !!auth.currentUser;
  
useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    setIsAdmin(!!user);
  });

  return () => unsub();
}, []);

  // ✅ REALTIME Gallery Sync
  useEffect(() => {
    const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setImages(list);
    });

    return () => unsub();
  }, []);

  const formatMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

  // ✅ Upload function
  const handleUpload = async (files) => {
    const fileArray = Array.from(files || []);
    if (!fileArray.length) return;

    setUploading(true);

    // create preview list
    const list = fileArray.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      preview: URL.createObjectURL(f),
      status: "pending",
      progress: 0,
      err: "",
      originalSizeMB: formatMB(f.size),
      compressedSizeMB: "",
      savedPercent: "",
    }));

    setUploads(list);

    try {
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        const uploadId = list[i].id;

        // compress to webp
        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploadId ? { ...u, status: "compressing", progress: 10 } : u
          )
        );

        const compressed = await compressToWebP(file);

        const originalMB = formatMB(file.size);
        const compressedMB = formatMB(compressed.size);
        const savedPercent = Math.max(
          0,
          Math.round(((file.size - compressed.size) / file.size) * 100)
        );

        // upload cloudinary
        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploadId
              ? {
                  ...u,
                  status: "uploading",
                  progress: 40,
                  compressedSizeMB: compressedMB,
                  savedPercent,
                }
              : u
          )
        );

        const cloudinaryData = await uploadToCloudinarySigned(compressed);

        // save firestore
        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploadId ? { ...u, status: "saving", progress: 80 } : u
          )
        );

        await addDoc(collection(db, "photos"), {
          url: cloudinaryData.secure_url,
          publicId: cloudinaryData.public_id,
          createdAt: Date.now(),

          likes: 0, // ✅ like counter

          format: "webp",
          originalName: file.name,
          originalSizeMB: Number(originalMB),
          compressedSizeMB: Number(compressedMB),
          savedPercent,
        });

        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploadId ? { ...u, status: "done", progress: 100 } : u
          )
        );
      }

      alert("Uploaded successfully ✅");
    } catch (err) {
      console.error("UPLOAD FAILED:", err);
      alert("Upload failed ❌ (check console)");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Like handler (ONE LIKE ONLY)
  const handleLike = async (img) => {
    try {
      const key = `liked_${img.id}`;
  
      // ✅ already liked on this device
      if (localStorage.getItem(key)) {
        alert("You already liked this ❤️");
        return;
      }
  
      const ref = doc(db, "photos", img.id);
  
      await updateDoc(ref, {
        likes: increment(1),
      });
  
      // ✅ save locally so same device can't like again
      localStorage.setItem(key, "true");
    } catch (err) {
      console.error("LIKE FAILED:", err);
      alert("Like failed ❌ (check console)");
    }
  };

  // ✅ Delete photo (Cloudinary + Firestore)
  const handleDelete = async (img) => {
    const ok = window.confirm("Are you sure you want to delete this photo?");
    if (!ok) return;

    try {
      // 1) delete from Cloudinary
      await deleteFromCloudinary(img.publicId);

      // 2) delete Firestore doc
      await deleteDoc(doc(db, "photos", img.id));

      alert("Deleted ✅");
    } catch (err) {
      console.error("DELETE FAILED:", err);
      alert("Delete failed ❌ (check console)");
    }
  };

  // cleanup previews
  useEffect(() => {
    return () => {
      uploads.forEach((u) => {
        if (u.preview) URL.revokeObjectURL(u.preview);
      });
    };
  }, [uploads]);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="container">
          <Routes>
            <Route path="/" element={<Home images={images} />} />

            <Route
              path="/gallery"
              element={
                <Gallery
                  images={images}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                  onLike={handleLike}
                />
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminLogin />} />

            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload
                    onUpload={handleUpload}
                    uploading={uploading}
                    total={images.length}
                    uploads={uploads}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
