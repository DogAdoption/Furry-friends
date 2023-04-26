import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLocationDot, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../contexts/UsersDataProvider';
import { customToast } from '../functions/customToast';
import { toast } from 'react-toastify';

const Details = () => {
    const location = useLocation();
    const dog = location.state ? location.state.dog : null;
    const navigate = useNavigate();
    const { user } = useAuth();

    const { users } = useUsers();

    const getOwner = () => users.find(u => u.id === dog.ownerId);

    const [owner, setOwner] = useState(getOwner());

    useEffect(() => {
        setOwner(getOwner());
    }, [users, dog])

    const openContactForm = () => {
        if(user) {
            navigate("/contactform", {
                state: {
                    owner: owner,
                    dog: dog
                }
            });
        } else {
            customToast(toast.error, 'Please login');
        }
    }
    
    return (
        <>
            <div className="backIcon" onClick={(e) => navigate('/search')}>
                <FontAwesomeIcon icon={faArrowLeftLong} /> Search page
            </div>
            <div className="detailsCard">
                <img src={dog.pictureUrl} alt="Avatar" />
                <div className="infoContainer">
                    <div className="info">
                        <div>
                            <h1><b>{dog.name}</b></h1> 
                            <p> <FontAwesomeIcon icon={faLocationDot} /> {dog.location}</p>
                        </div>
                        <div>
                            <h1><FontAwesomeIcon icon={faHeart} fontSize={20} /></h1>
                        </div>
                    </div>
                    <hr />
                    <div className='dogDetails'>
                        <div>
                            <div>{dog.age} months</div>
                            <div>Age</div>
                        </div>
                        <div style={{textTransform: 'capitalize'}}>
                            <div>{dog.gender}</div>
                            <div>Gender</div>
                        </div>
                        <div>
                            <div>{dog.weight} Kg</div>
                            <div>Weight</div>
                        </div>
                    </div>
                    <hr />
                    <div className="story">
                        <h2>Story</h2>
                        <p>
                            {dog.story}
                        </p>
                    </div>
                    <div className='contactMe'>
                        {owner &&
                        <>
                            <img src={owner.pictureUrl} alt={owner.name} />
                            <div className='ownerInfo'>
                                <div>Posted By</div>
                                <div>{owner.name}</div>
                            </div>
                        </>}
                        <button className='blueBtn' onClick={openContactForm}>Contact Me</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details