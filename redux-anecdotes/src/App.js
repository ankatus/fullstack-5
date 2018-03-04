import React from 'react';

class App extends React.Component {

  generateId = () => {
    return (100000 * Math.random()).toFixed(0)
  }

  vote = (id) => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: {id}
    })
  }

  newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'CREATE',
      data: {
        content,
        id: this.generateId(),
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.newAnecdote}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App