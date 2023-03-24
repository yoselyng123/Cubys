import { StyleSheet, TouchableOpacity } from 'react-native';
import { useContext, useState, useEffect } from 'react';
/* Assets */
import themeContext from '../context/themeContext';
import { Feather } from '@expo/vector-icons';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const CustomSwitch = () => {
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
    const backgroundColor = interpolateColor(
      switchTranslate.value,
      [0, 19.9],
      [theme.gray, theme.purple]
    );
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
      backgroundColor,
    };
  });
  return (
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
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
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
