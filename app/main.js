// import 'babel-core/polyfill'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import createFragment from 'react-addons-create-fragment'
import immutabilityHelpers from 'react-addons-update'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { render } from 'react-dom'
import h from 'react-hyperscript'

// Root of app:
var container = document.getElementById('main')
render(h('h1', 'Hi Alexa!!'), container)

console.log('we win!')
