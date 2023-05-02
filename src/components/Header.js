import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faLocationDot, faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import HandleLogin from './HandleLogin';
import { useDogs } from '../contexts/DogsDataProvider';

const Header = () => {

    const [showFilter, setShowFilter] = useState(false);

    const {currentDogCount} = useDogs();

    const locationUrl = window.location.href;

    const getCurrentLocation = () => {
        let location =  localStorage.getItem("currentLocation");
        if(location) return location;
        return 'West Bengal';
    }

    const toggleFilterBar = () => {
        const filterBar = document.querySelector('.filterTopBar');
        if(filterBar.style.display === 'none' || showFilter === false) {
            filterBar.style.display = 'block';
            setShowFilter(true);
        } else {
            filterBar.style.display = 'none';
            setShowFilter(false);
        }
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
                    {/* <FontAwesomeIcon icon={faHeart} style={{fontSize: 25, position: 'absolute', top: 26}}/> */}
                    <HandleLogin />
                </div>
            </div>
            <div className='dataInfoContainer'>
                {
                    locationUrl.includes('search') && <span>{currentDogCount} dogs</span>
                }
                <span>
                    <FontAwesomeIcon icon={faLocationDot} /> {getCurrentLocation()}, India
                </span>
                {
                    locationUrl.includes('search') && 
                    <FontAwesomeIcon className='slider' onClick={toggleFilterBar} icon={showFilter ? faXmark : faSliders} />
                }
            </div>
        </div>
    )
}

export default Header