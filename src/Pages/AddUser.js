import Firebase,{ db } from '../firebase';
import {collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc} from 'firebase/firestore';


export const addUser=(usrEmail,usrPassword) =>{
    addDoc(collection(db,'usuarios'),{usrEmail,usrPassword});
}

export const addFavorito=(userId, peliId) =>{
    return addDoc(collection(db,'favoritos'),{userId,peliId});
}

