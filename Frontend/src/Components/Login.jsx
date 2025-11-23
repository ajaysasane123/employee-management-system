
import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        console.log(result.data) // debug

        if (result.data.loginStatus === true) {
          localStorage.setItem("adminValid", "true")
          navigate('/dashboard')
        } else {
          setError(result.data.Error || "Invalid credentials")
        }
      })
      .catch(err => {
        console.log(err)
        setError("Server Error. Please try again.")
      })
  }

  const handleBack = () => {
    navigate('/') 
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
        {error && <div className='text-danger mb-2'>{error}</div>}

        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label><strong>Email:</strong></label>
            <input
              type="email"
              name='email'
              placeholder='Enter Email'
              autoComplete='off'
              className='form-control rounded-0'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className='mb-3'>
            <label><strong>Password:</strong></label>
            <input
              type="password"
              name='password'
              placeholder='Enter Password'
              className='form-control rounded-0'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>

          <button className='btn btn-success w-100 rounded-0 mb-2'>
            Log In
          </button>

          <div className='mb-1'>
            <input type="checkbox" className='me-2' />
            <label>You agree to terms & conditions</label>
          </div>
        </form>

        <button
          className='btn btn-secondary w-100 rounded-0 mt-2'
          onClick={handleBack}
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

export default Login
