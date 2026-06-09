// C>Connect — Student & Alumni screens (identical experience).
import React from 'react';
import { Button, Card, Avatar, Chip, StatusPill } from '../ds/index.jsx';
import { Icon } from '../icons.jsx';
import {
  AppBar, RoundBtn, Screen, SectionLabel, StatTile, ListRow, statusPill, pinColor,
  TierLadder, TerminalProgress, HistoryLog,
} from '../shell.jsx';
import { tiers, requests, fairs, giftHistory, schools, school, rewardFor, allCountries, citiesIn, schoolsIn } from '../data.js';
import { SchoolsMap } from '../components/SchoolsMap.jsx';

const tierName = (k) => tiers.find((t) => t.key === k)?.name || k;

// ============ DASHBOARD ============
export function Dashboard({ me, nav }) {
  const nextTier = tiers[tiers.findIndex((t) => t.key === me.level) + 1];
  return (
    <>
      <AppBar
        left={<Avatar name={me.name} size={40} />}
        title={`Hi, ${me.name.split(' ')[0]}`}
        subtitle={me.role}
        right={<RoundBtn name="bell" badge onClick={() => nav.go('notifications')} />}
      />
      <Screen bg="var(--surface-subtle)">
        <Card variant="accent" elevation="raised" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--cu-navy)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <Icon name={tiers.find((t) => t.key === me.level).icon} size={18} color="#fff" /></span>
              <div>
                <div style={{ fontWeight: 900, fontSize: 17, color: 'var(--cu-navy)' }}>{tierName(me.level)}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Active · maintaining ✓</div>
              </div>
            </div>
            <button onClick={() => nav.setTab('status')} style={{ background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--cu-mobility-blue)', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 2 }}>
              Status <Icon name="chevronRight" size={15} />
            </button>
          </div>
          <TerminalProgress tierKey={me.level} value={me.progress} max={me.progressMax} />
        </Card>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="accent" size="md" block iconLeft={<Icon name="map" size={18} />}
            onClick={() => nav.setTab('map')}>Find schools</Button>
          <Button variant="secondary" size="md" block iconLeft={<Icon name="users" size={18} />}
            onClick={() => nav.go('refer-student')}>Refer student</Button>
        </div>

        <SectionLabel>Earn &amp; resources</SectionLabel>
        <ListRow icon="camera" iconColor="var(--cu-mobility-blue)" title="Make a video"
          sub={`Day in the life · €${rewardFor('video')}`}
          right={<Icon name="chevronRight" size={18} color="var(--neutral-400)" />}
          onClick={() => nav.go('make-video')} />
        <ListRow icon="mail" iconColor="var(--cu-navy)" title="Print brochures"
          sub="Hand out at schools · pay &amp; claim back"
          right={<Icon name="chevronRight" size={18} color="var(--neutral-400)" />}
          onClick={() => nav.go('brochures')} />
        <ListRow icon="edit" iconColor="var(--cu-healthy-green)" title="Sign-up sheet"
          sub="Collect interested students’ details"
          right={<Icon name="chevronRight" size={18} color="var(--neutral-400)" />}
          onClick={() => nav.go('signup-sheet')} />

        <SectionLabel action={<button onClick={() => nav.go('requests')} style={linkBtn}>See all</button>}>
          Your requests
        </SectionLabel>
        {requests.map((r) => {
          const sch = school(r.school);
          return (
            <ListRow key={r.id} icon="school" iconColor="var(--cu-navy)"
              title={sch.name} sub={`${sch.city} · proposed ${r.dates.join(' / ')}`}
              right={statusPill(r.status)} onClick={() => nav.go('request-status', { id: r.id })} />
          );
        })}
      </Screen>
    </>
  );
}

