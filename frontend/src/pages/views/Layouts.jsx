import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layouts = () => {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <Outlet/>
</>
  )
}

export default Layouts