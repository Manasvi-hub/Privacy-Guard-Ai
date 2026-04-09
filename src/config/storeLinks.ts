// Central place for external store/listing links.
// Set these via Vite env vars (VITE_EDGE_STORE_URL etc.) or edit directly for quick updates.
export const STORE_LINKS = {
  edge: (import.meta.env?.VITE_EDGE_STORE_URL as string) || "",
  chrome: (import.meta.env?.VITE_CHROME_STORE_URL as string) || "",
  firefox: (import.meta.env?.VITE_FIREFOX_STORE_URL as string) || "",
  opera: (import.meta.env?.VITE_OPERA_STORE_URL as string) || "",
  safari: (import.meta.env?.VITE_SAFARI_STORE_URL as string) || "",
  partnerCenter: (import.meta.env?.VITE_PARTNER_CENTER_URL as string) || "",
};

export default STORE_LINKS;
