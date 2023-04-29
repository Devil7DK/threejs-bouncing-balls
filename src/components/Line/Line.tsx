import { Object3DNode, extend, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

import { Point } from '../../types';

extend({ Line_: THREE.Line });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            line_: Object3DNode<THREE.Line, typeof THREE.Line>;
        }
    }
}

interface IProps {
    start: Point;
    end: Point;
}

export const Line: React.FC<IProps> = (props) => {
    const ref = useRef<THREE.Line>(null);

    useFrame(() => {
        if (ref.current) {
            ref.current.geometry.setFromPoints(
                [props.start, props.end].map(
                    (point) => new THREE.Vector3(...point)
                )
            );
        }
    });
    return (
        <line_ ref={ref}>
            <bufferGeometry />
            <lineBasicMaterial color='hotpink' />
        </line_>
    );
};
