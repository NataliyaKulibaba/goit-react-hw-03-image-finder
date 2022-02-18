import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import titleFetchAPI from './ImageGallery/fetchTitleAPI';
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
    modalSrc: null,
    gallery: null,
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
            this.setState({ gallery: null });
            Notify.failure(
              `Неуспешный результат поиска ${this.state.title}. попробуйте еще раз`
            );
          }
          if (!this.state.gallery) {
            this.setState({ gallery: gallery.hits });
          } else {
            console.log(gallery);
            console.log(gallery.hits);
            this.setState({
              gallery: [...prevState.gallery, ...gallery.hits],
            });
          }
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
    console.log(e.target.id);
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

  render() {
    const { loading, gallery } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleformSubmit} />

        {loading && <Loader />}
        {gallery && (
          <ImageGallery
            gallery={gallery}
            onClick={this.onClickLoadMore}
            onOpen={this.onOpenModal}
          />
        )}
        {gallery && <Button onClick={this.onClickLoadMore} />}

        {this.state.showModal && (
          <Modal onClose={this.onCloseModal}>
            {<img src={this.onSearchLargeImg().largeImageURL} alt="" />}
          </Modal>
        )}
      </>
    );
  }
}
export default App;
