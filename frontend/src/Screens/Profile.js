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
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';
import blankProfile from '../assets/img/blankProfile.png';
import useToastMessage from '../hooks/useToastMessage';
/* Components */
import Header from '../components/Header';
import Input from '../components/Input';
import Loading from '../components/Loading';
/* APOLLO SERVER */
import SplashScreen from './SplashScreen';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from '../hooks/mutations';

const Profile = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { user, setUser } = useContext(userContext);
  const { showToast } = useToastMessage();

  const [validations, setValidations] = useState({
    eightCharacters: false,
    upperAndLower: false,
    numeric: false,
    specialChar: false,
  });
  const [password, setPassword] = useState('');
  const [emptyPassword, setEmptyPassword] = useState(true);

  const [updateUser, { loading: loadingUpdateUser }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: (data) => {
        // Store Token
        AsyncStorage.removeItem('token');
        AsyncStorage.setItem('token', data.updateUser.token).then(() => {
          setUser(data.updateUser.user);
        });
        showToast({
          type: 'successToast',
          title: 'Modificación Exitosa',
          message: 'Se ha cambiado la contraseña.',
        });
        setPassword('');
      },
      onError: ({ networkError }) => {
        if (networkError) {
          showToast({
            type: 'errorToast',
            title: 'Error',
            message:
              'Sin conexión. Chequea tu conexión a internet e intenta de nuevo.',
          });
        } else {
          showToast({
            type: 'errorToast',
            title: 'Error',
            message: 'Intenta de nuevo.',
          });
        }
      },
    }
  );

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
    Alert.alert('Confirmación', 'Esta seguro que desea cerrar su sesión?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          setUser(null);
          navigation.navigate('Welcome');
          await AsyncStorage.removeItem('firstTimeSignIn');
        },
      },
    ]);
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
        showToast({
          type: 'errorToast',
          title: 'Error',
          message:
            'Verifique que la contraseña contenga: \n1. Al menos una mayúscula y una minúscula.\n2. Al menos un número.\n3. Al menos un carácter especial.\n4. Al menos 8 carácteres.',
        });
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
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title='cubys' navigateAvailable={false} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentWrapper}
          alwaysBounceVertical={false}
        >
          <View>
            <View style={styles.userTopContainer}>
              <Image source={blankProfile} style={styles.profileImage} />
              <Text style={[styles.profileName, { color: theme.dark }]}>
                {user.name}
              </Text>
              <Text style={[styles.profileJob, { color: theme.gray }]}>
                {user.carrera}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                style={styles.input}
                title='Correo Electrónico'
                placeholder='Ingrese el correo'
                isPassword={false}
                text={user.email}
                isSignInPassword={false}
                disabled={true}
              />
              <Input
                style={styles.input}
                title='Contraseña'
                placeholder='Ingrese la nueva contraseña'
                isPassword={true}
                text={password}
                onChangeText={(newText) => setPassword(newText)}
                disabled={loadingUpdateUser}
              />
              <Input
                style={styles.input}
                title='Carnet'
                placeholder='Ingrese su carnet UNIMET'
                isPassword={false}
                text={user.carnet}
                disabled={true}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.joinedWrapper}>
              <Text style={[styles.joinedtext, { color: theme.gray }]}>
                Joined{'  '}
                <Text style={[styles.joineddate, { color: theme.dark }]}>
                  {user.joined}
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {!emptyPassword && !loadingUpdateUser && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handleSaveChanges();
                  }}
                >
                  <Text style={[styles.save, { color: theme.purple }]}>
                    Save
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  handleSignOut();
                }}
              >
                <Text style={[styles.logout, { color: theme.red }]}>
                  Cerrar Sesión
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Loading show={loadingUpdateUser} />
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
  },
  contentWrapper: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  userTopContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 30,
    width: '100%',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    marginTop: 10,
    letterSpacing: 0.6,
  },
  profileJob: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    marginTop: 5,
    letterSpacing: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  joinedWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.6,
  },
  save: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.6,
    marginRight: 25,
  },
  joinedtext: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.6,
  },
  joineddate: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.6,
  },
  saveChangesBtn: {
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