// ============ MY REQUESTS (list) ============
export function Requests({ nav }) {
  const [f, setF] = React.useState('all');
  const list = requests.filter((r) => f === 'all' || r.status === f);
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="My requests" />
      <Screen bg="var(--surface-subtle)">
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'pending', 'approved'].map((k) => (
            <Chip key={k} active={f === k} onClick={() => setF(k)}>{k[0].toUpperCase() + k.slice(1)}</Chip>
          ))}
        </div>
        {list.map((r) => {
          const sch = school(r.school);
          return (
            <ListRow key={r.id} icon="school" title={sch.name}
              sub={`${sch.city} · ${r.dates.join(' / ')}`} right={statusPill(r.status)}
              onClick={() => nav.go('request-status', { id: r.id })} />
          );
        })}
      </Screen>
    </>
  );
}

// ============ REQUEST STATUS (timeline) ============
export function RequestStatus({ nav, params }) {
  const r = requests.find((x) => x.id === params.id);
  const sch = school(r.school);
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Request status" />
      <Screen bg="var(--surface-subtle)">
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontWeight: 900, fontSize: 17, color: 'var(--cu-navy)' }}>{sch.name}</div>
            {statusPill(r.status)}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{sch.city} · proposed {r.dates.join(' or ')}</div>
        </Card>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {r.steps.map((st, i) => {
              const [label, state, date] = st;
              const c = state === 'done' ? 'var(--cu-healthy-green)' : state === 'current' ? 'var(--cu-mobility-blue)' : 'var(--neutral-300)';
              return (
                <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' }}>
                    <span style={{ width: 26, height: 26, borderRadius: '50%', background: state === 'todo' ? '#fff' : c,
                      border: '2px solid ' + c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {state === 'done' ? <Icon name="check" size={15} stroke={3} /> :
                       state === 'current' ? <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} /> : null}
                    </span>
                    {i < r.steps.length - 1 && <span style={{ width: 2, height: 26, background: state === 'done' ? c : 'var(--neutral-200)' }} />}
                  </div>
                  <div style={{ paddingBottom: 14, flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: state === 'todo' ? 500 : 700,
                      color: state === 'todo' ? 'var(--text-muted)' : 'var(--text-strong)' }}>{label}</div>
                    {date && <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{date}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        {r.status === 'approved' && (
          <Button variant="primary" size="lg" block iconLeft={<Icon name="camera" size={20} />}
            onClick={() => nav.go('log-visit', { id: r.school })}>Complete quest — upload photos</Button>
        )}
      </Screen>
    </>
  );
}

// ============ SCHOOLS MAP ============
function InstrRow({ icon, color, label, need, sub, onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 11, background: 'none',
      border: 'none', textAlign: 'left', cursor: onClick ? 'pointer' : 'default', padding: 0, width: '100%' }}>
      <span style={{ width: 36, height: 36, borderRadius: 9, flex: 'none', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: color, color: '#fff' }}><Icon name={icon} size={18} /></span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontWeight: 700, fontSize: 14, color: 'var(--text-strong)' }}>
          {label} <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>· {need}</span>
        </span>
        <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>{sub}</span>
      </span>
      {onClick && <Icon name="chevronRight" size={17} color="var(--neutral-400)" />}
    </button>
  );
}

