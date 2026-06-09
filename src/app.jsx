// C>Connect — app router, role switcher, login & role-select.
import React from 'react';
import { Button } from './ds/index.jsx';
import { Icon } from './icons.jsx';
import { TabBar, CMark } from './shell.jsx';
import { me as ME } from './data.js';
import * as ST from './screens/student.jsx';
import * as PA from './screens/other.jsx';
const RM = PA; // RM screens live alongside parent screens in other.jsx

// tab config per role
export const TABS = {
  student: [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'map', label: 'Map', icon: 'map' },
    { key: 'fairs', label: 'Fairs', icon: 'star' },
    { key: 'status', label: 'Status', icon: 'award' },
    { key: 'profile', label: 'Profile', icon: 'user' },
  ],
  parent: [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'map', label: 'Map', icon: 'map' },
    { key: 'contacts', label: 'Contacts', icon: 'school' },
    { key: 'profile', label: 'Profile', icon: 'user' },
  ],
  rm: [
    { key: 'inbox', label: 'Inbox', icon: 'inbox' },
    { key: 'map', label: 'Map', icon: 'map' },
    { key: 'fairs', label: 'Fairs', icon: 'star' },
    { key: 'schools', label: 'Schools', icon: 'school' },
    { key: 'people', label: 'People', icon: 'users' },
  ],
};
TABS.alumni = TABS.student;
const defaultTab = (role) => TABS[role][0].key;

function useNav(role) {
  const [tab, setTab] = React.useState(defaultTab(role));
  const [stack, setStack] = React.useState([]);
  React.useEffect(() => { setTab(defaultTab(role)); setStack([]); }, [role]);
  const nav = React.useMemo(() => ({
    setTab: (t) => { setStack([]); setTab(t); },
    go: (view, params = {}) => setStack((s) => [...s, { view, params }]),
    back: () => setStack((s) => s.slice(0, -1)),
    reset: (t) => { setStack([]); setTab(t); },
  }), []);
  return { tab, stack, nav };
}

function renderScreen(role, tab, view, params, nav, me) {
  // sub-views (pushed)
  if (view) {
    const v = {
      // student/alumni
      'requests': () => <ST.Requests nav={nav} />,
      'request-status': () => <ST.RequestStatus nav={nav} params={params} />,
      'school': () => <ST.SchoolDetail nav={nav} params={params} />,
      'req-dates': () => <ST.ReqDates nav={nav} params={params} />,
      'req-email': () => <ST.ReqEmail nav={nav} params={params} />,
      'req-sent': () => <ST.ReqSent nav={nav} params={params} />,
      'log-visit': () => <ST.LogVisit nav={nav} params={params} />,
      'refer-student': () => <ST.ReferStudent nav={nav} />,
      // parent
      'add-refer': () => <PA.AddRefer nav={nav} params={params} />,
      // rm
      'review': () => <RM.RMReview nav={nav} params={params} />,
      'add-school': () => <RM.AddSchool nav={nav} />,
    }[view];
    if (v) return v();
  }
  // tab roots
  if (role === 'parent') {
    return {
      home: () => <PA.ParentDashboard me={me} nav={nav} />,
      map: () => <ST.MapScreen nav={nav} />,
      contacts: () => <PA.ParentContacts nav={nav} />,
      profile: () => <PA.ParentProfile me={me} />,
    }[tab]();
  }
  if (role === 'rm') {
    return {
      inbox: () => <RM.RMInbox me={me} nav={nav} />,
      map: () => <ST.MapScreen nav={nav} />,
      fairs: () => <RM.RMFairs />,
      schools: () => <RM.RMSchools nav={nav} />,
      people: () => <RM.RMPeople />,
    }[tab]();
  }
  // student / alumni
  return {
    home: () => <ST.Dashboard me={me} nav={nav} />,
    map: () => <ST.MapScreen nav={nav} />,
    fairs: () => <ST.Fairs />,
    status: () => <ST.Status me={me} />,
    profile: () => <ST.Profile me={me} nav={nav} />,
  }[tab]();
}

