import React, { use } from 'react'
import { useState } from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { registerAction } from '../redux/actions/userAction';
import { useDispatch } from 'react-redux';
import { registerEmployeeAction } from '../redux/actions/employeeAction';

const Register = () => {
    const [selectedForm, setSelectedForm] = useState("user"); // "user" ou "rh"
    
    return (
        <>
        <Navbar />

       
      {/* Section Hero */}
      <div className="slider-area">
        <div
          className="single-slider section-overly slider-height2 d-flex align-items-center"
          style={{ backgroundImage: `url("assets/img/hero/about.jpg")` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Create an account to get started</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Form */}
      <section className="sample-text-area">
        <div className="container box_1170">
          <h3 className="text-heading">Join Jobfinder Today</h3>
          <p className="sample-text">
            Welcome to <b>Jobfinder</b>, your ultimate platform for
            discovering career opportunities in Tunisia.
          </p>
        </div>

        <br />

        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-heading">Create Your Account</h2>
              <p className="sample-text">
                Choose your role to get started with <b>Jobfinder</b>.
              </p>

              {/* Boutons de sélection */}
              <div className="mb-4">
                <button
                  className={`button ${
                    selectedForm === "user" ? "button-active" : ""
                  } boxed-btn mr-2`}
                  onClick={() => setSelectedForm("user")}
                >
                  User
                </button>
                <button
                  className={`button ${
                    selectedForm === "employee" ? "button-active" : ""
                  } boxed-btn`}
                  onClick={() => setSelectedForm("employee")}
                >
                  Employee
                </button>
              </div>
            </div>

            <div className="col-lg-8">
              {selectedForm === "user" ? (
                <UserForm />
              ) : (
                <EmployeeForm />
              )}
            </div>

            <div className="col-lg-3 offset-lg-1">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}


/* ---------- Formulaire USER ---------- */
function UserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    civility: "mr",
    address: ""
  });

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("User Data:", formData);
    try {
          const resultAction = dispatch(registerAction(formData))
          console.log('register successful', resultAction);
        } catch (err) {
          console.error('register failed', err);
        }
  };

  return (
    <form className="form-contact contact_form" id="userForm" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm-6">
          <div className='form-group'>
            <input
              className="form-control"
              name="first_name"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="col-sm-6">
          <input
            className="form-control"
            name="last_name"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>

        <div className="col-sm-12">
          <div className='form-group'>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="col-sm-6">
          <div className='form-group'>
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="col-sm-6">
          <input
            className="form-control"
            name="confirm_password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>

        <div className="col-sm-6">
          <div className='form-group'>
            <label>Date of Birth</label>
            <input
              className="form-control"
              name="date_of_birth"
              type="date"
              value={formData.birthday}
              onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="col-sm-6">
          <label>Civility</label>
          <div className='form-group'>
            <select
              className="form-control"
              name="title"
              value={formData.civility}
              onChange={(e) => setFormData({ ...formData, civility: e.target.value })}
              required
            >
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
              <option value="ms">Ms</option>
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className='form-group'>
            <input
              className="form-control"
              name="address"
              type="text"
              placeholder="Enter your address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-group mt-3">
        <button type="submit" className="button button-contactForm boxed-btn">
          Register as User
        </button>
      </div>
    </form>
  );
}

/* ---------- Formulaire Employee ---------- */
function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    civility: "mr",
    address: "",
    company: "",
    description: "",
    image: null
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Créer un FormData pour gérer le fichier image
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    // Convertir FormData en objet JS
  const obj = {};
  data.forEach((value, key) => {
    obj[key] = value instanceof File ? value.name : value;
  });

  console.log("Employee FormData as JSON:", JSON.stringify(obj, null, 2));

  try {
      // Appeler l'action Redux ou directement l'API
      const resultAction = await dispatch(registerEmployeeAction(obj));
      console.log("Employee registered", resultAction);
    } catch (error) {
      console.error("Employee registration failed", error);
    }

  };




  return (
    <form className="form-contact contact_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm-6">
          <input
            className="form-control"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="col-sm-6">
          <input
            className="form-control"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <input
            className="form-control"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="col-sm-6">
          <input
            className="form-control"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div className="col-sm-6">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>
        <div className="col-sm-6">
          <input
            className="form-control"
            type="date"
            value={formData.birthday}
            onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
            required
          />
        </div>
        <div className="col-sm-6">
          <select
            className="form-control"
            value={formData.civility}
            onChange={(e) => setFormData({ ...formData, civility: e.target.value })}
            required
          >
            <option value="mr">Mr</option>
            <option value="ms">Ms</option>
            <option value="mrs">Mrs</option>
          </select>
        </div>
        <div className="col-12">
          <input
            className="form-control"
            type="text"
            placeholder="Enter your address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>
        <div className="col-sm-6">
          <input
            className="form-control"
            type="text"
            placeholder="Enter your company name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
        </div>
        <div className="col-sm-6">
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            placeholder="Enter a brief description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>
      </div>
      <button type="submit" className="button button-contactForm boxed-btn mt-3">
        Register as Employee
      </button>
    </form>
  );
}



































/* ---------- Contact Info ---------- */
function ContactInfo() {
  return (
    <>
      <div className="media contact-info">
        <span className="contact-info__icon">
          <i className="ti-home"></i>
        </span>
        <div className="media-body">
          <h3>Buttonwood, California.</h3>
          <p>Rosemead, CA 91770</p>
        </div>
      </div>
      <div className="media contact-info">
        <span className="contact-info__icon">
          <i className="ti-tablet"></i>
        </span>
        <div className="media-body">
          <h3>+1 253 565 2365</h3>
          <p>Mon to Fri 9am to 6pm</p>
        </div>
      </div>
      <div className="media contact-info">
        <span className="contact-info__icon">
          <i className="ti-email"></i>
        </span>
        <div className="media-body">
          <h3>support@colorlib.com</h3>
          <p>Send us your query anytime!</p>
        </div>
      </div>
   






        
        </>
    )
}

export default Register