import React from 'react';
import { Modal, Portal, Text, IconButton } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';

//Interface - Props del componente: propiedades
interface Props {
    showModalMessage: boolean;
    setShowModalMessage: Function;
}

export const NewMessageComponent = ({ showModalMessage, setShowModalMessage }: Props) => {

    return (
        <Portal>
            <Modal visible={showModalMessage} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant='headlineMedium'>Nueva Carta</Text>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon='close-circle-outline'
                            size={28}
                            onPress={() => setShowModalMessage(false)}
                        />
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}
