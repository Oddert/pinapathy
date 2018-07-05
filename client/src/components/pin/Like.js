import React from 'react';

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike() {
    fetch(`/pin/${this.props.id}/like`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      if (res.error) {
        console.log(res.error);
      } else {
        this.props.callback(res.action);
      }
    })
  }

  render() {
    let likeIconClass = this.props.userLiked ? 'likeIcon-1 active' : 'likeIcon-1';
    return (
      <div className='like-container'>
        {this.props.isAuth ?
          !this.props.isAuthor ?
          <div
            className='like'
            >
              <button className='svg' onClick={this.handleLike}>
                <svg data-name="likeIcon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.04 96.68">
                  <path className={likeIconClass} d="M584,444s-42.52-37.2-42.52-56.69S550.65,359,562.69,359,584,373.18,584,373.18,593.17,359,605.21,359s21.26,8.85,21.26,28.35S584,444,584,444Z" transform="translate(-536.43 -354)"/>
                </svg>
              </button>

            <div>({this.props.likes})</div>
          </div>
          :
          <div
            className='like'
            >
              <button className='svg disabled' disabled>
                <svg id="likeIcon_Layer_1" data-name="likeIcon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.04 96.68">
                  <path className='likeIcon-1' d="M584,444s-42.52-37.2-42.52-56.69S550.65,359,562.69,359,584,373.18,584,373.18,593.17,359,605.21,359s21.26,8.85,21.26,28.35S584,444,584,444Z" transform="translate(-536.43 -354)"/>
                </svg>
              </button>

            <div>({this.props.likes})</div>
          </div>
        :
        <div
          className='like'
          >
            <button className='svg disabled' disabled>
              <svg id="likeIcon_Layer_1" data-name="likeIcon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.04 96.68">
                <path className='likeIcon-1' d="M584,444s-42.52-37.2-42.52-56.69S550.65,359,562.69,359,584,373.18,584,373.18,593.17,359,605.21,359s21.26,8.85,21.26,28.35S584,444,584,444Z" transform="translate(-536.43 -354)"/>
              </svg>
            </button>

          <div>({this.props.likes})</div>
        </div>}
      </div>
    )
  }
}

export default Like
