import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListJobs from './pages/ListJobs';
import AboutUs from './pages/AboutUs';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import Layouts from './pages/views/Layouts';
import PostManagement from './pages/views/PostManagement';
import Profile from './pages/views/Profile';
import ApplicationsOfPost from './pages/views/ApplicationsOfPost';
import JobDetails from './pages/JobDetails';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/listjobs' element={<ListJobs/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/job/:id" element={<JobDetails />} />

          {/* Routes protégées par token */}
        
            
        <Route path="/layout" element={<PrivateRoute><Layouts/></PrivateRoute>}>
              
          <Route path="postManagement" element={<PrivateRoute rolesAllowed={['employee']}><PostManagement /></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute rolesAllowed={['employee','admin']}><Profile/></PrivateRoute>} />
          <Route path='appsOfPost/:id' element={<PrivateRoute rolesAllowed={['employee','admin']}><ApplicationsOfPost/></PrivateRoute>} />
        </Route>


          

        
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}



export default App;
