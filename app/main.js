// import 'babel-core/polyfill'

const React = require('react')
const Component = React.Component;

var createFragment = require('react-addons-create-fragment');
var immutabilityHelpers = require('react-addons-update');
var CSSTransitionGroup = require('react-addons-css-transition-group');

const render = require('react-dom').render
const h = require('react-hyperscript')

var container = document.getElementById('main')
render(h('h1, 'We win!'), container)

console.log('we win!')
