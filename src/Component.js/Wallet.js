import React from 'react'
import {useState, useEffect} from 'react'

function Wallet({users, setWallet,wallet, budget, setBudget}) {
  const [createwallet, setCreatewallet] = useState({balance: 0, date: Date.now(), user_id: null, category: "", main_budget_id: 1 })


  function makewallet(e){
    e.preventDefault()
    if (budget < createwallet.balance ) {
      alert("You are over budget, add more money to your budget to continue")
      return null
    }
    fetch('http://localhost:9292/wallet',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(createwallet) 
    })
    .then(res => res.json())
    .then(data => setWallet([...wallet, data]))
    .then(()=> {
      fetch('http://localhost:9292/main-budget')
      .then(res => res.json())
      .then(data => setBudget(data))
    })
  }


  useEffect(()=> {
    if(users.length !== 0){
      setCreatewallet({...createwallet, user_id: users[0].id})
    }
  },[users])

  return (
    <div>
      <div><h1>Main budget balance - {budget} </h1></div>
      <div><h1>Create a Wallet</h1></div>
      <form onSubmit={makewallet}>
        <label for="Create-new-wallet">Amount</label><br/>
        <input type='number'  onChange={(e)=> setCreatewallet({...createwallet, balance: e.target.value })}/><br/>
        <label hidden>Date</label>
        <input value={Date.now()} hidden/>
        <label>Category</label><br/>
        <input type='text' onChange={(e) => setCreatewallet({...createwallet, category: e.target.value})} value={createwallet.category}/><br/>
        <select onChange={(e)=> setCreatewallet({...createwallet, user_id: e.target.value})}>{users.map(user => {
          return <option key={user.id} value ={user.id}>{user.name}</option>
        })}</select>
        <input type = 'submit'/>
      </form>

      

    </div>
  )
}

export default Wallet