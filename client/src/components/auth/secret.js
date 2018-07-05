import React from 'react';

class Secret extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.id === 'secret') {
      console.log('Testing Auth routes...');
      fetch('/secret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({message: 'Hello from reac. Do I have permission? uwu'})
      })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
      })
    }
    if (e.target.id === 'auth') {
      console.log('Testing for user auth routes...');
      fetch('/isauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({message: 'Hello from reac. Do I have permission? uwu'})
      })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
      })
    }
    if (e.target.id === 'github') {
      console.log('User Clicked the github button, idk what it will do...');
      fetch('/githubauthtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: 'what in the git?'
        })
      })
      .then(res => res.json())
      .then((res) => {
        console.log(res)
      });
    }

  }

  render() {
    return (
      <div>
        <h3>Welcome to secret, we're going to test auth routs</h3>
        <button onClick={this.handleClick} id='secret'>Click to Test Secret!</button>
        <button onClick={this.handleClick} id='auth'>Click to Test isAuthed!</button>
        <button onClick={this.handleClick} id='github'>Click to Test Github Strategy!</button>
      </div>
    )
  }
}

export default Secret
