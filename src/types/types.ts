export enum Direction {
    Right,
    Up,
    Left,
    Dowm,
}

export interface GestureEventType {
    nativeEvent: { translationX: number; tranlationY: number };
}

export interface Coordinate {
    x: number;
    y: number;
}