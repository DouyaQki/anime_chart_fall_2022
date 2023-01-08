import React from 'react'
import './App.css'
import randomImg from './assets/img/arknights_reimei_zensou.jpg'

const App = () => {

  const getData = (url) => {

  }
  return (
    <div>
      <input type='search' className='search' placeholder='Filter anime' />

      <h2>TV</h2>
      <main>
        <img src={randomImg} alt="arknights" />
      </main>
    </div>
  )
}

export default App
