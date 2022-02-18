import { Component } from 'react';
// import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import titleFetchAPI from './fetchTitleAPI';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import Modal from './Modal/Modal';

class App extends Component {
  state = {
    title: '',
    showModal: false,
    error: null,

    page: 1,
    largeImageId: null,
    gallery: [],
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const nextTitle = this.state.title;
    const nextPage = this.state.page;

    if (prevState.title !== nextTitle || prevState.page !== nextPage) {
      this.setState({ loading: true });
      titleFetchAPI
        .fetchTitle(nextTitle, nextPage)
        .then(gallery => {
          if (gallery.total === 0) {
            this.setState({ gallery: [] });
            Notify.failure(
              `Неуспешный результат поиска ${this.state.title}. попробуйте еще раз`
            );
            return;
          }
          if (!this.state.gallery || prevState.title !== nextTitle) {
            this.setState({ gallery: gallery.hits });
          } else {
            this.setState({
              gallery: [...prevState.gallery, ...gallery.hits],
            });
            this.scroll();
          }
        })
        .catch(error => {
          this.setState({ error });
          Notify.failure(
            `Неуспешный результат поиска ${this.state.title}. попробуйте еще раз`
          );
          return;
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleformSubmit = title => {
    console.log(title);
    this.setState({ title });
  };

  onClickLoadMore = () => {
    this.setState(prevState => {
      console.log(prevState.page);
      return {
        page: (prevState.page += 1),
      };
    });
  };

  onOpenModal = e => {
    this.setState({
      showModal: true,
      largeImageId: Number(e.target.id),
    });
  };

  onCloseModal = e => {
    this.setState({
      showModal: false,
    });
  };

  onSearchLargeImg = () => {
    const largeImg = this.state.gallery.find(image => {
      return image.id === this.state.largeImageId;
    });
    return largeImg;
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { loading, gallery, error } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleformSubmit} />

        {loading && <Loader />}

        {gallery.length > 0 && (
          <ImageGallery
            gallery={gallery}
            onClick={this.onClickLoadMore}
            onOpen={this.onOpenModal}
          />
        )}

        {gallery.length >= 12 && <Button onClick={this.onClickLoadMore} />}

        {this.state.showModal && (
          <Modal onClose={this.onCloseModal}>
            {
              <img
                src={this.onSearchLargeImg().largeImageURL}
                alt={this.onSearchLargeImg().tags}
              />
            }
          </Modal>
        )}

        {error && error}
      </>
    );
  }
}

export default App;
