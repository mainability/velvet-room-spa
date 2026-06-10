import { site } from "../content/site.js";

export function renderHeader(activePath) {
  return `
    <header class="header">
      <div class="header-inner">
        <a href="/" class="logo" data-link>${site.name}</a>
        <nav class="nav">
          <a href="/" class="nav-link${activePath === "/" ? " active" : ""}" data-link>Home</a>
          <a href="/reservations" class="nav-link nav-cta${activePath === "/reservations" ? " active" : ""}" data-link>Reserve</a>
        </nav>
      </div>
    </header>
  `;
}

export function renderFooter() {
  return `
    <footer class="footer">
      <p class="footer-label">${site.name}</p>
      <p>${site.location.street}, ${site.location.neighborhood}</p>
      <p>${site.location.city}</p>
      <p class="footer-contact">
        <a href="tel:${site.location.phone.replace(/[^\d+]/g, "")}">${site.location.phone}</a>
        ·
        <a href="mailto:${site.location.email}">${site.location.email}</a>
      </p>
    </footer>
  `;
}
