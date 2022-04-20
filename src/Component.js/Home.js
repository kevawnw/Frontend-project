import React from 'react'
import {useState, useEffect} from 'react'

function Home({wallet, budget}) {
  

  return (
    <>
      <div><h1 className='title'>Family $$$ Tracker</h1></div>
    <div className='home'>
      <div>
        <p>user</p>
        <p><h1> {budget} </h1></p>
      </div>
      <div>
        {wallet.map(wal => {
          return <li key={wal.id}>{` $${wal.balance.toFixed(2)} - ${wal.category.name} `}</li>
        })}
      </div>
    </div>
    
    </>
  )
}

export default Home