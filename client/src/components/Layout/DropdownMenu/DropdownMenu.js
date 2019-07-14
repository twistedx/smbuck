import React, { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/auth/AuthContext';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';

const DropdownMenu = props => {

    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, user } = authContext;

    // console.log(isAdmin);
    const [display, setDisplay] = useState(false);

    const displayLinks = () => {
        if (display) {
            if (user.isAdmin) {
                return hiddenLinks;
            } else {
                return;
            }
        }
    }

    useEffect(() => {
        M.AutoInit();
        console.log(authContext.user)
        if (!user == null) {
            setDisplay(true);
        }
        //eslint-disable-next-line
    }, []);

    const onLogout = () => {
        logout();
    };

    const hiddenLinks = (
        <Fragment>
            <li className="divider"></li>
            <li>
                <Link to='/createContest'>Create Contest</Link>
            </li>
        </Fragment>
    );

    const authLinks = (
        <div className="right">
            <li>
                <Link to='/edituser'>Edit Profile</Link>
            </li>
            <li className="divider"></li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <span>Logout</span>
                </a>
            </li>
            {display ? hiddenLinks : null}
        </div>
    );

    const guestLinks = (
        <Fragment>
            <div className="right">
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li className="divider"></li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </div>
        </Fragment>
    );

    return (

        <div>
            <style>
                @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans&display=swap');
            </style>

            <ul id="dropdown1" className="dropdown-content">
                {isAuthenticated ? authLinks : guestLinks}

            </ul>

            <div className="nav-wrapper" style={{ display: props.visible ? 'block' : 'none' }}>
                <ul className="right">
                    <li><a className="dropdown-trigger" href="#!" data-target="dropdown1"><i className="material-icons right">menu</i></a></li>
                </ul>
            </div>
        </div>

    )
}

export default DropdownMenu
