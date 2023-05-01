import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { BufferGeometry, ColorRepresentation, Material, Mesh } from 'three';

import { BoxProps } from '../../types';
import { calculateVelocityVector, normalize } from '../../utils/Geometry';

interface IProps {
    box: BoxProps;
    azimuthAngle?: number;
    polarAngle?: number;
    color?: ColorRepresentation;
    size: number;
    bounceOnWall?: boolean;
}

export const Ball: React.FC<IProps> = (props) => {
    const ref = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);

    const angleRef = useRef({
        azimuthAngle:
            typeof props.azimuthAngle === 'number'
                ? props.azimuthAngle
                : Math.random() * 360,
        polarAngle:
            typeof props.polarAngle === 'number'
                ? props.polarAngle
                : Math.random() * 360,
    });

    useFrame((_, delta) => {
        if (ref.current) {
            const velocityVector = calculateVelocityVector(
                angleRef.current.azimuthAngle,
                angleRef.current.polarAngle,
                5 * delta
            );

            const nextPoint = {
                x: ref.current.position.x + velocityVector.vx,
                y: ref.current.position.y + velocityVector.vy,
                z: ref.current.position.z + velocityVector.vz,
            };

            const { size, box } = props;

            const right = nextPoint.x + size >= box.position[0] + box.width / 2;
            const left = nextPoint.x - size <= box.position[0] - box.width / 2;
            const top = nextPoint.y + size >= box.position[1] + box.height / 2;
            const bottom =
                nextPoint.y - size <= box.position[1] - box.height / 2;
            const front =
                nextPoint.z + size >= box.position[2] + box.length / 2;
            const back = nextPoint.z - size <= box.position[2] - box.length / 2;

            if (right || left || top || bottom || front || back) {
                console.log({ right, left, top, bottom, front, back });
                if (props.bounceOnWall !== false) {
                    if (right) {
                        angleRef.current.azimuthAngle = normalize(
                            180 - angleRef.current.azimuthAngle
                        );
                    } else if (left) {
                        angleRef.current.azimuthAngle = normalize(
                            180 - angleRef.current.azimuthAngle
                        );
                    } else if (top) {
                        angleRef.current.azimuthAngle = normalize(
                            360 - angleRef.current.azimuthAngle
                        );
                    } else if (bottom) {
                        angleRef.current.azimuthAngle = normalize(
                            360 - angleRef.current.azimuthAngle
                        );
                    }

                    if (front) {
                        angleRef.current.polarAngle = normalize(
                            180 - angleRef.current.polarAngle
                        );
                    } else if (back) {
                        angleRef.current.polarAngle = normalize(
                            180 - angleRef.current.polarAngle
                        );
                    }
                }
            } else {
                ref.current.position.set(nextPoint.x, nextPoint.y, nextPoint.z);
            }
        }
    });

    return (
        <mesh ref={ref} position={[0, 0, 0]}>
            <sphereGeometry args={[props.size, 32, 32]} />
            <meshBasicMaterial args={[{ color: props.color || 0xffff00 }]} />
        </mesh>
    );
};
