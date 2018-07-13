import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Customers from './components/customers';
import Landing from './components/Landing';
import Home from './components/home';
import Register from './components/auth/register';
import Secret from './components/auth/secret';
import Login from './components/auth/login';
import User from './components/user';
import NewPin from './components/NewPin';
import Board from './components/Board';
import NewBoard from './components/NewBoard';

// import Tester from './components/tester';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
      newPinOpen: false,
      newBoardOpen: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.newPinCallback = this.newPinCallback.bind(this);
    this.newBoardCallback = this.newBoardCallback.bind(this);
  }

  componentDidMount() {
    console.log(`${new Date().toLocaleTimeString()}: APP.JS MOUNTING...`);
    this.updateLogin();
  }

  updateLogin() {
    console.log('Checking user login status: ');
    fetch('/isauth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then((res) => {
      this.setState({
        isLoggedIn: res.authenticated,
        user: res.user
      });
    })
  }

  handleClick(e) {
    if (e.target.id === 'logout') {
      console.log('Going to log user out...');
      fetch('/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        this.updateLogin();
      })
    }
    if (e.target.id === 'newPin') {
      this.setState({newPinOpen: !this.state.newPinOpen});
    }
    if (e.target.id === 'newBoard') {
      this.setState({newBoardOpen: !this.state.newBoardOpen});
    }
    if (e.target.id === 'update-login') {
      this.updateLogin();
    }
  }

  newPinCallback() {
    this.setState({newPinOpen: false});
  }

  newBoardCallback() {
    this.setState({newBoardOpen: false});
  }

  render() {
    return (
      <div className="App">
        <script src="https://use.fontawesome.com/c98d4b8a6d.js"></script>
        <header className="App-header">
          {/* <h1 className="App-title">Welcome to Pinapathy{this.state.user ? ', ' + this.state.user.username : ''}</h1> */}
          {/* <h5>The version of pinterest that doesn't make you want to kill someone</h5> */}
          <nav id="navbar">
            <ul>
              <li><a href='/home'>Home</a></li>
              {!this.state.isLoggedIn ? <li><a href='/register'>Sign Up</a></li> : ''}
              {!this.state.isLoggedIn ? <li><a href='/login'>Log In</a></li> : ''}

              {this.state.isLoggedIn ? <li><a href={'/user/' + this.state.user.username}>Your Page</a></li> : ''}

              {this.state.isLoggedIn ? <li><button onClick={this.handleClick} id='logout'>Logout</button></li> : ''}
              {this.state.isLoggedIn ? <li><button onClick={this.handleClick} id='newBoard'>New Board</button></li> : ''}
              {this.state.isLoggedIn ? <li><button onClick={this.handleClick} id='newPin'>New Pin</button></li> : ''}
              {/* <li><a href='/api'>Api Test</a></li> */}
              {/* <li><a href='/secret'>Secret</a></li> */}
              {/* <li><a onClick={this.handleClick} id='update-login'>UpdateLogin</a></li> */}
            </ul>
          </nav>
          {/* {this.state.isLoggedIn ? <p>User is Logged in</p> : <p>User is not logged in</p>} */}
          {/* <p>User is {this.state.isLoggedIn ? 'Logged in' : 'Not logged in'}</p> */}
        </header>
        {this.state.newPinOpen ? <NewPin currentUser={this.state.user} callback={this.newPinCallback} /> : ''}
        {this.state.newBoardOpen ? <NewBoard currentUser={this.state.user} callback={this.newBoardCallback} /> : ''}
        <BrowserRouter>
          <Switch>
            {/* <Route path='/' render={props => <Tester {...props} />} /> */}
            <Route path='/' exact render={props => <Landing {...props} />} />
            <Route path='/home' exact render={props => <Home {...props} isAuth={this.state.isLoggedIn} currentUser={this.state.user} />} />
            <Route path='/register' exact render={props => <Register {...props} />} />
            <Route path='/login' exact render={props => <Login {...props} updateLogin={this.updateLogin} />} />
            <Route path='/user/:username' exact render={props => <User {...props} isAuth={this.state.isLoggedIn} currentUser={this.state.user} />} />
            <Route path='/board/:board_id' exact render={props => <Board {...props} isAuth={this.state.isLoggedIn} currentUser={this.state.user} />} />

            <Route path='/api' exact render={props => <Customers {...props} />} />
            <Route path='/secret' exact render={props => <Secret {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
