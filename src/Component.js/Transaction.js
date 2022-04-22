import React from 'react'
import {useState, useEffect} from 'react'



function Transaction({trans, wallet, setTrans, setWallet, handleDeleteTransaction, setUsers}) {


const lastModified = new Date().toLocaleDateString("en-US",{
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
})


  const [newtrans, setNewtrans] = useState({description: "", amount: 0, date: lastModified, wallet_id: null})
  const [balance, setBalance] = useState(0)

  
  

  console.log(typeof lastModified)

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
    if(newtrans.description.length === 0){
      return null
    } else {
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
      .then(()=> {
        fetch('http://localhost:9292/users')
        .then(res => res.json())
        .then(data => setUsers(data))
      })
    })
  }
    setNewtrans({...newtrans, description: "", amount: 0, date: newtrans.date, wallet_id: newtrans.wallet_id})
  }

  function dropdownvalue(e){
    const amount = e.target.getAttribute('data-amount').value
    console.log(amount)
    console.log(e.target.value)
  }
  
  return (
    <div>
      <div><h1>Make Purchases</h1></div>

      {/* something is freaking out in the backend.  */}

      <form onSubmit={createtrans}>
        <label>Transaction Description</label><br/>

        <input type='text' onChange={(e)=> setNewtrans({...newtrans, description: e.target.value})} value={newtrans.description}/><br/>

        <label>Cost of purchase</label><br/>

        <input type='number' step="any" onChange={(e)=> setNewtrans({...newtrans, amount: parseFloat(e.target.value)})} value={newtrans.amount}/><br/>

        <label>Wallet</label><br/>

        {/* <select onChange={(e)=> setNewtrans({...newtrans, wallet_id: e.target.value})}  > */}
        <select onChange={dropdownvalue} >

          {wallet.map(wall => {
          return <option  key={wall.id} value={wall.id} data-Amount = {wall.balance.toFixed(2)}>{`$${wall.balance.toFixed(2)} ${wall.category.name}  ${wall.user.name}`}</option>
        })} 
        
        </select><br/>

        <input type = 'submit'/>
      </form>


      <div> <h1>Transaction History</h1></div>
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
        <td><button onClick={() => handleDelete(tran.id)}>Delete</button></td>
        </tr>        
    })}
  
</table>
    </div>
  )
}

export default Transaction