import { MathUtils } from 'three';

export function normalize(degree: number): number {
    if (degree === 0 || isNaN(Number(degree))) {
        return 360;
    } else if (degree < 0) {
        return 360 + degree;
    } else if (degree > 360) {
        return degree - 360;
    }

    return degree;
}

export function calculateVelocityVector(
    azimuthAngle: number,
    pitch: number,
    distance: number
): { vx: number; vy: number; vz: number } {
    const vx =
        distance *
        Math.cos(MathUtils.degToRad(azimuthAngle)) *
        Math.sin(MathUtils.degToRad(pitch));
    const vy =
        distance *
        Math.sin(MathUtils.degToRad(azimuthAngle)) *
        Math.sin(MathUtils.degToRad(pitch));
    const vz = distance * Math.cos(MathUtils.degToRad(pitch));

    return { vx, vy, vz };
}
