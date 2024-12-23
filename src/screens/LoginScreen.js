import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username.trim() && password.trim()) {
            navigation.replace('MainTabs'); // Заменяем на MainTabs
        } else {
            Alert.alert('Ошибка', 'Введите имя пользователя и пароль');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Добро пожаловать!</Text>
            <TextInput
                style={styles.input}
                placeholder="Введите имя пользователя"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Введите пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry // Убирает видимость пароля
            />
            <Button title="Войти" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default LoginScreen;
