import React, { useState, useRef } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
import '../cards.css'
import CardImage from './CardImage'
import addFavorite from '../assets/favorite_add.png'
import removeFavorite from '../assets/favorite_close.png'
// localStorage variable
import { LOCAL_DATA } from '../App'

const spanStyleInitialState = {
  opacity: 0,
  transition: 'opacity 300ms ease-in',
}

const textOverflowInitialState = {
  overflowY: 'hidden',
}

const Cards = ({
  id,
  idShow,
  title,
  studio,
  aired,
  genre,
  synopsis,
  img,
  follow,
  dataDb,
  setDataDb,
}) => {
  const [textVisible, setTextVisible] = useState(spanStyleInitialState)
  const [textOverflow, setTextOverflow] = useState(textOverflowInitialState)
  const [, setBtnFavorite] = useState(false)

  //* When onError images trigger. ---------------------------->
  const [imgOnError, setImgOnError] = useState('grid')
  const cardsDisplay = { display: imgOnError }

  //* USEREF ----------------------------------------------------------------->
  const scrollRef = useRef(null)

  const synopsisFirstHalf = synopsis.slice(0, 130)
  const synopsisSecondHalf = synopsis.slice(130)

  const textTooLong =
    synopsis.length >= 130 && (textVisible?.opacity ?? 0) ? '' : '...'

  const handlerOnMouseOver = () => {
    setTextVisible({
      ...textVisible,
      opacity: 1,
    })

    setTextOverflow({
      overflowY: 'scroll',
    })
  }

  const handlerOnMouseLeave = () => {
    setTextVisible({
      ...textVisible,
      opacity: 0,
    })

    setTextOverflow(textOverflowInitialState)

    scrollRef.current.scrollTop = 0
  }

  const handleClickFavorite = (e) => {
    if (e.target.src === addFavorite) {
      e.target.src = removeFavorite
      setBtnFavorite(false)
      // REVISAR. YA ENCUENTRA EL INDICE
      // FALTA MANDAR AL APP UNA COPIA
      // CON EL FOLLOW EN TRUE/FALSE
      const showFollowedIdx = dataDb?.fall_2022?.findIndex(
        (el) => el.id === idShow
      )

      const dataDbFollowCopy = { fall_2022: [...dataDb?.fall_2022] }

      dataDbFollowCopy.fall_2022[showFollowedIdx].follow = true

      if (dataDb) setDataDb(dataDbFollowCopy)

      //* it updates the variable in localStorage ------------------------->
      reactLocalStorage.setObject(LOCAL_DATA, dataDb)

      return
    }

    if (e.target.src === removeFavorite) {
      e.target.src = addFavorite
      setBtnFavorite(true)

      const showFollowedIdx = dataDb?.fall_2022?.findIndex(
        (el) => el.id === idShow
      )

      const dataDbFollowCopy = { fall_2022: [...dataDb?.fall_2022] }

      dataDbFollowCopy.fall_2022[showFollowedIdx].follow = false

      if (dataDb) setDataDb(dataDbFollowCopy)

      //* it updates the variable in localStorage ------------------------->
      reactLocalStorage.setObject(LOCAL_DATA, dataDb)

      return
    }
  }

  const btnStyle = follow ? removeFavorite : addFavorite

  return (
    <article
      style={cardsDisplay}
      key={id}
      className='grid-container'
      onMouseEnter={handlerOnMouseOver}
      onMouseLeave={handlerOnMouseLeave}
    >
      {/* BOX 1 IMAGE */}
      <CardImage
        setImgOnError={setImgOnError}
        img={img}
        title={title}
        studio={studio}
      />

      {/* BOX 2 DATE AND SYNOPSIS */}
      <section
        style={textOverflow}
        className='aired-and-synopsis-container'
        ref={scrollRef}
      >
        <h3 className='aired'>{aired}</h3>
        <p className='synopsis'>
          {`${synopsisFirstHalf}${textTooLong}`}
          <span style={textVisible}>{synopsisSecondHalf}</span>
        </p>
      </section>

      {/* BOX 3 GENRES */}
      <div className='genre-tags'>
        {genre.map((el, idx) => (
          <p key={idx}>{el}</p>
        ))}

        <div className='favorite-box' onClick={handleClickFavorite}>
          <img className='favorite-img' src={btnStyle} alt='#' />
        </div>
      </div>
    </article>
  )
}

export default Cards
