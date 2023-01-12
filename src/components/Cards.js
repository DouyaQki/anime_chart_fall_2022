import React, { useState } from 'react'
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

  const synopsisFirstHalf = synopsis.slice(0, 130)
  const synopsisSecondHalf = synopsis.slice(130)

  const textTooLong = ( (synopsis.length >= 130) && (textVisible?.opacity ?? 0)) ? '' : '...'

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
  }

  return (
    <article
      key={id}
      className='grid-container'
      onMouseEnter={handlerOnMouseOver}
      onMouseLeave={handlerOnMouseLeave}
    >
      {/* BOX 1 IMAGE */}
      <CardImage
        img={img}
        title={title}
        studio={studio} />

      {/* BOX 2 DATE AND SYNOPSIS */}
      <section style={textOverflow} className='aired-and-synopsis-container'>
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
