import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faDog, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import HandleLogin from './HandleLogin';
import { useDogs } from '../contexts/DogsDataProvider';

const Header = () => {

    const {currentDogCount} = useDogs();

    const getCurrentLocation = () => {
        let location =  localStorage.getItem("currentLocation");
        if(location) return location;
        return 'West Bengal';
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
                    <FontAwesomeIcon icon={faHeart} style={{fontSize: 25, position: 'absolute', top: 26}}/>
                    <HandleLogin />
                </div>
            </div>
            <div className='dataInfoContainer'>
                <span>{currentDogCount} dogs</span>
                <span>
                    <FontAwesomeIcon icon={faLocationDot} /> {getCurrentLocation()}
                </span>
            </div>
        </div>
    )
}

export default Header