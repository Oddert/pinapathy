import React from 'react';

class UserBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleting: false,
      editing: false,
      title: '',
      description: ''
    }
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);

    this.handleDeleteToggle = this.handleDeleteToggle.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      title: this.props.board.name,
      description: this.props.board.description
    })
  }

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  }

  handleEditChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleEditSubmit(e) {
    e.preventDefault();
    fetch('/boards/' + this.props.board._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: this.state.title,
        description: this.state.description
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      console.log(res);
      this.setState({editing: false});
      this.props.callback();
    })
  }

  handleDeleteToggle() {
    this.setState({deleting: !this.state.deleting});
  }

  handleDeleteSubmit() {
    console.log('Going to send delete req to /boards/' + this.props.board._id);
    fetch('/boards/' + this.props.board._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      console.log(res);
      this.setState({deleting: false});
    })
  }

  render() {
    //
    return (
      <div className='userBoard'>
        <h3><a href={'/board/' + this.props.board._id}>{this.props.board.name}</a></h3>
        <em> -by {this.props.board.author.username}</em>
        <p>Created on: {new Date(this.props.board.created).toLocaleDateString()}</p>
        {this.props.isAuthor ? <button onClick={this.handleEditToggle}>Edit</button> : ''}
        {this.props.isAuthor ? <button onClick={this.handleDeleteToggle}>Delete</button> : ''}
        {this.state.editing ?
          <div className='userBoard-edit'>
            <button onClick={this.handleEditToggle} className='close-icon'>X</button>
            <form onSubmit={this.handleEditSubmit}>
              <input type='text' name='title' placeholder='Board Title' value={this.state.title} onChange={this.handleEditChange} />
              <input type='text' name='description' placeholder='Description' value={this.state.description} onChange={this.handleEditChange} />
              <button>Save</button>
            </form>
          </div>
           : ''}
        {this.state.deleting ?
          <div className='userBoard-delete'>
            <button onClick={this.handleDeleteToggle} className='close-icon'>X</button>
            <h3 className='text'>Are you sure you want to delete this item? (this cannot be undone)</h3>
            <button onClick={this.handleDeleteSubmit}>Yes, Delete this Board.</button>
            <button onClick={this.handleDeleteToggle}>No, go back</button>
          </div>
           : ''}
      </div>
    )
  }
}

export default UserBoard;
