import React from 'react';

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: null
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({likes: this.props.likes});
  }

  handleClick() {
    fetch(`/comment/${this.props.id}/like`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      console.log(res);
      this.setState({
        likes: res.likes
      });
      this.props.callback(!res.hasAlreadyLiked);
    })
  }

  render() {
    let likeIconClass = this.props.hasLiked ? 'likeIcon-1 active' : 'likeIcon-1';
    let svgClass = 'svg';

    if (this.props.disabled) {
      svgClass = 'svg disabled';

      return (
        <div
          className='like'
          >
            <button className={svgClass} disabled>
              <svg id="likeIcon_Layer_1" data-name="likeIcon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.04 96.68">
                <path className={likeIconClass} d="M584,444s-42.52-37.2-42.52-56.69S550.65,359,562.69,359,584,373.18,584,373.18,593.17,359,605.21,359s21.26,8.85,21.26,28.35S584,444,584,444Z" transform="translate(-536.43 -354)"/>
              </svg>
            </button>

          <div>
            ({
              this.state.likes ?
              this.state.likes.length :
              this.props.likes ? this.props.likes.length : 0
            })
          </div>
        </div>
      )
    }
    return (
      <div
        className='like'
        >
          <button className={svgClass} onClick={this.handleClick}>
            <svg id="likeIcon_Layer_1" data-name="likeIcon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.04 96.68">
              <path className={likeIconClass} d="M584,444s-42.52-37.2-42.52-56.69S550.65,359,562.69,359,584,373.18,584,373.18,593.17,359,605.21,359s21.26,8.85,21.26,28.35S584,444,584,444Z" transform="translate(-536.43 -354)"/>
            </svg>
          </button>

        <div>
          ({
            this.state.likes ?
            this.state.likes.length :
            this.props.likes ? this.props.likes.length : 0
          })
        </div>
      </div>
    )
  }
}

export default Like
