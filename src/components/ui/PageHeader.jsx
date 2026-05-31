import React from 'react';

// Consistent, left-aligned page heading used across every route.
const PageHeader = ({ eyebrow, title, subtitle, className = '' }) => (
  <header className={`mb-10 ${className}`}>
    {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
    <h1 className="text-2xl font-normal leading-tight tracking-tight text-ink sm:text-[28px]">{title}</h1>
    {subtitle && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{subtitle}</p>}
  </header>
);

export default PageHeader;
