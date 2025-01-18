// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, collection, doc, getDoc } from "firebase/firestore";
import User from "../types/User";
import Station from "../types/Station";
import Adapter from "../types/Adapter";

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
    }
}

type UserData = {
    uid: string,
    stationList: Station[],
    adapterList: Adapter[]
}

export const Storage = {
    async setUserData(uid: string, stationList: Station[], adapterList: Adapter[]): Promise<void>{
        try{
            const docName = "user_" + uid;
            const data = {
                uid: uid,
                stationList: stationList,
                adapterList: adapterList
            }
            await setDoc(doc(storage, "userData", docName), data);
            return
        } catch(err){
            throw err;
        }
    },
    async getUserData(uid: string): Promise<UserData>{
        try{
            const docName = "user_" + uid;
            const res = await getDoc(doc(storage, "userData", docName));
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