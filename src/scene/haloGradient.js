export function buildHaloPixels(size) {
  const pixels = new Uint8Array(size * size * 4)
  const half = size / 2

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x + 0.5 - half) / half
      const dy = (y + 0.5 - half) / half
      const distanceSquared = dx * dx + dy * dy
      const alpha = Math.pow(Math.max(0, 1 - distanceSquared), 3)
      const offset = (y * size + x) * 4

      pixels[offset] = 255
      pixels[offset + 1] = 255
      pixels[offset + 2] = 255
      pixels[offset + 3] = Math.round(alpha * 255)
    }
  }

  return pixels
}
