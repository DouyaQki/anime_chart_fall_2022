import React, { useRef, useState } from 'react'
import '../cards.css'
import CardImage from './CardImage'

const Cards = ({ dataDb }) => {
  const synopsisRef = useRef()
  const [invisible, setInvisible] = useState('')

  return (
    <div className='card'>
      {/* 
      Tuve problemas al actualizar la web porque se me rompía toda
      porque decía que dataDb no tenía nada, así que se solucionó
      con el optional chaining: dataDb?.map...
       */}
      {dataDb?.map(
        ({ id, title, studio, aired, genre, synopsis, img }, idx) => {
          // The synopsis is too long, it must be sliced.
          const lengthSynopsis = synopsis.length
          let shortenedSynopsis = ''
          let secondHalfSynopsis = synopsis.slice(230)

          if (lengthSynopsis >= 230) {
            shortenedSynopsis = `${synopsis.slice(0, 230)}... `
          }

          const handlerOnMouseOver = (idx, id, e) => {
            // struggling.
          }

          const handlerOnMouseLeave = (e) => {}

          return (
            <article
              key={id}
              className='grid-container' 
              onMouseOver={(e) => handlerOnMouseOver(idx, id, e)}
              onMouseLeave={handlerOnMouseLeave}
            >
              {/* BOX 1 IMAGE */}
              <CardImage
                img={img}
                title={title}
                studio={studio} />

              {/* BOX 2 DATE AND SYNOPSIS */}
              <section className='aired-and-synopsis-container'>
                <h3 className='aired'>{aired}</h3>
                <p className='synopsis'>
                  {shortenedSynopsis}
                  <span ref={synopsisRef} className={invisible}>{secondHalfSynopsis}</span>
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
      )}
    </div>
  )
}

export default Cards
