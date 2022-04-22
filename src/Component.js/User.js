import React from 'react'
import {useState} from 'react'

function User({name, wallets, setUsers, handleDeleteWallet, setTrans, setBudget}) {
    const [showwallets, setShowwallets] = useState(true)

    console.log(wallets)

    function handleWalletRemoval(id) {
        fetch(`http://localhost:9292/wallets/${id}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .then((deletedWallet) => handleDeleteWallet(deletedWallet))
        .then (()=>{
            fetch('http://localhost:9292/users')
                .then(res => res.json())
                .then(data => setUsers(data))
                .then(()=> {
                    fetch('http://localhost:9292/transactions')
                    .then(res => res.json())
                    .then(data => setTrans(data))
                    .then(()=> {
                        fetch('http://localhost:9292/main-budget')
                        .then(res => res.json())
                        .then(data => setBudget(data))
                    })
                })
        })
    }
    
  return (
      <>
      { 
        showwallets ?
    <div>
        <button className='' onClick={()=> setShowwallets(prev => !prev)}>{name}</button>
    </div>
    :

        
    <>
        <div style={{width: '100vw', height: '100vh', position:"fixed", top: '0', left: '0', background: 'white'}}></div>
    <table className='modal '>
        <div>
            {/* <h1>{name}'s Wallets</h1> */}
            {/* <button> x</button> */}

        </div>
        <div><h1>{name}'s Wallets</h1></div>
        {wallets.length !== 0?   ( <> <tr>
            <th><h3>Balance</h3></th>
            <th>Category</th>
            <th onClick={()=> setShowwallets(prev => !prev)}><button>exit</button></th>
        </tr>
        {wallets.map(wall => {
            return <tr key = {wall.id} className="myrow">
                        <td> <img id='wallet' src='https://cdn.vectorstock.com/i/1000x1000/59/25/cartoon-wallet-bill-money-cash-dollar-vector-12235925.webp'/> ${wall.balance.toFixed(2)}
                        </td> 

                        <td>
                        {wall.category.name}
                        </td>
                        <td>
                            <button onClick={()=>handleWalletRemoval(wall.id)}>Del</button>
                        </td>
                     </tr>
        })} </>)  :  <p>You have no wallets <button onClick={()=> setShowwallets(prev => !prev)} >exit</button></p>   }
        
    </table>
    </>
        }
    </>
  )
}

export default User