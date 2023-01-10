import React from 'react'
import '../cards.css'
import CardImage from './CardImage'

const Cards = ({ dataDb }) => {
  return (
    <div className='card'>
      {/* 
      Tuve problemas al actualizar la web porque se me rompía toda
      porque decía que dataDb no tenía nada, así que se solucionó
      con el optional chaining: dataDb?.map...
       */}
      {
      dataDb?.map(({ id, title, studio, aired, genre, synopsis, img }) => {
        return (
          <article key={id} className='grid-container'>
            {/* caja 1 */}
            <CardImage img={img} title={title} studio={studio} />

            {/* caja 2 */}
            <section className='date-synopsis-and-tags-container'>
              {/* Caja 2-A */}
              <div className='date-and-synopsis'>
                <h3>{aired}</h3>
                <p>{synopsis}</p>
              </div>

              {/* Caja 2-B */}
              <div className='genre-tags'>
              {genre.map((el, idx) => <p key={idx}>{el}</p>)}
              </div>
            </section>
          </article>
        )
      })
      }
    </div>
  )
}

export default Cards
