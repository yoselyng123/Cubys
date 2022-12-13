import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
/* Assets */
import colors from '../assets/colors';
import { Feather } from '@expo/vector-icons';

const CarreraSelect = ({ carrera, setCarrera, multipleUsers }) => {
  const listCarreras = [
    {
      label: 'Ciencias Administrativas',
      value: 'Ciencias Administrativas',
      key: 1,
    },
    { label: 'Contaduría Pública', value: 'Contaduría Pública', key: 2 },
    { label: 'Economía Empresarial', value: 'Economía Empresarial', key: 3 },
    { label: 'Educación', value: 'Educación', key: 4 },
    { label: 'Idiomas Modernos', value: 'Idiomas Modernos', key: 5 },
    {
      label: 'Matemáticas Industriales',
      value: 'Matemáticas Industriales',
      key: 6,
    },
    { label: 'Psicología', value: 'Psicología', key: 7 },
    { label: 'Derecho', value: 'Derecho', key: 8 },
    { label: 'Estudios Liberales', value: 'Estudios Liberales', key: 9 },
    { label: 'Ingeniería Civil', value: 'Ingeniería Civil', key: 10 },
    {
      label: 'Ingeniería de Producción',
      value: 'Ingeniería de Producción',
      key: 11,
    },
    {
      label: 'Ingeniería de Sistemas',
      value: 'Ingeniería de Sistemas',
      key: 12,
    },
    { label: 'Ingeniería Eléctrica', value: 'Ingeniería Eléctrica', key: 13 },
    { label: 'Ingeniería Mecánica', value: 'Ingeniería Mecánica', key: 14 },
    { label: 'Ingeniería Química', value: 'Ingeniería Química', key: 15 },
  ];

  return (
    <View style={styles.pickerWrapper}>
      {!multipleUsers && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Carrera</Text>
        </View>
      )}
      <RNPickerSelect
        style={
          multipleUsers ? pickerSelectStylesMultipleUsers : pickerSelectStyles
        }
        onValueChange={(value) => {
          if (multipleUsers) {
            setCarrera('Carrera', value);
          } else {
            setCarrera(value);
          }
        }}
        items={listCarreras}
        value={carrera}
        placeholder={{
          label: 'Selecciona una carrera',
          value: '',
          color: '#9EA0A4',
        }}
        Icon={() => {
          return (
            <Feather
              name='chevron-down'
              size={multipleUsers ? 18 : 24}
              color={colors.gray}
            />
          );
        }}
      />
    </View>
  );
};

export default CarreraSelect;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: colors.dark,
    letterSpacing: 0.6,
    marginTop: 5,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: colors.dark,
    letterSpacing: 0.6,
    marginTop: 5,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
});

const pickerSelectStylesMultipleUsers = StyleSheet.create({
  inputIOS: {
    width: '100%',
    marginBottom: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: colors.dark,
    letterSpacing: 0.6,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: '100%',
    marginBottom: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: colors.dark,
    letterSpacing: 0.6,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
});

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.6,
    fontSize: 13,
    color: colors.gray,
  },
  carnetInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: colors.dark,
    letterSpacing: 0.6,
    marginTop: 5,
  },
  pickerWrapper: {
    marginBottom: 40,
  },
});
