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

    if (contestList !== null && contestList.length === 0 && !loading) {
        return <h4>Please add a contest</h4>;
    }
    console.log(contestList)
    return (
        <Fragment>
            {contestList !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null ? filtered.map(item => (
                        <CSSTransition
                            key={contestList._id}
                            timeout={500}
                            classNames='item'
                        >
                            <ContestItem contest={item} key={item.title} />
                        </CSSTransition>
                    ))

                        : contestList.array.forEach(element => {
                            return <CSSTransition
                                key={contestList.id}
                                timeout={500}
                                classNames='item'
                            >
                                <ContestItem contest={element} key={element.title} />
                            </CSSTransition>
                        })
                    }

                </TransitionGroup>
            ) : (
                    <Spinner />
                )}
        </Fragment>
    );
};

export default Contest;