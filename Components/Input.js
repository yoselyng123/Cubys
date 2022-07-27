import {
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

/* ASSETS */
import colors from "../assets/colors";

const Input = ({ title, placeholder, isPassword = false }) => {

const [text, onChangeText] = React.useState("");

return (
    <View style={styles.container}>
        <Text style={styles.emailTitle}>{title}</Text>
        <TextInput 
        style={styles.emailInput}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        />

        {isPassword && (
            <TouchableOpacity activeOpacity={0.7}>
                <Ionicons style={styles.eyeicon} name="eye" size={24} color={colors.gray} />
            </TouchableOpacity>
        )}
    </View>
);
};

export default Input;

const styles = StyleSheet.create({
    container: {
        marginBottom: 45,
    },
    emailTitle: {
        fontFamily: "Roboto-Medium",
        letterSpacing: 0.6,
        fontSize: 13,
        color: colors.gray,
    },
        emailInput: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        fontFamily: "Roboto-Medium",
        fontSize: 15,
        color: colors.dark,
        letterSpacing: 0.6,
        marginTop: 5,
    },
    eyeicon: {
        position: "absolute",
        right: 10,
        bottom: 5,
        zIndex: 1,
    },
});
