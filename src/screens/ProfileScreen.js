import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({ route, navigation }) => {
    const { username } = route.params || { username: 'Гость' };

    const handleLogout = () => {
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name="account-circle"
                size={120}
                color="#000"
                style={styles.icon}
            />
            <Text style={styles.username}>Привет, {username}!</Text>
            <Button title="Выйти" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default ProfileScreen;
