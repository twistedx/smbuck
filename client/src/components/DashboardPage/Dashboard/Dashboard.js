import React, { useState, useEffect, useContext, Fragment } from 'react'
import UserDashboardCard from '../UserDashboardCard/UserDashboardCard.js';
import BtnCardReveal from '../../BtnList/BtnCardReveal';
import EntryModal from '../../Modal/EntryModal';
import { useHttp } from '../../Hooks/Fetch';
import AuthContext from '../../../context/auth/AuthContext';
import setAuthToken from '../../../utils/setAuthToken';
import loadingImg from '../../../img/loading.gif';
import Navbar from '../../Layout/Navbar/Navbar';



const Dashboard = (props) => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    } else {
        props.history.push('/login')
    }


    console.log(`
    this is the token:
    ${authContext.token}
    
    `)


    // const loading = 'loading . . .';
    const loading = 'loading . . .';
    const [profile, setProfile] = useState(loading)
    const profileLoadingChecker = (obj) => { obj ? setProfile(obj) : setProfile(loading) };

    const [contest, setContest] = useState(loading)
    const contestLoadingChecker = (arr) => { arr[0] ? setContest(arr) : setContest(loading) };

    const token = authContext.token;
    let h = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    h['x-auth-token'] = token;

    //fetch user profile =============================================================================================
    let fetchedProfile = useHttp('/api/user', 'GET', '', h, []);
    const p = fetchedProfile[1];

    useEffect(() => profileLoadingChecker(p[0]), [p[0]]);

    const profileloading = fetchedProfile[0];


    if (profile) {
        console.log(`
        
            this is fetchedprofile
            ${profile.name}
            
            `);
    }

    const loadingTimeout = () => {
        if (j.length === 0) {
            return <h3 className="center">Please Create a Entry</h3>;
        } else {
            return <img src={loadingImg} style={{ height: '200px', width: '200px', position: 'absolute', top: 'calc(50% - 100px', left: 'calc(50% - 100px' }} />;
        }
    }


    //fetch Entry Profile ==============================================================================================
    let fetchedContest = useHttp('/api/contest', 'GET', '', h, []);
    const entryloading = fetchedContest[0];
    const j = fetchedContest[1];

    useEffect(() => contestLoadingChecker(j), [j]);

    console.log(`
        
        this is contestprofile
        ${JSON.stringify(j)}
        
        `);



    // load dom ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    return (
        <Fragment>
            <Navbar title="Dashboard" dropdown={true} home={false} addentry={true} token={token} />
            <main>


                <UserDashboardCard
                    name={profile === loading ? profile : profile.name}
                    email={profile === loading ? profile : profile.email}
                    team={profile === loading ? profile : profile.team}
                />

                {fetchedContest === loading ? loadingTimeout() : fetchedContest.map((v, i) => {
                    return <div className="heightSize"><BtnCardReveal
                        key={i}
                        entryId={v._id}
                        title={v.name}
                        description={v.description}
                        contestants={v.contestants}
                    />
                    </div>
                })
                }
            </main>
        </Fragment>
    )

}

export default Dashboard;