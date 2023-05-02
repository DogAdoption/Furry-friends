import React, { useRef, useState } from 'react'
import PetCard from './PetCard'
import Filter from './Filter'
import { useLocation } from 'react-router-dom';
import { useDogs } from '../contexts/DogsDataProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {
  const location = useLocation();
  const dogLocation = location.state ? location.state.location : 'West Bengal';

  const filterBar = useRef();

  const [showFilter, setShowFilter] = useState(false);

  const [breed, setBreed] = useState(() => {
    let breed = localStorage.getItem('filterBreed');
    return breed ? breed : 'any';
  });

  const [gender, setGender] = useState(() => {
    let gender = localStorage.getItem('filterGender');
    return gender ? gender : 'any';
  });

  const [age, setAge] = useState(() => {
    let age = localStorage.getItem('filterAge');
    return age ? age : 'any';
  });

  const dogValues = {
    breed, setBreed,
    gender, setGender,
    age, setAge
  }

  let { dogs, setCurrentDogCount } = useDogs();

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

    setCurrentDogCount(filteredDogs.length);
    return filteredDogs;
  }

  const toggleFilterBar = () => {
    if(filterBar.current.style.display === 'none' || showFilter === false) {
        filterBar.current.style.display = 'block';
        setShowFilter(true);
    } else {
        filterBar.current.style.display = 'none';
        setShowFilter(false);
    }
  }

  return (
    <div className='searchPage'>
      {
        showFilter && <FontAwesomeIcon className='cross' onClick={toggleFilterBar} icon={ faXmark} />
      }
      <div className='slider' onClick={toggleFilterBar}>
        <FontAwesomeIcon icon={faSliders} /> Filters
      </div>
  
      <div className="filterTopBar" ref={filterBar}>
        <Filter dogs={dogs} dog={dogValues} />
      </div>
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
    </div>
  )
}

export default SearchPage