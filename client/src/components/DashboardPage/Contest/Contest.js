import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContestItem from './ContestItem';
import Spinner from '../../Layout/Spinner';
import ContestContext from '../../../context/contest/ContestContext';

const Contest = () => {
    const contestContext = useContext(ContestContext);

    const { contestList, filtered, getContest, loading } = contestContext;

    useEffect(() => {
        getContest();
        // eslint-disable-next-line
    }, []);

    var pushTo = []
    for (let i = 0; i < contestList.length; i++) {
        pushTo.push(<ContestItem contest={contestList[i]} key={contestList[i]._id} />)
    }

    if (contestList !== null && contestList.length === 0 && !loading) {
        return <h4>Please add a contest</h4>;
    }


    return (
        <Fragment>
            {pushTo}
        </Fragment>
    );
};

export default Contest;