// C>Connect — Google Maps config.
// Reads VITE_GOOGLE_MAPS_API_KEY. When absent, hasGoogleMaps is false and the
// SchoolsMap component falls back to the stylised MapView.
export const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
export const hasGoogleMaps = Boolean(googleMapsKey);
