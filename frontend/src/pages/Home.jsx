import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Search from '../components/Search'
import Services from '../components/Services'
import OnlineCv from '../components/OnlineCv'
import Jobs from '../components/Jobs'
import ApplyProcess from '../components/ApplyProcess'
import News from '../components/News'
import Company from '../components/Company'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Search/>
        <Services/>
        <OnlineCv/>
        <Jobs/>
        <ApplyProcess/>
        <Company/>
        <News/>
        <Footer/>
    </div>
  )
}

export default Home