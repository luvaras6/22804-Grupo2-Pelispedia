import Firebase, { db } from '../firebase'
import { collection, where, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';


export const addUser = (usrEmail, usrPassword) => {
    addDoc(collection(db, 'usuarios'), { usrEmail, usrPassword });
}

export const addFavorito = (userId, peliId) => {
    return addDoc(collection(db, 'favoritos'), { userId, peliId });
}

export const getFavorito = async (userId) => {
    const queryFavoritos = query(collection(db, 'favoritos'), where("userId", "==", userId));
    const favoritos = await getDocs(queryFavoritos);
    return favoritos.docs.map(doc => doc.data().peliId.toString());
}

