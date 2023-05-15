import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
/* ASSETS */
import colors from '../assets/colors';
import unimetLogo from '../assets/img/UnimetLogo.png';
import themeContext from '../context/themeContext';
import { useContext } from 'react';

const Welcome = ({ navigation }) => {
  const theme = useContext(themeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.purple }]}>
      <SafeAreaView>
        <Text style={styles.title}>cubys</Text>
      </SafeAreaView>
      <View style={styles.welcomeContainer}>
        <View style={styles.unimetLogoWrapper}>
          <Image source={unimetLogo} style={styles.unimetLogoImg} />
        </View>

        <Text style={styles.subtitle}>Bienvenido</Text>
        <Text style={styles.description}>
          Reserva cubículos desde{'\n'}cualquier lugar en la UNIMET
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          <View style={styles.btnSignIn}>
            <Text style={styles.textSignIn}>Iniciar Sesión</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.noAccount}>
          <Text style={styles.textNoAction}>No tienes cuenta?</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Text style={styles.textAction}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style='light' />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 64,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Gilroy-Semibold',
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    color: '#fff',
    marginBottom: 7,
    letterSpacing: 0.6,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.6,
  },
  btnSignIn: {
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textSignIn: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: colors.dark,
    letterSpacing: 0.6,
  },
  btnSignInGoogle: {
    borderColor: '#fff',
    borderWidth: 2,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  textSignInGoogle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
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
    color: '#fff',
    letterSpacing: 0.6,
  },
  textNoAction: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.6,
  },
  unimetLogoWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unimetLogoImg: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: '3%',
    resizeMode: 'contain',
  },
});
