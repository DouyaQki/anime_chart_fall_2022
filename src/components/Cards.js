import React, { useState, useRef } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
// CSS and resources.
import '../cards.css'
import CardImage from './CardImage'
// localStorage variable.
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

  const [btnText, setBtnText] = useState('+')

  //* When onError images trigger. ---------------------------->
  const cardColorStyle = follow ? '#91eea841' : '#fafcfc'

  const [imgOnError, setImgOnError] = useState('grid')
  const cardsDisplay = { display: imgOnError, backgroundColor: cardColorStyle }

  //* ADD / REMOVE TO FAVORITE ----------------------------------------------->

  const handleButtonEnter = (e) => {
    let { textContent } = e.target
    const FAVORITE_ADDED = '+'
    const FAVORITE_REMOVED = '-'

    if (textContent === FAVORITE_ADDED) {
      e.target.style.backgroundColor = '#6495ed80'
      return
    }

    if (textContent === FAVORITE_REMOVED) {
      e.target.style.backgroundColor = '#ed646480'
      return
    }
  }

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = '#80808041'
  }

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
    const { textContent } = e.target
    const FAVORITE_ADDED = '+'
    const FAVORITE_REMOVED = '-'

    if (textContent === FAVORITE_ADDED) {
      console.log(FAVORITE_ADDED)
      setBtnText(FAVORITE_REMOVED)

      const showFollowedIdx = dataDb?.fall_2022?.findIndex(
        (el) => el.id === idShow
      )

      const dataDbFollowCopy = { fall_2022: [...dataDb?.fall_2022] }

      dataDbFollowCopy.fall_2022[showFollowedIdx].follow = true

      if (dataDb) setDataDb(dataDbFollowCopy)

      //* it updates the variable in localStorage ------------------------->
      reactLocalStorage.setObject(LOCAL_DATA, dataDb)
    }

    if (textContent === FAVORITE_REMOVED) {
      setBtnText(FAVORITE_ADDED)

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
      <article className='col-2-container'>
        <section
          style={textOverflow}
          className='aired-and-synopsis-container'
          ref={scrollRef}
        >
          <h3 className='aired left-gap'>{aired}</h3>
          <p className='synopsis left-gap'>
            {`${synopsisFirstHalf}${textTooLong}`}
            <span style={textVisible}>{synopsisSecondHalf}</span>
          </p>
        </section>

        {/* BOX 3 GENRES */}
        <div className='genre-tags'>
          <div className='tags-box left-gap'>
            {genre.map((el, idx) => (
              <p key={idx}>{el}</p>
            ))}
          </div>

          <button
            className='favorite-btn'
            onClick={handleClickFavorite}
            data-div_favorite='fav'
            onMouseEnter={handleButtonEnter}
            onMouseLeave={handleButtonLeave}
          >
            {btnText}
          </button>
        </div>
      </article>
    </article>
  )
}

export default Cards
