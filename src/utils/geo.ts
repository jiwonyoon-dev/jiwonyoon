// src/utils/geo.ts

// ——————————————————————————————————————————
// 타입 & 상수
// ——————————————————————————————————————————
export type LatLng = [number, number]
const RADIUS_EARTH = 6_371_000 // 지구 반지름 (m)

// ——————————————————————————————————————————
// 좌표 데이터
// ——————————————————————————————————————————
export const pathCoords: LatLng[] = [
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

// ——————————————————————————————————————————
// 헬퍼 함수
// ——————————————————————————————————————————
/** 도(deg) → 라디안(rad) */
export const toRad = (deg: number): number => (deg * Math.PI) / 180

/** 두 지점 사이 거리(m, Haversine) */
export const getDistanceMeters = ([lon1, lat1]: LatLng, [lon2, lat2]: LatLng): number => {
  const φ1 = toRad(lat1)
  const φ2 = toRad(lat2)
  const Δφ = toRad(lat2 - lat1)
  const Δλ = toRad(lon2 - lon1)

  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return RADIUS_EARTH * c
}

/** 전체 경로 총 거리(m) */
export const calculateTotalDistance = (path: LatLng[] = pathCoords): number =>
  path.slice(0, -1).reduce((sum, cur, i) => sum + getDistanceMeters(cur, path[i + 1]), 0)

/** 현재 위치에서 남은 거리(m) */
export const calculateRemainingDistance = (current: LatLng, path: LatLng[] = pathCoords, index: number): number => {
  let dist = getDistanceMeters(current, path[index + 1])
  for (let i = index + 1; i < path.length - 1; i++) {
    dist += getDistanceMeters(path[i], path[i + 1])
  }
  return dist
}

/** 두 지점 사이 방위각(0~360°) */
export const getBearing = ([lon1, lat1]: LatLng, [lon2, lat2]: LatLng): number => {
  const φ1 = toRad(lat1)
  const φ2 = toRad(lat2)
  const Δλ = toRad(lon2 - lon1)

  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)

  const θ = Math.atan2(y, x)
  return ((θ * 180) / Math.PI + 360) % 360
}
