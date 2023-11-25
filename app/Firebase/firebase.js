import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyA-ynj0Xx2bHzFu_xQ3h8emoy3Zy4AdFFQ",
  authDomain: "realtor-web-app.firebaseapp.com",
  projectId: "realtor-web-app",
  storageBucket: "realtor-web-app.appspot.com",
  messagingSenderId: "1034240181547",
  appId: "1:1034240181547:web:c276fb44823264a137316e",
  measurementId: "G-NW4KHB8W4F",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
