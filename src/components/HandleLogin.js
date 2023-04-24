import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePreviousUrl } from '../contexts/PreviousUrlProvider';
import { getAuth, signOut } from 'firebase/auth';

const HandleLogin = () => {
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
            alert('You have successfully logged out');
        }).catch((error) => {
            console.log(error);
        });

    }
    return (
        <>
            {
                !user ?
                <span style={{paddingLeft: '3em', cursor: 'pointer'}} onClick={handleLogin}>
                    Log In
                </span> : 
                <>
                    <span style={{paddingLeft: '3em', cursor: 'pointer'}} onClick={()=> setProfileDropdownOpen(!profileDropdownOpen)}>
                        <img src={userPic} alt={user.displayName.charAt(0)} width="40" height="40" style={{borderRadius: '50%'}} />
                    </span>
                    {
                        profileDropdownOpen &&
                        <ul id="profileDropdown" className="list-group">    
                            <li onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</li>
                        </ul>
                    }

                </>
            }
        </>
    )
}

export default HandleLogin