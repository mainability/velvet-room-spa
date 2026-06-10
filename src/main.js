import { renderWelcomePage } from "./pages/welcome.js";
import {
  renderReservationsPage,
  attachReservationHandlers,
} from "./pages/reservations.js";

const routes = {
  "/": renderWelcomePage,
  "/reservations": renderReservationsPage,
};

function getPath() {
  return window.location.pathname.replace(/\/$/, "") || "/";
}

function attachLinkHandlers() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const href = link.getAttribute("href");
      if (!href) return;
      window.history.pushState({}, "", href);
      render();
    });
  });
}

function render() {
  const path = getPath();
  const renderPage = routes[path];

  if (!renderPage) {
    window.history.replaceState({}, "", "/");
    document.getElementById("app").innerHTML = renderWelcomePage();
  } else {
    document.getElementById("app").innerHTML = renderPage();
  }

  attachLinkHandlers();
  attachReservationHandlers();
}

window.addEventListener("popstate", render);
render();
