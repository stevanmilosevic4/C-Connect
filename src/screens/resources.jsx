// C>Connect — ambassador resources: Make a video, Brochures + reimbursement,
// Sign-up sheet. Shown to students/alumni (and reachable from the dashboard).
import React from 'react';
import { Button, Card } from '../ds/index.jsx';
import { Icon } from '../icons.jsx';
import { AppBar, RoundBtn, Screen, SectionLabel } from '../shell.jsx';
import { brochures, rewardFor, me as ME } from '../data.js';
import { submitWork } from '../lib/api.js';

const lbl = { fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' };

function RewardCard({ amount, when, label = 'Reward' }) {
  return (
    <Card variant="success" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--cu-healthy-green)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        <Icon name="gift" size={22} color="#fff" /></span>
      <div>
        <div style={{ fontSize: 12.5, color: '#066b54' }}>{label}{when ? ` — ${when}` : ''}</div>
        <div style={{ fontWeight: 900, fontSize: 22, color: '#066b54', lineHeight: 1.1 }}>€{amount}</div>
      </div>
    </Card>
  );
}

function Sent({ title, body, nav }) {
  return (
    <Screen bg="var(--surface-subtle)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', gap: 14, padding: '0 18px' }}>
        <span style={{ width: 76, height: 76, borderRadius: '50%', background: 'rgba(0,169,135,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: 54, height: 54, borderRadius: '50%', background: 'var(--cu-healthy-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check" size={30} color="#fff" stroke={3} /></span>
        </span>
        <div style={{ fontWeight: 900, fontSize: 21, color: 'var(--cu-navy)' }}>{title}</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 300 }}>{body}</div>
        <Button variant="primary" size="lg" block style={{ maxWidth: 280 }} onClick={() => nav.reset('home')}>Done</Button>
      </div>
    </Screen>
  );
}

const bullet = (text) => (
  <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
    <span style={{ marginTop: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--cu-mobility-blue)', flex: 'none' }} />
    <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-body)' }}>{text}</span>
  </div>
);

// ============ MAKE A VIDEO — "Day in the life" ============
export function MakeVideo({ nav, role }) {
  const [file, setFile] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState(null);
  const [sent, setSent] = React.useState(false);
  const amount = rewardFor('video', role);

  async function submit() {
    setBusy(true); setErr(null);
    try {
      await submitWork({ kind: 'video', file, meta: {
        amount, role, title: 'Day in the life', ambassadorName: ME[role]?.name } });
      setSent(true);
    } catch (e) { setErr(e.message || 'Something went wrong. Please try again.'); }
    finally { setBusy(false); }
  }

  if (sent) return (
    <Sent nav={nav} title="Video submitted"
      body={`Your “Day in the life” video has been sent to your Regional Manager for review. Once approved, your €${amount} gift card is released.`} />
  );
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Day in the life" />
      <Screen bg="var(--surface-subtle)">
        <div style={{ fontSize: 13.5, color: 'var(--text-body)', lineHeight: 1.55 }}>
          Film a short <strong style={{ fontWeight: 700 }}>“Day in the life of a student”</strong> video — a real,
          natural look at studying at Constructor University Bremen. Earn a <strong style={{ fontWeight: 700 }}>€{amount} gift card</strong> when it’s approved.
        </div>
        <RewardCard amount={amount} when="on approval" label="Video reward" />

        <SectionLabel>Filming guidelines</SectionLabel>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {bullet(<>Keep it <strong style={{ fontWeight: 700 }}>real and natural</strong> — true-to-life scenes: lectures, the lab, campus, friends. Let the cool blue tones come through; no heavy filters, no neon.</>)}
          {bullet(<>Represent the university with care — clean and confident, never salesy. Only use music you have the rights to.</>)}
          {bullet(<>Always say the full name: <strong style={{ fontWeight: 700 }}>“Constructor University Bremen”</strong>, never “CU”.</>)}
          {bullet(<>Lead with <strong style={{ fontWeight: 700 }}>education, research and technology</strong> — “constructing the future”. Keep it inclusive and welcoming.</>)}
          {bullet(<>Film in the <strong style={{ fontWeight: 700 }}>highest quality</strong> your phone allows. 60–90 seconds is plenty; landscape or vertical both work.</>)}
        </Card>

        <Card style={{ display: 'flex', gap: 10, alignItems: 'flex-start', borderLeft: '3px solid var(--cu-mobility-blue)' }}>
          <Icon name="sparkles" size={18} color="var(--cu-mobility-blue)" style={{ marginTop: 1 }} />
          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-body)' }}>
            Not sure where to start? <strong style={{ fontWeight: 700 }}>We can help.</strong> The recruitment team can help you plan, shoot and edit — just ask in the app.
          </div>
        </Card>

        <SectionLabel>Upload your video</SectionLabel>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '22px 16px', borderRadius: 'var(--radius-md)', border: '2px dashed var(--border-default)',
          background: '#fff', cursor: 'pointer', color: 'var(--cu-mobility-blue)', textAlign: 'center' }}>
          <Icon name="camera" size={26} />
          <span style={{ fontSize: 13.5, fontWeight: 700 }}>{file ? file.name : 'Choose a video file'}</span>
          <span style={{ fontSize: 11.5, color: 'var(--text-subtle)' }}>Full quality · uploaded securely to the recruitment team</span>
          <input type="file" accept="video/*" style={{ display: 'none' }}
            onChange={(e) => { setFile(e.target.files[0] || null); setErr(null); }} />
        </label>

        <div style={{ flex: 1, minHeight: 4 }} />
        {err && <div style={{ fontSize: 12.5, color: 'var(--status-error)', textAlign: 'center' }}>{err}</div>}
        <Button variant="primary" size="lg" block disabled={!file || busy} iconRight={<Icon name="send" size={18} />}
          onClick={submit}>{busy ? 'Uploading…' : 'Submit for review'}</Button>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center' }}>
          Your Regional Manager is notified and reviews before the reward is released
        </div>
      </Screen>
    </>
  );
}

