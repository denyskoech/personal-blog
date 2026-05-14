'use client';
import SocialIcon from '@/components/SocialIcon';

export default function ShareButtons({ postUrl, encodedTitle, encodedUrl }) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Share on X">
        <SocialIcon platform="X" size="1.5rem" />
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn">
        <SocialIcon platform="LinkedIn" size="1.5rem" />
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Share on Facebook">
        <SocialIcon platform="Facebook" size="1.5rem" />
      </a>
      <button 
        onClick={() => { navigator.clipboard.writeText(postUrl); alert('Link copied to clipboard!'); }} 
        title="Copy Link"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <SocialIcon platform="Link" size="1.5rem" />
      </button>
    </div>
  );
}
