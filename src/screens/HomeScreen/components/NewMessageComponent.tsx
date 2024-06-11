import React, { useState } from 'react';
import { Modal, Portal, Text, IconButton, Divider, TextInput, Button } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { push, ref, set } from 'firebase/database';
import { dbRealTime } from '../../../configs/firebaseConfig';

//Interface - Props del componente: propiedades
interface Props {
    showModalMessage: boolean;
    setShowModalMessage: Function;
}

//Interface - Formulario mensaje
interface FormMessage {
    to: string;
    subject: string;
    message: string;
}

export const NewMessageComponent = ({ showModalMessage, setShowModalMessage }: Props) => {

    //hook useSate: manipulación de la data del formulario
    const [formMessage, setFormMessage] = useState<FormMessage>({
        to: '',
        subject: '',
        message: ''
    });

    // Función que cambie los valores del formMessage
    const handlerSetValues = (key: string, value: string) => {
        setFormMessage({ ...formMessage, [key]: value })
    }

    //Función guardar el mensaje
    const handlerSaveMessage = async () => {
        if (!formMessage.to || !formMessage.subject || !formMessage.message) {
            return;
        }
        //console.log(formMessage);
        // Guardar los datos en BDD
        //1. Referencia a la BDD y creación tabla
        const dbRef = ref(dbRealTime, 'messages');
        //2. Crear una colección - evitando sobreescritura de la data
        const saveMessage = push(dbRef);
        //3. Almacenar en la BDD
        try {
            await set(saveMessage, formMessage);
            //4. Limpiar formulario
            setFormMessage({
                to: '',
                subject: '',
                message: ''
            })
        } catch (ex) {
            console.log(ex);
        }
        setShowModalMessage(false);
    }

    return (
        <Portal>
            <Modal visible={showModalMessage} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant='headlineMedium'>Nueva Mensaje</Text>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon='close-circle-outline'
                            size={28}
                            onPress={() => setShowModalMessage(false)}
                        />
                    </View>
                </View>
                <Divider />
                <TextInput
                    label='Para'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('to', value)} />
                <TextInput
                    label='Asunto'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('subject', value)} />
                <TextInput
                    label='Mensaje'
                    mode='outlined'
                    multiline={true}
                    numberOfLines={7}
                    onChangeText={(value) => handlerSetValues('message', value)} />
                <Button mode='contained' onPress={handlerSaveMessage}>Enviar</Button>
            </Modal>
        </Portal>
    )
}
