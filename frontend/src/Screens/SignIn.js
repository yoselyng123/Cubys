import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* ASSETS */
import { StatusBar } from 'expo-status-bar';
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';
import colors from '../assets/colors';
import Header from '../components/Header';
import Input from '../components/Input';
import { MaterialIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
/* APOLLO SERVER */
import { useMutation } from '@apollo/client';
import { SIGN_IN_MUTATION } from '../hooks/mutations';

const SignIn = ({ navigation }) => {
  const theme = useContext(themeContext);

  const { setUser, setMyReservations } = useContext(userContext);
  // State for User input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorMessage = (message) => {
    showMessage({
      message: 'Error',
      description: message,
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
  };

  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: (data) => {
      // Store Token
      AsyncStorage.setItem('token', data.signIn.token).then(() => {
        setUser(data.signIn.user);
        setMyReservations([]);
        // Redirect to HomeScreen
        navigation.navigate('Tabs');
      });
    },
    onError: ({ networkError }) => {
      if (networkError) {
        errorMessage(
          'Sin Conexión. Verifique su conexión a internet e intente nuevamente.'
        );
      } else {
        showMessage('Credenciales Inválidas.');
      }
    },
  });

  const handleSignIn = () => {
    // AQUI SE MANEJA EL INPUT DEL USUARIO

    signIn({
      variables: { email: email.toLowerCase(), password },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header
        style={styles.header}
        title='Sign In'
        navigateAvailable={true}
        navigation={navigation}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              title='Correo Electrónico'
              placeholder='Ingrese su dirección de correo'
              text={email}
              onChangeText={(newText) => setEmail(newText)}
            />
            <Input
              style={styles.input}
              title='Contraseña'
              placeholder='Ingrese su contraseña'
              isPassword={true}
              isSignInPassword={true}
              text={password}
              onChangeText={(newText) => setPassword(newText)}
              onSubmit={handleSignIn}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                handleSignIn();
              }}
              disabled={loading}
            >
              <View style={styles.btnSignIn}>
                {loading ? (
                  <ActivityIndicator size='small' color='#FFF' />
                ) : (
                  <Text style={styles.textSignIn}>Iniciar Sesión</Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.noAccount}>
              <Text style={styles.textNoAction}>No tiene cuenta?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
              >
                <Text style={styles.textAction}>Crear cuenta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {theme.white === '#FFFFFF' ? (
        <StatusBar style='dark' />
      ) : (
        <StatusBar style='light' />
      )}
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 44,
    paddingBottom: 30,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  btnSignIn: {
    borderRadius: 10,
    backgroundColor: colors.purple,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  textSignIn: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.6,
  },
  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAction: {
    marginLeft: 5,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: colors.purple,
    letterSpacing: 0.6,
  },
  textNoAction: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.gray,
    letterSpacing: 0.6,
  },
});