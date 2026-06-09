// C>Connect — review shell.
// Desktop: side-rail role switcher next to an iOS device frame (the design
// handoff's review surface). Phones: the app renders full-screen so it scrolls
// naturally like a real mobile app, with a small floating demo role switcher.
import React from 'react';
import { IOSDevice } from './ios-frame.jsx';
import { AppInner, Login, RoleSelect, CountrySelect } from './app.jsx';
import { Icon } from './icons.jsx';

const ROLE_META = [
  { key: 'student', label: 'Student', icon: 'user' },
  { key: 'alumni', label: 'Alumni', icon: 'award' },
  { key: 'parent', label: 'Parent', icon: 'users' },
  { key: 'rm', label: 'Constructor University Bremen', icon: 'target' },
];

// Track whether we're on a phone-sized viewport.
function useCompact() {
  const query = '(max-width: 760px)';
  const [compact, setCompact] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const on = (e) => setCompact(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return compact;
}

// Floating demo control (phones only) — switch experience / see onboarding.
function CompactRoleSwitcher({ stage, role, onPick, onLogin }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Switch demo experience" style={{
        position: 'fixed', top: 'calc(8px + env(safe-area-inset-top))', left: 12, zIndex: 2000,
        height: 34, padding: '0 12px', borderRadius: 999, border: '1px solid var(--border-subtle)',
        background: 'rgba(255,255,255,0.96)', color: 'var(--cu-navy)', fontWeight: 700, fontSize: 12.5,
        fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-md)', display: 'inline-flex',
        alignItems: 'center', gap: 6, cursor: 'pointer', backdropFilter: 'blur(6px)',
      }}>
        <Icon name="users" size={15} /> Demo
      </button>
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 2001, background: 'rgba(0,32,77,0.45)',
          display: 'flex', alignItems: 'flex-end',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: '100%', background: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18,
            padding: '8px 12px calc(18px + env(safe-area-inset-bottom))', boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 'var(--ls-label)',
              textTransform: 'uppercase', color: 'var(--text-muted)', padding: '10px 8px 6px' }}>
              Demo — view experience
            </div>
            {ROLE_META.map((r) => {
              const on = stage === 'app' && role === r.key;
              return (
                <button key={r.key} onClick={() => { onPick(r.key); setOpen(false); }}
                  style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11,
                    padding: '12px 10px', border: 'none', borderRadius: 10, cursor: 'pointer',
                    background: on ? 'var(--status-info-bg)' : 'transparent' }}>
                  <span style={{ width: 34, height: 34, borderRadius: 9, flex: 'none', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    background: on ? 'var(--cu-mobility-blue)' : 'var(--cu-navy)', color: '#fff' }}>
                    <Icon name={r.icon} size={18} /></span>
                  <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--cu-navy)' }}>{r.label}</span>
                </button>
              );
            })}
            <button onClick={() => { onLogin(); setOpen(false); }}
              style={{ width: '100%', textAlign: 'left', padding: '12px 10px', marginTop: 2, border: 'none',
                borderTop: '1px solid var(--border-subtle)', background: 'transparent', borderRadius: 0,
                fontSize: 14, color: 'var(--cu-mobility-blue)', fontWeight: 600, cursor: 'pointer' }}>
              See login &amp; onboarding
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function Root() {
  const compact = useCompact();
  const [stage, setStage] = React.useState('app'); // start in-app for review
  const [role, setRole] = React.useState('student');
  const [signupCountries, setSignupCountries] = React.useState(null);

  // Direct (demo) role pick — skips onboarding, uses the role's default countries.
  const pickRole = (r) => { setRole(r); setSignupCountries(null); setStage('app'); };

  let content;
  if (stage === 'login') content = <Login onLogin={() => setStage('role')} />;
  else if (stage === 'role') content = (
    <RoleSelect onPick={(r) => { setRole(r); setStage(r === 'student' ? 'countries' : 'app'); }} />
  );
  else if (stage === 'countries') content = (
    <CountrySelect onDone={(cs) => { setSignupCountries(cs); setStage('app'); }} />
  );
  else content = <AppInner key={role} role={role} initialCountries={signupCountries} onSignOut={() => setStage('login')} />;

  // Phones: full-screen app + floating demo switcher.
  if (compact) {
    return (
      <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column',
        background: '#fff', overflow: 'hidden' }}>
        {content}
        <CompactRoleSwitcher stage={stage} role={role} onPick={pickRole} onLogin={() => setStage('login')} />
      </div>
    );
  }

  // Desktop/tablet: the review rail + iOS device frame.
  return (
    <div id="stage-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 46, flexWrap: 'wrap' }}>
      <aside className="rail">
        <div>
          <div className="brand">C<i>›</i>Connect</div>
          <h1 style={{ marginTop: 14 }}>Constructor University ambassador platform</h1>
          <p style={{ marginTop: 8 }}>A mobile, map-led app that turns students, alumni and parents into recruiters — and gives the recruitment team one place to approve and manage it all.</p>
        </div>
        <div>
          <div className="group-label">Switch experience</div>
          <div className="roles">
            {ROLE_META.map((r) => (
              <button key={r.key} className={'role-btn' + (stage === 'app' && role === r.key ? ' on' : '')}
                onClick={() => pickRole(r.key)}>
                <span className="ic"><Icon name={r.icon} size={20} color="#fff" /></span>
                <span className="tx"><b>{r.label}</b></span>
              </button>
            ))}
          </div>
        </div>
        <button className="reset" onClick={() => setStage('login')}>
          <Icon name="logout" size={15} /> See login &amp; onboarding
        </button>
        <div className="note">Tip: tap a map pin → request a visit to walk the full propose-dates → email → approval flow. The Status tab explains the Constructor Theory tiers.</div>
      </aside>

      <div className="device-host">
        <IOSDevice>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
            {content}
          </div>
        </IOSDevice>
      </div>
    </div>
  );
}
