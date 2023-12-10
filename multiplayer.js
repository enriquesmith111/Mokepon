// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsFHQuY53UBpD5eumCxsY_9PGboWLwtqY",
    authDomain: "mokepon-9cb2b.firebaseapp.com",
    databaseURL: "https://mokepon-9cb2b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mokepon-9cb2b",
    storageBucket: "mokepon-9cb2b.appspot.com",
    messagingSenderId: "512211176731",
    appId: "1:512211176731:web:fbf60455808e2bc31a17be",
    measurementId: "G-VK6TS775PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function multiplayer() {

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
            // your logged in
        } else {
            // your logged out
        }
    })

    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage)
    })

};
