import React from 'react';

import {Redirect} from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passWarning: false,
      nameWarning: false,
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.githubAuth = this.githubAuth.bind(this);
  }

  componentDidMount() {
    console.log(`${new Date().toLocaleTimeString()} This is a test log to see when things mount...`);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      passWarning: false,
      nameWarning: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      if (res.name === "IncorrectPasswordError") {
        this.setState({passWarning: true});
      } else if (res.name === "IncorrectUsernameError") {
        this.setState({nameWarning: true});
      } else {
        this.props.updateLogin();
        this.setState({redirect: true});
      }
    })
  }

  githubAuth() {
    console.log('Sending fetch to \'/auth/github...');
    fetch('/auth/github', {
      method: 'GET',
      credentials: 'include',
      mode: 'no-cors'
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
    })
  }

  //"IncorrectPasswordError", "IncorrectUsernameError"

  render() {
    let passwordClass = this.state.passWarning ? 'warning' : '';
    let nameClass = this.state.nameWarning ? 'warning' : '';
    let warnBox = false;

    if (this.state.nameWarning || this.state.passWarning) {warnBox = true}

    if (this.state.redirect) {return <Redirect to='/home' />}

    return (
      <div className='login_form'>
        <h2 className='login_form-title'>Log in to Pinapathy!</h2>
        {warnBox ?
          <div className='warn-box'>
            {this.state.nameWarning ? <h3>Oops! That name is not registered, please check spelling and case sensitivity and try again.</h3> : ''}
            {this.state.passWarning ? <h3>Incorrect Password! Please check spelling and case sensitivity and try again.</h3> : ''}
          </div>
        : ''}
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} className={nameClass} /><br />
          <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} className={passwordClass} /><br />
          <button className='submit'>Login!</button>
        </form>
        <h4>Dont yet have an account? <a href='/register'>Sign Up here</a>.</h4>
        {/* <button onClick={this.githubAuth}>Click here to login with github</button><br /> */}
        {/* <a href='/auth/github' target='_blank'>href = /auth/github</a><br /> */}

        {/* THIS ONE FOR DEVELOPMENT: */}
        {/* <a href='http://localhost:5000/auth/github' target='_blank' rel="noopener noreferrer">[Dev Only] Login with GitHub <i className='fa fa-github'></i></a><br /> */}

        {/* THIS ONE FOR GLITCH: */}
        <a href='/auth/github' target='_blank' rel="noopener noreferrer">Login with GitHub <i className='fa fa-github'></i></a><br />

        {/* <a href='http://localhost:3000/auth/github' target='_blank'>href = http://localhost:3000/auth/github</a><br />
        <a href='https://twitter.com/' target='_blank'>href = https://twitter.com/</a><br />
        <a href='http://localhost:5000/login' target='_blank'>Target: _blank, href = http://localhost:5000/login</a><br />
        <Link to="/someurl" target="_blank">Link element plz help me</Link> */}
      </div>
    )
  }
}

export default Login
