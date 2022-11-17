import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreateUser() {

  
  const initialState = {
    username: '',
    id: 0
  };
  
  const [userState, setUser] = useState(initialState);
  
  
  const onChangeUsername = (e) => {
    setUser({
      ...userState,
      username: e.target.value
    });
  };
  
  useEffect(() => {    
    const randomID = () => {
     const newId = Math.floor(Math.random()*10000);

      setUser({
        ...userState, 
        id : newId})

    }
    randomID();

   }, [])

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: userState.username,
      id: userState.id
    };

     console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));
        setUser({
          username: '',
          id: 0
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