const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("theme");

const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
}

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(systemPrefersDark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(newTheme);

  localStorage.setItem("theme", newTheme);
});

/* =========================
   CONTACT FORM
   ========================= */

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = contactForm.querySelector(".form-submit");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  formStatus.textContent = "";
  formStatus.className = "form-status";

  submitButton.disabled = true;
  submitButton.textContent = "Lähetetään...";

  const formData = new FormData(contactForm);

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    contactForm.reset();

    formStatus.textContent = "Kiitos! Viestisi on lähetetty onnistuneesti.";

    formStatus.classList.add("success");
  } catch (error) {
    formStatus.textContent =
      "Viestin lähetys epäonnistui. Voit ottaa yhteyttä WhatsAppilla tai sähköpostilla.";

    formStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Lähetä viesti";
  }
});
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu =
    navLinks.contains(event.target) || menuToggle.contains(event.target);

  if (!clickedInsideMenu) {
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
  }
});
