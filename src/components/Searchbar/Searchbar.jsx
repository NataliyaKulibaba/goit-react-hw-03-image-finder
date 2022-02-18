import { Component } from 'react';
// import { toast } from 'react-toastify';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Searchbar extends Component {
  state = {
    title: '',
  };

  handleTitleChange = e => {
    this.setState({ title: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.title.trim() === '') {
      // alert('введите данные в поисковую строку');
      Notify.warning('введите данные в поисковую строку');
      // toast.info('введите данные в поисковую строку');

      return;
    }
    this.props.onSubmit(this.state.title);

    this.setState({ title: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />

          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
