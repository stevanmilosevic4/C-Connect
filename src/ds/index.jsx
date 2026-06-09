// Constructor University — core design-system components (ES modules).
// Ported verbatim from the design handoff (components/core/*.jsx); styles
// live in src/styles/components.css.

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  pill = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  className = '',
  children,
  ...rest
}) {
  const Tag = as;
  const cls = [
    'cu-btn',
    `cu-btn--${variant}`,
    `cu-btn--${size}`,
    block ? 'cu-btn--block' : '',
    pill ? 'cu-btn--pill' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <Tag className={cls} {...rest}>
      {iconLeft}
      {children != null && <span>{children}</span>}
      {iconRight}
    </Tag>
  );
}

export function Card({
  variant = '',
  elevation = 'flat',
  interactive = false,
  size = '',
  as = 'div',
  className = '',
  children,
  ...rest
}) {
  const Tag = as;
  const cls = [
    'cu-card',
    size === 'sm' ? 'cu-card--sm' : '',
    `cu-card--${elevation}`,
    variant ? `cu-card--${variant}` : '',
    interactive ? 'cu-card--interactive' : '',
    className,
  ].filter(Boolean).join(' ');
  return <Tag className={cls} {...rest}>{children}</Tag>;
}

export function Badge({ variant = 'navy', className = '', children, ...rest }) {
  const cls = ['cu-badge', `cu-badge--${variant}`, className].filter(Boolean).join(' ');
  return <span className={cls} {...rest}>{children}</span>;
}

export function StatusPill({ status = 'neutral', className = '', children, ...rest }) {
  const label = children != null ? children : {
    pending: 'Pending', approved: 'Approved', sent: 'Sent',
    error: 'Declined', neutral: '—',
  }[status];
  const cls = ['cu-pill', `cu-pill--${status}`, className].filter(Boolean).join(' ');
  return <span className={cls} {...rest}>{label}</span>;
}

export function ProgressBar({ value = 0, max = 100, success = false, className = '', ...rest }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const cls = ['cu-progress', success ? 'cu-progress--success' : '', className].filter(Boolean).join(' ');
  return (
    <div
      className={cls}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...rest}
    >
      <div className="cu-progress__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Avatar({ name = '', src = null, size = 40, className = '', style = {}, ...rest }) {
  const initials = name
    .split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  const cls = ['cu-avatar', className].filter(Boolean).join(' ');
  return (
    <span
      className={cls}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.4), ...style }}
      {...rest}
    >
      {src ? <img src={src} alt={name} /> : initials}
    </span>
  );
}

export function Chip({ active = false, className = '', children, ...rest }) {
  const cls = ['cu-chip', active ? 'is-active' : '', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-pressed={active} {...rest}>
      {children}
    </button>
  );
}
