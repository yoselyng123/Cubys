import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import colors from '../assets/colors';
import { userContext } from '../context/userContext';

const CubicleMomentaneo = ({
  cubicle,
  navigation,
  resInfo,
  inputValidation,
}) => {
  const { myReservations } = useContext(userContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (myReservations.length < 1) {
            // TODO: VALIDAR QUE YA SE TIENE UNA RES ACTIVA
            if (inputValidation()) {
              if (cubicle.availability) {
                navigation.navigate('ReservationDetails', {
                  cubicleInfo: cubicle,
                  resInfo: resInfo,
                });
              } else {
                Alert.alert(
                  'Error.',
                  'El cubículo se encuentra ocupado en el bloque de hora seleccionado.'
                );
              }
            }
          } else {
            Alert.alert('Error. Ya tiene una reservación activa.');
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
                {
                  backgroundColor: cubicle.availability
                    ? colors.green
                    : colors.red,
                },
              ]}
            />
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
