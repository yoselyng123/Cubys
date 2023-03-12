import { StyleSheet, Text, View } from 'react-native';
/* Context */
import themeContext from '../context/themeContext';
// Components
import Tag from './Tag';
// Assets
import { useContext } from 'react';

const InfoBubble = ({ floor, left, bottom, selectedCubicle }) => {
  const theme = useContext(themeContext);

  return (
    <View
      style={[
        styles.bubbleWrapper,
        {
          backgroundColor: theme.white,
          left:
            floor === '1'
              ? `${parseFloat(left) - 2}%`
              : `${parseFloat(left) - 2}%`,
          bottom:
            floor === '1'
              ? `${parseFloat(bottom) + 7}%`
              : `${parseFloat(bottom) + 7}%`,
        },
      ]}
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
          >{`Cubículo #${selectedCubicle.cubicleNumber}`}</Text>
          <View style={styles.tagsWrapper}>
            <Tag name='x6' icon='person' fontSize={8} iconSize={5} />
            <Tag name='Board' fontSize={8} />
          </View>
        </View>
      </View>
      <View style={[styles.bubbleBottom, { borderBottomColor: theme.white }]} />
    </View>
  );
};

export default InfoBubble;

const styles = StyleSheet.create({
  bubbleWrapper: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingLeft: 10,
    height: 50,
    position: 'absolute',
    zIndex: 100,
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
