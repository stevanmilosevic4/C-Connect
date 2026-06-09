// C>Connect — Parent & Regional Manager screens.
import React from 'react';
import { Button, Card, Badge, StatusPill, Avatar, Chip } from '../ds/index.jsx';
import { Icon } from '../icons.jsx';
import { AppBar, RoundBtn, Screen, SectionLabel, StatTile, ListRow, statusPill, pinColor } from '../shell.jsx';
import { schools, inbox, fairs, ambassadors, school, countries } from '../data.js';

const lbl = { fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' };

// ============ PARENT — DASHBOARD ============
export function ParentDashboard({ me, nav }) {
  return (
    <>
      <AppBar left={<Avatar name={me.name} size={40} />} title={`Hi, ${me.name.split(' ')[0]}`}
        subtitle={me.role} right={<RoundBtn name="bell" badge onClick={() => nav.go('notifications')} />} />
      <Screen bg="var(--surface-subtle)">
        <Card variant="accent" elevation="raised" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="handshake" size={20} color="var(--cu-navy)" />
            <span style={{ fontWeight: 900, fontSize: 15, color: 'var(--cu-navy)' }}>Your contribution</span>
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--text-body)' }}>
            Thank you for helping Constructor grow. Parent ambassadors open doors — no targets, no rewards, just impact.
          </div>
        </Card>
        <div style={{ display: 'flex', gap: 10 }}>
          <StatTile value={me.schoolsAdded} label="Schools added" />
          <StatTile value={me.visits} label="Visits" />
          <StatTile value={me.referrals} label="Referrals" accent="var(--cu-mobility-blue)" />
        </div>
        <Button variant="accent" size="lg" block iconLeft={<Icon name="map" size={20} />}
          onClick={() => nav.setTab('map')}>Find schools on map</Button>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" size="md" block iconLeft={<Icon name="plus" size={18} />}
            onClick={() => nav.go('add-refer', { tab: 'school' })}>Add school</Button>
          <Button variant="secondary" size="md" block iconLeft={<Icon name="phone" size={18} />}
            onClick={() => nav.go('add-refer', { tab: 'refer' })}>Refer student</Button>
        </div>
        <SectionLabel>Recent</SectionLabel>
        <ListRow icon="school" title="Gymnasium West" sub="Visit · approved" right={<StatusPill status="approved" />} />
        <ListRow icon="plus" iconColor="var(--cu-mobility-blue)" title="Added: Humboldt Schule" sub="Sent to recruitment team" right={<StatusPill status="sent">Saved</StatusPill>} />
      </Screen>
    </>
  );
}

// ============ PARENT — ADD / REFER ============
export function AddRefer({ nav, params }) {
  const [tab, setTab] = React.useState(params.tab || 'school');
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Add & refer" />
      <Screen bg="var(--surface-subtle)">
        <div style={{ display: 'flex', gap: 8 }}>
          <Chip active={tab === 'school'} onClick={() => setTab('school')}>Add a school</Chip>
          <Chip active={tab === 'refer'} onClick={() => setTab('refer')}>Refer a student</Chip>
        </div>
        {tab === 'school' ? (
          <>
            <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Know a school Constructor should reach? Tell us and the recruitment team takes it from there.</div>
            <Field label="School name" ph="e.g. Gymnasium West" />
            <Field label="City" ph="Dortmund" />
            <Field label="Contact person & email" ph="Name · email (if known)" />
            <div><label style={lbl}>How do you know them?</label>
              <textarea className="cu-input" rows={3} placeholder="A line of context…" style={{ marginTop: 6 }} /></div>
            <Button variant="primary" size="lg" block iconRight={<Icon name="arrowRight" size={18} />}
              onClick={nav.back}>Submit to recruitment team</Button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Suggest a student Constructor should meet. We’ll reach out personally.</div>
            <Field label="Student name" ph="Full name" />
            <Field label="School" ph="Their current school" />
            <div><label style={lbl}>Why would they be a good fit?</label>
              <textarea className="cu-input" rows={3} placeholder="A short note…" style={{ marginTop: 6 }} /></div>
            <Button variant="primary" size="lg" block iconRight={<Icon name="arrowRight" size={18} />}
              onClick={nav.back}>Send referral</Button>
          </>
        )}
      </Screen>
    </>
  );
}

