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
        if (contest.contestants < 3) {
            contest.contestants.map(user => {
                return <Fragment><li>{user.name}</li> </Fragment>
            })
        } else {
            return <Fragment><span>{contest.contestants.length}</span></Fragment>
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className='card'>
                    <div className="col l6 m6 sm12">
                        <h5 className='text-left'>
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
                    <div className="col l6 m6 s12">
                        <Placeholder />
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12'>
                        <p className="">
                            <button
                                className='btn center' id="editJob"
                                onClick={() => setCurrent(contest)}
                            >
                                Enter
                         </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ContestItem;