import React from 'react'
import {useState, useEffect} from 'react'

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
  }

  

  return (
    <div className='container'>
      <div className='top'><h1>Monthly Budget: ${budget}</h1></div>
      <form onSubmit={handleSubmitBudget}>
      <input type='number' onChange={handleUpdateBudget}></input>
      <input type='submit' value='Update Budget'></input>
      </form>
      <form onSubmit={createusers}>
          <label>create user</label><br/>
          <input type="text" onChange={(e)=> setNewuser({...newuser, name: e.target.value})}/>
          <input type= 'submit'/>
        </form><br/>
        <div> <h1>Users</h1></div>
      
  <table>
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
        <td><button onClick={() => handleDeleteUser(user.id)}>Delete</button></td>
        </tr>        
    })}
      
  
</table>
    {console.log('wallet',wallet)}
    </div>
  )
}

export default Budget