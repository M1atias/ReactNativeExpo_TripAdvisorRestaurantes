import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAUiVRg_CR9tfqBfiBLMuz5MzLjOkNF8Iw",
  authDomain: "tenedores-8f7d5.firebaseapp.com",
  projectId: "tenedores-8f7d5",
  storageBucket: "tenedores-8f7d5.appspot.com",
  messagingSenderId: "336965512696",
  appId: "1:336965512696:web:ab9fe213bb3e8a1fe97a0d"
};

export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);