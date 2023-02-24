import { StyleSheet, Text, View, Image } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import floor1 from '../assets/img/floor1.jpeg';

const Map = () => {
  return (
    <View style={styles.container}>
      <Svg height='50%' width='50%' viewBox='0 0 100 100'>
        <Image source={floor1} style={styles.img} />
        {/* <Rect
          x='15'
          y='15'
          width='70'
          height='70'
          stroke='red'
          strokeWidth='2'
          fill='yellow'
        /> */}
      </Svg>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: 300,
    height: 360,
    transform: [{ rotate: '90deg' }],
  },
});
