import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useContext } from 'react';
/* Assets */
import colors from '../assets/colors';
import { Feather } from '@expo/vector-icons';
import CarreraSelect from './CarreraSelect';
import themeContext from '../context/themeContext';
import { userContext } from '../context/userContext';

const ReserveForm = ({
  number,
  companion,
  setCompanionsList,
  companionsList,
}) => {
  const theme = useContext(themeContext);

  const { user } = useContext(userContext);

  const handleDeleteCompanion = () => {
    if (companionsList.length === 2) {
      Alert.alert(
        'Error',
        'Se requiere un minimo de 3 personas para reservar un cubículo.'
      );
    } else {
      let copyListCompanions = [...companionsList];
      copyListCompanions.splice(number - 1, 1);

      setCompanionsList(copyListCompanions);
    }
  };

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
      <View style={styles.topInfo}>
        <View>
          <Text style={styles.title}>Acompañante #{number}</Text>
          {user.role === 'admin' && number - 1 === 0 && (
            <Text style={styles.subtitle}>Responsable</Text>
          )}
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={handleDeleteCompanion}>
          <View style={styles.addCompanionBtn}>
            <Feather name='x' size={20} color={colors.red} />
            <Text style={styles.addCompanionText}>Eliminar acompañante</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          placeholder='Nombre y Apellido'
          placeholderTextColor={theme.iconGray}
          value={companion.name}
          onChangeText={(value) => handleChangeCompanionInfo('Name', value)}
          style={[
            styles.input,
            { color: theme.dark, borderBottomColor: theme.divider },
          ]}
        />
        <TextInput
          placeholder='Carnet'
          placeholderTextColor={theme.iconGray}
          value={companion.carnet}
          onChangeText={(value) => handleChangeCompanionInfo('Carnet', value)}
          style={[
            styles.input,
            { color: theme.dark, borderBottomColor: theme.divider },
          ]}
        />
        <CarreraSelect
          carrera={companion.carrera}
          setCarrera={handleChangeCompanionInfo}
          multipleUsers={true}
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
  subtitle: {
    marginTop: 10,
    fontFamily: 'Roboto-Italic',
    letterSpacing: 0.6,
    fontSize: 13,
    color: '#525252',
    marginBottom: 5,
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
    color: colors.red,
    marginLeft: 5,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
