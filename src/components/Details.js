import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Details = ({name, location, age, gender, weight, ownerName, owner_email}) => {
    let avatar = "https://hips.hearstapps.com/hmg-prod/images/small-fuffy-dog-breeds-1623362663.jpg?crop=1.00xw:0.753xh;0,0.0719xh&resize=1200:*";
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const openContactForm = () => {
        if(user) {
            navigate("/contactform", {
                state: {
                    to_email: 'finalyearprojectsdduem@gmail.com'
                }
            });
        } else {
            alert('Please login');
        }
    }
    
    return (
        <div className="detailsCard">
            <img src={avatar} alt="Avatar" />
            <div className="infoContainer">
                <div className="info">
                    <div>
                        <h1><b>{'Walley'}</b></h1> 
                        <p> <FontAwesomeIcon icon={faLocationDot} /> {'location...'}</p>
                    </div>
                    <div>
                        <h1><FontAwesomeIcon icon={faHeart} fontSize={20} /></h1>
                    </div>
                </div>
                <hr />
                <div className='dogDetails'>
                    <div>
                        <div>{12} months</div>
                        <div>Age</div>
                    </div>
                    <div>
                        <div>{'Male'}</div>
                        <div>Gender</div>
                    </div>
                    <div>
                        <div>{23} Kg</div>
                        <div>Weight</div>
                    </div>
                </div>
                <hr />
                <div className="story">
                    <h2>Story</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div className='contactMe'>
                    <img src={avatar} alt="" />
                    <div className='ownerInfo'>
                        <div>Posted By</div>
                        <div>{'Nany Barker'}</div>
                    </div>
                    <button onClick={openContactForm}>Contact Me</button>
                </div>
            </div>
        </div>
    )
}

export default Details