import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";

/**
 * Firebase configuration object containing keys and identifiers for your app
 * that we copied from our app's Firebase config object
 */

const firebaseConfig = {
    apiKey: "AIzaSyBE99bW0oWXrZuXS89gL7_pYwMv3Z0AXC8",
    authDomain: "furry-friends-48e2e.firebaseapp.com",
    projectId: "furry-friends-48e2e",
    storageBucket: "furry-friends-48e2e.appspot.com",
    messagingSenderId: "908605254294",
    appId: "1:908605254294:web:64a97ec82cbffc4118f0b7",
    measurementId: "G-VVD28SNVH3"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
}

export const db = getFirestore(app);

export const storage = getStorage(app);
