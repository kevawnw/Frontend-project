import React from 'react'
import {useState, useEffect} from 'react'



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
      <div><h1>Make Purchases</h1></div>

      <form onSubmit={createtrans}>
        <label>Transaction Description</label><br/>

        <input type='text' onChange={(e)=> setNewtrans({...newtrans, description: e.target.value})} value={newtrans.description}/><br/>

        <label>Cost of purchase</label><br/>

        <input type='number' onChange={(e)=> setNewtrans({...newtrans, amount: e.target.value})} value={newtrans.amount}/><br/>

        <select onChange={(e)=> setNewtrans({...newtrans, wallet_id: e.target.value, balance: e.target.selectedOptions[0].getAttribute('data-myAttr') })} value={newtrans.wallet_id} >

          {wallet.map(wall => {
          return <option value={wall.id} key={wall.id} data-myAttr={wall.balance.toFixed(2)} >{`$${wall.balance.toFixed(2)} ${wall.category.name}  ${wall.user.name}`}</option>
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
    <th>Remove</th>
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