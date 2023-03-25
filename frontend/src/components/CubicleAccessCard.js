import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomSwitch from './CustomSwitch';
/* Assets */
import themeContext from '../context/themeContext';

const CubicleAccessCard = ({ cubicle }) => {
  const theme = useContext(themeContext);

  const handleFloorShowcase = (floor) => {
    if (floor === '1') {
      return '1er Piso';
    } else if (floor === '2') {
      return '2do Piso';
    } else if (floor === '3') {
      return '3er Piso';
    } else {
      return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.white }]}>
      <View
        style={{
          borderColor: theme.purple,
          borderLeftWidth: 3,
        }}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.infoWrapper}>
            <View style={styles.infoWrapperTop}>
              <Text style={[styles.cubicleTitle, { color: theme.dark }]}>
                Cubículo #{cubicle.cubicleNumber}
              </Text>
              <Text style={[styles.cubicleFloor, { color: theme.gray }]}>
                {handleFloorShowcase(cubicle.floor)}
              </Text>
            </View>
            <Text style={[styles.cubicleSala, { color: theme.gray }]}>
              {cubicle.sala}
            </Text>
          </View>
          <CustomSwitch />
        </View>
      </View>
    </View>
  );
};

export default CubicleAccessCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 22,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  infoWrapper: {
    flex: 1,
  },
  infoWrapperTop: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    paddingBottom: 4,
    width: '65%',
  },
  cubicleTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    marginRight: 10,
  },
  cubicleFloor: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
  },
  cubicleSala: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 19,
  },
});
