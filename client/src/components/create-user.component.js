import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreateUser() {

  
  const initialState = {
    username: '',
  };
  
  const [userState, setUser] = useState(initialState);
  
  
  const onChangeUsername = (e) => {
    setUser({
      ...userState,
      username: e.target.value
    });
  };

  const onSubmit = (e) => {
    const apiUrl = "https://thanksgivingexerciser.onrender.com" || 'http://localhost:5000';

    e.preventDefault();

    const user = {
      username: userState.username
    };

    //  console.log(user);

    axios.post(`${apiUrl}/users/add`, user)
      .then(res => console.log(res.data));
        setUser({
          username: ''
        })
  }

    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={userState.username}
                onChange={onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
}