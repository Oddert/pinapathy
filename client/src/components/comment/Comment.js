import React from 'react';

import Like from './Like';
import Delete from './Delete';
import Edit from './Edit';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLiked: false,
      comment: {
        name: 'Comment placeholder text',
        deleted: true,
        author: {
          username: '',
          id: null
        },
        likes: [],
        created: Date.now()
      }
    }
    this.editCallback = this.editCallback.bind(this);
    this.likeCallBack = this.likeCallBack.bind(this);
  }

  componentDidMount() {
    fetch(`/comment/${this.props.comment}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error
      } else {
        if (res.comment) {
          console.log('Comment GET returned:');
          console.log(res);
          let comment = res.comment;
          comment.deleted = false;
          this.setState({
            comment,
            hasLiked: res.hasLiked
          });
        } else {
          console.log(res);
        }
      }
    });
  }

  likeCallBack(hasLiked) {
    console.log('like callback');
    console.log(hasLiked);
    this.setState({hasLiked});
  }

  editCallback(comment) {
    console.log('edit callback');
    console.log(comment);
    this.setState({comment});
  }

  render() {
    if (this.state.comment.deleted) {return (<div></div>)}
    let comment = this.state.comment;
    let created = new Date(comment.created).toLocaleDateString();
    let isAuthor = false;

    if (this.props.currentUser && this.props.currentUser._id === this.state.comment.author.id) {isAuthor = true}

    return (
      <div className='comment'>
        <div className='main-body'>
          <p className='comment-title'>{comment.name}</p>

          {isAuthor ?
            <div className='modify'>
              <Edit comment={comment} callback={this.editCallback} /><br />
              <Delete id={this.props.comment} text={this.state.comment.name} />
            </div>
          : ''}


          {this.props.isAuth ?
            isAuthor ? <Like disabled={true} likes={this.state.comment.likes} id={this.props.comment} hasLiked={this.state.hasLiked} callback={this.likeCallBack} /> : <Like likes={this.state.comment.likes} id={this.props.comment} hasLiked={this.state.hasLiked} callback={this.likeCallBack} />
            : <Like disabled={true} likes={this.state.comment.likes} id={this.props.comment} hasLiked={this.state.hasLiked} callback={this.likeCallBack} />
          }

        </div>
        <p className='signed'>
          <a href={'/user/' + comment.author.username}>
            {comment.author.username}
          </a> on {created}
        </p>
      </div>
    )
  }
}

export default Comment
