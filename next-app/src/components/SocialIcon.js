import { FaGithub, FaLinkedin, FaFacebook, FaMedium, FaDiscord, FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function SocialIcon({ platform, size = '1em' }) {
  if (!platform) return <span className="social-icon"><FaLink size={size} /></span>;
  
  const p = platform.toLowerCase();
  
  let IconElement = <FaLink size={size} />;
  let hoverClass = '';

  if (p === 'x' || p.includes('twitter')) {
    IconElement = <FaXTwitter size={size} />;
    hoverClass = 'hover-brand-x';
  } else if (p.includes('github')) {
    IconElement = <FaGithub size={size} />;
    hoverClass = 'hover-brand-github';
  } else if (p.includes('linkedin')) {
    IconElement = <FaLinkedin size={size} />;
    hoverClass = 'hover-brand-linkedin';
  } else if (p.includes('facebook')) {
    IconElement = <FaFacebook size={size} />;
    hoverClass = 'hover-brand-facebook';
  } else if (p.includes('medium')) {
    IconElement = <FaMedium size={size} />;
    hoverClass = 'hover-brand-medium';
  } else if (p.includes('discord')) {
    IconElement = <FaDiscord size={size} />;
    hoverClass = 'hover-brand-discord';
  }

  return <span className={`social-icon ${hoverClass}`} style={{ display: 'inline-flex', alignItems: 'center' }}>{IconElement}</span>;
}
