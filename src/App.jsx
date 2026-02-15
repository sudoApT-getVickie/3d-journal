import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PresentationControls, Environment, ContactShadows, Center, ScrollControls, useScroll, Float } from '@react-three/drei'
import './App.css'

function Model(props) {
  const { scene } = useGLTF('/lamborghini.glb')
  return <primitive object={scene} {...props} />
}

function LamborghiniScene() {
  const scroll = useScroll()
  const groupRef = useRef()

  useFrame((state, delta) => {
    // Rotate the group based on scroll position
    if (groupRef.current) {
      groupRef.current.rotation.y = scroll.offset * Math.PI * 2
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
      <color attach="background" args={['#101010']} />

      {/* High-End Environment & Lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />

      <ScrollControls pages={3} damping={0.2}>
        <LamborghiniScene />
      </ScrollControls>

      {/* Realistic Shadow */}
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </Canvas>
  )
}