export function MapScreen({ nav, role = 'student', countries }) {
  const isAdmin = role === 'rm';
  const myCountries = isAdmin ? allCountries : (countries && countries.length ? countries : ['Germany']);
  const lockedCountries = allCountries.filter((c) => !myCountries.includes(c));

  const [country, setCountry] = React.useState('all');
  const [city, setCity] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  React.useEffect(() => { setCity('all'); }, [country]);

  const q = query.trim().toLowerCase();
  const visible = schoolsIn(myCountries).filter((s) =>
    (country === 'all' || s.country === country) &&
    (city === 'all' || s.city === city) &&
    (!q || s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)));
  const cityOptions = country === 'all' ? [] : citiesIn(country);
  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <>
      <AppBar title="Schools map" subtitle={isAdmin ? 'All countries' : myCountries.join(' · ')}
        right={<RoundBtn name="bell" badge onClick={() => nav.go('notifications')} />} />
      <Screen bg="var(--surface-subtle)">
        <input className="cu-input" placeholder="Search school or city…" value={query}
          onChange={(e) => setQuery(e.target.value)} />
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          <Chip active={country === 'all'} onClick={() => setCountry('all')}>All countries</Chip>
          {myCountries.map((c) => <Chip key={c} active={country === c} onClick={() => setCountry(c)}>{c}</Chip>)}
        </div>
        {country !== 'all' && cityOptions.length > 1 && (
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            <Chip active={city === 'all'} onClick={() => setCity('all')}>All cities</Chip>
            {cityOptions.map((c) => <Chip key={c} active={city === c} onClick={() => setCity(c)}>{c}</Chip>)}
          </div>
        )}

        <SchoolsMap schools={visible} selected={selected} onToggle={toggle} height={230} />

        {!isAdmin && (
          selected.length > 0 ? (
            <Card elevation="raised" style={{ display: 'flex', alignItems: 'center', gap: 10, border: '2px solid var(--cu-mobility-blue)' }}>
              <div style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: 'var(--cu-navy)' }}>{selected.length} selected</div>
              <button onClick={() => setSelected([])} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Clear</button>
              <Button variant="primary" size="sm" iconRight={<Icon name="arrowRight" size={15} />}
                onClick={() => nav.go('batch-request', { ids: selected })}>Request visits</Button>
            </Card>
          ) : (
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center' }}>
              Tap pins to select one or more schools, then request visits to all at once.
            </div>
          )
        )}

        {!isAdmin && (
          <>
            <SectionLabel>Before you go</SectionLabel>
            <Card style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <InstrRow icon="camera" color="var(--cu-diversity-red)" label="Photos" need="Required"
                sub="Take photos at the visit to complete the quest." />
              <InstrRow icon="edit" color="var(--cu-mobility-blue)" label="Sign-up sheet" need="Bring"
                sub="Collect interested students’ details." onClick={() => nav.go('signup-sheet')} />
              <InstrRow icon="mail" color="var(--cu-navy)" label="Brochures" need="Advised"
                sub="Print and hand out at the school." onClick={() => nav.go('brochures')} />
            </Card>
          </>
        )}

        <SectionLabel>All schools</SectionLabel>
        {myCountries.filter((c) => country === 'all' || c === country).map((c) => {
          const list = visible.filter((s) => s.country === c);
          if (!list.length) return null;
          return (
            <div key={c} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', margin: '4px 2px 0' }}>{c}</div>
              {list.map((s) => (
                <ListRow key={s.id} icon="school" iconColor={pinColor(s.status)} title={s.name}
                  sub={`${s.city} · ${s.dist}`} right={statusPill(s.status)}
                  onClick={() => nav.go('school', { id: s.id })} />
              ))}
            </div>
          );
        })}

        {!isAdmin && lockedCountries.length > 0 && (
          <>
            <SectionLabel>Other countries — access needed</SectionLabel>
            {lockedCountries.map((c) => (
              <Card key={c} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <span style={{ width: 38, height: 38, borderRadius: 10, flex: 'none', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>
                  <Icon name="map" size={19} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-strong)' }}>{c}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{schoolsIn([c]).length} schools · locked</div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => nav.go('request-access', { country: c })}>Request access</Button>
              </Card>
            ))}
          </>
        )}
      </Screen>
    </>
  );
}

