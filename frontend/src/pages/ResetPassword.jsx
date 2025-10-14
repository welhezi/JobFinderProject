import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Vérification côté frontend
    if (newPass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/user/resetpass/${token}`, { newPass });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
            className="form-control mb-3"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
            className="form-control mb-3"
          />
          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </form>
        {error && <p className="mt-3 text-danger">{error}</p>}
        {message && <p className="mt-3 text-success">{message}</p>}
      </div>
      <br></br>
      <Footer />
    </>
  );
};

export default ResetPassword;