"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TextureLoader } from 'three';
import * as THREE from 'three';


function Bottle({ props })
{
    const meshRef = useRef();
    const obj = useLoader(OBJLoader, "bottle-125.obj");
    const texture = useLoader(TextureLoader, "assets/Group_6.png");
    obj.traverse((child) => {
        if(child.isMesh)
        {
            child.material = new THREE.MeshStandardMaterial({map: texture});
        }
    });
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={1}>
            <primitive object={obj} scale={30} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}
function CameraContrls()
{
    const { camera, gl } = useThree();
    const controlRef = useRef();
    useEffect(() => {
        const radius = 5;
        const polarAngle = (3 / 8) * Math.PI;
        camera.position.set(
            radius * Math.sin(polarAngle),
            radius * Math.cos(polarAngle),
            0
        );
        camera.lookAt(0, 0, 10);
        if(controlRef.current)
        {
            controlRef.current.update();
        }
    }, [camera]);


    return <OrbitControls
        ref={controlRef}
        args={[camera, gl.domElement]}
        minPolarAngle={2 * Math.PI / 8}
        maxPolarAngle={3 * Math.PI / 8}
        enableZoom={false}
    />;
}

function Box(props)
{
    // This reference will give us direct access to the mesh
    const meshRef = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {meshRef.current.rotation.x += delta; meshRef.current.rotation.y += delta})
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}


export default function Page() {
    return (
        <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Bottle position={[0, 0, 0]} />
            <CameraContrls />
        </Canvas>
    )
}