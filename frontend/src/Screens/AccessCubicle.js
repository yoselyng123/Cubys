import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
/* Assets */
import { Feather } from '@expo/vector-icons';
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';
/* Components */
import Header from '../components/Header';
import SectionDivider from '../components/SectionDivider';
import ScreenDescription from '../components/ScreenDescription';

const AccessCubicle = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { setLockStatus, lockStatus } = useContext(userContext);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header
        style={styles.header}
        title='Botón de Acceso'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.container}>
        <ScreenDescription description='Este botón le da acceso al cubículo que reservó.' />
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (lockStatus === 'Abierto') {
                setLockStatus('Cerrado');
              } else {
                setLockStatus('Abierto');
              }
            }}
          >
            {lockStatus === 'Abierto' ? (
              <Feather
                name='unlock'
                size={220}
                color={theme.purple}
                style={{ fontWeight: 800 }}
              />
            ) : (
              <Feather
                name='lock'
                size={220}
                color={theme.purple}
                style={{ fontWeight: 800 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AccessCubicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnWrapper: {
    marginTop: 150,
    alignSelf: 'center',
  },
});
