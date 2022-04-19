import React from 'react'

function Categories() {
  return (
    <div className='container'>
      <div className='top'><h1>Wallet</h1></div>
      <div className='top'> Dates </div>
      <div> 
        <select name='sample'>
          <option >Sample1</option>
          <option >Sample2</option>
          <option >Sample3</option>
          <option >Sample4</option>
        </select>
        <select name='sample'>
          <option >Sample1</option>
          <option >Sample2</option>
          <option >Sample3</option>
          <option >Sample4</option>
        </select>
        <select name='sample'>
          <option >Sample1</option>
          <option >Sample2</option>
          <option >Sample3</option>
          <option >Sample4</option>
        </select>
      </div>
    </div>
  )
}

export default Categories