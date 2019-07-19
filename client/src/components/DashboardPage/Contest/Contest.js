import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContestItem from './ContestItem';
import Spinner from '../../Layout/Spinner';
import ContestContext from '../../../context/contest/ContestContext';

const Contest = () => {
    const contestContext = useContext(ContestContext);

    const { contests, filtered, getContest, loading } = contestContext;

    useEffect(() => {
        // getContest();
        // eslint-disable-next-line
    }, []);

    if (contests !== null && contests.length === 0 && !loading) {
        return <h4>Please add a contest</h4>;
    }

    return (
        <Fragment>
            {contests !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(contests => (

                            <ContestItem contest={contests} />

                        ))
                        : contests.map(contests => (
                            <ContestItem contest={contests} />

                        ))}
                </TransitionGroup>
            ) : (
                    <Spinner />
                )}
        </Fragment>
    );
};

export default Contest;