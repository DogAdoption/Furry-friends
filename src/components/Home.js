import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  const distances = [10, 25, 100, 'Anywhere'];

  const [state, setState] = useState(indianStates[27]);
  const [distance, setDistance] = useState(100);
  const [adopt, setAdopt] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDonate = () => {
    if(user) {
      navigate('/donate');
    } else {
      alert('Please log in');
    }
  }
  
  return (
    <div className='home'>
      <img src="https://cdn.mos.cms.futurecdn.net/ASHH5bDmsp6wnK6mEfZdcU.jpg" alt="" />
      <div className='tagLine'>
        <h1>Adopt. <br />don't shop.</h1>
      </div>

      <div style={{textAlign: 'center'}}>
        <h2>Are you here to donate or adopt ?</h2>
        <button style={{display: 'inline', marginRight: '5px', borderRadius: 0}} className='continueBtn' onClick={()=>setAdopt(true)}>ADOPT</button>
        <button onClick={handleDonate} style={{display: 'inline', borderRadius: 0}} className='continueBtn'>DONATE</button>
      </div>

      {
        adopt &&
        <>
          <h2 style={{textAlign: 'center'}}>Where would you like to search?</h2>
          <div className='locationQuestionContainer'>
            <select value={state} onChange={(e) => setState(e.target.value)}>
              {
                indianStates.map(state => <option key={state} value={state}>{state}</option>)
              }
            </select>

            <select value={distance} onChange={(e) => setDistance(e.target.value)}>
              {
                distances.map(dis => (
                  dis.toString() === 'Anywhere' ? <option key={dis} value={dis}>{dis}</option> :
                  <option key={dis} value={dis}>Within {dis} miles</option>
                ))
              }
            </select>
          </div>
          <Link to='/search' state={{
            location: state
          }}>
            <button className='continueBtn'>Continue</button>
          </Link>
        </>
      }
    </div>
  )
}

export default Home