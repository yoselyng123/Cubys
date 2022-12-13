import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* Assets */
import colors from '../assets/colors';
import { userContext } from '../context/userContext';
/* Components */
import Header from '../components/Header';
import Input from '../components/Input';
import DateInput from '../components/DateInput';
/* APOLLO SERVER */
import SplashScreen from './SplashScreen';
import { gql, useMutation } from '@apollo/client';

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $password: String!) {
    updateUser(id: $id, password: $password) {
      token
      user {
        id
        email
        carnet
        carrera
        name
      }
    }
  }
`;

const Profile = ({ navigation }) => {
  const { user, setUser } = useContext(userContext);
  const [validations, setValidations] = useState({
    eightCharacters: false,
    upperAndLower: false,
    numeric: false,
    specialChar: false,
  });
  const [password, setPassword] = useState('');
  const [emptyPassword, setEmptyPassword] = useState(true);

  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: (data) => {
      // Store Token
      AsyncStorage.removeItem('token');
      AsyncStorage.setItem('token', data.updateUser.token).then(() => {
        setUser(data.updateUser.user);
      });
      Alert.alert(
        'Modificación Exitosa!',
        'Se ha cambiado exitosamente la contraseña'
      );
      setPassword('');
    },
    onError: ({ networkError }) => {
      if (networkError) {
        Alert.alert(
          'Sin conexión. Chequea tu conexión a internet e intenta de nuevo.'
        );
      } else {
        Alert.alert('Error. Intenta de nuevo.');
      }
    },
  });

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

  const handleSignOut = async () => {
    // Remove token from phone storage
    await AsyncStorage.removeItem('token');
    navigation.navigate('Welcome');
    setUser(null);
  };

  const handleSaveChanges = () => {
    // Validate secure password
    let validationsPassword =
      validations.eightCharacters &&
      validations.numeric &&
      validations.specialChar &&
      validations.upperAndLower;

    if (password !== '') {
      if (!validationsPassword) {
        Alert.alert(
          'Error',
          'Verifique que la contraseña contenga: \n1. Al menos una mayúscula y una minúscula.\n2. Al menos un número.\n3. Al menos un carácter especial.\n4. Al menos 8 carácteres.'
        );
      } else {
        Alert.alert(
          'Confirmación de cambios',
          'Esta seguro que desea cambiar su contraseńa?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Confirmar',
              onPress: () => {
                var id = user.id;
                updateUser({
                  variables: { id, password },
                });
              },
            },
          ]
        );
      }
    }
  };

  useEffect(() => {
    if (password === '') {
      setEmptyPassword(true);
    } else {
      setEmptyPassword(false);
    }

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

  if (user) {
    return (
      <View style={styles.container}>
        <Header title='cubys' navigateAvailable={false} />

        <View style={styles.content}>
          <Image
            source={{
              uri: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileJob}>{user.carrera}</Text>
          <ScrollView
            style={styles.inputContainer}
            showsVerticalScrollIndicator={false}
          >
            <Input
              style={styles.input}
              title='Email Address'
              placeholder='Ingrese el correo'
              isPassword={false}
              text={user.email}
              isSignInPassword={false}
              disabled={true}
            />
            <Input
              style={styles.input}
              title='Password'
              placeholder='Ingrese la nueva contraseña'
              isPassword={true}
              text={password}
              onChangeText={(newText) => setPassword(newText)}
              disabled={loading}
            />
            <Input
              style={styles.input}
              title='Carnet'
              placeholder='Ingrese su carnet UNIMET'
              isPassword={false}
              text={user.carnet}
              disabled={true}
            />
            {/* <DateInput
              style={styles.input}
              title='Birth Date (Optional)'
              placeholder='Enter your birth date'
            /> */}
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.joinedtext}>
              Joined <Text style={styles.joineddate}>22 Jan 2022</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {!emptyPassword && !loading && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handleSaveChanges();
                  }}
                >
                  <Text style={styles.save}>Save</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  handleSignOut();
                }}
              >
                <Text style={styles.logout}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return <SplashScreen />;
  }
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 64,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 30,
    width: '100%',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: colors.dark,
    marginTop: 10,
    letterSpacing: 0.6,
  },
  profileJob: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    color: colors.gray,
    marginTop: 5,
    letterSpacing: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 10,
  },
  logout: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    color: colors.red,
    letterSpacing: 0.6,
  },
  save: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    color: colors.purple,
    letterSpacing: 0.6,
    marginRight: 25,
  },
  joinedtext: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    color: colors.gray,
    letterSpacing: 0.6,
  },
  joineddate: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    color: colors.dark,
    letterSpacing: 0.6,
  },
  saveChangesBtn: {
    backgroundColor: colors.purple,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  saveChangesText: {
    color: '#FFF',
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.6,
  },
});
