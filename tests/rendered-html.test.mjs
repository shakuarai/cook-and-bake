import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = path => readFile(new URL(path, root), "utf8");

test("build contains the shared sign-up dialog and admin page", async () => {
  const [index, admin] = await Promise.all([read("dist/client/index.html"), read("dist/client/admin.html")]);
  assert.equal((index.match(/<dialog id="signup-dialog"/g) || []).length, 1);
  assert.match(index, /id="signup-course"[^>]*readonly/);
  assert.match(index, /id="signup-intake"[^>]*required/);
  assert.match(index, /name="full_name"[^>]*minlength="2"[^>]*required/);
  assert.match(index, /name="email"[^>]*type="email"[^>]*required/);
  assert.match(index, /name="mobile"[^>]*type="tel"[^>]*required/);
  assert.match(index, /<option value="None">None<\/option>/);
  assert.match(index, /<option value="Some">Some<\/option>/);
  assert.match(index, /<option value="Confident">Confident<\/option>/);
  assert.match(index, /name="allergies"/);
  assert.match(index, /name="consent"[^>]*required/);
  assert.match(index, /name="newsletter"/);
  assert.doesNotMatch(index.match(/<input id="signup-newsletter"[^>]*>/)?.[0] ?? "", /checked/);
  assert.match(admin, /id="export-csv"/);
  assert.match(admin, /id="signup-rows"/);
});

test("every course can render a Sign up button with its own code and two intakes", async () => {
  const [app, courses] = await Promise.all([read("dist/client/app.js"), read("dist/client/data/courses.csv")]);
  const dataRows = courses.trim().split(/\r?\n/).slice(1);
  assert.equal(dataRows.length, 20);
  for (const row of dataRows) {
    const cells = parseCSVRow(row);
    assert.match(cells[0], /^(?:BAK|CUL)-\d{3}$/);
    assert.equal(cells[13].split(";").length, 2, `${cells[0]} should have two intake dates`);
  }
  assert.match(app, /data-signup-course=/);
  assert.match(app, /grid\.addEventListener\("click"/);
  assert.match(app, /course\.intakes\.split\(";"\)/);
  assert.match(app, /signupDialog\.showModal\(\)/);
});

test("browser validation, nut warning, persistence and success details follow the specification", async () => {
  const app = await read("dist/client/app.js");
  assert.match(app, /firstValidationProblem/);
  assert.match(app, /aria-invalid/);
  assert.match(app, /\^\(\?:\\\+65/);
  assert.match(app, /\[689\]/);
  assert.match(app, /mentionsNuts\(allergiesField\.value\)/);
  assert.match(app, /allergyWarning\.classList\.toggle/);
  assert.match(app, /const STORAGE_KEY = "cb_signups"/);
  assert.match(app, /localStorage\.setItem\(STORAGE_KEY/);
  assert.match(app, /CB-\$\{parts\.year\}\$\{parts\.month\}\$\{parts\.day\}-/);
  assert.match(app, /mailto:\$\{ENROLMENT_EMAIL\}/);
  assert.match(app, /enrol@cookbakeacademy\.sg/);
  assert.match(app, /window\.SIGNUP_ENDPOINT/);
});

test("admin export follows signups-format.csv exactly", async () => {
  const [format, admin] = await Promise.all([read("dist/client/signups-format.csv"), read("dist/client/admin.js")]);
  const expected = "reference,submitted_at,course_code,course_title,intake,full_name,email,mobile,experience,allergies,consent,newsletter";
  assert.equal(format.trim(), expected);
  assert.match(admin, /fetch\("signups-format\.csv"\)/);
  assert.match(admin, /columns\.map\(csvCell\)\.join\(","\)/);
  assert.match(admin, /signups\.map\(signup => columns\.map/);
  assert.match(admin, /localStorage\.getItem\(STORAGE_KEY\)/);
});

function parseCSVRow(text) {
  const values = [];
  let value = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"' && quoted && text[i + 1] === '"') { value += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { values.push(value); value = ""; }
    else value += char;
  }
  values.push(value);
  return values;
}
