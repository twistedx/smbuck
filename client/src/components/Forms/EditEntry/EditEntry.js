import React, { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/AuthContext';
import setAuthToken from '../../../utils/setAuthToken';
import Navbar from '../../Layout/Navbar/Navbar';

const EditEntry = ({ match }) => {

    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        fetchEntry();
        // eslint-disable-next-line
    }, [])


    if (localStorage.token) {
        setAuthToken(localStorage.token);
    } else {
        window.location.href = '/';
    }

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    headers['x-auth-token'] = authContext.token;

    const jid = match.params.id;

    const [entry, setEntry] = useState({
        name: '',
        team: '',
        hasPaid: '',
        description: ''
    });

    const { name, team, hasPaid, description } = entry;

    const onChange = e => setEntry({ ...entry, [e.target.name]: e.target.value });

    const fetchEntry = () => {
        //formmatting form responses into payload obj

        fetch('/api/entry/' + jid, {
            method: 'GET',
            headers
        }).then(r => r.json())
            .then(r => {
                let res = JSON.stringify(r[0]);
                setEntry({
                    ...entry,
                    name: r[0].name,
                    role: r[0].role,
                    hasPaid: r[0].entryType,
                    description: r[0].description
                })
            }).catch(e => console.error('ERROR: ', e));
    }

    const deleteEntry = (jid) => {
        var tempArr = [];
        fetch('/api/entry/' + jid, {
            method: 'GET',
            headers
        }).then(res => {
            return res.json();
        }).then(data => {
            data.forEach(function (arrayItem) {
                var x = arrayItem._id;
                tempArr.push(x);
            });
        })
        deleteThisEntry(jid);
    }

    const deleteThisEntry = (jid) => {
        fetch('/api/entry/' + jid, {
            method: 'DELETE',
            headers
        }).then(data => {
            return data.json();
        }).then(res => {
            console.log(res);
        }).catch(e => console.error('ERROR: ', e));
    }

    const editEntry = (obj) => {
        //formmatting form responses into payload obj
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        headers['x-auth-token'] = authContext.token;
        var newObj = JSON.stringify(obj);
        fetch('/api/entry/' + jid, {
            method: 'PUT',
            body: newObj,
            headers
        }).then(r => r.json())
            .then(r => {
                let res = JSON.stringify(r[0]);
                console.log(`this is the second then after editEntry fetch 
                ${res}`);
            })
            .catch(e => console.error('ERROR: ', e));
    }

    const onSubmit = e => {
        e.preventDefault();
        var temp = {
            ...entry,
            name,
            team,
            hasPaid,
            description
        };

        async function temp1() {
            let response = await editEntry(temp);
            console.log(JSON.stringify(response), "sucess")
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);

        }
        temp1();
    }

    return (
        <Fragment>
            <Navbar title="Edit Entry" dropdown={true} home={true} />
            <main>
                <h5 className="center">Entry #{jid}</h5>
                <div className="container">
                    <div className="card" style={{ borderRadius: "25px" }}>
                        <div className="card-content">
                            <div id='title'> Add a New Entry </div>
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input id="company" type="text" name='name' placeholder="User name" required value={name} onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <input id="role" type="text" name='role' placeholder="role" required value={team} onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <select className="browser-default" name='hasPaid' value={hasPaid} onChange={onChange}>
                                        <option value="entry" disabled />
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input id="description" type="text" name='description' placeholder="description" required value={description} onChange={onChange} />
                                </div>
                                <div className="center">
                                    <button type='submit' value='submit' id="editEntry" className="waves-effect waves-light btn">Save</button>
                                    <button onClick={() => { deleteEntry(jid) }} id="deleteEntry" className="btn waves-effect waves-light">Delete</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
}

export default EditEntry;