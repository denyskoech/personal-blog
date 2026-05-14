'use client';
import { useState } from 'react';

export default function ImageWithFallback({ src, alt, ...props }) {
  const [error, setError] = useState(false);
  const cleanSrc = src?.trim();

  if (error || !cleanSrc) {
    return (
      <div style={{ ...props.style, background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Image Unavailable</span>
      </div>
    );
  }

  return <img src={cleanSrc} alt={alt} onError={() => setError(true)} {...props} />;
}
