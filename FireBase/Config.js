import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0wKQhJxRgR24D7IoacdITz6cVNvpBoOc",
  authDomain: "waller-f75c0.firebaseapp.com",
  projectId: "waller-f75c0",
  storageBucket: "waller-f75c0.appspot.com",
  messagingSenderId: "365566989267",
  appId: "1:365566989267:web:0b46bed02a98c700249526"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);