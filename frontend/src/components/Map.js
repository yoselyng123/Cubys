import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
/* Assets */
import floor1 from '../assets/img/piso1.png';
import floor2 from '../assets/img/piso2.png';
/* Context */
import { userContext } from '../context/userContext';
/* Components */
import MesaBubble from './MesaBubble';

const Map = ({ floor, setSelectedCubicle }) => {
  const positions = {
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
        left: '43%',
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
  };
  const [cubiclesData, setCubiclesData] = useState([]);

  const { cubiclesList } = useContext(userContext);

  useEffect(() => {
    let newCubiclesList = cubiclesList.map((item) => {
      item.isSelected = false;
      console.log(
        `Cubicle N: ${item.cubicleNumber} --- Availability: ${item.availability}`
      );
      return { ...item };
    });
    setCubiclesData(newCubiclesList);
  }, []);

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
                <MesaBubble
                  positions={positions}
                  cubicle={cubicle}
                  floor={floor}
                  key={index}
                  counterfloor={counterfloor1}
                  setCubiclesData={setCubiclesData}
                  cubiclesData={cubiclesData}
                  setSelectedCubicle={setSelectedCubicle}
                />
              );
            } else {
              counterfloor2++;
              return (
                <MesaBubble
                  positions={positions}
                  cubicle={cubicle}
                  floor={floor}
                  key={index}
                  counterfloor={counterfloor2}
                  setCubiclesData={setCubiclesData}
                  cubiclesData={cubiclesData}
                  setSelectedCubicle={setSelectedCubicle}
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
});
