import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

class Timer extends Component {
  constructor(props) {
    super(props);

    // Calculate time left until this expires - 15 minutes.
    const seconds = !isNaN(props.created) ? ((props.created + (15 * 60)) - (new Date() / 1000)) : 1;

    this.state = {
      seconds: seconds,
      time: {},
    };
  }

  secondsToTime = secs => {
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    const obj = {
      'h': hours,
      'm': minutes,
      's': seconds
    };
    return obj;
  }

  componentDidMount() {
    const timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });

    this.timer = setInterval(this.countDown, 1000);
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    const seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds <= 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return(
      <div>
        {
          (this.state.seconds > 0) ? `m: ${this.state.time.m} s: ${this.state.time.s}` : 'Expired'
        }
      </div>
    );
  }
}

Timer.propTypes = {
  created: PropTypes.number,
};

export default Timer;
