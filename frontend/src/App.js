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

          {/* Routes protégées par token */}
          <Route element={<PrivateRoute />}>
            {/* Layout Dashboard */}
            <Route path="/layout" element={<Layouts />}>
              {/* Routes internes au dashboard */}
              <Route path="postManagement" element={<PrivateRoute rolesAllowed={['employee']} />} >
                <Route index element={<PostManagement />} />
              </Route>
              <Route path="profile" element={<Profile/>} />
              {/* etc… autres routes enfants */}
            </Route>
          </Route>


          

        
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}



export default App;
