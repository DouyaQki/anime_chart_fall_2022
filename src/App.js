import React, { useState, useEffect } from 'react'
import './App.css'
import Cards from './components/Cards'
import ErrorData from './components/ErrorData'

let LOADING_STYLE_DEFAULT = { display: 'absolute' }

const App = () => {
  const [dataDb, setDataDb] = useState(null)
  const [newDataDb, setNewDataDb] = useState(null)

  const [isLoadingStyle, setIsLoadingStyle] = useState(LOADING_STYLE_DEFAULT)
  const [dataDbError, setDataDbError] = useState(false)
  const [inputSearch, setInputSearch] = useState('')

  //* INPUT SEARCH ------------------------------------------------------->

  const handleChange = (e) => {
    const { value } = e.target

    setInputSearch(value)
  }


  //* GETTING API ------------------------------------------------------->

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

          setIsLoadingStyle({ display: 'none' })
          setDataDb(data)
          setNewDataDb(data)
          setDataDbError(false)
          return
        }

        setDataDbError(true)
        setIsLoadingStyle({ display: 'none' })

        setDataDb(null)
        setNewDataDb(null)
        throw Error('something happened')
      } catch (error) {
        console.log('An error occurred')
        controller.abort()
        console.log(`aborted? ${signal.aborted}`)
      }
    }

    getData(URL)

    return () => controller.abort()
  }, [])

  //* LOADING animation ------------------------------------------------------------------->
  useEffect(() => {
    if (dataDbError) {
      setIsLoadingStyle({ display: 'none' })
    }
  }, [dataDb, dataDbError])

  //* MAP CARDS CALLBACK ------------------------------------------------------------------->

  const mapDataDbCallBack = ({
    id,
    title,
    studio,
    aired,
    genre,
    synopsis,
    img,
  }) => (
    <Cards
      key={id}
      title={title}
      studio={studio}
      aired={aired}
      genre={genre}
      synopsis={synopsis}
      img={img}
    />
  )

  //* FILTERED DATADB ------------------------------------------------------------------->
  useEffect(() => {
    // El loop se generaba porque newDataDb en el useEffect
    // tiene que hacerlo con el valor previo
    // si se añade al array de re-render.
    if (dataDb && inputSearch.length >= 1) {
      const dataDblowerCaseTitles = inputSearch.toLocaleLowerCase().trim()
      const dataDbRegExp = new RegExp(`^${dataDblowerCaseTitles}`)

      setNewDataDb({
        fall_2022: dataDb.fall_2022.filter((el) =>
          dataDbRegExp.test(el.title.toLocaleLowerCase())
        ),
      })
    }
  }, [dataDb, inputSearch])

  return (
    <div>
      <div style={isLoadingStyle} className='loading-box'>
        <div className='loading'>
          <p>Loading</p>
        </div>
      </div>

      <input
        type='search'
        className='search'
        placeholder='Filter anime'
        value={inputSearch.input}
        onChange={handleChange}
        disabled={dataDbError}
      />

      {/* ErrorData tiene styled components */}
      {dataDbError && <ErrorData />}

      <main>
        {dataDb && <h2>TV</h2>}

        <div className='card'>
          {dataDb
            ? inputSearch.length >= 1
              ? newDataDb?.fall_2022?.map(mapDataDbCallBack)
              : dataDb?.fall_2022?.map(mapDataDbCallBack)
            : null}
        </div>
      </main>
    </div>
  )
}

export default App
