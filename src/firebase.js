import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";

import {useNavigate} from 'react-router-dom';


const firebaseConfig = {
  apiKey: "AIzaSyABiVrsDrpZH_Pyq1iM-A0HjfIq7InPpMo",
  authDomain: "sketchify-3c9d8.firebaseapp.com",
  projectId: "sketchify-3c9d8",
  storageBucket: "sketchify-3c9d8.appspot.com",
  messagingSenderId: "712662070135",
  appId: "1:712662070135:web:b1f73db7adef63f8a76772",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// function for sign in google

const provider = new GoogleAuthProvider();//prover for authentication



// sign in with google
export const signInWithGoogle = () => {



  console.log("signin with google");

  signInWithPopup(auth,provider).then((result) => {
    // navigate('/')
     const name = result.user.displayName;
     const email = result.user.email;
     const profile = result.user.photoURL;
      
      localStorage.setItem("name",name);
      localStorage.setItem("email",email);
      localStorage.setItem("profile",profile);
      console.log("signin with google");

  }).catch((error) => {
      console.log(error);
  });
}


export { auth };
