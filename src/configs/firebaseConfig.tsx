// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDG71v01Ox4K_3T1RitRBzThyBPbpGBJz4",
    authDomain: "mensajeria-mat.firebaseapp.com",
    projectId: "mensajeria-mat",
    storageBucket: "mensajeria-mat.appspot.com",
    messagingSenderId: "902506146497",
    appId: "1:902506146497:web:b71d398bd325cbfeb60240",
    databaseURL: "https://mensajeria-mat-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//constante para obtener servicio de autenticación
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Referencia al servicio de la BDD
export const dbRealTime = getDatabase(firebase);

