import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Prevent browsers from restoring previous scroll position on reload.
// Also ensure we start at the top of the page on initial load.
if (typeof window !== "undefined") {
	try {
		if ("scrollRestoration" in history) history.scrollRestoration = "manual";
		// If someone opened the site with a hash present, remove it on initial load
		// so the page doesn't jump to a section on reload. This is intentional
		// to ensure users land at the start of the site.
		if (window.location.hash) {
			history.replaceState(null, document.title, window.location.pathname + window.location.search);
		}
		window.scrollTo(0, 0);
	} catch (e) {
		// ignore
	}
}

createRoot(document.getElementById("root")!).render(<App />);
