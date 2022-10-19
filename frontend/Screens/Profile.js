import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useContext } from 'react';
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

const Profile = ({ navigation }) => {
  const { user, setUser } = useContext(userContext);

  const handleSignOut = async () => {
    // Remove token from phone storage
    await AsyncStorage.removeItem('token');
    navigation.navigate('Welcome');
    setUser(null);
  };

  console.log(user.email);

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
              placeholder='Enter your email'
              isPassword={false}
              text={user.email}
              isSignInPassword={false}
              disabled={true}
            />
            <Input
              style={styles.input}
              title='Password'
              placeholder='Enter your password'
              isPassword={true}
            />
            <Input
              style={styles.input}
              title='Carnet'
              placeholder='Enter your password'
              isPassword={false}
              text={user.carnet}
            />
            <DateInput
              style={styles.input}
              title='Birth Date (Optional)'
              placeholder='Enter your birth date'
            />
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.joinedtext}>
              Joined <Text style={styles.joineddate}>22 Jan 2022</Text>
            </Text>
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
