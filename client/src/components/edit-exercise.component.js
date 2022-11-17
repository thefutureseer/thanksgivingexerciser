import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function EditExercise(props) {

  const initial = {
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    // _id,
    users: []
  }

  const [editExState, setEditExState] = useState(initial);

  useEffect(()=>{
    // const params = _id;

    axios.get('http://localhost:5000/exercises/'+ props.exercise._id)
     .then(response => {
       console.log("res.dat.id")
       console.log(response.data._id);
       setEditExState({
         username: response.data.username,
         description: response.data.description,
         duration: response.data.duration,
         date: new Date(response.data.date),
        //  _id: _id
       })
     })
     .catch(function(error) {
       console.log("error line 33: "+error);
     })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        console.log(response.data[0]._id);

        if (response.data.length > 0) {
          setEditExState({
            users: response.data.map(user => user.username)
          })
        }
      })
      .catch((error) => {
        console.log("line 49 eror")
        console.log(error);
      })
  }, [])

  const onChange= (e) => {
    // const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    setEditExState( (...prevState) => ({
      ...prevState,
      [name]: value
      })
    )
console.log("current state item:name, value ", name, value )
  }

  // const onChangeDate = (date) => {
  //   setEditExState({
  //     date: date
  //   })
  // }

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: editExState.username,
      description: editExState.description,
      duration: editExState.duration,
      date: editExState.date
    }

    console.log(exercise);

    // const params = { answer: editExState._id };

    axios.post('http://localhost:5000/exercises/update' + props.exercise._id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  const contextJSX = (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
          // ref="userInput"
              required
              name="username"
              className="form-control"
              value={editExState.username}
              onChange={onChange}>
              {
                editExState.users.map(function(user) {
                  return <option 
                    name={user.value}
                    key={user}
                    value={editExState.value}>
                      {user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  
              type="text"
              name="description"
              required
              className="form-control"
              value={editExState.description}
              onChange={onChange}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              name="duration"
              type="text" 
              className="form-control"
              value={editExState.duration}
              onChange={onChange}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              name="date"
              selected={editExState.date}

              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    );

  return contextJSX;
  
}