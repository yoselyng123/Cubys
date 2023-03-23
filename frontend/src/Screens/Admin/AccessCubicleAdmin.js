import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
/* Components */
import Header from '../../components/Header';
import CubicleAccessCard from '../../components/CubicleAccessCard';
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
      <ScrollView style={styles.contentWrapper}>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.description, { color: theme.gray }]}>
            Usa este botón para acceder a los cubículos
          </Text>
          <View
            style={{
              borderBottomColor: theme.divider,
              borderBottomWidth: 2,
              marginBottom: 18,
            }}
          />
        </View>
        {cubiclesList
          .sort(function (a, b) {
            return a.floor - b.floor;
          })
          .map((cubicle, index) => {
            return <CubicleAccessCard key={index} cubicle={cubicle} />;
          })}
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
  descriptionContainer: {
    paddingTop: 20,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
    marginBottom: 20,
  },
});
