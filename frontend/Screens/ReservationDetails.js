import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
/* Assets */
import colors from '../assets/colors';
import { Feather } from '@expo/vector-icons';
/* Components */
import Header from '../components/Header';
import ReserveForm from '../components/ReserveForm';
import SectionDivider from '../components/SectionDivider';

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
    }
  }
`;

const ReservationDetails = ({ route, navigation }) => {
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

  const [createReservation, { loading: loadingReservation }] = useMutation(
    CREATE_RESERVATION,
    {
      onCompleted: () => {
        Alert.alert('Se ha creado la reservación con Exito!');
        navigation.navigate('Home');
      },
      onError: () => {
        Alert.alert(
          'No se pudo cancelar la reservación. Por favor intente de nuevo'
        );
      },
      refetchQueries: [{ query: GET_RESERVATIONS }],
    }
  );

  const handleSubmitForm = () => {
    let startTime = resInfo.startTime;
    let endTime = resInfo.endTime;
    let cubicleID = cubicleInfo.id;
    let date = resInfo.date;
    let companions = companionsList;
    var passedValidation = companions.map((companion) => {
      if (
        companion.name === '' ||
        companion.carnet === '' ||
        companion.carrera === ''
      ) {
        return false;
      } else {
        return true;
      }
    });

    const isTrue = (currentValue) => currentValue === true;
    if (passedValidation.every(isTrue)) {
      createReservation({
        variables: { startTime, endTime, cubicleID, date, companions },
      });
    } else {
      Alert.alert('Error. Los campos no pueden quedar vacios');
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
        <SectionDivider />
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
          <SectionDivider />
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
          <TouchableOpacity activeOpacity={0.7} onPress={handleSubmitForm}>
            <View style={styles.reserveBtn}>
              <Text style={styles.reserveBtnText}>Reservar</Text>
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
