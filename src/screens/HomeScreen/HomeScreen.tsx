import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import firebase, { signOut, updateProfile } from 'firebase/auth';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import { FlatList } from 'react-native-gesture-handler';
import { MessageCardComponent } from './components/MessageCardComponent';
import { NewMessageComponent } from './components/NewMessageComponent';
import { onValue, ref } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';


//Interface - data usuario
interface FormUser {
    name: string;
}

//Interface - message
export interface Message {
    id: string;
    to: string;
    subject: string;
    message: string;
}

export const HomeScreen = () => {
    //hook useSate: trabajar con la data usuario
    const [formUser, setFormUser] = useState<FormUser>({
        name: ''
    });

    //hook useState: trabajar con la data del usuario autenticado
    const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

    //hook useEffect: capturar la data del suaurio autenticado
    useEffect(() => {
        // Obtener el usuario autenticado
        setUserAuth(auth.currentUser);
        //console.log(userAuth);
        setFormUser({ name: auth.currentUser?.displayName ?? "" })
        getAllMessages();
    }, [])

    //hook useState: manipular el modal perfil
    const [showModal, setShowModal] = useState<boolean>(false);

    //hook useState: manipular el modal añadir mensaje
    const [showModalMessage, setShowModalMessage] = useState<boolean>(false);

    //hook useState: lista de mensajes
    const [messages, setMessages] = useState<Message[]>([]);

    //hook navegación
    const navigation = useNavigation();

    //función que cambie los valores del formUser
    const handlerSetValues = (key: string, value: string) => {
        setFormUser({ ...formUser, [key]: value })
    }

    //función actualizar la data del usuario autenticado
    const handlerUpdateUser = async () => {
        await updateProfile(userAuth!, {
            displayName: formUser.name
        })
        setShowModal(false);
    }

    //Función para consultar la data desde firebase
    const getAllMessages = () => {
        //1. Referencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'messages/' + auth.currentUser?.uid);
        //2. Consultar data
        onValue(dbRef, (snapshot) => {
            //3. Capturar data
            const data = snapshot.val(); //Obtener los valores en un formato esperado
            //VERIFICACIÓN DE DATA
            if (!data) return; //Veriifcando que esté vacía
            //4. Obtener keys data
            const getKeys = Object.keys(data);
            //5. Crear un arreglo lista de mensajes
            const listMessages: Message[] = [];
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key };
                listMessages.push(value);
            })
            //Agregando la data al arreglo messages hook
            setMessages(listMessages);
        })
    }

    //Función cerrar sesión
    const handlerSignOut = async () => {
        await signOut(auth);
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }));
        setShowModal(false);
    }

    return (
        <>
            <View style={styles.rootHome}>
                <View style={styles.header}>
                    <Avatar.Text size={50} label="MI" />
                    <View>
                        <Text variant='bodySmall'>Bienvenida</Text>
                        <Text variant='labelLarge'>{userAuth?.displayName}</Text>
                    </View>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon="account-edit"
                            mode="contained"
                            size={32}
                            onPress={() => setShowModal(true)}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => <MessageCardComponent message={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <Portal>
                <Modal visible={showModal} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text variant='headlineMedium'>Mi Perfil</Text>
                        <View style={styles.iconEnd}>
                            <IconButton
                                icon="close-circle-outline"
                                size={28}
                                onPress={() => setShowModal(false)}
                            />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        mode='outlined'
                        label='Escribe tu nombre'
                        value={formUser.name}
                        onChangeText={(value) => handlerSetValues('name', value)}
                    />
                    <TextInput
                        mode='outlined'
                        label='Correo'
                        value={userAuth?.email!}
                        disabled />
                    <Button mode='contained' onPress={handlerUpdateUser}>Actualizar</Button>
                    <View style={styles.iconSignOut}>
                        <IconButton
                            icon="logout"
                            size={35}
                            mode='contained'
                            onPress={handlerSignOut}
                        />
                    </View>
                </Modal>
            </Portal>
            <FAB
                icon="plus"
                style={styles.fabMessage}
                onPress={() => setShowModalMessage(true)}
            />
            <NewMessageComponent showModalMessage={showModalMessage} setShowModalMessage={setShowModalMessage} />
        </>
    )
}
