import React, { Fragment } from 'react';
import LoginForm from '../LoginForm/LoginForm.js';
import LoginPageLogo from '../LoginPageLogo/LoginPageLogo.js';
import Alerts from '../../Layout/Alerts'
import Navbar from '../../Layout/Navbar/Navbar'



const LoginPage = () => {

    return (
        [
            <Fragment>
                <Navbar title="CCBCC" dropdown={false} home={false} />
                <main>

                    <div className="container">

                        <LoginPageLogo />
                        <Alerts />
                        <LoginForm />
                    </div>
                </main>
            </Fragment>
        ]
    )
}

export default LoginPage;
