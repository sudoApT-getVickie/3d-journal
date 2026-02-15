import { Canvas } from '@react-three/fiber'
import { useGLTF, PresentationControls, Environment, ContactShadows, Center } from '@react-three/drei'
import './App.css'

function Model(props) {
  const { scene } = useGLTF('/lamborghini.glb')
  return <primitive object={scene} {...props} />
}

export default function App() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 25 }} style={{ position: "absolute" }}>
      <color attach="background" args={['#101010']} />

      {/* High-End Environment & Lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />

      <PresentationControls speed={1.5} global zoom={1.3} polar={[-0.1, Math.PI / 4]}>
        <Center>
          <Model scale={1.3} />
        </Center>
      </PresentationControls>

      {/* Realistic Shadow */}
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </Canvas>
  )
}