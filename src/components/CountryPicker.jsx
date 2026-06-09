// C>Connect — country picker. Inline expandable list of all world countries,
// alphabetical, with a search box and an A–Z rail that jumps to a letter.
import React from 'react';
import { Icon } from '../icons.jsx';
import { worldCountries } from '../data.js';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function CountryPicker({ value, onSelect, exclude = [], placeholder = 'Choose a country' }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const scrollRef = React.useRef(null);

  const q = query.trim().toLowerCase();
  const list = worldCountries.filter((c) => !exclude.includes(c) && (!q || c.toLowerCase().includes(q)));
  const letters = [...new Set(list.map((c) => c[0].toUpperCase()))];

  const jumpTo = (L) => {
    const cont = scrollRef.current;
    const el = cont?.querySelector(`[data-letter="${L}"]`);
    if (el && cont) cont.scrollTop = el.offsetTop;
  };

  return (
    <div>
      <button type="button" className="cu-input" onClick={() => setOpen((o) => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ color: value ? 'var(--text-strong)' : 'var(--text-subtle)' }}>{value || placeholder}</span>
        <Icon name="chevronRight" size={16} color="var(--neutral-400)"
          style={{ transform: open ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform .15s' }} />
      </button>
      {open && (
        <div style={{ marginTop: 6, border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
          overflow: 'hidden', background: '#fff' }}>
          <div style={{ padding: 8, borderBottom: '1px solid var(--border-subtle)' }}>
            <input className="cu-input" placeholder="Search countries…" value={query}
              onChange={(e) => setQuery(e.target.value)} autoFocus />
          </div>
          <div style={{ display: 'flex', height: 300 }}>
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
              {list.length === 0 && (
                <div style={{ padding: 14, fontSize: 13, color: 'var(--text-muted)' }}>No countries match.</div>
              )}
              {letters.map((L) => (
                <div key={L} data-letter={L}>
                  <div style={{ position: 'sticky', top: 0, background: 'var(--surface-subtle)', padding: '4px 12px',
                    fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>{L}</div>
                  {list.filter((c) => c[0].toUpperCase() === L).map((c) => (
                    <button key={c} type="button" onClick={() => { onSelect(c); setOpen(false); setQuery(''); }}
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', border: 'none',
                        borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer', fontSize: 14,
                        fontFamily: 'var(--font-sans)', color: 'var(--text-strong)',
                        background: c === value ? 'var(--status-info-bg)' : '#fff' }}>{c}</button>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ width: 24, flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'space-between', padding: '6px 0', borderLeft: '1px solid var(--border-subtle)',
              background: 'var(--surface-subtle)' }}>
              {ALPHABET.map((L) => {
                const has = letters.includes(L);
                return (
                  <button key={L} type="button" onClick={() => jumpTo(L)} disabled={!has}
                    style={{ border: 'none', background: 'none', padding: 0, lineHeight: 1, fontSize: 9.5, fontWeight: 700,
                      cursor: has ? 'pointer' : 'default', color: has ? 'var(--cu-mobility-blue)' : 'var(--neutral-300)' }}>{L}</button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
