import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
/* Assets */
import Tag from './Tag';
import colors from '../assets/colors';
import { Ionicons } from '@expo/vector-icons';
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

const Reservation = ({ info, id, deleteReservation, pressedCancel }) => {
  const { loading, error, data } = useQuery(GET_CUBICLE_BY_ID, {
    variables: { id },
  });

  const handleDeleteReservation = () => {
    Alert.alert(
      'Confirmación',
      'Esta seguro que desea cancelar su reservación?',
      [
        {
          text: 'Cancel',
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
          },
        },
      ]
    );
  };

  if (loading) {
    return <View style={styles.containerLoading}></View>;
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            borderColor: colors.purple,
            borderLeftWidth: 3,
            paddingLeft: 8,
          }}
        >
          <View style={styles.infoWrapper}>
            <View style={styles.LeftInfoWrapper}>
              {loading ? (
                <View style={styles.LeftInfoWrapper}>
                  <Text style={styles.idCubicle}>Cubicle #</Text>
                  <Text style={styles.cubicleFloor}>Floor</Text>
                </View>
              ) : (
                <View style={styles.LeftInfoWrapper}>
                  <Text style={styles.idCubicle}>
                    Cubicle #{data.getCubicleByID.cubicleNumber}
                  </Text>
                  <Text style={styles.cubicleFloor}>
                    {data.getCubicleByID.floor}nd Floor
                  </Text>
                </View>
              )}
            </View>
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
          </View>
          <View style={styles.tagsWrapper}>
            <Tag name='x4' icon='person' />
            <Tag name='Board' />
          </View>
        </View>
        <View style={styles.bottomSection}>
          <View>
            <Text style={styles.timeTitle}>Start Time</Text>
            <Text style={styles.time}>
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
            <Text style={styles.timeTitle}>End Time</Text>
            <Text style={styles.time}>
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
    justifyContent: 'space-between',
    flex: 1.05,
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