// ============ BATCH VISIT REQUEST ============
export function BatchRequest({ nav, params }) {
  const list = (params.ids || []).map((id) => school(id)).filter(Boolean);
  const [picked, setPicked] = React.useState([12, 18]);
  const [sent, setSent] = React.useState(false);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const toggle = (d) => setPicked((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));

  if (sent) {
    return (
      <Screen bg="var(--cu-navy)">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, padding: '0 22px' }}>
          <span style={{ width: 82, height: 82, borderRadius: '50%', background: 'rgba(0,169,135,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 58, height: 58, borderRadius: '50%', background: 'var(--cu-healthy-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check" size={32} color="#fff" stroke={3} /></span>
          </span>
          <div style={{ fontWeight: 900, fontSize: 23, color: '#fff' }}>{list.length} request{list.length > 1 ? 's' : ''} sent</div>
          <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.5, maxWidth: 300 }}>
            Each school receives its own personalised email automatically once your Regional Manager approves. You’ll be CC’d on every one.
          </div>
          <Button variant="accent" size="lg" block style={{ maxWidth: 280 }} onClick={() => nav.reset('map')}>Back to schools map</Button>
        </div>
      </Screen>
    );
  }
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Request visits" subtitle={`${list.length} school${list.length > 1 ? 's' : ''}`} />
      <Screen bg="var(--surface-subtle)">
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {list.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: pinColor(s.status) + '22', color: pinColor(s.status) }}>
                <Icon name="school" size={16} /></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-strong)' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.city}, {s.country}</div>
              </div>
            </div>
          ))}
        </Card>
        <div style={{ fontWeight: 900, fontSize: 16, color: 'var(--cu-navy)' }}>Propose visit date(s)</div>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Icon name="chevronLeft" size={18} color="var(--neutral-400)" />
            <span style={{ fontWeight: 700, fontSize: 14 }}>March 2025</span>
            <Icon name="chevronRight" size={18} color="var(--neutral-400)" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5 }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--text-subtle)', paddingBottom: 2 }}>{d}</div>
            ))}
            {days.map((d) => {
              const on = picked.includes(d);
              return (
                <button key={d} onClick={() => toggle(d)} style={{ aspectRatio: '1', borderRadius: 9, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: on ? 700 : 500, background: on ? 'var(--cu-mobility-blue)' : 'transparent', color: on ? '#fff' : 'var(--text-body)' }}>{d}</button>
              );
            })}
          </div>
        </Card>
        <div>
          <label style={lbl}>Note to schools (optional)</label>
          <textarea className="cu-input" rows={2} placeholder="A short, friendly introduction…" style={{ marginTop: 6 }} />
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
          A separate, personalised email is sent to each school — none of them sees the others.
        </div>
        <div style={{ flex: 1 }} />
        <Button variant="primary" size="lg" block disabled={!list.length || !picked.length}
          iconRight={<Icon name="send" size={18} />} onClick={() => setSent(true)}>
          Send {list.length} request{list.length > 1 ? 's' : ''} for approval
        </Button>
      </Screen>
    </>
  );
}

// ============ REQUEST COUNTRY ACCESS ============
export function RequestAccess({ nav, params }) {
  const country = params.country || 'another country';
  const [sent, setSent] = React.useState(false);
  if (sent) {
    return (
      <Screen bg="var(--cu-navy)">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, padding: '0 22px' }}>
          <span style={{ width: 76, height: 76, borderRadius: '50%', background: 'rgba(0,140,227,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="send" size={30} color="#fff" /></span>
          <div style={{ fontWeight: 900, fontSize: 22, color: '#fff' }}>Request sent</div>
          <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.5, maxWidth: 300 }}>
            Your Regional Manager will review your request to work with schools in <strong style={{ fontWeight: 700, color: '#fff' }}>{country}</strong>. You’ll be notified once it’s approved.
          </div>
          <Button variant="accent" size="lg" block style={{ maxWidth: 280 }} onClick={() => nav.back()}>Back to map</Button>
        </div>
      </Screen>
    );
  }
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Request access" />
      <Screen bg="var(--surface-subtle)">
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 44, height: 44, borderRadius: 11, flex: 'none', background: 'var(--cu-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="map" size={22} color="#fff" /></span>
          <div>
            <div style={{ fontWeight: 900, fontSize: 17, color: 'var(--cu-navy)' }}>Schools in {country}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Outside your registered countries</div>
          </div>
        </Card>
        <div style={{ fontSize: 13.5, color: 'var(--text-body)', lineHeight: 1.55 }}>
          You registered to work with schools in a set number of countries. To visit schools in <strong style={{ fontWeight: 700 }}>{country}</strong>, ask your Regional Manager to grant you access.
        </div>
        <div>
          <label style={lbl}>Why do you need access? (optional)</label>
          <textarea className="cu-input" rows={3} placeholder="e.g. I’m visiting family there and can present at my old school." style={{ marginTop: 6 }} />
        </div>
        <div style={{ flex: 1 }} />
        <Button variant="primary" size="lg" block iconRight={<Icon name="send" size={18} />}
          onClick={() => setSent(true)}>Send request to Regional Manager</Button>
      </Screen>
    </>
  );
}

