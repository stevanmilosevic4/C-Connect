// C>Connect — app shell + shared building blocks.
import { Card, Badge, StatusPill } from './ds/index.jsx';
import { Icon } from './icons.jsx';
import { tiers as TIERS, schoolLog } from './data.js';

// ---- C> brand mark (command-prompt motif) -----------------
export function CMark({ size = 22, light = false }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: size, lineHeight: 1,
      letterSpacing: '-0.02em', color: light ? '#fff' : 'var(--cu-navy)',
      display: 'inline-flex', alignItems: 'baseline',
    }}>
      C<span style={{ color: 'var(--cu-mobility-blue)', margin: '0 1px' }}>›</span>Connect
    </span>
  );
}

// ---- Top safe area + app bar ------------------------------
export function AppBar({ title, left, right, navy = false, big = false, subtitle }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: navy ? 'var(--cu-navy)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'saturate(1.1) blur(10px)',
      borderBottom: navy ? 'none' : '1px solid var(--border-subtle)',
      paddingTop: 54,
    }}>
      <div style={{
        minHeight: 52, display: 'flex', alignItems: 'center', gap: 10,
        padding: '6px 16px 12px',
      }}>
        {left}
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div style={{
              fontWeight: big ? 900 : 700, fontSize: big ? 26 : 18,
              letterSpacing: big ? '-0.02em' : 0, lineHeight: 1.1,
              color: navy ? '#fff' : 'var(--text-strong)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{title}</div>
          )}
          {subtitle && (
            <div style={{ fontSize: 13, color: navy ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginTop: 2 }}>
              {subtitle}
            </div>
          )}
        </div>
        {right}
      </div>
    </div>
  );
}

export function RoundBtn({ name, onClick, navy = false, badge = false }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: 12, flex: 'none', cursor: 'pointer',
      border: navy ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border-subtle)',
      background: navy ? 'rgba(255,255,255,0.08)' : '#fff',
      color: navy ? '#fff' : 'var(--cu-navy)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      <Icon name={name} size={20} />
      {badge && <span style={{
        position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: '50%',
        background: 'var(--cu-diversity-red)', border: '1.5px solid #fff',
      }} />}
    </button>
  );
}

// ---- Bottom tab bar ---------------------------------------
export function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{
      flex: 'none', display: 'flex', justifyContent: 'space-around', alignItems: 'stretch',
      background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--border-subtle)', padding: '8px 4px 30px',
    }}>
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <button key={t.key} onClick={() => onChange(t.key)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: on ? 'var(--cu-navy)' : 'var(--neutral-400)', padding: '4px 0',
          }}>
            <Icon name={t.icon} size={23} stroke={on ? 2.4 : 2} />
            <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500, letterSpacing: 0.1 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---- Screen scaffold: scroll body between bars ------------
export function Screen({ children, pad = true, bg = 'var(--surface-page)' }) {
  return (
    <div style={{
      flex: 1, overflowY: 'auto', overflowX: 'hidden', background: bg,
      padding: pad ? '14px 16px 20px' : 0,
      display: 'flex', flexDirection: 'column', gap: pad ? 12 : 0,
    }}>
      {children}
    </div>
  );
}

// ---- Shared atoms -----------------------------------------
export function SectionLabel({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '6px 2px 0' }}>
      <span style={{
        fontSize: 12, fontWeight: 700, letterSpacing: 'var(--ls-label)',
        textTransform: 'uppercase', color: 'var(--text-muted)',
      }}>{children}</span>
      {action}
    </div>
  );
}

export function StatTile({ value, label, accent }) {
  return (
    <Card size="sm" style={{ flex: 1, textAlign: 'center', padding: '12px 6px' }}>
      <div style={{ fontSize: 24, fontWeight: 900, color: accent || 'var(--cu-navy)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 'var(--ls-label)', textTransform: 'uppercase',
        color: 'var(--text-muted)', marginTop: 5 }}>{label}</div>
    </Card>
  );
}

