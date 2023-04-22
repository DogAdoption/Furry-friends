import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from "emailjs-com";
import './formStyles.css';
import { useAuth } from '../contexts/AuthContext';

const ContactForm = () => {
    // const EMAILJS_SERVICE_ID = process.env.REACT_EMAILJS_SERVICE_ID;
    // const EMAILJS_TEMPLATE_ID = process.env.REACT_EMAILJS_TEMPLATE_ID;
    // const EMAILJS_PUBLIC_KEY = process.env.REACT_EMAILJS_PUBLIC_KEY;

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
        "service_vmtx356",
        "template_v5uz89q",
        emailParams,
        "w9se5pqEThICt6SDE"
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
            {/* <div className="form-row">
                <label>Name</label>
                <input className='cardInput' type="text" name='fromName' value={fromName} onChange={(e) => setFromName(e.target.value)} required />
            </div>  
            <div className="form-row">
                <label>Email</label>
                <input className='cardInput' type="email" name='fromEmail' value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} required />
            </div> */}
            <div className="form-row">
                <textarea className='cardInput' name="message" cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <button
                type="submit"
                onClick={sendEmail}
            >
                Send
            </button>
        </form>
    </div>
  )
}

export default ContactForm