import React from 'react'
import arkImg from '../assets/img/arknights_reimei_zensou.jpg'
import '../CardImage.css'

const CardImage = ({img, title, studio}) => {
  return (
    <div className='image-container'>
      <img className='card-img' src={arkImg} alt="" />

      <div className='card-img-details-container'>
        <p className='card-title'>title</p>
        <p className='card-studio'>studio</p>
      </div>
    </div>
  )
}

export default CardImage
