import React from 'react'

const Filter = () => {
  return (
    <div className="filters">
        <div>
          <p>Breed</p>
          <select>
            <option value="0">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
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
          <select>
            <option value="0">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
    </div>
  )
}

export default Filter