import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage, CameraShake, useAnimations, useEnvironment, Environment } from '@react-three/drei'
import { useTitle } from '@/hooks/useTitle'
import HdrFile from '@/assets/hdr/potsdamer_platz_1k.hdr'
import RobotModel from '@/assets/models/robot.glb'

function Model(props) {
  const { scene, animations } = useGLTF(RobotModel)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    actions.Idle.play()
    scene.traverse(obj => obj.isMesh && (obj.receiveShadow = obj.castShadow = true))
  }, [actions, scene])

  return <primitive object={scene} {...props} />
}

function SceneContent() {
  return (
    <Stage environment={null} contactShadow={{ opacity: 1, blur: 2 }}>
      {/* environment={null} 禁用环境贴图，并加载本地hdr，解决cdn加载报错问题 */}
      <Environment files={HdrFile} />
      <Model />
    </Stage>
  )
}

export const ThreePage = props => {
  if (props.title) {
    useTitle(props.title)
  }

  return (
    <div className='three-container w-screen h-200 p-20 mx-auto'>
      <Canvas shadows camera={{ fov: 60 }}>
        <SceneContent />
        <OrbitControls makeDefault />
        <CameraShake
          maxYaw={0.1} // Max amount camera can yaw in either direction
          maxPitch={0.1} // Max amount camera can pitch in either direction
          maxRoll={0.1} // Max amount camera can roll in either direction
          yawFrequency={0.1} // Frequency of the the yaw rotation
          pitchFrequency={0.1} // Frequency of the pitch rotation
          rollFrequency={0.1} // Frequency of the roll rotation
          intensity={1} // initial intensity of the shake
          decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload(RobotModel)

export default ThreePage
