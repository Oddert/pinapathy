import React from 'react';
import Masonry from 'react-masonry-component';

import Pin from './pin/Pin';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redir: false,
      board: {
        name: '',
        description: '',
        pins: [],
        author: {
          id: '',
          username: ''
        }
      }
    }
  }

  componentDidMount() {
    fetch('/boards/' + this.props.location.pathname.slice(7), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error
      console.log(res);
      this.setState({board: res.board});
    })
  }

  render() {
    console.log(this.props.location.pathname.slice(7));
    console.log(this.props.currentUser);
    let board = this.state.board;

    return (
      <div>
        <h1>{this.state.board.name}</h1>
        <h3><em>by <a href={'/user/' + board.author.username}>{board.author.username}</a></em></h3>

        {/* <div className='pin-container'> */}
          <Masonry>
            {board.pins.map((each, index) =>
              <Pin
                key={index}
                pin={each}
                isAuth={this.props.isAuth}
                currentUser={this.props.currentUser}
              />
            )}
          </Masonry>
        {/* </div> */}
      </div>
    )
  }
}

export default Board
