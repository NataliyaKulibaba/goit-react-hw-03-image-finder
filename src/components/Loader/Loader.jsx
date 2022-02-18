import React from 'react';
import s from './Loader.module.css';
import { Audio } from 'react-loader-spinner';

function Loader() {
  return (
    <div className={s.loader}>
      <Audio heigth="100" width="100" color="grey" ariaLabel="loading" />
    </div>
  );
}

export default Loader;
