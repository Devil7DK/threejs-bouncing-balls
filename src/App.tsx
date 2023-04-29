import './App.scss';

import { Canvas } from '@react-three/fiber';
import React from 'react';

import { Box } from './Box';

export const App: React.FC = () => {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
    );
};