// ============ BROCHURES + REIMBURSEMENT ============
export function Brochures({ nav, role }) {
  const [amount, setAmount] = React.useState('');
  const [receipt, setReceipt] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState(null);
  const [sent, setSent] = React.useState(false);

  async function submit() {
    setBusy(true); setErr(null);
    try {
      await submitWork({ kind: 'reimbursement', file: receipt, meta: {
        amount: parseFloat(amount) || 0, role, note: 'brochure printing', ambassadorName: ME[role]?.name } });
      setSent(true);
    } catch (e) { setErr(e.message || 'Something went wrong. Please try again.'); }
    finally { setBusy(false); }
  }

  if (sent) return (
    <Sent nav={nav} title="Receipt submitted"
      body="Your printing receipt has been sent to your Regional Manager. Once approved, you’ll be reimbursed to your registered account." />
  );
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Brochures" />
      <Screen bg="var(--surface-subtle)">
        <div style={{ fontSize: 13.5, color: 'var(--text-body)', lineHeight: 1.55 }}>
          Print these brochures to hand out at schools and fairs. <strong style={{ fontWeight: 700 }}>You pay for the printing
          and submit the receipt</strong> — we reimburse you after your Regional Manager approves it.
        </div>

        <SectionLabel>Attached brochures</SectionLabel>
        {brochures.map((b) => (
          <a key={b.id} href={b.file} target="_blank" rel="noopener noreferrer" download style={{
            textDecoration: 'none', background: '#fff', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)', padding: '11px 12px', display: 'flex', alignItems: 'center', gap: 11 }}>
            <span style={{ width: 38, height: 38, borderRadius: 10, flex: 'none', display: 'flex', alignItems: 'center',
              justifyContent: 'center', background: 'rgba(0,140,227,0.10)', color: 'var(--cu-mobility-blue)' }}>
              <Icon name="mail" size={20} /></span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontWeight: 700, fontSize: 14.5, color: 'var(--text-strong)' }}>{b.name}</span>
              <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-muted)' }}>{b.desc}</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--cu-mobility-blue)',
              fontSize: 12.5, fontWeight: 700 }}><Icon name="arrowRight" size={15} /> PDF</span>
          </a>
        ))}

        <SectionLabel>Claim your printing back</SectionLabel>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label style={lbl}>Amount paid (€)</label>
            <input className="cu-input" type="number" inputMode="decimal" placeholder="e.g. 18.00"
              value={amount} onChange={(e) => setAmount(e.target.value)} style={{ marginTop: 6 }} />
          </div>
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '16px', borderRadius: 'var(--radius-md)', border: '2px dashed var(--border-default)',
            background: 'var(--surface-subtle)', cursor: 'pointer', color: 'var(--cu-mobility-blue)', textAlign: 'center' }}>
            <Icon name="camera" size={22} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>{receipt ? receipt.name : 'Attach photo of receipt'}</span>
            <input type="file" accept="image/*" style={{ display: 'none' }}
              onChange={(e) => { setReceipt(e.target.files[0] || null); setErr(null); }} />
          </label>
        </Card>

        <div style={{ flex: 1, minHeight: 4 }} />
        {err && <div style={{ fontSize: 12.5, color: 'var(--status-error)', textAlign: 'center' }}>{err}</div>}
        <Button variant="primary" size="lg" block disabled={!amount || !receipt || busy}
          iconRight={<Icon name="send" size={18} />} onClick={submit}>{busy ? 'Sending…' : 'Submit for reimbursement'}</Button>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center' }}>
          Needs Regional Manager approval before reimbursement
        </div>
      </Screen>
    </>
  );
}

