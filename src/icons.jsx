// C>Connect — icon set. Lucide-style: 24px grid, 2px stroke, round joins,
// currentColor. Outline only, no fills (per the design system iconography rules).

const P = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/><path d="M9.5 21v-6h5v6"/>',
  map: '<path d="m9 4-6 2.5v14L9 18l6 3 6-2.5v-14L15 7"/><path d="M9 4v14"/><path d="M15 7v14"/>',
  pin: '<path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.8"/>',
  star: '<path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 17l-5.4 2.5 1.2-6L3.3 9.3l6.1-.7Z"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.2 14 7 22l5-2.6L17 22l-1.2-8"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
  users: '<circle cx="9" cy="8" r="3.4"/><path d="M2.5 20c0-3.4 3-5.2 6.5-5.2s6.5 1.8 6.5 5.2"/><path d="M16 5.2A3.4 3.4 0 0 1 16 12"/><path d="M17.5 14.9c2.6.5 4 2.3 4 5.1"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  chevronLeft: '<path d="m15 5-7 7 7 7"/>',
  chevronRight: '<path d="m9 5 7 7-7 7"/>',
  bell: '<path d="M18 8.5a6 6 0 0 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14.5 18 8.5Z"/><path d="M10.3 20a2 2 0 0 0 3.4 0"/>',
  camera: '<path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2L8 4.8h8L17.5 7h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5Z"/><circle cx="12" cy="13" r="3.6"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 6.5"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.8 2.8L16 9.4"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.2"/><path d="M3.5 9.5h17"/><path d="M8 3v4M16 3v4"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.2"/><path d="m3.6 7 8.4 6 8.4-6"/>',
  phone: '<path d="M5 4h3.2l1.6 4-2.2 1.4a12 12 0 0 0 5 5L17 16l4 1.6V21a1 1 0 0 1-1.1 1A16.8 16.8 0 0 1 4 6.1 1 1 0 0 1 5 4Z"/>',
  school: '<path d="M3 9 12 4l9 5"/><path d="M5 8.4V20h14V8.4"/><path d="M9.5 20v-5h5v5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  send: '<path d="M21 4 3 11l7 2.5L13 21l8-17Z"/><path d="m10 13.5 4-4"/>',
  sparkles: '<path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6Z"/><path d="M18.5 4.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z"/>',
  hammer: '<path d="M14 6.5 17.5 3 21 6.5 17.5 10Z"/><path d="m16 8.5-2 2"/><path d="M14.5 10 6 18.5a2 2 0 0 1-3-3L11.5 7"/>',
  atom: '<circle cx="12" cy="12" r="1.6"/><path d="M12 3c-4 5-4 13 0 18 4-5 4-13 0-18Z"/><path d="M3 12c5-4 13-4 18 0-5 4-13 4-18 0Z"/>',
  gift: '<path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><path d="M3 7.5h18V11H3Z"/><path d="M12 7.5V21"/><path d="M12 7.5S10.5 3.5 8 4.2 9.5 7.5 12 7.5Zm0 0s1.5-4 4-3.3-1.5 3.3-4 3.3Z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  edit: '<path d="M14 4.5 19.5 10 9 20.5l-5.5 1 1-5.5Z"/><path d="m13 5.5 5.5 5.5"/>',
  logout: '<path d="M14 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8"/><path d="m16 8 4 4-4 4"/><path d="M20 12H9"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2 2M7.3 16.7l-2 2M18.7 18.7l-2-2M7.3 7.3l-2-2"/>',
  dollar: '<path d="M12 3v18"/><path d="M16.5 7.5C16 5.6 14 5 12 5c-2.5 0-4.5 1.2-4.5 3.3 0 4.7 9 2.4 9 7.4 0 2.1-2 3.3-4.5 3.3-2.3 0-4.2-.8-4.6-3"/>',
  arrowRight: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
  inbox: '<path d="M4 13.5 6 5h12l2 8.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><path d="M4 13.5h4l1.5 2.5h5l1.5-2.5h4"/>',
  handshake: '<path d="m11 17 2 2 4-4"/><path d="M3 9.5 7 6l4 3 2-1.5L17 10l4 1.5"/><path d="M7 6 3 9.5V15l4 3"/><path d="M21 11.5V15l-4 3"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
};

export function Icon({ name, size = 22, stroke = 2, color = 'currentColor', style = {}, ...rest }) {
  const d = P[name];
  if (!d) return null;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flex: 'none', ...style }}
      dangerouslySetInnerHTML={{ __html: d }} {...rest}
    />
  );
}

export const ICON_NAMES = Object.keys(P);
