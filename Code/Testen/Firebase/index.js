import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "@firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBYW16NMGumkvA27llE6VyTszrAR80UDbo",
    authDomain: "msa-app-dad57.firebaseapp.com",
    projectId: "msa-app-dad57",
    storageBucket: "msa-app-dad57.firebasestorage.app",
    messagingSenderId: "278556649604",
    appId: "1:278556649604:web:6eb08d9dc209d160ccbad1",
    measurementId: "G-WMPLDFTYY2"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth();

/*signInWithEmailAndPassword(auth, "user@user.com", "userpassword").then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
})*/

console.log(auth.currentUser);

/*createUserWithEmailAndPassword(auth, "user@user.com", "userpassword").then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
})*/