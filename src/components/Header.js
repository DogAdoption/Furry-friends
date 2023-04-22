import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faDog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import HandleLogin from './HandleLogin';

const Header = ({count, maxDistance, location}) => {

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
                <span>{63} dogs</span>
                <span>{100} miles</span>
                <span>near {'Piti Municipality, Guam'}</span>
            </div>
        </div>
    )
}

export default Header