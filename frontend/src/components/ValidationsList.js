import { StyleSheet, View } from 'react-native';
import { useContext } from 'react';
/* ICONS */
import { Feather, Ionicons } from '@expo/vector-icons';
/* Components */
import Validation from './Validation';
/* Context */
import themeContext from '../context/themeContext';

const ValidationsList = ({ validations }) => {
  const theme = useContext(themeContext);

  return (
    <View style={styles.validations}>
      <Validation
        icon={
          validations.eightCharacters ? (
            <Ionicons name='md-checkmark-sharp' size={15} color={theme.green} />
          ) : (
            <Feather name='x' size={15} color={theme.gray} />
          )
        }
        text='Al menos 8 caracteres'
      />

      <Validation
        icon={
          validations.upperAndLower ? (
            <Ionicons name='md-checkmark-sharp' size={15} color={theme.green} />
          ) : (
            <Feather name='x' size={15} color={theme.gray} />
          )
        }
        text='Al menos 1 mayuscula y 1 minuscula'
      />
      <Validation
        icon={
          validations.numeric ? (
            <Ionicons name='md-checkmark-sharp' size={15} color={theme.green} />
          ) : (
            <Feather name='x' size={15} color={theme.gray} />
          )
        }
        text='Al menos 1 numero'
      />
      <Validation
        icon={
          validations.specialChar ? (
            <Ionicons name='md-checkmark-sharp' size={15} color={theme.green} />
          ) : (
            <Feather name='x' size={15} color={theme.gray} />
          )
        }
        text='Al menos 1 caracter especial'
      />
    </View>
  );
};

export default ValidationsList;

const styles = StyleSheet.create({
  validations: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
    flex: 1,
  },
});
