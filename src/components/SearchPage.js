import React from 'react'
import PetCard from './PetCard'
import Filter from './Filter'
import { useLocation } from 'react-router-dom';
import { useDogs } from '../contexts/DogsDataProvider';

const SearchPage = () => {
  const location = useLocation();
  const state = location.state ? location.state.location : 'West Bengal';

  const { dogs } = useDogs();

  const getDogs = () => {
    return dogs.filter(data => data.location === state)
  }

  return (
    <div className='searchContainer'>
      <Filter />
      <div className="searchGrid">
        {
            getDogs().map(dog => ( 
                <PetCard key={dog.id} petName={dog.name} breed={dog.breed} avatar = {dog.pictureUrl} />
            ))
        }
      </div>
    </div>
  )
}

export default SearchPage