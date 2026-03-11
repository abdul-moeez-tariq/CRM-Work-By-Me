// import { initHeader } from "./header.js";
// import { initTheme } from "./theme.js";

// async function loadComponent(path, targetId) {
//   const res = await fetch(path);
//   const html = await res.text();
//   document.getElementById(targetId).innerHTML = html;
// }

// async function init() {
//   await loadComponent("components/header.html", "header");
//   await loadComponent("components/theme.html", "themeToggleContainer");

//   initHeader();
//   initTheme();
// }

// init();

// loadComponents.js (updated)

import { initHeader } from "./header.js";
import { initTheme } from "./theme.js";
import { initSidebar } from "./sidebar.js";

async function loadComponent(path, targetId) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(targetId).innerHTML = html;
}

async function init() {
  // Pehle header load karo
  await loadComponent("./components/header.html", "header");
  loadComponent("./components/sidebar.html", "sidebar-container");

  // Ab header DOM mein aa chuka hai → ab init functions call karo
  initHeader();
  initTheme();
  initSidebar();
}

init();
