import React from 'react';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      description: '',
      imgSrc: '',
      imgPage: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.pin.name,
      description: this.props.pin.description,
      imgSrc: this.props.pin.img.src,
      imgPage: this.props.pin.img.page
    })
  }

  handleClick() {
    this.setState({open: !this.state.open});
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/pin/' + this.props.pin._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        img: {
          src: this.state.imgSrc,
          page: this.state.imgPage
        }
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      console.log(res);
      this.props.callback(this.state);
      this.setState({open: !this.state.open});
    });
  }

  render() {
    return (
      <div className='pin-edit-container'>
      <button className='svg' onClick={this.handleClick}>
        <svg className="editIcon_Layer_1" data-name="editIcon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.84 145.84">
          <path className="editIcon-1" d="M595.28,751.18" transform="translate(-500.6 -512.96)"/>
          <polyline className="editIcon-2" points="58.65 127.29 45.09 140.84 5 140.84 5 100.76 29.68 76.07"/>
          <path className="editIcon-2" d="M545.69,653.81l91.62-91.62a14.21,14.21,0,0,0,0-20l-20-20a14.21,14.21,0,0,0-20,0L505.6,613.72" transform="translate(-500.6 -512.96)"/>
          <line className="editIcon-2" x1="25.04" y1="120.8" x2="107.06" y2="38.79"/>
          <line className="editIcon-2" x1="127.1" y1="58.83" x2="87.01" y2="18.74"/>
          <line className="editIcon-2" x1="45.09" y1="140.84" x2="5" y2="100.76"/>
        </svg>
      </button>
        {this.state.open ?
          <div className='pin-edit'>
            <button onClick={this.handleClick} className='close-icon'>X</button>
            <form onSubmit={this.handleSubmit}>

              <label>Title:</label><br />
              <input type='text' name='name' placeholder='Pin Title' value={this.state.name} onChange={this.handleChange} /><br />

              <label>Description:</label><br />
              <input type='text' name='description' placeholder='Description' value={this.state.description} onChange={this.handleChange} /><br />

              <label>Image:</label><br />
              <input type='url' name='imgSrc' placeholder='Image' value={this.state.imgSrc} onChange={this.handleChange} /><br />

              <img src={this.state.imgSrc} alt={this.props.pin.name + ' image preview'} className='image-preview' /><br />

              <label>Page Link:</label><br />
              <input type='url' name='imgPage' placeholder='Link to Page' value={this.state.imgPage} onChange={this.handleChange} /><br />

              <button className='submit'>Save</button>
            </form>
          </div>
           : ''}
      </div>
    )
  }
}

export default Edit;
