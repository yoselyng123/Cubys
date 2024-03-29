import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
/* Assets */
import colors from '../assets/colors';
import themeContext from '../context/themeContext';
import { useColorScheme } from 'react-native';
/* Components */
import Header from '../components/Header';
import SectionDivider from '../components/SectionDivider';
import RadioBtn from '../components/RadioBtn';
import { EventRegister } from 'react-native-event-listeners';

const Settings = () => {
  const scheme = useColorScheme();
  const theme = useContext(themeContext);
  const [appearanceTheme, setAppearanceTheme] = useState(scheme);

  useEffect(() => {
    console.log(`Schema: ${scheme}, appearance: ${appearanceTheme}`);
    if (scheme === 'dark') {
      setAppearanceTheme('dark');
    } else {
      setAppearanceTheme('light');
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title='cubys' navigateAvailable={false} />
      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        alwaysBounceVertical={false}
      >
        {/* Screen Description */}
        <View style={styles.descriptionContainer}>
          <View style={styles.texts}>
            <Text style={[styles.description, { color: theme.dark }]}>
              Configuración
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setAppearanceTheme('light');
                EventRegister.emit('changeTheme', 'light');
              }}
            >
              <Text style={[styles.markread, { color: theme.purple }]}>
                Restablecer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SectionDivider marginBottom={10} />
        {/* Options */}

        <View style={styles.optionsContainer}>
          <View>
            <View style={styles.settingItemContainer}>
              <Text style={[styles.title, { color: theme.dark }]}>Tema</Text>
              <View style={styles.itemWrapper}>
                <RadioBtn
                  appearanceTheme={appearanceTheme}
                  setAppearanceTheme={setAppearanceTheme}
                  value='light'
                />
                <RadioBtn
                  appearanceTheme={appearanceTheme}
                  setAppearanceTheme={setAppearanceTheme}
                  value='dark'
                />
              </View>
            </View>
            <SectionDivider marginBottom={20} marginTop={20} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flexGrow: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  settingItemContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  radiobuttonItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radiobuttonItemTextSelected: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.purple,
  },
  radiobuttonItemTextUnselected: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.gray,
  },
  texts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    letterSpacing: 0.6,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.dark,
    marginBottom: 5,
  },
  markread: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    letterSpacing: 0.6,
    color: colors.purple,
    marginBottom: 20,
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
});
