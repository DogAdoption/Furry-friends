import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import HandleLogin from './HandleLogin';
import { useDogs } from '../contexts/DogsDataProvider';

const Header = () => {

    const {currentDogCount} = useDogs();

    const locationUrl = window.location.href;

    const {currentLocation} = useDogs();

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
                    <HandleLogin />
                </div>
            </div>
            <div className='dataInfoContainer'>
                {
                    locationUrl.includes('search') && <span>{currentDogCount} dogs</span>
                }
                <span>
                    <FontAwesomeIcon icon={faLocationDot} /> {currentLocation}, India
                </span>
            </div>
        </div>
    )
}

export default Header