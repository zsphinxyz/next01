import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "zreact.firebaseapp.com",
  projectId: "zreact",
  storageBucket: "zreact.appspot.com",
  messagingSenderId: "21886633661",
  appId: "1:21886633661:web:ceb23c94fff1a7b7abd9d4",
  measurementId: "G-EZN529D9E6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);