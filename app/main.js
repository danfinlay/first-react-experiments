// import 'babel-core/polyfill'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import createFragment from 'react-addons-create-fragment'
import immutabilityHelpers from 'react-addons-update'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { render } from 'react-dom'
import h from 'react-hyperscript'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'EXCITEMENT':
      return state.concat(['!'])
  }
  return state
}

let store = createStore(reducer);

class Header extends Component {
  render() {
    const state = store.getState()

    let message = 'Hi Alexa'
    state.forEach(function(char) {
      message += char
    })

    return h('h1', {
      onClick(ev) {
        ev.preventDefault();
        store.dispatch({ type: 'EXCITEMENT' })
      }
    }, message)
  }
}

// Root of app:
var container = document.getElementById('main')
render(React.createElement(Header), container)

store.subscribe(() => render(React.createElement(Header), container));

console.log('we win!')
