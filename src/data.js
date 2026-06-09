// C>Connect — mock data (ported from the design handoff data.js).

export const schools = [
  // --- Germany ---
  { id: 'lincoln', name: 'Lincoln High School', city: 'Hamburg', country: 'Germany',
    dist: '12 km', status: 'contacted', contact: 'Dr. A. Weber', role: 'Career Counselor',
    email: 'a.weber@lincoln-hs.de', x: 52, y: 22, lat: 53.5511, lng: 9.9937, visits: 0 },
  { id: 'goethe', name: 'Goethe Gymnasium', city: 'Berlin', country: 'Germany',
    dist: '290 km', status: 'visited', contact: 'M. Schmidt', role: 'Head of Sixth Form',
    email: 'schmidt@goethe-gym.de', x: 68, y: 38, lat: 52.52, lng: 13.405, visits: 2 },
  { id: 'stmary', name: "St. Mary's College", city: 'Munich', country: 'Germany',
    dist: '610 km', status: 'pending', contact: 'Fr. Bauer', role: 'Principal',
    email: 'bauer@stmary.de', x: 60, y: 70, lat: 48.1351, lng: 11.582, visits: 0 },
  { id: 'humboldt', name: 'Humboldt Schule', city: 'Cologne', country: 'Germany',
    dist: '340 km', status: 'new', contact: '—', role: '',
    email: '', x: 40, y: 48, lat: 50.9375, lng: 6.9603, visits: 0 },
  { id: 'leibniz', name: 'Leibniz Gymnasium', city: 'Bremen', country: 'Germany',
    dist: '3 km', status: 'visited', contact: 'K. Hoffmann', role: 'Counselor',
    email: 'hoffmann@leibniz.de', x: 46, y: 28, lat: 53.0793, lng: 8.8017, visits: 3 },
  { id: 'westfield', name: 'Gymnasium West', city: 'Dortmund', country: 'Germany',
    dist: '300 km', status: 'new', contact: '—', role: '',
    email: '', x: 34, y: 42, lat: 51.5136, lng: 7.4653, visits: 0 },
  { id: 'frankfurt-is', name: 'Frankfurt International School', city: 'Frankfurt', country: 'Germany',
    dist: '440 km', status: 'contacted', contact: 'S. Wagner', role: 'Head of Guidance',
    email: 'wagner@fis.de', x: 44, y: 56, lat: 50.1109, lng: 8.6821, visits: 1 },
  // --- Austria ---
  { id: 'mozart', name: 'Mozart Gymnasium', city: 'Vienna', country: 'Austria',
    dist: '690 km', status: 'contacted', contact: 'Dr. L. Gruber', role: 'Director of Studies',
    email: 'gruber@mozart-gym.at', x: 64, y: 90, lat: 48.2082, lng: 16.3738, visits: 1 },
  { id: 'graz-rg', name: 'Graz Realgymnasium', city: 'Graz', country: 'Austria',
    dist: '760 km', status: 'new', contact: '—', role: '',
    email: '', x: 60, y: 96, lat: 47.0707, lng: 15.4395, visits: 0 },
  // --- Netherlands ---
  { id: 'amstel', name: 'Amstel Lyceum', city: 'Amsterdam', country: 'Netherlands',
    dist: '360 km', status: 'new', contact: '—', role: '',
    email: '', x: 13, y: 35, lat: 52.3676, lng: 4.9041, visits: 0 },
  { id: 'rotterdam-lyceum', name: 'Rotterdam Lyceum', city: 'Rotterdam', country: 'Netherlands',
    dist: '390 km', status: 'contacted', contact: 'J. Visser', role: 'Dean',
    email: 'visser@rotterdam-lyceum.nl', x: 10, y: 40, lat: 51.9244, lng: 4.4777, visits: 0 },
  // --- Poland ---
  { id: 'warsaw-lyceum', name: 'Warsaw Lyceum XIV', city: 'Warsaw', country: 'Poland',
    dist: '850 km', status: 'visited', contact: 'A. Kowalski', role: 'Career Advisor',
    email: 'kowalski@lo14.waw.pl', x: 86, y: 40, lat: 52.2297, lng: 21.0122, visits: 2 },
  { id: 'krakow-gim', name: 'Kraków Gymnasium', city: 'Kraków', country: 'Poland',
    dist: '900 km', status: 'new', contact: '—', role: '',
    email: '', x: 84, y: 56, lat: 50.0647, lng: 19.945, visits: 0 },
  // --- France ---
  { id: 'paris-saclay', name: 'Lycée Paris-Saclay', city: 'Paris', country: 'France',
    dist: '880 km', status: 'contacted', contact: 'C. Laurent', role: 'Proviseur',
    email: 'laurent@lycee-saclay.fr', x: 18, y: 64, lat: 48.8566, lng: 2.3522, visits: 0 },
  // --- Kenya ---
  { id: 'nairobi-academy', name: 'Nairobi Academy', city: 'Nairobi', country: 'Kenya',
    dist: '6 400 km', status: 'contacted', contact: 'W. Otieno', role: 'Head of Careers',
    email: 'otieno@nairobi-academy.ac.ke', x: 70, y: 96, lat: -1.2921, lng: 36.8219, visits: 0 },
  { id: 'mombasa-hs', name: 'Mombasa High School', city: 'Mombasa', country: 'Kenya',
    dist: '6 800 km', status: 'new', contact: '—', role: '',
    email: '', x: 74, y: 99, lat: -4.0435, lng: 39.6682, visits: 0 },
];

