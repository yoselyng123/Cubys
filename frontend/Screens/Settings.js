import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useContext, useState } from 'react';
import { RadioButton } from 'react-native-paper';
/* Assets */
import colors from '../assets/colors';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../context/themeContext';
/* Components */
import Header from '../components/Header';
import SectionDivider from '../components/SectionDivider';

const Settings = () => {
  const theme = useContext(themeContext);
  const [appearanceTheme, setAppearanceTheme] = useState('dark');
  const [notificationsChecked, setNotificationsChecked] = useState('first');
  const [languageChecked, setLanguageChecked] = useState('first');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title='cubys' navigateAvailable={false} />
      <View style={styles.contentWrapper}>
        <View style={styles.descriptionContainer}>
          <View style={styles.texts}>
            <Text style={[styles.description, { color: theme.dark }]}>
              Settings
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.markread}>Reset default</Text>
            </TouchableOpacity>
          </View>
          <SectionDivider marginBottom={10} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
        >
          <View style={styles.scrollContainer}>
            <View>
              <View style={styles.settingItemContainer}>
                <Text style={[styles.title, { color: theme.dark }]}>
                  Appearance
                </Text>
                <View style={styles.itemWrapper}>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value='light'
                      status={
                        appearanceTheme === 'light' ? 'checked' : 'unchecked'
                      }
                      onPress={() => {
                        setAppearanceTheme('light');
                        EventRegister.emit('changeTheme', appearanceTheme);
                      }}
                      color={theme.purple}
                      uncheckedColor={theme.dark}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setAppearanceTheme('light');
                        EventRegister.emit('changeTheme', appearanceTheme);
                      }}
                    >
                      <Text
                        style={
                          appearanceTheme === 'light'
                            ? [
                                styles.radiobuttonItemTextSelected,
                                { color: theme.purple },
                              ]
                            : [
                                styles.radiobuttonItemTextUnselected,
                                { color: theme.gray },
                              ]
                        }
                      >
                        Light
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value='dark'
                      status={
                        appearanceTheme === 'dark' ? 'checked' : 'unchecked'
                      }
                      onPress={() => {
                        setAppearanceTheme('dark');
                        EventRegister.emit('changeTheme', appearanceTheme);
                      }}
                      color={theme.purple}
                      uncheckedColor={theme.gray}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setAppearanceTheme('dark');
                        EventRegister.emit('changeTheme', appearanceTheme);
                      }}
                    >
                      <Text
                        style={
                          appearanceTheme === 'dark'
                            ? [
                                styles.radiobuttonItemTextSelected,
                                { color: theme.purple },
                              ]
                            : [
                                styles.radiobuttonItemTextUnselected,
                                { color: theme.gray },
                              ]
                        }
                      >
                        Dark
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <SectionDivider marginBottom={20} marginTop={20} />

              <View style={styles.settingItemContainer}>
                <Text style={[styles.title, { color: theme.dark }]}>
                  Notifications
                </Text>
                <View style={styles.itemWrapper}>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value='first'
                      status={
                        notificationsChecked === 'first'
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => setNotificationsChecked('first')}
                      color={theme.purple}
                      uncheckedColor={theme.gray}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setNotificationsChecked('first')}
                    >
                      <Text
                        style={
                          notificationsChecked === 'first'
                            ? [
                                styles.radiobuttonItemTextSelected,
                                { color: theme.purple },
                              ]
                            : [
                                styles.radiobuttonItemTextUnselected,
                                { color: theme.gray },
                              ]
                        }
                      >
                        Show
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value='second'
                      status={
                        notificationsChecked === 'second'
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => setNotificationsChecked('second')}
                      color={theme.purple}
                      uncheckedColor={theme.gray}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setNotificationsChecked('second')}
                    >
                      <Text
                        style={
                          notificationsChecked === 'second'
                            ? [
                                styles.radiobuttonItemTextSelected,
                                { color: theme.purple },
                              ]
                            : [
                                styles.radiobuttonItemTextUnselected,
                                { color: theme.gray },
                              ]
                        }
                      >
                        Hide
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <SectionDivider marginBottom={20} marginTop={20} />

              <View style={styles.settingItemContainer}>
                <Text style={[styles.title, { color: theme.dark }]}>
                  Language
                </Text>
                <View style={styles.itemWrapper}>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value='first'
                      status={
                        languageChecked === 'first' ? 'checked' : 'unchecked'
                      }
                      onPress={() => setLanguageChecked('first')}
                      color={theme.purple}
                      uncheckedColor={theme.gray}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setLanguageChecked('first')}
                    >
                      <Text
                        style={
                          languageChecked === 'first'
                            ? [
                                styles.radiobuttonItemTextSelected,
                                { color: theme.purple },
                              ]
                            : [
                                styles.radiobuttonItemTextUnselected,
                                { color: theme.gray },
                              ]
                        }
                      >
                        English
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value='second'
                      status={
                        languageChecked === 'second' ? 'checked' : 'unchecked'
                      }
                      onPress={() => setLanguageChecked('second')}
                      color={theme.purple}
                      uncheckedColor={theme.gray}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setLanguageChecked('second')}
                    >
                      <Text
                        style={
                          languageChecked === 'second'
                            ? [
                                styles.radiobuttonItemTextSelected,
                                { color: theme.purple },
                              ]
                            : [
                                styles.radiobuttonItemTextUnselected,
                                { color: theme.gray },
                              ]
                        }
                      >
                        Español
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
});
