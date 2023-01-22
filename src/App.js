import React, { useState, useEffect } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
import './App.css'
import Cards from './components/Cards'
import ErrorData from './components/ErrorData'

// This is for localStore purposes.
export const LOCAL_DATA = 'localData'

// let LOADING_STYLE_DEFAULT = { display: 'absolute' }
// parapoder  chequear el localStorage
let LOADING_STYLE_DEFAULT = { display: 'none' }

//* COMPONENT ------------------------------------------------------->
const App = () => {
  const [dataDb, setDataDb] = useState(null)

  const [isLoadingStyle, setIsLoadingStyle] = useState(LOADING_STYLE_DEFAULT)
  const [dataDbError, setDataDbError] = useState(false)
  const [inputSearch, setInputSearch] = useState('')

  //* LOCALSTORAGE ------------------------------------------------------->

  useEffect(() => {
    const thereIsNoLocalData =
      !reactLocalStorage.getObject(LOCAL_DATA)?.fall_2022

    if (thereIsNoLocalData && dataDb) {
      reactLocalStorage.setObject(LOCAL_DATA, dataDb)
      return
    }

    // SI EXISTE, CARGA EL LOCAL DATA
  }, [dataDb])
  //* INPUT SEARCH ------------------------------------------------------->

  const handleChange = (e) => {
    const { value } = e.target

    setInputSearch(value)
  }

  //* GETTING API ------------------------------------------------------->

  const URL = 'https://douyaqki.github.io/anime_chart_fall_2022/chart.json'

  useEffect(() => {
    const thereIsLocalData = reactLocalStorage.getObject(LOCAL_DATA)?.fall_2022

    const controller = new AbortController()
    const signal = controller.signal

    const getData = async (url) => {
      try {
        const response = await fetch(url, { signal })

        if (response.ok) {
          const data = await response.json()
          // since the data is unsorted i had to.
          const sortDataByName = (a, b) => {
            if (a.title < b.title) return -1
            if (a.title > b.title) return 1
            return 0
          }

          data?.fall_2022.sort(sortDataByName)
          setIsLoadingStyle({ display: 'none' })
          setDataDb(data)
          setDataDbError(false)

          return
        }

        setDataDbError(true)
        setIsLoadingStyle({ display: 'none' })

        setDataDb(null)
        throw Error('something happened')
      } catch (error) {
        console.log('An error occurred')
        controller.abort()
        console.log(`aborted? ${signal.aborted}`)
      }
    }

    if (thereIsLocalData) {
      console.log('There is data. Fetch is not needed.')
      setDataDb(reactLocalStorage.getObject(LOCAL_DATA))
      return
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
    follow,
  }) => (
    <Cards
      key={id}
      idShow={id}
      title={title}
      studio={studio}
      aired={aired}
      genre={genre}
      synopsis={synopsis}
      img={img}
      follow={follow}
      dataDb={dataDb}
      setDataDb={setDataDb}
    />
  )

  //* FILTERED DATADB ------------------------------------------------------------------->
  // El loop se generaba porque newDataDb en el useEffect
  // tiene que hacerlo con el valor previo
  // si se añade al array de re-render.

  const dataDbLowerCaseTitles = inputSearch.toLocaleLowerCase().trim()
  const dataDbRegExp = new RegExp(`^${dataDbLowerCaseTitles}`)

  //* THIS DISPLAY ALL THE CARDS MAPPED ------------------------------------------------->

  const dataMappedOrFilteredData = dataDb
    ? inputSearch.length >= 1
      ? dataDb?.fall_2022
          ?.filter(({ title }) => dataDbRegExp.test(title.toLocaleLowerCase()))
          .map(mapDataDbCallBack)
      : dataDb?.fall_2022?.map(mapDataDbCallBack)
    : null

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
          {/* If user searches something, the filtered dataDb is displayed. */}
          {dataMappedOrFilteredData}
        </div>
      </main>
    </div>
  )
}

export default App
