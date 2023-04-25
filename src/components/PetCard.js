import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase-config';
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomToastBtn from './CustomToastBtn';

const PetCard = ({dog}) => {
    
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleToast = (toastFun, message) => {
        document.querySelector('.mainContainer').style.pointerEvents = "none"
    
        toastFun(message, {
            closeButton: <CustomToastBtn />,
            autoClose: false,
        });
    }

    const handleDelete = async () => {

        const dogDocumentRef = doc(db, 'dogs', dog.id);

        await deleteDoc(dogDocumentRef)
            .then(() => {
                handleToast(toast.success,'Dog data deleted successfully!');
            })
            .catch((err) => {
                handleToast(toast.error, err);
            })
    }

    const confirmDelete = () => {
        handleToast(toast.info, `Are you sure you want to delete this dog's information?`);
    }
    
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
                    })} className='editBtn' icon={faEdit} /> <FontAwesomeIcon onClick={handleDelete} className='deleteBtn' icon={faTrashCan} />
                </div>
            }
        </div>
    )
}

export default PetCard