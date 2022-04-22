import { ImageList } from '@mui/material'
import React from 'react'
import {useState, useEffect} from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import logo from '../images/moneybags.png'

function Home({wallet, budget, users, setUsers}) {
  
  
  return (
    <>
      <div><h1 id='title'>Budget Tracker</h1></div>
      <img id='cover-image' src={logo} />
    
     
    
    </>
  )
}

export default Home