// import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchTitle(title, page) {
  return fetch(
    `https://pixabay.com/api/?key=24469743-af1bc0463689ec6840cc2fde9&q=${title}&page=${page}&per_page=12`
  ).then(response => {
    return response.json();
  });
}

const api = { fetchTitle };
export default api;
