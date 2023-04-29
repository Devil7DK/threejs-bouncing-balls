import React from 'react';

import { BoxProps } from '../../types';

interface IProps {
    box: BoxProps;
    size: number;
}

export const Ball: React.FC<IProps> = (props) => {
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[props.size, 32, 32]} />
            <meshBasicMaterial args={[{ color: 0xffff00 }]} />
        </mesh>
    );
};
