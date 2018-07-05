import React from 'react';

import Open from './Open';
import Delete from './Delete';
import Edit from './Edit';
import Like from './Like';
import Repin from './Repin';
import CommentDisplay from './CommentDisplay';

class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      brokenImage: false,
      userLiked: false,
      display: {
        name: '',
        description: '',
        imgSrc: '',
        imgPage: '',
        likes: 0
      }
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBrokenImage = this.handleBrokenImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      display: {
        name: this.props.pin.name,
        description: this.props.pin.description,
        imgSrc: this.props.pin.img.src,
        imgPage: this.props.pin.img.page,
        likes: this.props.pin.likes.length
      }
    });
    fetch(`/pin/${this.props.pin._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials:'include'
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        if (res.isAuth) {
          this.setState({userLiked: res.hasLiked});
        }
        // console.log(res);
      }
    })
  }

  handleLike(e) {
    let likes = e === 'add' ? this.state.display.likes + 1 : this.state.display.likes - 1;
    let userLiked = e === 'add' ? true : false;
    let display = Object.assign(this.state.display, {likes});
    this.setState({
      display,
      userLiked
    });
  }

  handleClick(e) {
    switch (e.target.id) {
      case 'pin_thumbnail':
      case 'pinOpen_container':
      case 'pin_close':
        this.setState({open: !this.state.open});
        break;
      default:
        break;
    }
  }

  handleEdit(display) {
    console.log('Edit callback: ');
    console.log(display);
    this.setState({display});
  }

  handleBrokenImage() {
    let display = Object.assign(this.state.display, {imgSrc: 'https://static.umotive.com/img/product_image_thumbnail_placeholder.png'});
    this.setState({display});
  }

  render() {
    let pin = this.props.pin;
    let isAuthor = false;
    if (this.props.currentUser && this.props.currentUser._id === pin.author.id) {
      isAuthor = true;
    }

    return (
      <div className='pin'>
        <img
          src={this.state.display.imgSrc}
          alt={this.state.display.name}
          onClick={this.handleClick}
          onError={this.handleBrokenImage}
          id='pin_thumbnail'
        />
        <h4>{this.state.display.name}</h4>
        <em>{pin.author.username}</em>
        {/* <p>userLiked: {this.state.userLiked.toString()}</p> */}

        <div className='interact'>
          <Like id={this.props.pin._id} likes={this.state.display.likes} isAuth={this.props.isAuth} isAuthor={isAuthor} callback={this.handleLike} userLiked={this.state.userLiked} />
          <CommentDisplay comments={this.props.pin.comments.length} />
          {this.props.currentUser ? !isAuthor ? <Repin currentUser={this.props.currentUser} isAuth={this.props.isAuth} isAuthor={isAuthor} pin={this.props.pin} /> : '' : ''}
        </div>

        {isAuthor ?
          <div className='modify'>
            <Edit submit={this.handleEditSubmit} pin={this.props.pin} callback={this.handleEdit} />
            <Delete id={this.props.pin._id} />
          </div>
          : ''}

        {this.state.open ?
          <Open
            handleClick={this.handleClick}
            handleLike={this.handleLike}
            display={this.state.display}
            pin={this.props.pin}
            isAuth={this.props.isAuth}
            isAuthor={isAuthor}
            currentUser={this.props.currentUser}
          /> : ''}
      </div>
    )
  }
}

export default Pin;
