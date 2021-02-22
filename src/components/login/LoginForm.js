import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';

export const LoginForm = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
	const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
	const [goToDashboard, setGoToDashboard] = useState(false)

  useEffect(() => {
    getData()
  },[])

  // const handleUsersDetail = (data) => {

  // }

  const getData = async () => {
    try {
      const response = await fetch("UserDetails.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json()
      setUsers(data);
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
		e.preventDefault();
		const updatedUsers = [...users];
    const currentUser = updatedUsers.find(user=> user.email === userData.email)

    if(!currentUser) {
      setError('Email id not present !!')
    } else if(currentUser.password !== userData.password) {
      setError('Incorrect password entered !!')
    } else if (currentUser.password === userData.password) {
			setGoToDashboard(true);
			console.log('hello')
    }
  };

		if(goToDashboard) {
			return <Redirect to='/dashboard' />
		}

  return (
    <div className="login-form-container">

      <form className="form" onSubmit={handleFormSubmit}>
      <h2> Welcome to Oracle Meeting schedular </h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
						autoComplete="off"
            required
          />
        </div>

        {error ? <div className="form-group error-message">{error}</div> : null}
        <div className="form-group">
          <button type="submit" name="button">
            {" "}
            Login {" "}
          </button>
        </div>
      </form>
    </div>
  );
};

