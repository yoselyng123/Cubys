import { gql, useMutation } from '@apollo/client';
import { useContext, useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
/* Assets */
import colors from '../assets/colors';
import { Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
/* Components */
import Header from '../components/Header';
import ReserveForm from '../components/ReserveForm';
import SectionDivider from '../components/SectionDivider';
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';

const CREATE_RESERVATION = gql`
  mutation createReservation(
    $startTime: String!
    $endTime: String!
    $cubicleID: ID!
    $companions: [CreateCompanion!]!
    $date: String!
    $completed: Boolean
  ) {
    createReservation(
      input: {
        startTime: $startTime
        endTime: $endTime
        cubicleID: $cubicleID
        date: $date
        companions: $companions
        completed: $completed
      }
    ) {
      id
      cubicleID
      startTime
      endTime
      date
      createdBy
      completed
      companions {
        name
        carnet
        carrera
      }
    }
  }
`;

const GET_RESERVATIONS = gql`
  query getMyReservations {
    getMyReservations {
      id
      cubicleID
      createdBy
      startTime
      endTime
      date
      companions {
        name
        carrera
        carnet
      }
      completed
    }
  }
`;

const ReservationDetails = ({ route, navigation }) => {
  const theme = useContext(themeContext);
  const { setMyReservations, user } = useContext(userContext);

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

  const [createReservation, { loading, data, error }] = useMutation(
    CREATE_RESERVATION,
    {
      onCompleted: () => {
        showMessage({
          message: 'Success',
          description: 'Se ha creado la reservación con éxito.',
          type: 'success',
          duration: '2000',
          icon: () => (
            <AntDesign
              name='checkcircleo'
              size={38}
              color='#97E3A4'
              style={{ paddingRight: 20 }}
            />
          ),
        });
      },
      onError: () => {
        showMessage({
          message: 'Error',
          description:
            'No se pudo realizar la reservación. Por favor intente de nuevo.',
          type: 'danger',
          duration: '2000',

          icon: () => (
            <MaterialIcons
              name='cancel'
              size={38}
              color='#FF9B9D'
              style={{ paddingRight: 20 }}
            />
          ),
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
        showMessage({
          message: 'Error',
          description: 'Los campos no pueden quedar vacios',
          type: 'danger',
          duration: '2000',

          icon: () => (
            <MaterialIcons
              name='cancel'
              size={38}
              color='#FF9B9D'
              style={{ paddingRight: 20 }}
            />
          ),
        });
        return false;
      } else {
        if (
          companion.carnet.length < 11 ||
          oneSpecialChar.test(companion.carnet)
        ) {
          showMessage({
            message: 'Error',
            description: 'Carnet inválido',
            type: 'danger',
            duration: '2000',

            icon: () => (
              <MaterialIcons
                name='cancel'
                size={38}
                color='#FF9B9D'
                style={{ paddingRight: 20 }}
              />
            ),
          });
          return false;
        }
        return true;
      }
    });

    const isTrue = (currentValue) => currentValue === true;
    if (passedValidation.every(isTrue)) {
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
      Alert.alert(
        'Error',
        'Ha alcanzado la capacidad máxima de personas por cubiculo.'
      );
    }
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
        <Text style={styles.description}>
          Revise los detalles de la reserva y asegúrese de que todo esté
          correcto
        </Text>
        <SectionDivider marginBottom={20} />
        <View style={styles.reservationInfoWrapper}>
          <View style={styles.topSection}>
            <Text style={[styles.title, { color: theme.dark }]}>
              Cubículo #{cubicleInfo.cubicleNumber}
            </Text>
            <Text style={styles.floor}>
              {handleFloorShowcase(cubicleInfo.floor)}
            </Text>
          </View>
          <View style={styles.cubicleAddOns}>
            <Text style={styles.textDesc}>4 Sillas</Text>
            <Text style={styles.textDesc}>1 Mesa</Text>
            <Text style={styles.textDesc}>1 Pizarra</Text>
          </View>
          <SectionDivider marginBottom={20} />
          <View style={styles.dateWrapperContainer}>
            <View style={styles.dateWrapper}>
              <Text style={[styles.title, { color: theme.dark }]}>
                Hora de Entrada
              </Text>
              <Text style={styles.textDesc}>
                {resInfo.date},{`\n`}
                {resInfo.startTime}
              </Text>
            </View>
            <View style={styles.dateWrapper}>
              <Text style={[styles.title, { color: theme.dark }]}>
                Hora de Salida
              </Text>
              <Text style={styles.textDesc}>
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
          <TouchableOpacity activeOpacity={0.7} onPress={handleAddCompanion}>
            <View style={styles.addCompanionBtn}>
              <Feather name='plus-circle' size={20} color={colors.purple} />
              <Text style={styles.addCompanionText}>Agregar acompañante</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.description}>
            Este es el paso final, luego de presionar el botón de Reservar, se
            habrá realizado exitosamente la reserva.
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSubmitForm}
            disabled={loading}
          >
            <View style={styles.reserveBtn}>
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
    backgroundColor: colors.background,
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
    color: colors.gray,
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
    color: colors.dark,
    marginBottom: 10,
  },
  floor: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    lineHeight: 18.75,
    color: colors.gray,
    marginBottom: 10,
  },
  textDesc: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    letterSpacing: 0.6,
    lineHeight: 20,
    color: colors.gray,
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
    backgroundColor: colors.purple,
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
    color: colors.purple,
    marginLeft: 5,
  },
});
