// import 'babel-core/polyfill'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import createFragment from 'react-addons-create-fragment'
import immutabilityHelpers from 'react-addons-update'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { render } from 'react-dom'
import h from 'react-hyperscript'

const reducer = (state = ['Hi Alexa'], action) => {
  switch (action.type) {
    case 'EXCITEMENT':
      var opts = ['?','!','@','$', '#']
      return state.concat(opts[Math.floor(Math.random() * opts.length)])
    case 'SADNESS':
      return state.slice(0, state.length - 1)
    default:
      return state;
  }
}

let store = createStore(reducer);

class Header extends Component {
  render() {
    let message = ''

    const state = store.getState()
    state.forEach(function(char) {
      message += char
    })

    return h('h1', {
      onClick(ev) {
        // ev.preventDefault();
        store.dispatch({ type: 'EXCITEMENT' })
      },
      onKeyPress(ev) {
        ev.preventDefault();
        store.dispatch({ type: 'SADNESS' })
      }
    }, message)
  }
}

class Footer extends Component {
  render() {

    return h('button', {
      onClick(ev) {
        // ev.preventDefault();
        store.dispatch({ type: 'SADNESS' })
      },
    }, 'Make Sadder')
  }
}

// Root of app:
class Body extends Component {
  render() {

    return h('div', [
      React.createElement(Header),
      React.createElement(Footer),
    ]);
  }
}


var container = document.getElementById('main')
render(React.createElement(Body), container)

store.subscribe(() => render(React.createElement(Body), container));

console.log('we win!')
