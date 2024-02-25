import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true; // to send cookies with every request. But if using HTTP Fetch you write this at the end of the fetch request on the client side.
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8081/login", values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate("/")
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };
      

  return (
    <>
          <div className="signup-up-form">
          <h2>Login Page</h2>
          <form  onSubmit={handleSubmit}>
              <div style={{ marginBottom: "3px" }}>
              <label htmlFor="email">Email:
              <input
                type="email"
                autoComplete="off"
                placeholder="Enter Email"
                onChange={e =>
                  setValues({ ...values, email: e.target.value })
                }
                id="email"
                name="email"
                className="form-control"
              />
              </label>
            </div>
            <div style={{ marginBottom: "3px" }}>
              <label htmlFor="password">Password:
              <input
                type="password"
                placeholder="Enter Password"
                onChange={e =>
                  setValues({ ...values, password: e.target.value })
                }
                id="password"
                name="password"
                className="form-control"
                autoComplete="off"
              />
              </label>
            </div>
            <button type="submit">Log In</button>
            <p>You agree to the terms & conditions of the use of this site</p>
          </form>
          <Link to="/signup" type="submit">SignUp</Link>
          </div>
          
      </>
   )
};
export default Login;