import React from 'react'
import arkImg from './arknights_reimei_zensou.jpg'
import '../CardImage.css'

const CardImage = ({img, title, studio}) => {
  return (
    <div className='image-container'>
      <img className='card-img' src={img} alt={img} />

      <div className='card-img-details-container'>
        <span className='card-title'>{title}</span>
        <span className='card-studio'>{studio}</span>
      </div>
    </div>
  )
}

export default CardImage
