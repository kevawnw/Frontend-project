import '../App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home';
import Wallet from './Wallet';
import Categories from './Categories';
import Transaction from './Transaction';
import Navbar from './Navbar';
import Error from './Error';
import {useState, useEffect} from 'react'


function App() {
  const [trans, setTrans] = useState([])
  const [wallet, setWallet] = useState([])
  const [budget, setBudget] = useState(0)
  const [users, setUsers] = useState([])

  console.log(users)
  

 
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

  return (
  <div>
    <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home wallet={wallet} budget={budget} users={users} setUsers={setUsers}/>}/>
            <Route path="/Categories" element={<Categories />}/>
            <Route path="/Transaction" element={<Transaction trans={trans} wallet={wallet} setTrans={setTrans} setWallet={setWallet}/>}/>
            <Route path="/Wallet" element={<Wallet users={users} setWallet={setWallet} wallet={wallet} budget={budget} setBudget={setBudget}/>}/>
            <Route path="*" element={<Error/>}/>
          </Routes>
    </BrowserRouter>
    
  </div>
  )
}

export default App;








