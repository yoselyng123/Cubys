import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../assets/colors';

const CubicleMomentaneo = ({
  cubicle,
  navigation,
  resInfo,
  inputValidation,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (inputValidation()) {
            navigation.navigate('ReservationDetails', {
              cubicleInfo: cubicle,
              resInfo: resInfo,
            });
          }
        }}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.contentLeft}>
            <View style={styles.topInfoSection}>
              <Text style={styles.cubicleText}>
                Cubicle #{cubicle.cubicleNumber}
              </Text>
              <Text style={styles.floorText}>{cubicle.floor}st Floor</Text>
            </View>
            <View style={styles.bottomInfoSection}>
              <Text style={styles.salaText}>{cubicle.sala}</Text>
            </View>
          </View>
          <View style={styles.contentRight}>
            <View
              style={[
                styles.availability,
                cubicle.availability
                  ? { backgroundColor: '#6ABB8B' }
                  : { backgroundColor: '#E27188' },
              ]}
            ></View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CubicleMomentaneo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  contentWrapper: {
    borderLeftWidth: 3,
    borderColor: colors.purple,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '62%',
  },
  bottomInfoSection: {},
  cubicleText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    letterSpacing: 0.6,
    lineHeight: 26,
  },
  floorText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 19,
    color: colors.gray,
  },
  salaText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 19,
    color: colors.gray,
  },
  availability: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: colors.purple,
  },
});
