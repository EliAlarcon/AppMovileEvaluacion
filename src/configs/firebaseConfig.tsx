// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD323n9lCALIK2iLGg-ArjFt6ktPc4T_PY",
  authDomain: "app-movile-evaluacion.firebaseapp.com",
  projectId: "app-movile-evaluacion",
  storageBucket: "app-movile-evaluacion.appspot.com",
  messagingSenderId: "8476597903",
  appId: "1:8476597903:web:3350a9164e35c913115afa"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});