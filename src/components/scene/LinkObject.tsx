import {Html, RoundedBox} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {useRef} from 'react'
import type {Group} from 'three'
import type {LinkItem} from '../../types/content'
import {useExperienceStore} from '../../store/useExperienceStore'

type LinkObjectProps = {
  item: LinkItem
  position: [number, number, number]
  rotation: [number, number, number]
}

export function LinkObject({item, position, rotation}: LinkObjectProps) {
  const group = useRef<Group>(null)
  const setActiveLinkId = useExperienceStore((state) => state.setActiveLinkId)

  useFrame((state, delta) => {
    if (!group.current) return
    const targetY = rotation[1] + Math.sin(state.clock.elapsedTime * 0.45 + position[0]) * 0.08
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 3, 1)
  })

  return (
    <group ref={group} position={position} rotation={rotation}>
      <RoundedBox args={[2.5, 1.35, 0.16]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#16181d" metalness={0.35} roughness={0.25} />
      </RoundedBox>
      <mesh position={[-0.88, 0.43, 0.1]}>
        <circleGeometry args={[0.09, 32]} />
        <meshBasicMaterial color={item.accent || '#d8ff65'} />
      </mesh>
      <Html transform position={[0, 0, 0.11]} distanceFactor={1.55}>
        <a
          className="scene-link"
          href={item.url}
          onFocus={() => setActiveLinkId(item._id)}
          onBlur={() => setActiveLinkId(null)}
          onPointerEnter={() => setActiveLinkId(item._id)}
          onPointerLeave={() => setActiveLinkId(null)}
        >
          <span>{item.eyebrow || 'Open'}</span>
          <strong>{item.title}</strong>
          <i aria-hidden="true">↗</i>
        </a>
      </Html>
    </group>
  )
}
