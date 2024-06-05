import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10

    },
    inputs: {
        width: '90%'
    },
    textHead: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    button: {
        width: '90%',
    },
    textRedirect: {
        marginTop: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#5322af'
    },
    rootHome: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 25
    },
    headerHome: {
        flexDirection: "row",
        gap: 15,
        alignItems: 'center'
    },
    iconProfile: {
        alignItems: 'flex-end',
        flex: 1
    },
    modalProfile:{
        paddingHorizontal:20
    }
})