// ============ SIGN-UP SHEET ============
const SHEET_COLS = ['First name', 'Last name', 'Email', 'Phone (+code)', 'Major', 'Start of term'];

export function SignUpSheet({ nav }) {
  return (
    <>
      <AppBar left={<RoundBtn name="chevronLeft" onClick={nav.back} />} title="Sign-up sheet" />
      <Screen bg="var(--surface-subtle)">
        <div style={{ fontSize: 13.5, color: 'var(--text-body)', lineHeight: 1.55 }}>
          At every visit and fair, carry a <strong style={{ fontWeight: 700 }}>printed sign-up sheet</strong> so interested
          students can leave their details. Bring a few copies and a pen.
        </div>

        <SectionLabel>Columns to collect</SectionLabel>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {[
            ['First name', 'Given name'],
            ['Last name', 'Family name'],
            ['Email', 'Personal email'],
            ['Phone', 'Full international format with country code, e.g. +254 712 345678'],
            ['Intended major', 'Programme they’re interested in'],
            ['Intended start of term', 'e.g. Fall 2026'],
          ].map(([k, v], i) => (
            <div key={k} style={{ display: 'flex', gap: 11, padding: '10px 13px',
              borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <span style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--cu-navy)', width: 130, flex: 'none' }}>{k}</span>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.4 }}>{v}</span>
            </div>
          ))}
        </Card>

        <SectionLabel>Sheet preview</SectionLabel>
        <Card style={{ padding: 0, overflowX: 'auto' }}>
          <div style={{ minWidth: 520 }}>
            <div style={{ display: 'flex', background: 'var(--cu-navy)' }}>
              {SHEET_COLS.map((c) => (
                <div key={c} style={{ flex: 1, padding: '8px 8px', fontSize: 10.5, fontWeight: 700, color: '#fff',
                  borderRight: '1px solid rgba(255,255,255,0.15)', whiteSpace: 'nowrap' }}>{c}</div>
              ))}
            </div>
            {[0, 1, 2, 3].map((r) => (
              <div key={r} style={{ display: 'flex', borderTop: '1px solid var(--border-subtle)' }}>
                {SHEET_COLS.map((c) => (
                  <div key={c} style={{ flex: 1, height: 30, borderRight: '1px solid var(--border-subtle)' }} />
                ))}
              </div>
            ))}
          </div>
        </Card>

        <a href="/resources/cu-signup-sheet.pdf" target="_blank" rel="noopener noreferrer" download
          style={{ textDecoration: 'none' }}>
          <Button as="span" variant="primary" size="lg" block iconLeft={<Icon name="arrowRight" size={18} />}>
            Download printable sheet (PDF)
          </Button>
        </a>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center' }}>
          Print on A4 (landscape). Hand collected details to your Regional Manager after the event.
        </div>
      </Screen>
    </>
  );
}
