import React from 'react'
import {useState, useEffect} from 'react'

function Home({wallet, budget, users, setUsers}) {
  const [newuser, setNewuser] = useState({name: ''})

  function createusers(e){
    e.preventDefault()
    fetch('http://localhost:9292/users',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newuser) 
    })
    .then(res => res.json())
    .then(data => setUsers([...users, data]))
   
  }
  

  return (
    <>
      <div><h1 className='title'>Family $$$ Tracker</h1></div>
    <div className='home'>
      <div>
        <p><h1> {budget} </h1></p>
        <p></p>
        <form onSubmit={createusers}>
          <label>create user</label><br/>
          <input type="text" onChange={(e)=> setNewuser({...newuser, name: e.target.value})}/>
          <input type= 'submit'/>
        </form>
      </div>
      <div>
        {wallet.map(wal => {
          return <li key={wal.id}>{` $${wal.balance.toFixed(2)} - ${wal.category.name} owner- ${wal.user.name} `}</li>
        })}
      </div>
    </div>
    
    </>
  )
}

export default Home