import { StyleSheet, View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Header from './Header';
import SectionDivider from './SectionDivider';

const HomeSkeleton = () => {
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
      <Header title='cubys' />
      <View style={styles.contentWrapper}>
        <View style={styles.infoContainer}>
          <Animated.View style={[styles.title, { opacity: opacity.current }]} />
          <Animated.View
            style={[styles.description, { opacity: opacity.current }]}
          />
        </View>
        <View style={styles.cardsWrapper}>
          <View style={styles.cardsWrapperLeft}>
            <Animated.View
              style={[styles.cardItem, { opacity: opacity.current }]}
            />
            <Animated.View
              style={[styles.cardItem, { opacity: opacity.current }]}
            />
          </View>
          <View style={styles.cardsWrapperRight}>
            <Animated.View
              style={[styles.cardItem, { opacity: opacity.current }]}
            />
            <Animated.View
              style={[styles.cardItem, { opacity: opacity.current }]}
            />
          </View>
        </View>
        <SectionDivider marginBottom={26} marginTop={20} />
        <Animated.View
          style={[styles.subtitle, { opacity: opacity.current }]}
        />
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

export default HomeSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    marginHorizontal: 16,
    marginTop: 30,
  },
  infoContainer: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 34,
  },
  title: {
    backgroundColor: '#D9D9D9',
    width: 84,
    height: 23,
  },
  description: {
    backgroundColor: '#D9D9D9',
    width: 274,
    height: 23,
  },
  cardsWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardsWrapperLeft: {
    width: '48%',
    marginRight: '4%',
  },
  cardsWrapperRight: {
    width: '48%',
  },
  cardItem: {
    marginBottom: 15,
    width: '100%',
    height: 100,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  subtitle: {
    backgroundColor: '#D9D9D9',
    width: 167,
    height: 23,
    marginBottom: 22,
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
