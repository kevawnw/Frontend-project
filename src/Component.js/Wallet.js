import {useState, useEffect} from 'react'
import User from './User'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';


function Wallet({users, setWallet, wallet, budget, setBudget, setUsers, handleDeleteWallet}) {
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
        .then (()=>{
          fetch('http://localhost:9292/users')
      .then(res => res.json())
      .then(data => setUsers(data))
        })
    })
  }


  useEffect(()=> {
    if(users.length !== 0){
      setCreatewallet({...createwallet, user_id: users[0].id})
    }
  },[users])

  return (
    
    
    <div>
      <div><h1 id='wallet-title'><u>Current Budget</u>: ${budget.toLocaleString("en-US")}</h1></div>
      <div><h2 id='new-wallet-title'><u>Create New Wallet</u>:</h2></div>
      <form>
      <select id="wallet-user-select"onChange={(e)=> setCreatewallet({...createwallet, user_id: e.target.value})}>{users.map(user => {
          return <option key={user.id} value ={user.id}>{user.name}</option>
        })}</select>
        <br/>
        <TextField id="new-wallet-amt-field" label="Amount" defaultValue="" variant="filled" size="small"  type='number'  onChange={(e)=> setCreatewallet({...createwallet, balance: e.target.value })}/><br/>
        <label hidden>Date</label>
        <input value={Date.now()} hidden/>
        
        <TextField id="new-wallet-cat-field" label="Category" defaultValue="" variant="filled" size="small"  type='text' onChange={(e) => setCreatewallet({...createwallet, category: e.target.value})} value={createwallet.category}/><br/>
        
        <br/>
        <Button id="new-wallet-button" size="small" variant="contained" onClick={makewallet}>Submit</Button>
      </form>
          <div><h2 id='wallet-details-title'><u>Wallet Details</u>:</h2></div>
      <div>
        <ul id='user-details-list'>
          {users.map(user => {
            return <User key={user.id} setUsers={setUsers} name={user.name} setWallet={setWallet} wallets={user.wallets} user={user} handleDeleteWallet={handleDeleteWallet}/>
          })}
        </ul>
      </div>

      

    </div>

  )
}

export default Wallet