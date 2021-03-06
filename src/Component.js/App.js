import '../App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home';
import Wallet from './Wallet';
import Budget from './Budget';
import Transaction from './Transaction';
import Navbar from './Navbar';
import Error from './Error';
import {useState, useEffect} from 'react'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


function App() {
  const [trans, setTrans] = useState([])
  const [wallet, setWallet] = useState([])
  const [budget, setBudget] = useState(0)
  const [users, setUsers] = useState([])

  

 
  // trans has transaction and user
  // wallet has wallet and category
  useEffect(()=> {
    fetch('http://localhost:9292/transactions')
    .then(res => res.json())
    .then(data => setTrans(data))
  },[])

  useEffect(()=> {
    fetch('http://localhost:9292/wallet')
    .then(res => res.json())
    .then(data => setWallet(data))
  },[])

  useEffect(()=> {
    fetch('http://localhost:9292/main-budget')
    .then(res => res.json())
    .then(data => setBudget(data))
  },[])

  useEffect(()=> {
    fetch('http://localhost:9292/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  function handleDeleteTransaction(deletedTransaction) {
    const newTransactionsArray = trans.filter(transaction => transaction.id != deletedTransaction.id)
    setTrans(newTransactionsArray)
  }

  function handleUpdateUsers(deletedUser) {
    const newUsersArray = users.filter(user => user.id != deletedUser.id)
    setUsers(newUsersArray)
    
  }

  function handleDeleteWallet(deletedWallet) {
    const newWalletArray = wallet.filter(wallet => wallet.id != deletedWallet.id)
    setWallet(newWalletArray)
  }

  return (
  <div>
    <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}> 
    <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home wallet={wallet} budget={budget} users={users} setUsers={setUsers}/>}/>
            <Route path="/Transaction" element={<Transaction trans={trans} wallet={wallet} setTrans={setTrans} setWallet={setWallet} handleDeleteTransaction={handleDeleteTransaction} setUsers={setUsers}/>}/>
            <Route path="/Budget" element={<Budget budget={budget} setTrans={setTrans} wallet={wallet} setWallet={setWallet} handleUpdateUsers={handleUpdateUsers} setBudget={setBudget} users={users} setUsers={setUsers} />}/>
            <Route path="/Wallet" element={<Wallet users={users} setUsers={setUsers} setWallet={setWallet} wallet={wallet} budget={budget} setBudget={setBudget} handleDeleteWallet={handleDeleteWallet} setTrans={setTrans}/>}/>
            <Route path="*" element={<Error/>}/>
          </Routes>
    </BrowserRouter>
    </Box>
    </Container>

  </div>

  )
}

export default App;








