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
          // since the data is unsorted i had to.
          data?.fall_2022.sort((a, b) => {
            if (a.title < b.title) return -1
            if (a.title > b.title) return 1
            return 0
          })

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
      <ErrorData />

      <main>
        <h2>TV</h2>
        {/* ErrorData tiene styled components */}
        <Cards dataDb={dataDb?.fall_2022} />
      </main>
    </div>
  )
}

export default App
