import React, { useEffect, useRef, useState } from 'react'
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

  const currentLocation =  localStorage.getItem("currentLocation");

  const getBreed = () => {
    let breed = localStorage.getItem('filterBreed');
    return breed ? breed : 'any';
  }
  const [breed, setBreed] = useState(() => getBreed());

  const getGender = () => {
    let gender = localStorage.getItem('filterGender');
    return gender ? gender : 'any';
  }
  const [gender, setGender] = useState(() => getGender());

  const getAge = () => {
    let age = localStorage.getItem('filterAge');
    return age ? age : 'any';
  }
  const [age, setAge] = useState(() => getAge());

  const dogValues = {
    breed, setBreed,
    gender, setGender,
    age, setAge
  }

  let { dogs, currentDogCount, setCurrentDogCount } = useDogs();

  const [filteredDogs, setFilteredDogs] = useState(dogs);

  useEffect(() => {
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
    const newFilteredDogs = getFilteredDogs();
    setFilteredDogs(newFilteredDogs);
  }, [breed, age, gender, dogs, dogLocation, setCurrentDogCount])

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
        {
          currentDogCount === 0 ?
          <div style={{textAlign: 'center'}}>
            <h1>No Data!</h1>
            {
              currentLocation !== 'West Bengal' &&
              <p>
                Note - Maximum data is inserted in West Bengal. 
                Please select West Bengal as the location to get a clear understanding of this project.
              </p>
            }
          </div>
          :
          <div className="searchGrid">
          {
              filteredDogs.map(dog => ( 
                  <PetCard dog={dog} key={dog.id} />
              ))
          }
          </div>
        }
      </div>
    </div>
  )
}

export default SearchPage