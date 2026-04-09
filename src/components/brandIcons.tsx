import * as React from "react";

// This component attempts to load an official SVG from `/public/brands/{name}.svg`.
// If the image is missing or fails to load, it falls back to an inline SVG.
// To use real logos, add these files to `public/brands/`: `chrome.svg`, `edge.svg`,
// `firefox.svg`, `opera.svg`, `safari.svg`.

type IconProps = { className?: string; size?: number; alt?: string };

interface ImgWithFallbackProps {
  src: string;
  alt: string;
  fallback: React.ReactElement;
  className?: string;
  size?: number;
}

const ImgWithFallback: React.FC<ImgWithFallbackProps> = ({ src, alt, fallback, className, size }) => {
  const [failed, setFailed] = React.useState(false);
  if (!failed) {
    return (
      // width/height left to CSS via className (w-8 h-8 etc.) — size optional
      <img src={src} alt={alt} className={className} width={size} height={size} onError={() => setFailed(true)} />
    );
  }
  return React.cloneElement(fallback, { className });
};

const ChromeSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="gChromeCenter" x1="0" x2="1">
        <stop offset="0" stopColor="#4285F4" />
        <stop offset="1" stopColor="#2A56C6" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="#EA4335" />
    <path d="M12 3.2a8.8 8.8 0 0 1 6.6 3.4L12 12V3.2z" fill="#FBBC05" />
    <path d="M4.6 9.3A8.8 8.8 0 0 1 12 3.2v8.8H4.6z" fill="#34A853" />
    <circle cx="15" cy="11" r="3" fill="url(#gChromeCenter)" />
  </svg>
);

const EdgeSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="gEdge" x1="0" x2="1">
        <stop offset="0" stopColor="#0078D7" />
        <stop offset="1" stopColor="#00A4EF" />
      </linearGradient>
    </defs>
    <path d="M3 12c0 5 4 9 9 9 2 0 4-0.6 5.6-1.7C17 17 13.3 15.5 9.6 15.5 8 15.5 6.5 15.8 5 16.4V12z" fill="url(#gEdge)" />
    <path d="M12 3C9 3 6.4 4 4.5 5.8 7 5 9.4 4.5 12 4.5c3.7 0 7 1 9.6 3.1C20 4.2 16.4 3 12 3z" fill="#00C6FF" opacity="0.95" />
  </svg>
);

const FirefoxSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <radialGradient id="gFx" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#FF7139" />
        <stop offset="70%" stopColor="#FF9400" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="#0D0D0D" />
    <path d="M4.8 12.6c1-4 5.5-6.4 9-5.6-.8 1.2-1.1 2.8-.8 4.4-2 0-3.8 1-5.6 2.2-1.2 0.8-1.6 0-1.6 0z" fill="url(#gFx)" />
    <circle cx="14" cy="12" r="3" fill="#FF7139" opacity="0.95" />
  </svg>
);

const OperaSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="gOp" x1="0" x2="1">
        <stop offset="0" stopColor="#FF1B2D" />
        <stop offset="1" stopColor="#C5111A" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#gOp)" />
    <circle cx="12" cy="12" r="5" fill="#fff" opacity="0.06" />
    <circle cx="12" cy="12" r="3.8" fill="#FF1B2D" />
  </svg>
);

const SafariSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="gSafari" x1="0" x2="1">
        <stop offset="0" stopColor="#1E90FF" />
        <stop offset="1" stopColor="#0A66C2" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#gSafari)" />
    <circle cx="12" cy="12" r="6" fill="#fff" opacity="0.06" />
    <g transform="translate(12,12)">
      <path d="M0-4 L1.4 3.2 L0 6 L-1.4 1.8 Z" fill="#fff" opacity="0.95" transform="rotate(20)" />
      <circle cx="0" cy="0" r="1.2" fill="#0A3B7A" />
    </g>
  </svg>
);

export const Chrome: React.FC<IconProps> = ({ className, size, alt }) => (
  <ImgWithFallback src="/brands/chrome.svg" alt={alt ?? "Chrome"} fallback={<ChromeSVG />} className={className} size={size} />
);

export const Edge: React.FC<IconProps> = ({ className, size, alt }) => (
  <ImgWithFallback src="/brands/edge.svg" alt={alt ?? "Edge"} fallback={<EdgeSVG />} className={className} size={size} />
);

export const Firefox: React.FC<IconProps> = ({ className, size, alt }) => (
  <ImgWithFallback src="/brands/firefox.svg" alt={alt ?? "Firefox"} fallback={<FirefoxSVG />} className={className} size={size} />
);

export const Opera: React.FC<IconProps> = ({ className, size, alt }) => (
  <ImgWithFallback src="/brands/opera.svg" alt={alt ?? "Opera"} fallback={<OperaSVG />} className={className} size={size} />
);

export const Safari: React.FC<IconProps> = ({ className, size, alt }) => (
  <ImgWithFallback src="/brands/safari.svg" alt={alt ?? "Safari"} fallback={<SafariSVG />} className={className} size={size} />
);

export default { Chrome, Edge, Firefox, Opera, Safari };
