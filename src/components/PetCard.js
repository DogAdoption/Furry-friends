import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PetCard = ({dog}) => {
    const {user} = useAuth();
    const navigate = useNavigate();
    return (
        <div className='petCardContainer'>
            <Link to='/details' state={{
                dog: dog
            }}>
                <div className='petCard grid-item'>
                    <FontAwesomeIcon icon={faHeart} className='heartIcon' />
                    <img src={dog.pictureUrl} alt="dog" />
                    <p>{dog.name}</p>
                    {dog.breed} <br />
                    {7} miles away
                </div>
            </Link>
            {
                user && user.uid === dog.ownerId &&
                <div className='editBtns'>
                    <FontAwesomeIcon onClick={() => navigate('/edit', {
                        state: {
                            dog: dog
                        }
                    })} className='editBtn' icon={faEdit} /> <FontAwesomeIcon className='deleteBtn' icon={faTrashCan} />
                </div>
            }
        </div>
    )
}

export default PetCard