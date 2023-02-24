import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContext, useState, useEffect } from 'react';
/* Assets */
import themeContext from '../context/themeContext';
import { Feather } from '@expo/vector-icons';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';

const CubicleAccessCard = () => {
  const theme = useContext(themeContext);

  // value for Switch Animation
  const switchTranslate = useSharedValue(0);
  // state for activate Switch
  const [active, setActive] = useState(false);

  // useEffect for change the switchTranslate Value
  useEffect(() => {
    if (active) {
      switchTranslate.value = 19.9;
    } else {
      switchTranslate.value = 0;
    }
  }, [active, switchTranslate]);

  //   // Circle Animation
  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  // Background Color Animation
  //   const backgroundColorStyle = useAnimatedStyle(() => {
  //     const backgroundColor = interpolateColor(progress.value, [0, 22]);
  //     return {
  //       backgroundColor,
  //     };
  //   });

  return (
    <View style={[styles.container, { backgroundColor: theme.white }]}>
      <View
        style={{
          borderColor: theme.purple,
          borderLeftWidth: 3,
        }}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.infoWrapper}>
            <View style={styles.infoWrapperTop}>
              <Text style={[styles.cubicleTitle, { color: theme.dark }]}>
                Cubicle #5
              </Text>
              <Text style={[styles.cubicleFloor, { color: theme.gray }]}>
                2nd floor
              </Text>
            </View>
            <Text style={[styles.cubicleSala, { color: theme.gray }]}>
              Sala de Referencia
            </Text>
          </View>
          <TouchableOpacity onPress={() => setActive(!active)}>
            <Animated.View
              style={[styles.switchWrapper, { backgroundColor: theme.light }]}
            >
              <Animated.View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: theme.purple },
                  customSpringStyles,
                ]}
              >
                <Feather
                  name={active ? 'unlock' : 'lock'}
                  size={15}
                  color={theme.light}
                  style={{ fontWeight: 800 }}
                />
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CubicleAccessCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  infoWrapper: {
    flex: 1,
  },
  infoWrapperTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
    width: '65%',
  },
  cubicleTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    marginRight: 10,
  },
  cubicleFloor: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
  },
  cubicleSala: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 19,
  },
  switchWrapper: {
    borderRadius: 7,
    width: 50,
    height: 21,
    flexDirection: 'row',
  },
  iconWrapper: {
    borderRadius: 7,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});