// ---- Role-select (first-run) ------------------------------
export function RoleSelect({ onPick }) {
  const roles = [
    { key: 'student', label: 'Student Ambassador', icon: 'user', sub: 'Represent us at your old school' },
    { key: 'alumni', label: 'Alumni Ambassador', icon: 'award', sub: 'Open doors through your network' },
    { key: 'parent', label: 'Parent Ambassador', icon: 'users', sub: 'Help Constructor grow — no targets' },
    { key: 'rm', label: 'Recruitment Team', icon: 'target', sub: 'Approve, post fairs, manage schools' },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--surface-subtle)', padding: '64px 22px 30px',
      display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <CMark size={26} />
        <div style={{ fontWeight: 900, fontSize: 26, color: 'var(--cu-navy)', marginTop: 18, letterSpacing: '-0.02em' }}>I am a…</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>Choose how you represent Constructor.</div>
      </div>
      {roles.map((r) => (
        <button key={r.key} onClick={() => onPick(r.key)} style={{
          display: 'flex', alignItems: 'center', gap: 13, textAlign: 'left', cursor: 'pointer',
          background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)',
          padding: '15px 14px', boxShadow: 'var(--shadow-sm)',
        }}>
          <span style={{ width: 46, height: 46, borderRadius: 13, flex: 'none', background: 'var(--cu-navy)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={r.icon} size={24} color="#fff" /></span>
          <span style={{ flex: 1 }}>
            <span style={{ display: 'block', fontWeight: 900, fontSize: 16, color: 'var(--cu-navy)' }}>{r.label}</span>
            <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>{r.sub}</span>
          </span>
          <Icon name="chevronRight" size={20} color="var(--cu-mobility-blue)" />
        </button>
      ))}
    </div>
  );
}

// ---- Login ------------------------------------------------
export function Login({ onLogin }) {
  return (
    <div style={{ flex: 1, background: 'var(--cu-navy)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '0 28px', gap: 18, textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 38, color: '#fff', letterSpacing: '-0.02em' }}>
        C<span style={{ color: 'var(--cu-mobility-blue)' }}>›</span>Connect
      </div>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, maxWidth: 270 }}>
        Represent Constructor University. Open doors at schools near you.
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
        <input className="cu-input" placeholder="you@email.com" style={{ background: 'rgba(255,255,255,0.95)' }} />
        <input className="cu-input" type="password" placeholder="Password" style={{ background: 'rgba(255,255,255,0.95)' }} />
        <Button variant="accent" size="lg" block onClick={onLogin}>Log in</Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: '2px 0' }}>
          <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />or<span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />
        </div>
        <button onClick={onLogin} style={{ height: 52, borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.3)',
          background: 'transparent', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
          Continue with University SSO</button>
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>New here? <u>Request access</u></div>
    </div>
  );
}

// ---- App (self-contained: login → role → app) ------------
export function AppInner({ role }) {
  const me = ME[role === 'alumni' ? 'alumni' : role];
  const { tab, stack, nav } = useNav(role);
  const top = stack[stack.length - 1];
  const hideTabBar = top && ['req-sent'].includes(top.view);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {renderScreen(role, tab, top?.view, top?.params || {}, nav, me)}
      {!hideTabBar && <TabBar tabs={TABS[role]} active={tab} onChange={nav.setTab} />}
    </div>
  );
}

export function App() {
  const [stage, setStage] = React.useState('login'); // login | role | app
  const [role, setRole] = React.useState('student');
  if (stage === 'login') return <Login onLogin={() => setStage('role')} />;
  if (stage === 'role') return <RoleSelect onPick={(r) => { setRole(r); setStage('app'); }} />;
  return <AppInner role={role} />;
}