// ============ SCHOOL DETAIL ============
export function SchoolDetail({ nav, params }) {
  const s = school(params.id);
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="School" />
      <Screen bg="var(--surface-subtle)">
        <div>
          <div style={{ fontWeight: 900, fontSize: 22, color: 'var(--cu-navy)', letterSpacing: '-0.01em' }}>{s.name}</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 3 }}>{s.city}, {s.country} · {s.dist} away</div>
          <div style={{ marginTop: 9 }}>{statusPill(s.status)}</div>
        </div>
        <SectionLabel>Contact</SectionLabel>
        {s.contact !== '—' ? (
          <Card style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <Avatar name={s.contact} size={40} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{s.contact}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{s.role}</div>
            </div>
          </Card>
        ) : (
          <Card style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>No contact on file yet — your Regional Manager can add one.</Card>
        )}
        <SectionLabel>History</SectionLabel>
        <HistoryLog schoolId={s.id} />
        <div style={{ flex: 1 }} />
        <Button variant="primary" size="lg" block iconRight={<Icon name="arrowRight" size={19} />}
          onClick={() => nav.go('req-dates', { id: s.id })}>Request a visit</Button>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center' }}>
          Goes to your Regional Manager for approval before sending
        </div>
      </Screen>
    </>
  );
}

// ============ REQUEST — DATES ============
export function ReqDates({ nav, params }) {
  const s = school(params.id);
  const [picked, setPicked] = React.useState([12, 18]);
  const toggle = (d) => setPicked((p) => p.includes(d) ? p.filter((x) => x !== d) : [...p, d]);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Request visit" subtitle={`Step 1 of 2 · ${s.name}`} />
      <Screen bg="var(--surface-subtle)">
        <div style={{ fontWeight: 900, fontSize: 18, color: 'var(--cu-navy)' }}>Propose visit date(s)</div>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Icon name="chevronLeft" size={18} color="var(--neutral-400)" />
            <span style={{ fontWeight: 700, fontSize: 14 }}>March 2025</span>
            <Icon name="chevronRight" size={18} color="var(--neutral-400)" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5 }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--text-subtle)', paddingBottom: 2 }}>{d}</div>
            ))}
            {days.map((d) => {
              const on = picked.includes(d);
              return (
                <button key={d} onClick={() => toggle(d)} style={{
                  aspectRatio: '1', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 13,
                  fontWeight: on ? 700 : 500, background: on ? 'var(--cu-mobility-blue)' : 'transparent',
                  color: on ? '#fff' : 'var(--text-body)',
                }}>{d}</button>
              );
            })}
          </div>
        </Card>
        <div style={{ fontSize: 13, color: 'var(--text-body)' }}>
          Selected: <strong style={{ fontWeight: 900 }}>{picked.length ? [...picked].sort((a, b) => a - b).map((d) => d + ' Mar').join(', ') : 'none'}</strong>
        </div>
        <div>
          <label style={lbl}>Note to school (optional)</label>
          <textarea className="cu-input" rows={3} placeholder="A short, friendly introduction…"
            style={{ marginTop: 6 }} defaultValue="" />
        </div>
        <div style={{ flex: 1 }} />
        <Button variant="primary" size="lg" block disabled={!picked.length}
          iconRight={<Icon name="arrowRight" size={19} />}
          onClick={() => nav.go('req-email', { id: s.id })}>Next: preview email</Button>
      </Screen>
    </>
  );
}

