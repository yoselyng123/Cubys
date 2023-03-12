import { View, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';

const Loading = ({ show }) => {
  const windowHeigth = Dimensions.get('window').height;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: !show && 'none',
        zIndex: 10,
        position: 'absolute',
        width: '100%',
        top: 0,
        height: windowHeigth,
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

export default Loading;
