import { initializeApp } from "firebase/app";
//import storage
import {getStorage} from "firebase/storage";

const firebaseConfig = {
//Add you firabse base key here
  apiKey: "XXXX",
  authDomain: "waller-XXX.firebaseapp.com",
  projectId: "waller-XXX",
  storageBucket: "waller-XXX.appspot.com",
  messagingSenderId: "XXX",
  appId: "1:XXX:web:XXXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// add the storage 
export const imageDB = getStorage(app);
