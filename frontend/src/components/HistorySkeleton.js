import { StyleSheet, Text, View, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import SectionDivider from './SectionDivider';

const HistorySkeleton = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0.4));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.4,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View>
      <Header
        style={styles.header}
        title='Historial'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.contentWrapper}>
        <Animated.View
          style={[styles.description, { opacity: opacity.current }]}
        />
        <SectionDivider marginBottom={18} marginTop={16} />
        <View style={styles.reservationWrapper}>
          <Animated.View
            style={[styles.reservation, { opacity: opacity.current }]}
          />
          <Animated.View
            style={[styles.reservation, { opacity: opacity.current }]}
          />
          <Animated.View
            style={[styles.reservation, { opacity: opacity.current }]}
          />
          <Animated.View
            style={[styles.reservation, { opacity: opacity.current }]}
          />
        </View>
      </View>
    </View>
  );
};

export default HistorySkeleton;

const styles = StyleSheet.create({
  contentWrapper: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  description: {
    backgroundColor: '#D9D9D9',
    width: 266,
    height: 23,
  },
  reservationWrapper: {
    width: '100%',
    gap: 15,
    overflow: 'hidden',
  },
  reservation: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: 185,
    borderRadius: 10,
  },
});