function Field({ label, ph }) {
  return (
    <div>
      <label style={lbl}>{label}</label>
      <input className="cu-input" placeholder={ph} style={{ marginTop: 6 }} />
    </div>
  );
}

export function ParentContacts() {
  return (
    <>
      <AppBar title="Contacts" subtitle="Schools you’ve added" right={<RoundBtn name="plus" />} />
      <Screen bg="var(--surface-subtle)">
        {schools.filter((s) => ['new', 'contacted'].includes(s.status)).map((s) => (
          <ListRow key={s.id} icon="school" title={s.name} sub={`${s.city} · ${s.status === 'new' ? 'awaiting contact' : 'contacted'}`}
            right={statusPill(s.status)} />
        ))}
      </Screen>
    </>
  );
}

export function ParentProfile({ me, nav, onSignOut }) {
  return (
    <>
      <AppBar title="Profile" right={<RoundBtn name="bell" badge onClick={() => nav.go('notifications')} />} />
      <Screen bg="var(--surface-subtle)">
        <Card style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <Avatar name={me.name} size={56} />
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: 'var(--cu-navy)' }}>{me.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{me.role}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-subtle)', marginTop: 2 }}>Parent of {me.child}</div>
          </div>
        </Card>
        <ListRow icon="phone" iconColor="var(--cu-healthy-green)" title="Your Regional Manager" sub="Message or email them" right={<Icon name="chevronRight" size={18} color="var(--neutral-400)" />} onClick={() => nav.go('contact-rm')} />
        <ListRow icon="settings" iconColor="var(--neutral-600)" title="Settings & notifications" right={<Icon name="chevronRight" size={18} color="var(--neutral-400)" />} onClick={() => nav.go('settings')} />
        <ListRow icon="logout" iconColor="var(--cu-diversity-red)" title="Sign out" onClick={onSignOut} />
      </Screen>
    </>
  );
}

// ============ RM — INBOX ============
export function RMInbox({ me, nav }) {
  const [country, setCountry] = React.useState('All');
  const list = inbox.filter((it) => country === 'All' || school(it.school).country === country);
  return (
    <>
      <AppBar title="Inbox"
        subtitle={`${country === 'All' ? 'All countries' : country} · ${list.length} awaiting you`}
        right={<RoundBtn name="bell" badge onClick={() => nav.go('notifications')} />} />
      <Screen bg="var(--surface-subtle)">
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          <Chip active={country === 'All'} onClick={() => setCountry('All')}>All countries</Chip>
          {countries.map((c) => (
            <Chip key={c} active={country === c} onClick={() => setCountry(c)}>{c}</Chip>
          ))}
        </div>
        {list.map((it) => {
          const sch = school(it.school);
          return (
            <Card key={it.id} interactive elevation="raised" onClick={() => nav.go('review', { id: it.id })}
              style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ fontWeight: 900, fontSize: 15.5, color: 'var(--cu-navy)' }}>{sch.name}</div>
                <StatusPill status="pending">New</StatusPill>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <Avatar name={it.ambassador} size={30} />
                <span style={{ fontSize: 13, color: 'var(--text-body)' }}>
                  <strong style={{ fontWeight: 700 }}>{it.ambassador}</strong> · {it.role}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                  <Icon name="calendar" size={13} style={{ display: 'inline', verticalAlign: -2 }} /> proposes {it.dates.join(' / ')}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{it.when}</span>
              </div>
            </Card>
          );
        })}
      </Screen>
    </>
  );
}

