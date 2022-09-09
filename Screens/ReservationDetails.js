import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
/* Assets */
import colors from '../assets/colors';
/* Components */
import Header from '../components/Header';

const ReservationDetails = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header
                style={styles.header}
                title='Reservation Details'
                navigateAvailable={true}
                navigation={navigation}
            />
            <View style={styles.contentWrapper}>
                <Text style={styles.description}>
                    Please review the reservation details and make sure
                    everything is correct
                </Text>
                <View
                    style={{
                        borderBottomColor: colors.light,
                        borderBottomWidth: 2,
                        marginBottom: 18,
                    }}
                />
                <View style={styles.reservationInfoWrapper}>
                    <View style={styles.topSection}>
                        <Text style={styles.title}>Cubicle #5</Text>
                        <Text style={styles.floor}>2nd Floor</Text>
                    </View>
                    <View style={styles.cubicleAddOns}>
                        <Text style={styles.textDesc}>4 Chairs</Text>
                        <Text style={styles.textDesc}>White board</Text>
                        <Text style={styles.textDesc}>Window</Text>
                    </View>
                    <View
                        style={{
                            borderBottomColor: colors.light,
                            borderBottomWidth: 2,
                            marginBottom: 20,
                        }}
                    />
                    <View style={styles.dateWrapper}>
                        <Text style={styles.title}>Start Time</Text>
                        <Text style={styles.textDesc}>
                            29 Nov 2022, 03:30pm
                        </Text>
                    </View>
                    <View style={styles.dateWrapper}>
                        <Text style={styles.title}>End Time</Text>
                        <Text style={styles.textDesc}>
                            29 Nov 2022, 05:30pm
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.description}>
                        This is the final step, after you press the Reserve
                        button, the reservation will be completed
                    </Text>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={styles.reserveBtn}>
                            <Text style={styles.reserveBtnText}>Reserve</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ReservationDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    description: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        lineHeight: 20,
        letterSpacing: 0.6,
        color: colors.gray,
        marginBottom: 20,
    },
    reservationInfoWrapper: {
        marginBottom: 'auto',
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.6,
        lineHeight: 18.75,
        color: colors.dark,
        marginBottom: 10,
    },
    floor: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.6,
        lineHeight: 18.75,
        color: colors.gray,
        marginBottom: 10,
    },
    textDesc: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        letterSpacing: 0.6,
        lineHeight: 20,
        color: colors.gray,
        marginBottom: 4,
    },
    cubicleAddOns: {
        marginBottom: 22,
    },
    dateWrapper: {
        marginBottom: 30,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    reserveBtn: {
        backgroundColor: colors.purple,
        paddingVertical: 17,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 50,
    },
    reserveBtnText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        letterSpacing: 0.6,
        lineHeight: 17.58,
        color: '#fff',
        marginBottom: 4,
    },
});