// Countries the recruitment team operates across (derived from schools).
export const countries = [...new Set(schools.map((s) => s.country))];
export const allCountries = countries;

// Cities within a country (or all if none given).
export function citiesIn(country) {
  return [...new Set(schools.filter((s) => !country || country === 'all' || s.country === country).map((s) => s.city))];
}
// Schools within a set of allowed countries.
export function schoolsIn(countryList) {
  if (!countryList || !countryList.length) return [];
  return schools.filter((s) => countryList.includes(s.country));
}

export const requests = [
  { id: 'r1', school: 'lincoln', ambassador: 'Maria Sánchez', role: 'Student',
    dates: ['12 Mar', '18 Mar'], status: 'approved', note: 'Happy to present to final-year students.',
    steps: [['Submitted', 'done', '08 Mar'], ['Regional Manager approved', 'done', '09 Mar'],
            ['Email sent — you are CC’d', 'current', '09 Mar'], ['Complete quest — upload photos', 'todo', '']] },
  { id: 'r2', school: 'stmary', ambassador: 'Maria Sánchez', role: 'Student',
    dates: ['22 Mar'], status: 'pending', note: '',
    steps: [['Submitted', 'done', 'Today'], ['Awaiting Regional Manager', 'current', ''],
            ['Email sent', 'todo', ''], ['Complete quest — upload photos', 'todo', '']] },
];

export const inbox = [
  { id: 'i1', school: 'lincoln', ambassador: 'Maria Sánchez', role: 'Student', level: 'Builder',
    visits: 7, dates: ['12 Mar', '18 Mar'], note: 'Happy to present to final-year students.', when: '2h ago' },
  { id: 'i2', school: 'stmary', ambassador: 'Jonas Krause', role: 'Alumni', level: 'Constructor',
    visits: 14, dates: ['22 Mar'], note: 'I graduated from Constructor in 2019, CS.', when: '5h ago' },
  { id: 'i3', school: 'westfield', ambassador: 'Thomas Becker', role: 'Parent', level: '—',
    visits: 3, dates: ['28 Mar'], note: 'My daughter attends; I know the head teacher.', when: '1d ago' },
  { id: 'i4', school: 'mozart', ambassador: 'Lukas Gruber', role: 'Student', level: 'Catalyst',
    visits: 2, dates: ['15 Apr'], note: 'I can present in German or English.', when: '3h ago' },
  { id: 'i5', school: 'amstel', ambassador: 'Sanne de Vries', role: 'Alumni', level: 'Builder',
    visits: 5, dates: ['02 May'], note: 'I studied here and know the head of school.', when: '1d ago' },
];

export const fairs = [
  { id: 'f1', name: 'Berlin Education Expo', city: 'Berlin', dates: '04–05 Apr', going: 12,
    mine: true, by: 'RM Lena Vogt' },
  { id: 'f2', name: 'Hamburg University Fair', city: 'Hamburg', dates: '20 Apr', going: 8,
    mine: false, by: 'RM Lena Vogt' },
  { id: 'f3', name: 'Munich STEM Days', city: 'Munich', dates: '11 May', going: 3,
    mine: false, by: 'RM Lena Vogt' },
];

export const ambassadors = [
  { name: 'Maria Sánchez', role: 'Student', field: 'Robotics & Intelligent Systems',
    year: '2026', level: 'Builder', visits: 7, fairs: 2, earned: 175 },
  { name: 'Jonas Krause', role: 'Alumni', field: 'Computer Science', year: '2019',
    level: 'Constructor', visits: 14, fairs: 5, earned: 350 },
  { name: 'Anna Brandt', role: 'Student', field: 'International Business', year: '2027',
    level: 'Catalyst', visits: 2, fairs: 0, earned: 50 },
];

