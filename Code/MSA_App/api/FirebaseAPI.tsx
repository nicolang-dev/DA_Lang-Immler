// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence, NextOrObserver } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import User from "../types/User";
import UserData from "../types/UserData";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)});
const storage = getFirestore();

export const Authentication = {
    async logIn(email: string, password: string): Promise<User>{
        try{
            const res = await signInWithEmailAndPassword(auth, email, password);
            if(res.user.email === null){
                throw "email is null";
            }
            return {uid: res.user.uid, email: res.user.email};
        } catch(err){
            throw err;
        }
    },
    async register(email: string, password: string): Promise<void>{
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            return
        } catch(err) {
            throw err;
        }
    },
    onAuthChange(callback: (user: User | null) => void){
        auth.onAuthStateChanged((user) => {
            let newUser;
            if(user !== null && user.uid !== null && user.email !== null){
                newUser = {uid: user.uid, email: user.email};
            } else {
                newUser = null;
            }
            callback(newUser);
        });
    },
    onAuthReady(callback: () => void){
        auth.authStateReady().then(() => callback);
    }
}

export const CloudStorage = {
    async setUserData(userData: UserData): Promise<void>{
        try{
            const docName = "user_" + userData.uid;
            await setDoc(doc(storage, "userData", docName), userData);
            return
        } catch(err){
            throw err;
        }
    },
    async getUserData(uid: string): Promise<UserData>{
        try{
            const docName = "user_" + uid;
            const res = await getDoc(doc(storage, "userData", docName));
            console.log(res.data());
            const data = res.data();
            if(data === undefined){
                throw "result data is undefined";
            }
            return {uid: data.uid, stationList: data.stationList, adapterList: data.adapterList};
        } catch(err) {
            throw err;
        }
    }
}