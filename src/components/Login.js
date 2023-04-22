import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import "firebase/compat/app";
import './login.css';
import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../firebase-config";
import {signInWithGoogle} from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { usePreviousUrl } from '../contexts/PreviousUrlProvider';

const Login = () => {
  const {previousUrl} = usePreviousUrl();

  const navigate = useNavigate();

  const handleSignIn = () => {
    signInWithGoogle().then(async res => {
      createUser(res.user);
    })
  }
  const usersRef = collection(db, "users");


  const createUser = async (user) => {
    const data = {
      email: user.email,
      name: user.displayName,
      role: "",
      pictureUrl: user.photoURL
    };
    const userId = (user.uid).toString();
    console.log(user);
    
    const userDocRef = doc(usersRef, userId);

    await setDoc(userDocRef, data)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    navigate(previousUrl);
  }
  return (
    <div id='login-page'>
      <div className='heading'>
        <h2>Welcome to Furry Friends</h2>
      </div>
      <div id='login-card'>
        <h2>Sign Up</h2>

        <div className="form-container">
          <div className='auth-signin-btn'>
            <div 
              className='login-button google'
              onClick={handleSignIn}
            >
              <FontAwesomeIcon icon={faGoogle} />oogle
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login