import {initializeApp} from "firebase/app"
import { getAuth,GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAHFBHZbwOOuf9u1LtIDsD8bDjRR2jNkCg",
  authDomain: "omartube-eaa7b.firebaseapp.com",
  projectId: "omartube-eaa7b",
  storageBucket: "omartube-eaa7b.appspot.com",
  messagingSenderId: "708039186154",
  appId: "1:708039186154:web:cdba6a31c0ac4beea1e993"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const provider=new GoogleAuthProvider()
export default app