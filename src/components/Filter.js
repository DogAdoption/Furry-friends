import React from 'react'

const Filter = ({dogs, breed, setBreed, gender, setGender}) => {

  const getBreeds = () => {
    const breeds = new Set();

    dogs.forEach(dog => {
      breeds.add(dog.breed)
    });

    return Array.from(breeds);
  }

  return (
    <div className="filters">
        <div>
          <p>Breed</p>
          <select value={breed} onChange={(e) => setBreed(e.target.value)}>
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
          <select>
            <option value="0">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <p>Gender</p>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
    </div>
  )
}

export default Filter