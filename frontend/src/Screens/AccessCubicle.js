import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
/* Assets */
import { Feather } from '@expo/vector-icons';
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';
import useToastMessage from '../hooks/useToastMessage';
/* Components */
import Header from '../components/Header';
import ScreenDescription from '../components/ScreenDescription';
import Loading from '../components/Loading';
import dayjs from 'dayjs';
/* APOLLO */
import { useMutation } from '@apollo/client';
import { TOGGLE_DOOR } from '../hooks/mutations';

const AccessCubicle = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { setLockStatus, lockStatus, user, myReservations } =
    useContext(userContext);
  const { showToast } = useToastMessage();

  const [currentTime, setCurrentTime] = useState(dayjs().format('h:mma'));

  const [toggleDoor, { loading: loadingToggleDoor, data: dataToggleDoor }] =
    useMutation(TOGGLE_DOOR, {
      onCompleted: (data) => {
        showToast({
          type: 'infoToast',
          title: 'Info',
          message: data.toggleDoor.open
            ? 'Se ha abierto el cubículo'
            : 'Se ha cerrado el cubículo',
        });
      },
      onError: () => {
        showToast({
          type: 'errorToast',
          title: 'Error',
          message:
            'No se pudo cambiar el estado del cubículo. Por favor intente de nuevo.',
        });
      },
    });

  useEffect(() => {
    if (dataToggleDoor) {
      setLockStatus(dataToggleDoor.toggleDoor.open);
      console.log(dataToggleDoor.toggleDoor.open);
    }
  }, [dataToggleDoor]);

  const hoursInReservation = () => {
    if (
      currentTime >= myReservations[0].startTime &&
      currentTime <= myReservations[0].endTime
    ) {
      console.log('IN HOURS');
      return true;
    } else {
      console.log('OUT OF HOURS');
      return false;
    }
  };

  const handleAccessToCubicle = () => {
    if (myReservations.length > 0) {
      let activeReservation = myReservations[0];
      var cubicleId = activeReservation.cubicleID;
      console.log(cubicleId);
      //TODO: VALIDAR HORA EN RESERVACION
      if (hoursInReservation()) {
        toggleDoor({
          variables: { cubicleId },
        });
      }
    } else {
      showToast({
        type: 'infoToast',
        title: 'Sin reservación',
        message:
          'No tiene reservación activa en estos momentos. No se puede abrir el cubículo',
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header
        style={styles.header}
        title='Botón de Acceso'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.container}>
        <ScreenDescription description='Este botón le da acceso al cubículo que reservó.' />
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleAccessToCubicle();
            }}
          >
            {lockStatus ? (
              <Feather
                name='unlock'
                size={220}
                color={theme.purple}
                style={{ fontWeight: 800 }}
              />
            ) : (
              <Feather
                name='lock'
                size={220}
                color={theme.purple}
                style={{ fontWeight: 800 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Loading show={loadingToggleDoor} />
    </View>
  );
};

export default AccessCubicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnWrapper: {
    marginTop: 150,
    alignSelf: 'center',
  },
});
