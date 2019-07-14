import React, { useState, useEffect, Fragment } from 'react';
import './EntryModal.css';
import { useHttp } from '../Hooks/Fetch';

const EntryModal = props => {
  const [addEntry, setAddEntry] = useState(false);
  const mod = document.getElementById('modal');

  useEffect(() => {
    document.getElementById('modal').style.display = 'none'

  }, []);

  const ajCheck = () => {
    if (addEntry) {
      mod.style.display = 'none';
      setAddEntry(false);
    } else {
      mod.style.display = 'block';
      setAddEntry(true);
    }
  }

  //setting state for values of form =====================================================
  const [submitted, setSubmitted] = useState(false);
  const [newEntry, setNewEntry] = useState({
    name: '',
    role: '',
    hasPaid: '',
    description: ''
  });

  const { name, role, hasPaid, description } = newEntry;

  const onChange = e => setNewEntry({ ...newEntry, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (newEntry.entryType === '') {
      alert('Please Select a entry type')
    }
    console.log(newEntry);
    setSubmitted(true);
  };

  let h = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  h['x-auth-token'] = props.token;



  let fetchedEntrys = useHttp('/api/entry', 'POST', JSON.stringify(newEntry), h, [submitted]);
  const j = fetchedEntrys[1];

  if (submitted) {
    console.log(`
      
        this is the j return: ${JSON.stringify(j)}
        
        
        this is the new entry obj: ${newEntry}`)

    window.location.reload();
  }



  return (
    <Fragment>
      <div className="left nav-wrapper valign-wrapper" style={{ display: props.visible ? 'block' : 'none' }}>
        <button id='addEntryBtn' onClick={() => ajCheck()} className="btn-floating btn-medium waves-effect waves-light transparent hoverable">
          <div className='valign-wrapper center' style={{ height: '35px', width: '40px' }}><i className="material-icons" >add</i></div>
        </button>
      </div>

      <div id='modal' className='center valign-wrapper'>
        <button id='close' onClick={() => ajCheck()} className="btn-floating btn-small waves-effect waves-light">
          <i className="material-icons center valign-wrapper">close</i>
        </button>

        <div className="container">
          <h6 id='title'> Add a New Entry </h6>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input id="company" type="text" name='name' placeholder="job name" required value={name} onChange={onChange} />
            </div>
            <div className="form-group">
              <input id="role" type="text" name='role' placeholder="role" required value={role} onChange={onChange} />
            </div>
            <div className="form-group">
              <select className="browser-default" name='hasPaid' value={hasPaid} onChange={onChange} required>
                <option >Choose one</option>
                <option value="hourly" >Hourly Rate</option>
                <option value="salary">Salary/Day Rate</option>
                <option value="fixed">Fixed Project Rate</option>
              </select>
            </div>
            <div className="form-group">
              <input id="description" type="text" name='description' placeholder="description" required value={description} onChange={onChange} />
            </div>
            <div>
              <button type='submit' value='submit' id="newEntrySubmit" className="btn-floating btn-small waves-effect waves-light">
                <i className="material-icons center valign-wrapper">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment >
  );
}
export default EntryModal;