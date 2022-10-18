import { StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../assets/colors';

const ReserveForm = ({ number, companion, setCompanion }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompañante #{number}</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder='Nombre y Apellido'
          value={companion.name}
          onChangeText={(value) =>
            setCompanion((previousState) => {
              return { ...previousState, name: value };
            })
          }
          style={styles.input}
        />
        <TextInput
          placeholder='Carnet'
          value={companion.carnet}
          onChangeText={(value) =>
            setCompanion((previousState) => {
              return { ...previousState, carnet: value };
            })
          }
          style={styles.input}
        />
        <TextInput
          placeholder='Carrera'
          value={companion.carrera}
          onChangeText={(value) =>
            setCompanion((previousState) => {
              return { ...previousState, carrera: value };
            })
          }
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default ReserveForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.6,
    fontSize: 13,
    color: colors.gray,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: colors.dark,
    letterSpacing: 0.6,
  },
  formContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
});
