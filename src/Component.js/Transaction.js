import {useState, useEffect} from 'react'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';




function Transaction({trans, wallet, setTrans, setWallet, handleDeleteTransaction}) {
  const [newtrans, setNewtrans] = useState({description: "", amount: 0, date: Date.now(), wallet_id: 1, balance: 0})
  console.log(newtrans)

  function handleDelete(id){
    fetch(`http://localhost:9292/transactions/${id}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .then((deletedTransaction) => handleDeleteTransaction(deletedTransaction));
    }

  useEffect(()=> {
    if(wallet.length !== 0){
      setNewtrans({...newtrans, wallet_id: newtrans.wallet_id})
    }
  },[wallet])


// console.log(wallet.forEach(wall => wall.id === newtrans.wallet_id))
// console.log(newtrans.wallet_id)


  function createtrans(e){
    e.preventDefault()
    if(newtrans.description.length === 0){
      return null
    }
    
    if(parseInt(newtrans.amount) > parseInt(newtrans.balance)){
      alert('Insuffient amount')
      return null
    }
    
    fetch('http://localhost:9292/transactions',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({description: newtrans.description, amount: newtrans.amount, date: newtrans.date, wallet_id: newtrans.wallet_id}) 
    })
    .then(res => res.json())
    .then(data => setTrans([...trans, data]))
    .then(() => {
      fetch('http://localhost:9292/wallet')
      .then(res => res.json())
      .then(data => setWallet(data))
    })
    setNewtrans({...newtrans, description: "", amount: 0, balance: newtrans.balance, wallet_id: newtrans.wallet_id})
  }

  // need to retunr to this
  
  return (
    <div>
      <div><h1 id='new-trans-title'><u>Create New Expense</u>:</h1></div>

      <form>
        
        <select id='new-trans-select' onChange={(e)=> setNewtrans({...newtrans, wallet_id: e.target.value, balance: e.target.selectedOptions[0].getAttribute('data-myAttr') })} value={newtrans.wallet_id} >

          {wallet.map(wall => {
          return <option value={wall.id} key={wall.id} data-myAttr={wall.balance.toFixed(2)} >{`$${wall.balance.toFixed(2)} ${wall.category.name} - ${wall.user.name}`}</option>
        })} 
        
        </select><br/>
        
        <TextField id="budget-field" label="Description" defaultValue="" variant="filled" size="small"  onChange={(e)=> setNewtrans({...newtrans, description: e.target.value})} value={newtrans.description}/><br/>
        
       
        
        <TextField id="budget-field" label="Cost:" defaultValue="$" variant="filled" size="small" onChange={(e)=> setNewtrans({...newtrans, amount: e.target.value})} value={newtrans.amount}/><br/>

        <Button id="new-trans-button" size="small" variant="contained" onClick={createtrans}>Submit</Button>
      </form>
      <br/>
      <br/>

      <div> <h1><u>Expense History</u>:</h1></div>
      <table>
  <tr>
    <th>Description</th>
    <th>Amount</th>
    <th>Date</th>
    <th>Person</th>
    <th></th>
  </tr>
  
    {trans.map(tran => {
      return <tr key={tran.id}>
        <td> {tran.description}</td>
        <td> {tran.amount.toFixed(2)}</td>
        <td> {tran.date}</td>
        <td>{tran.user.name}</td>
        <td><Button id="delete-trans-button" size="small" variant="contained" onClick={() => handleDelete(tran.id)}>Delete</Button></td>
        </tr>        
    })}
  
</table>
    </div>
  )
}

export default Transaction