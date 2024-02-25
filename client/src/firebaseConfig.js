import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const app = firebase.initializeApp ({
  apiKey: 'AIzaSyBbHimcPc5ERtKgUoAqlVTl6Cg5pJLAZwc',
  authDomain: 'invento-auth-app.firebaseapp.com',
  projectId: 'invento-auth-app',
  storageBucket: 'invento-auth-app.appspot.com',
  messagingSenderId: '1048846803705',
  appId: '1:1048846803705:web:cb0a2d8e48bb4b55bf7828',
  measurementId: 'G-CM9TBSKXYF'
});

const db = getFirestore(app);
// const firestore = firebase.firestore();
// const storage = firebase.storage();
const auth = firebase.auth();

// const auth = getAuth(app);
const provider = new GoogleAuthProvider()

// export { auth, firestore, storage, firebase };
export { auth, provider };