import React, { useState, useEffect, useContext } from 'react'
import './BtnCardReveal.css';
import { useHttp } from '../Hooks/Fetch';
import AuthContext from '../../context/auth/AuthContext';
import setAuthToken from '../../utils/setAuthToken';
import ClockingBtns from './clockingBtns';
import EditBtn from './EditBtn';


const BtnCardReveal = (props) => {
    //set auth=========================================================================
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
    }, [])

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    //set global variables ============================================================================
    const token = authContext.token;
    const jobId = props.jobId;
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    headers['x-auth-token'] = token;


    //fetch timecards for each job ========================================================================
    let fetchedTc = useHttp('/api/timecard/' + jobId, 'GET', '', headers, []);
    const latestTcArr = fetchedTc[1];
    const latestTc = latestTcArr[0];
    useEffect(() => { setTcObj(latestTc) }, [latestTc])



    //hooks ==================================================================================================
    const [cardHeight, setCardHeight] = useState();
    const [tcObj, setTcObj] = useState({ msg: 'fetch has not finished yet' });

    return (
        <div className="contest">

        </div>
    )
};

export default BtnCardReveal;