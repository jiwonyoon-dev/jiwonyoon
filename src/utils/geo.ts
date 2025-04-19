export const pathCoords: [number, number][] = [
  [127.0443732, 37.547901],
  [127.0443931, 37.5477552],
  [127.0444413, 37.5473182],
  [127.0445225, 37.5467488],
  [127.0445903, 37.546293],
  [127.0447155, 37.5452295],
  [127.0441102, 37.5453912],
  [127.0433977, 37.5455994],
  [127.043153, 37.5450269]
]

export function getDistanceMeters([lon1, lat1]: [number, number], [lon2, lat2]: [number, number]): number {
  const R = 6371000
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const φ1 = toRad(lat1)
  const φ2 = toRad(lat2)
  const Δφ = toRad(lat2 - lat1)
  const Δλ = toRad(lon2 - lon1)

  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
