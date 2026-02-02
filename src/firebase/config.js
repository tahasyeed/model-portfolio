// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };
// console.log("API KEY:", import.meta.env.VITE_FIREBASE_API_KEY);

// export const app = initializeApp(firebaseConfig);




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqzAatjHuCt51YzAGme85y8P5bellT_EM",
  authDomain: "model-victoria.firebaseapp.com",
  projectId: "model-victoria",
  storageBucket: "model-victoria.firebasestorage.app",
  messagingSenderId: "35253374901",
  appId: "1:35253374901:web:570326ceb7dfb91f5553fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);