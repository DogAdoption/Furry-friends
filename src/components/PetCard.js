import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase-config';
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customToast } from '../functions/customToast'
import ConfirmToastBtn from './ConfirmToastBtn';
import { ref, deleteObject } from "firebase/storage";

const PetCard = ({dog}) => {
    
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleDelete = async () => {
        
        const dogDocumentRef = doc(db, 'dogs', dog.id);

        await deleteDoc(dogDocumentRef)
            .then(() => {
                //delete picture
                const fileRef = ref(storage, dog.pictureUrl);
                deleteObject(fileRef).then(() => {
                    customToast(toast.success, 'Dog data deleted successfully!')
                }).catch((error) => {
                    customToast(toast.error, error);
                })
            })
            .catch((err) => {
                customToast(toast.error, err);
            })
    }

    const confirmDelete = async () => {
        document.querySelector('.mainContainer').style.pointerEvents = "none"
        toast.info(`Are you sure you want to delete?`, {
            closeButton: <ConfirmToastBtn deleteHandler = {handleDelete} />,
            autoClose: false
        })
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
                    })} className='editBtn' icon={faEdit} /> <FontAwesomeIcon onClick={confirmDelete} className='deleteBtn' icon={faTrashCan} />
                </div>
            }
        </div>
    )
}

export default PetCard