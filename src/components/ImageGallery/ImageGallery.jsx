import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';

import s from './ImageGallery.module.css';

function ImageGallery({ gallery, onOpen, onClick }) {
  console.log(onOpen);
  return (
    <>
      <ul className={s.gallery}>
        {gallery.map(({ webformatURL, id, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onClick={onOpen}
          />
        ))}
      </ul>
      <Button onClick={onClick} />
    </>
  );
}

export default ImageGallery;
