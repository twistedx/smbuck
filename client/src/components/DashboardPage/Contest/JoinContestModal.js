import React, { useContext, useEffect, useState } from 'react';
import './JoinContestModal.css';
// import Navbar from '../../Layout/Navbar/Navbar';
// import ContestContext from '../../../context/contest/ContestContext';
// import AuthContext from '../../../context/auth/AuthContext';
// import Placeholder from './Placeholder';

const JoinContestModal = props => {

    // const contestContext = useContext(ContestContext);
    // const authContext = useContext(AuthContext);
    // const { current } = contestContext;
    // const userName = getUserName(current.owner);

    const styles = {
        show: {
            left: 'calc(50% - 30vw)',
            transition: 'left ease-in-out .5s, opacity ease-in-out .75s',
            opacity: 1,

        },
        hide: {
            left: '-100vw',
            opacity: 0
        },
    }


    return (
        <section id='modal' style={ props.open ? styles.show : styles.hide }>
            <div id='modalClose'>
                <div> &#215;  </div>
            </div>
        </section>
    )
}

export default JoinContestModal;
