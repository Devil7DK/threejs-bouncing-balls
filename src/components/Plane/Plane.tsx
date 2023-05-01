import React, { useMemo } from 'react';
import { ColorRepresentation, DoubleSide, Euler, MathUtils } from 'three';

import { BoxProps } from '../../types';

interface IProps {
    color?: ColorRepresentation;
    side: 'right' | 'left' | 'top' | 'bottom' | 'front' | 'back';
    box: BoxProps;
}

export const Plane: React.FC<IProps> = (props) => {
    const position = useMemo<[number, number, number]>(() => {
        switch (props.side) {
            case 'right':
                return [props.box.position[0] + props.box.width / 2, 0, 0];
            case 'left':
                return [props.box.position[0] - props.box.width / 2, 0, 0];
            case 'top':
                return [0, props.box.position[1] + props.box.height / 2, 0];
            case 'bottom':
                return [0, props.box.position[1] - props.box.height / 2, 0];
            case 'front':
                return [0, 0, props.box.position[2] + props.box.length / 2];
            case 'back':
                return [0, 0, props.box.position[2] - props.box.length / 2];
            default:
                return [0, 0, 0];
        }
    }, [props.side]);

    const rotation = useMemo(
        () =>
            new Euler(
                props.side === 'top' || props.side === 'bottom'
                    ? MathUtils.degToRad(90)
                    : 0,
                props.side === 'right' || props.side === 'left'
                    ? MathUtils.degToRad(90)
                    : 0,
                0
            ),
        [props.side]
    );

    return (
        <mesh position={position} rotation={rotation}>
            <planeGeometry
                args={
                    props.side === 'front' || props.side === 'back'
                        ? [props.box.width, props.box.height]
                        : props.side === 'right' || props.side === 'left'
                        ? [props.box.length, props.box.height]
                        : [props.box.width, props.box.length]
                }
            />
            <meshBasicMaterial
                color={props.color || 'red'}
                opacity={0.1}
                side={DoubleSide}
                transparent
            />
        </mesh>
    );
};
