import { site } from "../content/site.js";
import { renderHeader, renderFooter } from "../components/layout.js";

export function renderWelcomePage() {
  const hoursHtml = site.hours
    .map(
      (row) => `
        <div class="hours-row">
          <span>${row.day}</span>
          <span>${row.time}</span>
        </div>
      `
    )
    .join("");

  return `
    ${renderHeader("/")}
    <main>
      <section class="hero">
        <div class="hero-bg">
          <img src="${site.heroImage}" alt="Dimly lit cocktail lounge" class="hero-image" />
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
          <p class="eyebrow">Welcome to</p>
          <h1 class="hero-title">${site.name}</h1>
          <p class="hero-subtitle">Cocktail Lounge · Tel Aviv</p>
          <p class="hero-tagline">${site.tagline}</p>
          <a href="/reservations" class="btn-primary" data-link>Make a Reservation</a>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <p class="eyebrow">Visit us</p>
          <h2 class="section-title">Hours</h2>
          <div class="hours-grid">${hoursHtml}</div>
        </div>
      </section>
    </main>
    ${renderFooter()}
  `;
}