// ============ RM — REVIEW ============
export function RMReview({ nav, params }) {
  const it = inbox.find((x) => x.id === params.id);
  const sch = school(it.school);
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Review request" />
      <Screen bg="var(--surface-subtle)">
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={it.ambassador} size={46} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 16, color: 'var(--cu-navy)' }}>{it.ambassador}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{it.role}{it.level !== '—' ? ` · ${it.level}` : ''} · {it.visits} quests</div>
          </div>
        </Card>
        <SectionLabel>School & dates</SectionLabel>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>{sch.name}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{sch.city} · proposes {it.dates.join(' or ')}</div>
          {it.note && <div style={{ fontSize: 13, color: 'var(--text-body)', marginTop: 6, paddingTop: 8, borderTop: '1px solid var(--border-subtle)', fontStyle: 'italic' }}>“{it.note}”</div>}
        </Card>
        <SectionLabel>Outgoing email</SectionLabel>
        <Card style={{ fontSize: 13, color: 'var(--text-body)', lineHeight: 1.5 }}>
          <div style={{ color: 'var(--text-subtle)', marginBottom: 6 }}>To: {sch.email || 'contact@school.de'} · Cc: {it.ambassador}</div>
          Dear {sch.contact !== '—' ? sch.contact : 'Sir or Madam'}, I am an ambassador for Constructor University Bremen and would be glad to visit…
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none',
            color: 'var(--cu-mobility-blue)', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', marginTop: 8, padding: 0 }}>
            <Icon name="edit" size={14} /> Edit before sending</button>
        </Card>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="danger-outline" size="lg" block onClick={nav.back}>Decline</Button>
          <Button variant="primary" size="lg" block iconRight={<Icon name="send" size={17} />} onClick={nav.back}>Approve & send</Button>
        </div>
      </Screen>
    </>
  );
}

// ============ RM — FAIRS MANAGEMENT ============
export function RMFairs() {
  const [adding, setAdding] = React.useState(false);
  return (
    <>
      <AppBar title="Fairs" subtitle="Post & manage events"
        right={<RoundBtn name="plus" onClick={() => setAdding((a) => !a)} />} />
      <Screen bg="var(--surface-subtle)">
        {adding && (
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 10, border: '2px solid var(--cu-mobility-blue)' }}>
            <div style={{ fontWeight: 900, fontSize: 15, color: 'var(--cu-navy)' }}>Post a new fair</div>
            <input className="cu-input" placeholder="Fair name" />
            <input className="cu-input" placeholder="Location" />
            <div style={{ display: 'flex', gap: 10 }}>
              <input className="cu-input" placeholder="Start date" />
              <input className="cu-input" placeholder="End date" />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="ghost" block onClick={() => setAdding(false)}>Cancel</Button>
              <Button variant="primary" block onClick={() => setAdding(false)}>Publish fair</Button>
            </div>
          </Card>
        )}
        <SectionLabel>Your posted fairs</SectionLabel>
        {fairs.map((f) => (
          <Card key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--cu-navy)' }}>{f.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{f.city} · {f.dates}</div>
            </div>
            <Badge variant="accent">{f.going} going</Badge>
          </Card>
        ))}
      </Screen>
    </>
  );
}

