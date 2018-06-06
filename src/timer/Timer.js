import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Timer extends Component {
  state = {
    milliseconds: 0,
    time: {}
  }

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
  }

  componentDidMount() {
    const seconds = !isNaN(this.props.created) ? ((this.props.created + (15 * 60)) - (new Date() / 1000)) : 1;

    this.setState({
      seconds,
    }, () => {
      // Don't start the timer until the time has been set.
      this.startTimer();
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    const seconds = this.state.seconds - 1;

    this.setState({
      time: moment(moment.duration(seconds * 1000, 'seconds').asSeconds()).format('mm[m]:ss[s]'),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds <= 0) {
      clearInterval(this.timer);
      // Send a failure to pay alert to the parent.
      // this.props.handleExpired(true);
    } else {
      // this.props.handleExpired(false);
    }
  }

  render() {
    const countdown = (typeof this.state.time !== 'object') ? this.state.time : '';
    return(
      <p>
        {
          (this.state.seconds > 0) ? `${countdown}` : 'Expired!'
        }
      </p>
    );
  }
}

Timer.propTypes = {
  created: PropTypes.number,
};

export default Timer;
