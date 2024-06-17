import { StyleSheet, Text } from 'react-native';
import { Coordinate } from '../../../types/types';


// function getRandomFruitEmaji() {
//     const fruitEmajis = ["🍎", "🍊", "🍋", "🍇", "🍉", "🍓", "🍑", "🍍"];
//     const randomIndex = Math.floor(Math.random() * fruitEmajis.length);
//     return fruitEmajis[randomIndex];
// }

export default function Food({ x, y }: Coordinate): JSX.Element {
    return <Text style={[{ top: y * 10, left:x * 10 }, styles.food]}>🍎</Text>;
}

const styles = StyleSheet.create({
    food: {
        width: 100,
        height: 100,
        borderRadius: 7,
        position: "absolute"
    }
})