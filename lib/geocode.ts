export interface GeocodedLocation {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

/**
 * Resolves GPS coordinates to a place name.
 *
 * No geocoding provider is configured for this project (no API key, no
 * server-side proxy, no existing service anywhere in the repo). This calls
 * OpenStreetMap's free, keyless Nominatim reverse-geocoding endpoint as a
 * functional placeholder — it needs no secret, so it's safe to call
 * directly from the client, but its usage policy caps requests at roughly
 * 1/sec and it isn't meant for production-scale traffic. Swap this
 * implementation for Dhyana's production geocoding provider (Google Maps,
 * Mapbox, etc.) behind this same function signature when one is
 * configured — nothing else in the app needs to change.
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<GeocodedLocation> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10`;
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`Reverse geocoding failed with status ${response.status}`);
  }

  const data = await response.json();
  const address = data?.address ?? {};
  const city: string | undefined =
    address.city || address.town || address.village || address.county || address.state_district;

  if (!city) {
    throw new Error("Reverse geocoding did not return a resolvable city");
  }

  return {
    city,
    state: address.state ?? "",
    country: address.country ?? "",
    latitude,
    longitude,
  };
}
