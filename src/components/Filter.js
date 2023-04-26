import React from 'react'

const Filter = ({dogs, dog}) => {

  const getBreeds = () => {
    const breeds = new Set();

    dogs.forEach(dog => {
      breeds.add(dog.breed)
    });

    return Array.from(breeds);
  }

  const changeBreed = (e) => {
    let breed = e.target.value;
    dog.setBreed(breed);
    localStorage.setItem('filterBreed', breed);
  }

  const changeGender = (e) => {
    let gender = e.target.value;
    dog.setGender(gender);
    localStorage.setItem('filterGender', gender);
  }

  const changeAge = (e) => {
    let age = e.target.value;
    dog.setAge(age);
    localStorage.setItem('filterAge', age);
  }

  return (
    <div className="filters">
        <div>
          <p>Breed</p>
          <select value={dog.breed} onChange={changeBreed}>
            <option value="any">Any</option>
            {
              getBreeds().map(
                breed => <option key={breed} value={breed}>{breed}</option>
              )
            }
          </select>
        </div>
        <div>
          <p>Age</p>
          <select value={dog.age} onChange={changeAge}>
            <option value="any">Any</option>
            <option value="young">Young (0-1 year)</option>
            <option value="adult">Adult (2-7 year)</option>
            <option value="scenior">Scenior (&gt; 7 year)</option>
          </select>
        </div>
        <div>
          <p>Gender</p>
          <select value={dog.gender} onChange={changeGender}>
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
    </div>
  )
}

export default Filter