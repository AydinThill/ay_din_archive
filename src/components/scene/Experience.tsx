import {Float} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import type {LinkItem} from '../../types/content'
import {LinkObject} from './LinkObject'

const positions: [number, number, number][] = [
  [-1.6, 1.2, 0],
  [1.35, 0.15, -0.6],
  [-0.65, -1.25, -0.15],
]

export function Experience({links}: {links: LinkItem[]}) {
  return (
    <Canvas camera={{position: [0, 0, 6.7], fov: 42}} dpr={[1, 1.75]}>
      <color attach="background" args={['#090a0d']} />
      <fog attach="fog" args={['#090a0d', 6, 12]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 6]} intensity={3.5} color="#fff8e8" />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#745cff" />
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.45}>
        {links.slice(0, 3).map((item, index) => (
          <LinkObject
            key={item._id}
            item={item}
            position={positions[index]}
            rotation={[0.03, index % 2 ? -0.18 : 0.14, index === 1 ? 0.08 : -0.04]}
          />
        ))}
      </Float>
    </Canvas>
  )
}
