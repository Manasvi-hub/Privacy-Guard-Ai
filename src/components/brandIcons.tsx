import * as React from "react";

// These are stylized, non-exact SVGs that match the official color palettes
// but keep simplified geometry for a clean UI and easy tweaking.

export const Chrome: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="gChrome" x1="0" x2="1">
        <stop offset="0" stopColor="#4285F4" />
        <stop offset="1" stopColor="#2A56C6" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="#DB4437" />
    <path d="M12 3.2a8.8 8.8 0 0 1 6.6 3.4L12 12V3.2z" fill="#F4B400" />
    <path d="M4.6 9.3A8.8 8.8 0 0 1 12 3.2v8.8H4.6z" fill="#0F9D58" />
    <circle cx="15.2" cy="10.8" r="3.2" fill="url(#gChrome)" />
  </svg>
);

export const Edge: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="gEdge" x1="0" x2="1">
        <stop offset="0" stopColor="#00A4EF" />
        <stop offset="1" stopColor="#0078D7" />
      </linearGradient>
    </defs>
    <path d="M3 12c0 5 4 9 9 9 2 0 4-0.6 5.6-1.7C17 17 13.3 15.5 9.6 15.5 8 15.5 6.5 15.8 5 16.4V12z" fill="url(#gEdge)" />
    <path d="M12 3C9 3 6.4 4 4.5 5.8 7 5 9.4 4.5 12 4.5c3.7 0 7 1 9.6 3.1C20 4.2 16.4 3 12 3z" fill="#00B4F5" opacity="0.95" />
  </svg>
);

export const Firefox: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <radialGradient id="gFx" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#FFB86B" />
        <stop offset="60%" stopColor="#FF6A00" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="#0A0A0A" />
    <path d="M4.8 12.6c1-4 5.5-6.4 9-5.6-.8 1.2-1.1 2.8-.8 4.4-2 0-3.8 1-5.6 2.2-1.2 0.8-1.6 0-1.6 0z" fill="url(#gFx)" />
    <circle cx="14" cy="12" r="3" fill="#512DA8" />
  </svg>
);

export const Opera: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="gOp" x1="0" x2="1">
        <stop offset="0" stopColor="#FF2B2B" />
        <stop offset="1" stopColor="#D40000" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#gOp)" />
    <circle cx="12" cy="12" r="6.2" fill="#0A0A0A" opacity="0.06" />
    <circle cx="12" cy="12" r="4.2" fill="#FF2B2B" />
  </svg>
);

export const Safari: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="gSafari" x1="0" x2="1">
        <stop offset="0" stopColor="#4DA3E1" />
        <stop offset="1" stopColor="#1E7FC1" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#gSafari)" />
    <circle cx="12" cy="12" r="6" fill="#fff" opacity="0.06" />
    <path d="M12 6l2 6.2L12 17l-2-4.8L12 6z" fill="#FF6B6B" opacity="0.95" />
  </svg>
);

export default { Chrome, Edge, Firefox, Opera, Safari };
