import React from 'react'
import './App.css'
import randomImg from './assets/img/arknights_reimei_zensou.jpg'

const App = () => {

  const URL = "https://douyaqki.github.io/anime_chart_fall_2022_js/chart.json"
  
  const getData = async (url) => {
    try {
      const response = await fetch(url)

      if(response.ok) {
        const data = await response.json()
        return data
      }

      throw Error('something happened')
    } catch (error) {
      console.log(error)
    }
  }

  getData(URL)
    .then(res => console.log(res))


  return (
    <div>
      <input type='search' className='search' placeholder='Filter anime' />

      <h2>TV</h2>
      <main>
        <img src={randomImg} alt='arknights' height="300px" />
      </main>
    </div>
  )
}

export default App
