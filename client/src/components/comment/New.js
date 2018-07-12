import React from 'react';

class CommentNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({input: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`/comment/${this.props.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        targetType: this.props.targetType,
        input: this.state.input
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      console.log(res);
      this.setState({input: ''});
      window.location.reload();
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='comment_new_form'>
        <input type='text' name='input' value={this.state.input} onChange={this.handleChange} placeholder='Add a comment' />
        <button>Add Comment</button>
      </form>
    )
  }
}

export default CommentNew
