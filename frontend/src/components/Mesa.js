import {
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import mesaVerde from '../assets/img/mesaVerde.png';
import mesaRoja from '../assets/img/mesaRoja.png';
import mesaMorada from '../assets/img/mesaMorada.png';

const Mesa = ({
  left,
  bottom,
  rotate,
  cubicle,
  cubiclesData,
  setCubiclesData,
  setSelectedCubicle,
}) => {
  const { width } = useWindowDimensions();

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

  return (
    <TouchableOpacity
      style={[styles.mesaWrapper, { left: left, bottom: bottom }]}
      onPress={() => {
        let arr = cubiclesData.map((item) => {
          if (item.id === cubicle.id) {
            if (item.isSelected) {
              setSelectedCubicle(null);
            } else {
              setSelectedCubicle(cubicle);
            }
            item.isSelected = !item.isSelected;
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

export default Mesa;

const styles = StyleSheet.create({
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