// ============ REQUEST — EMAIL PREVIEW ============
export function ReqEmail({ nav, params }) {
  const s = school(params.id);
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Preview email" subtitle="Step 2 of 2" />
      <Screen bg="var(--surface-subtle)">
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)', fontSize: 13 }}>
            <Field k="To" v={s.email || 'contact@school.de'} />
            <Field k="Cc" v="you (Maria Sánchez)" />
            <Field k="Subject" v="A visit from Constructor University Bremen" />
          </div>
          <div style={{ padding: '4px 14px 14px', fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-body)' }}>
            <p style={{ margin: '8px 0' }}>Dear {s.contact !== '—' ? s.contact : 'Sir or Madam'},</p>
            <p style={{ margin: '8px 0' }}>I am a student ambassador for <strong style={{ fontWeight: 700 }}>Constructor University Bremen</strong>. I would be glad to visit {s.name} to speak with your students about studying education, research and technology with us.</p>
            <p style={{ margin: '8px 0' }}>Would <strong style={{ fontWeight: 700 }}>12 or 18 March</strong> suit you? I am happy to adapt to your schedule.</p>
            <p style={{ margin: '8px 0', color: 'var(--text-muted)' }}>Warm regards,<br />Maria Sánchez</p>
          </div>
        </Card>
        <button style={{ ...editLink }}>
          <Icon name="edit" size={15} /> Tap to edit before sending
        </button>
        <div style={{ flex: 1 }} />
        <Button variant="primary" size="lg" block iconRight={<Icon name="send" size={18} />}
          onClick={() => nav.go('req-sent', { id: s.id })}>Send for approval</Button>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center' }}>
          Your Regional Manager approves, then it sends automatically
        </div>
      </Screen>
    </>
  );
}

function Field({ k, v }) {
  return (
    <div style={{ display: 'flex', gap: 6, padding: '3px 0' }}>
      <span style={{ color: 'var(--text-subtle)', width: 52, flex: 'none' }}>{k}</span>
      <span style={{ color: 'var(--text-strong)', fontWeight: 500 }}>{v}</span>
    </div>
  );
}

// ============ REQUEST — SENT ============
export function ReqSent({ nav }) {
  return (
    <Screen bg="var(--cu-navy)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, padding: '0 20px' }}>
        <span style={{ width: 84, height: 84, borderRadius: '50%', background: 'rgba(0,169,135,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--cu-healthy-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check" size={34} color="#fff" stroke={3} /></span>
        </span>
        <div style={{ fontWeight: 900, fontSize: 24, color: '#fff' }}>Sent for approval</div>
        <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, maxWidth: 280 }}>
          Your Regional Manager will review the request. Once approved, the email sends and you’ll be CC’d.
        </div>
        <Button variant="accent" size="lg" block onClick={() => nav.reset('home')}
          style={{ maxWidth: 280 }}>Back to dashboard</Button>
        <button onClick={() => nav.reset('map')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          Find another school
        </button>
      </div>
    </Screen>
  );
}

// ============ LOG VISIT (photos) ============
export function LogVisit({ nav, params, role }) {
  const s = school(params.id);
  const [photos, setPhotos] = React.useState([1, 2]);
  const [seq, setSeq] = React.useState(3);
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Complete your quest" />
      <Screen bg="var(--surface-subtle)">
        <div style={{ fontWeight: 900, fontSize: 18, color: 'var(--cu-navy)' }}>{s.name}</div>
        <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Add a few photos as proof of your visit to log this quest.</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {photos.map((p) => (
            <div key={p} style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-md)', position: 'relative',
              background: 'linear-gradient(135deg,#dde6ef,#c9d6e4)', border: '1px solid var(--border-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="camera" size={26} color="var(--neutral-400)" />
              <button onClick={() => setPhotos((ph) => ph.filter((x) => x !== p))} style={{
                position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: '50%',
                border: 'none', background: 'rgba(0,32,77,0.7)', color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="x" size={14} stroke={2.6} /></button>
            </div>
          ))}
          <button onClick={() => { setPhotos((ph) => [...ph, seq]); setSeq((n) => n + 1); }} style={{
            aspectRatio: '4/3', borderRadius: 'var(--radius-md)', border: '2px dashed var(--border-default)',
            background: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 4, color: 'var(--cu-mobility-blue)' }}>
            <Icon name="plus" size={22} /><span style={{ fontSize: 12, fontWeight: 600 }}>Add photo</span>
          </button>
        </div>
        <div>
          <label style={lbl}>How did it go? (optional)</label>
          <textarea className="cu-input" rows={2} placeholder="A line about the visit…" style={{ marginTop: 6 }} />
        </div>
        <Card variant="success" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--cu-healthy-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <Icon name="gift" size={22} color="#fff" /></span>
          <div>
            <div style={{ fontSize: 12.5, color: '#066b54' }}>Quest reward — on approval</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: '#066b54', lineHeight: 1.1 }}>€{rewardFor('visit', role)} gift card</div>
          </div>
        </Card>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center' }}>
          Visits over 5 hours may be adjusted by your Regional Manager.
        </div>
        <Button variant="primary" size="lg" block disabled={!photos.length}
          onClick={() => nav.reset('home')}>Submit quest</Button>
      </Screen>
    </>
  );
}

