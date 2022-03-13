import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Gradient() {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#F4D03F', '#1E4614']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradient}
    ></LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});
