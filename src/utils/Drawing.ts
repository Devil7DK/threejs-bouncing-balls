import { Point, Point2 } from '../types';

export const connectPoints = (points: Point[]): Point2[] =>
    points.map((point1, index, arr) => [
        point1,
        points[index === points.length - 1 ? 0 : index + 1],
    ]);
