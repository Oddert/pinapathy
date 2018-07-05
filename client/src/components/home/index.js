import React from 'react';
import Masonry from 'react-masonry-component';

import Pin from '../pin/Pin';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
    }
  }

  componentDidMount() {
    fetch('/pin', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      console.log(res);
      this.setState({pins: res.pins});
    })
  }

  render() {
    return (
      <div>
        <h2 className="App-title">Welcome to Pinapathy{this.props.currentUser ? ', ' + this.props.currentUser.username : ''}</h2>
        {/* <div className='pin-container'> */}
          <Masonry>
          {this.state.pins.map(each =>
            <Pin
              key={each._id}
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

export default Home
