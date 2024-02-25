import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

  navigate = useNavigate();
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true)
          setUsername(res.data.username)
         
        } else {
          setAuth(false)
          setMessage(res.data.Error + " - " + "Your are not authenticated")
        }
      })
      .catch(err => console.log(err));
  }, [])

const handleDeleteCookies = () => {
  axios.get('http://localhost:8081/logout')
    .then(res => {
      location.reload(true);
    }).catch(err => console.log(err));
}
return (
  <div className='container mt-4'>
    {
      auth ?  
            <div>
              <h1>Welcome to Home Page {username}</h1>
              <button className='btn btn-danger' onClick={handleDeleteCookies}>Logout</button>
            </div>
            :
            <div>
              <h1>{message}</h1>
              <h3>Login Now!</h3>
              <Link to="/login" className='btn btn-primary'>Login</Link>
            </div>
    }
  </div>
)

}

export default Home;
