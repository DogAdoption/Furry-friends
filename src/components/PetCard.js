import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const PetCard = ({dog}) => {
    return (
        <Link to='/details' state={{
            dog: dog
        }}>
            <div className='petCard grid-item'>
                <FontAwesomeIcon icon={faHeart} className='heartIcon' />
                <img src={dog.pictureUrl} alt="" />
                <p>{dog.name}</p>
                {dog.breed} <br />
                {7} miles away
            </div>
        </Link>
    )
}

export default PetCard