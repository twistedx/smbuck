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
        contestType: ''

    });


    const { title, contestants, description, contestType } = contest;

    const onChange = e => setContest({ ...contest, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()

        var temp = {
            ...contest,
            title,
            contestants,
            description,
            contestType

        };

        contestContext.addContest(temp);

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
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='type'>What Type of Contest ie: Buck, Pig, Etc</label>
                                        <input
                                            type='text'
                                            name='contestType'
                                            value={contestType}
                                            onChange={onChange}

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
