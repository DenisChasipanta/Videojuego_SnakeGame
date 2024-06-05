import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, IconButton, Modal, Portal, Text } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../configs/firebaseConfig';

//Interface - data usuario
interface UserData {
    name: string;
}

export const HomeScreen = () => {
    //hook useSate: trabajar con la data usuario
    const [userData, setUserData] = useState<UserData>({
        name: ''
    });

    //hook useEffect: capturar la data del suaurio autenticado
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //console.log(user);
                setUserData({ name: user.displayName ?? "NA" })
            }
        })
    }, [])

    //hook useState: manipular el modal
    const [showModal, setShowModal] = useState<boolean>(true);

    return (
        <>
            <View style={styles.rootHome}>
                <View style={styles.headerHome}>
                    <Avatar.Text size={50} label="MI" />
                    <View>
                        <Text variant='bodySmall'>Bienvenido</Text>
                        <Text variant='labelLarge'>{userData.name}</Text>
                    </View>
                    <View style={styles.iconProfile}>
                        <IconButton
                            icon="account-edit"
                            mode="contained"
                            size={32}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                </View>
            </View>
            <Portal>
                <Modal visible={showModal} contentContainerStyle={styles.modalProfile}>
                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
        </>
    )
}
