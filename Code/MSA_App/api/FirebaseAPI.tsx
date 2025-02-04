import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence, signOut, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import User from "../types/User";
import Station from "@/types/Station";
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

type Adapter = {
    name: string,
    mac: string
}

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
    async logOut(){
        return signOut(auth);
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
        auth.authStateReady().then(() => callback())
        .catch(err => {
            console.error(err);
        });
    },
    getUser(): User | null{
        const user = auth.currentUser;
        if(user !== null && user.email !== null){
            return {uid: user.uid, email: user.email};
        }
        return null;
    },
    async sendPwResetEmail(email: string){
        return sendPasswordResetEmail(auth, email);
    },
    async confirmPwReset(code: string, newPw: string){
        return confirmPasswordReset(auth, code, newPw);
    }
}

export const CloudStorage = {
    async getAdapterList(): Promise<Adapter[]>{
        if(auth.currentUser !== null){
            let uid = auth.currentUser.uid;
            try{
                const docName = "user_" + uid;
                const res = await getDoc(doc(storage, "adapter", docName));
                const data = res.data();
                if(data === undefined || data.adapterList === undefined){
                    throw "data is undefined";
                }
                console.log("adapter data:", data.adapterList);
                return data.adapterList;
            } catch(err) {
                throw err;
            }
        } else {
            throw "user is null";
        }
    },
    async getStationList(): Promise<Station[]>{
        if(auth.currentUser !== null){
            let uid = auth.currentUser.uid;
            try{
                const docName = "user_" + uid;
                const res = await getDoc(doc(storage, "station", docName));
                const data = res.data();
                if(data === undefined || data.stationList === undefined){
                    throw "data is undefined";
                }
                return data.stationList;
            } catch(err) {
                throw err;
            }
        } else {
            throw "user is null";
        }
    },
    async setAdapterList(newAdapterList: Adapter[]): Promise<void>{
        if(auth.currentUser !== null){
            let uid = auth.currentUser.uid;
            try{
                const docName = "user_" + uid;
                const data = {adapterList: newAdapterList};
                await setDoc(doc(storage, "adapter", docName), data);
                return
            } catch(err){
                throw err;
            }
        } else {
            throw "user is null";
        }
    },
    async setStationList(newStationList: Station[]): Promise<void>{
        if(auth.currentUser !== null){
            let uid = auth.currentUser.uid;
            try{
                const docName = "user_" + uid;
                const data = {stationList: newStationList};
                await setDoc(doc(storage, "station", docName), data);
                return
            } catch(err){
                throw err;
            }
        } else {
            throw "user is null";
        }
    },
    onAdapterChange(callback: (newAdapterList: Adapter[]) => void){
        if(auth.currentUser !== null){
            let uid = auth.currentUser.uid;
            const docName = "user_" + uid;
            const document = doc(storage, "adapter", docName);
            onSnapshot(document, (newDoc) => {
                const data = newDoc.data();
                let adapterList = [];
                if(data !== undefined){
                    adapterList = data.adapterList;
                }
                callback(adapterList);
            })
        } else {
            throw "user is null";
        }
    },
    onStationChange(callback: (newStationList: Station[]) => void){
        if(auth.currentUser !== null){
            let uid = auth.currentUser.uid;
            const docName = "user_" + uid;
            const document = doc(storage, "station", docName);
            onSnapshot(document, (newDoc) => {
                const data = newDoc.data();
                let stationList = [];
                if(data !== undefined){
                    stationList = data.stationList;
                }
                callback(stationList);
            })
        } else {
            throw "user is null";
        }
    }
}