import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PresentationControls, Environment, ContactShadows, Center, ScrollControls, useScroll, Float, Sparkles, Scroll } from '@react-three/drei'
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
      {/* Initial background color (will be updated by the lerp in LamborghiniScene) */}
      <color attach="background" args={['#050506']} />

      {/* Lighting & Env */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />

      {/* Particles */}
      <Sparkles
        count={50}
        scale={8}
        size={5}
        speed={0.4}
        opacity={0.7}
        color="#E5D352"
      />

      {/* SCROLL CONTROLS WRAPPER */}
      <ScrollControls pages={3} damping={0.2}>

        {/* Layer 1: The 3D Scene (Your existing component) */}
        <LamborghiniScene />

        {/* Layer 2: The HTML Text Overlay (NEW ADDITION) */}
        <Scroll html style={{ width: '100%' }}>

          {/* SECTION 1: TITLE */}
          <section style={{ height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '5vw' }}>
            <h1 style={{
              fontFamily: '"Oswald", sans-serif',
              fontSize: '12vw',
              fontWeight: '800',
              color: '#E5D352',
              lineHeight: '0.8',
              margin: 0
            }}>
              LAMBO<br />RGHINI
            </h1>
          </section>

          {/* SECTION 2: DESCRIPTION (Right Aligned) */}
          <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '5vw' }}>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '4vw', color: '#fff', margin: 0 }}>
                DEFINE
              </h2>
              <h2 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '6vw', color: '#E5D352', margin: 0 }}>
                LEGEND
              </h2>
            </div>
          </section>

          {/* SECTION 3: FOOTER (Center) */}
          <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{
              fontFamily: '"Oswald", sans-serif',
              fontSize: '15vw',
              color: 'transparent',
              WebkitTextStroke: '1px #E5D352', // Outline effect
              opacity: 0.8,
              margin: 0
            }}>
              FUTURE
            </h1>
          </section>

        </Scroll>
      </ScrollControls>

      {/* Shadow */}
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </Canvas>
  )
}