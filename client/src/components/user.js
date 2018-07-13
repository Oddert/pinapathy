import React from 'react';

import NewBoard from './NewBoard';
import UserBoard from './UserBoard';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'User',
      userObject: {
        username: '',
        boards: []
      },
      newBoardOpen: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.callUserData = this.callUserData.bind(this);
  }

  componentDidMount(){
    this.setState({username: this.props.location.pathname.slice(6)});
    console.log(this.props.location)
    this.callUserData();
  }

  callUserData() {
    this.setState({newBoardOpen: false})
    fetch('/user/lookup/' + this.props.location.pathname.slice(6), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      this.setState({userObject: res.user})
    })
  }

  handleClick(e) {
    if (e.target.id === 'new-board') {
      this.setState({newBoardOpen: !this.state.newBoardOpen});
    }
  }

  render() {
    console.log(this.props.currentUser);
    if (this.props.isAuth && this.props.currentUser && this.props.currentUser.username === this.state.username) {
      return (
        <div>
          <h1>Welcome to your page, {this.state.username}</h1>
          <button onClick={this.handleClick} id='new-board'>Create New Board</button>
          {this.state.newBoardOpen ? <NewBoard user={this.props.currentUser} callback={this.callUserData} /> : ''}
          {this.state.userObject.boards.map(each => <UserBoard key={each._id} board={each} callback={this.callUserData} isAuthor={true} />)}
        </div>
      )
    }
    return (
      <div>
        <h1>Welcome to {this.state.username}'s profile</h1>
        {this.state.userObject.boards.map(each => <UserBoard key={each._id} board={each} callback={this.callUserData} isAuthor={false} />)}
      </div>
    )
  }
}

export default User
