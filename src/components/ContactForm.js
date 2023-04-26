import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from "emailjs-com";
import './formStyles.css';
import { useAuth } from '../contexts/AuthContext';
import uuid from 'uuid-random';
import { customToast } from '../functions/customToast';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_OWNER_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_OWNER_ID;
  const EMAILJS_TEMPLATE_ADOPTER_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ADOPTER_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  console.log(EMAILJS_SERVICE_ID)
  console.log(EMAILJS_TEMPLATE_OWNER_ID)
  console.log(EMAILJS_TEMPLATE_ADOPTER_ID)
  console.log(EMAILJS_PUBLIC_KEY)

  const [message, setMessage] = useState('');

  const container = useRef();

  const navigate = useNavigate();

  const location = useLocation();
  const owner = location.state ? location.state.owner : null;
  const dog = location.state ? location.state.dog : null;

  const { user } = useAuth();

  const sendEmail = (event) => {
    const chatroom_id = dog.id + uuid();
    //email to the donor from adopter
    event.preventDefault();
    const emailToOwnerParams = {
      to_email: owner.email,
      from_name: user.displayName,
      to_name: owner.name,
      message: message,
      dog_id: dog.id,
      room_Id: chatroom_id
    };

    const emailToUserParams = {
      to_email: user.email,
      to_name: user.displayName,
      room_Id: chatroom_id,
      dog_id: dog.id
    };
    
    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_OWNER_ID,
        emailToOwnerParams,
        EMAILJS_PUBLIC_KEY
    ).then(
        result => {
          emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ADOPTER_ID,
            emailToUserParams,
            EMAILJS_PUBLIC_KEY
          ).then(
            async res => {
              customToast(toast.info, 'Thanks for contacting! Check your mail with the chat room id')
              navigate('/');
            },
            err => customToast(toast.error, err.text)
          )
        },
        error => customToast(toast.error, error.text)
    );
  }

  if(!user || !owner) {
    return <p>You cannot view the page...</p>
  }

  return (
    <div className='contactPage' ref={container}>
        <h2>Send a message to the pet owner!</h2>
        <form className='contactForm'>
            <div className="form-row">
                <textarea className='cardInput' name="message" cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <div className='btns'>
              <button type="submit" onClick={sendEmail} className='blueBtn' >Send</button>
              <button type="submit" onClick={() => navigate(-1)} className='redBtn' >Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default ContactForm