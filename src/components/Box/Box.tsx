import React, { useMemo } from 'react';

import { Point, Point2 } from '../../types';
import { connectPoints } from '../../utils/Drawing';
import { Line } from '../Line';

interface IProps {
    position: Point;
    height: number;
    width: number;
    length: number;
}

export const Box: React.FC<IProps> = (props) => {
    const lines = useMemo<Point2[]>(() => {
        const {
            position: [x, y, z],
            height,
            width,
            length,
        } = props;

        const rect2d = [
            [x - width / 2, y + height / 2],
            [x + width / 2, y + height / 2],
            [x + width / 2, y - height / 2],
            [x - width / 2, y - height / 2],
        ];

        return [
            ...connectPoints(rect2d.map(([x, y]) => [x, y, z - length / 2])),
            ...connectPoints(rect2d.map(([x, y]) => [x, y, z + length / 2])),
            ...rect2d.map<Point2>(([x, y]) => [
                [x, y, z - length / 2],
                [x, y, z + length / 2],
            ]),
        ];
    }, [props.height, props.width]);

    return (
        <>
            {lines.map(([start, end], index) => (
                <Line key={`line-${index}`} start={start} end={end} />
            ))}
        </>
    );
};
