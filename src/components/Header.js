import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faDog } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePreviousUrl } from '../contexts/PreviousUrlProvider';
import { getAuth, signOut } from "firebase/auth";

const Header = ({count, maxDistance, location}) => {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { user } = useAuth();
    let userPic = null;
    if(user) {
        userPic = user.photoURL;
    }

    const navigate = useNavigate();

    const {setPreviousUrl} = usePreviousUrl();
    const handleLogin = () => {
        setProfileDropdownOpen(false);
        if(user) return;
        const locationUrl = window.location.href;
        setPreviousUrl(locationUrl.substring(21).toString());
        navigate('/login');
    }

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            alert('You have successfully logged out')
        }).catch((error) => {
            console.log(error);
        });

    }

    return (
        <div className='headerContainer'>
            <div className='topHeader'>
                <div>
                    <Link to='/' className='brandName'>
                        <FontAwesomeIcon icon={faDog} style={{fontSize: 25}}/>
                        <i>Furry Friends</i>
                    </Link>
                    <Link to='/' style={{color: 'black'}}>
                        Home
                    </Link>
                </div>
                <div>
                    <FontAwesomeIcon icon={faHeart} style={{fontSize: 25, position: 'absolute', top: 26}}/>
                    {
                        !user ?
                        <span style={{paddingLeft: '3em', cursor: 'pointer'}} onClick={handleLogin}>
                            Log In
                        </span> : 
                        <>
                            <span style={{paddingLeft: '3em', cursor: 'pointer'}} onClick={()=> setProfileDropdownOpen(!profileDropdownOpen)}>
                                <img src={userPic} alt={user.displayName} width="40" height="40" style={{borderRadius: '50%'}} />
                            </span>
                            {
                                profileDropdownOpen &&
                                <ul id="profileDropdown" className="list-group">    
                                    <li onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</li>
                                </ul>
                            }

                        </>
                    }
                </div>
            </div>
            <div className='dataInfoContainer'>
                <span>{63} dogs</span>
                <span>{100} miles</span>
                <span>near {'Piti Municipality, Guam'}</span>
            </div>
        </div>
    )
}

export default Header