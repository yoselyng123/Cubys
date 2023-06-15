import { useContext, useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
/* Components */
import Header from '../../components/Header';
import CubicleAccessCard from '../../components/CubicleAccessCard';
import ScreenDescription from '../../components/ScreenDescription';
/* Assets */
import themeContext from '../../context/themeContext';
import { userContext } from '../../context/userContext';
import { useFocusEffect } from '@react-navigation/native';
/* Apollo */
import { GET_DOORS } from '../../hooks/queries';
import { useQuery } from '@apollo/client';
import Loading from '../../components/Loading';

const AccessCubicleAdmin = ({ navigation }) => {
  const [loadingToggleDoor, setLoadingToggleDoor] = useState(false);
  const [firstFloorList, setFirstFloorList] = useState([]);
  const [secondFloorList, setSecondFloorList] = useState([]);

  const theme = useContext(themeContext);

  const { cubiclesList, setDoorsList, doorsList, setCubiclesList } =
    useContext(userContext);

  const {
    loading: loadingDoors,
    error: errorDoors,
    data: dataDoors,
    refetch: refetchDoors,
  } = useQuery(GET_DOORS);

  useEffect(() => {
    if (dataDoors) {
      const copyOfCubicles = [];
      var copyOfFirstFloor = [];
      var copyOfSecondFloor = [];
      setDoorsList(dataDoors.getDoors);
      for (let i = 0; i < cubiclesList.length; i++) {
        let doorProv = dataDoors.getDoors.find(
          (door) => door.cubicleID === cubiclesList[i].id
        );

        if (doorProv) {
          copyOfCubicles[i] = {
            ...cubiclesList[i],
            open: doorProv.open,
            doorID: doorProv.id,
          };
        } else {
          copyOfCubicles[i] = cubiclesList[i];
        }
        filterFloor(copyOfCubicles[i], copyOfFirstFloor, copyOfSecondFloor);
      }
      setCubiclesList(copyOfCubicles);
      setFirstFloorList(copyOfFirstFloor);
      setSecondFloorList(copyOfSecondFloor);
    }
  }, [dataDoors]);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      refetchDoors();
      return () => {
        // Do something when the screen is blurred
      };
    }, [])
  );

  const filterFloor = (cubicle, copyOfFirstFloor, copyOfSecondFloor) => {
    if (cubicle.floor === '1') {
      copyOfFirstFloor.push(cubicle);
    } else if (cubicle.floor === '2') {
      copyOfSecondFloor.push(cubicle);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        style={styles.header}
        title='Acceso a cubículos'
        navigateAvailable={true}
        navigation={navigation}
      />
      <ScreenDescription description='Usa este botón para acceder a los cubículos.' />

      <ScrollView style={styles.contentWrapper}>
        {firstFloorList.length > 0 &&
        secondFloorList.length > 0 &&
        !loadingDoors ? (
          <>
            <View>
              <Text style={[styles.floorTitleText, { color: theme.gray }]}>
                Primer Piso
              </Text>
              {firstFloorList.map((cubicle, index) => {
                return (
                  <CubicleAccessCard
                    key={index}
                    cubicle={cubicle}
                    setLoadingToggleDoor={setLoadingToggleDoor}
                  />
                );
              })}
            </View>
            <View>
              <Text style={[styles.floorTitleText, { color: theme.gray }]}>
                Segundo Piso
              </Text>
              {secondFloorList.map((cubicle, index) => {
                return (
                  <CubicleAccessCard
                    key={index}
                    cubicle={cubicle}
                    setLoadingToggleDoor={setLoadingToggleDoor}
                  />
                );
              })}
            </View>
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='small' color={theme.dark} />
          </View>
        )}
      </ScrollView>
      <Loading show={loadingToggleDoor} />
    </View>
  );
};

export default AccessCubicleAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  floorSelectorContainer: {
    alignItems: 'flex-end',
  },
  floorTitleText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginBottom: 10,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
});
