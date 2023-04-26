import React from 'react'

const Filter = ({dogs, dog}) => {

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
          <select value={dog.breed} onChange={(e) => dog.setBreed(e.target.value)}>
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
          <select value={dog.age} onChange={(e) => dog.setAge(e.target.value)}>
            <option value="any">Any</option>
            <option value="young">Young (0-1 year)</option>
            <option value="adult">Adult (2-7 year)</option>
            <option value="scenior">Scenior (&gt; 7 year)</option>
          </select>
        </div>
        <div>
          <p>Gender</p>
          <select value={dog.gender} onChange={(e) => dog.setGender(e.target.value)}>
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
    </div>
  )
}

export default Filter