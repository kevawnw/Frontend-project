import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div>
       <nav className='nav-bar'>
           <Link to="/" id='homeLink'>Home</Link>
           <Link to="/Budget" id='budgetLink'>Budget</Link>
           <Link to="/Transaction" id='transactionLink'>Transaction</Link>
           <Link to="/Wallet" id='walletLink'>Wallet</Link>
       </nav>
    </div>
  )
}

export default Navbar