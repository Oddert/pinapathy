import React from 'react';

class NavDrop extends React.Component {
  render() {
    return (
      <div>
        <li><a href={'/user/' + this.props.user.username}>Your Page</a></li>
        <li><button onClick={this.props.handleClick} id='logout'>Logout</button></li>
        <li><button onClick={this.props.handleClick} id='newBoard'>New Board</button></li>
      </div>
    )
  }
}

export default NavDrop;
