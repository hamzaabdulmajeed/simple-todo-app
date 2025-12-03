import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
apiKey: "AIzaSyAwmr1emNlb1DM2sK7HJ52Rj8o7jgXeIJA",
authDomain: "todo-app-9e11b.firebaseapp.com",
databaseURL: "https://todo-app-9e11b-default-rtdb.firebaseio.com",
projectId: "todo-app-9e11b",
storageBucket: "todo-app-9e11b.firebasestorage.app",
messagingSenderId: "285517725229",
appId: "1:285517725229:web:56400057730be81dccc2a4",
measurementId: "G-GEMDJ1TK0S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);