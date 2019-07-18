import React, { useState, useEffect, useContext } from 'react'
import './BtnCardReveal.css';
import { useHttp } from '../Hooks/Fetch';
import AuthContext from '../../context/auth/AuthContext';
import setAuthToken from '../../utils/setAuthToken';
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
    const contestId = props.contestId;
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    headers['x-auth-token'] = token;


    // //fetch timecards for each job ========================================================================
    // let fetchedTc = useHttp('/api/timecard/' + jobId, 'GET', '', headers, []);
    // const latestTcArr = fetchedTc[1];
    // const latestTc = latestTcArr[0];
    // useEffect(() => { setTcObj(latestTc) }, [latestTc])



    //hooks ==================================================================================================
    const [cardHeight, setCardHeight] = useState();
    const [tcObj, setTcObj] = useState({ msg: 'fetch has not finished yet' });

    return (
        <div className='container'>
            <div className="card" data-id={contestId} style={{ height: cardHeight }}>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4" onClick={() => setCardHeight('300px')} > {props.title} <i className="material-icons right" >keyboard_arrow_down</i></span>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4" onClick={() => setCardHeight()} > {props.title} <i className="material-icons right">close</i></span>
                    <div>
                        <span className='title'>Contest Description: </span>
                        {props.description}
                    </div>
                    <div>
                        <span className='title'>Current Enteries: </span>
                        {props.contestants}
                    </div>
                    <ul>

                        <li>
                            <div id='btnList'>
                                <button className="btn-floating btn-small waves-effect waves-light blue hoverable" value='All Timecards' onClick={() => window.location = "/timecards/" + props.jobId}>
                                    <i className="material-icons small">library_books</i>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <EditBtn url="/editjob/" id={contestId} title='Join Contest' key={contestId} />
                </div>
            </div>
        </div>
    )
};

export default BtnCardReveal;