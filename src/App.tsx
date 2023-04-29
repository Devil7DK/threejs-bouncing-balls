import './App.scss';

import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';

import { Box } from './components';

export const App: React.FC = () => {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[0, 0, 0]} height={10} length={10} width={10} />

            <CameraControls distance={20} azimuthAngle={10} polarAngle={1} />
        </Canvas>
    );
};
