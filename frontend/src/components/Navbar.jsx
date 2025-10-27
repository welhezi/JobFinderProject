import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutAction } from '../redux/actions/userAction'

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logoutAction());
      navigate("/"); // redirige vers la page d’accueil après logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


  return (
  
  <header>
    {/* Header Start */}
    <div className="header-area header-transparrent">
      <div className="headder-top header-sticky">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-2">
              {/* Logo */}
              <div className="logo">
                <Link to="/"><img src="/assets/img/logo/logo.png" alt="img" /></Link>
              </div>  
            </div>
            <div className="col-lg-9 col-md-9">
              <div className="menu-wrapper">
                {/* Main-menu */}
                <div className="main-menu">
                  <nav className="d-none d-lg-block">
                    <ul id="navigation">
                      <li><Link to={"/"}>Home</Link></li>
                      <li><Link to={"/listjobs"}>Find a Jobs</Link></li>
                      <li><Link to={"/about"}>About</Link></li>
                      <li><a href="#">Page</a>
                        <ul className="submenu">
                          <li><a href="blog.html">Blog</a></li>
                          <li><a href="single-blog.html">Blog Details</a></li>
                          <li><a href="elements.html">Elements</a></li>
                          <li><a href="job_details.html">job Details</a></li>
                        </ul>
                      </li>
                      <li><a href="contact.html">Contact</a></li>
                    </ul>
                  </nav>
                </div>          
                {/* Header-btn */}
                <div className="header-btn d-none f-right d-lg-block">
                    {!currentUser ? (
                      <>
                        <Link to="/signup" className="btn head-btn1">Register</Link>
                        <Link to="/login" className="btn head-btn2">Login</Link>
                      </>
                    ) : (
                      <button onClick={handleLogout} className="btn head-btn2">Sign out</button>
                    )}
                </div>
              </div>
            </div>
            {/* Mobile Menu */}
            <div className="col-12">
              <div className="mobile_menu d-block d-lg-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Header End */}
  </header>


   
  )
}

export default Navbar