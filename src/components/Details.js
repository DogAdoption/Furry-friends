import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { customToast } from '../functions/customToast';
import { toast } from 'react-toastify';

const Details = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const currentDog = JSON.parse(localStorage.getItem('currentDog'));
    const currentDogOwner = JSON.parse(localStorage.getItem('currentDogOwner'));

    const openContactForm = () => {
        if(user) {
            navigate("/contactform", {
                state: {
                    owner: currentDogOwner,
                    dog: currentDog
                }
            });
        } else {
            customToast(toast.error, 'Please login');
        }
    }
    console.log(user);
    
    return (
        <>
            <div className="backIcon" onClick={(e) => navigate('/search')}>
                <FontAwesomeIcon icon={faArrowLeftLong} /> Search page
            </div>
            <div className="detailsCard">
                <img src={currentDog.pictureUrl} alt="Avatar" />
                <div className="infoContainer">
                    <div className="info">
                        <div>
                            <h1><b>{currentDog.name}</b></h1> 
                            <p> <FontAwesomeIcon icon={faLocationDot} /> {currentDog.location}</p>
                        </div>
                        {/* <div>
                            <h1><FontAwesomeIcon icon={faHeart} fontSize={20} /></h1>
                        </div> */}
                    </div>
                    <hr />
                    <div className='dogDetails'>
                        <div>
                            <div>{currentDog.age} months</div>
                            <div>Age</div>
                        </div>
                        <div style={{textTransform: 'capitalize'}}>
                            <div>{currentDog.gender}</div>
                            <div>Gender</div>
                        </div>
                        <div>
                            <div>{currentDog.weight} Kg</div>
                            <div>Weight</div>
                        </div>
                    </div>
                    <hr />
                    <div className="story">
                        <h2 style={{fontSize: '1.6vw'}}>Story</h2>
                        <p>
                            {currentDog.story}
                        </p>
                    </div>
                    <div className='contactMe'>
                        {currentDog &&
                        <>
                            <img src={currentDogOwner.pictureUrl} alt={currentDogOwner.name} />
                            <div className='ownerInfo'>
                                <div>Posted By</div>
                                <div>{currentDogOwner.name}</div>
                            </div>
                        </>}
                        {
                            (!user || currentDogOwner.id !== user.uid) &&
                            <button className='blueBtn' onClick={openContactForm}>Contact Me</button>
                        }
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details