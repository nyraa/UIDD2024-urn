"use client"

import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'


function Bottle({ props })
{
    const meshRef = useRef();
    const obj = useLoader(OBJLoader, "bottle-125.obj");
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={1}
            onClick={(event) => setActive(!active)}>
            <primitive object={obj} scale={30} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    )
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
            <Environment preset="sunset" background />
            <Bottle position={[0, 0, 0]} />
        </Canvas>
    )
}