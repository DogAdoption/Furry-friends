import React, { useEffect, useState } from 'react'
import PetCard from './PetCard'
import Filter from './Filter'
import { useLocation } from 'react-router-dom';
import { useDogs } from '../contexts/DogsDataProvider';

const SearchPage = () => {
  const location = useLocation();
  const state = location.state ? location.state.location : 'West Bengal';

  const [breed, setBreed] = useState('any');

  const [gender, setGender] = useState('any');

  const { dogs } = useDogs();

  const getDogs = () => {
    return dogs.filter(
      data => 
        (data.location === state) && 
        (breed === 'any' && gender === 'any') ? 
        true :
        (breed !== 'any' && gender !== 'any') ?
        (data.breed === breed && data.gender === gender) :
        (breed !== 'any') ? (data.breed === breed) : (data.gender === gender)
    )
  }

  const [dogsData, setDogsData] = useState(getDogs())

  useEffect(() => {
    setDogsData(getDogs())
  }, [dogs, breed, gender])

  return (
    <div className='searchContainer'>
      <Filter dogs={dogs} brred={breed} setBreed = {setBreed} gender={gender} setGender={setGender} />
      <div className="searchGrid">
        {
            dogsData.map(dog => ( 
                <PetCard dog={dog} key={dog.id} />
            ))
        }
      </div>
    </div>
  )
}

export default SearchPage