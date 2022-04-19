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
  useEffect(()=> {
    fetch('http://localhost:9292/transactions')
    .then(res => res.json())
    .then(data => setTrans(data))
  },[])

  

  return (
  <div>
    <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Categories" element={<Categories />}/>
            <Route path="/Transaction" element={<Transaction trans={trans}/>}/>
            <Route path="/Wallet" element={<Wallet/>}/>
            <Route path="*" element={<Error/>}/>
          </Routes>
    </BrowserRouter>
    
  </div>
  )
}

export default App;








