import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from "firebase/auth";

import { app } from "./config";

export const auth = getAuth(app);

// ✅ Admin login (Email + Password)
export const loginAdmin = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// ✅ Anonymous auth for Likes (so every user can like only once)
export async function ensureAnonAuth() {
  // use same app auth instance
  if (auth.currentUser) return auth.currentUser;

  const res = await signInAnonymously(auth);
  return res.user;
}

// ✅ Admin logout
export const logoutAdmin = () => signOut(auth);
