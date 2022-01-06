import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {
    isTimerOn: false,
    timeInSeconds: 0,
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  onReset = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerOn: false, timeInSeconds: 0})
  }

  onStop = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerOn: false})
  }

  onUpdate = () => {
    this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds + 1}))
  }

  onStart = () => {
    this.timeInterval = setInterval(this.onUpdate, 1000)
    this.setState({isTimerOn: true})
  }

  renderSeconds = () => {
    const {timeInSeconds} = this.state
    const seconds = Math.floor(timeInSeconds % 60)

    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {timeInSeconds} = this.state
    const minutes = Math.floor(timeInSeconds / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const {isTimerOn} = this.state
    const time = `${this.renderMinutes()}:${this.renderSeconds()}`

    return (
      <div className="container">
        <div>
          <h1 className="heading">Stopwatch</h1>
          <div className="inner-container">
            <div className="timer-container">
              <img
                className="timer-img"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="head">Timer</p>
            </div>
            <h1 className="time">{time}</h1>
            <div className="btn-container">
              <button
                type="button"
                className="start-btn"
                onClick={this.onStart}
                disabled={isTimerOn}
              >
                Start
              </button>
              <button type="button" className="stop-btn" onClick={this.onStop}>
                Stop
              </button>
              <button
                type="button"
                className="reset-btn"
                onClick={this.onReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
