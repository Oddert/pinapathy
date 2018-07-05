import React from 'react';

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleTest = this.handleTest.bind(this);
  }

  handleClick() {
    this.setState({open: !this.state.open});
  }

  handleSubmit() {
    fetch(`/comment/${this.props.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  handleTest(e) {
    if (e.target.className === 'warning_box') {
      this.handleClick();
    }
  }

  render() {
    return (
      <div className='comment_delete' onClick={this.handleTest}>
        <button onClick={this.handleClick} className='svg'>

          <svg data-name="deleteIcon_Layer 1" className="deleteIcon_Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.11 150.56">
            <path className="deleteIcon-1" d="M595.28,751.18" transform="translate(-541.14 -319.79)"/>
            <path className="deleteIcon-2" d="M639.21,370.25a4.75,4.75,0,0,1,4.83,5.61l-12.5,83.89a6.8,6.8,0,0,1-6.5,5.61H565.51a6.8,6.8,0,0,1-6.5-5.61l-12.5-83.89a4.75,4.75,0,0,1,4.83-5.61h87.87Z" transform="translate(-541.14 -319.79)"/>
            <path className="deleteIcon-3" d="M546.7,330.69" transform="translate(-541.14 -319.79)"/>
            <path className="deleteIcon-3" d="M546.14,343.32l1.3-6.86a5.86,5.86,0,0,1,6.65-4.65L578,335.71a5.86,5.86,0,0,0,6.65-4.65l0.29-1.53a5.86,5.86,0,0,1,6.65-4.65L608,327.55A5.51,5.51,0,0,1,612.5,334l-0.29,1.53a5.51,5.51,0,0,0,4.54,6.48L640.62,346a5.51,5.51,0,0,1,4.54,6.48l-0.25,1.29-1.08,5.69,0,0.12" transform="translate(-541.14 -319.79)"/>
            <line className="deleteIcon-3" x1="54.13" y1="72" x2="54.13" y2="124.03"/>
            <line className="deleteIcon-3" x1="76.81" y1="72" x2="76.81" y2="124.03"/>
            <line className="deleteIcon-3" x1="31.46" y1="72" x2="31.46" y2="124.03"/>
            <line className="deleteIcon-3" x1="5.3" y1="23.44" x2="102.97" y2="39.61"/>
          </svg>

        </button>


        {this.state.open ?
          <div className='warning_box'>
            <div className='message'>
              <button className='close' onClick={this.handleClick}>X</button>
              <h3 className='title'>Are you sure you want to delete this comment?</h3><br />
              <p>{this.props.text}</p>
              <button onClick={this.handleSubmit} className='submit accept'>Yes, Delete</button>
              <button onClick={this.handleClick} className='submit cancel'>No, go back</button>
            </div>
          </div> :
          ''
        }
      </div>
    )
  }
}

export default Delete
