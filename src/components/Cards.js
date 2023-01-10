import React from 'react'
import '../cards.css'
import CardImage from './CardImage'

const Cards = ({ dataDb }) => {
  return (
    <div className='card'>
      <article className='grid-container'>
        {/* caja 1 */}
        <CardImage />

        {/* caja 2 */}
        <section className='date-synopsis-and-tags-container'>
          {/* Caja 2-A */}
          <div className='date-and-synopsis'>
            <h3>aired</h3>
            <p>synopsis</p>
          </div>

          {/* Caja 2-B */}
          <div className='genre-tags'>
            <p>género</p>
          </div>
        </section>
      </article>
    </div>
  )
}

export default Cards
