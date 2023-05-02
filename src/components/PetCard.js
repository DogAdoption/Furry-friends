import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase-config';
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customToast } from '../functions/customToast'
import ConfirmToastBtn from './ConfirmToastBtn';
import { ref, deleteObject } from "firebase/storage";
import { useUsers } from '../contexts/UsersDataProvider';

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

    const { users } = useUsers();

    const getOwner = () => users.find(u => u.id === dog.ownerId);

    const showDetails = () => {
        localStorage.setItem('currentDog', JSON.stringify(dog));
        localStorage.setItem('currentDogOwner', JSON.stringify(getOwner()));
        navigate('/details');
    }

    const getAge = (age) => {
        if(age <= 1) return 'Young'
        if(age <= 7) return 'Adult'
        return 'Scenior'
    } 
    
    return (
        <div className='petCardContainer'>
                <div className='petCard grid-item' onClick={showDetails}>
                    {/* <FontAwesomeIcon icon={faHeart} className='heartIcon' /> */}
                    <img src={dog.pictureUrl} alt="dog" />
                    <p>{dog.name}</p>
                    {getAge(dog.age)} <span class="dot">.</span> {dog.breed} <br />
                </div>
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