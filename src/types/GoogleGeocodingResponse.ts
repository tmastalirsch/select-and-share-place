
/**
 * @type
 * @description Describe an google maps api geocoding result 
 * @author tmastalirsch
 */
export type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number; } } } [],
    status: 'OK' | 'ZERO_RESULTS' | 'INVALID_REQUEST',
}