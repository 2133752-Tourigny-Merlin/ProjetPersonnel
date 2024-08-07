/**
 * Code fournis par Étienne Rivard
 */

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

/**
 * Data du firebase
 */
const firebaseConfig = {
  apiKey: "AIzaSyDHqqEgqb75IZGOJCKXRbZ8i7iMNzWwMsE",
  authDomain: "portfolio-ded4a.firebaseapp.com",
  projectId: "portfolio-ded4a",
  storageBucket: "portfolio-ded4a.appspot.com",
  messagingSenderId: "536463361492",
  appId: "1:536463361492:web:4ab1b097a034b3feff0241",
  measurementId: "G-WF553XYZ40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const logout = () => {
    signOut(auth);
};

export const logInWithEmailAndPassword = async (
email: string,
password: string
) => {
try {
    await signInWithEmailAndPassword(auth, email, password);
} catch (err: any) {
    console.error(err);
    alert(err.message);
}
};