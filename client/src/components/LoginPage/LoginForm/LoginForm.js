import React, { useState, useContext, useEffect } from 'react';
import './LoginForm.css';
import AuthContext from '../../../context/auth/AuthContext';
import { Link, withRouter } from 'react-router-dom';
import AlertContext from '../../../context/alert/AlertContext';
import setAuthToken from '../../../utils/setAuthToken';

const LoginForm = props => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { login, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        if (error === 'Invalid password') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);


    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                email,
                password
            });

        };

    }

    return (

        <div className='form-container'>

            <style>
                @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400i&display=swap');
            </style>

            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="center-align">
                    <input
                        type='submit'
                        value='Login'
                        className='btn'
                        id="LoginBtn"
                    />
                </div>
            </form>
            <div className="center">
                <Link className="btn-flat" id="flatBtn" to="/forgotmypassword">Forgot My Password</Link>
                <br />
                <Link className="btn-flat" id="flatBtn" to="/register">Create Account</Link>
            </div>
        </div>

    );
};

export default withRouter(LoginForm);


