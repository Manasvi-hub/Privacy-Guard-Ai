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

		// Temporarily disable smooth scrolling to avoid a browser restoring a position
		// with a smooth animation. We'll restore the CSS value shortly after load.
		document.documentElement.style.scrollBehavior = 'auto';

		window.scrollTo(0, 0);

		// Some browsers restore from bfcache — ensure we land at top when that happens
		window.addEventListener('pageshow', (ev: PageTransitionEvent) => {
			if (ev.persisted) window.scrollTo(0, 0);
		});

		// After the page is settled, restore the document scroll behavior
		window.addEventListener('load', () => {
			// small delay to let the browser settle
			window.setTimeout(() => {
				document.documentElement.style.scrollBehavior = '';
			}, 50);
		});
	} catch (e) {
		// ignore
	}
}

createRoot(document.getElementById("root")!).render(<App />);
