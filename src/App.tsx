import './App.scss';

import { Canvas } from '@react-three/fiber';
import React from 'react';

import { Box } from './Box';

export const App: React.FC = () => {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[0, 0, 0]} height={10} length={10} width={10} />
        </Canvas>
    );
};
