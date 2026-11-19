"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Network nodes: floating points connected by lines ─────── */
function NetworkNodes({ count = 60 }: { count?: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const elapsedRef = useRef(0);

    const { positions, velocities, colors } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const cyan = new THREE.Color("#06b6d4");
        const purple = new THREE.Color("#a855f7");
        const indigo = new THREE.Color("#6366f1");

        const palette = [cyan, purple, indigo];

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

            vel[i * 3] = (Math.random() - 0.5) * 0.003;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;

            const c = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }
        return { positions: pos, velocities: vel, colors: col };
    }, [count]);

    // Pre-allocate line geometry for connections
    const maxLines = count * 3;
    const linePositions = useMemo(
        () => new Float32Array(maxLines * 6),
        [maxLines]
    );
    const lineColors = useMemo(
        () => new Float32Array(maxLines * 6),
        [maxLines]
    );

    useFrame((_state, delta) => {
        if (!pointsRef.current || !linesRef.current) return;
        elapsedRef.current += delta;

        const posAttr = pointsRef.current.geometry.attributes
            .position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        const dt = Math.min(delta, 0.1) * 60;

        // Update node positions
        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = ix + 1;
            const iz = ix + 2;

            // Gentle sine wave drift
            arr[ix] +=
                velocities[ix] * dt +
                Math.sin(elapsedRef.current * 0.3 + i * 0.5) * 0.001;
            arr[iy] +=
                velocities[iy] * dt +
                Math.cos(elapsedRef.current * 0.2 + i * 0.3) * 0.001;
            arr[iz] += velocities[iz] * dt;

            // Soft boundaries
            if (arr[ix] > 8) velocities[ix] = -Math.abs(velocities[ix]);
            if (arr[ix] < -8) velocities[ix] = Math.abs(velocities[ix]);
            if (arr[iy] > 5) velocities[iy] = -Math.abs(velocities[iy]);
            if (arr[iy] < -5) velocities[iy] = Math.abs(velocities[iy]);
            if (arr[iz] > 2) velocities[iz] = -Math.abs(velocities[iz]);
            if (arr[iz] < -6) velocities[iz] = Math.abs(velocities[iz]);
        }
        posAttr.needsUpdate = true;

        // Build connection lines between nearby nodes
        let lineCount = 0;
        const connectionDist = 3.5;

        for (let i = 0; i < count && lineCount < maxLines; i++) {
            for (let j = i + 1; j < count && lineCount < maxLines; j++) {
                const dx = arr[i * 3] - arr[j * 3];
                const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
                const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < connectionDist) {
                    const alpha = 1 - dist / connectionDist;
                    const li = lineCount * 6;

                    linePositions[li] = arr[i * 3];
                    linePositions[li + 1] = arr[i * 3 + 1];
                    linePositions[li + 2] = arr[i * 3 + 2];
                    linePositions[li + 3] = arr[j * 3];
                    linePositions[li + 4] = arr[j * 3 + 1];
                    linePositions[li + 5] = arr[j * 3 + 2];

                    // Cyan connection color with distance-based opacity
                    lineColors[li] = 0.024 * alpha;
                    lineColors[li + 1] = 0.714 * alpha;
                    lineColors[li + 2] = 0.831 * alpha;
                    lineColors[li + 3] = 0.024 * alpha;
                    lineColors[li + 4] = 0.714 * alpha;
                    lineColors[li + 5] = 0.831 * alpha;

                    lineCount++;
                }
            }
        }

        // Update line geometry
        const lineGeo = linesRef.current.geometry;
        const linePosAttr = lineGeo.attributes
            .position as THREE.BufferAttribute;
        const lineColAttr = lineGeo.attributes.color as THREE.BufferAttribute;
        linePosAttr.needsUpdate = true;
        lineColAttr.needsUpdate = true;
        lineGeo.setDrawRange(0, lineCount * 2);
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                        count={count}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                        count={count}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.06}
                    vertexColors
                    transparent
                    opacity={0.9}
                    sizeAttenuation
                    depthWrite={false}
                />
            </points>

            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                        count={maxLines * 2}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[lineColors, 3]}
                        count={maxLines * 2}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.3}
                    depthWrite={false}
                />
            </lineSegments>
        </>
    );
}

/* ─── Rotating wireframe globe ─────────────────────────────── */
function CyberGlobe() {
    const meshRef = useRef<THREE.Mesh>(null);
    const elapsedRef = useRef(0);

    useFrame((_state, delta) => {
        if (!meshRef.current) return;
        elapsedRef.current += delta;
        meshRef.current.rotation.y = elapsedRef.current * 0.08;
        meshRef.current.rotation.x =
            Math.sin(elapsedRef.current * 0.05) * 0.1;
    });

    return (
        <mesh ref={meshRef} position={[3.5, -0.5, -3]}>
            <icosahedronGeometry args={[2, 2]} />
            <meshBasicMaterial
                color="#06b6d4"
                wireframe
                transparent
                opacity={0.06}
            />
        </mesh>
    );
}

/* ─── Floating binary/hex data streams ─────────────────────── */
function DataStream() {
    const groupRef = useRef<THREE.Group>(null);
    const elapsedRef = useRef(0);

    const particles = useMemo(() => {
        const count = 40;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = -7 + (i % 10) * 1.5 + (Math.random() - 0.5) * 0.5;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = -4 + Math.random() * 2;

            const brightness = 0.3 + Math.random() * 0.7;
            col[i * 3] = 0.024 * brightness;
            col[i * 3 + 1] = 0.714 * brightness;
            col[i * 3 + 2] = 0.831 * brightness;
        }
        return { positions: pos, colors: col, count };
    }, []);

    useFrame((_state, delta) => {
        if (!groupRef.current) return;
        elapsedRef.current += delta;

        const children = groupRef.current.children;
        if (children.length === 0) return;
        const points = children[0] as THREE.Points;
        const posAttr = points.geometry.attributes
            .position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;

        for (let i = 0; i < particles.count; i++) {
            arr[i * 3 + 1] -= delta * (0.3 + (i % 5) * 0.15);
            if (arr[i * 3 + 1] < -5) {
                arr[i * 3 + 1] = 5 + Math.random() * 2;
            }
        }
        posAttr.needsUpdate = true;
    });

    return (
        <group ref={groupRef}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[particles.positions, 3]}
                        count={particles.count}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[particles.colors, 3]}
                        count={particles.count}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.035}
                    vertexColors
                    transparent
                    opacity={0.5}
                    sizeAttenuation
                    depthWrite={false}
                />
            </points>
        </group>
    );
}

/* ─── CSS fallback for failed WebGL ────────────────────────── */
function CSSFallback() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div
                className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl animate-pulse"
                style={{
                    background:
                        "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
                    animationDuration: "4s",
                }}
            />
            <div
                className="absolute -bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl animate-pulse"
                style={{
                    background:
                        "radial-gradient(circle, #a855f7 0%, transparent 70%)",
                    animationDuration: "6s",
                }}
            />
        </div>
    );
}

/* ─── Main export ──────────────────────────────────────────── */
export default function AnimatedBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 55 }}
                dpr={[1, 1.5]}
                style={{ background: "transparent" }}
                gl={{ antialias: true, alpha: true }}
                fallback={<CSSFallback />}
            >
                <NetworkNodes />
                <CyberGlobe />
                <DataStream />
            </Canvas>
        </div>
    );
}
