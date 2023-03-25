import { useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
/* Assets */
import { Feather } from '@expo/vector-icons';
import useToastMessage from '../hooks/useToastMessage';
import useNotifications from '../hooks/useNotifications';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
/* Components */
import Header from '../components/Header';
import ReserveForm from '../components/ReserveForm';
import SectionDivider from '../components/SectionDivider';
/* Context */
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';
/* Apollo */
import { useMutation } from '@apollo/client';
import { CREATE_RESERVATION } from '../hooks/mutations';
import { GET_RESERVATIONS } from '../hooks/queries';

const ReservationDetails = ({ route, navigation }) => {
  const theme = useContext(themeContext);
  const { setMyReservations, user } = useContext(userContext);
  const [currentDate, setCurrentDate] = useState(dayjs());

  const myInterval = useRef();
  const { showToast } = useToastMessage();

  const {
    scheduleNotification,
    FiveMinutesBeforeStart,
    FiveMinutesBeforeEnd,
    onTime,
    requestNotificationPermissions,
  } = useNotifications();

  const { cubicleInfo, resInfo } = route.params;
  const [companionsList, setCompanionsList] = useState([
    {
      name: '',
      carrera: '',
      carnet: '',
    },
    {
      name: '',
      carrera: '',
      carnet: '',
    },
  ]);

  // When component Mounts and Unmounts from navigation
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      myInterval.current = setInterval(() => {
        setCurrentDate(dayjs());
      }, 1000 * 10);
      return () => {
        // Do something when the screen is blurred
        clearInterval(myInterval.current);
      };
    }, [])
  );

  const [createReservation, { loading, data, error }] = useMutation(
    CREATE_RESERVATION,
    {
      onCompleted: (data) => {
        handleShowNotification(data.createReservation);
        showToast({
          type: 'successToast',
          title: 'Success',
          message: 'Se ha creado la reservación con éxito.',
        });
      },
      onError: (error) => {
        console.log(error);
        showToast({
          type: 'errorToast',
          title: 'Error',
          message:
            'No se pudo realizar la reservación. Por favor intente de nuevo.',
        });
      },
      refetchQueries: [{ query: GET_RESERVATIONS }],
    }
  );

  useEffect(() => {
    if (data) {
      setMyReservations([data.createReservation]);
      navigation.navigate('Home');
    }
  }, [data]);

  const handleSubmitForm = () => {
    let startTime = resInfo.startTime;
    let endTime = resInfo.endTime;
    let cubicleID = cubicleInfo.id;
    let date = resInfo.date;
    let companions = companionsList;
    const oneSpecialChar = new RegExp('^(?=.*[-+_!@#$%^&*.,?])');
    var passedValidation = companions.map((companion) => {
      if (
        companion.name === '' ||
        companion.carnet === '' ||
        companion.carrera === ''
      ) {
        showToast({
          type: 'errorToast',
          title: 'Error',
          message: 'Los campos no pueden quedar vacios',
        });
        return false;
      } else {
        if (
          companion.carnet.length < 11 ||
          oneSpecialChar.test(companion.carnet)
        ) {
          showToast({
            type: 'errorToast',
            title: 'Error',
            message: 'Carnet inválido',
          });
          return false;
        }
        return true;
      }
    });

    const isTrue = (currentValue) => currentValue === true;
    if (passedValidation.every(isTrue)) {
      if (user.role !== 'admin') {
        companions.unshift({
          name: user.name,
          carrera: user.carrera,
          carnet: user.carnet,
        });
      }
      createReservation({
        variables: {
          startTime,
          endTime,
          cubicleID,
          date,
          companions,
          completed: false,
        },
      });
    }
  };

  const validationMaxCompanions = () => {
    if (user.role === 'admin') {
      if (companionsList.length < 6) {
        return true;
      }
    } else {
      if (companionsList.length < 5) {
        return true;
      }
    }
    return false;
  };

  const handleAddCompanion = () => {
    if (validationMaxCompanions()) {
      let copyListCompanions = [...companionsList];
      copyListCompanions.push({
        name: '',
        carrera: '',
        carnet: '',
      });

      setCompanionsList(copyListCompanions);
    } else {
      showToast({
        type: 'errorToast',
        title: 'Error',
        message: 'Ha alcanzado la capacidad máxima de personas por cubiculo.',
      });
    }
  };

  const handleShowNotification = (data) => {
    let currentHour = dayjs().format('H') * 3600;
    let currentMin = dayjs().minute() * 60;

    const timesForNotifications = {
      fiveMinBeforeStart: FiveMinutesBeforeStart(
        data.startTime,
        currentHour,
        currentMin
      ),
      onTime: onTime(data.startTime, currentHour, currentMin),
      FiveMinBeforeEnd: FiveMinutesBeforeEnd(
        data.endTime,
        currentHour,
        currentMin
      ),
    };

    console.log(
      `\nFiveMinBefore: ${timesForNotifications.fiveMinBeforeStart}\nFiveMinBeforeEnd: ${timesForNotifications.FiveMinBeforeEnd} \nonTime: ${timesForNotifications.onTime}`
    );

    scheduleNotification(
      timesForNotifications.fiveMinBeforeStart,
      '¡Faltan 5 minutos!',
      'Recuerda: el inicio de tu reservación comienza en 5 minutos.'
    );

    if (timesForNotifications.onTime > 0) {
      scheduleNotification(
        timesForNotifications.onTime,
        '¡Comenzó tu reservación!',
        'A partir de este momento ha iniciado el tiempo establecido de tu reservación'
      );
    } else {
      scheduleNotification(
        3,
        '¡Comenzó tu reservación!',
        'A partir de este momento ha iniciado el tiempo establecido de tu reservación'
      );
    }

    scheduleNotification(
      timesForNotifications.FiveMinBeforeEnd,
      '¡Quedan 5 minutos!',
      'El tiempo de tu reservación está por terminar.'
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header
        style={styles.header}
        title='Detalles Reservación'
        navigateAvailable={true}
        navigation={navigation}
      />
      <ScrollView style={styles.contentWrapper}>
        <Text style={[styles.description, { color: theme.gray }]}>
          Revise los detalles de la reserva y asegúrese de que todo esté
          correcto
        </Text>
        <SectionDivider marginBottom={20} />
        <View style={styles.reservationInfoWrapper}>
          <View style={styles.topSection}>
            <Text style={[styles.title, { color: theme.dark }]}>
              Cubículo #{cubicleInfo.cubicleNumber}
            </Text>
            <Text style={[styles.floor, { color: theme.gray }]}>
              {handleFloorShowcase(cubicleInfo.floor)}
            </Text>
          </View>
          <View style={styles.cubicleAddOns}>
            <Text style={[styles.textDesc, { color: theme.gray }]}>
              4 Sillas
            </Text>
            <Text style={[styles.textDesc, { color: theme.gray }]}>1 Mesa</Text>
            <Text style={[styles.textDesc, { color: theme.gray }]}>
              1 Pizarra
            </Text>
          </View>
          <SectionDivider marginBottom={20} />
          <View style={styles.dateWrapperContainer}>
            <View style={styles.dateWrapper}>
              <Text style={[styles.title, { color: theme.dark }]}>
                Hora de Entrada
              </Text>
              <Text style={[styles.textDesc, { color: theme.gray }]}>
                {resInfo.date},{`\n`}
                {resInfo.startTime}
              </Text>
            </View>
            <View style={styles.dateWrapper}>
              <Text style={[styles.title, { color: theme.dark }]}>
                Hora de Salida
              </Text>
              <Text style={[styles.textDesc, { color: theme.gray }]}>
                {resInfo.date},{`\n`}
                {resInfo.endTime}
              </Text>
            </View>
          </View>

          {companionsList.map((companion, index) => {
            return (
              <ReserveForm
                companion={companion}
                key={index}
                number={index + 1}
                setCompanionsList={setCompanionsList}
                companionsList={companionsList}
              />
            );
          })}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleAddCompanion();
            }}
          >
            <View style={styles.addCompanionBtn}>
              <Feather name='plus-circle' size={20} color={theme.purple} />
              <Text style={[styles.addCompanionText, { color: theme.purple }]}>
                Agregar acompañante
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.description, { color: theme.gray }]}>
            Este es el paso final, luego de presionar el botón de Reservar, se
            habrá realizado exitosamente la reserva.
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSubmitForm}
            disabled={loading}
          >
            <View
              style={[styles.reserveBtn, { backgroundColor: theme.purple }]}
            >
              {loading ? (
                <ActivityIndicator size='small' color='#FFF' />
              ) : (
                <Text style={styles.reserveBtnText}>Reservar</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReservationDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
    marginBottom: 20,
  },
  reservationInfoWrapper: {
    marginBottom: 'auto',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    lineHeight: 18.75,
    marginBottom: 10,
  },
  floor: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    lineHeight: 18.75,
    marginBottom: 10,
  },
  textDesc: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    letterSpacing: 0.6,
    lineHeight: 20,
    marginBottom: 4,
  },
  cubicleAddOns: {
    marginBottom: 15,
  },
  dateWrapper: {
    marginBottom: 30,
    marginRight: 'auto',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  reserveBtn: {
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 50,
  },
  reserveBtnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    letterSpacing: 0.6,
    lineHeight: 17.58,
    color: '#fff',
    marginBottom: 4,
  },
  dateWrapperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCompanionBtn: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  addCompanionText: {
    fontFamily: 'Roboto-Italic',
    fontSize: 13,
    letterSpacing: 0.6,
    lineHeight: 17.58,
    marginLeft: 5,
  },
});
