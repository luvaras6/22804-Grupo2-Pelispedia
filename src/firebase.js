import { initializeApp } from 'firebase/app';
import { getFirestore} from '@firebase/firestore';

//import firebase from 'firebase/compat/app';
//import {getFirestore} from '@firebase/firestore';
//import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCQTWBCvelNiYHwSAwiOBDHbhJ9ihXNtKc",
    authDomain: "grupo2-pelispedia.firebaseapp.com",
    projectId: "grupo2-pelispedia",
    storageBucket: "grupo2-pelispedia.appspot.com",
    messagingSenderId: "454156928033",
    appId: "1:454156928033:web:d68ede0d3fe1a66f398f60"
};

//const firebaseApp = firebase.initializeApp(firebaseConfig);
//const auth = firebaseApp.auth();
//export { auth };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