export function ListRow({ icon, iconColor, title, sub, right, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', background: '#fff', cursor: onClick ? 'pointer' : 'default',
      border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
      padding: '11px 12px', display: 'flex', alignItems: 'center', gap: 11,
    }}>
      {icon && (
        <span style={{
          width: 38, height: 38, borderRadius: 10, flex: 'none', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: (iconColor || 'var(--cu-navy)') + '14', color: iconColor || 'var(--cu-navy)',
        }}><Icon name={icon} size={20} /></span>
      )}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontWeight: 700, fontSize: 14.5, color: 'var(--text-strong)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
        {sub && <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-muted)', marginTop: 1 }}>{sub}</span>}
      </span>
      {right}
    </button>
  );
}

// status → pill mapping
export const statusPill = (s) => ({
  contacted: <StatusPill status="sent">Contacted</StatusPill>,
  visited: <StatusPill status="approved">Visited</StatusPill>,
  pending: <StatusPill status="pending">Pending</StatusPill>,
  new: <StatusPill status="neutral">No contact</StatusPill>,
  approved: <StatusPill status="approved" />,
  sent: <StatusPill status="sent" />,
}[s] || null);

export const pinColor = (s) => ({
  contacted: 'var(--cu-mobility-blue)', visited: 'var(--cu-healthy-green)',
  pending: 'var(--cu-shiny-yellow)', new: 'var(--neutral-400)',
}[s] || 'var(--cu-navy)');

