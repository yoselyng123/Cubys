import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
/* Assets */
import colors from '../assets/colors';
import { Feather } from '@expo/vector-icons';
import { userContext } from '../context/userContext';
/* Components */
import Header from '../components/Header';

const AccessCubicle = ({ navigation, route }) => {
  const { setLockStatus, lockStatus } = useContext(userContext);

  return (
    <View style={{ flex: 1 }}>
      <Header
        style={styles.header}
        title='Botón de Acceso'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.container}>
        <Text style={styles.description}>
          Use este botón para acceder al cubículo que reservó.
        </Text>
        <View
          style={{
            borderBottomColor: colors.light,
            borderBottomWidth: 2,
            marginBottom: 18,
          }}
        />
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
                color={colors.purple}
                style={{ fontWeight: 800 }}
              />
            ) : (
              <Feather
                name='lock'
                size={220}
                color={colors.purple}
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
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
    color: colors.gray,
    marginBottom: 20,
  },
  btnWrapper: {
    marginTop: 150,
    alignSelf: 'center',
  },
});
