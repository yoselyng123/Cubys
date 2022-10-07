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
import colors from '../assets/colors';
import Header from '../components/Header';
import Input from '../components/Input';
/* ICONS */
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
/* APOLLO SERVER */
import { useMutation, gql } from '@apollo/client';
import { userContext } from '../context/userContext';

const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp(input: { email: $email, password: $password, name: $name }) {
      token
      user {
        id
        name
      }
    }
  }
`;

const SignUp = ({ navigation }) => {
  const { setUser } = useContext(userContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        variables: { name, email, password },
      });
    } else {
      Alert.alert('Passwords do not match');
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

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            title='Name'
            placeholder='Enter your name'
            text={name}
            onChangeText={(newText) => setName(newText)}
          />
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
            text={password}
            onChangeText={(newText) => setPassword(newText)}
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
          <View style={styles.validationItem}>
            <Ionicons
              name='md-checkmark-sharp'
              size={15}
              color={colors.green}
            />
            <Text style={styles.validationText}>At least 7 characters</Text>
          </View>
          <View style={styles.validationItem}>
            <Ionicons
              name='md-checkmark-sharp'
              size={15}
              color={colors.green}
            />
            <Text style={styles.validationText}>
              At least 1 lowercase and 1 uppercase
            </Text>
          </View>
          <View style={styles.validationItem}>
            <Ionicons
              name='md-checkmark-sharp'
              size={15}
              color={colors.green}
            />
            <Text style={styles.validationText}>At least 1 number</Text>
          </View>
          <View style={styles.validationItem}>
            <Feather name='x' size={15} color={colors.gray} />
            <Text style={styles.validationText}>
              At least 1 special character
            </Text>
          </View>
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
      </View>
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
  validations: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  validationText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 11,
    color: colors.gray,
    letterSpacing: 0.6,
    marginLeft: 5,
  },
});
