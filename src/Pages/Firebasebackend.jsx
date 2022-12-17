import Firebase,{ db } from '../firebase';
import {collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc,setDoc} from 'firebase/firestore';
import { useAuth } from '../Contexts/AuthContext';



export function Firebasebackend() {
    
    const addUsr=(usrId, usrEmail) =>{
        return addDoc(collection(db,'usuarios',usrId),{"userId": usrId,"userEmail":usrEmail,"userNombre":"","userApellido":""})
    }
    const addFavorito=(userId, peliId) =>{
        //setDoc(doc(db, "favoritos", userId), {"peliId" : peliId});
        return addDoc(collection(db,'favoritos'),{userId,peliId});
    }
}

export function FindUser() {
    const { currentUser } = useAuth();
    const docRef = doc(db, "usuarios", currentUser.uid);
    const docSnap = getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
    // doc.data() will be undefined in this case
        console.log("No such document!");   
    }
    return "PEP"
}
  




