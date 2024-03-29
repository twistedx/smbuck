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
            <div id='modalClose'>&#215;</div>
            <div class="inputForm">  
                <input class="contestInput" id="name" type="text" name="name" placeholder="Name"></input>
                <input class="contestInput" id="email" type="email" name="email" placeholder="email"></input>
                <input class="contestInput" id="phone" type="text" name="phone" placeholder="555-555-5555"></input>
                <input class="contestInput" id="team" type="text" name="team" placeholder="Team Name"></input>
                <input class="contestInput" id="contestRef" type="text" name="refereance" placeholder="Refereance Name"></input>
                <input class="contestInput" id="date" type="date" name="date"></input>
            </div>
            <button type="btn" id="joinContestSubmit">Submit</button>
        </section>
    )
}

export default JoinContestModal;
