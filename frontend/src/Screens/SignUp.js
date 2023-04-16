import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* ASSETS */
import { StatusBar } from 'expo-status-bar';
import dayjs from 'dayjs';
import useToastMessage from '../hooks/useToastMessage';
/* Components */
import Header from '../components/Header';
/* APOLLO SERVER */
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from '../hooks/mutations';
/* Context */
import themeContext from '../context/themeContext';
import { userContext } from '../context/userContext';
import SignUpForm from '../components/SignUpForm';
import ValidationsList from '../components/ValidationsList';

const SignUp = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { setUser, setMyReservations } = useContext(userContext);
  const [carrera, setCarrera] = useState('');
  const [carnet, setCarnet] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validations, setValidations] = useState({
    eightCharacters: false,
    upperAndLower: false,
    numeric: false,
    specialChar: false,
  });

  const { showToast } = useToastMessage();

  const [signUp, { loading }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: (data) => {
      // Store Token
      AsyncStorage.setItem('token', data.signUp.token).then(() => {
        setUser(data.signUp.user);
        setMyReservations([]);
        // Redirect to HomeScreen
        navigation.navigate('Tabs');
      });
    },
    onError: ({ networkError }) => {
      if (networkError) {
        showToast({
          type: 'errorToast',
          title: 'Sin Conexión',
          message: 'Verifique su conexión a internet e intente nuevamente.',
        });
      } else {
        console.log(error);
      }
    },
  });

  const handleSignUp = () => {
    // Validate secure password
    let validationsPassword =
      validations.eightCharacters &&
      validations.numeric &&
      validations.specialChar &&
      validations.upperAndLower;
    if (
      email !== '' &&
      name !== '' &&
      carnet !== '' &&
      carrera !== '' &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      if (!email.includes('@') || !email.includes('@correo.unimet.edu.ve')) {
        showToast({
          type: 'errorToast',
          title: 'Error',
          message: 'Correo inválido.',
        });
      } else if (carnet.length < 11 || carnet.length > 11) {
        showToast({
          type: 'errorToast',
          title: 'Error',
          message: 'Carnet inválido.',
        });
      } else if (!validationsPassword) {
        showToast({
          type: 'errorToast',
          title: 'Error',
          message: 'La contraseña no cumple con los requisitos.',
        });
      } else if (password !== confirmPassword) {
        showToast({
          type: 'errorToast',
          title: 'Error',
          message: 'Las contraseñas no coinciden.',
        });
      } else {
        let role = 'user';
        let joined = dayjs().format('DD MMM YYYY');
        signUp({
          variables: { carrera, email, password, carnet, name, role, joined },
        });
      }
    } else {
      showToast({
        type: 'errorToast',
        title: 'Error',
        message: 'Los campos no pueden quedar vacios.',
      });
    }
  };

  useEffect(() => {
    let eightCharacters = validateEightChar(password);
    let upperAndLower = validateUpperAndLower(password);
    let numeric = validateNumeric(password);
    let specialChar = validateSpecialChar(password);

    setValidations({
      eightCharacters,
      upperAndLower,
      numeric,
      specialChar,
    });
  }, [password]);

  const validateUpperAndLower = (password) => {
    const oneUpperCase = new RegExp('^(?=.*[A-Z])');
    const oneLowerCase = new RegExp('^(?=.*[a-z])');
    if (oneUpperCase.test(password) && oneLowerCase.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  const validateNumeric = (password) => {
    const oneNumeric = new RegExp('^(?=.*\\d)');
    if (oneNumeric.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  const validateEightChar = (password) => {
    if (password.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  const validateSpecialChar = (password) => {
    const oneSpecialChar = new RegExp('^(?=.*[-+_!@#$%^&*.,?])');
    if (oneSpecialChar.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header
        style={styles.header}
        title='Registrarse'
        navigateAvailable={true}
        navigation={navigation}
      />

      <ScrollView style={styles.content}>
        {/* Form */}
        <SignUpForm
          name={name}
          setName={setName}
          carrera={carrera}
          setCarrera={setCarrera}
          carnet={carnet}
          setCarnet={setCarnet}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleSignUp={handleSignUp}
        />
        {/* Validations */}
        <ValidationsList validations={validations} />
        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleSignUp();
            }}
            disabled={loading}
          >
            <View style={[styles.btnSignIn, { backgroundColor: theme.purple }]}>
              {loading ? (
                <ActivityIndicator size='small' color='#FFF' />
              ) : (
                <Text style={styles.textSignIn}>Registrarse</Text>
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.noAccount}>
            <Text style={[styles.textNoAction, { color: theme.gray }]}>
              Ya tiene una cuenta?
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              <Text style={[styles.textAction, { color: theme.purple }]}>
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {theme.white === '#FFFFFF' ? (
        <StatusBar style='dark' />
      ) : (
        <StatusBar style='light' />
      )}
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  btnSignIn: {
    borderRadius: 10,
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
    letterSpacing: 0.6,
  },
  textNoAction: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    letterSpacing: 0.6,
  },
  footer: {
    marginBottom: 80,
  },
});
