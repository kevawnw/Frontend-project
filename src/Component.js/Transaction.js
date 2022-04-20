import React from 'react'

function Transaction({trans, handleDeleteTransaction}) {
  console.log(trans)

function handleDelete(id){
  fetch(`http://localhost:9292/transactions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((deletedTransaction) => handleDeleteTransaction(deletedTransaction));
  }
  
  
  
  return (
    <div>
      <div><h1>Make Purchases</h1></div>

      <form>
        <label>Transaction Description</label><br/>
        <input type='text'/><br/>
        <label>Cost of purchase</label><br/>
        <input type='number'/><br/>
        <select></select>
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
      return <tr>
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