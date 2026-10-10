import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sqlite3InitModule from "@sqlite.org/sqlite-wasm";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kbRoot = path.join(projectRoot, "kb");
const coursesPath = path.join(projectRoot, "data", "courses.csv");
const outputPath = path.join(projectRoot, "data", "academy.db");

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];

    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.endsWith("\r") ? field.slice(0, -1) : field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (quoted) throw new Error(`Unterminated quoted field in ${coursesPath}`);
  if (field.length > 0 || row.length > 0) {
    row.push(field.endsWith("\r") ? field.slice(0, -1) : field);
    rows.push(row);
  }

  return rows;
}

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return markdownFiles(entryPath);
      return entry.isFile() && /\.md$/i.test(entry.name) ? [entryPath] : [];
    }),
  );
  return files.flat().sort((left, right) => left.localeCompare(right));
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function chunksFromMarkdown(filename, markdown) {
  const relativePath = path.relative(kbRoot, filename).split(path.sep).join("/");
  const docId = relativePath.replace(/\.md$/i, "");
  const title = markdown.match(/^#[ \t]+(.+?)[ \t]*$/m)?.[1]?.trim() || path.basename(docId);
  const headings = [...markdown.matchAll(/^##[ \t]+(.+?)[ \t]*$/gm)];
  const urlPath = docId
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return headings.map((heading, index) => {
    const section = heading[1].trim();
    const bodyStart = heading.index + heading[0].length;
    const bodyEnd = headings[index + 1]?.index ?? markdown.length;
    return {
      docId,
      title,
      section,
      body: markdown.slice(bodyStart, bodyEnd).trim(),
      url: `/kb/${urlPath}#${slugify(section)}`,
    };
  });
}

function courseRecords(csv) {
  const [headers, ...rows] = parseCsv(csv.replace(/^\uFEFF/, ""));
  const expectedHeaders = [
    "code", "title", "cat", "level", "weeks", "fee", "campus", "img", "when",
    "summary", "learn", "allergens", "bring", "intakes", "class_size",
  ];

  if (!headers || headers.join("\0") !== expectedHeaders.join("\0")) {
    throw new Error(`Unexpected columns in ${coursesPath}: ${headers?.join(", ") || "none"}`);
  }

  return rows.filter((row) => row.some(Boolean)).map((row, index) => {
    if (row.length !== headers.length) {
      throw new Error(`CSV row ${index + 2} has ${row.length} fields; expected ${headers.length}`);
    }
    return Object.fromEntries(headers.map((header, column) => [header, row[column]]));
  });
}

const [sqlite3, files, coursesCsv] = await Promise.all([
  sqlite3InitModule(),
  markdownFiles(kbRoot),
  readFile(coursesPath, "utf8"),
]);

const chunks = (
  await Promise.all(files.map(async (filename) => chunksFromMarkdown(filename, await readFile(filename, "utf8"))))
).flat();
const courses = courseRecords(coursesCsv);
const db = new sqlite3.oo1.DB(":memory:", "c");

try {
  db.exec(`
    PRAGMA journal_mode = OFF;
    PRAGMA synchronous = OFF;
    BEGIN;
    CREATE VIRTUAL TABLE chunks USING fts5(
      doc_id UNINDEXED,
      title,
      section,
      body,
      url UNINDEXED,
      tokenize='porter unicode61'
    );
    CREATE TABLE courses(
      code TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      cat TEXT NOT NULL,
      level TEXT NOT NULL,
      weeks INTEGER NOT NULL,
      fee INTEGER NOT NULL,
      campus TEXT NOT NULL,
      img TEXT NOT NULL,
      "when" TEXT NOT NULL,
      summary TEXT NOT NULL,
      learn TEXT NOT NULL,
      allergens TEXT NOT NULL,
      bring TEXT NOT NULL,
      intakes TEXT NOT NULL,
      class_size INTEGER NOT NULL
    );
  `);

  for (const chunk of chunks) {
    db.exec({
      sql: "INSERT INTO chunks(doc_id, title, section, body, url) VALUES (?, ?, ?, ?, ?)",
      bind: [chunk.docId, chunk.title, chunk.section, chunk.body, chunk.url],
    });
  }

  for (const course of courses) {
    db.exec({
      sql: `INSERT INTO courses(
        code, title, cat, level, weeks, fee, campus, img, "when", summary,
        learn, allergens, bring, intakes, class_size
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      bind: [
        course.code,
        course.title,
        course.cat,
        course.level,
        Number(course.weeks),
        Number(course.fee),
        course.campus,
        course.img,
        course.when,
        course.summary,
        course.learn,
        course.allergens,
        course.bring,
        course.intakes,
        Number(course.class_size),
      ],
    });
  }

  db.exec("COMMIT; PRAGMA optimize;");
  const exported = sqlite3.capi.sqlite3_js_db_export(db.pointer);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, exported);
  console.log(`Built ${path.relative(projectRoot, outputPath)} with ${chunks.length} chunks and ${courses.length} courses.`);
} catch (error) {
  try {
    db.exec("ROLLBACK");
  } catch {
    // The transaction may already have committed.
  }
  throw error;
} finally {
  db.close();
}