// ============ FAIRS ============
export function Fairs({ role }) {
  const [going, setGoing] = React.useState(fairs.filter((f) => f.mine).map((f) => f.id));
  const reward = rewardFor('fair', role);
  return (
    <>
      <AppBar title="Fairs &amp; expos" subtitle="Posted by your Regional Manager" right={<RoundBtn name="search" />} />
      <Screen bg="var(--surface-subtle)">
        <Card variant="success" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--cu-healthy-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <Icon name="gift" size={20} color="#fff" /></span>
          <div>
            <div style={{ fontSize: 12.5, color: '#066b54' }}>Attend a fair to earn</div>
            <div style={{ fontWeight: 900, fontSize: 20, color: '#066b54', lineHeight: 1.1 }}>€{reward}</div>
          </div>
          <div style={{ fontSize: 11.5, color: '#066b54', marginLeft: 'auto', maxWidth: 132, lineHeight: 1.4, textAlign: 'right' }}>
            Events over 5 hours may be adjusted by your Regional Manager.
          </div>
        </Card>
        {fairs.map((f) => {
          const on = going.includes(f.id);
          return (
            <Card key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 16, color: 'var(--cu-navy)' }}>{f.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>
                    <Icon name="pin" size={13} style={{ display: 'inline', verticalAlign: -2 }} /> {f.city} · {f.dates}
                  </div>
                </div>
                {on && <StatusPill status="approved">Going</StatusPill>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                  <Icon name="users" size={14} style={{ display: 'inline', verticalAlign: -2 }} /> {f.going} ambassadors going
                </span>
                <Button variant={on ? 'secondary' : 'accent'} size="sm"
                  onClick={() => setGoing((g) => on ? g.filter((x) => x !== f.id) : [...g, f.id])}>
                  {on ? 'Going ✓' : 'Sign up'}
                </Button>
              </div>
            </Card>
          );
        })}
      </Screen>
    </>
  );
}

// ============ STATUS (tier + Constructor Theory + rewards) ============
export function Status({ me }) {
  const cur = tiers.find((t) => t.key === me.level);
  return (
    <>
      <AppBar title="Your status" navy
        right={<span style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>C&gt;</span>} />
      <Screen bg="var(--surface-subtle)" pad={false}>
        <div style={{ background: 'var(--cu-navy)', padding: '8px 18px 22px', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <Icon name={cur.icon} size={28} color="#fff" /></span>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Current tier</div>
              <div style={{ fontWeight: 900, fontSize: 26, lineHeight: 1.1 }}>{cur.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{cur.tag}</div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <TerminalProgress tierKey={me.level} value={me.progress} max={me.progressMax} />
          </div>
        </div>

        <div style={{ padding: '16px 16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 8, borderLeft: '3px solid var(--cu-mobility-blue)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Icon name="atom" size={18} color="var(--cu-mobility-blue)" />
              <span style={{ fontWeight: 900, fontSize: 14.5, color: 'var(--cu-navy)' }}>What’s a Constructor?</span>
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-body)' }}>
              In physics, <strong style={{ fontWeight: 700 }}>Constructor Theory</strong> describes the world by which
              transformations are <em style={{ fontStyle: 'normal', fontWeight: 700 }}>possible</em> — and a
              <strong style={{ fontWeight: 700 }}> constructor</strong> is something that can cause a change
              and then <strong style={{ fontWeight: 700 }}>do it again, reliably</strong>. The university is
              named after exactly this idea. Your journey here mirrors it.
            </div>
          </Card>

          <SectionLabel>Your journey</SectionLabel>
          <TierLadder current={me.level} />

          <SectionLabel>Gift card history</SectionLabel>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 0, padding: 0, overflow: 'hidden' }}>
            {giftHistory.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '11px 13px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <Icon name="gift" size={17} color="var(--cu-healthy-green)" />
                  <span style={{ fontSize: 13.5, color: 'var(--text-body)' }}>{g.school}</span>
                </div>
                <span style={{ fontWeight: 900, fontSize: 14, color: 'var(--cu-healthy-green)' }}>€{g.amount}</span>
              </div>
            ))}
          </Card>
        </div>
      </Screen>
    </>
  );
}

