import { db } from '../firebase';
import { getDoc, doc} from 'firebase/firestore';

//Obtine la información del usuario loggueado
function GetUser(uId) { 
    const docRef = doc(db, "usuarios", uId);
    const docSnap = getDoc(docRef);  
}

export {GetUser};




