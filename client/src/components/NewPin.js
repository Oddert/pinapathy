import React from 'react';

class NewPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      src: '',
      dispSrc: true,
      page: '',
      board: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
  }

  handleChange(e) {
    let that = this;
    if (e.target.name === 'src') {
      that.setState({ dispSrc: true });
    }
      this.setState({[e.target.name]: e.target.value});

  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (this.state.board === '' || this.state.board === 'empty') {
      console.log('Error, please select a board')
    } else {
      fetch('/pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: this.state.title,
          src: this.state.src,
          page: this.state.page,
          board: this.state.board
        })
      })
      .then(res => res.json())
      .then((res) => {
        if (res.error) {throw res.error} else {
          console.log(res);
          this.setState({title: '', src: '', page: '', board: ''});
          window.location.reload();
        }
      })
    }
  }

  handleClick(e) {
    console.log(e.target.id);
    this.props.callback();
  }

  addDefaultSrc() {
    console.log('hepl ======');
    this.setState({dispSrc: false});
  }

  render() {
    // console.log(this.props.currentUser);
    return (
      <div className='new-pin' id='new_pin-container'>
        <button onClick={this.handleClick} className='close-icon'>X</button>
        <h3>Create a new pin!</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Title:</label><br />
          <input type='text' name='title' placeholder='Pin Title' value={this.state.title} onChange={this.handleChange} required /><br />

          <label>Image Link:</label><br />
          <input type='url' name='src' placeholder='Image Link' value={this.state.src} onChange={this.handleChange} required /><br />

          <label>Image preview:{/* {this.state.dispSrc.toString()}*/}</label><br />
          <img src={this.state.dispSrc ? this.state.src : 'https://static.umotive.com/img/product_image_thumbnail_placeholder.png'} onError={this.addDefaultSrc} alt='A preview of the link' className='img-preview' /><br />
          <img src={this.state.src} onError={this.addDefaultSrc} alt='no' className='hidden' /><br />

          <label>Page Link:</label><br />
          <input type='url' name='page' placeholder='A link to a page associated with the image' value={this.state.page} onChange={this.handleChange} required /><br />

          <select name='board' onChange={this.handleChange} value={this.state.board} required>
            <option value='empty'>-Please select a board to pin to-</option>
            {this.props.currentUser.boards.map(each => <option value={each._id} key={each._id}>{each.name}</option>)}
          </select>

          <button className='submit'>Add Pin!</button>
        </form>
      </div>
    )
  }
}

export default NewPin
