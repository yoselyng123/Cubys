import { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
/* Assets */
import floor1 from '../assets/img/piso1.png';
import floor2 from '../assets/img/piso2.png';
import mesaVerde from '../assets/img/mesaVerde.png';
import themeContext from '../context/themeContext';

const Map = ({ floor }) => {
  const theme = useContext(themeContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={floor === '1' ? floor1 : floor2}
        resizeMode='contain'
        style={styles.img}
      >
        <TouchableOpacity
          style={styles.mesaWrapper}
          onPress={() => {
            Alert.alert('CLICKED');
          }}
          activeOpacity={0.7}
        >
          <Image source={mesaVerde} style={styles.mesa} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300,
    position: 'relative',
  },
  mesaWrapper: {
    position: 'absolute',
    left: 4,
    bottom: 148,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mesa: {
    height: 19,
    width: 19,
    resizeMode: 'contain',
  },
});
