import { StyleSheet } from 'react-native';
/* Components */
import InfoBubble from './InfoBubble';
import Mesa from './Mesa';

const MesaBubble = ({
  positions,
  cubicle,
  floor,
  counterfloor,
  setSelectedCubicle,
}) => {
  return (
    <>
      <Mesa
        left={
          floor === '1'
            ? positions.floor1[counterfloor].left
            : positions.floor2[counterfloor].left
        }
        bottom={
          floor === '1'
            ? positions.floor1[counterfloor].bottom
            : positions.floor2[counterfloor].bottom
        }
        rotate={
          floor === '1'
            ? positions.floor1[counterfloor].rotate
            : positions.floor2[counterfloor].rotate
        }
        cubicle={cubicle}
        setSelectedCubicle={setSelectedCubicle}
      />
      {/* INFO BUBBLE */}
      {cubicle.isSelected ? (
        <InfoBubble
          left={
            floor === '1'
              ? positions.floor1[counterfloor].left
              : positions.floor2[counterfloor].left
          }
          bottom={
            floor === '1'
              ? positions.floor1[counterfloor].bottom
              : positions.floor2[counterfloor].bottom
          }
          selectedCubicle={cubicle}
          floor={floor}
        />
      ) : null}
    </>
  );
};

export default MesaBubble;

const styles = StyleSheet.create({});
