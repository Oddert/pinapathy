import React from 'react';

class CommentDisplay extends React.Component {
  render() {
    return (
      <div className='comment-container'>
        <div
          className='comment_icon'
          >
            <div className='svg' onClick={this.handleLike}>
              <svg data-name="comment_icon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 131.11">
                <path className="comment_icon-1" d="M595.28,751.18" transform="translate(-530.25 -332.75)"/>
                <line className="comment_icon-2" x1="28.72" y1="41.76" x2="99.58" y2="41.76"/>
                <line className="comment_icon-2" x1="28.72" y1="24.75" x2="99.58" y2="24.75"/>
                <line className="comment_icon-2" x1="28.72" y1="58.77" x2="99.58" y2="58.77"/>
                <path className="comment_icon-2" d="M643.31,443.5c6.57,0.34,11.94-9.58,11.94-22.05v-61a22.74,22.74,0,0,0-22.68-22.68H557.93a22.74,22.74,0,0,0-22.68,22.68v27.25a22.74,22.74,0,0,0,22.68,22.68h8.54c12.47,0,29.73,3,38.35,6.64s18.12,11,21.12,16.26S636.75,443.16,643.31,443.5Z" transform="translate(-530.25 -332.75)"/>
              </svg>
            </div>

          <div>({this.props.comments})</div>
        </div>
      </div>
    )
  }
}

export default CommentDisplay
