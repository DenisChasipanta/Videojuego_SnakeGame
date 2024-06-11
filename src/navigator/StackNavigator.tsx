import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';
import { DetailMessageScreen } from '../screens/HomeScreen/DetailMessageScreen';

const Stack = createStackNavigator();

//Interface - Rutas
interface Routes {
    name: string;
    screen: () => JSX.Element; //elemento jsx
    headerShow?: boolean;
}

//Arreglo que contenga las rutas si el usuario no está autenticado
const routesNoAuth: Routes[] = [
    { name: "Login", screen: LoginScreen },
    { name: "Register", screen: RegisterScreen }
]

//Arreglo que contenga las rutas si el usuario está autenticado
const routesAuth: Routes[] = [
    { name: "Home", screen: HomeScreen },
    { name: "Detail", screen: DetailMessageScreen, headerShow: true }
]

export const StackNavigator = () => {
    //Hook useState: verifica si está autenticado o no
    const [isAuth, setIsAuth] = useState<boolean>(false);

    //Hook useState: controlar la carga de activity
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Hook useEffect: validar y obtener la data del usuario autenticado
    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            //Si existe un usuario autenticado
            if (user) {
                //console.log(user);
                setIsAuth(true);
            }
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading ? (
                <View style={styles.root}>
                    <ActivityIndicator size={35} />
                </View>
            ) : (
                <Stack.Navigator>
                    {
                        !isAuth ?
                            routesNoAuth.map((item, index) => (
                                <Stack.Screen
                                    key={index}
                                    name={item.name}
                                    options={{ headerShown: false }}
                                    component={item.screen} />
                            ))
                            :
                            routesAuth.map((item, index) => (
                                <Stack.Screen
                                    key={index}
                                    name={item.name}
                                    options={{ headerShown: item.headerShow ?? false}}
                                    component={item.screen} />
                            ))
                    }
                </Stack.Navigator>
            )}
        </>
    );
}