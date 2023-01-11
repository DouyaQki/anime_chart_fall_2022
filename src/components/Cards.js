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
      {dataDb?.map(({ id, title, studio, aired, genre, synopsis, img }) => {
        return (
          <article key={id} className='grid-container'>
            {/* caja 1 */}
            <CardImage img={img} title={title} studio={studio} />

            {/* caja 2 */}
            <section className='aired-and-synopsis-container'>
              <h3 className='aired'>{aired}</h3>
              <p className='synopsis'>{synopsis}</p>
            </section>

            {/* caja 3 */}
            <div className='genre-tags'>
              {genre.map((el, idx) => (
                <p key={idx}>{el}</p>
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default Cards
