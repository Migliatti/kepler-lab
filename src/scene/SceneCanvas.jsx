import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { CAMERA_TRAVEL_MIN_DISTANCE } from './cameraTravel.js'
import { CameraTraveller } from './CameraTraveller.jsx'
import { EARTH_CAMERA_POSITION } from './layout.js'
import { Starfield } from './Starfield.jsx'

export function SceneCanvas({ children, travel, sceneDestinations, onTravelComplete }) {
  return (
    <Canvas camera={{ position: EARTH_CAMERA_POSITION, fov: 48 }} dpr={[1, 1.5]}>
      <color attach="background" args={['#03050c']} />
      <Starfield />
      <ambientLight intensity={0.45} />
      <directionalLight position={[8, 12, 10]} intensity={1.2} />
      {children}
      <CameraTraveller
        travel={travel}
        sceneDestinations={sceneDestinations}
        onTravelComplete={onTravelComplete}
      />
      <OrbitControls
        makeDefault
        enabled={travel?.status !== 'travelling'}
        enablePan
        minDistance={CAMERA_TRAVEL_MIN_DISTANCE}
        maxDistance={90}
      />
    </Canvas>
  )
}
