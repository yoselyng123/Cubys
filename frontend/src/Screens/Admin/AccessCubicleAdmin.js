import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
/* Components */
import Header from '../../components/Header';
import CubicleAccessCard from '../../components/CubicleAccessCard';
import ScreenDescription from '../../components/ScreenDescription';
/* Assets */
import themeContext from '../../context/themeContext';
import { userContext } from '../../context/userContext';
/* Apollo */
import { GET_DOORS } from '../../hooks/queries';
import { useQuery } from '@apollo/client';
import Loading from '../../components/Loading';

const AccessCubicleAdmin = ({ navigation }) => {
  const [loadingToggleDoor, setLoadingToggleDoor] = useState(false);

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
      }
      setCubiclesList(copyOfCubicles);
    }
  }, [dataDoors]);

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
        {cubiclesList
          .sort(function (a, b) {
            return a.floor - b.floor;
          })
          .map((cubicle, index) => {
            return (
              <CubicleAccessCard
                key={index}
                cubicle={cubicle}
                setLoadingToggleDoor={setLoadingToggleDoor}
              />
            );
          })}
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
});
