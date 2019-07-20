import React, { Fragment } from 'react';
import placeholder from './150.png';

export default () => (
    <Fragment>
        <img
            src={placeholder}
            style={{ width: '150', margin: 'auto', display: 'block' }}
            alt='Placeholder...'
        />
    </Fragment>
);
