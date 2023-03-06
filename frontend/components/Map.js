import { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
/* Assets */
import floor1 from '../assets/img/piso1.png';
import floor2 from '../assets/img/piso2.png';
import mesaVerde from '../assets/img/mesaVerde.png';
import mesaRoja from '../assets/img/mesaRoja.png';
import mesaMorada from '../assets/img/mesaMorada.png';
import { MaterialIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
/* Context */
import themeContext from '../context/themeContext';
import { userContext } from '../context/userContext';
import Tag from './Tag';

const Map = ({ floor, resInfo, inputValidation, navigation }) => {
  var positions = {
    floor1: [
      {
        left: 4,
        bottom: 148,
        rotate: false,
        active: false,
      },
      {
        left: 4,
        bottom: 226,
        rotate: false,
        active: false,
      },
      {
        left: 27,
        bottom: 256,
        rotate: true,
        active: false,
      },
      {
        left: 54,
        bottom: 256,
        rotate: true,
        active: false,
      },
      {
        left: 124,
        bottom: 256,
        rotate: true,
        active: false,
      },
      {
        left: 154,
        bottom: 256,
        rotate: true,
        active: false,
      },
    ],
    floor2: [
      {
        left: 4,
        bottom: 148,
        rotate: false,
        active: false,
      },
      {
        left: 4,
        bottom: 226,
        rotate: false,
        active: false,
      },
      {
        left: 27,
        bottom: 256,
        rotate: true,
        active: false,
      },
      {
        left: 54,
        bottom: 256,
        rotate: true,
        active: false,
      },
      {
        left: 124,
        bottom: 256,
        rotate: true,
        active: false,
      },
      {
        left: 154,
        bottom: 256,
        rotate: true,
        active: false,
      },
      {
        left: 225,
        bottom: 123,
        rotate: false,
        active: false,
      },
      {
        left: 225,
        bottom: 96,
        rotate: false,
        active: false,
      },
      {
        left: 225,
        bottom: 70,
        rotate: false,
        active: false,
      },
    ],
  };

  useEffect(() => {
    setCurrentlyPressed({ index: -1, active: false, cubicle: -1 });
  }, [floor]);

  const [currentlyPressed, setCurrentlyPressed] = useState({
    index: -1,
    active: false,
    cubicle: null,
  });

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

  const handleMesaColor = (cubicle) => {
    if (currentlyPressed.active) {
      return mesaMorada;
    } else {
      if (cubicle.availability) {
        return mesaVerde;
      } else {
        return mesaRoja;
      }
    }
  };

  const Mesa = ({ left, bottom, rotate, cubicle, counterfloor }) => {
    return (
      <TouchableOpacity
        style={[styles.mesaWrapper, { left: left, bottom: bottom }]}
        onPress={() => {
          if (user.role === 'admin') {
            setCurrentlyPressed({
              index: counterfloor,
              active: !currentlyPressed.active,
              cubicle: cubicle,
            });
          } else {
            if (!checkIfHasAnActiveReservation()) {
              setCurrentlyPressed({
                index: counterfloor,
                active: !currentlyPressed.active,
                cubicle: cubicle,
              });
            }
          }
        }}
        activeOpacity={1}
      >
        <Image
          source={handleMesaColor(cubicle)}
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
        {/* RENDER EACH TABLE */}
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
                  counterfloor={counterfloor1}
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
                  counterfloor={counterfloor2}
                />
              );
            }
          } else {
            return null;
          }
        })}
        {/* INFO BUBBLE */}
        {currentlyPressed.active && (
          <TouchableOpacity
            style={[
              styles.bubbleWrapper,
              {
                backgroundColor: theme.white,
                left:
                  floor === '1'
                    ? positions.floor1[currentlyPressed.index].left - 10
                    : positions.floor2[currentlyPressed.index].left - 10,
                bottom:
                  floor === '1'
                    ? positions.floor1[currentlyPressed.index].bottom + 30
                    : positions.floor2[currentlyPressed.index].bottom + 30,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => {
              if (user.role === 'admin') {
                handleForwardNavigation(currentlyPressed.cubicle);
              } else {
                if (!checkIfHasAnActiveReservation()) {
                  handleForwardNavigation(currentlyPressed.cubicle);
                }
              }
            }}
          >
            <View>
              <View
                style={{
                  borderColor: theme.purple,
                  borderLeftWidth: 2,
                }}
              >
                <Text
                  style={[styles.cubicleTitle, { color: theme.dark }]}
                >{`Cubículo #${currentlyPressed.cubicle.cubicleNumber}`}</Text>
                <View style={styles.tagsWrapper}>
                  <Tag name='x6' icon='person' fontSize={8} iconSize={5} />
                  <Tag name='Board' fontSize={8} />
                </View>
              </View>
            </View>
            <View
              style={[styles.bubbleBottom, { borderBottomColor: theme.white }]}
            />
          </TouchableOpacity>
        )}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  mesa: {
    height: 19,
    width: 19,
    resizeMode: 'contain',
  },
  bubbleWrapper: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingLeft: 10,
    height: 50,
    position: 'absolute',
    zIndex: 100,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    paddingLeft: 8,
    zIndex: 1000000,
  },
  cubicleTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 10,
    letterSpacing: 0.6,
    marginLeft: 6,
    marginBottom: 3,
  },
  tagsWrapper: {
    flexDirection: 'row',
    paddingLeft: 8,
  },
  bubbleBottom: {
    position: 'absolute',
    bottom: -15,
    left: 4,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 20,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '180deg' }],
    zIndex: -10,
  },
});
