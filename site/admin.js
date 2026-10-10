const STORAGE_KEY = "cb_signups";
const FALLBACK_COLUMNS = ["reference", "submitted_at", "course_code", "course_title", "intake", "full_name", "email", "mobile", "experience", "allergies", "consent", "newsletter"];

const headings = document.querySelector("#signup-headings");
const rows = document.querySelector("#signup-rows");
const status = document.querySelector("#admin-status");
const empty = document.querySelector("#admin-empty");
const exportButton = document.querySelector("#export-csv");
let columns = FALLBACK_COLUMNS;
let signups = readSignups();

function readSignups() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

function parseHeader(text) {
  const firstLine = text.replace(/^\uFEFF/, "").split(/\r?\n/, 1)[0];
  return firstLine.split(",").map(value => value.trim()).filter(Boolean);
}

function label(value) {
  return value.replaceAll("_", " ").replace(/\b\w/g, char => char.toUpperCase());
}

function display(value, column) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (column === "submitted_at" && value) {
    const date = new Date(value);
    if (!Number.isNaN(date.valueOf())) return new Intl.DateTimeFormat("en-SG", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Singapore" }).format(date);
  }
  return value ?? "";
}

function render() {
  headings.replaceChildren(...columns.map(column => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = label(column);
    return th;
  }));
  rows.replaceChildren(...signups.map(signup => {
    const tr = document.createElement("tr");
    columns.forEach(column => {
      const td = document.createElement("td");
      td.textContent = display(signup[column], column);
      tr.append(td);
    });
    return tr;
  }));
  status.textContent = `${signups.length} ${signups.length === 1 ? "sign-up" : "sign-ups"} saved on this device`;
  empty.classList.toggle("is-hidden", signups.length !== 0);
  document.querySelector(".table-wrap").classList.toggle("is-hidden", signups.length === 0);
  exportButton.disabled = signups.length === 0;
}

function csvCell(value) {
  const text = value == null ? "" : typeof value === "boolean" ? (value ? "true" : "false") : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function exportCSV() {
  const lines = [columns.map(csvCell).join(","), ...signups.map(signup => columns.map(column => csvCell(signup[column])).join(","))];
  const blob = new Blob(["\uFEFF", lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `cook-bake-signups-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

exportButton.addEventListener("click", exportCSV);

fetch("signups-format.csv")
  .then(response => { if (!response.ok) throw new Error("Format unavailable"); return response.text(); })
  .then(text => { const loaded = parseHeader(text); if (loaded.length) columns = loaded; })
  .catch(() => {})
  .finally(render);
