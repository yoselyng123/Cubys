import { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
/* Assets */
import floor1 from '../assets/img/piso1.png';
import floor2 from '../assets/img/piso2.png';
import mesaVerde from '../assets/img/mesaVerde.png';
import mesaRoja from '../assets/img/mesaRoja.png';
import mesaMorada from '../assets/img/mesaMorada.png';
/* Context */
import { userContext } from '../context/userContext';
import InfoBubble from './InfoBubble';

const Map = ({ floor, setSelectedCubicle }) => {
  const { width } = useWindowDimensions();
  const [positions, setPositions] = useState({
    floor1: [
      {
        left: '1.1%',
        bottom: '49.3%',
        rotate: false,
        active: false,
      },
      {
        left: '1.1%',
        bottom: '71%',
        rotate: false,
        active: false,
      },
      {
        left: '7.5%',
        bottom: '79.5%',
        rotate: true,
        active: false,
      },
      {
        left: '15%',
        bottom: '79.5%',
        rotate: true,
        active: false,
      },
      {
        left: '34.8%',
        bottom: '79.5%',
        rotate: true,
        active: false,
      },
      {
        left: '42.8%',
        bottom: '79.5%',
        rotate: true,
        active: false,
      },
    ],
    floor2: [
      {
        left: '1.1%',
        bottom: '49.3%',
        rotate: false,
        active: false,
      },
      {
        left: '1.1%',
        bottom: '71%',
        rotate: false,
        active: false,
      },
      {
        left: '7.5%',
        bottom: '79.5%',
        rotate: true,
        active: false,
      },
      {
        left: '15%',
        bottom: '79.5%',
        rotate: true,
        active: false,
      },
      {
        left: '34.8%',
        bottom: '79.5%',
        rotate: true,
        active: false,
      },
      {
        left: '43.1%',
        bottom: '79.5%',
        rotate: true,
        active: false,
      },
      {
        left: '63%',
        bottom: '42.3%',
        rotate: false,
        active: false,
      },
      {
        left: '63%',
        bottom: '35.1%',
        rotate: false,
        active: false,
      },
      {
        left: '63%',
        bottom: '28%',
        rotate: false,
        active: false,
      },
    ],
  });
  const [cubiclesData, setCubiclesData] = useState([]);

  const { cubiclesList } = useContext(userContext);

  useEffect(() => {
    let newCubiclesList = cubiclesList.map((item, index) => {
      item.isSelected = false;
      return { ...item };
    });
    setCubiclesData(newCubiclesList);
  }, []);

  const handleMesaColor = (cubicle) => {
    if (cubicle.availability) {
      if (cubicle.isSelected) {
        return mesaMorada;
      }
      return mesaVerde;
    } else {
      return mesaRoja;
    }
  };

  const Mesa = ({ left, bottom, rotate, cubicle }) => {
    return (
      <TouchableOpacity
        style={[styles.mesaWrapper, { left: left, bottom: bottom }]}
        onPress={() => {
          let arr = cubiclesData.map((item) => {
            if (item.id === cubicle.id) {
              item.isSelected = !item.isSelected;
              setSelectedCubicle(cubicle);
            } else {
              item.isSelected = false;
            }
            return item;
          });
          setCubiclesData(arr);
        }}
      >
        <Image
          source={handleMesaColor(cubicle)}
          style={[
            styles.mesa,
            rotate && {
              transform: [{ rotate: '90deg' }],
            },
            {
              minHeight: 19,
              minWidth: 19,
              width: width * 0.05,
              height: width * 0.05,
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  var counterfloor1 = -1;
  var counterfloor2 = -1;

  return (
    <View style={[styles.container, { width: '100%', aspectRatio: 1 }]}>
      <ImageBackground
        source={floor === '1' ? floor1 : floor2}
        resizeMode='contain'
        style={[styles.img]}
      >
        {/* RENDER EACH TABLE */}
        {cubiclesData.map((cubicle, index) => {
          if (cubicle.floor === floor) {
            if (floor === '1') {
              counterfloor1++;
              return (
                <>
                  <Mesa
                    left={positions.floor1[counterfloor1].left}
                    bottom={positions.floor1[counterfloor1].bottom}
                    rotate={positions.floor1[counterfloor1].rotate}
                    cubicle={cubicle}
                    key={index}
                  />
                  {/* INFO BUBBLE */}
                  {cubicle.isSelected ? (
                    <InfoBubble
                      left={positions.floor1[counterfloor1].left}
                      bottom={positions.floor1[counterfloor1].bottom}
                      selectedCubicle={cubicle}
                      floor={floor}
                    />
                  ) : null}
                </>
              );
            } else {
              counterfloor2++;
              return (
                <>
                  <Mesa
                    left={positions.floor2[counterfloor2].left}
                    bottom={positions.floor2[counterfloor2].bottom}
                    rotate={positions.floor2[counterfloor2].rotate}
                    cubicle={cubicle}
                    key={index}
                  />
                  {/* INFO BUBBLE */}
                  {cubicle.isSelected ? (
                    <InfoBubble
                      left={positions.floor2[counterfloor2].left}
                      bottom={positions.floor2[counterfloor2].bottom}
                      selectedCubicle={cubicle}
                      floor={floor}
                    />
                  ) : null}
                </>
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
    alignSelf: 'center',
    maxHeight: 500,
    maxWidth: 500,
  },
  img: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  mesaWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mesa: {
    resizeMode: 'contain',
    maxHeight: 26,
    maxWidth: 26,
  },
});
