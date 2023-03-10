import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Splashscreen: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B765D',
  },
});

export default Splashscreen;
