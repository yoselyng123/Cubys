import { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
/* Components */
import Header from '../../components/Header';
import CubicleAccessCard from '../../components/CubicleAccessCard';
import ScreenDescription from '../../components/ScreenDescription';
/* Assets */
import themeContext from '../../context/themeContext';
import { userContext } from '../../context/userContext';

const AccessCubicleAdmin = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { cubiclesList } = useContext(userContext);

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
        {/* {cubiclesList
          .sort(function (a, b) {
            return a.floor - b.floor;
          })
          .map((cubicle, index) => {
            return <CubicleAccessCard key={index} cubicle={cubicle} />;
          })} */}
        <CubicleAccessCard cubicle={cubiclesList[0]} />
      </ScrollView>
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