// ---- Map view (stylised Germany with pins) ----------------
export function MapView({ schools, onPick, selected, filter }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
      background: 'linear-gradient(180deg,#eef3f7,#e4ebf2)' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5,
        backgroundImage: 'linear-gradient(var(--neutral-200) 1px,transparent 1px),linear-gradient(90deg,var(--neutral-200) 1px,transparent 1px)',
        backgroundSize: '34px 34px' }} />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: '6% 14% 8% 18%' }}>
        <path d="M30 6 C44 2 58 8 62 16 C74 18 80 28 76 40 C84 50 78 66 66 70 C64 84 50 92 40 86 C28 90 16 82 18 70 C8 62 10 46 20 40 C16 28 20 12 30 6 Z"
          fill="rgba(0,140,227,0.07)" stroke="var(--cu-mobility-blue)" strokeOpacity="0.35"
          strokeWidth="0.8" strokeDasharray="2 2" />
      </svg>
      {schools.map((s) => {
        const dim = filter && filter !== 'all' && s.status !== filter;
        const sel = selected === s.id;
        return (
          <button key={s.id} onClick={() => onPick(s.id)} style={{
            position: 'absolute', left: s.x + '%', top: s.y + '%', transform: 'translate(-50%,-100%)',
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            opacity: dim ? 0.3 : 1, zIndex: sel ? 5 : 1, transition: 'opacity .2s',
          }}>
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: sel ? 34 : 26, height: sel ? 34 : 26, borderRadius: '50% 50% 50% 2px',
              transform: 'rotate(45deg)', background: pinColor(s.status),
              border: '2px solid #fff', boxShadow: 'var(--shadow-md)', transition: 'all .15s',
            }}>
              <span style={{ transform: 'rotate(-45deg)', display: 'flex' }}>
                <Icon name="school" size={sel ? 16 : 12} color="#fff" stroke={2.4} />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ---- Tier ladder ------------------------------------------
export function TierLadder({ current, compact = false }) {
  const curIdx = TIERS.findIndex((t) => t.key === current);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {TIERS.map((t, i) => {
        const done = i < curIdx, cur = i === curIdx;
        const c = done ? 'var(--cu-healthy-green)' : cur ? 'var(--cu-mobility-blue)' : 'var(--neutral-300)';
        return (
          <div key={t.key}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' }}>
                <span style={{
                  width: 40, height: 40, borderRadius: '50%', background: (done || cur) ? c : '#fff',
                  border: '2px solid ' + c, color: (done || cur) ? '#fff' : 'var(--neutral-400)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name={done ? 'check' : t.icon} size={20} stroke={2.4} /></span>
                {i < TIERS.length - 1 && <span style={{ width: 2, height: compact ? 20 : 34, background: done ? c : 'var(--neutral-200)' }} />}
              </div>
              <div style={{
                flex: 1, marginBottom: i < TIERS.length - 1 ? 12 : 0,
                border: cur ? '2px solid var(--cu-mobility-blue)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)', padding: '10px 12px', background: cur ? 'var(--status-info-bg)' : '#fff',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 900, fontSize: 15, color: 'var(--cu-navy)' }}>{t.name}</span>
                  {cur && <Badge variant="accent">You are here</Badge>}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>{t.tag}</div>
                {!compact && (
                  <div style={{ display: 'flex', gap: 6, marginTop: 9, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11.5, color: 'var(--text-body)' }}>
                      <Icon name="gift" size={13} style={{ display: 'inline', verticalAlign: -2, marginRight: 3 }} />{t.reward}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---- Terminal build-process progress (C> motif) ----------
function buildVerb(tierKey) {
  return { catalyst: 'initializing', builder: 'building', constructor: 'build complete' }[tierKey] || 'building';
}
export function TerminalProgress({ tierKey, value, max }) {
  const name = TIERS.find((t) => t.key === tierKey)?.name || tierKey;
  const complete = tierKey === 'constructor' || (max && value >= max);
  const blocks = 14;
  const filled = complete ? blocks : Math.max(1, Math.round((value / max) * blocks));
  const fill = complete ? 'var(--cu-healthy-green)' : 'var(--cu-mobility-blue)';
  const Dot = ({ c }) => <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'block' }} />;
  return (
    <div style={{
      background: '#06182F', borderRadius: 'var(--radius-md)', overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.09)', fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 11px',
        borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ display: 'flex', gap: 5 }}>
          <Dot c="var(--cu-diversity-red)" /><Dot c="var(--cu-shiny-yellow)" /><Dot c="var(--cu-healthy-green)" />
        </span>
        <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>ambassador — build</span>
      </div>
      <div style={{ padding: '10px 13px 12px', fontSize: 12.5, lineHeight: 1.75, color: '#cfe0f5' }}>
        <div><span style={{ color: 'var(--cu-mobility-blue)', fontWeight: 700 }}>C&gt;</span>{' '}
          <span style={{ color: '#7fa8d4' }}>ambassador build --status</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
          <span style={{ color: complete ? 'var(--cu-healthy-green)' : 'var(--cu-shiny-yellow)' }}>→</span>
          <span style={{ color: '#fff', fontWeight: 700 }}>{name}</span>
          <span style={{ color: '#9db8d6' }}>· {complete ? 'build complete' : buildVerb(tierKey) + '…'}</span>
          {complete && <span style={{ color: 'var(--cu-healthy-green)' }}>✓</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
          <span style={{ letterSpacing: 1.5, color: fill, fontSize: 12 }}>
            [{'█'.repeat(filled)}<span style={{ color: 'rgba(255,255,255,0.16)' }}>{'░'.repeat(blocks - filled)}</span>]
          </span>
          <span style={{ color: '#fff', fontWeight: 700 }}>{complete ? 'done' : value + '/' + max}</span>
          {!complete && <span className="cc-blink" style={{ color: fill }}>▋</span>}
        </div>
      </div>
    </div>
  );
}

// ---- School history log -----------------------------------
export function HistoryLog({ schoolId }) {
  const log = schoolLog(schoolId);
  if (!log.length) {
    return <Card style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>No history yet — this school hasn’t been contacted.</Card>;
  }
  const meta = {
    requested: { icon: 'send', color: 'var(--cu-mobility-blue)', label: 'Visit requested' },
    visited: { icon: 'checkCircle', color: 'var(--cu-healthy-green)', label: 'Quest completed' },
    declined: { icon: 'x', color: 'var(--cu-diversity-red)', label: 'Request declined' },
  };
  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      {log.map((e, i) => {
        const m = meta[e.type];
        return (
          <div key={i} style={{ display: 'flex', gap: 11, padding: '11px 13px',
            borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, flex: 'none', background: m.color + '18',
              color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={m.icon} size={17} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-strong)' }}>{m.label}</span>
                <span style={{ fontSize: 12, color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>{e.date}</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>by {e.by}{e.detail ? ' · ' + e.detail : ''}</div>
              {e.reason && (
                <div style={{ fontSize: 12.5, color: '#b3160a', marginTop: 5, background: 'var(--status-error-bg)',
                  padding: '6px 9px', borderRadius: 7, lineHeight: 1.4 }}>
                  <strong style={{ fontWeight: 700 }}>Reason:</strong> {e.reason}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </Card>
  );
}
