import React from 'react';

class NewBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(`Going to create a new board called: ${this.state.title} by user ${this.props.user.username}, id: ${this.props.user._id}`);
    fetch('/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        id: this.props.user._id,
        title: this.state.title,
        description: this.state.description
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error
      console.log(res);
      this.setState({title: '', description: ''});
      this.props.callback();
    })
  }

  handleClick() {
    this.props.callback();
  }

  render() {
    return (
      <div className='new-board'>
        <button className='close' onClick={this.handleClick}>X</button>
        <h1>Create a New Board:</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='title' placeholder='A Title for the Board' value={this.state.title} onChange={this.handleChange} /><br />
          <input type='text' name='description' placeholder='Add a description' value={this.state.description} onChange={this.handleChange} /><br />
          <button className='submit'>Create!</button>
        </form>
      </div>
    )
  }
}

export default NewBoard;
