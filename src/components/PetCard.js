import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const PetCard = ({petName, breed, distance}) => {
    let avatar = "https://hips.hearstapps.com/hmg-prod/images/small-fuffy-dog-breeds-1623362663.jpg?crop=1.00xw:0.753xh;0,0.0719xh&resize=1200:*";
    return (
        <Link to='/details'>
            <div className='petCard grid-item'>
                <FontAwesomeIcon icon={faHeart} className='heartIcon' />
                <img src={avatar} alt="" />
                <p>{'Chicku'}</p>
                {'Chihuahua'} <br />
                {7} miles away
            </div>
        </Link>
    )
}

export default PetCard