import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
function useToastMessage() {
  const toastConfig = {
    successToast: ({ text1, text2 }) => (
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#74B666',
          },
        ]}
      >
        <AntDesign
          name='checkcircleo'
          size={34}
          color='#97E3A4'
          style={{ paddingHorizontal: 20 }}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.title}>{text1}</Text>
          <Text style={[styles.text, { color: '#fff' }]}>{text2}</Text>
        </View>
      </View>
    ),
    errorToast: ({ text1, text2 }) => (
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#C85C54',
          },
        ]}
      >
        <MaterialIcons
          name='cancel'
          size={34}
          color='#FF9B9D'
          style={{ paddingHorizontal: 20 }}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.title}>{text1}</Text>
          <Text style={[styles.text, { color: '#fff' }]}>{text2}</Text>
        </View>
      </View>
    ),
    infoToast: ({ text1, text2 }) => (
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#76BEDB',
          },
        ]}
      >
        <AntDesign
          name='checkcircleo'
          size={34}
          color='#AFDBF5'
          style={{ paddingHorizontal: 20 }}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.title}>{text1}</Text>
          <Text style={[styles.text, { color: '#fff' }]}>{text2}</Text>
        </View>
      </View>
    ),
  };

  const showToast = ({ type, title, message }) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      autoHide: true,
      visibilityTime: 3000,
    });
  };

  return { showToast, toastConfig };
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flexDirection: 'row',
    height: 90,
    borderRadius: 20,
    alignItems: 'center',
  },
  infoWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    letterSpacing: 0.6,
    color: '#fff',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    letterSpacing: 0.6,
    color: '#fff',
    flexWrap: 'wrap',
  },
});

export default useToastMessage;
