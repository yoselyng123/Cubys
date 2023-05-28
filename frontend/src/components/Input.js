import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

/* ASSETS */
import colors from '../assets/colors';
import themeContext from '../context/themeContext';

const Input = ({
  title,
  placeholder,
  isPassword = false,
  isSignInPassword = false,
  text,
  onChangeText,
  disabled,
  onSubmit,
  blurOnSubmit,
  ref,
}) => {
  const theme = useContext(themeContext);

  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {isSignInPassword && (
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={[styles.passForgot, { color: theme.purple }]}>
              Olvidó su contraseña?
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {isPassword ? (
        <TextInput
          style={
            !disabled
              ? [
                  styles.input,
                  { color: theme.dark, borderBottomColor: theme.gray },
                ]
              : [styles.input, { color: '#C2C2CD' }]
          }
          onChangeText={onChangeText}
          value={text}
          placeholder={placeholder}
          placeholderTextColor={theme.iconGray}
          secureTextEntry={passwordVisible}
          onSubmitEditing={onSubmit}
          blurOnSubmit={blurOnSubmit}
          ref={ref}
        />
      ) : (
        <TextInput
          style={
            !disabled
              ? [
                  styles.input,
                  { color: theme.dark, borderBottomColor: theme.gray },
                ]
              : [styles.input, { color: '#C2C2CD' }]
          }
          onChangeText={onChangeText}
          value={text}
          placeholder={placeholder}
          placeholderTextColor={theme.iconGray}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          onSubmitEditing={onSubmit}
          blurOnSubmit={blurOnSubmit}
          ref={ref}
          keyboardType={
            title === 'Carnet'
              ? 'number-pad'
              : title === 'Correo Electrónico'
              ? 'email-address'
              : 'default'
          }
          autoCapitalize='none'
        />
      )}

      {isPassword && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Ionicons
            style={styles.eyeicon}
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color={theme.gray}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
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
  passForgot: {
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.6,
    fontSize: 13,
    color: colors.purple,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: colors.dark,
    letterSpacing: 0.6,
    marginTop: 5,
  },
  eyeicon: {
    position: 'absolute',
    right: 10,
    bottom: 5,
    zIndex: 1,
  },
});
