import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { PanGestureHandler, GestureEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import Food from './Food';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { Direction, Coordinate } from '../../../types/types';
import { checkFoot } from '../../../utils/checkFoot';
import { checkGameOver } from '../../../utils/checkGameOver';
import { positionFood } from '../../../utils/posotionFood';
import Snake from './Snake';



const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOO_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVIE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = useState<Coordinate>(FOO_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        if (!isGameOver) {
            const intervalID = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVIE_INTERVAL);
            return () => clearInterval(intervalID);
        }
    }, [isGameOver, snake, isPaused]);

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead };

        // Game Over
        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev);
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Dowm:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
                break;
            default:
                break;
        }
        // Check foot
        if (checkFoot(newHead, food, 2)) {
            setFood(positionFood(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
            setSnake([newHead, ...snake]);
            setScore(score + SCORE_INCREMENT);
        } else {
            setSnake([newHead, ...snake.slice(0, -1)]);
        }

    };

    const handleGesture = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        const { translationX, translationY } = event.nativeEvent;
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setDirection(Direction.Right);
            } else {
                setDirection(Direction.Left);
            }
        } else {
            if (translationY > 0) {
                setDirection(Direction.Dowm);
            } else {
                setDirection(Direction.Up);
            }
        }
    };

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOO_INITIAL_POSITION);
        setIsGameOver(false),
            setScore(0);
        setDirection(Direction.Right);
        setIsPaused(false);
    };

    const pausedGame = () => {
        setIsPaused(!isPaused);
    }
    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <Header
                    reloadGame={reloadGame}
                    isPaused={isPaused}
                    puseGame={pausedGame}
                >
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: Colors.primary,
                    }}>{score}</Text>
                </Header>
                <View style={styles.bondaries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    bondaries: {
        flex: 1,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: Colors.primary,
        backgroundColor: Colors.background,
    },
});