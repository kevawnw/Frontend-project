
import {useState} from 'react'
import Button from '@mui/material/Button'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';


function User({name, wallets, setUsers, handleDeleteWallet}) {
    const [showwallets, setShowwallets] = useState(true)

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
        })
    }
    
  return (
      <>
      { 
        showwallets ?
    <div id='wallet-details-div'>
        <Button id="wallet-details-button" color="success" size="small" variant="contained"  onClick={()=> setShowwallets(prev => !prev)}>{name}</Button>
    </div>
    :

        
    <>
        <div style={{width: '100vw', height: '100vh', position:"fixed", top: '0', left: '0', background: 'white'}}></div>
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
            return <tr key = {wall.id} className="myrow">
                        <td> <img id='wallet' src='https://cdn.vectorstock.com/i/1000x1000/59/25/cartoon-wallet-bill-money-cash-dollar-vector-12235925.webp'/> ${wall.balance.toFixed(2)}
                        </td> 

                        <td>
                        {wall.category.name}
                        </td>
                        <td>
                            <Button id="wallet-delete-button" size="small" variant="contained"   onClick={()=>handleWalletRemoval(wall.id)}>Delete</Button>
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