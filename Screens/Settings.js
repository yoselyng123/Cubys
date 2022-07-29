import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { RadioButton } from 'react-native-paper';
/* Assets */
import colors from "../assets/colors";
import { MaterialIcons } from '@expo/vector-icons';
/* Components */
import Header from "../components/Header";

const Settings = () => {

  const [appearanceChecked, setAppearanceChecked] = React.useState('first');
  const [notificationsChecked, setNotificationsChecked] = React.useState('first');
  const [languageChecked, setLanguageChecked] = React.useState('first');

  return (
    <View style={styles.container}>
      <Header title="cubys" navigateAvailable={false} />
      <View style={styles.contentWrapper}>
        <View style={styles.descriptionContainer}>
          <View style={styles.texts}>
            <Text style={styles.description}>
              Settings
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.markread}>
                Reset default
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: colors.light,
              borderBottomWidth: 2,
            }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
          <View style={styles.scrollContainer}>
            <View style={styles.settingContainer}>

              <View style={styles.settingItemContainer}>
                <Text style={styles.title}>
                  Appearance
                </Text>
                <View style={styles.itemWrapper}>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value="first"
                      status={ appearanceChecked === 'first' ? 'checked' : 'unchecked' }
                      onPress={() => setAppearanceChecked('first')}
                      color={colors.purple}
                      uncheckedColor={colors.gray}
                    />
                    <Text style={appearanceChecked === 'first' ? styles.radiobuttonItemTextSelected : styles.radiobuttonItemTextUnselected}>
                      Light
                    </Text>
                  </View>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value="second"
                      status={ appearanceChecked === 'second' ? 'checked' : 'unchecked' }
                      onPress={() => setAppearanceChecked('second')}
                      color={colors.purple}
                      uncheckedColor={colors.gray}
                    />
                    <Text style={appearanceChecked === 'second' ? styles.radiobuttonItemTextSelected : styles.radiobuttonItemTextUnselected}>
                      Dark
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: colors.light,
                  borderBottomWidth: 2,
                  marginBottom: 20,
                  marginTop: 20,
                }}
              />

              <View style={styles.settingItemContainer}>
                <Text style={styles.title}>
                  Notifications
                </Text>
                <View style={styles.itemWrapper}>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value="first"
                      status={ notificationsChecked === 'first' ? 'checked' : 'unchecked' }
                      onPress={() => setNotificationsChecked('first')}
                      color={colors.purple}
                      uncheckedColor={colors.gray}
                    />
                    <Text style={notificationsChecked === 'first' ? styles.radiobuttonItemTextSelected : styles.radiobuttonItemTextUnselected}>
                      Show
                    </Text>
                  </View>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value="second"
                      status={ notificationsChecked === 'second' ? 'checked' : 'unchecked' }
                      onPress={() => setNotificationsChecked('second')}
                      color={colors.purple}
                      uncheckedColor={colors.gray}
                    />
                    <Text style={notificationsChecked === 'second' ? styles.radiobuttonItemTextSelected : styles.radiobuttonItemTextUnselected}>
                      Hide
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: colors.light,
                  borderBottomWidth: 2,
                  marginBottom: 20,
                  marginTop: 20,
                }}
              />

<View style={styles.settingItemContainer}>
                <Text style={styles.title}>
                  Language
                </Text>
                <View style={styles.itemWrapper}>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value="first"
                      status={ languageChecked === 'first' ? 'checked' : 'unchecked' }
                      onPress={() => setLanguageChecked('first')}
                      color={colors.purple}
                      uncheckedColor={colors.gray}
                    />
                    <Text style={languageChecked === 'first' ? styles.radiobuttonItemTextSelected : styles.radiobuttonItemTextUnselected}>
                      English
                    </Text>
                  </View>
                  <View style={styles.radiobuttonItem}>
                    <RadioButton
                      value="second"
                      status={ languageChecked === 'second' ? 'checked' : 'unchecked' }
                      onPress={() => setLanguageChecked('second')}
                      color={colors.purple}
                      uncheckedColor={colors.gray}
                    />
                    <Text style={languageChecked === 'second' ? styles.radiobuttonItemTextSelected : styles.radiobuttonItemTextUnselected}>
                      Español
                    </Text>
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
    backgroundColor: colors.background,
  },
  contentWrapper: {
    flex: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  settingItemContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  radiobuttonItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  radiobuttonItemTextSelected: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.purple,
  },
  radiobuttonItemTextUnselected: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.gray,
  },
  texts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    letterSpacing: 0.6,
    color: colors.dark,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.dark,
    marginBottom: 5,
  },
  markread: {
    fontFamily: "Roboto-Medium",
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
