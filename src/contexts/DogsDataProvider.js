import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';

const DogsContext = createContext();
export const useDogs = () => useContext(DogsContext);

const DogsDataProvider = ({ children }) => {
    const [dogs, setDogs] = useState([]);
    const dogsCollectionRef = collection(db, 'dogs');

    useEffect(() => { //its a bad practice to make useEffect function async
        const getDogs = async () => {
            onSnapshot(dogsCollectionRef, snapShot => { //we used onSnapshot instead of getDocs because onSnapshot enables real-time updates without refreshing the page
                const updatedData = snapShot.docs.map(
                    doc => ({ id: doc.id, ...doc.data() })
                );
                setDogs(updatedData);
            });
        }
        getDogs();

    }, [])
    
    return (
        <DogsContext.Provider value={ { dogs } }>
            {children}
        </DogsContext.Provider>
    )
}

export default DogsDataProvider