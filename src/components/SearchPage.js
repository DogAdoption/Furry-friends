import React, { useState } from 'react'
import PetCard from './PetCard'
import Filter from './Filter'
import { useLocation } from 'react-router-dom';
import { useDogs } from '../contexts/DogsDataProvider';

const SearchPage = () => {
  const location = useLocation();
  const dogLocation = location.state ? location.state.location : 'West Bengal';

  const [breed, setBreed] = useState('any');

  const [gender, setGender] = useState('any');

  const [age, setAge] = useState('any');

  const dogValues = {
    breed, setBreed,
    gender, setGender,
    age, setAge
  }

  let { dogs } = useDogs();

  const getFilteredDogs = () => {
    let filteredDogs = dogs.filter(dog => dog.location === dogLocation);

    if(breed !== 'any') {
      filteredDogs = filteredDogs.filter(dog => dog.breed === breed)
    }

    if(gender !== 'any') {
      filteredDogs = filteredDogs.filter(dog => dog.gender === gender)
    }

    if(age !== 'any') {
      if(age === 'young') {
        filteredDogs = filteredDogs.filter(dog => dog.age <= 1)
      } else if(age === 'adult') {
        filteredDogs = filteredDogs.filter(dog => dog.age <= 7)
      } else {
        filteredDogs = filteredDogs.filter(dog => dog.age > 7)
      }
    }
    return filteredDogs;
  }

  return (
    <div className='searchContainer'>
      <Filter dogs={dogs} dog={dogValues} />
      <div className="searchGrid">
        {
            getFilteredDogs().map(dog => ( 
                <PetCard dog={dog} key={dog.id} />
            ))
        }
      </div>
    </div>
  )
}

export default SearchPage