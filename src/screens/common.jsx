// C>Connect — shared screens used across roles: Settings & Notifications.
import React from 'react';
import { Button, Card, Avatar } from '../ds/index.jsx';
import { Icon } from '../icons.jsx';
import { AppBar, RoundBtn, Screen, SectionLabel, ListRow } from '../shell.jsx';
import { notifications } from '../data.js';

const lbl = { fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' };

function Toggle({ on, set }) {
  return (
    <button onClick={() => set((v) => !v)} aria-pressed={on} style={{
      width: 46, height: 27, borderRadius: 999, border: 'none', cursor: 'pointer', flex: 'none',
      background: on ? 'var(--cu-mobility-blue)' : 'var(--neutral-300)', position: 'relative',
      transition: 'background .15s var(--ease-standard)', padding: 0,
    }}>
      <span style={{ position: 'absolute', top: 3, left: on ? 22 : 3, width: 21, height: 21, borderRadius: '50%',
        background: '#fff', transition: 'left .15s var(--ease-standard)', boxShadow: '0 1px 2px rgba(0,32,77,0.25)' }} />
    </button>
  );
}

function ToggleRow({ icon, label, on, set, last = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px',
      borderBottom: last ? 'none' : '1px solid var(--border-subtle)' }}>
      <span style={{ width: 34, height: 34, borderRadius: 9, flex: 'none', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'rgba(0,32,77,0.07)', color: 'var(--cu-navy)' }}>
        <Icon name={icon} size={18} /></span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{label}</span>
      <Toggle on={on} set={set} />
    </div>
  );
}

// ============ SETTINGS ============
export function Settings({ me, role, nav, onSignOut }) {
  const [push, setPush] = React.useState(true);
  const [email, setEmail] = React.useState(true);
  const [fairs, setFairs] = React.useState(true);
  const [updates, setUpdates] = React.useState(true);
  const [lang, setLang] = React.useState('English');
  const isAmbassador = role !== 'rm';
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Settings" />
      <Screen bg="var(--surface-subtle)">
        <SectionLabel>Notifications</SectionLabel>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <ToggleRow icon="bell" label="Push notifications" on={push} set={setPush} />
          <ToggleRow icon="mail" label="Email updates" on={email} set={setEmail} last={!isAmbassador} />
          {isAmbassador && <ToggleRow icon="star" label="New fairs nearby" on={fairs} set={setFairs} />}
          {isAmbassador && <ToggleRow icon="checkCircle" label="Request status updates" on={updates} set={setUpdates} last />}
        </Card>

        <SectionLabel>Preferences</SectionLabel>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={lbl}>Language</label>
          <select className="cu-input" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option>English</option>
            <option>Deutsch</option>
          </select>
        </Card>

        <SectionLabel>Account</SectionLabel>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={me.name} size={44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--cu-navy)' }}>{me.name}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{me.role}</div>
          </div>
          <Icon name="edit" size={17} color="var(--neutral-400)" />
        </Card>
        <ListRow icon="settings" iconColor="var(--neutral-600)" title="Privacy & data"
          right={<Icon name="chevronRight" size={18} color="var(--neutral-400)" />} />

        <div style={{ flex: 1, minHeight: 6 }} />
        <Button variant="danger-outline" size="lg" block iconLeft={<Icon name="logout" size={18} />}
          onClick={onSignOut}>Sign out</Button>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-subtle)' }}>
          C&gt;Connect · v0.1.0 · Constructor University Bremen
        </div>
      </Screen>
    </>
  );
}

// ============ NOTIFICATIONS ============
export function Notifications({ role, nav }) {
  const list = notifications[role] || [];
  const [handled, setHandled] = React.useState({});
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Notifications" />
      <Screen bg="var(--surface-subtle)">
        {list.length === 0 && (
          <Card style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>You’re all caught up.</Card>
        )}
        {list.map((n) => (
          <Card key={n.id} style={{ display: 'flex', gap: 11 }}>
            <span style={{ width: 38, height: 38, borderRadius: 10, flex: 'none', display: 'flex', alignItems: 'center',
              justifyContent: 'center', background: n.color, color: '#fff' }}>
              <Icon name={n.icon} size={19} color="#fff" /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-strong)' }}>{n.title}</span>
                <span style={{ fontSize: 11.5, color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>{n.when}</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>{n.sub}</div>
              {n.kind === 'approval' && (
                handled[n.id] ? (
                  <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 700,
                    color: handled[n.id] === 'approved' ? 'var(--cu-healthy-green)' : 'var(--cu-diversity-red)' }}>
                    {handled[n.id] === 'approved' ? `Approved · €${n.amount} released` : 'Declined'}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 8, marginTop: 9 }}>
                    <Button variant="danger-outline" size="sm" onClick={() => setHandled((h) => ({ ...h, [n.id]: 'declined' }))}>Decline</Button>
                    <Button variant="primary" size="sm" iconRight={<Icon name="check" size={15} />}
                      onClick={() => setHandled((h) => ({ ...h, [n.id]: 'approved' }))}>Approve €{n.amount}</Button>
                  </div>
                )
              )}
            </div>
          </Card>
        ))}
      </Screen>
    </>
  );
}
