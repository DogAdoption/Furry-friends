import React, { useEffect, useState } from 'react'
import PetCard from './PetCard'
import Filter from './Filter'
import { useLocation } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection } from 'firebase/firestore';

const SearchPage = () => {
  const location = useLocation();
  const state = location.state ? location.state.location : 'West Bengal';
  
  const [dogs, setDogs] = useState([]);
  const dogsCollectionRef = collection(db, 'dogs');

  useEffect(() => { //its a bad practice to make useEffect function async
    const getDogs = async () => {

    }
  }, [state])

  return (
    <div className='searchContainer'>
      <Filter />
      <div className="searchGrid">
        {
            [...Array(20)].map((_, i) => ( //i = index
                <PetCard key={i} />
            ))
        }
      </div>
    </div>
  )
}

export default SearchPage