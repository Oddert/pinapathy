import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_check: '',
      warning: false,
      nameWarning: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Going to sign user up!");
    // console.log(this.state.username);
    // console.log(this.state.password);
    // console.log(this.state.password_check);
    if (this.state.password === this.state.password_check) {
      console.log('Passwords match ok...');
      fetch('/user/register', {
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
        if (res.error) {
          switch(res.error.name) {
            case "UserExistsError":
            this.setState({nameWarning: true});
            break;
            default:
            break;
          }
        } else {
          this.setState({
            username: '',
            password: '',
            password_check: ''
          })
        }
      })
    } else {
      // alert('Passwords do not match, please check you typed them correctly');
      this.setState({passWarning: true});
    }
  }

  handleChange(e) {
    // console.log(`${e.target.name} : ${e.target.value}`);
    this.setState({
      [e.target.name]: e.target.value,
      passWarning: false,
      nameWarning: false
    });
  }

  render() {
    let passwordClass = this.state.passWarning ? 'warning' : '';
    let nameClass = this.state.nameWarning ? 'warning' : '';
    let warnBox = false;

    if (this.state.nameWarning || this.state.passWarning) {warnBox = true}

    return (
      <div className='register_form'>
        <h1 className='register_form-title'>Create an Account!</h1>
        {warnBox ?
          <div className='warn-box'>
            {this.state.nameWarning ? <h3>Sorry! That name is already taken, please choose a new one.</h3> : ''}
            {this.state.passWarning ? <h3>Your passwords do not match! Please check spelling and case sensitivity and try again.</h3> : ''}
          </div>
        : ''}
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} className={nameClass} />
          <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} className={passwordClass} />
          <input type='password' name='password_check' placeholder='Re-Type Password' value={this.state.password_check} onChange={this.handleChange} className={passwordClass} />
          <button className='submit'>Sign Up!</button>
        </form>
        <h4>Already have an account? <a href='/register'>Log In here</a>.</h4>
        <a href='http://localhost:5000/auth/github' target='_blank' rel="noopener noreferrer">Login with GitHub <i className='fa fa-github'></i></a><br />
      </div>
    )
  }
}

export default Register;
