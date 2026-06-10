import { site } from "../content/site.js";
import { renderHeader, renderFooter } from "../components/layout.js";

function renderForm() {
  const slots = site.reservationSlots
    .map((slot) => `<option value="${slot}">${slot}</option>`)
    .join("");

  const guestOptions = Array.from({ length: site.maxGuests }, (_, i) => {
    const count = i + 1;
    return `<option value="${count}">${count} ${count === 1 ? "seat" : "seats"}</option>`;
  }).join("");

  const minDate = new Date().toISOString().split("T")[0];

  return `
    <form id="reservation-form" class="reservation-form">
      <div class="notice">
        <strong>Please note:</strong> tables are held for 15 minutes. Late arrivals may be seated at the bar.
      </div>
      <div class="form-grid">
        <label>
          Full name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" required placeholder="+972 50 000 0000" />
        </label>
        <label class="full-width">
          Email
          <input name="email" type="email" placeholder="you@email.com" />
        </label>
        <label>
          Date
          <input name="date" type="date" required min="${minDate}" />
        </label>
        <label>
          Hour
          <select name="hour" required>
            <option value="" disabled selected>Select an hour</option>
            ${slots}
          </select>
        </label>
        <label class="full-width">
          Number of seats
          <select name="guests" required>${guestOptions}</select>
        </label>
      </div>
      <button type="submit" class="btn-primary btn-full">Book seats</button>
    </form>
  `;
}

function renderSuccess(data) {
  const contact = data.email || data.phone;
  return `
    <div class="success-card">
      <p class="eyebrow">Request received</p>
      <h2 class="section-title">Your table is reserved</h2>
      <p class="success-text">
        ${data.name}, we've noted your request for
        <strong>${data.guests} guests on ${data.date} at ${data.hour}</strong>.
        A confirmation will be sent to ${contact}.
      </p>
      <a href="/" class="btn-secondary" data-link>Back to home</a>
    </div>
  `;
}

export function renderReservationsPage() {
  return `
    ${renderHeader("/reservations")}
    <main class="reservations-main">
      <div class="container narrow">
        <a href="/" class="back-link" data-link>← Back to ${site.name}</a>
        <p class="eyebrow">Book a table</p>
        <h1 class="page-title">Reservations</h1>
        <p class="page-lead">
          Choose your date, hour, and number of seats. We hold tables for 15 minutes from your booked time.
        </p>
        <div id="reservation-content">${renderForm()}</div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

export function attachReservationHandlers() {
  const form = document.getElementById("reservation-form");
  const content = document.getElementById("reservation-content");
  if (!form || !content) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    content.innerHTML = renderSuccess(data);
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}
