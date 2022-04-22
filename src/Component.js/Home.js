import React from 'react'
import {useState, useEffect} from 'react'
import { PieChart } from 'react-minimal-pie-chart'

function Home({wallet, budget, users, setUsers}) {
  
  
  return (
    <>
      <div><h1 id='title'>Budget Tracker</h1></div>
    <div className='home'>
      <div>
        <p><h1> ${budget} </h1></p>
      </div>

    
      

      <div>
      <PieChart
  data={[
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ]}
/>;
      </div>
     

    </div>
    
    </>
  )
}

export default Home