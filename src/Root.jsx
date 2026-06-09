// C>Connect — review shell. Side-rail role switcher next to the iOS device
// frame, reproducing the design-handoff "C>Connect App.html" review surface.
import React from 'react';
import { IOSDevice } from './ios-frame.jsx';
import { AppInner, Login, RoleSelect } from './app.jsx';
import { Icon } from './icons.jsx';

const ROLE_META = [
  { key: 'student', label: 'Student', sub: 'Quests · fairs · rewards', icon: 'sparkles' },
  { key: 'alumni', label: 'Alumni', sub: 'Same as student', icon: 'award' },
  { key: 'parent', label: 'Parent', sub: 'Contribute · add · refer', icon: 'handshake' },
  { key: 'rm', label: 'Regional Manager', sub: 'Approvals · admin', icon: 'target' },
];

export default function Root() {
  const [stage, setStage] = React.useState('app'); // start in-app for review
  const [role, setRole] = React.useState('student');

  let content;
  if (stage === 'login') content = <Login onLogin={() => setStage('role')} />;
  else if (stage === 'role') content = <RoleSelect onPick={(r) => { setRole(r); setStage('app'); }} />;
  else content = <AppInner key={role} role={role} />;

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
                onClick={() => { setRole(r.key); setStage('app'); }}>
                <span className="ic"><Icon name={r.icon} size={20} color="#fff" /></span>
                <span className="tx"><b>{r.label}</b><span>{r.sub}</span></span>
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
