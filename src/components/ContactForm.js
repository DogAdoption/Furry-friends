import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from "emailjs-com";
import './formStyles.css';
import { useAuth } from '../contexts/AuthContext';

const ContactForm = () => {
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // const [fromName, setFromName] = useState('');
  // const [fromEmail, setFromEmail] = useState('');
  const [message, setMessage] = useState('');

  const container = useRef();

  const navigate = useNavigate();

  const location = useLocation();
  const to_email = location.state ? location.state.to_email : null;

  const { user } = useAuth();

  const sendEmail = (event) => {
    //email to the donor from adopter
    event.preventDefault();
    const emailParams = {
      from_email: user.email,
      to_email: to_email,
      from_name: user.displayName,
      to_name: 'Owner_name',
      message: message
      
    };
    
    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams,
        EMAILJS_PUBLIC_KEY
    ).then(
        result => {
          alert('Thanks for contacting!');
          navigate('/');
        },
        error => console.log(error.text)
    );
  }

  if(!user || !to_email) {
    return <p>You cannot view the page...</p>
  }

  return (
    <div className='contactPage' ref={container}>
        <h2>Send a message to the donor!</h2>
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