import { Readable } from 'stream';
import csvParser from 'csv-parser';

export const parseCSVBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = Readable.from([buffer]);
    const results = [];
    
    stream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve({ data: results }))
      .on('error', (error) => reject(error));
  });
};

export const extractCourtCodeFromFilename = (filename) => {
  // Extract court code from filename like "DsJ March 2026 Cases.csv"
  const match = filename.match(/^([A-Za-z0-9\s]+?)\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)/i);
  if (match) {
    return match[1].trim();
  }
  // Fallback: take first word(s) before a space followed by a number
  const altMatch = filename.match(/^([A-Za-z0-9\s]+?)(?:\s+\d+)/);
  if (altMatch) {
    return altMatch[1].trim();
  }
  return filename.split(".")[0]; // fallback to filename without extension
};

export const transformCaseData = (row, courtId, courtCode, courtName, filename) => {
  // Parse dates in various formats
  const parseDate = (dateStr) => {
    if (!dateStr || dateStr.trim() === "") return null;
    try {
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  // Determine if disposed/transferred based on flags
  const disposalFlag = row["Disposal OR Transfer Out Flag"];
  const disposed = disposalFlag?.toLowerCase() === "disposed";
  const transferedOut = disposalFlag?.toLowerCase() === "transfer out";
  const transferedIn = row["Date of Transfer In"] ? true : false;

  return {
    ["Case Title"]: row["Case Title"] || "",
    ["Case No"]: row["Case No"] || "",
    ["Case Type"]: row["Case Type"] || "",
    ["Category Per PQS"]: row["Category Per PQS"] || "",
    ["FIR NO"]: row["FIR NO"] || "",
    ["FIR Date"]: parseDate(row["FIR Date"]),
    Thana: row["Thana"] || "",
    Section: row["Section"] || row["Act"] || "",
    ["Date of Institution "]: parseDate(row["Date of Institution "]),
    ["Date of Disposal Transfer Out"]: parseDate(row["Date of Disposal Transfer Out"]),
    disposed: disposed,
    transferedOut: transferedOut,
    transferedIn: transferedIn,
    ["Disposal OR Transfer Out Flag"]: disposalFlag || "",
    ["Disposal Mode Flag"]: row["Disposal Mode Flag"] || "",
    AcquittalORConviction: row["AcquittalORConviction"] || "",
    ["Date of Transfer In"]: parseDate(row["Date of Transfer In"]),
    ["Date of Other Institution"]: parseDate(row["Date of Other Institution"]),
    ["Institution Flag"]: row["Institution Flag"] || "",
    nature: row["Category Per PQS"] || "",
    
    // Court reference fields
    courtId: courtId,
    courtCode: courtCode,
    courtName: courtName,
    uploadedAt: new Date(),
    sourceFile: filename,
  };
};

export const validateCaseRow = (row) => {
  // Validate that essential fields exist
  const errors = [];
  
  if (!row["Case No"] || row["Case No"].trim() === "") {
    errors.push("Missing Case No");
  }
  if (!row["Case Title"] || row["Case Title"].trim() === "") {
    errors.push("Missing Case Title");
  }
  
  return errors;
};
