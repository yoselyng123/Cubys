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
import { Feather } from '@expo/vector-icons';
/* Components */
import Header from '../components/Header';
import ReserveForm from '../components/ReserveForm';
import SectionDivider from '../components/SectionDivider';
import { userContext } from '../context/userContext';

const CREATE_RESERVATION = gql`
  mutation createReservation(
    $startTime: String!
    $endTime: String!
    $cubicleID: ID!
    $companions: [CreateCompanion!]!
    $date: String!
  ) {
    createReservation(
      input: {
        startTime: $startTime
        endTime: $endTime
        cubicleID: $cubicleID
        date: $date
        companions: $companions
      }
    ) {
      id
      cubicleID
      startTime
      endTime
      date
      createdBy
      companions {
        name
        carrera
        carnet
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
    }
  }
`;

const ReservationDetails = ({ route, navigation }) => {
  const { setMyReservations, myReservations } = useContext(userContext);

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
        Alert.alert('Se ha creado la reservación con Exito!');
      },
      onError: () => {
        Alert.alert(
          'No se pudo cancelar la reservación. Por favor intente de nuevo'
        );
      },
      refetchQueries: [{ query: GET_RESERVATIONS }],
    }
  );

  useEffect(() => {
    if (data) {
      setMyReservations(data.createReservation);
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
        Alert.alert('Error. Los campos no pueden quedar vacios');
        return false;
      } else {
        if (
          companion.carnet.length < 11 ||
          oneSpecialChar.test(companion.carnet)
        ) {
          Alert.alert('Error. Carnet inválido');
          return false;
        }
        return true;
      }
    });

    const isTrue = (currentValue) => currentValue === true;
    if (passedValidation.every(isTrue)) {
      createReservation({
        variables: { startTime, endTime, cubicleID, date, companions },
      });
    }
  };

  const handleAddCompanion = () => {
    if (companionsList.length < 5) {
      let copyListCompanions = [...companionsList];
      copyListCompanions.push({
        name: '',
        carrera: '',
        carnet: '',
      });

      setCompanionsList(copyListCompanions);
    } else {
      Alert.alert('Ha alcanzado la capacidad máxima de personas por cubiculo.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header
        style={styles.header}
        title='Reservation Details'
        navigateAvailable={true}
        navigation={navigation}
      />
      <ScrollView style={styles.contentWrapper}>
        <Text style={styles.description}>
          Please review the reservation details and make sure everything is
          correct
        </Text>
        <SectionDivider marginBottom={20} />
        <View style={styles.reservationInfoWrapper}>
          <View style={styles.topSection}>
            <Text style={styles.title}>
              Cubicle #{cubicleInfo.cubicleNumber}
            </Text>
            <Text style={styles.floor}>{cubicleInfo.floor}nd Floor</Text>
          </View>
          <View style={styles.cubicleAddOns}>
            <Text style={styles.textDesc}>4 Chairs</Text>
            <Text style={styles.textDesc}>White board</Text>
          </View>
          <SectionDivider marginBottom={20} />
          <View style={styles.dateWrapperContainer}>
            <View style={styles.dateWrapper}>
              <Text style={styles.title}>Start Time</Text>
              <Text style={styles.textDesc}>
                {resInfo.date},{`\n`}
                {resInfo.startTime}
              </Text>
            </View>
            <View style={styles.dateWrapper}>
              <Text style={styles.title}>End Time</Text>
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
