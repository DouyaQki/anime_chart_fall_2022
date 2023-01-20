import React, { useState, useRef, useEffect } from 'react'
import '../cards.css'
import CardImage from './CardImage'

const spanStyleInitialState = {
  opacity: 0,
  transition: 'opacity 300ms ease-in',
}

const textOverflowInitialState = {
  overflowY: 'hidden',
}

const Cards = ({ id, title, studio, aired, genre, synopsis, img }) => {
  const [textVisible, setTextVisible] = useState(spanStyleInitialState)
  const [textOverflow, setTextOverflow] = useState(textOverflowInitialState)

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
      </div>
    </article>
  )
}

export default Cards
