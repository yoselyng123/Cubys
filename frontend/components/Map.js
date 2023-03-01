import { useContext, useEffect } from 'react';
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
import mesaRoja from '../assets/img/mesaRoja.png';
import { MaterialIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
/* Context */
import themeContext from '../context/themeContext';
import { userContext } from '../context/userContext';

const Map = ({ floor, resInfo, inputValidation, navigation }) => {
  const positions = {
    floor1: [
      {
        left: 4,
        bottom: 148,
        rotate: false,
      },
      {
        left: 4,
        bottom: 226,
        rotate: false,
      },
      {
        left: 27,
        bottom: 256,
        rotate: true,
      },
      {
        left: 54,
        bottom: 256,
        rotate: true,
      },
      {
        left: 124,
        bottom: 256,
        rotate: true,
      },
      {
        left: 154,
        bottom: 256,
        rotate: true,
      },
    ],
    floor2: [
      {
        left: 4,
        bottom: 148,
        rotate: false,
      },
      {
        left: 4,
        bottom: 226,
        rotate: false,
      },
      {
        left: 27,
        bottom: 256,
        rotate: true,
      },
      {
        left: 54,
        bottom: 256,
        rotate: true,
      },
      {
        left: 124,
        bottom: 256,
        rotate: true,
      },
      {
        left: 154,
        bottom: 256,
        rotate: true,
      },
      {
        left: 225,
        bottom: 123,
        rotate: false,
      },
      {
        left: 225,
        bottom: 96,
        rotate: false,
      },
      {
        left: 225,
        bottom: 70,
        rotate: false,
      },
    ],
  };

  const theme = useContext(themeContext);

  const { myReservations, user, cubiclesList } = useContext(userContext);

  const checkIfHasAnActiveReservation = () => {
    if (myReservations.length < 1) {
      return false;
    } else {
      showMessage({
        message: 'Error',
        description: 'Ya tiene una reservación activa.',
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
      return true;
    }
  };

  const handleForwardNavigation = (cubicle) => {
    if (inputValidation()) {
      if (cubicle.availability) {
        navigation.navigate('ReservationDetails', {
          cubicleInfo: cubicle,
          resInfo: resInfo,
        });
      } else {
        showMessage({
          message: 'Error',
          description:
            'El cubículo se encuentra ocupado en el bloque de hora seleccionado.',
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
    }
  };

  const Mesa = ({ left, bottom, rotate, cubicle }) => {
    return (
      <TouchableOpacity
        style={[styles.mesaWrapper, { left: left, bottom: bottom }]}
        onPress={() => {
          if (user.role === 'admin') {
            handleForwardNavigation(cubicle);
          } else {
            if (!checkIfHasAnActiveReservation()) {
              handleForwardNavigation(cubicle);
            }
          }
        }}
        activeOpacity={0.7}
      >
        <Image
          source={cubicle.availability ? mesaVerde : mesaRoja}
          style={[styles.mesa, rotate && { transform: [{ rotate: '90deg' }] }]}
        />
      </TouchableOpacity>
    );
  };

  var counterfloor1 = -1;
  var counterfloor2 = -1;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={floor === '1' ? floor1 : floor2}
        resizeMode='contain'
        style={styles.img}
      >
        {cubiclesList.map((cubicle, index) => {
          if (cubicle.floor === floor) {
            if (floor === '1') {
              counterfloor1++;
              return (
                <Mesa
                  left={positions.floor1[counterfloor1].left}
                  bottom={positions.floor1[counterfloor1].bottom}
                  rotate={positions.floor1[counterfloor1].rotate}
                  cubicle={cubicle}
                  key={index}
                />
              );
            } else {
              counterfloor2++;
              return (
                <Mesa
                  left={positions.floor2[counterfloor2].left}
                  bottom={positions.floor2[counterfloor2].bottom}
                  rotate={positions.floor2[counterfloor2].rotate}
                  cubicle={cubicle}
                  key={index}
                />
              );
            }
          } else {
            return null;
          }
        })}
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
