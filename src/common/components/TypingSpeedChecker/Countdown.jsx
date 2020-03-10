import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Countdown({
  minutes,
}) {
  const [counter, setCounter] = useState(minutes * 60);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return !!counter && (
    <strong>Time left: {counter} seconds</strong>
  );
}

Countdown.propTypes = {
  minutes: PropTypes.number,
};

Countdown.defaultProps = {
  minutes: 1,
};