export const tiers = [
  { key: 'catalyst', name: 'Catalyst', icon: 'sparkles', tag: 'You start the reaction',
    blurb: 'First quests, first sparks. You profile your schools and send your opening requests.',
    reward: 'Welcome pack + digital badge', req: 'Profile + first completed quest' },
  { key: 'builder', name: 'Builder', icon: 'hammer', tag: 'You build consistently',
    blurb: 'A steady rhythm of quests and fairs. Schools start to recognise Constructor through you.',
    reward: 'Named, branded hoodie', req: '10 quests or 3 fairs' },
  { key: 'constructor', name: 'Constructor', icon: 'atom', tag: 'You reliably produce results',
    blurb: 'Enrollments trace back to your schools — again and again. You have become what the theory describes, and what the university is named after.',
    reward: 'Premium ambassador kit + reference letter', req: 'Enrollments traced to your schools' },
];

// per-school history log (most recent first)
export const logs = {
  lincoln: [
    { type: 'requested', date: '08 Mar 2025', by: 'Maria Sánchez', detail: 'Proposed 12 or 18 March' },
  ],
  goethe: [
    { type: 'visited', date: '18 Jan 2025', by: 'Jonas Krause', detail: 'Presented to 40 final-year students' },
    { type: 'visited', date: '06 Dec 2024', by: 'Maria Sánchez', detail: 'Careers afternoon' },
  ],
  stmary: [
    { type: 'requested', date: '22 Mar 2025', by: 'Maria Sánchez', detail: 'Awaiting Regional Manager' },
    { type: 'declined', date: '02 Feb 2025', by: 'Jonas Krause',
      reason: 'Mid-exam period — the counselor asked us to return in spring.' },
  ],
  humboldt: [],
  leibniz: [
    { type: 'visited', date: '10 Feb 2025', by: 'Maria Sánchez', detail: 'Robotics demo' },
    { type: 'visited', date: '14 Nov 2024', by: 'Anna Brandt', detail: 'Open evening stand' },
    { type: 'visited', date: '03 Oct 2024', by: 'Jonas Krause', detail: 'First contact visit' },
  ],
  westfield: [
    { type: 'declined', date: '20 Jan 2025', by: 'Thomas Becker',
      reason: 'Head teacher on sabbatical — no decision-maker available until April.' },
  ],
};

export const giftHistory = [
  { school: 'Leibniz Gymnasium', amount: 25, date: '02 Feb' },
  { school: 'Goethe Gymnasium', amount: 25, date: '18 Jan' },
  { school: 'Goethe Gymnasium', amount: 25, date: '06 Dec' },
];

// --- Reward amounts (€). Alumni earn more per activity; long events (5h+)
// can be adjusted up by the Regional Manager. ---------------------------------
export const REWARDS = {
  visit: { student: 25, alumni: 50 },
  fair: { student: 50, alumni: 100 },
  video: 25,      // "Day in the life" video (students)
  interview: 25,  // alumni written interview
  referral: 200,  // when a referred student enrols
};

// The ambassador's Regional Manager contact. Assigned per region — placeholder
// values here; edit when the real RM is assigned.
export const regionalManager = {
  name: 'Lena Vogt',
  region: 'Germany',
  email: 'lena.vogt@constructor.university',
  whatsapp: '+49 151 2345 6789',
};

export function rewardFor(kind, role) {
  const r = REWARDS[kind];
  if (typeof r === 'number') return r;
  return r[role === 'alumni' ? 'alumni' : 'student'];
}

// --- Printable brochures (attached PDFs in /public/brochures).
// Official 2025/26 print-ready files; ambassadors print and hand these out. ----
export const brochures = [
  { id: 'ug-onepager', name: 'Undergraduate — One Pager', desc: 'A4 · print-ready · 9 MB',
    file: '/brochures/cu-undergraduate-onepager-a4.pdf' },
  { id: 'ug-brochure', name: 'Undergraduate (Bachelor) Brochure', desc: 'A5 · print-ready · 20 MB',
    file: '/brochures/cu-undergraduate-bachelor-brochure-a5.pdf' },
  { id: 'ug-postcards', name: 'Undergraduate Postcards', desc: 'A6 · print-ready · 28 MB',
    file: '/brochures/cu-undergraduate-postcards-a6.pdf' },
  { id: 'grad-onepager', name: 'Graduate — One Pager', desc: 'A4 · print-ready · 5 MB',
    file: '/brochures/cu-graduate-onepager-a4.pdf' },
  { id: 'grad-brochure', name: 'Graduate Programmes Brochure', desc: 'A5 · print-ready · 39 MB',
    file: '/brochures/cu-graduate-brochure-a5.pdf' },
  { id: 'pbs-onepager', name: 'Pre-Bachelor Semester — One Pager', desc: 'A4 · print-ready · 6 MB',
    file: '/brochures/cu-pre-bachelor-semester-onepager-a4.pdf' },
  { id: 'anniversary', name: '25th Anniversary — One Pager', desc: 'A4 · print-ready · 8 MB',
    file: '/brochures/cu-25th-anniversary-onepager-a4.pdf' },
  { id: 'rollup', name: 'Roll-up Banner (event stand)', desc: '87 × 227 cm · with bleed · 64 MB',
    file: '/brochures/cu-rollup-banner-87x227cm.pdf' },
];

