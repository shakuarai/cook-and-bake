const STORAGE_KEY = "cb_signups";
const ENROLMENT_EMAIL = "enrol@cookbakeacademy.sg";
const state = { courses: [], filter: "All", query: "", selectedCourse: null };

const grid = document.querySelector("#course-grid");
const status = document.querySelector("#results-status");
const search = document.querySelector("#course-search");

function parseCSV(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i], next = text[i + 1];
    if (char === '"' && quoted && next === '"') { field += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(field); field = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      if (row.some(cell => cell !== "")) rows.push(row);
      row = []; field = "";
    } else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift().map(value => value.trim());
  return rows.map(values => Object.fromEntries(headers.map((key, index) => [key, (values[index] ?? "").trim()])));
}

function photoURL(id, width = 900) { return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=82`; }
function money(value) { return new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 }).format(Number(value)); }
function escapeHTML(value) { return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]); }
function weekLabel(value) { return Number(value) === 1 ? "1 session" : `${value} weeks`; }
function displayDate(value) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.valueOf()) ? value : new Intl.DateTimeFormat("en-SG", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function card(course) {
  const title = escapeHTML(course.title), code = escapeHTML(course.code), level = escapeHTML(course.level), campus = escapeHTML(course.campus), summary = escapeHTML(course.summary), schedule = escapeHTML(course.when);
  return `<article class="course-card" data-code="${code}">
    <div class="course-image"><img src="${photoURL(course.img)}" alt="${title} course" loading="lazy" width="900" height="620"></div>
    <div class="card-body">
      <div class="card-kicker"><span>${code}</span><span>${level}</span><span>${campus}</span></div>
      <h3>${title}</h3><p class="course-summary">${summary}</p>
      <div class="card-meta"><span>Duration</span><b>${weekLabel(course.weeks)}</b><span>Schedule</span><b>${schedule}</b><strong class="fee">${money(course.fee)}</strong></div>
      <button class="button button-primary card-signup" type="button" data-signup-course="${code}">Sign up</button>
    </div></article>`;
}

function visibleCourses() {
  const query = state.query.toLowerCase();
  return state.courses.filter(course => {
    const category = state.filter === "All" || course.cat === state.filter;
    const haystack = [course.code, course.title, course.level, course.campus, course.summary, course.learn].join(" ").toLowerCase();
    return category && (!query || haystack.includes(query));
  });
}

function render() {
  const courses = visibleCourses();
  grid.innerHTML = courses.map(card).join("");
  status.textContent = `Showing ${courses.length} ${courses.length === 1 ? "course" : "courses"}`;
}

document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
  state.filter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  render();
}));
search.addEventListener("input", () => { state.query = search.value.trim(); render(); });
document.querySelectorAll("[data-campus-filter]").forEach(link => link.addEventListener("click", () => {
  state.filter = "All"; state.query = link.dataset.campusFilter; search.value = state.query;
  document.querySelectorAll("[data-filter]").forEach(item => {
    const active = item.dataset.filter === "All";
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  render();
}));

const assistantDialog = document.querySelector("#course-assistant");
const assistantInput = document.querySelector("#assistant-query");
const assistantResults = document.querySelector("#assistant-results");
document.querySelector("[data-open-assistant]").addEventListener("click", () => { assistantDialog.showModal(); setTimeout(() => assistantInput.focus(), 0); });
document.querySelector("#assistant-submit").addEventListener("click", recommend);
assistantInput.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); recommend(); } });
function recommend() {
  const query = assistantInput.value.trim().toLowerCase();
  if (!query) { assistantResults.innerHTML = "<p>Tell us a dish, skill or goal first.</p>"; return; }
  const words = query.split(/\s+/).filter(word => word.length > 2);
  const ranked = state.courses.map(course => {
    const haystack = [course.title, course.summary, course.learn, course.level, course.cat].join(" ").toLowerCase();
    return { course, score: words.reduce((score, word) => score + (haystack.includes(word) ? 1 : 0), 0) };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
  if (!ranked.length) { assistantResults.innerHTML = '<p>No close match yet. <a href="#courses">Browse all 20 courses</a>.</p>'; return; }
  assistantResults.innerHTML = `<p>These are the closest matches:</p><ul>${ranked.map(({ course }) => `<li><a href="#courses" data-recommendation="${escapeHTML(course.title)}">${escapeHTML(course.title)}</a> — ${money(course.fee)}</li>`).join("")}</ul>`;
  assistantResults.querySelectorAll("[data-recommendation]").forEach(link => link.addEventListener("click", () => {
    assistantDialog.close(); state.filter = "All"; state.query = link.dataset.recommendation; search.value = state.query; render();
  }));
}

const signupDialog = document.querySelector("#signup-dialog");
const signupForm = document.querySelector("#signup-form");
const formView = document.querySelector("#signup-form-view");
const successView = document.querySelector("#signup-success");
const courseField = document.querySelector("#signup-course");
const intakeField = document.querySelector("#signup-intake");
const allergiesField = document.querySelector("#signup-allergies");
const allergyWarning = document.querySelector("#allergy-warning");

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-signup-course]");
  if (!button) return;
  const course = state.courses.find(item => item.code === button.dataset.signupCourse);
  if (course) openSignup(course);
});

document.querySelectorAll("[data-close-signup]").forEach(button => button.addEventListener("click", () => signupDialog.close()));
signupDialog.addEventListener("click", event => { if (event.target === signupDialog) signupDialog.close(); });
allergiesField.addEventListener("input", updateAllergyWarning);
signupForm.addEventListener("input", event => clearFieldError(event.target));
signupForm.addEventListener("change", event => clearFieldError(event.target));
signupForm.addEventListener("submit", submitSignup);

function openSignup(course) {
  state.selectedCourse = course;
  signupForm.reset();
  clearErrors();
  formView.classList.remove("is-hidden");
  successView.classList.add("is-hidden");
  courseField.value = `${course.code} — ${course.title}\n${money(course.fee)} · ${weekLabel(course.weeks)} · ${course.when} · ${course.campus}`;
  intakeField.innerHTML = '<option value="">Choose an intake</option>' + course.intakes.split(";").map(value => value.trim()).filter(Boolean).map(value => `<option value="${escapeHTML(value)}">${escapeHTML(displayDate(value))}</option>`).join("");
  updateAllergyWarning();
  signupDialog.showModal();
  setTimeout(() => intakeField.focus(), 0);
}

function clearErrors() {
  signupForm.querySelectorAll("[aria-invalid]").forEach(field => field.removeAttribute("aria-invalid"));
  signupForm.querySelectorAll(".field-error").forEach(message => { message.textContent = ""; });
  document.querySelector("#signup-status").textContent = "";
}

function clearFieldError(field) {
  if (!field?.name) return;
  field.removeAttribute("aria-invalid");
  const message = document.querySelector(`#signup-${field.name.replace("full_name", "name")}-error`);
  if (message) message.textContent = "";
  document.querySelector("#signup-status").textContent = "";
  if (field === allergiesField) updateAllergyWarning();
}

