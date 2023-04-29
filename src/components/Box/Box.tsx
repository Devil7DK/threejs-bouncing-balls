import React, { useMemo } from 'react';

import { BoxProps, Point2 } from '../../types';
import { connectPoints } from '../../utils/Drawing';
import { Line } from '../Line';

export const Box: React.FC<BoxProps> = (props) => {
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
