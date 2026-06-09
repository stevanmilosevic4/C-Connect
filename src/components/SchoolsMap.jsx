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

// Project schools onto the box by real lat/lng, aspect-preserved and centred,
// so dots land approximately where each city sits within the country.
function project(schools, W, H, pad = 30) {
  const n = schools.length;
  if (!n || !W || !H) return schools.map(() => null);
  const meanLat = schools.reduce((a, s) => a + s.lat, 0) / n;
  const k = Math.cos((meanLat * Math.PI) / 180) || 1; // longitude compression at this latitude
  const gx = (s) => s.lng * k;
  const gy = (s) => -s.lat;                            // north is up
  const xs = schools.map(gx), ys = schools.map(gy);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const gw = maxX - minX, gh = maxY - minY;
  const availW = W - 2 * pad, availH = H - 2 * pad;
  const degX = gw < 1e-6, degY = gh < 1e-6;
  let scale = Math.min(degX ? Infinity : availW / gw, degY ? Infinity : availH / gh);
  if (!isFinite(scale)) scale = Math.min(availW, availH);
  const offX = pad + (availW - (degX ? 0 : gw * scale)) / 2;
  const offY = pad + (availH - (degY ? 0 : gh * scale)) / 2;
  return schools.map((s) => ({
    x: degX ? W / 2 : offX + (gx(s) - minX) * scale,
    y: degY ? H / 2 : offY + (gy(s) - minY) * scale,
  }));
}

function StylisedSchools({ schools, selected, onToggle, height }) {
  const ref = React.useRef(null);
  const [size, setSize] = React.useState({ w: 0, h: height });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pts = project(schools, size.w, size.h);
  const onlyCountry = schools.length && schools.every((s) => s.country === schools[0].country) ? schools[0].country : null;

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height, flexShrink: 0, overflow: 'hidden',
      borderRadius: 'var(--radius-md)', background: 'linear-gradient(180deg,#eef3f7,#e4ebf2)', border: '1px solid var(--border-subtle)' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5,
        backgroundImage: 'linear-gradient(var(--neutral-200) 1px,transparent 1px),linear-gradient(90deg,var(--neutral-200) 1px,transparent 1px)',
        backgroundSize: '30px 30px' }} />
      {onlyCountry && (
        <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
          textTransform: 'uppercase', color: 'var(--text-subtle)', background: 'rgba(255,255,255,0.7)', borderRadius: 6, padding: '2px 7px' }}>
          {onlyCountry} · approx. locations
        </div>
      )}
      {schools.map((s, i) => {
        const p = pts[i];
        if (!p) return null;
        const sel = selected.includes(s.id);
        return (
          <button key={s.id} onClick={() => onToggle(s.id)} title={s.name} style={{
            position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, zIndex: sel ? 5 : 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: sel ? 28 : 21, height: sel ? 28 : 21, borderRadius: '50% 50% 50% 2px',
              transform: 'rotate(45deg)', background: sel ? 'var(--cu-navy)' : pinColor(s.status),
              border: sel ? '2px solid var(--cu-shiny-yellow)' : '2px solid #fff', boxShadow: 'var(--shadow-md)',
              transition: 'all .12s' }}>
              <span style={{ transform: 'rotate(-45deg)', display: 'flex' }}>
                {sel ? <Icon name="check" size={12} color="#fff" stroke={3} />
                     : <Icon name="school" size={11} color="#fff" stroke={2.4} />}
              </span>
            </span>
            <span style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--cu-navy)', background: 'rgba(255,255,255,0.82)',
              borderRadius: 4, padding: '0 4px', whiteSpace: 'nowrap', lineHeight: 1.5 }}>{s.city}</span>
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
