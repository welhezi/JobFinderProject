import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ForgotPassword from './ForgotPassword'
import { useDispatch } from 'react-redux'
import { loginAction } from '../redux/actions/userAction'

const Login = () => {
  const [formData,SetFormData] = useState({email:"",password:""})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const resultAction = await dispatch(loginAction(formData))
      console.log('Login successful', resultAction);
      const user = resultAction.payload.user
      console.log("user connected is : ",user)
      const role = user.role
      console.log("role",role)
      switch (role){
        case "employee" : navigate("/layout/postManagement")
        default : navigate("/")
        break;
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };
  return (
    <>
  <Navbar />

  {/* Hero Area Start */}
  <div className="slider-area">
    <div
      className="single-slider section-overly slider-height2 d-flex align-items-center"
      style={{ backgroundImage: `url("assets/img/hero/about.jpg")` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="hero-cap text-center">
              <h2>Login to your account</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Login Section */}
  <section className="sample-text-area">
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-60">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg rounded overflow-hidden">
            <div className="row g-0">
              
              {/* Image Side */}
              <div className="col-md-6 d-none d-md-block" >
                <img
                  src="assets\img\login3.jpg"
                  alt="Login Illustration"
                  className="img-fluid h-100"
                  
                />
              </div>

              {/* Form Side */}
              <div className="col-md-6 p-5 bg-light">
                <h3 className="mb-4 text-center">Welcome Back!</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      onFocus={(e) => (e.target.placeholder = '')}
                      onBlur={(e) => (e.target.placeholder = 'Email address')}
                      onChange={(e) => SetFormData({...formData,email:e.target.value})}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onFocus={(e) => (e.target.placeholder = '')}
                      onBlur={(e) => (e.target.placeholder = 'Password')}
                      onChange={(e) => SetFormData({...formData,password:e.target.value})}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/forgot-password" className="text-primary small">
                      Forgot Password?
                    </Link>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
                <p className="text-center mt-3">
                  Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</>


  )
}

export default Login