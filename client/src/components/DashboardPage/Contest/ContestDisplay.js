import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Layout/Navbar/Navbar';
import ContestContext from '../../../context/contest/ContestContext';
import AuthContext from '../../../context/auth/AuthContext';
import Placeholder from './Placeholder';
import JoinContestModal from './JoinContestModal';

const ContestDisplay = (props) => {

    const contestContext = useContext(ContestContext);
    const authContext = useContext(AuthContext);
    const { current } = contestContext;
    const [open, setOpen] = useState(false);
    // const userName = getUserName(current.owner);


    return (
        <main>
            <JoinContestModal open={open} />
            <Navbar home={true} dropdown={true} />
            <div className="container">
                <div className="row">
                    <div className="card ">
                        <div className="col s12 m8">
                            <div className="card-content">
                                <span className="card-title">
                                    <strong>{current.title}</strong>
                                </span>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <p className="">Location: {current.location}</p>
                        </div>

                        <div className="row">
                            <div className="col s12">
                                <div className="card-content ">
                                    <div className="col s12 m8">
                                        <strong><p>Contest Descrption:</p></strong>
                                        <p>{current.description}</p>
                                    </div>
                                    <div className='col s12 m4'>
                                        <Placeholder />
                                    </div>
                                    <div className=" col s12 m6">
                                        <strong><p>Rules:</p></strong>
                                        <p>{current.rules}</p>
                                    </div>
                                    <div className="col s12 m6">
                                        <strong><p>Contest Owner:</p></strong>
                                        <p>{current.username}</p>
                                    </div>
                                    <div className="col s12 m6">
                                        <strong><p>Contest Type:</p></strong>
                                        <p>{current.contestType}</p>

                                    </div>
                                    <div className="col s12 m6">
                                        <strong><p>Entry Fee:</p></strong>
                                        <p>{current.entryFee}</p>
                                    </div>

                                    <div className="col s12">
                                        <strong><p>Contestants:</p></strong>

                                    </div>
                                    <button onClick={() => { setOpen(true) }} className="btn" id="EditJoinBtn">Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main >
    )
}

export default ContestDisplay
