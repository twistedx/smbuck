import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContestItem from './ContestItem';
import Spinner from '../layout/Spinner';
import ContestContext from '../../context/contact/contestContext';

const Contest = () => {
    const contactContext = useContext(ContestContext);

    const { contests, filtered, getContest, loading } = contactContext;

    useEffect(() => {
        getContest();
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
                        ? filtered.map(contact => (
                            <CSSTransition
                                key={contact._id}
                                timeout={500}
                                classNames='item'
                            >
                                <ContestItem contest={contests} />
                            </CSSTransition>
                        ))
                        : contests.map(contact => (
                            <CSSTransition
                                key={contact._id}
                                timeout={500}
                                classNames='item'
                            >
                                <ContestItem contest={contests} />
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : (
                    <Spinner />
                )}
        </Fragment>
    );
};

export default Contest;