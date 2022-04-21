import React from 'react'
import {useState} from 'react'

function User({name, wallets, user}) {
    const [showwallets, setShowwallets] = useState(true)
    console.log(wallets)
    
  return (
      <>
      { 
        showwallets ?
    <div>
        <button className='' onClick={()=> setShowwallets(prev => !prev)}>{name}</button>
    </div>
    :

        
    <>
        <div style={{width: '100vw', height: '100vh', position:"fixed", top: '0', left: '0', background: 'black'}}></div>
    <table className='modal '>
        <div>
            {/* <h1>{name}'s Wallets</h1> */}
            {/* <button> x</button> */}

        </div>
    
        <tr>
            <th><h3>Balance</h3></th>
            <th>Category</th>
            <th onClick={()=> setShowwallets(prev => !prev)}>Exit</th>
        </tr>
        {wallets.map(wall => {
            return <tr className="myrow">
                        <td> <img id='wallet' src='https://cdn.vectorstock.com/i/1000x1000/59/25/cartoon-wallet-bill-money-cash-dollar-vector-12235925.webp'/> ${wall.balance.toFixed(2)}
                        </td> 

                        <td>
                        {wall.category.name}
                        </td>
                        <td>
                            <button>Del</button>
                        </td>
                     </tr>
        })}
    </table>
    </>
        }
    </>
  )
}

export default User