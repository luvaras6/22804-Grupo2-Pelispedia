import Firebase,{ db } from '../firebase';
import {collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc,setDoc} from 'firebase/firestore';
import {async} from '@firebase/util' 


export const addUser=(usrEmail,usrPassword) =>{
    addDoc(collection(db,'usuarios'),{usrEmail});
}

export const addFavorito=(userId, peliId) =>{
    //setDoc(doc(db, "favoritos", userId), {"peliId" : peliId});
    return addDoc(collection(db,'favoritos'),{userId,peliId});
}

