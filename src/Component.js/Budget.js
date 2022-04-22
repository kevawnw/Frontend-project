
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';



function Budget({budget, wallet, setBudget, users, setUsers, handleUpdateUsers, setWallet}) {

  const [newBudget, setNewBudget] = useState(0)
  const [newuser, setNewuser] = useState({name: ''})
  const [deleteUser, setDeleteUser] = useState("")
  
  
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
    document.getElementById('user-form').reset();
   
  }

  function handleDeleteUser(id){
    fetch(`http://localhost:9292/users/${id}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .then((deletedUser) => handleUpdateUsers(deletedUser))
          .then(()=> {
            fetch('http://localhost:9292/wallet')
              .then(res => res.json())
              .then(data => setWallet(data))
        })
       
  }


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
      document.getElementById('budget-form').reset();
      
  }

  

  return (
    <>
    
    <div className='container'>
      <div id="budget-title" className='top'><h1 id='budget-title-h1'><u>Current Budget</u>: ${budget.toLocaleString("en-US")}</h1></div>
      <form id="budget-form">
        <label id="new-budget-label">Adjust Budget:</label><br/>
      <TextField id="budget-field" label="New Budget Amt" defaultValue="" variant="filled" size="small" onChange={handleUpdateBudget}/>
      <Button id="budget-button" size="small" variant="contained" onClick={handleSubmitBudget}>Submit</Button>
      </form>
      <form id="user-form">
          <label id="user-form-label">Create New User:</label><br/>
          <TextField id="budget-field" label="User Name" defaultValue="" variant="filled" size="small"  onChange={(e)=> setNewuser({...newuser, name: e.target.value})}/>
          <Button id="user-button" size="small" variant="contained" onClick={createusers}>Submit</Button>
        </form><br/>
        <div> <h1><u>Current Users:</u></h1></div>
      
  <table id="users-table">
  <tr>
    <th>User Name</th>
    <th>User ID</th>
    <th>Total Contribution</th>
    <th>Contribution %</th>
  </tr>
  
    {users.map(user => {
      return <tr key={user.id}>
        <td> {user.name}</td>
        <td> {user.id}</td>
        <td>{wallet.filter(wal => wal.user_id == user.id).reduce((total, object) => object.balance + total, 0)}</td>
        <td>{`${wallet.filter(wal => wal.user_id == user.id).reduce((total, object) => object.balance + total, 0)}`/`${wallet.reduce((total, object) => object.balance + total, 0)}`*100}</td>
        <td id='delete-user-button-row'><Button size="small" id='user-delete-button' variant="contained" onClick={() => handleDeleteUser(user.id)}>Delete</Button></td>
        </tr>        
    })}
      
  
</table>
    {console.log('wallet',wallet)}
    </div>
    
  </>)
}

export default Budget