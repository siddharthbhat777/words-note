import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBzxg6PJ4GCMitS4lTQ31h0fW4szFtk9I4",
    authDomain: "words-note-b8d20.firebaseapp.com",
    projectId: "words-note-b8d20",
    storageBucket: "words-note-b8d20.appspot.com",
    messagingSenderId: "327180999104",
    appId: "1:327180999104:web:57fbf88b13f258c6e19025",
    measurementId: "G-4X749HPNDM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
};

export const db = getFirestore(app);