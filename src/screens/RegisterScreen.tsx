//rafc
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

//Interface - formRegister
interface FormRegister {
    email: string;
    password: string;
    phoneNumber: string;
}

//Interface - mensajes
interface MessageSnackBar {
    visible: boolean;
    message: string;
    color: string;
}

export const RegisterScreen = () => {
    //hook useState: manipulación del formulario
    const [formRegister, setFormRegister] = useState<FormRegister>({
        email: "",
        password: "",
        phoneNumber: "",
    });

    //hook useState: visualizar u ocultar mensaje 
    const [showMessage, setShowMessage] = useState<MessageSnackBar>({
        visible: false,
        message: '',
        color: '#fff'
    });

    //hook useState: visualizar password
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    //hook useNavigation: navegar entre screens
    const navigation = useNavigation();

    //Función que cambie los valores del formRegister
    const handlerSetValues = (key: string, value: string) => {
        // operador spread: ... sacar una copia superficial de un objeto
        setFormRegister({ ...formRegister, [key]: value });
    }

    //Función que permita crear y enviar el nuevo usuario
    const handlerRegister = async () => {
        if (!formRegister.email || !formRegister.password || !formRegister.phoneNumber) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos!',
                color: '#b53333'
            });
            return;
        }
        //console.log(formRegister)
        // Código para registrar usuario
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                formRegister.email,
                formRegister.password
            );
            setShowMessage({
                visible: true,
                message: 'Registro exitoso!',
                color: '#146525'
            });
        } catch (ex) {
            console.log(ex);
            setShowMessage({
                visible: true,
                message: 'No se logró completar el registro, intente más tarde°',
                color: '#b53333'
            });
        }
    }
    return (
        <View style={styles.root}>
            <Text style={styles.textHead}>Regístrate</Text>
            <TextInput
                mode='outlined'
                label='Correo'
                placeholder='Escriba su correo'
                style={styles.inputs}
                onChangeText={(value) => handlerSetValues('email', value)} />
            <TextInput
                mode='outlined'
                label='Contraseña'
                placeholder='Escriba su contraseña'
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon="eye"
                    onPress={() => setHiddenPassword(!hiddenPassword)} />}
                style={styles.inputs}
                onChangeText={(value) => handlerSetValues('password', value)} />
            <TextInput
                mode='outlined'
                label='Número de teléfono'
                placeholder='Escriba su número de teléfono'
                style={styles.inputs}
                onChangeText={(value) => handlerSetValues('phoneNumber', value)} />
            <Button style={styles.button} mode="contained" onPress={handlerRegister}>
                Registrar
            </Button>
            <Text
                style={styles.textRedirect}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: "Login" }))}>
                Ya tienes una cuenta? Inicia sesión
            </Text>
            <Snackbar
                visible={showMessage.visible}
                onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                style={{ backgroundColor: showMessage.color }}>
                {showMessage.message}
            </Snackbar>
        </View>
    )
}
