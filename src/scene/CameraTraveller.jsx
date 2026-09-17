import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { CAMERA_TRAVEL_DURATION_MS, getCameraTravelFrame } from './cameraTravel.js'

function applyFrame(camera, controls, { position, target }) {
  camera.position.fromArray(position)
  controls?.target.fromArray(target)
  camera.lookAt(...target)
}

export function CameraTraveller({ travel, sceneDestinations, onTravelComplete }) {
  const camera = useThree((state) => state.camera)
  const controls = useThree((state) => state.controls)
  const originRef = useRef(null)
  const startedAtRef = useRef(null)
  const completedDestinationIdRef = useRef(null)
  const destination = sceneDestinations.find(({ id }) => id === travel?.destinationId)
  const status = travel?.status

  useEffect(() => {
    originRef.current = null
    startedAtRef.current = null
    completedDestinationIdRef.current = null
  }, [travel?.destinationId, status])

  useEffect(() => {
    if (status === 'travelling' && !destination && import.meta.env.DEV) {
      console.warn(`Unknown travel destination: ${travel.destinationId}`)
    }
  }, [destination, travel?.destinationId, status])

  // Orbit controls are disabled by SceneCanvas during the trip. Once it ends or is skipped,
  // re-centre them on the destination so the camera keeps framing it instead of Earth.
  useEffect(() => {
    if (!controls || !destination || status !== 'arrived') return

    applyFrame(camera, controls, getCameraTravelFrame({
      originPosition: camera.position.toArray(),
      originTarget: controls.target.toArray(),
      destination,
      progress: 1,
    }))
    controls.update()
  }, [camera, controls, destination, status])

  useFrame(({ clock }) => {
    if (status !== 'travelling' || !destination) return

    if (!originRef.current) {
      originRef.current = {
        position: camera.position.toArray(),
        target: controls ? controls.target.toArray() : [0, 0, 0],
      }
      startedAtRef.current = clock.getElapsedTime()
    }

    const progress = Math.min(
      1,
      ((clock.getElapsedTime() - startedAtRef.current) * 1000) / CAMERA_TRAVEL_DURATION_MS,
    )

    applyFrame(camera, controls, getCameraTravelFrame({
      originPosition: originRef.current.position,
      originTarget: originRef.current.target,
      destination,
      progress,
    }))

    if (progress === 1 && completedDestinationIdRef.current !== destination.id) {
      completedDestinationIdRef.current = destination.id
      onTravelComplete()
    }
  })

  return null
}
