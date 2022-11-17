import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

export default function CreateExercise() {

  const initialState = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
  }

  const [exState, setExercise] = useState(initialState);

  useEffect(() => {
    axios.get('http://localhost:5000/users/')
    .then(response => {
      if (response.data.length > 0) {
        setExercise({
          users: response.data.map(user => user.username),
          // set user name to  [0].username
          username: response.data[0].username,
        })
      } 
    })
  }, []);

  const onChange = (e) => {
    // const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;

    setExercise(prevState =>
      ({
      ...prevState,
      [name]: value
      })
    )
           console.log(`state & value of the current box `,value )
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: exState.username,
      description: exState.description,
      duration: exState.duration,
      date: exState.date
    };

    // console.log("this is exercise ", exercise, " this is state: ", exState);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

 const content = (
  <div>
    <h3>Create New Exercise Log</h3>
    <form onSubmit={onSubmit}>
      <div className="form-group"> 
        <label>Username: </label>
        <select 
            type="select"
            required
            className="form-control"
            name="username"
            value={exState.username}
            onChange={onChange}        > 
            {
              exState.users?.map(( user ) => {
                return <option 
                  value={exState.value}
                  key={user}
                  name={user.value}>
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
            required
            className="form-control"
            name="description"
            value={exState.description}
            onChange={onChange}
            />
      </div>
      <div className="form-group">
        <label>Duration (in minutes): </label>
        <input 
            type="text" 
            className="form-control"
            name="duration"
            value={exState.duration}
            onChange={onChange}
            />
      </div>
      <div className="form-group">
        <label>Todays date & time:</label>
        <div>
        <input
          // selected={exState.date}
          // onSelect={(date) => {setExercise(exState.date=date);  }} //when day is clicked
          type="text"
          name="date"
          value={exState.date}
          onChange={onChange} 
        />
        </div>
      </div>

      <div className="form-group">
        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
      </div>
    </form>
  </div>
  );

 return content;
};