// ============ RM — SCHOOLS DB ============
export function RMSchools({ nav }) {
  const [f, setF] = React.useState('all');
  const [country, setCountry] = React.useState('All');
  const list = schools.filter((s) => (f === 'all' || s.status === f) && (country === 'All' || s.country === country));
  return (
    <>
      <AppBar title="Schools" subtitle="Database & contacts"
        right={<RoundBtn name="plus" onClick={() => nav.go('add-school')} />} />
      <Screen bg="var(--surface-subtle)">
        <input className="cu-input" placeholder="Search schools…" />
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          <Chip active={country === 'All'} onClick={() => setCountry('All')}>All countries</Chip>
          {countries.map((c) => (
            <Chip key={c} active={country === c} onClick={() => setCountry(c)}>{c}</Chip>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {[['all', 'All'], ['contacted', 'Contacted'], ['visited', 'Visited'], ['new', 'No contact']].map(([k, l]) => (
            <Chip key={k} active={f === k} onClick={() => setF(k)}>{l}</Chip>
          ))}
        </div>
        {list.map((s) => (
          <ListRow key={s.id} icon="school" iconColor={pinColor(s.status)} title={s.name}
            sub={`${s.city}, ${s.country} · ${s.contact !== '—' ? s.contact : 'no contact'}`}
            right={<Icon name="edit" size={17} color="var(--neutral-400)" />} />
        ))}
      </Screen>
    </>
  );
}

// ============ RM — ADD SCHOOL (with multiple contacts) ============
const CONTACT_ROLES = ['High school counselor', 'Teacher', 'Principal', 'Owner', 'Director'];

export function AddSchool({ nav }) {
  const [contacts, setContacts] = React.useState([{ name: '', email: '', phone: '', role: CONTACT_ROLES[0] }]);
  const update = (i, k, v) => setContacts((cs) => cs.map((c, idx) => (idx === i ? { ...c, [k]: v } : c)));
  const addContact = () => setContacts((cs) => [...cs, { name: '', email: '', phone: '', role: CONTACT_ROLES[0] }]);
  const removeContact = (i) => setContacts((cs) => cs.filter((_, idx) => idx !== i));
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Add a school" />
      <Screen bg="var(--surface-subtle)">
        <div><label style={lbl}>School name</label>
          <input className="cu-input" placeholder="e.g. Gymnasium West" style={{ marginTop: 6 }} /></div>
        <div><label style={lbl}>Address</label>
          <textarea className="cu-input" rows={2} placeholder="Street, city, country" style={{ marginTop: 6 }} /></div>

        <SectionLabel>Contacts</SectionLabel>
        {contacts.map((c, i) => (
          <Card key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--cu-navy)' }}>Contact {i + 1}</span>
              {contacts.length > 1 && (
                <button onClick={() => removeContact(i)} style={{ background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--cu-diversity-red)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 600, padding: 0 }}>
                  <Icon name="x" size={14} /> Remove
                </button>
              )}
            </div>
            <input className="cu-input" placeholder="Name" value={c.name} onChange={(e) => update(i, 'name', e.target.value)} />
            <input className="cu-input" type="email" placeholder="Email" value={c.email} onChange={(e) => update(i, 'email', e.target.value)} />
            <input className="cu-input" type="tel" placeholder="Phone" value={c.phone} onChange={(e) => update(i, 'phone', e.target.value)} />
            <div>
              <label style={{ ...lbl, fontSize: 12, color: 'var(--text-muted)' }}>Role at school</label>
              <select className="cu-input" value={c.role} onChange={(e) => update(i, 'role', e.target.value)} style={{ marginTop: 6 }}>
                {CONTACT_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </Card>
        ))}
        <Button variant="secondary" size="md" block iconLeft={<Icon name="plus" size={18} />} onClick={addContact}>
          Add another contact
        </Button>

        <div style={{ flex: 1, minHeight: 8 }} />
        <Button variant="primary" size="lg" block iconRight={<Icon name="check" size={18} />} onClick={nav.back}>
          Save school
        </Button>
      </Screen>
    </>
  );
}

// ============ RM — PEOPLE (ambassadors) ============
export function RMPeople() {
  const [f, setF] = React.useState('active');
  return (
    <>
      <AppBar title="Ambassadors" subtitle="Activity & tiers" right={<RoundBtn name="search" />} />
      <Screen bg="var(--surface-subtle)">
        <div style={{ display: 'flex', gap: 8 }}>
          <Chip active={f === 'active'} onClick={() => setF('active')}>Active</Chip>
          <Chip active={f === 'tier'} onClick={() => setF('tier')}>By tier</Chip>
        </div>
        {ambassadors.map((a) => (
          <Card key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <Avatar name={a.name} size={42} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--text-strong)' }}>{a.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{a.role} · {a.visits} quests · €{a.earned}</div>
            </div>
            <Badge variant={a.level === 'Constructor' ? 'navy' : 'outline'}>{a.level}</Badge>
          </Card>
        ))}
        <SectionLabel>Submitted photos · review</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ aspectRatio: '1', borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg,#dde6ef,#c9d6e4)',
              border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="camera" size={20} color="var(--neutral-400)" /></div>
          ))}
        </div>
      </Screen>
    </>
  );
}
