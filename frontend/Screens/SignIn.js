import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* ASSETS */
import { StatusBar } from 'expo-status-bar';
import { userContext } from '../context/userContext';
import colors from '../assets/colors';
import Header from '../components/Header';
import Input from '../components/Input';
/* APOLLO SERVER */
import { useMutation, gql } from '@apollo/client';

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        carnet
        carrera
        email
      }
    }
  }
`;

const SignIn = ({ navigation }) => {
  const { setUser } = useContext(userContext);
  // State for User input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: (data) => {
      // Store Token
      AsyncStorage.setItem('token', data.signIn.token).then(() => {
        setUser(data.signIn.user);
        // Redirect to HomeScreen
        navigation.navigate('Tabs');
      });
    },
    onError: () => {
      Alert.alert('Invalid credentials. Please try again');
    },
  });

  const handleSignIn = () => {
    // AQUI SE MANEJA EL INPUT DEL USUARIO
    signIn({
      variables: { email, password },
    });
  };

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title='Sign In'
        navigateAvailable={true}
        navigation={navigation}
      />

      <View style={styles.content}>
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
            title='Password'
            placeholder='Enter your password'
            isPassword={true}
            isSignInPassword={true}
            text={password}
            onChangeText={(newText) => setPassword(newText)}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleSignIn();
            }}
          >
            <View style={styles.btnSignIn}>
              {loading ? (
                <ActivityIndicator size='small' color='#FFF' />
              ) : (
                <Text style={styles.textSignIn}>Sign In</Text>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.noAccount}>
            <Text style={styles.textNoAction}>No account yet?</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              <Text style={styles.textAction}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style='dark' />
    </View>
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
    paddingBottom: 64,
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
