import React from 'react'
import {useState, useEffect} from 'react'


function Budget({budget, setBudget}) {

  const [newBudget, setNewBudget] = useState(0)

  function handleUpdateBudget(e){
    setNewBudget(e.target.value)
  }

  function handleSubmitBudget(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/main-budget`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({balance: newBudget}),
    })
      .then((r) => r.json())
      .then((updatedBudget) => console.log(updatedBudget))
      .then(() => {
        fetch('http://localhost:9292/main-budget')
          .then(res => res.json())
          .then(newBudget => setBudget(newBudget)) 
      });
  }

  

  return (
    <div className='container'>
      <div className='top'><h1>Monthly Budget: ${budget}</h1></div>
      <form onSubmit={handleSubmitBudget}>
      <input type='number' onChange={handleUpdateBudget}></input>
      <input type='submit' value='Update Budget'></input>
      </form>

      <div><h1>All Users</h1></div>
      {/* <div>
        {users.map(user => {
          return <User key={user.id} name={user.name} wallets={user.wallets} user={user}/>
        })}

      </div> */}
    </div>
  )
}

export default Budget