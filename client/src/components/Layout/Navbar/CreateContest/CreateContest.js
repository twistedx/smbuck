import React from 'react'
import { Link } from 'react-router-dom';

const AddEntry = (props) => {

    return (

        <div className="left nav-wrapper valign-wrapper" style={{ display: props.visible ? 'block' : 'none' }}>
            <Link to='/ccf' id='addEntryBtn' className="btn-floating btn-medium waves-effect waves-light transparent hoverable">
                <div className='valign-wrapper center' style={{ height: '35px', width: '40px' }}><i className="material-icons" >add</i></div>
            </Link>
        </div>

    )
}

export default AddEntry
