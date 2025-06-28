import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCFZeWU5Wy6j8AO5tfWkVay0N8DLCTXzdk",
  authDomain: "e-commerce-3f057.firebaseapp.com",
  projectId: "e-commerce-3f057",
  storageBucket: "e-commerce-3f057.appspot.com",
  messagingSenderId: "591055849197",
  appId: "1:591055849197:web:54cb7f367c92ca26862ee4",
  measurementId: "G-9CDDG2FDVT",
  databaseURL: "https://e-commerce-3f057-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
