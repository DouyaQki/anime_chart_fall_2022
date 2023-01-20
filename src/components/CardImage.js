import React from 'react'
import '../CardImage.css'

const CardImage = ({ img, title, studio, setImgOnError }) => {
  const imgLoading =
    'https://douyaqki.github.io/anime_chart_fall_2022/img/img_loading.png'

  const handleImageLoad = (e) => {
    e.target.src = img
    e.target.style.width = 'auto'
    setImgOnError('grid')
  }

  const handleImageError = (e) => {
    setImgOnError('none')
  }

  /*
  Aparentemente cuando cargas una imagen con onLoad,
  hay que quitar el loading='lazy', si no, la consola
  tira este mensaje:
  "Images loaded lazily and replaced with placeholders."
   */

  return (
    <div className='image-container'>
      <img
        className='card-img'
        src={imgLoading}
        alt=''
        // loading='lazy'
        onLoad={handleImageLoad}
        onError={handleImageError}
        height='240'
        width='170'
      />

      <div className='card-img-details-container'>
        <span className='card-title'>{title}</span>
        <span className='card-studio'>{studio}</span>
      </div>
    </div>
  )
}

export default CardImage
