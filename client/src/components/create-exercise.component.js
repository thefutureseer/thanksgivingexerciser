import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function CreateExercise() {

    const initialState = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  
    const [state, setState] = useState(initialState);

  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
  }, []);

  const onChangeUsername = (e) => {
    setState({
      username: e.target.value
    })
  }

  const onChangeDescription = (e) => {
    setState({
      description: e.target.value
    })
  }

  const onChangeDuration = (e) => {
    setState({
      duration: e.target.value
    })
  }

  const onChangeDate = (date) => {
    setState({
      date: date
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    }

    console.log("exercise ", exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
          // ref="userInput"
              required
              className="form-control"
              value={state.username}
              onChange={onChangeUsername}
          >
              {
                state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={state.description}
              onChange={onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={state.duration}
              onChange={onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={state.date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    );
};