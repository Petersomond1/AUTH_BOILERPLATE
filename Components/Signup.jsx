import React, {useState} from "react";
import "../App.css";
import { Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  //axios.defaults.withCredentials = true;
   const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
   await axios
      .post("http://localhost:8081/signup", values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
         alert("Error: " + res.data.Error);
        }
      })
      .then(err => console.log(err));
  };

  return (
    <>
      
          <div className="signup-up-form" >
          <h2>Sign Up Page</h2>
          <form  onSubmit={handleSubmit}>
            <div style={{ marginBottom: "3px" }}>
              <label htmlFor="username"><strong>Username:</strong>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={e =>
                  setValues({ ...values, username: e.target.value })
                }
                className="form-control"
              />
              </label>
            </div>
            <div style={{ marginBottom: "3px" }}>
              <label htmlFor="email">
                <strong>Email:</strong>
              <input
                type="email"
                autoComplete="off"
                placeholder="Enter Email"
                name="email"
                onChange={e =>
                  setValues({ ...values, email: e.target.value })
                }
                className="form-control"
              />
              </label>
            </div>
            <div style={{ marginBottom: "3px" }}>
              <label htmlFor="password">
                <strong>Password:</strong>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={e =>
                  setValues({ ...values, password: e.target.value })
                }
                className="form-control"
                autoComplete="off"
              />
              </label>
            </div>
            <button type="submit">Sign Up</button>
            <p>
              By clicking; you agree to the terms & conditions of the use of
              this site
            </p>
          </form>
          
          <Link to="/login" type="submit">
            <strong>Login</strong>
          </Link>
          </div>
      
    </>
  );
};

export default Signup;
