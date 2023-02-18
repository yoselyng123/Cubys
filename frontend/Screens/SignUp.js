import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* ASSETS */
import { StatusBar } from 'expo-status-bar';
import colors from '../assets/colors';
import Header from '../components/Header';
import Input from '../components/Input';
import CarreraSelect from '../components/CarreraSelect';
import dayjs from 'dayjs';
import { showMessage } from 'react-native-flash-message';
/* ICONS */
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
/* APOLLO SERVER */
import { useMutation, gql } from '@apollo/client';
import { userContext } from '../context/userContext';
import Validation from '../components/Validation';
import themeContext from '../context/themeContext';

const SIGN_UP_MUTATION = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $name: String!
    $carrera: String!
    $carnet: String!
    $role: String!
    $joined: String!
  ) {
    signUp(
      input: {
        email: $email
        password: $password
        name: $name
        carrera: $carrera
        carnet: $carnet
        role: $role
        joined: $joined
      }
    ) {
      token
      user {
        id
        name
        email
        carrera
        carnet
        role
        joined
      }
    }
  }
`;

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
        Alert.alert(
          'Sin conexión. Chequea tu conexión a internet e intenta de nuevo.'
        );
      } else {
        Alert.alert('Credenciales inválidas. Intente de nuevo.');
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
      if (!email.includes('@')) {
        showMessage({
          message: 'Error',
          description: 'Correo inválido.',
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
      } else if (carnet.length < 11 || carnet.length > 11) {
        showMessage({
          message: 'Error',
          description: 'Carnet inválido.',
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
      } else if (!validationsPassword) {
        showMessage({
          message: 'Error',
          description: 'La contraseña no cumple con los requisitos.',
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
      } else if (password !== confirmPassword) {
        showMessage({
          message: 'Error',
          description: 'Las contraseñas no coinciden.',
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
      } else {
        let role = 'user';
        let joined = dayjs().format('DD MMM YYYY');
        signUp({
          variables: { carrera, email, password, carnet, name, role, joined },
        });
      }
    } else {
      showMessage({
        message: 'Error',
        description: 'Los campos no pueden quedar vacios.',
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
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            title='Correo Electrónico'
            placeholder='Ingrese su dirección de correo'
            text={email}
            onChangeText={(newText) => setEmail(newText.toLowerCase())}
          />
          <Input
            style={styles.input}
            title='Nombre y Apellido'
            placeholder='Ingrese su nombre y apellido'
            text={name}
            onChangeText={(newText) => setName(newText)}
          />
          <Input
            style={styles.input}
            title='Carnet'
            placeholder='Ingresa tu carnet UNIMET'
            text={carnet}
            onChangeText={(newText) => setCarnet(newText)}
          />

          <CarreraSelect carrera={carrera} setCarrera={setCarrera} />
          <Input
            style={styles.input}
            title='Contraseña'
            placeholder='Ingrese su contraseña'
            isPassword={true}
            text={password}
            onChangeText={(newText) => setPassword(newText)}
          />
          <Input
            style={styles.input}
            title='Confirmar Contraseña'
            placeholder='Repita la contraseña'
            isPassword={true}
            text={confirmPassword}
            onChangeText={(newText) => setConfirmPassword(newText)}
            onSubmit={handleSignUp}
          />
        </View>
        <View style={styles.validations}>
          <Validation
            icon={
              validations.eightCharacters ? (
                <Ionicons
                  name='md-checkmark-sharp'
                  size={15}
                  color={colors.green}
                />
              ) : (
                <Feather name='x' size={15} color={colors.gray} />
              )
            }
            text='Al menos 8 caracteres'
          />

          <Validation
            icon={
              validations.upperAndLower ? (
                <Ionicons
                  name='md-checkmark-sharp'
                  size={15}
                  color={colors.green}
                />
              ) : (
                <Feather name='x' size={15} color={colors.gray} />
              )
            }
            text='Al menos 1 mayuscula y 1 minuscula'
          />
          <Validation
            icon={
              validations.numeric ? (
                <Ionicons
                  name='md-checkmark-sharp'
                  size={15}
                  color={colors.green}
                />
              ) : (
                <Feather name='x' size={15} color={colors.gray} />
              )
            }
            text='Al menos 1 numero'
          />
          <Validation
            icon={
              validations.specialChar ? (
                <Ionicons
                  name='md-checkmark-sharp'
                  size={15}
                  color={colors.green}
                />
              ) : (
                <Feather name='x' size={15} color={colors.gray} />
              )
            }
            text='Al menos 1 caracter especial'
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleSignUp();
            }}
            disabled={loading}
          >
            <View style={styles.btnSignIn}>
              {loading ? (
                <ActivityIndicator size='small' color='#FFF' />
              ) : (
                <Text style={styles.textSignIn}>Registrarse</Text>
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.noAccount}>
            <Text style={styles.textNoAction}>Ya tiene una cuenta?</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              <Text style={styles.textAction}>Iniciar Sesión</Text>
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
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 15,
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
  validations: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  footer: {
    marginBottom: 80,
  },
});
