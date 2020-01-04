/** @jsx h */

import { h, render } from 'preact'
import Archive from './components/archive'
import Popular from './components/popular'

window.addEventListener('DOMContentLoaded', () => {
  render(<Popular />, document.getElementById('popular'))
  render(<Archive />, document.getElementById('archive'))
})
