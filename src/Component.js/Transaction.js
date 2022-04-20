import React from 'react'
import {useState, useEffect} from 'react'



function Transaction({trans, wallet, setTrans, setWallet, handleDeleteTransaction}) {
  const [newtrans, setNewtrans] = useState({description: "", amount: 0, date: Date.now(), wallet_id: null})
  console.log(wallet)

  function handleDelete(id){
    fetch(`http://localhost:9292/transactions/${id}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .then((deletedTransaction) => handleDeleteTransaction(deletedTransaction));
    }

  useEffect(()=> {
    if(wallet.length !== 0){
      setNewtrans({...newtrans, wallet_id: wallet[0].id})
    }
  },[wallet])

  function createtrans(e){
    e.preventDefault()
    // if(newtrans.amount < ){
    //   alert('Insuffient amount')
    //   return null
    // }
    
    fetch('http://localhost:9292/transactions',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newtrans) 
    })
    .then(res => res.json())
    .then(data => setTrans([...trans, data]))
    .then(() => {
      fetch('http://localhost:9292/wallet')
      .then(res => res.json())
      .then(data => setWallet(data))
    })
    
  }





  
  
  
  return (
    <div>
      <div><h1>Make Purchases</h1></div>

      <form onSubmit={createtrans}>
        <label>Transaction Description</label><br/>
        <input type='text' onChange={(e)=> setNewtrans({...newtrans, description: e.target.value})}/><br/>
        <label>Cost of purchase</label><br/>
        <input type='number' onChange={(e)=> setNewtrans({...newtrans, amount: e.target.value})}/><br/>
        <select onChange={(e)=> setNewtrans({...newtrans, wallet_id: e.target.value})}>{wallet.map(wall => {
          return <option value={wall.id}>{`$${wall.balance.toFixed(2)} ${wall.category.name}  ${wall.user.name}`}</option>
        })} </select><br/>
        <input type = 'submit'/>
      </form>


      <div> <h1>Transaction History</h1></div>
      <table>
  <tr>
    <th>Description</th>
    <th>Amount</th>
    <th>Date</th>
    <th>Person</th>
  </tr>
  
    {trans.map(tran => {
      return <tr key={tran.id}>
        <td> {tran.description}</td>
        <td> {tran.amount.toFixed(2)}</td>
        <td> {tran.date}</td>
        <td>{tran.user.name}</td>
        <td><button onClick={() => handleDelete(tran.id)}>Delete</button></td>
        </tr>        
    })}
  
</table>
    </div>
  )
}

export default Transaction