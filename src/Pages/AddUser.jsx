import Firebase, { db } from '../firebase';
import { collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util'


export const addUser = (usrEmail, usrPassword) => {
    addDoc(collection(db, 'usuarios'), { usrEmail });
}

export const addFavorito = (userId, peliId) => {
    //setDoc(doc(db, "favoritos", userId), {"peliId" : peliId});
    return addDoc(collection(db, 'favoritos'), { userId, peliId });
}

export const getFavorito = async (userId) => {
    const queryFavoritos = query(collection(db, 'favoritos'), where("userId", "==", userId));
    const favoritos = await getDocs(queryFavoritos);
    return favoritos.docs.map(doc => doc.data().peliId.toString());
}

export const getUserName=async(userId) =>{
    const queryDoc = doc(db,"usuarios",userId)
    const usrDoc = await getDoc(queryDoc);
    console.log(usrDoc.data().userNombre)
    return usrDoc.data().userNombre.toString()
    //return usrDoc.data()
    //return usuarios.docs.map(doc=>doc.data().userNombre.toString());
}

// GETITEM by ID
export const getItemById = async (id) => {
    const colRef = collection(db, 'usuarios');
    const result = await getDoc(doc(colRef, id));
    //console.log(result.data());
    return result.data();
}

// CREATE
export const createItem = async(obj) => {
    const colRef = collection(db, 'usuarios');
    const data = await addDoc(colRef, obj);
    return data.id;
}

// UPDATE
export const updateItem = async (id, obj) => {
    const colRef = collection(db, 'usuarios');
    await updateDoc(doc(colRef, id), obj)
}