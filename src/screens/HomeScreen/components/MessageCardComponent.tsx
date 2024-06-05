import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'

export const MessageCardComponent = () => {
    return (
        <View style={styles.rootMessage}>
            <View>
                <Text variant='labelLarge'>Para: Ariel Ron</Text>
                <Text variant='bodyMedium'>Asunto: Estudiar</Text>
            </View>
            <View style={styles.iconEnd}>
                <IconButton
                    icon="email-open"
                    size={25}
                    onPress={() => console.log('Pressed')}
                />
            </View>
        </View>
    )
}
