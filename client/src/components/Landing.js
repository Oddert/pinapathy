import React from 'react';

class Landing extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Pinapathy!</h1>
        <h3>The version of Pinterest that doesn't make you want to tear your hair out</h3>
        <div className='landing-grid'>
          <div className='landing-grid-one_l'>
                <button className='svg'>
                  <svg data-name="likeIcon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.04 96.68">
                    <path className='likeIcon-1 active' d="M584,444s-42.52-37.2-42.52-56.69S550.65,359,562.69,359,584,373.18,584,373.18,593.17,359,605.21,359s21.26,8.85,21.26,28.35S584,444,584,444Z" transform="translate(-536.43 -354)"/>
                  </svg>
                </button>
          </div>
          <div className='landing-grid-one_r text'>
            Collect links from all across the internet and share them on your profile. Perfect for creating mood boards and visual presentations.
          </div>
          <div className='landing-grid-two_l'>
            <button className='svg'>
              <svg data-name="repin_icon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.23 143.46">
                <path className="repin_icon-1" d="M595.28,751.18" transform="translate(-526.46 -313.33)"/>
                <path className="repin_icon-2" d="M665.18,359.37c4.68,0,5.8-2.7,2.49-6l-33.16-33.13c-3.31-3.31-6-2.18-6,2.49v5.67a8.54,8.54,0,0,1-8.5,8.51L540,337a8.54,8.54,0,0,0-8.5,8.51V379.2a8.53,8.53,0,0,0,8.5,8.5h5.67a8.53,8.53,0,0,0,8.5-8.5V367.86a8.53,8.53,0,0,1,8.5-8.5H665.18Z" transform="translate(-526.46 -313.33)"/>
                <path className="repin_icon-2" d="M540,410.75c-4.68,0-5.8,2.7-2.49,6l33.16,33.13c3.31,3.31,6,2.18,6-2.49v-5.67a8.54,8.54,0,0,1,8.5-8.51l80-.09a8.54,8.54,0,0,0,8.5-8.51V390.92a8.53,8.53,0,0,0-8.5-8.5h-5.67a8.53,8.53,0,0,0-8.5,8.5v11.34a8.53,8.53,0,0,1-8.5,8.5H540Z" transform="translate(-526.46 -313.33)"/>
              </svg>
            </button>
          </div>
          <div className='landing-grid-two_r text'>
            See other people’s links where you can share, discuss and re-pin items to your boards.
          </div>
          <div className='landing-grid-three_l'>
            <button className='svg'>
              <svg data-name="editIcon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.84 145.84">
                <path className="editIcon-1" d="M595.28,751.18" transform="translate(-500.6 -512.96)"/>
                <polyline className="editIcon-2" points="58.65 127.29 45.09 140.84 5 140.84 5 100.76 29.68 76.07"/>
                <path className="editIcon-2" d="M545.69,653.81l91.62-91.62a14.21,14.21,0,0,0,0-20l-20-20a14.21,14.21,0,0,0-20,0L505.6,613.72" transform="translate(-500.6 -512.96)"/>
                <line className="editIcon-2" x1="25.04" y1="120.8" x2="107.06" y2="38.79"/>
                <line className="editIcon-2" x1="127.1" y1="58.83" x2="87.01" y2="18.74"/>
                <line className="editIcon-2" x1="45.09" y1="140.84" x2="5" y2="100.76"/>
              </svg>
            </button>
          </div>
          <div className='landing-grid-three_r text'>
            No hidden tricks, mandatory sign-in or annoying adds, creating an account is entirely up to you! Pinapathy is also invisible to web crawlers so no disruptive image searching.
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
