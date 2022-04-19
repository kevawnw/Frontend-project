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
  </tr>
  
    {trans.map(tran => {
      return <tr>
        <td> {tran.description}</td>
        <td> {tran.amount}</td>
        <td> {tran.date}</td>
        </tr>        
    })}
  
</table>
    </div>
  )
}

export default Transaction