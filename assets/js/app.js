// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"
import React from 'react'
import ReactDOM from 'react-dom'

let channel = socket.channel("table:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {toplace: [2], sea: [['blue', 'blue']]}
    this._onMouseOver.bind(this)
    this._onClick.bind(this)

  }
  _onMouseOver(e) {
    // color the tds
    // rust is good
    toplace = this.state.toplace
    if (e.target.dataset.x + toplace[toplace.length-1] - 1 < this.state.sea.length) {
      this.
    }
  }
  _onClick(e) {
    // send the click
    channel.push('click', {x: e.target.dataset.x, y: e.target.dataset.y})
    .receive('ok', (msg)=> console.log(msg))
  }
  render() {
    return <table border="1">
      <tbody>
      {this.state.sea.map((row, i) =>
        <tr>{row.map((cell, j) =>
          <td data-x={i} data-y={j} onClick={this._onClick} onMouseOver={this._onMouseOver}>a</td>
        )}
        </tr>
      )}
      </tbody>
      </table>
  }
}

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {msgs: []}
    channel.on('msg', (msg) => {
      this.setState({msgs: this.state.msgs.concat([msg])})
      console.log(msg)
    })
  }
  _handleKeyPress(e) {
    if (e.key == 'Enter') {
      channel.push('msg', {handle: 'ee', msg: e.target.value})
      e.target.value = ''
    }
  }
  render() {
    return <div>
      {this.state.msgs.map(({handle, msg}) =>
        <p>{handle}:{msg}</p>
      )}
      <input placeholder="Enter to send msg" onKeyPress={this._handleKeyPress}></input>
      </div>
  }
}
class App extends React.Component {
  render() {
    return <div>
      <Game />
      <Chat />
    </div>
  }
}

function start() {
  let root = document.getElementById('root')
  ReactDOM.render(<App />, root)
}

$(start)
