import React from 'react';

import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, id, tags, onClick }) {
  console.log(webformatURL);
  console.log(id);
  return (
    <li key={id} className={s.galleryItem} onClick={onClick}>
      <img src={webformatURL} alt={tags} id={id} />
    </li>
  );
}

export default ImageGalleryItem;
