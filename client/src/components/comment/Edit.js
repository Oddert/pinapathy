import React from 'react';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleBoundary = this.handleBoundary.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({name: this.props.comment.name})
  }

  handleClick() {
    this.setState({open: !this.state.open});
  }

  handleBoundary(e) {
    if (e.target.className === 'edit_form') {
      this.handleClick();
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`/comment/${this.props.comment._id}/edit`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        name: this.state.name
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        console.log(res);
        this.props.callback(res.comment);
        this.setState({open: false});
      }
    })
  }

  render() {
    return (
      <div className='comment_edit' onClick={this.handleBoundary}>
        {/* <button onClick={this.handleClick}>Edit</button> */}
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
          <div className='edit_form'>
            <div className='message'>
              <button className='close' onClick={this.handleClick}>X</button>
              <h3 className='title'>Edit your comment:</h3>
              <form onSubmit={this.handleSubmit}>
                <textarea name='name' placeholder='Comment Text' onChange={this.handleChange} value={this.state.name}></textarea>
                <button className='form_button submit'>Accept</button>
              </form>
              <button onClick={this.handleClick} className='form_button cancel'>Cancel</button>
            </div>
          </div> :
          ''
        }
      </div>
    )
  }
}

export default Edit
