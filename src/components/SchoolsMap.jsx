// C>Connect — schools map. Real Google Map when VITE_GOOGLE_MAPS_API_KEY is set,
// otherwise the stylised fallback. Both support multi-select (selected[] + onToggle).
import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { hasGoogleMaps, googleMapsKey } from '../lib/maps.js';
import { pinColor } from '../shell.jsx';
import { Icon } from '../icons.jsx';

const PIN_HEX = { contacted: '#008CE3', visited: '#00A987', pending: '#FFC622', new: '#9AA5B4' };

function GoogleSchools({ schools, selected, onToggle, height }) {
  const { isLoaded } = useJsApiLoader({ id: 'cc-gmaps', googleMapsApiKey: googleMapsKey });
  const mapRef = React.useRef(null);

  const fit = React.useCallback((map) => {
    if (!map || !schools.length || !window.google) return;
    const b = new window.google.maps.LatLngBounds();
    schools.forEach((s) => b.extend({ lat: s.lat, lng: s.lng }));
    map.fitBounds(b, 48);
    if (schools.length === 1) map.setZoom(11);
  }, [schools]);

  const onLoad = React.useCallback((map) => { mapRef.current = map; fit(map); }, [fit]);
  React.useEffect(() => { if (mapRef.current) fit(mapRef.current); }, [fit]);

  if (!isLoaded) {
    return <div style={{ height, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--text-muted)', fontSize: 13, background: 'var(--neutral-100)', borderRadius: 'var(--radius-md)' }}>Loading map…</div>;
  }
  return (
    <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
      <GoogleMap mapContainerStyle={{ width: '100%', height }} onLoad={onLoad}
        center={{ lat: 51, lng: 10 }} zoom={5}
        options={{ disableDefaultUI: true, zoomControl: true, clickableIcons: false, gestureHandling: 'greedy' }}>
        {schools.map((s) => {
          const sel = selected.includes(s.id);
          return (
            <MarkerF key={s.id} position={{ lat: s.lat, lng: s.lng }} onClick={() => onToggle(s.id)} title={s.name}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: sel ? 10 : 6.5,
                fillColor: sel ? '#00204D' : (PIN_HEX[s.status] || '#00204D'),
                fillOpacity: 1, strokeColor: sel ? '#FFC622' : '#fff', strokeWeight: sel ? 3 : 2,
              }} />
          );
        })}
      </GoogleMap>
    </div>
  );
}

function StylisedSchools({ schools, selected, onToggle, height }) {
  return (
    <div style={{ position: 'relative', width: '100%', height, flexShrink: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)',
      background: 'linear-gradient(180deg,#eef3f7,#e4ebf2)', border: '1px solid var(--border-subtle)' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5,
        backgroundImage: 'linear-gradient(var(--neutral-200) 1px,transparent 1px),linear-gradient(90deg,var(--neutral-200) 1px,transparent 1px)',
        backgroundSize: '30px 30px' }} />
      {schools.map((s) => {
        const sel = selected.includes(s.id);
        return (
          <button key={s.id} onClick={() => onToggle(s.id)} title={s.name} style={{
            position: 'absolute', left: s.x + '%', top: s.y + '%', transform: 'translate(-50%,-100%)',
            background: 'none', border: 'none', cursor: 'pointer', padding: 4, zIndex: sel ? 5 : 1 }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: sel ? 32 : 24, height: sel ? 32 : 24, borderRadius: '50% 50% 50% 2px',
              transform: 'rotate(45deg)', background: sel ? 'var(--cu-navy)' : pinColor(s.status),
              border: sel ? '2px solid var(--cu-shiny-yellow)' : '2px solid #fff', boxShadow: 'var(--shadow-md)',
              transition: 'all .15s' }}>
              <span style={{ transform: 'rotate(-45deg)', display: 'flex' }}>
                {sel ? <Icon name="check" size={14} color="#fff" stroke={3} />
                     : <Icon name="school" size={12} color="#fff" stroke={2.4} />}
              </span>
            </span>
          </button>
        );
      })}
      {!schools.length && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-muted)', fontSize: 13 }}>No schools match your filters.</div>
      )}
    </div>
  );
}

export function SchoolsMap({ schools, selected = [], onToggle, height = 240 }) {
  return hasGoogleMaps
    ? <GoogleSchools schools={schools} selected={selected} onToggle={onToggle} height={height} />
    : <StylisedSchools schools={schools} selected={selected} onToggle={onToggle} height={height} />;
}
