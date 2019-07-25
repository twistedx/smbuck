import React, { useState, useEffect, useContext, Fragment } from 'react'
import UserDashboardCard from '../UserDashboardCard/UserDashboardCard.js';
import { useHttp } from '../../Hooks/Fetch';
import AuthContext from '../../../context/auth/AuthContext';
import setAuthToken from '../../../utils/setAuthToken';
import loadingImg from '../../../img/loading.gif';
import Navbar from '../../Layout/Navbar/Navbar';
import Contest from '../Contest/Contest'


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

    // load dom ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    return (
        <Fragment>
            <Navbar title="Dashboard" dropdown={true} home={false} createcontest={true} token={token} />
            <main>
                <UserDashboardCard
                    name={profile === loading ? profile : profile.name}
                    email={profile === loading ? profile : profile.email}
                    team={profile === loading ? profile : profile.team}
                />
                <Contest />

            </main>
        </Fragment>
    )

}

export default Dashboard;