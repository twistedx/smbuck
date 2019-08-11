import React, { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/AuthContext';
import setAuthToken from '../../../utils/setAuthToken';
import ContestContext from '../../../context/contest/ContestContext';
import Navbar from '../../Layout/Navbar/Navbar';

const CCF = (props) => {


    const authContext = useContext(AuthContext);
    const contestContext = useContext(ContestContext);


    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, [])


    if (localStorage.token) {
        setAuthToken(localStorage.token);
    } else {
        props.history.push('/login');
    }

    const [contest, setContest] = useState({
        title: '',
        contestants: [],
        description: '',
        contestType: '',
        entryFee: '',
        location: '',
        rules: '',
        username: ''

    });


    const { title, contestants, description, contestType, entryFee, rules, location } = contest;

    const onChange = e => setContest({ ...contest, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()
        const username = authContext.user.name;
        var temp = {
            ...contest,
            title,
            contestants,
            description,
            contestType,
            entryFee,
            location,
            rules,
            username

        };

        contestContext.addContest(temp);
        setTimeout(() => {
            props.history.push('/');
        }, 1000);
    }

    return (
        <Fragment>
            <Navbar title="Create Contest" dropdown={false} home={true} />
            <main>
                < div className="container" >
                    <div className="card">
                        <div className="card-content">
                            <div className='form-container'>
                                <form onSubmit={onSubmit}>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Title of the Contest</label>
                                        <input
                                            type='text'
                                            name='title'
                                            value={title}
                                            placeholder='Enter a contest name'
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='description'>Enter your description</label>
                                        <input
                                            type='text'
                                            name='description'
                                            value={description}
                                            placeholder='Details go here'
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='type'>What Type of Contest ie: Buck, Pig, Etc</label>
                                        <input
                                            type='text'
                                            name='contestType'
                                            placeholder='Buck, Pig, Dove, etc'
                                            value={contestType}
                                            onChange={onChange}
                                            required

                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='type'>Scoring Ruleset</label>
                                        <input
                                            type='text'
                                            name='rules'
                                            placeholder='Boone and Crocket'
                                            value={rules}
                                            onChange={onChange}
                                            required

                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='type'>Where is the location of the contest</label>
                                        <input
                                            type='text'
                                            name='location'
                                            placeholder='Santa Maria, CA'
                                            value={location}
                                            onChange={onChange}
                                            required

                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='type'>What is your entry fee</label>
                                        <input
                                            type='number'
                                            name='entryFee'
                                            placeholder='10, 20, 30 etc'
                                            value={entryFee}
                                            onChange={onChange}
                                            required

                                        />
                                    </div>
                                    <input
                                        type='submit'
                                        value='Create Contest'
                                        className='btn btn-primary btn-block green darken-1'
                                    />
                                </form>
                            </div>
                        </div>
                    </div >
                </div>
            </main>
        </Fragment>
    )
}

export default CCF
