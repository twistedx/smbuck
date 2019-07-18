const contactContext = useContext(ContactContext);
const { deleteContact, setCurrent, clearCurrent } = contactContext;

const { _id, name, description, type } = contact;

const onDelete = () => {
    deleteContest(_id);
    clearCurrent();
};

return (
    <div className='card'>
        <h3 className='text-primary text-left'>
            {name}{' '}
            <span
                style={{ float: 'right' }}
                className={
                    'badge ' +
                    (type === 'deer' ? 'badge-success' : 'badge-primary')
                }
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
        </h3>
        <span>
            {description && ({ description })}

        </span>
        {/* 
        <ul>

            {contestants && (
                <li>
                    <i className='fas fa-phone' /> {
            )}
        </ul> */}
        <p>
            <button
                className='btn btn-dark btn-sm'
                onClick={() => setCurrent(contact)}
            >
                Edit
      </button>
            <button className='btn btn-danger btn-sm' onClick={onDelete}>
                Delete
      </button>
        </p>
    </div>
);
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
};

export default ContactItem;