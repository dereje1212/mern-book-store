import React from 'react'
import Banner from './Banner/Banner.jsx';
import TopSelles from './TopSellers/TopSelles.jsx'
import Recommended from './Recommended/Recommended.jsx';
import News from './News/News.jsx';


const Home = () => {
  return (
    <div>
      <Banner />
      <TopSelles />
      <Recommended />
      <News />
    </div>
  )
}

export default Home
