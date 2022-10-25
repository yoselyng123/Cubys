import { StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../assets/colors';

const ReserveForm = ({
  number,
  companion,
  setCompanionsList,
  companionsList,
}) => {
  const handleChangeCompanionInfo = (type, value) => {
    if (type === 'Name') {
      let newList = [...companionsList];
      companion.name = value;
      newList[number - 1] = companion;
      setCompanionsList(newList);
    } else if (type === 'Carnet') {
      let newList = [...companionsList];
      companion.carnet = value;
      newList[number - 1] = companion;
      setCompanionsList(newList);
    } else {
      let newList = [...companionsList];
      companion.carrera = value;
      newList[number - 1] = companion;
      setCompanionsList(newList);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompañante #{number}</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder='Nombre y Apellido'
          value={companion.name}
          onChangeText={(value) => handleChangeCompanionInfo('Name', value)}
          style={styles.input}
        />
        <TextInput
          placeholder='Carnet'
          value={companion.carnet}
          onChangeText={(value) => handleChangeCompanionInfo('Carnet', value)}
          style={styles.input}
        />
        <TextInput
          placeholder='Carrera'
          value={companion.carrera}
          onChangeText={(value) => handleChangeCompanionInfo('Carrera', value)}
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
