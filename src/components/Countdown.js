import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  minutes = 20,
  isPaused = true,
  onProgress,
  onEnd,
}) => {
  const [millies, setMillies] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millies / 1000 / 60) % 60;
  const seconds = Math.floor(millies / 1000) % 60;
  const interval = React.useRef(null);
  const countDown = () => {
    setMillies((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused]);

  useEffect(() => {
    setMillies(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millies / minutesToMillis(minutes));
    if (millies === 0) {
      onEnd();
    }
  }, [millies]);
  
  return (
    <Text style={styles.text}>{`${formatTime(minute)}:${formatTime(
      seconds
    )}`}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
