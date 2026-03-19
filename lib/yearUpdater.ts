import fs from "fs";
import path from "path";

const CONTENT_DRAFTS_DIR = path.join(process.cwd(), "content-drafts");

// YEAR_TOKEN comment format:
// <!-- YEAR_TOKEN: 2026 | AUTO_UPDATE_AFTER: Christmas=2026-01-01, Birthday=evergreen, General=2027-01-07 -->

interface YearToken {
  year: number;
  christmasDate: Date | null;
  birthdayEvergreen: boolean;
  generalDate: Date | null;
}

function parseYearToken(line: string): YearToken | null {
  const match = line.match(
    /<!-- YEAR_TOKEN: (\d{4}) \| AUTO_UPDATE_AFTER: Christmas=([\d-]+|evergreen), Birthday=([\d-]+|evergreen), General=([\d-]+|evergreen) -->/
  );
  if (!match) return null;

  const [, yearStr, christmasStr, birthdayStr, generalStr] = match;

  return {
    year: parseInt(yearStr, 10),
    christmasDate: christmasStr === "evergreen" ? null : new Date(christmasStr),
    birthdayEvergreen: birthdayStr === "evergreen",
    generalDate: generalStr === "evergreen" ? null : new Date(generalStr),
  };
}

function shouldUpdateYear(token: YearToken, now: Date): boolean {
  // Christmas content: update 7 days after Christmas (Dec 25)
  // The token stores the date when updating should trigger
  if (token.christmasDate && now >= token.christmasDate) {
    return true;
  }

  // General content: update on January 7 each year
  if (token.generalDate && now >= token.generalDate) {
    return true;
  }

  return false;
}

function buildNewYearToken(oldYear: number, newYear: number): string {
  const christmasUpdate = `${newYear}-01-01`;
  const generalUpdate = `${newYear}-01-07`;
  return `<!-- YEAR_TOKEN: ${newYear} | AUTO_UPDATE_AFTER: Christmas=${christmasUpdate}, Birthday=evergreen, General=${generalUpdate} -->`;
}

function updateYearInContent(content: string, oldYear: number, newYear: number): string {
  // Replace the 4-digit year string in all occurrences across the file
  const yearRegex = new RegExp(`\\b${oldYear}\\b`, "g");
  return content.replace(yearRegex, String(newYear));
}

/**
 * Reads all markdown files in content-drafts/, checks their YEAR_TOKEN comment,
 * and bumps the year string if the configured update date has passed.
 *
 * Trigger: call this on server start or via a cron job.
 */
export function checkAndUpdateContentYear(): void {
  const now = new Date();

  if (!fs.existsSync(CONTENT_DRAFTS_DIR)) {
    console.warn("[yearUpdater] content-drafts directory not found. Skipping.");
    return;
  }

  const files = fs.readdirSync(CONTENT_DRAFTS_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(CONTENT_DRAFTS_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    // Find the YEAR_TOKEN comment line
    const tokenLineIndex = lines.findIndex((l) => l.includes("YEAR_TOKEN:"));
    if (tokenLineIndex === -1) continue;

    const token = parseYearToken(lines[tokenLineIndex]);
    if (!token) continue;

    // Birthday/evergreen pages: update on Jan 7 each year
    const currentYear = now.getFullYear();
    const jan7ThisYear = new Date(`${currentYear}-01-07`);
    const isEvergreen = token.birthdayEvergreen && !token.christmasDate && !token.generalDate;

    const needsUpdate = isEvergreen
      ? now >= jan7ThisYear && token.year < currentYear
      : shouldUpdateYear(token, now) && token.year < currentYear;

    if (!needsUpdate) continue;

    const newYear = token.year + 1;
    console.log(`[yearUpdater] Bumping year in ${file}: ${token.year} -> ${newYear}`);

    // Replace all year references in content
    let updatedContent = updateYearInContent(content, token.year, newYear);

    // Replace the YEAR_TOKEN line itself with updated dates
    const updatedLines = updatedContent.split("\n");
    const newTokenLineIndex = updatedLines.findIndex((l) => l.includes("YEAR_TOKEN:"));
    if (newTokenLineIndex !== -1) {
      updatedLines[newTokenLineIndex] = buildNewYearToken(token.year, newYear);
      updatedContent = updatedLines.join("\n");
    }

    fs.writeFileSync(filePath, updatedContent, "utf-8");
  }
}
