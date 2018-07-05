import React from 'react';

class Repin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      board: '',
      errorState: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState({open: !this.state.open});
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errorState: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('user submitted a repin');
    if (this.state.board === 'empty' || this.state.board === '') {
      console.log('User did not select a board >:(');
      this.setState({errorState: true});
    } else {
      fetch(`/pin/${this.props.pin._id}/repin`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          boardId: this.state.board
        })
      })
      .then(res => res.json())
      .then((res) => {
        if (res.error) throw res.error;
        console.log(res);
        window.location.reload();
      })
    }
  }

  render() {
    return (
      <div className='repin-container'>

        {this.props.isAuth ?
          !this.props.isAuthor ?

          <div
            className='repin_icon'
            >
              <button className='svg' onClick={this.handleClick}>
                <svg data-name="repin_icon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.23 143.46">
                  <path className="repin_icon-1" d="M595.28,751.18" transform="translate(-526.46 -313.33)"/>
                  <path className="repin_icon-2" d="M665.18,359.37c4.68,0,5.8-2.7,2.49-6l-33.16-33.13c-3.31-3.31-6-2.18-6,2.49v5.67a8.54,8.54,0,0,1-8.5,8.51L540,337a8.54,8.54,0,0,0-8.5,8.51V379.2a8.53,8.53,0,0,0,8.5,8.5h5.67a8.53,8.53,0,0,0,8.5-8.5V367.86a8.53,8.53,0,0,1,8.5-8.5H665.18Z" transform="translate(-526.46 -313.33)"/>
                  <path className="repin_icon-2" d="M540,410.75c-4.68,0-5.8,2.7-2.49,6l33.16,33.13c3.31,3.31,6,2.18,6-2.49v-5.67a8.54,8.54,0,0,1,8.5-8.51l80-.09a8.54,8.54,0,0,0,8.5-8.51V390.92a8.53,8.53,0,0,0-8.5-8.5h-5.67a8.53,8.53,0,0,0-8.5,8.5v11.34a8.53,8.53,0,0,1-8.5,8.5H540Z" transform="translate(-526.46 -313.33)"/>
                </svg>
              </button>
          </div>
          : ''
          : ''}

          {this.state.open ?
            <div className='repin_form'>
              <h1 className='repin_form-title'>Choose a board to pin to:</h1>
              {this.state.errorState ?
                <div className='error'>
                  <p className='warning'>Please choose a board before pinning</p>
                </div>
              : ''}
              <form onSubmit={this.handleSubmit}>
                <select name='board' onChange={this.handleChange}>
                  <option value='empty'>-Please select a board-</option>
                  {this.props.currentUser.boards.map((each, index) =>
                    <option
                      key={each._id}
                      value={each._id}
                    >
                      {each.name}
                    </option>
                  )}
                </select><br />
                <button className='accept'>Re Pin!</button>
              </form>
              <button onClick={this.handleClick} className='cancel'>Cancel</button>
            </div>
          : ''}

      </div>
    )
  }
}

export default Repin;
