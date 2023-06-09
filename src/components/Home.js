import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { customToast } from '../functions/customToast';
import { toast } from 'react-toastify';
import dogPicture from '../images/dog.jpg'
import { useDogs } from '../contexts/DogsDataProvider';

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

  const [state, setState] = useState(() => {
    let location = localStorage.getItem('currentLocation');
    return location ? location : indianStates[27];
  });

  const [adopt, setAdopt] = useState(false);

  const {setCurrentLocation} = useDogs();

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDonate = () => {
    if(user) {
      navigate('/donate');
    } else {
      customToast(toast.error, 'Please log in');
    }
  }

  const resetFilter = () => {
    localStorage.setItem('filterBreed', 'any');
    localStorage.setItem('filterAge', 'any');
    localStorage.setItem('filterGender', 'any');
  }

  const handleLocationChange = (e) => {
    let currentLocation = e.target.value;
    setState(currentLocation);
    localStorage.setItem('currentLocation', currentLocation);
    setCurrentLocation(currentLocation);
    resetFilter();
  }
  
  return (
    <div className='home'>
      <img src={dogPicture} alt="" />
      <div className='tagLine'>
        <h1>Adopt. <br />don't shop.</h1>
      </div>

      <div className='purposeBtns'>
        <h2>Are you here to donate or adopt ?</h2>
        <button style={{marginRight: '5px'}} className='continueBtn' onClick={()=>setAdopt(true)}>ADOPT</button>
        <button onClick={handleDonate} className='continueBtn'>DONATE</button>
      </div>

      {
        adopt &&
        <div className='getLocation'>
          <h2 >Where would you like to search?</h2>
          <span className='locationQuestionContainer'>
            <select value={state} onChange={handleLocationChange}>
              {
                indianStates.map(state => <option key={state} value={state}>{state}</option>)
              }
            </select>

            {/* <select value={distance} onChange={(e) => setDistance(e.target.value)}>
              {
                distances.map(dis => (
                  dis.toString() === 'Anywhere' ? <option key={dis} value={dis}>{dis}</option> :
                  <option key={dis} value={dis}>Within {dis} miles</option>
                ))
              }
            </select> */}
          </span>
          <Link to='/search' state={{
            location: state
          }}>
            <button className='continueBtn'>Continue</button>
          </Link>
        </div>
      }
    </div>
  )
}

export default Home