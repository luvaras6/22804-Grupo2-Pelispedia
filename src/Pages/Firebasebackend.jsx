import Firebase,{ db } from '../firebase';
import {collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc,setDoc} from 'firebase/firestore';


function GetUser(uId) { 
    console.log(uId);
    const docRef = doc(db, "usuarios", uId);
    const docSnap = getDoc(docRef);
    
    console.log("Document data:", docSnap.data());
      
}

export {GetUser};




