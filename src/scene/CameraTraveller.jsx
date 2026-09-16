import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import {
  CAMERA_TRAVEL_DURATION_MS,
  getCameraPositionAt,
  getDestinationCameraPosition,
} from './cameraTravel.js'

export function CameraTraveller({ travel, sceneDestinations, onTravelComplete }) {
  const { camera } = useThree()
  const originRef = useRef(null)
  const startedAtRef = useRef(null)
  const completedDestinationIdRef = useRef(null)
  const destination = sceneDestinations.find(({ id }) => id === travel?.destinationId)

  useEffect(() => {
    originRef.current = null
    startedAtRef.current = null
    completedDestinationIdRef.current = null
  }, [travel?.destinationId, travel?.status])

  useEffect(() => {
    if (travel?.status === 'travelling' && !destination && import.meta.env.DEV) {
      console.warn(`Unknown travel destination: ${travel.destinationId}`)
    }
  }, [destination, travel?.destinationId, travel?.status])

  useFrame(({ clock }) => {
    if (travel?.status !== 'travelling' || !destination) return

    if (!originRef.current) {
      originRef.current = camera.position.toArray()
      startedAtRef.current = clock.getElapsedTime()
    }

    const target = getDestinationCameraPosition(destination)
    const progress = Math.min(
      1,
      ((clock.getElapsedTime() - startedAtRef.current) * 1000) / CAMERA_TRAVEL_DURATION_MS,
    )

    camera.position.fromArray(getCameraPositionAt(originRef.current, target, progress))
    camera.lookAt(...destination.position)

    if (progress === 1 && completedDestinationIdRef.current !== destination.id) {
      completedDestinationIdRef.current = destination.id
      onTravelComplete()
    }
  })

  return null
}
