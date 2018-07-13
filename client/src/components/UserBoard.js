import React from 'react';

class UserBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleting: false,
      editing: false,
      title: '',
      description: '',
      thumbnails: [
        {img: {src: 'https://static.umotive.com/img/product_image_thumbnail_placeholder.png'}},
        {img: {src: 'https://static.umotive.com/img/product_image_thumbnail_placeholder.png'}},
        {img: {src: 'https://static.umotive.com/img/product_image_thumbnail_placeholder.png'}}
      ]
    }
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);

    this.handleDeleteToggle = this.handleDeleteToggle.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.handleBrokenImage = this.handleBrokenImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      title: this.props.board.name,
      description: this.props.board.description
    });
    console.log('=============');
    // console.log(this.props.board);
    fetch(`/boards/thumbnails/${this.props.board._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res.pins);
      const thumbnails = Object.assign(this.state.thumbnails, res.pins);
      this.setState({thumbnails});
    })
  }

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  }

  handleEditChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleEditSubmit(e) {
    e.preventDefault();
    fetch('/boards/' + this.props.board._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: this.state.title,
        description: this.state.description
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      console.log(res);
      this.setState({editing: false});
      this.props.callback();
    })
  }

  handleDeleteToggle() {
    this.setState({deleting: !this.state.deleting});
  }

  handleDeleteSubmit() {
    console.log('Going to send delete req to /boards/' + this.props.board._id);
    fetch('/boards/' + this.props.board._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      console.log(res);
      this.setState({deleting: false});
    })
  }

  handleBrokenImage(e) {
    const indexLookup = {
      'one': 0,
      'two': 1,
      'three': 2
    }
    console.log(indexLookup[e.target.className]);
    const thumbnails = Object.assign(this.state.thumbnails);
    thumbnails[indexLookup[e.target.className]].img.src = 'https://static.umotive.com/img/product_image_thumbnail_placeholder.png'
    this.setState({thumbnails});
  }

  render() {
    //
    return (
      <div className='userBoard'>

        <div className='userBoard-flex'>
          <div className='userBoard-flex-details'>
            <div className='titleContainer'>
            <h3><a href={'/board/' + this.props.board._id}>{this.props.board.name}</a></h3>
            <div className='modify'>
              {this.props.isAuthor ?
                <button className='svg' onClick={this.handleEditToggle}>
                  <svg className="editIcon_Layer_1" data-name="editIcon_Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.84 145.84">
                    <path className="editIcon-1" d="M595.28,751.18" transform="translate(-500.6 -512.96)"/>
                    <polyline className="editIcon-2" points="58.65 127.29 45.09 140.84 5 140.84 5 100.76 29.68 76.07"/>
                    <path className="editIcon-2" d="M545.69,653.81l91.62-91.62a14.21,14.21,0,0,0,0-20l-20-20a14.21,14.21,0,0,0-20,0L505.6,613.72" transform="translate(-500.6 -512.96)"/>
                    <line className="editIcon-2" x1="25.04" y1="120.8" x2="107.06" y2="38.79"/>
                    <line className="editIcon-2" x1="127.1" y1="58.83" x2="87.01" y2="18.74"/>
                    <line className="editIcon-2" x1="45.09" y1="140.84" x2="5" y2="100.76"/>
                  </svg>
                </button> :
                ''
              }
              {this.props.isAuthor ?
                <button onClick={this.handleDeleteToggle} className='svg'>
                  <svg data-name="deleteIcon_Layer 1" className="deleteIcon_Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.11 150.56">
                    <path className="deleteIcon-1" d="M595.28,751.18" transform="translate(-541.14 -319.79)"/>
                    <path className="deleteIcon-2" d="M639.21,370.25a4.75,4.75,0,0,1,4.83,5.61l-12.5,83.89a6.8,6.8,0,0,1-6.5,5.61H565.51a6.8,6.8,0,0,1-6.5-5.61l-12.5-83.89a4.75,4.75,0,0,1,4.83-5.61h87.87Z" transform="translate(-541.14 -319.79)"/>
                    <path className="deleteIcon-3" d="M546.7,330.69" transform="translate(-541.14 -319.79)"/>
                    <path className="deleteIcon-3" d="M546.14,343.32l1.3-6.86a5.86,5.86,0,0,1,6.65-4.65L578,335.71a5.86,5.86,0,0,0,6.65-4.65l0.29-1.53a5.86,5.86,0,0,1,6.65-4.65L608,327.55A5.51,5.51,0,0,1,612.5,334l-0.29,1.53a5.51,5.51,0,0,0,4.54,6.48L640.62,346a5.51,5.51,0,0,1,4.54,6.48l-0.25,1.29-1.08,5.69,0,0.12" transform="translate(-541.14 -319.79)"/>
                    <line className="deleteIcon-3" x1="54.13" y1="72" x2="54.13" y2="124.03"/>
                    <line className="deleteIcon-3" x1="76.81" y1="72" x2="76.81" y2="124.03"/>
                    <line className="deleteIcon-3" x1="31.46" y1="72" x2="31.46" y2="124.03"/>
                    <line className="deleteIcon-3" x1="5.3" y1="23.44" x2="102.97" y2="39.61"/>
                  </svg>
                </button> :
                ''
              }
            </div>
          </div>
            {this.props.isAuthor ? <br /> : ''}
            <em>
              {/* <a href={'/user/' + this.props.board.author.username}> */}
                {'-by ' + this.props.board.author.username}
              {/* </a> */}
            </em>
            <p className='created'>Created on: {new Date(this.props.board.created).toLocaleDateString()}</p>
          </div>

          <div className='userBoard-flex-imgs'>
            <a className='sample_thum' href={'/board/' + this.props.board._id}><img src={this.state.thumbnails[0].img.src} onError={this.handleBrokenImage} className='one' alt='shut up react' /></a>
            <a className='sample_thum' href={'/board/' + this.props.board._id}><img src={this.state.thumbnails[1].img.src} onError={this.handleBrokenImage} className='two' alt='shut up react' /></a>
            <a className='sample_thum' href={'/board/' + this.props.board._id}><img src={this.state.thumbnails[2].img.src} onError={this.handleBrokenImage} className='three' alt='shut up react' /></a>
          </div>
        </div>

        {this.state.editing ?
          <div className='userBoard-edit'>
            <button onClick={this.handleEditToggle} className='close-icon'>X</button>
            <form onSubmit={this.handleEditSubmit}>
              <input type='text' name='title' placeholder='Board Title' value={this.state.title} onChange={this.handleEditChange} />
              <input type='text' name='description' placeholder='Description' value={this.state.description} onChange={this.handleEditChange} />
              <button>Save</button>
            </form>
          </div>
           : ''}
        {this.state.deleting ?
          <div className='userBoard-delete'>
            <button onClick={this.handleDeleteToggle} className='close-icon'>X</button>
            <h3 className='text'>Are you sure you want to delete this item? (this cannot be undone)</h3>
            <button onClick={this.handleDeleteSubmit}>Yes, Delete this Board.</button>
            <button onClick={this.handleDeleteToggle}>No, go back</button>
          </div>
           : ''}
      </div>
    )
  }
}

export default UserBoard;
