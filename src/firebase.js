import { initializeApp } from 'firebase/app';
import { getFirestore} from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCQTWBCvelNiYHwSAwiOBDHbhJ9ihXNtKc",
    authDomain: "grupo2-pelispedia.firebaseapp.com",
    projectId: "grupo2-pelispedia",
    storageBucket: "grupo2-pelispedia.appspot.com",
    messagingSenderId: "454156928033",
    appId: "1:454156928033:web:d68ede0d3fe1a66f398f60"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
