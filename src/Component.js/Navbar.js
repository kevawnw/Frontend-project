import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div>
       <nav className='nav-bar'>
           <Link to="/">Home</Link>
           <Link to="/Budget">Budget</Link>
           <Link to="/Transaction">Transaction</Link>
           <Link to="/Wallet">Wallet</Link>
       </nav>
    </div>
  )
}

export default Navbar