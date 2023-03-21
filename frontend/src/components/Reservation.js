import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
/* Assets */
import Tag from './Tag';
import colors from '../assets/colors';
import { Ionicons } from '@expo/vector-icons';
import themeContext from '../context/themeContext';
import { useContext } from 'react';
/* APOLLO SERVER */
import { useQuery, gql } from '@apollo/client';

const GET_CUBICLE_BY_ID = gql`
  query getCubiclebyID($id: ID!) {
    getCubicleByID(id: $id) {
      id
      cubicleNumber
      floor
      sala
      maxCapacity
      minCapacity
    }
  }
`;

const Reservation = ({
  info,
  id,
  deleteReservation,
  pressedCancel,
  setPressedDeletedIndex,
  index,
}) => {
  const theme = useContext(themeContext);

  const { loading, error, data } = useQuery(GET_CUBICLE_BY_ID, {
    variables: { id },
  });

  const handleDeleteReservation = () => {
    Alert.alert(
      'Confirmación',
      'Esta seguro que desea cancelar su reservación?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            const id = info.id;
            deleteReservation({
              variables: { id },
            });
            setPressedDeletedIndex(index);
          },
        },
      ]
    );
  };

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

  if (loading) {
    return (
      <View
        style={[styles.containerLoading, { backgroundColor: theme.loading }]}
      ></View>
    );
  } else {
    return (
      <View style={[styles.container, { backgroundColor: theme.white }]}>
        <View
          style={{
            borderColor: colors.purple,
            borderLeftWidth: 3,
            paddingLeft: 8,
          }}
        >
          <View style={styles.infoWrapper}>
            <View style={styles.LeftInfoWrapper}>
              {loading && data.getCubicleByID ? (
                <View style={styles.LeftInfoWrapper}>
                  <Text style={[styles.idCubicle, { color: theme.dark }]}>
                    Cubículo #
                  </Text>
                  <Text style={styles.cubicleFloor}>Piso</Text>
                </View>
              ) : (
                <View style={styles.LeftInfoWrapper}>
                  <Text style={[styles.idCubicle, { color: theme.dark }]}>
                    Cubículo #{data.getCubicleByID.cubicleNumber}
                  </Text>
                  <Text style={styles.cubicleFloor}>
                    {handleFloorShowcase(data.getCubicleByID.floor)}
                  </Text>
                </View>
              )}
            </View>
            {deleteReservation || pressedCancel ? (
              <TouchableOpacity
                style={styles.rightInfoWrapper}
                activeOpacity={0.7}
                onPress={() => handleDeleteReservation()}
                disabled={pressedCancel}
              >
                <Text
                  style={
                    pressedCancel
                      ? [styles.cancelRes, { opacity: 0.5 }]
                      : styles.cancelRes
                  }
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.rightInfoWrapper}></View>
            )}
          </View>
          <View style={styles.tagsWrapper}>
            <Tag name='x4' icon='person' />
            <Tag name='Board' />
          </View>
        </View>
        <View style={styles.bottomSection}>
          <View>
            <Text style={styles.timeTitle}>Hora de Entrada</Text>
            <Text style={[styles.time, { color: theme.dark }]}>
              {info.date},{'\n'}
              {info.startTime}
            </Text>
          </View>
          <Ionicons
            name='chevron-forward-circle-outline'
            size={24}
            color={colors.gray}
          />
          <View>
            <Text style={styles.timeTitle}>Hora de Sallida</Text>
            <Text style={[styles.time, { color: theme.dark }]}>
              {info.date},{'\n'}
              {info.endTime}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default Reservation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.5)',
    elevation: 15,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  containerLoading: {
    backgroundColor: '#cacaca',
    width: '100%',
    height: 175,
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.5)',
    elevation: 15,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  LeftInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  rightInfoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tagsWrapper: {
    flexDirection: 'row',
  },
  idCubicle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.dark,
    marginRight: 10,
  },
  cubicleFloor: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.gray,
  },
  cancelRes: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    letterSpacing: 0.6,
    color: colors.purple,
  },
  bottomSection: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 26,
    color: colors.gray,
    letterSpacing: 0.6,
  },
  time: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 26,
    color: colors.dark,
    letterSpacing: 0.6,
  },
});