// --- Notifications (role-aware). RM items can be actioned. --------------------
export const notifications = {
  student: [
    { id: 'n1', icon: 'checkCircle', color: 'var(--cu-healthy-green)', title: 'Visit approved',
      sub: 'Lincoln High School · email sent, you’re CC’d', when: '2h ago' },
    { id: 'n2', icon: 'gift', color: 'var(--cu-healthy-green)', title: 'Reward credited',
      sub: '€25 gift card · Leibniz Gymnasium quest', when: '1d ago' },
    { id: 'n3', icon: 'camera', color: 'var(--cu-mobility-blue)', title: 'Video in review',
      sub: 'Day in the life — your Regional Manager will review it', when: '2d ago' },
    { id: 'n4', icon: 'star', color: 'var(--cu-mobility-blue)', title: 'New fair near you',
      sub: 'Berlin Education Expo · 04–05 Apr', when: '3d ago' },
  ],
  parent: [
    { id: 'p1', icon: 'checkCircle', color: 'var(--cu-healthy-green)', title: 'School added',
      sub: 'Humboldt Schule — recruitment team notified', when: '1d ago' },
    { id: 'p2', icon: 'handshake', color: 'var(--cu-mobility-blue)', title: 'Thank you',
      sub: 'Your referral reached our team', when: '4d ago' },
  ],
  rm: [
    { id: 'rn1', icon: 'inbox', color: 'var(--cu-mobility-blue)', title: 'New visit request',
      sub: 'Maria Sánchez · Lincoln High School', when: '2h ago', kind: 'info' },
    { id: 'rn2', icon: 'camera', color: 'var(--cu-mobility-blue)', title: 'Video submitted',
      sub: 'Maria Sánchez · Day in the life · approve €25 reward', when: '5h ago',
      kind: 'approval', amount: 25, what: 'video reward' },
    { id: 'rn3', icon: 'dollar', color: 'var(--cu-shiny-yellow)', title: 'Reimbursement request',
      sub: 'Jonas Krause · brochure printing · receipt attached', when: '1d ago',
      kind: 'approval', amount: 18, what: 'reimbursement' },
    { id: 'rn4', icon: 'map', color: 'var(--cu-mobility-blue)', title: 'Country access request',
      sub: 'Anna Brandt · requests access to schools in France', when: '4h ago', kind: 'access' },
  ],
};
notifications.alumni = notifications.student;

export const me = {
  student: { name: 'Maria Sánchez', role: 'Student Ambassador', field: 'Robotics & Intelligent Systems',
    year: '2026', level: 'builder', visits: 7, fairs: 2, earned: 175, toNext: 3, progress: 7, progressMax: 10,
    countries: ['Germany'], video: { status: 'none', verifiedOn: null } },
  alumni: { name: 'Jonas Krause', role: 'Alumni Ambassador', field: 'Computer Science',
    year: '2019', level: 'constructor', visits: 14, fairs: 5, earned: 350, toNext: 0, progress: 10, progressMax: 10,
    countries: ['Germany', 'Austria'], video: { status: 'verified', verifiedOn: '2026-02-10' } },
  parent: { name: 'Thomas Becker', role: 'Parent Ambassador', child: 'Lena, applying 2026',
    schoolsAdded: 4, visits: 3, referrals: 2, countries: ['Germany'], video: { status: 'none', verifiedOn: null } },
  rm: { name: 'Lena Vogt', role: 'Regional Manager', region: 'Germany', pending: 3,
    ambassadors: 24, schools: 48, fairs: 3 },
};

export function school(id) { return schools.find((s) => s.id === id); }
export function schoolLog(id) { return logs[id] || []; }

export const CC = { schools, requests, inbox, fairs, ambassadors, tiers, giftHistory, logs, me, school, schoolLog };
export default CC;
