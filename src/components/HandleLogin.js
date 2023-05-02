import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePreviousUrl } from '../contexts/PreviousUrlProvider';
import { getAuth, signOut } from 'firebase/auth';
import { customToast } from '../functions/customToast';
import { toast } from 'react-toastify';

const HandleLogin = () => {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { user } = useAuth();
    let userPic = null;
    if(user) {
        userPic = user.photoURL;
    }

    const navigate = useNavigate();

    const location = useLocation();

    const {setPreviousUrl} = usePreviousUrl();
    const handleLogin = () => {
        setProfileDropdownOpen(false);
        if(user) return;
        setPreviousUrl(location.pathname);
        navigate('/login');
    }

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            customToast(toast.success, 'You have successfully logged out');
        }).catch((error) => {
            customToast(toast.error, error);
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