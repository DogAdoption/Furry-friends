import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';

const DogsContext = createContext();
export const useDogs = () => useContext(DogsContext);

const DogsDataProvider = ({ children }) => {
    const [dogs, setDogs] = useState([]);
    const dogsCollectionRef = collection(db, 'dogs');
    const [currentDogCount, setCurrentDogCount] = useState(dogs.length);
    const [currentLocation, setCurrentLocation] = useState(() => localStorage.getItem('currentLocation'));

    useEffect(() => { 
        //we used onSnapshot instead of getDocs because onSnapshot enables real-time updates without refreshing the page
        onSnapshot(dogsCollectionRef, snapShot => { 
            const updatedData = snapShot.docs.map(
                doc => ({ id: doc.id, ...doc.data() })
            );
            setDogs(updatedData);
        });

    }, [])
    
    return (
        <DogsContext.Provider value={{ dogs, currentDogCount, setCurrentDogCount, currentLocation, setCurrentLocation }}>
            {children}
        </DogsContext.Provider>
    )
}

export default DogsDataProvider