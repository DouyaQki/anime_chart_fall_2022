import React, { useState, useEffect } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
import './App.css'
import Cards from './components/Cards'
import ErrorData from './components/ErrorData'
import arrow_up from './assets/arrow_up.png'

// This is for localStore purposes.
export const LOCAL_DATA = 'localData'

//* COMPONENT ------------------------------------------------------->
const App = () => {
  const [dataDb, setDataDb] = useState(null)
  const [dataDbError, setDataDbError] = useState(false)

  //* INPUT SEARCH ------------------------------------------------------->
  const [inputSearch, setInputSearch] = useState('')

  const handleChange = (e) => {
    setInputSearch(e.target.value)
  }

  //* LOCAL STORAGE ------------------------------------------------------->

  const addDataToLocalStorage = () => {
    const thereIsNoLocalData =
      !reactLocalStorage.getObject(LOCAL_DATA)?.fall_2022

    // If there is an error, data isn't added to localStorage.
    const firstTimeLoading = thereIsNoLocalData && dataDb && !dataDbError

    if (firstTimeLoading) reactLocalStorage.setObject(LOCAL_DATA, dataDb)
  }

  useEffect(addDataToLocalStorage, [dataDb, dataDbError])

  //* FETCH API ------------------------------------------------------->
  const gettingAPI = () => {
    const thereIsLocalData = reactLocalStorage.getObject(LOCAL_DATA)?.fall_2022

    const controller = new AbortController()
    const signal = controller.signal

    const getData = async (url) => {
      try {
        const response = await fetch(url, { signal })

        if (response.ok) {
          const data = await response.json()

          // since the json I created is unsorted, I had to.
          const sortDataByName = (a, b) => {
            if (a.title < b.title) return -1
            if (a.title > b.title) return 1
            return 0
          }

          data?.fall_2022.sort(sortDataByName)

          setDataDb(data)

          if (thereIsLocalData) {
            setDataDb(reactLocalStorage.getObject(LOCAL_DATA))
          }

          setDataDbError(false)

          return
        }

        setDataDbError(true)
        setDataDb(null)
        throw new Error('something happened', {
          cause: {
            response,
          },
        })
      } catch (error) {
        console.log(error.cause?.response?.status)
        controller.abort()
        console.log(`aborted: ${signal.aborted}`)
      }
    }

    getData(URL)

    return () => controller.abort()
  }

  const URL = 'https://douyaqki.github.io/anime_chart_fall_2022/chart.json'

  useEffect(gettingAPI, [])

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
  const dataDbLowerCaseTitles = inputSearch.toLocaleLowerCase().trim()
  const dataDbRegExp = new RegExp(`^${dataDbLowerCaseTitles}`)

  //* THIS DISPLAY ALL THE CARDS MAPPED ------------------------------------------------->
  /*
    dataMappedOrFilteredData triggers a filtered data from search input,
    if it's empty, it displays the raw data.

    ? The data could be a localStorage copy if it exists.

    The searchbar should also be disabled if data is null.
  */

  const dataMappedOrFilteredData = dataDb
    ? inputSearch.length >= 1
      ? dataDb?.fall_2022
          ?.filter(({ title }) => dataDbRegExp.test(title.toLocaleLowerCase()))
          .map(mapDataDbCallBack)
      : dataDb?.fall_2022?.map(mapDataDbCallBack)
    : null

  //* GO UP BUTTON ------------------------------------------------->
  const SCROLL_HIDDEN = 'scroll-btn-hidden'
  const SCROLL_VISIBLE = 'scroll-btn'

  const [scrollBtnHidden, setScrollBtnHidden] = useState(SCROLL_HIDDEN)
  

  useEffect(() => {
    
    window.addEventListener('scroll', () => {
      const SCROLL_Y = Math.floor(window.scrollY)
      console.log()

      if (SCROLL_Y > 3000) {
        setScrollBtnHidden(SCROLL_VISIBLE)
        return
      }
      
      setScrollBtnHidden(SCROLL_HIDDEN)
    })

    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])

  return (
    <>
      <h1>Anime Chart Fall 2022</h1>
      <div className='bk-banner' />

      <div className='app-box'>
        <div className='search-container'>
          <input
            type='search'
            className='search'
            placeholder='Filter anime'
            value={inputSearch.input}
            onChange={handleChange}
            disabled={dataDbError}
          />
        </div>

        {/* ErrorData is a styled components */}
        {dataDbError && <ErrorData />}

        <main>
          {dataDb && <h2>TV</h2>}
          <div className='card'>
            {/* If user searches something, the filtered dataDb is displayed. */}
            {dataMappedOrFilteredData}
          </div>
        </main>
      </div>

      <button
        className={scrollBtnHidden}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img src={arrow_up} alt="arrow up" className='img-btn-up' />
      </button>
    </>
  )
}

export default App
