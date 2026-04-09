import * as React from "react";

export const Chrome: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="11" fill="#DB4437" />
    <path d="M12 3.2a8.8 8.8 0 0 1 7.1 3.9L12 12V3.2z" fill="#F4B400" />
    <path d="M4.8 9.1A8.8 8.8 0 0 1 12 3.2v8.8H4.8z" fill="#0F9D58" />
    <circle cx="15.2" cy="10.8" r="3.2" fill="#4285F4" />
  </svg>
);

export const Edge: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="egrad" x1="0" x2="1">
        <stop offset="0" stopColor="#00A4EF" />
        <stop offset="1" stopColor="#0078D7" />
      </linearGradient>
    </defs>
    <path d="M2 12c0 5.52 4.48 10 10 10 3.31 0 6.26-1.6 8.03-4.05-2.2-2.7-5.86-4.45-9.93-4.45-1.55 0-3.03.28-4.46.79V12z" fill="url(#egrad)" />
    <path d="M12 2C8.5 2 5.4 3.6 3.27 6.18 6.02 5.1 8.94 4.5 12 4.5c4.18 0 7.86 1.1 10.73 3.02C21.34 3.56 17.95 2 12 2z" fill="#00B4F5" opacity="0.95" />
  </svg>
);

export const Firefox: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="#0A0A0A" />
    <path d="M4.5 12.5c1.5-5 7-7 10.5-6-1.5 1.5-2 3.5-1.5 5.5-2 0-4 1.2-6 2.5-2 1.3-2.5 0.5-3 0z" fill="#FF7139" />
    <path d="M19 12.5c-1.2 4-4 6-7 6 0-1 1-3 1-4 2-1 4-2 4-2z" fill="#FF8A00" />
    <circle cx="12" cy="12" r="3" fill="#512DA8" />
  </svg>
);

export const Opera: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="#FF2B2B" />
    <circle cx="12" cy="12" r="6" fill="#FFF" opacity="0.07" />
    <circle cx="12" cy="12" r="4" fill="#FF2B2B" />
  </svg>
);

export const Safari: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="11" fill="#2D9CDB" />
    <circle cx="12" cy="12" r="6" fill="#FFF" opacity="0.06" />
    <path d="M12 6l2.2 6.8L12 17 9.8 12.8 12 6z" fill="#FF4D4D" />
    <path d="M12 6l-1.2 6.8L12 17l2.2-4.2L12 6z" fill="#FFFFFF" opacity="0.5" />
  </svg>
);

export default { Chrome, Edge, Firefox, Opera, Safari };
