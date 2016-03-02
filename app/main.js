
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import createFragment from 'react-addons-create-fragment'
import immutabilityHelpers from 'react-addons-update'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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

class Letter extends Component {
  render() {
    const { letter } = this.props
    const key = this.props.index
    return h('span', { key }, letter)
  }
}

class Header extends Component {
  render() {

    const state = store.getState()
    const message = state.map(function(char, i) {
      return h(Letter, { letter: char, index: `letter${char}${i}` })
    })

    return h('h1', {
      onClick(ev) {
        ev.preventDefault();
        store.dispatch({ type: 'EXCITEMENT' })
      },
    }, [
      h(ReactCSSTransitionGroup, {
        transitionName: "letter",
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 300,
      }, message)
    ])
  }
}

class Footer extends Component {
  render() {

    return h('button', {
      onClick(ev) {
        ev.preventDefault();
        store.dispatch({ type: 'SADNESS' })
      },
    }, 'Make Sadder')
  }
}

// Root of app:
class Body extends Component {
  render() {

    return h('div', [
      h(Header),
      h(Footer),
    ]);
  }
}

var container = document.getElementById('main')
store.subscribe(() => render(h(Body), container));
render(h(Body), container)
