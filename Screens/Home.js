import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
/* Assets */
import colors from '../assets/colors';
import { Dimensions } from 'react-native';
/* Components */
import Header from '../components/Header';
import Card from '../components/Card';
import Reservation from '../components/Reservation';
/* ICONS */
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const cardWidth = (windowWidth - 32) / 2 - 9;

    return (
        <View style={styles.container}>
            <Header title='cubys' navigateAvailable={false} />
            <ScrollView
                style={styles.contentWrapper}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.scrollContainer}>
                    <Text style={styles.greetingsTitle}>Hello John,</Text>
                    <Text style={styles.greetingsText}>
                        Book your cubicle whenever you want.
                    </Text>

                    {/* Cards */}

                    <View style={styles.cardsWrapper}>
                        <TouchableOpacity
                            style={[
                                styles.cardItem,
                                { width: cardWidth, marginRight: 18 },
                            ]}
                            activeOpacity={0.7}
                            onPress={() => {
                                navigation.navigate('AvailableCubicles');
                            }}
                        >
                            <Card
                                title='Available cubicles'
                                subtitle='6'
                                icon={
                                    <FontAwesome5
                                        name='check'
                                        size={38}
                                        color={colors.purple}
                                    />
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.cardItem, { width: cardWidth }]}
                            activeOpacity={0.7}
                            onPress={() => {
                                navigation.navigate('ReservedCubicles');
                            }}
                        >
                            <Card
                                title='Reserved cubicles'
                                subtitle='2/3'
                                icon={
                                    <FontAwesome5
                                        name='calendar-check'
                                        size={38}
                                        color={colors.purple}
                                    />
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.cardItem,
                                { width: cardWidth, marginRight: 18 },
                            ]}
                            activeOpacity={0.7}
                            onPress={() => {
                                navigation.navigate('QRCode');
                            }}
                        >
                            <Card
                                title='Your QR code'
                                subtitle='Code'
                                icon={
                                    <FontAwesome5
                                        name='qrcode'
                                        size={38}
                                        color={colors.purple}
                                    />
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.cardItem, { width: cardWidth }]}
                            activeOpacity={0.7}
                            onPress={() => {
                                navigation.navigate('History');
                            }}
                        >
                            <Card
                                title='History'
                                subtitle='9'
                                icon={
                                    <MaterialIcons
                                        name='restore'
                                        size={38}
                                        color={colors.purple}
                                    />
                                }
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Separation Line */}

                    <View
                        style={{
                            borderBottomColor: colors.light,
                            borderBottomWidth: 2,
                            marginBottom: 20,
                        }}
                    />
                    <Text style={styles.reservationsTitle}>
                        Upcoming reservations
                    </Text>
                    <Reservation />
                    <Reservation />
                    <Reservation />
                    <Reservation />
                    <Reservation />
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 28,
    },
    greetingsTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 28,
        letterSpacing: 0.6,
        lineHeight: 32.8,
        color: colors.dark,
        marginBottom: 7,
    },
    greetingsText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        letterSpacing: 0.6,
        lineHeight: 26,
        color: colors.gray,
    },
    cardsWrapper: {
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginBottom: 25,
    },
    cardItem: {
        marginBottom: 15,
    },

    reservationsTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        letterSpacing: 0.6,
        lineHeight: 26,
        color: colors.dark,
        marginBottom: 20,
    },
});
