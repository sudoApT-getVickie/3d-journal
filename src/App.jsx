import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PresentationControls, Environment, ContactShadows, Center, ScrollControls, useScroll, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'

function Model(props) {
  const { scene } = useGLTF('/lamborghini.glb')
  return <primitive object={scene} {...props} />
}

function LamborghiniScene() {
  const scroll = useScroll()
  const groupRef = useRef()

  // Define palette colors
  const bgStart = new THREE.Color('#050506')
  const bgEnd = new THREE.Color('#5E4705')

  useFrame((state, delta) => {
    // Rotate the group based on scroll position
    if (groupRef.current) {
      groupRef.current.rotation.y = scroll.offset * Math.PI * 2
    }

    // Background Color Lerp
    if (!state.scene.background) {
      state.scene.background = new THREE.Color('#050506')
    }
    // Check if background is a Color object before lerping
    if (state.scene.background instanceof THREE.Color) {
      state.scene.background.lerpColors(bgStart, bgEnd, scroll.offset)
    }
  })

  return (
    <group ref={groupRef}>
      <Float
        speed={2} // Animation speed
        rotationIntensity={1} // XYZ rotation intensity
        floatIntensity={2} // Up/down float intensity
      >
        <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
          <Center>
            <Model scale={1.1} />
          </Center>
        </PresentationControls>
      </Float>
    </group>
  )
}

export default function App() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ position: "absolute" }}>
      {/* Initial background color will be managed by useFrame */}
      <color attach="background" args={['#050506']} />

      {/* High-End Environment & Lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />

      {/* Particles: Added gold color to match */}
      <Sparkles
        count={50}
        scale={10}
        size={4}
        speed={0.4}
        opacity={0.5}
        color="#E5D352"
      />

      <ScrollControls pages={3} damping={0.2}>
        <LamborghiniScene />
      </ScrollControls>

      {/* Realistic Shadow */}
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </Canvas>
  )
}