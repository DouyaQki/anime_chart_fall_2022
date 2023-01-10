import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import './App.css'
import Cards from './components/Cards'
import ErrorData from './components/ErrorData'


const ErrorMessage = styled.p`
  color: #93204b;
`

const App = () => {
  const [dataDb, setDataDb] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const URL = 'https://douyaqki.github.io/anime_chart_fall_2022/chart.json'

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const getData = async (url) => {
      try {
        const response = await fetch(url, { signal })

        if (response.ok) {
          const data = await response.json()
          setDataDb(data)
          
          return
        }

        setDataDb(null)
        throw Error('something happened')
      } catch (error) {
        console.log(error)
        console.log(signal.aborted)
      }
    }

    getData(URL)

    return () => controller.abort()
  }, [])

  return (
    <div>
      <input type='search' className='search' placeholder='Filter anime' />

      <h2>TV</h2>
      <main>
        {/* ErrorData tiene styled components */}
        <ErrorData />
        <Cards dataDb={dataDb?.fall_2022} />
      </main>
    </div>
  )
}

export default App
