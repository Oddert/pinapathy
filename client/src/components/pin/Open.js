import React from 'react';

import PinLike from './Like';
import CommentNew from '../comment/New';
import Comment from '../comment/Comment';

class Open extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUrl: false
    }
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({showUrl: true});
  }

  mouseOut() {
    this.setState({showUrl: false});
  }

  render() {
    return (
      <div
        className='pin-open-container'
        id='pinOpen_container'
        onClick={this.props.handleClick}
        >
        <div className='pin open'>
          <button onClick={this.props.handleClick} id='pin_close'>X</button>
          <a href={this.props.display.imgPage}>
            <img
              src={this.props.display.imgSrc}
              alt={this.props.display.name + '_image'}
              id={this.props.display.name + '_image'}
            />
          </a>
          <h6 className='imgPage'><a href={this.props.display.imgPage}>{this.props.display.imgPage}</a></h6>

          <div className='title'>
            <h3>{this.props.display.name}</h3>
            <PinLike id={this.props.pin._id} likes={this.props.display.likes} isAuth={this.props.isAuth} isAuthor={this.props.isAuthor} callback={this.props.handleLike} userLiked={this.props.userLiked} />
          </div>

          <p className='description'>{this.props.display.description}</p>

          {this.props.isAuth ?
            <CommentNew id={this.props.pin._id} targetType='PIN' />
          : ''}

          {this.props.pin.comments.map((each, index) =>
            <Comment
              key={index}
              comment={each}
              isAuth={this.props.isAuth}
              isAuthor={this.props.isAuthor}
              currentUser={this.props.currentUser}
            />)
          }

        </div>
      </div>
    )
  }
}

export default Open;
