import React, { Fragment, useContext, useEffect } from 'react';
import Spinner from '../../Layout/Spinner';
import Placeholder from './Placeholder';
import ContestContext from '../../../context/contest/ContestContext';
const ContestItem = ({ contest }) => {
    const contestContext = useContext(ContestContext);
    const { deleteContest, setCurrent, clearCurrent } = contestContext;
    // const { id, title, description, type, contestants } = contest

    console.log(contest.title)
    const onDelete = () => {
        deleteContest(contest.id);
        clearCurrent();
    };
    const displayEnteries = () => {
        return <Fragment><span>{contest.contestants.length}</span></Fragment>
    }


    return (
        <div className="container">
            <div className="row">
                <div className='card'>
                    <div className="grid-2">
                        <div className="card-content">
                            <h5 className='text-left card-title '>
                                {contest.title}{' '}
                                <span
                                    style={{ float: 'right', color: '#fff' }}
                                    className={
                                        'badge ' +
                                        (contest.type === 'buck' ? 'badge-success' : 'badge-primary')
                                    }
                                >
                                    {contest.type}
                                </span>
                            </h5>
                            <span>
                                {contest.description}

                            </span>

                            <ul>
                                <strong>Contestants:</strong>
                                <h6>{displayEnteries()}</h6>

                            </ul>
                        </div>
                        <div className="valign-wrapper">
                            <Placeholder image={contest.image} />
                        </div>
                    </div>
                    <hr></hr>
                    <div className="center">
                        <button
                            className='btn center' id="editJob"
                            onClick={() => setCurrent(contest)}
                        >
                            SignUp
                         </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ContestItem;