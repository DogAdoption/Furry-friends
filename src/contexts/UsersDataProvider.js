import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';

const UsersContext = createContext();
export const useUsers = () => useContext(UsersContext);

const UsersDataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, 'users');

    useEffect(() => { 
        onSnapshot(usersCollectionRef, snapShot => { 
            const updatedData = snapShot.docs.map(
                doc => ({ id: doc.id, ...doc.data() })
            );
            setUsers(updatedData);
        });
    }, [])
    
    return (
        <UsersContext.Provider value={ { users } }>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersDataProvider