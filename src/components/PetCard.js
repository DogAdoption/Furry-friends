import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const PetCard = ({petName, breed, distance, avatar}) => {
    return (
        <Link to='/details'>
            <div className='petCard grid-item'>
                <FontAwesomeIcon icon={faHeart} className='heartIcon' />
                <img src={avatar} alt="" />
                <p>{petName}</p>
                {breed} <br />
                {7} miles away
            </div>
        </Link>
    )
}

export default PetCard