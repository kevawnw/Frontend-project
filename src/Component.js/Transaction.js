import React from 'react'

function Transaction({trans}) {
  console.log(trans)
  
  return (
    <div>
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
        </tr>        
    })}
  
</table>
    </div>
  )
}

export default Transaction