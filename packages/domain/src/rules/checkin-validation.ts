import type { Coordinates } from '../entities/place.js';

/**
 * Haversine great-circle distance in meters between two lat/lng points.
 * Pure function — useful for client-side optimistic checks and tests.
 * Server must still re-validate with PostGIS ST_DWithin for security.
 */
export function haversineMeters(a: Coordinates, b: Coordinates): number {
  const R = 6_371_000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return 2 * R * Math.asin(Math.sqrt(h));
}

export interface CheckinValidationResult {
  valid: boolean;
  distanceMeters: number;
  maxRadiusMeters: number;
}

export function validateCheckinDistance(
  userCoords: Coordinates,
  placeCoords: Coordinates,
  radiusMeters: number,
): CheckinValidationResult {
  const distance = haversineMeters(userCoords, placeCoords);
  return {
    valid: distance <= radiusMeters,
    distanceMeters: Math.round(distance),
    maxRadiusMeters: radiusMeters,
  };
}
