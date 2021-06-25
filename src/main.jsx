import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

let next1 = document.getElementById("next_button")
let prev1 = document.getElementById("previous_button")
let compare1 = document.getElementById("compare_button")

next1.addEventListener("click", next_page_1)

function next_page_1 () {
  prev1.classList.remove("hide");
  compare1.classList.remove("hide");
  next1.classList.add("hide");
}

prev1.addEventListener("click", prev_page)

function prev_page () {
  prev1.classList.add("hide");
  compare1.classList.add("hide");
  next1.classList.remove("hide");
  console.log("prev button PRESSED");
}