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
import useToastMessage from '../hooks/useToastMessage';
/* Apollo */
import { TOGGLE_DOOR } from '../hooks/mutations';
import { useMutation } from '@apollo/client';

const CustomSwitch = ({ cubicle, setLoadingToggleDoor }) => {
  const theme = useContext(themeContext);

  const { showToast } = useToastMessage();

  // value for Switch Animation
  const switchTranslate = useSharedValue(0);
  // state for activate Switch
  const [active, setActive] = useState(false);

  const [toggleDoor, { loading: loadingToggleDoor, data: dataToggleDoor }] =
    useMutation(TOGGLE_DOOR, {
      onCompleted: (data) => {
        console.log(data);
        showToast({
          type: 'infoToast',
          title: 'Info',
          message: data.toggleDoor.open
            ? 'Se ha abierto el cubículo'
            : 'Se ha cerrado el cubículo',
        });
      },
      onError: () => {
        showToast({
          type: 'errorToast',
          title: 'Error',
          message:
            'No se pudo cambiar el estado del cubículo. Por favor intente de nuevo.',
        });
      },
    });

  useEffect(() => {
    setLoadingToggleDoor(loadingToggleDoor);
  }, [loadingToggleDoor]);

  // Turn on/off led
  const handleToggleDoor = () => {
    if (cubicle.doorID) {
      var cubicleId = cubicle.id;
      console.log(cubicleId);
      toggleDoor({
        variables: { cubicleId },
      });
    }
  };

  useEffect(() => {
    if (dataToggleDoor) {
      setActive(dataToggleDoor.toggleDoor.open);
    }
  }, [dataToggleDoor]);

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
    <TouchableOpacity onPress={() => handleToggleDoor()}>
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
