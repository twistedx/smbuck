import React, { Fragment, useContext, useEffect } from 'react';
import Spinner from '../../Layout/Spinner';
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

    return (
        <div className="container">
            <div className='card'>
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
                    {contest.contestants.map(user => {

                        return <li>{user.name}</li>
                    })}

                </ul>
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
    );
}
export default ContestItem;