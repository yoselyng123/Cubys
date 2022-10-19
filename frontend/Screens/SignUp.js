import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* ASSETS */
import { StatusBar } from 'expo-status-bar';
import colors from '../assets/colors';
import Header from '../components/Header';
import Input from '../components/Input';
/* ICONS */
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
/* APOLLO SERVER */
import { useMutation, gql } from '@apollo/client';
import { userContext } from '../context/userContext';
import Validation from '../components/Validation';

const SIGN_UP_MUTATION = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $name: String!
    $carrera: String!
    $carnet: String!
  ) {
    signUp(
      input: {
        email: $email
        password: $password
        name: $name
        carrera: $carrera
        carnet: $carnet
      }
    ) {
      token
      user {
        id
        name
        carrera
        carnet
      }
    }
  }
`;

const SignUp = ({ navigation }) => {
  const { setUser } = useContext(userContext);
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
        // Redirect to HomeScreen
        navigation.navigate('Tabs');
      });
    },
    onError: () => {
      Alert.alert('Invalid credentials. Please try again');
    },
  });

  const handleSignUp = () => {
    // AQUI SE MANEJA EL INPUT DEL USUARIO
    if (password === confirmPassword) {
      signUp({
        variables: { carrera, email, password, carnet, name },
      });
    } else {
      Alert.alert('Passwords do not match.');
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

  const handleInputPassword = (newInput) => {
    setPassword(newInput);
  };

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
    <View style={styles.container}>
      <Header
        style={styles.header}
        title='Sign Up'
        navigateAvailable={true}
        navigation={navigation}
      />

      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            title='Email Address'
            placeholder='Enter your email'
            text={email}
            onChangeText={(newText) => setEmail(newText.toLowerCase())}
          />
          <Input
            style={styles.input}
            title='Name'
            placeholder='Enter your name'
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
          <Input
            style={styles.input}
            title='Carrera'
            placeholder='Ingresa la carrera que cursas'
            text={carrera}
            onChangeText={(newText) => setCarrera(newText)}
          />
          <Input
            style={styles.input}
            title='Password'
            placeholder='Enter your password'
            isPassword={true}
            text={password}
            onChangeText={(newText) => handleInputPassword(newText)}
          />
          <Input
            style={styles.input}
            title='Confirm Password'
            placeholder='Repeat your password'
            isPassword={true}
            text={confirmPassword}
            onChangeText={(newText) => setConfirmPassword(newText)}
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
                <Text style={styles.textSignIn}>Sign Up</Text>
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.noAccount}>
            <Text style={styles.textNoAction}>Already got an account?</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              <Text style={styles.textAction}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style='dark' />
    </View>
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
    paddingBottom: 40,
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