function showError(field, message) {
  field.setAttribute("aria-invalid", "true");
  const error = document.querySelector(`#signup-${field.name.replace("full_name", "name")}-error`);
  if (error) error.textContent = message;
  field.focus();
}

function firstValidationProblem() {
  const name = signupForm.elements.full_name;
  const email = signupForm.elements.email;
  const mobile = signupForm.elements.mobile;
  if (!intakeField.value) return [intakeField, "Choose one of the available intake dates."];
  if (name.value.trim().length < 2) return [name, "Enter your full name using at least 2 characters."];
  if (!email.value.trim()) return [email, "Enter your email address."];
  if (!email.validity.valid) return [email, "Enter a valid email address."];
  if (!/^(?:\+65\s?)?[689]\d{3}\s?\d{4}$/.test(mobile.value.trim())) return [mobile, "Enter a Singapore mobile such as +65 9123 4567 or 91234567."];
  if (!signupForm.elements.consent.checked) return [signupForm.elements.consent, "You must agree to be contacted about this sign-up."];
  return null;
}

function mentionsNuts(value) { return /\b(?:nut|nuts|peanut|peanuts|almond|almonds)\b/i.test(value); }
function updateAllergyWarning() {
  const show = Boolean(state.selectedCourse && mentionsNuts(allergiesField.value) && mentionsNuts(state.selectedCourse.allergens));
  allergyWarning.classList.toggle("is-hidden", !show);
}

function readSignups() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch { return []; }
}

function singaporeDateParts(date = new Date()) {
  return Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date).filter(part => part.type !== "literal").map(part => [part.type, part.value]));
}

function createReference(existing) {
  const parts = singaporeDateParts();
  const prefix = `CB-${parts.year}${parts.month}${parts.day}-`;
  const used = existing.map(item => item.reference).filter(value => value?.startsWith(prefix)).map(value => Number(value.slice(-4))).filter(Number.isFinite);
  return `${prefix}${String(Math.max(0, ...used) + 1).padStart(4, "0")}`;
}

function mailtoFor(signup) {
  const subject = `Course sign-up ${signup.reference} — ${signup.course_code}`;
  const body = [
    `Reference: ${signup.reference}`,
    `Course: ${signup.course_code} — ${signup.course_title}`,
    `Intake: ${signup.intake}`,
    `Name: ${signup.full_name}`,
    `Email: ${signup.email}`,
    `Mobile: ${signup.mobile}`,
    `Experience: ${signup.experience}`,
    `Allergies: ${signup.allergies || "None stated"}`,
    `Newsletter: ${signup.newsletter ? "Yes" : "No"}`
  ].join("\n");
  return `mailto:${ENROLMENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function submitSignup(event) {
  event.preventDefault();
  clearErrors();
  const problem = firstValidationProblem();
  if (problem) { showError(...problem); return; }

  const existing = readSignups();
  const course = state.selectedCourse;
  const signup = {
    reference: createReference(existing),
    submitted_at: new Date().toISOString(),
    course_code: course.code,
    course_title: course.title,
    fee_sgd: course.fee,
    weeks: course.weeks,
    schedule: course.when,
    campus: course.campus,
    intake: intakeField.value,
    full_name: signupForm.elements.full_name.value.trim(),
    email: signupForm.elements.email.value.trim(),
    mobile: signupForm.elements.mobile.value.trim(),
    experience: signupForm.elements.experience.value,
    allergies: allergiesField.value.trim(),
    consent: true,
    newsletter: signupForm.elements.newsletter.checked
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, signup]));
  } catch {
    document.querySelector("#signup-status").textContent = "We could not save this sign-up on your device. Check your browser storage settings and try again.";
    return;
  }

  const endpoint = window.SIGNUP_ENDPOINT;
  if (typeof endpoint === "string" && endpoint) {
    fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(signup) }).catch(() => {});
  }

  document.querySelector("#signup-reference").textContent = signup.reference;
  document.querySelector("#signup-email-link").href = mailtoFor(signup);
  formView.classList.add("is-hidden");
  successView.classList.remove("is-hidden");
  successView.querySelector("h2").focus?.();
}

fetch("data/courses.csv")
  .then(response => { if (!response.ok) throw new Error(`Course data returned ${response.status}`); return response.text(); })
  .then(text => { state.courses = parseCSV(text); render(); })
  .catch(() => { status.textContent = "Courses could not be loaded."; grid.innerHTML = '<p class="error">Please refresh the page to try again.</p>'; });