// ============ PROFILE ============
export function Profile({ me, nav, onSignOut }) {
  return (
    <>
      <AppBar title="Profile" right={<RoundBtn name="bell" badge onClick={() => nav.go('notifications')} />} />
      <Screen bg="var(--surface-subtle)">
        <Card style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <Avatar name={me.name} size={56} />
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: 'var(--cu-navy)' }}>{me.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{me.role}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-subtle)', marginTop: 2 }}>{me.field} · Class of {me.year}</div>
          </div>
        </Card>
        <SectionLabel>Account</SectionLabel>
        <ListRow icon="award" iconColor="var(--cu-mobility-blue)" title="Your status" sub={tierName(me.level) + ' tier'} right={<Icon name="chevronRight" size={18} color="var(--neutral-400)" />} onClick={() => nav.setTab('status')} />
        <ListRow icon="settings" iconColor="var(--neutral-600)" title="Settings & notifications" right={<Icon name="chevronRight" size={18} color="var(--neutral-400)" />} onClick={() => nav.go('settings')} />
        <ListRow icon="logout" iconColor="var(--cu-diversity-red)" title="Sign out" onClick={onSignOut} />
      </Screen>
    </>
  );
}

// ============ REFER A STUDENT ============
export function ReferStudent({ nav }) {
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Refer a student" />
      <Screen bg="var(--surface-subtle)">
        <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
          Know a student who would thrive at Constructor University Bremen? Refer them — if they enrol, you receive a €200 Amazon gift card.
        </div>
        <div><label style={lbl}>Student name</label>
          <input className="cu-input" placeholder="Full name" style={{ marginTop: 6 }} /></div>
        <div><label style={lbl}>Their school</label>
          <input className="cu-input" placeholder="Current school" style={{ marginTop: 6 }} /></div>
        <div><label style={lbl}>Country of school</label>
          <select className="cu-input" defaultValue="" style={{ marginTop: 6 }}>
            <option value="" disabled>Select a country</option>
            {allCountries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select></div>
        <div><label style={lbl}>Their email (optional)</label>
          <input className="cu-input" type="email" placeholder="name@email.com" style={{ marginTop: 6 }} /></div>
        <div><label style={lbl}>WhatsApp number</label>
          <input className="cu-input" type="tel" inputMode="tel" placeholder="Full international format, e.g. +254 712 345678" style={{ marginTop: 6 }} /></div>
        <div><label style={lbl}>Why would they be a good fit?</label>
          <textarea className="cu-input" rows={3} placeholder="A short note…" style={{ marginTop: 6 }} /></div>
        <Card variant="success" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--cu-healthy-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <Icon name="gift" size={22} color="#fff" /></span>
          <div>
            <div style={{ fontSize: 12.5, color: '#066b54' }}>Referral reward — when they enrol</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: '#066b54', lineHeight: 1.1 }}>€200 Amazon gift card</div>
          </div>
        </Card>
        <Button variant="primary" size="lg" block iconRight={<Icon name="arrowRight" size={18} />}
          onClick={() => nav.reset('home')}>Send referral</Button>
      </Screen>
    </>
  );
}

const linkBtn = { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cu-mobility-blue)', fontWeight: 600, fontSize: 13 };
const lbl = { fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' };
const editLink = { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
  color: 'var(--cu-mobility-blue)', fontWeight: 600, fontSize: 13, cursor: 'pointer', alignSelf: 'flex-start' };
