// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB1BDR6cKOXMJPytry2R8B1WxxsLMaioKo",
  authDomain: "insta-clone-su.firebaseapp.com",
  projectId: "insta-clone-su",
  storageBucket: "insta-clone-su.appspot.com",
  messagingSenderId: "965385215745",
  appId: "1:965385215745:web:9bfeccf594071f40ee0500",
  measurementId: "G-9LMT2TTE6V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// add services manually on firebase website
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// export them so that they can be used in the project
export { app, auth, firestore, storage };

// Initialzing the firebase project that ww want to connect:
// we pass its configuration to initialize app, it returns us the firebase app on the cloud
